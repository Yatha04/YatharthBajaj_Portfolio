import { projects } from '../data/projects';

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
              <div
                key={project.id}
                className="bg-white/80 dark:bg-gray-900/80 rounded-xl border border-gray-200 dark:border-gray-700 shadow-md hover:shadow-xl hover:bg-white/90 dark:hover:bg-gray-900/90 hover:scale-105 transition-all duration-300 p-6 flex flex-col justify-between min-h-[220px]"
              >
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <h3 className="text-xl font-semibold text-blue-700 dark:text-blue-400">
                      {project.title}
                    </h3>
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-1 text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors"
                        title="GitHub"
                      >
                        <svg className="w-5 h-5 inline" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.867 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.529 2.341 1.088 2.91.832.091-.646.35-1.088.636-1.339-2.221-.253-4.555-1.112-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.748-1.025 2.748-1.025.546 1.378.202 2.397.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.848-2.337 4.695-4.566 4.944.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.744 0 .267.18.577.688.48C19.135 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z" /></svg>
                      </a>
                    )}
                  </div>
                  <div className="text-gray-700 dark:text-gray-300 text-sm mb-4">
                    {project.description.slice(0, 2).map((line, idx) => (
                      <p key={idx} className="mb-2 leading-relaxed">
                        {line}
                      </p>
                    ))}
                    {project.description.length > 2 && (
                      <p className="text-gray-500 dark:text-gray-400 text-xs italic">
                        +{project.description.length - 2} more details...
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mt-auto">
                  {project.tech.slice(0, 4).map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-600"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.tech.length > 4 && (
                    <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-gray-600">
                      +{project.tech.length - 4}
                    </span>
                  )}
                </div>
              </div>
            )
          ))}
        </div>
      </div>
    </div>
  );
}; 