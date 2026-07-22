#!/usr/bin/env node
/**
 * ROS1 知识库内容验收脚本
 * 检查所有核心文章的必填字段完整性
 */

const fs = require('fs');
const path = require('path');

// 必填字段定义
const REQUIRED_FIELDS = {
  introHook: { type: 'object', fields: ['problem', 'scenario'] },
  learningObjectives: { type: 'array', minLength: 3 },
  prerequisite: { type: 'array', minLength: 2 },
  intuition: { type: 'object', fields: ['analogy', 'boundaries'] },
  timeline: { type: 'array', minLength: 5 },
  minimalPractice: { type: 'object', fields: ['terminal', 'commands'] },
  diagram: { type: 'object', optional: true },
  misconceptions: { type: 'array', minLength: 3 },
  practice: { type: 'object', fields: ['basic', 'intermediate', 'advanced'] },
  pauseAndThink: { type: 'array', minLength: 2 },
  quiz: { type: 'array', minLength: 4 },
  reviewSummary: { type: 'object', fields: ['keyPoints'] },
  nextLesson: { type: 'object', fields: ['title', 'link'] },
  sources: { type: 'array', minLength: 2 }
};

// 核心文章 slug 列表
const CORE_ARTICLES = [
  'linux-basics',
  'ubuntu-setup',
  'git-basics',
  'catkin-workspace',
  'ros-architecture',
  'ros-node',
  'ros-topic',
  'ros-message',
  'ros-service',
  'ros-parameter',
  'ros-launch',
  'tf-transform',
  'urdf-xacro',
  'rosbag',
  'ros-debugging',
  'ros-publisher-subscriber',
  'ros-action'
];

// 禁用词检查
const FORBIDDEN_WORDS = [
  '学员', '课程体系', '讲师', '助教', '培训负责人', 
  '考勤', '排课', '作业批改', '培训管理', '课程排期'
];

function parseDataFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  
  // 简单提取 slug 列表
  const slugMatches = content.match(/slug:\s*['"]([^'"]+)['"]/g) || [];
  const slugs = slugMatches.map(m => m.match(/slug:\s*['"]([^'"]+)['"]/)[1]);
  
  // 统计各字段出现次数
  const fieldCounts = {};
  Object.keys(REQUIRED_FIELDS).forEach(field => {
    const regex = new RegExp(`${field}:`, 'g');
    const matches = content.match(regex) || [];
    fieldCounts[field] = matches.length;
  });
  
  return { slugs, fieldCounts, content };
}

function checkNoeticCommands(content) {
  // 检查 Noetic 关键命令
  const noeticCommands = [
    'source /opt/ros/noetic/setup.bash',
    'catkin_make',
    'catkin_create_pkg',
    'roscore',
    'rosnode',
    'rostopic',
    'rosmsg',
    'rosservice',
    'rosparam',
    'roslaunch',
    'rosbag'
  ];
  
  const found = [];
  const missing = [];
  
  noeticCommands.forEach(cmd => {
    if (content.includes(cmd)) {
      found.push(cmd);
    }
  });
  
  return { found, missing };
}

function checkForbiddenWords(content) {
  const found = [];
  FORBIDDEN_WORDS.forEach(word => {
    if (content.includes(word)) {
      found.push(word);
    }
  });
  return found;
}

function main() {
  console.log('=== ROS1 知识库内容验收 ===\n');
  
  const dataPath = path.join(__dirname, '../src/lib/data.ts');
  if (!fs.existsSync(dataPath)) {
    console.error('错误：找不到数据文件', dataPath);
    process.exit(1);
  }
  
  const { slugs, fieldCounts, content } = parseDataFile(dataPath);
  
  // 检查核心文章是否存在
  console.log('1. 核心文章检查：');
  const missingArticles = [];
  CORE_ARTICLES.forEach(slug => {
    if (slugs.includes(slug)) {
      console.log(`  ✓ ${slug}`);
    } else {
      console.log(`  ✗ ${slug} - 缺失`);
      missingArticles.push(slug);
    }
  });
  
  // 检查字段完整性
  console.log('\n2. 字段完整性统计：');
  Object.entries(fieldCounts).forEach(([field, count]) => {
    const required = REQUIRED_FIELDS[field];
    const minCount = CORE_ARTICLES.length;
    const status = count >= minCount ? '✓' : '△';
    console.log(`  ${status} ${field}: ${count}/${minCount}`);
  });
  
  // 检查 Noetic 命令
  console.log('\n3. Noetic 命令检查：');
  const { found: foundCmds } = checkNoeticCommands(content);
  console.log(`  找到 ${foundCmds.length} 个核心命令`);
  foundCmds.forEach(cmd => console.log(`    ✓ ${cmd}`));
  
  // 检查禁用词
  console.log('\n4. 禁用词检查：');
  const forbiddenFound = checkForbiddenWords(content);
  if (forbiddenFound.length === 0) {
    console.log('  ✓ 无禁用词');
  } else {
    forbiddenFound.forEach(word => console.log(`  ✗ 发现：${word}`));
  }
  
  // 统计
  console.log('\n=== 验收摘要 ===');
  console.log(`核心文章：${CORE_ARTICLES.length - missingArticles.length}/${CORE_ARTICLES.length}`);
  console.log(`缺失文章：${missingArticles.length}`);
  
  if (missingArticles.length > 0) {
    console.log('\n需要补充的文章：');
    missingArticles.forEach(slug => console.log(`  - ${slug}`));
  }
  
  const completeFields = Object.entries(fieldCounts).filter(([f, c]) => c >= CORE_ARTICLES.length).length;
  console.log(`完整字段：${completeFields}/${Object.keys(REQUIRED_FIELDS).length}`);
  
  // 返回状态码
  const success = missingArticles.length === 0 && forbiddenFound.length === 0;
  process.exit(success ? 0 : 1);
}

main();