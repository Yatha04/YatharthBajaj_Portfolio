import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { VizPanel, VizButton, VizSlider, LegendDot } from './primitives'
import { COLORS } from './utils'

// ───────────────────────── Panel 1: the maximum margin ─────────────────────────
// Try to beat the SVM: position your own line, then reveal the max-margin
// solution. Data is built so the optimal boundary is x + y = 1 with margin
// lines x + y = 0.8 / 1.2 (support vectors sit exactly on them).

const POS: Array<[number, number]> = [
    [0.62, 0.58], [0.55, 0.65], [0.75, 0.7], [0.85, 0.6],
    [0.7, 0.85], [0.9, 0.8], [0.65, 0.78], [0.88, 0.45],
]
const NEG: Array<[number, number]> = [
    [0.38, 0.42], [0.45, 0.35], [0.25, 0.3], [0.15, 0.45],
    [0.3, 0.15], [0.1, 0.25], [0.22, 0.5], [0.42, 0.12],
]
const DATA = [
    ...POS.map(([x, y]) => ({ x, y, label: 1 })),
    ...NEG.map(([x, y]) => ({ x, y, label: -1 })),
]
const SUPPORT = [[0.62, 0.58], [0.55, 0.65], [0.38, 0.42], [0.45, 0.35]]
const BEST_MARGIN = 0.2 / Math.SQRT2

const PX = (x: number) => 20 + 320 * x
const PY = (y: number) => 250 - 240 * y

/** Endpoints of cos(θ)·x + sin(θ)·y = c across the extended plot area. */
function lineEndpoints(theta: number, c: number) {
    const ct = Math.cos(theta)
    const st = Math.sin(theta)
    if (Math.abs(st) > Math.abs(ct)) {
        const yAt = (x: number) => (c - ct * x) / st
        return { x1: PX(-0.5), y1: PY(yAt(-0.5)), x2: PX(1.5), y2: PY(yAt(1.5)) }
    }
    const xAt = (y: number) => (c - st * y) / ct
    return { x1: PX(xAt(-0.5)), y1: PY(-0.5), x2: PX(xAt(1.5)), y2: PY(1.5) }
}

export function SvmMarginViz() {
    const [deg, setDeg] = useState(70)
    const [offset, setOffset] = useState(0.62)
    const [reveal, setReveal] = useState(false)

    const theta = (deg * Math.PI) / 180

    const margin = useMemo(() => {
        const ct = Math.cos(theta)
        const st = Math.sin(theta)
        let m = Infinity
        let sign = 0
        for (const p of DATA) {
            const d = ct * p.x + st * p.y - offset
            const s = d * p.label
            if (sign === 0) sign = Math.sign(s)
            m = Math.min(m, Math.abs(d))
            if (s * sign < 0 || s === 0) return 0 // misclassifies (allowing flipped orientation)
        }
        return m
    }, [theta, offset])

    const userLine = lineEndpoints(theta, offset)
    const bestTheta = Math.PI / 4

    return (
        <VizPanel
            title="Beat the machine: find the widest street"
            hint="Your line's 'street' (shaded band) is only as wide as its distance to the nearest point. The SVM provably finds the widest street possible — and only the circled support vectors hold it up. Delete every other point and nothing changes."
        >
            <svg viewBox="0 0 360 270" className="w-full">
                <defs>
                    <clipPath id="svm-clip">
                        <rect x="20" y="10" width="320" height="240" />
                    </clipPath>
                </defs>
                <rect
                    x="20" y="10" width="320" height="240" rx="6"
                    className="fill-gray-100/60 dark:fill-white/[0.03] stroke-gray-300 dark:stroke-gray-700"
                    strokeWidth="1"
                />
                <g clipPath="url(#svm-clip)">
                    {/* user street */}
                    {margin > 0 && (
                        <>
                            <line {...lineEndpoints(theta, offset - margin)} stroke={COLORS.amber} strokeWidth="1" strokeDasharray="4 4" opacity="0.7" />
                            <line {...lineEndpoints(theta, offset + margin)} stroke={COLORS.amber} strokeWidth="1" strokeDasharray="4 4" opacity="0.7" />
                        </>
                    )}
                    <line
                        {...userLine}
                        stroke={margin > 0 ? COLORS.amber : COLORS.rose}
                        strokeWidth="2.5"
                        strokeDasharray={margin > 0 ? undefined : '6 4'}
                    />
                    {/* optimal street */}
                    {reveal && (
                        <>
                            <line {...lineEndpoints(bestTheta, 1 / Math.SQRT2)} stroke={COLORS.emerald} strokeWidth="2.5" />
                            <line {...lineEndpoints(bestTheta, 0.8 / Math.SQRT2)} stroke={COLORS.emerald} strokeWidth="1" strokeDasharray="4 4" />
                            <line {...lineEndpoints(bestTheta, 1.2 / Math.SQRT2)} stroke={COLORS.emerald} strokeWidth="1" strokeDasharray="4 4" />
                        </>
                    )}
                </g>
                {DATA.map((p, i) => (
                    <circle key={i} cx={PX(p.x)} cy={PY(p.y)} r="5"
                        fill={p.label === 1 ? COLORS.blue : COLORS.rose} />
                ))}
                {reveal &&
                    SUPPORT.map(([x, y], i) => (
                        <circle key={`sv${i}`} cx={PX(x)} cy={PY(y)} r="9.5" fill="none"
                            stroke={COLORS.emerald} strokeWidth="2" />
                    ))}
            </svg>

            <div className="mt-3 space-y-2">
                <VizSlider label="line angle" value={deg} min={5} max={175} step={1} onChange={setDeg} format={(v) => `${v}°`} />
                <VizSlider label="line offset" value={offset} min={0.2} max={1.2} step={0.01} onChange={setOffset} format={(v) => v.toFixed(2)} />
            </div>
            <div className="mt-3 flex flex-wrap items-center gap-3">
                <VizButton onClick={() => setReveal((r) => !r)} active={reveal}>
                    {reveal ? 'hide' : '✨ reveal'} max margin
                </VizButton>
                <span className="text-xs font-mono text-gray-600 dark:text-gray-300">
                    your margin:{' '}
                    <span className={margin === 0 ? 'text-rose-500 font-semibold' : 'text-gray-900 dark:text-white font-semibold'}>
                        {margin === 0 ? 'invalid (misclassifies!)' : margin.toFixed(3)}
                    </span>
                    {reveal && <span> · SVM: {BEST_MARGIN.toFixed(3)}</span>}
                </span>
            </div>
        </VizPanel>
    )
}

