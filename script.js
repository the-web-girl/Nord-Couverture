// ─────────────────────────────────────────────
// 1. HEADER QUI CHANGE D'APPARENCE AU DÉFILEMENT
// ─────────────────────────────────────────────
// Quand l'utilisateur fait défiler la page de plus de 60px,
// on ajoute la classe CSS "scrolled" sur le header.
// Cela permet par exemple d'ajouter une ombre ou de
// changer la couleur de fond via le CSS.

const header = document.getElementById('header');

window.addEventListener('scroll', () => {
  // toggle(classe, condition) : ajoute la classe si vrai, la retire si faux
  header.classList.toggle('scrolled', window.scrollY > 60);
});

