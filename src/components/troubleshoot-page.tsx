'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { troubleshootItems } from '@/lib/troubleshoot';

export default function TroubleshootPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredItems = troubleshootItems.filter(item => {
    const query = searchQuery.toLowerCase();
    return (
      item.errorPattern.toLowerCase().includes(query) ||
      item.keywords.some(k => k.toLowerCase().includes(query)) ||
      item.possibleCauses.some(c => c.toLowerCase().includes(query))
    );
  });

  return (
    <div className="space-y-6">
      {/* 页面标题 */}
      <div className="text-center py-6">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">错误排查</h1>
        <p className="text-slate-600">常见错误和解决方案速查</p>
      </div>

      {/* 搜索 */}
      <div className="max-w-md mx-auto">
        <Input
          type="search"
          placeholder="搜索错误信息..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* 错误列表 */}
      <div className="space-y-4">
        {filteredItems.map(item => (
          <Card key={item.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between gap-4">
                <CardTitle className="text-lg text-red-700">{item.errorPattern}</CardTitle>
              </div>
              <div className="flex flex-wrap gap-1 mt-2">
                {item.keywords.map(keyword => (
                  <Badge key={keyword} variant="outline" className="text-xs">{keyword}</Badge>
                ))}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold text-slate-900 mb-2">可能原因</h4>
                <ul className="list-disc list-inside space-y-1 text-sm text-slate-600">
                  {item.possibleCauses.map((cause, idx) => (
                    <li key={idx}>{cause}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-slate-900 mb-2">解决方案</h4>
                <ul className="list-disc list-inside space-y-1 text-sm text-slate-600">
                  {item.solutions.map((solution, idx) => (
                    <li key={idx}>{solution}</li>
                  ))}
                </ul>
              </div>
              {item.relatedArticles.length > 0 && (
                <div className="pt-2 border-t">
                  <p className="text-sm text-slate-500">
                    相关文章：
                    {item.relatedArticles.map((slug, idx) => (
                      <Link key={slug} href={`/article/${slug}`} className="text-cyan-600 hover:underline ml-1">
                        {slug}{idx < item.relatedArticles.length - 1 ? ', ' : ''}
                      </Link>
                    ))}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="text-center py-12 text-slate-500">
          没有找到匹配的错误信息
        </div>
      )}

      {/* 提示 */}
      <section className="bg-amber-50 rounded-xl p-6">
        <h2 className="text-lg font-bold text-slate-900 mb-2">💡 排错技巧</h2>
        <ul className="space-y-2 text-sm text-slate-700">
          <li>• 完整阅读错误信息，理解错误类型</li>
          <li>• 使用 roswtf 检查系统配置</li>
          <li>• 检查 roscore 是否正常运行</li>
          <li>• 在 ROS Answers 或 Stack Overflow 搜索错误信息</li>
          <li>• 去掉具体数值，搜索错误模式</li>
        </ul>
      </section>
    </div>
  );
}