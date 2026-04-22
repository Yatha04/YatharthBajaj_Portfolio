export interface BlogEntry {
  id: string;
  title: string;
  date: string;
  description?: string;
  body: string;
  link?: string;
}

const modules = import.meta.glob('../content/blog/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

function parseFrontmatter(raw: string): { meta: Record<string, string>; body: string } {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) return { meta: {}, body: raw };
  const meta: Record<string, string> = {};
  for (const line of match[1].split(/\r?\n/)) {
    const i = line.indexOf(':');
    if (i === -1) continue;
    const key = line.slice(0, i).trim();
    let value = line.slice(i + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    meta[key] = value;
  }
  return { meta, body: match[2].trim() };
}

export const blogEntries: BlogEntry[] = Object.entries(modules)
  .map(([path, raw]) => {
    const slug = path.split('/').pop()!.replace(/\.md$/, '');
    const { meta, body } = parseFrontmatter(raw);
    return {
      id: slug,
      title: meta.title ?? slug,
      date: meta.date ?? '',
      description: meta.description || undefined,
      body,
      link: meta.link || undefined,
    };
  })
  .sort((a, b) => {
    const da = new Date(a.date).getTime();
    const db = new Date(b.date).getTime();
    return (isNaN(db) ? 0 : db) - (isNaN(da) ? 0 : da);
  });
