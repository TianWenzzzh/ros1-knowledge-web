'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { cn } from '@/lib/utils';

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  items: TOCItem[];
  activeId?: string;
}

export function TableOfContents({ items, activeId }: TableOfContentsProps) {
  const [mounted, setMounted] = useState(false);
  const [localActiveId, setLocalActiveId] = useState<string>('');
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Scroll spy 实现
  useEffect(() => {
    if (!mounted || items.length === 0) return;

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      // 找到最接近顶部的元素
      const visibleEntries = entries.filter(entry => entry.isIntersecting);
      if (visibleEntries.length > 0) {
        // 选择最接近顶部的
        const sortedEntries = visibleEntries.sort((a, b) => {
          const rectA = a.boundingClientRect;
          const rectB = b.boundingClientRect;
          // 优先选择在视口顶部附近的
          const topThreshold = 100;
          const aFromTop = Math.abs(rectA.top - topThreshold);
          const bFromTop = Math.abs(rectB.top - topThreshold);
          return aFromTop - bFromTop;
        });
        setLocalActiveId(sortedEntries[0].target.id);
      }
    };

    observerRef.current = new IntersectionObserver(handleIntersect, {
      rootMargin: '-80px 0px -70% 0px',
      threshold: 0,
    });

    // 观察所有标题元素
    items.forEach(item => {
      const element = document.getElementById(item.id);
      if (element && observerRef.current) {
        observerRef.current.observe(element);
      }
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [mounted, items]);

  const handleItemClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const currentActiveId = activeId || localActiveId;

  if (!mounted) return null;

  return (
    <nav className="space-y-1" aria-label="文章目录">
      <p className="text-xs font-semibold text-slate-900 uppercase tracking-wider mb-3">
        本页内容
      </p>
      <ul className="space-y-1">
        {items.map((item) => (
          <li key={item.id}>
            <button
              onClick={() => handleItemClick(item.id)}
              className={cn(
                'w-full text-left text-sm py-1.5 px-2 rounded transition-colors',
                'hover:bg-slate-100',
                item.level === 3 && 'pl-4',
                currentActiveId === item.id
                  ? 'text-cyan-700 font-medium bg-cyan-50 border-l-2 border-cyan-500'
                  : 'text-slate-600'
              )}
              aria-current={currentActiveId === item.id ? 'true' : undefined}
            >
              {item.text}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}