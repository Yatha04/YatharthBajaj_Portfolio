import { useEffect, useRef, useCallback, useState } from 'react'
import { prepareWithSegments, layoutWithLines } from '@chenglou/pretext'

interface Particle {
  x: number
  y: number
  targetX: number
  targetY: number
  vx: number
  vy: number
  size: number
  baseAlpha: number
}

interface ParticleTextProps {
  text: string
  subtitlePrefix?: string
  subtitleWords?: string[]
  className?: string
  onClick?: () => void
}

const NAME_FONT = 'Geist'
const SUBTITLE_FONT = 'Special Elite'
const MOUSE_RADIUS = 120
const MOUSE_FORCE = 10
const SPRING = 0.035
const FRICTION = 0.82
const SAMPLE_GAP = 3
const PARTICLE_SIZE_MIN = 1.2
const PARTICLE_SIZE_MAX = 2.4

function useTypewriter(words: string[], speed = 100, delay = 2000) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [currentText, setCurrentText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const currentWord = words[currentWordIndex]

    if (isDeleting) {
      if (currentText === '') {
        setIsDeleting(false)
        setCurrentWordIndex((prev) => (prev + 1) % words.length)
        return
      }
      const timeout = setTimeout(() => {
        setCurrentText(currentText.slice(0, -1))
      }, speed / 2)
      return () => clearTimeout(timeout)
    } else {
      if (currentText === currentWord) {
        const timeout = setTimeout(() => {
          setIsDeleting(true)
        }, delay)
        return () => clearTimeout(timeout)
      }
      const timeout = setTimeout(() => {
        setCurrentText(currentWord.slice(0, currentText.length + 1))
      }, speed)
      return () => clearTimeout(timeout)
    }
  }, [currentText, currentWordIndex, isDeleting, words, speed, delay])

  return currentText
}

