import Link from 'next/link';
import { notFound } from 'next/navigation';
import { learningMethods } from '@/lib/learning-methods';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return learningMethods.map((method) => ({
    slug: method.slug,
  }));
}

export default async function LearningMethodDetailPage({ params }: Props) {
  const { slug } = await params;
  const method = learningMethods.find((m) => m.slug === slug);

  if (!method) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* 面包屑导航 */}
      <nav className="mb-6 text-sm text-slate-500">
        <Link href="/" className="hover:text-blue-600">首页</Link>
        <span className="mx-2">/</span>
        <Link href="/learning-methods" className="hover:text-blue-600">学习方法</Link>
        <span className="mx-2">/</span>
        <span className="text-slate-700">{method.title}</span>
      </nav>

      {/* 标题区域 */}
      <header className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <span className="text-5xl">{method.icon}</span>
          <h1 className="text-3xl font-bold text-slate-800">{method.title}</h1>
        </div>
        <p className="text-lg text-slate-600">{method.summary}</p>
      </header>

      {/* 主要内容 */}
      <article className="prose prose-slate max-w-none">
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 mb-6">
          <h2 className="text-xl font-semibold text-slate-800 mb-4 flex items-center gap-2">
            <span>📖</span> 详细内容
          </h2>
          <div className="text-slate-700 leading-relaxed whitespace-pre-line">
            {method.content}
          </div>
        </div>

        {/* 实用技巧 */}
        {method.tips && method.tips.length > 0 && (
          <div className="bg-blue-50 rounded-lg border border-blue-200 p-6 mb-6">
            <h2 className="text-xl font-semibold text-blue-800 mb-4 flex items-center gap-2">
              <span>💡</span> 实用技巧
            </h2>
            <ul className="space-y-2">
              {method.tips.map((tip, index) => (
                <li key={index} className="flex items-start gap-2 text-blue-700">
                  <span className="text-blue-400 mt-1">•</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* 推荐资源 */}
        {method.resources && method.resources.length > 0 && (
          <div className="bg-green-50 rounded-lg border border-green-200 p-6 mb-6">
            <h2 className="text-xl font-semibold text-green-800 mb-4 flex items-center gap-2">
              <span>🔗</span> 推荐资源
            </h2>
            <ul className="space-y-3">
              {method.resources.map((resource, index) => (
                <li key={index}>
                  <a
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-700 hover:text-green-900 hover:underline inline-flex items-center gap-1"
                  >
                    {resource.title}
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </article>

      {/* 返回按钮 */}
      <div className="mt-8 pt-6 border-t border-slate-200">
        <Link
          href="/learning-methods"
          className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          返回学习方法列表
        </Link>
      </div>
    </div>
  );
}
