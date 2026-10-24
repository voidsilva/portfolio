import { useState } from 'react';
import { profile, projects, archive, stack } from '../data/content';
import { Arrow, GitHubIcon } from '../components/Logo';
import { Roll } from './Hud';

export const CHAPTERS = [
  { id: 'hero', label: 'Início' },
  { id: 'manifesto', label: 'Abordagem' },
  { id: 'projetos', label: 'Projetos' },
  { id: 'sobre', label: 'Sobre' },
  { id: 'stack', label: 'Ferramentas' },
  { id: 'contato', label: 'Contato' },
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

  return (
    <main className="track" id="conteudo">
      {/* 01 · Monólito */}
      <section className="ch ch--hero" id="hero" aria-labelledby="hero-title">
        <div className="hero__bottom">
          <div>
          <p className="hero__role">Desenvolvedor full stack</p>
          <h1 className="hero__name" id="hero-title">
            <span className="mask"><span>Paulo</span></span>
            <span className="mask"><span className="thin">Silva</span></span>
            <span className="ink" aria-hidden="true">
              <span className="mask"><span>Paulo</span></span>
              <span className="mask"><span>Silva</span></span>
            </span>
          </h1>
          </div>
          <a className="hero__scroll mono" href="#manifesto">
            <i /> Role para explorar
          </a>
        </div>
      </section>

      {/* 02 · Corredor */}
      <section className="ch ch--manifesto" id="manifesto" aria-label="Abordagem">
        <div className="sticky">
          <p className="manifesto__line" data-line="0">Meus projetos vivem na parte que ninguém vê:</p>
          <p className="manifesto__line hl" data-line="1">autenticação, validação, papéis de acesso e regras de negócio.</p>
          <p className="manifesto__line" data-line="2">E em interfaces que deixam tudo isso simples para quem usa no dia a dia.</p>
        </div>
      </section>

      {/* 03 · Galeria */}
      <section className="ch ch--gallery" id="projetos" aria-label="Projetos">
        {projects.map((p, i) => (
          <article className="proj" id={`p-${p.id}`} key={p.id} aria-labelledby={`t-${p.id}`}>
            <div className="sticky proj__stage">
              <div className="proj__text">
                <p className="proj__kicker">
                  <b>{p.index}</b> {p.kicker}
                </p>
                <h2 className="proj__name" id={`t-${p.id}`}>
                  <Chars text={p.name} />
                </h2>
                <p className="proj__sum">{p.summary.split('. ')[0]}.</p>
                <div className="proj__actions">
                  <button className="cta" onClick={() => onOpen(i)} data-cursor>
                    <Roll>Ver detalhes</Roll>
                    <span className="cta__dot" aria-hidden="true">
                      <Arrow />
                    </span>
                  </button>
                </div>
              </div>
              <div className="proj__lite">
                <img src={images[i]} alt={p.preview.kind === 'image' ? p.preview.alt : `Ilustração de ${p.name}`} loading="lazy" />
              </div>
            </div>
          </article>
        ))}
        <div className="archive">
          <p className="mono ch__label">Mais trabalhos</p>
          <ul className="worklist">
            {archive.map((a) => (
              <li key={a.name}>
                <a href={a.url} target="_blank" rel="noopener noreferrer" data-cursor>
                  <strong>
                    <Roll>{a.name}</Roll>
                  </strong>
                  <span>{a.note}</span>
                  <em>{a.tags.join(' · ')}</em>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 04 · Núcleo */}
      <section className="ch ch--about" id="sobre" aria-labelledby="sobre-title">
        <div className="sticky about">
          <p className="mono ch__label" id="sobre-title">Sobre</p>
          <p className="about__quote">
            Sou Paulo, desenvolvedor full stack. Escrevo sistemas para <em>operações reais</em>: estoque, pedidos, financeiro,
            acesso de usuários.
          </p>
          <div className="about__facts mono">
            <span><b>{profile.publicRepos}</b> repositórios públicos</span>
            <span><b>{profile.since}</b> no GitHub desde</span>
            <span><b>0</b> dependências na API</span>
          </div>
        </div>
      </section>

      {/* 05 · Órbitas */}
      <section className="ch ch--stack" id="stack" aria-labelledby="stack-title">
        <div className="sticky stackx">
          <p className="mono ch__label" id="stack-title">Ferramentas em uso, tiradas dos repositórios</p>
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
        </div>
      </section>

      {/* 06 · Marca */}
      <section className="ch ch--outro" id="contato" aria-labelledby="contato-title">
        <div className="sticky outro">
          <h2 className="outro__title" id="contato-title">
            <span className="mask"><span>Vamos construir</span></span>
            <span className="mask"><span className="thin">o próximo?</span></span>
          </h2>
          <a className="cta cta--big" href={profile.github} target="_blank" rel="noopener noreferrer" data-cursor>
            <GitHubIcon /> <Roll>{`github.com/${profile.handle}`}</Roll>
            <span className="cta__dot" aria-hidden="true">
              <Arrow />
            </span>
          </a>
          <footer className="foot mono">
            <span>© {new Date().getFullYear()} Paulo Silva · silvadev.xyz</span>
            <span>Design e código por Paulo Silva</span>
          </footer>
        </div>
      </section>
    </main>
  );
}
