export const locales = ["es", "en", "it"] as const;
export type Locale = typeof locales[number];
const translations: Record<string,[string,string]> = {
"Volver al blog": ["Back to the blog", "Torna al blog"],
"Seguí leyendo": ["Keep reading", "Continua a leggere"],

"Ideas, procesos y aprendizajes de nuestro taller digital.": ["Ideas, processes and lessons from our digital workshop.", "Idee, processi e lezioni dal nostro laboratorio digitale."],
"Volver al recorrido": ["Back to the journey", "Torna al percorso"],
"Página anterior": ["Previous page", "Pagina precedente"],
"Página siguiente": ["Next page", "Pagina successiva"],
"Paginación del blog": ["Blog pagination", "Paginazione del blog"],
"Página": ["Page", "Pagina"],
"Leer artículo": ["Read article", "Leggi articolo"],

"Alfredo es full-stack developer y está al frente de la estrategia técnica de ElPuas Digital Crafts. Ha participado en proyectos para pequeñas empresas, agencias y compañías Fortune 500, trabajando tanto en lo que las personas ven como en los sistemas que lo hacen funcionar.": ["Alfredo is a full-stack developer leading technical strategy at ElPuas Digital Crafts. He has contributed to projects for small businesses, agencies and Fortune 500 companies, working on both the interfaces people use and the systems behind them.", "Alfredo è un full-stack developer e guida la strategia tecnica di ElPuas Digital Crafts. Ha partecipato a progetti per piccole imprese, agenzie e aziende Fortune 500, lavorando sia sulle interfacce sia sui sistemi che le fanno funzionare."],
"Su trabajo abarca desarrollo a medida con WordPress, Gutenberg y WooCommerce, además de interfaces con React y Astro. Le interesa que un sitio no solo se vea bien al lanzarlo: que sea accesible, rápido, fácil de mantener y útil para el negocio con el paso del tiempo.": ["His work spans custom development with WordPress, Gutenberg and WooCommerce, as well as interfaces built with React and Astro. He cares about websites that do more than look good at launch: they should remain accessible, fast, maintainable and useful to the business over time.", "Il suo lavoro comprende sviluppo su misura con WordPress, Gutenberg e WooCommerce e interfacce con React e Astro. Vuole che un sito non sia solo bello al lancio, ma rimanga accessibile, veloce, facile da mantenere e utile all’attività nel tempo."],
"Hoy también explora cómo integrar IA y automatización al proceso de desarrollo, con criterio humano y atención a los detalles. Esa mezcla de oficio, curiosidad y acompañamiento es lo que aporta a cada proyecto del estudio.": ["He also explores how to bring AI and automation into the development process, with human judgment and attention to detail. That mix of craft, curiosity and ongoing support is what he brings to each studio project.", "Esplora anche come integrare IA e automazione nel processo di sviluppo, con criterio umano e attenzione ai dettagli. Questo insieme di mestiere, curiosità e supporto continuo è ciò che porta in ogni progetto dello studio."],

"PROYECTO DESTACADO": ["FEATURED PROJECT", "PROGETTO IN EVIDENZA"],
"Capacidades": ["Capabilities", "Competenze"],
"Siguiente proyecto": ["Next project", "Prossimo progetto"],
"Volver a los proyectos": ["Back to projects", "Torna ai progetti"],
"Marcas con las que hemos trabajado.": ["Brands we’ve built with.", "Marchi con cui abbiamo lavorato."],
"Volver a nuestra historia": ["Back to our story", "Torna alla nostra storia"],
"Nuestra historia": ["Our story", "La nostra storia"],
"Elegí cómo empezamos.": ["Choose where we begin.", "Scegli da dove iniziare."],
"Ver nuestro portafolio ↗": ["View our portfolio ↗", "Guarda il nostro portfolio ↗"],
"Conocer al equipo ↗": ["Meet the team ↗", "Conosci il team ↗"],
"Contactanos →": ["Contact us →", "Contattaci →"],
"Ver los tres planes ↗": ["Explore the three plans ↗", "Scopri i tre piani ↗"],
"Diseño y desarrollo web": ["Web design and development", "Design e sviluppo web"],
"Un sitio que se sienta tuyo.": ["A website that feels like you.", "Un sito che ti rappresenta."],
"Diseñamos y desarrollamos sitios a medida de tu marca y de lo que necesitás comunicar. Unimos diseño, contenido y código para que cada página tenga un propósito claro.": ["We design and develop websites around your brand and what you need to communicate. We bring design, content and code together so every page has a clear purpose.", "Progettiamo e sviluppiamo siti intorno al tuo marchio e a ciò che vuoi comunicare. Uniamo design, contenuti e codice perché ogni pagina abbia uno scopo chiaro."],
"Desde una nueva presencia digital hasta la evolución de tu sitio actual, trabajamos con vos para crear una experiencia clara, adaptable y preparada para crecer.": ["From a new digital presence to improving your current website, we work with you to create a clear, adaptable experience with room to grow.", "Da una nuova presenza digitale al miglioramento del tuo sito attuale, lavoriamo con te per creare un’esperienza chiara, flessibile e pronta a crescere."],
"Tu tienda, conectada a tu negocio.": ["Your store, connected to your business.", "Il tuo negozio, connesso alla tua attività."],
"Creamos tiendas que conectan tus productos con las personas que los buscan. Organizamos el catálogo, la experiencia de compra y las integraciones que necesita tu operación.": ["We create stores that connect your products with the people looking for them. We organise your catalogue, shopping experience and the integrations your operations need.", "Creiamo negozi che collegano i tuoi prodotti alle persone che li cercano. Organizziamo il catalogo, l’esperienza di acquisto e le integrazioni necessarie alla tua attività."],
"Trabajamos con WooCommerce y soluciones a medida para que vender, comprar y administrar la tienda sea más sencillo. Partimos de cómo funciona tu negocio.": ["We work with WooCommerce and custom solutions to make selling, buying and managing your store simpler. We start with how your business works.", "Lavoriamo con WooCommerce e soluzioni su misura per semplificare la vendita, gli acquisti e la gestione del negozio. Partiamo da come funziona la tua attività."],
"Tu sitio necesita cuidado continuo.": ["Your website needs ongoing care.", "Il tuo sito ha bisogno di cure continue."],
"Te acompañamos después del lanzamiento con actualizaciones, respaldos, monitoreo y soporte. Cuidamos lo que ya construiste para que puedas concentrarte en tu negocio.": ["We stay with you after launch through updates, backups, monitoring and support. We look after what you have built so you can focus on your business.", "Ti affianchiamo dopo il lancio con aggiornamenti, backup, monitoraggio e supporto. Curiamo ciò che hai costruito perché tu possa concentrarti sulla tua attività."],
"Ofrecemos tres planes con distintos alcances. Conocé qué incluye cada uno o conversemos para encontrar el acompañamiento que necesitás.": ["We offer three plans with different scopes. Explore what each includes, or talk with us to find the support you need.", "Offriamo tre piani con ambiti diversi. Scopri cosa include ciascuno, oppure parliamone per trovare il supporto di cui hai bisogno."],
"Tu agencia al frente. Nosotros a tu lado.": ["Your agency in front. Us by your side.", "La tua agenzia in primo piano. Noi al tuo fianco."],
"Nos integramos al trabajo de tu agencia como un equipo de desarrollo de confianza. Transformamos los diseños y las necesidades de tus clientes en sitios y experiencias digitales, con tu marca al frente.": ["We join your agency’s workflow as a trusted development team. We turn your designs and client needs into websites and digital experiences, with your brand in front.", "Ci integriamo nel lavoro della tua agenzia come un team di sviluppo di fiducia. Trasformiamo i tuoi design e le esigenze dei clienti in siti ed esperienze digitali, con il tuo marchio in primo piano."],
"Podemos colaborar en un proyecto concreto o acompañarte de forma continua. Coordinamos el alcance y la comunicación con tu equipo desde el inicio.": ["We can collaborate on a specific project or support you on an ongoing basis. We agree scope and communication with your team from the start.", "Possiamo collaborare a un progetto specifico o affiancarti in modo continuativo. Concordiamo ambito e comunicazione con il tuo team fin dall’inizio."],

"Nosotros creamos arte digital para humanos.": ["We create digital art for humans.", "Creiamo arte digitale per le persone."],
"Tu próxima idea merece salirse del molde. Somos un estudio familiar de artesanos digitales. Combinamos creatividad, código e IA para darle forma a lo que tu negocio necesita.": ["Your next idea deserves to break the mould. We are a family-run studio of digital craftspeople. We combine creativity, code and AI to shape what your business needs.", "La tua prossima idea merita di uscire dagli schemi. Siamo uno studio familiare di artigiani digitali. Combiniamo creatività, codice e IA per dare forma a ciò di cui la tua attività ha bisogno."],
"¿Qué hacemos posible juntos?": ["What can we make possible together?", "Cosa possiamo rendere possibile insieme?"],
"Quiero construir algo": ["I want to build something", "Voglio costruire qualcosa"],
"Quiero conocerlos": ["I want to meet you", "Voglio conoscervi"],
"Preparando el recorrido": ["Preparing your journey", "Prepariamo il percorso"],
"Artes digitales para humanos.": ["Digital crafts for humans.", "Arte digitale per le persone."],
"Un estudio familiar de Costa Rica. Desarrollo, tecnología y criterio humano para hacer posibles tus ideas.": ["A family-run studio from Costa Rica. Development, technology and human judgment to bring your ideas to life.", "Uno studio a conduzione familiare della Costa Rica. Sviluppo, tecnologia e criterio umano per dare vita alle tue idee."],
"Todos los derechos reservados.": ["All rights reserved.", "Tutti i diritti riservati."],
"Volver al inicio": ["Back to the start", "Torna all’inizio"],
"Cartago, Costa Rica": ["Cartago, Costa Rica", "Cartago, Costa Rica"],
"Miami, USA": ["Miami, USA", "Miami, USA"],
"Rome, Italy": ["Rome, Italy", "Roma, Italia"],
"Teléfonos del estudio": ["Studio telephone numbers", "Numeri di telefono dello studio"],
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
