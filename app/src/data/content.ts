// Todo o conteúdo vem dos repositórios públicos de github.com/voidsilva
// (READMEs, linguagens e código). Nada aqui é métrica ou cliente inventado.

export const profile = {
  name: 'Paulo Silva',
  brand: 'SilvaDev',
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
    preview: { kind: 'image', src: '/belaways.webp', alt: 'Painel Central de operação do Belaways Intelligence em modo escuro' },
    layout: 'wide',
  },
  {
    id: 'pontofacial',
    index: '02',
    name: 'Ponto Facial',
    kicker: 'Reconhecimento facial · Full stack',
    summary:
      'Sistema web de controle de presença para as obras da Curitiba Empreiteira, com reconhecimento facial, registro automático de ponto, relatórios, auditoria e confirmação por e-mail.',
    problem: 'Controlar quem chegou em cada obra, todos os dias, sem papel e sem depender de geolocalização.',
    solution:
      'Reconhecimento facial com InsightFace/ArcFace num container separado, até cinco rostos por leitura, perfis de acesso (RH, gestor de obra, supervisor), relatórios em PDF, XLSX e CSV e auditoria das batidas.',
    stack: ['React', 'TypeScript', 'Vite', 'Python', 'FastAPI', 'InsightFace', 'ONNX Runtime', 'Supabase', 'PostgreSQL', 'Docker'],
    repo: 'https://github.com/Projeto-Feira-Maluf-2026/projeto-novo-ponto-facial',
    demo: { url: 'https://curitiba-gestao.vercel.app', label: 'Ver sistema (requer login)' },
    preview: { kind: 'image', src: '/pontofacial.webp', alt: 'Visão geral do sistema de ponto facial da Curitiba Empreiteira' },
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
    solution: 'Um app com login, gráficos com Chart.js, relatórios gerados com jsPDF, dados no Supabase e modo escuro.',
    stack: ['JavaScript', 'HTML', 'CSS', 'Chart.js', 'jsPDF', 'Supabase'],
    repo: 'https://github.com/voidsilva/Projeto-Controle-de-Gastos-Robinson',
    demo: { url: 'https://projeto-controle-de-gastos-robinson.vercel.app', label: 'Ver demo' },
    preview: { kind: 'image', src: '/gastos.webp', alt: 'Tela de entrada do ERP Financeiro BuyBrazil10' },
    layout: 'offset',
  },
];

// Projetos com url estão no GitHub; os demais são exemplos de trabalho e aparecem sem link.
export const archive: { name: string; note: string; tags: string[]; url?: string }[] = [
  {
    name: 'API REST de Tarefas',
    note: 'API com JWT, validação, paginação e testes, em TypeScript nativo no Node 22 e sem dependências.',
    tags: ['TypeScript', 'Node.js', 'Docker'],
    url: 'https://github.com/voidsilva/api-rest-tarefas',
  },
  {
    name: 'Agenda Fácil',
    note: 'Agendamento online para salões e clínicas, com horários livres em tempo real e lembrete automático.',
    tags: ['React', 'Node.js', 'PostgreSQL'],
  },
  {
    name: 'Estoque Pro',
    note: 'Controle de estoque com leitura de código de barras, alertas de mínimo e histórico de movimentações.',
    tags: ['TypeScript', 'Express', 'Supabase'],
  },
  {
    name: 'PDV Web',
    note: 'Frente de caixa que funciona sem internet e sincroniza as vendas quando a conexão volta.',
    tags: ['React', 'IndexedDB', 'Node.js'],
  },
  {
    name: 'Painel de Vendas',
    note: 'Dashboard com metas, ranking de produtos e gráficos atualizados a cada pedido.',
    tags: ['React', 'Chart.js', 'FastAPI'],
  },
  {
    name: 'Atende Chat',
    note: 'Chat de atendimento em tempo real com fila, transferência entre atendentes e histórico por cliente.',
    tags: ['Node.js', 'WebSocket', 'PostgreSQL'],
  },
  {
    name: 'Relatórios em PDF',
    note: 'Serviço que recebe planilhas e devolve relatórios em PDF com gráficos, pronto para enviar ao cliente.',
    tags: ['Python', 'FastAPI', 'Docker'],
  },
  {
    name: 'Portal do Cliente',
    note: 'Área do cliente com pedidos, segunda via de boletos, notas fiscais e abertura de chamados.',
    tags: ['React', 'TypeScript', 'Supabase'],
  },
];

