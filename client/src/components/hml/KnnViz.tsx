import { useMemo, useRef, useState } from 'react'
import { VizPanel, VizSlider, LegendDot } from './primitives'
import { COLORS, clamp, mulberry32 } from './utils'

// k-NN: no training at all. Drag the query point; its label is just a vote
// among its k nearest neighbors.

const rand = mulberry32(42)
const jitter = () => (rand() - 0.5) * 0.36

const POINTS = [
    // sky cluster (upper left-ish)
    ...Array.from({ length: 14 }, () => ({
        x: clamp(0.32 + jitter(), 0.04, 0.96),
        y: clamp(0.68 + jitter(), 0.04, 0.96),
        label: 0,
    })),
    // rose cluster (lower right-ish)
    ...Array.from({ length: 14 }, () => ({
        x: clamp(0.68 + jitter(), 0.04, 0.96),
        y: clamp(0.32 + jitter(), 0.04, 0.96),
        label: 1,
    })),
]

const PX = (x: number) => 20 + 320 * x
const PY = (y: number) => 250 - 240 * y

export function KnnViz() {
    const [query, setQuery] = useState({ x: 0.5, y: 0.5 })
    const [k, setK] = useState(5)
    const svgRef = useRef<SVGSVGElement>(null)
    const dragging = useRef(false)

    const { neighbors, votes0, prediction } = useMemo(() => {
        const sorted = POINTS.map((p, i) => ({
            ...p, i,
            d: (p.x - query.x) ** 2 + (p.y - query.y) ** 2,
        })).sort((a, b) => a.d - b.d)
        const nn = sorted.slice(0, k)
        const v0 = nn.filter((p) => p.label === 0).length
        return { neighbors: nn, votes0: v0, prediction: v0 > k / 2 ? 0 : 1 }
    }, [query, k])

    const moveTo = (clientX: number, clientY: number) => {
        const svg = svgRef.current
        if (!svg) return
        const rect = svg.getBoundingClientRect()
        const vx = ((clientX - rect.left) / rect.width) * 360
        const vy = ((clientY - rect.top) / rect.height) * 270
        setQuery({
            x: clamp((vx - 20) / 320, 0.02, 0.98),
            y: clamp((250 - vy) / 240, 0.02, 0.98),
        })
    }

    return (
        <VizPanel
            title="Drag the question mark around"
            hint="The lazy learner: it memorizes everything and decides at the last possible moment. Small k hugs every quirk of the data; large k smooths them away. That tension has a name — the bias–variance tradeoff."
        >
            <svg
                ref={svgRef}
                viewBox="0 0 360 270"
                className="w-full cursor-crosshair select-none"
                style={{ touchAction: 'none' }}
                onPointerDown={(e) => {
                    dragging.current = true
                    e.currentTarget.setPointerCapture(e.pointerId)
                    moveTo(e.clientX, e.clientY)
                }}
                onPointerMove={(e) => dragging.current && moveTo(e.clientX, e.clientY)}
                onPointerUp={() => { dragging.current = false }}
            >
                <rect
                    x="20" y="10" width="320" height="240" rx="6"
                    className="fill-gray-100/60 dark:fill-white/[0.03] stroke-gray-300 dark:stroke-gray-700"
                    strokeWidth="1"
                />
                {neighbors.map((p) => (
                    <line
                        key={`l${p.i}`}
                        x1={PX(query.x)} y1={PY(query.y)} x2={PX(p.x)} y2={PY(p.y)}
                        className="stroke-gray-400 dark:stroke-gray-500"
                        strokeWidth="1" strokeDasharray="3 3" opacity="0.7"
                    />
                ))}
                {POINTS.map((p, i) => {
                    const isNeighbor = neighbors.some((n) => n.i === i)
                    return (
                        <circle
                            key={i}
                            cx={PX(p.x)} cy={PY(p.y)} r={isNeighbor ? 6.5 : 4.5}
                            fill={p.label === 0 ? COLORS.blue : COLORS.rose}
                            stroke={isNeighbor ? (p.label === 0 ? COLORS.blue : COLORS.rose) : 'transparent'}
                            strokeWidth="2"
                            strokeOpacity="0.35"
                            style={{ transition: 'r 150ms ease' }}
                        />
                    )
                })}
                <circle
                    cx={PX(query.x)} cy={PY(query.y)} r="9"
                    fill={prediction === 0 ? COLORS.blue : COLORS.rose}
                    stroke="white" strokeWidth="2"
                />
                <text
                    x={PX(query.x)} y={PY(query.y) + 4}
                    textAnchor="middle" fontSize="11" fill="white" fontWeight="bold"
                    pointerEvents="none"
                >
                    ?
                </text>
            </svg>

            <div className="mt-3">
                <VizSlider label="k (neighbors)" value={k} min={1} max={15} step={2} onChange={setK} />
            </div>
            <div className="mt-2 flex flex-wrap items-center gap-4 text-xs">
                <LegendDot color={COLORS.blue} label={`${votes0} votes`} />
                <LegendDot color={COLORS.rose} label={`${k - votes0} votes`} />
                <span className="font-mono font-semibold text-gray-900 dark:text-white">
                    → verdict: {prediction === 0 ? 'blue' : 'rose'}
                </span>
            </div>
        </VizPanel>
    )
}
