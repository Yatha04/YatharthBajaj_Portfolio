import { projects } from '../data/projects';
import { ExternalLink, Github } from 'lucide-react';

export const ProjectCarousel = () => {
  return (
    <div className="py-16 px-4 bg-transparent">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Projects</h2>
          <p className="text-base text-gray-600 dark:text-gray-300">A selection of things I’ve built and shipped</p>
        </div>
        <div className="overflow-x-auto scrollbar-hide">
          <div className="flex gap-6 md:gap-8 lg:gap-10 snap-x snap-mandatory">
            {projects.map((project) => (
              <div
                key={project.id}
                className="min-w-[320px] max-w-xs flex-shrink-0 bg-white/80 dark:bg-gray-900/80 rounded-xl border-2 border-gray-200 dark:border-gray-700 shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105 snap-center relative group"
              >
                {/* Placeholder image/icon */}
                <div className="h-32 flex items-center justify-center rounded-t-xl bg-gradient-to-br from-blue-500/10 to-purple-500/10">
                  <span className="text-5xl text-gray-400 dark:text-gray-600">📦</span>
                </div>
                <div className="p-5 flex flex-col h-full">
                  <h3 className="text-xl font-semibold text-blue-700 dark:text-blue-400 mb-1 group-hover:underline">
                    {project.title}
                  </h3>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mb-3 flex-1">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-3 mt-auto">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors"
                        title="GitHub"
                      >
                        <Github className="w-5 h-5" />
                      </a>
                    )}
                    {project.demo && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
                        title="Live Demo"
                      >
                        <ExternalLink className="w-5 h-5" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}; 