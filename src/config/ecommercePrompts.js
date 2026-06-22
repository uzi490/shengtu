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
画质：高清商业摄影，锐利细节，干净阴影，适合淘宝、天猫、拼多多、抖音电商主图。
限制：不要改变商品外观，不要生成乱码文字、价格、平台标识和无关品牌元素。`
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
画质：商业广告摄影，高清、真实、干净、有品质感。
限制：不要改变商品外观，不要生成虚假功能、乱码文字、价格和竞品品牌元素。`
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
保持：产品外观、颜色、结构、LOGO 和关键细节不变。
限制：不要改变商品主体，不要生成乱码文字、虚假卖点和无关品牌。`
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
重点：产品质感清晰，手部姿态自然，避免遮挡产品关键信息。
限制：不要改变商品包装和结构，不要生成乱码文字、虚假功能和不合理手部。`
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
保持：产品真实结构和颜色，不新增错误文字或虚假功能。
限制：不要改变商品材质和结构，不要生成乱码文字、虚假参数和无关品牌。`
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
限制：不要生成乱码文字、价格、平台标识和虚假品牌授权元素。`
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
结果：适合电商主图和详情页，不改变产品真实外观。
限制：不要修改商品主体，不要生成乱码文字、价格、平台标识和无关道具。`
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
  },
  {
    id: 'fashion-street-lookbook',
    category: 'scene',
    name: '服装街拍画报',
    description: '适合服装、鞋包、配饰生成上身街拍图',
    size: '1440x2560',
    needsProductImage: true,
    prompt: `根据参考图中的服装、鞋包或配饰，生成一张电商街拍画报图。
保留：商品款式、颜色、版型、面料纹理、LOGO、图案和关键细节必须准确，不改款式。
场景：干净城市街区、商场外立面或简洁咖啡店门口，自然日光，背景虚化但有生活感。
模特：目标人群匹配，姿态自然，商品完整可见，鞋包配饰不要被遮挡。
限制：不要生成竞品品牌、虚假文字、夸张滤镜和不合理肢体。`
  },
  {
    id: 'fashion-flatlay-outfit-match',
    category: 'scene',
    name: '服装平铺搭配',
    description: '适合服装套装、鞋包配饰做搭配陈列',
    size: '2048x2048',
    needsProductImage: true,
    prompt: `生成一张服装鞋包平铺搭配电商图。
要求：参考商品作为核心，保留颜色、纹理、版型、图案、吊牌和品牌细节，不改变商品设计。
构图：俯拍平铺，搭配少量同风格鞋包、配饰或生活道具，排列整齐，主体最醒目。
背景：浅色布面、木纹桌面或干净影棚背景，光线柔和，质感真实。
限制：不要虚构套装内容，不要增加无关品牌，不要生成乱码文字和价格。`
  },
  {
    id: 'footwear-material-closeup',
    category: 'detail',
    name: '鞋类材质细节',
    description: '突出鞋面、鞋底、走线、防滑纹理等细节',
    size: '2048x2048',
    needsProductImage: true,
    prompt: `生成一张鞋类商品详情页材质特写图。
要求：从参考鞋款中突出鞋面纹理、鞋底纹路、缝线、鞋带、鞋头、后跟或防滑结构。
保留：鞋款颜色、轮廓、LOGO、材质和关键结构准确，不改鞋型。
构图：微距商业摄影，局部清晰，背景简洁虚化，柔和侧光突出纹理和层次。
限制：不要虚构功能卖点，不要生成错误文字，不要让局部变形。`
  },
  {
    id: 'beauty-bottle-premium-main',
    category: 'main-image',
    name: '美妆瓶身主图',
    description: '适合护肤品、香水、彩妆瓶罐主图',
    size: '2048x2048',
    needsProductImage: true,
    prompt: `生成一张美妆护肤产品高级主图。
保留：瓶身形状、瓶盖、标签、LOGO、包装文字、颜色和材质反光，不能重绘成其他产品。
背景：浅色影棚、柔和渐变或水润质感台面，少量水滴、光斑或透明亚克力道具辅助。
光线：干净柔和，突出玻璃、塑料、金属、膏霜包装的真实质感。
限制：不要生成虚假功效、价格、认证标识、乱码文字和多余产品。`
  },
  {
    id: 'beauty-texture-swatch-closeup',
    category: 'detail',
    name: '美妆质地特写',
    description: '展示膏霜、精华、口红、粉底等质地',
    size: '2048x2048',
    needsProductImage: true,
    prompt: `生成一张美妆产品质地特写详情图。
