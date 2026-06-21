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
    id: 'main-image-background-swap',
    category: 'background',
    name: '商品主图换背景',
    description: '保留商品主体，换成更适合平台主图的干净背景',
    size: '2048x2048',
    needsProductImage: true,
    prompt: `将参考图中的商品主体完整保留下来，只替换背景，生成一张电商商品主图。
保留：商品形状、比例、颜色、材质、LOGO、包装文字和关键细节必须保持一致，不要改款式，不要增加不存在的配件。
背景：干净浅色商业摄影背景，可使用浅灰、米白、浅暖色或轻微渐变，保留真实接触阴影和自然反光。
构图：商品居中，占画面 70% 到 80%，边缘清晰，适合淘宝、天猫、拼多多、抖音电商主图。
限制：不要生成促销文字、价格、平台标识、二维码、无关道具和多余商品。`
  },
  {
    id: 'white-background-to-lifestyle',
    category: 'scene',
    name: '白底图转场景图',
    description: '把白底商品图转成真实使用场景',
    size: '2048x2048',
    needsProductImage: true,
    prompt: `把参考图中的白底商品转成真实电商生活场景图。
要求：商品主体保持原样，外观、颜色、比例、品牌细节、标签文字不变；只为商品生成匹配的使用环境。
场景：根据产品品类自动选择合理场景，例如家居用品放在干净客厅，美妆产品放在梳妆台，数码产品放在办公桌，食品饮品放在明亮餐桌。
光线：自然窗光或柔和影棚光，阴影方向合理，商品要像真实摆放在场景里。
画面：干净、有购买欲，辅助道具不能抢主体，不要生成乱码文字。`
  },
  {
    id: 'model-outfit-change',
    category: 'scene',
    name: '模特图换装',
    description: '适合服装、鞋包、配饰上身展示',
    size: '1440x2560',
    needsProductImage: true,
    prompt: `根据参考图中的服装、鞋包或配饰，生成一张电商模特上身展示图。
保留：商品款式、颜色、面料纹理、版型、图案、LOGO 和关键细节，不要改变商品设计。
模特：自然真实，姿态放松，适合目标人群；脸部和手部自然，不要夸张摆拍。
场景：干净商业街拍、室内影棚或生活方式场景，风格与商品定位匹配。
构图：竖版详情页或信息流广告构图，商品必须清晰完整展示。
限制：不要生成错误文字，不要改变服装结构，不要让商品被头发、手臂或道具遮挡。`
  },
  {
    id: 'ghost-mannequin-apparel',
    category: 'main-image',
    name: '服装隐形模特',
    description: '适合服装平铺图变成立体版型展示',
    size: '2048x2048',
    needsProductImage: true,
    prompt: `将参考图中的服装生成隐形模特电商展示图。
要求：保留服装颜色、面料、版型、领口、袖口、下摆、纽扣、拉链、图案和标签细节。
效果：服装像穿在隐形模特身上一样有自然立体形态，肩部、胸腰、袖长和衣摆结构清晰。
背景：白色或浅灰纯净背景，柔和阴影，适合平台主图和详情页。
限制：不要出现真实人体、脸、手、脚；不要改变服装版型和花纹；不要生成多件无关服装。`
  },
  {
    id: 'detail-page-local-closeup',
    category: 'detail',
    name: '详情页局部图',
    description: '生成详情页常用的局部卖点图片',
    size: '2048x2048',
    needsProductImage: true,
    prompt: `生成一张电商详情页局部卖点图。
要求：从参考商品中选择最能说明品质或功能的局部，例如材质纹理、边角工艺、接口、拉链、瓶口、按键、缝线、开合结构、包装细节。
构图：局部清晰放大，主体占画面 70% 左右，背景干净虚化，层次自然。
表达：让用户一眼看懂产品做工、质感或功能优势，但不要生成不可读小字。
保留：商品真实颜色、材质、结构和品牌细节，不要虚构不存在的功能。`
  },
  {
    id: 'texture-comparison-detail',
    category: 'detail',
    name: '材质对比细节',
    description: '适合展示升级材质、厚度、纹理、工艺',
    size: '2560x1440',
    needsProductImage: true,
    prompt: `生成一张电商详情页材质对比图。
要求：围绕参考商品展示材质层次、纹理、厚度、表面处理或工艺差异，可以使用局部放大、剖面感、并列展示或光影对比。
画面：横版详情页模块，结构清楚，留出少量文字排版空间，但不要直接生成正文小字。
光线：柔和侧光突出纹理，细节锐利，色彩真实。
限制：不要虚构商品没有的材料和结构，不要改变品牌、LOGO、包装文字。`
  },
  {
    id: 'viral-product-remake',
    category: 'style',
    name: '爆款图复刻',
    description: '参考爆款构图，保留自己的商品',
    size: '2048x2048',
    needsProductImage: true,
    prompt: `根据参考商品生成一张爆款电商商品图，借鉴高转化商品图的构图、光影、氛围和视觉层次。
保留：只保留自己的商品主体，商品形状、颜色、材质、LOGO 和包装文字不能改变。
复刻方向：中心主体明确、强对比光影、干净背景、适度道具、强购买欲、适合信息流点击。
要求：可以参考爆款图常见视觉语言，但不要复制其他品牌元素、商标、包装、模特脸或版权素材。
限制：不生成具体价格、平台标识、促销乱码、虚假销量和夸张功效。`
  },
  {
    id: 'competitor-style-variant',
    category: 'style',
    name: '竞品风格改造',
    description: '把普通商品图升级成竞品同级质感',
    size: '2048x2048',
    needsProductImage: true,
    prompt: `将参考商品图升级为高转化竞品同级别的商业摄影风格。
要求：商品主体不变，只优化构图、背景、光影、材质表现和整体高级感。
风格：干净、专业、可信、有价格感，适合品牌旗舰店、抖音小店和信息流广告。
画面：主体清楚，辅助道具少而精，背景颜色与商品主色协调。
限制：不要抄袭竞品品牌元素，不要改变商品设计，不要生成无法阅读的文字。`
  },
  {
    id: 'holiday-sale-poster',
    category: 'poster',
    name: '节日促销海报',
    description: '适合年货节、情人节、母亲节、圣诞等节点',
    size: '1440x2560',
    needsProductImage: true,
    prompt: `生成一张节日促销电商海报底图。
要求：参考商品作为主视觉，产品清晰完整，节日氛围明显但不抢主体。
节日氛围：根据产品和活动选择合适元素，例如红金年货节、粉色情人节、温暖母亲节、绿色春季上新、圣诞礼盒氛围。
构图：竖版海报，预留顶部标题区和底部价格 / 优惠信息区，方便后期加字。
限制：不要直接生成价格、二维码、平台图标、具体日期和乱码文字；不要改变商品外观。`
  },
  {
    id: '618-double11-poster',
    category: 'poster',
    name: '618 / 双11 大促',
    description: '适合大促主视觉和短视频封面',
    size: '1440x2560',
    needsProductImage: true,
    prompt: `生成一张电商大促活动海报底图，适合 618、双 11、双 12、开学季或周年庆。
要求：商品作为画面核心，周围有强促销氛围、舞台感光效、礼盒、彩带、优惠氛围元素，但产品必须清晰真实。
构图：竖版主视觉，视觉中心明确，留出大标题和优惠信息排版空间。
风格：电商大促、明亮、有冲击力、适合短视频封面和活动页。
限制：不要生成具体价格、虚假折扣、平台 LOGO、品牌授权元素和不可读文字。`
  },
  {
    id: 'bundle-flat-lay',
    category: 'scene',
    name: '套装平铺组合',
    description: '适合套装、礼盒、配件组合和搭配销售',
    size: '2048x2048',
    needsProductImage: true,
    prompt: `生成一张电商套装平铺组合图。
要求：以参考商品为核心，围绕它搭配少量相关配件、包装、赠品或使用道具，形成完整购买场景。
构图：俯拍平铺或轻微 45 度视角，排列整齐，主体商品最醒目。
背景：干净桌面、布面、木纹或浅色摄影背景，风格与商品定位一致。
限制：参考商品必须保持原样，不要生成过多无关物品，不要虚构套餐包含物，不要生成乱码文字。`
  },
  {
    id: 'social-feed-ad',
    category: 'poster',
    name: '信息流广告图',
    description: '适合抖音、小红书、视频号封面和广告投放',
    size: '1440x2560',
    needsProductImage: true,
    prompt: `生成一张适合信息流广告的电商商品图。
要求：前 1 秒抓住注意力，商品清晰、卖点直观、背景有视觉冲击但不杂乱。
构图：竖版，产品占画面主要区域，预留一块干净区域用于后期添加短标题和卖点。
风格：真实商业广告摄影，明亮、有层次、有点击欲，适合抖音、小红书、视频号封面。
限制：不要生成夸张功效、具体价格、虚假销量、平台标识和乱码文字。`
  },
  {
    id: 'premium-gift-box-scene',
    category: 'scene',
    name: '礼盒送礼场景',
    description: '适合礼品、食品、美妆、母婴和高客单套装',
    size: '2048x2048',
    needsProductImage: true,
    prompt: `生成一张高端送礼场景电商图。
要求：参考商品或礼盒作为主视觉，保留包装形状、颜色、LOGO、标签和关键文字；画面体现送礼感、品质感和仪式感。
场景：精致桌面、柔和布景、礼盒丝带、花材或少量节日道具，搭配克制。
光线：柔和暖光或高级影棚光，真实阴影，突出包装材质和产品质感。
限制：不要改变商品包装设计，不要添加不属于商品的品牌信息，不要生成乱码文字。`
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
