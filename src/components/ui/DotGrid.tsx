"use client";

import { useEffect, useRef } from "react";

export function DotGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: false }); 
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let lastWidth = window.innerWidth;

    const resize = () => {
      const currentWidth = window.innerWidth;
      const currentHeight = window.innerHeight;
      
      // On mobile, ignore vertical-only resizes (address bar hide/show) to prevent layout thrashing
      if (currentWidth < 768 && currentWidth === lastWidth && canvas.width > 0) {
        return;
      }
      lastWidth = currentWidth;

      canvas.width = currentWidth * dpr;
      canvas.height = currentHeight * dpr;
      canvas.style.width = `${currentWidth}px`;
      canvas.style.height = `${currentHeight}px`;
    };

    const isMobile = window.innerWidth < 768;
    const SPACING = isMobile ? 32 : 36;
    
    // Time tracking
    const startTime = performance.now();

    const draw = (currentTime: number) => {
      if (!currentTime) currentTime = performance.now();
      
      const time = (currentTime - startTime) / 1000; // time in seconds
      
      // Read perfectly synced scroll position directly in rAF (0 latency, 0 snapping)
      const scrollY = window.scrollY;

      const w = canvas.width / dpr;
      const h = canvas.height / dpr;

      // Clear with background color
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Scroll speed modifier - physically moves the grid slightly with scroll for parallax
      const scrollOffset = scrollY * 0.15; // Slowed down from 0.4 for less distraction
      
      // Safe modulo fixes Javascript negative modulo bug on iOS bounce scroll
      const offsetY = ((scrollOffset % SPACING) + SPACING) % SPACING;
      
      const cols = Math.ceil(w / SPACING) + 2;
      const rows = Math.ceil(h / SPACING) + 2;

      const cx = w / 2;
      const cy = h / 2;
      const maxDist = Math.sqrt(cx * cx + cy * cy);

      for (let row = -1; row < rows; row++) {
        // Screen Y coordinate
        const screenY = row * SPACING - offsetY;
        
        // World Y coordinate (stays constant for a specific dot as you scroll)
        const worldY = screenY + scrollOffset;

        for (let col = -1; col < cols; col++) {
          const screenX = col * SPACING;

          // Radial fade from screen center - much wider now so dots reach the edges more
          const dxC = screenX - cx;
          const dyC = screenY - cy;
          const distFromCenter = Math.sqrt(dxC * dxC + dyC * dyC);
          const radialFade = Math.max(0.4, 1 - (distFromCenter / (maxDist * 1.8)));

          // --- Sweeping Wave Pattern ---
          // Creates a large, sweeping diagonal wave that travels across the grid
          const waveFreqX = 0.002; // Slower wave frequency
          const waveFreqY = 0.003;
          const timePhase = time * 0.3; // Slower time evolution
          const scrollPhase = scrollY * 0.001; // Slower scroll evolution
          
          const phase1 = (screenX * waveFreqX) + (worldY * waveFreqY) - timePhase - scrollPhase;
          const phase2 = (screenX * waveFreqX * 1.5) - (worldY * waveFreqY * 0.8) + (timePhase * 0.4);
          
          // Combine waves and normalize to 0..1
          let pulse = (Math.sin(phase1) + Math.cos(phase2)) * 0.5 + 0.5;
          
          // Sharpen the wave peaks to make the pattern more distinct
          pulse = Math.pow(pulse, 2.5);

          // Physical wave displacement (dots physically move slightly in sine waves)
          const dispX = Math.sin(phase1) * 6; // Reduced displacement even further
          const dispY = Math.cos(phase1) * 6;
          
          const finalX = screenX + dispX;
          const finalY = screenY + dispY;

          // Pulse drives size and alpha - Tone down overall size heavily on mobile
          const baseSize = isMobile ? 0.5 : 0.6;
          // Drastically cap max pulse size to avoid large distracting dots
          const sizePulse = isMobile ? 0.3 : 0.5;
          
          const dotSize = baseSize + (pulse * sizePulse); 
          const finalAlpha = 0.05 + (pulse * 0.20); // Very subtle alpha range to stay in background

          // Apply radial fade
          const alphaWithFade = finalAlpha * radialFade;

          // Optimization: skip drawing invisible dots
          if (alphaWithFade < 0.02) continue;

          // Color palette: Silver/Metal/White & Black instead of teals and emeralds
          // Base: soft silver/titanium (mostly desaturated)
          // Peak: dark grey/black
          
          const hue = 210; // Slate/Silver hue
          const sat = 10; // Very low saturation
          const light = 70 - (pulse * 50); // Interpolate from light silver (70%) down to dark charcoal (20%)
          
          ctx.beginPath();
          ctx.arc(finalX * dpr, finalY * dpr, dotSize * dpr, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(${hue}, ${sat}%, ${light}%, ${alphaWithFade.toFixed(2)})`;
          ctx.fill();
        }
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize, { passive: true });

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    />
  );
}
