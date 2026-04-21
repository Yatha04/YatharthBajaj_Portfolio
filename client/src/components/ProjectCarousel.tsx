import { useCallback, useState } from 'react'
import { projects } from '../data/projects'
import { ProjectCard } from './ProjectCard'

export const ProjectsGrid = () => {
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
          <h2 className="text-2xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">Projects</h2>
          <p className="text-sm md:text-base text-gray-600 dark:text-gray-300">A few projects I've been working on recently!</p>
        </div>
        <div className="flex flex-col gap-4">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              isExpanded={expandedIds.has(project.id)}
              onToggle={() => handleToggle(project.id)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}