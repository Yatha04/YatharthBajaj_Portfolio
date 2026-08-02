import type { ReactNode } from 'react'
import { ArrowLeft, Home } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Button } from './ui/button'
import { AnimatedBackground } from './AnimatedBackground'
import { prose } from '../content/howMachinesLearn'

import { PerceptronViz } from './hml/PerceptronViz'
import { AdalineViz } from './hml/AdalineViz'
import { BayesDecisionViz } from './hml/BayesDecisionViz'
import { BayesOptimalViz } from './hml/BayesOptimalViz'
import { NaiveBayesViz } from './hml/NaiveBayesViz'
import { KnnViz } from './hml/KnnViz'
import { PcaViz } from './hml/PcaViz'
import { SvmMarginViz, SvmKernelViz } from './hml/SvmViz'
import { HopfieldViz } from './hml/HopfieldViz'
import { UniversalApproxViz } from './hml/UniversalApproxViz'
import { BackpropFlowViz, XorTrainerViz } from './hml/BackpropViz'
import { NeocognitronViz } from './hml/NeocognitronViz'
import { CnnConvViz, CnnArchViz } from './hml/CnnViz'

interface Chapter {
    id: string
    proseKey: string
    year: string
    title: string
    who: string
    viz: ReactNode
}

interface Act {
    act: string
    chapters: Chapter[]
}

const ACTS: Act[] = [
    {
        act: 'Act I · The First Artificial Neurons',
        chapters: [
            {
                id: 'perceptron', proseKey: 'perceptron', year: '1958',
                title: 'The Perceptron', who: 'Frank Rosenblatt',
                viz: <PerceptronViz />,
            },
            {
                id: 'adaline', proseKey: 'adaline', year: '1960',
                title: 'ADALINE & the Delta Rule', who: 'Bernard Widrow & Ted Hoff',
                viz: <AdalineViz />,
            },
        ],
    },
    {
        act: 'Act II · Reasoning with Uncertainty',
        chapters: [
            {
                id: 'bayes-decision', proseKey: 'bayesDecision', year: '1763 →',
                title: 'Bayesian Decision Theory', who: 'Rev. Thomas Bayes & heirs',
                viz: <BayesDecisionViz />,
            },
            {
                id: 'bayes-optimal', proseKey: 'bayesOptimal', year: 'theory',
                title: 'The Bayes Optimal Classifier', who: 'the unbeatable benchmark',
                viz: <BayesOptimalViz />,
            },
            {
                id: 'naive-bayes', proseKey: 'naiveBayes', year: '1960s →',
                title: 'Naive Bayes', who: 'wrong assumption, right answers',
                viz: <NaiveBayesViz />,
            },
        ],
    },
    {
        act: 'Act III · Learning from Geometry',
        chapters: [
            {
                id: 'knn', proseKey: 'knn', year: '1951 / 1967',
                title: 'k-Nearest Neighbors', who: 'Fix & Hodges · Cover & Hart',
                viz: <KnnViz />,
            },
            {
                id: 'pca', proseKey: 'pca', year: '1901 / 1933',
                title: 'Principal Component Analysis', who: 'Karl Pearson · Harold Hotelling',
                viz: <PcaViz />,
            },
            {
                id: 'svm', proseKey: 'svm', year: '1992–95',
                title: 'Support Vector Machines', who: 'Vapnik, Boser, Guyon & Cortes',
                viz: (
                    <div className="space-y-6">
                        <SvmMarginViz />
                        <SvmKernelViz />
                    </div>
                ),
            },
        ],
    },
    {
        act: 'Act IV · The Return of the Network',
        chapters: [
            {
                id: 'hopfield', proseKey: 'hopfield', year: '1982',
                title: 'The Hopfield Network', who: 'John Hopfield',
                viz: <HopfieldViz />,
            },
            {
                id: 'universal-approximation', proseKey: 'universalApprox', year: '1989',
                title: 'The Universal Approximation Theorem', who: 'George Cybenko · Kurt Hornik',
                viz: <UniversalApproxViz />,
            },
            {
                id: 'backprop', proseKey: 'backprop', year: '1986',
                title: 'Backpropagation', who: 'Rumelhart, Hinton & Williams',
                viz: (
                    <div className="space-y-6">
                        <BackpropFlowViz />
                        <XorTrainerViz />
                    </div>
                ),
            },
            {
                id: 'neocognitron', proseKey: 'neocognitron', year: '1980',
                title: 'The Neocognitron', who: 'Kunihiko Fukushima',
                viz: <NeocognitronViz />,
            },
            {
                id: 'cnn', proseKey: 'cnn', year: '1998 / 2012',
                title: 'Convolutional Neural Networks', who: 'Yann LeCun → Krizhevsky, Sutskever & Hinton',
                viz: (
                    <div className="space-y-6">
                        <CnnConvViz />
                        <CnnArchViz />
                    </div>
                ),
            },
        ],
    },
]

