
import { useLanguage } from '@/context/LanguageContext';
import { StatisticItem } from '@/types';
import { getTranslation } from '@/utils/i18n';
import { BookOpenCheck, FileCheck, FileQuestion, Shield, UserCheck, Users } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export const Statistics = () => {
  const { language } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const [counts, setCounts] = useState<number[]>([0, 0, 0, 0, 0, 0]);
  const sectionRef = useRef<HTMLElement>(null);
  const countersStarted = useRef(false);
  
  const t = (key: string) => getTranslation(language, key);

  const stats: StatisticItem[] = [
    {
      id: 1,
      value: '1,250',
      label: t('statistics.concernedParties'),
      icon: <Users className="h-10 w-10 text-primary" />,
    },
    {
      id: 2,
      value: '3,475',
      label: t('statistics.dataProtectionCases'),
      icon: <Shield className="h-10 w-10 text-primary" />,
    },
    {
      id: 3,
      value: '782',
      label: t('statistics.decisions'),
      icon: <FileCheck className="h-10 w-10 text-primary" />,
    },
    {
      id: 4,
      value: '94%',
      label: t('statistics.complianceRate'),
      icon: <BookOpenCheck className="h-10 w-10 text-primary" />,
    },
    {
      id: 5,
      value: '12,340',
      label: t('statistics.inquiries'),
      icon: <FileQuestion className="h-10 w-10 text-primary" />,
    },
    {
      id: 6,
      value: '2,187',
      label: t('statistics.resolvedComplaints'),
      icon: <UserCheck className="h-10 w-10 text-primary" />,
    },
  ];

  // Convert string values to numbers for animation
  const targetValues = stats.map(stat => {
    const cleanValue = stat.value.replace(/[^0-9.]/g, '');
    return parseFloat(cleanValue);
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (!countersStarted.current) {
            animateCounters();
            countersStarted.current = true;
          }
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

  const animateCounters = () => {
    const duration = 2000; // ms
    const frameDuration = 1000 / 60; // 60fps
    const totalFrames = Math.round(duration / frameDuration);
    let frame = 0;

    const counter = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;
      const currentValues = targetValues.map(value => 
        Math.floor(value * (progress < 1 ? progress : 1))
      );
      
      setCounts(currentValues);

      if (frame === totalFrames) {
        clearInterval(counter);
      }
    }, frameDuration);
  };

  const formatValue = (value: string, count: number) => {
    if (value.includes('%')) {
      return `${count}%`;
    }
    
    // Format with commas for thousands
    return count.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <section ref={sectionRef} className="bg-secondary py-16 md:py-24">
      <div className="container-custom text-center">
        <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
          {t('statistics.title')}
        </h2>
        <div className="mx-auto mt-4 h-1 w-16 bg-primary" />

        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {stats.map((stat, index) => (
            <div 
              key={stat.id}
              className={`card flex flex-col items-center p-8 text-center transition-all duration-700 ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="mb-4 rounded-full bg-primary/10 p-4">
                {stat.icon}
              </div>
              <h3 className="text-3xl font-bold text-primary">
                {formatValue(stat.value, counts[index])}
              </h3>
              <p className="mt-2 text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
