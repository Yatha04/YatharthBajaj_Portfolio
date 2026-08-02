import { useEffect, useMemo, useState } from 'react'
import { VizPanel, VizButton, VizSlider } from './primitives'
import { COLORS } from './utils'

// ─────────────── Panel 1: convolution, one window at a time ───────────────

const IMAGES: Record<string, number[][]> = {
    seven: [
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 1, 1, 1, 1, 1, 1, 0],
        [0, 0, 0, 0, 0, 1, 1, 0],
        [0, 0, 0, 0, 1, 1, 0, 0],
        [0, 0, 0, 1, 1, 0, 0, 0],
        [0, 0, 1, 1, 0, 0, 0, 0],
        [0, 0, 1, 1, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
    ],
    plus: [
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 1, 1, 0, 0, 0],
        [0, 0, 0, 1, 1, 0, 0, 0],
        [0, 1, 1, 1, 1, 1, 1, 0],
        [0, 1, 1, 1, 1, 1, 1, 0],
        [0, 0, 0, 1, 1, 0, 0, 0],
        [0, 0, 0, 1, 1, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
    ],
}

const KERNELS: Record<string, { k: number[][]; blurb: string }> = {
    'vertical edges': {
        k: [[1, 0, -1], [1, 0, -1], [1, 0, -1]],
        blurb: 'bright on the left, dark on the right → fires',
    },
    'horizontal edges': {
        k: [[1, 1, 1], [0, 0, 0], [-1, -1, -1]],
        blurb: 'bright above, dark below → fires',
    },
    'diagonal ↘': {
        k: [[2, 1, 0], [1, 0, -1], [0, -1, -2]],
        blurb: 'responds to ↘-oriented structure',
    },
}

const OUT = 6 // 8 − 3 + 1