const ALL_CHAPTERS = ACTS.flatMap((a) => a.chapters)

function Prose({ markdown }: { markdown: string }) {
    return (
        <div className="prose-blog text-gray-700 dark:text-gray-300 leading-relaxed">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdown}</ReactMarkdown>
        </div>
    )
}

function scrollToId(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export function HowMachinesLearn() {
    const navigate = useNavigate()
    let chapterNo = 0

    return (
        <div className="min-h-screen pb-36">
            <AnimatedBackground />

            <div className="relative z-10 max-w-3xl mx-auto px-6 pt-24">
                <button
                    onClick={() => navigate('/blog')}
                    className="inline-flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors mb-12"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    All posts
                </button>

                {/* hero */}
                <header className="text-center mb-12">
                    <p
                        className="text-xs uppercase tracking-[0.25em] text-gray-500 dark:text-gray-400 mb-4"
                        style={{ fontFamily: "'Special Elite', monospace" }}
                    >
                        a reading companion, with interactive figures
                    </p>
                    <h1
                        className="text-5xl md:text-6xl font-bold italic text-gray-900 dark:text-white leading-tight"
                        style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                        How Machines Learn
                    </h1>
                    <p className="mt-4 text-base text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
                        Thirteen ideas, sixty years — the story of machine learning from the
                        first artificial neuron to the networks that see.
                    </p>
                </header>

                {/* table of contents */}
                <nav className="mb-16 flex flex-wrap justify-center gap-2">
                    {ALL_CHAPTERS.map((c, i) => (
                        <button
                            key={c.id}
                            onClick={() => scrollToId(c.id)}
                            className="px-3 py-1 rounded-full text-xs border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:border-gray-900 dark:hover:border-white hover:text-gray-900 dark:hover:text-white transition-colors"
                        >
                            {i + 1}. {c.title}
                        </button>
                    ))}
                </nav>

                <section className="mb-16">
                    <Prose markdown={prose.intro} />
                </section>

                {ACTS.map((act) => (
                    <div key={act.act}>
                        {/* act divider */}
                        <div className="flex items-center gap-4 my-16">
                            <div className="h-px flex-1 bg-gray-300 dark:bg-white/15" />
                            <h2
                                className="text-sm md:text-base tracking-wide text-gray-500 dark:text-gray-400 whitespace-nowrap"
                                style={{ fontFamily: "'Special Elite', monospace" }}
                            >
                                {act.act}
                            </h2>
                            <div className="h-px flex-1 bg-gray-300 dark:bg-white/15" />
                        </div>

                        {act.chapters.map((c) => {
                            chapterNo += 1
                            return (
                                <article key={c.id} id={c.id} className="mb-20 scroll-mt-24">
                                    <div className="flex items-baseline gap-4 mb-1">
                                        <span
                                            className="text-5xl font-bold text-gray-200 dark:text-white/10 leading-none select-none"
                                            style={{ fontFamily: "'Playfair Display', serif" }}
                                        >
                                            {String(chapterNo).padStart(2, '0')}
                                        </span>
                                        <div>
                                            <div className="text-[11px] uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400">
                                                {c.year} · {c.who}
                                            </div>
                                            <h3
                                                className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white"
                                                style={{ fontFamily: "'Playfair Display', serif" }}
                                            >
                                                {c.title}
                                            </h3>
                                        </div>
                                    </div>

                                    <div className="mt-6 mb-8">
                                        <Prose markdown={prose[c.proseKey]} />
                                    </div>

                                    {c.viz}
                                </article>
                            )
                        })}
                    </div>
                ))}

                <div className="flex items-center gap-4 my-16">
                    <div className="h-px flex-1 bg-gray-300 dark:bg-white/15" />
                    <h2
                        className="text-sm tracking-wide text-gray-500 dark:text-gray-400"
                        style={{ fontFamily: "'Special Elite', monospace" }}
                    >
                        Epilogue
                    </h2>
                    <div className="h-px flex-1 bg-gray-300 dark:bg-white/15" />
                </div>
                <section className="mb-16">
                    <Prose markdown={prose.outro} />
                </section>
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
