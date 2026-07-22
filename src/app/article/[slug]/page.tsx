import { Metadata } from 'next';
import { SiteLayout } from '@/components/site-layout';
import { ArticlePage, ArticleTOC } from '@/components/article-page';

export const metadata: Metadata = {
  title: '文章详情 - ROS1 知识库',
  description: 'ROS1 学习文章详情页',
};

export default function ArticleDetailPage() {
  return (
    <SiteLayout rightSidebar={<ArticleTOC />}>
      <ArticlePage />
    </SiteLayout>
  );
}