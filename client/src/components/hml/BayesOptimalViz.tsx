import { useMemo, useState } from 'react'
import { VizPanel, VizSlider, LegendDot } from './primitives'
import { COLORS, gauss, linePath } from './utils'

// The Bayes optimal classifier: pick the class with the larger posterior.
// Plotted are the prior-weighted likelihoods π·p(x|B) and (1−π)·p(x|A);
// the crossing point is the optimal boundary, and the overlap under
// min(·,·) is the Bayes error — the floor no classifier can beat.

const MU_A = 0.35, MU_B = 0.65, S = 0.12

const PX = (x: number) => 20 + 320 * x
const PY = (d: number) => 220 - 52 * d

const N = 300
const XS = Array.from({ length: N + 1 }, (_, i) => i / N)

export function BayesOptimalViz() {
    const [prior, setPrior] = useState(0.5) // π = P(class B)

    const gA = (x: number) => (1 - prior) * gauss(x, MU_A, S)
    const gB = (x: number) => prior * gauss(x, MU_B, S)

    const { boundary, bayesError } = useMemo(() => {
        let xStar = 0.5
        for (const x of XS) {
            if (gB(x) >= gA(x)) { xStar = x; break }
            xStar = x
        }
        let err = 0
        for (const x of XS) err += Math.min(gA(x), gB(x)) / N
        return { boundary: xStar, bayesError: err }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [prior])

    const curveA = useMemo(
        () => linePath(XS.map((x) => [PX(x), PY(gA(x))])),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [prior],
    )
    const curveB = useMemo(
        () => linePath(XS.map((x) => [PX(x), PY(gB(x))])),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [prior],
    )
    const minRegion = useMemo(() => {
        const pts: Array<[number, number]> = XS.map((x) => [PX(x), PY(Math.min(gA(x), gB(x)))])
        return `${linePath(pts)} L${PX(1)},${PY(0)} L${PX(0)},${PY(0)} Z`
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [prior])

    return (
        <VizPanel
            title="The unbeatable classifier (and its irreducible error)"
            hint="The gray sliver is the Bayes error: where the weighted densities overlap, even a perfect rule must sometimes be wrong. Shift the prior and watch the optimal boundary chase the crossing point."
        >
            <svg viewBox="0 0 360 250" className="w-full">
                {/* decision regions */}
                <rect x="20" y="20" width={PX(boundary) - 20} height="200" fill={COLORS.blue} opacity="0.07" style={{ transition: 'width 200ms ease' }} />
                <rect x={PX(boundary)} y="20" width={340 - PX(boundary)} height="200" fill={COLORS.rose} opacity="0.07" style={{ transition: 'all 200ms ease' }} />
                <line x1="20" y1="220" x2="340" y2="220" className="stroke-gray-300 dark:stroke-gray-700" strokeWidth="1" />

                <path d={minRegion} fill={COLORS.gray} opacity="0.45" />
                <path d={curveA} fill="none" stroke={COLORS.blue} strokeWidth="2.5" />
                <path d={curveB} fill="none" stroke={COLORS.rose} strokeWidth="2.5" />

                <line
                    x1={PX(boundary)} y1="20" x2={PX(boundary)} y2="220"
                    className="stroke-gray-700 dark:stroke-gray-200"
                    strokeWidth="2" strokeDasharray="5 4"
                    style={{ transition: 'all 200ms ease' }}
                />
                <text x={PX(boundary)} y="14" textAnchor="middle" fontSize="10" className="fill-gray-700 dark:fill-gray-200 font-semibold">
                    optimal boundary
                </text>
                <text x="50" y="238" fontSize="10" fill={COLORS.blue}>← predict A</text>
                <text x="310" y="238" textAnchor="end" fontSize="10" fill={COLORS.rose}>predict B →</text>
            </svg>

            <div className="mt-3">
                <VizSlider
                    label="prior P(B)"
                    value={prior} min={0.05} max={0.95} step={0.01}
                    onChange={setPrior}
                    format={(v) => v.toFixed(2)}
                />
            </div>
            <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs">
                <LegendDot color={COLORS.blue} label="(1−π)·p(x|A)" />
                <LegendDot color={COLORS.rose} label="π·p(x|B)" />
                <LegendDot color={COLORS.gray} label="Bayes error" />
                <span className="ml-auto font-mono font-semibold text-gray-900 dark:text-white">
                    floor: {(bayesError * 100).toFixed(1)}% error
                </span>
            </div>
        </VizPanel>
    )
}
