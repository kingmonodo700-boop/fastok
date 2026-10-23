
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

if (supabaseClient) {
  supabaseClient.auth.onAuthStateChange((event, session) => {
    console.log(
      "FasoTok - événement :",
      event,
      "| session présente :",
      !!session
    );
  });
}

// TEST TEMPORAIRE DU STOCKAGE
try {
  console.log(
    "Stockage local disponible :",
    typeof localStorage !== "undefined"
  );

  localStorage.setItem("fasotok_test", "ok");


  const cle = Object.keys(localStorage).find(
    k => k.startsWith("sb-") && k.endsWith("-auth-token")
  );
} catch (e) {
  alert("Erreur de lecture du stockage : " + e.message);
}
 // --- 2. NAVIGATION, ASSISTANT ET PARAMÈTRES ---
document.addEventListener("DOMContentLoaded", () => {
  const navButtons = document.querySelectorAll(".nav-item[data-page]");
  const pageSections = document.querySelectorAll(".page-section");
  const openSettingsBtn = document.getElementById("open-settings-btn");
  const backHomeBtn = document.getElementById("back-home-btn");
const ouvrirAssistantBtn =
document.getElementById("ouvrir-assistant-btn");

if (ouvrirAssistantBtn) {
ouvrirAssistantBtn.addEventListener("click", () => {
switchPage("assistant");
});
}
  function switchPage(pageId) {
    pageSections.forEach(section => {
      section.hidden = true;
      section.style.display = "";
    });

    const targetPage = document.getElementById(`${pageId}-page`);

    if (targetPage) {
      targetPage.hidden = false;
      targetPage.style.display = "block";
    } else {
      console.error("FasoTok : page introuvable :", pageId + "-page");
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

  function ouvrirPageFasoTok(idPage) {
    switchPage(idPage.replace("-page", ""));
  }

  const boutonConfidentialite =
    document.getElementById("ouvrir-confidentialite");
  const boutonPolitique =
    document.getElementById("ouvrir-politique-confidentialite");
  const boutonReferences =
    document.getElementById("ouvrir-references-legales");

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

  if (openSettingsBtn) {
    openSettingsBtn.addEventListener("click", () => {
      switchPage("parametres");
    });
  }

  if (backHomeBtn) {
    backHomeBtn.addEventListener("click", () => {
      switchPage("home");
    });
  }
// --- ASSISTANT IA : CONNEXION À GEMINI VIA SUPABASE ---
const assistantForm = document.getElementById("assistant-form");
const assistantQuestion = document.getElementById("assistant-question");
const assistantReponses = document.getElementById("assistant-reponses");

if (assistantForm && assistantQuestion && assistantReponses) {
  assistantForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const question = assistantQuestion.value.trim();
    if (!question) return;

    const message = document.createElement("p");
    message.textContent = "Moi : " + question;
    assistantReponses.appendChild(message);

    const reponse = document.createElement("p");
    reponse.textContent = "🤖 Gemini réfléchit...";
    assistantReponses.appendChild(reponse);

    assistantQuestion.value = "";

    try {
      if (!supabaseClient) {
        throw new Error("La connexion à Supabase est indisponible.");
      }

      const { data, error } = await supabaseClient.functions.invoke(
        "clever-processor",
        {
          body: {
            question: question,
            language: "français"
          }
        }
      );

      if (error) {
        let detail = error.message || String(error);

        if (error.context) {
          try {
            const contenu = await error.context.clone().json();
            detail += " — " + JSON.stringify(contenu);
          } catch (_) {
            // Conserver le message initial.
          }
        }

        throw new Error(detail);
      }

      const texte =
        data?.answer ||
        data?.response ||
        data?.reply ||
        data?.message;

      if (!texte || data?.error) {
        throw new Error(
          data?.error || "La fonction n'a pas renvoyé de réponse."
        );
      }

      reponse.textContent = "🤖 " + texte;
    } catch (erreur) {
      console.error("Erreur Assistant FasoTok :", erreur);
      reponse.textContent = "⚠️ Erreur : " +
        (erreur?.message || String(erreur));
    }
  });
}
    // Sélection et mémorisation de la langue
  const langueSelect = document.getElementById("fasotok-langue");
  const langueMessage = document.getElementById("langue-message");

  if (langueSelect) {
    const langueEnregistree = localStorage.getItem("fasotok_langue");

    if (
      langueEnregistree &&
      Array.from(langueSelect.options).some(
        option => option.value === langueEnregistree
      )
    ) {
      langueSelect.value = langueEnregistree;
    }

    function afficherLangueSelectionnee() {
      const option =
        langueSelect.options[langueSelect.selectedIndex];

      if (langueMessage && option) {
        langueMessage.textContent =
          "Langue sélectionnée : " + option.text;
      }
    }

    afficherLangueSelectionnee();

    langueSelect.addEventListener("change", () => {
      localStorage.setItem("fasotok_langue", langueSelect.value);
      afficherLangueSelectionnee();
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
  authOverlay.hidden = true;
  authOverlay.style.setProperty("display", "none", "important");
}
  }
// Restaurer la session existante
  (async () => {
    try {
      
      const { data, error } = await supabaseClient.auth.getSession();

      if (error) throw error;

      console.log(
        "FasoTok : session au démarrage =",
        !!data.session
      );
     if (data.session?.user) {
    afficherUtilisateur(data.session.user);

    if (authOverlay) {
        authOverlay.style.setProperty(
            "display",
            "none",
            "important"
        );
    }

    console.log("FasoTok : utilisateur reconnecté automatiquement ✅");
} else {
    console.log("FasoTok : aucune session active.");
     } 
      
    } catch (error) {
      console.error("Erreur de restauration de session :", error.message);
    }
  })();
// Restaurer automatiquement l'affichage après reconnexion
supabaseClient.auth.onAuthStateChange((event, session) => {
if (session?.user) {
afficherUtilisateur(session.user);
console.log("FasoTok : session restaurée.");
} else if (event === "SIGNED_OUT") {
if (authOverlay) {
authOverlay.style.display = "flex";
}
}
});
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
alert("Pseudo reçu : " + username + "\nDébut de la connexion à Supabase...");
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
alert("Le code de connexion de FasoTok fonctionne !");
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
  alert("FasoTok : tentative de connexion lancée");

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

const verificationSession =
  await supabaseClient.auth.getSession();

alert(
  "Session enregistrée : " +
  (verificationSession.data.session ? "OUI" : "NON")
);
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
console.log("FasoTok : le gestionnaire de connexion fonctionne.");
        alert("Le bouton de connexion fonctionne !");
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
async function ajouterBoutonsVideo(carte, video, username, videoId) {
 
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

  let sidebar = carte.querySelector(".interaction-sidebar");

if (!sidebar) {
  sidebar = document.createElement("div");
  sidebar.className = "interaction-sidebar";
  carte.appendChild(sidebar);
}

sidebar.innerHTML = "";

  sidebar.dataset.videoId = String(videoId);
const actions = [
  { icon: "👤", label: "Profil", action: "profil" },
  { icon: "❤️", label: "J’aime", action: "like", count: 0 },
  { icon: "💬", label: "Commentaires", action: "comment", count: 0 },
  { icon: "🔖", label: "Favoris", action: "favoris", count: 0 },
  { icon: "↗", label: "Partager", action: "share" }
];


const { count: nombreLikes, error: erreurLikes } =
  await supabaseClient
    .from("likes")
    .select("*", { count: "exact", head: true })
    .eq("video_id", String(videoId));
const { count: nombreCommentaires, error: erreurCommentaires } =
  await supabaseClient
    .from("comments")
    .select("*", { count: "exact", head: true })
    .eq("video_id", String(videoId));

console.log("ID vidéo :", videoId);
console.log("Nombre de J’aime :", nombreLikes, erreurLikes);
console.log("Nombre de commentaires :", nombreCommentaires, erreurCommentaires);
const { count: nombreFavoris, error: erreurFavoris } =
  await supabaseClient
    .from("favorites")
    .select("*", { count: "exact", head: true })
    .eq("video_id", String(videoId));
if (erreurLikes) console.error("Erreur J’aime :", erreurLikes);
if (erreurCommentaires) console.error("Erreur commentaires :", erreurCommentaires);
if (erreurFavoris) console.error("Erreur favoris :", erreurFavoris);
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

const compteur = document.createElement("span");
compteur.className = "action-count";

if (item.action === "like") {
  compteur.textContent = nombreLikes ?? 0;
} else if (item.action === "comment") {
  compteur.textContent = nombreCommentaires ?? 0;
} else if (item.action === "favoris") {
  compteur.textContent = nombreFavoris ?? 0;
}
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
  console.log("FasoTok : bouton J’aime cliqué");
  try {
    const { data: sessionData, error: sessionError } =
      await supabaseClient.auth.getSession();

    if (sessionError) throw sessionError;

    const utilisateur = sessionData.session?.user;

    if (!utilisateur) {
      alert("Connecte-toi pour aimer une vidéo.");
      return;
    }

    if (!videoId) {
      alert("Identifiant de vidéo introuvable.");
      return;
    }
const { data: likeExistant, error: rechercheErreur } =
      await supabaseClient
        .from("likes")
        .select("id")
        .eq("user_id", utilisateur.id)
        .eq("video_id", String(videoId))
        .maybeSingle();

    if (rechercheErreur) throw rechercheErreur;
console.log("J’aime déjà enregistré :", likeExistant);
console.log("J’aime déjà enregistré :", likeExistant);
    
if (likeExistant) {
  const { error } = await supabaseClient
    .from("likes")
    .delete()
    .eq("user_id", utilisateur.id)
    .eq("video_id", String(videoId));

  if (error) throw error;

  bouton.textContent = "🤍";
  compteur.textContent = Math.max(
    0,
    Number(compteur.textContent || 0) - 1
  );
} else {
  const { error } = await supabaseClient
    .from("likes")
    .insert({
      user_id: utilisateur.id,
      video_id: String(videoId)
    });

  if (error) throw error;
bouton.textContent = "❤️";
  compteur.textContent =
    Number(compteur.textContent || 0) + 1;
}

  } catch (erreur) {
    console.error("Erreur J’aime :", erreur);
    alert("Impossible d'enregistrer le J’aime. Vérifie la connexion.");
  }
}
if (item.action === "comment") {

  const commentaire = prompt("Écris ton commentaire :");

  if (commentaire && commentaire.trim()) {
    try {
      const { data: sessionData, error: sessionError } =
        await supabaseClient.auth.getSession();

      if (sessionError) throw sessionError;

      const utilisateur = sessionData.session?.user;

      if (!utilisateur) {
        alert("Connecte-toi pour commenter.");
        return;
      }

      if (!videoId) {
        alert("Identifiant de vidéo introuvable.");
        return;
      }

      const { error: erreurCommentaire } = await supabaseClient
        .from("comments")
        .insert({
  user_id: utilisateur.id,
  username: username,
  video_id: String(videoId),
  content: commentaire.trim()
});

      if (erreurCommentaire) throw erreurCommentaire;

      compteur.textContent =
        Number(compteur.textContent || 0) + 1;

      alert("Commentaire publié !");
    } catch (erreur) {
      console.error("Erreur commentaire :", erreur);
      alert("Impossible d'enregistrer le commentaire : " + erreur.message);
    }
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
if (["like", "comment", "favoris"].includes(item.action)) {
  groupe.appendChild(compteur);
}
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

    if (
  !fichier.type.startsWith("video/") &&
  !fichier.type.startsWith("image/")
) {
  alert("Choisis une photo ou une vidéo.");
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

const { data: videoInseree, error: insertionError } = await supabaseClient
  .from("videos")
  .insert({
    user_id: utilisateur.id,
    username: username,
    video_url: urlVideo,
    caption: ""
  })
  .select("id")
  .single();

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
const compteurVues = document.createElement("div");
compteurVues.className = "video-views";
compteurVues.textContent = "👁 0 vues";
        const pseudo = document.createElement("h3");
        pseudo.textContent = "@" + username;

        const description = document.createElement("p");
        description.textContent = "";

        carte.appendChild(video);
        carte.appendChild(pied);
ajouterBoutonsVideo(
  carte,
  video,
  username || "Utilisateur",
  videoInseree.id
);
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
})
