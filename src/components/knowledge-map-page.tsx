'use client';

import React from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CATEGORY_INFO, Category } from '@/lib/types';
import { knowledgeArticles } from '@/lib/data';

// 知识节点类型
interface KnowledgeNode {
  id: string;
  title: string;
  slug: string;
  category: Category;
  dependencies: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

// 构建知识节点
const knowledgeNodes: KnowledgeNode[] = knowledgeArticles.map(article => ({
  id: article.id,
  title: article.title,
  slug: article.slug,
  category: article.category,
  dependencies: article.prerequisites,
  difficulty: article.difficulty
}));

// 难度颜色
const difficultyColors = {
  beginner: 'bg-green-100 text-green-700 border-green-300',
  intermediate: 'bg-yellow-100 text-yellow-700 border-yellow-300',
  advanced: 'bg-red-100 text-red-700 border-red-300'
};

const difficultyLabels = {
  beginner: '入门',
  intermediate: '进阶',
  advanced: '高级'
};

// 分类颜色
const categoryColors: Record<Category, string> = {
  'linux-ubuntu': 'border-blue-400',
  'ros-basics': 'border-cyan-400',
  'communication': 'border-purple-400',
  'tools': 'border-orange-400',
  'transform': 'border-pink-400',
  'simulation': 'border-green-400',
  'navigation': 'border-indigo-400',
  'vision': 'border-rose-400',
  'manipulation': 'border-amber-400',
  'debug-migration': 'border-slate-400'
};

export default function KnowledgeMapPage() {
  const categories = Object.entries(CATEGORY_INFO) as [Category, typeof CATEGORY_INFO[Category]][];
  
  // 按分类组织节点
  const nodesByCategory = categories.map(([key, info]) => ({
    category: key,
    info,
    nodes: knowledgeNodes.filter(n => n.category === key)
  }));

  return (
    <div className="space-y-8">
      {/* 页面标题 */}
      <div className="text-center py-6">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">ROS1 知识地图</h1>
        <p className="text-slate-600">系统化的知识结构，帮助你了解 ROS1 完整知识体系</p>
      </div>

      {/* 难度说明 */}
      <div className="flex flex-wrap justify-center gap-4 py-4 bg-slate-50 rounded-lg">
        <div className="flex items-center gap-2">
          <Badge className={difficultyColors.beginner}>入门</Badge>
          <span className="text-sm text-slate-600">适合零基础学习者</span>
        </div>
        <div className="flex items-center gap-2">
          <Badge className={difficultyColors.intermediate}>进阶</Badge>
          <span className="text-sm text-slate-600">需要一定前置知识</span>
        </div>
        <div className="flex items-center gap-2">
          <Badge className={difficultyColors.advanced}>高级</Badge>
          <span className="text-sm text-slate-600">需要综合运用能力</span>
        </div>
      </div>

      {/* 知识地图 */}
      <div className="space-y-8">
        {nodesByCategory.map(({ category, info, nodes }) => (
          <section key={category} className="space-y-4">
            {/* 分类标题 */}
            <div className="flex items-center gap-3">
              <span className="text-2xl">{info.icon}</span>
              <h2 className="text-xl font-bold text-slate-900">{info.name}</h2>
              <span className="text-sm text-slate-500">({nodes.length} 篇)</span>
            </div>
            
            {/* 知识节点网格 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {nodes.map(node => (
                <Link key={node.id} href={`/article/${node.slug}`}>
                  <Card className={`h-full hover:shadow-md hover:-translate-y-1 transition-all cursor-pointer border-l-4 ${categoryColors[node.category]}`}>
                    <CardHeader className="pb-2">
                      <div className="flex items-start justify-between">
                        <Badge className={difficultyColors[node.difficulty]}>
                          {difficultyLabels[node.difficulty]}
                        </Badge>
                      </div>
                      <CardTitle className="text-base mt-2 line-clamp-2">{node.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      {node.dependencies.length > 0 && (
                        <p className="text-xs text-slate-500">
                          前置：{node.dependencies.length} 项
                        </p>
                      )}
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* 学习路径建议 */}
      <section className="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-xl p-6 mt-8">
        <h2 className="text-xl font-bold text-slate-900 mb-4">📚 推荐学习路径</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <h3 className="font-semibold text-slate-900 mb-2 flex items-center gap-2">
              <span className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-sm">1</span>
              基础准备
            </h3>
            <p className="text-sm text-slate-600 mb-2">Linux 命令 + Ubuntu 环境 + Git</p>
            <Link href="/category/linux-ubuntu" className="text-sm text-cyan-600">开始 →</Link>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <h3 className="font-semibold text-slate-900 mb-2 flex items-center gap-2">
              <span className="w-6 h-6 bg-cyan-100 rounded-full flex items-center justify-center text-sm">2</span>
              ROS 核心
            </h3>
            <p className="text-sm text-slate-600 mb-2">架构 + 节点 + 话题 + 服务</p>
            <Link href="/category/ros-basics" className="text-sm text-cyan-600">开始 →</Link>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <h3 className="font-semibold text-slate-900 mb-2 flex items-center gap-2">
              <span className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center text-sm">3</span>
              工具与仿真
            </h3>
            <p className="text-sm text-slate-600 mb-2">Launch + TF + URDF + Gazebo</p>
            <Link href="/category/tools" className="text-sm text-cyan-600">开始 →</Link>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <h3 className="font-semibold text-slate-900 mb-2 flex items-center gap-2">
              <span className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center text-sm">4</span>
              应用开发
            </h3>
            <p className="text-sm text-slate-600 mb-2">SLAM + 导航 + 视觉</p>
            <Link href="/category/navigation" className="text-sm text-cyan-600">开始 →</Link>
          </div>
        </div>
      </section>
    </div>
  );
}