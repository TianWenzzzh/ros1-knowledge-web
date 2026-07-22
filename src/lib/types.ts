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

export const CATEGORY_INFO: Record<Category, { name: string; icon: string; description: string }> = {
  'linux-ubuntu': { name: 'Linux/Ubuntu', icon: '🐧', description: 'Linux系统基础与Ubuntu环境配置' },
  'ros-basics': { name: 'ROS基础', icon: '🤖', description: 'ROS核心概念与基础操作' },
  'communication': { name: '通信机制', icon: '📡', description: '话题、服务、动作等通信方式' },
  'tools': { name: '工具', icon: '🔧', description: 'ROS开发与调试工具' },
  'transform': { name: '坐标与模型', icon: '📐', description: 'TF变换与机器人模型描述' },
  'simulation': { name: '仿真', icon: '🎮', description: 'Gazebo仿真环境与配置' },
  'navigation': { name: '导航', icon: '🧭', description: 'SLAM建图与自主导航' },
  'vision': { name: '视觉', icon: '👁️', description: '摄像头与图像处理' },
  'manipulation': { name: '机械臂', icon: '🦾', description: 'MoveIt运动规划与控制' },
  'debug-migration': { name: '调试与迁移', icon: '🐛', description: '调试技巧与ROS2迁移' },
};

// 代码示例
export interface CodeExample {
  language: string;
  code: string;
  description?: string;
  expectedOutput?: string;
}

// 常见错误
export interface CommonError {
  error: string;
  cause: string;
  solution: string;
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
  content: {
    explanation: string;
    whyImportant: string;
    codeExamples: CodeExample[];
    commonErrors: CommonError[];
    tips: string[];
    practice: string[];
  };
  officialSources: { title: string; url: string }[];
  applicableVersions: string[];
  relatedArticles: string[];
  createdAt: string;
  updatedAt: string;
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
  examples: { command: string; description: string }[];
  relatedCommands: string[];
}

// 错误排查项
export interface TroubleshootItem {
  id: string;
  errorPattern: string;
  keywords: string[];
  possibleCauses: string[];
  solutions: string[];
  relatedArticles: string[];
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

// 实验完成状态
export interface ExperimentProgress {
  experimentId: string;
  completed: boolean;
  completedAt?: string;
  notes?: string;
}

// 用户数据
export interface UserData {
  favorites: string[]; // 收藏的文章ID
  notes: UserNote[];
  readingProgress: ReadingProgress[];
  experimentProgress: ExperimentProgress[];
  quizResults: { quizId: string; correct: boolean; answeredAt: string }[];
  lastVisitAt: string;
  visitCount: number;
}