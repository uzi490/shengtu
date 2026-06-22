# 商图工坊电商提示词来源审计

审计日期：2026-06-22  
目标：从 GitHub 高认可度 AI 图像提示词仓库中筛选可参考来源，明确哪些可以参考结构、哪些只能学习风格，再把第一批行业模板改写为商图工坊自己的中文电商工作流。

## 审计结论

- 本次只做“来源审计 + 改写参考”，不直接复制外部提示词原文。
- 明确 CC0 的来源可以更放心地参考结构和场景拆法，但仍改写为商图工坊自有中文模板。
- CC BY、MIT 或未在 GitHub API 中明确识别的来源，只学习结构、分类、场景组织、负面约束和工作流形态。
- AGPL 项目只参考功能形态和产品设计思路，不复制代码、不复制界面实现。
- 第一批模板重点覆盖 10 个行业，每个行业 3 个：服装鞋包、美妆护肤、食品饮料、家居家纺、数码家电、母婴玩具、珠宝饰品、运动户外、宠物用品、节日营销。

## 来源清单

| 来源 | Stars / Forks | 许可证识别 | 已审计内容 | 可参考范围 | 适配方向 |
|---|---:|---|---|---|---|
| [EvoLinkAI/awesome-gpt-image-2-API-and-Prompts](https://github.com/EvoLinkAI/awesome-gpt-image-2-API-and-Prompts) | 16868 / 1709 | CC0-1.0 | README、`cases/` 目录、广告创意案例 | 可参考结构并改写 | 广告图、海报、多区域构图、商品图文字预留 |
| [YouMind-OpenLab/awesome-nano-banana-pro-prompts](https://github.com/YouMind-OpenLab/awesome-nano-banana-pro-prompts) | 12591 / 1361 | README badge 标注 CC BY 4.0，GitHub API 未识别 | README、多语言入口、图片预览结构 | 只学习风格，不复制原文 | 大规模行业覆盖、提示词卡片组织、多语言描述 |
| [jimmylv/awesome-nano-banana](https://github.com/JimmyLv/awesome-nano-banana) | 8771 / 885 | README badge 标注 CC BY 4.0，GitHub API 未识别 | README、`cases/` 目录 | 只学习风格，不复制原文 | 图生图编辑、主体一致性、案例化说明 |
| [YouMind-OpenLab/awesome-gpt-image-2](https://github.com/YouMind-OpenLab/awesome-gpt-image-2) | 7699 / 693 | README badge 标注 CC BY 4.0，GitHub API 未识别 | README、中文 README、多语言入口 | 只学习风格，不复制原文 | GPT Image 2 场景覆盖、商业插画、文字渲染注意事项 |
| [jau123/nanobanana-trending-prompts](https://github.com/jau123/nanobanana-trending-prompts) | 645 / 84 | README badge 标注 CC BY 4.0，GitHub API 未识别 | README、`prompts/prompts.json`、`prompts/system-prompt-en.md` | 只学习风格和排序思路，不复制原文 | 热门互动排序、结构化参数、负面约束、技术图和广告图 |
| [devanshug2307/Awesome-AI-Image-Prompts](https://github.com/devanshug2307/Awesome-AI-Image-Prompts) | 205 / 28 | README badge 标注 MIT，GitHub API 未识别 | README、目录分类 | 只学习分类结构，不复制原文 | 产品摄影、食品、美妆、时尚、室内场景 |
| [Super-Maker-AI/awesome-nano-banana](https://github.com/Super-Maker-AI/awesome-nano-banana) | 100 / 12 | GitHub API 未识别 | README、用例说明 | 只学习风格，不复制原文 | 多图融合、主体一致性、自然语言编辑 |
| [formanova-ai/awesome-jewelry-ai](https://github.com/formanova-ai/awesome-jewelry-ai) | 14 / 4 | CC0-1.0 | README、珠宝 AI 资源分类 | 可参考结构并改写 | 珠宝识别、材质、宝石、金属反光、佩戴展示 |
| [302ai/302_ecom_image_generator](https://github.com/302ai/302_ecom_image_generator) | 10 / 9 | AGPL-3.0 | README、中文 README、功能说明 | 只参考功能形态，不复制代码 | 电商场景图、二次打光、任务历史、场景图视频 |
| [cliprise/awesome-ai-product-photography-prompts](https://github.com/cliprise/awesome-ai-product-photography-prompts) | 4 / 0 | GitHub API 未识别 | README、工作流描述 | 只学习工作流框架，不复制原文 | 商品摄影生产流程、QA、变体、最终导出 |

## 可借鉴模式

1. 结构化提示词：把主体、场景、光线、构图、限制项拆开，方便商家理解和模型执行。
2. 负面约束：每个模板都必须明确不要乱码文字、不要虚构功能、不要改变商品、不要抄袭品牌元素。
3. 参考图保真：图生图场景需要强调保留商品形状、颜色、材质、LOGO、包装文字和关键结构。
4. 行业化场景：按服装、美妆、食品、家居、数码、母婴、珠宝、运动、宠物、节日营销拆模板，比单纯“高级感”更适合商家。
5. 工作流化：模板不只是提示词，还要能一键生成“产品信息 + 产品参考图 + 提示词 + 图片配置 + 生成结果”的画布节点。
6. 热门程度参考：高 star 仓库和高互动 prompt 适合判断用户真实关注的视觉形式，但不能把别人的具体文案原样放入商图工坊。

## 只能学习风格的内容

- 社媒采集型 prompt：通常来源复杂，版权和授权不完全清晰，只能学习构图、参数组织和负面约束。
- 多语言大合集：适合看分类和覆盖面，不直接复制具体 prompt。
- AGPL 电商项目：只看功能方向，比如二次打光、历史记录、场景图视频，不复制代码和实现。
- 带品牌、人物、IP、艺术家或平台标识的案例：只抽象为“风格层级、构图、光影”，不保留具体品牌或版权元素。

## 第一批落地策略

- 新增 30 个模板，每个行业 3 个。
- 每个模板都设置 `needsProductImage: true`，默认要求上传商品参考图。
- 每个模板都带保真、安全和商用约束。
- 不新增新分类，继续沿用现有 `main-image`、`scene`、`detail`、`poster`、`background`、`style`。

