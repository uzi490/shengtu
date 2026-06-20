import http from 'node:http'
import { createReadStream, existsSync } from 'node:fs'
import fs from 'node:fs/promises'
import path from 'node:path'
import { randomUUID } from 'node:crypto'

const rootDir = process.cwd()
const distDir = path.resolve(process.env.STATIC_DIR || path.join(rootDir, 'dist'))
const dataDir = path.resolve(process.env.ASSET_DATA_DIR || path.join(rootDir, '.asset-data'))
const uploadsDir = path.join(dataDir, 'uploads')
const dbPath = path.join(dataDir, 'assets.json')
const port = Number(process.env.PORT || 8080)
const upstreamApiBaseUrl = normalizeBaseUrl(process.env.CANVAS_UPSTREAM_API_BASE_URL || 'http://127.0.0.1:3000')

const NORMAL_LIMIT_COUNT = Number(process.env.ASSET_LIMIT_COUNT || 50)
const NORMAL_LIMIT_BYTES = Number(process.env.ASSET_LIMIT_BYTES || 500 * 1024 * 1024)
const NORMAL_RETENTION_HOURS = Number(process.env.ASSET_RETENTION_HOURS || 24)
const MAX_BODY_BYTES = 20 * 1024 * 1024

const MIME_BY_EXT = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm'
}

await ensureStorage()

const server = http.createServer(async (req, res) => {
  try {
    const requestUrl = new URL(req.url || '/', `http://${req.headers.host || 'localhost'}`)

    if (requestUrl.pathname.startsWith('/api/assets')) {
      await handleAssetApi(req, res, requestUrl)
      return
    }

    if (requestUrl.pathname.startsWith('/api/ai/')) {
      await handleAiProxy(req, res, requestUrl)
      return
    }

    if (requestUrl.pathname.startsWith('/uploads/')) {
      await serveUpload(requestUrl.pathname, res)
      return
    }

    await serveStatic(requestUrl.pathname, res)
  } catch (error) {
    if (error instanceof HttpError) {
      sendJson(res, error.statusCode, { error: error.message })
      return
    }
    console.error('[asset-server] request failed', error)
    sendJson(res, 500, { error: '服务器处理失败' })
  }
})

server.listen(port, '0.0.0.0', () => {
  console.log(`[asset-server] listening on ${port}`)
  console.log(`[asset-server] static=${distDir}`)
  console.log(`[asset-server] data=${dataDir}`)
})

async function ensureStorage() {
  await fs.mkdir(uploadsDir, { recursive: true })
  if (!existsSync(dbPath)) {
    await writeDb({ assets: [] })
  }
}

async function handleAiProxy(req, res, requestUrl) {
  const authorization = getAuthorizationHeader(req)
  if (!authorization) {
    sendJson(res, 401, { error: '请先填写你的 AIAIAI API Key' })
    return
  }

  if (!['GET', 'POST'].includes(req.method || '')) {
    sendJson(res, 405, { error: '不支持的请求方法' })
    return
  }

  const upstreamPath = requestUrl.pathname.replace(/^\/api\/ai/, '') || '/'
  const upstreamUrl = new URL(`${upstreamApiBaseUrl}${upstreamPath}`)
  upstreamUrl.search = requestUrl.search

  const headers = {
    'Authorization': authorization,
    'Accept': req.headers.accept || 'application/json'
  }

  let body
  if (req.method !== 'GET') {
    const rawBody = await readRawBody(req)
    body = rawBody.length > 0 ? rawBody : undefined
    headers['Content-Type'] = req.headers['content-type'] || 'application/json'
  }

  const upstreamResponse = await fetch(upstreamUrl, {
    method: req.method,
    headers,
    body,
    redirect: 'follow'
  })

  if (!upstreamResponse.ok) {
    console.warn('[ai-proxy] upstream non-2xx', {
      method: req.method,
      path: upstreamPath,
      status: upstreamResponse.status,
      contentType: upstreamResponse.headers.get('content-type') || ''
    })
  }

  const contentType = upstreamResponse.headers.get('content-type') || 'application/json; charset=utf-8'
  const responseHeaders = {
    'content-type': contentType,
    'cache-control': 'no-cache'
  }

  if (contentType.includes('text/event-stream')) {
    responseHeaders['connection'] = 'keep-alive'
    responseHeaders['x-accel-buffering'] = 'no'
  }

  res.writeHead(upstreamResponse.status, responseHeaders)

  if (!upstreamResponse.body) {
    res.end()
    return
  }

  try {
    for await (const chunk of upstreamResponse.body) {
      res.write(chunk)
    }
    res.end()
  } catch (error) {
    console.error('[ai-proxy] upstream stream failed', error)
    res.destroy(error)
  }
}

