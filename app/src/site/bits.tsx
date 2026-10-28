import { Fragment, type ReactNode } from 'react';

/** Texto que "rola" para cima no hover, revelando uma cópia. */
export function Roll({ children }: { children: string }) {
  return (
    <span className="roll" data-t={children}>
      <span>{children}</span>
    </span>
  );
}

/** Rótulo de seção entre colchetes. */
export function Label({ n, children }: { n?: string; children: string }) {
  return (
    <p className="label">
      <span aria-hidden="true">[</span>
      {n && <b>{n}</b>}
      {children}
      <span aria-hidden="true">]</span>
    </p>
  );
}

/**
 * Título com palavras mascaradas, para subirem uma a uma (data-reveal).
 * Trechos entre *asteriscos* viram a serifa itálica de destaque.
 */
export function Words({ text, as: Tag = 'span', className }: { text: string; as?: 'span' | 'h1' | 'h2' | 'h3' | 'p'; className?: string }) {
  const parts = text.split(/(\*[^*]+\*)/).filter(Boolean);
  let k = 0;
  return (
    <Tag className={`words ${className ?? ''}`} aria-label={text.replace(/\*/g, '')} data-reveal="words">
      {parts.map((part) => {
        const em = part.startsWith('*');
        return part
          .replace(/\*/g, '')
          .split(' ')
          .filter(Boolean)
          .map((w) => (
            <Fragment key={k++}>
              <span className="w" aria-hidden="true">
                <span className={em ? 'em' : undefined}>{w}</span>
              </span>{' '}
            </Fragment>
          ));
      })}
    </Tag>
  );
}

/** Duas frases que trocam de lugar continuamente. */
export function Swap({ a, b }: { a: string; b: string }) {
  return (
    <span className="swap" aria-label={`${a} / ${b}`}>
      <span className="swap__in" aria-hidden="true">
        <span>
          <i>↪</i>
          {a}
        </span>
        <span>
          <i>↪</i>
          {b}
        </span>
      </span>
    </span>
  );
}

export function Arrow() {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className="arrow">
      <path d="M4 12 12 4M5.5 4H12v6.5" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export function Btn({ href, onClick, children, ghost }: { href?: string; onClick?: () => void; children: string; ghost?: boolean }) {
  const inner: ReactNode = (
    <>
      <Roll>{children}</Roll>
      <span className="btn__dot" aria-hidden="true">
        <Arrow />
      </span>
    </>
  );
  const cls = `btn${ghost ? ' btn--ghost' : ''}`;
  return href ? (
    <a className={cls} href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" data-magnetic>
      {inner}
    </a>
  ) : (
    <button type="button" className={cls} onClick={onClick} data-magnetic>
      {inner}
    </button>
  );
}