export function ParticleText({
  text,
  subtitlePrefix = '',
  subtitleWords = [],
  className,
  onClick,
}: ParticleTextProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const mouseRef = useRef({ x: -9999, y: -9999 })
  const animFrameRef = useRef<number>(0)
  const layoutRef = useRef({ nameY: 0, fontSize: 0 })

  const typedText = useTypewriter(subtitleWords.length > 0 ? subtitleWords : [''], 100, 2000)

  const buildParticles = useCallback((canvas: HTMLCanvasElement) => {
    const dpr = window.devicePixelRatio || 1
    const rect = canvas.getBoundingClientRect()
    const w = rect.width
    const h = rect.height

    if (w === 0 || h === 0) return

    // Use integer pixel dimensions to avoid fractional index bugs
    const cw = Math.round(w * dpr)
    const ch = Math.round(h * dpr)
    canvas.width = cw
    canvas.height = ch

    // Big font — scales with viewport, caps at 160px
    const fontSize = Math.min(w * 0.12, 160)
    const font = `bold ${fontSize}px "${NAME_FONT}", sans-serif`
    const lineHeight = fontSize * 1.2

    // Use pretext to measure and lay out the text
    const prepared = prepareWithSegments(text, font)
    const { lines } = layoutWithLines(prepared, w, lineHeight)

    // Center the name vertically (shifted up a bit to leave room for subtitle)
    const totalTextHeight = lines.length * lineHeight
    const yOffset = (h - totalTextHeight) / 2 - fontSize * 0.3

    layoutRef.current = { nameY: yOffset + totalTextHeight, fontSize }

    // Render text to offscreen canvas to sample pixel positions
    const offscreen = document.createElement('canvas')
    offscreen.width = cw
    offscreen.height = ch
    const offCtx = offscreen.getContext('2d')!
    offCtx.scale(dpr, dpr)
    offCtx.font = font
    offCtx.fillStyle = '#ffffff'
    offCtx.textBaseline = 'top'

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i]
      const x = (w - line.width) / 2
      const y = yOffset + i * lineHeight
      offCtx.fillText(line.text, x, y)
    }

    // Sample pixels to create particles
    const imageData = offCtx.getImageData(0, 0, cw, ch)
    const pixels = imageData.data
    const particles: Particle[] = []
    const gap = Math.max(Math.round(SAMPLE_GAP * dpr), 1)

    for (let py = 0; py < ch; py += gap) {
      for (let px = 0; px < cw; px += gap) {
        const i = (py * cw + px) * 4
        const alpha = pixels[i + 3]
        if (alpha > 128) {
          const cx = px / dpr
          const cy = py / dpr
          particles.push({
            x: cx + (Math.random() - 0.5) * w * 0.8,
            y: cy + (Math.random() - 0.5) * h * 0.8,
            targetX: cx,
            targetY: cy,
            vx: 0,
            vy: 0,
            size: PARTICLE_SIZE_MIN + Math.random() * (PARTICLE_SIZE_MAX - PARTICLE_SIZE_MIN),
            baseAlpha: 0.7 + Math.random() * 0.3,
          })
        }
      }
    }

    console.log('ParticleText: canvas', w, 'x', h, '| particles:', particles.length, '| lines:', lines.length, '| fontSize:', fontSize)
    particlesRef.current = particles
  }, [text])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    Promise.all([
      document.fonts.load(`10px "${NAME_FONT}"`),
      document.fonts.load(`10px "${SUBTITLE_FONT}"`)
    ]).then(() => {
      buildParticles(canvas)
    })

    const handleResize = () => {
      if (canvas) buildParticles(canvas)
    }
    window.addEventListener('resize', handleResize)

    // Track mouse globally so particles respond even when cursor is over empty space
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      }
    }
    const handleMouseLeave = () => {
      mouseRef.current = { x: -9999, y: -9999 }
    }

    window.addEventListener('mousemove', handleMouseMove)
    canvas.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('mousemove', handleMouseMove)
      canvas.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [buildParticles])

  // Separate animation loop so it can read typedText from ref
  const typedTextRef = useRef(typedText)
  typedTextRef.current = typedText

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const animate = () => {
      const ctx = canvas.getContext('2d')
      if (!ctx) return

      const dpr = window.devicePixelRatio || 1
      const w = canvas.width / dpr

      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.save()
      ctx.scale(dpr, dpr)

      const mx = mouseRef.current.x
      const my = mouseRef.current.y
      const particles = particlesRef.current

      // Draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]

        const dx = p.targetX - p.x
        const dy = p.targetY - p.y
        p.vx += dx * SPRING
        p.vy += dy * SPRING

        const mdx = p.x - mx
        const mdy = p.y - my
        const dist = Math.sqrt(mdx * mdx + mdy * mdy)
        if (dist < MOUSE_RADIUS && dist > 0) {
          const force = (MOUSE_RADIUS - dist) / MOUSE_RADIUS * MOUSE_FORCE
          p.vx += (mdx / dist) * force
          p.vy += (mdy / dist) * force
        }

        p.vx *= FRICTION
        p.vy *= FRICTION
        p.x += p.vx
        p.y += p.vy

        const displacement = Math.sqrt(dx * dx + dy * dy)
        const blueTint = Math.min(displacement / 60, 1)
        const r = Math.round(255 - blueTint * 100)
        const g = Math.round(255 - blueTint * 70)
        const b = 255

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${p.baseAlpha})`
        ctx.fill()
      }

      // Draw subtitle text below the particle name
      if (subtitlePrefix || typedTextRef.current) {
        const { nameY, fontSize } = layoutRef.current
        const subSize = Math.max(fontSize * 0.22, 18)
        const subY = nameY + subSize * 1.5

        ctx.textAlign = 'center'
        ctx.textBaseline = 'top'

        // "I love " in gray
        const prefix = subtitlePrefix
        const typed = typedTextRef.current
        const fullText = prefix + typed + '|'

        // Measure prefix width to color them differently
        ctx.font = `${subSize}px "${SUBTITLE_FONT}", sans-serif`
        const prefixWidth = ctx.measureText(prefix).width
        const typedWidth = ctx.measureText(typed).width
        const totalWidth = ctx.measureText(fullText.slice(0, -1)).width
        const cursorWidth = ctx.measureText('|').width

        const startX = w / 2 - (totalWidth + cursorWidth) / 2

        // Draw prefix
        ctx.textAlign = 'left'
        ctx.fillStyle = 'rgba(209, 213, 219, 0.9)'
        ctx.fillText(prefix, startX, subY)

        // Draw typed word in blue
        ctx.fillStyle = 'rgba(96, 165, 250, 0.95)'
        ctx.font = `bold ${subSize}px "${SUBTITLE_FONT}", sans-serif`
        ctx.fillText(typed, startX + prefixWidth, subY)

        // Draw blinking cursor
        const now = Date.now()
        const cursorAlpha = Math.sin(now * 0.005) * 0.4 + 0.6
        ctx.fillStyle = `rgba(96, 165, 250, ${cursorAlpha})`
        ctx.fillText('|', startX + prefixWidth + typedWidth, subY)
      }

      ctx.restore()
      animFrameRef.current = requestAnimationFrame(animate)
    }

    animFrameRef.current = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(animFrameRef.current)
    }
  }, [subtitlePrefix])

  return (
    <canvas
      ref={canvasRef}
      className={className}
      onClick={onClick}
    />
  )
}
