import { useState } from 'react';
import { useDarkMode } from '../context/DarkModeContext';
import { experiences } from '../data/experiences';
import { ExternalLink, MapPin, Calendar, ChevronDown, ChevronUp } from 'lucide-react';

export const Experience = () => {
  const { isDarkMode } = useDarkMode();
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);
  const [activeExperienceId, setActiveExperienceId] = useState<string | null>(null);

  const toggleCard = (id: string) => {
    setExpandedCard(expandedCard === id ? null : id);
  };

  const toggleShowAll = () => {
    setShowAll(!showAll);
  };

  const displayedExperiences = showAll ? experiences : experiences.slice(0, 2);

  const getLocationTypeColor = (type: string) => {
    switch (type) {
      case 'On Site':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'Remote':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'Hybrid':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
    }
  };

  return (
    <div className="min-h-screen py-12 px-4 relative z-10">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Experience
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            My professional journey and achievements
          </p>
        </div>

        {/* Experience Timeline */}
        <div className="relative">
          {/* Animated Experience List */}
          <div
            className={`relative transition-all duration-500 ease-in-out ${
              showAll ? 'max-h-[2000px] opacity-100' : 'max-h-[600px] opacity-90'
            }`}
          >
            {/* Timeline Line (now inside the animated list) */}
            <div className="absolute left-2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 to-purple-600"></div>
            {displayedExperiences.map((experience) => (
              <div
                key={experience.id}
                className="relative mb-4 group"
                onMouseEnter={() => setActiveExperienceId(experience.id)}
                onMouseLeave={() => setActiveExperienceId(null)}
              >
                {/* Timeline Dot */}
                <div className={`absolute left-2 w-2.5 h-2.5 rounded-full border-2 transition-all duration-300 ${
                  activeExperienceId === experience.id
                    ? 'bg-blue-400 border-blue-400 shadow-lg shadow-blue-400/60 scale-110'
                    : experience.isHighlighted
                      ? 'bg-blue-500 border-blue-500 shadow-lg shadow-blue-500/50 group-hover:shadow-blue-500/70 group-hover:scale-110'
                      : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 group-hover:border-gray-400 dark:group-hover:border-gray-500 group-hover:scale-110'
                } transform -translate-x-1 z-10`}></div>
                
                {/* Experience Card */}
                <div className={`ml-8 p-3 rounded-md border-2 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:z-10 relative ${
                  experience.isHighlighted
                    ? 'border-blue-500 shadow-lg shadow-blue-500/20 hover:border-blue-400 hover:shadow-blue-500/30'
                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                } ${
                  isDarkMode 
                    ? 'bg-gray-800/50 text-white hover:bg-gray-800/70' 
                    : 'bg-white/80 text-gray-900 hover:bg-white/90'
                } backdrop-blur-sm hover:backdrop-blur-md`}>
                
                  <div className="flex items-start gap-2">
                    {/* Company Logo Placeholder */}
                    <div className={`w-10 h-10 rounded-md flex items-center justify-center text-white font-bold text-xs ${
                      experience.isHighlighted
                        ? 'bg-gradient-to-br from-blue-500 to-purple-600'
                        : 'bg-gradient-to-br from-gray-500 to-gray-600'
                    }`}>
                      {experience.company.split(' ').map(word => word[0]).join('').slice(0, 2)}
                    </div>
                    
                    <div className="flex-1">
                      {/* Header */}
                      <div className="flex items-start justify-between mb-1.5">
                        <div>
                          <div className="flex items-center gap-1.5 mb-1">
                            <h4 className="text-base font-semibold transition-colors duration-300 group-hover:text-blue-600 dark:group-hover:text-blue-400">{experience.company}</h4>
                            {experience.externalLink && (
                              <a 
                                href={experience.externalLink} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
                              >
                                <ExternalLink className="w-2.5 h-2.5" />
                              </a>
                            )}
                          </div>
                          <h5 className="text-sm text-gray-700 dark:text-gray-300 mb-1">
                            {experience.role}
                          </h5>
                        </div>
                        
                        {/* Location Badge */}
                        <span className={`px-1.5 py-0.5 rounded-full text-xs font-medium ${getLocationTypeColor(experience.locationType)}`}>
                          {experience.locationType}
                        </span>
                      </div>
                      
                      {/* Details */}
                      <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400 mb-1.5">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-2.5 h-2.5" />
                          {experience.location}
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-2.5 h-2.5" />
                          {experience.duration}
                        </div>
                      </div>
                      
                      {/* Description */}
                      <p className="text-xs text-gray-700 dark:text-gray-300 mb-2">
                        {experience.description}
                      </p>
                      
                      {/* Tags */}
                      <div className="flex flex-wrap gap-1 mb-2">
                        {experience.tags.map((tag, tagIndex) => (
                          <span 
                            key={tagIndex}
                            className={`px-1.5 py-0.5 rounded-full text-xs font-medium ${
                              isDarkMode 
                                ? 'bg-gray-700 text-gray-300' 
                                : 'bg-gray-100 text-gray-700'
                            }`}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      
                      {/* Expandable Achievements */}
                      <div>
                        <button
                          onClick={() => toggleCard(experience.id)}
                          className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-xs font-medium transition-colors"
                        >
                          {expandedCard === experience.id ? 'Show less' : 'Show achievements'}
                        </button>
                        
                        {expandedCard === experience.id && (
                          <div className="mt-2 space-y-1">
                            {experience.achievements.map((achievement, achievementIndex) => (
                              <div 
                                key={achievementIndex}
                                className={`p-1.5 rounded text-xs ${
                                  isDarkMode 
                                    ? 'bg-gray-700/50 text-gray-300' 
                                    : 'bg-gray-50 text-gray-700'
                                }`}
                              >
                                <span className="text-blue-600 dark:text-blue-400 mr-1.5">•</span>
                                {achievement}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* View More Button */}
          {!showAll && experiences.length > 2 && (
            <div className="relative mt-6">
              {/* Removed timeline dot here */}
              <div className="ml-8 flex justify-center">
                <button
                  onClick={toggleShowAll}
                  className={`px-4 py-2 rounded-md border-2 transition-all duration-300 hover:shadow-lg flex items-center gap-2 ${
                    isDarkMode 
                      ? 'bg-gray-800/50 border-gray-700 text-white hover:bg-gray-700/50' 
                      : 'bg-white/80 border-gray-200 text-gray-900 hover:bg-gray-50/80'
                  } backdrop-blur-sm`}
                >
                  <span className="text-sm font-medium">View More Experiences</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
          
          {/* View Less Button */}
          {showAll && experiences.length > 2 && (
            <div className="relative mt-6">
              {/* Removed timeline dot here */}
              <div className="ml-8 flex justify-center">
                <button
                  onClick={toggleShowAll}
                  className={`px-4 py-2 rounded-md border-2 transition-all duration-300 hover:shadow-lg flex items-center gap-2 ${
                    isDarkMode 
                      ? 'bg-gray-800/50 border-gray-700 text-white hover:bg-gray-700/50' 
                      : 'bg-white/80 border-gray-200 text-gray-900 hover:bg-gray-50/80'
                  } backdrop-blur-sm`}
                >
                  <span className="text-sm font-medium">View Less</span>
                  <ChevronUp className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}; 