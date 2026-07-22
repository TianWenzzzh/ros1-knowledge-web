'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTitle } from '@/components/ui/sheet';
import { SearchPanel } from '@/components/search-panel';
import { knowledgeArticles, getRelatedArticles } from '@/lib/data';
import { CATEGORY_INFO, type Category, type KnowledgeArticle } from '@/lib/types';
import type { ReactNode } from 'react';

// 学习路径顺序（按 ROS 官方教程依赖顺序）
const LEARNING_PATH_ORDER = [
  'linux-ubuntu',
  'ros-basics',
  'ros-comm',
  'communication',
  'tools',
  'transform',
  'simulation',
  'navigation',
  'vision',
  'manipulation',
  'debug-migration',
];

// 按分类分组文章
const groupedArticles = knowledgeArticles.reduce((acc, article) => {
  const cat = article.category;
  if (!acc[cat]) acc[cat] = [];
  acc[cat].push(article);
  return acc;
}, {} as Record<string, KnowledgeArticle[]>);

interface SiteLayoutProps {
  children: ReactNode;
  rightSidebar?: ReactNode;
}

export function SiteLayout({ children, rightSidebar }: SiteLayoutProps) {
  const pathname = usePathname();
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());
  const [leftSidebarCollapsed, setLeftSidebarCollapsed] = useState(false);
  
  const isArticlePage = pathname?.startsWith('/article/');
  
  // 键盘快捷键
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen(true);
      }
      if (e.key === 'Escape') {
        setSearchOpen(false);
        setMobileMenuOpen(false);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);
  
  const toggleCategory = useCallback((category: string) => {
    setExpandedCategories(prev => {
      const next = new Set(prev);
      if (next.has(category)) {
        next.delete(category);
      } else {
        next.add(category);
      }
      return next;
    });
  }, []);
  
  return (
    <div className="min-h-screen bg-white" style={{ isolation: 'isolate' }}>
      {/* Header - 固定在顶部 */}
      <header 
        className="fixed top-0 left-0 right-0 h-14 bg-white border-b border-slate-200 z-40"
        style={{ backgroundColor: '#ffffff' }}
      >
        <div className="h-full flex items-center px-4 lg:px-6">
          {/* Logo 区域 - 与侧栏宽度对齐 */}
          <div className="hidden lg:flex items-center w-64 flex-shrink-0">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-xl">🤖</span>
              <span className="font-bold text-slate-900">ROS1 知识库</span>
            </Link>
          </div>
          
          {/* 移动端 Logo */}
          <div className="lg:hidden flex items-center">
            {isArticlePage && (
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="p-2 -ml-2 text-slate-600 hover:text-slate-900"
                aria-label="打开导航"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            )}
            <Link href="/" className="ml-2 flex items-center gap-2">
              <span className="text-xl">🤖</span>
              <span className="font-bold text-slate-900">ROS1 知识库</span>
            </Link>
          </div>
          
          {/* 主导航区域 */}
          <div className="flex-1 flex items-center justify-between lg:justify-end gap-4 lg:ml-64 xl:mr-56">
            <nav className="hidden lg:flex items-center gap-1">
              <Link 
                href="/" 
                className={cn(
                  "px-3 py-1.5 text-sm rounded-lg transition-colors",
                  pathname === "/" ? "bg-cyan-50 text-cyan-700" : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                )}
              >
                首页
              </Link>
              <Link 
                href="/knowledge-map"
                className={cn(
                  "px-3 py-1.5 text-sm rounded-lg transition-colors",
                  pathname === "/knowledge-map" ? "bg-cyan-50 text-cyan-700" : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                )}
              >
                知识地图
              </Link>
              <Link 
                href="/experiments"
                className={cn(
                  "px-3 py-1.5 text-sm rounded-lg transition-colors",
                  pathname?.startsWith("/experiments") ? "bg-cyan-50 text-cyan-700" : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                )}
              >
                实验
              </Link>
              <Link 
                href="/commands"
                className={cn(
                  "px-3 py-1.5 text-sm rounded-lg transition-colors",
                  pathname === "/commands" ? "bg-cyan-50 text-cyan-700" : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                )}
              >
                命令速查
              </Link>
              <Link 
                href="/troubleshoot"
                className={cn(
                  "px-3 py-1.5 text-sm rounded-lg transition-colors",
                  pathname === "/troubleshoot" ? "bg-cyan-50 text-cyan-700" : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                )}
              >
                错误排查
              </Link>
              <Link 
                href="/learning-methods"
                className={cn(
                  "px-3 py-1.5 text-sm rounded-lg transition-colors",
                  pathname === "/learning-methods" ? "bg-cyan-50 text-cyan-700" : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                )}
              >
                学习方法
              </Link>
            </nav>
            
            {/* 搜索按钮 */}
            <button
              onClick={() => setSearchOpen(true)}
              className="flex items-center gap-2 px-3 py-1.5 text-sm text-slate-500 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
              aria-label="搜索"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <span className="hidden sm:inline">搜索</span>
              <kbd className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-xs bg-slate-200 rounded">
                <span>⌘</span>K
              </kbd>
            </button>
            
            {/* 用户菜单 */}
            <div className="flex items-center gap-2">
              <Link
                href="/favorites"
                className="hidden sm:flex p-2 text-slate-600 hover:bg-slate-100 rounded-lg"
                aria-label="收藏与笔记"
              >
                ⭐
              </Link>
              <Link
                href="/my-learning"
                className="hidden sm:flex p-2 text-slate-600 hover:bg-slate-100 rounded-lg"
                aria-label="我的学习"
              >
                👤
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* 主体布局 - 使用 CSS Grid，响应式处理 */}
      <div 
        className="pt-14 min-h-screen"
      >
        <div 
          className="grid grid-cols-1 lg:grid-cols-[256px_minmax(0,1fr)] xl:grid-cols-[256px_minmax(0,1fr)_224px]"
        >
        {/* 左侧导航栏 - 桌面端 Grid 列，不使用 fixed */}
        <aside 
          className={cn(
            "hidden lg:block sticky top-14 h-[calc(100vh-3.5rem)] border-r border-slate-200 overflow-y-auto",
            leftSidebarCollapsed && "hidden"
          )}
          style={{ 
            backgroundColor: '#f8fafc',
            width: '256px',
            minWidth: '256px',
            maxWidth: '256px',
          }}
          aria-label="文章导航"
        >
          <nav className="p-4">
            <div className="mb-4">
              <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">学习路径</h2>
              <p className="text-xs text-slate-400">按 ROS 官方教程顺序</p>
            </div>
            
            {LEARNING_PATH_ORDER.map((categoryKey) => {
              const articles = groupedArticles[categoryKey];
              if (!articles || articles.length === 0) return null;
              
              const categoryInfo = CATEGORY_INFO[categoryKey as Category];
              const isExpanded = expandedCategories.has(categoryKey);
              const hasCurrentArticle = pathname?.startsWith('/article/') && 
                articles.some(a => pathname.includes(a.slug));
              
              return (
                <div key={categoryKey} className="mb-2">
                  <button
                    onClick={() => toggleCategory(categoryKey)}
                    className={cn(
                      "w-full flex items-center justify-between px-3 py-2 text-sm font-medium rounded-lg transition-colors",
                      hasCurrentArticle 
                        ? "bg-cyan-100 text-cyan-800" 
                        : "text-slate-700 hover:bg-slate-100"
                    )}
                    aria-expanded={isExpanded}
                  >
                    <span className="flex items-center gap-2">
                      <span>{categoryInfo?.icon}</span>
                      <span>{categoryInfo?.name}</span>
                    </span>
                    <svg 
                      className={cn("w-4 h-4 transition-transform", isExpanded && "rotate-90")} 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                  
                  {(isExpanded || hasCurrentArticle) && (
                    <ul className="mt-1 ml-2 space-y-1 border-l-2 border-slate-200 pl-3">
                      {articles.map((article) => {
                        const isActive = pathname === `/article/${article.slug}`;
                        return (
                          <li key={article.slug}>
                            <Link
                              href={`/article/${article.slug}`}
                              className={cn(
                                "block py-1.5 px-2 text-sm rounded transition-colors",
                                isActive
                                  ? "bg-cyan-50 text-cyan-700 font-medium"
                                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                              )}
                            >
                              {article.title}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </div>
              );
            })}
          </nav>
        </aside>

        {/* 移动端侧栏抽屉 */}
        {isArticlePage && (
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetContent 
              side="left" 
              className="w-72 p-0"
              style={{ backgroundColor: '#ffffff' }}
            >
              <SheetTitle className="sr-only">文章导航</SheetTitle>
              <div className="h-full overflow-y-auto p-4" style={{ backgroundColor: '#ffffff' }}>
                <h2 className="text-sm font-semibold text-slate-900 mb-4">文章导航</h2>
                {LEARNING_PATH_ORDER.map((categoryKey) => {
                  const articles = groupedArticles[categoryKey];
                  if (!articles || articles.length === 0) return null;
                  
                  const categoryInfo = CATEGORY_INFO[categoryKey as Category];
                  const isExpanded = expandedCategories.has(categoryKey);
                  
                  return (
                    <div key={categoryKey} className="mb-2">
                      <button
                        onClick={() => toggleCategory(categoryKey)}
                        className="w-full flex items-center justify-between px-3 py-2 text-sm font-medium rounded-lg text-slate-700 hover:bg-slate-100"
                      >
                        <span className="flex items-center gap-2">
                          <span>{categoryInfo?.icon}</span>
                          <span>{categoryInfo?.name}</span>
                        </span>
                        <svg 
                          className={cn("w-4 h-4 transition-transform", isExpanded && "rotate-90")} 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                      
                      {isExpanded && (
                        <ul className="mt-1 ml-2 space-y-1 border-l-2 border-slate-200 pl-3">
                          {articles.map((article) => (
                            <li key={article.slug}>
                              <Link
                                href={`/article/${article.slug}`}
                                onClick={() => setMobileMenuOpen(false)}
                                className="block py-1.5 px-2 text-sm text-slate-600 hover:text-slate-900"
                              >
                                {article.title}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  );
                })}
              </div>
            </SheetContent>
          </Sheet>
        )}

        {/* 主内容区 - Grid 第二列 */}
        <main 
          id="main-content" 
          tabIndex={-1}
          className="min-w-0 overflow-x-hidden"
        >
          <div className={cn(
            isArticlePage 
              ? "max-w-4xl px-4 lg:px-8 py-6 lg:py-8" 
              : "px-4 lg:px-6 py-6 lg:py-8"
          )}>
            {children}
          </div>
        </main>

        {/* 右侧目录栏 - 仅文章页显示，Grid 第三列 */}
        {isArticlePage && rightSidebar && (
          <aside 
            className="hidden xl:block sticky top-14 h-[calc(100vh-3.5rem)] border-l border-slate-200 overflow-y-auto"
            style={{ 
              backgroundColor: '#ffffff',
              width: '224px',
              minWidth: '224px',
              maxWidth: '224px',
            }}
            aria-label="本页目录"
          >
            <div className="p-4">
              <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">本页目录</h2>
              {rightSidebar}
            </div>
          </aside>
        )}
      </div>

      {/* 搜索面板 */}
      <SearchPanel isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </div>
    </div>
  );
}

// 搜索触发按钮
export function SearchTrigger({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 px-3 py-1.5 text-sm text-slate-500 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
      aria-label="搜索"
    >
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
      <span className="hidden sm:inline">搜索</span>
      <kbd className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-xs bg-slate-200 rounded">
        <span>⌘</span>K
      </kbd>
    </button>
  );
}

// 导出分类颜色
export function getCategoryColor(category: Category): string {
  const colors: Record<Category, string> = {
    'linux-ubuntu': 'bg-amber-100 text-amber-800',
    'ros-basics': 'bg-cyan-100 text-cyan-800',
    'ros-comm': 'bg-cyan-100 text-cyan-800',
    'communication': 'bg-blue-100 text-blue-800',
    'tools': 'bg-purple-100 text-purple-800',
    'transform': 'bg-green-100 text-green-800',
    'simulation': 'bg-indigo-100 text-indigo-800',
    'navigation': 'bg-rose-100 text-rose-800',
    'vision': 'bg-pink-100 text-pink-800',
    'manipulation': 'bg-orange-100 text-orange-800',
    'debug-migration': 'bg-slate-100 text-slate-800',
  };
  return colors[category] || 'bg-slate-100 text-slate-800';
}