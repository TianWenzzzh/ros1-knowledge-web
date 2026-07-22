'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TableOfContents } from '@/components/table-of-contents';
import { Breadcrumbs, ArticleNavigation, getCategoryBreadcrumbs } from '@/components/navigation-components';
import { 
  Callout, 
  ROS1EOLNotice, 
  PrerequisiteList, 
  LearningObjectives,
  MinimalPractice,
  NextSteps
} from '@/components/callout';
import { InlineQuiz, useWrongAnswers } from '@/components/quiz';
import { knowledgeArticles } from '@/lib/data';
import { CATEGORY_INFO, type Category } from '@/lib/types';
import { useUserContext } from '@/lib/user-context';

interface CodeBlockProps {
  language: string;
  code: string;
  description?: string;
  expectedOutput?: string;
  prerequisites?: string[];
}

function CodeBlock({ language, code, description, expectedOutput, prerequisites }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="my-4">
      {description && (
        <p className="text-sm text-slate-600 mb-2">{description}</p>
      )}
      {prerequisites && prerequisites.length > 0 && (
        <div className="text-xs text-slate-500 mb-2">
          <span className="font-medium">执行前提：</span>
          {prerequisites.join('、')}
        </div>
      )}
      <div className="relative group">
        <div className="absolute right-2 top-2 z-10 flex gap-2">
          <Badge variant="outline" className="text-xs bg-slate-800 text-slate-300 border-slate-600">
            {language}
          </Badge>
          <button
            onClick={handleCopy}
            className="px-2 py-1 bg-slate-700 hover:bg-slate-600 rounded text-xs text-slate-200 transition-colors"
            aria-label="复制代码"
          >
            {copied ? '已复制' : '复制'}
          </button>
        </div>
        <pre className="overflow-x-auto p-4 bg-slate-900 rounded-lg text-sm">
          <code className="text-slate-200 font-mono">{code}</code>
        </pre>
      </div>
      {expectedOutput && (
        <div className="mt-2 p-3 bg-green-50 rounded-lg border border-green-200">
          <p className="text-xs font-medium text-green-800 mb-1">预期输出：</p>
          <pre className="text-xs text-green-700 font-mono whitespace-pre-wrap">{expectedOutput}</pre>
        </div>
      )}
    </div>
  );
}

