// Monta o HTML do site em tempo de build (vite.config.ts injeta no index.html).
// O conteúdo chega pronto no HTML: aparece sem esperar JavaScript e o Google lê tudo.
import { profile, projects, archive, services, faq, type Project } from './data/content';

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const LOGO = `<svg class="mark" viewBox="0 0 64 64" fill="none" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M33 18H19a7 7 0 0 0 0 14h8a7 7 0 0 1 0 14H11" stroke="var(--ink)" stroke-width="8"/><path d="M36 12h1a20 20 0 0 1 0 40h-1" stroke="var(--purple)" stroke-width="8"/><circle cx="27" cy="7.5" r="3.4" fill="var(--cyan)"/></svg>`;
const ARROW = `<svg class="arr" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M4 12 12 4M5.5 4H12v6.5" stroke="currentColor" stroke-width="1.6"/></svg>`;
const GH = `<svg class="gh" viewBox="0 0 16 16" aria-hidden="true"><path fill="currentColor" d="M8 0C3.58 0 0 3.58 0 8a8 8 0 0 0 5.47 7.59c.4.07.55-.17.55-.38v-1.33c-2.23.48-2.7-1.07-2.7-1.07-.36-.92-.89-1.17-.89-1.17-.73-.5.06-.49.06-.49.8.06 1.23.83 1.23.83.71 1.22 1.87.87 2.33.66.07-.52.28-.87.5-1.07-1.78-.2-3.65-.89-3.65-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.6 7.6 0 0 1 4 0c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.66 3.95.29.25.54.73.54 1.48v2.2c0 .21.15.46.55.38A8 8 0 0 0 16 8c0-4.42-3.58-8-8-8Z"/></svg>`;

/** Palavra de vidro (desenhada no WebGL); o texto fica para leitores de tela e para o modo sem WebGL. */
const word = (w: string) => `<p class="stage__word" aria-hidden="true">${w}</p>`;
const cap = (t: string) => `<div class="sc__cap"><p class="stage__sub" data-glass="pill">${t}</p></div>`;

function caseBlock(p: Project, i: number) {
  const img = p.preview.kind === 'image' ? p.preview : null;
  return `<article class="proj"><div class="proj__card" data-glass="sheet">
    <button type="button" class="case__media" data-open="${i}" aria-label="Ver detalhes de ${esc(p.name)}">
      <span class="case__tilt" data-glass="img" data-img="${i}">${img ? `<img src="${img.src}" alt="${esc(img.alt)}" width="1600" height="1000" loading="lazy" decoding="async" />` : ''}<span class="case__shine"></span></span>
    </button>
    <div class="case__meta">
      <p class="case__n">${p.index} / 0${projects.length}</p>
      <p class="case__kicker">${esc(p.kicker)}</p>
      <h3 class="case__name">${esc(p.name)}</h3>
      <p class="case__sum">${esc(p.summary)}</p>
      <ul class="tags">${p.stack.slice(0, 5).map((s) => `<li>${esc(s)}</li>`).join('')}</ul>
      <div class="case__links">
        <button type="button" class="btn btn--solid" data-open="${i}">Ver o case ${ARROW}</button>
        <a class="link" href="${p.repo}" target="_blank" rel="noopener noreferrer">${GH} Código</a>
      </div>
    </div>
  </div></article>`;
}

const STEPS = [
  ['Entendo o que dói', 'Converso com quem usa a planilha todo dia. Antes de escrever código, eu sei de onde vem cada número.'],
  ['Desenho o sistema', 'Dados, perfis de acesso e telas. Você aprova o desenho antes de qualquer linha.'],
  ['Construo em partes', 'Etapas curtas e já usáveis. Cada parte entra no ar e recebe o seu retorno.'],
  ['Coloco no ar e cuido', 'Deploy, migração dos dados antigos e acompanhamento nas primeiras semanas.'],
];

/*
 * Cada seção é uma cena. Com WebGL, a página fica presa na tela e a rolagem vira um roteiro:
 * cada passagem tem um movimento próprio (mergulho, deslize de lado, onda de vidro, cartas,
 * implosão, gota). Sem WebGL ou no modo sem animações, as mesmas cenas viram uma página comum.
 */
