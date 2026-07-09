/* Cards da seção "E ainda tem mais" (bento). Edite aqui, sem tocar no componente. */

export interface BentoItem {
  /** nome do ícone do design (ver ui/Icon.astro) */
  ic: string;
  h: string;
  p: string;
}

export const BENTO: BentoItem[] = [
  { ic: 'bot', h: 'Atendimento automático', p: 'Uma URA recebe o cliente, entende o que ele quer e encaminha pro setor certo, 24h por dia.' },
  { ic: 'moon', h: 'Horário de atendimento', p: 'Defina os horários de cada time e responda automaticamente fora do expediente.' },
  { ic: 'hourglass', h: 'Controle de inatividade', p: 'Encerra conversas paradas sozinho e avisa o cliente antes que a fila saia do controle.' },
  { ic: 'smile', h: 'Pesquisa de satisfação', p: 'Ao encerrar, o cliente avalia o atendimento. Você acompanha a nota do time.' },
  { ic: 'tag', h: 'Etiquetas', p: 'Marque contatos por assunto, prioridade ou origem e encontre tudo depois.' },
  { ic: 'zap', h: 'Mensagens rápidas', p: 'Respostas prontas a um atalho de distância. Padronize sem perder o tom humano.' },
  { ic: 'history', h: 'Histórico do contato', p: 'Tudo que já foi conversado com cada cliente, reunido e sempre acessível.' },
  { ic: 'sliders', h: 'Mensagens padrão', p: 'Saudação, transferência e encerramento padronizados, com a cara da sua marca.' },
  { ic: 'shield', h: 'Times e permissões', p: 'Cada atendente vê só os setores e canais dele. A gestão enxerga tudo.' },
];
