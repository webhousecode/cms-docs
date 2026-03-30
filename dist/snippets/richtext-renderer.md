# Richtext renderer

*Updated: 2026-03-30*

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

function ArticleBody({ content }: { content: string }) {
  return (
    
      {content}
    
  );
}