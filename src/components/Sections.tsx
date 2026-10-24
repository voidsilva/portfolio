import { useLayoutEffect, useRef, useState } from 'react';
import { gsap, prefersReduced, splitWords } from '../lib/motion';
import { profile, projects, stack } from '../data/content';
import { Arrow, GitHubIcon } from './Logo';
import { useMagnetic } from './Chrome';

export function About() {
  const root = useRef<HTMLElement>(null);
  const quote = useRef<HTMLParagraphElement>(null);

  useLayoutEffect(() => {
    if (prefersReduced()) return;
    const ctx = gsap.context(() => {
      const words = splitWords(quote.current!);
      words.forEach((w) => {
        const m = document.createElement('span');
        m.className = 'mask';
        m.style.display = 'inline-block';
        w.replaceWith(m);
        m.appendChild(w);
      });
      gsap.from(words, { yPercent: 110, stagger: 0.025, duration: 1.1, scrollTrigger: { trigger: quote.current, start: 'top 80%' } });
      gsap.from('.about__cols p, .about__facts > div, .about__label', {
        autoAlpha: 0, y: 24, stagger: 0.08, scrollTrigger: { trigger: '.about__cols', start: 'top 85%' },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section className="section about" id="sobre" ref={root} aria-labelledby="sobre-title">
      <p className="about__label label" id="sobre-title">
        <b>02</b> · Sobre
      </p>
      <p className="about__quote" ref={quote}>
        Sou Paulo, desenvolvedor full stack. Escrevo sistemas para <em>operações reais</em>: estoque, pedidos, financeiro, acesso de
        usuários.
      </p>
      <div className="about__cols">
        <p>
          Os projetos mais recentes no meu GitHub são ERPs internos, com autenticação, papéis de acesso, validação de dados e
          integrações com ferramentas que a empresa já usa, como Tray, Tiny e Supabase.
        </p>
        <p>
          Quando quero entender algo a fundo, construo sem framework. A API de tarefas, por exemplo, roda em TypeScript nativo no
          Node 22, sem nenhuma dependência, com testes e CI. No front, comecei com HTML, CSS e JavaScript puros e hoje uso React.
        </p>
      </div>
      <div className="about__facts">
        <div>
          <strong>
            {profile.publicRepos}
            <sup>●</sup>
          </strong>
          <span className="label">repositórios públicos</span>
        </div>
        <div>
          <strong>{profile.since}</strong>
          <span className="label">no GitHub desde</span>
        </div>
        <div>
          <strong>0</strong>
          <span className="label">dependências na API</span>
        </div>
      </div>
    </section>
  );
}

const groups = ['Linguagem', 'Front', 'Back', 'Dados', 'Infra'] as const;

export function Stack() {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState<string | null>(null);
  const used = active ? stack.find((s) => s.name === active)?.used ?? [] : [];

  useLayoutEffect(() => {
    if (prefersReduced()) return;
    const ctx = gsap.context(() => {
      // fromTo explícito: .tech e .map-row têm transição CSS de opacidade,
      // e um from() leria o valor no meio da transição.
      const st = { trigger: '.stack__groups', start: 'top 80%' };
      gsap.fromTo('.stack__group', { autoAlpha: 0, y: 30 }, { autoAlpha: 1, y: 0, stagger: 0.08, scrollTrigger: st });
      gsap.fromTo('.tech', { autoAlpha: 0, yPercent: 60 }, { autoAlpha: 1, yPercent: 0, stagger: 0.025, duration: 0.9, clearProps: 'opacity,visibility', scrollTrigger: st });
      gsap.fromTo('.map-row', { autoAlpha: 0 }, { autoAlpha: 1, stagger: 0.06, clearProps: 'opacity,visibility', scrollTrigger: { trigger: '.stack__map', start: 'top 85%' } });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section className="section" id="stack" ref={root} aria-labelledby="stack-title">
      <header className="section-head">
        <h2 id="stack-title">
          Ferramentas <span className="thin">em uso</span>
        </h2>
        <span className="label">
          <b>03</b> · tirado dos repositórios
        </span>
      </header>
      <div className="stack__grid">
        <div className={`stack__groups${active ? ' has-active' : ''}`} onPointerLeave={() => setActive(null)}>
          {groups.map((g) => (
            <div className="stack__group" key={g}>
              <span className="label">{g}</span>
              <div className="stack__words">
                {stack
                  .filter((s) => s.group === g)
                  .map((s) => (
                    <button
                      key={s.name}
                      type="button"
                      className={`tech${active === s.name ? ' is-active' : ''}`}
                      aria-pressed={active === s.name}
                      onPointerEnter={() => setActive(s.name)}
                      onFocus={() => setActive(s.name)}
                      onBlur={() => setActive(null)}
                      onClick={() => setActive((v) => (v === s.name ? null : s.name))}
                    >
                      {s.name}
                      <sup>{s.used.length}</sup>
                    </button>
                  ))}
              </div>
            </div>
          ))}
        </div>
        <aside className={`stack__map${active ? ' has-active' : ''}`} aria-live="polite">
          <p>
            {active
              ? `${active} aparece em ${used.length} ${used.length === 1 ? 'projeto' : 'projetos'}:`
              : 'Passe o cursor ou toque numa tecnologia para ver em quais projetos ela aparece. O número ao lado é a contagem de projetos, não um nível.'}
          </p>
          {projects.map((p) => (
            <a key={p.id} href={`#p-${p.id}`} className={`map-row${used.includes(p.index) ? ' is-on' : ''}`}>
              <b>{p.index}</b>
              <span>{p.name}</span>
              <i />
            </a>
          ))}
        </aside>
      </div>
    </section>
  );
}

export function Outro() {
  const root = useRef<HTMLElement>(null);
  const btn = useMagnetic<HTMLAnchorElement>(0.4);

  useLayoutEffect(() => {
    if (prefersReduced()) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ scrollTrigger: { trigger: root.current, start: 'top 55%' } });
      tl.from('.outro__title .mask > span', { yPercent: 110, stagger: 0.1, duration: 1.2 })
        .from('.outro p, .outro .btn', { autoAlpha: 0, y: 20, stagger: 0.08 }, '<0.4');
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section className="section outro" id="contato" ref={root} aria-labelledby="contato-title">
      <span className="outro__space" aria-hidden="true" />
      <h2 className="outro__title" id="contato-title">
        <span className="mask">
          <span>Vamos construir</span>
        </span>
        <span className="mask">
          <span className="thin">o próximo?</span>
        </span>
      </h2>
      <p>Os projetos, o código e o histórico estão no GitHub. Para falar comigo, comece por lá.</p>
      <a className="btn btn--primary" href={profile.github} target="_blank" rel="noopener noreferrer" ref={btn}>
        <GitHubIcon /> github.com/{profile.handle} <Arrow />
      </a>
    </section>
  );
}
