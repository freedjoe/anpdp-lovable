
import { useLanguage } from "@/context/LanguageContext";
import { getTranslation } from "@/utils/i18n";

const Activities = () => {
  const { language } = useLanguage();
  const t = (key: string) => getTranslation(language, key);

  return (
    <div className="min-h-screen py-20">
      <div className="container-custom">
        <h1 className="mb-2 text-center text-4xl font-bold">{t('nav.activities')}</h1>
        <div className="mx-auto mb-10 mt-4 h-1 w-16 bg-primary" />
        
        <div className="mx-auto max-w-4xl">
          <p className="mb-6 text-center text-lg leading-relaxed">
            {t('activities.description')}
          </p>
          
          <div className="prose prose-lg max-w-none">
            <h2>Activities Page Under Construction</h2>
            <p>
              This is a placeholder for the Activities page content. In the full implementation, this page would list all current and past activities of the National Authority for Personal Data Protection.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Activities;
