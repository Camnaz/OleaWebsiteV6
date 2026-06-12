"use client";

import { useEffect, useRef } from "react";

export function DotGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let lastWidth = window.innerWidth;

    const resize = () => {
      const currentWidth = window.innerWidth;
      const currentHeight = window.innerHeight;
      // On mobile, ignore vertical-only resizes (address bar hide/show)
      if (currentWidth < 768 && currentWidth === lastWidth && canvas.width > 0) return;
      lastWidth = currentWidth;
      canvas.width = currentWidth * dpr;
      canvas.height = currentHeight * dpr;
      canvas.style.width = `${currentWidth}px`;
      canvas.style.height = `${currentHeight}px`;
    };

    const isMobile = typeof window !== 'undefined' ? window.innerWidth < 768 : false;
    // Tighter spacing on mobile so more dots fit on screen
    const SPACING = isMobile ? 32 : 36;

    // On mobile: throttle to ~20fps to prevent rAF from fighting touch/scroll events
    // On desktop: full 60fps
    const FRAME_BUDGET = isMobile ? 50 : 0; // ms between frames
    let lastFrameTime = 0;

    const startTime = performance.now();

    // Cached scroll value — updated via passive scroll listener, NOT read inside rAF
    // This prevents forced layout reflow inside the animation loop on mobile
    let cachedScrollY = typeof window !== 'undefined' ? window.scrollY : 0;
    const onScroll = () => { cachedScrollY = window.scrollY; };
    window.addEventListener('scroll', onScroll, { passive: true });

    const draw = (currentTime: number) => {
      rafRef.current = requestAnimationFrame(draw);

      // Throttle on mobile to reduce CPU pressure during scroll
      if (isMobile && currentTime - lastFrameTime < FRAME_BUDGET) return;
      lastFrameTime = currentTime;

      const time = (currentTime - startTime) / 1000;
      const scrollY = cachedScrollY;

      const w = canvas.width / dpr;
      const h = canvas.height / dpr;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Scroll parallax — disabled on mobile to prevent any jitter
      const scrollOffset = isMobile ? 0 : scrollY * 0.12;
      const offsetY = isMobile ? 0 : ((scrollOffset % SPACING) + SPACING) % SPACING;

      const cols = Math.ceil(w / SPACING) + 2;
      const rows = Math.ceil(h / SPACING) + 2;

      const cx = w / 2;
      const cy = h / 2;
      const maxDist = Math.sqrt(cx * cx + cy * cy);

      for (let row = -1; row < rows; row++) {
        const screenY = row * SPACING - offsetY;
        const worldY = screenY + scrollOffset;

        for (let col = -1; col < cols; col++) {
          const screenX = col * SPACING;

          // Radial fade from center
          const dxC = screenX - cx;
          const dyC = screenY - cy;
          const distFromCenter = Math.sqrt(dxC * dxC + dyC * dyC);
          const radialFade = Math.max(0.3, 1 - (distFromCenter / (maxDist * 1.6)));

          // Slow sweeping wave
          const waveFreqX = 0.0018;
          const waveFreqY = 0.0025;
          const timePhase = time * (isMobile ? 0.15 : 0.25);
          const scrollPhase = isMobile ? 0 : scrollY * 0.0008;

          const phase1 = (screenX * waveFreqX) + (worldY * waveFreqY) - timePhase - scrollPhase;
          const phase2 = (screenX * waveFreqX * 1.4) - (worldY * waveFreqY * 0.7) + (timePhase * 0.35);

          let pulse = (Math.sin(phase1) + Math.cos(phase2)) * 0.5 + 0.5;
          pulse = Math.pow(pulse, 3);

          // Displacement — zero on mobile to avoid any movement fighting scroll
          const dispX = isMobile ? 0 : Math.sin(phase1) * 4;
          const dispY = isMobile ? 0 : Math.cos(phase1) * 4;

          const finalX = screenX + dispX;
          const finalY = screenY + dispY;

          const baseSize = isMobile ? 0.6 : 0.55;
          const sizePulse = isMobile ? 0.35 : 0.45;
          const dotSize = baseSize + (pulse * sizePulse);

          // Keep dots very faint — panels wash them out with liquid-panel background
          const finalAlpha = isMobile ? (0.08 + (pulse * 0.18)) : (0.04 + (pulse * 0.14));
          const alphaWithFade = finalAlpha * radialFade;

          if (alphaWithFade < 0.015) continue;

          const hue = 165 + (pulse * 35);
          const sat = 50 + (pulse * 35);
          const light = 82 - (pulse * 28);

          ctx.beginPath();
          ctx.arc(finalX * dpr, finalY * dpr, dotSize * dpr, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(${hue}, ${sat}%, ${light}%, ${alphaWithFade.toFixed(2)})`;
          ctx.fill();
        }
      }
    };

    resize();
    window.addEventListener("resize", resize, { passive: true });
    rafRef.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener('scroll', onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      aria-hidden="true"
    />
  );
}
