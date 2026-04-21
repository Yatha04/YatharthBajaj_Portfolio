import { useEffect, useRef, useCallback } from 'react';

interface Dot {
  baseX: number;
  baseY: number;
  currentRadius: number;
  currentOpacity: number;
  targetRadius: number;
  targetOpacity: number;
}

const DOT_SPACING = 32;
const BASE_RADIUS = 1.2;
const MAX_RADIUS = 3.5;
const BASE_OPACITY = 0.12;
const MAX_OPACITY = 0.6;
const INFLUENCE_RADIUS = 140;
const LERP_SPEED = 0.08;

export const AnimatedBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dotsRef = useRef<Dot[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const animFrameRef = useRef<number>(0);
  const columnsRef = useRef(0);
  const rowsRef = useRef(0);

  const buildGrid = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const cols = Math.ceil(canvas.width / DOT_SPACING) + 1;
    const rows = Math.ceil(canvas.height / DOT_SPACING) + 1;
    columnsRef.current = cols;
    rowsRef.current = rows;

    const offsetX = (canvas.width - (cols - 1) * DOT_SPACING) / 2;
    const offsetY = (canvas.height - (rows - 1) * DOT_SPACING) / 2;

    const dots: Dot[] = [];
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        dots.push({
          baseX: offsetX + col * DOT_SPACING,
          baseY: offsetY + row * DOT_SPACING,
          currentRadius: BASE_RADIUS,
          currentOpacity: BASE_OPACITY,
          targetRadius: BASE_RADIUS,
          targetOpacity: BASE_OPACITY,
        });
      }
    }
    dotsRef.current = dots;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);
      buildGrid();
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', handleMouseMove);

    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };
    document.addEventListener('mouseleave', handleMouseLeave);

    const animate = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      ctx.clearRect(0, 0, w, h);

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      // Center of the screen for radial fade
      const cx = w / 2;
      const cy = h / 2;
      const maxDist = Math.sqrt(cx * cx + cy * cy);

      for (const dot of dotsRef.current) {
        // Distance from mouse
        const dx = mx - dot.baseX;
        const dy = my - dot.baseY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        // Influence calculation (smooth falloff)
        if (dist < INFLUENCE_RADIUS) {
          const t = 1 - dist / INFLUENCE_RADIUS;
          const ease = t * t * (3 - 2 * t); // smoothstep
          dot.targetRadius = BASE_RADIUS + (MAX_RADIUS - BASE_RADIUS) * ease;
          dot.targetOpacity = BASE_OPACITY + (MAX_OPACITY - BASE_OPACITY) * ease;
        } else {
          dot.targetRadius = BASE_RADIUS;
          dot.targetOpacity = BASE_OPACITY;
        }

        // Lerp towards target
        dot.currentRadius += (dot.targetRadius - dot.currentRadius) * LERP_SPEED;
        dot.currentOpacity += (dot.targetOpacity - dot.currentOpacity) * LERP_SPEED;

        // Radial fade from center (dots at edge are dimmer)
        const distFromCenter = Math.sqrt(
          (dot.baseX - cx) ** 2 + (dot.baseY - cy) ** 2
        );
        const fadeFactor = Math.max(0, 1 - (distFromCenter / maxDist) * 1.1);
        const finalOpacity = dot.currentOpacity * fadeFactor;

        if (finalOpacity < 0.005) continue; // skip invisible dots

        // Subtle color shift for dots near mouse
        const proximity = dist < INFLUENCE_RADIUS ? 1 - dist / INFLUENCE_RADIUS : 0;
        const r = Math.round(180 + proximity * 75);  // warm shift
        const g = Math.round(180 + proximity * 40);
        const b = Math.round(200 + proximity * 55);

        ctx.beginPath();
        ctx.arc(dot.baseX, dot.baseY, dot.currentRadius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${finalOpacity})`;
        ctx.fill();
      }

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animFrameRef.current);
    };
  }, [buildGrid]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ background: 'transparent' }}
    />
  );
};