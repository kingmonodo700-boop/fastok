
/* =========================================================
   FASOTOK 🇧🇫 — SCRIPT PRINCIPAL
   Navigation, assistant, langue, authentification,
   publication et chargement des vidéos
   ========================================================= */

// --- 1. CONFIGURATION SUPABASE ---
const SUPABASE_URL = "https://vloshskfgaqcdxaktdvy.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_I5sAXEonuAJ2TvRNuvUNPA_o5wIONOm";

if (!window.supabase) {
  console.error("FasoTok : la bibliothèque Supabase est introuvable.");
} else {
  window.supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_ANON_KEY,
    {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true
      }
    }
  );
}

const supabaseClient = window.supabaseClient;


// --- 2. NAVIGATION, ASSISTANT ET PARAMÈTRES ---
document.addEventListener("DOMContentLoaded", () => {
  const navButtons = document.querySelectorAll(".nav-item[data-page]");
  const pageSections = document.querySelectorAll(".page-section");
  const openSettingsBtn = document.getElementById("open-settings-btn");
  const backHomeBtn = document.getElementById("back-home-btn");

  function switchPage(pageId) {
    pageSections.forEach(section => {
      section.hidden = true;
    
  // --- OUVRIR LES PAGES DE CONFIDENTIALITÉ ---
  const boutonConfidentialite =
    document.getElementById("ouvrir-confidentialite");

  const boutonPolitique =
    document.getElementById("ouvrir-politique-confidentialite");

  const boutonReferences =
    document.getElementById("ouvrir-references-legales");

  function ouvrirPageFasoTok(idPage) {
    document.querySelectorAll(".page-section").forEach(page => {
      page.hidden = true;
    });

    const page = document.getElementById(idPage);

    if (page) {
      page.hidden = false;
      page.style.display = "block";
    }
  }

  if (boutonConfidentialite) {
    boutonConfidentialite.addEventListener("click", () => {
      ouvrirPageFasoTok("confidentialite-page");
    });
  }

  if (boutonPolitique) {
    boutonPolitique.addEventListener("click", () => {
      ouvrirPageFasoTok("politique-confidentialite-page");
    });
  }

  if (boutonReferences) {
    boutonReferences.addEventListener("click", () => {
      ouvrirPageFasoTok("references-legales-page");
    });
  }

    });

    const targetPage = document.getElementById(`${pageId}-page`);

    if (targetPage) {
      targetPage.hidden = false;
    }

    navButtons.forEach(btn => {
      btn.classList.toggle(
        "active-nav",
        btn.getAttribute("data-page") === pageId
      );
    });
  }

  navButtons.forEach(button => {
    button.addEventListener("click", () => {
      switchPage(button.getAttribute("data-page"));
    });
  });

  if (openSettingsBtn) {
  openSettingsBtn.addEventListener("click", () => {
    document.querySelectorAll(".page-section").forEach(page => {
      page.hidden = true;
    });

    const pageParametres = document.getElementById("parametres-page");

    if (pageParametres) {
      pageParametres.hidden = false;
      pageParametres.style.display = "block";
    } else {
      alert("FasoTok : page Paramètres introuvable.");
    }
  });
  }

  if (backHomeBtn) {
    backHomeBtn.addEventListener("click", () => {
      switchPage("home");
    });
  }

  // Assistant IA : simulation conservée
  const assistantForm = document.getElementById("assistant-form");
  const assistantQuestion = document.getElementById("assistant-question");
  const assistantReponses = document.getElementById("assistant-reponses");

  if (assistantForm && assistantQuestion && assistantReponses) {
    assistantForm.addEventListener("submit", event => {
      event.preventDefault();

      const question = assistantQuestion.value.trim();
      if (!question) return;

      const message = document.createElement("p");
      message.textContent = "Moi : " + question;
      assistantReponses.appendChild(message);

      const reponse = document.createElement("p");
      reponse.textContent = "🤖 L'assistant réfléchit...";
      assistantReponses.appendChild(reponse);

      assistantQuestion.value = "";

      setTimeout(() => {
        reponse.textContent =
          "🤖 L'assistant est en mode démonstration. " +
          "Une connexion à un service d'intelligence artificielle " +
          "sera nécessaire pour obtenir de vraies réponses.";
      }, 1500);
    });
  }

  // Sélection de la langue
  const langueSelect = document.getElementById("fasotok-langue");
  const langueMessage = document.getElementById("langue-message");

  if (langueSelect) {
    langueSelect.addEventListener("change", event => {
      const option = event.target.options[event.target.selectedIndex];

      if (langueMessage && option) {
        langueMessage.textContent =
          "Langue sélectionnée : " + option.text;
      }
    });
  }
});


