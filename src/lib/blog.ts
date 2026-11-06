import posts from './blog-posts.json';
import translationGroups from './blog-translations.json';
import {locales,type Locale} from './i18n';
export const BLOG_PAGE_SIZE=6;
export const blogPosts=(locale:Locale)=>posts.filter(post=>post.lang===locale);
export const blogPageCount=(locale:Locale)=>Math.ceil(blogPosts(locale).length/BLOG_PAGE_SIZE);
export const blogPath=(locale:Locale,page=1)=>`/${locale}/blog/${page===1?'':page+'/'}`;
export const blogRoutes=locales.flatMap(locale=>Array.from({length:blogPageCount(locale)},(_,i)=>({locale,page:i+1,path:blogPath(locale,i+1)})));

// Explicit source keys, plus reviewed legacy translations recorded during migration.
export const postTranslations=(post:typeof posts[number])=>{
 if(post.translationKey)return posts.filter(other=>other.translationKey===post.translationKey);
 const group=translationGroups.find(group=>group.includes(post.href));
 return group?posts.filter(other=>group.includes(other.href)):[post];
};
