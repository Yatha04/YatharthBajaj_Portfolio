import { Link } from 'react-router-dom'
import type { BlogEntry } from '../data/blog'

interface BlogEntryCardProps {
    entry: BlogEntry
}

export const BlogEntryCard = ({ entry }: BlogEntryCardProps) => {
    const titleClasses = "text-lg font-medium text-gray-900 dark:text-white underline underline-offset-4 decoration-gray-400 dark:decoration-gray-500 hover:decoration-gray-900 dark:hover:decoration-white transition-colors"

    return (
        <div className="w-full rounded-lg p-5 bg-white/5 dark:bg-white/5 border border-border/30">
            <div className="text-xs uppercase tracking-wide text-muted-foreground">
                {entry.date}
            </div>
            {entry.link ? (
                <a
                    href={entry.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${titleClasses} mt-1 inline-block`}
                >
                    {entry.title}
                </a>
            ) : (
                <Link to={`/blog/${entry.id}`} className={`${titleClasses} mt-1 inline-block`}>
                    {entry.title}
                </Link>
            )}
            {entry.description && (
                <p className="mt-2 text-sm text-muted-foreground">
                    {entry.description}
                </p>
            )}
        </div>
    )
}
