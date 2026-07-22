'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { knowledgeArticles } from '@/lib/data';
import { CATEGORY_INFO } from '@/lib/types';
import { ROS1EOLNotice, Callout } from '@/components/callout';

// 诊断流程步骤
interface DiagnosticStep {
  id: string;
  title: string;
  command?: string;
  expectedOutput?: string;
  failureIndication?: string;
  nextSteps: string[];
}

// 常见问题诊断流程
const DIAGNOSTIC_FLOWS = [
  {
    id: 'roscore-connection',
    title: '无法连接 ROS Master',
    symptom: '运行 ROS 命令时出现 "Unable to contact master" 或连接失败',
    steps: [
      {
        id: 'check-roscore',
        title: '检查 roscore 是否运行',
        command: 'ps aux | grep roscore',
        expectedOutput: '显示 roscore 进程',
        failureIndication: '没有 roscore 进程',
        nextSteps: ['运行 roscore 启动 ROS Master'],
      },
      {
        id: 'check-master-uri',
        title: '检查 ROS_MASTER_URI',
        command: 'echo $ROS_MASTER_URI',
        expectedOutput: 'http://localhost:11311',
        failureIndication: '输出为空或不正确',
        nextSteps: ['export ROS_MASTER_URI=http://localhost:11311'],
      },
      {
        id: 'check-network',
        title: '检查网络连接',
        command: 'ping localhost -c 1',
        expectedOutput: 'ping 成功',
        failureIndication: 'ping 失败',
        nextSteps: ['检查网络配置', '检查防火墙'],
      },
    ],
    relatedArticle: 'roscore',
  },
  {
    id: 'package-not-found',
    title: '找不到 ROS 包',
    symptom: '运行命令时出现 "package not found" 或 "rospack find" 失败',
    steps: [
      {
        id: 'check-package-name',
        title: '确认包名拼写',
        command: 'rospack list | grep <package_name>',
        expectedOutput: '显示包路径',
        failureIndication: '没有输出',
        nextSteps: ['检查包名拼写', '搜索可用包：apt search ros-noetic-*'],
      },
      {
        id: 'check-package-path',
        title: '检查 ROS_PACKAGE_PATH',
        command: 'echo $ROS_PACKAGE_PATH',
        expectedOutput: '包含工作空间路径',
        failureIndication: '路径不完整或为空',
        nextSteps: ['source devel/setup.bash', '检查工作空间是否正确编译'],
      },
      {
        id: 'install-package',
        title: '安装缺失的包',
        command: 'sudo apt install ros-noetic-<package-name>',
        expectedOutput: '安装成功',
        failureIndication: '找不到包',
        nextSteps: ['检查包名是否正确', '更新软件源：sudo apt update'],
      },
    ],
    relatedArticle: 'catkin-workspace',
  },
  {
    id: 'topic-no-data',
    title: '话题没有数据',
    symptom: 'rostopic echo 没有输出或频率为 0',
    steps: [
      {
        id: 'check-topic-list',
        title: '检查话题是否存在',
        command: 'rostopic list',
        expectedOutput: '话题出现在列表中',
        failureIndication: '话题不存在',
        nextSteps: ['检查发布者节点是否运行', '确认话题名称正确'],
      },
      {
        id: 'check-topic-info',
        title: '检查话题信息',
        command: 'rostopic info <topic_name>',
        expectedOutput: '显示发布者和订阅者',
        failureIndication: '没有发布者',
        nextSteps: ['启动发布者节点', '检查节点连接状态'],
      },
      {
        id: 'check-topic-hz',
        title: '检查话题频率',
        command: 'rostopic hz <topic_name>',
        expectedOutput: '显示发布频率',
        failureIndication: '没有数据',
        nextSteps: ['检查发布者代码逻辑', '确认消息类型匹配'],
      },
    ],
    relatedArticle: 'ros-topic',
  },
  {
    id: 'tf-extrapolation',
    title: 'TF 变换错误',
    symptom: 'Transform timeout 或 Extrapolation into the future',
    steps: [
      {
        id: 'check-tf-tree',
        title: '检查 TF 树',
        command: 'rosrun tf view_frames',
        expectedOutput: '生成 frames.pdf',
        failureIndication: 'TF 树断裂',
        nextSteps: ['查看 frames.pdf 确认 TF 树结构', '检查缺失的 TF 发布者'],
      },
      {
        id: 'check-tf-frames',
        title: '检查坐标系',
        command: 'rosrun tf tf_echo <source> <target>',
        expectedOutput: '显示变换',
        failureIndication: '无法找到变换',
        nextSteps: ['确认坐标系名称正确', '使用 rqt_tf_tree 查看实时 TF 树'],
      },
      {
        id: 'fix-time-sync',
        title: '同步时间戳',
        command: 'date',
        expectedOutput: '系统时间正确',
        failureIndication: '时间不准确',
        nextSteps: ['使用 ntpdate 同步时间', '检查是否使用 use_sim_time'],
      },
    ],
    relatedArticle: 'tf-transform',
  },
  {
    id: 'catkin-build-failed',
    title: 'catkin 构建失败',
    symptom: 'catkin_make 或 catkin build 报错',
    steps: [
      {
        id: 'check-error-message',
        title: '查看错误信息',
        command: 'catkin_make 2>&1 | head -50',
        expectedOutput: '定位到具体错误',
        failureIndication: '编译错误',
        nextSteps: ['根据错误信息修复代码', '检查依赖是否安装'],
      },
      {
        id: 'check-dependencies',
        title: '检查依赖',
        command: 'rosdep install --from-paths src --ignore-src -y',
        expectedOutput: '所有依赖已安装',
        failureIndication: '有未满足的依赖',
        nextSteps: ['安装缺失依赖', '检查 package.xml 依赖声明'],
      },
      {
        id: 'clean-rebuild',
        title: '清理后重新构建',
        command: 'catkin clean -y && catkin_make',
        expectedOutput: '构建成功',
        failureIndication: '仍然失败',
        nextSteps: ['检查 CMakeLists.txt 配置', '查看详细错误日志'],
      },
    ],
    relatedArticle: 'catkin-workspace',
  },
  {
    id: 'gazebo-failed',
    title: 'Gazebo 启动失败',
    symptom: 'Gazebo 黑屏或崩溃',
    steps: [
      {
        id: 'check-gazebo-version',
        title: '检查 Gazebo 版本',
        command: 'gazebo --version',
        expectedOutput: 'Gazebo 11.x',
        failureIndication: '版本不匹配',
        nextSteps: ['安装正确版本：sudo apt install gazebo11'],
      },
      {
        id: 'check-models',
        title: '检查模型路径',
        command: 'echo $GAZEBO_MODEL_PATH',
        expectedOutput: '包含模型路径',
        failureIndication: '路径为空',
        nextSteps: ['设置 GAZEBO_MODEL_PATH', '下载缺失的模型'],
      },
      {
        id: 'check-gpu',
        title: '检查 GPU 支持',
        command: 'glxinfo | grep "OpenGL"',
        expectedOutput: '显示 GPU 信息',
        failureIndication: '没有 GPU 或驱动问题',
        nextSteps: ['使用 CPU 渲染：export SVGA_VGPU_RENDER=1', '检查显卡驱动'],
      },
    ],
    relatedArticle: 'gazebo-simulation',
  },
  {
    id: 'navigation-stuck',
    title: '导航不工作',
    symptom: '机器人不动或导航失败',
    steps: [
      {
        id: 'check-navigation-stack',
        title: '检查导航栈',
        command: 'rostopic list | grep move_base',
        expectedOutput: '显示 move_base 话题',
        failureIndication: '话题不存在',
        nextSteps: ['启动导航栈', '检查 move_base 参数'],
      },
      {
        id: 'check-goal-topic',
        title: '检查目标话题',
        command: 'rostopic pub /move_base_simple/goal geometry_msgs/PoseStamped ...',
        expectedOutput: '机器人开始移动',
        failureIndication: '没有反应',
        nextSteps: ['检查坐标系统', '确认地图已加载'],
      },
      {
        id: 'check-costmaps',
        title: '检查代价地图',
        command: 'rosrun map_server map_saver',
        expectedOutput: '保存地图',
        failureIndication: '地图为空',
        nextSteps: ['检查激光雷达数据', '确认 costmap 参数'],
      },
    ],
    relatedArticle: 'navigation-stack',
  },
];

