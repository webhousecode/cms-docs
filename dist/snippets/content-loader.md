# Content loader functions

*Updated: 2026-03-30*

import { readFileSync, readdirSync, existsSync } from 'fs';
import { join } from 'path';

const CONTENT = join(process.cwd(), 'content');

export function getCollection(name: string) {
  const dir = join(CONTENT, name);
  if (!existsSync(dir)) return [];
  return readdirSync(dir)
    .filter(f => f.endsWith('.json'))
    .map(f => JSON.parse(readFileSync(join(dir, f), 'utf-8')))
    .filter(d => d.status === 'published');
}

export function getDocument(collection: string, slug: string) {
  const file = join(CONTENT, collection, `${slug}.json`);
  if (!existsSync(file)) return null;
  return JSON.parse(readFileSync(file, 'utf-8'));
}