要求：围绕参考商品展示膏霜、精华、口红、粉底、粉质或泡沫质地，可加入少量涂抹痕迹和微距纹理。
保留：产品包装和可见标签准确，颜色不要偏离真实色号。
构图：近景商业摄影，质地细腻，光线柔和，背景干净，适合详情页说明质感。
限制：不要生成医疗功效、夸大效果、错误成分文字和虚假认证。`
  },
  {
    id: 'beauty-vanity-scene',
    category: 'scene',
    name: '梳妆台使用场景',
    description: '适合护肤、彩妆、香氛做生活方式图',
    size: '2048x2048',
    needsProductImage: true,
    prompt: `把参考美妆产品放入真实梳妆台使用场景。
保留：商品包装、瓶身文字、LOGO、色彩和比例不变，产品必须清晰可辨。
场景：干净梳妆台、镜面、柔软毛巾、花材或少量同色系道具，呈现日常护肤或化妆氛围。
光线：自然窗光或柔和暖光，画面明亮、细腻、有品质感。
限制：不要生成过多杂物，不要修改包装，不要生成乱码文字。`
  },
  {
    id: 'food-appetite-table-scene',
    category: 'scene',
    name: '食品餐桌食欲图',
    description: '适合零食、预制菜、饮品和调味品场景图',
    size: '2048x2048',
    needsProductImage: true,
    prompt: `生成一张食品饮料电商餐桌场景图。
保留：参考商品包装、品牌细节、颜色、标签和主体形态准确，不改变包装。
场景：明亮餐桌、真实餐具、少量食材或成品摆盘，突出食欲和日常可食用场景。
光线：自然侧光，食物色泽真实诱人，包装清晰可见。
限制：不要虚构配料、产地、功效、价格和不可读文字；不要让食品看起来不卫生。`
  },
  {
    id: 'beverage-cold-splash-main',
    category: 'main-image',
    name: '饮品冰爽主图',
    description: '适合饮料、咖啡、奶茶、酒水包装主图',
    size: '2048x2048',
    needsProductImage: true,
    prompt: `生成一张饮品电商冰爽主图。
保留：瓶罐包装、标签文字、LOGO、容量形态和颜色准确，不改变品牌信息。
画面：产品居中，周围可有冰块、水滴、冷凝水、轻微飞溅和对应口味元素，背景干净清爽。
光线：高亮商业摄影，瓶身反光自然，标签清晰。
限制：不要生成虚假口味、酒精度、价格、活动文字和乱码；不要加入无关品牌。`
  },
  {
    id: 'food-gift-box-festival',
    category: 'poster',
    name: '食品礼盒节庆图',
    description: '适合年货、月饼、茶叶、坚果礼盒',
    size: '1440x2560',
    needsProductImage: true,
    prompt: `生成一张食品礼盒节庆电商海报底图。
保留：礼盒包装结构、颜色、LOGO、标签和产品内容准确，不改变包装设计。
氛围：根据产品选择年货、团圆、送礼或高端茶点氛围，可加入节庆桌面、丝带、花材、木盒或食材点缀。
构图：竖版海报，产品为主视觉，预留标题和促销信息位置。
限制：不要生成具体价格、虚假产地、夸大功效、平台标识和乱码文字。`
  },
  {
    id: 'home-living-room-scene',
    category: 'scene',
    name: '家居客厅场景',
    description: '适合小家具、装饰品、家居用品场景图',
    size: '2560x1440',
    needsProductImage: true,
    prompt: `把参考家居商品放入真实客厅场景。
保留：商品外观、颜色、材质、比例、纹理和结构准确，不改变款式。
场景：现代简洁客厅，搭配沙发、地毯、绿植、窗光或收纳空间，商品位置合理，尺寸感真实。
光线：自然明亮，阴影方向统一，画面干净耐看。
限制：不要虚构功能，不要让商品比例失真，不要生成乱码文字和无关品牌。`
  },
  {
    id: 'bedding-bedroom-set',
    category: 'scene',
    name: '家纺卧室套装',
    description: '适合四件套、枕头、被子、床垫场景图',
    size: '2560x1440',
    needsProductImage: true,
    prompt: `生成一张家纺卧室套装电商场景图。
