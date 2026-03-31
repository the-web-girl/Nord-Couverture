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

// ─────────────────────────────────────────────
// 2. MENU MOBILE (HAMBURGER)
// ─────────────────────────────────────────────
// Le menu mobile s'ouvre et se ferme grâce à la classe CSS "open".
// Trois cas de fermeture : bouton de fermeture, clic sur un lien.

// Ouvre le menu quand on clique sur l'icône hamburger (≡)
document.getElementById('hamburger').addEventListener('click', () => {
  document.getElementById('mobileMenu').classList.add('open');
});

// Ferme le menu quand on clique sur le bouton "×" (croix de fermeture)
document.getElementById('mobileClose').addEventListener('click', () => {
  document.getElementById('mobileMenu').classList.remove('open');
});

// Ferme aussi le menu quand on clique sur n'importe quel lien de navigation.
// querySelectorAll retourne tous les éléments ayant la classe "mobile-nav-link",
// et forEach permet d'ajouter l'événement sur chacun d'eux.
document.querySelectorAll('.mobile-nav-link').forEach(lien => {
  lien.addEventListener('click', () => {
    document.getElementById('mobileMenu').classList.remove('open');
  });
});

// ─────────────────────────────────────────────
// 3. ANIMATION D'APPARITION AU DÉFILEMENT (SCROLL REVEAL)
// ─────────────────────────────────────────────
// L'IntersectionObserver surveille des éléments HTML et déclenche
// une fonction dès qu'ils deviennent visibles dans la fenêtre.
// Ici, on ajoute la classe "visible" pour déclencher une animation CSS.

// Création de l'observateur.
// "threshold: 0.12" signifie : déclencher quand 12% de l'élément est visible.
const observer = new IntersectionObserver((entries) => {

  entries.forEach(entry => {

    // Si l'élément est actuellement visible à l'écran...
    if (entry.isIntersecting) {

      // ...on lui ajoute la classe "visible" (déclenche l'animation CSS)
      entry.target.classList.add('visible');

      // ...et on arrête de l'observer : inutile de re-déclencher l'animation
      observer.unobserve(entry.target);
    }
  });

}, { threshold: 0.12 });

// On applique l'observateur à tous les éléments animables de la page
document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => {
  observer.observe(el);
});

// ─────────────────────────────────────────────
// 4. DÉFILEMENT FLUIDE (SMOOTH SCROLL)
// ─────────────────────────────────────────────
// Par défaut, cliquer sur un lien ancre (#section) fait sauter
// brutalement vers la cible. Ce code remplace ce comportement
// par un défilement animé et fluide.

// On sélectionne tous les liens dont l'href commence par "#"
// (ex : <a href="#contact">)
document.querySelectorAll('a[href^="#"]').forEach(lien => {

  lien.addEventListener('click', evenement => {

    // On cherche l'élément cible correspondant au href du lien
    const cible = document.querySelector(lien.getAttribute('href'));

    if (cible) {
      // On bloque le comportement natif du navigateur (saut brutal)
      evenement.preventDefault();

      // On fait défiler doucement jusqu'à la cible
      cible.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ─────────────────────────────────────────────
// 5. ENVOI DU FORMULAIRE DE CONTACT
// ─────────────────────────────────────────────
// Cette fonction est appelée quand l'utilisateur clique sur
// le bouton "Envoyer" du formulaire (via onclick="submitForm()").
// Elle valide les champs obligatoires avant de confirmer l'envoi.

function submitForm() {

  // On récupère les valeurs saisies et on supprime les espaces inutiles
  // en début et fin (.trim()) pour éviter les faux positifs
  const prenom    = document.getElementById('fname').value.trim();
  const telephone = document.getElementById('phone').value.trim();

  // Validation : les deux champs sont obligatoires
  if (!prenom || !telephone) {
    alert('Merci de renseigner au minimum votre prénom et votre numéro de téléphone.');
    return; // On arrête ici si la validation échoue
  }

  // Si tout est valide : on cache le formulaire et on affiche le message de succès
  document.getElementById('contactFormWrap').style.display = 'none';
  document.getElementById('formSuccess').style.display    = 'block';
}