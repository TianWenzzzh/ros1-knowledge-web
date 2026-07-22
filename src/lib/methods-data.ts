// 学习方法数据定义

export interface MethodStep {
  title: string;
  description: string;
  duration?: string;
}

export interface MethodExample {
  scenario: string;
  action: string;
  result: string;
}

export interface MethodResource {
  title: string;
  url: string;
  type: 'documentation' | 'tutorial' | 'video' | 'tool';
}

export interface LearningMethod {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: '基础' | '进阶' | '工具';
  difficulty: '入门' | '中级' | '高级';
  estimatedTime: string;
  overview: string;
  whyItWorks: string[];
  steps: MethodStep[];
  tips: string[];
  commonMistakes: string[];
  examples: MethodExample[];
  resources: MethodResource[];
  actionItems: string[];
}

export const methodEntries: LearningMethod[] = [
  {
    id: 'study-plan',
    title: '制定学习计划',
    description: '根据目标和时间，制定可执行的学习路线图',
    icon: '📋',
    category: '基础',
    difficulty: '入门',
    estimatedTime: '30分钟',
    overview: '学习计划是ROS1学习的起点。明确目标、评估现状、规划路径，让学习有的放矢。',
    whyItWorks: [
      '明确目标减少迷茫，知道每天该做什么',
      '分解大目标为小任务，获得持续成就感',
      '预留缓冲时间，应对意外和复习'
    ],
    steps: [
      { title: '明确学习目标', description: '确定你想用ROS1做什么：移动机器人、机械臂、无人机？目标决定学习重点。', duration: '10分钟' },
      { title: '评估现有基础', description: '检查Linux、Python/C++、数学基础，找出需要补强的部分。', duration: '10分钟' },
      { title: '规划学习路径', description: '根据目标选择核心模块：基础→通信→导航/视觉/控制→项目实战。', duration: '10分钟' }
    ],
    tips: [
      '每周安排2-3个固定学习时段，每次1-2小时',
      '每个模块设置明确的验收标准，如"能独立编写Publisher节点"',
      '保留20%缓冲时间用于复习和解决卡点'
    ],
    commonMistakes: [
      '目标过于宏大："精通ROS1"——应改为"完成一个移动机器人项目"',
      '只收藏不执行——计划必须包含具体的每日/每周任务',
      '忽略基础直接学高级功能——Linux和编程基础是前提'
    ],
    examples: [
      { scenario: '目标：3个月完成移动机器人项目', action: '第1月：Linux+Python基础；第2月：ROS通信+TF；第3月：导航栈实战', result: '按阶段推进，每阶段有明确产出' }
    ],
    resources: [
      { title: 'ROS1 Wiki 学习路径', url: 'http://wiki.ros.org/ROS/Tutorials', type: 'documentation' },
      { title: 'The Construct 课程', url: 'https://www.theconstructsim.com/', type: 'tutorial' }
    ],
    actionItems: [
      '写下你的3个月学习目标',
      '列出需要掌握的5个核心技能',
      '创建每周学习时间表'
    ]
  },
  {
    id: 'read-documentation',
    title: '阅读官方文档',
    description: '高效阅读ROS Wiki和API文档，快速获取准确信息',
    icon: '📖',
    category: '基础',
    difficulty: '入门',
    estimatedTime: '持续进行',
    overview: '官方文档是最权威的学习资源。学会快速定位、理解概念、提取关键信息。',
    whyItWorks: [
      '一手信息最准确，避免二手资料的偏差',
      'API文档包含参数细节和边界条件',
      '培养自主解决问题的能力'
    ],
    steps: [
      { title: '定位目标文档', description: '使用wiki.ros.org搜索功能，或通过分类导航找到相关包。', duration: '2分钟' },
      { title: '阅读概述和教程', description: '先读Overview了解功能，再跟Tutorial学习用法。', duration: '10分钟' },
      { title: '查阅API细节', description: '需要具体参数时，查看API文档的字段说明和示例。', duration: '5分钟' }
    ],
    tips: [
      '先快速浏览全篇，再精读关键部分',
      '遇到不懂的概念，先记录后查，不要卡住',
      '收藏常用文档页面，建立个人知识库'
    ],
    commonMistakes: [
      '从头到尾逐字阅读——文档是工具，按需查阅',
      '只看中文翻译——英文原版更准确、更新及时',
      '忽略版本信息——不同ROS版本的API可能有差异'
    ],
    examples: [
      { scenario: '需要了解rospy.Publisher的参数', action: '搜索"rospy Publisher API"，找到参数列表和示例代码', result: '快速掌握queue_size、latch等参数的含义和用法' }
    ],
    resources: [
      { title: 'ROS Wiki', url: 'http://wiki.ros.org/', type: 'documentation' },
      { title: 'rospy API', url: 'http://docs.ros.org/en/noetic/api/rospy/html/', type: 'documentation' },
      { title: 'roscpp API', url: 'http://docs.ros.org/en/noetic/api/roscpp/html/', type: 'documentation' }
    ],
    actionItems: [
      '收藏ROS Wiki到浏览器书签',
      '创建常用API文档的快速访问列表',
      '遇到问题先查官方文档再搜索'
    ]
  },
  {
    id: 'practice-commands',
    title: '终端实操练习',
    description: '通过命令行操作ROS，建立肌肉记忆和直觉',
    icon: '⌨️',
    category: '基础',
    difficulty: '入门',
    estimatedTime: '每天30分钟',
    overview: 'ROS开发离不开终端。熟练使用roscore、rostopic、rosnode等命令是基本功。',
    whyItWorks: [
      '命令行操作快速直接，便于调试',
      '肌肉记忆减少认知负担',
      '脚本化操作提高效率'
    ],
    steps: [
      { title: '启动ROS核心', description: '运行roscore，理解Master的作用。', duration: '1分钟' },
      { title: '运行示例节点', description: '运行turtlesim_node，观察节点和话题。', duration: '2分钟' },
      { title: '使用调试命令', description: '用rostopic list、rosnode list等查看系统状态。', duration: '5分钟' },
      { title: '手动发布消息', description: '用rostopic pub发送消息控制节点。', duration: '5分钟' }
    ],
    tips: [
      '使用Tab键自动补全命令和话题名',
      '用history命令查看历史命令',
      '将常用命令保存为脚本或别名'
    ],
    commonMistakes: [
      '忘记source devel/setup.bash——每次新终端都要执行',
      '不检查节点是否运行就调试——先用rosnode list确认',
      '忽视权限问题——确保有执行权限chmod +x'
    ],
    examples: [
      { scenario: '调试话题通信', action: 'rostopic echo /topic_name 查看消息内容', result: '实时观察数据流，定位问题' }
    ],
    resources: [
      { title: 'ROS命令行工具', url: 'http://wiki.ros.org/ROS/CommandLineTools', type: 'documentation' },
      { title: 'Cheatsheet', url: 'https://github.com/luong-khue/ROS-cheatsheet', type: 'tool' }
    ],
    actionItems: [
      '每天练习10个常用命令',
      '创建个人命令速查表',
      '编写自动化脚本简化重复操作'
    ]
  },
  {
    id: 'debug-errors',
    title: '调试常见问题',
    description: '系统性地排查和解决ROS运行错误',
    icon: '🔍',
    category: '进阶',
    difficulty: '中级',
    estimatedTime: '按需进行',
    overview: '错误是学习的最好机会。建立系统性的调试思维，快速定位和解决问题。',
    whyItWorks: [
      '系统性排查减少盲目尝试',
      '理解错误根因避免重复踩坑',
      '积累经验形成直觉'
    ],
    steps: [
      { title: '复现问题', description: '记录错误信息和触发条件，确保能稳定复现。', duration: '5分钟' },
      { title: '检查日志', description: '查看终端输出、rosout日志，定位错误位置。', duration: '5分钟' },
      { title: '隔离问题', description: '逐个排除可能原因，缩小问题范围。', duration: '10分钟' },
      { title: '搜索解决方案', description: '用错误信息搜索ROS Answers或GitHub Issues。', duration: '5分钟' }
    ],
    tips: [
      '先检查基础：ROS是否启动、节点是否运行、话题是否连通',
      '使用rqt工具可视化系统状态',
      '记录调试过程，建立个人错误库'
    ],
    commonMistakes: [
      '不读错误信息就盲目修改——错误信息是重要线索',
      '同时修改多处——一次只改一个变量',
      '忽略环境问题——检查ROS版本、依赖、环境变量'
    ],
    examples: [
      { scenario: '节点无法启动', action: '检查ROS_MASTER_URI、检查依赖、检查权限', result: '发现是缺少执行权限，chmod +x解决' }
    ],
    resources: [
      { title: 'ROS Troubleshooting', url: 'http://wiki.ros.org/ROS/Troubleshooting', type: 'documentation' },
      { title: 'ROS Answers', url: 'https://answers.ros.org/', type: 'documentation' }
    ],
    actionItems: [
      '建立个人错误排查清单',
      '记录遇到的错误和解决方案',
      '学习使用gdb、valgrind等调试工具'
    ]
  },
  {
    id: 'breakdown-projects',
    title: '拆解开源项目',
    description: '通过阅读优秀开源项目学习架构和设计模式',
    icon: '🔬',
    category: '进阶',
    difficulty: '中级',
    estimatedTime: '每周2小时',
    overview: '站在巨人的肩膀上。拆解优秀项目，学习架构设计、代码组织和最佳实践。',
    whyItWorks: [
      '学习真实项目的架构和模式',
      '理解大型代码库的组织方式',
      '发现可以直接使用的工具和技术'
    ],
    steps: [
      { title: '选择项目', description: '选择与目标相关的、文档完善的项目。', duration: '10分钟' },
      { title: '理解架构', description: '阅读README、架构图，理解整体设计。', duration: '30分钟' },
      { title: '追踪代码流', description: '从入口点开始，追踪关键功能的实现。', duration: '1小时' },
      { title: '提取可复用部分', description: '记录可以借鉴的设计模式和工具。', duration: '20分钟' }
    ],
    tips: [
      '从简单项目开始，逐步挑战复杂项目',
      '关注代码组织和命名规范',
      '尝试修改和扩展项目功能'
    ],
    commonMistakes: [
      '直接阅读细节不先看架构——先有全局观',
      '只看不动手——尝试修改代码验证理解',
      '选择过于复杂的项目——从入门级项目开始'
    ],
    examples: [
      { scenario: '学习导航栈', action: '阅读move_base源码，理解状态机和插件机制', result: '掌握导航系统的架构设计' }
    ],
    resources: [
      { title: 'ROS开源项目列表', url: 'https://github.com/ros/rosdistro', type: 'documentation' },
      { title: 'turtlebot3', url: 'https://github.com/ROBOTIS-GIT/turtlebot3', type: 'tutorial' }
    ],
    actionItems: [
      '选择1个目标项目开始拆解',
      '绘制项目架构图',
      '记录3个可以借鉴的设计模式'
    ]
  },
  {
    id: 'record-experiments',
    title: '记录实验日志',
    description: '系统化记录学习过程和实验结果，形成知识积累',
    icon: '📝',
    category: '工具',
    difficulty: '入门',
    estimatedTime: '每次实验后15分钟',
    overview: '好记性不如烂笔头。记录实验过程、结果和反思，加速知识内化。',
    whyItWorks: [
      '记录加深理解和记忆',
      '方便回顾和复盘',
      '形成个人知识库'
    ],
    steps: [
      { title: '记录目标', description: '写下本次实验要验证的问题或实现的功能。', duration: '2分钟' },
      { title: '记录过程', description: '记录关键步骤、命令、参数和观察到的现象。', duration: '5分钟' },
      { title: '记录结果', description: '记录成功或失败，以及原因分析。', duration: '3分钟' },
      { title: '记录反思', description: '总结学到的东西，下一步计划。', duration: '5分钟' }
    ],
    tips: [
      '使用Markdown格式，便于整理和搜索',
      '包含截图和代码片段',
      '定期回顾，发现规律'
    ],
    commonMistakes: [
      '只记录成功不记录失败——失败经验同样宝贵',
      '记录过于简略——细节决定能否复现',
      '不回顾——记录后定期复习才能内化'
    ],
    examples: [
      { scenario: '调试TF变换问题', action: '记录问题现象、尝试的解决方案、最终发现和原因', result: '形成完整的调试案例，下次快速定位类似问题' }
    ],
    resources: [
      { title: 'Notion模板', url: 'https://www.notion.com/templates', type: 'tool' },
      { title: 'Obsidian', url: 'https://obsidian.md/', type: 'tool' }
    ],
    actionItems: [
      '选择笔记工具（Notion/Obsidian/Markdown）',
      '建立实验日志模板',
      '每次实验后花15分钟记录'
    ]
  },
  {
    id: 'review-git',
    title: '复盘与Git管理',
    description: '定期复盘学习进度，使用Git管理代码版本',
    icon: '🔄',
    category: '工具',
    difficulty: '入门',
    estimatedTime: '每周1小时',
    overview: '复盘巩固学习成果，Git管理代码版本，形成良好的开发习惯。',
    whyItWorks: [
      '复盘发现知识盲点',
      'Git管理代码变更，便于回溯',
      '形成持续改进的循环'
    ],
    steps: [
      { title: '回顾本周学习', description: '检查完成了哪些任务，遇到了什么问题。', duration: '15分钟' },
      { title: '总结收获', description: '记录新掌握的知识点和技能。', duration: '10分钟' },
      { title: 'Git提交整理', description: '整理本周的代码提交，写清晰的commit message。', duration: '15分钟' },
      { title: '规划下周', description: '根据进度调整下周计划。', duration: '10分钟' }
    ],
    tips: [
      '使用git log查看提交历史',
      'commit message遵循约定式提交规范',
      '定期创建tag标记里程碑'
    ],
    commonMistakes: [
      '不写commit message——清晰的提交信息很重要',
      '大杂烩提交——每个提交应该是一个完整的变更',
      '不备份代码——推送到远程仓库或云存储'
    ],
    examples: [
      { scenario: '周末复盘', action: '回顾本周学习、整理Git提交、规划下周', result: '保持学习节奏，代码版本清晰' }
    ],
    resources: [
      { title: 'Git教程', url: 'https://git-scm.com/book/zh/v2', type: 'documentation' },
      { title: '约定式提交', url: 'https://www.conventionalcommits.org/', type: 'documentation' }
    ],
    actionItems: [
      '每周固定时间复盘',
      '整理Git提交历史',
      '更新学习计划'
    ]
  }
];

export function getMethodById(id: string): LearningMethod | undefined {
  return methodEntries.find(method => method.id === id);
}

export function getMethodsByCategory(category: string): LearningMethod[] {
  return methodEntries.filter(method => method.category === category);
}

export function getAllMethodIds(): string[] {
  return methodEntries.map(method => method.id);
}
