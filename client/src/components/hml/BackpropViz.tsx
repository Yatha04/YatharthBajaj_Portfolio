import { useEffect, useMemo, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { VizPanel, VizButton } from './primitives'
import { COLORS, mulberry32, sigmoid } from './utils'

// ─────────────── Panel 1: the two passes, animated ───────────────

const IN = [{ x: 45, y: 75 }, { x: 45, y: 165 }]
const HID = [{ x: 180, y: 50 }, { x: 180, y: 120 }, { x: 180, y: 190 }]
const OUT = [{ x: 315, y: 120 }]

const EDGES_1 = IN.flatMap((a) => HID.map((b) => ({ a, b })))
const EDGES_2 = HID.flatMap((a) => OUT.map((b) => ({ a, b })))

const CYCLE = 4.2

export function BackpropFlowViz() {
    return (
        <VizPanel
            title="Forward: predictions. Backward: blame."
            hint="The forward pass turns inputs into a guess; the backward pass runs the chain rule in reverse, assigning every single weight its share of the blame for the error. One forward + one backward = gradients for all weights at once."
        >
            <svg viewBox="0 0 360 240" className="w-full">
                {[...EDGES_1, ...EDGES_2].map((e, i) => (
                    <line key={i} x1={e.a.x} y1={e.a.y} x2={e.b.x} y2={e.b.y}
                        className="stroke-gray-300 dark:stroke-gray-600" strokeWidth="1.2" />
                ))}
                {/* forward pulses */}
                {EDGES_1.map((e, i) => (
                    <motion.circle key={`f1${i}`} r="4" fill={COLORS.blue}
                        initial={{ cx: e.a.x, cy: e.a.y, opacity: 0 }}
                        animate={{ cx: [e.a.x, e.b.x], cy: [e.a.y, e.b.y], opacity: [0, 1, 1, 0] }}
                        transition={{ duration: 0.9, times: [0, 0.15, 0.85, 1], repeat: Infinity, repeatDelay: CYCLE - 0.9, delay: 0.1 }}
                    />
                ))}
                {EDGES_2.map((e, i) => (
                    <motion.circle key={`f2${i}`} r="4" fill={COLORS.blue}
                        initial={{ cx: e.a.x, cy: e.a.y, opacity: 0 }}
                        animate={{ cx: [e.a.x, e.b.x], cy: [e.a.y, e.b.y], opacity: [0, 1, 1, 0] }}
                        transition={{ duration: 0.9, times: [0, 0.15, 0.85, 1], repeat: Infinity, repeatDelay: CYCLE - 0.9, delay: 1.0 }}
                    />
                ))}
                {/* backward pulses */}
                {EDGES_2.map((e, i) => (
                    <motion.circle key={`b2${i}`} r="4" fill={COLORS.rose}
                        initial={{ cx: e.b.x, cy: e.b.y, opacity: 0 }}
                        animate={{ cx: [e.b.x, e.a.x], cy: [e.b.y, e.a.y], opacity: [0, 1, 1, 0] }}
                        transition={{ duration: 0.9, times: [0, 0.15, 0.85, 1], repeat: Infinity, repeatDelay: CYCLE - 0.9, delay: 2.3 }}
                    />
                ))}
                {EDGES_1.map((e, i) => (
                    <motion.circle key={`b1${i}`} r="4" fill={COLORS.rose}
                        initial={{ cx: e.b.x, cy: e.b.y, opacity: 0 }}
                        animate={{ cx: [e.b.x, e.a.x], cy: [e.b.y, e.a.y], opacity: [0, 1, 1, 0] }}
                        transition={{ duration: 0.9, times: [0, 0.15, 0.85, 1], repeat: Infinity, repeatDelay: CYCLE - 0.9, delay: 3.2 }}
                    />
                ))}
                {[...IN, ...HID, ...OUT].map((p, i) => (
                    <circle key={`n${i}`} cx={p.x} cy={p.y} r="13"
                        className="fill-white dark:fill-gray-900 stroke-gray-400 dark:stroke-gray-400"
                        strokeWidth="1.5" />
                ))}
                <text x="45" y="218" textAnchor="middle" fontSize="10" className="fill-gray-500 dark:fill-gray-400">input</text>
                <text x="180" y="218" textAnchor="middle" fontSize="10" className="fill-gray-500 dark:fill-gray-400">hidden</text>
                <text x="315" y="218" textAnchor="middle" fontSize="10" className="fill-gray-500 dark:fill-gray-400">output</text>
                <text x="115" y="22" textAnchor="middle" fontSize="11" fill={COLORS.blue} fontWeight="600">forward →</text>
                <text x="248" y="22" textAnchor="middle" fontSize="11" fill={COLORS.rose} fontWeight="600">← backward</text>
            </svg>
        </VizPanel>
    )
}

// ─────────────── Panel 2: live training on XOR ───────────────
// A 2-4-1 network (tanh hidden, sigmoid output, cross-entropy) trained in
// real time in your browser. XOR is the exact problem Minsky & Papert used
// to bury the single-layer perceptron.

const XOR: Array<[number, number, number]> = [
    [0, 0, 0], [0, 1, 1], [1, 0, 1], [1, 1, 0],
]
const H = 4
// Deliberately gentle so the carving of the decision regions is watchable
// (~250 epochs ≈ 4 seconds at one epoch per animation frame).
const LR = 0.05
const MOM = 0.5

interface Net {
    w1: number[][] // [H][3] (incl. bias)
    w2: number[] // [H+1]
    v1: number[][]
    v2: number[]
}

const freshNet = (seed: number): Net => {
    const r = mulberry32(seed)
    const init = () => (r() - 0.5) * 2
    return {
        w1: Array.from({ length: H }, () => [init(), init(), init()]),
        w2: Array.from({ length: H + 1 }, init),
        v1: Array.from({ length: H }, () => [0, 0, 0]),
        v2: Array.from({ length: H + 1 }, () => 0),
    }
}

const forward = (net: Net, x1: number, x2: number) => {
    const h = net.w1.map((w) => Math.tanh(w[0] * x1 + w[1] * x2 + w[2]))
    const z = h.reduce((s, hi, i) => s + net.w2[i] * hi, net.w2[H])
    return { h, out: sigmoid(z) }
}

function trainEpochs(net: Net, epochs: number) {
    for (let e = 0; e < epochs; e++) {
        const g1 = Array.from({ length: H }, () => [0, 0, 0])
        const g2 = Array.from({ length: H + 1 }, () => 0)
        for (const [x1, x2, y] of XOR) {
            const { h, out } = forward(net, x1, x2)
            const dOut = out - y // sigmoid + cross-entropy
            for (let i = 0; i < H; i++) {
                g2[i] += dOut * h[i]
                const dH = dOut * net.w2[i] * (1 - h[i] * h[i])
                g1[i][0] += dH * x1
                g1[i][1] += dH * x2
                g1[i][2] += dH
            }
            g2[H] += dOut
        }
        for (let i = 0; i < H; i++) {
            for (let j = 0; j < 3; j++) {
                net.v1[i][j] = MOM * net.v1[i][j] - LR * g1[i][j]
                net.w1[i][j] += net.v1[i][j]
            }
        }
        for (let i = 0; i <= H; i++) {
            net.v2[i] = MOM * net.v2[i] - LR * g2[i]
            net.w2[i] += net.v2[i]
        }
    }
}

const lossOf = (net: Net) => {
    let l = 0
    for (const [x1, x2, y] of XOR) {
        const { out } = forward(net, x1, x2)
        const p = Math.min(1 - 1e-7, Math.max(1e-7, out))
        l -= y * Math.log(p) + (1 - y) * Math.log(1 - p)
    }
    return l / 4
}

const GRID = 23
const CELL = 220 / GRID

export function XorTrainerViz() {
    const netRef = useRef<Net>(freshNet(3))
    const lossesRef = useRef<number[]>([])
    const epochRef = useRef(0)
    const [running, setRunning] = useState(false)
    const [, setTick] = useState(0)

    useEffect(() => {
        if (!running) return
        let raf = 0
        const loop = () => {
            trainEpochs(netRef.current, 1)
            epochRef.current += 1
            lossesRef.current.push(lossOf(netRef.current))
            if (lossesRef.current.length > 240) lossesRef.current.shift()
            setTick((t) => t + 1)
            raf = requestAnimationFrame(loop)
        }
        raf = requestAnimationFrame(loop)
        return () => cancelAnimationFrame(raf)
    }, [running])

    const reset = () => {
        setRunning(false)
        netRef.current = freshNet(3)
        lossesRef.current = []
        epochRef.current = 0
        setTick((t) => t + 1)
    }

    const net = netRef.current
    const loss = lossOf(net)

    const heatmap = useMemo(() => {
        const cells: Array<{ x: number; y: number; v: number }> = []
        for (let i = 0; i < GRID; i++) {
            for (let j = 0; j < GRID; j++) {
                const x = (i + 0.5) / GRID
                const y = (j + 0.5) / GRID
                cells.push({ x: i, y: j, v: forward(net, x, y).out })
            }
        }
        return cells
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [epochRef.current, running])

    const sparkline = useMemo(() => {
        const ls = lossesRef.current
        if (ls.length < 2) return ''
        const max = Math.max(...ls, 0.75)
        return ls
            .map((l, i) => `${i === 0 ? 'M' : 'L'}${(i / (ls.length - 1)) * 100},${36 - (l / max) * 34}`)
            .join(' ')
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [epochRef.current])

    const lerp = (v: number) => {
        // 0 → blue, 0.5 → near-white, 1 → rose
        const t = v
        const mix = (a: number, b: number) => Math.round(a + (b - a) * t)
        return `rgb(${mix(56, 251)}, ${mix(189, 113)}, ${mix(248, 133)})`
    }

    return (
        <VizPanel
            title="Solve the 'unsolvable' problem, live"
            hint="XOR — the problem Minsky and Papert used to argue perceptrons were a dead end. Press train: this 2-4-1 network is learning in your browser right now, carving the plane into the two diagonal regions no single line ever could."
        >
            <div className="flex flex-col sm:flex-row gap-5">
                <svg viewBox="0 0 220 220" className="w-56 shrink-0 rounded-lg overflow-hidden">
                    {heatmap.map((c, i) => (
                        <rect key={i} x={c.x * CELL} y={(GRID - 1 - c.y) * CELL}
                            width={CELL + 0.5} height={CELL + 0.5} fill={lerp(c.v)} />
                    ))}
                    {XOR.map(([x, y, label], i) => (
                        <circle key={i}
                            cx={x * 200 + 10} cy={(1 - y) * 200 + 10} r="8"
                            fill={label === 1 ? COLORS.rose : COLORS.blue}
                            stroke="white" strokeWidth="2.5"
                        />
                    ))}
                </svg>
                <div className="flex-1 flex flex-col">
                    <div className="flex flex-wrap gap-2">
                        <VizButton onClick={() => setRunning((r) => !r)} active={running}>
                            {running ? '⏸ pause' : '▶ train'}
                        </VizButton>
                        <VizButton onClick={reset}>↺ reset</VizButton>
                    </div>
                    <div className="mt-3 text-xs font-mono text-gray-600 dark:text-gray-300">
                        epoch {epochRef.current} · loss{' '}
                        <span className={`font-semibold ${loss < 0.05 ? 'text-emerald-500' : 'text-gray-900 dark:text-white'}`}>
                            {loss.toFixed(4)}
                        </span>
                        {loss < 0.05 && ' · solved ✓'}
                    </div>
                    <div className="mt-3 flex-1 min-h-[40px]">
                        <svg viewBox="0 0 100 38" className="w-full h-12" preserveAspectRatio="none">
                            <path d={sparkline} fill="none" stroke={COLORS.amber} strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
                        </svg>
                        <div className="text-[10px] text-gray-400 dark:text-gray-500 -mt-1">loss over time</div>
                    </div>
                </div>
            </div>
        </VizPanel>
    )
}
