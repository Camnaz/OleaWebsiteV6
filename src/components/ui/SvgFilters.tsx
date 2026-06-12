export function SvgFilters() {
  return (
    <svg className="fixed pointer-events-none w-0 h-0" style={{ position: 'absolute', opacity: 0, width: 0, height: 0 }} aria-hidden="true">
      <defs>
        {/* Gooey effect for icons/buttons */}
        <filter id="round">
          <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
          <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" result="goo" />
          <feComposite in="SourceGraphic" in2="goo" operator="atop"/>
        </filter>

        <filter id="liquid-glass">
          <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
          <feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="3" result="noise" />
          <feDisplacementMap in="blur" in2="noise" scale="15" xChannelSelector="R" yChannelSelector="G" result="displaced" />
        </filter>

        <filter id="liquid-glass-new">
          <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur" />
          <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="2" result="noise" />
          <feDisplacementMap in="blur" in2="noise" scale="20" xChannelSelector="R" yChannelSelector="G" result="displaced" />
        </filter>

        <filter id="fresnel">
          <feComponentTransfer in="SourceGraphic">
            <feFuncR type="linear" slope="1.2" intercept="0.05" />
            <feFuncG type="linear" slope="1.2" intercept="0.05" />
            <feFuncB type="linear" slope="1.2" intercept="0.05" />
          </feComponentTransfer>
        </filter>
        
        <filter id="pack-upper">
           <feComponentTransfer>
              <feFuncR type="linear" slope="1.05" />
              <feFuncG type="linear" slope="1.05" />
              <feFuncB type="linear" slope="1.05" />
           </feComponentTransfer>
        </filter>
        
        <filter id="pack-lower">
           <feComponentTransfer>
              <feFuncR type="linear" slope="0.95" />
              <feFuncG type="linear" slope="0.95" />
              <feFuncB type="linear" slope="0.95" />
           </feComponentTransfer>
        </filter>
      </defs>
    </svg>
  );
}
