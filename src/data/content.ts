// Todo o conteúdo vem dos repositórios públicos de github.com/voidsilva
// (READMEs, linguagens e código). Nada aqui é métrica ou cliente inventado.

export const profile = {
  name: 'Paulo Silva',
  brand: 'NeutronX',
  handle: 'voidsilva',
  github: 'https://github.com/voidsilva',
  bio: 'Desenvolvedor Full Stack · TypeScript, JavaScript & Python · Construindo ERPs, APIs REST e automações',
  since: 2025,
  publicRepos: 17,
};

export type Preview =
  | { kind: 'image'; src: string; alt: string }
  | { kind: 'erp' }
  | { kind: 'terminal' };

export interface Project {
  id: string;
  index: string;
  name: string;
  kicker: string;
  summary: string;
  problem: string;
  solution: string;
  stack: string[];
  repo: string;
  demo?: { url: string; label: string };
  preview: Preview;
  layout: 'wide' | 'split' | 'offset' | 'stack' | 'float';
}

export const projects: Project[] = [
  {
    id: 'belaways',
    index: '01',
    name: 'Belaways Intelligence',
    kicker: 'ERP interno · Full stack',
    summary:
      'Sistema web interno para a gestão operacional da Belaways Cosméticos. Não é loja nem checkout: é a camada administrativa que reúne indicadores, estoque, pedidos, alertas, auditoria, logística e usuários.',
    problem: 'A operação dependia de informações espalhadas entre Tray, Tiny e Supabase.',
    solution:
      'Um painel único que conversa com essas ferramentas sem substituí-las, com papéis de acesso (admin, manager, operator, viewer), validação com Zod e logs que escondem tokens e segredos.',
    stack: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'TanStack Query', 'Express', 'Zod', 'Supabase', 'PostgreSQL'],
    repo: 'https://github.com/voidsilva/Belaways-ERP',
    demo: { url: 'https://belaways-erp.vercel.app', label: 'Demo (requer login)' },
    preview: { kind: 'erp' },
    layout: 'wide',
  },
  {
    id: 'api',
    index: '02',
    name: 'API REST de Tarefas',
    kicker: 'Back-end · Zero dependências',
    summary:
      'API de tarefas com autenticação JWT, validação, paginação e isolamento por usuário, escrita em TypeScript rodando nativamente no Node 22, sem nenhuma dependência externa.',
    problem: 'Frameworks escondem os fundamentos que uma API de produção precisa ter.',
    solution:
      'Tudo feito à mão: JWT HS256 com verificação em tempo constante, senhas com scrypt e salt, roteador próprio, erros centralizados, 9 testes de integração e CI no GitHub Actions.',
    stack: ['TypeScript', 'Node.js 22', 'JWT', 'node:test', 'Docker', 'GitHub Actions'],
    repo: 'https://github.com/voidsilva/api-rest-tarefas',
    preview: { kind: 'terminal' },
    layout: 'split',
  },
  {
    id: 'gastos',
    index: '03',
    name: 'BuyBrazil10 · ERP Financeiro',
    kicker: 'Financeiro · Web app',
    summary:
      'Controle de gastos da BuyBrazil10 com dashboard, lançamentos, plano de contas, orçamento por categoria, relatórios em PDF e exportação CSV.',
    problem: 'As despesas da empresa precisavam de um lugar único, organizado pelo plano de contas.',
    solution:
      'Um app com login, gráficos com Chart.js, relatórios gerados com jsPDF, dados no Supabase e modo escuro.',
    stack: ['JavaScript', 'HTML', 'CSS', 'Chart.js', 'jsPDF', 'Supabase'],
    repo: 'https://github.com/voidsilva/Projeto-Controle-de-Gastos-Robinson',
    demo: { url: 'https://projeto-controle-de-gastos-robinson.vercel.app', label: 'Ver demo' },
    preview: { kind: 'image', src: '/gastos.webp', alt: 'Tela de entrada do ERP Financeiro BuyBrazil10' },
    layout: 'offset',
  },
  {
    id: 'studiaflow',
    index: '04',
    name: 'StudiaFlow',
    kicker: 'Interface · Dashboard',
    summary:
      'Painel de estudos com plano do dia, sessão de foco de 25 minutos, rotina, tarefas, desempenho por matéria e conquistas.',
    problem: 'Organizar a rotina de estudo costuma ficar espalhado entre listas e lembretes.',
    solution: 'Uma única tela que mostra o que estudar hoje, o tempo de foco e o progresso da semana.',
    stack: ['HTML', 'CSS', 'JavaScript'],
    repo: 'https://github.com/voidsilva/Projeto-Paulo-Maluf',
    demo: { url: 'https://voidsilva.github.io/Projeto-Paulo-Maluf/', label: 'Ver demo' },
    preview: { kind: 'image', src: '/studiaflow.webp', alt: 'Dashboard do StudiaFlow com plano do dia e indicadores' },
    layout: 'stack',
  },
  {
    id: 'vidflow',
    index: '05',
    name: 'VidFlow',
    kicker: 'Front-end · Vanilla',
    summary:
      'Interface responsiva de descoberta de vídeos com busca em tempo real, filtros por categoria, ordenação, menu lateral, menus contextuais e catálogo local em JSON.',
    problem: 'Transformar um briefing visual em uma interface completa, sem framework.',
    solution:
      'HTML, CSS e JavaScript puros, com estado vazio, drawer no mobile, atalho "/" para a busca e catálogo de reserva caso o JSON falhe.',
    stack: ['HTML', 'CSS', 'JavaScript', 'JSON'],
    repo: 'https://github.com/voidsilva/VidFlow0',
    demo: { url: 'https://voidsilva.github.io/VidFlow0/', label: 'Ver demo' },
    preview: { kind: 'image', src: '/vidflow.webp', alt: 'Catálogo de vídeos do VidFlow com filtros por categoria' },
    layout: 'float',
  },
];

