import { useEffect, useMemo, useRef, useState } from 'react'
import { VizPanel, VizButton } from './primitives'
import { mulberry32 } from './utils'

// A Hopfield network as content-addressable memory: store two 8×8 patterns
// via the Hebbian rule, corrupt one, then let the network roll downhill in
// energy until the memory re-emerges.

const SIZE = 8
const N = SIZE * SIZE

const fromRows = (rows: string[]) =>
    rows.join('').split('').map((c) => (c === '#' ? 1 : -1))

const PATTERN_X = fromRows([
    '#......#',
    '.#....#.',
    '..#..#..',
    '...##...',
    '...##...',
    '..#..#..',
    '.#....#.',
    '#......#',
])
const PATTERN_O = fromRows([
    '........',
    '..####..',
    '.#....#.',
    '.#....#.',
    '.#....#.',
    '.#....#.',
    '..####..',
    '........',
])
const STORED = [PATTERN_X, PATTERN_O]

// Hebbian weights: W_ij = Σ_p s_i s_j, zero diagonal.
const W: number[][] = Array.from({ length: N }, (_, i) =>
    Array.from({ length: N }, (_, j) =>
        i === j ? 0 : STORED.reduce((s, p) => s + p[i] * p[j], 0),
    ),
)

const energy = (s: number[]) => {
    let e = 0
    for (let i = 0; i < N; i++)
        for (let j = i + 1; j < N; j++) e -= W[i][j] * s[i] * s[j]
    return e
}

const rand = mulberry32(99)

export function HopfieldViz() {
    const [cells, setCells] = useState<number[]>([...PATTERN_X])
    const [running, setRunning] = useState(false)
    const [stable, setStable] = useState(false)
    const orderRef = useRef<number[]>([])

    const E = useMemo(() => energy(cells), [cells])

    const corrupt = () => {
        setRunning(false)
        setStable(false)
        setCells((s) => {
            const next = [...s]
            const flipped = new Set<number>()
            while (flipped.size < 14) flipped.add(Math.floor(rand() * N))
            for (const i of flipped) next[i] = -next[i]
            return next
        })
    }

    const load = (p: number[]) => {
        setRunning(false)
        setStable(false)
        setCells([...p])
    }

    useEffect(() => {
        if (!running) return
        const id = setInterval(() => {
            setCells((s) => {
                // Async updates: a few random-order neuron flips per tick.
                if (orderRef.current.length === 0) {
                    const order = Array.from({ length: N }, (_, i) => i)
                    for (let i = order.length - 1; i > 0; i--) {
                        const j = Math.floor(rand() * (i + 1))
                        ;[order[i], order[j]] = [order[j], order[i]]
                    }
                    orderRef.current = order
                }
                const next = [...s]
                let changed = false
                for (let k = 0; k < 10 && orderRef.current.length > 0; k++) {
                    const i = orderRef.current.pop()!
                    let h = 0
                    for (let j = 0; j < N; j++) h += W[i][j] * next[j]
                    const v = h >= 0 ? 1 : -1
                    if (v !== next[i]) {
                        next[i] = v
                        changed = true
                    }
                }
                if (!changed && orderRef.current.length === 0) {
                    // Verify a full clean pass before declaring stability.
                    const isStable = next.every((v, i) => {
                        let h = 0
                        for (let j = 0; j < N; j++) h += W[i][j] * next[j]
                        return (h >= 0 ? 1 : -1) === v
                    })
                    if (isStable) {
                        setRunning(false)
                        setStable(true)
                    }
                }
                return next
            })
        }, 90)
        return () => clearInterval(id)
    }, [running])

    const recalled =
        STORED.some((p) => p.every((v, i) => v === cells[i])) ||
        STORED.some((p) => p.every((v, i) => v === -cells[i]))

    return (
        <VizPanel
            title="A memory you can dent — and watch heal"
            hint="Corrupt the pattern, hit recall, and watch the energy fall until the stored memory re-emerges. Corrupt it twice before recalling and you may land in a spurious or inverted attractor — Hopfield nets remember the negative of every photo too."
        >
            <div className="flex flex-col sm:flex-row gap-5 items-center">
                <svg viewBox="0 0 168 168" className="w-44 shrink-0 cursor-pointer select-none">
                    {cells.map((v, i) => {
                        const r = Math.floor(i / SIZE)
                        const c = i % SIZE
                        return (
                            <rect
                                key={i}
                                x={4 + c * 20} y={4 + r * 20} width="18" height="18" rx="3"
                                className={
                                    v === 1
                                        ? 'fill-gray-900 dark:fill-white'
                                        : 'fill-gray-200 dark:fill-white/10'
                                }
                                style={{ transition: 'fill 120ms ease' }}
                                onClick={() =>
                                    setCells((s) => {
                                        const next = [...s]
                                        next[i] = -next[i]
                                        return next
                                    })
                                }
                            />
                        )
                    })}
                </svg>

                <div className="flex-1 w-full">
                    <div className="flex flex-wrap gap-2">
                        <VizButton onClick={() => load(PATTERN_X)}>load ✕</VizButton>
                        <VizButton onClick={() => load(PATTERN_O)}>load ◯</VizButton>
                        <VizButton onClick={corrupt}>⚡ corrupt 14 px</VizButton>
                        <VizButton onClick={() => { setStable(false); setRunning((r) => !r) }} active={running}>
                            {running ? '⏸ updating…' : '🧠 recall'}
                        </VizButton>
                    </div>
                    <div className="mt-4 text-xs font-mono text-gray-600 dark:text-gray-300 space-y-1">
                        <div>
                            energy: <span className="font-semibold text-gray-900 dark:text-white">{E}</span>
                            {stable && <span className="text-emerald-500 font-semibold"> · stable ✓</span>}
                        </div>
                        <div>
                            state: {recalled ? (
                                <span className="text-emerald-500 font-semibold">a stored memory (or its mirror)</span>
                            ) : (
                                <span className="text-amber-500">somewhere on the energy landscape…</span>
                            )}
                        </div>
                        <div className="text-gray-400 dark:text-gray-500">tip: click cells to flip them by hand</div>
                    </div>
                </div>
            </div>
        </VizPanel>
    )
}
