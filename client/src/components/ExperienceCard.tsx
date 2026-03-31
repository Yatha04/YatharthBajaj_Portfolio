import { ChevronRight } from 'lucide-react'
import { Experience } from '../data/experiences'
import { usePretextHeight } from '../hooks/usePretextHeight'

interface ExperienceCardProps {
  experience: Experience
  isExpanded: boolean
  onToggle: () => void
}

export const ExperienceCard = ({
  experience,
  isExpanded,
  onToggle,
}: ExperienceCardProps) => {
  const { panelRef, contentRef, height } = usePretextHeight(
    experience.achievements,
    experience.tags.length
  )

  const panelId = `panel-${experience.id}`

  return (
    <div 
      className="relative w-full rounded-lg p-4 backdrop-blur-md bg-card/50 dark:bg-card/30 border border-border/50 cursor-pointer transition-colors hover:bg-card/60 dark:hover:bg-card/40"
      onClick={onToggle}
    >
      {/* Header — always visible */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-col gap-1 min-w-0">
          <h3 className="font-bold text-accent-foreground text-base">
            {experience.role} @ {experience.company}
          </h3>
          <p className="font-medium text-muted-foreground text-sm">
            {experience.duration}
          </p>
        </div>
        <button
          aria-expanded={isExpanded}
          aria-controls={panelId}
          aria-label={isExpanded ? 'Collapse details' : 'Expand details'}
          className="p-1.5 rounded-md hover:bg-accent/50 transition-colors shrink-0 mt-0.5 focus-visible:outline-2 focus-visible:outline-ring"
        >
          <ChevronRight
            className={`w-4 h-4 text-muted-foreground transition-transform duration-[180ms] ease-in-out motion-reduce:duration-0 ${isExpanded ? 'rotate-90' : ''}`}
          />
        </button>
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
            {experience.achievements.map((item, i) => (
              <li key={i} className="text-accent-foreground text-sm font-medium">
                {item}
              </li>
            ))}
          </ul>
          {experience.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-3">
              {experience.tags.map((tag) => (
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
