"use client";

import { useEffect, useRef, useState } from "react";

export function CustomCursor() {
  const [isDesktop, setIsDesktop] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const dot1Ref = useRef<HTMLDivElement>(null);
  const dot2Ref = useRef<HTMLDivElement>(null);
  const dot3Ref = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  
  const requestRef = useRef<number>(undefined);
  const mouse = useRef({ x: -100, y: -100 });
  const pos = useRef({ x: -100, y: -100 });
  
  const hoverSpring = useRef(0);
  const isHovering = useRef(false);
  const isClicking = useRef(false);

  useEffect(() => {
    const checkDesktop = () => {
      const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
      setIsDesktop(!isTouch && window.innerWidth >= 768);
    };
    
    checkDesktop();
    window.addEventListener("resize", checkDesktop, { passive: true });
    return () => window.removeEventListener("resize", checkDesktop);
  }, []);

  useEffect(() => {
    if (!isDesktop) return;

    const onMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;
      const isClickable = target.closest("a, button, [role='button'], input, select, textarea");
      isHovering.current = !!isClickable;
    };

    const onMouseDown = () => { isClicking.current = true; };
    const onMouseUp = () => { isClicking.current = false; };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mouseover", onMouseOver, { passive: true });
    window.addEventListener("mousedown", onMouseDown, { passive: true });
    window.addEventListener("mouseup", onMouseUp, { passive: true });

    let lastTime = performance.now();

    const animate = (time: number) => {
      const delta = time - lastTime;
      lastTime = time;

      // Prevent physics explosion on large deltas (e.g. tab switch), but never skip frames entirely
      const dt = Math.min(delta / 16.666, 3);

      // Ultra-fast simple lerp for position
      pos.current.x += (mouse.current.x - pos.current.x) * 0.4;
      pos.current.y += (mouse.current.y - pos.current.y) * 0.4;

      const targetHover = isHovering.current || isClicking.current ? 1 : 0;
      hoverSpring.current += (targetHover - hoverSpring.current) * (0.15 * dt);

      const h = hoverSpring.current;
      
      // h=0 means 3 separate dots. h=1 means 1 converged dot.
      const radius = 10 * (1 - h);
      
      // Controlled spin: only spin as it converges/expands (based on the spring value)
      // This creates a twisting motion as they pull together, but completely stops when fully converged or expanded.
      const rotation = h * Math.PI; // Spins exactly 180 degrees during the transition

      if (containerRef.current) {
        containerRef.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0) rotate(${rotation}rad)`;
      }

      const angle1 = -Math.PI / 2;
      const angle2 = Math.PI / 6;
      const angle3 = (5 * Math.PI) / 6;

      // When converged, the individual colored dots scale down to 0, 
      // and a central white glassmorphic dot scales up.
      const coloredScale = Math.max(0, 1 - h * 1.5); 
      const centerScale = h;

      // 3px offset because the colored dots are 6x6px (w-1.5 h-1.5)
      if (dot1Ref.current) dot1Ref.current.style.transform = `translate3d(${Math.cos(angle1) * radius - 3}px, ${Math.sin(angle1) * radius - 3}px, 0) scale(${coloredScale})`;
      if (dot2Ref.current) dot2Ref.current.style.transform = `translate3d(${Math.cos(angle2) * radius - 3}px, ${Math.sin(angle2) * radius - 3}px, 0) scale(${coloredScale})`;
      if (dot3Ref.current) dot3Ref.current.style.transform = `translate3d(${Math.cos(angle3) * radius - 3}px, ${Math.sin(angle3) * radius - 3}px, 0) scale(${coloredScale})`;
      
      // Update the central white precise glassmorphic circle (w-5 h-5 -> 20px -> -10px offset)
      if (glowRef.current) {
        glowRef.current.style.transform = `translate3d(-10px, -10px, 0) scale(${centerScale})`;
        glowRef.current.style.opacity = h.toString();
      }

      requestRef.current = requestAnimationFrame(animate);
    };
    
    requestRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseover", onMouseOver);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [isDesktop]);

  if (!isDesktop) return null;

  return (
    <div 
      ref={containerRef} 
      className="fixed top-0 left-0 w-0 h-0 pointer-events-none z-[999999] will-change-transform"
    >
      {/* Glass marble / magnifying lens for hover state with translucent magnification */}
      <div 
        ref={glowRef}
        className="absolute w-5 h-5 bg-white/5 backdrop-blur-[2px] backdrop-saturate-[1.1] border-[0.5px] border-gray-500/30 shadow-[0_2px_8px_rgba(0,0,0,0.05),inset_0_1px_2px_rgba(255,255,255,0.4)] rounded-full will-change-transform opacity-0 mix-blend-difference"
      />
      
      <div ref={dot1Ref} className="absolute w-1.5 h-1.5 bg-emerald-400 rounded-full will-change-transform shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
      <div ref={dot2Ref} className="absolute w-1.5 h-1.5 bg-cyan-400 rounded-full will-change-transform shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
      <div ref={dot3Ref} className="absolute w-1.5 h-1.5 bg-teal-400 rounded-full will-change-transform shadow-[0_0_8px_rgba(45,212,191,0.8)]" />
    </div>
  );
}
