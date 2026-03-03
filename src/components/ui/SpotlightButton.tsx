"use client";

import React, { useRef, useState } from "react";

export function SpotlightButton({ 
  href, 
  children, 
  className,
  color = "silver",
  target,
  rel
}: { 
  href: string, 
  children: React.ReactNode, 
  className: string,
  color?: "gray" | "black" | "silver" | "emerald" | "teal",
  target?: string,
  rel?: string
}) {
  const divRef = useRef<HTMLAnchorElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!divRef.current || isFocused) return;

    const div = divRef.current;
    const rect = div.getBoundingClientRect();

    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleFocus = () => {
    setIsFocused(true);
    setOpacity(1);
  };

  const handleBlur = () => {
    setIsFocused(false);
    setOpacity(0);
  };

  const handleMouseEnter = () => {
    setOpacity(1);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };

  let glowColor = "rgba(156,163,175,0.25)";
  if (color === "gray") glowColor = "rgba(107,114,128,0.25)";
  if (color === "black") glowColor = "rgba(0,0,0,0.15)";
  if (color === "silver") glowColor = "rgba(156,163,175,0.25)";
  if (color === "emerald") glowColor = "rgba(16,185,129,0.3)";
  if (color === "teal") glowColor = "rgba(20,184,166,0.3)";

  return (
    <a
      ref={divRef}
      href={href}
      target={target}
      rel={rel}
      onMouseMove={handleMouseMove}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onMouseEnter={handleMouseEnter} onTouchStart={(e) => { setPosition({ x: e.touches[0].clientX - (e.target as HTMLElement).getBoundingClientRect().left, y: e.touches[0].clientY - (e.target as HTMLElement).getBoundingClientRect().top }); setOpacity(1); setTimeout(() => setOpacity(0), 1000); }}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden ${className}`}
    >
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 rounded-full"
        style={{
          opacity,
          background: `radial-gradient(60px circle at ${position.x}px ${position.y}px, ${glowColor}, transparent 100%)`,
        }}
      />
      {children}
    </a>
  );
}
