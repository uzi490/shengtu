/**
 * Models Configuration | 模型配置
 * Centralized model configuration | 集中模型配置
 */

// Seedream image size options | 豆包图片尺寸选项
export const SEEDREAM_SIZE_OPTIONS = [
    { label: '21:9', key: '3024x1296' },
    { label: '16:9', key: '2560x1440' },
    { label: '4:3', key: '2304x1728' },
    { label: '3:2', key: '2496x1664' },
    { label: '1:1', key: '2048x2048' },
    { label: '2:3', key: '1664x2496' },
    { label: '3:4', key: '1728x2304' },
    { label: '9:16', key: '1440x2560' },
    { label: '9:21', key: '1296x3024' }
]

// Seedream 4K image size options | 豆包4K图片尺寸选项
export const SEEDREAM_4K_SIZE_OPTIONS = [
    { label: '21:9', key: '6198x2656' },
    { label: '16:9', key: '5404x3040' },
    { label: '4:3', key: '4694x3520' },
    { label: '3:2', key: '4992x3328' },
    { label: '1:1', key: '4096x4096' },
    { label: '2:3', key: '3328x4992' },
    { label: '3:4', key: '3520x4694' },
    { label: '9:16', key: '3040x5404' },
    { label: '9:21', key: '2656x6198' }
]

// Seedream quality options | 豆包画质选项
export const SEEDREAM_QUALITY_OPTIONS = [
    { label: '标准画质', key: 'standard' },
    { label: '4K 高清', key: '4k' }
]

export const BANANA_SIZE_OPTIONS = [
    { label: '16:9', key: '16x9' },
    { label: '4:3', key: '4x3' },
    { label: '3:2', key: '3x2' },
    { label: '1:1', key: '1x1' },
    { label: '2:3', key: '2x3' },
    { label: '3:4', key: '3x4' },
    { label: '9:16', key: '9x16' },
]

// MiniMax image size options (by aspect_ratio) | MiniMax 尺寸选项
export const MINIMAX_ASPECT_RATIO_OPTIONS = [
    { label: '1:1 (1024×1024)', key: '1:1' },
    { label: '16:9 (1280×720)', key: '16:9' },
    { label: '4:3 (1152×864)', key: '4:3' },
    { label: '3:2 (1248×832)', key: '3:2' },
    { label: '2:3 (832×1248)', key: '2:3' },
    { label: '3:4 (864×1152)', key: '3:4' },
    { label: '9:16 (720×1280)', key: '9:16' },
    { label: '21:9 (1344×576)', key: '21:9' }
]

// MiniMax video resolution options | MiniMax 视频分辨率选项
export const MINIMAX_VIDEO_RESOLUTION_OPTIONS = [
    { label: '720P', key: '720P' },
    { label: '768P', key: '768P' },
    { label: '1080P', key: '1080P' }
]

// MiniMax video duration options | MiniMax 视频时长选项
export const MINIMAX_VIDEO_DURATION_OPTIONS = [
    { label: '5 秒', key: 5 },
    { label: '6 秒', key: 6 },
    { label: '10 秒', key: 10 }
]

