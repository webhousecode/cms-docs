# Next.js blog listing page

*Updated: 2026-03-30*

// app/blog/page.tsx
import { getCollection } from '@/lib/content';

export default function BlogPage() {
  const posts = getCollection('posts')
    .sort((a, b) => (b.data.date ?? '').localeCompare(a.data.date ?? ''));

  return (
    
      Blog
      {posts.map(post => (
        
          {post.data.title}
          {post.data.excerpt}
        
      ))}
    
  );
}