function getAuthorizationHeader(req) {
  const header = req.headers.authorization
  const value = Array.isArray(header) ? header[0] : header
  if (!value || typeof value !== 'string') return ''
  const trimmed = value.trim()
  if (!/^Bearer\s+\S+/i.test(trimmed)) return ''
  return trimmed
}

async function handleAssetApi(req, res, requestUrl) {
  const userId = getUserId(req)
  const pathname = requestUrl.pathname

  if (req.method === 'GET' && pathname === '/api/assets/quota') {
    const db = await readDb()
    const assets = await purgeExpired(db)
    sendJson(res, 200, buildQuota(assets, userId))
    return
  }

  if (req.method === 'GET' && pathname === '/api/assets') {
    const db = await readDb()
    const assets = await purgeExpired(db)
    const type = requestUrl.searchParams.get('type')
    const query = (requestUrl.searchParams.get('query') || '').trim().toLowerCase()
    const list = assets
      .filter(asset => asset.userId === userId)
      .filter(asset => !type || type === 'all' || asset.type === type)
      .filter(asset => {
        if (!query) return true
        return [asset.title, asset.prompt, asset.model, ...(asset.tags || [])]
          .filter(Boolean)
          .join(' ')
          .toLowerCase()
          .includes(query)
      })
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

    sendJson(res, 200, { assets: list, quota: buildQuota(assets, userId) })
    return
  }

  if (req.method === 'POST' && pathname === '/api/assets/register-temp') {
    const body = await readJsonBody(req)
    const db = await readDb()
    const assets = await purgeExpired(db)
    const stored = await ingestSource({
      url: body.url,
      userId,
      bucket: 'temporary',
      fallbackName: 'generated-image'
    })

    const now = new Date()
    const asset = {
      id: randomUUID(),
      userId,
      type: 'temporary',
      mediaType: 'image',
      title: body.title || '临时生成结果',
      url: stored.url,
      filePath: stored.filePath,
      sourceUrl: body.url,
      sizeBytes: stored.sizeBytes,
      mimeType: stored.mimeType,
      prompt: body.prompt || '',
      model: body.model || '',
      projectId: body.projectId || '',
      nodeId: body.nodeId || '',
      tags: body.tags || [],
      createdAt: now.toISOString(),
      expiresAt: addHours(now, NORMAL_RETENTION_HOURS).toISOString()
    }

    assets.push(asset)
    await writeDb({ assets })
    sendJson(res, 201, { asset, quota: buildQuota(assets, userId) })
    return
  }

  if (req.method === 'POST' && pathname === '/api/assets/save') {
    const body = await readJsonBody(req)
    const db = await readDb()
    const assets = await purgeExpired(db)
    const userAssets = assets.filter(asset => asset.userId === userId && asset.type === 'saved')

    if (userAssets.length >= NORMAL_LIMIT_COUNT) {
      sendJson(res, 409, {
        error: `素材库已达到 ${NORMAL_LIMIT_COUNT} 张上限，请先下载或删除旧素材`
      })
      return
    }

    const sourceAsset = body.assetId
      ? assets.find(asset => asset.id === body.assetId && asset.userId === userId)
      : null

    if (body.assetId && !sourceAsset) {
      sendJson(res, 404, { error: '找不到要保存的素材，可能已过期或被清理' })
      return
    }

    const stored = await ingestSource({
      url: body.url || sourceAsset?.url,
      sourceAsset,
      userId,
      bucket: 'saved',
      fallbackName: body.title || sourceAsset?.title || 'saved-image'
    })

    const currentBytes = userAssets.reduce((sum, asset) => sum + Number(asset.sizeBytes || 0), 0)
    if (currentBytes + stored.sizeBytes > NORMAL_LIMIT_BYTES) {
      await deleteStoredFile(stored.filePath)
      sendJson(res, 409, {
        error: '素材库容量已达到 500MB 上限，请先下载或删除旧素材'
      })
      return
    }

    const now = new Date()
    const asset = {
      id: randomUUID(),
      userId,
      type: 'saved',
      mediaType: 'image',
      title: body.title || sourceAsset?.title || '已保存素材',
      url: stored.url,
      filePath: stored.filePath,
      sourceUrl: body.url || sourceAsset?.sourceUrl || sourceAsset?.url || '',
      sizeBytes: stored.sizeBytes,
      mimeType: stored.mimeType,
      prompt: body.prompt || sourceAsset?.prompt || '',
      model: body.model || sourceAsset?.model || '',
      projectId: body.projectId || sourceAsset?.projectId || '',
      nodeId: body.nodeId || sourceAsset?.nodeId || '',
      tags: body.tags || sourceAsset?.tags || [],
      createdAt: now.toISOString(),
      expiresAt: addHours(now, NORMAL_RETENTION_HOURS).toISOString()
    }

    assets.push(asset)
    await writeDb({ assets })
    sendJson(res, 201, { asset, quota: buildQuota(assets, userId) })
    return
  }

  const reloadMatch = pathname.match(/^\/api\/assets\/([^/]+)\/reload$/)
  if (req.method === 'GET' && reloadMatch) {
    const db = await readDb()
    const assets = await purgeExpired(db)
    const asset = assets.find(item => item.id === reloadMatch[1] && item.userId === userId)

    if (!asset) {
      sendJson(res, 404, { error: '结果已过期或已清理，需要重新生成' })
      return
    }

    if (asset.filePath && !existsSync(asset.filePath)) {
      sendJson(res, 404, { error: '文件已不存在，需要重新生成' })
      return
    }

    sendJson(res, 200, { asset })
    return
  }

  const deleteMatch = pathname.match(/^\/api\/assets\/([^/]+)$/)
  if (req.method === 'DELETE' && deleteMatch) {
    const db = await readDb()
    const assets = await purgeExpired(db)
    const target = assets.find(asset => asset.id === deleteMatch[1] && asset.userId === userId)
    if (!target) {
      sendJson(res, 404, { error: '素材不存在或已删除' })
      return
    }

    await deleteStoredFile(target.filePath)
    const nextAssets = assets.filter(asset => asset.id !== target.id)
    await writeDb({ assets: nextAssets })
    sendJson(res, 200, { ok: true, quota: buildQuota(nextAssets, userId) })
    return
  }

  sendJson(res, 404, { error: '接口不存在' })
}

