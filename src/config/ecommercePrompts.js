/**
 * Ecommerce Prompt Library | 电商提示词库
 * 面向商家作图的轻量模板库，点击后生成可编辑的画布节点。
 */

export const ECOMMERCE_PROMPT_CATEGORIES = [
  { id: 'all', name: '全部' },
  { id: 'main-image', name: '主图' },
  { id: 'scene', name: '场景图' },
  { id: 'detail', name: '细节图' },
  { id: 'poster', name: '营销海报' },
  { id: 'background', name: '背景替换' },
  { id: 'style', name: '风格光影' }
]

export const ECOMMERCE_PROMPTS = [
  {
    id: 'clean-marketplace-main-image',
    category: 'main-image',
    name: '白底平台主图',
    description: '适合淘宝、天猫、拼多多标准商品主图',
    size: '2048x2048',
    needsProductImage: true,
    prompt: `生成一张电商平台标准商品主图。
要求：产品居中，占画面 75% 左右，白色或浅灰纯净背景，边缘清晰，材质真实，光线均匀柔和，保留产品真实形态、颜色、结构和品牌细节。
构图：正面或 45 度角展示，无遮挡，无多余道具，无人物，无夸张文字。
画质：高清商业摄影，锐利细节，干净阴影，适合淘宝、天猫、拼多多、抖音电商主图。`
  },
  {
    id: 'premium-hero-main-image',
    category: 'main-image',
    name: '高级质感主图',
    description: '强化质感和价格感，适合高客单产品',
    size: '2048x2048',
    needsProductImage: true,
    prompt: `生成一张高级质感电商商品主图。
要求：产品作为唯一视觉主体，置于精致浅色影棚背景中，保留产品真实比例和关键细节。使用柔和侧光、轮廓光和自然投影，突出材质纹理、金属反光、玻璃通透感或织物细节。
构图：简洁高级，留白克制，适合详情页首屏和广告投放。
画质：商业广告摄影，高清、真实、干净、有品质感。`
  },
  {
    id: 'lifestyle-scene-image',
    category: 'scene',
    name: '生活方式场景图',
    description: '把产品放进真实使用场景，提高代入感',
    size: '2048x2048',
    needsProductImage: true,
    prompt: `生成一张电商生活方式场景图。
要求：把产品自然放入目标用户真实使用场景中，环境与产品品类匹配，画面要让用户能理解产品怎么使用、适合什么生活状态。
场景：干净真实，有生活气息，避免杂乱；道具只作为辅助，不抢产品主体。
光线：自然柔和，商业摄影质感。
保持：产品外观、颜色、结构、LOGO 和关键细节不变。`
  },
  {
    id: 'model-holding-product',
    category: 'scene',
    name: '模特手持展示',
    description: '适合美妆、数码、小家电、食品等产品',
    size: '1440x2560',
    needsProductImage: true,
    prompt: `生成一张模特手持产品的电商场景图。
要求：模特自然展示产品，动作真实，表情轻松可信，产品在画面中清晰可见且不变形。
风格：现代商业摄影，干净背景，服装和场景与产品定位匹配。
构图：竖版，适合详情页、短视频封面和信息流广告。
重点：产品质感清晰，手部姿态自然，避免遮挡产品关键信息。`
  },
  {
    id: 'macro-detail-texture',
    category: 'detail',
    name: '材质细节特写',
    description: '突出纹理、工艺、接口、做工等细节',
    size: '2048x2048',
    needsProductImage: true,
    prompt: `生成一张产品细节特写图。
要求：聚焦产品最能体现品质的局部细节，比如材质纹理、接口、缝线、按键、瓶口、喷头、边缘工艺、包装质感。
构图：微距特写，景深自然，主体局部清晰，背景干净虚化。
光线：柔和侧光，突出纹理层次。
保持：产品真实结构和颜色，不新增错误文字或虚假功能。`
  },
  {
    id: 'feature-callout-diagram',
    category: 'detail',
    name: '卖点结构图',
    description: '适合展示核心卖点、结构拆解和功能分区',
    size: '2560x1440',
    needsProductImage: true,
    prompt: `生成一张电商卖点结构图。
要求：以产品为中心，清晰展示核心部件、功能分区或使用价值，画面具有科技感和说明性。
可以使用简洁线条、局部放大框、结构分层或半透明剖面来表达，但不要生成无法阅读的小字。
风格：干净、专业、适合详情页卖点模块。
保持：产品外观、比例和关键部件准确，不夸大不存在的结构。`
  },
  {
    id: 'campaign-poster',
    category: 'poster',
    name: '促销海报底图',
    description: '生成适合后期加文字的活动海报背景',
    size: '1440x2560',
    needsProductImage: true,
    prompt: `生成一张电商促销海报底图。
要求：产品作为主视觉，背景有活动氛围但不喧宾夺主，预留上方或侧边文字区域，方便后期添加价格、优惠、标题。
风格：明亮、有购买欲、适合促销活动和短视频封面。
限制：不要直接生成具体价格、二维码、平台标识或不可读文字。
画质：高清商业广告风格，层次清楚。`
  },
  {
    id: 'seasonal-festival-poster',
    category: 'poster',
    name: '节日活动海报',
    description: '适合 618、双 11、年货节、情人节等活动',
    size: '1440x2560',
    needsProductImage: true,
    prompt: `生成一张节日活动电商海报底图。
要求：围绕产品建立节日氛围，加入与活动相关的色彩、道具和空间层次，但产品必须清晰可见。
构图：竖版海报，主视觉突出，预留标题和优惠信息位置。
风格：商业广告摄影与精致视觉设计结合，热闹但不杂乱。
限制：不生成乱码文字，不生成虚假品牌授权元素。`
  },
  {
    id: 'studio-background-replace',
    category: 'background',
    name: '影棚背景替换',
    description: '保留产品，替换成干净影棚背景',
    size: '2048x2048',
    needsProductImage: true,
    prompt: `将参考图中的产品保留下来，替换为干净的商业影棚背景。
要求：产品主体、颜色、形状、品牌细节保持一致，去除原图杂乱背景。
背景：浅灰、米白或柔和渐变影棚背景，带自然接触阴影。
光线：均匀柔和，符合产品原本光照方向。
结果：适合电商主图和详情页，不改变产品真实外观。`
  },
  {
    id: 'premium-material-lighting',
    category: 'style',
    name: '高级光影质感',
    description: '用于提升普通产品图的商业摄影质感',
    size: '2048x2048',
    needsProductImage: true,
    prompt: `在保持产品真实外观不变的前提下，提升图片的商业摄影质感。
要求：优化光线、阴影、反光和材质表现，让产品更干净、更高级、更有价格感。
背景：简洁，不抢主体。
处理：增强清晰度和层次，但不要过度锐化，不改变颜色、结构、LOGO、文字和功能部件。
风格：高端产品摄影，真实可信。`
  }
]

