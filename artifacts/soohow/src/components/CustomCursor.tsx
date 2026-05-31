import { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface TrailPoint {
  x: number;
  y: number;
  t: number;
}

const TRAIL_MAX_AGE = 720;
const TRAIL_SPACING = 6;
const TRAIL_COLOR = { core: "#00D4AA", glow: "#00A8E8" };

export function CustomCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const trailRef = useRef<TrailPoint[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const lastSpawnRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const canvas = canvasRef.current;
    const ring = ringRef.current;
    const text = textRef.current;
    if (!canvas || !ring || !text) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener("resize", resize);

    mouseRef.current = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    lastSpawnRef.current = { ...mouseRef.current };

    const spawnTrailPoint = (x: number, y: number, t: number) => {
      const last = lastSpawnRef.current;
      const dx = x - last.x;
      const dy = y - last.y;
      if (Math.hypot(dx, dy) < TRAIL_SPACING) return;

      trailRef.current.push({ x, y, t });
      lastSpawnRef.current = { x, y };

      if (trailRef.current.length > 48) {
        trailRef.current.splice(0, trailRef.current.length - 48);
      }
    };

    const drawTrail = (now: number) => {
      const { x: mx, y: my } = mouseRef.current;
      const trail = trailRef.current.filter((p) => now - p.t < TRAIL_MAX_AGE);
      trailRef.current = trail;

      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      if (trail.length > 1) {
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        for (let i = 1; i < trail.length; i++) {
          const prev = trail[i - 1];
          const curr = trail[i];
          const progress = i / (trail.length - 1);
          const age = (now - curr.t) / TRAIL_MAX_AGE;
          const alpha = Math.max(0, (1 - age) * progress * 0.35);
          if (alpha < 0.02) continue;

          ctx.strokeStyle = `rgba(0, 212, 170, ${alpha})`;
          ctx.lineWidth = 1 + progress * 2;
          ctx.beginPath();
          ctx.moveTo(prev.x, prev.y);
          ctx.quadraticCurveTo(
            (prev.x + curr.x) / 2,
            (prev.y + curr.y) / 2 - 4 * progress,
            curr.x,
            curr.y,
          );
          ctx.stroke();
        }
      }

      for (let i = 0; i < trail.length; i++) {
        const p = trail[i];
        const progress = (i + 1) / trail.length;
        const age = (now - p.t) / TRAIL_MAX_AGE;
        const life = Math.max(0, 1 - age);
        const radius = 1.5 + progress * 5 * life;
        const alpha = life * (0.25 + progress * 0.75);

        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, radius * 3);
        gradient.addColorStop(0, `rgba(0, 212, 170, ${alpha * 0.95})`);
        gradient.addColorStop(0.45, `rgba(0, 168, 232, ${alpha * 0.45})`);
        gradient.addColorStop(1, "rgba(0, 168, 232, 0)");

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(p.x, p.y, radius * 3, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = `rgba(0, 212, 170, ${alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
        ctx.fill();
      }

      const headGlow = ctx.createRadialGradient(mx, my, 0, mx, my, 36);
      headGlow.addColorStop(0, "rgba(0, 212, 170, 0.55)");
      headGlow.addColorStop(0.35, "rgba(0, 168, 232, 0.22)");
      headGlow.addColorStop(1, "rgba(0, 168, 232, 0)");
      ctx.fillStyle = headGlow;
      ctx.beginPath();
      ctx.arc(mx, my, 36, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = TRAIL_COLOR.core;
      ctx.shadowColor = TRAIL_COLOR.glow;
      ctx.shadowBlur = 14;
      ctx.beginPath();
      ctx.arc(mx, my, 5, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;

      rafRef.current = requestAnimationFrame(drawTrail);
    };

    rafRef.current = requestAnimationFrame(drawTrail);

    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      spawnTrailPoint(e.clientX, e.clientY, performance.now());
      gsap.to(ring, { x: e.clientX, y: e.clientY, duration: 0.12, ease: "power2.out" });
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isLink = target.closest("a") || target.closest("button");
      const isCard = target.closest("[data-product-card]");

      if (isCard) {
        gsap.to(ring, {
          scale: 2.5,
          borderColor: "#00D4AA",
          backgroundColor: "rgba(0, 212, 170, 0.1)",
          duration: 0.3,
        });
        gsap.to(text, { opacity: 1, duration: 0.2 });
      } else if (isLink) {
        gsap.to(ring, {
          scale: 2,
          borderColor: "#00A8E8",
          backgroundColor: "rgba(0, 168, 232, 0.1)",
          duration: 0.3,
        });
        gsap.to(text, { opacity: 0, duration: 0.2 });
      } else {
        gsap.to(ring, {
          scale: 1,
          borderColor: "#00A8E8",
          backgroundColor: "transparent",
          duration: 0.3,
        });
        gsap.to(text, { opacity: 0, duration: 0.2 });
      }
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseover", onMouseOver);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseover", onMouseOver);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-[9998] hidden md:block"
        aria-hidden
      />
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-[28px] h-[28px] border-[1.5px] border-[#00A8E8]/80 rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 flex items-center justify-center hidden md:flex"
      >
        <span ref={textRef} className="font-mono text-[9px] text-[#00D4AA] opacity-0">
          VIEW
        </span>
      </div>
    </>
  );
}
