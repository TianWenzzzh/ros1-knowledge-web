'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { ChevronRight, Clock, Target, AlertTriangle, Lightbulb, BookOpen, CheckCircle2, ArrowRight, Copy, Check, HelpCircle, PencilLine } from 'lucide-react';
import { useUserContext } from '@/lib/user-context';

// ============ 30秒先导组件 ============
interface IntroHookProps {
  problem?: string;
  scenario?: string;
}

export function IntroHook({ problem, scenario }: IntroHookProps) {
  if (!problem) return null;
  return (
    <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border-l-4 border-blue-600 p-4 rounded-r-lg mb-6">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0">
          <Target className="w-5 h-5" />
        </div>
        <div>
          <p className="text-sm text-blue-600 font-medium mb-1">本节解决什么问题？</p>
          <p className="text-slate-800 font-medium text-lg">{problem}</p>
          {scenario && <p className="text-slate-600 text-sm mt-1">场景：{scenario}</p>}
        </div>
      </div>
    </div>
  );
}

// ============ 学完能做什么组件 ============
interface LearningObjectiveProps {
  objectives: string[];
}

export function LearningObjectives({ objectives }: LearningObjectiveProps) {
  return (
    <div className="bg-white border border-slate-200 rounded-lg p-4 mb-6">
      <h3 className="flex items-center gap-2 text-slate-800 font-semibold mb-3">
        <CheckCircle2 className="w-5 h-5 text-green-600" />
        学完本节，你能做到：
      </h3>
      <ul className="space-y-2">
        {objectives.map((obj, index) => (
          <li key={index} className="flex items-start gap-2 text-slate-700">
            <span className="w-5 h-5 rounded-full bg-green-100 text-green-700 text-xs flex items-center justify-center shrink-0 mt-0.5">
              {index + 1}
            </span>
            <span>{obj}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ============ 前置诊断组件 ============
interface PrerequisiteCheckProps {
  questions: { question: string; hint: string }[];
  missingAction: string;
}

export function PrerequisiteCheck({ questions, missingAction }: PrerequisiteCheckProps) {
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
      <h3 className="flex items-center gap-2 text-amber-800 font-semibold mb-3">
        <AlertTriangle className="w-5 h-5" />
        开始前，快速自检
      </h3>
      <ul className="space-y-2">
        {questions.map((q, index) => (
          <li key={index} className="bg-white rounded p-2">
            <button
              onClick={() => setExpanded(expanded === index ? null : index)}
              className="w-full flex items-center justify-between text-left text-slate-700"
            >
              <span>{q.question}</span>
              <HelpCircle className="w-4 h-4 text-amber-600 shrink-0" />
            </button>
            {expanded === index && (
              <p className="mt-2 text-sm text-slate-600 bg-amber-50 p-2 rounded">{q.hint}</p>
            )}
          </li>
        ))}
      </ul>
      <p className="text-sm text-amber-700 mt-3">如果以上都不会，{missingAction}</p>
    </div>
  );
}

// ============ 直觉模型组件 ============
interface IntuitionModelProps {
  analogy: string;
  diagram?: React.ReactNode;
  strictDefinition: string;
  whereAnalogyWorks: string[];
  whereAnalogyFails: string[];
}

export function IntuitionModel({
  analogy,
  diagram,
  strictDefinition,
  whereAnalogyWorks,
  whereAnalogyFails
}: IntuitionModelProps) {
  const [showStrict, setShowStrict] = useState(false);

  return (
    <div className="mb-8">
      <div className="flex items-center gap-2 mb-3">
        <Lightbulb className="w-5 h-5 text-cyan-600" />
        <h3 className="text-lg font-semibold text-slate-800">直觉理解</h3>
      </div>
      
      <div className="bg-cyan-50 border border-cyan-200 rounded-lg p-4 mb-4">
        <p className="text-slate-700">{analogy}</p>
      </div>

      {diagram && (
        <div className="bg-white border border-slate-200 rounded-lg p-4 mb-4">
          {diagram}
        </div>
      )}

      <button
        onClick={() => setShowStrict(!showStrict)}
        className="text-sm text-cyan-700 hover:text-cyan-800 flex items-center gap-1 mb-3"
      >
        {showStrict ? '收起严格定义' : '查看严格定义'}
        <ChevronRight className={cn('w-4 h-4 transition-transform', showStrict && 'rotate-90')} />
      </button>

      {showStrict && (
        <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 mb-4">
          <p className="text-slate-700">{strictDefinition}</p>
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-green-50 border border-green-200 rounded-lg p-3">
          <p className="text-sm font-medium text-green-800 mb-1">类比成立的地方</p>
          <ul className="text-sm text-green-700 space-y-1">
            {whereAnalogyWorks.map((item, i) => (
              <li key={i} className="flex items-start gap-1">
                <Check className="w-3 h-3 shrink-0 mt-1" />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-lg p-3">
          <p className="text-sm font-medium text-red-800 mb-1">类比不成立的地方</p>
          <ul className="text-sm text-red-700 space-y-1">
            {whereAnalogyFails.map((item, i) => (
              <li key={i} className="flex items-start gap-1">
                <AlertTriangle className="w-3 h-3 shrink-0 mt-1" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

// ============ 最小可运行示例组件 ============
interface TerminalStep {
  terminal: number;
  directory: string;
  action: string;
  command: string;
  expectedOutput?: string;
  observe?: string;
}

interface MinimalExampleProps {
  title: string;
  steps: TerminalStep[];
  prerequisites?: string[];
}

export function MinimalExample({ title, steps, prerequisites }: MinimalExampleProps) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopy = useCallback((command: string, index: number) => {
    navigator.clipboard.writeText(command);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  }, []);

  return (
    <div className="mb-8">
      <h3 className="flex items-center gap-2 text-lg font-semibold text-slate-800 mb-4">
        <BookOpen className="w-5 h-5 text-blue-600" />
        {title}
      </h3>

      {prerequisites && prerequisites.length > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
          <p className="text-sm font-medium text-blue-800 mb-1">开始前准备</p>
          <ul className="text-sm text-blue-700 space-y-1">
            {prerequisites.map((p, i) => <li key={i}>• {p}</li>)}
          </ul>
        </div>
      )}

      <div className="space-y-4">
        {steps.map((step, index) => (
          <div key={index} className="bg-white border border-slate-200 rounded-lg overflow-hidden">
            <div className="bg-slate-100 px-4 py-2 flex items-center justify-between border-b border-slate-200">
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded bg-slate-700 text-white text-xs flex items-center justify-center">
                  {step.terminal}
                </span>
                <span className="text-sm text-slate-600">终端 {step.terminal}</span>
                <code className="text-sm text-slate-800 bg-slate-200 px-2 py-0.5 rounded">
                  {step.directory}
                </code>
              </div>
              <span className="text-xs text-slate-500">{step.action}</span>
            </div>
            
            <div className="p-4">
              <div className="bg-slate-900 rounded p-3 relative group">
                <pre className="text-green-400 text-sm overflow-x-auto">
                  <code>{step.command}</code>
                </pre>
                <button
                  onClick={() => handleCopy(step.command, index)}
                  className="absolute right-2 top-2 p-1.5 rounded bg-slate-700 hover:bg-slate-600 text-slate-300 transition-colors"
                  title="复制命令"
                >
                  {copiedIndex === index ? (
                    <Check className="w-4 h-4 text-green-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>

              {step.expectedOutput && (
                <div className="mt-3">
                  <p className="text-sm text-slate-600 mb-1">预期输出：</p>
                  <div className="bg-slate-800 rounded p-3">
                    <pre className="text-slate-300 text-sm overflow-x-auto">
                      <code>{step.expectedOutput}</code>
                    </pre>
                  </div>
                </div>
              )}

              {step.observe && (
                <div className="mt-3 flex items-start gap-2 text-sm text-slate-600">
                  <Lightbulb className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <span><strong>观察点：</strong>{step.observe}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============ 高频误区组件 ============
interface CommonMistakeProps {
  mistakes: {
    mistake: string;
    symptom: string;
    rootCause: string;
    fix: string;
    prevention: string;
  }[];
}

export function CommonMistakes({ mistakes }: CommonMistakeProps) {
  return (
    <div className="mb-8">
      <h3 className="flex items-center gap-2 text-lg font-semibold text-slate-800 mb-4">
        <AlertTriangle className="w-5 h-5 text-amber-600" />
        高频误区：初学者为什么会错
      </h3>
      
      <div className="space-y-4">
        {mistakes.map((m, index) => (
          <details key={index} className="bg-amber-50 border border-amber-200 rounded-lg group">
            <summary className="p-4 cursor-pointer flex items-center justify-between">
              <span className="font-medium text-amber-800">{m.mistake}</span>
              <ChevronRight className="w-4 h-4 text-amber-600 transition-transform group-open:rotate-90" />
            </summary>
            <div className="px-4 pb-4 space-y-3">
              <div>
                <p className="text-sm font-medium text-amber-800">症状</p>
                <p className="text-sm text-slate-700">{m.symptom}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-red-700">根因</p>
                <p className="text-sm text-slate-700">{m.rootCause}</p>
              </div>
              <div className="bg-white rounded p-2">
                <p className="text-sm font-medium text-green-700">修复</p>
                <code className="text-sm text-slate-800">{m.fix}</code>
              </div>
              <div>
                <p className="text-sm font-medium text-blue-700">如何避免</p>
                <p className="text-sm text-slate-700">{m.prevention}</p>
              </div>
            </div>
          </details>
        ))}
      </div>
    </div>
  );
}

// ============ 跟练任务组件 ============
interface PracticeTaskProps {
  tasks: {
    level: '基础模仿' | '参数变化' | '独立改造';
    description: string;
    hint: string;
    verifyCommand: string;
  }[];
}

export function PracticeTasks({ tasks }: PracticeTaskProps) {
  const [revealedHints, setRevealedHints] = useState<Set<number>>(new Set());

  const toggleHint = (index: number) => {
    const newSet = new Set(revealedHints);
    if (newSet.has(index)) {
      newSet.delete(index);
    } else {
      newSet.add(index);
    }
    setRevealedHints(newSet);
  };

  const levelColors = {
    '基础模仿': 'bg-green-100 text-green-800 border-green-300',
    '参数变化': 'bg-blue-100 text-blue-800 border-blue-300',
    '独立改造': 'bg-purple-100 text-purple-800 border-purple-300'
  };

  return (
    <div className="mb-8">
      <h3 className="flex items-center gap-2 text-lg font-semibold text-slate-800 mb-4">
        <PencilLine className="w-5 h-5 text-purple-600" />
        跟练任务
      </h3>

      <div className="space-y-4">
        {tasks.map((task, index) => (
          <div key={index} className={cn('border rounded-lg p-4', levelColors[task.level].split(' ')[0])}>
            <div className="flex items-center gap-2 mb-2">
              <span className={cn('px-2 py-0.5 rounded text-xs font-medium border', levelColors[task.level])}>
                {task.level}
              </span>
            </div>
            <p className="text-slate-700 mb-3">{task.description}</p>
            
            <button
              onClick={() => toggleHint(index)}
              className="text-sm text-slate-600 hover:text-slate-800 flex items-center gap-1"
            >
              {revealedHints.has(index) ? '隐藏提示' : '查看提示'}
              <ChevronRight className={cn('w-3 h-3 transition-transform', revealedHints.has(index) && 'rotate-90')} />
            </button>
            
            {revealedHints.has(index) && (
              <div className="mt-2 bg-white rounded p-2 text-sm text-slate-600">
                <p><strong>提示：</strong>{task.hint}</p>
                <p className="mt-1"><strong>验收命令：</strong><code className="bg-slate-100 px-1 rounded">{task.verifyCommand}</code></p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ============ 60秒复盘组件 ============
interface RecapProps {
  coreSentence: string;
  mustKnowCommands: string[];
  reviewWhere: string;
}

export function SixtySecondRecap({ coreSentence, mustKnowCommands, reviewWhere }: RecapProps) {
  return (
    <div className="bg-gradient-to-r from-slate-800 to-slate-900 text-white rounded-lg p-6 mb-8">
      <h3 className="flex items-center gap-2 text-lg font-semibold mb-4">
        <Clock className="w-5 h-5" />
        60秒复盘
      </h3>
      
      <div className="space-y-4">
        <div>
          <p className="text-slate-400 text-sm mb-1">本节核心</p>
          <p className="text-xl font-medium">{coreSentence}</p>
        </div>
        
        <div>
          <p className="text-slate-400 text-sm mb-1">必须会的命令</p>
          <div className="flex flex-wrap gap-2">
            {mustKnowCommands.map((cmd, i) => (
              <code key={i} className="bg-slate-700 px-2 py-1 rounded text-sm text-green-400">
                {cmd}
              </code>
            ))}
          </div>
        </div>
        
        <div>
          <p className="text-slate-400 text-sm mb-1">仍不懂时回看</p>
          <p className="text-slate-300">{reviewWhere}</p>
        </div>
      </div>
    </div>
  );
}

// ============ 暂停思考组件 ============
interface PauseAndThinkProps {
  question: string;
  answer: string;
}

export function PauseAndThink({ question, answer }: PauseAndThinkProps) {
  const [revealed, setRevealed] = useState(false);

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 my-6">
      <div className="flex items-center gap-2 mb-2">
        <HelpCircle className="w-5 h-5 text-blue-600" />
        <span className="text-sm font-medium text-blue-700">暂停思考</span>
      </div>
      <p className="text-slate-700 mb-3">{question}</p>
      <button
        onClick={() => setRevealed(!revealed)}
        className="text-sm text-blue-600 hover:text-blue-800"
      >
        {revealed ? '收起答案' : '点击查看答案（先思考再看）'}
      </button>
      {revealed && (
        <div className="mt-3 bg-white rounded p-3 text-slate-700">
          {answer}
        </div>
      )}
    </div>
  );
}

// ============ 时间轴组件 ============
interface TimelineItem {
  time: string;
  label: string;
  sectionId: string;
}

interface CourseTimelineProps {
  items: TimelineItem[];
  currentTime?: string;
}

export function CourseTimeline({ items }: CourseTimelineProps) {
  const handleClick = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-lg p-4 mb-6">
      <h4 className="text-sm font-medium text-slate-600 mb-3">本节时间轴（点击跳转）</h4>
      <div className="flex flex-wrap gap-2">
        {items.map((item, index) => (
          <button
            key={index}
            onClick={() => handleClick(item.sectionId)}
            className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 rounded-full text-sm transition-colors"
          >
            <span className="text-slate-500">{item.time}</span>
            <span className="text-slate-700">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

// ============ 学习方法角标组件 ============
interface LearningMethodTipProps {
  method: '预测执行对比' | '画图理解' | '一次改一个' | '记录预期实际' | '最小复现';
}

const learningMethodContent = {
  '预测执行对比': '先在脑中预测命令执行结果，再实际执行，对比差异并解释。',
  '画图理解': '画出数据流图或架构图，帮助理解节点间通信关系。',
  '一次改一个': '调试时每次只修改一个变量，明确因果关系。',
  '记录预期实际': '记录预期输出和实际输出，快速定位偏差来源。',
  '最小复现': '用最少的步骤复现问题，排除干扰因素。'
};

export function LearningMethodTip({ method }: LearningMethodTipProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="inline-flex items-center gap-1">
      <button
        onClick={() => setExpanded(!expanded)}
        className="text-xs bg-cyan-100 hover:bg-cyan-200 text-cyan-700 px-2 py-0.5 rounded flex items-center gap-1"
      >
        <Lightbulb className="w-3 h-3" />
        {method}
      </button>
      {expanded && (
        <span className="text-xs text-slate-600 ml-1">{learningMethodContent[method]}</span>
      )}
    </div>
  );
}

// ============ 笔记模板组件 ============
interface NoteTemplateProps {
  articleSlug: string;
}

export function NoteTemplate({ articleSlug }: NoteTemplateProps) {
  const { addNote } = useUserContext();
  const [note, setNote] = useState({
    prediction: '',
    actualOutput: '',
    error: '',
    rootCause: '',
    fix: '',
    reusable: ''
  });
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    addNote(articleSlug, `[学习笔记]\n预测: ${note.prediction}\n实际输出: ${note.actualOutput}\n错误: ${note.error}\n根因: ${note.rootCause}\n修复: ${note.fix}\n可复用经验: ${note.reusable}`);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 my-6">
      <h4 className="flex items-center gap-2 text-slate-800 font-medium mb-4">
        <PencilLine className="w-4 h-4" />
        学习笔记模板
      </h4>
      
      <div className="space-y-3">
        <div>
          <label className="text-sm text-slate-600 mb-1 block">我的预测</label>
          <input
            type="text"
            value={note.prediction}
            onChange={(e) => setNote({ ...note, prediction: e.target.value })}
            className="w-full px-3 py-2 border border-slate-300 rounded text-sm"
            placeholder="执行前，我预测输出是..."
          />
        </div>
        
        <div>
          <label className="text-sm text-slate-600 mb-1 block">实际输出</label>
          <input
            type="text"
            value={note.actualOutput}
            onChange={(e) => setNote({ ...note, actualOutput: e.target.value })}
            className="w-full px-3 py-2 border border-slate-300 rounded text-sm"
            placeholder="实际看到的是..."
          />
        </div>
        
        <div>
          <label className="text-sm text-slate-600 mb-1 block">遇到的错误</label>
          <input
            type="text"
            value={note.error}
            onChange={(e) => setNote({ ...note, error: e.target.value })}
            className="w-full px-3 py-2 border border-slate-300 rounded text-sm"
            placeholder="如果有错误，记录错误信息..."
          />
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-sm text-slate-600 mb-1 block">根因分析</label>
            <input
              type="text"
              value={note.rootCause}
              onChange={(e) => setNote({ ...note, rootCause: e.target.value })}
              className="w-full px-3 py-2 border border-slate-300 rounded text-sm"
              placeholder="为什么会这样..."
            />
          </div>
          <div>
            <label className="text-sm text-slate-600 mb-1 block">修复方法</label>
            <input
              type="text"
              value={note.fix}
              onChange={(e) => setNote({ ...note, fix: e.target.value })}
              className="w-full px-3 py-2 border border-slate-300 rounded text-sm"
              placeholder="怎么解决的..."
            />
          </div>
        </div>
        
        <div>
          <label className="text-sm text-slate-600 mb-1 block">可复用经验</label>
          <input
            type="text"
            value={note.reusable}
            onChange={(e) => setNote({ ...note, reusable: e.target.value })}
            className="w-full px-3 py-2 border border-slate-300 rounded text-sm"
            placeholder="下次遇到类似问题可以..."
          />
        </div>
        
        <button
          onClick={handleSave}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded text-sm transition-colors flex items-center justify-center gap-2"
        >
          {saved ? (
            <>
              <Check className="w-4 h-4" />
              已保存
            </>
          ) : (
            '保存笔记'
          )}
        </button>
      </div>
    </div>
  );
}

// ============ 下一课衔接组件 ============
interface NextLessonProps {
  current: string;
  next: { title: string; slug: string; relation: string };
  prev?: { title: string; slug: string };
}

export function NextLesson({ current, next, prev }: NextLessonProps) {
  return (
    <div className="border-t border-slate-200 pt-6 mt-8">
      <h3 className="text-lg font-semibold text-slate-800 mb-4">下一课衔接</h3>
      
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
        <p className="text-slate-700 mb-2">
          学完了 <strong>{current}</strong>，下一步学习 <strong>{next.title}</strong>。
        </p>
        <p className="text-sm text-slate-600">{next.relation}</p>
      </div>
      
      <div className="flex justify-between">
        {prev ? (
          <a href={`/article/${prev.slug}`} className="flex items-center gap-2 text-slate-600 hover:text-slate-800">
            <ChevronRight className="w-4 h-4 rotate-180" />
            上一节：{prev.title}
          </a>
        ) : (
          <div />
        )}
        <a href={`/article/${next.slug}`} className="flex items-center gap-2 text-blue-600 hover:text-blue-800">
          下一节：{next.title}
          <ArrowRight className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
}