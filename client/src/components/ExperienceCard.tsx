import React from 'react';
import { Experience } from '../data/experiences';

interface ExperienceCardProps {
  experience: Experience;
}

export const ExperienceCard: React.FC<ExperienceCardProps> = ({ 
  experience
}) => {
  const CardContent = (
    <>
      <div className="absolute inset-0 bg-gradient-to-r from-[#F2F2F2] to-[#D9D9D9] dark:from-gray-800 dark:to-gray-700 opacity-0 group-hover:opacity-50 transition-opacity duration-150 ease-in-out rounded-lg backdrop-blur-md"></div>
      <div className="absolute top-0 left-0 w-32 h-32 bg-green-400/10 dark:bg-green-400/5 rounded-lg blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out"></div>
      <div className="relative flex flex-col items-start justify-start gap-2 w-full">
        <h2 className="font-bold text-accent-foreground text-base">{experience.role} @ {experience.company}</h2>
        <p className="font-medium text-muted-foreground text-sm">{experience.duration}</p>
        {experience.achievements.map((item, index) => (
          <p key={index} className="font-medium text-accent-foreground text-sm">{item}</p>
        ))}
      </div>
    </>
  );

  if (experience.externalLink) {
    return (
      <a
        href={experience.externalLink}
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