export function CnnConvViz() {
    const [imageKey, setImageKey] = useState<keyof typeof IMAGES>('seven')
    const [kernelKey, setKernelKey] = useState<string>('vertical edges')
    const [pos, setPos] = useState(0)
    const [playing, setPlaying] = useState(false)

    const image = IMAGES[imageKey]
    const kernel = KERNELS[kernelKey].k

    useEffect(() => {
        if (!playing) return
        const id = setInterval(() => setPos((p) => (p + 1) % (OUT * OUT)), 200)
        return () => clearInterval(id)
    }, [playing])

    const { output, maxAbs } = useMemo(() => {
        const out: number[][] = []
        let m = 1
        for (let r = 0; r < OUT; r++) {
            out.push([])
            for (let c = 0; c < OUT; c++) {
                let s = 0
                for (let i = 0; i < 3; i++)
                    for (let j = 0; j < 3; j++) s += image[r + i][c + j] * kernel[i][j]
                out[r].push(s)
                m = Math.max(m, Math.abs(s))
            }
        }
        return { output: out, maxAbs: m }
    }, [image, kernel])

    const pr = Math.floor(pos / OUT)
    const pc = pos % OUT
    const current = output[pr][pc]

    const heat = (v: number) => {
        const t = (v / maxAbs + 1) / 2 // 0..1, 0.5 = zero
        const mix = (a: number, b: number) => Math.round(a + (b - a) * t)
        return `rgb(${mix(56, 251)}, ${mix(189, 113)}, ${mix(248, 133)})`
    }

    const CELL = 17

    return (
        <VizPanel
            title="One kernel, sliding everywhere"
            hint="A 3×3 kernel slides across the image; each stop is just a dot product. The same nine weights scan every location — that weight sharing is why a CNN needs thousands of parameters where a dense net needs millions. Switch kernels and watch the feature map change its mind about what matters."
        >
            <div className="flex flex-wrap gap-2 mb-1">
                {(Object.keys(IMAGES) as Array<keyof typeof IMAGES>).map((k) => (
                    <VizButton key={k} onClick={() => setImageKey(k)} active={imageKey === k}>
                        draw “{k}”
                    </VizButton>
                ))}
                <span className="w-3" />
                {Object.keys(KERNELS).map((k) => (
                    <VizButton key={k} onClick={() => setKernelKey(k)} active={kernelKey === k}>
                        {k}
                    </VizButton>
                ))}
            </div>

            <svg viewBox="0 0 380 175" className="w-full">
                {/* input */}
                {image.map((row, r) =>
                    row.map((v, c) => (
                        <rect key={`i${r}-${c}`}
                            x={14 + c * CELL} y={18 + r * CELL} width={CELL - 1.5} height={CELL - 1.5} rx="2"
                            className={v ? 'fill-gray-800 dark:fill-gray-200' : 'fill-gray-200/70 dark:fill-white/[0.07]'}
                        />
                    )),
                )}
                <rect
                    x={14 + pc * CELL - 1.5} y={18 + pr * CELL - 1.5}
                    width={CELL * 3 + 1.5} height={CELL * 3 + 1.5} rx="3"
                    fill="none" stroke={COLORS.amber} strokeWidth="2.5"
                    style={{ transition: 'x 150ms ease, y 150ms ease' }}
                />
                <text x={14 + 4 * CELL} y="12" textAnchor="middle" fontSize="9" className="fill-gray-500 dark:fill-gray-400">input 8×8</text>

                {/* kernel */}
                <text x="186" y="46" textAnchor="middle" fontSize="13" className="fill-gray-500 dark:fill-gray-400">×</text>
                {kernel.map((row, r) =>
                    row.map((v, c) => (
                        <g key={`k${r}-${c}`}>
                            <rect x={160 + c * 18} y={58 + r * 18} width="16.5" height="16.5" rx="2"
                                fill={heat(v * (maxAbs / 2.2))} opacity="0.9" />
                            <text x={168 + c * 18} y={70 + r * 18} textAnchor="middle" fontSize="8"
                                fontWeight="700" fill="rgba(0,0,0,0.65)">
                                {v}
                            </text>
                        </g>
                    )),
                )}
                <text x={186} y="130" textAnchor="middle" fontSize="13" className="fill-gray-500 dark:fill-gray-400">=</text>
                <text x={186} y="151" textAnchor="middle" fontSize="11" fontWeight="700" className="fill-gray-900 dark:fill-white">
                    {current}
                </text>
                <text x="186" y="28" textAnchor="middle" fontSize="9" className="fill-gray-500 dark:fill-gray-400">kernel</text>

                {/* output */}
                {output.map((row, r) =>
                    row.map((v, c) => {
                        const idx = r * OUT + c
                        const revealed = idx <= pos
                        return (
                            <rect key={`o${r}-${c}`}
                                x={232 + c * 21} y={26 + r * 21} width="19.5" height="19.5" rx="2"
                                fill={revealed ? heat(v) : 'transparent'}
                                className={revealed ? '' : 'fill-gray-200/40 dark:fill-white/[0.04]'}
                                stroke={idx === pos ? COLORS.amber : 'transparent'}
                                strokeWidth="2"
                            />
                        )
                    }),
                )}
                <text x={232 + 3 * 21} y="16" textAnchor="middle" fontSize="9" className="fill-gray-500 dark:fill-gray-400">feature map 6×6</text>
            </svg>

            <div className="mt-2 flex flex-col sm:flex-row gap-3 sm:items-center">
                <VizButton onClick={() => setPlaying((p) => !p)} active={playing}>
                    {playing ? '⏸ pause' : '▶ slide'}
                </VizButton>
                <div className="flex-1">
                    <VizSlider label="window" value={pos} min={0} max={OUT * OUT - 1} step={1} onChange={(v) => { setPlaying(false); setPos(v) }} />
                </div>
            </div>
            <p className="mt-2 text-[11px] text-gray-500 dark:text-gray-400">{KERNELS[kernelKey].blurb}</p>
        </VizPanel>
    )
}

// ─────────────── Panel 2: LeNet → AlexNet, fourteen years apart ───────────────

interface Block {
    label: string
    sub: string
    kind: 'in' | 'conv' | 'pool' | 'fc' | 'out'
    h: number
}

const LENET: Block[] = [
    { label: '32²', sub: 'input', kind: 'in', h: 56 },
    { label: '6@28²', sub: 'conv', kind: 'conv', h: 50 },
    { label: '6@14²', sub: 'pool', kind: 'pool', h: 36 },
    { label: '16@10²', sub: 'conv', kind: 'conv', h: 30 },
    { label: '16@5²', sub: 'pool', kind: 'pool', h: 22 },
    { label: '120', sub: 'fc', kind: 'fc', h: 44 },
    { label: '84', sub: 'fc', kind: 'fc', h: 36 },
    { label: '10', sub: 'digits', kind: 'out', h: 18 },
]