export function renderApp() {
  const archiveRows = archive
    .map((a) => {
      const inner = `<span class="arc__name">${esc(a.name)}</span><span class="arc__note">${esc(a.note)}</span><span class="arc__tags">${a.tags.map(esc).join(' · ')}</span><span class="arc__go">${a.url ? `Código ${ARROW}` : 'Exemplo'}</span>`;
      return a.url ? `<li><a class="arc" href="${a.url}" target="_blank" rel="noopener noreferrer">${inner}</a></li>` : `<li><div class="arc arc--idea">${inner}</div></li>`;
    })
    .join('');

  return `
<a class="skip" href="#projetos" data-go="projetos">Pular para os projetos</a>
<canvas class="liquid" aria-hidden="true"></canvas>
<div class="loader" aria-hidden="true"><span class="loader__n">0</span><span class="loader__t">derretendo o vidro</span></div>

<header class="head" data-glass="head">
  <a class="brand" href="#inicio" data-go="inicio" aria-label="SilvaDev, voltar ao início">${LOGO}<span>Silva<em>Dev</em></span></a>
  <nav class="nav" aria-label="Seções">
    <a href="#projetos" data-go="projetos">Projetos</a>
    <a href="#servicos" data-go="servicos">Serviços</a>
    <a href="#contato" data-go="contato">Contato</a>
  </nav>
  <button class="tbtn" type="button" data-theme-toggle aria-label="Trocar tema claro ou escuro"><span></span></button>
</header>

<main id="inicio" class="stage">
  <section class="sc sc--hero" aria-labelledby="hero-t">
    <h1 class="vh" id="hero-t">SilvaDev, Paulo Silva: sistemas sob medida</h1>
    ${word('SilvaDev')}
    <p class="hero__who"><b>Paulo Silva</b><span>Desenvolvedor full stack · Brasil</span></p>
    <div class="hero__foot">
      <p class="hero__sub">Eu tiro empresas da planilha. ERPs, painéis e integrações sob medida, do banco de dados à tela.</p>
      <a class="btn btn--solid" href="#projetos" data-go="projetos">Ver projetos ${ARROW}</a>
    </div>
    <p class="hero__hint" aria-hidden="true"><span>O mouse é a luz · clique para fazer ondas · role para atravessar o vidro</span></p>
  </section>

  <section class="sc sc--about" id="sobre" aria-labelledby="about-t">
    <div class="sheet sheet--about" data-glass="sheet">
      <p class="kicker">Como eu trabalho</p>
      <h2 class="h2" id="about-t">Sistemas que a equipe usa todo dia, sem manual.</h2>
      <ol class="steps">${STEPS.map((s, i) => `<li class="step"><span class="step__n">0${i + 1}</span><h3>${s[0]}</h3><p>${s[1]}</p></li>`).join('')}</ol>
    </div>
  </section>

  <section class="sc sc--work" id="projetos" aria-labelledby="projetos-t">
    <h2 class="vh" id="projetos-t">Projetos</h2>
    ${word('Projetos')}
    <div class="track">
      <div class="proj proj--word">${cap('Trabalho real, em produção')}</div>
      ${projects.map(caseBlock).join('')}
      <div class="proj"><div class="proj__card proj__card--more" data-glass="sheet">
        <h3 class="h3">Outros trabalhos</h3>
        <p class="muted">Com link: código aberto no GitHub. Sem link: exemplos do que eu construo.</p>
        <ul class="arcs">${archiveRows}</ul>
      </div></div>
    </div>
  </section>

  <section class="sc sc--svc" id="servicos" aria-labelledby="servicos-t">
    <h2 class="vh" id="servicos-t">Serviços</h2>
    ${word('Serviços')}
    ${cap('Do banco de dados até a tela')}
    <ul class="svc">
      ${services.map((s, i) => `<li class="svc__item" data-glass="card"><span class="svc__n">${String(i + 1).padStart(2, '0')}</span><h3>${esc(s.name)}</h3><p>${esc(s.note)}</p><span class="svc__tags">${s.tags.map(esc).join(' · ')}</span></li>`).join('')}
    </ul>
  </section>

  <section class="sc sc--faq" id="faq" aria-labelledby="faq-t">
    <div class="sheet sheet--faq" data-glass="sheet">
      <h2 class="h3" id="faq-t">Perguntas que sempre aparecem</h2>
      <div class="faq__list">${faq.map((f) => `<details class="faq__item" name="faq"><summary><span>${esc(f.q)}</span><i aria-hidden="true"></i></summary><p>${esc(f.a)}</p></details>`).join('')}</div>
    </div>
  </section>

  <section class="sc sc--cta" id="contato" aria-labelledby="cta-t">
    ${word('Contato')}
    <div class="sheet sheet--cta" data-glass="sheet">
      <h2 class="cta__title" id="cta-t">Qual planilha a gente aposenta primeiro?</h2>
      <p class="lead">Me conta o processo que mais dá trabalho hoje. Não precisa chegar com tudo definido.</p>
      <div class="cta__row">
        <a class="btn btn--solid btn--big" href="${profile.github}" target="_blank" rel="noopener noreferrer">${GH} Falar comigo no GitHub ${ARROW}</a>
        <button class="copy" type="button" data-copy="${profile.github}"><span class="copy__t">github.com/${profile.handle}</span><span class="copy__s" aria-live="polite">Copiar</span></button>
      </div>
      <footer class="foot">
        <a class="brand" href="#inicio" data-go="inicio">${LOGO}<span>Silva<em>Dev</em></span></a>
        <span>© 2025–2026 SilvaDev · Paulo Silva</span>
        <button type="button" class="foot__motion" data-motion>Entrar sem animações</button>
        <button type="button" data-go="inicio">Voltar ao início ↑</button>
      </footer>
    </div>
  </section>
</main>

<div class="panel" role="dialog" aria-modal="true" aria-labelledby="panel-t" hidden data-lenis-prevent>
  <div class="panel__veil" data-close></div>
  <div class="panel__box"></div>
</div>

<div class="curtain" aria-hidden="true">
  <svg viewBox="0 0 100 100" preserveAspectRatio="none"><defs><linearGradient id="cg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#8b5cf6"/><stop offset="1" stop-color="#5b2fe0"/></linearGradient></defs><path class="curtain__back"/><path class="curtain__front" fill="url(#cg)"/></svg>
  <svg class="curtain__logo" viewBox="0 0 64 64" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M33 18H19a7 7 0 0 0 0 14h8a7 7 0 0 1 0 14H11" stroke="#fff" stroke-width="8"/><path d="M36 12h1a20 20 0 0 1 0 40h-1" stroke="#C9B8FF" stroke-width="8"/><circle cx="27" cy="7.5" r="3.4" fill="#55D6FF"/></svg>
</div>`;
}

