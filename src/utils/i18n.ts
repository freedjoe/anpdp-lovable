
import { Translations, Language, TranslationKey } from '../types';
import en from '../locales/en.json';
import fr from '../locales/fr.json';
import ar from '../locales/ar.json';

export const translations: Translations = {
  en,
  fr,
  ar
};

export const availableLanguages: Language[] = ['en', 'fr', 'ar'];

export const getLanguageDirection = (lang: Language): 'ltr' | 'rtl' => {
  return lang === 'ar' ? 'rtl' : 'ltr';
};

export const getTranslation = (lang: Language, key: string): string => {
  const keys = key.split('.');
  let result: TranslationKey | string = translations[lang];

  for (const k of keys) {
    if (typeof result === 'object' && result !== null && k in result) {
      result = result[k];
    } else {
      return key; // Return the key if translation not found
    }
  }

  return typeof result === 'string' ? result : key;
};

export const getBrowserLanguage = (): Language => {
  const browserLang = navigator.language.split('-')[0];
  return (availableLanguages.includes(browserLang as Language) 
    ? browserLang 
    : 'fr') as Language;
};
