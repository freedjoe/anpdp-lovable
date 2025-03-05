
import { useLanguage } from '@/context/LanguageContext';
import { getTranslation } from '@/utils/i18n';
import { ChevronDown, Globe } from 'lucide-react';
import React, { useState, useRef, useEffect } from 'react';

export const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const t = (key: string) => getTranslation(language, key);

  const languages = [
    { code: 'en', name: t('languages.en') },
    { code: 'fr', name: t('languages.fr') },
    { code: 'ar', name: t('languages.ar') },
  ];

  // Get current language display name
  const currentLanguage = languages.find(lang => lang.code === language)?.name || language;

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        className="flex items-center gap-1 rounded-md px-2 py-1 text-sm transition-colors hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-primary/50"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={t('actions.language')}
      >
        <span>{currentLanguage}</span>
        <ChevronDown className="h-4 w-4" />
      </button>

      {isOpen && (
        <div className="animate-scale-in absolute right-0 mt-2 w-40 origin-top-right rounded-lg bg-card p-1 shadow-lg ring-1 ring-black/5 focus:outline-none">
          <div className="py-1">
            {languages.map((lang) => (
              <button
                key={lang.code}
                className={`block w-full px-4 py-2 text-left text-sm transition-colors hover:bg-secondary ${
                  language === lang.code ? 'bg-primary/10 font-medium text-primary' : 'text-foreground'
                }`}
                onClick={() => {
                  setLanguage(lang.code as 'en' | 'fr' | 'ar');
                  setIsOpen(false);
                }}
              >
                {lang.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
