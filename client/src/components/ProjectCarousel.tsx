import { projects } from '../data/projects';
import { ProjectCard } from './ProjectCard';

export const ProjectsGrid = () => {
  return (
    <div className="py-16 px-4 bg-transparent">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Projects</h2>
          <p className="text-base text-gray-600 dark:text-gray-300">A few projects I've been working on recently!</p>
        </div>
        <div className="flex flex-col gap-4">
          {projects.map((project) => (
            <ProjectCard 
              key={project.id}
              project={project}
            />
          ))}
        </div>
      </div>
    </div>
  );
}; 