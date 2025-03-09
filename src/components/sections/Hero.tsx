import { useLanguage } from '@/context/LanguageContext';
import { getTranslation } from '@/utils/i18n';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useState } from 'react';

interface SlideContent {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
}

export const Hero = () => {
  const { language, direction } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  const t = (key: string) => getTranslation(language, key);

  const slides: SlideContent[] = [
    {
      id: 1,
      title: t('hero.slide1.title'),
      description: t('hero.slide1.description'),
      imageUrl: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    },
    {
      id: 2,
      title: t('hero.slide2.title'),
      description: t('hero.slide2.description'),
      imageUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    },
    {
      id: 3,
      title: t('hero.slide3.title'),
      description: t('hero.slide3.description'),
      imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    },
    {
      id: 4,
      title: t('hero.slide4.title'),
      description: t('hero.slide4.description'),
      imageUrl: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    },
  ];

  const nextSlide = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
      setTimeout(() => setIsTransitioning(false), 500);
    }
  };

  const prevSlide = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
      setTimeout(() => setIsTransitioning(false), 500);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [isTransitioning]);

  return (
    <section className="relative h-[70vh] min-h-[500px] w-full bg-black">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-3000"
            style={{ 
              backgroundImage: `url(${slide.imageUrl})`,
              filter: 'brightness(0.6)',
              transform: index === currentSlide ? 'scale(1.05)' : 'scale(1)',
            }}
          />
          
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="container-custom">
              <div className="max-w-xl">
                <h1 
                  className={`text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl ${
                    index === currentSlide ? 'animate-fade-in' : ''
                  }`}
                  style={{ animationDelay: '300ms' }}
                >
                  {slide.title}
                </h1>
                <p 
                  className={`mt-4 text-lg text-white/90 md:text-xl ${
                    index === currentSlide ? 'animate-fade-in' : ''
                  }`}
                  style={{ animationDelay: '600ms' }}
                >
                  {slide.description}
                </p>
                <div 
                  className={`mt-8 ${
                    index === currentSlide ? 'animate-fade-in' : ''
                  }`}
                  style={{ animationDelay: '900ms' }}
                >
                  <button className="btn-primary">{t('actions.readMore')}</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      <button
        className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-2 text-white backdrop-blur-md transition-all hover:bg-white/20"
        onClick={prevSlide}
        aria-label="Previous slide"
      >
        {direction === 'rtl' ? <ChevronRight className="h-6 w-6" /> : <ChevronLeft className="h-6 w-6" />}
      </button>
      <button
        className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-2 text-white backdrop-blur-md transition-all hover:bg-white/20"
        onClick={nextSlide}
        aria-label="Next slide"
      >
        {direction === 'rtl' ? <ChevronLeft className="h-6 w-6" /> : <ChevronRight className="h-6 w-6" />}
      </button>

      <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`h-2 w-2 rounded-full transition-all ${
              index === currentSlide ? 'w-8 bg-white' : 'bg-white/50'
            }`}
            onClick={() => {
              if (!isTransitioning) {
                setIsTransitioning(true);
                setCurrentSlide(index);
                setTimeout(() => setIsTransitioning(false), 500);
              }
            }}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};