// ───────────────────────── Panel 2: the kernel trick ─────────────────────────
// 1D data nobody can split with a single threshold… until you lift it with
// φ(x) = (x, x²) and a horizontal line falls out.

const INNER = [-0.25, -0.15, -0.05, 0.05, 0.18, 0.25] // rose, |x| small
const OUTER = [-0.95, -0.85, -0.7, -0.55, 0.55, 0.65, 0.8, 0.9] // sky, |x| large

const KX = (x: number) => 180 + 158 * x
const KY = (y: number) => 235 - 195 * y

export function SvmKernelViz() {
    const [lifted, setLifted] = useState(false)

    const spring = { type: 'spring', stiffness: 70, damping: 14 } as const

    return (
        <VizPanel
            title="The kernel trick: when in doubt, add a dimension"
            hint="On the line, rose is trapped between sky — no threshold works. Map every point through φ(x) = (x, x²) and the classes peel apart vertically; a plain straight line now separates them. Kernels let SVMs do this in huge (even infinite) dimensions without ever computing φ."
        >
            <svg viewBox="0 0 360 260" className="w-full">
                {/* axis */}
                <line x1="12" y1="235" x2="348" y2="235" className="stroke-gray-300 dark:stroke-gray-700" strokeWidth="1" />
                <text x="348" y="250" textAnchor="end" fontSize="10" className="fill-gray-500 dark:fill-gray-400">x</text>
                {lifted && (
                    <>
                        <line x1="180" y1="240" x2="180" y2="20" className="stroke-gray-300 dark:stroke-gray-700" strokeWidth="1" />
                        <text x="172" y="28" textAnchor="end" fontSize="10" className="fill-gray-500 dark:fill-gray-400">x²</text>
                        {/* separating line, fades in after the lift */}
                        <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}>
                            <line x1="20" y1={KY(0.18)} x2="340" y2={KY(0.18)} stroke={COLORS.emerald} strokeWidth="2.5" strokeDasharray="7 4" />
                            <text x="26" y={KY(0.18) - 7} fontSize="10" fill={COLORS.emerald} fontWeight="600">
                                x² = 0.18 — separable!
                            </text>
                        </motion.g>
                    </>
                )}
                {INNER.map((x, i) => (
                    <motion.circle
                        key={`in${i}`} r="6" fill={COLORS.rose}
                        initial={false}
                        animate={{ cx: KX(x), cy: lifted ? KY(x * x) : KY(0) }}
                        transition={spring}
                    />
                ))}
                {OUTER.map((x, i) => (
                    <motion.circle
                        key={`out${i}`} r="6" fill={COLORS.blue}
                        initial={false}
                        animate={{ cx: KX(x), cy: lifted ? KY(x * x) : KY(0) }}
                        transition={spring}
                    />
                ))}
            </svg>

            <div className="mt-3 flex items-center gap-3">
                <VizButton onClick={() => setLifted((l) => !l)} active={lifted}>
                    {lifted ? '↓ flatten back to 1D' : '↑ lift with φ(x) = (x, x²)'}
                </VizButton>
                <span className="ml-auto flex gap-3">
                    <LegendDot color={COLORS.rose} label="class A" />
                    <LegendDot color={COLORS.blue} label="class B" />
                </span>
            </div>
        </VizPanel>
    )
}