// --- 3. AUTHENTIFICATION ET RESTAURATION DE SESSION ---
document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("login-form");
  const registerForm = document.getElementById("register-form");
  const authOverlay = document.getElementById("auth-overlay");
  const deconnexionBtn = document.getElementById("deconnexion-fasotok");

  if (!supabaseClient) {
    alert("Erreur : Supabase n'est pas initialisé.");
    return;
  }

  function afficherUtilisateur(user) {
    if (!user) return;

    const username = user.user_metadata?.username || "Utilisateur";

    document.querySelectorAll(
      ".profile-username, .profile-header h2"
    ).forEach(element => {
      element.textContent = "@" + username;
    });

    if (authOverlay) {
      authOverlay.style.display = "none";
    }
  }

  // Restaurer la session existante
  (async () => {
    try {
      const { data, error } = await supabaseClient.auth.getSession();

      if (error) throw error;

      if (data.session?.user) {
        afficherUtilisateur(data.session.user);
      }
    } catch (error) {
      console.error("Erreur de restauration de session :", error.message);
    }
  })();

  // INSCRIPTION
  if (registerForm) {
    registerForm.addEventListener("submit", async event => {
      event.preventDefault();

      const username =
        document.getElementById("register-username").value.trim();

      const codeSecret =
        document.getElementById("register-password").value;

      const confirmation =
        document.getElementById("register-confirm-password").value;

      if (!/^[a-zA-Z0-9._-]{3,30}$/.test(username)) {
        alert("Choisis un pseudo de 3 à 30 caractères : lettres, chiffres, point, tiret ou soulignement.");
        return;
      }

      if (codeSecret !== confirmation) {
        alert("Les codes secrets ne correspondent pas.");
        return;
      }

      if (codeSecret.length < 6) {
        alert("Choisis un code secret d'au moins 6 caractères.");
        return;
      }

      const fauxEmail = username.toLowerCase() + "@fasotok.bf";

      try {
        const { data, error } = await supabaseClient.auth.signUp({
          email: fauxEmail,
          password: codeSecret,
          options: {
            data: { username: username }
          }
        });

        if (error) throw error;

        if (data.session?.user) {
          afficherUtilisateur(data.session.user);
          alert("Compte créé avec succès ! Bienvenue sur FasoTok 🇧🇫");
        } else {
          alert(
            "Inscription reçue. Vérifie la configuration de confirmation " +
           
            "des inscriptions dans Supabase avant de te connecter."
          );
        }
      } catch (error) {
        console.error("Erreur d'inscription :", error);
        alert("Échec de l'inscription : " + error.message);
      }
    });
  }


  // CONNEXION : FasoTok
  if (loginForm) {
    loginForm.addEventListener("submit", async event => {
      event.preventDefault();

      const username =
        document.getElementById("login-username").value.trim();

      const codeSecret =
        document.getElementById("login-password").value;

      if (!username || !codeSecret) {
        alert("Entre ton pseudo et ton code secret.");
        return;
      }

      const fauxEmail = username.toLowerCase() + "@fasotok.bf";

      try {
        const { data, error } =
          await supabaseClient.auth.signInWithPassword({
            email: fauxEmail,
            password: codeSecret
          });

        if (error) throw error;

        if (!data.session || !data.user) {
          throw new Error(
            "Aucune session active. Vérifie ton compte Supabase."
          );
        }

        // Fermer l'écran de connexion
        if (authOverlay) {
          authOverlay.style.setProperty(
            "display",
            "none",
            "important"
          );
        }

        afficherUtilisateur(data.user);

        console.log("FasoTok : connexion réussie.");

        alert("Bienvenue sur FasoTok 🇧🇫, @" + username + " !");

      } catch (error) {
        console.error("Erreur de connexion :", error);

        alert("Connexion impossible : " + error.message);
      }
    });
  }

  // DÉCONNEXION réelle
  if (deconnexionBtn) {
    deconnexionBtn.addEventListener("click", async () => {
      try {
        const { error } = await supabaseClient.auth.signOut();

        if (error) throw error;

        if (authOverlay) {
          authOverlay.style.display = "flex";
        }

        alert("Tu es déconnecté de FasoTok.");
      } catch (error) {
        console.error("Erreur de déconnexion :", error);
        alert("Échec de déconnexion : " + error.message);
      }
    });
  }
});