保留：参考家纺商品的颜色、纹理、花型、缝线、厚度和包装细节，不改变图案。
场景：干净卧室、自然铺陈的床品、柔和窗光、简洁床头和少量生活道具。
重点：表现面料柔软、蓬松度、亲肤感和整套搭配效果，适合详情页首屏。
限制：不要虚构材质认证、抗菌功效、品牌文字和价格信息。`
  },
  {
    id: 'home-material-texture-detail',
    category: 'detail',
    name: '家居材质纹理',
    description: '展示木纹、布料、皮革、金属、陶瓷等质感',
    size: '2048x2048',
    needsProductImage: true,
    prompt: `生成一张家居商品材质纹理详情图。
要求：聚焦参考商品的木纹、布料织纹、皮革颗粒、金属边框、陶瓷釉面、五金连接或边角工艺。
保留：商品真实颜色、结构、纹理方向和工艺细节，不替换成其他材质。
构图：微距或局部放大，背景干净，侧光突出层次，适合详情页材质说明。
限制：不要虚构环保等级、检测认证、功能参数和乱码文字。`
  },
  {
    id: 'tech-device-hero-main',
    category: 'main-image',
    name: '数码科技主图',
    description: '适合手机壳、耳机、键盘、小家电等科技主图',
    size: '2048x2048',
    needsProductImage: true,
    prompt: `生成一张数码家电科技感商品主图。
保留：参考商品外观、接口、按键、屏幕、LOGO、颜色、材质和比例准确，不改变产品结构。
背景：深浅可选的干净科技影棚背景，可用少量光带、反射台面或几何层次增强科技感。
构图：产品居中或 45 度角展示，边缘清晰，卖点部位可见。
限制：不要生成不存在的屏幕内容、参数、认证、价格和乱码文字。`
  },
  {
    id: 'tech-interface-detail',
    category: 'detail',
    name: '接口按键细节',
    description: '适合数码配件、小家电展示接口和工艺',
    size: '2048x2048',
    needsProductImage: true,
    prompt: `生成一张数码家电接口与按键详情图。
要求：突出参考商品的接口、按键、旋钮、散热孔、屏幕边框、线材、插头或结构接缝。
保留：接口数量、位置、形状、LOGO、材质和产品比例准确，不新增不存在的部件。
构图：局部微距，光线硬朗但不过曝，背景简洁，适合详情页说明工艺。
限制：不要虚构性能参数、认证标识、品牌文字和乱码。`
  },
  {
    id: 'tech-desk-workspace-scene',
    category: 'scene',
    name: '数码桌面办公场景',
    description: '适合办公数码、键鼠、显示器、小家电场景图',
    size: '2560x1440',
    needsProductImage: true,
    prompt: `把参考数码商品放入真实桌面办公场景。
保留：产品外观、颜色、接口、LOGO、屏幕边框和关键部件准确，不改变设计。
场景：整洁办公桌、电脑、台灯、笔记本、收纳和少量绿植，商品作为主角清晰可见。
光线：自然窗光结合柔和桌面灯光，画面现代、专业、可信。
限制：不要生成虚假界面、品牌联名、价格、乱码文字和不合理线缆。`
  },
  {
    id: 'baby-safe-soft-scene',
    category: 'scene',
    name: '母婴安全温暖场景',
    description: '适合婴童用品、喂养用品、护理用品',
    size: '2048x2048',
    needsProductImage: true,
    prompt: `生成一张母婴用品温暖生活场景图。
保留：参考商品外观、颜色、材质、包装、LOGO 和安全提示文字准确，不改变产品。
场景：干净婴儿房、柔软毯子、浅色木质家具、温暖自然光，表现安全、柔和、安心。
构图：产品清晰为主，婴儿或家长元素可作为弱背景，不遮挡商品。
限制：不要虚构安全认证、医疗功效、适用年龄和乱码文字。`
  },
  {
    id: 'toy-colorful-gift-scene',
    category: 'scene',
    name: '玩具彩色礼物图',
    description: '适合玩具、儿童文具、益智产品场景图',
    size: '2048x2048',
    needsProductImage: true,
    prompt: `生成一张儿童玩具彩色礼物场景图。
保留：玩具形状、颜色、零件、包装文字、LOGO 和关键结构，不改变产品外观。
场景：明亮儿童房、彩色地垫、收纳盒、礼物氛围或亲子玩耍背景，画面快乐但不杂乱。
构图：产品完整清晰，适合主图或详情页场景模块。
限制：不要生成危险小零件、错误年龄标识、虚假认证和乱码文字。`
  },
  {
    id: 'baby-product-material-detail',
    category: 'detail',
    name: '母婴材质细节',
    description: '展示硅胶、棉布、塑料、边角工艺等细节',
    size: '2048x2048',
    needsProductImage: true,
    prompt: `生成一张母婴用品材质细节图。
