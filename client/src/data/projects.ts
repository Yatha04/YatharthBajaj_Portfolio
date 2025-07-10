export interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  image?: string;
  github?: string;
  demo?: string;
}

export const projects: Project[] = [
  {
    id: 'ai-portfolio',
    title: 'AI Portfolio Website',
    description: 'A personal portfolio built with React, featuring a modern timeline and interactive carousel.',
    tech: ['React', 'TypeScript', 'TailwindCSS'],
    github: 'https://github.com/yourusername/ai-portfolio',
    demo: 'https://yourportfolio.com',
  },
  {
    id: 'chatbot',
    title: 'Customer Support Chatbot',
    description: 'An AI-powered chatbot for automating customer support queries.',
    tech: ['Python', 'FastAPI', 'OpenAI'],
    github: 'https://github.com/yourusername/chatbot',
  },
  {
    id: 'image-analyzer',
    title: 'Image Analyzer',
    description: 'A web app for analyzing and tagging images using machine learning.',
    tech: ['Next.js', 'TensorFlow.js', 'Vercel'],
    demo: 'https://imageanalyzer.com',
  },
]; 