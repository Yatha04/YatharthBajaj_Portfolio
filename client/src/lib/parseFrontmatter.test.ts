import { describe, it, expect } from 'vitest'
import { parseFrontmatter } from './parseFrontmatter'

describe('parseFrontmatter', () => {
  it('parses basic key-value pairs', () => {
    const raw = `---\ntitle: Hello World\ndate: 2025-01-01\n---\nBody text here`
    const { meta, body } = parseFrontmatter(raw)
    expect(meta.title).toBe('Hello World')
    expect(meta.date).toBe('2025-01-01')
    expect(body).toBe('Body text here')
  })

  it('strips double quotes from values', () => {
    const raw = `---\ntitle: "Quoted Title"\n---\nBody`
    expect(parseFrontmatter(raw).meta.title).toBe('Quoted Title')
  })

  it('strips single quotes from values', () => {
    const raw = `---\ntitle: 'Single Quoted'\n---\nBody`
    expect(parseFrontmatter(raw).meta.title).toBe('Single Quoted')
  })

  it('returns empty meta and raw string when no frontmatter', () => {
    const raw = 'Just plain text, no frontmatter'
    const { meta, body } = parseFrontmatter(raw)
    expect(meta).toEqual({})
    expect(body).toBe(raw)
  })

  it('handles CRLF line endings (Windows-style files)', () => {
    const raw = `---\r\ntitle: Win\r\n---\r\nBody`
    expect(parseFrontmatter(raw).meta.title).toBe('Win')
  })

  it('handles values with colons in them', () => {
    const raw = `---\nlink: https://example.com/path\n---\nBody`
    expect(parseFrontmatter(raw).meta.link).toBe('https://example.com/path')
  })

  it('trims whitespace from keys and values', () => {
    const raw = `---\n  title :   Spaced Out  \n---\nBody`
    expect(parseFrontmatter(raw).meta.title).toBe('Spaced Out')
  })

  it('returns trimmed body text', () => {
    const raw = `---\ntitle: T\n---\n\n\nBody with leading newlines`
    expect(parseFrontmatter(raw).body).toBe('Body with leading newlines')
  })

  it('handles missing optional fields gracefully', () => {
    const raw = `---\ntitle: Only Title\n---\nBody`
    const { meta } = parseFrontmatter(raw)
    expect(meta.description).toBeUndefined()
    expect(meta.link).toBeUndefined()
  })
})
