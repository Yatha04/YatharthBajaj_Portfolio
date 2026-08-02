// Shared math + drawing helpers for the "How Machines Learn" visualizations.

export const clamp = (v: number, lo: number, hi: number) =>
    Math.min(hi, Math.max(lo, v))

export const gauss = (x: number, mu: number, sigma: number) =>
    Math.exp(-((x - mu) ** 2) / (2 * sigma * sigma)) / (sigma * Math.sqrt(2 * Math.PI))

export const sigmoid = (z: number) => 1 / (1 + Math.exp(-z))

/** Deterministic PRNG so the scatter plots look identical on every visit. */
export function mulberry32(seed: number) {
    let a = seed
    return () => {
        a |= 0
        a = (a + 0x6d2b79f5) | 0
        let t = Math.imul(a ^ (a >>> 15), 1 | a)
        t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296
    }
}

/** Approximate a standard normal sample from a uniform PRNG (Box–Muller). */
export function gaussianSampler(rand: () => number) {
    return () => {
        const u = Math.max(rand(), 1e-9)
        const v = rand()
        return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v)
    }
}

/** Build an SVG path string from a list of [x, y] pixel points. */
export const linePath = (pts: Array<[number, number]>) =>
    pts.map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${x.toFixed(2)},${y.toFixed(2)}`).join(' ')

// Shared palette — vivid enough to read on both light and dark backgrounds.
export const COLORS = {
    blue: '#38bdf8',
    rose: '#fb7185',
    emerald: '#34d399',
    amber: '#fbbf24',
    violet: '#a78bfa',
    gray: '#9ca3af',
}