async function ingestSource({ url, sourceAsset, userId, bucket, fallbackName }) {
  if (sourceAsset?.filePath && existsSync(sourceAsset.filePath)) {
    return copyStoredAsset(sourceAsset, userId, bucket, fallbackName)
  }

  if (!url || typeof url !== 'string') {
    throw new HttpError(400, '缺少图片地址')
  }

  if (url.startsWith('data:image/')) {
    return saveDataUrl(url, userId, bucket, fallbackName)
  }

  if (url.startsWith('/uploads/')) {
    const absolute = resolveUploadPath(url)
    if (!absolute || !existsSync(absolute)) {
      throw new HttpError(404, '本地素材文件不存在')
    }
    return copyFileToBucket(absolute, 'image/png', userId, bucket, fallbackName)
  }

  if (url.startsWith('http://') || url.startsWith('https://')) {
    return downloadToBucket(url, userId, bucket, fallbackName)
  }

  throw new HttpError(400, '暂不支持该图片地址格式')
}

async function copyStoredAsset(sourceAsset, userId, bucket, fallbackName) {
  return copyFileToBucket(
    sourceAsset.filePath,
    sourceAsset.mimeType || 'image/png',
    userId,
    bucket,
    fallbackName || sourceAsset.title
  )
}

async function copyFileToBucket(sourcePath, mimeType, userId, bucket, fallbackName) {
  const stat = await fs.stat(sourcePath)
  const ext = path.extname(sourcePath) || extFromMime(mimeType)
  const filePath = await allocateFilePath(userId, bucket, fallbackName, ext)
  await fs.copyFile(sourcePath, filePath)
  return {
    filePath,
    url: toPublicUploadUrl(filePath),
    sizeBytes: stat.size,
    mimeType
  }
}

