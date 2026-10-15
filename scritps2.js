
/* ==========================================
   FASOTOK — PUBLICATION PHOTO ET VIDÉO
   Version corrigée : sans doublons
========================================== */

document.addEventListener("DOMContentLoaded", function () {
  const feed = document.querySelector(".video-feed");
  const boutonPlus = document.querySelector(".plus-container");

  if (!feed || !boutonPlus) {
    console.error("FasoTok : zone Accueil ou bouton + introuvable.");
    return;
  }

  // Créer le sélecteur de fichiers une seule fois
  let selecteur = document.getElementById("fasotok-selecteur");

  if (!selecteur) {
    selecteur = document.createElement("input");
    selecteur.id = "fasotok-selecteur";
    selecteur.type = "file";
    selecteur.accept = "image/*,video/*";
    selecteur.multiple = true;
    selecteur.hidden = true;
    document.body.appendChild(selecteur);
  }

  // Ouvrir la galerie avec le bouton +
  boutonPlus.addEventListener("click", function (event) {
    event.preventDefault();
    selecteur.click();
  });

  // Ajouter les fichiers choisis dans Accueil
  selecteur.addEventListener("change", function () {
    const fichiers = Array.from(selecteur.files || []);

    fichiers.forEach(function (fichier) {
      const estImage = fichier.type.startsWith("image/");
      const estVideo = fichier.type.startsWith("video/");

      if (!estImage && !estVideo) return;

      const carte = document.createElement("section");
      carte.className = "video-card";
      carte.style.position = "relative";
      carte.style.height = "100%";
      carte.style.height = "calc(100vh - 115px)";
carte.style.minHeight = "400px";
carte.style.width = "100%";
      carte.style.background = "#000";

      const media = document.createElement(estVideo ? "video" : "img");
      media.src = URL.createObjectURL(fichier);
      media.style.display = "block";
      media.style.width = "100%";
      media.style.height = "100%";
media.style.minHeight = "400px";
media.style.maxWidth = "100%";
      media.style.minHeight = "300px";
      media.style.objectFit = "contain";
      media.style.background = "#000";

      if (estVideo) {
        media.controls = true;
        media.autoplay = false;
        media.loop = true;
        media.muted = false;
        media.defaultMuted = false;
        media.playsInline = true;
        media.setAttribute("controls", "");

        // Le son reste activable par les commandes du lecteur.
        media.addEventListener("click", function () {
          media.muted = false;
        });
      } else {
        media.alt = "Photo publiée sur FasoTok";
      }

      const description = document.createElement("div");
      description.className = "video-footer";

      const nom = document.createElement("h3");
      nom.textContent = "@MonProfil";

      const texte = document.createElement("p");
      texte.textContent = fichier.name;

      description.appendChild(nom);
      description.appendChild(texte);

      carte.appendChild(media);
      carte.appendChild(description);

      // Placer la nouvelle publication en tête du fil
      feed.prepend(carte);
    });

    // Permet de sélectionner à nouveau le même fichier
  
setTimeout(function () {
  selecteur.value = "";
}, 0);
  });
});

/* ==========================================
   FASOTOK — SAUVEGARDE LOCALE DES PUBLICATIONS
   Extension du code existant
========================================== */

document.addEventListener("DOMContentLoaded", function () {
  const feed = document.querySelector(".video-feed");
  const selecteur = document.getElementById("fasotok-selecteur");

  if (!feed || !selecteur || !window.indexedDB) {
    console.warn("FasoTok : stockage local indisponible.");
    return;
  }

  let base;

  function ouvrirBase() {
    return new Promise(function (resolve, reject) {
      const demande = indexedDB.open("FasoTokPublications", 1);

      demande.onupgradeneeded = function () {
        const db = demande.result;

        if (!db.objectStoreNames.contains("publications")) {
          db.createObjectStore("publications", {
            keyPath: "id",
            autoIncrement: true
          });
        }
      };

      demande.onsuccess = function () {
        base = demande.result;
        resolve(base);
      };

      demande.onerror = function () {
        reject(demande.error);
      };
    });
  }

  function enregistrer(fichier) {
    return new Promise(function (resolve, reject) {
      const transaction = base.transaction(
        ["publications"],
        "readwrite"
      );

      transaction.objectStore("publications").add({
        nom: fichier.name,
        type: fichier.type,
        fichier: fichier,
        date: Date.now()
      });

      transaction.oncomplete = resolve;
      transaction.onerror = function () {
        reject(transaction.error);
      };
    });
  }

  function afficherPublication(publication) {
    const carte = document.createElement("section");
    carte.className = "video-card";
    carte.style.position = "relative";
    carte.style.height = "calc(100vh - 115px)";
    carte.style.minHeight = "400px";
    carte.style.width = "100%";
    carte.style.background = "#000";

    const estVideo = publication.type.startsWith("video/");
    const media = document.createElement(estVideo ? "video" : "img");

    media.src = URL.createObjectURL(publication.fichier);
    media.style.width = "100%";
    media.style.height = "100%";
    media.style.minHeight = "400px";
    media.style.maxWidth = "100%";
    media.style.objectFit = "contain";
    media.style.display = "block";

    if (estVideo) {
      
if (estVideo) {
  media.controls = true;
if (estVideo) {
  media.controls = true;
  media.autoplay = true;
  media.loop = true;
  media.muted = true;
  media.playsInline = true;
}
  media.loop = true;
  media.muted = true;
  media.defaultMuted = true;
  media.playsInline = true;

  media.addEventListener("click", function () {
    media.muted = false;
  });
} else {
  media.alt = "Photo publiée sur FasoTok";
}

      media.muted = false;
      media.loop = true;
      media.playsInline = true;
    } else {
      media.alt = "Photo publiée sur FasoTok";
    }

    const description = document.createElement("div");
    description.className = "video-footer";

    const nom = document.createElement("h3");
    nom.textContent = "@MonProfil";

    const texte = document.createElement("p");
    texte.textContent = publication.nom;

    description.appendChild(nom);
    description.appendChild(texte);
    carte.appendChild(media);
    carte.appendChild(description);

    feed.prepend(carte);
  }

  ouvrirBase()
    .then(function () {
      // Restaurer les publications enregistrées
      return new Promise(function (resolve, reject) {
        const transaction = base.transaction(
          ["publications"],
          "readonly"
        );

        const demande = transaction
          .objectStore("publications")
          .getAll();

        demande.onsuccess = function () {
          resolve(demande.result);
        };

        demande.onerror = function () {
          reject(demande.error);
        };
      });
    })
    .then(function (publications) {
      publications.forEach(afficherPublication);
    })
    .catch(function (erreur) {
      console.error("Erreur de restauration FasoTok :", erreur);
    });

  // Sauvegarder les nouveaux fichiers sélectionnés
  selecteur.addEventListener("change", async function () {
    if (!base) return;

    const fichiers = Array.from(selecteur.files || []);

    for (const fichier of fichiers) {
      if (
        !fichier.type.startsWith("image/") &&
        !fichier.type.startsWith("video/")
      ) {
        continue;
      }

      try {
        await enregistrer(fichier);
        console.log("Publication sauvegardée :", fichier.name);
      } catch (erreur) {
        console.error("Sauvegarde impossible :", erreur);
        alert(
          "La publication n'a pas pu être sauvegardée. " +
          "Vérifie l'espace disponible sur ton téléphone."
        );
      }
    }
  });
});
