/* Planos e preços — fonte única, usada no build (HTML estático) e
   pela calculadora no navegador (scripts/pricing.ts). */

export interface Plan {
  id: string;
  name: string;
  users: number;
  numbers: number;
  /** mensal (R$/mês) */
  m: number;
  /** anual (R$/mês equivalente, cobrado x12) */
  a: number;
  popular?: boolean;
  desc: string;
}

export const PLANS: Plan[] = [
  {
    id: 'starter', name: 'Starter', users: 5, numbers: 1, m: 239, a: 189.9,
    desc: 'Pra equipes que estão começando a organizar o atendimento.',
  },
  {
    id: 'master', name: 'Master', users: 10, numbers: 1, m: 375, a: 299.9, popular: true,
    desc: 'Pra operações que cresceram e precisam de mais gente atendendo.',
  },
];

/** preço por usuário extra (R$/mês) */
export const ADD_USER = 29.9;
/** preço por número de WhatsApp extra (R$/mês) */
export const ADD_NUMBER = 69.9;
/** limite dos steppers da calculadora */
export const ADD_MAX = 50;

export const brl = (n: number): string =>
  n.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
