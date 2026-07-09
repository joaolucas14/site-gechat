/* Calculadora de planos: toggle mensal/anual + steppers de usuários e
   números extras por card. O HTML já vem do build com o estado inicial
   (anual, sem extras); aqui só recalculamos e atualizamos os textos. */
import { ADD_USER, ADD_NUMBER, ADD_MAX, brl } from '../data/plans';

const toggle = document.querySelector<HTMLElement>('[data-bill-toggle]');
const cards = [...document.querySelectorAll<HTMLElement>('[data-plan]')];
let annual = true;

const extras = (card: HTMLElement) => ({
  users: +(card.dataset.exUsers || 0),
  numbers: +(card.dataset.exNumbers || 0),
});

const update = (card: HTMLElement) => {
  const base = annual ? +(card.dataset.a || 0) : +(card.dataset.m || 0);
  const ex = extras(card);
  const total = base + ex.users * ADD_USER + ex.numbers * ADD_NUMBER;
  const users = +(card.dataset.users || 0) + ex.users;
  const numbers = +(card.dataset.numbers || 0) + ex.numbers;

  card.querySelector('.plan-amt')!.textContent = brl(total);
  card.querySelector('.plan-per')!.textContent = annual ? 'x12' : '/mês';
  card.querySelector('[data-bill-cycle]')!.textContent = annual ? 'no plano anual' : 'no plano mensal';
  card.querySelector<HTMLElement>('.plan-save')!.hidden = !annual;
  card.querySelector('[data-plan-userline]')!.textContent = `${users} usuários`;
  card.querySelector('[data-plan-numline]')!.textContent = `${numbers} número${numbers > 1 ? 's' : ''}`;

  for (const step of card.querySelectorAll<HTMLElement>('[data-step-for]')) {
    const value = ex[step.dataset.stepFor as 'users' | 'numbers'];
    const [minus, plus] = step.querySelectorAll('button');
    step.querySelector('.val')!.textContent = String(value);
    minus!.disabled = value <= 0;
    plus!.disabled = value >= ADD_MAX;
  }
};

for (const card of cards) {
  for (const step of card.querySelectorAll<HTMLElement>('[data-step-for]')) {
    const key = step.dataset.stepFor === 'users' ? 'exUsers' : 'exNumbers';
    const [minus, plus] = step.querySelectorAll('button');
    minus!.addEventListener('click', () => {
      card.dataset[key] = String(Math.max(0, +(card.dataset[key] || 0) - 1));
      update(card);
    });
    plus!.addEventListener('click', () => {
      card.dataset[key] = String(Math.min(ADD_MAX, +(card.dataset[key] || 0) + 1));
      update(card);
    });
  }
}

if (toggle) {
  const buttons = [...toggle.querySelectorAll('button')];
  for (const btn of buttons) {
    btn.addEventListener('click', () => {
      annual = btn.dataset.bill === 'annual';
      buttons.forEach((b) => b.classList.toggle('is-on', b === btn));
      cards.forEach(update);
    });
  }
}
