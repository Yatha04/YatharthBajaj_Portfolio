import { useState } from 'react'
import { VizPanel, VizSlider, VizButton } from './primitives'
import { COLORS } from './utils'

// Fukushima's Neocognitron (1980): alternating S-cells (feature detectors)
// and C-cells (pooling for tolerance). Slide the pattern: the S-response
// moves with it, but the pooled C-cell response never flinches.
// That S/C alternation is, almost line for line, conv + pooling in a CNN.

const INPUT_LEN = 11
const PATTERN = 3
const S_LEN = INPUT_LEN - PATTERN + 1 // 9 detectors

export function NeocognitronViz() {
    const [pos, setPos] = useState(3)
    const [present, setPresent] = useState(true)

    const input = Array.from({ length: INPUT_LEN }, (_, i) =>
        present && i >= pos && i < pos + PATTERN ? 1 : 0,
    )
    const sCells = Array.from({ length: S_LEN }, (_, i) =>
        input[i] === 1 && input[i + 1] === 1 && input[i + 2] === 1 ? 1 : 0,
    )
    const cActive = sCells.some((s) => s === 1)

    const CELL = 26
    const inputX = (i: number) => 38 + i * (CELL + 3)
    const sX = (i: number) => 38 + (CELL + 3) + i * (CELL + 3)

    return (
        <VizPanel
            title="Shift the pattern — the top cell doesn't care"
            hint="S-cells are rigid: each one fires only for the feature at its exact location, so the active one slides with the pattern. The C-cell pools over all of them and answers a calmer question — 'is the feature anywhere?' Stack this trick and you get tolerance to shift, scale, and distortion. Sound familiar? It became convolution + pooling."
        >
            <svg viewBox="0 0 380 230" className="w-full">
                {/* input row */}
                <text x="8" y="208" fontSize="9" className="fill-gray-500 dark:fill-gray-400">input</text>
                {input.map((v, i) => (
                    <rect key={`i${i}`} x={inputX(i)} y="190" width={CELL} height={CELL} rx="4"
                        fill={v ? COLORS.blue : 'transparent'}
                        className={v ? '' : 'fill-gray-200/70 dark:fill-white/[0.06]'}
                        style={{ transition: 'fill 150ms ease' }}
                    />
                ))}

                {/* connections from window to the active S cell */}
                {sCells.map((v, i) =>
                    v ? (
                        <g key={`fan${i}`}>
                            {[0, 1, 2].map((d) => (
                                <line key={d}
                                    x1={inputX(i + d) + CELL / 2} y1="190"
                                    x2={sX(i) + CELL / 2} y2={120 + CELL}
                                    stroke={COLORS.amber} strokeWidth="1.5" opacity="0.7"
                                />
                            ))}
                        </g>
                    ) : null,
                )}

                {/* S layer */}
                <text x="8" y="138" fontSize="9" className="fill-gray-500 dark:fill-gray-400">S-cells</text>
                {sCells.map((v, i) => (
                    <rect key={`s${i}`} x={sX(i)} y="120" width={CELL} height={CELL} rx="13"
                        fill={v ? COLORS.amber : 'transparent'}
                        className={v ? '' : 'fill-gray-200/70 dark:fill-white/[0.06]'}
                        style={{ transition: 'fill 150ms ease' }}
                    />
                ))}

                {/* pooling fan to C cell */}
                {sCells.map((v, i) => (
                    <line key={`pool${i}`}
                        x1={sX(i) + CELL / 2} y1="120" x2="190" y2="78"
                        className={v ? '' : 'stroke-gray-300 dark:stroke-gray-600'}
                        stroke={v ? COLORS.emerald : undefined}
                        strokeWidth={v ? 2 : 0.8}
                        opacity={v ? 0.9 : 0.5}
                    />
                ))}

                {/* C cell */}
                <text x="8" y="55" fontSize="9" className="fill-gray-500 dark:fill-gray-400">C-cell</text>
                <circle cx="190" cy="48" r="22"
                    fill={cActive ? COLORS.emerald : 'transparent'}
                    className={cActive ? '' : 'fill-gray-200/70 dark:fill-white/[0.06]'}
                    style={{ transition: 'fill 200ms ease' }}
                />
                <text x="190" y="52" textAnchor="middle" fontSize="11" fontWeight="700"
                    className={cActive ? 'fill-white' : 'fill-gray-400 dark:fill-gray-500'}>
                    {cActive ? 'ON' : 'off'}
                </text>
                <text x="226" y="44" fontSize="10" className="fill-gray-600 dark:fill-gray-300">
                    “feature detected
                </text>
                <text x="226" y="57" fontSize="10" className="fill-gray-600 dark:fill-gray-300">
                    {cActive ? 'somewhere” ✓' : 'somewhere” …'}
                </text>
            </svg>

            <div className="mt-3 flex flex-col sm:flex-row gap-3 sm:items-center">
                <div className="flex-1">
                    <VizSlider label="pattern position" value={pos} min={0} max={INPUT_LEN - PATTERN} step={1} onChange={setPos} />
                </div>
                <VizButton onClick={() => setPresent((p) => !p)} active={!present}>
                    {present ? 'remove pattern' : 'restore pattern'}
                </VizButton>
            </div>
        </VizPanel>
    )
}
