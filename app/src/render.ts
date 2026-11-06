// Monta o HTML do site em tempo de build (vite.config.ts injeta no index.html).
// O conteúdo chega pronto no HTML: aparece sem esperar JavaScript e o Google lê tudo.
import { profile, projects, archive, services, faq, type Project } from './data/content';

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const COLS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

const LOGO = `<svg class="mark" viewBox="0 0 64 64" fill="none" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M33 18H19a7 7 0 0 0 0 14h8a7 7 0 0 1 0 14H11" stroke="var(--ink)" stroke-width="8"/><path d="M36 12h1a20 20 0 0 1 0 40h-1" stroke="var(--purple)" stroke-width="8"/><circle cx="27" cy="7.5" r="3.4" fill="var(--cyan)"/></svg>`;
const ARROW = `<svg class="arr" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M4 12 12 4M5.5 4H12v6.5" stroke="currentColor" stroke-width="1.6"/></svg>`;
const GH = `<svg class="gh" viewBox="0 0 16 16" aria-hidden="true"><path fill="currentColor" d="M8 0C3.58 0 0 3.58 0 8a8 8 0 0 0 5.47 7.59c.4.07.55-.17.55-.38v-1.33c-2.23.48-2.7-1.07-2.7-1.07-.36-.92-.89-1.17-.89-1.17-.73-.5.06-.49.06-.49.8.06 1.23.83 1.23.83.71 1.22 1.87.87 2.33.66.07-.52.28-.87.5-1.07-1.78-.2-3.65-.89-3.65-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.6 7.6 0 0 1 4 0c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.66 3.95.29.25.54.73.54 1.48v2.2c0 .21.15.46.55.38A8 8 0 0 0 16 8c0-4.42-3.58-8-8-8Z"/></svg>`;

/** Tabela "antes" de cada projeto: a planilha que o sistema substituiu (dados de exemplo). */
const BEFORE: Record<string, { file: string; rows: string[][] }> = {
  belaways: {
    file: 'pedidos_tray_tiny_FINAL(3).xlsx',
    rows: [
      ['pedido', 'canal', 'status', 'estoque', 'obs', 'resp.'],
      ['#4821', 'Tray', 'pago?', '12', 'ver tiny', 'Ana'],
      ['#4822', 'Tiny', 'pendente', '#REF!', '', '??'],
      ['#4823', 'Tray', 'enviado', '0', 'repor', 'Léo'],
      ['#4824', 'Tray', 'pago', '7', 'atraso', 'Ana'],
      ['#4825', 'Tiny', '???', '3', 'conferir', ''],
    ],
  },
  pontofacial: {
    file: 'ponto_obras_novembro.xlsx',
    rows: [
      ['nome', 'obra', 'entrada', 'saída', 'assin.', 'ok'],
      ['João', 'Obra 3', '07:02', '', 'falta', '?'],
      ['Marcos', 'Obra 1', '7h', '17h', 'ok', 'ok'],
      ['Diego', 'Obra 3', '', '16:58', '', '?'],
      ['Rafael', 'obra 2', '07:15', '17:10', 'ok', ''],
      ['Paulo', 'Obra 1', '06:58', '?', 'falta', ''],
    ],
  },
  gastos: {
    file: 'gastos_2025_v7.xlsx',
    rows: [
      ['data', 'conta', 'categoria', 'valor', 'nota', 'pago'],
      ['03/02', 'Itaú', 'frete', 'R$ 840', 'sim', '✓'],
      ['04/02', '', 'mkt??', 'R$1.2k', '', ''],
      ['05/02', 'Nubank', 'frete', '#VALOR!', 'não', ''],
      ['05/02', 'Itaú', 'aluguel', 'R$ 3.900', 'sim', '✓'],
      ['07/02', '?', 'outros', 'R$ 95', '', '?'],
    ],
  },
};

function sheet(p: Project) {
  const b = BEFORE[p.id];
  const cells = b.rows
    .map((r, ri) => r.map((c, ci) => `<span class="tile" style="--r:${ri};--c:${ci}"><i>${esc(c)}</i></span>`).join(''))
    .join('');
  const src = p.preview.kind === 'image' ? p.preview.src : '';
  return `<figure class="case__media" data-sel="ABRIR" style="--img:url('${src}')">
    <figcaption class="case__file"><span>${esc(b.file)}</span><span class="case__to">${esc(p.name)}</span></figcaption>
    <div class="sheet" aria-hidden="true">${cells}</div>
    <img src="${src}" alt="${esc(p.preview.kind === 'image' ? p.preview.alt : p.name)}" width="1600" height="1000" loading="lazy" decoding="async" />
  </figure>`;
}