要求：突出参考商品的柔软边缘、食品级硅胶质感、棉布纹理、圆角、防滑底、卡扣或清洁结构。
保留：产品颜色、材质、结构、标签和包装信息准确，不改变设计。
构图：局部特写，柔和明亮，背景干净，体现安全、亲肤、易清洁。
限制：不要虚构检测报告、医疗效果、认证标识和乱码文字。`
  },
  {
    id: 'jewelry-macro-luxury-detail',
    category: 'detail',
    name: '珠宝微距质感',
    description: '适合戒指、项链、耳饰、手链展示金属和宝石细节',
    size: '2048x2048',
    needsProductImage: true,
    prompt: `生成一张珠宝首饰微距详情图。
保留：参考首饰的款式、金属颜色、宝石形状、镶嵌结构、刻字、LOGO 和比例准确，不改变设计。
构图：微距商业摄影，突出金属反光、宝石切面、镶爪、链节或纹理细节，背景高级简洁。
光线：柔和高光和轮廓光，反光干净，宝石通透但不过度夸张。
限制：不要虚构材质等级、克拉数、证书编号、品牌和乱码文字。`
  },
  {
    id: 'jewelry-model-wearing',
    category: 'scene',
    name: '珠宝佩戴展示',
    description: '适合首饰上身、耳饰佩戴、项链锁骨图',
    size: '1440x2560',
    needsProductImage: true,
    prompt: `根据参考珠宝首饰生成一张模特佩戴展示图。
保留：首饰款式、宝石颜色、金属材质、链条长度、吊坠形状和关键细节准确，不改款。
模特：自然真实，肤色和姿态适合商品定位，耳朵、手部、锁骨或手腕部位清晰。
场景：干净高级影棚或轻奢生活背景，首饰为视觉焦点。
限制：不要生成错误佩戴结构、夸大宝石尺寸、虚假证书文字和竞品品牌。`
  },
  {
    id: 'jewelry-gift-box-scene',
    category: 'scene',
    name: '珠宝礼盒场景',
    description: '适合首饰礼盒、节日送礼和高客单主图',
    size: '2048x2048',
    needsProductImage: true,
    prompt: `生成一张珠宝礼盒送礼场景图。
保留：参考首饰和礼盒的形状、颜色、材质、LOGO、内衬和包装细节准确。
场景：丝绒盒、浅色大理石、柔和花材、丝带或节日礼物氛围，画面精致克制。
光线：高级商业摄影，金属高光清楚，宝石反光真实。
限制：不要添加不存在的品牌授权、证书编号、价格、促销文字和乱码。`
  },
  {
    id: 'sports-action-scene',
    category: 'scene',
    name: '运动动感场景',
    description: '适合运动装备、服饰、鞋类和健身用品',
    size: '1440x2560',
    needsProductImage: true,
    prompt: `生成一张运动户外商品动感场景图。
保留：参考商品外观、颜色、LOGO、材质和关键结构准确，不改变产品。
场景：跑步、健身房、球场、骑行或户外运动环境，商品在动作中清晰可见。
画面：速度感、自然汗水、阳光或场馆灯光，背景有运动氛围但不抢主体。
限制：不要虚构专业认证、夸张性能、竞品标识、错误文字和不合理人体动作。`
  },
  {
    id: 'outdoor-gear-camping-scene',
    category: 'scene',
    name: '户外露营装备图',
    description: '适合帐篷、背包、水壶、露营灯和户外用品',
    size: '2560x1440',
    needsProductImage: true,
    prompt: `把参考户外商品放入真实露营或徒步场景。
保留：商品形状、颜色、材质、LOGO、扣具、拉链、容量结构和关键细节准确。
场景：营地、草地、山路、木桌、帐篷或车边露营环境，商品使用方式清楚。
光线：清晨或傍晚自然光，画面真实、有户外质感。
限制：不要虚构防水等级、容量参数、极限环境表现和乱码文字。`
  },
  {
    id: 'sports-waterproof-durable-detail',
    category: 'detail',
    name: '运动耐用细节',
    description: '展示防水、防滑、耐磨、扣具和结构细节',
    size: '2048x2048',
    needsProductImage: true,
    prompt: `生成一张运动户外商品耐用细节图。
