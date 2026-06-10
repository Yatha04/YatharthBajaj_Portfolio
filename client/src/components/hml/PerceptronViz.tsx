import { useEffect, useMemo, useState } from 'react'
import { VizPanel, VizButton, LegendDot } from './primitives'
import { COLORS } from './utils'

// Two linearly separable clusters in the unit square (true boundary ≈ y = x).
const POS: Array<[number, number]> = [
    [0.62, 0.18], [0.72, 0.32], [0.8, 0.22], [0.68, 0.45], [0.85, 0.4],
    [0.75, 0.55], [0.9, 0.6], [0.6, 0.3], [0.82, 0.5], [0.7, 0.2],
]
const NEG: Array<[number, number]> = [
    [0.2, 0.55], [0.3, 0.7], [0.15, 0.8], [0.35, 0.85], [0.25, 0.62],
    [0.4, 0.75], [0.1, 0.65], [0.3, 0.9], [0.45, 0.88], [0.18, 0.72],
]
const DATA = [
    ...POS.map(([x, y]) => ({ x, y, label: 1 })),
    ...NEG.map(([x, y]) => ({ x, y, label: -1 })),
]

const LR = 0.4
type Weights = [number, number, number] // [w1, w2, bias]
const W0: Weights = [0, 1, -0.5]

const predict = (w: Weights, x: number, y: number) =>
    w[0] * x + w[1] * y + w[2] >= 0 ? 1 : -1

const PX = (x: number) => 20 + 320 * x
const PY = (y: number) => 250 - 240 * y

interface TrainState {
    w: Weights
    updates: number
    lastFixed: number | null
}
const INITIAL: TrainState = { w: W0, updates: 0, lastFixed: null }

// Pure updater (StrictMode-safe): fix the first misclassified point, if any.
const step = (s: TrainState): TrainState => {
    const idx = DATA.findIndex((p) => predict(s.w, p.x, p.y) !== p.label)
    if (idx === -1) return s
    const p = DATA[idx]
    return {
        w: [
            s.w[0] + LR * p.label * p.x,
            s.w[1] + LR * p.label * p.y,
            s.w[2] + LR * p.label,
        ],
        updates: s.updates + 1,
        lastFixed: idx,
    }
}

export function PerceptronViz() {
    const [state, setState] = useState<TrainState>(INITIAL)
    const [running, setRunning] = useState(false)
    const { w, updates, lastFixed } = state

    const misclassified = useMemo(
        () => DATA.filter((p) => predict(w, p.x, p.y) !== p.label).length,
        [w],
    )
    const converged = misclassified === 0

    useEffect(() => {
        if (!running || converged) return
        const id = setInterval(() => setState(step), 350)
        return () => clearInterval(id)
    }, [running, converged])

    // Decision boundary endpoints: w1·x + w2·y + b = 0, drawn across the plot.
    const boundary = useMemo(() => {
        const [w1, w2, b] = w
        if (Math.abs(w2) > Math.abs(w1)) {
            const yAt = (x: number) => -(w1 * x + b) / w2
            return { x1: PX(-0.5), y1: PY(yAt(-0.5)), x2: PX(1.5), y2: PY(yAt(1.5)) }
        }
        const xAt = (y: number) => -(w2 * y + b) / w1
        return { x1: PX(xAt(-0.5)), y1: PY(-0.5), x2: PX(xAt(1.5)), y2: PY(1.5) }
    }, [w])

    return (
        <VizPanel
            title="Watch a perceptron learn"
            hint="Each update grabs one misclassified point (pulsing ring) and nudges the line toward it. Rosenblatt proved this always converges — provided a separating line exists at all."
        >
            <svg viewBox="0 0 360 270" className="w-full">
                <defs>
                    <clipPath id="perceptron-clip">
                        <rect x="20" y="10" width="320" height="240" />
                    </clipPath>
                </defs>
                <rect
                    x="20" y="10" width="320" height="240" rx="6"
                    className="fill-gray-100/60 dark:fill-white/[0.03] stroke-gray-300 dark:stroke-gray-700"
                    strokeWidth="1"
                />
                <g clipPath="url(#perceptron-clip)">
                    <line
                        {...boundary}
                        stroke={converged ? COLORS.emerald : COLORS.amber}
                        strokeWidth="2.5"
                        style={{ transition: 'all 300ms ease' }}
                    />
                </g>
                {DATA.map((p, i) => {
                    const wrong = predict(w, p.x, p.y) !== p.label
                    return (
                        <g key={i}>
                            {lastFixed === i && !converged && (
                                <circle cx={PX(p.x)} cy={PY(p.y)} r="11" fill="none"
                                    stroke={COLORS.amber} strokeWidth="2" opacity="0.8">
                                    <animate attributeName="r" values="7;13;7" dur="1s" repeatCount="indefinite" />
                                </circle>
                            )}
                            <circle
                                cx={PX(p.x)} cy={PY(p.y)} r="5.5"
                                fill={p.label === 1 ? COLORS.blue : COLORS.rose}
                                stroke={wrong ? COLORS.amber : 'transparent'}
                                strokeWidth="2.5"
                            />
                        </g>
                    )
                })}
            </svg>

            <div className="mt-3 flex flex-wrap items-center gap-2">
                <VizButton onClick={() => setState(step)} disabled={converged}>+1 update</VizButton>
                <VizButton onClick={() => setRunning((r) => !r)} active={running} disabled={converged}>
                    {running ? '⏸ pause' : '▶ auto-train'}
                </VizButton>
                <VizButton onClick={() => { setState(INITIAL); setRunning(false) }}>↺ reset</VizButton>
                <span className="ml-auto flex items-center gap-3">
                    <LegendDot color={COLORS.blue} label="class +1" />
                    <LegendDot color={COLORS.rose} label="class −1" />
                </span>
            </div>
            <div className="mt-2 text-xs font-mono text-gray-600 dark:text-gray-300">
                updates: {updates} · misclassified: {misclassified}
                {converged && <span className="text-emerald-500 font-semibold"> · converged ✓</span>}
            </div>
        </VizPanel>
    )
}
