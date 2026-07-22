'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ROS1EOLNotice } from '@/components/callout';
import { commandReferences } from '@/lib/commands';

const categoryColors: Record<string, string> = {
  'ROS 核心': 'bg-blue-100 text-blue-700 border-blue-200',
  '构建': 'bg-green-100 text-green-700 border-green-200',
  '节点': 'bg-purple-100 text-purple-700 border-purple-200',
  '话题': 'bg-orange-100 text-orange-700 border-orange-200',
  '服务': 'bg-pink-100 text-pink-700 border-pink-200',
  '参数': 'bg-teal-100 text-teal-700 border-teal-200',
  '包管理': 'bg-indigo-100 text-indigo-700 border-indigo-200',
  'TF': 'bg-amber-100 text-amber-700 border-amber-200',
  'rosbag': 'bg-cyan-100 text-cyan-700 border-cyan-200',
  '调试': 'bg-red-100 text-red-700 border-red-200'
};

const categories = [...new Set(commandReferences.map(c => c.category))];

export default function CommandsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredCommands = useMemo(() => {
    return commandReferences.filter(cmd => {
      const matchesSearch = searchQuery === '' || 
        cmd.command.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cmd.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (cmd.tags && cmd.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())));
      const matchesCategory = !selectedCategory || cmd.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const handleCopy = async (command: string, id: string) => {
    try {
      await navigator.clipboard.writeText(command);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* EOL 提示 */}
      <ROS1EOLNotice />

      {/* 页面标题 */}
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">命令速查表</h1>
        <p className="text-lg text-slate-600">
          常用 ROS1 (Noetic) 命令快速参考，包含执行前提与预期结果
        </p>
      </header>

      {/* 搜索和过滤 */}
      <div className="flex flex-col lg:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <input
            type="search"
            placeholder="搜索命令、描述或标签..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-3 pl-12 rounded-lg border border-slate-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 outline-none transition-all"
            aria-label="搜索命令"
          />
          <svg
            className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              selectedCategory === null
                ? 'bg-cyan-600 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            全部
          </button>
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedCategory === category
                  ? 'bg-cyan-600 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* 命令列表 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredCommands.map(cmd => (
          <article
            key={cmd.id}
            className="bg-white rounded-lg border border-slate-200 overflow-hidden hover:shadow-md transition-shadow"
          >
            {/* 命令头部 */}
            <div className="px-5 py-4 border-b border-slate-100 bg-slate-50">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <code className="text-lg font-mono text-cyan-700 bg-cyan-50 px-2 py-1 rounded">
                    {cmd.command.split(' ')[0]}
                  </code>
                  {cmd.command.includes(' ') && (
                    <span className="text-sm text-slate-500 font-mono">
                      {cmd.command.split(' ').slice(1).join(' ')}
                    </span>
                  )}
                </div>
                <span className={`px-2.5 py-1 rounded text-xs font-medium ${categoryColors[cmd.category] || 'bg-slate-100 text-slate-600'}`}>
                  {cmd.category}
                </span>
              </div>
              <p className="mt-2 text-sm text-slate-600">{cmd.description}</p>
            </div>

            {/* 命令详情 */}
            <div className="p-5">
              {/* 用法说明 */}
              {cmd.usage && (
                <div className="mb-4">
                  <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">用法</h4>
                  <p className="text-sm text-slate-700">{cmd.usage}</p>
                </div>
              )}

              {/* 执行前提 */}
              {cmd.prerequisites && cmd.prerequisites.length > 0 && (
                <div className="mb-4">
                  <h4 className="text-xs font-semibold text-amber-600 uppercase tracking-wide mb-1.5 flex items-center gap-1">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    执行前提
                  </h4>
                  <ul className="space-y-1">
                    {cmd.prerequisites.map((prereq, idx) => (
                      <li key={idx} className="text-sm text-slate-600 flex items-start gap-2">
                        <span className="text-amber-500 mt-1">•</span>
                        <span>{prereq}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* 示例命令 */}
              <div className="mb-4">
                <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">示例</h4>
                <div className="space-y-2">
                  {cmd.examples.map((example, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between bg-slate-900 rounded-lg p-3 group"
                    >
                      <div className="flex-1 min-w-0">
                        <code className="text-sm font-mono text-green-400 block truncate">
                          $ {example.command}
                        </code>
                        <span className="text-xs text-slate-400 mt-1 block">{example.description}</span>
                      </div>
                      <button
                        onClick={() => handleCopy(example.command, `${cmd.id}-${idx}`)}
                        className={`ml-3 p-2 rounded transition-colors ${
                          copiedId === `${cmd.id}-${idx}`
                            ? 'bg-green-600 text-white'
                            : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                        }`}
                        aria-label="复制命令"
                      >
                        {copiedId === `${cmd.id}-${idx}` ? (
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        ) : (
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                          </svg>
                        )}
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* 标签 */}
              {cmd.tags && cmd.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {cmd.tags.map(tag => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* 相关命令 */}
              {cmd.relatedCommands && cmd.relatedCommands.length > 0 && (
                <div className="mt-3 pt-3 border-t border-slate-100">
                  <span className="text-xs text-slate-500">相关命令：</span>
                  <span className="text-xs text-cyan-600 ml-1">
                    {cmd.relatedCommands.join(', ')}
                  </span>
                </div>
              )}
            </div>
          </article>
        ))}
      </div>

      {/* 无结果提示 */}
      {filteredCommands.length === 0 && (
        <div className="text-center py-12">
          <div className="text-slate-400 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <p className="text-slate-600">没有找到匹配的命令</p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory(null);
            }}
            className="mt-4 text-sm text-cyan-600 hover:underline"
          >
            清除筛选条件
          </button>
        </div>
      )}

      {/* 底部提示 */}
      <div className="mt-8 text-center text-sm text-slate-500">
        <p>
          以上命令基于 <strong>ROS Noetic + Ubuntu 20.04</strong>。
          使用前请确保已执行{' '}
          <code className="px-1.5 py-0.5 bg-slate-100 rounded text-cyan-700">source /opt/ros/noetic/setup.bash</code>
        </p>
      </div>
    </div>
  );
}