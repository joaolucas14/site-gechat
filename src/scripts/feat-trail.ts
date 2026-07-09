/* Trilha de recursos: scrollspy dos 4 blocos, barra de progresso e o
   comportamento "docked" — no desktop (>980px) a trilha gruda no teto
   e o header cede o palco (.is-shed), com histerese pra não tremer.
   Porta o useFeaturesDocked + scrollspy do protótipo. */
import { REDUCED } from './motion';

const trail = document.querySelector<HTMLElement>('.feat-trail');
const block = document.querySelector<HTMLElement>('.features-block');
const head = document.querySelector<HTMLElement>('.site-head');

if (trail && block) {
  const nodes = [...trail.querySelectorAll<HTMLAnchorElement>('.feat-trail-node')];
  const ids = nodes.map((a) => (a.getAttribute('href') || '').slice(1));
  let docked = false;

  const setDocked = (d: boolean) => {
    docked = d;
    trail.classList.toggle('is-docked', d);
    head?.classList.toggle('is-shed', d);
  };

  const onScroll = () => {
    /* scrollspy: último bloco cujo topo passou da linha de 150px */
    let active = 0;
    ids.forEach((id, i) => {
      const el = document.getElementById(id);
      if (el && el.getBoundingClientRect().top <= 150) active = i;
    });
    nodes.forEach((a, i) => {
      a.classList.toggle('is-active', i === active);
      a.classList.toggle('is-done', i < active);
      if (i === active) a.setAttribute('aria-current', 'true');
      else a.removeAttribute('aria-current');
    });
    const prog = ids.length > 1 ? (active / (ids.length - 1)) * 100 : 0;
    trail.style.setProperty('--prog', prog + '%');

    /* dock: só no desktop */
    if (window.innerWidth <= 980) {
      if (docked) setDocked(false);
      return;
    }
    const tt = trail.getBoundingClientRect().top;
    const bb = block.getBoundingClientRect().bottom;
    let d = docked;
    if (!d && tt <= 92 && bb > 140) d = true; // bateu no teto, ainda dentro do bloco
    else if (d && (tt > 150 || bb <= 70)) d = false; // soltou (com histerese)
    if (d !== docked) setDocked(d);
  };

  /* salto suave com folga pro cabeçalho flutuante */
  for (const a of nodes) {
    a.addEventListener('click', (e) => {
      const el = document.getElementById((a.getAttribute('href') || '').slice(1));
      if (!el) return;
      e.preventDefault();
      const y = el.getBoundingClientRect().top + window.scrollY - 120;
      window.scrollTo({ top: y, behavior: REDUCED ? 'auto' : 'smooth' });
    });
  }

  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
}
