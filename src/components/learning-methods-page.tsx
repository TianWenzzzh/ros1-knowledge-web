'use client';

import React from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { learningMethods } from '@/lib/learning-methods';

export default function LearningMethodsPage() {
  return (
    <div className="space-y-8">
      {/* 页面标题 */}
      <div className="text-center py-6">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">学习方法</h1>
        <p className="text-slate-600">掌握高效的学习方法，事半功倍</p>
      </div>

      {/* 方法卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {learningMethods.map(method => (
          <Link key={method.id} href={`/learning-methods/${method.slug}`}>
            <Card className="h-full hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer group">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-3xl">{method.icon}</span>
                  <CardTitle className="group-hover:text-cyan-700">{method.title}</CardTitle>
                </div>
                <CardDescription>{method.summary}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="text-sm text-slate-600 line-clamp-3">{(method.content || '').slice(0, 150)}...</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-500">{(method.tips || []).length} 条技巧</span>
                    <Button variant="ghost" size="sm" className="text-cyan-600">
                      查看详情 →
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* 学习建议 */}
      <section className="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-xl p-6">
        <h2 className="text-xl font-bold text-slate-900 mb-4">🌟 ROS 学习核心建议</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white rounded-lg p-4">
            <h3 className="font-semibold text-slate-900 mb-2">理论 + 实践</h3>
            <p className="text-sm text-slate-600">
              不要只看不练，每学一个概念都要动手验证。小海龟是最好的练手对象。
            </p>
          </div>
          <div className="bg-white rounded-lg p-4">
            <h3 className="font-semibold text-slate-900 mb-2">循序渐进</h3>
            <p className="text-sm text-slate-600">
              不要跳过基础，Linux 命令和 ROS 概念是后续学习的基石。
            </p>
          </div>
          <div className="bg-white rounded-lg p-4">
            <h3 className="font-semibold text-slate-900 mb-2">记录与总结</h3>
            <p className="text-sm text-slate-600">
              用 Git 保存代码，用笔记记录心得。日积月累就是宝贵的学习档案。
            </p>
          </div>
          <div className="bg-white rounded-lg p-4">
            <h3 className="font-semibold text-slate-900 mb-2">提问与搜索</h3>
            <p className="text-sm text-slate-600">
              遇到问题先搜索 ROS Answers 和 Stack Overflow，学会描述问题。
            </p>
          </div>
        </div>
      </section>

      {/* 时间规划建议 */}
      <section className="bg-slate-50 rounded-xl p-6">
        <h2 className="text-xl font-bold text-slate-900 mb-4">⏱️ 建议学习时间规划</h2>
        <div className="space-y-3">
          <div className="flex items-center gap-4">
            <div className="w-24 text-sm font-medium text-slate-700">第1-2周</div>
            <div className="flex-1 bg-white rounded p-3">
              <p className="text-sm text-slate-600">Linux 基础 + ROS 安装 + 基本概念（每日 2-3 小时）</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-24 text-sm font-medium text-slate-700">第3-4周</div>
            <div className="flex-1 bg-white rounded p-3">
              <p className="text-sm text-slate-600">通信机制 + 工具使用 + 小海龟实验（每日 2-3 小时）</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-24 text-sm font-medium text-slate-700">第5-8周</div>
            <div className="flex-1 bg-white rounded p-3">
              <p className="text-sm text-slate-600">TF/URDF + Gazebo + 仿真实验（每日 3-4 小时）</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-24 text-sm font-medium text-slate-700">第9-12周</div>
            <div className="flex-1 bg-white rounded p-3">
              <p className="text-sm text-slate-600">SLAM + 导航 + 综合项目（每日 3-4 小时）</p>
            </div>
          </div>
        </div>
        <p className="text-xs text-slate-500 mt-4">* 以上为建议时间，根据个人情况调整</p>
      </section>
    </div>
  );
}