
import { useLanguage } from '@/context/LanguageContext';
import { getTranslation } from '@/utils/i18n';
import { useEffect, useRef, useState } from 'react';

export const About = () => {
  const { language } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  
  const t = (key: string) => getTranslation(language, key);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section ref={sectionRef} className="py-16 md:py-24">
      <div className="container-custom">
        <div className="grid gap-12 md:grid-cols-2 md:items-center">
          {/* Content */}
          <div 
            className={`transform transition-all duration-700 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
          >
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              {t('about.title')}
            </h2>
            <div className="mt-4 h-1 w-16 bg-primary" />
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              {t('about.description')}
            </p>
            <div className="mt-8">
              <button className="btn-primary">
                {t('actions.readMore')}
              </button>
            </div>
          </div>

          {/* Image */}
          <div 
            className={`overflow-hidden rounded-2xl transition-all duration-700 delay-300 ${
              isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'
            }`}
          >
            <img
              src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
              alt="ANPDP Building"
              className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
              style={{ aspectRatio: '16/9' }}
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
