
import React, { createContext, useContext, useEffect, useState } from 'react';
import { Language } from '../types';
import { availableLanguages, getBrowserLanguage, getLanguageDirection } from '../utils/i18n';

interface LanguageContextType {
  language: Language;
  direction: 'ltr' | 'rtl';
  setLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('fr');
  const [direction, setDirection] = useState<'ltr' | 'rtl'>('ltr');

  useEffect(() => {
    // Check for saved language or browser preference
    const savedLanguage = localStorage.getItem('language') as Language | null;
    const initialLanguage = savedLanguage || getBrowserLanguage();
    
    // Apply language
    setLanguageState(initialLanguage);
    setDirection(getLanguageDirection(initialLanguage));
    document.documentElement.lang = initialLanguage;
    document.documentElement.dir = getLanguageDirection(initialLanguage);
  }, []);

  const setLanguage = (newLanguage: Language) => {
    if (!availableLanguages.includes(newLanguage)) {
      return;
    }
    
    // Save to state and localStorage
    setLanguageState(newLanguage);
    localStorage.setItem('language', newLanguage);
    
    // Update direction
    const newDirection = getLanguageDirection(newLanguage);
    setDirection(newDirection);
    
    // Apply to document
    document.documentElement.lang = newLanguage;
    document.documentElement.dir = newDirection;
  };

  return (
    <LanguageContext.Provider value={{ language, direction, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
