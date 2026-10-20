
/* FASOTOK — MOTEUR DE TRADUCTION */

(function () {
  const traductions = {
    fr: {
      accueil: "Accueil",
      amis: "Amis",
      messages: "Messages",
      profil: "Profil",
      parametres: "Paramètres FasoTok",
      langue: "Langue de l'application",
      choisirLangue: "Choisir une langue :",
      compte: "Compte",
      modifierProfil: "Modifier mon profil",
      confidentialite: "Confidentialité",
      notifications: "Activer les notifications",
      sonVideos: "Activer le son des vidéos",
      aide: "Aide",
      deconnexion: "Se déconnecter",
      bienvenue: "Bienvenue sur FasoTok 🇧🇫",
      videosIci: "Les vidéos s'afficheront ici.",
      assistant: "Assistant IA FasoTok",
      question: "Écris ta question ici...",
      envoyer: "Envoyer",
      retour: "← Retour à l'accueil",
      langueChoisie: "Langue sélectionnée : "
    },

    en: {
      accueil: "Home",
      amis: "Friends",
      messages: "Messages",
      profil: "Profile",
      parametres: "FasoTok Settings",
      langue: "App language",
      choisirLangue: "Choose a language:",
      compte: "Account",
      modifierProfil: "Edit my profile",
      confidentialite: "Privacy",
      notifications: "Enable notifications",
      sonVideos: "Enable video sound",
      aide: "Help",
      deconnexion: "Log out",
      bienvenue: "Welcome to FasoTok 🇧🇫",
      videosIci: "Videos will appear here.",
      assistant: "FasoTok AI Assistant",
      question: "Write your question here...",
      envoyer: "Send",
      retour: "← Back to Home",
      langueChoisie: "Selected language: "
    },

    es: {
      accueil: "Inicio",
      amis: "Amigos",
      messages: "Mensajes",
      profil: "Perfil",
      parametres: "Ajustes de FasoTok",
      langue: "Idioma de la aplicación",
      choisirLangue: "Elige un idioma:",
      compte: "Cuenta",
      modifierProfil: "Editar mi perfil",
      confidentialite: "Privacidad",
      notifications: "Activar notificaciones",
      sonVideos: "Activar sonido de vídeos",
      aide: "Ayuda",
      deconnexion: "Cerrar sesión",
      bienvenue: "Bienvenido a FasoTok 🇧🇫",
      videosIci: "Los vídeos aparecerán aquí.",
      assistant: "Asistente IA de FasoTok",
      question: "Escribe tu pregunta aquí...",
      envoyer: "Enviar",
      retour: "← Volver al inicio",
      langueChoisie: "Idioma seleccionado: "
    },

    pt: {
      accueil: "Início",
      amis: "Amigos",
      messages: "Mensagens",
      profil: "Perfil",
      parametres: "Configurações do FasoTok",
      langue: "Idioma da aplicação",
      choisirLangue: "Escolha um idioma:",
      compte: "Conta",
      modifierProfil: "Editar meu perfil",
      confidentialite: "Privacidade",
      notifications: "Ativar notificações",
      sonVideos: "Ativar som dos vídeos",
      aide: "Ajuda",
      deconnexion: "Sair",
      bienvenue: "Bem-vindo ao FasoTok 🇧🇫",
      videosIci: "Os vídeos aparecerão aqui.",
      assistant: "Assistente IA FasoTok",
      question: "Escreva sua pergunta aqui...",
      envoyer: "Enviar",
      retour: "← Voltar ao início",
      langueChoisie: "Idioma selecionado: "
    },

    de: {
      accueil: "Startseite",
      amis: "Freunde",
      messages: "Nachrichten",
      profil: "Profil",
      parametres: "FasoTok-Einstellungen",
      langue: "App-Sprache",
      choisirLangue: "Sprache auswählen:",
      compte: "Konto",
      modifierProfil: "Mein Profil bearbeiten",
      confidentialite: "Datenschutz",
      notifications: "Benachrichtigungen aktivieren",
      sonVideos: "Videoton aktivieren",
      aide: "Hilfe",
      deconnexion: "Abmelden",
      bienvenue: "Willkommen bei FasoTok 🇧🇫",
      videosIci: "Videos werden hier angezeigt.",
      assistant: "FasoTok KI-Assistent",
      question: "Schreibe deine Frage hier...",
      envoyer: "Senden",
      retour: "← Zurück zur Startseite",
      langueChoisie: "Ausgewählte Sprache: "
    },

    it: {
      accueil: "Home",
      amis: "Amici",
      messages: "Messaggi",
      profil: "Profilo",
      parametres: "Impostazioni FasoTok",
langue: "Lingua dell'app",
choisirLangue: "Scegli una lingua:",
      compte: "Account",
      modifierProfil: "Modifica il mio profilo",
      confidentialite: "Privacy",
      notifications: "Attiva notifiche",
      sonVideos: "Attiva audio video",
      aide: "Aiuto",
      deconnexion: "Esci",
      bienvenue: "Benvenuto su FasoTok 🇧🇫",
      videosIci: "I video appariranno qui.",
      assistant: "Assistente IA FasoTok",
      question: "Scrivi la tua domanda qui...",
      envoyer: "Invia",
      retour: "← Torna alla Home",
      langueChoisie: "Lingua selezionata: "
    },

    ar: {
      accueil: "الرئيسية",
      amis: "الأصدقاء",
      messages: "الرسائل",
      profil: "الملف الشخصي",
      parametres: "إعدادات فاسوتوك",
      langue: "لغة التطبيق",
      choisirLangue: "اختر لغة:",
      compte: "الحساب",
      modifierProfil: "تعديل ملفي الشخصي",
      confidentialite: "الخصوصية",
      notifications: "تفعيل الإشعارات",
      sonVideos: "تفعيل صوت الفيديو",
      aide: "المساعدة",
      deconnexion: "تسجيل الخروج",
      bienvenue: "مرحبًا بك في فاسوتوك 🇧🇫",
      videosIci: "ستظهر مقاطع الفيديو هنا.",
      assistant: "مساعد فاسوتوك الذكي",
      question: "اكتب سؤالك هنا...",
      envoyer: "إرسال",
      retour: "← العودة إلى الرئيسية",
      langueChoisie: "اللغة المختارة: "
    },

    zh: {
      accueil: "首页",
      amis: "好友",
      messages: "消息",
      profil: "个人资料",
      parametres: "FasoTok 设置",
      langue: "应用语言",
      choisirLangue: "选择语言：",
      compte: "账户",
      modifierProfil: "编辑个人资料",
      confidentialite: "隐私",
      notifications: "启用通知",
      sonVideos: "启用视频声音",
      aide: "帮助",
      deconnexion: "退出登录",
      bienvenue: "欢迎使用 FasoTok 🇧🇫",
      videosIci: "视频将在这里显示。",
      assistant: "FasoTok 人工智能助手",
      question: "在这里输入你的问题...",
      envoyer: "发送",
      retour: "← 返回首页",
      langueChoisie: "已选择语言："
    },

    hi: {
      accueil: "होम",
      amis: "दोस्त",
      messages: "संदेश",
      profil: "प्रोफ़ाइल",
      parametres: "FasoTok सेटिंग्स",
      langue: "ऐप की भाषा",
      choisirLangue: "भाषा चुनें:",
      compte: "खाता",
      modifierProfil: "मेरी प्रोफ़ाइल संपादित करें",
      confidentialite: "गोपनीयता",
      notifications: "सूचनाएँ चालू करें",
      sonVideos: "वीडियो की आवाज़ चालू करें",
      aide: "मदद",
      deconnexion: "लॉग आउट",
      bienvenue: "FasoTok में आपका स्वागत है 🇧🇫",
      videosIci: "वीडियो यहाँ दिखाई देंगे।",
      assistant: "FasoTok AI सहायक",
      question: "अपना प्रश्न यहाँ लिखें...",
      envoyer: "भेजें",
      retour: "← होम पर वापस जाएँ",
      langueChoisie: "चुनी गई भाषा: "
    },

    ru: {
      accueil: "Главная",
      amis: "Друзья",
      messages: "Сообщения",
      profil: "Профиль",
      parametres: "Настройки FasoTok",
      langue: "Язык приложения",
      choisirLangue: "Выберите язык:",
      compte: "Аккаунт",
      modifierProfil: "Изменить профиль",
      confidentialite: "Конфиденциальность",
      notifications: "Включить уведомления",
      sonVideos: "Включить звук видео",
      aide: "Помощь",
      deconnexion: "Выйти",
      bienvenue: "Добро пожаловать в FasoTok 🇧🇫",
      videosIci: "Здесь будут отображаться видео.",
      assistant: "ИИ-помощник FasoTok",
      question: "Напишите свой вопрос здесь...",
      envoyer: "Отправить",
      retour: "← На главную",
      langueChoisie: "Выбранный язык: "
    },

    mos: {
  accueil: "Accueil",
  amis: "Amis",
  messages: "Messages",
  profil: "Profil",
  parametres: "Paramètres FasoTok",
  langue: "Langue de l'application",
  choisirLangue: "Choisir une langue :",
  compte: "Compte",
  modifierProfil: "Modifier mon profil",
  confidentialite: "Confidentialité",
  notifications: "Activer les notifications",
  sonVideos: "Activer le son des vidéos",
  aide: "Aide",
  deconnexion: "Se déconnecter",
  bienvenue: "Bienvenue sur FasoTok 🇧🇫",
  videosIci: "Les vidéos s'afficheront ici.",
  assistant: "Assistant IA FasoTok",
  question: "Écris ta question ici...",
  envoyer: "Envoyer",
  retour: "← Retour à l'accueil",
  langueChoisie: "Langue sélectionnée : "
},

    dyu: {
  accueil: "Aw bɛ se",
  amis: "Terikɛw",
  messages: "Batakiw",
  profil: "Profil",
  parametres: "FasoTok labɛnni",
  langue: "Application kan",
  choisirLangue: "Kan dɔ sugandi:",
  compte: "Compte",
  modifierProfil: "N ka profil yɛlɛma",
  confidentialite: "Sirraya",
  notifications: "Notifications daminɛ",
  sonVideos: "Vidéo kan daminɛ",
  aide: "Dɛmɛ",
  deconnexion: "Bɔ yen",
  bienvenue: "I ni ce FasoTok la 🇧🇫",
  videosIci: "Vidéo bɛna jira yan.",
  assistant: "FasoTok IA dɛmɛbaa",
  question: "I ka ɲininkali sɛbɛn yan...",
  envoyer: "Ci",
  retour: "← Segin ɲɛfɔli la",
  langueChoisie: "Kan sugandilen: "
}
};

function appliquerTraductions() {
    const langue =
      localStorage.getItem("fasotok-langue") || "fr";

    console.log("Langue FasoTok :", langue);
const t = traductions[langue] || traductions.fr;
    const texte = (selecteur, valeur) => {
  const element = document.querySelector(selecteur);
  if (element && valeur) element.textContent = valeur;
};

    const attribut = (selecteur, nom, valeur) => {
      const element = document.querySelector(selecteur);
      if (element && valeur) element.setAttribute(nom, valeur);
    };

    
const textes = [
  [".bottom-nav [data-page='home'] p", t.accueil],
  [".bottom-nav [data-page='friends'] p", t.amis],
  [".bottom-nav [data-page='inbox'] p", t.messages],
  [".bottom-nav [data-page='profile'] p", t.profil],
  ["#profile-page h2", t.parametres],
  ["#modifier-profil-btn", t.modifierProfil],
  ["#deconnexion-fasotok", t.deconnexion],
  ["#home-page .placeholder-view h2", t.bienvenue],
  ["#home-page .placeholder-view p", t.videosIci],
  ["#assistant-page h2", "🤖 " + t.assistant],
  ["#assistant-envoyer", t.envoyer],
  ["#back-home-btn", t.retour]
];


    textes.forEach(([selecteur, valeur]) => {
      texte(selecteur, valeur);
    });

    attribut("#assistant-question", "placeholder", t.question);

    document.querySelectorAll(".page-section").forEach(section => {
      if (langue === "ar") {
        section.setAttribute("dir", "rtl");
      } else {
        section.setAttribute("dir", "ltr");
      }
    });

    const message = document.getElementById("langue-message");
    const select = document.getElementById("fasotok-langue");
    if (message && select) {
      const option = select.options[select.selectedIndex];
      message.textContent = t.langueChoisie + (option ? option.text : "");
    }
  }

  window.appliquerTraductionsFasoTok = appliquerTraductions;
alert("Le moteur de traduction FasoTok est chargé !");
  document.addEventListener("DOMContentLoaded", () => {
    const select = document.getElementById("fasotok-langue");
    if (select) {
      const langue = localStorage.getItem("fasotok-langue");
      if (langue && traductions[langue]) {
        select.value = langue;
      }

      select.addEventListener("change", () => {
        localStorage.setItem("fasotok-langue", select.value);
        appliquerTraductions();
      });
    }

    appliquerTraductions();
  });
})();
