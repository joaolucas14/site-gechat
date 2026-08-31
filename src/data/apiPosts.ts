/* Central da API oficial: índice dos artigos (hub, cards e SEO por post).
   O corpo de cada artigo vive em src/pages/api-oficial/<slug>.astro. */

export interface ApiPost {
  slug: string;
  tag: string;
  ic: string;
  /** minutos de leitura exibidos no card e no post */
  min: number;
  /** rótulo humano mostrado no post ("Atualizado em …") */
  updated: string;
  /** data ISO usada no JSON-LD (Article.dateModified) */
  updatedIso: string;
  /** H1 do post e título do card */
  title: string;
  /** resumo do card no hub e em "Continue lendo" */
  desc: string;
  /** <title> da página */
  seoTitle: string;
  /** meta description da página */
  seoDesc: string;
}

export const API_POSTS: ApiPost[] = [
  {
    slug: 'como-funciona',
    tag: 'Fundamentos',
    ic: 'zap',
    min: 5,
    updated: 'agosto de 2026',
    updatedIso: '2026-08-31',
    title: 'O que é a API oficial do WhatsApp e como funciona',
    desc: 'O caminho homologado da Meta pra empresas: conexão direta, sem celular ligado, com nome verificado e mensagens aprovadas.',
    seoTitle: 'O que é a API oficial do WhatsApp e como funciona | Gechat',
    seoDesc:
      'Entenda a API oficial do WhatsApp: conexão direta com a Meta, janela de 24h, templates aprovados e nome verificado.',
  },
  {
    slug: 'qr-vs-api',
    tag: 'Comparativo',
    ic: 'transfer',
    min: 6,
    updated: 'agosto de 2026',
    updatedIso: '2026-08-31',
    title: 'QR Code vs API oficial: diferenças e riscos',
    desc: 'As duas formas de conectar um número no Gechat, lado a lado: estabilidade, custos, verificação e quando usar cada uma.',
    seoTitle: 'QR Code vs API oficial: diferenças e riscos | Gechat',
    seoDesc:
      'Comparativo entre conexão por QR Code e API oficial do WhatsApp: estabilidade, custos, verificação e quando usar cada uma.',
  },
  {
    slug: 'evitar-bloqueios',
    tag: 'Boas práticas',
    ic: 'shield',
    min: 6,
    updated: 'agosto de 2026',
    updatedIso: '2026-08-31',
    title: 'Como evitar bloqueio de número no WhatsApp',
    desc: 'Por que a Meta bloqueia números comerciais, as práticas que mais geram denúncia e o que fazer se o bloqueio já aconteceu.',
    seoTitle: 'Como evitar bloqueio de número no WhatsApp | Gechat',
    seoDesc:
      'Por que a Meta bloqueia números comerciais de WhatsApp, as boas práticas que reduzem o risco e o que fazer se o bloqueio já aconteceu.',
  },
  {
    slug: 'qualidade-e-limites',
    tag: 'Monitoramento',
    ic: 'chart',
    min: 6,
    updated: 'agosto de 2026',
    updatedIso: '2026-08-31',
    title: 'Qualidade do número e limites de envio na API oficial',
    desc: 'A nota que a Meta dá ao seu número no painel da API, a escada de limites diários e como reagir quando o indicador começa a cair.',
    seoTitle: 'Qualidade do número e limites de envio na API oficial | Gechat',
    seoDesc:
      'Como funciona a classificação de qualidade do número na API oficial do WhatsApp, a escada de limites de envio da Meta e o que fazer quando a nota cai.',
  },
  {
    slug: 'custos',
    tag: 'Custos',
    ic: 'card',
    min: 6,
    updated: 'agosto de 2026',
    updatedIso: '2026-08-31',
    title: 'Quanto custa a API oficial (cobrança da Meta)',
    desc: 'Tarifa por mensagem, o que ainda é gratuito, os descontos por volume e o que muda a partir de outubro de 2026.',
    seoTitle: 'Quanto custa a API oficial do WhatsApp | Gechat',
    seoDesc:
      'Como funciona a cobrança da Meta na API oficial do WhatsApp: tarifas por mensagem, categorias e valores de referência no Brasil.',
  },
  {
    slug: 'tech-provider',
    tag: 'Confiança',
    ic: 'check_circle',
    min: 4,
    updated: 'agosto de 2026',
    updatedIso: '2026-08-31',
    title: 'O que é um Tech Provider da Meta',
    desc: 'O que a homologação da Meta exige e por que ela importa na hora de escolher a plataforma de atendimento.',
    seoTitle: 'O que é um Tech Provider da Meta | Gechat',
    seoDesc:
      'O que significa a homologação Tech Provider da Meta, o que ela exige e por que importa na escolha da plataforma de atendimento.',
  },
];

export const API_HUB_PATH = '/api-oficial/';

export const apiPostPath = (slug: string) => `${API_HUB_PATH}${slug}/`;

/* FAQ do hub, que também vira FAQPage no JSON-LD (o hub remove as tags HTML). */
export const API_FAQS = [
  {
    q: 'Qual a diferença entre conectar por QR Code e pela API oficial?',
    a: 'As duas formas convivem no Gechat: você escolhe por número. O <strong>QR Code</strong> conecta o número que você já usa em segundos, igual ao WhatsApp Web. A <strong>API oficial</strong> é uma conexão direta com a Meta: mais estável, com o nome da empresa verificado e pronta pra envios em maior volume.',
  },
  {
    q: 'Quanto custa usar a API oficial?',
    a: 'A mensalidade do Gechat é a mesma. O que muda é que a <strong>Meta cobra pelas mensagens enviadas</strong> pela API. O valor varia por categoria (marketing, utilidade, autenticação) e por país, e é cobrado pela própria Meta, direto na sua conta. Receber mensagens não custa nada.',
  },
  {
    q: 'Para quem a API oficial é indicada?',
    a: 'Pra operações que precisam de <strong>estabilidade máxima</strong>, envios ativos (notificações, confirmações, campanhas) e do nome verificado ao lado do número. Se o seu uso é o atendimento do dia a dia, a conexão por QR Code continua atendendo perfeitamente.',
  },
  {
    q: 'O que significa ser Tech Provider da Meta?',
    a: 'É a homologação que a Meta dá a empresas autorizadas a integrar o <strong>WhatsApp Business Platform</strong>. Na prática: a conexão do Gechat com o WhatsApp acontece pelo caminho oficial, seguindo as regras da Meta, com mais segurança pro seu número e pros seus dados.',
  },
];