要求：突出参考商品的防滑纹路、耐磨面料、拉链、扣具、缝线、鞋底、握把或防水表面水珠。
保留：真实结构、颜色、材质和品牌细节，不新增不存在的零件。
构图：局部特写，侧光突出纹理，可有少量水滴、泥土或户外质感作为辅助。
限制：不要虚构检测数据、极限参数、认证标识和乱码文字。`
  },
  {
    id: 'pet-product-home-scene',
    category: 'scene',
    name: '宠物家居使用场景',
    description: '适合宠物窝、食盆、玩具、牵引用品',
    size: '2048x2048',
    needsProductImage: true,
    prompt: `生成一张宠物用品家居使用场景图。
保留：参考商品外观、颜色、材质、LOGO、包装和结构准确，不改变产品。
场景：干净客厅、阳台或宠物角，宠物自然靠近或使用商品，画面温暖可信。
构图：商品清晰可见，宠物不遮挡关键卖点，背景简洁有生活感。
限制：不要虚构适用品种、医疗功效、训练效果、价格和乱码文字。`
  },
  {
    id: 'pet-food-packaging-main',
    category: 'main-image',
    name: '宠物食品包装主图',
    description: '适合猫粮、狗粮、零食、营养品包装主图',
    size: '2048x2048',
    needsProductImage: true,
    prompt: `生成一张宠物食品包装电商主图。
保留：包装袋或罐体形状、颜色、LOGO、标签、口味和关键文字准确，不改变包装设计。
背景：干净浅色影棚，可加入少量真实颗粒、肉干、食盆或宠物脚印元素辅助，但包装必须是主体。
光线：均匀明亮，包装边缘清晰，质感真实。
限制：不要虚构成分、营养功效、认证标识、价格和乱码文字。`
  },
  {
    id: 'pet-toy-flatlay-bundle',
    category: 'scene',
    name: '宠物玩具套装平铺',
    description: '适合宠物玩具、清洁用品、牵引套装组合图',
    size: '2048x2048',
    needsProductImage: true,
    prompt: `生成一张宠物用品套装平铺图。
保留：参考商品的颜色、形状、材质、配件数量、包装和品牌细节准确。
构图：俯拍平铺，围绕主体搭配少量同类用品，如玩具、梳子、牵引绳、食盆或收纳袋，排列清楚。
背景：浅色地毯、木地板或干净桌面，画面温暖、整洁、适合详情页。
限制：不要虚构套装内容，不要加入无关品牌，不要生成乱码文字。`
  },
  {
    id: 'new-year-red-gold-poster',
    category: 'poster',
    name: '年货节红金海报',
    description: '适合年货、礼盒、食品、家居和美妆春节促销',
    size: '1440x2560',
    needsProductImage: true,
    prompt: `生成一张年货节红金电商海报底图。
保留：参考商品外观、包装、LOGO、颜色和关键文字准确，产品必须清晰完整。
氛围：红金节庆、礼盒、灯笼、窗花、丝带或团圆餐桌元素，热闹但不杂乱。
构图：竖版海报，产品为中心，预留标题、卖点和价格区域供后期排版。
限制：不要直接生成价格、平台标识、虚假折扣、生肖版权形象和乱码文字。`
  },
  {
    id: 'valentine-romantic-gift-poster',
    category: 'poster',
    name: '情人节送礼海报',
    description: '适合美妆、珠宝、香氛、礼盒类浪漫营销图',
    size: '1440x2560',
    needsProductImage: true,
    prompt: `生成一张情人节送礼电商海报底图。
保留：参考商品包装、LOGO、颜色、材质和关键细节准确，不改变商品。
氛围：粉色、红色或高级暖色系，玫瑰、丝带、礼盒、柔光和浪漫桌面氛围，商品是主视觉。
构图：竖版海报，留出标题和活动信息位置，适合短视频封面和活动页。
限制：不要生成具体价格、承诺性文案、错误品牌、乱码文字和版权角色。`
  },
  {
    id: 'launch-clean-ad-poster',
    category: 'poster',
    name: '新品上市清爽海报',
    description: '适合新品首发、上新、预售和信息流投放',
    size: '1440x2560',
    needsProductImage: true,
    prompt: `生成一张新品上市电商广告海报底图。
保留：参考商品外观、包装、颜色、LOGO、文字和结构准确，不改变产品。
风格：清爽现代，有新品感和品牌感，可使用浅色渐变、几何台面、光影层次和少量道具。
构图：竖版信息流广告，产品突出，预留标题、卖点和行动按钮区域。
限制：不要生成具体价格、虚假首发信息、平台标识、夸张功效和乱码文字。`
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
