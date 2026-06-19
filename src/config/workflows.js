/**
 * Workflow Templates Configuration | 工作流模板配置
 * 预设工作流模板，支持一键添加到画布
 */
import workflowCover1 from '@/assets/workflow01.jpeg'
import workflowCover2 from '@/assets/workflow02.jpeg'

import scene01 from '@/assets/scene01.jpeg'
import shot01 from '@/assets/shot01.jpeg'
import yingxiaoCover from '@/assets/yingxiao.png'

// Multi-angle prompts | 多角度提示词模板
export const MULTI_ANGLE_PROMPTS = {
  front: {
    label: '正视',
    english: 'Front View',
    prompt: (character) => `使用提供的图片，生成四宫格分镜，每张四宫格包括人物正面对着镜头的4个景别（远景、中景、近景、和局部特写），保持场景、产品、人物特征的一致性，宫格里的每一张照片保持和提供图片相同的比例。并在图片下方用英文标注这个景别

角色参考: ${character}`
  },
  side: {
    label: '侧视',
    english: 'Side View', 
    prompt: (character) => `使用提供的图片，分别生成四宫格分镜，每张四宫格包括人物侧面角度的4个景别（远景、中景、近景、和局部特写），保持场景、产品、人物特征的一致性，宫格里的每一张照片保持和提供图片相同的比例。并在图片下方用英文标注这个景别

角色参考: ${character}`
  },
  back: {
    label: '后视',
    english: 'Back View',
    prompt: (character) => `使用提供的图片，分别生成四宫格分镜，每张四宫格包括人物背影角度的4个景别（远景、中景、近景、和局部特写），保持场景、产品、人物特征的一致性，宫格里的每一张照片保持和提供图片相同的比例。并在图片下方用英文标注这个景别

角色参考: ${character}`
  },
  top: {
    label: '俯视',
    english: 'Top/Bird\'s Eye View',
    prompt: (character) => `使用提供的图片，分别生成四宫格分镜，每张四宫格包括俯视角度的4个景别（远景、中景、近景、和局部特写），保持场景、产品、人物特征的一致性，宫格里的每一张照片保持和提供图片相同的比例。并在图片下方用英文标注这个景别

角色参考: ${character}`
  }
}

/**
 * Workflow Templates | 工作流模板
 */
