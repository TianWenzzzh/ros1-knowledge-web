'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import Link from 'next/link';
import { useUserContext } from '@/lib/user-context';
import { knowledgeArticles, categories, getArticleBySlug, getRelatedArticles } from '@/lib/data';
import { cn } from '@/lib/utils';
import { 
  ChevronRight, ChevronLeft, Clock, Target, BookOpen, CheckCircle2, 
  Lightbulb, AlertTriangle, HelpCircle, Copy, Check, ArrowRight,
  Star, StarOff, Bookmark, FileText, PlayCircle, RotateCcw
} from 'lucide-react';
import { TableOfContents } from './table-of-contents';
import { InlineQuiz } from './quiz';
import { EOLNotice, InfoCallout, WarningCallout } from './callout';
import {
  IntroHook,
  LearningObjectives,
  PrerequisiteCheck,
  IntuitionModel,
  MinimalExample,
  CommonMistakes,
  PracticeTasks,
  SixtySecondRecap,
  PauseAndThink,
  CourseTimeline,
  NoteTemplate,
  NextLesson,
  LearningMethodTip
} from './course-template';

interface ArticlePageProps {
  slug: string;
}

export function ArticlePage({ slug }: ArticlePageProps) {
  const { favorites, notes, readingProgress, toggleFavorite, addNote, updateReadingProgress, experiments } = useUserContext();
  const [activeSection, setActiveSection] = useState('');
  const [showNoteInput, setShowNoteInput] = useState(false);
  const [noteText, setNoteText] = useState('');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [courseMode, setCourseMode] = useState(false);
  const [completedSections, setCompletedSections] = useState<Set<string>>(new Set());

  const article = getArticleBySlug(slug);
  const relatedArticles = article ? getRelatedArticles(article) : [];

  useEffect(() => {
    if (article) {
      updateReadingProgress(article.slug, 0);
    }
  }, [article, updateReadingProgress]);

  const isFavorite = article ? favorites.includes(article.slug) : false;
  const articleNotes = article ? notes.filter(n => n.articleId === article.slug) : [];
  const progress = article ? readingProgress[article.slug] : undefined;

  const handleCopyCode = useCallback((code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  }, []);

  const handleToggleSection = (sectionId: string) => {
    const newSet = new Set(completedSections);
    if (newSet.has(sectionId)) {
      newSet.delete(sectionId);
    } else {
      newSet.add(sectionId);
    }
    setCompletedSections(newSet);
  };

  const handleAddNote = () => {
    if (article && noteText.trim()) {
      addNote(article.slug, noteText.trim());
      setNoteText('');
      setShowNoteInput(false);
    }
  };

  const tocItems = useMemo(() => {
    if (!article) return [];
    const items: { id: string; text: string; level: number }[] = [];
    
    // 课程模式下的时间轴项目
    if (courseMode && article.learningObjectives) {
      items.push({ id: 'intro', text: '30秒先导', level: 2 });
    }
    
    items.push({ id: 'overview', text: '概述', level: 2 });
    
    if (article.learningObjectives && article.learningObjectives.length > 0) {
      items.push({ id: 'objectives', text: '学习目标', level: 2 });
    }
    
    if (article.prerequisites && article.prerequisites.length > 0) {
      items.push({ id: 'prerequisites', text: '前置知识', level: 2 });
    }
    
    items.push({ id: 'explanation', text: '核心概念', level: 2 });
    
    if (article.content.codeExamples && article.content.codeExamples.length > 0) {
      items.push({ id: 'code-examples', text: '代码示例', level: 2 });
    }
    
    if (article.content.commonErrors && article.content.commonErrors.length > 0) {
      items.push({ id: 'common-errors', text: '常见错误', level: 2 });
    }
    
    if (article.content.tips && article.content.tips.length > 0) {
      items.push({ id: 'tips', text: '学习技巧', level: 2 });
    }
    
    if (article.content.practice && article.content.practice.length > 0) {
      items.push({ id: 'practice', text: '动手练习', level: 2 });
    }
    
    items.push({ id: 'quiz', text: '自测', level: 2 });
    
    if (article.content.quiz && article.content.quiz.length > 0) {
      // Quiz section already added
    }
    
    items.push({ id: 'sources', text: '参考资料', level: 2 });
    
    return items;
  }, [article, courseMode]);

  // 时间轴项目
  const timelineItems = article ? [
    { time: '00:00', label: '场景引入', sectionId: 'intro' },
    { time: '01:30', label: '学习目标', sectionId: 'objectives' },
    { time: '03:00', label: '前置诊断', sectionId: 'prerequisites' },
    { time: '05:00', label: '直觉理解', sectionId: 'explanation' },
    { time: '08:00', label: '演示', sectionId: 'code-examples' },
    { time: '12:00', label: '排错', sectionId: 'common-errors' },
    { time: '16:00', label: '练习', sectionId: 'practice' },
    { time: '20:00', label: '复盘', sectionId: 'quiz' },
  ] : [];

  if (!article) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <HelpCircle className="w-16 h-16 text-slate-300 mb-4" />
        <h1 className="text-2xl font-bold text-slate-800 mb-2">文章未找到</h1>
        <p className="text-slate-600 mb-4">该文章可能已移动或不存在。</p>
        <Link href="/" className="text-blue-600 hover:text-blue-800">
          返回首页
        </Link>
      </div>
    );
  }

  const category = categories.find(c => c.id === article.category);
  const nextArticle = knowledgeArticles.find((a, i) => {
    const currentIndex = knowledgeArticles.findIndex(art => art.slug === article.slug);
    return i === currentIndex + 1;
  });
  const prevArticle = knowledgeArticles.find((a, i) => {
    const currentIndex = knowledgeArticles.findIndex(art => art.slug === article.slug);
    return i === currentIndex - 1;
  });

  return (
    <div className="min-h-screen bg-white">
      {/* EOL 提示 */}
      <EOLNotice />
      
      {/* 顶部导航条 */}
      <div className="bg-slate-50 border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-2">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2 text-slate-600">
              <Link href="/" className="hover:text-blue-600">知识库</Link>
              <ChevronRight className="w-4 h-4" />
              <Link href={`/category/${article.category}`} className="hover:text-blue-600">
                {category?.name}
              </Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-slate-800">{article.title}</span>
            </div>
            
            <div className="flex items-center gap-4">
              <button
                onClick={() => setCourseMode(!courseMode)}
                className={cn(
                  'flex items-center gap-1 px-2 py-1 rounded text-xs transition-colors',
                  courseMode 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                )}
              >
                <PlayCircle className="w-3 h-3" />
                课程模式
              </button>
              
              <button
                onClick={() => toggleFavorite(article.slug)}
                className="flex items-center gap-1 text-slate-600 hover:text-amber-500 transition-colors"
              >
                {isFavorite ? (
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                ) : (
                  <StarOff className="w-4 h-4" />
                )}
                <span className="hidden sm:inline">{isFavorite ? '已收藏' : '收藏'}</span>
              </button>
              
              <button
                onClick={() => setShowNoteInput(!showNoteInput)}
                className="flex items-center gap-1 text-slate-600 hover:text-blue-600 transition-colors"
              >
                <FileText className="w-4 h-4" />
                <span className="hidden sm:inline">笔记</span>
              </button>
            </div>
          </div>
          
          {/* 课程模式下的时间轴 */}
          {courseMode && (
            <CourseTimeline items={timelineItems} />
          )}
          
          {/* 课程模式下的进度条 */}
          {courseMode && (
            <div className="mt-2 flex items-center gap-2 text-xs text-slate-600">
              <Clock className="w-3 h-3" />
              <span>预计 {article.readingTime} 分钟</span>
              <span className="mx-2">•</span>
              <span className={cn(
                'px-2 py-0.5 rounded',
                article.difficulty === 'beginner' && 'bg-green-100 text-green-700',
                article.difficulty === 'intermediate' && 'bg-amber-100 text-amber-700',
                article.difficulty === 'advanced' && 'bg-red-100 text-red-700'
              )}>
                {article.difficulty === 'beginner' && '入门'}
                {article.difficulty === 'intermediate' && '进阶'}
                {article.difficulty === 'advanced' && '高级'}
              </span>
              {progress && (
                <>
                  <span className="mx-2">•</span>
                  <span>上次阅读：{new Date(progress.lastReadAt).toLocaleDateString()}</span>
                </>
              )}
            </div>
          )}
        </div>
      </div>

      {/* 主内容区 */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* 左侧：课程章节列表（课程模式下显示） */}
          {courseMode && (
            <aside className="hidden lg:block w-48 shrink-0">
              <div className="sticky top-24">
                <h4 className="text-sm font-medium text-slate-600 mb-3">本节内容</h4>
                <ul className="space-y-1">
                  {tocItems.map((item, index) => (
                    <li key={item.id}>
                      <button
                        onClick={() => {
                          const el = document.getElementById(item.id);
                          if (el) el.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className={cn(
                          'text-sm text-left w-full py-1 px-2 rounded transition-colors',
                          activeSection === item.id
                            ? 'bg-blue-50 text-blue-700'
                            : 'text-slate-600 hover:bg-slate-50'
                        )}
                      >
                        {item.text}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          )}

          {/* 中间：文章内容 */}
          <article className="flex-1 min-w-0 max-w-3xl">
            {/* 标题区 */}
            <header className="mb-8" id="overview">
              <h1 className="text-3xl font-bold text-slate-900 mb-4">{article.title}</h1>
              <p className="text-lg text-slate-600 mb-4">{article.summary}</p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {article.tags.map(tag => (
                  <span key={tag} className="px-2 py-1 bg-slate-100 text-slate-600 text-sm rounded">
                    {tag}
                  </span>
                ))}
              </div>
              
              <div className="flex items-center gap-4 text-sm text-slate-500">
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {article.readingTime} 分钟
                </span>
                <span>版本：{article.rosVersion || 'Noetic'}</span>
                <span>更新：{article.updatedAt}</span>
              </div>
            </header>

            {/* 课程模式：30秒先导 */}
            {courseMode && (article.introHook || article.content.introHook) && (
              <section id="intro" className="mb-8">
                <IntroHook 
                  problem={(article.introHook || article.content.introHook)?.problem}
                  scenario={(article.introHook || article.content.introHook)?.scenario}
                />
              </section>
            )}

            {/* 学习目标 */}
            {article.learningObjectives && article.learningObjectives.length > 0 && (
              <section id="objectives" className="mb-8">
                <LearningObjectives objectives={article.learningObjectives} />
              </section>
            )}

            {/* 前置诊断 */}
            {courseMode && article.prerequisites && article.prerequisites.length > 0 && (
              <section id="prerequisites" className="mb-8">
                <PrerequisiteCheck 
                  questions={article.prerequisites.map(p => ({
                    question: `你了解 ${p} 吗？`,
                    hint: `如果不熟悉，建议先学习 ${p} 相关内容`
                  }))}
                  missingAction={`建议先学习前置知识，再来学习本节`}
                />
              </section>
            )}

            {/* 核心概念 */}
            <section id="explanation" className="mb-8">
              <h2 className="text-xl font-semibold text-slate-800 mb-4 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-blue-600" />
                核心概念
              </h2>
              <div className="prose prose-slate max-w-none">
                <p className="text-slate-700 whitespace-pre-line leading-relaxed">
                  {article.content.explanation}
                </p>
              </div>
              
              {article.content.whyImportant && (
                <InfoCallout title="为什么重要">
                  {article.content.whyImportant}
                </InfoCallout>
              )}
            </section>

            {/* 暂停思考 */}
            {courseMode && article.content.pauseAndThink && article.content.pauseAndThink.length > 0 && (
              <section id="pause-and-think" className="mb-8">
                {article.content.pauseAndThink.map((item: { question: string; answer: string }, idx: number) => (
                  <PauseAndThink 
                    key={idx}
                    question={item.question}
                    answer={item.answer}
                  />
                ))}
              </section>
            )}

            {/* 代码示例 */}
            {article.content.codeExamples && article.content.codeExamples.length > 0 && (
              <section id="code-examples" className="mb-8">
                <h2 className="text-xl font-semibold text-slate-800 mb-4 flex items-center gap-2">
                  <PlayCircle className="w-5 h-5 text-green-600" />
                  代码示例与操作
                </h2>
                
                {courseMode ? (
                  <MinimalExample
                    title="最小可运行示例"
                    prerequisites={['Ubuntu 20.04 + ROS Noetic 已安装', 'roscore 已运行']}
                    steps={article.content.codeExamples.map((example, index) => ({
                      terminal: 1 + (index % 3),
                      directory: '~/catkin_ws',
                      action: '执行命令',
                      command: example.code,
                      expectedOutput: example.expectedOutput,
                      observe: example.description
                    }))}
                  />
                ) : (
                  <div className="space-y-6">
                    {article.content.codeExamples.map((example, index) => (
                      <div key={index} className="border border-slate-200 rounded-lg overflow-hidden">
                        <div className="bg-slate-50 px-4 py-2 border-b border-slate-200">
                          <span className="text-sm font-medium text-slate-700">
                            {example.language} - {example.description}
                          </span>
                        </div>
                        <div className="relative">
                          <pre className="bg-slate-900 text-slate-100 p-4 overflow-x-auto">
                            <code>{example.code}</code>
                          </pre>
                          <button
                            onClick={() => handleCopyCode(example.code)}
                            className="absolute top-2 right-2 p-2 rounded bg-slate-700 hover:bg-slate-600 text-slate-300 transition-colors"
                            title="复制代码"
                          >
                            {copiedCode === example.code ? (
                              <Check className="w-4 h-4 text-green-400" />
                            ) : (
                              <Copy className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                        {example.expectedOutput && (
                          <div className="bg-slate-800 p-4">
                            <p className="text-xs text-slate-400 mb-1">预期输出：</p>
                            <pre className="text-slate-300 text-sm overflow-x-auto">
                              <code>{example.expectedOutput}</code>
                            </pre>
                        </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </section>
            )}

            {/* 学习方法提示 */}
            {courseMode && (
              <div className="flex flex-wrap gap-2 my-6">
                <LearningMethodTip method="预测执行对比" />
                <LearningMethodTip method="一次改一个" />
                <LearningMethodTip method="记录预期实际" />
              </div>
            )}

            {/* 常见错误 */}
            {article.content.commonErrors && article.content.commonErrors.length > 0 && (
              <section id="common-errors" className="mb-8">
                <CommonMistakes 
                  mistakes={article.content.commonErrors.map(err => ({
                    mistake: err.error,
                    symptom: `报错：${err.error}`,
                    rootCause: err.cause,
                    fix: err.solution,
                    prevention: err.solution
                  }))}
                />
              </section>
            )}

            {/* 学习技巧 */}
            {article.content.tips && article.content.tips.length > 0 && (
              <section id="tips" className="mb-8">
                <h2 className="text-xl font-semibold text-slate-800 mb-4 flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-amber-500" />
                  学习技巧
                </h2>
                <ul className="space-y-3">
                  {article.content.tips.map((tip, index) => (
                    <li key={index} className="flex items-start gap-3 bg-amber-50 p-3 rounded-lg">
                      <CheckCircle2 className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                      <span className="text-slate-700">{tip}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* 动手练习 */}
            {article.content.practice && article.content.practice.length > 0 && (
              <section id="practice" className="mb-8">
                <PracticeTasks 
                  tasks={article.content.practice.map((p, i) => ({
                    level: i === 0 ? '基础模仿' : i === 1 ? '参数变化' : '独立改造',
                    description: p,
                    hint: '参考上面的代码示例，尝试修改参数',
                    verifyCommand: 'rostopic list'
                  }))}
                />
              </section>
            )}

            {/* 笔记模板 */}
            {courseMode && (
              <NoteTemplate articleSlug={article.slug} />
            )}

            {/* 60秒复盘 */}
            {courseMode && (
              <SixtySecondRecap
                coreSentence={article.summary}
                mustKnowCommands={article.tags.slice(0, 3)}
                reviewWhere="回看上面的核心概念部分"
              />
            )}

            {/* 自测 */}
            {article.content.quiz && article.content.quiz.length > 0 && (
              <section id="quiz" className="mb-8">
                <h2 className="text-xl font-semibold text-slate-800 mb-4 flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-purple-600" />
                  自测
                </h2>
                <div className="space-y-6">
                  {article.content.quiz?.map((q) => (
                    <InlineQuiz key={q.id} quiz={q} />
                  ))}
                </div>
              </section>
            )}

            {/* 下一课衔接 */}
            {courseMode && (nextArticle || prevArticle) && (
              <NextLesson
                current={article.title}
                next={{
                  title: nextArticle?.title || '继续学习',
                  slug: nextArticle?.slug || '',
                  relation: '本节内容是下一节的基础'
                }}
                prev={prevArticle ? {
                  title: prevArticle.title,
                  slug: prevArticle.slug
                } : undefined}
              />
            )}

            {/* 参考资料 */}
            <section id="sources" className="mb-8">
              <h2 className="text-xl font-semibold text-slate-800 mb-4">参考资料</h2>
              <div className="space-y-2">
                {article.officialSources && article.officialSources.map((source, index) => (
                  <a
                    key={index}
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
                  >
                    <ChevronRight className="w-4 h-4" />
                    <span>{source.title}</span>
                    <span className="text-xs text-slate-400">({source.type})</span>
                  </a>
                ))}
              </div>
              
              <WarningCallout title="关于 ROS Wiki 链接">
                ROS Wiki 已于 2025-05-31 随 ROS1 EOL 归档。部分链接可能需要在新标签页直接访问。
              </WarningCallout>
              
              <div className="mt-4 text-sm text-slate-500">
                <p>适用版本：{article.rosVersion || 'ROS Noetic + Ubuntu 20.04'}</p>
                <p>最后核验：{article.updatedAt}</p>
              </div>
            </section>
          </article>

          {/* 右侧：目录 */}
          <aside className="hidden xl:block w-48 shrink-0">
            <div className="sticky top-24">
              <TableOfContents items={tocItems} activeId={activeSection} />
            </div>
          </aside>
        </div>
      </div>

      {/* 笔记输入弹窗 */}
      {showNoteInput && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">添加笔记</h3>
            <textarea
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
              className="w-full h-32 border border-slate-300 rounded p-3 text-sm"
              placeholder="记录你的学习心得..."
            />
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => setShowNoteInput(false)}
                className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded"
              >
                取消
              </button>
              <button
                onClick={handleAddNote}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                保存
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}