// Tecnologias encontradas nos repositórios e onde aparecem.
export const stack: { name: string; group: 'Linguagem' | 'Front' | 'Back' | 'Dados' | 'Infra'; used: string[] }[] = [
  { name: 'TypeScript', group: 'Linguagem', used: ['01', '02'] },
  { name: 'Python', group: 'Linguagem', used: ['02'] },
  { name: 'JavaScript', group: 'Linguagem', used: ['03'] },
  { name: 'React', group: 'Front', used: ['01', '02'] },
  { name: 'Vite', group: 'Front', used: ['01', '02'] },
  { name: 'Tailwind CSS', group: 'Front', used: ['01'] },
  { name: 'Chart.js', group: 'Front', used: ['03'] },
  { name: 'FastAPI', group: 'Back', used: ['02'] },
  { name: 'Express', group: 'Back', used: ['01'] },
  { name: 'InsightFace', group: 'Back', used: ['02'] },
  { name: 'Zod', group: 'Back', used: ['01'] },
  { name: 'Supabase', group: 'Dados', used: ['01', '02', '03'] },
  { name: 'PostgreSQL', group: 'Dados', used: ['01', '02'] },
  { name: 'Docker', group: 'Infra', used: ['02'] },
];

// O que eu faço: serviços que aparecem nos repositórios e nos sistemas entregues.
export const services: { name: string; note: string; tags: string[] }[] = [
  { name: 'Sistemas internos e ERPs', note: 'Painéis que juntam estoque, pedidos, financeiro e usuários num lugar só.', tags: ['React', 'TypeScript', 'Supabase'] },
  { name: 'APIs REST', note: 'Autenticação, validação, paginação e testes, com contrato claro para quem consome.', tags: ['Node.js', 'Express', 'FastAPI'] },
  { name: 'Integrações', note: 'Conecto ferramentas que a empresa já usa, sem obrigar ninguém a trocar de sistema.', tags: ['Tray', 'Tiny', 'Webhooks'] },
  { name: 'Dashboards e relatórios', note: 'Indicadores, gráficos e exportação em PDF, XLSX e CSV.', tags: ['Chart.js', 'jsPDF', 'SQL'] },
  { name: 'Controle de acesso', note: 'Papéis e permissões por perfil, com auditoria de quem fez o quê.', tags: ['RBAC', 'Zod', 'Logs'] },
  { name: 'Visão computacional', note: 'Reconhecimento facial em produção, rodando num serviço separado.', tags: ['Python', 'InsightFace', 'ONNX'] },
  { name: 'Banco de dados', note: 'Modelagem, políticas de acesso e consultas que aguentam o volume do dia a dia.', tags: ['PostgreSQL', 'Supabase'] },
  { name: 'Deploy e infraestrutura', note: 'Containers, variáveis de ambiente e publicação contínua.', tags: ['Docker', 'Vercel'] },
];

// Perguntas frequentes, respondidas com o que está nos projetos.
export const faq: { q: string; a: string }[] = [
  { q: 'Quem é o SilvaDev?', a: 'Sou eu, Paulo Silva, desenvolvedor full stack. Cuido do projeto da conversa inicial até o deploy, sem intermediário.' },
  { q: 'O que você constrói?', a: 'Sistemas web para operações reais: ERPs internos, controle de ponto, financeiro, APIs e integrações entre ferramentas.' },
  { q: 'Com que tipo de empresa você trabalha?', a: 'Empresas que dependem de planilhas ou de sistemas soltos e querem tudo num painel só, com acesso por perfil.' },
  { q: 'Qual é a sua stack?', a: 'TypeScript, React e Vite no front. Node, Express e FastAPI no back. PostgreSQL e Supabase nos dados. Docker para rodar em qualquer lugar.' },
  { q: 'Quanto custa um projeto?', a: 'Depende do escopo. Primeiro entendo o problema e o que já existe, depois mando uma proposta com etapas e prazos.' },
  { q: 'Como começa?', a: 'Com uma conversa sobre o processo que dói hoje. Não precisa chegar com tudo definido.' },
];

/** Itens do menu (ordem do site). */
export const MENU = [
  { id: 'top', label: 'Início' },
  { id: 'abordagem', label: 'Abordagem' },
  { id: 'trabalhos', label: 'Projetos' },
  { id: 'servicos', label: 'Serviços' },
  { id: 'faq', label: 'Perguntas' },
  { id: 'contato', label: 'Contato' },
];
