import { useRef, useState, useEffect, useCallback } from 'react'
import { prepare, layout, type PreparedText } from '@chenglou/pretext'

/**
 * Uses pretext to calculate the expanded height of text content
 * without DOM reflow — pure canvas font metrics.
 */
export function usePretextHeight(
  texts: string[],
  tagCount: number
) {
  const panelRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const [height, setHeight] = useState(0)
  const preparedRef = useRef<PreparedText[]>([])
  const prevFontRef = useRef('')

  const calculate = useCallback(() => {
    const panel = panelRef.current
    const content = contentRef.current
    if (!panel || !content) return

    // Get the width available for text content
    const panelWidth = panel.getBoundingClientRect().width
    if (panelWidth === 0) return

    // Read computed font from the content element
    const styles = getComputedStyle(content)
    const font = styles.font.length > 0
      ? styles.font
      : `${styles.fontStyle} ${styles.fontWeight} ${styles.fontSize} / ${styles.lineHeight} ${styles.fontFamily}`
    const lineHeight = parseFloat(styles.lineHeight) || parseFloat(styles.fontSize) * 1.5

    // Account for padding inside the content div
    const paddingLeft = parseFloat(styles.paddingLeft) || 0
    const paddingRight = parseFloat(styles.paddingRight) || 0
    const textWidth = panelWidth - paddingLeft - paddingRight

    if (textWidth <= 0) return

    // Re-prepare text if font changed
    if (prevFontRef.current !== font) {
      prevFontRef.current = font
      preparedRef.current = texts.map(t => prepare(t, font))
    }

    // Calculate total text height from all achievement lines
    let totalHeight = 0

    // Top padding (pt-3 = 12px)
    totalHeight += 12

    // Achievement list: each item's text height + spacing between items (space-y-1.5 = 6px)
    for (let i = 0; i < preparedRef.current.length; i++) {
      const metrics = layout(preparedRef.current[i]!, textWidth, lineHeight)
      totalHeight += Math.ceil(metrics.height)
      if (i < preparedRef.current.length - 1) {
        totalHeight += 6 // space-y-1.5
      }
    }

    // Tags row if tags exist (mt-3 = 12px gap, ~28px per row of tags)
    if (tagCount > 0) {
      totalHeight += 12 // mt-3 margin
      // Estimate tag rows: each tag is roughly 80px wide with gap
      const tagsPerRow = Math.max(1, Math.floor(textWidth / 80))
      const tagRows = Math.ceil(tagCount / tagsPerRow)
      totalHeight += tagRows * 28 // each row ~28px (text-xs + py-0.5 + gap-1.5)
    }

    // Bottom breathing room
    totalHeight += 4

    setHeight(totalHeight)
  }, [texts, tagCount])

  useEffect(() => {
    // Wait for fonts to load before calculating
    document.fonts.ready.then(() => {
      calculate()
    })

    // Recalculate on resize via ResizeObserver
    const panel = panelRef.current
    if (!panel) return

    const observer = new ResizeObserver(() => {
      calculate()
    })
    observer.observe(panel)

    return () => {
      observer.disconnect()
    }
  }, [calculate])

  return { panelRef, contentRef, height }
}
