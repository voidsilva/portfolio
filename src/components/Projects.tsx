import { useLayoutEffect, useRef } from 'react';
import { gsap, prefersReduced, tilt } from '../lib/motion';
import { archive, projects, type Project } from '../data/content';
import { Arrow, GitHubIcon } from './Logo';

function ErpMock() {
  const side = ['Dashboard', 'Produtos', 'Alertas', 'Pedidos', 'Logística'];
  const admin = ['Auditoria', 'Usuários', 'Perfil', 'Configurações'];
  return (
    <div className="erp" role="img" aria-label="Ilustração da interface do Belaways Intelligence com seus módulos">
      <div className="erp__side">
        <small>OPERAÇÃO</small>
        {side.map((s, i) => (
          <span key={s} className={i === 0 ? 'on' : undefined}>
            {s}
          </span>
        ))}
        <small>ADMINISTRAÇÃO</small>
        {admin.map((s) => (
          <span key={s}>{s}</span>
        ))}
      </div>
      <div className="erp__main">
        <div className="erp__search">Pesquisar produto ou SKU</div>
        {['Estoque', 'Pedidos', 'Alertas', 'Logística'].map((s, i) => (
          <div className="erp__card" key={s}>
            <small>{s}</small>
            <div className={`bar${i === 0 ? ' p' : ''}`} style={{ width: `${[78, 54, 32, 64][i]}%` }} />
          </div>
        ))}
        <div className="erp__card erp__chart">
          <small>Indicadores</small>
          <svg viewBox="0 0 400 130" preserveAspectRatio="none" aria-hidden="true">
            <path className="erp-line" d="M0 110 C40 100 60 70 100 76 S170 40 210 54 S290 20 330 30 S380 12 400 8" fill="none" stroke="#8B5CF6" strokeWidth="2" />
            <path d="M0 120 C60 116 90 104 140 108 S240 90 300 96 S370 84 400 80" fill="none" stroke="rgba(244,245,250,.25)" strokeWidth="1.5" />
          </svg>
        </div>
        <div className="erp__card erp__roles">
          <small>Papéis</small>
          <span>admin</span>
          <span>manager</span>
          <span>operator</span>
          <span>viewer</span>
        </div>
      </div>
    </div>
  );
}

function Terminal() {
  const routes: [string, string, string][] = [
    ['GET', '/health', 'público'],
    ['POST', '/auth/register', 'público'],
    ['POST', '/auth/login', 'accessToken'],
    ['GET', '/tasks?page=1&limit=10', 'JWT'],
    ['GET', '/tasks/:id', 'JWT'],
    ['POST', '/tasks', 'JWT'],
    ['PATCH', '/tasks/:id', 'JWT'],
    ['DELETE', '/tasks/:id', 'JWT'],
  ];
  return (
    <div className="term">
      {routes.map(([m, r, a]) => (
        <div className="term__line" key={m + r}>
          <span className={`m${m === 'GET' ? ' get' : ''}`}>{m}</span>
          <span className="r">{r}</span>
          <span className="a">{a}</span>
        </div>
      ))}
      <div className="term__sep" />
      <div className="term__line">
        <span className="m">$</span>
        <span className="r">npm test</span>
      </div>
      <div className="term__line">
        <span className="m term__ok">✓</span>
        <span className="r">9 testes de integração com node:test</span>
      </div>
      <div className="term__sep" />
      <pre className="term__json">
        {'{\n  '}
        <span className="k">"data"</span>
        {': [{ '}
        <span className="k">"title"</span>
        {': "Emitir nota fiscal", '}
        <span className="k">"done"</span>
        {': false }],\n  '}
        <span className="k">"meta"</span>
        {': { '}
        <span className="k">"page"</span>
        {': 1, '}
        <span className="k">"limit"</span>
        {': 10, '}
        <span className="k">"totalPages"</span>
        {': 1 }\n}'}
      </pre>
    </div>
  );
}

