import { Fragment, useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { VizPanel, VizButton } from './viz-ui'

// Palette — vivid enough to read on both light and dark backgrounds.
const COLORS = {
    blue: '#38bdf8',
    rose: '#fb7185',
    emerald: '#34d399',
    amber: '#fbbf24',
    violet: '#a78bfa',
    gray: '#9ca3af',
}

// An interactive miniature of LogixLens: pick a question a line operator might
// ask, and watch it travel through the pipeline — raw ladder logic → LogixLens
// indexes it → an LLM reasons over it → a plain-language answer. Flip LogixLens
// off and you're back to waiting for an engineer.

const PLC_CODE = [
    'RUNG 04   XIC I:0/0   XIC I:1/2   OTE O:2/0',
    'RUNG 05   XIC I:1/0   XIC I:0/0   OTE O:3/1',
    'RUNG 06   XIC I:2/7   OTL B3:0/2',
    'RUNG 07   XIO I:2/4   OTE O:5/2',
    'RUNG 08   XIC T4:0/DN  MOV  N7:0  N7:1',
]

interface QA {
    q: string
    rung: number // index of the relevant rung in PLC_CODE
    answer: string
    blocked: string
}

const QUESTIONS: QA[] = [
    {
        q: 'Why did Line 3 stop?',
        rung: 3,
        answer:
            'Line 3 stopped because the safety guard at Station 2 was opened — input I:2/4 went low, which drops the run-permit output O:5/2 (rung 07). Close the guard and press Start to resume.',
        blocked:
            "The reason is buried in ladder logic only a controls engineer can read. Page support and wait — that's typically 2–4 hours of downtime.",
    },
    {
        q: 'What does rung 5 do?',
        rung: 1,
        answer:
            'Rung 05 runs the conveyor motor (O:3/1), but only when the part-present sensor (I:1/0) is on AND the E-stop circuit (I:0/0) is healthy.',
        blocked:
            'You would have to decode the XIC / OTE ladder instructions by hand. Find an engineer to translate it for you.',
    },
    {
        q: 'Is the safety interlock latched?',
        rung: 2,
        answer:
            'Yes. The interlock bit B3:0/2 is latched (rung 06) because Guard Door 1 (I:2/7) was opened. It stays latched until someone closes the door and resets the fault.',
        blocked:
            "The interlock's state lives inside the PLC data table. Without PLC training there's no way to tell — wait for maintenance.",
    },
]

type Phase = 'idle' | 'scan' | 'index' | 'reason' | 'answer' | 'blocked'

const STAGES = [
    { label: 'Raw PLC code', color: COLORS.amber },
    { label: 'LogixLens indexes', color: COLORS.violet },
    { label: 'LLM reasons', color: COLORS.blue },
    { label: 'Plain answer', color: COLORS.emerald },
]
const PHASE_STAGE: Record<Phase, number> = {
    idle: -1, scan: 0, index: 1, reason: 2, answer: 3, blocked: 0,
}
const STATUS: Partial<Record<Phase, string>> = {
    scan: 'Scanning the PLC program…',
    index: 'Indexing the rungs so LogixLens can search them…',
    reason: 'The model is reasoning over the relevant logic…',
}

export function LogixLensViz() {
    const [lensOn, setLensOn] = useState(true)
    const [selected, setSelected] = useState<number | null>(null)
    const [phase, setPhase] = useState<Phase>('idle')
    const [typed, setTyped] = useState(0)
    const timers = useRef<number[]>([])

    // Drive the pipeline whenever the question or the toggle changes.
    useEffect(() => {
        timers.current.forEach(clearTimeout)
        timers.current = []
        setTyped(0)

        if (selected === null) {
            setPhase('idle')
            return
        }
        if (!lensOn) {
            setPhase('blocked')
            return
        }
        setPhase('scan')
        timers.current.push(window.setTimeout(() => setPhase('index'), 1300))
        timers.current.push(window.setTimeout(() => setPhase('reason'), 2200))
        timers.current.push(window.setTimeout(() => setPhase('answer'), 3100))

        return () => {
            timers.current.forEach(clearTimeout)
            timers.current = []
        }
    }, [selected, lensOn])

    const fullAnswer =
        selected === null ? '' : lensOn ? QUESTIONS[selected].answer : QUESTIONS[selected].blocked

    // Type the answer out once we reach the answer phase.
    useEffect(() => {
        if (phase !== 'answer') return
        let i = 0
        const id = window.setInterval(() => {
            i += 2
            setTyped(i)
            if (i >= fullAnswer.length) window.clearInterval(id)
        }, 16)
        return () => window.clearInterval(id)
    }, [phase, fullAnswer])

    const stageIdx = PHASE_STAGE[phase]
    const scanning = phase === 'scan' || phase === 'index'
    const indexed = phase === 'reason' || phase === 'answer'
    const activeRung = selected !== null ? QUESTIONS[selected].rung : -1

    const stageLit = (i: number) =>
        phase === 'blocked' ? i === 0 : lensOn && stageIdx >= i

    return (
        <VizPanel
            title="Try it: ask the factory floor a question"
            hint="This is LogixLens in miniature. Flip it off and the same cryptic ladder logic leaves you waiting on an engineer; flip it on and it answers in plain English. The real tool does this across thousands of rungs of real PLC code."
        >
            {/* pipeline strip */}
            <div className="flex items-center gap-1 mb-4 overflow-x-auto pb-1">
                {STAGES.map((s, i) => {
                    const lit = stageLit(i)
                    const color = phase === 'blocked' && i === 0 ? COLORS.rose : s.color
                    return (
                        <Fragment key={s.label}>
                            <div
                                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-[11px] font-medium whitespace-nowrap transition-colors duration-300"
                                style={{
                                    borderColor: lit ? color : 'rgba(148,163,184,0.3)',
                                    backgroundColor: lit ? `${color}22` : 'transparent',
                                    color: lit ? color : '#94a3b8',
                                }}
                            >
                                <span
                                    className="inline-block w-1.5 h-1.5 rounded-full"
                                    style={{ backgroundColor: lit ? color : '#94a3b8' }}
                                />
                                {s.label}
                            </div>
                            {i < STAGES.length - 1 && (
                                <span
                                    className="text-xs transition-colors duration-300"
                                    style={{ color: lensOn && stageIdx > i ? STAGES[i + 1].color : '#64748b' }}
                                >
                                    →
                                </span>
                            )}
                        </Fragment>
                    )
                })}
            </div>

            <div className="flex flex-col md:flex-row gap-4">
                {/* PLC code panel */}
                <div className="md:w-1/2">
                    <div className="text-[10px] uppercase tracking-wide text-gray-400 mb-1.5">
                        what the machine actually runs
                    </div>
                    <div className="relative overflow-hidden rounded-lg bg-slate-900 border border-slate-700 p-3 font-mono text-[10.5px] leading-relaxed">
                        {scanning && (
                            <motion.div
                                className="absolute left-0 right-0 h-7 pointer-events-none"
                                style={{
                                    background:
                                        'linear-gradient(to bottom, transparent, rgba(56,189,248,0.28), transparent)',
                                }}
                                initial={{ top: '-10%' }}
                                animate={{ top: ['-10%', '92%', '-10%'] }}
                                transition={{ duration: 1.1, repeat: Infinity, ease: 'linear' }}
                            />
                        )}
                        {PLC_CODE.map((line, i) => {
                            const highlight = indexed && i === activeRung
                            return (
                                <div
                                    key={i}
                                    className="px-1.5 py-0.5 rounded transition-colors duration-300"
                                    style={{
                                        backgroundColor: highlight ? 'rgba(52,211,153,0.18)' : 'transparent',
                                        color: highlight ? '#6ee7b7' : '#cbd5e1',
                                    }}
                                >
                                    {line}
                                    {highlight && <span className="text-emerald-400"> ← relevant</span>}
                                </div>
                            )
                        })}
                    </div>
                </div>

                {/* question + answer panel */}
                <div className="md:w-1/2 flex flex-col">
                    <div className="text-[10px] uppercase tracking-wide text-gray-400 mb-1.5">
                        ask as a line operator
                    </div>
                    <div className="flex flex-wrap gap-1.5 mb-3">
                        {QUESTIONS.map((item, i) => (
                            <button
                                key={i}
                                onClick={() => setSelected(i)}
                                className={`px-2.5 py-1.5 rounded-full text-[11px] border text-left transition-colors ${
                                    selected === i
                                        ? 'bg-gray-900 text-white border-gray-900 dark:bg-white dark:text-gray-900 dark:border-white'
                                        : 'text-gray-600 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:border-gray-500'
                                }`}
                            >
                                {item.q}
                            </button>
                        ))}
                    </div>

                    <div
                        className="flex-1 min-h-[110px] rounded-lg border p-3 text-xs leading-relaxed transition-colors"
                        style={{
                            borderColor:
                                phase === 'blocked'
                                    ? 'rgba(251,113,133,0.4)'
                                    : phase === 'answer'
                                    ? 'rgba(52,211,153,0.4)'
                                    : 'rgba(148,163,184,0.25)',
                            backgroundColor:
                                phase === 'blocked'
                                    ? 'rgba(251,113,133,0.06)'
                                    : phase === 'answer'
                                    ? 'rgba(52,211,153,0.06)'
                                    : 'transparent',
                        }}
                    >
                        {phase === 'idle' && (
                            <span className="text-gray-400 dark:text-gray-500 italic">
                                Pick a question above to ask the factory floor →
                            </span>
                        )}
                        {STATUS[phase] && (
                            <span className="text-gray-500 dark:text-gray-400 inline-flex items-center gap-1.5">
                                <motion.span
                                    className="inline-block w-2 h-2 rounded-full"
                                    style={{ backgroundColor: STAGES[Math.max(0, stageIdx)].color }}
                                    animate={{ opacity: [0.3, 1, 0.3] }}
                                    transition={{ duration: 0.9, repeat: Infinity }}
                                />
                                {STATUS[phase]}
                            </span>
                        )}
                        {phase === 'answer' && (
                            <span className="text-gray-700 dark:text-gray-200">
                                <span className="font-semibold text-emerald-500">LogixLens: </span>
                                {fullAnswer.slice(0, typed)}
                                {typed < fullAnswer.length && (
                                    <span className="inline-block w-1.5 h-3.5 -mb-0.5 bg-emerald-400 animate-pulse" />
                                )}
                            </span>
                        )}
                        {phase === 'blocked' && (
                            <span className="text-gray-700 dark:text-gray-200">
                                <span className="font-semibold text-rose-500">🔒 No LogixLens: </span>
                                {fullAnswer}
                            </span>
                        )}
                    </div>
                </div>
            </div>

            {/* controls */}
            <div className="mt-4 flex flex-wrap items-center gap-2">
                <span className="text-xs text-gray-500 dark:text-gray-400">LogixLens:</span>
                <VizButton onClick={() => setLensOn(true)} active={lensOn}>on</VizButton>
                <VizButton onClick={() => setLensOn(false)} active={!lensOn}>off</VizButton>
                {selected !== null && (
                    <button
                        onClick={() => setSelected(null)}
                        className="ml-auto text-xs text-gray-500 dark:text-gray-400 underline underline-offset-2 hover:text-gray-900 dark:hover:text-white"
                    >
                        reset
                    </button>
                )}
            </div>
        </VizPanel>
    )
}
