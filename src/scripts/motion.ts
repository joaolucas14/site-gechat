/* Utilitários compartilhados de animação. */

/** Usuário pediu menos movimento: animações viram estado final estático. */
export const REDUCED =
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * Executa `cb` uma única vez quando `el` entra na viewport
 * (mesmo gatilho do protótipo: ~92% da altura da tela).
 */
export function whenVisible(el: Element, cb: () => void): void {
  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          io.disconnect();
          cb();
          return;
        }
      }
    },
    { rootMargin: '0px 0px -8% 0px' },
  );
  io.observe(el);
}
