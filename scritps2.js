function toggleLike(element) {
  // On cherche le bouton cœur à l'intérieur du groupe cliqué
  const boutonCoeur = element.querySelector('.heart-btn');
  const compteurText = element.querySelector('span');
  
  // On transforme le texte du compteur (ex: "12.5k") en nombre
  let clics = parseFloat(compteurText.innerText);
  
  // Si le cœur est rouge, on le remet normal
  if (boutonCoeur.style.color === "rgb(254, 44, 85)" || boutonCoeur.style.color === "#fe2c55") {
    boutonCoeur.style.color = "#ffffff"; // Blanc
    compteurText.innerText = (clics - 0.1).toFixed(1) + "k";
  } else {
    // Sinon, on le colore en rouge TikTok/FasoToc
    boutonCoeur.style.color = "#fe2c55"; // Rouge vif
    compteurText.innerText = (clics + 0.1).toFixed(1) + "k";
  }
}

function toggleBookmark(element) {
  const boutonFavoris = element.querySelector('.bookmark-btn');
  const compteurText = element.querySelector('span');
  let favorisCount = parseInt(compteurText.innerText);
  
  if (boutonFavoris.style.color === "rgb(250, 205, 59)" || boutonFavoris.style.color === "#facd3b") {
    boutonFavoris.style.color = "#ffffff"; // Blanc
    compteurText.innerText = favorisCount - 1;
  } else {
    boutonFavoris.style.color = "#facd3b"; // Jaune d'or
    compteurText.innerText = favorisCount + 1;
  }
}

console.log("Système d'interactions activé avec succès sur FasoToc ! 🇧🇫");
// --- LOGIQUE DU STUDIO DE CRÉATION ---

// 1. Ouvrir le studio et démarrer la caméra du smartphone
function ouvrirStudio() {
  const studioModal = document.getElementById('upload-modal');
  const baliseVideo = document.getElementById('webcam');
  
  if (studioModal) {
    studioModal.classList.add('active'); // Affiche la fenêtre
    
    // Demande l'accès à l'appareil photo du téléphone
    navigator.mediaDevices.getUserMedia({ video: { facingMode: "user" }, audio: false })
      .then((fluxCamera) => {
        baliseVideo.srcObject = fluxCamera;
      })
      .catch((erreur) => {
        console.error("Accès caméra refusé : ", erreur);
        alert("Activez la caméra dans les autorisations de votre téléphone pour tester le studio.");
      });
  }
}

// 2. Fermer le studio et ÉTEINDRE proprement la caméra (économie de batterie)
function fermerStudio() {
  const studioModal = document.getElementById('upload-modal');
  const baliseVideo = document.getElementById('webcam');
  
  if (studioModal) {
    studioModal.classList.remove('active'); // Masque la fenêtre
  }

  if (baliseVideo && baliseVideo.srcObject) {
    const fluxCourant = baliseVideo.srcObject;
    const pistes = fluxCourant.getTracks();
    pistes.forEach(piste => piste.stop()); // Éteint le capteur photo du portable
    baliseVideo.srcObject = null;
  }
}

// 3. Gestion des boutons de Filtres en direct
document.addEventListener("DOMContentLoaded", () => {
  const boutonsFiltres = document.querySelectorAll('.filter-btn');
  const maWebcam = document.getElementById('webcam');

  boutonsFiltres.forEach(bouton => {
    bouton.addEventListener('click', () => {
      boutonsFiltres.forEach(b => b.classList.remove('active-filter'));
      bouton.classList.add('active-filter');
      
      const filtre = bouton.getAttribute('data-filter');
      if (maWebcam) {
        maWebcam.classList.remove('effet-sepia', 'effet-grayscale');
        if (filtre === 'sepia') maWebcam.classList.add('effet-sepia');
        if (filtre === 'grayscale') maWebcam.classList.add('effet-grayscale');
      }
    });
  });
});

// 4. Simulation du bouton d'enregistrement
let enTrainDeFilmer = false;
function gererEnregistrement() {
  const bouton = document.getElementById('bouton-capture');
  const statut = document.getElementById('statut-enregistrement');
  
  if (!enTrainDeFilmer) {
    enTrainDeFilmer = true;
    bouton.classList.add('enregistrement-actif');
    statut.innerText = "Enregistrement en cours... 🔴";
    statut.style.color = "#fe2c55";
  } else {
    enTrainDeFilmer = false;
    bouton.classList.remove('enregistrement-actif');
    statut.innerText = "Vidéo enregistrée ! ✔";
    statut.style.color = "#4ade80";
  }
}
