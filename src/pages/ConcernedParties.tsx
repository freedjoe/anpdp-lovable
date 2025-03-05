
import { useLanguage } from "@/context/LanguageContext";
import { getTranslation } from "@/utils/i18n";

const ConcernedParties = () => {
  const { language } = useLanguage();
  const t = (key: string) => getTranslation(language, key);

  return (
    <div className="min-h-screen py-20">
      <div className="container-custom">
        <h1 className="mb-2 text-center text-4xl font-bold">{t('nav.concernedParties')}</h1>
        <div className="mx-auto mb-10 mt-4 h-1 w-16 bg-primary" />
        
        <div className="mx-auto max-w-4xl">
          <div className="prose prose-lg max-w-none">
            <h2>Concerned Parties Page Under Construction</h2>
            <p>
              This is a placeholder for the Concerned Parties page content. In the full implementation, this page would provide information about which organizations and entities are subject to data protection regulations, how they can register, and what their obligations are.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConcernedParties;
