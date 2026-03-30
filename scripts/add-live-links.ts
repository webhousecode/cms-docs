/**
 * Add live demo links to templates docs.
 * Run: npx tsx scripts/add-live-links.ts
 */
import { readFileSync, writeFileSync } from "fs";
import { join } from "path";

const DIR = join(__dirname, "..", "content", "docs");

function addLinks(slug: string) {
  const file = join(DIR, `${slug}.json`);
  const doc = JSON.parse(readFileSync(file, "utf-8"));
  let c = doc.data.content as string;

  // Add live demo links after each screenshot
  const replacements: [string, string][] = [
    [
      "![Next.js Boilerplate](/screenshots/boilerplate-nextjs-dark.png)",
      "![Next.js Boilerplate](/screenshots/boilerplate-nextjs-dark.png)\n\n[Live demo →](https://nextjs-boilerplate-1x3txthik-webhhouse.vercel.app/)"
    ],
    [
      "![Thinking in Pixels](/screenshots/example-blog.png)",
      "![Thinking in Pixels](/screenshots/example-blog.png)\n\n[Live demo →](https://thinking-in-pixels.fly.dev/)"
    ],
    [
      "![Freelancer](/screenshots/example-freelancer-ghpages.png)",
      "![Freelancer](/screenshots/example-freelancer-ghpages.png)\n\n[Live demo →](https://cbroberg.github.io/freelancer-site/)"
    ],
    [
      "![Studio](/screenshots/example-studio.png)",
      "![Studio](/screenshots/example-studio.png)\n\n[Live demo →](https://cbroberg.github.io/meridian-studio-site/)"
    ],
    [
      "![Boutique](/screenshots/example-boutique.png)",
      "![Boutique](/screenshots/example-boutique.png)\n\n[Live demo →](https://boutique.webhouse.app/)"
    ],
  ];

  for (const [from, to] of replacements) {
    c = c.replace(from, to);
  }

  doc.data.content = c;
  doc.updatedAt = new Date().toISOString();
  writeFileSync(file, JSON.stringify(doc, null, 2));
  console.log(`  ✓ ${slug}`);
}

addLinks("templates");
addLinks("templates-da");
console.log("\n✓ Live demo links added");
