'use client';

import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { knowledgeArticles } from '@/lib/data';
import { CATEGORY_INFO } from '@/lib/types';

interface SearchPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

interface SearchResult {
  type: 'article' | 'category' | 'experiment' | 'troubleshoot';
  id: string;
  title: string;
  description: string;
  url: string;
  category?: string;
  tags?: string[];
  matchType: 'title' | 'summary' | 'tags' | 'content';
}

export function SearchPanel({ isOpen, onClose }: SearchPanelProps) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  // 从 localStorage 加载最近搜索
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem('ros1-recent-searches');
        if (stored) {
          setRecentSearches(JSON.parse(stored).slice(0, 5));
        }
      } catch {
        // ignore
      }
    }
  }, []);

  // 搜索结果
  const searchResults = useMemo(() => {
    if (!query.trim()) return [];

    const results: SearchResult[] = [];
    const q = query.toLowerCase().trim();

    // 搜索文章
    knowledgeArticles.forEach(article => {
      const titleMatch = article.title.toLowerCase().includes(q);
      const summaryMatch = article.summary.toLowerCase().includes(q);
      const tagsMatch = article.tags.some(tag => tag.toLowerCase().includes(q));
      const contentMatch = article.content.explanation.toLowerCase().includes(q) ||
        article.content.codeExamples.some(ex => ex.code.toLowerCase().includes(q));

      if (titleMatch || summaryMatch || tagsMatch || contentMatch) {
        let matchType: SearchResult['matchType'] = 'content';
        if (titleMatch) matchType = 'title';
        else if (summaryMatch) matchType = 'summary';
        else if (tagsMatch) matchType = 'tags';

        results.push({
          type: 'article',
          id: article.slug,
          title: article.title,
          description: article.summary,
          url: `/article/${article.slug}`,
          category: CATEGORY_INFO[article.category]?.name,
          tags: article.tags,
          matchType,
        });
      }
    });

    // 搜索分类
    Object.entries(CATEGORY_INFO).forEach(([key, info]) => {
      if (info.name.toLowerCase().includes(q) || info.description.toLowerCase().includes(q)) {
        results.push({
          type: 'category',
          id: key,
          title: `${info.icon} ${info.name}`,
          description: info.description,
          url: `/category/${key}`,
          matchType: 'title',
        });
      }
    });

    // 按相关度排序：标题匹配 > 摘要匹配 > 标签匹配 > 内容匹配
    const matchOrder = { title: 0, summary: 1, tags: 2, content: 3 };
    results.sort((a, b) => matchOrder[a.matchType] - matchOrder[b.matchType]);

    return results.slice(0, 12);
  }, [query]);

  // 保存最近搜索
  const saveRecentSearch = useCallback((q: string) => {
    if (!q.trim()) return;
    setRecentSearches(prev => {
      const updated = [q, ...prev.filter(s => s !== q)].slice(0, 5);
      localStorage.setItem('ros1-recent-searches', JSON.stringify(updated));
      return updated;
    });
  }, []);

  // 键盘导航
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => Math.min(prev + 1, searchResults.length - 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => Math.max(prev - 1, 0));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (searchResults[selectedIndex]) {
          saveRecentSearch(query);
          window.location.href = searchResults[selectedIndex].url;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, searchResults, selectedIndex, query, onClose, saveRecentSearch]);

  // 重置选中索引
  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  // 自动聚焦输入框
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  // 点击搜索结果
  const handleResultClick = (result: SearchResult) => {
    saveRecentSearch(query);
    onClose();
  };

  // 点击最近搜索
  const handleRecentClick = (recent: string) => {
    setQuery(recent);
  };

  // 清除最近搜索
  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem('ros1-recent-searches');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] overflow-y-auto">
      {/* 遮罩层 */}
      <div 
        className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />
      
      {/* 搜索面板 */}
      <div className="relative flex min-h-full items-start justify-center p-4 pt-[15vh]">
        <div 
          className="w-full max-w-2xl bg-white rounded-xl shadow-2xl overflow-hidden"
          role="dialog"
          aria-modal="true"
          aria-label="搜索知识库"
        >
          {/* 搜索输入 */}
          <div className="flex items-center border-b border-slate-200">
            <svg className="w-5 h-5 ml-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="搜索 ROS1 知识..."
              className="flex-1 px-4 py-4 text-lg outline-none bg-transparent"
              aria-label="搜索输入框"
              autoComplete="off"
            />
            <kbd className="mr-4 px-2 py-1 text-xs bg-slate-100 rounded border border-slate-200">ESC</kbd>
          </div>

          {/* 搜索结果 */}
          <div ref={resultsRef} className="max-h-[60vh] overflow-y-auto">
            {query.trim() ? (
              searchResults.length > 0 ? (
                <div className="py-2">
                  <div className="px-4 py-2 text-xs text-slate-500 uppercase tracking-wide">
                    找到 {searchResults.length} 个结果
                  </div>
                  {searchResults.map((result, index) => (
                    <Link
                      key={`${result.type}-${result.id}`}
                      href={result.url}
                      onClick={() => handleResultClick(result)}
                      className={cn(
                        "flex items-start gap-3 px-4 py-3 hover:bg-slate-50 transition-colors",
                        index === selectedIndex && "bg-cyan-50"
                      )}
                      aria-selected={index === selectedIndex}
                      role="option"
                    >
                      <div className="flex-shrink-0 mt-0.5">
                        {result.type === 'article' && '📄'}
                        {result.type === 'category' && '📁'}
                        {result.type === 'experiment' && '🔬'}
                        {result.type === 'troubleshoot' && '🔧'}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-slate-900">{result.title}</span>
                          {result.matchType === 'title' && (
                            <Badge variant="default" className="text-xs">标题匹配</Badge>
                          )}
                        </div>
                        <p className="text-sm text-slate-500 truncate">{result.description}</p>
                        {result.category && (
                          <span className="text-xs text-cyan-600">{result.category}</span>
                        )}
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="py-12 text-center">
                  <div className="text-4xl mb-4">🔍</div>
                  <p className="text-slate-500 mb-2">未找到相关内容</p>
                  <p className="text-sm text-slate-400">
                    尝试搜索：roscore、topic、navigation、TF
                  </p>
                </div>
              )
            ) : (
              <div className="py-4">
                {/* 最近搜索 */}
                {recentSearches.length > 0 && (
                  <div className="mb-4">
                    <div className="flex items-center justify-between px-4 py-2">
                      <span className="text-xs text-slate-500 uppercase tracking-wide">最近搜索</span>
                      <button 
                        onClick={clearRecentSearches}
                        className="text-xs text-slate-400 hover:text-slate-600"
                      >
                        清除
                      </button>
                    </div>
                    {recentSearches.map((recent, index) => (
                      <button
                        key={index}
                        onClick={() => handleRecentClick(recent)}
                        className="w-full flex items-center gap-3 px-4 py-2 hover:bg-slate-50 text-left"
                      >
                        <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-slate-700">{recent}</span>
                      </button>
                    ))}
                  </div>
                )}

                {/* 快速入口 */}
                <div className="px-4 py-2">
                  <span className="text-xs text-slate-500 uppercase tracking-wide">快速入口</span>
                </div>
                <div className="grid grid-cols-2 gap-2 px-4">
                  <Link href="/knowledge-map" className="p-3 rounded-lg bg-slate-50 hover:bg-slate-100 text-left">
                    <div className="font-medium text-slate-900">🗺️ 知识地图</div>
                    <div className="text-xs text-slate-500">查看完整学习路径</div>
                  </Link>
                  <Link href="/experiments" className="p-3 rounded-lg bg-slate-50 hover:bg-slate-100 text-left">
                    <div className="font-medium text-slate-900">🔬 动手实验</div>
                    <div className="text-xs text-slate-500">8个自学实验</div>
                  </Link>
                  <Link href="/commands" className="p-3 rounded-lg bg-slate-50 hover:bg-slate-100 text-left">
                    <div className="font-medium text-slate-900">⚡ 命令速查</div>
                    <div className="text-xs text-slate-500">常用 ROS 命令</div>
                  </Link>
                  <Link href="/troubleshoot" className="p-3 rounded-lg bg-slate-50 hover:bg-slate-100 text-left">
                    <div className="font-medium text-slate-900">🔧 错误排查</div>
                    <div className="text-xs text-slate-500">诊断和解决问题</div>
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* 底部提示 */}
          <div className="flex items-center justify-between px-4 py-2 bg-slate-50 border-t border-slate-200 text-xs text-slate-500">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 bg-white rounded border border-slate-200">↑</kbd>
                <kbd className="px-1.5 py-0.5 bg-white rounded border border-slate-200">↓</kbd>
                <span>导航</span>
              </span>
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 bg-white rounded border border-slate-200">Enter</kbd>
                <span>选择</span>
              </span>
            </div>
            <span>按 ⌘K 随时搜索</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// 搜索触发按钮（由 site-layout 导出）
export function SearchTrigger({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="w-full max-w-md flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg text-sm text-slate-600 transition-colors"
      aria-label="搜索知识库（按 ⌘K）"
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