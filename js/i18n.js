// ============================================
// INTERNATIONALIZATION (i18n) SYSTEM
// ============================================

const translations = {
  pt: {
    nav: {
      home: "Início",
      about: "Sobre",
      skills: "Skills",
      projects: "Projetos",
      contact: "Contato"
    },
    hero: {
      subtitle: "Criando interfaces que inspiram & interagem",
      desc: "Designer e desenvolvedor focado em criar experiências visuais minimalistas e interativas."
    },
    about: {
      title: "Sobre Mim",
      exp: "Anos de Experiência",
      langs: "Linguagens Dominadas",
      age: "Anos de Idade"
    },
    skills: {
      title: "Competências",
      frontend: "Frontend",
      backend: "Backend & Tools",
      gamedev: "Game Dev / Roblox"
    },
    projects: {
      title: "Projetos Destacados",
      jerisvaldo: "Jerisvaldo Roguelike",
      jerisvaldoDesc: "Game Roblox desenvolvido com foco em mecânicas roguelike e gameplay envolvente.",
      studio: "CeJ_Studio",
      studioDesc: "Studio de conteúdo focado em criação e análise de games no Roblox e desenvolvimento.",
      portfolio: "Portfólio Web",
      portfolioDesc: "Site pessoal minimalista com design moderno em glassmorphism e animações suaves.",
      viewProject: "Ver Projeto →",
      viewStudio: "Ver Studio →",
      viewCode: "Ver Código →"
    },
    contact: {
      title: "Vamos Conversar?",
      desc: "Interessado em colaborar ou tem alguma pergunta? Entre em contato agora.",
      form: {
        name: "Nome Completo",
        namePlaceholder: "Digite seu nome",
        email: "Email",
        emailPlaceholder: "seu@email.com",
        message: "Mensagem",
        messagePlaceholder: "Sua mensagem...",
        submit: "✉️ Enviar Mensagem"
      },
      info: {
        title: "Outras Formas de Contato",
        emailLabel: "Email:",
        phoneLabel: "Telefone:",
        locationLabel: "Localização:",
        location: "Brasil"
      }
    }
  },
  en: {
    nav: {
      home: "Home",
      about: "About",
      skills: "Skills",
      projects: "Projects",
      contact: "Contact"
    },
    hero: {
      subtitle: "Crafting interfaces that inspire & interact",
      desc: "Designer and developer focused on creating minimalist and interactive visual experiences."
    },
    about: {
      title: "About Me",
      exp: "Years of Experience",
      langs: "Languages Mastered",
      age: "Years Old"
    },
    skills: {
      title: "Skills",
      frontend: "Frontend",
      backend: "Backend & Tools",
      gamedev: "Game Dev / Roblox"
    },
    projects: {
      title: "Featured Projects",
      jerisvaldo: "Jerisvaldo Roguelike",
      jerisvaldoDesc: "Roblox game developed with focus on roguelike mechanics and engaging gameplay.",
      studio: "CeJ_Studio",
      studioDesc: "Content studio focused on creating and analyzing games on Roblox and development.",
      portfolio: "Web Portfolio",
      portfolioDesc: "Minimalist personal site with modern design in glassmorphism and smooth animations.",
      viewProject: "View Project →",
      viewStudio: "View Studio →",
      viewCode: "View Code →"
    },
    contact: {
      title: "Let's Talk?",
      desc: "Interested in collaborating or have any questions? Get in touch now.",
      form: {
        name: "Full Name",
        namePlaceholder: "Enter your name",
        email: "Email",
        emailPlaceholder: "your@email.com",
        message: "Message",
        messagePlaceholder: "Your message...",
        submit: "✉️ Send Message"
      },
      info: {
        title: "Other Ways to Contact",
        emailLabel: "Email:",
        phoneLabel: "Phone:",
        locationLabel: "Location:",
        location: "Brazil"
      }
    }
  }
};

let currentLanguage = localStorage.getItem('language') || 'pt';

function setLanguage(lang) {
  currentLanguage = lang;
  localStorage.setItem('language', lang);
  updatePageLanguage();
  updateLanguageButton();
}

function updatePageLanguage() {
  const elements = document.querySelectorAll('[data-i18n]');
  
  elements.forEach(element => {
    const key = element.getAttribute('data-i18n');
    const keys = key.split('.');
    let translation = translations[currentLanguage];
    
    for (let k of keys) {
      translation = translation[k];
    }
    
    if (translation) {
      element.textContent = translation;
    }
  });
  
  // Update placeholder attributes
  const placeholders = document.querySelectorAll('[data-i18n-placeholder]');
  placeholders.forEach(element => {
    const key = element.getAttribute('data-i18n-placeholder');
    const keys = key.split('.');
    let translation = translations[currentLanguage];
    
    for (let k of keys) {
      translation = translation[k];
    }
    
    if (translation) {
      element.placeholder = translation;
    }
  });
  
  document.documentElement.lang = currentLanguage;
}

function updateLanguageButton() {
  const langBtn = document.getElementById('langToggle');
  if (langBtn) {
    langBtn.textContent = currentLanguage === 'pt' ? '🇧🇷' : '🇺🇸';
  }
}

function getTranslation(key) {
  const keys = key.split('.');
  let translation = translations[currentLanguage];
  
  for (let k of keys) {
    translation = translation[k];
  }
  
  return translation || key;
}

// Initialize language system
function initLanguageSystem() {
  updatePageLanguage();
  updateLanguageButton();
  
  const langBtn = document.getElementById('langToggle');
  if (langBtn) {
    langBtn.addEventListener('click', () => {
      const newLang = currentLanguage === 'pt' ? 'en' : 'pt';
      setLanguage(newLang);
    });
  }
}

// Initialize on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initLanguageSystem);
} else {
  initLanguageSystem();
}
