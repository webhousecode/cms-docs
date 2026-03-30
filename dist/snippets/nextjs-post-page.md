# Next.js blog post page

*Updated: 2026-03-30*

// app/blog/[slug]/page.tsx
import { getCollection, getDocument } from '@/lib/content';
import { notFound } from 'next/navigation';

export function generateStaticParams() {
  return getCollection('posts').map(d => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: { params: Promise }) {
  const { slug } = await params;
  const doc = getDocument('posts', slug);
  if (!doc) return {};
  return {
    title: doc.data._seo?.metaTitle ?? doc.data.title,
    description: doc.data._seo?.metaDescription ?? doc.data.excerpt,
  };
}

export default async function PostPage({ params }: { params: Promise }) {
  const { slug } = await params;
  const doc = getDocument('posts', slug);
  if (!doc) notFound();

  return (
    
      {doc.data.title}
      {/* Render doc.data.content with react-markdown */}
    
  );
}