function Media({ p }: { p: Project }) {
  const host = p.demo ? new URL(p.demo.url).host + new URL(p.demo.url).pathname.replace(/\/$/, '') : `github.com/voidsilva/${p.repo.split('/').pop()}`;
  return (
    <div className="project__media" data-tilt={p.preview.kind === 'image' ? '' : undefined}>
      <div className="media-bar" aria-hidden="true">
        <i />
        <i />
        <i />
        <span>{p.preview.kind === 'terminal' ? 'localhost:3000 · api-rest-tarefas' : host}</span>
      </div>
      <div className="media-inner">
        {p.preview.kind === 'image' && <img src={p.preview.src} alt={p.preview.alt} loading="lazy" decoding="async" width={1568} height={751} />}
        {p.preview.kind === 'erp' && <ErpMock />}
        {p.preview.kind === 'terminal' && <Terminal />}
      </div>
    </div>
  );
}

function ProjectBlock({ p }: { p: Project }) {
  const info = (
    <div className="project__info">
      <div className="project__kicker label">
        <b>{p.index}</b> <span>{p.kicker}</span>
      </div>
      <h3 className="project__name" id={`t-${p.id}`}>
        <span className="mask">
          <span>{p.name}</span>
        </span>
      </h3>
      <p className="project__summary">{p.summary}</p>
      <div className="ps">
        <div>
          <span className="label">Problema</span>
          <p>{p.problem}</p>
        </div>
        <div>
          <span className="label">Solução</span>
          <p>{p.solution}</p>
        </div>
      </div>
      {p.layout !== 'wide' && <Chips stack={p.stack} />}
      {p.layout !== 'wide' && <Links p={p} />}
    </div>
  );
  return (
    <article className={`project project--${p.layout}`} id={`p-${p.id}`} aria-labelledby={`t-${p.id}`}>
      <span className="project__num" aria-hidden="true">
        {p.index}
      </span>
      {p.layout === 'offset' || p.layout === 'wide' || p.layout === 'stack' ? (
        <>
          {p.layout === 'stack' ? info : null}
          <Media p={p} />
          {p.layout !== 'stack' ? info : null}
        </>
      ) : (
        <>
          {info}
          <Media p={p} />
        </>
      )}
      {p.layout === 'wide' && (
        <div className="project__aside" style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <span className="label">Tecnologias</span>
          <Chips stack={p.stack} />
          <Links p={p} />
          <p className="label" style={{ textTransform: 'none', letterSpacing: 0 }}>
            * Ilustração montada a partir dos módulos do repositório. O sistema real exige login.
          </p>
        </div>
      )}
    </article>
  );
}

function Chips({ stack }: { stack: string[] }) {
  return (
    <ul className="chips" aria-label="Tecnologias">
      {stack.map((s) => (
        <li key={s}>{s}</li>
      ))}
    </ul>
  );
}

function Links({ p }: { p: Project }) {
  return (
    <div className="project__links">
      <a className="link" href={p.repo} target="_blank" rel="noopener noreferrer">
        <GitHubIcon /> Repositório
      </a>
      {p.demo && (
        <a className="link" href={p.demo.url} target="_blank" rel="noopener noreferrer">
          {p.demo.label} <Arrow />
        </a>
      )}
    </div>
  );
}

