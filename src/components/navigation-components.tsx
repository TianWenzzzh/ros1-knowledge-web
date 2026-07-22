'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { cn } from '@/lib/utils';
import { CATEGORY_INFO } from '@/lib/types';
import type { Category } from '@/lib/types';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav 
      className="flex items-center gap-1 text-sm text-slate-500 mb-4"
      aria-label="面包屑导航"
    >
      <Link 
        href="/"
        className="hover:text-cyan-600 transition-colors"
      >
        首页
      </Link>
      {items.map((item, index) => (
        <React.Fragment key={index}>
          <ChevronRight className="w-4 h-4" />
          {item.href ? (
            <Link 
              href={item.href}
              className="hover:text-cyan-600 transition-colors"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-slate-900 font-medium">{item.label}</span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
}

// 从分类生成面包屑
export function getCategoryBreadcrumbs(category: Category, articleTitle?: string): BreadcrumbItem[] {
  const items: BreadcrumbItem[] = [
    { label: CATEGORY_INFO[category]?.name || category, href: `/category/${category}` }
  ];
  if (articleTitle) {
    items.push({ label: articleTitle });
  }
  return items;
}

interface ArticleNavigationProps {
  prevArticle?: { slug: string; title: string } | null;
  nextArticle?: { slug: string; title: string } | null;
}

export function ArticleNavigation({ prevArticle, nextArticle }: ArticleNavigationProps) {
  if (!prevArticle && !nextArticle) return null;

  return (
    <nav 
      className="flex flex-col sm:flex-row gap-4 mt-8 pt-8 border-t border-slate-200"
      aria-label="文章导航"
    >
      {prevArticle && (
        <Link
          href={`/article/${prevArticle.slug}`}
          className="flex-1 group flex items-start gap-3 p-4 rounded-lg border border-slate-200 hover:border-cyan-300 hover:bg-cyan-50/50 transition-all"
        >
          <ChevronLeft className="w-5 h-5 mt-0.5 text-slate-400 group-hover:text-cyan-600 flex-shrink-0" />
          <div className="min-w-0">
            <p className="text-xs text-slate-500 mb-1">上一篇</p>
            <p className="font-medium text-slate-900 group-hover:text-cyan-700 line-clamp-2">
              {prevArticle.title}
            </p>
          </div>
        </Link>
      )}
      {nextArticle && (
        <Link
          href={`/article/${nextArticle.slug}`}
          className="flex-1 group flex items-start justify-end gap-3 p-4 rounded-lg border border-slate-200 hover:border-cyan-300 hover:bg-cyan-50/50 transition-all text-right"
        >
          <div className="min-w-0">
            <p className="text-xs text-slate-500 mb-1">下一篇</p>
            <p className="font-medium text-slate-900 group-hover:text-cyan-700 line-clamp-2">
              {nextArticle.title}
            </p>
          </div>
          <ChevronRight className="w-5 h-5 mt-0.5 text-slate-400 group-hover:text-cyan-600 flex-shrink-0" />
        </Link>
      )}
    </nav>
  );
}