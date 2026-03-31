import { Navbar } from './Navbar'

export function Blog() {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-32">
            <Navbar />

            <div className="max-w-4xl mx-auto px-4 pt-32">
                <div className="text-center space-y-6">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
                        My Blog
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-400">
                        Coming soon! I'm currently working on adding my thoughts and projects here.
                    </p>
                </div>

                <div className="mt-16 grid gap-8 md:grid-cols-2">
                    {/* Placeholder Blog Post 1 */}
                    <article className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                            Future Post Title
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400 mb-4">
                            This is a placeholder for a future blog post. It will contain interesting thoughts, tutorials, or updates about my projects.
                        </p>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                            Expected soon...
                        </div>
                    </article>

                    {/* Placeholder Blog Post 2 */}
                    <article className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                            Another Future Post
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400 mb-4">
                            Stay tuned for more updates. I'll be sharing insights about my experiences and the things I learn along the way.
                        </p>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                            Expected soon...
                        </div>
                    </article>
                </div>
            </div>
        </div>
    )
}
