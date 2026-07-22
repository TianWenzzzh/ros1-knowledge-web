import type { Metadata } from 'next';
import './globals.css';
import { SiteLayout } from '@/components/site-layout';
import { UserProvider } from '@/lib/user-context';

export const metadata: Metadata = {
  title: {
    default: 'ROS1 知识库',
    template: '%s | ROS1 知识库',
  },
  description: '面向学生的机器人操作系统学习平台，从入门到实践的一站式知识导航',
  keywords: [
    'ROS1',
    'ROS',
    '机器人',
    'ROS教程',
    '机器人编程',
    'Noetic',
    'Melodic',
    'Ubuntu',
    'Linux',
    'SLAM',
    '导航',
    'MoveIt',
  ],
  authors: [{ name: 'ROS1 知识库' }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className="antialiased min-h-screen">
        <UserProvider>
          <SiteLayout>{children}</SiteLayout>
        </UserProvider>
      </body>
    </html>
  );
}