function caseBlock(p: Project, i: number) {
  return `<article class="case" data-i="${i}">
    <div class="case__meta">
      <span class="ref">${COLS[i + 1]}${i + 4}</span>
      <p class="case__kicker">${esc(p.kicker)}</p>
      <h3 class="case__name"><button type="button" class="case__open" data-open="${i}">${esc(p.name)}</button></h3>
      <dl class="case__ps">
        <div><dt>Antes</dt><dd>${esc(p.problem)}</dd></div>
        <div><dt>Depois</dt><dd>${esc(p.solution)}</dd></div>
      </dl>
      <ul class="tags">${p.stack.slice(0, 6).map((s) => `<li>${esc(s)}</li>`).join('')}</ul>
      <div class="case__links">
        <button type="button" class="btn" data-open="${i}" data-sel="DETALHES">Ver detalhes ${ARROW}</button>
        <a class="link" href="${p.repo}" target="_blank" rel="noopener noreferrer" data-sel="CÓDIGO">${GH} Código</a>
      </div>
    </div>
    ${sheet(p)}
  </article>`;
}

const STEPS = [
  ['Entender o que dói', 'Converso com quem usa a planilha todo dia. Antes de escrever código, eu sei de onde vem cada número.'],
  ['Desenhar o sistema', 'Modelo os dados, os perfis de acesso e as telas. Você aprova o desenho antes de qualquer linha.'],
  ['Construir em partes', 'Entrego em etapas curtas, já usáveis. Cada parte entra no ar e recebe o seu retorno.'],
  ['Colocar no ar e cuidar', 'Deploy, migração dos dados antigos e acompanhamento nas primeiras semanas de uso.'],
];

