// Shared SVG filters that drive the "boiling pencil" sketchbook effect used
// by the Projects, Experience, and About sections. Three turbulence seeds are
// swapped on a CSS loop (see "pencil-boil" keyframes) to make drawn edges
// shimmer like hand-drawn animation. Rendered once at the page level so every
// section can reference the filters by id.
export default function PencilBoilDefs() {
  return (
    <svg
      className="pencil-boil-defs"
      width="0"
      height="0"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        {[0, 5, 11].map((seed, index) => (
          <filter
            key={seed}
            id={`pencil-boil-${index}`}
            x="-12%"
            y="-12%"
            width="124%"
            height="124%"
          >
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.018 0.026"
              numOctaves="3"
              seed={seed}
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="3.5"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        ))}
      </defs>
    </svg>
  );
}
