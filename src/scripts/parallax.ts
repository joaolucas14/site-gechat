/* Parallax sutil em `[data-parallax="<velocidade>"]`: o elemento translada
   conforme seu centro se afasta do centro da viewport (fórmula do protótipo).
   Atualiza num rAF disparado por scroll/resize — nada roda com a página parada. */
import { REDUCED } from './motion';

const els = [...document.querySelectorAll<HTMLElement>('[data-parallax]')];

if (!REDUCED && els.length > 0) {
  let raf: number | null = null;

  const update = () => {
    raf = null;
    const vh = window.innerHeight;
    for (const el of els) {
      const speed = parseFloat(el.dataset.parallax || '0');
      const r = el.getBoundingClientRect();
      const center = r.top + r.height / 2 - vh / 2;
      el.style.transform = `translate3d(0, ${(-center * speed).toFixed(1)}px, 0)`;
    }
  };

  const schedule = () => {
    if (raf === null) raf = requestAnimationFrame(update);
  };

  update();
  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', schedule);
}
