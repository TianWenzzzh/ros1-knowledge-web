import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';
import { UserProvider } from '@/lib/user-context';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: {
    default: 'ROS1 知识库',
    template: '%s - ROS1 知识库',
  },
  description: '面向学生的 ROS1 在线学习资料。从 Linux 基础到导航系统，循序渐进掌握机器人开发。',
  keywords: ['ROS1', 'ROS', '机器人', 'Robotics', '学习', '教程', 'Noetic'],
  authors: [{ name: 'ROS1 知识库' }],
  creator: 'ROS1 知识库',
  publisher: 'ROS1 知识库',
  metadataBase: new URL('https://ros1-knowledge.dev.coze.site'),
  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    siteName: 'ROS1 知识库',
    title: 'ROS1 知识库 - 面向学生的 ROS1 在线学习资料',
    description: '从 Linux 基础到导航系统，循序渐进掌握 ROS1 机器人开发',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ROS1 知识库',
    description: '面向学生的 ROS1 在线学习资料',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0891B2',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className={inter.variable}>
      <body className="min-h-screen bg-white antialiased">
        <Providers>
          <UserProvider>
            {children}
          </UserProvider>
        </Providers>
      </body>
    </html>
  );
}