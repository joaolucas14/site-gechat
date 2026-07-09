/* Mock de transferência entre setores: alterna a cada 3,8s entre
   "Ana atendendo" e "Pedro recebeu", trocando frase (RoleSwap) e
   fazendo o avatar da cliente "viajar" de um card pro outro —
   mesmos tempos e curvas do protótipo.

   Estrutura esperada (ver mocks/Transfer.astro):
   [data-transfer-mock]
     .tm-node ×2  (primeiro = origem, segundo = destino; .on = aceso)
       .rs[data-from][data-to] > .rs-size + .rs-anim   (frase)
       .tv > .tv-in                                     (avatar viajante) */
import { REDUCED, whenVisible } from './motion';

const EXIT = 500; // frase/avatar saem subindo
const GAP = 200; // intervalo vazio
const ENTER = 550; // nova frase/avatar entram de baixo
const INTERVAL = 3800;

for (const root of document.querySelectorAll<HTMLElement>('[data-transfer-mock]')) {
  const nodes = [...root.querySelectorAll<HTMLElement>('.tm-node')];
  const roles = [...root.querySelectorAll<HTMLElement>('.rs')];
  const avatars = [...root.querySelectorAll<HTMLElement>('.tv-in')];

  const setNodes = (to: boolean) => {
    nodes[0]?.classList.toggle('on', !to);
    nodes[1]?.classList.toggle('on', to);
  };

  const setRoleText = (rs: HTMLElement, to: boolean) => {
    const text = (to ? rs.dataset.to : rs.dataset.from) || '';
    rs.querySelectorAll<HTMLElement>('.rs-size, .rs-anim').forEach((el) => {
      el.textContent = text;
    });
  };

  /* estado final estático para quem pediu menos movimento */
  if (REDUCED) {
    setNodes(true);
    roles.forEach((rs) => setRoleText(rs, true));
    avatars[0]?.classList.add('gone');
    avatars[1]?.classList.remove('gone');
    continue;
  }

  const swap = (to: boolean) => {
    setNodes(to);

    for (const rs of roles) {
      const anim = rs.querySelector<HTMLElement>('.rs-anim');
      if (!anim) continue;
      anim.classList.remove('enter');
      anim.classList.add('exit'); // frase atual sobe e some
      setTimeout(() => {
        setRoleText(rs, to); // troca o texto, fica vazio
        anim.classList.remove('exit');
        anim.classList.add('hold');
      }, EXIT);
      setTimeout(() => {
        anim.classList.remove('hold');
        anim.classList.add('enter'); // nova entra de baixo
      }, EXIT + GAP);
      setTimeout(() => anim.classList.remove('enter'), EXIT + GAP + ENTER);
    }

    const leaving = to ? avatars[0] : avatars[1];
    const entering = to ? avatars[1] : avatars[0];
    if (leaving) {
      leaving.classList.add('exit'); // sobe junto com a frase saindo
      setTimeout(() => {
        leaving.classList.remove('exit');
        leaving.classList.add('gone');
      }, EXIT);
    }
    if (entering) {
      setTimeout(() => {
        entering.classList.remove('gone');
        entering.classList.add('enter'); // aparece junto com a nova frase
      }, EXIT + GAP);
      setTimeout(() => entering.classList.remove('enter'), EXIT + GAP + ENTER);
    }
  };

  whenVisible(root, () => {
    let to = false;
    setInterval(() => {
      to = !to;
      swap(to);
    }, INTERVAL);
  });
}
