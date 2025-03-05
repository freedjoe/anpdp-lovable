
import { useLanguage } from '@/context/LanguageContext';
import { ActivityItem } from '@/types';
import { getTranslation } from '@/utils/i18n';
import { CalendarDays } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

export const Activities = () => {
  const { language } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  
  const t = (key: string) => getTranslation(language, key);

  const activities: ActivityItem[] = [
    {
      id: 1,
      title: 'Workshop on GDPR Compliance for Businesses',
      description: 'A comprehensive workshop on how businesses can ensure compliance with data protection regulations.',
      date: '2023-11-15',
      imageUrl: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    },
    {
      id: 2,
      title: 'Public Awareness Campaign on Data Privacy Rights',
      description: 'Educating citizens about their rights regarding personal data protection in the digital age.',
      date: '2023-10-22',
      imageUrl: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    },
    {
      id: 3,
      title: 'Collaboration with International Data Protection Authorities',
      description: 'Strengthening cooperation with global partners to enhance data protection standards.',
      date: '2023-09-30',
      imageUrl: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    },
  ];

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

  // Format date based on the current language
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat(language, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);
  };

  return (
    <section ref={sectionRef} className="py-16 md:py-24">
      <div className="container-custom">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            {t('activities.title')}
          </h2>
          <div className="mx-auto mt-4 h-1 w-16 bg-primary" />
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            {t('activities.description')}
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {activities.map((activity, index) => (
            <div 
              key={activity.id} 
              className={`group overflow-hidden rounded-xl border transition-all duration-700 ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={activity.imageUrl}
                  alt={activity.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-4 left-4 flex items-center space-x-1 rounded-full bg-white/20 px-3 py-1 text-sm font-medium text-white backdrop-blur-sm">
                  <CalendarDays className="h-4 w-4" />
                  <span>{formatDate(activity.date)}</span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold tracking-tight">
                  {activity.title}
                </h3>
                <p className="mt-2 line-clamp-3 text-muted-foreground">
                  {activity.description}
                </p>
                <div className="mt-6">
                  <Link 
                    to="/activities" 
                    className="text-sm font-medium text-primary link-hover"
                  >
                    {t('actions.readMore')}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link 
            to="/activities" 
            className="btn-primary"
          >
            {t('actions.viewAll')}
          </Link>
        </div>
      </div>
    </section>
  );
};