// 症状选择器
function SymptomSelector({ 
  symptoms, 
  selectedId, 
  onSelect 
}: { 
  symptoms: typeof DIAGNOSTIC_FLOWS;
  selectedId: string | null;
  onSelect: (id: string) => void;
}) {
  return (
    <div className="space-y-2">
      <h3 className="text-sm font-medium text-slate-700 mb-3">选择你遇到的问题：</h3>
      {symptoms.map((flow) => (
        <button
          key={flow.id}
          onClick={() => onSelect(flow.id)}
          className={cn(
            "w-full text-left p-4 rounded-lg border-2 transition-all",
            selectedId === flow.id
              ? "border-cyan-500 bg-cyan-50"
              : "border-slate-200 hover:border-slate-300 bg-white"
          )}
        >
          <div className="font-medium text-slate-900">{flow.title}</div>
          <div className="text-sm text-slate-500 mt-1">{flow.symptom}</div>
        </button>
      ))}
    </div>
  );
}

// 诊断步骤
function DiagnosticSteps({ 
  flow 
}: { 
  flow: typeof DIAGNOSTIC_FLOWS[0];
}) {
  const [currentStep, setCurrentStep] = useState(0);
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = async (cmd: string) => {
    await navigator.clipboard.writeText(cmd);
    setCopied(cmd);
    setTimeout(() => setCopied(null), 2000);
  };

  const step = flow.steps[currentStep];
  const relatedArticle = knowledgeArticles.find(a => a.slug === flow.relatedArticle);

  return (
    <div className="space-y-6">
      {/* 步骤导航 */}
      <div className="flex items-center gap-2">
        {flow.steps.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentStep(idx)}
            className={cn(
              "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors",
              currentStep === idx
                ? "bg-cyan-600 text-white"
                : currentStep > idx
                ? "bg-cyan-100 text-cyan-700"
                : "bg-slate-100 text-slate-500"
            )}
          >
            {idx + 1}
          </button>
        ))}
      </div>

      {/* 当前步骤 */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">{step.title}</h3>

        {step.command && (
          <div className="mb-4">
            <label className="text-sm text-slate-600 mb-2 block">执行命令：</label>
            <div className="flex items-center gap-2">
              <code className="flex-1 p-3 bg-slate-900 rounded-lg text-slate-200 font-mono text-sm">
                $ {step.command}
              </code>
              <button
                onClick={() => handleCopy(step.command!)}
                className="px-3 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg text-sm"
              >
                {copied === step.command ? '已复制' : '复制'}
              </button>
            </div>
          </div>
        )}

        {step.expectedOutput && (
          <div className="mb-4 p-3 bg-green-50 rounded-lg border border-green-200">
            <p className="text-sm font-medium text-green-800 mb-1">预期输出：</p>
            <p className="text-sm text-green-700">{step.expectedOutput}</p>
          </div>
        )}

        {step.failureIndication && (
          <div className="mb-4 p-3 bg-amber-50 rounded-lg border border-amber-200">
            <p className="text-sm font-medium text-amber-800 mb-1">如果看到：</p>
            <p className="text-sm text-amber-700">{step.failureIndication}</p>
          </div>
        )}

        {step.nextSteps.length > 0 && (
          <div className="mt-6">
            <p className="text-sm font-medium text-slate-700 mb-2">下一步操作：</p>
            <ul className="space-y-2">
              {step.nextSteps.map((ns, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm text-slate-600">
                  <span className="text-cyan-500 mt-1">→</span>
                  <span>{ns}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* 步骤导航按钮 */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
          disabled={currentStep === 0}
        >
          上一步
        </Button>
        {currentStep < flow.steps.length - 1 ? (
          <Button onClick={() => setCurrentStep(currentStep + 1)}>
            下一步
          </Button>
        ) : (
          <div className="flex items-center gap-2">
            {relatedArticle && (
              <Link href={`/article/${relatedArticle.slug}`}>
                <Button variant="outline">
                  深入学习：{relatedArticle.title}
                </Button>
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export function TroubleshootPage() {
  const [selectedFlowId, setSelectedFlowId] = useState<string | null>(null);
  const selectedFlow = DIAGNOSTIC_FLOWS.find(f => f.id === selectedFlowId);

  return (
    <div className="space-y-6">
      {/* EOL 提示 */}
      <ROS1EOLNotice />

      {/* 页面标题 */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">错误排查</h1>
        <p className="text-slate-600 mt-1">按诊断流程排查 ROS1 常见问题</p>
      </div>

      {/* 诊断入口 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 左侧：问题选择 */}
        <div className="lg:col-span-1">
          <SymptomSelector
            symptoms={DIAGNOSTIC_FLOWS}
            selectedId={selectedFlowId}
            onSelect={setSelectedFlowId}
          />
        </div>

        {/* 右侧：诊断步骤 */}
        <div className="lg:col-span-2">
          {selectedFlow ? (
            <DiagnosticSteps flow={selectedFlow} />
          ) : (
            <div className="bg-slate-50 rounded-xl p-8 text-center">
              <div className="text-4xl mb-4">🔧</div>
              <h3 className="text-lg font-medium text-slate-900 mb-2">选择一个问题开始诊断</h3>
              <p className="text-sm text-slate-500">
                从左侧选择你遇到的问题，我们将引导你逐步排查
              </p>
            </div>
          )}
        </div>
      </div>

      {/* 快速命令参考 */}
      <div className="bg-slate-50 rounded-xl p-6">
        <h2 className="text-lg font-semibold text-slate-900 mb-4">快速检查命令</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-white rounded-lg p-4 border border-slate-200">
            <code className="text-sm text-slate-700">roscore</code>
            <p className="text-xs text-slate-500 mt-1">启动 ROS Master</p>
          </div>
          <div className="bg-white rounded-lg p-4 border border-slate-200">
            <code className="text-sm text-slate-700">rostopic list</code>
            <p className="text-xs text-slate-500 mt-1">列出所有话题</p>
          </div>
          <div className="bg-white rounded-lg p-4 border border-slate-200">
            <code className="text-sm text-slate-700">rosnode list</code>
            <p className="text-xs text-slate-500 mt-1">列出所有节点</p>
          </div>
          <div className="bg-white rounded-lg p-4 border border-slate-200">
            <code className="text-sm text-slate-700">rospack find &lt;package&gt;</code>
            <p className="text-xs text-slate-500 mt-1">查找包路径</p>
          </div>
          <div className="bg-white rounded-lg p-4 border border-slate-200">
            <code className="text-sm text-slate-700">roswtf</code>
            <p className="text-xs text-slate-500 mt-1">运行系统诊断</p>
          </div>
          <div className="bg-white rounded-lg p-4 border border-slate-200">
            <code className="text-sm text-slate-700">catkin_make -j1</code>
            <p className="text-xs text-slate-500 mt-1">单线程编译（便于定位错误）</p>
          </div>
        </div>
      </div>

      {/* 注意事项 */}
      <Callout type="warning" title="排查注意事项">
        <ul className="text-sm space-y-1">
          <li>• 每次只修改一个地方，避免引入新问题</li>
          <li>• 记录修改内容和结果，便于回溯</li>
          <li>• 使用 Git 保存工作进度，方便恢复</li>
          <li>• 仔细阅读错误信息，不要跳过</li>
        </ul>
      </Callout>
    </div>
  );
}