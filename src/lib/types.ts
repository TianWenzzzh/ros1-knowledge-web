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

// 分类列表（用于导出）
export const categories: Category[] = [
  'linux-ubuntu',
  'ros-basics',
  'communication',
  'tools',
  'transform',
  'simulation',
  'navigation',
  'vision',
  'manipulation',
  'debug-migration'
];

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

// 文章来源信息（新版，用于顶层 sources）
export interface ArticleSource {
  title: string;
  url: string;
  sourceType?: SourceType;
  version?: string;
  verifiedAt?: string;
}

// 旧版来源格式（兼容）
export interface ArticleSourceLegacy {
  title: string;
  url: string;
  type?: SourceType;
  description?: string;
}

// 前置诊断问题
export interface PrerequisiteQuestion {
  question: string;
  hint: string;
}

// 前置诊断
export interface PrerequisiteCheck {
  questions: PrerequisiteQuestion[];
}

// 直觉模型
export interface IntuitionModel {
  analogy: string;
  boundaries: string;
}

// 时间轴项
export interface TimelineItem {
  time: string;
  title: string;
  anchor?: string;
  description?: string;
}

// 实践步骤
export interface PracticeStep {
  command: string;
  explanation?: string;
}

// 最小实践示例
export interface MinimalPractice {
  title?: string;
  duration?: string;
  terminal?: string;
  currentDirectory?: string;
  source?: string;
  commands: PracticeStep[];
  expectedOutput?: string;
}

// 误区项
export interface Misconception {
  misconception: string;
  rootCause: string;
  fix: string;
}

// 暂停思考项
export interface PauseAndThink {
  question: string;
  answer: string;
}

// 测验项
export interface QuizItem {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

// 三级练习
export interface PracticeLevel {
  task: string;
  hints: string[];
  verifyCommand: string;
}

// 练习集合
export interface PracticeSet {
  basic: PracticeLevel;
  intermediate: PracticeLevel;
  advanced: PracticeLevel;
}

// 学习目标
export interface LearningObjective {
  description: string;
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
  
  // 精品课程模板字段（顶层）
  introHook?: {
    problem: string;
    scenario: string;
  };
  learningObjectives?: string[];
  prerequisite?: PrerequisiteCheck;
  intuition?: IntuitionModel;
  timeline?: TimelineItem[];
  minimalPractice?: MinimalPractice;
  dataFlow?: {
    type: 'mermaid' | 'text' | 'ascii';
    content: string;
    caption?: string;
  };
  misconceptions?: Misconception[];
  practice?: PracticeSet;
  pauseAndThink?: PauseAndThink[];
  quiz?: QuizItem[];
  reviewSummary?: string;
  nextLesson?: string;
  nextLessonLink?: string;
  sources?: ArticleSource[];
  
  // 文章内容
  content: {
    explanation: string;
    whyImportant: string;
    codeExamples: CodeExample[];
    commonErrors: CommonError[];
    tips: string[];
    practice?: string[]; // 可选
    
    // 精品课程模板字段（content内部，兼容）
    introHook?: {
      problem: string;
      scenario: string;
    };
    prerequisite?: PrerequisiteCheck;
    intuition?: string;
    visualizations?: string[];
    misconceptions?: {
      misconception: string;
      rootCause: string;
      correctApproach: string;
    }[];
    pauseAndThink?: PauseAndThink[];
    reviewSummary?: string;
    nextLessonLink?: string;
    quiz?: QuizItem[];
  };
  
  // 下一步建议
  nextSteps?: {
    title: string;
    description: string;
    href?: string;
  }[];
  
  // 来源信息
  officialSources: ArticleSourceLegacy[];
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
  errorPattern?: string;
  title?: string;
  symptoms?: string[];
  keywords?: string[];
  possibleCauses: string[];
  solutions?: string[];
  relatedArticles: string[];
}

// 收藏状态（localStorage）
export interface BookmarkState {
  articleIds: string[];
}

// 阅读进度项
export interface ReadingProgressItem {
  articleId?: string;
  startedAt?: string;
  read: boolean;
  lastReadAt: string;
  progress: number; // 0-100
  completed?: boolean;
}

// 阅读进度（localStorage）
export interface ReadingProgress {
  [articleId: string]: ReadingProgressItem;
}

// 笔记（localStorage）
export interface ArticleNote {
  articleId: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

// 实验完成状态（localStorage）
export interface ExperimentProgress {
  [experimentId: string]: {
    completed: boolean;
    completedAt?: string;
  };
}

// 错题记录（localStorage）
export interface QuizMistake {
  quizId: string;
  articleId: string;
  wrongAnswer: number;
  timestamp: string;
}

// 用户状态（localStorage）
export interface UserState {
  bookmarks: BookmarkState;
  readingProgress: ReadingProgress;
  notes: ArticleNote[];
  experimentProgress: ExperimentProgress;
  quizMistakes: QuizMistake[];
}

// 用户笔记（localStorage）
export interface UserNote {
  id: string;
  articleId: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

// 学习方法
export interface LearningMethod {
  id: string;
  slug: string;
  title: string;
  icon?: string;
  summary?: string;
  description?: string;
  content?: string;
  steps?: string[];
  tips?: string[];
  resources?: { title: string; url: string }[];
  rosExample?: string;
}

// 搜索结果
export interface SearchResult {
  article: KnowledgeArticle;
  score: number;
  matchType: 'title' | 'summary' | 'tag' | 'content';
}