async function saveDataUrl(dataUrl, userId, bucket, fallbackName) {
  const match = dataUrl.match(/^data:(image\/[a-zA-Z0-9.+-]+);base64,(.+)$/)
  if (!match) throw new HttpError(400, '图片数据格式不正确')

  const mimeType = match[1]
  const buffer = Buffer.from(match[2], 'base64')
  const filePath = await allocateFilePath(userId, bucket, fallbackName, extFromMime(mimeType))
  await fs.writeFile(filePath, buffer)

  return {
    filePath,
    url: toPublicUploadUrl(filePath),
    sizeBytes: buffer.length,
    mimeType
  }
}

async function downloadToBucket(url, userId, bucket, fallbackName) {
  const response = await fetch(url, { redirect: 'follow' })
  if (!response.ok) {
    throw new HttpError(400, `图片下载失败：HTTP ${response.status}`)
  }

  const contentType = response.headers.get('content-type') || 'image/png'
  if (!contentType.startsWith('image/')) {
    throw new HttpError(400, '地址返回的不是图片文件')
  }

  const arrayBuffer = await response.arrayBuffer()
  const buffer = Buffer.from(arrayBuffer)
  const filePath = await allocateFilePath(userId, bucket, fallbackName, extFromMime(contentType))
  await fs.writeFile(filePath, buffer)

  return {
    filePath,
    url: toPublicUploadUrl(filePath),
    sizeBytes: buffer.length,
    mimeType: contentType.split(';')[0]
  }
}

async function allocateFilePath(userId, bucket, fallbackName, ext) {
  const safeUserId = sanitizeSegment(userId)
  const safeBucket = sanitizeSegment(bucket)
  const safeName = sanitizeSegment(fallbackName || 'asset').slice(0, 40) || 'asset'
  const dir = path.join(uploadsDir, safeUserId, safeBucket)
  await fs.mkdir(dir, { recursive: true })
  return path.join(dir, `${Date.now()}-${safeName}-${randomUUID()}${ext || '.png'}`)
}

function toPublicUploadUrl(filePath) {
  const relative = path.relative(uploadsDir, filePath).split(path.sep).map(encodeURIComponent).join('/')
  return `/uploads/${relative}`
}