export function renderApp() {
  const archiveRows = archive
    .map((a, i) => {
      const inner = `<span class="rh">${i + 2}</span><span class="c c--name">${esc(a.name)}</span><span class="c c--note">${esc(a.note)}</span><span class="c c--tags">${a.tags.map(esc).join(' · ')}</span><span class="c c--go">${a.url ? `Código ${ARROW}` : 'conceito'}</span>`;
      return a.url
        ? `<li><a class="row" href="${a.url}" target="_blank" rel="noopener noreferrer" data-sel="ABRIR">${inner}</a></li>`
        : `<li><div class="row row--idea">${inner}</div></li>`;
    })
    .join('');

  return `
<a class="skip" href="#projetos">Pular para os projetos</a>

<div class="loader" aria-hidden="true">
  <canvas class="loader__grid"></canvas>
  <div class="loader__bar"><span class="loader__ref">A1</span><span class="loader__fx">fx</span><span class="loader__formula">=CARREGAR("silvadev.xyz")</span></div>
  <div class="loader__sel"><b class="loader__n">0</b><i>%</i><span class="loader__handle"></span></div>
</div>

<header class="head">
  <a class="brand" href="#inicio" data-go="inicio" aria-label="SilvaDev, voltar ao início" data-sel="INÍCIO">${LOGO}<span>Silva<em>Dev</em></span></a>
  <div class="namebox" aria-hidden="true"><span class="namebox__ref">A1</span><span class="namebox__fx">fx</span><span class="namebox__f">=INÍCIO()</span></div>
  <nav class="nav" aria-label="Seções">
    <a href="#processo" data-go="processo">Processo</a>
    <a href="#projetos" data-go="projetos">Projetos</a>
    <a href="#servicos" data-go="servicos">Serviços</a>
    <a href="#contato" data-go="contato">Contato</a>
  </nav>
  <button class="tbtn" type="button" data-theme-toggle aria-label="Trocar tema claro ou escuro" data-sel="TEMA"><span></span></button>
</header>

<div class="gridglow" aria-hidden="true"><div class="gridglow__in"></div></div>

<main id="inicio">
  <section class="hero" data-ref="A1" data-f="=INÍCIO()">
    <p class="hero__who"><b>Paulo Silva</b> · desenvolvedor full stack · Brasil</p>
    <h1 class="hero__title">
      <span class="line">Sua empresa</span>
      <span class="line">roda <span class="cell cell--a" data-from="numa" data-to="num">numa</span></span>
      <span class="line"><span class="cell cell--b" data-from="planilha." data-to="sistema.">planilha.</span></span>
    </h1>
    <div class="hero__foot">
      <p class="hero__sub">Eu construo ERPs, painéis e integrações sob medida para empresas que cresceram mais rápido que as próprias planilhas. Do banco de dados à tela, sem intermediário.</p>
      <div class="hero__cta">
        <a class="btn btn--solid" href="#projetos" data-go="projetos" data-sel="VER">Ver projetos reais ${ARROW}</a>
        <a class="link" href="#contato" data-go="contato" data-sel="CONVERSAR">Conversar</a>
      </div>
    </div>
    <p class="hero__hint" aria-hidden="true"><span>Role</span><i></i></p>
  </section>

  <section class="process" id="processo" data-ref="B2" data-f="=PROCESSO(4)" aria-labelledby="proc-t">
    <div class="process__pin">
      <div class="process__head">
        <p class="kicker">Como eu trabalho</p>
        <h2 class="h2" id="proc-t">Um passo puxa o outro.</h2>
        <p class="lead">Do jeito que você arrasta uma célula e a planilha completa a sequência. Só que aqui cada etapa entrega algo que já funciona.</p>
      </div>
      <ol class="fill" aria-label="Etapas">
        ${STEPS.map((s, i) => `<li class="fill__cell" style="--i:${i}"><span class="fill__n">0${i + 1}</span><div><h3>${s[0]}</h3><p>${s[1]}</p></div></li>`).join('')}
        <li class="fill__sel" aria-hidden="true"><span class="fill__tag">B${3}:B${6}</span><span class="fill__handle"></span></li>
      </ol>
    </div>
  </section>

  <section class="work" id="projetos" data-ref="C4" data-f="=PROJETOS(reais; 3)" aria-labelledby="work-t">
    <div class="sec-head">
      <p class="kicker">Projetos reais, em produção</p>
      <h2 class="h2" id="work-t">Cada um começou como uma planilha.</h2>
      <p class="lead">Role e veja a tabela virar o sistema que está no ar hoje.</p>
    </div>
    ${projects.map(caseBlock).join('')}
  </section>

  <section class="more" data-ref="D12" data-f="=OUTROS()" aria-labelledby="more-t">
    <div class="sec-head sec-head--row">
      <h2 class="h3" id="more-t">Outros trabalhos</h2>
      <p class="muted">Com link: código aberto no GitHub. Sem link: exemplos do que eu construo.</p>
    </div>
    <div class="table" role="presentation">
      <div class="row row--head" aria-hidden="true"><span class="rh"></span><span class="c">A · nome</span><span class="c c--note">B · o que faz</span><span class="c c--tags">C · stack</span><span class="c c--go">D</span></div>
      <ol class="rows">${archiveRows}</ol>
    </div>
  </section>

  <section class="svc" id="servicos" data-ref="E1" data-f="=SERVIÇOS(8)" aria-labelledby="svc-t">
    <div class="sec-head">
      <p class="kicker">O que eu faço</p>
      <h2 class="h2" id="svc-t">Do banco de dados até a tela.</h2>
    </div>
    <ul class="svc__grid">
      ${services.map((s, i) => `<li class="svc__item" data-sel="${COLS[i % 4]}${Math.floor(i / 4) + 1}"><span class="ref">${COLS[i % 4]}${Math.floor(i / 4) + 1}</span><h3>${esc(s.name)}</h3><p>${esc(s.note)}</p><span class="svc__tags">${s.tags.map(esc).join(' · ')}</span></li>`).join('')}
    </ul>
  </section>

  <section class="faq" id="faq" data-ref="F1" data-f="=PERGUNTAS()" aria-labelledby="faq-t">
    <div class="sec-head">
      <p class="kicker">Antes de conversar</p>
      <h2 class="h2" id="faq-t">Perguntas que sempre aparecem.</h2>
    </div>
    <div class="faq__list">
      ${faq.map((f) => `<details class="faq__item"><summary data-sel="ABRIR"><span>${esc(f.q)}</span><i aria-hidden="true"></i></summary><p>${esc(f.a)}</p></details>`).join('')}
    </div>
  </section>

  <section class="cta" id="contato" data-ref="G1" data-f="=CONVERSAR()" aria-labelledby="cta-t">
    <p class="kicker">Contato</p>
    <h2 class="cta__title" id="cta-t"><span class="line">Qual planilha</span><span class="line">a gente aposenta</span><span class="line">primeiro?</span></h2>
    <p class="lead">Me conta o processo que mais dá trabalho hoje. Não precisa chegar com tudo definido.</p>
    <div class="cta__row">
      <a class="btn btn--solid btn--big" href="${profile.github}" target="_blank" rel="noopener noreferrer" data-sel="GITHUB">${GH} Falar comigo no GitHub ${ARROW}</a>
      <button class="copy" type="button" data-copy="${profile.github}" data-sel="COPIAR"><span class="copy__t">github.com/${profile.handle}</span><span class="copy__s" aria-live="polite">Ctrl+C</span></button>
    </div>
  </section>
</main>

<footer class="foot">
  <div class="foot__top">
    <a class="brand" href="#inicio" data-go="inicio" data-sel="INÍCIO">${LOGO}<span>Silva<em>Dev</em></span></a>
    <nav class="foot__nav" aria-label="Rodapé">
      <a href="#processo" data-go="processo">Processo</a>
      <a href="#projetos" data-go="projetos">Projetos</a>
      <a href="#servicos" data-go="servicos">Serviços</a>
      <a href="#faq" data-go="faq">Perguntas</a>
      <a href="${profile.github}" target="_blank" rel="noopener noreferrer">GitHub</a>
    </nav>
  </div>
  <p class="foot__word" aria-hidden="true">Silva<em>Dev</em></p>
  <div class="foot__bar">
    <span>© 2025–2026 SilvaDev · Paulo Silva</span>
    <button type="button" class="foot__motion" data-motion>Entrar sem animações</button>
    <button type="button" data-go="inicio">Voltar ao início ↑</button>
  </div>
</footer>

<div class="panel" role="dialog" aria-modal="true" aria-labelledby="panel-t" hidden data-lenis-prevent>
  <div class="panel__veil" data-close></div>
  <div class="panel__box"></div>
</div>

<div class="sel" aria-hidden="true"><span class="sel__tag">A1</span><span class="sel__handle"></span></div>

<div class="curtain" aria-hidden="true">
  <svg viewBox="0 0 100 100" preserveAspectRatio="none"><defs><linearGradient id="cg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#8b5cf6"/><stop offset="1" stop-color="#5b2fe0"/></linearGradient></defs><path class="curtain__back"/><path class="curtain__front" fill="url(#cg)"/></svg>
  <svg class="curtain__logo" viewBox="0 0 64 64" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M33 18H19a7 7 0 0 0 0 14h8a7 7 0 0 1 0 14H11" stroke="#fff" stroke-width="8"/><path d="M36 12h1a20 20 0 0 1 0 40h-1" stroke="#C9B8FF" stroke-width="8"/><circle cx="27" cy="7.5" r="3.4" fill="#55D6FF"/></svg>
</div>`;
}

