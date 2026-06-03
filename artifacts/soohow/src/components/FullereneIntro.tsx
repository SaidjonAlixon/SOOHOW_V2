import { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";
import { Logo } from "@/components/Logo";
import { useLocale } from "@/lib/i18n/LocaleContext";

const BALL_COLORS = ["#FF3B3B", "#FFD700", "#00E676", "#00A8E8"];

interface Ball {
  id: number;
  x: number;
  y: number;
  z: number;
  color: string;
  size: number;
}

function generateFibonacciSphere(count: number, radius: number): Ball[] {
  const balls: Ball[] = [];
  const goldenAngle = Math.PI * (3 - Math.sqrt(5));

  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2;
    const r = Math.sqrt(Math.max(0, 1 - y * y));
    const theta = goldenAngle * i;

    const x = Math.cos(theta) * r * radius;
    const z = Math.sin(theta) * r * radius;
    const yPos = y * radius;

    const size = 12;

    balls.push({
      id: i,
      x,
      y: yPos,
      z,
      color: BALL_COLORS[i % BALL_COLORS.length],
      size,
    });
  }

  return balls;
}

interface FullereneIntroProps {
  onComplete: () => void;
}

export function FullereneIntro({ onComplete }: FullereneIntroProps) {
  const { t } = useLocale();
  const sphereRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const rotRef = useRef({ x: -15, y: 0, targetX: -15, targetY: 0 });
  const rafRef = useRef(0);
  const explodedRef = useRef(false);
  const [balls] = useState<Ball[]>(() => generateFibonacciSphere(140, 200));
  const [hint, setHint] = useState(true);

  const applySphereRotation = useCallback(() => {
    if (!sphereRef.current) return;
    const { x, y } = rotRef.current;
    sphereRef.current.style.transform = `rotateX(${x}deg) rotateY(${y}deg)`;
  }, []);

  useEffect(() => {
    document.documentElement.classList.add("fullerene-intro-active");
    return () => document.documentElement.classList.remove("fullerene-intro-active");
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;
    const dx = (e.clientX - cx) / cx;
    const dy = (e.clientY - cy) / cy;
    rotRef.current.targetX = -15 + dy * 20;
    rotRef.current.targetY = dx * 32;
  }, []);

  useEffect(() => {
    const tick = () => {
      if (explodedRef.current) return;

      const rot = rotRef.current;
      rot.x += (rot.targetX - rot.x) * 0.06;
      rot.y += (rot.targetY - rot.y) * 0.06;
      applySphereRotation();

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [applySphereRotation]);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  const triggerExit = useCallback(() => {
    if (explodedRef.current) return;
    explodedRef.current = true;
    cancelAnimationFrame(rafRef.current);
    setHint(false);

    if (!sphereRef.current) return;

    const sphere = sphereRef.current;
    const ballEls = sphere.querySelectorAll<HTMLElement>(".fullerene-ball");

    gsap.to(rotRef.current, {
      duration: 1.2,
      y: rotRef.current.y + 720,
      ease: "power2.in",
      onUpdate: applySphereRotation,
    });

    ballEls.forEach((el) => {
      const angle = Math.random() * Math.PI * 2;
      const pitch = (Math.random() - 0.5) * Math.PI;
      const dist = 600 + Math.random() * 800;
      const tx = Math.cos(angle) * Math.cos(pitch) * dist;
      const ty = Math.sin(pitch) * dist;
      const tz = Math.sin(angle) * Math.cos(pitch) * dist;

      gsap.to(el, {
        duration: 0.9 + Math.random() * 0.4,
        x: tx,
        y: ty,
        z: tz,
        opacity: 0,
        scale: 0.2 + Math.random() * 0.6,
        ease: "power3.out",
        delay: Math.random() * 0.15,
      });
    });

    setTimeout(() => {
      if (containerRef.current) {
        gsap.to(containerRef.current, {
          duration: 0.5,
          opacity: 0,
          ease: "power2.inOut",
          onComplete,
        });
      }
    }, 900);
  }, [onComplete]);

  const handleLeftClick = useCallback(
    (e: MouseEvent) => {
      if (e.button !== 0) return;
      triggerExit();
    },
    [triggerExit],
  );

  useEffect(() => {
    const autoTimer = window.setTimeout(triggerExit, 5000);
    return () => window.clearTimeout(autoTimer);
  }, [triggerExit]);

  useEffect(() => {
    const blockScroll = (e: WheelEvent) => e.preventDefault();
    const blockContextMenu = (e: Event) => e.preventDefault();

    window.addEventListener("mousedown", handleLeftClick);
    window.addEventListener("wheel", blockScroll, { passive: false });
    window.addEventListener("contextmenu", blockContextMenu);

    return () => {
      window.removeEventListener("mousedown", handleLeftClick);
      window.removeEventListener("wheel", blockScroll);
      window.removeEventListener("contextmenu", blockContextMenu);
    };
  }, [handleLeftClick]);

  return (
    <div
      ref={containerRef}
      className="fullerene-page"
      data-testid="fullerene-intro"
    >
      {/* Radial glow background */}
      <div className="fullerene-bg-glow" />

      {/* 3D Scene */}
      <div className="fullerene-scene">
        <div
          ref={sphereRef}
          className="fullerene-sphere"
          style={{ transform: "rotateX(-15deg) rotateY(0deg)" }}
        >
          {balls.map((ball) => (
            <div
              key={ball.id}
              className="fullerene-ball"
              style={{
                width: `${ball.size}px`,
                height: `${ball.size}px`,
                transform: `translate3d(${ball.x}px, ${ball.y}px, ${ball.z}px) translate(-50%, -50%)`,
                backgroundColor: ball.color,
                boxShadow: `0 0 8px ${ball.color}`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Hint text */}
      {hint && (
        <div className="fullerene-hint" data-testid="fullerene-hint">
          <div className="fullerene-hint-mouse" aria-hidden>
            <svg width="28" height="40" viewBox="0 0 28 40" fill="none">
              <rect x="4" y="2" width="20" height="32" rx="10" stroke="currentColor" strokeWidth="1.5" />
              <rect x="4" y="2" width="10" height="14" rx="5" fill="currentColor" fillOpacity="0.35" />
            </svg>
          </div>
          <span>{t('intro.clickHint')}</span>
          <div className="fullerene-hint-line" />
        </div>
      )}

      {/* Brand watermark */}
      <div className="fullerene-brand">
        <Logo size="lg" />
      </div>
    </div>
  );
}
