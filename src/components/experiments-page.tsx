'use client';

import React from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { experiments } from '@/lib/experiments';
import { useUserContext } from '@/lib/user-context';

const difficultyColors = {
  beginner: 'bg-green-100 text-green-700',
  intermediate: 'bg-yellow-100 text-yellow-700',
  advanced: 'bg-red-100 text-red-700'
};

const difficultyLabels = {
  beginner: '入门',
  intermediate: '进阶',
  advanced: '高级'
};

export default function ExperimentsPage() {
  const { isExperimentCompleted } = useUserContext();
  const completedCount = experiments.filter(e => isExperimentCompleted(e.id)).length;

  return (
    <div className="space-y-8">
      {/* 页面标题 */}
      <div className="text-center py-6">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">动手实验</h1>
        <p className="text-slate-600">通过实际操作加深对 ROS 的理解</p>
        <div className="mt-4 flex items-center justify-center gap-4">
          <Badge variant="secondary">已完成 {completedCount}/{experiments.length} 个实验</Badge>
        </div>
      </div>

      {/* 实验列表 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {experiments.map(experiment => {
          const isCompleted = isExperimentCompleted(experiment.id);
          return (
            <Link key={experiment.id} href={`/experiments/${experiment.slug}`}>
              <Card className={`h-full hover:shadow-md hover:-translate-y-1 transition-all cursor-pointer ${isCompleted ? 'border-green-300 bg-green-50/30' : ''}`}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <Badge className={difficultyColors[experiment.difficulty]}>
                        {difficultyLabels[experiment.difficulty]}
                      </Badge>
                      <CardTitle className="text-lg mt-2">{experiment.title}</CardTitle>
                    </div>
                    {isCompleted && (
                      <Badge className="bg-green-500 text-white">✓ 已完成</Badge>
                    )}
                  </div>
                  <CardDescription className="mt-2">
                    {experiment.objectives.slice(0, 2).join(' · ')}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4 text-sm text-slate-500">
                    <span>⏱️ {experiment.duration} 分钟</span>
                    <span>📁 {experiment.category}</span>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-1">
                    {experiment.prerequisites.slice(0, 3).map((prereq, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">{prereq}</Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>

      {/* 学习建议 */}
      <section className="bg-cyan-50 rounded-xl p-6">
        <h2 className="text-xl font-bold text-slate-900 mb-4">💡 实验学习建议</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg p-4">
            <h3 className="font-semibold text-slate-900 mb-2">准备环境</h3>
            <p className="text-sm text-slate-600">确保 ROS 环境正确安装，按照实验前提检查依赖。</p>
          </div>
          <div className="bg-white rounded-lg p-4">
            <h3 className="font-semibold text-slate-900 mb-2">记录过程</h3>
            <p className="text-sm text-slate-600">遇到问题记录下来，解决问题的过程就是学习的过程。</p>
          </div>
          <div className="bg-white rounded-lg p-4">
            <h3 className="font-semibold text-slate-900 mb-2">举一反三</h3>
            <p className="text-sm text-slate-600">完成实验后尝试修改参数，观察结果变化。</p>
          </div>
        </div>
      </section>
    </div>
  );
}