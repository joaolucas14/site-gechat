/* Roteiro passo-a-passo dos mocks animados (porta o useStep do protótipo).

   Raiz:    [data-step-mock] com data-steps, data-interval (ms) e,
            opcionalmente, data-hold (pausa extra no último passo).

   Filhos — dois jeitos de reagir ao passo atual:
   1. aparecer/sumir de vez (balões de chat):
      [data-step="n"]     → visível quando passo >= n
      [data-step-eq="n"]  → visível somente quando passo === n
   2. transição por classe (fades, blur, outline — CSS de cada mock):
      [data-step-in="n"]    → ganha .is-on quando passo >= n
      [data-step-in-eq="n"] → ganha .is-eq quando passo === n
      (podem coexistir no mesmo elemento)

   O roteiro começa quando o mock entra na viewport e repete em loop.
   Com reduced-motion, pula direto para o estado final. */
import { REDUCED, whenVisible } from './motion';

for (const root of document.querySelectorAll<HTMLElement>('[data-step-mock]')) {
  const count = parseInt(root.dataset.steps || '1', 10);
  const interval = parseInt(root.dataset.interval || '1100', 10);
  const hold = parseInt(root.dataset.hold || '0', 10);
  const items = root.querySelectorAll<HTMLElement>(
    '[data-step], [data-step-eq], [data-step-in], [data-step-in-eq]',
  );

  const apply = (step: number) => {
    for (const el of items) {
      const { step: min, stepEq, stepIn, stepInEq } = el.dataset;
      if (stepIn !== undefined) el.classList.toggle('is-on', step >= +stepIn);
      if (stepInEq !== undefined) el.classList.toggle('is-eq', step === +stepInEq);
      if (min !== undefined) el.hidden = step < +min;
      else if (stepEq !== undefined) el.hidden = step !== +stepEq;
    }
  };

  if (REDUCED) {
    apply(count - 1);
    continue;
  }

  apply(0);
  whenVisible(root, () => {
    let i = 0;
    const tick = () => {
      const atEnd = i >= count - 1;
      const wait = atEnd ? hold || interval : interval;
      setTimeout(() => {
        i = atEnd ? 0 : i + 1;
        apply(i);
        tick();
      }, wait);
    };
    tick();
  });
}
