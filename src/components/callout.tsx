'use client';

import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

type CalloutType = 'tip' | 'warning' | 'error' | 'info' | 'eol' | 'prerequisite';

interface CalloutProps {
  type: CalloutType;
  title?: string;
  children: React.ReactNode;
  className?: string;
}

const CALLOUT_STYLES: Record<CalloutType, { bg: string; border: string; icon: string; defaultTitle: string }> = {
  tip: {
    bg: 'bg-emerald-50',
    border: 'border-l-emerald-500',
    icon: '💡',
    defaultTitle: '提示',
  },
  warning: {
    bg: 'bg-amber-50',
    border: 'border-l-amber-500',
    icon: '⚠️',
    defaultTitle: '注意',
  },
  error: {
    bg: 'bg-red-50',
    border: 'border-l-red-500',
    icon: '❌',
    defaultTitle: '错误',
  },
  info: {
    bg: 'bg-blue-50',
    border: 'border-l-blue-500',
    icon: 'ℹ️',
    defaultTitle: '信息',
  },
  eol: {
    bg: 'bg-slate-100',
    border: 'border-l-slate-500',
    icon: '🕰️',
    defaultTitle: '生命周期提示',
  },
  prerequisite: {
    bg: 'bg-purple-50',
    border: 'border-l-purple-500',
    icon: '📋',
    defaultTitle: '前置条件',
  },
};

export function Callout({ type, title, children, className }: CalloutProps) {
  const styles = CALLOUT_STYLES[type];
  
  return (
    <div 
      className={cn(
        'my-4 p-4 rounded-r-lg border-l-4',
        styles.bg,
        styles.border,
        className
      )}
      role="note"
      aria-label={`${title || styles.defaultTitle}`}
    >
      <div className="flex items-start gap-3">
        <span className="text-lg flex-shrink-0" aria-hidden="true">
          {styles.icon}
        </span>
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-slate-900 mb-1">
            {title || styles.defaultTitle}
          </p>
          <div className="text-sm text-slate-700">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

// ROS1 EOL 特殊提示组件
export function ROS1EOLNotice() {
  return (
    <Callout type="eol" title="ROS1 已停止维护">
      <p>
        ROS1 于 <strong>2025年5月31日</strong> 正式结束生命周期（EOL）。
        ROS Wiki 现为归档资料，不再更新。建议新项目使用 ROS2。
      </p>
      <p className="mt-2">
        本知识库保留 ROS1 内容供学习和遗留项目维护参考。
        迁移指南请参考 <Link href="/article/ros1-to-ros2" className="text-cyan-700 underline hover:text-cyan-600">ROS1 → ROS2 迁移</Link>。
      </p>
    </Callout>
  );
}

// 前置条件提示
interface PrerequisiteListProps {
  items: string[];
}

export function PrerequisiteList({ items }: PrerequisiteListProps) {
  return (
    <Callout type="prerequisite" title="开始前请确认">
      <ul className="list-disc list-inside space-y-1">
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </Callout>
  );
}

// 学习目标组件
interface LearningObjectivesProps {
  objectives: string[];
}

export function LearningObjectives({ objectives }: LearningObjectivesProps) {
  return (
    <div className="my-6 p-4 bg-cyan-50 rounded-lg border border-cyan-200">
      <h4 className="font-semibold text-cyan-900 mb-2 flex items-center gap-2">
        <span>🎯</span> 本页你将学会
      </h4>
      <ul className="space-y-2">
        {objectives.map((objective, index) => (
          <li key={index} className="flex items-start gap-2 text-sm text-cyan-900">
            <span className="text-cyan-500 mt-1">✓</span>
            <span>{objective}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

// 最小实践组件
interface MinimalPracticeProps {
  title?: string;
  duration?: string;
  steps: string[];
  verificationCommand?: string;
  expectedOutput?: string;
}

export function MinimalPractice({ 
  title = "5分钟最小实践", 
  duration = "约5分钟",
  steps, 
  verificationCommand,
  expectedOutput 
}: MinimalPracticeProps) {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = async () => {
    if (verificationCommand) {
      await navigator.clipboard.writeText(verificationCommand);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="my-6 p-4 bg-slate-50 rounded-lg border border-slate-200">
      <div className="flex items-center justify-between mb-3">
        <h4 className="font-semibold text-slate-900 flex items-center gap-2">
          <span>⚡</span> {title}
        </h4>
        <span className="text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded">
          {duration}
        </span>
      </div>
      
      <ol className="space-y-2 mb-4">
        {steps.map((step, index) => (
          <li key={index} className="flex items-start gap-2 text-sm">
            <span className="flex-shrink-0 w-5 h-5 bg-slate-200 rounded-full flex items-center justify-center text-xs font-medium">
              {index + 1}
            </span>
            <span className="text-slate-700">{step}</span>
          </li>
        ))}
      </ol>

      {verificationCommand && (
        <div className="mt-4">
          <p className="text-xs text-slate-500 mb-1">验证命令：</p>
          <div className="flex items-center gap-2">
            <code className="flex-1 px-3 py-2 bg-slate-800 text-green-400 rounded text-sm font-mono">
              {verificationCommand}
            </code>
            <button
              onClick={handleCopy}
              className="px-3 py-2 bg-slate-200 hover:bg-slate-300 rounded text-xs font-medium transition-colors"
              aria-label="复制命令"
            >
              {copied ? '已复制' : '复制'}
            </button>
          </div>
          {expectedOutput && (
            <p className="text-xs text-slate-500 mt-1">
              预期输出：<code className="text-green-600">{expectedOutput}</code>
            </p>
          )}
        </div>
      )}
    </div>
  );
}

// 下一步建议组件
interface NextStepsProps {
  steps: { title: string; description: string; href?: string }[];
}

export function NextSteps({ steps }: NextStepsProps) {
  return (
    <div className="my-6 p-4 bg-gradient-to-r from-cyan-50 to-blue-50 rounded-lg border border-cyan-200">
      <h4 className="font-semibold text-cyan-900 mb-3 flex items-center gap-2">
        <span>➡️</span> 完成后下一步
      </h4>
      <div className="space-y-2">
        {steps.map((step, index) => (
          <div key={index} className="flex items-start gap-3 p-2 bg-white/50 rounded">
            {step.href ? (
              <a 
                href={step.href}
                className="text-cyan-700 hover:text-cyan-600 font-medium"
              >
                {step.title}
              </a>
            ) : (
              <span className="font-medium text-slate-900">{step.title}</span>
            )}
            <span className="text-sm text-slate-600">{step.description}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// 别名导出
export const EOLNotice = ROS1EOLNotice;
export const InfoCallout = ({ children, title }: { children: React.ReactNode; title?: string }) => (
  <Callout type="info" title={title}>{children}</Callout>
);
export const WarningCallout = ({ children, title }: { children: React.ReactNode; title?: string }) => (
  <Callout type="warning" title={title}>{children}</Callout>
);