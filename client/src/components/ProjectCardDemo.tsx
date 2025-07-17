import { ProjectCard } from './ProjectCard';

// Sample project data that matches the SmartEssay card
const sampleProject = {
  id: 'smart-essay',
  title: 'SmartEssay',
  description: [
    'A minimalist Essay Practice App built for placement initiative. Real-time tracking, smart feedback, and gamified challenges to enhance logic, structure, and vocabulary while tracking progress.'
  ],
  tech: ['Next.js', 'TypeScript', 'TailwindCSS', 'OpenAI API'],
  github: 'https://github.com/example/smart-essay'
};

export const ProjectCardDemo = () => {
  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8 text-center">
          Project Card Demo
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ProjectCard project={sampleProject} status="ongoing" />
          <ProjectCard 
            project={{
              ...sampleProject,
              id: 'completed-project',
              title: 'Completed Project'
            }} 
            status="completed" 
          />
          <ProjectCard 
            project={{
              ...sampleProject,
              id: 'planned-project',
              title: 'Planned Project'
            }} 
            status="planned" 
          />
        </div>
      </div>
    </div>
  );
}; 