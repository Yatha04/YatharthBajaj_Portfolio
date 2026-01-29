export interface Video {
  id: string;
  title: string;
  youtubeUrl: string;
  description: string;
  category: 'vlog' | 'side-project' | 'other';
  date?: string;
}

export const videos: Video[] = [
  {
    id: 'placeholder-1',
    title: 'Coming Soon',
    youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    description: 'More videos coming soon!',
    category: 'vlog',
    date: '2025'
  }
];

