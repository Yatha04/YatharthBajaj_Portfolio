import { useCallback, useState } from 'react'
import { experiences } from '../data/experiences'
import { ExperienceCard } from './ExperienceCard'

export const Experience = () => {
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set())

  const handleToggle = useCallback((id: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }, [])

  return (
    <div className="py-10 md:py-16 px-4 bg-transparent">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-6 md:mb-10">
          <h2 className="text-2xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">Experiences</h2>
          <p className="text-sm md:text-base text-gray-600 dark:text-gray-300">What I've been up to!</p>
        </div>
        <div className="flex flex-col gap-4">
          {experiences.map((experience) => (
            <ExperienceCard
              key={experience.id}
              experience={experience}
              isExpanded={expandedIds.has(experience.id)}
              onToggle={() => handleToggle(experience.id)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