export const archive = [
  {
    name: 'MA',
    note: 'Site comemorativo com carta, linha do tempo, contador e lightbox. HTML, CSS e JS puros.',
    tags: ['HTML', 'CSS', 'JavaScript'],
    url: 'https://github.com/voidsilva/MA',
    demo: 'https://cesconana.vercel.app',
  },
  {
    name: 'AluraFlix',
    note: 'Projeto em React criado com Create React App.',
    tags: ['React', 'JavaScript'],
    url: 'https://github.com/voidsilva/AluraFlix',
  },
  {
    name: 'JogoAlannis',
    note: 'Jogo feito para a disciplina de TI.',
    tags: ['HTML'],
    url: 'https://github.com/voidsilva/JogoAlannis.github.io',
  },
  {
    name: 'Projeto-2-P-Maluf-Flavio',
    note: 'Páginas explicando HTML, CSS e JavaScript.',
    tags: ['HTML', 'CSS'],
    url: 'https://github.com/voidsilva/Projeto-2-P-Maluf-Flavio',
  },
  {
    name: 'Landing-Page-',
    note: 'Landing page feita como trabalho escolar.',
    tags: ['HTML', 'CSS'],
    url: 'https://github.com/voidsilva/Landing-Page-',
  },
];

// Tecnologias encontradas nos repositórios e onde aparecem.
export const stack: { name: string; group: 'Linguagem' | 'Front' | 'Back' | 'Dados' | 'Infra'; used: string[] }[] = [
  { name: 'TypeScript', group: 'Linguagem', used: ['01', '02'] },
  { name: 'JavaScript', group: 'Linguagem', used: ['03', '04', '05'] },
  { name: 'HTML & CSS', group: 'Front', used: ['03', '04', '05'] },
  { name: 'React', group: 'Front', used: ['01'] },
  { name: 'Vite', group: 'Front', used: ['01'] },
  { name: 'Tailwind CSS', group: 'Front', used: ['01'] },
  { name: 'TanStack Query', group: 'Front', used: ['01'] },
  { name: 'Chart.js', group: 'Front', used: ['03'] },
  { name: 'Node.js', group: 'Back', used: ['01', '02'] },
  { name: 'Express', group: 'Back', used: ['01'] },
  { name: 'Zod', group: 'Back', used: ['01'] },
  { name: 'JWT', group: 'Back', used: ['02'] },
  { name: 'Supabase', group: 'Dados', used: ['01', '03'] },
  { name: 'PostgreSQL', group: 'Dados', used: ['01'] },
  { name: 'Docker', group: 'Infra', used: ['02'] },
  { name: 'GitHub Actions', group: 'Infra', used: ['02'] },
];
