"use client";

import React, { useRef, useState } from "react";

export function SpotlightButton({ 
  href, 
  children, 
  className,
  color = "emerald",
  target,
  rel
}: { 
  href: string, 
  children: React.ReactNode, 
  className: string,
  color?: "emerald" | "amber" | "sky" | "violet",
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

  let glowColor = "rgba(16,185,129,0.25)";
  if (color === "amber") glowColor = "rgba(245,158,11,0.25)";
  if (color === "sky") glowColor = "rgba(14,165,233,0.25)";
  if (color === "violet") glowColor = "rgba(167,139,250,0.3)";

  return (
    <a
      ref={divRef}
      href={href}
      target={target}
      rel={rel}
      onMouseMove={handleMouseMove}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onMouseEnter={handleMouseEnter}
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
