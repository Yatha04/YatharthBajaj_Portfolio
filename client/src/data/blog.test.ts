import { describe, it, expect } from 'vitest'

// Isolated sort logic mirrored from blog.ts — tests the comparator in isolation
const sortByDate = (a: { date: string }, b: { date: string }) => {
  const da = new Date(a.date).getTime()
  const db = new Date(b.date).getTime()
  return (isNaN(db) ? 0 : db) - (isNaN(da) ? 0 : da)
}

describe('blog entry date sorting', () => {
  it('sorts newest entry first', () => {
    const entries = [
      { date: '2024-01-01' },
      { date: '2025-06-01' },
      { date: '2024-06-15' },
    ]
    const sorted = [...entries].sort(sortByDate)
    expect(sorted[0].date).toBe('2025-06-01')
    expect(sorted[2].date).toBe('2024-01-01')
  })

  it('puts entries with an empty date string at the end', () => {
    const entries = [{ date: '' }, { date: '2025-01-01' }]
    const sorted = [...entries].sort(sortByDate)
    expect(sorted[0].date).toBe('2025-01-01')
    expect(sorted[1].date).toBe('')
  })

  it('handles two entries with the same date without throwing', () => {
    const entries = [{ date: '2025-03-01' }, { date: '2025-03-01' }]
    expect(() => [...entries].sort(sortByDate)).not.toThrow()
  })

  it('returns a stable order for a single entry', () => {
    const entries = [{ date: '2025-01-01' }]
    expect([...entries].sort(sortByDate)).toEqual(entries)
  })
})
