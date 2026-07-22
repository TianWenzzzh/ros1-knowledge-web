'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Category, CATEGORY_INFO } from '@/lib/types';

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

const CATEGORY_ITEMS = Object.entries(CATEGORY_INFO).map(([key, value]) => ({
  href: `/category/${key}`,
  label: value.name,
  icon: value.icon,
  category: key as Category,
}));

interface SiteLayoutProps {
  children: React.ReactNode;
}

export function SiteLayout({ children }: SiteLayoutProps) {
  const pathname = usePathname();
  const [searchQuery, setSearchQuery] = useState('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* 顶部导航栏 */}
      <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">🤖</span>
            <span className="text-xl font-bold text-slate-900">ROS1 知识库</span>
          </Link>

          {/* 搜索框 - 仅桌面端 */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Input
                type="search"
                placeholder="搜索知识文章..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-50 border-slate-200 focus:border-cyan-500 focus:ring-cyan-500"
              />
              <kbd className="absolute right-3 top-1/2 -translate-y-1/2 hidden sm:inline-flex h-5 select-none items-center gap-1 rounded border border-slate-200 bg-slate-100 px-1.5 font-mono text-xs text-slate-500">
                ↵
              </kbd>
            </div>
          </form>

          {/* 桌面端导航 */}
          <nav className="hidden lg:flex items-center gap-1">
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

          {/* 用户入口 */}
          <div className="hidden lg:flex items-center gap-2">
            <Link href="/favorites">
              <Button variant="ghost" size="sm">
                ⭐ 收藏
              </Button>
            </Link>
            <Link href="/my-learning">
              <Button variant="outline" size="sm">
                👤 我的学习
              </Button>
            </Link>
          </div>

          {/* 移动端菜单 */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm" className="lg:hidden">
                ☰
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <nav className="flex flex-col gap-2 mt-8">
                {NAV_ITEMS.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      'flex items-center gap-3 px-4 py-3 rounded-md transition-colors',
                      pathname === item.href
                        ? 'bg-cyan-50 text-cyan-700'
                        : 'text-slate-600 hover:bg-slate-100'
                    )}
                  >
                    <span className="text-lg">{item.icon}</span>
                    <span className="font-medium">{item.label}</span>
                  </Link>
                ))}
              </nav>
              
              {/* 移动端搜索 */}
              <form onSubmit={handleSearch} className="mt-6 px-4">
                <Input
                  type="search"
                  placeholder="搜索知识文章..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full"
                />
              </form>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      {/* 主内容区 */}
      <main className="container mx-auto px-4 py-6">
        {children}
      </main>

      {/* 页脚 */}
      <footer className="border-t border-slate-200 bg-slate-50 mt-auto">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-semibold text-slate-900 mb-3">知识分类</h3>
              <ul className="space-y-2 text-sm text-slate-600">
                {CATEGORY_ITEMS.slice(0, 5).map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="hover:text-cyan-600">
                      {item.icon} {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 mb-3">更多分类</h3>
              <ul className="space-y-2 text-sm text-slate-600">
                {CATEGORY_ITEMS.slice(5).map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="hover:text-cyan-600">
                      {item.icon} {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 mb-3">学习资源</h3>
              <ul className="space-y-2 text-sm text-slate-600">
                <li><Link href="/learning-methods" className="hover:text-cyan-600">学习方法</Link></li>
                <li><Link href="/experiments" className="hover:text-cyan-600">动手实验</Link></li>
                <li><Link href="/commands" className="hover:text-cyan-600">命令速查</Link></li>
                <li><Link href="/troubleshoot" className="hover:text-cyan-600">错误排查</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 mb-3">个人中心</h3>
              <ul className="space-y-2 text-sm text-slate-600">
                <li><Link href="/favorites" className="hover:text-cyan-600">收藏与笔记</Link></li>
                <li><Link href="/my-learning" className="hover:text-cyan-600">我的学习</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-200 mt-8 pt-8 text-center text-sm text-slate-500">
            <p>ROS1 知识库 - 面向学生的机器人操作系统学习平台</p>
            <p className="mt-2">基于 ROS Noetic / Ubuntu 20.04 | 参考资源：ROS Wiki</p>
          </div>
        </div>
      </footer>
    </div>
  );
}