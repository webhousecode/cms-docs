# Richtext Editor

*Updated: 2026-03-29*
*Language: en*

TipTap-based rich text editor with embedded media, callouts, tables, code blocks, and AI features.

## Overview

Every `richtext` field uses a built-in TipTap v3 editor with full media embedding, structured content nodes, and AI assistance.

## Embedded media types

| Node | Description |
|------|-------------|
| **Image** | Upload or paste. Supports resize handles and alignment. |
| **Video embed** | YouTube or Vimeo URL → responsive iframe. |
| **Audio embed** | Upload mp3/wav/ogg → inline `` player. |
| **File attachment** | Upload any file → download-link card. |
| **Callout** | Styled info/warning/tip/danger box with editable text. |
| **Table** | Structured data table with header row, context toolbar. |
| **Code block** | Fenced code block with syntax highlighting. |
| **Interactive embed** | Embed an Interactive from the Interactives manager. |

## Controlling available features

Use the `features` array to control which toolbar items are shown:

```typescript
// Full-featured (default — all tools available)
{ name: 'content', type: 'richtext' }

// Restricted — only basic formatting + images
{
  name: 'content',
  type: 'richtext',
  features: ['bold', 'italic', 'heading', 'link', 'image', 'bulletList', 'orderedList']
}

// Minimal — text only, no media
{
  name: 'bio',
  type: 'richtext',
  features: ['bold', 'italic', 'link']
}
```

## All available features

| Feature | Toolbar item | Shortcut |
|---------|-------------|----------|
| `bold` | Bold text | Cmd+B |
| `italic` | Italic text | Cmd+I |
| `underline` | Underline | Cmd+U |
| `strike` | Strikethrough | Cmd+Shift+S |
| `code` | Inline code | |
| `superscript` | Superscript (x²) | Cmd+. |
| `subscript` | Subscript (x₂) | Cmd+, |
| `heading` | Heading selector (H1-H3) | |
| `bulletList` | Bullet list | |
| `orderedList` | Numbered list | |
| `blockquote` | Blockquote | |
| `horizontalRule` | Horizontal line | |
| `textAlign` | Text alignment | |
| `highlight` | Highlight with color picker | |
| `link` | Hyperlink | Cmd+K |
| `table` | Data table | |
| `image` | Image upload/embed | |
| `video` | Video embed | |
| `audio` | Audio file upload | |
| `file` | File attachment | |
| `callout` | Info/warning/tip callout | |
| `interactive` | Interactive embed | |

## Markdown storage

Richtext fields store **markdown**. Standard formatting uses native markdown syntax. Features that markdown doesn't support use inline HTML:

| Feature | Stored as |
|---------|-----------|
| Underline | `text` |
| Superscript | `text` |
| Subscript | `text` |
| Highlight | `text` |
| Text alignment | `text` |
| Interactive embed | `!!INTERACTIVE[id|title|align:left]` |

## Rendering in Next.js

Use `react-markdown` with `remark-gfm`:

```typescript
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

function ArticleBody({ content }: { content: string }) {
  return (
    
      {content}
    
  );
}
```

> **Never use `dangerouslySetInnerHTML`** with a regex-based parser — it breaks images with sizing, tables, and embedded media.

## AI features

- **AI Proofread** — auto-detects language, checks spelling/grammar/style
- **AI Bubble Menu** — select text for rewrite options (shorter, longer, formal, casual, translate)
- **Zoom** — scale editor content 50%-200%