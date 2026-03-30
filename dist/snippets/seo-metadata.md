# SEO metadata in Next.js

*Updated: 2026-03-30*

export async function generateMetadata({ params }) {
  const doc = getDocument('posts', (await params).slug);
  const seo = doc?.data._seo ?? {};
  return {
    title: seo.metaTitle ?? doc?.data.title,
    description: seo.metaDescription ?? doc?.data.excerpt,
    openGraph: {
      title: seo.metaTitle ?? doc?.data.title,
      description: seo.metaDescription,
      images: seo.ogImage ? [seo.ogImage] : [],
    },
  };
}