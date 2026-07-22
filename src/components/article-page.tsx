'use client';

import React, { useState, useEffect, use } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { getArticleBySlug, getRecommendedArticles, knowledgeArticles } from '@/lib/data';
import { useUser } from '@/lib/user-context';
import type { KnowledgeArticle } from '@/lib/types';

// 代码块组件
function CodeBlock({ code, language, description }: { code: string; language: string; description?: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="my-4">
      {description && <p className="text-sm text-slate-600 mb-2">{description}</p>}
      <div className="relative group">
        <pre className="bg-slate-900 text-slate-100 rounded-lg p-4 overflow-x-auto text-sm">
          <code className={`language-${language}`}>{code}</code>
        </pre>
        <Button
          size="sm"
          variant="secondary"
          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={handleCopy}
        >
          {copied ? '已复制' : '复制'}
        </Button>
      </div>
    </div>
  );
}

// 错误项组件
function ErrorItem({ error, cause, solution }: { error: string; cause: string; solution: string }) {
  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-4 my-4">
      <h4 className="font-semibold text-red-800 mb-2">❌ {error}</h4>
      <p className="text-sm text-slate-700 mb-1"><strong>原因：</strong>{cause}</p>
      <p className="text-sm text-slate-700"><strong>解决：</strong>{solution}</p>
    </div>
  );
}

// 目录组件
function TableOfContents({ content }: { content: KnowledgeArticle['content'] }) {
  const sections = [
    { id: 'explanation', title: '概念解释' },
    { id: 'why', title: '为什么重要' },
    { id: 'code', title: '代码示例' },
    { id: 'errors', title: '常见错误' },
    { id: 'tips', title: '学习技巧' },
    { id: 'practice', title: '动手练习' },
    { id: 'sources', title: '官方来源' },
  ];

  return (
    <div className="sticky top-20">
      <h3 className="font-semibold text-slate-900 mb-3">目录</h3>
      <nav className="space-y-2">
        {sections.map(section => (
          <a
            key={section.id}
            href={`#${section.id}`}
            className="block text-sm text-slate-600 hover:text-cyan-600 transition-colors"
          >
            {section.title}
          </a>
        ))}
      </nav>
    </div>
  );
}

