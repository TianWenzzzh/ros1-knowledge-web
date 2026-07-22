import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { SiteLayout } from '@/components/site-layout';
import { ArticlePage } from '@/components/article-page';
import { getArticleBySlug, knowledgeArticles } from '@/lib/data';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  
  if (!article) {
    return {
      title: '文章未找到 - ROS1 知识库',
    };
  }
  
  return {
    title: `${article.title} - ROS1 知识库`,
    description: article.summary,
  };
}

export async function generateStaticParams() {
  return knowledgeArticles.map((article) => ({
    slug: article.slug,
  }));
}

export default async function ArticleDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  
  if (!article) {
    notFound();
  }
  
  return (
    <SiteLayout>
      <ArticlePage slug={slug} />
    </SiteLayout>
  );
}