export const getEcommercePromptsByCategory = (categoryId) => {
  if (!categoryId || categoryId === 'all') {
    return ECOMMERCE_PROMPTS
  }

  return ECOMMERCE_PROMPTS.filter((prompt) => prompt.category === categoryId)
}

export const createEcommercePromptWorkflow = (template) => ({
  id: `ecommerce-prompt-${template.id}`,
  name: template.name,
  description: template.description,
  icon: 'ShoppingOutline',
  category: 'ecommerce-prompt',
  createNodes: (startPosition) => {
    const colSpacing = 420
    const rowSpacing = 260
    const nodes = []
    const edges = []
    let nodeIdCounter = 0
    const getNodeId = () => `ecommerce_prompt_${Date.now()}_${nodeIdCounter++}`

    const productInfoId = getNodeId()
    nodes.push({
      id: productInfoId,
      type: 'text',
      position: { x: startPosition.x, y: startPosition.y },
      data: {
        label: '产品信息',
        content: '填写产品名称、材质、卖点、目标人群、平台尺寸要求。例如：无线耳机，主打低音、长续航、通勤使用，适合淘宝主图。'
      }
    })

    let productImageId = null
    if (template.needsProductImage) {
      productImageId = getNodeId()
      nodes.push({
        id: productImageId,
        type: 'image',
        position: { x: startPosition.x, y: startPosition.y + rowSpacing },
        data: {
          label: '产品参考图',
          url: ''
        }
      })
    }

    const promptId = getNodeId()
    nodes.push({
      id: promptId,
      type: 'text',
      position: { x: startPosition.x + colSpacing, y: startPosition.y },
      data: {
        label: `${template.name}提示词`,
        content: template.prompt
      }
    })

    const configId = getNodeId()
    nodes.push({
      id: configId,
      type: 'imageConfig',
      position: { x: startPosition.x + colSpacing * 2, y: startPosition.y },
      data: {
        label: template.name,
        model: 'doubao-seedream-4-5-251128',
        size: template.size || '2048x2048'
      }
    })

    const resultId = getNodeId()
    nodes.push({
      id: resultId,
      type: 'image',
      position: { x: startPosition.x + colSpacing * 3, y: startPosition.y },
      data: {
        label: '生成结果',
        url: ''
      }
    })

    edges.push({
      id: `edge_${productInfoId}_${configId}`,
      source: productInfoId,
      target: configId,
      type: 'promptOrder',
      data: { promptOrder: 1 },
      sourceHandle: 'right',
      targetHandle: 'left'
    })

    if (productImageId) {
      edges.push({
        id: `edge_${productImageId}_${configId}`,
        source: productImageId,
        target: configId,
        type: 'imageOrder',
        data: { imageOrder: 1 },
        sourceHandle: 'right',
        targetHandle: 'left'
      })
    }

    edges.push({
      id: `edge_${promptId}_${configId}`,
      source: promptId,
      target: configId,
      type: 'promptOrder',
      data: { promptOrder: 2 },
      sourceHandle: 'right',
      targetHandle: 'left'
    })

    edges.push({
      id: `edge_${configId}_${resultId}`,
      source: configId,
      target: resultId,
      sourceHandle: 'right',
      targetHandle: 'left'
    })

    return { nodes, edges }
  }
})

export default ECOMMERCE_PROMPTS