/* --- FASOTOK : BOUTONS SUR CHAQUE VIDÉO --- */
function ajouterBoutonsVideo(carte, video, username) {
 
  // Cœur animé au double-tap sur la vidéo
  let dernierToucher = 0;

  video.addEventListener("touchend", function(e) {
    const maintenant = Date.now();

    if (maintenant - dernierToucher < 350) {
      const coeur = document.createElement("div");
      coeur.textContent = "❤️";

      coeur.style.position = "absolute";
      coeur.style.left = "50%";
      coeur.style.top = "50%";
      coeur.style.transform = "translate(-50%, -50%) scale(0)";
      coeur.style.fontSize = "90px";
      coeur.style.zIndex = "200";
      coeur.style.pointerEvents = "none";
      coeur.style.transition = "transform 0.25s ease";

      carte.appendChild(coeur);

      requestAnimationFrame(() => {
        coeur.style.transform = "translate(-50%, -50%) scale(1.4)";
      });

      setTimeout(() => coeur.remove(), 700);
      dernierToucher = 0;
    } else {
      dernierToucher = maintenant;
    }
  });

  const sidebar = document.getElementById("fixed-video-sidebar");

if (!sidebar) {
  console.error("FasoTok : emplacement des boutons introuvable");
  return;
}

sidebar.innerHTML = "";
sidebar.className = "interaction-sidebar";
    const actions = [
    { icon: "👤", label: "Profil", action: "profil" },
    { icon: "❤️", label: "J’aime", action: "like" },
    { icon: "💬", label: "Commentaires", action: "comment" },
    { icon: "🔖", label: "Favoris", action: "favoris" },
    { icon: "↗", label: "Partager", action: "share" }
  ];

  actions.forEach(item => {
    const groupe = document.createElement("div");
    groupe.className = "icon-group";

    const bouton = document.createElement("button");
    bouton.type = "button";
    bouton.className = "action-btn";
    bouton.textContent = item.icon;
    bouton.setAttribute("aria-label", item.label);

    const label = document.createElement("span");
    label.className = "sidebar-label";
    label.textContent = item.label;

    bouton.addEventListener("click", async event => {
      event.stopPropagation();

      if (item.action === "profil") {
        document.querySelectorAll(".page-section").forEach(page => {
          page.hidden = true;
        });
        document.getElementById("profile-page").hidden = false;

        document.querySelectorAll(
          ".profile-username, .profile-header h2"
        ).forEach(element => {
          element.textContent = "@" + username;
        });
      }

      if (item.action === "like") {
        bouton.textContent =
          bouton.textContent === "❤️" ? "🤍" : "❤️";
      }

      if (item.action === "comment") {
        const commentaire = prompt("Écris ton commentaire :");
        if (commentaire && commentaire.trim()) {
          alert("Commentaire saisi : " + commentaire.trim());
        }
      }

      if (item.action === "share") {
        try {
          if (navigator.share) {
            await navigator.share({
              title: "Vidéo FasoTok",
              text: "Regarde cette vidéo sur FasoTok !",
              url: video.src
            });
          } else if (navigator.clipboard) {
            await navigator.clipboard.writeText(video.src);
            alert("Lien de la vidéo copié !");
          } else {
            prompt("Copie le lien de la vidéo :", video.src);
          }
        } catch (error) {
          if (error.name !== "AbortError") {
            console.error("Erreur de partage :", error);
          }
        }
      }
    });

    groupe.appendChild(bouton);
    groupe.appendChild(label);
    sidebar.appendChild(groupe);
  });

  if (!sidebar.parentElement) {
  console.warn("FasoTok : boutons en attente de leur emplacement fixe.");
  }
     }