function resolveUploadPath(urlPath) {
  const relative = decodeURIComponent(urlPath.replace(/^\/uploads\//, ''))
  const resolved = path.resolve(uploadsDir, relative)
  if (!resolved.startsWith(uploadsDir)) return null
  return resolved
}

async function serveUpload(urlPath, res) {
  const filePath = resolveUploadPath(urlPath)
  if (!filePath || !existsSync(filePath)) {
    sendJson(res, 404, { error: '文件不存在' })
    return
  }

  await streamFile(filePath, res)
}

async function serveStatic(urlPath, res) {
  const cleanPath = decodeURIComponent(urlPath.split('?')[0])
  const requested = cleanPath === '/' ? '/index.html' : cleanPath
  const candidate = path.resolve(distDir, `.${requested}`)

  if (candidate.startsWith(distDir) && await isFile(candidate)) {
    await streamFile(candidate, res)
    return
  }

  const fallback = path.join(distDir, 'index.html')
  if (existsSync(fallback)) {
    await streamFile(fallback, res)
    return
  }

  sendJson(res, 404, { error: '前端文件不存在，请先构建 dist' })
}

async function streamFile(filePath, res) {
  const ext = path.extname(filePath).toLowerCase()
  res.writeHead(200, {
    'content-type': MIME_BY_EXT[ext] || 'application/octet-stream',
    'cache-control': ext === '.html' ? 'no-cache' : 'public, max-age=31536000, immutable'
  })
  const stream = createReadStream(filePath)
  stream.on('error', () => {
    if (!res.headersSent) {
      sendJson(res, 404, { error: '文件读取失败' })
    } else {
      res.destroy()
    }
  })
  stream.pipe(res)
}

async function isFile(filePath) {
  try {
    const stat = await fs.stat(filePath)
    return stat.isFile()
  } catch {
    return false
  }
}

async function readDb() {
  try {
    const text = await fs.readFile(dbPath, 'utf8')
    const parsed = JSON.parse(text)
    return { assets: Array.isArray(parsed.assets) ? parsed.assets : [] }
  } catch {
    return { assets: [] }
  }
}

async function writeDb(db) {
  await fs.mkdir(path.dirname(dbPath), { recursive: true })
  const tempPath = `${dbPath}.tmp`
  await fs.writeFile(tempPath, JSON.stringify(db, null, 2), 'utf8')
  await fs.rename(tempPath, dbPath)
}

async function purgeExpired(db) {
  const now = Date.now()
  const keep = []
  const removed = []

  for (const asset of db.assets || []) {
    if (asset.expiresAt && new Date(asset.expiresAt).getTime() <= now) {
      removed.push(asset)
    } else {
      keep.push(asset)
    }
  }

  if (removed.length > 0) {
    await Promise.allSettled(removed.map(asset => deleteStoredFile(asset.filePath)))
    await writeDb({ assets: keep })
  }

  return keep
}

function buildQuota(assets, userId) {
  const saved = assets.filter(asset => asset.userId === userId && asset.type === 'saved')
  const temporary = assets.filter(asset => asset.userId === userId && asset.type === 'temporary')
  const usedBytes = saved.reduce((sum, asset) => sum + Number(asset.sizeBytes || 0), 0)

  return {
    plan: 'normal',
    retentionHours: NORMAL_RETENTION_HOURS,
    savedCount: saved.length,
    savedLimit: NORMAL_LIMIT_COUNT,
    usedBytes,
    byteLimit: NORMAL_LIMIT_BYTES,
    temporaryCount: temporary.length
  }
}

async function deleteStoredFile(filePath) {
  if (!filePath) return
  const resolved = path.resolve(filePath)
  if (!resolved.startsWith(uploadsDir)) return
  await fs.rm(resolved, { force: true })
}

function getUserId(req) {
  const header = req.headers['x-canvas-user-id']
  const value = Array.isArray(header) ? header[0] : header
  return sanitizeSegment(value || 'anonymous-user')
}

function sanitizeSegment(value) {
  return String(value || '')
    .replace(/[^a-zA-Z0-9._-]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80) || 'unknown'
}

function extFromMime(mimeType = '') {
  const clean = mimeType.split(';')[0].toLowerCase()
  if (clean === 'image/jpeg' || clean === 'image/jpg') return '.jpg'
  if (clean === 'image/webp') return '.webp'
  if (clean === 'image/gif') return '.gif'
  if (clean === 'image/svg+xml') return '.svg'
  return '.png'
}

function addHours(date, hours) {
  return new Date(date.getTime() + hours * 60 * 60 * 1000)
}

async function readJsonBody(req) {
  const buffer = await readRawBody(req)
  if (buffer.length === 0) return {}

  try {
    return JSON.parse(buffer.toString('utf8'))
  } catch {
    throw new HttpError(400, '请求 JSON 格式不正确')
  }
}

async function readRawBody(req) {
  const chunks = []
  let total = 0

  for await (const chunk of req) {
    total += chunk.length
    if (total > MAX_BODY_BYTES) {
      throw new HttpError(413, '请求内容太大')
    }
    chunks.push(chunk)
  }

  return Buffer.concat(chunks)
}

function normalizeBaseUrl(url) {
  return String(url || '').replace(/\/+$/, '')
}

function sendJson(res, statusCode, payload) {
  res.writeHead(statusCode, {
    'content-type': 'application/json; charset=utf-8',
    'cache-control': 'no-cache'
  })
  res.end(JSON.stringify(payload))
}

class HttpError extends Error {
  constructor(statusCode, message) {
    super(message)
    this.statusCode = statusCode
  }
}
