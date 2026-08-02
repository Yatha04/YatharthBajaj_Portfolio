import { useMemo, useState } from 'react'
import { VizPanel, VizButton, VizSlider } from './primitives'
import { COLORS, clamp, gaussianSampler, mulberry32 } from './utils'

// PCA: among all directions you could project onto, one captures the most
// variance. Sweep the axis and watch the captured-variance meter; then snap
// to the eigenvector and see you can't beat it.

const randn = gaussianSampler(mulberry32(7))
const TRUE_ANGLE = (32 * Math.PI) / 180
const POINTS = Array.from({ length: 42 }, () => {
    const major = randn() * 0.21
    const minor = randn() * 0.055
    return {
        x: clamp(0.5 + major * Math.cos(TRUE_ANGLE) - minor * Math.sin(TRUE_ANGLE), 0.03, 0.97),
        y: clamp(0.5 + major * Math.sin(TRUE_ANGLE) + minor * Math.cos(TRUE_ANGLE), 0.03, 0.97),
    }
})

const MEAN = {
    x: POINTS.reduce((s, p) => s + p.x, 0) / POINTS.length,
    y: POINTS.reduce((s, p) => s + p.y, 0) / POINTS.length,
}

// 2×2 covariance → first principal component angle, closed form.
const cov = POINTS.reduce(
    (a, p) => {
        const dx = p.x - MEAN.x
        const dy = p.y - MEAN.y
        return { xx: a.xx + dx * dx, yy: a.yy + dy * dy, xy: a.xy + dx * dy }
    },
    { xx: 0, yy: 0, xy: 0 },
)
const PC1_DEG = ((Math.atan2(2 * cov.xy, cov.xx - cov.yy) / 2) * 180) / Math.PI
const TOTAL_VAR = cov.xx + cov.yy

const PX = (x: number) => 20 + 320 * x
const PY = (y: number) => 250 - 240 * y

export function PcaViz() {
    const [deg, setDeg] = useState(120)
    const [showResiduals, setShowResiduals] = useState(false)

    const theta = (deg * Math.PI) / 180
    const dir = { x: Math.cos(theta), y: Math.sin(theta) }

    const { projections, captured } = useMemo(() => {
        let varSum = 0
        const projs = POINTS.map((p) => {
            const t = (p.x - MEAN.x) * dir.x + (p.y - MEAN.y) * dir.y
            varSum += t * t
            return { px: MEAN.x + t * dir.x, py: MEAN.y + t * dir.y, orig: p }
        })
        return { projections: projs, captured: varSum / TOTAL_VAR }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [deg])

    const axis = {
        x1: PX(MEAN.x - dir.x * 0.65), y1: PY(MEAN.y - dir.y * 0.65),
        x2: PX(MEAN.x + dir.x * 0.65), y2: PY(MEAN.y + dir.y * 0.65),
    }
    const snapDeg = Math.round(((PC1_DEG % 180) + 180) % 180)
    const atPc1 = Math.abs(deg - snapDeg) <= 1

    return (
        <VizPanel
            title="Hunt for the direction the data actually varies in"
            hint="Every dot drops a shadow (its projection) onto your axis. The variance meter is the spread of those shadows — rotate until it maxes out, or cheat and snap straight to the eigenvector."
        >
            <svg viewBox="0 0 360 270" className="w-full">
                <defs>
                    <clipPath id="pca-clip">
                        <rect x="20" y="10" width="320" height="240" />
                    </clipPath>
                </defs>
                <rect
                    x="20" y="10" width="320" height="240" rx="6"
                    className="fill-gray-100/60 dark:fill-white/[0.03] stroke-gray-300 dark:stroke-gray-700"
                    strokeWidth="1"
                />
                <g clipPath="url(#pca-clip)">
                    <line {...axis} stroke={atPc1 ? COLORS.emerald : COLORS.violet} strokeWidth="2.5" />
                    {showResiduals &&
                        projections.map((p, i) => (
                            <line
                                key={`r${i}`}
                                x1={PX(p.orig.x)} y1={PY(p.orig.y)} x2={PX(p.px)} y2={PY(p.py)}
                                stroke={COLORS.amber} strokeWidth="1" opacity="0.5"
                            />
                        ))}
                    {projections.map((p, i) => (
                        <circle key={`p${i}`} cx={PX(p.px)} cy={PY(p.py)} r="3"
                            fill={atPc1 ? COLORS.emerald : COLORS.violet} opacity="0.55" />
                    ))}
                    {POINTS.map((p, i) => (
                        <circle key={i} cx={PX(p.x)} cy={PY(p.y)} r="4" fill={COLORS.blue} opacity="0.85" />
                    ))}
                </g>
            </svg>

            <div className="mt-3 flex items-center gap-3">
                <div className="flex-1">
                    <VizSlider label="axis angle" value={deg} min={0} max={179} step={1} onChange={setDeg} format={(v) => `${v}°`} />
                </div>
            </div>
            <div className="mt-3 flex items-center gap-3">
                <span className="text-xs text-gray-600 dark:text-gray-300 whitespace-nowrap">variance captured</span>
                <div className="flex-1 h-3 rounded-full bg-gray-200 dark:bg-white/10 overflow-hidden">
                    <div
                        className="h-full rounded-full transition-all duration-200"
                        style={{
                            width: `${captured * 100}%`,
                            backgroundColor: atPc1 ? COLORS.emerald : COLORS.violet,
                        }}
                    />
                </div>
                <span className="text-xs font-mono font-semibold w-12 text-right text-gray-900 dark:text-white">
                    {(captured * 100).toFixed(0)}%
                </span>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
                <VizButton onClick={() => setDeg(snapDeg)} active={atPc1}>
                    {atPc1 ? 'on PC1 ✓' : '⤳ snap to PC1'}
                </VizButton>
                <VizButton onClick={() => setShowResiduals((s) => !s)} active={showResiduals}>
                    {showResiduals ? 'hide' : 'show'} reconstruction error
                </VizButton>
            </div>
        </VizPanel>
    )
}
