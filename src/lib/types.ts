// ROS1 知识库类型定义

// 知识分类
export type Category =
  | 'linux-ubuntu'
  | 'ros-basics'
  | 'communication'
  | 'tools'
  | 'transform'
  | 'simulation'
  | 'navigation'
  | 'vision'
  | 'manipulation'
  | 'debug-migration';

export const CATEGORY_INFO: Record<Category, { name: string; icon: string; description: string; order: number }> = {
  'linux-ubuntu': { name: 'Linux/Ubuntu', icon: '🐧', description: 'Linux系统基础与Ubuntu环境配置', order: 1 },
  'ros-basics': { name: 'ROS基础', icon: '🤖', description: 'ROS核心概念与基础操作', order: 2 },
  'communication': { name: '通信机制', icon: '📡', description: '话题、服务、动作等通信方式', order: 3 },
  'tools': { name: '工具', icon: '🔧', description: 'ROS开发与调试工具', order: 4 },
  'transform': { name: '坐标与模型', icon: '📐', description: 'TF变换与机器人模型描述', order: 5 },
  'simulation': { name: '仿真', icon: '🎮', description: 'Gazebo仿真环境与配置', order: 6 },
  'navigation': { name: '导航', icon: '🧭', description: 'SLAM建图与自主导航', order: 7 },
  'vision': { name: '视觉', icon: '👁️', description: '摄像头与图像处理', order: 8 },
  'manipulation': { name: '机械臂', icon: '🦾', description: 'MoveIt运动规划与控制', order: 9 },
  'debug-migration': { name: '调试与迁移', icon: '🐛', description: '调试技巧与ROS2迁移', order: 10 },
};

// 学习路径类型
export type LearningPath = 'beginner' | 'troubleshoot';

// 代码示例
export interface CodeExample {
  language: string;
  code: string;
  description?: string;
  expectedOutput?: string;
  prerequisites?: string[]; // 执行前提
}

// 常见错误
export interface CommonError {
  error: string;
  cause: string;
  solution: string;
  relatedCommand?: string;
}

// 来源类型
export type SourceType = 'official' | 'community' | 'tutorial' | 'wiki';

// 文章来源信息
export interface ArticleSource {
  title: string;
  url: string;
  type?: SourceType;
  description?: string;
}

// 学习目标
export interface LearningObjective {
  description: string;
}

// 最小实践步骤
export interface PracticeStep {
  description: string;
  command?: string;
  verification?: string;
}

// 知识文章
export interface KnowledgeArticle {
  id: string;
  slug: string;
  title: string;
  category: Category;
  tags: string[];
  summary: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  readingTime: number; // 分钟
  prerequisites: string[];
  
  // 学习目标
  learningObjectives?: string[];
  
  // 文章内容
  content: {
    explanation: string;
    whyImportant: string;
    codeExamples: CodeExample[];
    commonErrors: CommonError[];
    tips: string[];
    practice: string[];
    
    // 精品课程模板字段（content内部）
    introHook?: {
      problem: string;
      scenario: string;
    };
    prerequisite?: {
      questions: string[];
      helpText?: string;
    };
    intuition?: string;
    visualizations?: string[];
    misconceptions?: {
      misconception: string;
      rootCause: string;
      correctApproach: string;
    }[];
    pauseAndThink?: {
      question: string;
      answer: string;
    }[];
    reviewSummary?: string;
    nextLessonLink?: string;
    quiz?: {
      id: string;
      question: string;
      options: string[];
      correctAnswer: number;
      explanation: string;
    }[];
  };
  
  // 精品课程模板字段（顶层，兼容两种位置）
  introHook?: {
    problem: string;
    scenario: string;
  };
  prerequisite?: {
    questions: string[];
    helpText?: string;
  };
  intuition?: string;
  visualizations?: string[];
  misconceptions?: {
    misconception: string;
    rootCause: string;
    correctApproach: string;
  }[];
  pauseAndThink?: {
    question: string;
    answer: string;
  }[];
  reviewSummary?: string;
  nextLessonLink?: string;
  quiz?: {
    id: string;
    question: string;
    options: string[];
    correctAnswer: number;
    explanation: string;
  }[];
  
  // 最小实践
  minimalPractice?: {
    title?: string;
    duration?: string;
    steps: PracticeStep[];
  };
  
  // 下一步建议
  nextSteps?: {
    title: string;
    description: string;
    href?: string;
  }[];
  
  // 来源信息
  officialSources: ArticleSource[];
  applicableVersions: string[];
  rosVersion?: 'ROS1'; // 明确标注 ROS 版本
  
  // 元数据
  relatedArticles: string[];
  createdAt: string;
  updatedAt: string;
  lastVerified?: string; // 最后核验日期
}

// 自测题
export interface Quiz {
  id: string;
  articleId: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

// 实验
export interface Experiment {
  id: string;
  slug: string;
  title: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: number; // 分钟
  prerequisites: string[];
  objectives: string[];
  steps: {
    title: string;
    description: string;
    commands?: string[];
    tips?: string[];
  }[];
  verificationCommands: string[];
  expectedResults: string[];
  commonErrors: CommonError[];
  nextSteps: string[];
}

// 命令速查项
export interface CommandReference {
  id: string;
  command: string;
  description: string;
  category: string;
  usage?: string;
  prerequisites?: string[]; // 执行前提
  expectedOutput?: string;
  examples: { command: string; description: string }[];
  relatedCommands: string[];
  tags?: string[]; // 用于筛选
}

// 错误排查项
export interface TroubleshootItem {
  id: string;
  errorPattern: string;
  keywords: string[];
  symptoms?: string[]; // 现象描述
  checkCommands?: string[]; // 检查命令
  possibleCauses: string[];
  solutions: string[];
  relatedArticles: string[];
}

// 故障树节点
export interface TroubleshootNode {
  id: string;
  question: string;
  type: 'question' | 'result';
  yesId?: string;
  noId?: string;
  result?: {
    diagnosis: string;
    solution: string;
    relatedArticle?: string;
  };
}

// 学习方法
export interface LearningMethod {
  id: string;
  slug: string;
  title: string;
  icon: string;
  summary: string;
  content: string;
  tips: string[];
  resources: { title: string; url: string }[];
}

// 用户笔记
export interface UserNote {
  id: string;
  articleId: string;
  articleSlug?: string; // 别名
  content: string;
  createdAt: string;
  updatedAt: string;
}

// 阅读进度
export interface ReadingProgress {
  articleId: string;
  startedAt: string;
  lastReadAt: string;
  progress: number; // 0-100
  completed: boolean;
}

// 学习路径节点
export interface LearningPathNode {
  id: string;
  articleSlug: string;
  title: string;
  category: Category;
  dependsOn: string[]; // 依赖的前置文章
  estimatedTime: number; // 预计分钟
  completed?: boolean;
}

// 知识地图节点
export interface KnowledgeMapNode {
  id: string;
  title: string;
  category: Category;
  level: number; // 学习层级
  dependsOn: string[];
  estimatedTime: number;
  articleSlug?: string;
}

// 学习路径配置
export const LEARNING_PATHS = {
  beginner: {
    name: '零基础循序路径',
    description: '从 Linux 基础开始，按顺序学习 ROS1 核心概念',
    icon: '📚',
  },
  troubleshoot: {
    name: '遇到问题快速查询',
    description: '根据当前问题快速定位解决方案',
    icon: '🔍',
  },
} as const;