export function ArticlePage() {
  const params = useParams();
  const slug = params?.slug as string;
  const { favorites, notes, toggleFavorite, addNote, readingProgress, updateProgress } = useUserContext();
  const { addWrongAnswer } = useWrongAnswers();
  
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // 查找文章
  const article = useMemo(() => {
    return knowledgeArticles.find(a => a.slug === slug);
  }, [slug]);

  // 相关文章（上一篇/下一篇）
  const { prevArticle, nextArticle } = useMemo(() => {
    if (!article) return { prevArticle: null, nextArticle: null };
    
    const currentIndex = knowledgeArticles.findIndex(a => a.slug === slug);
    return {
      prevArticle: currentIndex > 0 ? knowledgeArticles[currentIndex - 1] : null,
      nextArticle: currentIndex < knowledgeArticles.length - 1 ? knowledgeArticles[currentIndex + 1] : null,
    };
  }, [article, slug]);

  // 从文章内容提取目录项
  const tocItems = useMemo(() => {
    if (!article) return [];
    
    const items: { id: string; text: string; level: number }[] = [
      { id: 'objectives', text: '学习目标', level: 2 },
      { id: 'prerequisites', text: '前置条件', level: 2 },
      { id: 'explanation', text: '核心概念', level: 2 },
    ];
    
    if (article.content.codeExamples.length > 0) {
      items.push({ id: 'code-examples', text: '代码示例', level: 2 });
    }
    
    if (article.minimalPractice) {
      items.push({ id: 'minimal-practice', text: '动手实践', level: 2 });
    }
    
    if (article.quizzes && article.quizzes.length > 0) {
      items.push({ id: 'quizzes', text: '自测检验', level: 2 });
    }
    
    items.push({ id: 'common-errors', text: '常见错误', level: 2 });
    items.push({ id: 'tips', text: '学习技巧', level: 2 });
    items.push({ id: 'next-steps', text: '下一步', level: 2 });
    items.push({ id: 'sources', text: '参考来源', level: 2 });
    
    return items;
  }, [article]);

  // 收藏状态
  const isFavorite = useMemo(() => {
    return favorites.includes(slug);
  }, [favorites, slug]);

  // 笔记内容
  const noteContent = useMemo(() => {
    return notes.find(n => n.articleId === slug)?.content || '';
  }, [notes, slug]);

  const [localNote, setLocalNote] = useState(noteContent);
  const [showNoteInput, setShowNoteInput] = useState(false);

  useEffect(() => {
    setLocalNote(noteContent);
  }, [noteContent]);

  // 阅读进度
  useEffect(() => {
    if (!mounted || !article) return;
    
    // 标记开始阅读
    updateProgress(slug, 0);

    // 滚动进度追踪
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? Math.min(100, Math.round((scrollTop / docHeight) * 100)) : 0;
      updateProgress(slug, progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [mounted, article, slug, updateProgress]);

  // 处理小测完成
  const handleQuizComplete = useCallback((quizId: string, correct: boolean, articleId: string) => {
    if (!correct) {
      const quiz = article?.quizzes?.find(q => q.id === quizId);
      if (quiz) {
        addWrongAnswer({
          quizId,
          articleId,
          question: quiz.question,
          selectedOption: -1,
          correctAnswer: quiz.correctAnswer,
        });
      }
    }
  }, [article, addWrongAnswer]);

  // 保存笔记
  const handleSaveNote = () => {
    addNote(slug, localNote);
    setShowNoteInput(false);
  };

  if (!mounted) {
    return (
      <div className="animate-pulse">
        <div className="h-8 bg-slate-200 rounded w-1/3 mb-4" />
        <div className="h-12 bg-slate-200 rounded w-2/3 mb-6" />
        <div className="h-64 bg-slate-200 rounded" />
      </div>
    );
  }

  if (!article) {
    return (
      <div className="text-center py-16">
        <h1 className="text-2xl font-bold text-slate-900 mb-4">文章未找到</h1>
        <p className="text-slate-600 mb-6">该文章可能已被移动或删除。</p>
        <Link href="/">
          <Button>返回首页</Button>
        </Link>
      </div>
    );
  }

  const categoryInfo = CATEGORY_INFO[article.category];

  return (
    <div className="max-w-none">
      {/* 面包屑 */}
      <Breadcrumbs items={getCategoryBreadcrumbs(article.category, article.title)} />

      {/* 文章头部 */}
      <header className="mb-8">
        <div className="flex items-center gap-2 mb-3">
          <Badge variant="outline" className="text-cyan-700 border-cyan-300">
            {categoryInfo?.icon} {categoryInfo?.name}
          </Badge>
          <Badge variant="secondary" className="text-xs">
            {article.readingTime} 分钟阅读
          </Badge>
          <Badge variant="outline" className="text-xs">
            ROS1 Noetic
          </Badge>
        </div>
        
        <h1 className="text-3xl font-bold text-slate-900 mb-4">
          {article.title}
        </h1>
        
        <p className="text-lg text-slate-600 leading-relaxed">
          {article.summary}
        </p>

        {/* 操作按钮 */}
        <div className="flex items-center gap-3 mt-4">
          <Button
            variant={isFavorite ? 'default' : 'outline'}
            size="sm"
            onClick={() => toggleFavorite(slug)}
          >
            {isFavorite ? '★ 已收藏' : '☆ 收藏'}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowNoteInput(!showNoteInput)}
          >
            📝 笔记
          </Button>
        </div>

        {/* 笔记输入 */}
        {showNoteInput && (
          <div className="mt-4 p-4 bg-slate-50 rounded-lg">
            <textarea
              value={localNote}
              onChange={(e) => setLocalNote(e.target.value)}
              placeholder="在这里记录你的学习笔记..."
              className="w-full h-24 p-2 border border-slate-200 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
            <div className="flex justify-end gap-2 mt-2">
              <Button variant="ghost" size="sm" onClick={() => setShowNoteInput(false)}>
                取消
              </Button>
              <Button size="sm" onClick={handleSaveNote}>
                保存笔记
              </Button>
            </div>
          </div>
        )}
      </header>

      {/* EOL 提示 */}
      <ROS1EOLNotice />

      {/* 文章正文 */}
      <article className="prose prose-slate max-w-none">
        {/* 学习目标 */}
        <section id="objectives">
          <LearningObjectives objectives={article.learningObjectives ?? []} />
        </section>

        {/* 前置条件 */}
        <section id="prerequisites">
          {article.prerequisites.length > 0 && (
            <PrerequisiteList items={article.prerequisites} />
          )}
        </section>

        {/* 核心概念 */}
        <section id="explanation">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">核心概念</h2>
          
          <Callout type="info" title="为什么重要">
            {article.content.whyImportant}
          </Callout>

          <div className="mt-6 text-slate-700 leading-relaxed">
            <div className="whitespace-pre-wrap">{article.content.explanation}</div>
          </div>
        </section>

        {/* 代码示例 */}
        {article.content.codeExamples.length > 0 && (
          <section id="code-examples">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">代码示例</h2>
            {article.content.codeExamples.map((example, index) => (
              <CodeBlock
                key={index}
                language={example.language}
                code={example.code}
                description={example.description}
                expectedOutput={example.expectedOutput}
                prerequisites={example.prerequisites}
              />
            ))}
          </section>
        )}

        {/* 最小实践 */}
        {article.minimalPractice && (
          <section id="minimal-practice">
            <MinimalPractice
              title={article.minimalPractice.title}
              duration={article.minimalPractice.duration}
              steps={article.minimalPractice.steps.map(s => s.description)}
              verificationCommand={article.minimalPractice.steps.find(s => s.verification)?.verification}
            />
          </section>
        )}

        {/* 自测题 */}
        {article.quizzes && article.quizzes.length > 0 && (
          <section id="quizzes">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">自测检验</h2>
            <p className="text-slate-600 mb-4">
              完成以下问题检验学习效果，错题会自动保存到错题本。
            </p>
            {article.quizzes.map((quiz, index) => (
              <InlineQuiz
                key={quiz.id}
                quiz={quiz}
                onComplete={(correct) => handleQuizComplete(quiz.id, correct, article.slug)}
              />
            ))}
          </section>
        )}

        {/* 常见错误 */}
        <section id="common-errors">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">常见错误</h2>
          {article.content.commonErrors.map((error, index) => (
            <Callout key={index} type="warning" title={error.error}>
              <p className="mb-2"><strong>原因：</strong>{error.cause}</p>
              <p><strong>解决：</strong>{error.solution}</p>
            </Callout>
          ))}
        </section>

        {/* 学习技巧 */}
        <section id="tips">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">学习技巧</h2>
          <ul className="space-y-2">
            {article.content.tips.map((tip, index) => (
              <li key={index} className="flex items-start gap-2 text-slate-700">
                <span className="text-cyan-500">💡</span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* 下一步 */}
        <section id="next-steps">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">下一步</h2>
          {article.nextSteps && article.nextSteps.length > 0 ? (
            <NextSteps steps={article.nextSteps} />
          ) : (
            <div className="flex flex-col sm:flex-row gap-4">
              {prevArticle && (
                <Link
                  href={`/article/${prevArticle.slug}`}
                  className="flex-1 p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors"
                >
                  <p className="text-xs text-slate-500 mb-1">上一篇</p>
                  <p className="font-medium text-slate-900">{prevArticle.title}</p>
                </Link>
              )}
              {nextArticle && (
                <Link
                  href={`/article/${nextArticle.slug}`}
                  className="flex-1 p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors text-right"
                >
                  <p className="text-xs text-slate-500 mb-1">下一篇</p>
                  <p className="font-medium text-slate-900">{nextArticle.title}</p>
                </Link>
              )}
            </div>
          )}
        </section>

        {/* 参考来源 */}
        <section id="sources">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">参考来源</h2>
          <div className="space-y-2">
            {article.officialSources.map((source, index) => (
              <div key={index} className="flex items-start gap-2">
                <Badge variant="outline" className="text-xs flex-shrink-0">
                  {source.type === 'official' ? '官方' : 
                   source.type === 'wiki' ? 'Wiki' : 
                   source.type === 'community' ? '社区' : '教程'}
                </Badge>
                <div>
                  <a 
                    href={source.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-cyan-700 hover:underline"
                  >
                    {source.title}
                  </a>
                  {source.description && (
                    <p className="text-sm text-slate-500">{source.description}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
          
          {/* 版本信息 */}
          <div className="mt-4 p-3 bg-slate-50 rounded-lg text-sm text-slate-600">
            <p><strong>适用版本：</strong>{article.applicableVersions.join('、')}</p>
            <p><strong>最后核验：</strong>{article.lastVerified || article.updatedAt}</p>
          </div>
        </section>
      </article>

      {/* 文章导航 */}
      <ArticleNavigation
        prevArticle={prevArticle ? { slug: prevArticle.slug, title: prevArticle.title } : null}
        nextArticle={nextArticle ? { slug: nextArticle.slug, title: nextArticle.title } : null}
      />
    </div>
  );
}

// 用于布局的右侧目录
export function ArticleTOC() {
  const params = useParams();
  const slug = params?.slug as string;
  
  const article = useMemo(() => {
    return knowledgeArticles.find(a => a.slug === slug);
  }, [slug]);

  const tocItems = useMemo(() => {
    if (!article) return [];
    
    const items: { id: string; text: string; level: number }[] = [
      { id: 'objectives', text: '学习目标', level: 2 },
      { id: 'prerequisites', text: '前置条件', level: 2 },
      { id: 'explanation', text: '核心概念', level: 2 },
    ];
    
    if (article.content.codeExamples.length > 0) {
      items.push({ id: 'code-examples', text: '代码示例', level: 2 });
    }
    
    if (article.minimalPractice) {
      items.push({ id: 'minimal-practice', text: '动手实践', level: 2 });
    }
    
    if (article.quizzes && article.quizzes.length > 0) {
      items.push({ id: 'quizzes', text: '自测检验', level: 2 });
    }
    
    items.push({ id: 'common-errors', text: '常见错误', level: 2 });
    items.push({ id: 'tips', text: '学习技巧', level: 2 });
    items.push({ id: 'next-steps', text: '下一步', level: 2 });
    items.push({ id: 'sources', text: '参考来源', level: 2 });
    
    return items;
  }, [article]);

  return <TableOfContents items={tocItems} />;
}