/** Corpo do painel de detalhes de um projeto (montado no navegador ao abrir). */
export function renderPanel(i: number) {
  const p = projects[i];
  return `<div class="panel__head"><span>${p.index} · ${esc(p.kicker)}</span><button class="panel__close" type="button" data-close>Fechar ✕</button></div>
  <h3 class="panel__title" id="panel-t">${esc(p.name)}</h3>
  ${p.preview.kind === 'image' ? `<img class="panel__img" src="${p.preview.src}" alt="${esc(p.preview.alt)}" width="1600" height="1000" />` : ''}
  <p class="panel__sum">${esc(p.summary)}</p>
  <dl class="ps"><div><dt>Antes</dt><dd>${esc(p.problem)}</dd></div><div><dt>Depois</dt><dd>${esc(p.solution)}</dd></div></dl>
  <ul class="tags">${p.stack.map((s) => `<li>${esc(s)}</li>`).join('')}</ul>
  <div class="case__links"><a class="btn btn--solid" href="${p.repo}" target="_blank" rel="noopener noreferrer">${GH} Repositório ${ARROW}</a>${p.demo ? `<a class="link" href="${p.demo.url}" target="_blank" rel="noopener noreferrer">${esc(p.demo.label)} ${ARROW}</a>` : ''}</div>`;
}
