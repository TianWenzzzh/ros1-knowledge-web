'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { knowledgeArticles } from '@/lib/data';

function SearchPageContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const [searchQuery, setSearchQuery] = useState(query);
  const [results, setResults] = useState(knowledgeArticles);

  useEffect(() => {
    if (searchQuery.trim()) {
      const lowerQuery = searchQuery.toLowerCase();
      const filtered = knowledgeArticles.filter(
        a =>
          a.title.toLowerCase().includes(lowerQuery) ||
          a.summary.toLowerCase().includes(lowerQuery) ||
          a.tags.some(t => t.toLowerCase().includes(lowerQuery)) ||
          a.content.explanation.toLowerCase().includes(lowerQuery)
      );
      setResults(filtered);
    } else {
      setResults(knowledgeArticles);
    }
  }, [searchQuery]);

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
      {/* 搜索框 */}
      <div className="max-w-2xl mx-auto">
        <Input
          type="search"
          placeholder="搜索知识文章..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="h-12 text-lg"
        />
      </div>

      {/* 搜索结果 */}
      <div className="space-y-4">
        <p className="text-sm text-slate-500">
          找到 {results.length} 篇相关文章
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {results.map(article => (
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
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-slate-600 line-clamp-2">{article.summary}</p>
                  <div className="flex flex-wrap gap-1 mt-3">
                    {article.tags.slice(0, 3).map(tag => (
                      <Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {results.length === 0 && (
          <div className="text-center py-12">
            <p className="text-slate-500 mb-4">没有找到匹配的文章</p>
            <Link href="/">
              <span className="text-cyan-600 hover:underline">返回首页</span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="text-center py-12">加载中...</div>}>
      <SearchPageContent />
    </Suspense>
  );
}