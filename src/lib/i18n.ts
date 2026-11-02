export const locales = ["es", "en", "it"] as const;
export type Locale = typeof locales[number];
const translations: Record<string,[string,string]> = {
  "Inicio": [
    "Home",
    "Inizio"
  ],
  "Servicios": [
    "Services",
    "Servizi"
  ],
  "Trabajo": [
    "Work",
    "Progetti"
  ],
  "Estudio": [
    "Studio",
    "Studio"
  ],
  "Contacto": [
    "Contact",
    "Contatti"
  ],
  "Blog": [
    "Blog",
    "Blog"
  ],
  "ARTESANOS DIGITALES": [
    "DIGITAL CRAFTSPEOPLE",
    "ARTIGIANI DIGITALI"
  ],
  "¿Qué querés hacer posible?": [
    "What would you like to make possible?",
    "Cosa vorresti rendere possibile?"
  ],
  "Desarrollo, tecnología y criterio humano. Elegí por dónde empezar.": [
    "Development, technology and human judgment. Choose where to start.",
    "Sviluppo, tecnologia e criterio umano. Scegli da dove iniziare."
  ],
  "Explorar servicios ↗": [
    "Explore services ↗",
    "Esplora i servizi ↗"
  ],
  "Conocer el estudio ↗": [
    "Meet the studio ↗",
    "Conosci lo studio ↗"
  ],
  "Volver al inicio ↩": [
    "Back to the start ↩",
    "Torna all’inizio ↩"
  ],
  "Un mismo espacio. Distintos puntos de vista.": [
    "One space. Different perspectives.",
    "Un solo spazio. Punti di vista diversi."
  ],
  "Sitio actual ↗": [
    "Current website ↗",
    "Sito attuale ↗"
  ],
  "Desarrollo web": [
    "Web development",
    "Sviluppo web"
  ],
  "Comercio electrónico": [
    "Ecommerce",
    "Ecommerce"
  ],
  "Mantenimiento y soporte": [
    "Maintenance and support",
    "Manutenzione e supporto"
  ],
  "White-label": [
    "White-label",
    "White-label"
  ],
  "Sitios a medida, rápidos y preparados para evolucionar.": [
    "Fast, custom websites built to evolve.",
    "Siti su misura, veloci e pronti a evolversi."
  ],
  "Tiendas que conectan catálogo, compra y operación.": [
    "Stores connecting your catalogue, checkout and operations.",
    "Negozi che collegano catalogo, acquisti e operatività."
  ],
  "Cuidamos y mejoramos lo que ya construiste.": [
    "We maintain and improve what you have already built.",
    "Curiamo e miglioriamo quello che hai già costruito."
  ],
  "Desarrollo para tu agencia, con tu marca al frente.": [
    "Development for your agency, with your brand in front.",
    "Sviluppo per la tua agenzia, con il tuo marchio in primo piano."
  ],
  "NUESTRAS CAPACIDADES": [
    "OUR CAPABILITIES",
    "LE NOSTRE COMPETENZE"
  ],
  "Démosle forma a lo que necesitás.": [
    "Let’s shape what you need.",
    "Diamo forma a ciò di cui hai bisogno."
  ],
  "Desarrollo, comercio electrónico y acompañamiento para tu negocio.": [
    "Development, ecommerce and ongoing support for your business.",
    "Sviluppo, ecommerce e supporto continuo per la tua attività."
  ],
  "Explorar el trabajo ↗": [
    "Explore our work ↗",
    "Esplora i progetti ↗"
  ],
  "Explorar proyectos": [
    "Explore projects",
    "Esplora i progetti"
  ],
  "Sigamos hacia los proyectos →": [
    "Let’s explore the projects →",
    "Proseguiamo verso i progetti →"
  ],
  "Descubramos lo que podemos construir.": [
    "Discover what we can build.",
    "Scopriamo cosa possiamo costruire."
  ],
  "El trabajo demuestra.": [
    "The work speaks for itself.",
    "Sono i progetti a dimostrarlo."
  ],
  "Las personas detrás de la experiencia.": [
    "The people behind the experience.",
    "Le persone dietro l’esperienza."
  ],
  "Conversemos sobre tu idea.": [
    "Let’s talk about your idea.",
    "Parliamo della tua idea."
  ],
  "La historia continúa.": [
    "The story continues.",
    "La storia continua."
  ],
  "LA EVIDENCIA ACOMPAÑA LA RESPUESTA": [
    "REAL WORK BEHIND THE ANSWER",
    "PROGETTI REALI DIETRO OGNI RISPOSTA"
  ],
  "Hecho con Amor.": [
    "Crafted with Love.",
    "Creato con Amore."
  ],
  "Proyectos reales, decisiones concretas y herramientas para cada negocio.": [
    "Real projects, thoughtful decisions and tools for each business.",
    "Progetti reali, decisioni concrete e strumenti per ogni attività."
  ],
  "Leer el caso completo ↗": [
    "Read the full case study ↗",
    "Leggi il caso completo ↗"
  ],
  "¿Quién está detrás? →": [
    "Who is behind the work? →",
    "Chi c’è dietro? →"
  ],
  "Hablemos de tu proyecto →": [
    "Let’s discuss your project →",
    "Parliamo del tuo progetto →"
  ],
  "QUIÉNES SOMOS": [
    "WHO WE ARE",
    "CHI SIAMO"
  ],
  "Personas al mando.": [
    "People in charge.",
    "Le persone al comando."
  ],
  "Somos ElPuas Digital Crafts, un estudio familiar de Costa Rica. Creamos sitios y experiencias digitales combinando desarrollo, automatización e inteligencia artificial aplicada, con personas al mando.": [
    "We are ElPuas Digital Crafts, a family-run studio from Costa Rica. We create websites and digital experiences through development, automation and applied AI, with people in charge.",
    "Siamo ElPuas Digital Crafts, uno studio a conduzione familiare della Costa Rica. Creiamo siti ed esperienze digitali unendo sviluppo, automazione e IA applicata, con le persone al comando."
  ],
  "CEO y Directora de Contenido": [
    "CEO and Content Director",
    "CEO e Direttrice dei Contenuti"
  ],
  "Define la voz y la dirección editorial de los proyectos.": [
    "Defines the voice and editorial direction of projects.",
    "Definisce la voce e la direzione editoriale dei progetti."
  ],
  "Lidera la estrategia técnica y el desarrollo.": [
    "Leads technical strategy and development.",
    "Guida la strategia tecnica e lo sviluppo."
  ],
  "Convierte las decisiones de diseño en interfaces responsivas y accesibles.": [
    "Turns design decisions into responsive, accessible interfaces.",
    "Trasforma le decisioni di design in interfacce responsive e accessibili."
  ],
  "Construyamos algo juntos →": [
    "Let’s build something together →",
    "Costruiamo qualcosa insieme →"
  ],
  "Explorar nuestro trabajo →": [
    "Explore our work →",
    "Esplora i nostri progetti →"
  ],
  "EL SIGUIENTE PASO": [
    "THE NEXT STEP",
    "IL PROSSIMO PASSO"
  ],
  "Ya tenemos un punto de partida.": [
    "We have a starting point.",
    "Abbiamo un punto di partenza."
  ],
  "Contanos qué querés crear o mejorar. La próxima conversación es con nosotros.": [
    "Tell us what you want to create or improve. Your next conversation is with us.",
    "Raccontaci cosa vuoi creare o migliorare. La prossima conversazione sarà con noi."
  ],
  "Prototipo: este formulario todavía no envía información.": [
    "Prototype: this form does not send information yet.",
    "Prototipo: questo modulo non invia ancora informazioni."
  ],
  "Tu nombre": [
    "Your name",
    "Il tuo nome"
  ],
  "Tu correo": [
    "Your email",
    "La tua email"
  ],
  "¿Qué necesitás?": [
    "What do you need?",
    "Di cosa hai bisogno?"
  ],
  "Todavía lo estoy explorando": [
    "I am still exploring",
    "Sto ancora esplorando"
  ],
  "Contanos tu idea": [
    "Tell us your idea",
    "Raccontaci la tua idea"
  ],
  "Probar formulario ↗": [
    "Test the form ↗",
    "Prova il modulo ↗"
  ],
  "Esta es una prueba. No se envió ni guardó tu información.": [
    "This is a test. Your information was not sent or saved.",
    "Questa è una prova. Le tue informazioni non sono state inviate né salvate."
  ],
  "Mientras tanto, seguí explorando →": [
    "Keep exploring in the meantime →",
    "Nel frattempo, continua a esplorare →"
  ],
  "LA HISTORIA CONTINÚA": [
    "THE STORY CONTINUES",
    "LA STORIA CONTINUA"
  ],
  "En el Bucle.": [
    "In the Loop.",
    "Nel Loop."
  ],
  "Procesos, experimentos y aprendizajes de nuestro taller digital.": [
    "Processes, experiments and lessons from our digital workshop.",
    "Processi, esperimenti e lezioni dal nostro laboratorio digitale."
  ],
  "Seguí explorando el blog": [
    "Keep exploring the blog",
    "Continua a esplorare il blog"
  ],
  "Leer en el sitio actual ↗": [
    "Read on the current website ↗",
    "Leggi sul sito attuale ↗"
  ],
  "Volver al trabajo →": [
    "Back to our work →",
    "Torna ai progetti →"
  ],
  "Contanos tu idea →": [
    "Tell us your idea →",
    "Raccontaci la tua idea →"
  ],
  "Explorar el estudio": [
    "Explore the studio",
    "Esplora lo studio"
  ],
  "Elegir proyecto": [
    "Choose a project",
    "Scegli un progetto"
  ],
  "Vista del proyecto ": [
    "Project preview: ",
    "Anteprima del progetto "
  ],
  "Versión de lectura": [
    "Reading version",
    "Versione di lettura"
  ],
  "Ir al contenido": [
    "Skip to content",
    "Vai al contenuto"
  ],
  "Idioma": [
    "Language",
    "Lingua"
  ],
  "ElPuas Digital Crafts: desarrollo web y ecommerce": [
    "ElPuas Digital Crafts: web development and ecommerce",
    "ElPuas Digital Crafts: sviluppo web ed ecommerce"
  ],
  "Estudio familiar de Costa Rica. Desarrollo web, ecommerce, mantenimiento y colaboración white-label con criterio humano.": [
    "A family-run studio from Costa Rica. Web development, ecommerce, maintenance and white-label collaboration with human judgment.",
    "Studio a conduzione familiare della Costa Rica. Sviluppo web, ecommerce, manutenzione e collaborazione white-label con criterio umano."
  ],
  "Proyectos": [
    "Projects",
    "Progetti"
  ],
  "Nuestro equipo": [
    "Our team",
    "Il nostro team"
  ],
  "Los casos completos y artículos se conservan en el sitio actual mientras preparamos esta nueva experiencia.": [
    "Full case studies and articles remain on the current website while we prepare this new experience.",
    "I casi completi e gli articoli restano sul sito attuale mentre prepariamo questa nuova esperienza."
  ],
  "Contactar al estudio ↗": [
    "Contact the studio ↗",
    "Contatta lo studio ↗"
  ]
};
export function translator(locale: Locale) { return (text:string):string => locale === "es" ? text : translations[text]?.[locale === "en" ? 0 : 1] ?? text; }
export const services = [["01", "Desarrollo web", "Sitios a medida, rápidos y preparados para evolucionar.", "↗"], ["02", "Comercio electrónico", "Tiendas que conectan catálogo, compra y operación.", "◇"], ["03", "Mantenimiento y soporte", "Cuidamos y mejoramos lo que ya construiste.", "⟳"], ["04", "White-label", "Desarrollo para tu agencia, con tu marca al frente.", "⌘"]];
export const studioStory = "Somos ElPuas Digital Crafts, un estudio familiar de Costa Rica. Creamos sitios y experiencias digitales combinando desarrollo, automatización e inteligencia artificial aplicada, con personas al mando.";