// --- 4. PUBLICATION DE VIDÉOS ---
document.addEventListener("DOMContentLoaded", () => {
 const boutonPublier = document.getElementById("publish-nav-btn");
  const selecteur = document.getElementById("fasotok-selecteur");

  if (!boutonPublier || !selecteur) {
    console.error("FasoTok : bouton Publier ou sélecteur introuvable.");
    return;
  }

  boutonPublier.addEventListener("click", () => {
    selecteur.click();
  });

  selecteur.addEventListener("change", async () => {
    const fichier = selecteur.files?.[0];

    if (!fichier) return;

    if (!fichier.type.startsWith("video/")) {
      alert("Choisis un fichier vidéo pour continuer.");
      selecteur.value = "";
      return;
    }

    if (!supabaseClient) {
      alert("Supabase n'est pas initialisé.");
      return;
    }

    let cheminFichier = null;
    let fichierEnvoye = false;

    try {
      boutonPublier.disabled = true;
      boutonPublier.textContent = "Publication en cours...";

      // Vérifier la session réelle
      const { data: sessionData, error: sessionError } =
        await supabaseClient.auth.getSession();

      if (sessionError) throw sessionError;

      const utilisateur = sessionData.session?.user;

      if (!utilisateur) {
        throw new Error(
          "Aucune session Supabase active. Connecte-toi avant de publier."
        );
      }

      console.log("Publication par l'utilisateur :", utilisateur.id);

      // Nom de fichier unique dans le dossier de l'utilisateur
      const extension = fichier.name.includes(".")
        ? fichier.name.split(".").pop().toLowerCase()
        : "mp4";

      cheminFichier =
        utilisateur.id + "/" + Date.now() + "." + extension;

      // ENVOI DU FICHIER DANS STORAGE
      const { data: uploadData, error: uploadError } =
        await supabaseClient.storage
          .from("videos")
          .upload(cheminFichier, fichier, {
            contentType: fichier.type || "video/mp4",
            upsert: false
          });

      if (uploadError) {
        console.error("Erreur Storage :", uploadError);
        throw new Error("ÉCHEC STORAGE : " + uploadError.message);
      }

      fichierEnvoye = true;

      // Récupérer l'URL publique du fichier
      const { data: urlData } = supabaseClient.storage
        .from("videos")
        .getPublicUrl(uploadData.path);

      const urlVideo = urlData.publicUrl;

      if (!urlVideo) {
        throw new Error("Impossible de récupérer l'adresse de la vidéo.");
      }

      const username =
        utilisateur.user_metadata?.username || "Utilisateur";

      // ENREGISTRER LES INFORMATIONS DANS LA TABLE videos
      const { error: insertionError } = await supabaseClient
        .from("videos")
        .insert({
          user_id: utilisateur.id,
          username: username,
          video_url: urlVideo,
          caption: ""
        });

      if (insertionError) {
        console.error("Erreur table videos :", insertionError);

        // Nettoyage du fichier si l'insertion échoue
        const { error: nettoyageError } = await supabaseClient.storage
          .from("videos")
          .remove([cheminFichier]);

        if (nettoyageError) {
          console.error("Erreur de nettoyage Storage :", nettoyageError);
        }

        fichierEnvoye = false;

        throw new Error(
          "ÉCHEC TABLE VIDEOS : " + insertionError.message
        );
      }

      
      // AFFICHER LA VIDÉO PUBLIÉE DANS LE FIL FASOTOK
      const fil = document.getElementById("video-feed");

      if (fil) {
        const carte = document.createElement("div");
        carte.className = "video-card";
const video = document.createElement("video");
        video.src = urlVideo;
        video.autoplay = true;
     video.addEventListener("click", async () => {
  video.muted = false;

  try {
    await video.play();
    console.log("FasoTok : lecture avec son activée.");
  } catch (erreur) {
    console.error("Erreur de lecture vidéo :", erreur);
  }
});
        video.loop = true;
video.playsInline = true;
video.preload = "metadata";

video.addEventListener("click", async (event) => {
  event.stopPropagation();

  if (video.paused) {
    video.muted = false;

    try {
      await video.play();
    } catch (erreur) {
      console.error("Erreur de lecture :", erreur);
    }
  } else {
    video.pause();
  }
});

const pied = document.createElement("div");
pied.className = "video-footer";

        const pseudo = document.createElement("h3");
        pseudo.textContent = "@" + username;

        const description = document.createElement("p");
        description.textContent = "";

        pied.appendChild(pseudo);
        pied.appendChild(description);

        carte.appendChild(video);
        carte.appendChild(pied);
ajouterBoutonsVideo(carte, video, username || "Utilisateur");
fil.appendChild(carte);
        video.play().catch(() => {
          console.log("La lecture démarrera après une action.");
        });
      }


      alert("Vidéo publiée avec succès sur FasoTok ! 🇧🇫");

    } catch (error) {
      console.error("Erreur de publication FasoTok :", error);

      alert(
        "Échec de publication : " +
        (error.message || "Erreur inconnue")
      );
    } finally {
      boutonPublier.disabled = false;
      boutonPublier.textContent = "Publier";
      selecteur.value = "";
    }
  });
});
// --- 5. RECHARGER LES VIDÉOS DEPUIS SUPABASE ---
document.addEventListener("DOMContentLoaded", async () => {
  const fil = document.getElementById("video-feed");

  if (!fil || !supabaseClient) return;

  try {
    const { data: videos, error } = await supabaseClient
      .from("videos")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;

    fil.innerHTML = "";

    videos.forEach(item => {
      const carte = document.createElement("div");
      carte.className = "video-card";

      const video = document.createElement("video");
      video.src = item.video_url;
      video.addEventListener("error", () => {
  console.error("Erreur vidéo :", video.error, item.video_url);
});

video.addEventListener("loadeddata", () => {
  console.log("FasoTok : vidéo chargée.");
});

video.addEventListener("click", async (event) => {
  event.stopPropagation();

  if (video.paused) {
    try {
      await video.play();
    } catch (erreur) {
      console.error("Lecture impossible :", erreur);
    }
  } else {
    video.pause();
  }
});
      video.autoplay = true;
      video.muted = false;
      video.loop = true;
      video.playsInline = true