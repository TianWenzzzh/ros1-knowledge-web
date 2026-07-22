import { Metadata } from 'next';
import { SiteLayout } from '@/components/site-layout';
import { HomePage } from '@/components/home-page';

export const metadata: Metadata = {
  title: 'ROS1 知识库 - 面向学生的 ROS1 在线学习资料',
  description: '从 Linux 基础到导航系统，循序渐进掌握 ROS1 机器人开发',
};

export default function Page() {
  return (
    <SiteLayout>
      <HomePage />
    </SiteLayout>
  );
}