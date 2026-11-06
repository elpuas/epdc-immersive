import projects from './portfolio-projects.json';
import type {Locale} from './i18n';
export type PortfolioProject=(typeof projects)[number];
export const portfolioProjects=(locale:Locale)=>projects.filter(project=>project.lang===locale);
export const showcaseProjects=(locale:Locale)=>portfolioProjects(locale).filter(project=>project.showcaseRole!=='none').sort((a,b)=>a.showcaseOrder-b.showcaseOrder);
export const projectTranslations=(project:PortfolioProject)=>projects.filter(other=>other.translationKey===project.translationKey);
export const nextProject=(project:PortfolioProject)=>{const locale=project.lang as Locale;const localized=project.showcaseRole==='none'?portfolioProjects(locale).sort((a,b)=>a.translationKey.localeCompare(b.translationKey)):showcaseProjects(locale);const index=localized.findIndex(other=>other.slug===project.slug);return localized[(index+1)%localized.length];};
export const projectDisplayName=(project:PortfolioProject)=>({
 'nuara-pelletterie-ecommerce':'Nuara Pelletterie',
 'gbox-supplies':'GBOX Supplies',
 'premium-brokers':'Premium Brokers',
 'second-project':'FishCostaRica',
 'cleveland-auto-show':'Cleveland Auto Show',
 'costarica-adventurers':'Costa Rica Adventurers',
 'first-project':'Monkey Scrubs',
 'fisioadriancampos':'Dr. Adrián Campos',
 'phonogram-management':'AIE Costa Rica',
 'sorrisodambrosio':'Sorriso D’Ambrosio'
} as Record<string,string>)[project.translationKey]??project.title;
