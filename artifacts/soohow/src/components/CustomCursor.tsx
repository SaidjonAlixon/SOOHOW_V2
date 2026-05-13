import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return; // Hide on touch

    const dot = dotRef.current;
    const ring = ringRef.current;
    const text = textRef.current;
    if (!dot || !ring || !text) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      
      gsap.set(dot, { x: mouseX, y: mouseY });
      gsap.to(ring, { x: mouseX, y: mouseY, duration: 0.15, ease: "power2.out" });
    };

    window.addEventListener("mousemove", onMouseMove);

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      const isLink = target.closest("a") || target.closest("button");
      const isCard = target.closest("[data-product-card]");

      if (isCard) {
        gsap.to(ring, { scale: 2.5, borderColor: "#00D4AA", backgroundColor: "rgba(0, 212, 170, 0.1)", duration: 0.3 });
        gsap.to(dot, { opacity: 0, duration: 0.2 });
        gsap.to(text, { opacity: 1, duration: 0.2 });
      } else if (isLink) {
        gsap.to(ring, { scale: 2, borderColor: "#00A8E8", backgroundColor: "rgba(0, 168, 232, 0.1)", duration: 0.3 });
        gsap.to(dot, { opacity: 0, duration: 0.2 });
        gsap.to(text, { opacity: 0, duration: 0.2 });
      } else {
        gsap.to(ring, { scale: 1, borderColor: "#00A8E8", backgroundColor: "transparent", duration: 0.3 });
        gsap.to(dot, { opacity: 1, duration: 0.2 });
        gsap.to(text, { opacity: 0, duration: 0.2 });
      }
    };

    window.addEventListener("mouseover", onMouseOver);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseover", onMouseOver);
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-[4px] h-[4px] bg-[#00A8E8] rounded-full pointer-events-none z-[10000] -translate-x-1/2 -translate-y-1/2 hidden md:block"
      />
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-[28px] h-[28px] border-[1.5px] border-[#00A8E8] rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 flex items-center justify-center hidden md:flex"
      >
        <span ref={textRef} className="font-mono text-[9px] text-[#00D4AA] opacity-0">VIEW</span>
      </div>
    </>
  );
}
