import { useEffect, useRef } from 'react';

const PROXIMITY_RADIUS = 130;
const GLOW_RADIUS = 50;
const DOT_SPACING = 24;
const BASE_RADIUS = 1;
const MAX_RADIUS = 4;

// Base color rgb(30, 30, 30)  →  accent rgb(88, 101, 242)
const FAR_R = 30, FAR_G = 30, FAR_B = 30;
const CLOSE_R = 88, CLOSE_G = 101, CLOSE_B = 242;

export default function CursorGlow() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let mouseX = -999;
    let mouseY = -999;
    let animFrame;
    let dots = [];

    /* ── Build dot grid ───────────────────────── */
    const buildGrid = () => {
      dots = [];
      for (let x = 0; x < canvas.width; x += DOT_SPACING) {
        for (let y = 0; y < canvas.height; y += DOT_SPACING) {
          dots.push({ x, y });
        }
      }
    };

    /* ── Resize handler ───────────────────────── */
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      buildGrid();
      draw();
    };

    /* ── Draw all dots ────────────────────────── */
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      dots.forEach((dot) => {
        const dx = dot.x - mouseX;
        const dy = dot.y - mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < PROXIMITY_RADIUS) {
          const intensity = 1 - dist / PROXIMITY_RADIUS;

          const r = Math.round(FAR_R + intensity * (CLOSE_R - FAR_R));
          const g = Math.round(FAR_G + intensity * (CLOSE_G - FAR_G));
          const b = Math.round(FAR_B + intensity * (CLOSE_B - FAR_B));

          const radius = BASE_RADIUS + intensity * (MAX_RADIUS - BASE_RADIUS);

          // Outer soft glow for very close dots
          if (dist < GLOW_RADIUS) {
            const glowIntensity = 1 - dist / GLOW_RADIUS;
            ctx.beginPath();
            ctx.arc(dot.x, dot.y, radius * 2.5, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${r},${g},${b},${0.15 * glowIntensity})`;
            ctx.fill();
          }

          // Main dot
          ctx.beginPath();
          ctx.arc(dot.x, dot.y, radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${r},${g},${b},1)`;
          ctx.fill();
        } else {
          // Plain base dot — draw only those not in proximity to save calls
          ctx.beginPath();
          ctx.arc(dot.x, dot.y, BASE_RADIUS, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${FAR_R},${FAR_G},${FAR_B},1)`;
          ctx.fill();
        }
      });
    };

    /* ── Mouse move with rAF throttle ─────────── */
    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cancelAnimationFrame(animFrame);
      animFrame = requestAnimationFrame(draw);
    };

    /* ── Mouse leaves window ──────────────────── */
    const handleMouseLeave = () => {
      mouseX = -999;
      mouseY = -999;
      cancelAnimationFrame(animFrame);
      animFrame = requestAnimationFrame(draw);
    };

    /* ── Bootstrap ────────────────────────────── */
    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    /* ── Cleanup ──────────────────────────────── */
    return () => {
      cancelAnimationFrame(animFrame);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 1,
      }}
    />
  );
}
