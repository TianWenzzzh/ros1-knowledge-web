'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useUser } from '@/lib/user-context';
import { knowledgeArticles } from '@/lib/data';
import { experiments } from '@/lib/experiments';

export default function MyLearningPage() {
  const { userData, getStats } = useUser();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="text-center py-12">加载中...</div>;
  }

  const stats = getStats();
  
  // 获取最近阅读
  const recentReading = userData.readingProgress
    .filter(r => r.progress > 0)
    .sort((a, b) => new Date(b.lastReadAt).getTime() - new Date(a.lastReadAt).getTime())
    .slice(0, 5)
    .map(r => ({
      ...r,
      article: knowledgeArticles.find(a => a.id === r.articleId)
    }))
    .filter(r => r.article);

  // 计算学习进度
  const totalArticles = knowledgeArticles.length;
  const readArticles = userData.readingProgress.filter(r => r.progress > 0).length;
  const completedArticles = userData.readingProgress.filter(r => r.completed).length;

  return (
    <div className="space-y-8">
      {/* 页面标题 */}
      <div className="text-center py-6">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">我的学习</h1>
        <p className="text-slate-600">查看你的学习进度和数据统计</p>
      </div>

      {/* 统计卡片 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-cyan-600">{stats.favoritesCount}</p>
              <p className="text-sm text-slate-500 mt-1">收藏文章</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-green-600">{stats.articlesRead}</p>
              <p className="text-sm text-slate-500 mt-1">已读文章</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-purple-600">{stats.notesCount}</p>
              <p className="text-sm text-slate-500 mt-1">学习笔记</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-amber-600">{stats.experimentsCompleted}</p>
              <p className="text-sm text-slate-500 mt-1">完成实验</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 学习进度 */}
      <Card>
        <CardHeader>
          <CardTitle>学习进度</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>文章阅读进度</span>
              <span>{readArticles}/{totalArticles}</span>
            </div>
            <Progress value={(readArticles / totalArticles) * 100} className="h-2" />
          </div>
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>实验完成进度</span>
              <span>{stats.experimentsCompleted}/{experiments.length}</span>
            </div>
            <Progress value={(stats.experimentsCompleted / experiments.length) * 100} className="h-2" />
          </div>
        </CardContent>
      </Card>

      {/* 最近阅读 */}
      <Card>
        <CardHeader>
          <CardTitle>最近阅读</CardTitle>
        </CardHeader>
        <CardContent>
          {recentReading.length > 0 ? (
            <div className="space-y-3">
              {recentReading.map(r => (
                <div key={r.articleId} className="flex items-center justify-between">
                  <Link href={`/article/${r.article?.slug}`} className="text-cyan-600 hover:underline">
                    {r.article?.title}
                  </Link>
                  <div className="flex items-center gap-2">
                    {r.completed && <Badge className="bg-green-100 text-green-700">已读完</Badge>}
                    <span className="text-xs text-slate-500">
                      {new Date(r.lastReadAt).toLocaleDateString()}
                    </span>
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
          <CardTitle>已完成实验</CardTitle>
        </CardHeader>
        <CardContent>
          {userData.experimentProgress.filter(e => e.completed).length > 0 ? (
            <div className="space-y-2">
              {userData.experimentProgress
                .filter(e => e.completed)
                .map(e => {
                  const exp = experiments.find(ex => ex.id === e.experimentId);
                  return exp ? (
                    <div key={e.experimentId} className="flex items-center justify-between p-2 bg-green-50 rounded">
                      <Link href={`/experiments/${exp.slug}`} className="text-cyan-600 hover:underline">
                        {exp.title}
                      </Link>
                      <span className="text-xs text-slate-500">
                        {new Date(e.completedAt || '').toLocaleDateString()}
                      </span>
                    </div>
                  ) : null;
                })}
            </div>
          ) : (
            <div className="text-center py-4 text-slate-500">
              还没有完成任何实验
            </div>
          )}
        </CardContent>
      </Card>

      {/* 学习数据 */}
      <Card>
        <CardHeader>
          <CardTitle>学习数据</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-slate-600">
            你的学习数据保存在本地浏览器中，清除浏览器数据会导致学习记录丢失。
          </p>
          <p className="text-xs text-slate-500">
            上次访问：{new Date(userData.lastVisitAt).toLocaleString()}
          </p>
          <p className="text-xs text-slate-500">
            累计访问：{userData.visitCount} 次
          </p>
        </CardContent>
      </Card>
    </div>
  );
}