import { useMemo, useState } from 'react'
import { VizPanel } from './primitives'
import { COLORS } from './utils'

// Naive Bayes as everyone first meets it: a spam filter. Each word contributes
// an independent likelihood factor; multiply them all and normalize.

const WORDS = [
    { word: 'free', spam: 0.30, ham: 0.03 },
    { word: 'winner', spam: 0.18, ham: 0.01 },
    { word: '$$$', spam: 0.22, ham: 0.01 },
    { word: 'meeting', spam: 0.02, ham: 0.22 },
    { word: 'lunch', spam: 0.03, ham: 0.16 },
    { word: 'deadline', spam: 0.04, ham: 0.14 },
]

export function NaiveBayesViz() {
    const [selected, setSelected] = useState<Set<string>>(new Set(['free', 'winner']))

    const toggle = (w: string) =>
        setSelected((s) => {
            const next = new Set(s)
            if (next.has(w)) next.delete(w)
            else next.add(w)
            return next
        })

    const { pSpam, factors } = useMemo(() => {
        const active = WORDS.filter((w) => selected.has(w.word))
        let spamScore = 0.5
        let hamScore = 0.5
        for (const w of active) {
            spamScore *= w.spam
            hamScore *= w.ham
        }
        const total = spamScore + hamScore
        return {
            pSpam: total === 0 ? 0.5 : spamScore / total,
            factors: active,
        }
    }, [selected])

    const verdict = pSpam > 0.5 ? 'SPAM' : 'looks fine'

    return (
        <VizPanel
            title="Compose an email, watch the filter think"
            hint='"Naive" because it assumes the words are independent given the class — obviously false (does "free" appear independently of "$$$"?), yet the filter works embarrassingly well anyway.'
        >
            <div className="flex flex-wrap gap-2 mb-4">
                {WORDS.map((w) => (
                    <button
                        key={w.word}
                        onClick={() => toggle(w.word)}
                        className={`px-3 py-1.5 rounded-full text-xs font-mono border transition-all ${
                            selected.has(w.word)
                                ? 'bg-gray-900 text-white border-gray-900 dark:bg-white dark:text-gray-900 dark:border-white scale-105'
                                : 'text-gray-600 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:border-gray-500'
                        }`}
                    >
                        {w.word}
                    </button>
                ))}
            </div>

            {factors.length > 0 ? (
                <div className="space-y-1.5 mb-4">
                    {factors.map((f) => (
                        <div key={f.word} className="flex items-center gap-2 text-xs font-mono">
                            <span className="w-20 truncate text-gray-600 dark:text-gray-300">{f.word}</span>
                            <div className="flex-1 flex items-center gap-1">
                                <div className="h-2.5 rounded-sm" style={{ width: `${f.spam * 160}px`, backgroundColor: COLORS.rose }} />
                                <span className="text-gray-400 text-[10px]">{f.spam.toFixed(2)}</span>
                            </div>
                            <div className="flex-1 flex items-center gap-1">
                                <div className="h-2.5 rounded-sm" style={{ width: `${f.ham * 160}px`, backgroundColor: COLORS.emerald }} />
                                <span className="text-gray-400 text-[10px]">{f.ham.toFixed(2)}</span>
                            </div>
                        </div>
                    ))}
                    <div className="flex items-center gap-2 text-[10px] uppercase tracking-wide text-gray-400 pt-1">
                        <span className="w-20">P(word | class)</span>
                        <span className="flex-1" style={{ color: COLORS.rose }}>spam</span>
                        <span className="flex-1" style={{ color: COLORS.emerald }}>ham</span>
                    </div>
                </div>
            ) : (
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-4 italic">
                    Select some words above to build an email.
                </p>
            )}

            <div className="rounded-lg overflow-hidden h-8 flex w-full border border-border/40">
                <div
                    className="flex items-center justify-start pl-2 text-[11px] font-semibold text-white transition-all duration-500"
                    style={{ width: `${pSpam * 100}%`, backgroundColor: COLORS.rose, minWidth: pSpam > 0.08 ? undefined : 0 }}
                >
                    {pSpam > 0.15 && `spam ${(pSpam * 100).toFixed(0)}%`}
                </div>
                <div
                    className="flex items-center justify-end pr-2 text-[11px] font-semibold text-white transition-all duration-500 flex-1"
                    style={{ backgroundColor: COLORS.emerald }}
                >
                    {pSpam < 0.85 && `ham ${((1 - pSpam) * 100).toFixed(0)}%`}
                </div>
            </div>
            <div className="mt-2 text-sm font-semibold text-gray-900 dark:text-white">
                verdict: {verdict} {pSpam > 0.5 ? '🚫' : '📬'}
            </div>
        </VizPanel>
    )
}
