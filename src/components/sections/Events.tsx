
import { useLanguage } from '@/context/LanguageContext';
import { EventItem } from '@/types';
import { getTranslation } from '@/utils/i18n';
import { CalendarDays, MapPin } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

export const Events = () => {
  const { language } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  
  const t = (key: string) => getTranslation(language, key);

  const events: EventItem[] = [
    {
      id: 1,
      title: 'Annual Data Protection Conference 2023',
      description: 'Join experts for discussions on the latest trends and challenges in personal data protection.',
      date: '2023-12-10',
      location: 'Algiers Conference Center',
      imageUrl: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    },
    {
      id: 2,
      title: 'Digital Privacy Symposium',
      description: 'A forum for industry leaders and policymakers to address emerging privacy concerns in the digital landscape.',
      date: '2024-01-20',
      location: 'University of Algiers',
      imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
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
    <section ref={sectionRef} className="bg-secondary py-16 md:py-24">
      <div className="container-custom">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            {t('events.title')}
          </h2>
          <div className="mx-auto mt-4 h-1 w-16 bg-primary" />
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            {t('events.description')}
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {events.map((event, index) => (
            <div 
              key={event.id} 
              className={`flex flex-col overflow-hidden rounded-xl border bg-card shadow-sm transition-all duration-700 md:flex-row ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="relative h-48 overflow-hidden md:h-auto md:w-2/5">
                <img
                  src={event.imageUrl}
                  alt={event.title}
                  className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="flex flex-1 flex-col justify-between p-6">
                <div>
                  <h3 className="text-xl font-semibold tracking-tight">
                    {event.title}
                  </h3>
                  <p className="mt-2 text-muted-foreground">
                    {event.description}
                  </p>
                </div>
                <div className="mt-6 space-y-2">
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <CalendarDays className="h-4 w-4" />
                    <span>{formatDate(event.date)}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>{event.location}</span>
                  </div>
                  <div className="pt-2">
                    <Link 
                      to="/events" 
                      className="text-sm font-medium text-primary link-hover"
                    >
                      {t('actions.readMore')}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link 
            to="/events" 
            className="btn-primary"
          >
            {t('actions.viewAll')}
          </Link>
        </div>
      </div>
    </section>
  );
};
