/* Revela elementos `.reveal` (adiciona `.in`) quando entram na viewport,
   uma única vez — substitui o loop de rAF do protótipo por
   IntersectionObserver. Com reduced-motion o CSS já mostra tudo. */
import { REDUCED } from './motion';

const els = document.querySelectorAll('.reveal');

if (REDUCED) {
  els.forEach((el) => el.classList.add('in'));
} else {
  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      }
    },
    { rootMargin: '0px 0px -8% 0px' },
  );
  els.forEach((el) => io.observe(el));
}
