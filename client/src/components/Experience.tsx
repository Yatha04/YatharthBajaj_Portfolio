import { experiences } from '../data/experiences';
import { ExperienceCard } from './ExperienceCard';

export const Experience = () => {
  return (
    <div className="py-16 px-4 bg-transparent">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Experience</h2>
          <p className="text-base text-gray-600 dark:text-gray-300">My professional journey and achievements</p>
        </div>
        <div className="flex flex-col gap-4">
          {experiences.map((experience) => (
            <ExperienceCard 
              key={experience.id}
              experience={experience}
            />
          ))}
        </div>
      </div>
    </div>
  );
}; 