/** Corpo do painel de detalhes de um projeto (montado no navegador ao abrir). */
export function renderPanel(i: number) {
  const p = projects[i];
  return `<div class="panel__head"><span class="ref">${COLS[i + 1]}${i + 4}</span><span>${esc(p.kicker)}</span><button class="panel__close" type="button" data-close data-sel="FECHAR">Fechar ✕</button></div>
  <h3 class="panel__title" id="panel-t">${esc(p.name)}</h3>
  ${p.preview.kind === 'image' ? `<img class="panel__img" src="${p.preview.src}" alt="${esc(p.preview.alt)}" width="1600" height="1000" />` : ''}
  <p class="panel__sum">${esc(p.summary)}</p>
  <dl class="case__ps"><div><dt>Antes</dt><dd>${esc(p.problem)}</dd></div><div><dt>Depois</dt><dd>${esc(p.solution)}</dd></div></dl>
  <ul class="tags">${p.stack.map((s) => `<li>${esc(s)}</li>`).join('')}</ul>
  <div class="case__links"><a class="btn btn--solid" href="${p.repo}" target="_blank" rel="noopener noreferrer" data-sel="CÓDIGO">${GH} Repositório ${ARROW}</a>${p.demo ? `<a class="link" href="${p.demo.url}" target="_blank" rel="noopener noreferrer" data-sel="DEMO">${esc(p.demo.label)} ${ARROW}</a>` : ''}</div>`;
}