export function Projects() {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const cleanups: (() => void)[] = [];
    root.current?.querySelectorAll<HTMLElement>('[data-tilt]').forEach((el) => cleanups.push(tilt(el, 5)));
    if (prefersReduced()) return () => cleanups.forEach((c) => c());

    const ctx = gsap.context(() => {
      gsap.from('.section-head .mask > span', {
        yPercent: 110,
        stagger: 0.08,
        scrollTrigger: { trigger: '.section-head', start: 'top 85%' },
      });

      gsap.utils.toArray<HTMLElement>('.project').forEach((el) => {
        const media = el.querySelector<HTMLElement>('.project__media')!;
        const inner = el.querySelector<HTMLElement>('.media-inner')!;
        const st = { trigger: el, start: 'top 78%' };

        gsap.from(el.querySelector('.project__name .mask > span'), { yPercent: 110, duration: 1.2, scrollTrigger: st });
        gsap.from(el.querySelectorAll('.project__kicker, .project__summary, .ps, .chips, .project__links, .project__aside > *'), {
          autoAlpha: 0,
          y: 24,
          stagger: 0.07,
          duration: 1,
          scrollTrigger: st,
        });
        gsap.fromTo(
          el.querySelector('.project__num'),
          { yPercent: 25 },
          { yPercent: -35, ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true } },
        );

        // Cada projeto entra em cena de um jeito.
        if (el.classList.contains('project--wide')) {
          gsap.fromTo(media, { clipPath: 'inset(18% 8% 18% 8% round 14px)' }, {
            clipPath: 'inset(0% 0% 0% 0% round 14px)', ease: 'none',
            scrollTrigger: { trigger: el, start: 'top 90%', end: 'top 25%', scrub: true },
          });
          gsap.fromTo(inner, { scale: 1.12 }, { scale: 1, ease: 'none', scrollTrigger: { trigger: el, start: 'top 90%', end: 'top 25%', scrub: true } });
          gsap.from(el.querySelectorAll('.erp__card, .erp__side span'), { autoAlpha: 0, y: 14, stagger: 0.03, duration: 0.8, scrollTrigger: { trigger: el, start: 'top 55%' } });
          gsap.fromTo(el.querySelector('.erp-line'), { strokeDasharray: 600, strokeDashoffset: 600 }, { strokeDashoffset: 0, duration: 2, ease: 'power2.inOut', scrollTrigger: { trigger: el, start: 'top 45%' } });
        } else if (el.classList.contains('project--split')) {
          gsap.from(media, { autoAlpha: 0, y: 60, duration: 1.2, scrollTrigger: st });
          gsap.from(el.querySelectorAll('.term__line, .term__sep, .term__json'), {
            autoAlpha: 0, x: -12, stagger: 0.06, duration: 0.5, ease: 'power2.out', scrollTrigger: { trigger: el, start: 'top 60%' },
          });
        } else if (el.classList.contains('project--offset')) {
          gsap.fromTo(media, { clipPath: 'inset(0% 100% 0% 0%)', x: -40 }, {
            clipPath: 'inset(0% 0% 0% 0%)', x: 0, duration: 1.6, ease: 'expo.inOut', scrollTrigger: st,
          });
          gsap.fromTo(inner, { yPercent: -6 }, { yPercent: 6, ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true } });
        } else if (el.classList.contains('project--stack')) {
          gsap.fromTo(media, { scale: 0.82, borderRadius: 40 }, {
            scale: 1, borderRadius: 14, ease: 'none', scrollTrigger: { trigger: media, start: 'top bottom', end: 'center center', scrub: true },
          });
        } else if (el.classList.contains('project--float')) {
          gsap.fromTo(media, { y: 120, rotate: 7 }, {
            y: -20, rotate: 1.5, ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom 40%', scrub: true },
          });
        }
      });

      gsap.from('.archive li', { autoAlpha: 0, y: 20, stagger: 0.06, duration: 0.9, scrollTrigger: { trigger: '.archive', start: 'top 80%' } });
    }, root);

    return () => {
      cleanups.forEach((c) => c());
      ctx.revert();
    };
  }, []);

  return (
    <section className="section projects" id="projetos" ref={root} aria-labelledby="projetos-title">
      <header className="section-head">
        <h2 id="projetos-title">
          <span className="mask">
            <span>Projetos</span>
          </span>
          <span className="mask">
            <span className="thin">selecionados</span>
          </span>
        </h2>
        <span className="label">
          <b>01</b> · {projects.length} de {projects.length + archive.length} públicos
        </span>
      </header>

      {projects.map((p) => (
        <ProjectBlock key={p.id} p={p} />
      ))}

      <div className="archive">
        <h3>Arquivo</h3>
        <ul>
          {archive.map((a) => (
            <li key={a.name}>
              <a href={a.url} target="_blank" rel="noopener noreferrer">
                <strong>{a.name}</strong>
                <p>{a.note}</p>
                <span className="arrow">{a.tags.join(' · ')} ↗</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
