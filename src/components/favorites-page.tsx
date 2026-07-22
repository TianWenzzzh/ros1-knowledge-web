'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useUserContext } from '@/lib/user-context';
import { knowledgeArticles } from '@/lib/data';
import type { UserNote } from '@/lib/types';

export default function FavoritesPage() {
  const { favorites, notes, toggleFavorite, addNote } = useUserContext();
  const [mounted, setMounted] = useState(false);
  const [activeNote, setActiveNote] = useState<string | null>(null);
  const [noteContent, setNoteContent] = useState('');

  useEffect(() => {
    setMounted(true);
  }, []);

  const favoriteArticles = useMemo(() => {
    return mounted ? knowledgeArticles.filter(a => favorites.includes(a.slug)) : [];
  }, [mounted, favorites]);

  const allNotes = useMemo(() => {
    return mounted ? notes : [];
  }, [mounted, notes]);

  const handleSaveNote = (articleId: string) => {
    if (noteContent.trim()) {
      addNote(articleId, noteContent);
      setActiveNote(null);
      setNoteContent('');
    }
  };

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
                    <div className="flex items-start justify-between gap-2">
                      <Link href={`/article/${article.slug}`} className="hover:text-cyan-600">
                        <CardTitle className="text-lg">{article.title}</CardTitle>
                      </Link>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleFavorite(article.slug)}
                        className="text-yellow-500"
                      >
                        ★
                      </Button>
                    </div>
                    <Badge variant="outline">{article.readingTime} 分钟阅读</Badge>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-slate-600 line-clamp-2">{article.summary}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-slate-500 mb-4">还没有收藏任何文章</p>
              <Link href="/">
                <Button>浏览文章</Button>
              </Link>
            </div>
          )}
        </TabsContent>

        <TabsContent value="notes" className="space-y-4">
          {allNotes.length > 0 ? (
            <div className="space-y-4">
              {allNotes.map((note: UserNote) => {
                const article = knowledgeArticles.find(a => a.slug === note.articleId);
                return (
                  <Card key={note.id}>
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        {article && (
                          <Link href={`/article/${article.slug}`} className="text-sm text-cyan-600 hover:underline">
                            {article.title}
                          </Link>
                        )}
                        <span className="text-xs text-slate-500">
                          {new Date(note.updatedAt).toLocaleDateString()}
                        </span>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-slate-700 whitespace-pre-wrap">{note.content}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-slate-500">还没有笔记</p>
              <p className="text-sm text-slate-400 mt-1">在文章页面可以添加学习笔记</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}