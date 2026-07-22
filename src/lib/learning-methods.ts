import type { LearningMethod } from './types';

export const learningMethods: LearningMethod[] = [
  {
    id: 'method-plan',
    slug: 'learning-plan',
    title: '如何制定 ROS1 学习计划',
    icon: '📋',
    summary: '科学规划学习路径，设定阶段性目标，循序渐进掌握 ROS 开发技能。',
    content: `制定学习计划是成功掌握 ROS 的第一步。一个好的学习计划应该：

**1. 评估起点**
- Linux 基础如何？
- 编程语言掌握程度？
- 是否有机器人背景知识？

**2. 设定目标**
- 短期目标（1-2周）：掌握基础概念
- 中期目标（1-2月）：完成仿真实验
- 长期目标（3-6月）：完成综合项目

**3. 安排时间**
- 每天固定学习时间
- 理论与实践结合
- 留出复习和消化时间

**4. 里程碑检查**
- 每完成一个模块进行自测
- 记录学习笔记和问题
- 及时调整计划

**建议学习顺序**：
1. Linux 基础 → 2. ROS 概念 → 3. 通信机制 → 4. 工具使用 → 5. 仿真实践 → 6. 导航应用`,
    tips: [
      '不要跳过基础，基础不牢后面会很吃力',
      '动手实践比看文档更重要',
      '遇到问题先尝试自己解决，培养排查能力',
      '保持耐心，ROS 需要时间消化'
    ],
    resources: [
      { title: 'ROS Wiki 官方教程', url: 'http://wiki.ros.org/ROS/Tutorials' }
    ]
  },
  {
    id: 'method-read-docs',
    slug: 'read-documentation',
    title: '如何阅读官方文档',
    icon: '📖',
    summary: '掌握 ROS Wiki 的阅读方法，学会从文档中获取信息和解决问题。',
    content: `ROS Wiki 是最权威的学习资源，但内容庞大需要技巧：

**阅读技巧**

1. **从教程开始**
   - ROS/Tutorials 是入门首选
   - 按顺序完成 Beginner Level
   - 不懂的概念先跳过，回头再补

2. **善用搜索**
   - 使用 Wiki 内置搜索
   - Google: "ros wiki 关键词"
   - Stack Overflow 搜索错误信息

3. **理解 API 文档**
   - 学会看 msg/srv 定义
   - 理解函数参数和返回值
   - 查看示例代码

4. **关注版本信息**
   - 注意文档适用的 ROS 版本
   - Melodic vs Noetic 的差异
   - 官方维护状态`,
    tips: [
      'Wiki 页面顶部的"其余语言"可以切换中文（如有）',
      '教程中的命令可以直接复制执行',
      '保存常用页面到收藏夹',
      '英文阅读能力很重要，善用翻译工具'
    ],
    resources: [
      { title: 'ROS Wiki', url: 'http://wiki.ros.org/' },
      { title: 'ROS Answers 问答社区', url: 'https://answers.ros.org/' }
    ]
  },
  {
    id: 'method-terminal',
    slug: 'practice-terminal',
    title: '如何练习终端命令',
    icon: '⌨️',
    summary: '通过刻意练习掌握常用命令，提高终端操作效率。',
    content: `终端是 ROS 开发的核心工具，必须熟练：

**练习方法**

1. **刻意练习**
   - 每天使用 terminal 完成操作
   - 不依赖图形界面
   - 记录常用命令

2. **理解命令结构**
   - ros + 功能: rostopic, rosnode, rosservice
   - 动作 + 对象: list, echo, pub
   - 参数和选项

3. **效率提升**
   - Tab 补全
   - 历史命令: Ctrl+R, history
   - 别名设置: alias

4. **调试技巧**
   - 管道和重定向
   - grep 过滤
   - head/tail 查看`,
    tips: [
      '保持手指在键盘上，减少鼠标使用',
      '常见操作可以编写脚本自动化',
      '使用 tmux 管理多个终端',
      '记录自己的命令速查表'
    ],
    resources: [
      { title: 'Linux 命令行教程', url: 'https://ubuntu.com/tutorials/command-line-for-beginners' }
    ]
  },
  {
    id: 'method-debug',
    slug: 'debug-problems',
    title: '如何从报错定位问题',
    icon: '🔍',
    summary: '建立系统化的错误排查思路，快速定位和解决问题。',
    content: `错误排查是 ROS 开发的日常：

**排查流程**

1. **理解错误信息**
   - 完整阅读错误输出
   - 识别关键错误类型
   - 注意错误发生时机

2. **信息收集**
   - 使用 roswtf 检查
   - 查看节点日志
   - 检查话题/节点状态

3. **假设验证**
   - 根据错误提出可能原因
   - 逐一验证假设
   - 排除法定位问题

4. **查阅资料**
   - 搜索错误信息
   - 查看 ROS Answers
   - 阅读相关文档

5. **解决问题**
   - 应用解决方案
   - 记录问题和解决方法
   - 总结经验`,
    tips: [
      '不要慌张，错误信息是线索',
      '学会用 roswtf 和 rqt 工具',
      '搜索时去掉具体数值，搜索模式',
      '记录自己的错误解决库'
    ],
    resources: [
      { title: 'ROS Debugging', url: 'http://wiki.ros.org/ROS/Debugging' }
    ]
  },
  {
    id: 'method-project',
    slug: 'breakdown-project',
    title: '如何拆解机器人项目',
    icon: '🔧',
    summary: '将复杂机器人项目拆解为小任务，逐步实现功能模块。',
    content: `机器人项目复杂度高，需要系统性拆解：

**拆解方法**

1. **功能分解**
   - 识别主要功能模块
   - 定义模块接口
   - 确定依赖关系

2. **优先级排序**
   - 核心功能优先
   - 基础模块先开发
   - 逐步添加高级功能

3. **任务细化**
   - 每个任务可独立测试
   - 明确输入输出
   - 预估开发时间

4. **增量开发**
   - 先实现最小可用版本
   - 迭代增加功能
   - 持续测试验证

**示例：巡逻机器人**
- 阶段1：建图和遥控
- 阶段2：自主导航
- 阶段3：巡逻任务
- 阶段4：异常处理`,
    tips: [
      '不要一开始就追求完美',
      '可用 > 完美，先跑起来再优化',
      '每个阶段都要有可验证的目标',
      '保持代码整洁，方便扩展'
    ],
    resources: []
  },
  {
    id: 'method-record',
    slug: 'record-experiments',
    title: '如何记录实验',
    icon: '📝',
    summary: '养成记录实验过程的习惯，积累经验和知识。',
    content: `实验记录是学习的重要环节：

**记录内容**

1. **实验环境**
   - ROS 版本和系统
   - 依赖包版本
   - 硬件配置

2. **操作步骤**
   - 命令序列
   - 参数配置
   - 遇到的问题

3. **结果观察**
   - 预期结果
   - 实际结果
   - 数据截图

4. **问题解决**
   - 遇到的错误
   - 解决方法
   - 踩坑经验

**记录工具**
- Markdown 文档
- Git 版本控制
- 实验报告模板`,
    tips: [
      '及时记录，不要靠记忆',
      '截图比文字更直观',
      '记录失败案例更有价值',
      '定期整理笔记'
    ],
    resources: [
      { title: 'Markdown 教程', url: 'https://www.markdownguide.org/' }
    ]
  },
  {
    id: 'method-review',
    slug: 'review-and-git',
    title: '如何复习和用 Git 保存学习成果',
    icon: '🔄',
    summary: '科学复习巩固知识，使用 Git 管理学习代码和文档。',
    content: `复习和版本管理是长期学习的关键：

**复习策略**

1. **间隔复习**
   - 学习后 1 天复习
   - 1 周后再次复习
   - 1 月后巩固

2. **主动回忆**
   - 不看资料尝试回忆
   - 口述或写出要点
   - 发现薄弱点

3. **实践巩固**
   - 重做实验
   - 变化参数观察结果
   - 挑战新问题

**Git 使用**

1. **代码管理**
   - 每个实验一个分支
   - 频繁提交，信息清晰
   - 使用 tag 标记版本

2. **学习仓库**
   - 创建学习专用仓库
   - 存放代码、笔记、配置
   - 定期推送到远程备份`,
    tips: [
      '定期回顾自己的代码，会发现改进空间',
      '每个 commit 写清楚做了什么',
      '不要把大改动憋在本地，经常提交',
      'GitHub/GitLab 是很好的学习档案'
    ],
    resources: [
      { title: 'Git 教程', url: 'https://git-scm.com/book/zh/v2' },
      { title: 'GitHub 指南', url: 'https://docs.github.com/cn' }
    ]
  }
];