import React from 'react';
import { Project } from '../data/projects';

interface ProjectCardProps {
  project: Project;
  status?: 'ongoing' | 'completed' | 'planned';
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ 
  project, 
  status = 'ongoing' 
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ongoing':
        return 'bg-blue-500';
      case 'completed':
        return 'bg-green-500';
      case 'planned':
        return 'bg-yellow-500';
      default:
        return 'bg-blue-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'ongoing':
        return 'Ongoing';
      case 'completed':
        return 'Completed';
      case 'planned':
        return 'Planned';
      default:
        return 'Ongoing';
    }
  };

  return (
    <div className="bg-white dark:bg-[#1A1A1A] rounded-lg border border-gray-200 dark:border-gray-800 shadow-lg p-4 hover:shadow-xl hover:scale-105 transition-all duration-300 min-h-[350px] flex flex-col group">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="relative">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              {project.title}
            </h3>
            <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-400 group-hover:w-full transition-all duration-300 ease-out"></div>
          </div>
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
              title="External Link"
            >
              <svg 
                className="w-4 h-4" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" 
                />
              </svg>
            </a>
          )}
        </div>
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${getStatusColor(status)}`}></div>
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {getStatusText(status)}
          </span>
        </div>
      </div>

      {/* Description */}
      <div className="mb-6 flex-grow">
        <ul className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed space-y-1">
          {project.description.map((line, index) => (
            <li key={index} className="flex items-start">
              <span className="text-blue-500 dark:text-blue-400 mr-2 mt-1.5">•</span>
              <span>{line}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Technology Tags */}
      <div className="flex flex-wrap gap-2">
        {project.tech.slice(0, 4).map((tech, idx) => (
          <span
            key={idx}
            className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-[#2C2C2C] text-gray-700 dark:text-white border border-gray-300 dark:border-gray-700"
          >
            {tech}
          </span>
        ))}
        {project.tech.length > 4 && (
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-[#2C2C2C] text-gray-500 dark:text-gray-400 border border-gray-300 dark:border-gray-700">
            +{project.tech.length - 4}
          </span>
        )}
      </div>


    </div>
  );
}; 