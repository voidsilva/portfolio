import { useEffect, useRef, useState } from 'react';
import { gsap } from '../lib/motion';
import { profile, projects, stack } from '../data/content';

type Line = { kind: 'in' | 'out' | 'err'; text: string };

const HELP = [
  'comandos disponíveis:',
  '  projetos        lista os projetos',
  '  abrir <n>       abre o projeto n (ex.: abrir 2)',
  '  ir <lugar>      inicio, projetos, sobre, stack, contato',
  '  sobre           quem eu sou',
  '  stack           tecnologias que uso',
  '  som             liga ou desliga a trilha',
  '  github          abre meu GitHub',
  '  limpar          limpa a tela',
  '  sair            fecha o terminal (ou Esc)',
];

/** Terminal secreto: abre com "/" e permite navegar o site digitando. */
export function Terminal({ onNav, onOpen, onSound, onKey }: { onNav: (id: string) => void; onOpen: (i: number) => void; onSound: () => boolean; onKey?: () => void }) {
  const [open, setOpen] = useState(false);
  const [lines, setLines] = useState<Line[]>([
    { kind: 'out', text: 'SilvaDev terminal · digite "ajuda" para ver os comandos' },
  ]);
  const [value, setValue] = useState('');
  const [hist, setHist] = useState<string[]>([]);
  const [hi, setHi] = useState(-1);
  const box = useRef<HTMLDivElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const log = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onDown = (e: KeyboardEvent) => {
      const typing = (e.target as HTMLElement).closest('input, textarea');
      if (e.key === '/' && !typing) {
        e.preventDefault();
        setOpen(true);
      } else if (e.key === 'Escape') setOpen(false);
    };
    const onToggle = () => setOpen((v) => !v);
    window.addEventListener('keydown', onDown);
    window.addEventListener('sd:terminal', onToggle);
    return () => {
      window.removeEventListener('keydown', onDown);
      window.removeEventListener('sd:terminal', onToggle);
    };
  }, []);

  useEffect(() => {
    const el = box.current!;
    if (open) {
      gsap.set(el, { visibility: 'visible' });
      gsap.fromTo(el, { y: 30, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.5, ease: 'expo.out' });
      setTimeout(() => input.current?.focus(), 30);
    } else {
      gsap.to(el, { y: 20, autoAlpha: 0, duration: 0.3, ease: 'power2.in' });
    }
  }, [open]);

  useEffect(() => {
    log.current?.scrollTo({ top: log.current.scrollHeight });
  }, [lines]);

  const out = (text: string | string[], kind: Line['kind'] = 'out') =>
    setLines((l) => [...l, ...(Array.isArray(text) ? text : [text]).map((t) => ({ kind, text: t }))]);

  const run = (raw: string) => {
    const cmd = raw.trim().toLowerCase();
    setLines((l) => [...l, { kind: 'in', text: raw }]);
    if (!cmd) return;
    setHist((h) => [raw, ...h].slice(0, 30));
    const [c, ...args] = cmd.split(/\s+/);
    const arg = args.join(' ');
    const places: Record<string, string> = { inicio: 'hero', início: 'hero', projetos: 'projetos', sobre: 'sobre', stack: 'stack', contato: 'contato', abordagem: 'manifesto' };
    switch (c) {
      case 'ajuda':
      case 'help':
      case '?':
        out(HELP);
        break;
      case 'projetos':
      case 'ls':
        out(projects.map((p) => `  ${p.index}  ${p.name.padEnd(30)} ${p.kicker}`));
        out('use "abrir <n>" para ver os detalhes');
        break;
      case 'abrir':
      case 'open': {
        const n = parseInt(arg, 10);
        if (n >= 1 && n <= projects.length) {
          out(`abrindo ${projects[n - 1].name}...`);
          setOpen(false);
          onOpen(n - 1);
        } else out(`projeto inválido. escolha de 1 a ${projects.length}`, 'err');
        break;
      }
      case 'ir':
      case 'cd':
        if (places[arg]) {
          out(`indo para ${arg}...`);
          setOpen(false);
          onNav(places[arg]);
        } else out('lugares: inicio, abordagem, projetos, sobre, stack, contato', 'err');
        break;
      case 'sobre':
      case 'whoami':
        out([`${profile.name} · desenvolvedor full stack`, profile.bio, `${profile.publicRepos} repositórios públicos · no GitHub desde ${profile.since}`]);
        break;
      case 'stack':
        out(stack.map((s) => `  ${s.name.padEnd(16)} ${'▪'.repeat(s.used.length)}  ${s.used.length} projeto(s)`));
        break;
      case 'som':
      case 'music':
        out(onSound() ? 'trilha ligada ♪' : 'trilha desligada');
        break;
      case 'github':
        out('abrindo github.com/voidsilva...');
        window.open(profile.github, '_blank', 'noopener');
        break;
      case 'limpar':
      case 'clear':
        setLines([]);
        break;
      case 'sair':
      case 'exit':
        setOpen(false);
        break;
      case 'sudo':
        out('boa tentativa 😄', 'err');
        break;
      default:
        out(`comando não encontrado: ${c}. digite "ajuda"`, 'err');
    }
  };

  return (
    <div className="term" ref={box} role="dialog" aria-label="Terminal do site" style={{ visibility: 'hidden' }} data-lenis-prevent>
      <div className="term__bar">
        <span>visitante@silvadev: ~</span>
        <button onClick={() => setOpen(false)} aria-label="Fechar terminal">
          Fechar
        </button>
      </div>
      <div className="term__log" ref={log}>
        {lines.map((l, i) => (
          <p key={i} className={`term__l term__l--${l.kind}`}>
            {l.kind === 'in' && <span className="term__ps">~$ </span>}
            {l.text}
          </p>
        ))}
      </div>
      <form
        className="term__row"
        onSubmit={(e) => {
          e.preventDefault();
          run(value);
          setValue('');
          setHi(-1);
        }}
      >
        <span className="term__ps">~$</span>
        <input
          ref={input}
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            onKey?.();
          }}
          onKeyDown={(e) => {
            if (e.key === 'ArrowUp' && hist.length) {
              e.preventDefault();
              const n = Math.min(hi + 1, hist.length - 1);
              setHi(n);
              setValue(hist[n]);
            } else if (e.key === 'ArrowDown') {
              e.preventDefault();
              const n = Math.max(hi - 1, -1);
              setHi(n);
              setValue(n < 0 ? '' : hist[n]);
            }
          }}
          aria-label="Digite um comando"
          autoComplete="off"
          spellCheck={false}
        />
      </form>
    </div>
  );
}
