import { useState } from 'react';
import { profile, projects, archive, stack } from '../data/content';
import { Arrow, GitHubIcon } from '../components/Logo';

export const CHAPTERS = [
  { id: 'hero', label: 'O Monólito' },
  { id: 'manifesto', label: 'O Corredor' },
  { id: 'projetos', label: 'A Galeria' },
  { id: 'sobre', label: 'O Núcleo' },
  { id: 'stack', label: 'As Órbitas' },
  { id: 'contato', label: 'A Marca' },
];

function Chars({ text }: { text: string }) {
  return (
    <span className="chars" aria-label={text}>
      {text.split(' ').map((w, wi) => (
        <span className="w" key={wi} aria-hidden="true">
          {w.split('').map((c, ci) => (
            <span className="c" key={ci}>
              {c}
            </span>
          ))}
        </span>
      ))}
    </span>
  );
}

export function Chapters({ onOpen, images }: { onOpen: (i: number) => void; images: string[] }) {
  const [active, setActive] = useState<string | null>(null);
  const used = active ? stack.find((s) => s.name === active)?.used ?? [] : [];

  return (
    <main className="track" id="conteudo">
      {/* 01 — Monólito */}
      <section className="ch ch--hero" id="hero" aria-labelledby="hero-title">
        <div className="hero__top">
          <p className="hero__statement">
            <span className="mask"><span>Desenvolvedor <b>full stack</b> —</span></span>
            <span className="mask"><span>ERPs, <b>APIs REST</b> e automações</span></span>
            <span className="mask"><span>com TypeScript, JavaScript & Python.</span></span>
          </p>
        </div>
        <div className="hero__bottom">
          <h1 className="hero__name" id="hero-title">
            <span className="mask"><span>Paulo</span></span>
            <span className="mask"><span className="thin">Silva</span></span>
          </h1>
          <a className="hero__scroll mono" href="#manifesto">
            <i /> [ ROLE ] para entrar no núcleo
          </a>
        </div>
      </section>

      {/* 02 — Corredor */}
      <section className="ch ch--manifesto" id="manifesto" aria-label="Abordagem">
        <div className="sticky">
          <p className="mono ch__label">[02] Abordagem</p>
          <p className="manifesto__line" data-line="0">Meus projetos vivem na parte que ninguém vê:</p>
          <p className="manifesto__line hl" data-line="1">autenticação, validação, papéis de acesso e regras de negócio.</p>
          <p className="manifesto__line" data-line="2">E em interfaces que deixam tudo isso simples para quem usa no dia a dia.</p>
        </div>
      </section>

      {/* 03 — Galeria */}
      <section className="ch ch--gallery" id="projetos" aria-label="Projetos">
        {projects.map((p, i) => (
          <article className="proj" id={`p-${p.id}`} key={p.id} aria-labelledby={`t-${p.id}`}>
            <div className="sticky proj__stage">
              <p className="mono proj__kicker">
                <b>[{p.index}]</b> {p.kicker}
              </p>
              <h2 className="proj__name" id={`t-${p.id}`}>
                <Chars text={p.name} />
              </h2>
              <button className="proj__open mono" onClick={() => onOpen(i)} data-cursor>
                [ abrir projeto ]
              </button>
              <div className="proj__meta mono">
                <span>{p.stack.slice(0, 4).join(' · ')}</span>
                <span>
                  {p.index} / {String(projects.length).padStart(2, '0')}
                </span>
              </div>
              <div className="proj__lite">
                <img src={images[i]} alt={p.preview.kind === 'image' ? p.preview.alt : `Ilustração de ${p.name}`} loading="lazy" />
                <p>{p.summary}</p>
              </div>
            </div>
          </article>
        ))}
        <div className="archive">
          <p className="mono ch__label">Arquivo · outros repositórios</p>
          <ul>
            {archive.map((a) => (
              <li key={a.name}>
                <a href={a.url} target="_blank" rel="noopener noreferrer" data-cursor>
                  <strong>{a.name}</strong>
                  <span>{a.note}</span>
                  <em className="mono">{a.tags.join(' · ')} ↗</em>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 04 — Núcleo */}
      <section className="ch ch--about" id="sobre" aria-labelledby="sobre-title">
        <div className="sticky about">
          <p className="mono ch__label" id="sobre-title">[04] Sobre</p>
          <p className="about__quote">
            Sou Paulo, desenvolvedor full stack. Escrevo sistemas para <em>operações reais</em>: estoque, pedidos, financeiro,
            acesso de usuários.
          </p>
          <div className="about__cols">
            <p>
              Os projetos mais recentes no meu GitHub são ERPs internos, com autenticação, papéis de acesso, validação de dados e
              integrações com ferramentas que a empresa já usa, como Tray, Tiny e Supabase.
            </p>
            <p>
              Quando quero entender algo a fundo, construo sem framework: a API de tarefas roda em TypeScript nativo no Node 22,
              sem nenhuma dependência. No front, comecei com HTML, CSS e JavaScript puros e hoje uso React.
            </p>
          </div>
          <div className="about__facts mono">
            <span><b>{profile.publicRepos}</b> repositórios públicos</span>
            <span><b>{profile.since}</b> no GitHub desde</span>
            <span><b>0</b> dependências na API</span>
          </div>
        </div>
      </section>

      {/* 05 — Órbitas */}
      <section className="ch ch--stack" id="stack" aria-labelledby="stack-title">
        <div className="sticky stackx">
          <p className="mono ch__label" id="stack-title">[05] Ferramentas em uso · tiradas dos repositórios</p>
          <div className={`stackx__words${active ? ' has-active' : ''}`} onPointerLeave={() => setActive(null)}>
            {stack.map((s) => (
              <button
                key={s.name}
                type="button"
                className={`tech${active === s.name ? ' is-active' : ''}`}
                aria-pressed={active === s.name}
                onPointerEnter={() => setActive(s.name)}
                onFocus={() => setActive(s.name)}
                onBlur={() => setActive(null)}
                onClick={() => setActive((v) => (v === s.name ? null : s.name))}
                data-cursor
              >
                {s.name}
                <sup>{s.used.length}</sup>
              </button>
            ))}
          </div>
          <div className="stackx__map mono" aria-live="polite">
            <p>{active ? `${active} aparece em:` : 'Passe o cursor numa tecnologia. O número é a contagem de projetos, não um nível.'}</p>
            <ul>
              {projects.map((p) => (
                <li key={p.id} className={used.includes(p.index) ? 'on' : active ? 'off' : ''}>
                  <b>{p.index}</b> {p.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 06 — Marca */}
      <section className="ch ch--outro" id="contato" aria-labelledby="contato-title">
        <div className="sticky outro">
          <h2 className="outro__title" id="contato-title">
            <span className="mask"><span>Vamos construir</span></span>
            <span className="mask"><span className="thin">o próximo?</span></span>
          </h2>
          <p>Os projetos, o código e o histórico estão no GitHub. Para falar comigo, comece por lá.</p>
          <a className="btn" href={profile.github} target="_blank" rel="noopener noreferrer" data-cursor>
            <GitHubIcon /> github.com/{profile.handle} <Arrow />
          </a>
          <footer className="foot mono">
            <span>© {new Date().getFullYear()} Paulo Silva · silvadev.xyz</span>
            <span>Mundo 3D, código e design feitos do zero</span>
          </footer>
        </div>
      </section>
    </main>
  );
}