export const WORKFLOW_TEMPLATES = [
  {
    id: 'multi-angle-storyboard',
    name: '多角度分镜',
    description: '生成角色的正视、侧视、后视、俯视四宫格分镜图',
    icon: 'GridOutline',
    category: 'storyboard',
    cover: workflowCover1,
    createNodes: (startPosition) => {
      const nodeSpacing = 400
      const rowSpacing = 280
      const angles = ['front', 'side', 'back', 'top']
      
      const nodes = []
      const edges = []
      let nodeIdCounter = 0
      const getNodeId = () => `workflow_node_${Date.now()}_${nodeIdCounter++}`
      
      const characterTextId = getNodeId()
      nodes.push({
        id: characterTextId,
        type: 'text',
        position: { x: startPosition.x, y: startPosition.y + rowSpacing * 1.5 },
        data: {
          content: '',
          label: '角色提示词'
        }
      })
      
      const characterConfigId = getNodeId()
      nodes.push({
        id: characterConfigId,
        type: 'imageConfig',
        position: { x: startPosition.x + nodeSpacing, y: startPosition.y + rowSpacing * 1.5 },
        data: {
          label: '主角色图',
          model: 'doubao-seedream-4-5-251128',
          size: '2048x2048'
        }
      })
      
      const characterImageId = getNodeId()
      nodes.push({
        id: characterImageId,
        type: 'image',
        position: { x: startPosition.x + nodeSpacing * 2, y: startPosition.y + rowSpacing * 1.5 },
        data: {
          url: '',
          label: '角色图结果'
        }
      })
      
      edges.push({
        id: `edge_${characterTextId}_${characterConfigId}`,
        source: characterTextId,
        target: characterConfigId,
        sourceHandle: 'right',
        targetHandle: 'left'
      })
      
      edges.push({
        id: `edge_${characterConfigId}_${characterImageId}`,
        source: characterConfigId,
        target: characterImageId,
        sourceHandle: 'right',
        targetHandle: 'left'
      })
      
      const angleX = startPosition.x + nodeSpacing * 3 + 100
      
      angles.forEach((angleKey, index) => {
        const angleConfig = MULTI_ANGLE_PROMPTS[angleKey]
        const angleY = startPosition.y + index * rowSpacing
        let currentX = angleX
        
        const textNodeId = getNodeId()
        nodes.push({
          id: textNodeId,
          type: 'text',
          position: { x: currentX, y: angleY },
          data: {
            content: angleConfig.prompt(''),
            label: `${angleConfig.label}提示词`
          }
        })
        currentX += nodeSpacing
        
        const configNodeId = getNodeId()
        nodes.push({
          id: configNodeId,
          type: 'imageConfig',
          position: { x: currentX, y: angleY },
          data: {
            label: `${angleConfig.label} (${angleConfig.english})`,
            model: 'doubao-seedream-4-5-251128',
            size: '2048x2048'
          }
        })
        
        edges.push({
          id: `edge_${textNodeId}_${configNodeId}`,
          source: textNodeId,
          target: configNodeId,
          type: 'promptOrder',
          data: { promptOrder: 1 },
          sourceHandle: 'right',
          targetHandle: 'left'
        })
        
        edges.push({
          id: `edge_${characterImageId}_${configNodeId}`,
          source: characterImageId,
          target: configNodeId,
          type: 'imageOrder',
          data: { imageOrder: 1 },
          sourceHandle: 'right',
          targetHandle: 'left'
        })
      })
      
      return { nodes, edges }
    }
  },
  {
    id: 'product-ecommerce-full-set',
    name: '通用产品全套电商图',
    description: '根据产品信息和图片，生成模特图、侧面展示图、俯瞰展示图',
    icon: 'ShoppingOutline',
    category: 'ecommerce',
    cover: workflowCover2,
    createNodes: (startPosition) => {
      const colSpacing = 500
      const rowSpacing = 350
      
      const nodes = []
      const edges = []
      let nodeIdCounter = 0
      const getNodeId = () => `workflow_node_${Date.now()}_${nodeIdCounter++}`
      
      const nodeA_productInfoId = getNodeId()
      nodes.push({
        id: nodeA_productInfoId,
        type: 'text',
        position: { x: startPosition.x, y: startPosition.y },
        data: {
          content: 'Soundcore by Anker P20i真无线耳机，10mm驱动单元带来强劲低音，蓝牙5.3，30小时超长续航，防水，2个麦克风实现AI清晰通话，22种预设均衡器，可通过App定制',
          label: '产品信息'
        }
      })
      
      const nodeB_productImageId = getNodeId()
      nodes.push({
        id: nodeB_productImageId,
        type: 'image',
        position: { x: startPosition.x, y: startPosition.y + rowSpacing },
        data: {
          url: 'https://ffile.chatfire.site/image/covers/product01.jpg',
          label: '产品图片'
        }
      })
      
      const nodeC_modelPromptId = getNodeId()
      nodes.push({
        id: nodeC_modelPromptId,
        type: 'text',
        position: { x: startPosition.x + colSpacing, y: startPosition.y },
        data: {
          content: '根据产品特性，生成一个适合展示该产品且时尚富有高级感的模特图，彩色人像，背景是白底，人物居中，欧美人优先',
          label: '模特图提示词'
        }
      })
      
      const nodeD_sidePromptId = getNodeId()
      nodes.push({
        id: nodeD_sidePromptId,
        type: 'text',
        position: { x: startPosition.x + colSpacing, y: startPosition.y + rowSpacing },
        data: {
          content: '根据产品图和产品信息，生成左侧侧面45度的展示图，高清展示侧面的产品形状和细节，保持产品不变形',
          label: '侧面展示图提示词'
        }
      })
      
      const nodeE_topPromptId = getNodeId()
      nodes.push({
        id: nodeE_topPromptId,
        type: 'text',
        position: { x: startPosition.x + colSpacing, y: startPosition.y + rowSpacing * 2 },
        data: {
          content: '根据产品图和产品信息，生成从上往下俯瞰的产品展示图，高清展示俯瞰角度的产品形状和细节，保持产品不变形',
          label: '俯瞰展示图提示词'
        }
      })
      
      const nodeF_explodedPromptId = getNodeId()
      nodes.push({
        id: nodeF_explodedPromptId,
        type: 'text',
        position: { x: startPosition.x + colSpacing, y: startPosition.y + rowSpacing * 3 },
        data: {
          content: '根据产品材质功能，生成一张产品核心部件的结构示意图，要展现出产品核心部件的内部构造，画面清晰呈现产品关键部件，背景为简洁的浅色调，同时包含核心卖点文案',
          label: '拆解图提示词'
        }
      })
      
      const modelConfigId = getNodeId()
      nodes.push({
        id: modelConfigId,
        type: 'imageConfig',
        position: { x: startPosition.x + colSpacing * 2, y: startPosition.y },
        data: {
          label: '生成模特图',
          model: 'doubao-seedream-4-5-251128',
          size: '2048x2048'
        }
      })
      
      const sideConfigId = getNodeId()
      nodes.push({
        id: sideConfigId,
        type: 'imageConfig',
        position: { x: startPosition.x + colSpacing * 2, y: startPosition.y + rowSpacing },
        data: {
          label: '侧面展示图',
          model: 'doubao-seedream-4-5-251128',
          size: '2048x2048'
        }
      })
      
      const topConfigId = getNodeId()
      nodes.push({
        id: topConfigId,
        type: 'imageConfig',
        position: { x: startPosition.x + colSpacing * 2, y: startPosition.y + rowSpacing * 2 },
        data: {
          label: '俯瞰展示图',
          model: 'doubao-seedream-4-5-251128',
          size: '2048x2048'
        }
      })
      
      const explodedConfigId = getNodeId()
      nodes.push({
        id: explodedConfigId,
        type: 'imageConfig',
        position: { x: startPosition.x + colSpacing * 2, y: startPosition.y + rowSpacing * 3 },
        data: {
          label: '拆解图',
          model: 'doubao-seedream-4-5-251128',
          size: '2048x2048'
        }
      })
      
      edges.push({ id: `edge_${nodeA_productInfoId}_${modelConfigId}`, source: nodeA_productInfoId, target: modelConfigId, type: 'promptOrder', data: { promptOrder: 1 }, sourceHandle: 'right', targetHandle: 'left' })
      edges.push({ id: `edge_${nodeB_productImageId}_${modelConfigId}`, source: nodeB_productImageId, target: modelConfigId, type: 'imageOrder', data: { imageOrder: 1 }, sourceHandle: 'right', targetHandle: 'left' })
      edges.push({ id: `edge_${nodeC_modelPromptId}_${modelConfigId}`, source: nodeC_modelPromptId, target: modelConfigId, type: 'promptOrder', data: { promptOrder: 2 }, sourceHandle: 'right', targetHandle: 'left' })
      
      edges.push({ id: `edge_${nodeA_productInfoId}_${sideConfigId}`, source: nodeA_productInfoId, target: sideConfigId, type: 'promptOrder', data: { promptOrder: 1 }, sourceHandle: 'right', targetHandle: 'left' })
      edges.push({ id: `edge_${nodeB_productImageId}_${sideConfigId}`, source: nodeB_productImageId, target: sideConfigId, type: 'imageOrder', data: { imageOrder: 1 }, sourceHandle: 'right', targetHandle: 'left' })
      edges.push({ id: `edge_${nodeD_sidePromptId}_${sideConfigId}`, source: nodeD_sidePromptId, target: sideConfigId, type: 'promptOrder', data: { promptOrder: 2 }, sourceHandle: 'right', targetHandle: 'left' })
      
      edges.push({ id: `edge_${nodeA_productInfoId}_${topConfigId}`, source: nodeA_productInfoId, target: topConfigId, type: 'promptOrder', data: { promptOrder: 1 }, sourceHandle: 'right', targetHandle: 'left' })
      edges.push({ id: `edge_${nodeB_productImageId}_${topConfigId}`, source: nodeB_productImageId, target: topConfigId, type: 'imageOrder', data: { imageOrder: 1 }, sourceHandle: 'right', targetHandle: 'left' })
      edges.push({ id: `edge_${nodeE_topPromptId}_${topConfigId}`, source: nodeE_topPromptId, target: topConfigId, type: 'promptOrder', data: { promptOrder: 2 }, sourceHandle: 'right', targetHandle: 'left' })
      
      edges.push({ id: `edge_${nodeA_productInfoId}_${explodedConfigId}`, source: nodeA_productInfoId, target: explodedConfigId, type: 'promptOrder', data: { promptOrder: 1 }, sourceHandle: 'right', targetHandle: 'left' })
      edges.push({ id: `edge_${nodeB_productImageId}_${explodedConfigId}`, source: nodeB_productImageId, target: explodedConfigId, type: 'imageOrder', data: { imageOrder: 1 }, sourceHandle: 'right', targetHandle: 'left' })
      edges.push({ id: `edge_${nodeF_explodedPromptId}_${explodedConfigId}`, source: nodeF_explodedPromptId, target: explodedConfigId, type: 'promptOrder', data: { promptOrder: 2 }, sourceHandle: 'right', targetHandle: 'left' })
      
      return { nodes, edges }
    }
  },
  {
    id: 'drama-character-design',
    name: '短剧角色设计',
    description: '根据角色描述生成一致性角色形象，后续多角度图依赖正面图保持一致性',
    icon: 'PersonOutline',
    category: 'drama',
    cover: shot01,
    createNodes: (startPosition) => {
      const colSpacing = 400
      const rowSpacing = 280
      
      const nodes = []
      const edges = []
      let nodeIdCounter = 0
      const getNodeId = () => `workflow_node_${Date.now()}_${nodeIdCounter++}`
      
      const characterDescId = getNodeId()
      nodes.push({
        id: characterDescId,
        type: 'text',
        position: { x: startPosition.x, y: startPosition.y },
        data: {
          content: '角色名称：林小雨\n性别：女\n年龄：22岁\n外貌特征：长发及腰，眼睛明亮有神，皮肤白皙，身材高挑\n服装风格：现代都市风，白色连衣裙\n性格特点：温柔善良，内心坚强',
          label: '角色描述'
        }
      })
      
      const styleRefId = getNodeId()
      nodes.push({
        id: styleRefId,
        type: 'image',
        position: { x: startPosition.x, y: startPosition.y + rowSpacing },
        data: {
          url: '',
          label: '风格参考图（可选）'
        }
      })
      
      const frontPromptId = getNodeId()
      nodes.push({
        id: frontPromptId,
        type: 'text',
        position: { x: startPosition.x + colSpacing, y: startPosition.y },
        data: {
          content: '根据角色描述，生成角色的正面全身照，人物居中，白色简洁背景，高清写实风格，电影级画质',
          label: '正面全身提示词'
        }
      })
      
      const frontConfigId = getNodeId()
      nodes.push({
        id: frontConfigId,
        type: 'imageConfig',
        position: { x: startPosition.x + colSpacing * 2, y: startPosition.y },
        data: {
          label: '生成正面全身图',
          model: 'doubao-seedream-4-5-251128',
          size: '1440x2560'
        }
      })
      
      const frontResultId = getNodeId()
      nodes.push({
        id: frontResultId,
        type: 'image',
        position: { x: startPosition.x + colSpacing * 3, y: startPosition.y },
        data: {
          url: '',
          label: '正面角色图（参考基准）'
        }
      })
      
      const sidePromptId = getNodeId()
      nodes.push({
        id: sidePromptId,
        type: 'text',
        position: { x: startPosition.x + colSpacing * 3 + 100, y: startPosition.y + rowSpacing },
        data: {
          content: '参考提供的角色正面图，保持人物外貌、服装完全一致，生成角色的侧面半身照，45度角侧脸，展示五官轮廓，白色简洁背景，高清写实风格',
          label: '侧面半身提示词'
        }
      })
      
      const closeupPromptId = getNodeId()
      nodes.push({
        id: closeupPromptId,
        type: 'text',
        position: { x: startPosition.x + colSpacing * 3 + 100, y: startPosition.y + rowSpacing * 2 },
        data: {
          content: '参考提供的角色正面图，保持人物五官、发型完全一致，生成角色的面部特写，展示多种表情（微笑、严肃、惊讶、悲伤），四宫格布局，高清写实风格',
          label: '表情特写提示词'
        }
      })
      
      const backPromptId = getNodeId()
      nodes.push({
        id: backPromptId,
        type: 'text',
        position: { x: startPosition.x + colSpacing * 3 + 100, y: startPosition.y + rowSpacing * 3 },
        data: {
          content: '参考提供的角色正面图，保持人物发型、服装、身材完全一致，生成角色的背面全身照，展示背影，白色简洁背景，高清写实风格',
          label: '背面全身提示词'
        }
      })
      
      const sideConfigId = getNodeId()
      nodes.push({
        id: sideConfigId,
        type: 'imageConfig',
        position: { x: startPosition.x + colSpacing * 4 + 100, y: startPosition.y + rowSpacing },
        data: {
          label: '侧面半身图',
          model: 'doubao-seedream-4-5-251128',
          size: '2048x2048'
        }
      })
      
      const closeupConfigId = getNodeId()
      nodes.push({
        id: closeupConfigId,
        type: 'imageConfig',
        position: { x: startPosition.x + colSpacing * 4 + 100, y: startPosition.y + rowSpacing * 2 },
        data: {
          label: '表情特写图',
          model: 'doubao-seedream-4-5-251128',
          size: '2048x2048'
        }
      })
      
      const backConfigId = getNodeId()
      nodes.push({
        id: backConfigId,
        type: 'imageConfig',
        position: { x: startPosition.x + colSpacing * 4 + 100, y: startPosition.y + rowSpacing * 3 },
        data: {
          label: '背面全身图',
          model: 'doubao-seedream-4-5-251128',
          size: '1440x2560'
        }
      })
      
      edges.push({ id: `edge_${characterDescId}_${frontConfigId}`, source: characterDescId, target: frontConfigId, type: 'promptOrder', data: { promptOrder: 1 }, sourceHandle: 'right', targetHandle: 'left' })
      edges.push({ id: `edge_${styleRefId}_${frontConfigId}`, source: styleRefId, target: frontConfigId, type: 'imageOrder', data: { imageOrder: 1 }, sourceHandle: 'right', targetHandle: 'left' })
      edges.push({ id: `edge_${frontPromptId}_${frontConfigId}`, source: frontPromptId, target: frontConfigId, type: 'promptOrder', data: { promptOrder: 2 }, sourceHandle: 'right', targetHandle: 'left' })
      edges.push({ id: `edge_${frontConfigId}_${frontResultId}`, source: frontConfigId, target: frontResultId, sourceHandle: 'right', targetHandle: 'left' })
      
      edges.push({ id: `edge_${frontResultId}_${sideConfigId}`, source: frontResultId, target: sideConfigId, type: 'imageOrder', data: { imageOrder: 1 }, sourceHandle: 'right', targetHandle: 'left' })
      edges.push({ id: `edge_${frontResultId}_${closeupConfigId}`, source: frontResultId, target: closeupConfigId, type: 'imageOrder', data: { imageOrder: 1 }, sourceHandle: 'right', targetHandle: 'left' })
      edges.push({ id: `edge_${frontResultId}_${backConfigId}`, source: frontResultId, target: backConfigId, type: 'imageOrder', data: { imageOrder: 1 }, sourceHandle: 'right', targetHandle: 'left' })
      
      edges.push({ id: `edge_${sidePromptId}_${sideConfigId}`, source: sidePromptId, target: sideConfigId, type: 'promptOrder', data: { promptOrder: 1 }, sourceHandle: 'right', targetHandle: 'left' })
      edges.push({ id: `edge_${closeupPromptId}_${closeupConfigId}`, source: closeupPromptId, target: closeupConfigId, type: 'promptOrder', data: { promptOrder: 1 }, sourceHandle: 'right', targetHandle: 'left' })
      edges.push({ id: `edge_${backPromptId}_${backConfigId}`, source: backPromptId, target: backConfigId, type: 'promptOrder', data: { promptOrder: 1 }, sourceHandle: 'right', targetHandle: 'left' })
      
      return { nodes, edges }
    }
  },
  {
    id: 'drama-scene-background',
    name: '多时段场景背景',
    description: '先生成基础场景，再基于基础场景生成多时段变体，保持场景一致性',
    icon: 'ImageOutline',
    category: 'drama',
    cover: scene01,
    createNodes: (startPosition) => {
      const colSpacing = 400
      const rowSpacing = 260
      
      const nodes = []
      const edges = []
      let nodeIdCounter = 0
      const getNodeId = () => `workflow_node_${Date.now()}_${nodeIdCounter++}`
      
      const sceneDescId = getNodeId()
      nodes.push({
        id: sceneDescId,
        type: 'text',
        position: { x: startPosition.x, y: startPosition.y },
        data: {
          content: '场景名称：现代都市街道\n位置：繁华商业区主街道\n环境特征：高楼大厦林立，霓虹灯招牌，车水马龙\n氛围：都市繁华、现代感强\n特殊元素：咖啡店、书店、商场入口',
          label: '场景描述'
        }
      })
      
      const basePromptId = getNodeId()
      nodes.push({
        id: basePromptId,
        type: 'text',
        position: { x: startPosition.x + colSpacing, y: startPosition.y },
        data: {
          content: '根据场景描述，生成白天正午时段的场景背景作为基准，阳光明媚，光线充足均匀，展示场景全貌和所有环境元素，纯背景无人物，电影级画质，宽屏构图',
          label: '基础场景提示词'
        }
      })
      
      const baseConfigId = getNodeId()
      nodes.push({
        id: baseConfigId,
        type: 'imageConfig',
        position: { x: startPosition.x + colSpacing * 2, y: startPosition.y },
        data: {
          label: '生成基础场景',
          model: 'doubao-seedream-4-5-251128',
          size: '2560x1440'
        }
      })
      
      const baseResultId = getNodeId()
      nodes.push({
        id: baseResultId,
        type: 'image',
        position: { x: startPosition.x + colSpacing * 3, y: startPosition.y },
        data: {
          url: '',
          label: '基础场景图（参考基准）'
        }
      })
      
      const eveningPromptId = getNodeId()
      nodes.push({
        id: eveningPromptId,
        type: 'text',
        position: { x: startPosition.x + colSpacing * 3 + 100, y: startPosition.y + rowSpacing },
        data: {
          content: '参考提供的基础场景图，保持场景构图、建筑、环境元素完全一致，仅改变光照为傍晚时段：夕阳西下，天空呈橙红色渐变，光线柔和温暖，建筑投射长影',
          label: '傍晚场景提示词'
        }
      })
      
      const nightPromptId = getNodeId()
      nodes.push({
        id: nightPromptId,
        type: 'text',
        position: { x: startPosition.x + colSpacing * 3 + 100, y: startPosition.y + rowSpacing * 2 },
        data: {
          content: '参考提供的基础场景图，保持场景构图、建筑、环境元素完全一致，仅改变光照为夜晚时段：霓虹灯亮起，城市灯光璀璨，天空深蓝或黑色，窗户透出暖光',
          label: '夜晚场景提示词'
        }
      })
      
      const rainPromptId = getNodeId()
      nodes.push({
        id: rainPromptId,
        type: 'text',
        position: { x: startPosition.x + colSpacing * 3 + 100, y: startPosition.y + rowSpacing * 3 },
        data: {
          content: '参考提供的基础场景图，保持场景构图、建筑、环境元素完全一致，仅改变天气为雨天：细雨绵绵，地面湿润有倒影，天空阴沉灰暗，氛围忧郁',
          label: '雨天场景提示词'
        }
      })
      
      const eveningConfigId = getNodeId()
      nodes.push({
        id: eveningConfigId,
        type: 'imageConfig',
        position: { x: startPosition.x + colSpacing * 4 + 100, y: startPosition.y + rowSpacing },
        data: {
          label: '傍晚场景',
          model: 'doubao-seedream-4-5-251128',
          size: '2560x1440'
        }
      })
      
      const nightConfigId = getNodeId()
      nodes.push({
        id: nightConfigId,
        type: 'imageConfig',
        position: { x: startPosition.x + colSpacing * 4 + 100, y: startPosition.y + rowSpacing * 2 },
        data: {
          label: '夜晚场景',
          model: 'doubao-seedream-4-5-251128',
          size: '2560x1440'
        }
      })
      
      const rainConfigId = getNodeId()
      nodes.push({
        id: rainConfigId,
        type: 'imageConfig',
        position: { x: startPosition.x + colSpacing * 4 + 100, y: startPosition.y + rowSpacing * 3 },
        data: {
          label: '雨天场景',
          model: 'doubao-seedream-4-5-251128',
          size: '2560x1440'
        }
      })
      
      edges.push({ id: `edge_${sceneDescId}_${baseConfigId}`, source: sceneDescId, target: baseConfigId, type: 'promptOrder', data: { promptOrder: 1 }, sourceHandle: 'right', targetHandle: 'left' })
      edges.push({ id: `edge_${basePromptId}_${baseConfigId}`, source: basePromptId, target: baseConfigId, type: 'promptOrder', data: { promptOrder: 2 }, sourceHandle: 'right', targetHandle: 'left' })
      edges.push({ id: `edge_${baseConfigId}_${baseResultId}`, source: baseConfigId, target: baseResultId, sourceHandle: 'right', targetHandle: 'left' })
      
      const variantConfigs = [eveningConfigId, nightConfigId, rainConfigId]
      variantConfigs.forEach(configId => {
        edges.push({ id: `edge_${baseResultId}_${configId}`, source: baseResultId, target: configId, type: 'imageOrder', data: { imageOrder: 1 }, sourceHandle: 'right', targetHandle: 'left' })
      })
      
      edges.push({ id: `edge_${eveningPromptId}_${eveningConfigId}`, source: eveningPromptId, target: eveningConfigId, type: 'promptOrder', data: { promptOrder: 1 }, sourceHandle: 'right', targetHandle: 'left' })
      edges.push({ id: `edge_${nightPromptId}_${nightConfigId}`, source: nightPromptId, target: nightConfigId, type: 'promptOrder', data: { promptOrder: 1 }, sourceHandle: 'right', targetHandle: 'left' })
      edges.push({ id: `edge_${rainPromptId}_${rainConfigId}`, source: rainPromptId, target: rainConfigId, type: 'promptOrder', data: { promptOrder: 1 }, sourceHandle: 'right', targetHandle: 'left' })
      
      return { nodes, edges }
    }
  },
  {
    id: 'picture-book-generator',
    name: '儿童绘本生成',
    description: '角色生成 → 剧情文字 → 绘本插画，支持角色一致性',
    icon: 'BookOutline',
    category: 'creative',
    cover: "https://ffile.chatfire.site/image/covers/workflow03.jpeg",
    createNodes: (startPosition) => {
      const colSpacing = 420
      const rowSpacing = 280

      const nodes = []
      const edges = []
      let nodeIdCounter = 0
      const getNodeId = () => `workflow_node_${Date.now()}_${nodeIdCounter++}`

      const storyInputId = getNodeId()
      nodes.push({
        id: storyInputId,
        type: 'text',
        position: { x: startPosition.x, y: startPosition.y },
        data: {
          content: `【绘本名称】小兔子的冒险之旅

【故事主题】勇气与友谊

【主要角色】
1. 小白兔米米 - 主角，白色毛发，粉红色耳朵内侧，穿蓝色背带裤，性格勇敢好奇
2. 小狐狸橙橙 - 伙伴，橙色毛发，白色尾巴尖，戴绿色围巾，聪明机智

【故事梗概】
小白兔米米住在森林边的小木屋里，有一天她发现了一张神秘的藏宝图。在好朋友小狐狸橙橙的陪伴下，她们踏上了寻宝之旅。途中遇到各种挑战，最后发现真正的宝藏是友谊和勇气。

【画风要求】
温馨治愈的水彩绘本风格，色彩明亮柔和，适合3-6岁儿童阅读`,
          label: '故事大纲'
        }
      })

      const characterLLMId = getNodeId()
      nodes.push({
        id: characterLLMId,
        type: 'llmConfig',
        position: { x: startPosition.x + colSpacing, y: startPosition.y - rowSpacing },
        data: {
          label: '角色设计生成',
          systemPrompt: `你是专业的绘本角色设计师。根据故事大纲提取所有角色，为每个角色生成适合图像生成的详细提示词。

输出格式（用换行分隔每个角色）：
[角色名]
[角色图像生成提示词]
---

输出要求：
1. 识别故事中的所有角色（主角、配角等）
2. 提示词包含：外貌特征、服装、表情、姿态、场景
3. 使用绘本水彩风格描述
4. 末尾加上"白色简洁背景，儿童绘本水彩风格，温馨治愈，色彩明亮柔和"
5. 直接输出，不要编号、标题或其他格式标记`,
          model: 'MiniMax-M2.7',
          outputFormat: 'text'
        }
      })

      edges.push({ id: `edge_${storyInputId}_${characterLLMId}`, source: storyInputId, target: characterLLMId, sourceHandle: 'right', targetHandle: 'left' })

      const characterConfigId = getNodeId()
      nodes.push({
        id: characterConfigId,
        type: 'imageConfig',
        position: { x: startPosition.x + colSpacing * 2, y: startPosition.y - rowSpacing },
        data: {
          label: '角色参考图',
          model: 'doubao-seedream-4-5-251128',
          size: '2048x2048'
        }
      })

      edges.push({ id: `edge_${characterLLMId}_${characterConfigId}`, source: characterLLMId, target: characterConfigId, type: 'promptOrder', data: { promptOrder: 1 }, sourceHandle: 'right', targetHandle: 'left' })

      const characterImageId = getNodeId()
      nodes.push({
        id: characterImageId,
        type: 'image',
        position: { x: startPosition.x + colSpacing * 3, y: startPosition.y - rowSpacing },
        data: {
          url: '',
          label: '角色参考图结果'
        }
      })

      edges.push({ id: `edge_${characterConfigId}_${characterImageId}`, source: characterConfigId, target: characterImageId, sourceHandle: 'right', targetHandle: 'left' })

      const storyLLMId = getNodeId()
      nodes.push({
        id: storyLLMId,
        type: 'llmConfig',
        position: { x: startPosition.x + colSpacing, y: startPosition.y + rowSpacing * 0.5 },
        data: {
          label: '剧情拆分',
          systemPrompt: `你是专业的绘本编剧。将故事拆分成绘本页面内容。

输出格式（严格按此格式，换行分割每页）：
第1页：[故事配文] | [插画描述提示词]
第2页：[故事配文] | [插画描述提示词]
...

要求：
1. 根据故事复杂度拆分为4-8页
2. 故事配文简洁温馨，适合3-6岁儿童（每页不超过30字）
3. 插画描述要详细，包含角色外貌特征、动作、场景、色调
4. 每页插画描述末尾加上画风说明以保持一致
5. 故事节奏：开场→发展→高潮→温馨结局`,
          model: 'gpt-4o',
          outputFormat: 'text'
        }
      })

      edges.push({ id: `edge_${storyInputId}_${storyLLMId}`, source: storyInputId, target: storyLLMId, sourceHandle: 'right', targetHandle: 'left' })

      const hintId = getNodeId()
      nodes.push({
        id: hintId,
        type: 'text',
        position: { x: startPosition.x + colSpacing * 2.5, y: startPosition.y + rowSpacing * 0.5 },
        data: {
          content: `操作步骤：
1. 先点击「角色设计生成」的【执行生成】，等待生成所有角色参考图
2. 再点击「剧情拆分」的【执行生成】，等待 LLM 输出剧本
3. 在剧情拆分节点中点击【拆分为绘本页】按钮
4. 系统将自动创建每页的故事文字、插画描述和图片生成节点
5. 每页图片会自动关联角色参考图，保持角色一致性
6. 点击各页的【立即生成】按钮生成绘本插画`,
          label: '📖 操作指南'
        }
      })

      return { nodes, edges }
    }
  },
  {
    id: 'product-detail-page',
    name: '电商产品详情页',
    description: '根据产品信息生成完整的电商详情页素材，包含主图、场景图、细节图、规格信息等',
    icon: 'ShoppingOutline',
    category: 'ecommerce',
    cover: yingxiaoCover,
    createNodes: (startPosition) => {
      const colSpacing = 450
      const rowSpacing = 300
      
      const nodes = []
      const edges = []
      let nodeIdCounter = 0
      const getNodeId = () => `workflow_node_${Date.now()}_${nodeIdCounter++}`
      
      const productInfoId = getNodeId()
      nodes.push({
        id: productInfoId,
        type: 'text',
        position: { x: startPosition.x, y: startPosition.y },
        data: {
          content: `【产品名称】经典五号香水
【品牌】香奈儿
【产品类型】淡香精 EDP
【香调】经典花香调
【规格】50ml / 100ml
【产地】法国
【保质期】5年
【适用场合】日常 / 约会 / 宴会

【产品描述】
经典五号，永恒优雅。
一抹倾心，一生挚爱。

【香调构成】
前调：柑橘、柠檬、橙花
中调：茉莉、玫瑰、依兰
后调：檀香、香根草、香草

【核心卖点】
1. 经典传承，历久弥新
2. 持久留香，6-8小时
3. 优雅花香，层次丰富
4. 精选原料，全球甄选
5. 细腻瓶身，艺术设计
6. 法国制造，品质保证`,
          label: '产品信息'
        }
      })
      
      const productImageId = getNodeId()
      nodes.push({
        id: productImageId,
        type: 'image',
        position: { x: startPosition.x, y: startPosition.y + rowSpacing },
        data: {
          url: '',
          label: '产品原图（用于参考）'
        }
      })
      
      // 主图区域
      const mainPromptId = getNodeId()
      nodes.push({
        id: mainPromptId,
        type: 'text',
        position: { x: startPosition.x + colSpacing, y: startPosition.y },
        data: {
          content: '高端香水产品主图，香水瓶居中放置，金黄色液体，透明瓶身，经典方形设计，搭配白色百合花作为装饰，背景简洁纯净，柔和光线，奢华质感，商业摄影风格',
          label: '主图提示词'
        }
      })
      
      const mainConfigId = getNodeId()
      nodes.push({
        id: mainConfigId,
        type: 'imageConfig',
        position: { x: startPosition.x + colSpacing * 2, y: startPosition.y },
        data: {
          label: '产品主图',
          model: 'doubao-seedream-4-5-251128',
          size: '2048x2048'
        }
      })
      
      edges.push({ id: `edge_${productInfoId}_${mainConfigId}`, source: productInfoId, target: mainConfigId, type: 'promptOrder', data: { promptOrder: 1 }, sourceHandle: 'right', targetHandle: 'left' })
      edges.push({ id: `edge_${productImageId}_${mainConfigId}`, source: productImageId, target: mainConfigId, type: 'imageOrder', data: { imageOrder: 1 }, sourceHandle: 'right', targetHandle: 'left' })
      edges.push({ id: `edge_${mainPromptId}_${mainConfigId}`, source: mainPromptId, target: mainConfigId, type: 'promptOrder', data: { promptOrder: 2 }, sourceHandle: 'right', targetHandle: 'left' })
      
      // 场景图区域
      const scenePromptId = getNodeId()
      nodes.push({
        id: scenePromptId,
        type: 'text',
        position: { x: startPosition.x + colSpacing, y: startPosition.y + rowSpacing },
        data: {
          content: '优雅女性模特手持香水瓶，闭眼陶醉的姿态，展现自信从容的气质，柔和自然光线，简约背景，时尚高端风格，商业人像摄影',
          label: '场景图提示词'
        }
      })
      
      const sceneConfigId = getNodeId()
      nodes.push({
        id: sceneConfigId,
        type: 'imageConfig',
        position: { x: startPosition.x + colSpacing * 2, y: startPosition.y + rowSpacing },
        data: {
          label: '场景模特图',
          model: 'doubao-seedream-4-5-251128',
          size: '1440x2560'
        }
      })
      
      edges.push({ id: `edge_${productInfoId}_${sceneConfigId}`, source: productInfoId, target: sceneConfigId, type: 'promptOrder', data: { promptOrder: 1 }, sourceHandle: 'right', targetHandle: 'left' })
      edges.push({ id: `edge_${scenePromptId}_${sceneConfigId}`, source: scenePromptId, target: sceneConfigId, type: 'promptOrder', data: { promptOrder: 2 }, sourceHandle: 'right', targetHandle: 'left' })
      
      // 香调分解图
      const scentPromptId = getNodeId()
      nodes.push({
        id: scentPromptId,
        type: 'text',
        position: { x: startPosition.x + colSpacing, y: startPosition.y + rowSpacing * 2 },
        data: {
          content: '香水香调分解示意图，分三部分展示前中后调：前调用柠檬橙子橙花表示，中调用茉莉玫瑰依兰表示，后调用檀香香草表示，优雅的花卉植物插画风格，柔和暖色调，白色背景',
          label: '香调分解图提示词'
        }
      })
      
      const scentConfigId = getNodeId()
      nodes.push({
        id: scentConfigId,
        type: 'imageConfig',
        position: { x: startPosition.x + colSpacing * 2, y: startPosition.y + rowSpacing * 2 },
        data: {
          label: '香调分解图',
          model: 'doubao-seedream-4-5-251128',
          size: '2560x1440'
        }
      })
      
      edges.push({ id: `edge_${productInfoId}_${scentConfigId}`, source: productInfoId, target: scentConfigId, type: 'promptOrder', data: { promptOrder: 1 }, sourceHandle: 'right', targetHandle: 'left' })
      edges.push({ id: `edge_${scentPromptId}_${scentConfigId}`, source: scentPromptId, target: scentConfigId, type: 'promptOrder', data: { promptOrder: 2 }, sourceHandle: 'right', targetHandle: 'left' })
      
      // 细节展示区
      const detailPromptId = getNodeId()
      nodes.push({
        id: detailPromptId,
        type: 'text',
        position: { x: startPosition.x + colSpacing, y: startPosition.y + rowSpacing * 3 },
        data: {
          content: '香水瓶细节特写展示，精致瓶盖切割工艺、喷雾设计、瓶身纹理细节，多角度展示产品质感，白色背景，商业产品摄影风格，高清细腻',
          label: '细节图提示词'
        }
      })
      
      const detailConfigId = getNodeId()
      nodes.push({
        id: detailConfigId,
        type: 'imageConfig',
        position: { x: startPosition.x + colSpacing * 2, y: startPosition.y + rowSpacing * 3 },
        data: {
          label: '产品细节图',
          model: 'doubao-seedream-4-5-251128',
          size: '2048x2048'
        }
      })
      
      edges.push({ id: `edge_${productInfoId}_${detailConfigId}`, source: productInfoId, target: detailConfigId, type: 'promptOrder', data: { promptOrder: 1 }, sourceHandle: 'right', targetHandle: 'left' })
      edges.push({ id: `edge_${productImageId}_${detailConfigId}`, source: productImageId, target: detailConfigId, type: 'imageOrder', data: { imageOrder: 1 }, sourceHandle: 'right', targetHandle: 'left' })
      edges.push({ id: `edge_${detailPromptId}_${detailConfigId}`, source: detailPromptId, target: detailConfigId, type: 'promptOrder', data: { promptOrder: 2 }, sourceHandle: 'right', targetHandle: 'left' })
      
      // 礼盒包装图
      const packagePromptId = getNodeId()
      nodes.push({
        id: packagePromptId,
        type: 'text',
        position: { x: startPosition.x + colSpacing, y: startPosition.y + rowSpacing * 4 },
        data: {
          content: '精美礼盒包装展示，香水瓶置于打开的礼盒中，白色简约设计，丝带装饰，高档质感，产品展示摄影，柔和光线',
          label: '礼盒包装提示词'
        }
      })
      
      const packageConfigId = getNodeId()
      nodes.push({
        id: packageConfigId,
        type: 'imageConfig',
        position: { x: startPosition.x + colSpacing * 2, y: startPosition.y + rowSpacing * 4 },
        data: {
          label: '礼盒包装图',
          model: 'doubao-seedream-4-5-251128',
          size: '2048x2048'
        }
      })
      
      edges.push({ id: `edge_${productInfoId}_${packageConfigId}`, source: productInfoId, target: packageConfigId, type: 'promptOrder', data: { promptOrder: 1 }, sourceHandle: 'right', targetHandle: 'left' })
      edges.push({ id: `edge_${packagePromptId}_${packageConfigId}`, source: packagePromptId, target: packageConfigId, type: 'promptOrder', data: { promptOrder: 2 }, sourceHandle: 'right', targetHandle: 'left' })
      
      return { nodes, edges }
    }
  }
]

/**
 * Get workflow template by ID | 根据ID获取工作流模板
 */
export const getWorkflowById = (id) => {
  return WORKFLOW_TEMPLATES.find(w => w.id === id)
}

/**
 * Get workflows by category | 根据分类获取工作流
 */
export const getWorkflowsByCategory = (category) => {
  return WORKFLOW_TEMPLATES.filter(w => w.category === category)
}

export default WORKFLOW_TEMPLATES