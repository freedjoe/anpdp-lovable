
import { useLanguage } from "@/context/LanguageContext";
import { getTranslation } from "@/utils/i18n";

const About = () => {
  const { language } = useLanguage();
  const t = (key: string) => getTranslation(language, key);

  return (
    <div className="min-h-screen py-20">
      <div className="container-custom">
        <h1 className="mb-2 text-center text-4xl font-bold">{t('nav.about')}</h1>
        <div className="mx-auto mb-10 mt-4 h-1 w-16 bg-primary" />
        
        <div className="mx-auto max-w-4xl">
          <p className="mb-6 text-lg leading-relaxed">
            {t('about.description')}
          </p>
          
          <div className="mb-12 overflow-hidden rounded-xl">
            <img 
              src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
              alt="ANPDP Building"
              className="h-auto w-full object-cover"
            />
          </div>
          
          <div className="prose prose-lg max-w-none">
            <h2>About Page Under Construction</h2>
            <p>
              This is a placeholder for the About page content. In the full implementation, this page would contain comprehensive information about the National Authority for Personal Data Protection, including its history, mission, vision, values, organizational structure, and leadership team.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
