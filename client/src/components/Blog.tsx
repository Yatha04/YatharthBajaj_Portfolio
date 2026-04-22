import { Home } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { Button } from './ui/button'
import { blogEntries } from '../data/blog'
import { AnimatedBackground } from './AnimatedBackground'
import { BlogEntryCard } from './BlogEntryCard'

export function Blog() {
    const navigate = useNavigate()

    return (
        <div className="min-h-screen pb-32">
            <AnimatedBackground />

            <div className="relative z-10 max-w-2xl mx-auto px-6 pt-24">
                <div className="text-center mb-14">
                    <h1
                        className="text-6xl md:text-7xl font-bold italic text-gray-900 dark:text-white leading-none"
                        style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                        Blogs
                    </h1>
                    <p
                        className="mt-4 text-sm md:text-base text-gray-500 dark:text-gray-400 tracking-wide"
                        style={{ fontFamily: "'Special Elite', monospace" }}
                    >
                        notes from a work in progress.
                    </p>
                </div>

                {blogEntries.length === 0 ? (
                    <p className="text-gray-500 dark:text-gray-400 text-center">
                        Nothing here yet. Check back soon.
                    </p>
                ) : (
                    <ul className="space-y-4">
                        {blogEntries.map((entry) => (
                            <li key={entry.id}>
                                <BlogEntryCard entry={entry} />
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            <nav className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-100">
                <div className="flex items-center gap-2 p-2 bg-white/5 backdrop-blur-xl rounded-full shadow-2xl border border-white/20 shadow-black/5">
                    <Button
                        variant="default"
                        size="sm"
                        onClick={() => navigate('/')}
                        className="rounded-full h-10 px-4 flex items-center justify-center transition-all duration-200 space-x-2"
                        title="Home"
                    >
                        <Home className="w-5 h-5 mr-2" />
                        <span className="text-sm font-medium">Home</span>
                    </Button>
                </div>
            </nav>
        </div>
    )
}
