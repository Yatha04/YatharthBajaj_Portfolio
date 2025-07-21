import { projects } from '../data/projects';
import { ProjectCard } from './ProjectCard';

export const ProjectsGrid = () => {
  return (
    <div className="py-16 px-4 bg-transparent">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Projects</h2>
          <p className="text-base text-gray-600 dark:text-gray-300">A selection of things I've built and shipped</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            project.id === 'cooking-something-cool' ? (
              <div
                key={project.id}
                className="bg-white/80 dark:bg-gray-900/80 rounded-xl border border-gray-200 dark:border-gray-700 shadow-md hover:shadow-xl hover:bg-white/90 dark:hover:bg-gray-900/90 hover:scale-105 transition-all duration-300 p-6 flex items-center justify-center min-h-[220px] h-full text-center"
                style={{ minHeight: '220px' }}
              >
                <span className="w-full text-xl font-semibold text-gray-500 dark:text-gray-400 flex items-center justify-center h-full">
                  {project.title}<br />{project.description[0]}
                </span>
              </div>
            ) : (
              <ProjectCard 
                key={project.id}
                project={project}
                status={project.id === 'rash-driving-detection' ? 'ongoing' : 'completed'}
              />
            )
          ))}
        </div>
      </div>
    </div>
  );
}; 