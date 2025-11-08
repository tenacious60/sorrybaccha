import React, { useEffect, useRef } from "react";

interface Props {
  active: boolean;
  count?: number; // optional override, default 10000
}

type ShapeType = "circle" | "square" | "triangle" | "star";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  rotation: number;
  vRot: number;
  color: string;
  shape: ShapeType;
  opacity: number;
  drift: number;
};

const defaultCount = 10000;

const PALETTE = [
  "#FF6B6B", // pink-red
  "#FFB86B", // peach
  "#FFD56B", // warm yellow
  "#FF7AB6", // rose
  "#C084FC", // purple
  "#7CE3E1", // aqua
  "#A7F3D0", // mint
  "#FFD1DC", // pale pink
];

function rand(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

function pick<T>(arr: T[]) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function drawStar(ctx: CanvasRenderingContext2D, x: number, y: number, r: number, rotation = 0) {
  const spikes = 5;
  const outerRadius = r;
  const innerRadius = r * 0.5;
  let rot = (Math.PI / 2) * 3 + rotation;
  let cx = x;
  let cy = y;
  ctx.beginPath();
  for (let i = 0; i < spikes; i++) {
    const ox = cx + Math.cos(rot) * outerRadius;
    const oy = cy + Math.sin(rot) * outerRadius;
    ctx.lineTo(ox, oy);
    rot += Math.PI / spikes;

    const ix = cx + Math.cos(rot) * innerRadius;
    const iy = cy + Math.sin(rot) * innerRadius;
    ctx.lineTo(ix, iy);
    rot += Math.PI / spikes;
  }
  ctx.closePath();
  ctx.fill();
}

const FallingPieces: React.FC<Props> = ({ active, count = defaultCount }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const particlesRef = useRef<Particle[] | null>(null);
  const lastTimeRef = useRef<number | null>(null);
  const pausedRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current!;
    if (!canvas) return;

  // we assert the context exists so downstream callbacks can use it without null checks
  const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
  if (!ctx) return;

    const dpr = Math.max(1, window.devicePixelRatio || 1);

    function resize() {
      const width = window.innerWidth;
      const height = window.innerHeight;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    resize();
    window.addEventListener("resize", resize);

    // Create particles only once
    if (!particlesRef.current) {
      const particles: Particle[] = new Array(count).fill(0).map(() => {
        const size = rand(2, 8); // tiny pieces
        const shape = pick<ShapeType>(["circle", "square", "triangle", "star"]);
        const color = pick(PALETTE);
        const x = rand(0, window.innerWidth);
        const y = rand(-window.innerHeight, window.innerHeight); // spread vertically
        const vy = rand(0.2, 1.2); // fall speed
        const vx = rand(-0.3, 0.3); // slight horizontal drift
        const rotation = rand(0, Math.PI * 2);
        const vRot = rand(-0.02, 0.02);
        const opacity = rand(0.6, 1);
        const drift = rand(0.1, 0.6);
        return { x, y, vx, vy, size, rotation, vRot, color, shape, opacity, drift };
      });
      particlesRef.current = particles;
    }

    const particles = particlesRef.current;

    function step(time: number) {
      if (!lastTimeRef.current) lastTimeRef.current = time;
      const dt = Math.min(40, time - lastTimeRef.current); // cap delta to avoid huge jumps
      lastTimeRef.current = time;

      if (!active || pausedRef.current) {
        // clear and stop drawing while inactive (but keep raf alive for resume)
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        rafRef.current = requestAnimationFrame(step);
        return;
      }

      const width = canvas.clientWidth;
      const height = canvas.clientHeight;

      ctx.clearRect(0, 0, width, height);

      // slight background glow / vignette at bottom center (optional subtle effect)
      // Not heavy: quick radial gradient
      const grad = ctx.createRadialGradient(width / 2, height * 0.2, 0, width / 2, height * 0.2, Math.max(width, height));
      grad.addColorStop(0, "rgba(255,220,230,0.03)");
      grad.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // update
        // add a soft sine-based horizontal drift for natural movement
        p.x += p.vx + Math.sin((time / 1000 + i) * p.drift) * 0.3;
        p.y += p.vy * (dt / 16.66); // normalize to 60fps baseline

        p.rotation += p.vRot;

        // wrap around bottom -> top, left/right wrap
        if (p.y - p.size > height) {
          p.y = -10 - Math.random() * 50;
          p.x = rand(0, width);
        }
        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;

        // render
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);

        ctx.globalAlpha = p.opacity;

        // subtle inner glow with shadow for a warm emissive look
        ctx.shadowBlur = Math.max(6, p.size * 2);
        ctx.shadowColor = p.color;

        ctx.fillStyle = p.color;

        switch (p.shape) {
          case "circle":
            ctx.beginPath();
            ctx.arc(0, 0, p.size, 0, Math.PI * 2);
            ctx.fill();
            break;
          case "square":
            ctx.fillRect(-p.size, -p.size, p.size * 2, p.size * 2);
            break;
          case "triangle":
            ctx.beginPath();
            ctx.moveTo(0, -p.size);
            ctx.lineTo(p.size, p.size);
            ctx.lineTo(-p.size, p.size);
            ctx.closePath();
            ctx.fill();
            break;
          case "star":
            drawStar(ctx, 0, 0, p.size, p.rotation);
            break;
        }

        // tiny outer soft outline for contrast
        ctx.globalAlpha = Math.min(0.35, p.opacity * 0.6);
        ctx.lineWidth = 0.6;
        ctx.strokeStyle = "rgba(255,255,255,0.06)";
        ctx.stroke();

        ctx.restore();
      }

      rafRef.current = requestAnimationFrame(step);
    }

    rafRef.current = requestAnimationFrame(step);

    return () => {
      window.removeEventListener("resize", resize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      lastTimeRef.current = null;
      // keep particles in memory if component re-mounts quickly; comment out if you want fresh particles each time:
      // particlesRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, count]);

  // Simple pause/resume support if active toggles
  useEffect(() => {
    pausedRef.current = !active;
  }, [active]);

  // Render canvas
  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-40"
      aria-hidden
    />
  );
};

export default FallingPieces;
