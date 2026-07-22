import { notFound } from 'next/navigation';
import Link from 'next/link';
import { methodEntries, getMethodById, type LearningMethod } from '@/lib/methods-data';

interface PageProps {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return methodEntries.map((method) => ({
    id: method.id,
  }));
}

export default async function MethodDetailPage({ params }: PageProps) {
  const { id } = await params;
  const method = getMethodById(id);

  if (!method) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* 返回按钮 */}
        <Link
          href="/methods"
          className="inline-flex items-center text-slate-600 hover:text-blue-600 mb-6 transition-colors"
        >
          <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          返回学习方法列表
        </Link>

        {/* 页面头部 */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 mb-6">
          <div className="flex items-start justify-between mb-4">
            <span className="text-4xl">{method.icon}</span>
            <div className="flex gap-2">
              <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-sm">
                {method.category}
              </span>
              <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm">
                {method.difficulty}
              </span>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-slate-900 mb-3">{method.title}</h1>
          <p className="text-slate-600 text-lg mb-4">{method.description}</p>
          <div className="flex items-center text-sm text-slate-500">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            预计时间：{method.estimatedTime}
          </div>
        </div>

        {/* 概述 */}
        <section className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 mb-6">
          <h2 className="text-xl font-semibold text-slate-900 mb-3 flex items-center">
            <span className="w-1 h-6 bg-blue-500 rounded mr-2"></span>
            概述
          </h2>
          <p className="text-slate-600 leading-relaxed">{method.overview}</p>
        </section>

        {/* 为什么有效 */}
        <section className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 mb-6">
          <h2 className="text-xl font-semibold text-slate-900 mb-4 flex items-center">
            <span className="w-1 h-6 bg-green-500 rounded mr-2"></span>
            为什么有效
          </h2>
          <ul className="space-y-3">
            {method.whyItWorks.map((reason, index) => (
              <li key={index} className="flex items-start">
                <span className="flex-shrink-0 w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm mr-3 mt-0.5">
                  {index + 1}
                </span>
                <span className="text-slate-600">{reason}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* 实施步骤 */}
        <section className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 mb-6">
          <h2 className="text-xl font-semibold text-slate-900 mb-4 flex items-center">
            <span className="w-1 h-6 bg-blue-500 rounded mr-2"></span>
            实施步骤
          </h2>
          <div className="space-y-4">
            {method.steps.map((step, index) => (
              <div key={index} className="flex items-start p-4 bg-slate-50 rounded-lg">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-semibold mr-4">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-slate-900 mb-1">{step.title}</h3>
                  <p className="text-slate-600 text-sm mb-2">{step.description}</p>
                  {step.duration && (
                    <span className="text-xs text-slate-500">⏱️ {step.duration}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 关键技巧 */}
        <section className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 mb-6">
          <h2 className="text-xl font-semibold text-slate-900 mb-4 flex items-center">
            <span className="w-1 h-6 bg-amber-500 rounded mr-2"></span>
            关键技巧
          </h2>
          <ul className="space-y-2">
            {method.tips.map((tip, index) => (
              <li key={index} className="flex items-start">
                <span className="text-amber-500 mr-2">💡</span>
                <span className="text-slate-600">{tip}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* 常见误区 */}
        <section className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 mb-6">
          <h2 className="text-xl font-semibold text-slate-900 mb-4 flex items-center">
            <span className="w-1 h-6 bg-red-500 rounded mr-2"></span>
            常见误区
          </h2>
          <ul className="space-y-3">
            {method.commonMistakes.map((mistake, index) => (
              <li key={index} className="flex items-start p-3 bg-red-50 rounded-lg">
                <span className="text-red-500 mr-2">⚠️</span>
                <span className="text-slate-700">{mistake}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* 实际案例 */}
        <section className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 mb-6">
          <h2 className="text-xl font-semibold text-slate-900 mb-4 flex items-center">
            <span className="w-1 h-6 bg-purple-500 rounded mr-2"></span>
            实际案例
          </h2>
          <div className="space-y-4">
            {method.examples.map((example, index) => (
              <div key={index} className="border border-slate-200 rounded-lg overflow-hidden">
                <div className="bg-purple-50 px-4 py-2 border-b border-slate-200">
                  <span className="text-sm font-medium text-purple-700">场景：{example.scenario}</span>
                </div>
                <div className="p-4 space-y-2">
                  <div className="flex items-start">
                    <span className="text-sm font-medium text-slate-500 w-16 flex-shrink-0">行动：</span>
                    <span className="text-slate-600">{example.action}</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-sm font-medium text-slate-500 w-16 flex-shrink-0">结果：</span>
                    <span className="text-green-600">{example.result}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 推荐学习资源 */}
        <section className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 mb-6">
          <h2 className="text-xl font-semibold text-slate-900 mb-4 flex items-center">
            <span className="w-1 h-6 bg-indigo-500 rounded mr-2"></span>
            推荐学习资源
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {method.resources.map((resource, index) => (
              <a
                key={index}
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center p-3 border border-slate-200 rounded-lg hover:border-indigo-300 hover:bg-indigo-50 transition-colors group"
              >
                <span className="text-2xl mr-3">
                  {resource.type === 'documentation' && '📄'}
                  {resource.type === 'tutorial' && '📚'}
                  {resource.type === 'video' && '🎥'}
                  {resource.type === 'tool' && '🔧'}
                </span>
                <div className="flex-1">
                  <h4 className="font-medium text-slate-900 group-hover:text-indigo-600">
                    {resource.title}
                  </h4>
                  <span className="text-xs text-slate-500 capitalize">{resource.type}</span>
                </div>
                <svg className="w-5 h-5 text-slate-400 group-hover:text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            ))}
          </div>
        </section>

        {/* 行动清单 */}
        <section className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
          <h2 className="text-xl font-semibold text-slate-900 mb-4 flex items-center">
            <span className="w-1 h-6 bg-blue-500 rounded mr-2"></span>
            行动清单
          </h2>
          <ul className="space-y-3">
            {method.actionItems.map((item, index) => (
              <li key={index} className="flex items-start">
                <input
                  type="checkbox"
                  id={`action-${index}`}
                  className="mt-1 w-4 h-4 border-slate-300 rounded text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor={`action-${index}`} className="ml-3 text-slate-700 cursor-pointer">
                  {item}
                </label>
              </li>
            ))}
          </ul>
        </section>

        {/* 底部导航 */}
        <div className="mt-8 flex justify-between items-center">
          <Link
            href="/methods"
            className="inline-flex items-center px-4 py-2 bg-white border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors"
          >
            <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            返回列表
          </Link>
          <Link
            href="/methods"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            继续学习其他方法
            <svg className="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
