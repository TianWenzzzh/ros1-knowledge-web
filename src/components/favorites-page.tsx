'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useUser } from '@/lib/user-context';
import { knowledgeArticles } from '@/lib/data';

export default function FavoritesPage() {
  const { userData, removeFavorite, getNotesForArticle, deleteNote } = useUser();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const favoriteArticles = mounted
    ? knowledgeArticles.filter(a => userData.favorites.includes(a.id))
    : [];

  const allNotes = mounted ? userData.notes : [];

  if (!mounted) {
    return <div className="text-center py-12">加载中...</div>;
  }

  return (
    <div className="space-y-6">
      {/* 页面标题 */}
      <div className="text-center py-6">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">收藏与笔记</h1>
        <p className="text-slate-600">管理你收藏的知识文章和学习笔记</p>
      </div>

      <Tabs defaultValue="favorites" className="space-y-6">
        <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
          <TabsTrigger value="favorites">收藏文章 ({favoriteArticles.length})</TabsTrigger>
          <TabsTrigger value="notes">学习笔记 ({allNotes.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="favorites" className="space-y-4">
          {favoriteArticles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {favoriteArticles.map(article => (
                <Card key={article.id} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between">
                      <Link href={`/article/${article.slug}`}>
                        <CardTitle className="text-base hover:text-cyan-700 cursor-pointer">
                          {article.title}
                        </CardTitle>
                      </Link>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFavorite(article.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        取消收藏
                      </Button>
                    </div>
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
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-slate-50 rounded-lg">
              <p className="text-slate-500 mb-4">还没有收藏任何文章</p>
              <Link href="/">
                <Button>去浏览文章</Button>
              </Link>
            </div>
          )}
        </TabsContent>

        <TabsContent value="notes" className="space-y-4">
          {allNotes.length > 0 ? (
            <div className="space-y-4">
              {allNotes.map(note => {
                const article = knowledgeArticles.find(a => a.id === note.articleId);
                return (
                  <Card key={note.id}>
                    <CardHeader className="pb-2">
                      <div className="flex items-start justify-between">
                        <div>
                          {article && (
                            <Link href={`/article/${article.slug}`} className="text-sm text-cyan-600 hover:underline">
                              {article.title}
                            </Link>
                          )}
                          <p className="text-xs text-slate-500 mt-1">
                            {new Date(note.updatedAt).toLocaleString()}
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => deleteNote(note.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          删除
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-slate-700">{note.content}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12 bg-slate-50 rounded-lg">
              <p className="text-slate-500 mb-4">还没有添加任何笔记</p>
              <Link href="/">
                <Button>去浏览文章</Button>
              </Link>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}