const ALEXNET: Block[] = [
    { label: '227²×3', sub: 'input', kind: 'in', h: 64 },
    { label: '96@55²', sub: 'conv 11×11', kind: 'conv', h: 56 },
    { label: '96@27²', sub: 'pool', kind: 'pool', h: 44 },
    { label: '256@27²', sub: 'conv 5×5', kind: 'conv', h: 50 },
    { label: '256@13²', sub: 'pool', kind: 'pool', h: 38 },
    { label: '384@13²', sub: 'conv 3×3', kind: 'conv', h: 42 },
    { label: '384@13²', sub: 'conv 3×3', kind: 'conv', h: 42 },
    { label: '256@13²', sub: 'conv 3×3', kind: 'conv', h: 40 },
    { label: '256@6²', sub: 'pool', kind: 'pool', h: 30 },
    { label: '4096', sub: 'fc', kind: 'fc', h: 58 },
    { label: '4096', sub: 'fc', kind: 'fc', h: 58 },
    { label: '1000', sub: 'classes', kind: 'out', h: 26 },
]

const KIND_COLOR: Record<Block['kind'], string> = {
    in: COLORS.gray,
    conv: COLORS.violet,
    pool: COLORS.blue,
    fc: COLORS.emerald,
    out: COLORS.amber,
}

function ArchRow({ blocks, width }: { blocks: Block[]; width: number }) {
    const gap = 8
    const bw = (width - gap * (blocks.length - 1)) / blocks.length
    return (
        <g>
            {blocks.map((b, i) => {
                const x = i * (bw + gap)
                return (
                    <g key={i} className="group">
                        <rect
                            x={x} y={40 - b.h / 2} width={bw} height={b.h} rx="4"
                            fill={KIND_COLOR[b.kind]} opacity="0.85"
                        >
                            <title>{`${b.sub}: ${b.label}`}</title>
                        </rect>
                        {i < blocks.length - 1 && (
                            <line x1={x + bw} y1="40" x2={x + bw + gap} y2="40"
                                className="stroke-gray-400 dark:stroke-gray-500" strokeWidth="1" />
                        )}
                        <text x={x + bw / 2} y="92" textAnchor="middle" fontSize="6.5"
                            className="fill-gray-600 dark:fill-gray-300 font-mono">
                            {b.label}
                        </text>
                        <text x={x + bw / 2} y="100" textAnchor="middle" fontSize="5.5"
                            className="fill-gray-400 dark:fill-gray-500">
                            {b.sub}
                        </text>
                    </g>
                )
            })}
        </g>
    )
}

export function CnnArchViz() {
    return (
        <VizPanel
            title="Fourteen years between siblings"
            hint="Same idea, different century of compute: convolve, pool, repeat, then decide. LeNet read 10% of America's checks in the late 90s; AlexNet's 2012 ImageNet win (with ~1000× the parameters, two GPUs, and ReLU + dropout) is the moment 'deep learning' stopped being a niche term."
        >
            <svg viewBox="0 0 380 115" className="w-full">
                <text x="0" y="10" fontSize="9" fontWeight="600" className="fill-gray-700 dark:fill-gray-200">
                    LeNet-5 · 1998 · ~60K params
                </text>
                <g transform="translate(0, 14)">
                    <ArchRow blocks={LENET} width={380} />
                </g>
            </svg>
            <svg viewBox="0 0 380 115" className="w-full mt-2">
                <text x="0" y="10" fontSize="9" fontWeight="600" className="fill-gray-700 dark:fill-gray-200">
                    AlexNet · 2012 · ~60M params
                </text>
                <g transform="translate(0, 14)">
                    <ArchRow blocks={ALEXNET} width={380} />
                </g>
            </svg>

            <div className="mt-4">
                <div className="text-[10px] uppercase tracking-wide text-gray-400 mb-1.5">parameters (log scale)</div>
                <div className="flex items-center gap-2 text-xs">
                    <span className="w-16 font-mono text-gray-600 dark:text-gray-300">LeNet</span>
                    <div className="h-3 rounded-full" style={{ width: '32%', backgroundColor: COLORS.violet }} />
                    <span className="font-mono text-gray-500">60K</span>
                </div>
                <div className="flex items-center gap-2 text-xs mt-1.5">
                    <span className="w-16 font-mono text-gray-600 dark:text-gray-300">AlexNet</span>
                    <div className="h-3 rounded-full" style={{ width: '64%', backgroundColor: COLORS.amber }} />
                    <span className="font-mono text-gray-500">60M (×1000)</span>
                </div>
            </div>
            <div className="mt-3 flex flex-wrap gap-3 text-[10px] text-gray-500 dark:text-gray-400">
                {(['conv', 'pool', 'fc', 'out'] as const).map((k) => (
                    <span key={k} className="inline-flex items-center gap-1">
                        <span className="w-2.5 h-2.5 rounded-sm inline-block" style={{ backgroundColor: KIND_COLOR[k] }} />
                        {k === 'out' ? 'output' : k === 'fc' ? 'fully connected' : k}
                    </span>
                ))}
            </div>
        </VizPanel>
    )
}
