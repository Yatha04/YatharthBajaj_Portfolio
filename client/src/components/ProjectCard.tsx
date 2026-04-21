import { ChevronRight, ExternalLink } from 'lucide-react'
import { Project } from '../data/projects'
import { usePretextHeight } from '../hooks/usePretextHeight'

interface ProjectCardProps {
  project: Project
  isExpanded: boolean
  onToggle: () => void
}

export const ProjectCard = ({
  project,
  isExpanded,
  onToggle,
}: ProjectCardProps) => {
  const { panelRef, contentRef, height } = usePretextHeight(
    project.description,
    project.tech.length
  )

  const panelId = `panel-${project.id}`

  return (
    <div
      className="relative w-full rounded-lg p-4 backdrop-blur-md bg-card/50 dark:bg-card/30 border border-border/50 cursor-pointer transition-colors hover:bg-card/60 dark:hover:bg-card/40"
      onClick={onToggle}
    >
      {/* Header — always visible */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-col gap-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="font-bold text-accent-foreground text-base">
              {project.title}
            </h3>
            {project.date && (
              <p className="font-medium text-muted-foreground text-sm">
                {project.date}
              </p>
            )}
          </div>
          <p className="font-medium text-muted-foreground text-sm">
            {project.tagline}
          </p>
        </div>
        <div className="flex items-center gap-1 shrink-0 mt-0.5">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View ${project.title} on GitHub`}
              className="p-1.5 rounded-md hover:bg-accent/50 transition-colors focus-visible:outline-2 focus-visible:outline-ring"
              onClick={(e) => e.stopPropagation()}
            >
              <ExternalLink className="w-4 h-4 text-muted-foreground" />
            </a>
          )}
          <button
            aria-expanded={isExpanded}
            aria-controls={panelId}
            aria-label={isExpanded ? 'Collapse details' : 'Expand details'}
            className="p-1.5 rounded-md hover:bg-accent/50 transition-colors focus-visible:outline-2 focus-visible:outline-ring"
          >
            <ChevronRight
              className={`w-4 h-4 text-muted-foreground transition-transform duration-[180ms] ease-in-out motion-reduce:duration-0 ${isExpanded ? 'rotate-90' : ''}`}
            />
          </button>
        </div>
      </div>

      {/* Expandable panel */}
      <div
        id={panelId}
        role="region"
        ref={panelRef}
        style={{ height: isExpanded ? `${height}px` : '0px' }}
        className="overflow-clip transition-[height] duration-[180ms] ease-in-out motion-reduce:duration-0"
      >
        <div ref={contentRef} className="pt-3">
          <ul className="space-y-1.5 list-disc list-inside">
            {project.description.map((item, i) => (
              <li key={i} className="text-accent-foreground text-xs md:text-sm font-medium">
                {item}
              </li>
            ))}
          </ul>
          {project.tech.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-3">
              {project.tech.map((tag) => (
                <span
                  key={tag}
                  className="bg-secondary text-secondary-foreground text-xs rounded-full px-2.5 py-0.5"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}