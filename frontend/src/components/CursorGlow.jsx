import { useEffect, useRef } from 'react';

const PROXIMITY = 130;
const GLOW_R = 50;
const SPACING = 24;
const BASE_R = 1;
const MAX_R = 4;

// base color → accent blue
const [FR, FG, FB] = [30, 30, 30];
const [CR, CG, CB] = [88, 101, 242];

export default function CursorGlow() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let mx = -999, my = -999;
    let raf;
    let dots = [];

    function buildGrid() {
      dots = [];
      for (let x = 0; x < canvas.width; x += SPACING)
        for (let y = 0; y < canvas.height; y += SPACING)
          dots.push({ x, y });
    }

    function resize() {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      buildGrid();
      draw();
    }

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      dots.forEach(({ x, y }) => {
        const dx = x - mx, dy = y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < PROXIMITY) {
          const t = 1 - dist / PROXIMITY;
          const r = Math.round(FR + t * (CR - FR));
          const g = Math.round(FG + t * (CG - FG));
          const b = Math.round(FB + t * (CB - FB));
          const rad = BASE_R + t * (MAX_R - BASE_R);

          if (dist < GLOW_R) {
            const gi = 1 - dist / GLOW_R;
            ctx.beginPath();
            ctx.arc(x, y, rad * 2.5, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${r},${g},${b},${0.15 * gi})`;
            ctx.fill();
          }

          ctx.beginPath();
          ctx.arc(x, y, rad, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${r},${g},${b},1)`;
          ctx.fill();
        } else {
          ctx.beginPath();
          ctx.arc(x, y, BASE_R, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${FR},${FG},${FB},1)`;
          ctx.fill();
        }
      });
    }

    // offset coords to canvas-local space
    function onMove(e) {
      const rect = canvas.getBoundingClientRect();
      mx = e.clientX - rect.left;
      my = e.clientY - rect.top;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(draw);
    }

    function onLeave() {
      mx = -999; my = -999;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(draw);
    }

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseleave', onLeave);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0, left: 0,
        width: '100%', height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  );
}
