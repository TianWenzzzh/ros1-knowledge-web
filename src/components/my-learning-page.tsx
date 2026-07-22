'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useUserContext } from '@/lib/user-context';
import { knowledgeArticles } from '@/lib/data';
import { experiments } from '@/lib/experiments';
import type { ReadingProgress } from '@/lib/types';

export default function MyLearningPage() {
  const { readingProgress, favorites, completedExperiments } = useUserContext();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // 统计数据
  const stats = useMemo(() => {
    if (!mounted) return { articlesRead: 0, favoritesCount: 0, experimentsCompleted: 0 };
    
    const articlesRead = Object.values(readingProgress).filter((r: ReadingProgress) => r.completed).length;
    const favoritesCount = favorites.length;
    const experimentsCompleted = completedExperiments.length;
    
    return { articlesRead, favoritesCount, experimentsCompleted };
  }, [mounted, readingProgress, favorites, completedExperiments]);

  // 最近阅读的文章
  const recentArticles = useMemo(() => {
    if (!mounted) return [];
    
    return Object.entries(readingProgress)
      .sort((a, b) => new Date(b[1].lastReadAt).getTime() - new Date(a[1].lastReadAt).getTime())
      .slice(0, 5)
      .map(([slug, progress]: [string, ReadingProgress]) => {
        const article = knowledgeArticles.find(a => a.slug === slug);
        return article ? { ...article, progress: progress.progress } : null;
      })
      .filter(Boolean);
  }, [mounted, readingProgress]);

  // 已完成的实验
  const completedExperimentList = useMemo(() => {
    if (!mounted) return [];
    return experiments.filter(e => completedExperiments.includes(e.id));
  }, [mounted, completedExperiments]);

  if (!mounted) {
    return <div className="text-center py-12">加载中...</div>;
  }

  return (
    <div className="space-y-8">
      {/* 页面标题 */}
      <div className="text-center py-6">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">我的学习</h1>
        <p className="text-slate-600">查看学习进度和统计数据</p>
      </div>

      {/* 学习统计 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-4xl font-bold text-cyan-600">{stats.articlesRead}</p>
              <p className="text-sm text-slate-500 mt-1">篇文章已学完</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-4xl font-bold text-yellow-600">{stats.favoritesCount}</p>
              <p className="text-sm text-slate-500 mt-1">篇文章已收藏</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-4xl font-bold text-green-600">{stats.experimentsCompleted}</p>
              <p className="text-sm text-slate-500 mt-1">个实验已完成</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 最近阅读 */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">最近阅读</CardTitle>
        </CardHeader>
        <CardContent>
          {recentArticles.length > 0 ? (
            <div className="space-y-3">
              {recentArticles.map((article: any) => (
                <div key={article.slug} className="flex items-center gap-4">
                  <Link 
                    href={`/article/${article.slug}`}
                    className="flex-1 font-medium text-slate-900 hover:text-cyan-600"
                  >
                    {article.title}
                  </Link>
                  <div className="flex items-center gap-2 w-32">
                    <Progress value={article.progress} className="h-2" />
                    <span className="text-xs text-slate-500">{article.progress}%</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-4 text-slate-500">
              还没有阅读记录
            </div>
          )}
        </CardContent>
      </Card>

      {/* 已完成实验 */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">已完成实验</CardTitle>
        </CardHeader>
        <CardContent>
          {completedExperimentList.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {completedExperimentList.map(experiment => (
                <div key={experiment.id} className="flex items-center gap-2 p-3 bg-green-50 rounded-lg">
                  <Badge variant="outline" className="bg-green-100">✓</Badge>
                  <span className="text-sm">{experiment.title}</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-4 text-slate-500">
              还没有完成实验
            </div>
          )}
        </CardContent>
      </Card>

      {/* 学习建议 */}
      <Card className="bg-cyan-50 border-cyan-200">
        <CardContent className="pt-6">
          <h3 className="font-semibold text-cyan-900 mb-2">继续学习</h3>
          <p className="text-sm text-cyan-700">
            建议按照知识地图的顺序学习，每个章节都有实践练习帮助你巩固所学内容。
          </p>
          <Link href="/knowledge-map">
            <Button className="mt-4">查看知识地图</Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}