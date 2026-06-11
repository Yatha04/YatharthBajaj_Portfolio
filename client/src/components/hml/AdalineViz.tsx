import { useEffect, useMemo, useState } from 'react'
import { VizPanel, VizButton, VizSlider } from './primitives'
import { COLORS, linePath } from './utils'

// ADALINE's big idea: minimize a *smooth* squared error with gradient descent
// (the delta rule), instead of the perceptron's all-or-nothing corrections.
// Loss bowl: L(w) = (w − 3)², gradient = 2(w − 3). Diverges when lr > 1.

const W_MIN = -1.5
const W_MAX = 7.5
const TARGET = 3
const loss = (w: number) => (w - TARGET) ** 2

const PX = (w: number) => 20 + (320 * (w - W_MIN)) / (W_MAX - W_MIN)
const PY = (l: number) => 240 - (210 * l) / 21

interface BallState {
    w: number
    trail: number[]
}
const INITIAL: BallState = { w: -0.8, trail: [] }

export function AdalineViz() {
    const [state, setState] = useState<BallState>(INITIAL)
    const [lr, setLr] = useState(0.15)
    const [running, setRunning] = useState(false)

    const diverged = Math.abs(state.w - TARGET) > 6
    const converged = Math.abs(state.w - TARGET) < 0.015

    const step = (s: BallState): BallState => {
        const next = s.w - lr * 2 * (s.w - TARGET)
        return {
            w: Math.max(-40, Math.min(40, next)),
            trail: [...s.trail.slice(-14), s.w],
        }
    }

    useEffect(() => {
        if (!running || diverged || converged) return
        const id = setInterval(() => setState(step), 380)
        return () => clearInterval(id)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [running, diverged, converged, lr])

    const curve = useMemo(() => {
        const pts: Array<[number, number]> = []
        for (let w = W_MIN; w <= W_MAX; w += 0.1) pts.push([PX(w), PY(loss(w))])
        return linePath(pts)
    }, [])

    const visible = state.w >= W_MIN && state.w <= W_MAX

    return (
        <VizPanel
            title="The delta rule: rolling down the error bowl"
            hint="Drag the learning rate up past 1.0 and watch the ball overshoot harder each step until it flies out of the bowl — the first lesson every ML practitioner relearns the hard way."
        >
            <svg viewBox="0 0 360 260" className="w-full">
                <line x1="20" y1="240" x2="340" y2="240" className="stroke-gray-300 dark:stroke-gray-700" strokeWidth="1" />
                <path d={curve} fill="none" stroke={COLORS.violet} strokeWidth="2.5" />
                <text x={PX(TARGET)} y="256" textAnchor="middle" fontSize="10" className="fill-gray-500 dark:fill-gray-400">
                    w* (minimum)
                </text>
                <line x1={PX(TARGET)} y1={PY(0)} x2={PX(TARGET)} y2={PY(0) + 6} stroke={COLORS.violet} strokeWidth="2" />

                {state.trail.map((w, i) =>
                    w >= W_MIN && w <= W_MAX ? (
                        <circle
                            key={i}
                            cx={PX(w)} cy={PY(loss(w))} r="4"
                            fill={COLORS.amber}
                            opacity={0.12 + (0.5 * i) / state.trail.length}
                        />
                    ) : null,
                )}
                {visible && (
                    <circle
                        cx={PX(state.w)} cy={PY(loss(state.w))} r="7"
                        fill={COLORS.amber} stroke="white" strokeWidth="1.5"
                        style={{ transition: 'cx 300ms ease, cy 300ms ease' }}
                    />
                )}
                {diverged && (
                    <text x="180" y="60" textAnchor="middle" fontSize="14" className="fill-rose-500 font-semibold">
                        diverged! 💥 (learning rate too high)
                    </text>
                )}
                {converged && !diverged && (
                    <text x="180" y="60" textAnchor="middle" fontSize="13" className="fill-emerald-500 font-semibold">
                        settled at the minimum ✓
                    </text>
                )}
            </svg>

            <div className="mt-3 flex flex-wrap items-center gap-2">
                <VizButton onClick={() => setState(step)} disabled={diverged}>+1 step</VizButton>
                <VizButton onClick={() => setRunning((r) => !r)} active={running} disabled={diverged}>
                    {running ? '⏸ pause' : '▶ run'}
                </VizButton>
                <VizButton onClick={() => { setState(INITIAL); setRunning(false) }}>↺ reset</VizButton>
            </div>
            <div className="mt-3">
                <VizSlider
                    label="learning rate"
                    value={lr} min={0.05} max={1.15} step={0.05}
                    onChange={setLr}
                    format={(v) => v.toFixed(2)}
                />
            </div>
        </VizPanel>
    )
}
