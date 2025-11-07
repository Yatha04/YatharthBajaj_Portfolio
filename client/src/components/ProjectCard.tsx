import React from 'react';
import { Project } from '../data/projects';

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ 
  project
}) => {
  const description = project.description.join(' ');
  const CardContent = (
    <>
      <div className="absolute inset-0 bg-gradient-to-r from-[#F2F2F2] to-[#D9D9D9] dark:from-gray-800 dark:to-gray-700 opacity-0 group-hover:opacity-50 transition-opacity duration-150 ease-in-out rounded-lg backdrop-blur-md"></div>
      <div className="absolute top-0 left-0 w-32 h-32 bg-green-400/10 dark:bg-green-400/5 rounded-lg blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out"></div>
      <div className="relative flex flex-col items-start justify-start gap-1 w-full">
        <h2 className="font-bold text-accent-foreground text-base">{project.title}</h2>
        {project.date && (
          <p className="font-medium text-muted-foreground text-sm">{project.date}</p>
        )}
        <p className="font-medium text-muted-foreground text-sm leading-relaxed">{description}</p>
      </div>
    </>
  );

  if (project.github) {
    return (
      <a
        href={project.github}
        target="_blank"
        rel="noopener noreferrer"
        className="block relative w-full rounded-lg p-4 transition-all duration-150 ease-in-out group z-50 backdrop-blur-md bg-card/50 dark:bg-card/30 border border-border/50 hover:border-border"
      >
        {CardContent}
      </a>
    );
  }

  return (
    <div className="block relative w-full rounded-lg p-4 transition-all duration-150 ease-in-out group z-50 backdrop-blur-md bg-card/50 dark:bg-card/30 border border-border/50">
      {CardContent}
    </div>
  );
}; 