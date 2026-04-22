import { ArrowLeft, Home } from 'lucide-react'
import { useNavigate, useParams, Navigate } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Button } from './ui/button'
import { blogEntries } from '../data/blog'
import { AnimatedBackground } from './AnimatedBackground'

export function BlogPost() {
    const navigate = useNavigate()
    const { id } = useParams<{ id: string }>()
    const entry = blogEntries.find((e) => e.id === id)

    if (!entry) {
        return <Navigate to="/blog" replace />
    }

    return (
        <div className="min-h-screen pb-32">
            <AnimatedBackground />

            <div className="relative z-10 max-w-2xl mx-auto px-6 pt-24">
                <button
                    onClick={() => navigate('/blog')}
                    className="inline-flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors mb-12"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    All posts
                </button>

                <article className="space-y-6">
                    <div className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                        {entry.date}
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                        {entry.title}
                    </h1>
                    {entry.description && (
                        <p className="text-lg text-gray-600 dark:text-gray-400">
                            {entry.description}
                        </p>
                    )}
                    {entry.body && (
                        <div className="prose-blog pt-4 text-gray-700 dark:text-gray-300 leading-relaxed">
                            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                {entry.body}
                            </ReactMarkdown>
                        </div>
                    )}
                </article>
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