// Image generation models | 图片生成模型
export const IMAGE_MODELS = [
    { label: 'gpt image 2',
    key: 'gpt-image-2',
    provider: ['longcheng'],
    sizes: [
        { label: '1:1 (1024×1024)', key: '1024x1024' },
        { label: '16:9 (1360×768)', key: '1360x768' },
        { label: '9:16 (768×1360)', key: '768x1360' },
        { label: '4:3 (1280×960)', key: '1280x960' },
        { label: '3:4 (960×1280)', key: '960x1280' },
        { label: '3:2 (1200×800)', key: '1200x800' },
        { label: '2:3 (800×1200)', key: '800x1200' },
        { label: '4:5 (1024×1280)', key: '1024x1280' },
        { label: '5:4 (1280×1024)', key: '1280x1024' },
        { label: '21:9 (1680×720)', key: '1680x720' }
        ],
    maxN: 1,
    defaultParams: {
        size: '1024x1024',
        n: 1,
        quality: 'standard',
        style: 'vivid',
        image_size: '1k'
    }
},
// {
//     label: 'gpt image 2',
//     key: 'gpt-image-2',
//     provider: ['longcheng'],
//     sizes: [
//         { label: '1:1 (1024×1024)', key: '1024x1024' },
//         { label: '16:9 (1360×768)', key: '1360x768' },
//         { label: '9:16 (768×1360)', key: '768x1360' },
//         { label: '4:3 (1280×960)', key: '1280x960' },
//         { label: '3:4 (960×1280)', key: '960x1280' },
//         { label: '3:2 (1200×800)', key: '1200x800' },
//         { label: '2:3 (800×1200)', key: '800x1200' },
//         { label: '4:5 (1024×1280)', key: '1024x1280' },
//         { label: '5:4 (1280×1024)', key: '1280x1024' },
//         { label: '21:9 (1680×720)', key: '1680x720' }
//         ],
//     maxN: 1,
//     defaultParams: {
//         size: '1024x1024',
//         n: 1,
//         quality: 'standard',
//         style: 'vivid',
//         image_size: '1k'
//     }
// },
    // ============ Gemini 图片模型 ============
    /*
    {
        label: 'Gemini 2.5 Flash Image',
        key: 'gemini-2.5-flash-image',
        provider: ['longcheng'],
        sizes: [
            { label: '1:1 (1024×1024)', key: '1:1' },
            { label: '16:9 (1280×720)', key: '16:9' },
            { label: '9:16 (720×1280)', key: '9:16' },
            { label: '4:3 (1152×864)', key: '4:3' },
            { label: '3:4 (864×1152)', key: '3:4' }
        ],
        maxN: 1,
        defaultParams: {
            size: '1:1',
            n: 1,
            quality: 'standard',
            style: 'vivid'
        }
    },
    {
        label: 'Gemini 3.1 Flash Image Preview 2K',
        key: 'gemini-3.1-flash-image-preview-2k',
        provider: ['longcheng'],
        sizes: [
            { label: '1:1 (2048×2048)', key: '1:1' },
            { label: '16:9 (2752×1548)', key: '16:9' },
            { label: '9:16 (1548×2752)', key: '9:16' },
            { label: '4:3 (2400×1800)', key: '4:3' },
            { label: '3:4 (1800×2400)', key: '3:4' },
            { label: '3:2 (2528×1684)', key: '3:2' },
            { label: '2:3 (1684×2528)', key: '2:3' },
            { label: '4:5 (1856×2320)', key: '4:5' },
            { label: '5:4 (2320×1856)', key: '5:4' },
            { label: '21:9 (3168×1710)', key: '21:9' },
            { label: '4:1 (4096×1024)', key: '4:1' },
            { label: '1:4 (1024×4096)', key: '1:4' },
            { label: '8:1 (6144×768)', key: '8:1' },
            { label: '1:8 (768×6144)', key: '1:8' }
        ],
        maxN: 1,
        defaultParams: {
            size: '1:1',
            n: 1,
            quality: 'standard',
            style: 'vivid'
        }
    },
    {
        label: 'Gemini 3.1 Flash Image Preview 4K',
        key: 'gemini-3.1-flash-image-preview-4k',
        provider: ['longcheng'],
        sizes: [
            { label: '1:1 (4096×4096)', key: '1:1' },
            { label: '16:9 (5504×3072)', key: '16:9' },
            { label: '9:16 (3072×5504)', key: '9:16' },
            { label: '4:3 (4800×3584)', key: '4:3' },
            { label: '3:4 (3584×4800)', key: '3:4' },
            { label: '3:2 (5056×3392)', key: '3:2' },
            { label: '2:3 (3392×5056)', key: '2:3' },
            { label: '4:5 (3712×4608)', key: '4:5' },
            { label: '5:4 (4608×3712)', key: '5:4' },
            { label: '21:9 (6336×2688)', key: '21:9' },
            { label: '4:1 (8192×2048)', key: '4:1' },
            { label: '1:4 (2048×8192)', key: '1:4' },
            { label: '8:1 (12288×1536)', key: '8:1' },
            { label: '1:8 (1536×12288)', key: '1:8' }
        ],
        maxN: 1,
        defaultParams: {
            size: '1:1',
            n: 1,
            quality: 'standard',
            style: 'vivid'
        }
    },
    {
        label: 'Gemini 3 Pro Image Preview 2K',
        key: 'gemini-3-pro-image-preview-2k',
        provider: ['longcheng'],
        sizes: [
            { label: '1:1 (2048×2048)', key: '1:1' },
            { label: '16:9 (2752×1548)', key: '16:9' },
            { label: '9:16 (1548×2752)', key: '9:16' },
            { label: '4:3 (2400×1792)', key: '4:3' },
            { label: '3:4 (1792×2400)', key: '3:4' },
            { label: '3:2 (2528×1696)', key: '3:2' },
            { label: '2:3 (1696×2528)', key: '2:3' },
            { label: '4:5 (1856×2320)', key: '4:5' },
            { label: '5:4 (2320×1856)', key: '5:4' },
            { label: '21:9 (3168×1344)', key: '21:9' }
        ],
        maxN: 1,
        defaultParams: {
            size: '1:1',
            n: 1,
            quality: 'standard',
            style: 'vivid',
            image_size: '2k'
        }
    },
    {
        label: 'Gemini 3 Pro Image Preview 4K',
        key: 'gemini-3-pro-image-preview-4k',
        provider: ['longcheng'],
        sizes: [
            { label: '1:1 (4096×4096)', key: '1:1' },
            { label: '16:9 (5504×3072)', key: '16:9' },
            { label: '9:16 (3072×5504)', key: '9:16' },
            { label: '4:3 (4800×3584)', key: '4:3' },
            { label: '3:4 (3584×4800)', key: '3:4' },
            { label: '3:2 (5056×3392)', key: '3:2' },
            { label: '2:3 (3392×5056)', key: '2:3' },
            { label: '4:5 (3712×4608)', key: '4:5' },
            { label: '5:4 (4608×3712)', key: '5:4' },
            { label: '21:9 (6336×2688)', key: '21:9' }
        ],
        maxN: 1,
        defaultParams: {
            size: '1:1',
            n: 1,
            quality: 'standard',
            style: 'vivid',
            image_size: '4k'
        }
    },
    */

    //  ========= 百度图片模型ernie-image ============
    // {
    //     label: 'ERNIE-Image (Custom Sizes)',
    //     key: 'PaddlePaddle/ERNIE-Image',
    //     provider: ['baidu'],
    //     sizes: [
    //         { label: '1:1 (1024×1024)', key: '1024x1024' },
    //         { label: '2:3 (848×1264)', key: '848x1264' },
    //         { label: '3:2 (1264×848)', key: '1264x848' },
    //         { label: '9:16 (768×1376)', key: '768x1376' },
    //         { label: '3:4 (896×1200)', key: '896x1200' },
    //         { label: '16:9 (1376×768)', key: '1376x768' },
    //         { label: '4:3 (1200×896)', key: '1200x896' }
    //     ],
    //     defaultParams: {
    //         size: '1024x1024',
    //         n: 1,
    //         version: 'v2'
    //     }
    // },

    //  ========= 千问生图模型 wan2.7-image-pro ============
    /*
    {
        label: '千问万相 wan2.7-image',
        key: 'wan2.7-image',
        provider: ['longcheng'],
        sizes: [
            { label: '2K', key: '2K' },
        ],
        maxN: 4,
        defaultParams: {
            size: '2K',
            n: 1,
            watermark: false,
            thinking_mode: true
        }
    },
    */

    // ============ MiniMax 模型 ============
    /*
    {
        label: 'MiniMax image-01',
        key: 'image-01',
        provider: ['minimax'],
        sizes: MINIMAX_ASPECT_RATIO_OPTIONS.map(s => s.key),
        defaultParams: {
            aspect_ratio: '1:1',
            n: 1,
            response_format: 'url'
        }
    },
    */

]

