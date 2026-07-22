'use client';

import React, { Suspense } from 'react';
import { use } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CATEGORY_INFO, Category } from '@/lib/types';
import { knowledgeArticles } from '@/lib/data';

function CategoryPageContent({ params }: { params: Promise<{ category: string }> }) {
  const resolvedParams = use(params);
  const category = resolvedParams.category as Category;
  const info = CATEGORY_INFO[category];

  if (!info) {
    return (
      <div className="text-center py-20">
        <h1 className="text-2xl font-bold text-slate-900 mb-4">分类未找到</h1>
        <p className="text-slate-600 mb-6">该分类可能不存在</p>
        <Link href="/">
          <Button>返回首页</Button>
        </Link>
      </div>
    );
  }

  const articles = knowledgeArticles.filter(a => a.category === category);

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
    <div className="space-y-6">
      {/* 分类头部 */}
      <div className="text-center py-6 bg-slate-50 rounded-xl">
        <span className="text-4xl mb-3 block">{info.icon}</span>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">{info.name}</h1>
        <p className="text-slate-600">{info.description}</p>
        <p className="text-sm text-slate-500 mt-2">{articles.length} 篇文章</p>
      </div>

      {/* 文章列表 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {articles.map(article => (
          <Link key={article.id} href={`/article/${article.slug}`}>
            <Card className="h-full hover:shadow-md hover:-translate-y-1 transition-all cursor-pointer">
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <Badge className={difficultyColors[article.difficulty]}>
                    {difficultyLabels[article.difficulty]}
                  </Badge>
                  <span className="text-xs text-slate-500">{article.readingTime} 分钟</span>
                </div>
                <CardTitle className="text-base mt-2">{article.title}</CardTitle>
                <CardDescription className="mt-2 line-clamp-2">{article.summary}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-1">
                  {article.tags.slice(0, 3).map(tag => (
                    <Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {articles.length === 0 && (
        <div className="text-center py-12 bg-slate-50 rounded-lg">
          <p className="text-slate-500">该分类暂无文章</p>
        </div>
      )}

      {/* 返回导航 */}
      <div className="flex justify-center">
        <Link href="/knowledge-map">
          <Button variant="outline">查看知识地图</Button>
        </Link>
      </div>
    </div>
  );
}

export default function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  return (
    <Suspense fallback={<div className="text-center py-12">加载中...</div>}>
      <CategoryPageContent params={params} />
    </Suspense>
  );
}