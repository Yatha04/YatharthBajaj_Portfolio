import { useMemo, useState } from 'react'
import { VizPanel, VizButton, VizSlider, LegendDot } from './primitives'
import { COLORS, linePath, sigmoid } from './utils'

// Universal approximation: a single hidden layer of sigmoid units can get
// arbitrarily close to any continuous function — here built constructively,
// one sigmoid "step" per hidden neuron.

const target = (x: number) => 0.5 + 0.3 * Math.sin(2 * Math.PI * x) + 0.12 * Math.sin(5 * Math.PI * x + 1)

const PX = (x: number) => 20 + 320 * x
const PY = (y: number) => 235 - 210 * y

const SAMPLES = Array.from({ length: 241 }, (_, i) => i / 240)

export function UniversalApproxViz() {
    const [n, setN] = useState(3)
    const [showUnits, setShowUnits] = useState(false)

    const { approxPath, unitPaths, mse } = useMemo(() => {
        const k = 14 * n // steepness scales with N so steps stay crisp
        const centers = Array.from({ length: n }, (_, i) => i / n)
        const deltas = centers.map((c, i) => {
            const next = i + 1 < n ? centers[i + 1] : 1
            return target((c + next) / 2) - (i === 0 ? target(0) : target((centers[i - 1] + c) / 2))
        })
        const approx = (x: number) =>
            target(0) + deltas.reduce((s, d, i) => s + d * sigmoid(k * (x - centers[i])), 0)

        let err = 0
        for (const x of SAMPLES) err += (approx(x) - target(x)) ** 2
        err /= SAMPLES.length

        const units = centers.map((c, i) =>
            linePath(SAMPLES.map((x) => [PX(x), PY(0.12 + 0.5 * Math.abs(deltas[i]) * sigmoid(k * (x - c)))])),
        )
        return {
            approxPath: linePath(SAMPLES.map((x) => [PX(x), PY(approx(x))])),
            unitPaths: units,
            mse: err,
        }
    }, [n])

    const targetPath = useMemo(() => linePath(SAMPLES.map((x) => [PX(x), PY(target(x))])), [])

    return (
        <VizPanel
            title="Any curve, from enough soft steps"
            hint="Each hidden neuron contributes one soft step (toggle to see them). One neuron is hopeless; thirty are eerily exact. The theorem says this works for *any* continuous function — but says nothing about how to find the weights. That part needed backprop."
        >
            <svg viewBox="0 0 360 250" className="w-full">
                <rect x="20" y="10" width="320" height="225" rx="6"
                    className="fill-gray-100/60 dark:fill-white/[0.03] stroke-gray-300 dark:stroke-gray-700" strokeWidth="1" />
                {showUnits && unitPaths.map((d, i) => (
                    <path key={i} d={d} fill="none" stroke={COLORS.violet} strokeWidth="1" opacity="0.45" />
                ))}
                <path d={targetPath} fill="none" stroke={COLORS.blue} strokeWidth="2.5" />
                <path d={approxPath} fill="none" stroke={COLORS.amber} strokeWidth="2.5" strokeDasharray="1 0"
                    style={{ transition: 'd 200ms ease' }} />
            </svg>

            <div className="mt-3">
                <VizSlider label="hidden neurons" value={n} min={1} max={40} step={1} onChange={setN} />
            </div>
            <div className="mt-3 flex flex-wrap items-center gap-3">
                <VizButton onClick={() => setShowUnits((s) => !s)} active={showUnits}>
                    {showUnits ? 'hide' : 'show'} the neurons
                </VizButton>
                <span className="flex gap-3 items-center">
                    <LegendDot color={COLORS.blue} label="target f(x)" />
                    <LegendDot color={COLORS.amber} label="network" />
                </span>
                <span className="ml-auto text-xs font-mono text-gray-600 dark:text-gray-300">
                    error: <span className="font-semibold text-gray-900 dark:text-white">{mse.toExponential(1)}</span>
                </span>
            </div>
        </VizPanel>
    )
}