// Video ratio options | 视频比例选项
export const VIDEO_RATIO_LIST = [
    { label: '16:9 (横版)', key: '16x9' },
    { label: '4:3', key: '4x3' },
    { label: '1:1 (方形)', key: '1x1' },
    { label: '3:4', key: '3x4' },
    { label: '9:16 (竖版)', key: '9x16' }
]

// Video resolution options for Seedance | Seedance 分辨率选项
export const SEEDANCE_RESOLUTION_OPTIONS = [
    { label: '480p', key: '480p' },
    { label: '720p', key: '720p' },
    { label: '1080p', key: '1080p' }
]

// Video generation models | 视频生成模型
export const VIDEO_MODELS = [
     // Seedance 模型 - 1.5 Pro
    {
        label: 'Seedance 1.5 Pro (图文视频)',
        key: 'doubao-seedance-1-5-pro-251215',
        provider: ['longcheng'],
        type: 't2v+i2v',
        ratios: ['16:9', '4:3', '1:1', '3:4', '9:16', '21:9'],
        durs: [{ label: '5 秒', key: 5 }, { label: '10 秒', key: 10 }],
        resolutions: ['480p', '720p', '1080p'],
        defaultResolution: '1080p',
        defaultParams: { ratio: '16:9', duration: 10, resolution: '1080p' }
    },
    // Seedance 模型 - 文生视频
    {
        label: 'Seedance 1.0 Lite (文生视频)',
        key: 'doubao-seedance-1-0-lite-t2v-250428',
        provider: ['longcheng'],
        type: 't2v', // 文生视频
        ratios: ['16:9', '4:3', '1:1', '3:4', '9:16', '21:9'],
        durs: [{ label: '5 秒', key: 5 }, { label: '10 秒', key: 10 }],
        resolutions: ['480p', '720p', '1080p'],
        defaultResolution: '720p',
        defaultParams: { ratio: '16:9', duration: 5, resolution: '720p' }
    },
    // Seedance 模型 - 图生视频
    {
        label: 'Seedance 1.0 Lite (图生视频)',
        key: 'doubao-seedance-1-0-lite-i2v-250428',
        provider: ['longcheng'],
        type: 'i2v', // 图生视频
        ratios: ['16:9'],
        durs: [{ label: '5 秒', key: 5 }, { label: '10 秒', key: 10 }],
        resolutions: ['480p', '720p', '1080p'],
        defaultResolution: '720p',
        defaultParams: { ratio: '16:9', duration: 5, resolution: '720p' }
    },
    // Seedance 模型 - 图文视频 Pro
    {
        label: 'Seedance 1.0 Pro (图文视频)',
        key: 'doubao-seedance-1-0-pro-250528',
        provider: ['longcheng'],
        type: 't2v+i2v', // 图文视频
        ratios: ['16:9', '4:3', '1:1', '3:4', '9:16', '21:9'],
        durs: [{ label: '5 秒', key: 5 }, { label: '10 秒', key: 10 }],
        resolutions: ['480p', '720p', '1080p'],
        defaultResolution: '1080p',
        defaultParams: { ratio: '16:9', duration: 5, resolution: '1080p' }
    },
   
    // Seedance 模型 - 1.0 Pro Fast
    {
        label: 'Seedance 1.0 Pro Fast (图文视频)',
        key: 'doubao-seedance-1-0-pro-fast-251015',
        provider: ['longcheng'],
        type: 't2v+i2v',
        ratios: ['16:9', '4:3', '1:1', '3:4', '9:16', '21:9'],
        durs: [{ label: '5 秒', key: 5 }, { label: '10 秒', key: 10 }],
        resolutions: ['480p', '720p', '1080p'],
        defaultResolution: '1080p',
        defaultParams: { ratio: '16:9', duration: 5, resolution: '1080p' }
    },

    // ============ MiniMax 视频模型 ============
    // MiniMax Hailuo 文生视频
    {
        label: 'Hailuo-2.3 (文生视频)',
        key: 'MiniMax-Hailuo-2.3',
        provider: ['minimax'],
        type: 't2v',
        ratios: ['16:9', '9:16', '1:1'],
        durs: MINIMAX_VIDEO_DURATION_OPTIONS,
        resolutions: ['720P', '768P', '1080P'],
        defaultResolution: '768P',
        defaultParams: { ratio: '16:9', duration: 6, resolution: '768P' }
    },
    // MiniMax Hailuo 图生视频（需要首帧图）
    {
        label: 'Hailuo-2.3 (图生视频)',
        key: 'MiniMax-Hailuo-2.3-i2v',
        provider: ['minimax'],
        type: 'i2v',
        ratios: ['16:9', '9:16', '1:1'],
        durs: MINIMAX_VIDEO_DURATION_OPTIONS,
        resolutions: ['720P', '768P', '1080P'],
        defaultResolution: '768P',
        defaultParams: { ratio: '16:9', duration: 6, resolution: '768P' }
    },
    // MiniMax Hailuo Fast 文生视频
    {
        label: 'Hailuo-2.3-Fast (文生视频)',
        key: 'MiniMax-Hailuo-2.3-Fast',
        provider: ['minimax'],
        type: 't2v',
        ratios: ['16:9', '9:16', '1:1'],
        durs: MINIMAX_VIDEO_DURATION_OPTIONS,
        resolutions: ['720P', '768P', '1080P'],
        defaultResolution: '768P',
        defaultParams: { ratio: '16:9', duration: 6, resolution: '768P' }
    },
    // MiniMax Hailuo Fast 图生视频
    {
        label: 'Hailuo-2.3-Fast (图生视频)',
        key: 'MiniMax-Hailuo-2.3-Fast-i2v',
        provider: ['minimax'],
        type: 'i2v',
        ratios: ['16:9', '9:16', '1:1'],
        durs: MINIMAX_VIDEO_DURATION_OPTIONS,
        resolutions: ['720P', '768P', '1080P'],
        defaultResolution: '768P',
        defaultParams: { ratio: '16:9', duration: 6, resolution: '768P' }
    }
]

