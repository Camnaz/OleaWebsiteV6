"use client";

import { useEffect, useRef } from "react";

export function DotGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scrollRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const textRectsRef = useRef<DOMRect[]>([]);

  // Update text bounding boxes periodically for collision detection
  useEffect(() => {
    const updateRects = () => {
      const elements = document.querySelectorAll('h1, h2, h3, p');
      const rects: DOMRect[] = [];
      elements.forEach(el => {
        const rect = el.getBoundingClientRect();
        // Only include visible or near-visible elements with actual size
        if (rect.width > 20 && rect.height > 10 && rect.top < window.innerHeight + 500 && rect.bottom > -500) {
          rects.push(rect);
        }
      });
      textRectsRef.current = rects;
    };

    updateRects();
    window.addEventListener('scroll', updateRects, { passive: true });
    window.addEventListener('resize', updateRects, { passive: true });
    const interval = setInterval(updateRects, 1000);

    return () => {
      window.removeEventListener('scroll', updateRects);
      window.removeEventListener('resize', updateRects);
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: false }); // Use false for better performance, we manually clear with fillRect
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
    };

    const onScroll = () => {
      scrollRef.current = window.scrollY;
    };

    const isMobile = window.innerWidth < 768;
    const SPACING = isMobile ? 36 : 42;
    
    // Time tracking
    const startTime = performance.now();

    const draw = (currentTime: number) => {
      if (!currentTime) currentTime = performance.now();
      
      const time = (currentTime - startTime) / 1000; // time in seconds
      const scroll = scrollRef.current;

      const w = canvas.width / dpr;
      const h = canvas.height / dpr;

      // Clear with background color
      ctx.fillStyle = "#fafafa";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Scroll speed modifier - physically moves the grid slightly with scroll for parallax
      const scrollOffset = scroll * 0.4;
      const offsetY = scrollOffset % SPACING;
      
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
          const radialFade = Math.max(0.3, 1 - (distFromCenter / (maxDist * 1.5)));

          // --- Sweeping Wave Pattern ---
          // Creates a large, sweeping diagonal wave that travels across the grid
          const waveFreqX = 0.0035;
          const waveFreqY = 0.0045;
          const timePhase = time * 0.9;
          const scrollPhase = scroll * 0.0025;
          
          const phase1 = (screenX * waveFreqX) + (worldY * waveFreqY) - timePhase - scrollPhase;
          const phase2 = (screenX * waveFreqX * 1.5) - (worldY * waveFreqY * 0.8) + (timePhase * 0.6);
          
          // Combine waves and normalize to 0..1
          // Stronger pronounced peaks
          let pulse = (Math.sin(phase1) + Math.cos(phase2)) * 0.5 + 0.5;
          
          // Sharpen the wave peaks to make the pattern more distinct
          pulse = Math.pow(pulse, 1.8);

          // Physical wave displacement (dots physically move slightly in sine waves, more prominent now)
          const dispX = Math.sin(phase1) * 12;
          const dispY = Math.cos(phase1) * 12;
          
          const finalX = screenX + dispX;
          const finalY = screenY + dispY;

          // Pulse drives size and alpha - Reduced max size further
          const dotSize = 1.0 + (pulse * 1.4); // size 1.0px to 2.4px
          const finalAlpha = 0.20 + (pulse * 0.80); // Greater contrast: alpha 20% to 100%

          // Apply radial fade
          const alphaWithFade = finalAlpha * radialFade;

          // Optimization: skip drawing invisible dots
          if (alphaWithFade < 0.05) continue;

          // Text Collision Mask
          let textMaskAlpha = 1.0;
          for (let i = 0; i < textRectsRef.current.length; i++) {
            const rect = textRectsRef.current[i];
            const padding = 24; 
            
            if (
              finalX > rect.left - padding && 
              finalX < rect.right + padding && 
              finalY > rect.top - padding && 
              finalY < rect.bottom + padding
            ) {
              textMaskAlpha = 0.08; // Drop opacity heavily if underneath text
              break;
            }
          }

          if (textMaskAlpha < 0.1) continue;

          // Color palette: Emerald/Teal hue (165)
          const hue = 165;
          const sat = 55; // Higher saturation
          const light = 55 + (pulse * 15); // Brighter peaks

          ctx.beginPath();
          ctx.arc(finalX * dpr, finalY * dpr, dotSize * dpr, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(${hue}, ${sat}%, ${light}%, ${(alphaWithFade * textMaskAlpha).toFixed(2)})`;
          ctx.fill();
        }
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", onScroll);
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
