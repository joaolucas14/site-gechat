/* Perguntas frequentes — a resposta aceita HTML simples (<strong>). */

export interface Faq {
  q: string;
  a: string;
}

export const FAQS: Faq[] = [
  {
    q: 'Preciso trocar meu número de WhatsApp?',
    a: 'Não. Você conecta o número que já usa por <strong>QR Code</strong>, igual ao WhatsApp Web. As conversas continuam saindo dele, só que agora organizadas por setor e visíveis para toda a equipe.',
  },
  {
    q: 'E se um atendente sair da empresa?',
    a: 'O histórico completo fica salvo no <strong>Gechat</strong>, e não preso a um único celular. Quem assume a conversa vê tudo o que já foi falado com o cliente e continua o atendimento sem perder o fio.',
  },
  {
    q: 'É difícil de configurar?',
    a: 'Não. Você conecta o número, cria seus setores e já começa a atender em <strong>poucos minutos</strong>. A ferramenta foi desenhada para que a equipe entenda em uma tarde e já esteja atendendo.',
  },
  {
    q: 'Preciso de cartão de crédito pra testar?',
    a: 'Não. São <strong>7 dias grátis sem cartão</strong>, com acesso a tudo. Se decidir seguir, você escolhe o plano; se não, é só deixar expirar. Sem pegadinha e letras miúdas.',
  },
  {
    q: 'Funciona no celular ou só no computador?',
    a: 'Nos dois. O Gechat abre direto no <strong>navegador</strong>, do computador ou do celular, sem precisar instalar nada. Seus atendentes respondem de onde estiverem, sempre com todo o histórico à mão.',
  },
  {
    q: 'Meus dados e os dos meus clientes ficam seguros?',
    a: 'Sim. Todas as conversas trafegam e ficam guardadas em <strong>ambiente protegido</strong>, acessível apenas a quem você autorizar dentro da sua equipe.',
  },
];
