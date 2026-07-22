import { methodEntries } from '@/lib/methods-data';
import Link from 'next/link';

export default function MethodsPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* 页面标题 */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-3">学习方法</h1>
          <p className="text-slate-600">
            掌握高效的学习方法，让ROS1学习事半功倍
          </p>
        </div>

        {/* 分类筛选 */}
        <div className="flex gap-2 mb-6">
          <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">全部</span>
          <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-sm">基础</span>
          <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-sm">进阶</span>
          <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-sm">工具</span>
        </div>

        {/* 方法卡片网格 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {methodEntries.map((method) => (
            <Link
              key={method.id}
              href={`/methods/${method.id}`}
              className="block group"
            >
              <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 hover:shadow-md hover:border-blue-300 transition-all duration-200 h-full">
                {/* 图标和分类 */}
                <div className="flex items-start justify-between mb-4">
                  <span className="text-3xl">{method.icon}</span>
                  <div className="flex gap-2">
                    <span className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-xs">
                      {method.category}
                    </span>
                    <span className="px-2 py-0.5 bg-blue-50 text-blue-600 rounded text-xs">
                      {method.difficulty}
                    </span>
                  </div>
                </div>

                {/* 标题和描述 */}
                <h3 className="text-lg font-semibold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {method.title}
                </h3>
                <p className="text-slate-600 text-sm mb-4 line-clamp-2">
                  {method.description}
                </p>

                {/* 预计时间 */}
                <div className="flex items-center text-xs text-slate-500">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {method.estimatedTime}
                </div>

                {/* 查看详情按钮 */}
                <div className="mt-4 pt-4 border-t border-slate-100">
                  <span className="text-blue-600 text-sm font-medium group-hover:text-blue-700">
                    查看详情 →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* 底部提示 */}
        <div className="mt-12 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl">
          <h3 className="text-lg font-semibold text-slate-900 mb-2">💡 学习建议</h3>
          <ul className="text-slate-600 space-y-2">
            <li>• 从"基础"类别开始，建立扎实的学习习惯</li>
            <li>• 每周选择1-2个方法重点实践</li>
            <li>• 记录学习日志，定期复盘总结</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
