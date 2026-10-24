/**
 * Marca NeutronX: uma ligadura geométrica de N e X.
 * A haste e a diagonal formam o N; a diagonal compartilhada e o traço roxo
 * formam o X. O quadrado ciano é o "nêutron", o único ponto de cor fria.
 */
export function LogoMark({ mono = false, className, title }: { mono?: boolean; className?: string; title?: string }) {
  const main = mono ? 'currentColor' : '#F4F5FA';
  const accent = mono ? 'currentColor' : '#8B5CF6';
  const dot = mono ? 'currentColor' : '#55D6FF';
  return (
    <svg viewBox="0 0 64 64" className={className} role={title ? 'img' : undefined} aria-hidden={title ? undefined : true}>
      {title && <title>{title}</title>}
      <path className="nx-bar" fill={main} d="M8 10h8v44H8z" />
      <path className="nx-diag" fill={main} d="M16 10h10l30 44H46z" />
      <path className="nx-cross" fill={accent} d="M46 10h10L26 54H16z" opacity={mono ? 0.55 : 1} />
      <path className="nx-dot" fill={dot} d="M50 1h6v6h-6z" />
    </svg>
  );
}

export function Brand({ mono = false }: { mono?: boolean }) {
  return (
    <>
      <LogoMark mono={mono} />
      <span>
        Neutron<span style={{ color: mono ? 'inherit' : 'var(--purple)' }}>X</span>
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
