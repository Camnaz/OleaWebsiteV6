export function OleaLogo({ className = "w-6 h-6" }: { className?: string }) {
  // SVG representation of a stylized olive tree based on the LinkedIn logo
  return (
    <svg 
      viewBox="0 0 100 100" 
      fill="currentColor" 
      className={className}
    >
      <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M50 75v-35" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
      <path d="M50 60c-15-15-20-25-15-35 5 10 15 15 15 15" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
      <path d="M50 60c15-15 20-25 15-35-5 10-15 15-15 15" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
      <circle cx="35" cy="25" r="4" fill="currentColor" />
      <circle cx="65" cy="25" r="4" fill="currentColor" />
      <circle cx="50" cy="20" r="4" fill="currentColor" />
      <circle cx="42" cy="35" r="3" fill="currentColor" />
      <circle cx="58" cy="35" r="3" fill="currentColor" />
    </svg>
  );
}
