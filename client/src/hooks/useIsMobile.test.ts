import { renderHook } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { useIsMobile } from './useIsMobile'

function mockMatchMedia(matches: boolean) {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn((query: string) => ({
      matches,
      media: query,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    })),
  })
}

describe('useIsMobile', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
  })

  it('returns true when viewport is mobile-sized', () => {
    Object.defineProperty(window, 'innerWidth', { writable: true, value: 375 })
    mockMatchMedia(true)
    const { result } = renderHook(() => useIsMobile())
    expect(result.current).toBe(true)
  })

  it('returns false when viewport is desktop-sized', () => {
    Object.defineProperty(window, 'innerWidth', { writable: true, value: 1440 })
    mockMatchMedia(false)
    const { result } = renderHook(() => useIsMobile())
    expect(result.current).toBe(false)
  })

  it('returns false at exactly the 768px breakpoint', () => {
    Object.defineProperty(window, 'innerWidth', { writable: true, value: 768 })
    mockMatchMedia(false) // 768 is NOT mobile (breakpoint is < 768)
    const { result } = renderHook(() => useIsMobile())
    expect(result.current).toBe(false)
  })
})
