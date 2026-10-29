// Cases completos, abertos em folha por cima do mundo. Tudo vem dos READMEs públicos.

const sheet = (o: {
  kicker: string;
  title: string;
  lead: string;
  img: [string, string, number, number];
  cols: [string, string][];
  stack: string[];
  links: [string, string][];
}) => `
  <p class="label"><b>Case</b> ${o.kicker}</p>
  <h2 id="sheet-t">${o.title}</h2>
  <p class="lead">${o.lead}</p>
  <figure>
    <img src="${o.img[0]}" alt="${o.img[1]}" width="${o.img[2]}" height="${o.img[3]}" loading="lazy" decoding="async" />
    <figcaption>${o.img[1]}</figcaption>
  </figure>
  <div class="sheet__cols">
    ${o.cols.map(([h, b]) => `<div><h3>${h}</h3>${b}</div>`).join('')}
    <div><h3>Stack</h3><ul class="chips">${o.stack.map((s) => `<li>${s}</li>`).join('')}</ul></div>
    <div><h3>Links</h3><p class="links">${o.links.map(([t, u]) => `<a href="${u}" target="_blank" rel="noopener">${t} <span aria-hidden="true">↗</span></a>`).join('')}</p></div>
  </div>`;

export const cases: Record<string, string> = {
  belaways: sheet({
    kicker: 'ERP interno · Belaways Cosméticos',
    title: 'Belaways Intelligence',
    lead: 'Não é loja nem checkout. É a camada administrativa que fica por trás da operação: indicadores, estoque, pedidos, alertas, auditoria, logística e usuários num lugar só.',
    img: ['/belaways.webp', 'Painel central de operação do Belaways Intelligence, em modo escuro', 1600, 902],
    cols: [
      ['Problema', '<p>A informação da operação estava espalhada entre Tray, Tiny e Supabase. Para responder uma pergunta simples era preciso abrir três sistemas.</p>'],
      [
        'Solução',
        '<ul><li>Painel único que conversa com as ferramentas atuais sem substituí-las.</li><li>Papéis de acesso: admin, manager, operator e viewer.</li><li>Validação de entrada com Zod no servidor.</li><li>Logs que escondem tokens e segredos.</li></ul>',
      ],
      ['Resultado', '<p>A equipe passou a ter indicadores, estoque, pedidos e alertas numa tela só, e cada pessoa vê apenas o que o papel dela permite.</p>'],
    ],
    stack: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'TanStack Query', 'Express', 'Zod', 'Supabase', 'PostgreSQL'],
    links: [
      ['Código no GitHub', 'https://github.com/voidsilva/Belaways-ERP'],
      ['Demo, requer login', 'https://belaways-erp.vercel.app'],
    ],
  }),
  ponto: sheet({
    kicker: 'Reconhecimento facial · Curitiba Empreiteira',
    title: 'Ponto Facial',
    lead: 'Controle de presença para as obras da Curitiba Empreiteira. O funcionário bate o ponto com o rosto, na própria obra, e o RH recebe tudo pronto.',
    img: ['/pontofacial.webp', 'Visão geral do sistema de ponto facial da Curitiba Empreiteira', 1600, 900],
    cols: [
      ['Problema', '<p>Saber quem chegou em cada obra, todo dia, sem lista de papel e sem depender de geolocalização, que falha em canteiro.</p>'],
      [
        'Solução',
        '<ul><li>Reconhecimento com InsightFace e ArcFace num container separado.</li><li>Até cinco rostos por leitura.</li><li>Perfis para RH, gestor de obra e supervisor.</li><li>Auditoria de cada batida e confirmação por e-mail.</li></ul>',
      ],
      ['Resultado', '<p>Ponto registrado no rosto e relatórios em PDF, XLSX ou CSV gerados direto do sistema, sem planilha montada à mão.</p>'],
    ],
    stack: ['React', 'TypeScript', 'Vite', 'Python', 'FastAPI', 'InsightFace', 'ONNX Runtime', 'Supabase', 'PostgreSQL', 'Docker'],
    links: [
      ['Código no GitHub', 'https://github.com/Projeto-Feira-Maluf-2026/projeto-novo-ponto-facial'],
      ['Sistema, requer login', 'https://curitiba-gestao.vercel.app'],
    ],
  }),
  gastos: sheet({
    kicker: 'Financeiro · BuyBrazil10',
    title: 'BuyBrazil10, ERP financeiro',
    lead: 'Controle de gastos com dashboard, lançamentos, plano de contas, orçamento por categoria e relatórios.',
    img: ['/gastos.webp', 'Tela de entrada do ERP financeiro da BuyBrazil10', 1158, 751],
    cols: [
      ['Problema', '<p>As despesas não tinham um lugar único e cada um registrava de um jeito, fora do plano de contas.</p>'],
      ['Solução', '<ul><li>Login e lançamentos por categoria.</li><li>Orçamento por categoria com gráficos em Chart.js.</li><li>Relatório em PDF com jsPDF e exportação CSV.</li><li>Dados no Supabase e modo escuro.</li></ul>'],
      ['Resultado', '<p>Gastos organizados pelo plano de contas e relatório pronto para mandar ao contador em um clique.</p>'],
    ],
    stack: ['JavaScript', 'HTML', 'CSS', 'Chart.js', 'jsPDF', 'Supabase'],
    links: [
      ['Código no GitHub', 'https://github.com/voidsilva/Projeto-Controle-de-Gastos-Robinson'],
      ['Demo', 'https://projeto-controle-de-gastos-robinson.vercel.app'],
    ],
  }),
};