// Chat/LLM models | 对话模型
export const CHAT_MODELS = [
    { label: 'GPT-5.5', key: 'gpt-5.5', provider: ['longcheng'] },
    { label: 'MiniMax-M2.7', key: 'MiniMax-M2.7', provider: ['minimax'] },
    { label: 'MiniMax-M2.7-highspeed', key: 'MiniMax-M2.7-highspeed', provider: ['minimax'] }
]

// Image size options | 图片尺寸选项
export const IMAGE_SIZE_OPTIONS = [
    { label: '2048x2048', key: '2048x2048' },
    { label: '1792x1024 (横版)', key: '1792x1024' },
    { label: '1024x1792 (竖版)', key: '1024x1792' }
]

// Image quality options | 图片质量选项
export const IMAGE_QUALITY_OPTIONS = [
    { label: '标准', key: 'standard' },
    { label: '高清', key: 'hd' }
]

// Image style options | 图片风格选项
export const IMAGE_STYLE_OPTIONS = [
    { label: '生动', key: 'vivid' },
    { label: '自然', key: 'natural' }
]

// Video ratio options | 视频比例选项
export const VIDEO_RATIO_OPTIONS = VIDEO_RATIO_LIST

// Video duration options | 视频时长选项
export const VIDEO_DURATION_OPTIONS = [
    { label: '5 秒', key: 5 },
    { label: '10 秒', key: 10 }
]

// Default values | 默认值
export const DEFAULT_IMAGE_MODEL = 'gpt-image-2'
export const DEFAULT_VIDEO_MODEL = 'doubao-seedance-1-5-pro-251215'
export const DEFAULT_CHAT_MODEL = 'gpt-5.5'
export const DEFAULT_IMAGE_SIZE = '2048x2048'
export const DEFAULT_VIDEO_RATIO = '16:9'
export const DEFAULT_VIDEO_DURATION = 5

// Get model by key | 根据 key 获取模型
export const getModelByName = (key) => {
    const allModels = [...IMAGE_MODELS, ...VIDEO_MODELS, ...CHAT_MODELS]
    return allModels.find(m => m.key === key)
}
