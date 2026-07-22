'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Category, CATEGORY_INFO, type KnowledgeArticle } from '@/lib/types';
import { knowledgeArticles } from '@/lib/data';
import { SearchPanel, SearchTrigger as SearchTriggerButton } from '@/components/search-panel';

const NAV_ITEMS = [
  { href: '/', label: '知识首页', icon: '🏠' },
  { href: '/knowledge-map', label: 'ROS1知识地图', icon: '🗺️' },
  { href: '/learning-methods', label: '学习方法', icon: '📚' },
  { href: '/experiments', label: '动手实验', icon: '🔬' },
  { href: '/commands', label: '命令速查', icon: '⚡' },
  { href: '/troubleshoot', label: '错误排查', icon: '🔧' },
  { href: '/favorites', label: '收藏与笔记', icon: '⭐' },
  { href: '/my-learning', label: '我的学习', icon: '👤' },
];

// 按ROS官方教程顺序组织的学习路径
const LEARNING_PATH_ORDER = [
  'linux-ubuntu',
  'ros-basics',
  'communication',
  'tools',
  'transform',
  'simulation',
  'navigation',
  'vision',
  'manipulation',
  'debug-migration',
];

interface SiteLayoutProps {
  children: React.ReactNode;
  rightSidebar?: React.ReactNode;
  leftSidebarCollapsed?: boolean;
}

// 按学习路径组织文章
function organizeArticlesByPath() {
  const grouped: Record<string, KnowledgeArticle[]> = {};
  
  knowledgeArticles.forEach(article => {
    if (!grouped[article.category]) {
      grouped[article.category] = [];
    }
    grouped[article.category].push(article);
  });

  return grouped;
}

export function SiteLayout({ children, rightSidebar, leftSidebarCollapsed }: SiteLayoutProps) {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileTocOpen, setMobileTocOpen] = useState(false);

  // 从 localStorage 加载折叠状态
  useEffect(() => {
    setMounted(true);
    try {
      const stored = localStorage.getItem('ros1-expanded-categories');
      if (stored) {
        setExpandedCategories(new Set(JSON.parse(stored)));
      } else {
        // 默认展开当前文章所在分类
        if (pathname?.startsWith('/article/')) {
          const slug = pathname.replace('/article/', '');
          const article = knowledgeArticles.find(a => a.slug === slug);
          if (article) {
            setExpandedCategories(new Set([article.category]));
          }
        }
      }
    } catch {
      // ignore
    }
  }, [pathname]);

  // 保存折叠状态
  const toggleCategory = useCallback((category: string) => {
    setExpandedCategories(prev => {
      const updated = new Set(prev);
      if (updated.has(category)) {
        updated.delete(category);
      } else {
        updated.add(category);
      }
      localStorage.setItem('ros1-expanded-categories', JSON.stringify([...updated]));
      return updated;
    });
  }, []);

  // Ctrl/Cmd+K 快捷键
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen(true);
      }
      if (e.key === 'Escape') {
        setSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // 跳转到正文（可访问性）
  const handleSkipToContent = () => {
    const main = document.getElementById('main-content');
    if (main) {
      main.focus();
      main.scrollIntoView();
    }
  };

  if (!mounted) {
    return (
      <div className="min-h-screen bg-white">
        <div className="animate-pulse bg-slate-100 h-16" />
        <div className="flex">
          <div className="hidden lg:block w-64 animate-pulse bg-slate-100 h-screen" />
          <div className="flex-1 p-8">
            <div className="animate-pulse bg-slate-100 h-96 rounded-lg" />
          </div>
        </div>
      </div>
    );
  }

  const isArticlePage = pathname?.startsWith('/article/');
  const groupedArticles = organizeArticlesByPath();

  return (
    <div className="min-h-screen bg-white">
      {/* 跳转到正文链接（可访问性） */}
      <a
        href="#main-content"
        onClick={handleSkipToContent}
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-cyan-600 focus:text-white focus:rounded-lg"
      >
        跳转到正文
      </a>

      {/* 顶部导航栏 */}
      <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="flex h-14 items-center justify-between px-4 lg:px-6">
          {/* Logo + 移动端菜单 */}
          <div className="flex items-center gap-3">
            {isArticlePage && (
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="lg:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg"
                aria-label="打开导航菜单"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            )}
            <Link href="/" className="flex items-center gap-2 flex-shrink-0">
              <span className="text-xl" role="img" aria-label="机器人">🤖</span>
              <span className="hidden sm:inline text-lg font-bold text-slate-900">ROS1 知识库</span>
            </Link>
          </div>

          {/* 搜索入口 */}
          <div className="flex-1 flex justify-center px-4 max-w-xl">
            <SearchTriggerButton onClick={() => setSearchOpen(true)} />
          </div>

          {/* 桌面端导航 */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="主导航">
            {NAV_ITEMS.slice(0, 6).map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'px-3 py-2 text-sm font-medium rounded-md transition-colors',
                  pathname === item.href
                    ? 'bg-cyan-50 text-cyan-700'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

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
      </header>

      {/* 三栏布局 */}
      <div className="flex">
        {/* 左侧导航栏 - 桌面端固定显示 */}
        <aside 
          className={cn(
            "hidden lg:block fixed left-0 top-14 bottom-0 w-64 border-r border-slate-200 bg-slate-50/50 overflow-y-auto",
            "transition-transform duration-200",
            leftSidebarCollapsed && "-translate-x-full"
          )}
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
            <SheetContent side="left" className="w-72 p-0">
              <div className="h-full overflow-y-auto p-4">
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

        {/* 主内容区 */}
        <main 
          id="main-content" 
          tabIndex={-1}
          className={cn(
            "flex-1 min-w-0",
            isArticlePage ? "lg:ml-64" : ""
          )}
        >
          <div className={cn(
            "mx-auto",
            isArticlePage 
              ? "max-w-4xl px-4 lg:px-8 py-6 lg:py-8" 
              : "container px-4 lg:px-6 py-6 lg:py-8"
          )}>
            {children}
          </div>
        </main>

        {/* 右侧目录栏 - 仅文章页显示 */}
        {isArticlePage && rightSidebar && (
          <aside 
            className="hidden xl:block fixed right-0 top-14 bottom-0 w-56 border-l border-slate-200 bg-white/50 overflow-y-auto"
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
  );
}

// 搜索触发按钮
export function SearchTrigger({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="w-full max-w-md flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg text-sm text-slate-600 transition-colors"
      aria-label="搜索知识库"
    >
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
      <span className="flex-1 text-left">搜索 ROS1 知识...</span>
      <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 text-xs bg-white rounded border border-slate-300">
        <span>⌘</span>K
      </kbd>
    </button>
  );
}