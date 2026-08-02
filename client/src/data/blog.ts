import { parseFrontmatter } from '../lib/parseFrontmatter';

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

// Pages with their own custom route/component, listed alongside markdown posts.
const customEntries: BlogEntry[] = [
  {
    id: 'how-machines-learn',
    title: 'How Machines Learn: an interactive field guide',
    date: 'June 10, 2026',
    description:
      'The story of ML from the perceptron to AlexNet — thirteen algorithms, each with interactive visualizations you can poke at.',
    body: '',
  },
];

const markdownEntries: BlogEntry[] = Object.entries(modules)
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
  });

export const blogEntries: BlogEntry[] = [...customEntries, ...markdownEntries].sort(
  (a, b) => {
    const da = new Date(a.date).getTime();
    const db = new Date(b.date).getTime();
    return (isNaN(db) ? 0 : db) - (isNaN(da) ? 0 : da);
  },
);
