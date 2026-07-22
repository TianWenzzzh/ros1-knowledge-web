'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { knowledgeArticles } from '@/lib/data';
import { CATEGORY_INFO, type Category } from '@/lib/types';
import { useUserContext } from '@/lib/user-context';

// ROS1 EOL 提示
function EOLBanner() {
  return (
    <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6">
      <div className="flex items-start gap-3">
        <span className="text-2xl">⚠️</span>
        <div className="flex-1">
          <h3 className="font-semibold text-amber-800">ROS 1 已于 2025-05-31 停止维护</h3>
          <p className="text-sm text-amber-700 mt-1">
            本知识库内容基于 ROS 1 Noetic + Ubuntu 20.04，仅作为历史参考。建议新项目使用 ROS 2。
            <Link href="/article/ros1-to-ros2" className="ml-2 underline hover:no-underline">
              了解迁移指南
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

// 任务入口卡片
interface TaskEntryProps {
  icon: string;
  title: string;
  description: string;
  href: string | { pathname: string; query: Record<string, string> };
  tags?: string[];
  color?: 'cyan' | 'blue' | 'green' | 'orange' | 'purple';
}

function TaskEntry({ icon, title, description, href, tags, color = 'cyan' }: TaskEntryProps) {
  const colorStyles = {
    cyan: 'bg-gradient-to-br from-cyan-50 to-blue-50 border-cyan-200 hover:border-cyan-400',
    blue: 'bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200 hover:border-blue-400',
    green: 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-200 hover:border-green-400',
    orange: 'bg-gradient-to-br from-orange-50 to-amber-50 border-orange-200 hover:border-orange-400',
    purple: 'bg-gradient-to-br from-purple-50 to-violet-50 border-purple-200 hover:border-purple-400',
  };

  const linkHref = typeof href === 'string' ? href : href.pathname;

  return (
    <Link
      href={linkHref}
      className={cn(
        'block p-5 rounded-xl border-2 transition-all hover:shadow-lg group',
        colorStyles[color]
      )}
    >
      <div className="text-3xl mb-3">{icon}</div>
      <h3 className="font-semibold text-slate-900 mb-1 group-hover:text-cyan-700 transition-colors">{title}</h3>
      <p className="text-sm text-slate-600 mb-2">{description}</p>
      {tags && (
        <div className="flex flex-wrap gap-1">
          {tags.map(tag => (
            <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
          ))}
        </div>
      )}
    </Link>
  );
}

// 精选文章卡片
function FeaturedArticle({ article }: { article: typeof knowledgeArticles[0] }) {
  const categoryInfo = CATEGORY_INFO[article.category];
  
  return (
    <Link
      href={`/article/${article.slug}`}
      className="block p-4 rounded-lg border border-slate-200 bg-white hover:border-cyan-300 hover:shadow-md transition-all"
    >
      <div className="flex items-start gap-3">
        <span className="text-xl">{categoryInfo?.icon}</span>
        <div className="flex-1 min-w-0">
          <h4 className="font-medium text-slate-900 mb-1">{article.title}</h4>
          <p className="text-sm text-slate-500 line-clamp-2">{article.summary}</p>
          <div className="flex items-center gap-2 mt-2">
            <Badge variant="outline" className="text-xs">{categoryInfo?.name}</Badge>
            <span className="text-xs text-slate-400">{article.readingTime}分钟</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

// 继续学习卡片
function ContinueLearning({ slug, title, progress, category }: { slug: string; title: string; progress: number; category: Category }) {
  const categoryInfo = CATEGORY_INFO[category];
  
  return (
    <Link
      href={`/article/${slug}`}
      className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors"
    >
      <span className="text-xl">{categoryInfo?.icon}</span>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-slate-900 truncate">{title}</p>
        <div className="flex items-center gap-2 mt-1">
          <div className="flex-1 h-1.5 bg-slate-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-cyan-500 rounded-full transition-all"
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>
          <span className="text-xs text-slate-500 w-8">{Math.round(progress)}%</span>
        </div>
      </div>
    </Link>
  );
}

// 空状态
function EmptyState({ title, description, action }: { title: string; description: string; action: { label: string; href: string } }) {
  return (
    <div className="text-center py-6">
      <p className="text-slate-500 mb-1">{title}</p>
      <p className="text-sm text-slate-400 mb-3">{description}</p>
      <Link href={action.href}>
        <Button size="sm">{action.label}</Button>
      </Link>
    </div>
  );
}

export function HomePage() {
  const { readingProgress, favorites } = useUserContext();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // 最近阅读的文章
  const recentArticles = useMemo(() => {
    if (!mounted) return [];
    
    return Object.entries(readingProgress)
      .sort((a, b) => new Date(b[1].lastReadAt).getTime() - new Date(a[1].lastReadAt).getTime())
      .slice(0, 3)
      .map(([slug, progress]) => {
        const article = knowledgeArticles.find(a => a.slug === slug);
        return article ? { ...article, progress: progress.progress } : null;
      })
      .filter(Boolean);
  }, [mounted, readingProgress]);

  // 精选文章（按重要性选择）
  const featuredArticles = useMemo(() => {
    const featuredSlugs = ['ros-architecture', 'roscore', 'ros-topic', 'catkin-workspace'];
    return featuredSlugs
      .map(slug => knowledgeArticles.find(a => a.slug === slug))
      .filter((a): a is typeof knowledgeArticles[0] => a !== undefined)
      .slice(0, 4);
  }, []);

  // 任务入口列表
  const taskEntries: TaskEntryProps[] = [
    {
      icon: '🌱',
      title: '第一次学 ROS1',
      description: '从零开始，按顺序学习 ROS1 基础',
      href: '/article/ros-architecture',
      tags: ['零基础', '系统学习'],
      color: 'green',
    },
    {
      icon: '📡',
      title: '我要理解通信',
      description: '深入理解 Topic、Service、Action 等通信机制',
      href: '/article/ros-topic',
      tags: ['Topic', 'Service', '通信'],
      color: 'cyan',
    },
    {
      icon: '🤖',
      title: '我要建模仿真',
      description: '使用 URDF、Gazebo 构建机器人模型',
      href: '/article/urdf-xacro',
      tags: ['URDF', 'Gazebo', '仿真'],
      color: 'blue',
    },
    {
      icon: '🧭',
      title: '我要做导航',
      description: '实现 SLAM 建图和自主导航',
      href: '/article/slam-navigation',
      tags: ['SLAM', 'Navigation'],
      color: 'purple',
    },
    {
      icon: '🔧',
      title: '我遇到报错',
      description: '按诊断流程排查问题',
      href: '/troubleshoot',
      tags: ['诊断', '排查'],
      color: 'orange',
    },
    {
      icon: '⚡',
      title: '快速查命令',
      description: '查找常用 ROS 命令和参数',
      href: '/commands',
      tags: ['命令', '速查'],
      color: 'cyan',
    },
    {
      icon: '💻',
      title: '补编程基础',
      description: '无需先学完整门语言，20-40分钟补齐本节所需语法',
      href: '/article/python-for-ros-intro',
      tags: ['Python', 'C++', '最小必要'],
      color: 'blue',
    },
  ];

  return (
    <div className="space-y-8">
      {/* EOL 提示 */}
      <EOLBanner />

      {/* 搜索框 */}
      <div className="text-center mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-slate-900 mb-2">
          ROS1 知识库
        </h1>
        <p className="text-slate-600 mb-4">
          面向学生的 ROS1 自学知识库 · 基于 Noetic + Ubuntu 20.04
        </p>
      </div>

      {/* 任务入口区 */}
      <section>
        <h2 className="text-lg font-semibold text-slate-900 mb-4">按任务找答案</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {taskEntries.map((entry, index) => (
            <TaskEntry key={index} {...entry} />
          ))}
        </div>
      </section>

      {/* 双栏布局：精选文章 + 继续学习 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 精选文章 */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-slate-900">精选文章</h2>
            <Link href="/knowledge-map" className="text-sm text-cyan-600 hover:text-cyan-700">
              查看全部 →
            </Link>
          </div>
          <div className="space-y-3">
            {featuredArticles.map(article => (
              <FeaturedArticle key={article.slug} article={article} />
            ))}
          </div>
        </section>

        {/* 继续学习 */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-slate-900">继续学习</h2>
            <Link href="/my-learning" className="text-sm text-cyan-600 hover:text-cyan-700">
              我的学习 →
            </Link>
          </div>
          <div className="bg-slate-50 rounded-xl p-4">
            {mounted && recentArticles.length > 0 ? (
              <div className="space-y-2">
                {recentArticles.map((article: any) => (
                  <ContinueLearning 
                    key={article.slug}
                    slug={article.slug}
                    title={article.title}
                    progress={article.progress}
                    category={article.category}
                  />
                ))}
              </div>
            ) : (
              <EmptyState
                title="开始你的学习"
                description="阅读文章后，进度会在这里显示"
                action={{ label: '浏览知识地图', href: '/knowledge-map' }}
              />
            )}
          </div>
        </section>
      </div>

      {/* 知识地图入口 */}
      <section className="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-xl p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-slate-900 mb-1">ROS1 知识地图</h2>
            <p className="text-sm text-slate-600">查看完整的知识体系和依赖关系</p>
          </div>
          <Link href="/knowledge-map">
            <Button>查看地图</Button>
          </Link>
        </div>
      </section>

      {/* 快速入口 */}
      <section>
        <h2 className="text-lg font-semibold text-slate-900 mb-4">快速入口</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <Link href="/experiments" className="p-4 rounded-lg bg-white border border-slate-200 hover:border-cyan-300 text-center">
            <div className="text-2xl mb-2">🔬</div>
            <div className="text-sm font-medium">动手实验</div>
          </Link>
          <Link href="/commands" className="p-4 rounded-lg bg-white border border-slate-200 hover:border-cyan-300 text-center">
            <div className="text-2xl mb-2">⚡</div>
            <div className="text-sm font-medium">命令速查</div>
          </Link>
          <Link href="/troubleshoot" className="p-4 rounded-lg bg-white border border-slate-200 hover:border-cyan-300 text-center">
            <div className="text-2xl mb-2">🔧</div>
            <div className="text-sm font-medium">错误排查</div>
          </Link>
          <Link href="/methods" className="p-4 rounded-lg bg-white border border-slate-200 hover:border-cyan-300 text-center">
            <div className="text-2xl mb-2">📚</div>
            <div className="text-sm font-medium">学习方法</div>
          </Link>
        </div>
      </section>

      {/* 学习统计 */}
      {mounted && favorites.length > 0 && (
        <section>
          <div className="flex items-center gap-4 p-4 bg-cyan-50 rounded-lg">
            <div className="text-2xl">⭐</div>
            <div>
              <p className="text-sm text-slate-600">你已收藏 <strong className="text-cyan-700">{favorites.length}</strong> 篇文章</p>
              <Link href="/favorites" className="text-xs text-cyan-600 hover:underline">查看收藏 →</Link>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}