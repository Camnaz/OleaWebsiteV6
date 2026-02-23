export function OleaLogo({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="1" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      {/* Minimalist Olive Tree */}
      <path d="M12 22v-8" />
      <path d="M12 14c-3-2-5-5-5-8 0-2 1.5-3 3-3 2 0 3.5 2 4 4" />
      <path d="M12 14c3-2 5-5 5-8 0-2-1.5-3-3-3-2 0-3.5 2-4 4" />
      <circle cx="10" cy="6" r="1" fill="currentColor" stroke="none" />
      <circle cx="14" cy="8" r="1" fill="currentColor" stroke="none" />
      <circle cx="12" cy="4" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}