export default function ArticlePage() {
  const params = useParams();
  const slug = params.slug as string;
  const article = getArticleBySlug(slug);
  const { isFavorite, addFavorite, removeFavorite, addNote, getNotesForArticle, updateReadingProgress } = useUser();
  const [noteContent, setNoteContent] = useState('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && article) {
      updateReadingProgress(article.id, 100);
    }
  }, [mounted, article, updateReadingProgress]);

  if (!article) {
    return (
      <div className="text-center py-20">
        <h1 className="text-2xl font-bold text-slate-900 mb-4">文章未找到</h1>
        <p className="text-slate-600 mb-6">该文章可能已被删除或链接错误</p>
        <Link href="/">
          <Button>返回首页</Button>
        </Link>
      </div>
    );
  }

  const recommended = getRecommendedArticles(article.slug);
  const isFav = mounted ? isFavorite(article.id) : false;
  const notes = mounted ? getNotesForArticle(article.id) : [];
  const categoryInfo = {
    'linux-ubuntu': { name: 'Linux/Ubuntu', icon: '🐧' },
    'ros-basics': { name: 'ROS基础', icon: '🤖' },
    'communication': { name: '通信机制', icon: '📡' },
    'tools': { name: '工具', icon: '🔧' },
    'transform': { name: '坐标与模型', icon: '📐' },
    'simulation': { name: '仿真', icon: '🎮' },
    'navigation': { name: '导航', icon: '🧭' },
    'vision': { name: '视觉', icon: '👁️' },
    'manipulation': { name: '机械臂', icon: '🦾' },
    'debug-migration': { name: '调试与迁移', icon: '🐛' },
  } as const;

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

  const handleToggleFavorite = () => {
    if (isFav) {
      removeFavorite(article.id);
    } else {
      addFavorite(article.id);
    }
  };

  const handleAddNote = () => {
    if (noteContent.trim()) {
      addNote(article.id, noteContent.trim());
      setNoteContent('');
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
      {/* 主内容区 */}
      <div className="lg:col-span-3 space-y-6">
        {/* 文章头部 */}
        <header className="space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <Link href={`/category/${article.category}`} className="text-sm text-cyan-600 hover:underline">
              {categoryInfo[article.category]?.icon} {categoryInfo[article.category]?.name}
            </Link>
            <span className="text-slate-400">•</span>
            <Badge className={difficultyColors[article.difficulty]}>
              {difficultyLabels[article.difficulty]}
            </Badge>
            <span className="text-slate-400">•</span>
            <span className="text-sm text-slate-500">{article.readingTime} 分钟阅读</span>
          </div>
          
          <h1 className="text-3xl font-bold text-slate-900">{article.title}</h1>
          <p className="text-lg text-slate-600">{article.summary}</p>
          
          <div className="flex flex-wrap gap-2">
            {article.tags.map(tag => (
              <Badge key={tag} variant="outline">{tag}</Badge>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant={isFav ? 'default' : 'outline'}
              size="sm"
              onClick={handleToggleFavorite}
            >
              {isFav ? '★ 已收藏' : '☆ 收藏'}
            </Button>
          </div>
        </header>

        <Separator />

        {/* 先修知识 */}
        {article.prerequisites.length > 0 && (
          <Card className="bg-blue-50 border-blue-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">📌 先修知识</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-1 text-sm text-slate-700">
                {article.prerequisites.map(prereq => {
                  const prereqArticle = knowledgeArticles.find(a => a.id === prereq);
                  return (
                    <li key={prereq}>
                      {prereqArticle ? (
                        <Link href={`/article/${prereqArticle.slug}`} className="text-cyan-600 hover:underline">
                          {prereqArticle.title}
                        </Link>
                      ) : prereq}
                    </li>
                  );
                })}
              </ul>
            </CardContent>
          </Card>
        )}

        {/* 概念解释 */}
        <section id="explanation" className="space-y-4">
          <h2 className="text-xl font-bold text-slate-900">📖 概念解释</h2>
          <div className="prose prose-slate max-w-none">
            <div className="whitespace-pre-wrap text-slate-700">{article.content.explanation}</div>
          </div>
        </section>

        {/* 为什么重要 */}
        <section id="why" className="space-y-4">
          <h2 className="text-xl font-bold text-slate-900">💡 为什么重要</h2>
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <p className="text-slate-700">{article.content.whyImportant}</p>
          </div>
        </section>

        {/* 代码示例 */}
        <section id="code" className="space-y-4">
          <h2 className="text-xl font-bold text-slate-900">💻 代码示例</h2>
          {article.content.codeExamples.map((example, index) => (
            <div key={index}>
              <CodeBlock
                code={example.code}
                language={example.language}
                description={example.description}
              />
              {example.expectedOutput && (
                <p className="text-sm text-slate-500 mt-2">
                  <strong>预期输出：</strong>{example.expectedOutput}
                </p>
              )}
            </div>
          ))}
        </section>

        {/* 常见错误 */}
        <section id="errors" className="space-y-4">
          <h2 className="text-xl font-bold text-slate-900">⚠️ 常见错误</h2>
          {article.content.commonErrors.map((error, index) => (
            <ErrorItem
              key={index}
              error={error.error}
              cause={error.cause}
              solution={error.solution}
            />
          ))}
        </section>

        {/* 学习技巧 */}
        <section id="tips" className="space-y-4">
          <h2 className="text-xl font-bold text-slate-900">✨ 学习技巧</h2>
          <ul className="space-y-2">
            {article.content.tips.map((tip, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-green-500">✓</span>
                <span className="text-slate-700">{tip}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* 动手练习 */}
        <section id="practice" className="space-y-4">
          <h2 className="text-xl font-bold text-slate-900">🔬 动手练习</h2>
          <ol className="list-decimal list-inside space-y-2">
            {article.content.practice.map((practice, index) => (
              <li key={index} className="text-slate-700">{practice}</li>
            ))}
          </ol>
        </section>

        {/* 官方来源 */}
        <section id="sources" className="space-y-4">
          <h2 className="text-xl font-bold text-slate-900">🔗 官方来源</h2>
          <ul className="space-y-2">
            {article.officialSources.map((source, index) => (
              <li key={index}>
                <a
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-600 hover:underline"
                >
                  {source.title}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-4">
            <p className="text-sm text-slate-500">
              <strong>适用版本：</strong>{article.applicableVersions.join(', ')}
            </p>
          </div>
        </section>

        {/* 个人笔记 */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-slate-900">📝 我的笔记</h2>
          <div className="space-y-3">
            <Textarea
              placeholder="记录你的学习笔记..."
              value={noteContent}
              onChange={(e) => setNoteContent(e.target.value)}
              className="min-h-24"
            />
            <Button onClick={handleAddNote}>保存笔记</Button>
          </div>
          {notes.length > 0 && (
            <div className="space-y-2 mt-4">
              {notes.map(note => (
                <div key={note.id} className="bg-slate-50 rounded-lg p-3">
                  <p className="text-sm text-slate-700">{note.content}</p>
                  <p className="text-xs text-slate-500 mt-1">
                    {new Date(note.updatedAt).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* 推荐文章 */}
        {recommended.length > 0 && (
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-slate-900">📚 相关文章</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {recommended.map(rec => (
                <Link key={rec.id} href={`/article/${rec.slug}`}>
                  <Card className="h-full hover:shadow-md transition-shadow cursor-pointer">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm line-clamp-2">{rec.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-xs text-slate-500">{rec.readingTime} 分钟</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* 右侧目录 */}
      <aside className="hidden lg:block">
        <TableOfContents content={article.content} />
      </aside>
    </div>
  );
}