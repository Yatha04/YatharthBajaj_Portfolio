import type { ReactNode } from 'react'

/** Card wrapper that gives every visualization a consistent frame. */
export function VizPanel({
    title,
    hint,
    children,
}: {
    title?: string
    hint?: string
    children: ReactNode
}) {
    return (
        <figure className="rounded-xl border border-border/40 bg-white/70 dark:bg-white/5 backdrop-blur-sm p-4 md:p-5 shadow-sm">
            {title && (
                <figcaption className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gray-500 dark:text-gray-400 mb-3">
                    {title}
                </figcaption>
            )}
            {children}
            {hint && (
                <p className="mt-3 text-xs italic text-gray-500 dark:text-gray-400 leading-relaxed">
                    {hint}
                </p>
            )}
        </figure>
    )
}

export function VizButton({
    onClick,
    children,
    active = false,
    disabled = false,
}: {
    onClick: () => void
    children: ReactNode
    active?: boolean
    disabled?: boolean
}) {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors disabled:opacity-40 disabled:cursor-not-allowed ${
                active
                    ? 'bg-gray-900 text-white border-gray-900 dark:bg-white dark:text-gray-900 dark:border-white'
                    : 'bg-transparent text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:border-gray-500 dark:hover:border-gray-400'
            }`}
        >
            {children}
        </button>
    )
}

export function VizSlider({
    label,
    value,
    min,
    max,
    step = 1,
    onChange,
    format,
}: {
    label: string
    value: number
    min: number
    max: number
    step?: number
    onChange: (v: number) => void
    format?: (v: number) => string
}) {
    return (
        <label className="flex items-center gap-3 text-xs text-gray-600 dark:text-gray-300 min-w-0">
            <span className="whitespace-nowrap">{label}</span>
            <input
                type="range"
                min={min}
                max={max}
                step={step}
                value={value}
                onChange={(e) => onChange(Number(e.target.value))}
                className="flex-1 min-w-[80px] accent-gray-900 dark:accent-white"
            />
            <span className="font-mono tabular-nums whitespace-nowrap text-gray-900 dark:text-white">
                {format ? format(value) : value}
            </span>
        </label>
    )
}

export function LegendDot({ color, label }: { color: string; label: string }) {
    return (
        <span className="inline-flex items-center gap-1.5 text-xs text-gray-600 dark:text-gray-300">
            <span
                className="inline-block w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: color }}
            />
            {label}
        </span>
    )
}
