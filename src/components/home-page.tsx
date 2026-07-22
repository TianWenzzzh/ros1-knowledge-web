'use client';

import React from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CATEGORY_INFO, Category } from '@/lib/types';
import { knowledgeArticles, getArticlesByCategory } from '@/lib/data';

// 分类卡片
function CategoryCard({ category, info }: { category: Category; info: typeof CATEGORY_INFO[Category] }) {
  const articleCount = getArticlesByCategory(category).length;
  return (
    <Link href={`/category/${category}`}>
      <Card className="h-full hover:shadow-lg hover:-translate-y-1 transition-all duration-200 cursor-pointer group">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-3">
            <span className="text-3xl">{info.icon}</span>
            <div>
              <CardTitle className="text-lg group-hover:text-cyan-700">{info.name}</CardTitle>
              <p className="text-xs text-slate-500 mt-1">{articleCount} 篇文章</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <p className="text-sm text-slate-600">{info.description}</p>
        </CardContent>
      </Card>
    </Link>
  );
}

// 精选文章卡片
function FeaturedArticleCard({ article }: { article: typeof knowledgeArticles[0] }) {
  const difficultyColors = {
    beginner: 'bg-green-100 text-green-700',
    intermediate: 'bg-yellow-100 text-yellow-700',
    advanced: 'bg-red-100 text-red-700'
  };
  
  const difficultyLabels = {
    beginner: '入门',
    intermediate: '进阶',
    advanced: '高级'
  };

  return (
    <Link href={`/article/${article.slug}`}>
      <Card className="h-full hover:shadow-md hover:-translate-y-1 transition-all duration-200 cursor-pointer group">
        <CardHeader className="pb-2">
          <div className="flex items-start justify-between gap-2">
            <Badge className={difficultyColors[article.difficulty]}>
              {difficultyLabels[article.difficulty]}
            </Badge>
            <span className="text-xs text-slate-500">{article.readingTime} 分钟</span>
          </div>
          <CardTitle className="text-base mt-2 group-hover:text-cyan-700 line-clamp-2">
            {article.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <p className="text-sm text-slate-600 line-clamp-2">{article.summary}</p>
          <div className="flex flex-wrap gap-1 mt-3">
            {article.tags.slice(0, 3).map(tag => (
              <Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

// 常用命令卡片
function CommandCard({ command, description }: { command: string; description: string }) {
  return (
    <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
      <div>
        <code className="text-sm font-mono text-cyan-700">{command}</code>
        <p className="text-xs text-slate-500 mt-1">{description}</p>
      </div>
      <Button variant="ghost" size="sm" className="text-slate-400 hover:text-slate-600">
        复制
      </Button>
    </div>
  );
}

export default function HomePage() {
  const featuredArticles = knowledgeArticles.slice(0, 6);
  const categories = Object.entries(CATEGORY_INFO) as [Category, typeof CATEGORY_INFO[Category]][];
  
  const quickCommands = [
    { command: 'roscore', description: '启动 ROS Master' },
    { command: 'rostopic list', description: '列出所有话题' },
    { command: 'rosnode list', description: '列出所有节点' },
    { command: 'catkin_make', description: '编译工作空间' },
    { command: 'roslaunch pkg file.launch', description: '启动 launch 文件' },
    { command: 'rosbag record -a', description: '录制所有话题' },
  ];

  return (
    <div className="space-y-8">
      {/* Hero 搜索区 */}
      <section className="text-center py-8 md:py-12 bg-gradient-to-b from-slate-50 to-white rounded-xl">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
          ROS1 知识库
        </h1>
        <p className="text-lg text-slate-600 mb-6 max-w-2xl mx-auto">
          面向学生的机器人操作系统学习平台，从入门到实践的一站式知识导航
        </p>
        
        {/* 搜索框 */}
        <form action="/search" method="get" className="max-w-2xl mx-auto px-4">
          <div className="relative">
            <Input
              type="search"
              name="q"
              placeholder="搜索知识文章、命令、概念..."
              className="h-14 text-lg pl-12 pr-4 rounded-full border-2 border-slate-200 focus:border-cyan-500 focus:ring-cyan-500"
            />
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl">🔍</span>
          </div>
        </form>
        
        {/* 快捷入口 */}
        <div className="flex flex-wrap justify-center gap-2 mt-6 px-4">
          <Link href="/knowledge-map">
            <Button variant="outline" size="sm">🗺️ 知识地图</Button>
          </Link>
          <Link href="/experiments">
            <Button variant="outline" size="sm">🔬 动手实验</Button>
          </Link>
          <Link href="/commands">
            <Button variant="outline" size="sm">⚡ 命令速查</Button>
          </Link>
          <Link href="/troubleshoot">
            <Button variant="outline" size="sm">🔧 错误排查</Button>
          </Link>
        </div>
      </section>

      {/* 知识分类 */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-slate-900">知识分类</h2>
          <Link href="/knowledge-map" className="text-sm text-cyan-600 hover:text-cyan-700">
            查看完整地图 →
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {categories.map(([key, info]) => (
            <CategoryCard key={key} category={key} info={info} />
          ))}
        </div>
      </section>

      {/* 精选知识文章 */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-slate-900">精选知识文章</h2>
          <Link href="/knowledge-map" className="text-sm text-cyan-600 hover:text-cyan-700">
            查看全部 →
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {featuredArticles.map(article => (
            <FeaturedArticleCard key={article.id} article={article} />
          ))}
        </div>
      </section>

      {/* 今日自学建议 */}
      <section className="bg-cyan-50 rounded-xl p-6">
        <h2 className="text-xl font-bold text-slate-900 mb-4">💡 今日自学建议</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <h3 className="font-semibold text-slate-900 mb-2">新手入门</h3>
            <p className="text-sm text-slate-600 mb-3">建议先了解 ROS 架构概念，然后运行小海龟实验。</p>
            <Link href="/article/ros-architecture">
              <Button size="sm" className="w-full">开始学习</Button>
            </Link>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <h3 className="font-semibold text-slate-900 mb-2">动手实践</h3>
            <p className="text-sm text-slate-600 mb-3">完成了基础概念？来动手实验环节亲自操作吧。</p>
            <Link href="/experiments/turtlesim">
              <Button size="sm" variant="outline" className="w-full">开始实验</Button>
            </Link>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <h3 className="font-semibold text-slate-900 mb-2">进阶导航</h3>
            <p className="text-sm text-slate-600 mb-3">学习 SLAM 建图和自主导航，让机器人动起来。</p>
            <Link href="/article/slam-mapping">
              <Button size="sm" variant="outline" className="w-full">继续学习</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 常用命令 */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-slate-900">常用命令</h2>
          <Link href="/commands" className="text-sm text-cyan-600 hover:text-cyan-700">
            查看全部 →
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {quickCommands.map(cmd => (
            <CommandCard key={cmd.command} command={cmd.command} description={cmd.description} />
          ))}
        </div>
      </section>

      {/* 错误排查入口 */}
      <section className="bg-red-50 rounded-xl p-6">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-900 mb-2">🔧 遇到问题？</h2>
            <p className="text-slate-600 mb-4">
              查看常见错误和解决方案，快速定位问题
            </p>
            <Link href="/troubleshoot">
              <Button>进入错误排查</Button>
            </Link>
          </div>
          <div className="text-6xl">🛠️</div>
        </div>
      </section>

      {/* ROS1 知识地图入口 */}
      <section className="bg-slate-900 text-white rounded-xl p-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl font-bold mb-2">🗺️ ROS1 知识地图</h2>
            <p className="text-slate-300 max-w-xl">
              系统化的知识结构图，帮助你了解 ROS1 的完整知识体系和学习路径
            </p>
          </div>
          <Link href="/knowledge-map">
            <Button size="lg" className="bg-cyan-500 hover:bg-cyan-600">
              查看知识地图
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}