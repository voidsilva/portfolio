import { LOGO, TONES } from '../experience/logoShape';

/** Marca SilvaDev, desenhada a partir da mesma definição usada no 3D. */
export function LogoMark({ mono = false, className, title }: { mono?: boolean; className?: string; title?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} role={title ? 'img' : undefined} aria-hidden={title ? undefined : true} fill="none" strokeLinecap="round" strokeLinejoin="round">
      {title && <title>{title}</title>}
      {LOGO.strokes.map((s, i) => (
        <path key={i} d={s.d} stroke={mono ? 'currentColor' : TONES[s.tone]} strokeWidth={s.w} pathLength={1} />
      ))}
      {LOGO.dots.map((d, i) => (
        <circle key={i} cx={d.cx} cy={d.cy} r={d.r} fill={mono ? 'currentColor' : TONES.cyan} />
      ))}
    </svg>
  );
}

export function Brand({ mono = false }: { mono?: boolean }) {
  return (
    <>
      <LogoMark mono={mono} />
      <span>
        Silva<span style={{ color: mono ? 'inherit' : 'var(--purple)' }}>Dev</span>
      </span>
    </>
  );
}

export function Arrow() {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M4 12 12 4M5.5 4H12v6.5" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export function GitHubIcon() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true">
      <path
        fill="currentColor"
        d="M8 0C3.58 0 0 3.58 0 8a8 8 0 0 0 5.47 7.59c.4.07.55-.17.55-.38v-1.33c-2.23.48-2.7-1.07-2.7-1.07-.36-.92-.89-1.17-.89-1.17-.73-.5.06-.49.06-.49.8.06 1.23.83 1.23.83.71 1.22 1.87.87 2.33.66.07-.52.28-.87.5-1.07-1.78-.2-3.65-.89-3.65-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.6 7.6 0 0 1 4 0c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.66 3.95.29.25.54.73.54 1.48v2.2c0 .21.15.46.55.38A8 8 0 0 0 16 8c0-4.42-3.58-8-8-8Z"
      />
    </svg>
  );
}
