import { useMemo, useState } from 'react'
import { VizPanel, VizSlider, LegendDot } from './primitives'
import { COLORS, gauss, linePath } from './utils'

// Bayesian decision theory: where you place the decision threshold should
// depend not just on the densities, but on the *cost* of each kind of mistake.
// Scenario: a diagnostic test score. Healthy ~ N(0.35, 0.10), ill ~ N(0.68, 0.13).

const MU0 = 0.35, S0 = 0.10 // healthy
const MU1 = 0.68, S1 = 0.13 // ill
const PRIOR = 0.5

const PX = (x: number) => 20 + 320 * x
const PY = (d: number) => 230 - 48 * d

const N = 300
const XS = Array.from({ length: N + 1 }, (_, i) => i / N)

export function BayesDecisionViz() {
    const [t, setT] = useState(0.515)
    const [costMiss, setCostMiss] = useState(1)

    const { expCost, optT, fpArea, fnArea } = useMemo(() => {
        const dx = 1 / N
        let fp = 0, fn = 0
        for (const x of XS) {
            if (x > t) fp += PRIOR * gauss(x, MU0, S0) * dx
            else fn += PRIOR * gauss(x, MU1, S1) * dx
        }
        // Sweep thresholds for the cost-optimal one.
        let best = Infinity, bestT = t
        for (let i = 0; i <= 100; i++) {
            const tt = i / 100
            let c = 0
            for (const x of XS) {
                if (x > tt) c += PRIOR * gauss(x, MU0, S0) * dx
                else c += costMiss * PRIOR * gauss(x, MU1, S1) * dx
            }
            if (c < best) { best = c; bestT = tt }
        }
        return { expCost: fp + costMiss * fn, optT: bestT, fpArea: fp, fnArea: fn }
    }, [t, costMiss])

    const curve0 = useMemo(() => linePath(XS.map((x) => [PX(x), PY(gauss(x, MU0, S0))])), [])
    const curve1 = useMemo(() => linePath(XS.map((x) => [PX(x), PY(gauss(x, MU1, S1))])), [])

    const fillRegion = (which: 0 | 1) => {
        const pts: Array<[number, number]> = []
        for (const x of XS) {
            const inRegion = which === 0 ? x > t : x <= t
            if (!inRegion) continue
            pts.push([PX(x), PY(gauss(x, which === 0 ? MU0 : MU1, which === 0 ? S0 : S1))])
        }
        if (pts.length === 0) return ''
        return `${linePath(pts)} L${pts[pts.length - 1][0]},${PY(0)} L${pts[0][0]},${PY(0)} Z`
    }

    return (
        <VizPanel
            title="Where do you draw the line when mistakes aren't equal?"
            hint="Crank up the cost of a missed diagnosis and watch the optimal threshold (▼) slide left: when one error is expensive, a rational agent accepts more of the cheap error to avoid it."
        >
            <svg viewBox="0 0 360 260" className="w-full">
                <line x1="20" y1="230" x2="340" y2="230" className="stroke-gray-300 dark:stroke-gray-700" strokeWidth="1" />
                <path d={fillRegion(0)} fill={COLORS.rose} opacity="0.25" />
                <path d={fillRegion(1)} fill={COLORS.amber} opacity="0.3" />
                <path d={curve0} fill="none" stroke={COLORS.emerald} strokeWidth="2.5" />
                <path d={curve1} fill="none" stroke={COLORS.rose} strokeWidth="2.5" />

                {/* user's threshold */}
                <line x1={PX(t)} y1="30" x2={PX(t)} y2="230" className="stroke-gray-700 dark:stroke-gray-200" strokeWidth="2" strokeDasharray="5 4" />
                <text x={PX(t)} y="22" textAnchor="middle" fontSize="10" className="fill-gray-700 dark:fill-gray-200 font-semibold">
                    your threshold
                </text>
                {/* optimal threshold marker */}
                <path
                    d={`M${PX(optT) - 5},238 L${PX(optT) + 5},238 L${PX(optT)},246 Z`}
                    fill={COLORS.violet}
                    style={{ transition: 'all 250ms ease' }}
                />
                <text x={PX(optT)} y="257" textAnchor="middle" fontSize="9" fill={COLORS.violet}>
                    optimal
                </text>

                <text x={PX(MU0)} y={PY(gauss(MU0, MU0, S0)) - 8} textAnchor="middle" fontSize="10" fill={COLORS.emerald}>
                    p(x | healthy)
                </text>
                <text x={PX(MU1)} y={PY(gauss(MU1, MU1, S1)) - 8} textAnchor="middle" fontSize="10" fill={COLORS.rose}>
                    p(x | ill)
                </text>
            </svg>

            <div className="mt-3 space-y-2">
                <VizSlider label="threshold" value={t} min={0.1} max={0.9} step={0.005} onChange={setT} format={(v) => v.toFixed(2)} />
                <VizSlider label="cost of a miss" value={costMiss} min={1} max={10} step={1} onChange={setCostMiss} format={(v) => `${v}×`} />
            </div>
            <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-mono text-gray-600 dark:text-gray-300">
                <span>false alarms: {(fpArea * 100).toFixed(1)}%</span>
                <span>misses: {(fnArea * 100).toFixed(1)}%</span>
                <span className="font-semibold text-gray-900 dark:text-white">expected cost: {expCost.toFixed(3)}</span>
            </div>
            <div className="mt-2 flex items-center gap-4">
                <LegendDot color={COLORS.rose} label="false-alarm region" />
                <LegendDot color={COLORS.amber} label="missed-illness region" />
            </div>
        </VizPanel>
    )
}
