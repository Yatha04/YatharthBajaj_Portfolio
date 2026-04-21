import { useState, useCallback } from 'react';
import { ProjectCard } from './ProjectCard';

// Sample project data that matches the SmartEssay card
const sampleProject = {
  id: 'smart-essay',
  title: 'SmartEssay',
  tagline: 'AI-powered essay practice app for placement prep',
  description: [
    'A minimalist Essay Practice App built for placement initiative. Real-time tracking, smart feedback, and gamified challenges to enhance logic, structure, and vocabulary while tracking progress.'
  ],
  tech: ['Next.js', 'TypeScript', 'TailwindCSS', 'OpenAI API'],
  github: 'https://github.com/example/smart-essay'
};

export const ProjectCardDemo = () => {
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set())

  const handleToggle = useCallback((id: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }, [])

  const projects = [
    sampleProject,
    { ...sampleProject, id: 'completed-project', title: 'Completed Project', tagline: 'A completed demo project' },
    { ...sampleProject, id: 'planned-project', title: 'Planned Project', tagline: 'A planned demo project' },
  ]

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8 text-center">
          Project Card Demo
        </h1>
        <div className="flex flex-col gap-4">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              isExpanded={expandedIds.has(project.id)}
              onToggle={() => handleToggle(project.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};