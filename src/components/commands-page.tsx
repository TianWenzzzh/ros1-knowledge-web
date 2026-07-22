'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { commandReferences } from '@/lib/commands';

const categories = [...new Set(commandReferences.map(c => c.category))];

export default function CommandsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredCommands = commandReferences.filter(cmd => {
    const matchesSearch = searchQuery === '' || 
      cmd.command.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cmd.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || cmd.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleCopy = async (command: string) => {
    await navigator.clipboard.writeText(command);
  };

  return (
    <div className="space-y-6">
      {/* 页面标题 */}
      <div className="text-center py-6">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">命令速查</h1>
        <p className="text-slate-600">常用 ROS 命令快速参考</p>
      </div>

      {/* 搜索和过滤 */}
      <div className="flex flex-col md:flex-row gap-4">
        <Input
          type="search"
          placeholder="搜索命令..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="md:w-64"
        />
        <div className="flex flex-wrap gap-2">
          <Button
            variant={selectedCategory === null ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedCategory(null)}
          >
            全部
          </Button>
          {categories.map(category => (
            <Button
              key={category}
              variant={selectedCategory === category ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      {/* 命令列表 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredCommands.map(cmd => (
          <Card key={cmd.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between">
                <code className="text-lg font-mono text-cyan-700">{cmd.command}</code>
                <Badge variant="outline">{cmd.category}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-600 mb-3">{cmd.description}</p>
              <div className="space-y-2">
                {cmd.examples.map((example, idx) => (
                  <div key={idx} className="flex items-center justify-between bg-slate-50 rounded p-2">
                    <code className="text-sm font-mono text-slate-700">{example.command}</code>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleCopy(example.command)}
                    >
                      复制
                    </Button>
                  </div>
                ))}
              </div>
              {cmd.relatedCommands.length > 0 && (
                <p className="text-xs text-slate-500 mt-3">
                  相关：{cmd.relatedCommands.join(', ')}
                </p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredCommands.length === 0 && (
        <div className="text-center py-12 text-slate-500">
          没有找到匹配的命令
        </div>
      )}
    </div>
  );
}