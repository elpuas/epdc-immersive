import type { Locale } from './i18n';

type Plan = {
  name: string;
  price: string;
  description: string;
  features: string[];
};

type SupportContent = {
  eyebrow: string;
  title: string;
  intro: string;
  pricingTitle: string;
  monthly: string;
  included: string;
  planCta: string;
  terms: string;
  returnLabel: string;
  description: string;
  plans: Plan[];
};

export const supportContent: Record<Locale, SupportContent> = {
  es: {
    eyebrow: 'DESPUÉS DEL LANZAMIENTO',
    title: 'Planes de soporte y mantenimiento.',
    intro: 'Tu sitio necesita cuidado y espacio para evolucionar. Elegí el acompañamiento que mejor responda a tu negocio.',
    pricingTitle: 'Tres maneras de seguir avanzando.',
    monthly: 'al mes',
    included: 'Todos los planes incluyen un sitio WordPress con tema premium adaptado a tu marca y las licencias necesarias, además de actualizaciones, respaldos, monitoreo y soporte por correo.',
    planCta: 'Conversemos sobre este plan →',
    terms: 'Términos y condiciones →',
    returnLabel: 'Volver al recorrido →',
    description: 'Planes de soporte y mantenimiento WordPress de ElPuas Digital Crafts: Essential, Growth y AI Commerce.',
    plans: [
      { name: 'Essential', price: '$150', description: 'Mantenimiento continuo para un sitio alojado por vos.', features: ['Sitio con tema premium adaptado y licencias', 'Actualizaciones, respaldos y monitoreo', 'Soporte por correo', 'Sin hosting ni horas mensuales de desarrollo'] },
      { name: 'Growth', price: '$180', description: 'Hosting y espacio mensual para mejoras.', features: ['Todo lo de Essential', 'Hosting incluido', '4 horas de desarrollo al mes', 'Optimización de rendimiento y reportes mensuales'] },
      { name: 'AI Commerce', price: '$250', description: 'Más capacidad de desarrollo y funciones de IA integradas.', features: ['Todo lo de Growth', '8 horas de desarrollo al mes en total', 'Funciones de IA para contenido, traducción y SEO', 'Hasta 3 millones de tokens de texto al mes'] },
    ],
  },
  en: {
    eyebrow: 'AFTER LAUNCH',
    title: 'Support and maintenance plans.',
    intro: 'Your website needs care and room to evolve. Choose the level of support that fits your business.',
    pricingTitle: 'Three ways to keep moving forward.',
    monthly: 'per month',
    included: 'Every plan includes a WordPress website with a premium theme adapted to your brand and the required licenses, plus updates, backups, monitoring and email support.',
    planCta: 'Let’s talk about this plan →',
    terms: 'Terms and conditions →',
    returnLabel: 'Back to the journey →',
    description: 'WordPress support and maintenance plans from ElPuas Digital Crafts: Essential, Growth and AI Commerce.',
    plans: [
      { name: 'Essential', price: '$150', description: 'Ongoing care for a website hosted by you.', features: ['Website with an adapted premium theme and licenses', 'Updates, backups and monitoring', 'Email support', 'No hosting or monthly development hours'] },
      { name: 'Growth', price: '$180', description: 'Hosting and monthly room for improvements.', features: ['Everything in Essential', 'Hosting included', '4 development hours per month', 'Performance optimization and monthly reports'] },
      { name: 'AI Commerce', price: '$250', description: 'More development capacity and integrated AI features.', features: ['Everything in Growth', '8 development hours per month in total', 'AI features for content, translation and SEO', 'Up to 3 million text tokens per month'] },
    ],
  },
  it: {
    eyebrow: 'DOPO IL LANCIO',
    title: 'Piani di supporto e manutenzione.',
    intro: 'Il tuo sito ha bisogno di cura e spazio per evolversi. Scegli il supporto più adatto alla tua attività.',
    pricingTitle: 'Tre modi per continuare a crescere.',
    monthly: 'al mese',
    included: 'Ogni piano include un sito WordPress con tema premium adattato al tuo brand e le licenze necessarie, oltre ad aggiornamenti, backup, monitoraggio e supporto via email.',
    planCta: 'Parliamo di questo piano →',
    terms: 'Termini e condizioni →',
    returnLabel: 'Torna al percorso →',
    description: 'Piani di supporto e manutenzione WordPress di ElPuas Digital Crafts: Essential, Growth e AI Commerce.',
    plans: [
      { name: 'Essential', price: '€135', description: 'Manutenzione continua per un sito ospitato da te.', features: ['Sito con tema premium adattato e licenze', 'Aggiornamenti, backup e monitoraggio', 'Supporto via email', 'Senza hosting né ore mensili di sviluppo'] },
      { name: 'Growth', price: '€162', description: 'Hosting e tempo mensile per i miglioramenti.', features: ['Tutto ciò che include Essential', 'Hosting incluso', '4 ore di sviluppo al mese', 'Ottimizzazione delle prestazioni e report mensili'] },
      { name: 'AI Commerce', price: '€225', description: 'Più sviluppo e funzioni IA integrate.', features: ['Tutto ciò che include Growth', '8 ore di sviluppo al mese in totale', 'Funzioni IA per contenuti, traduzione e SEO', 'Fino a 3 milioni di token di testo al mese'] },
    ],
  },
};
