
import { useLanguage } from "@/context/LanguageContext";
import { getTranslation } from "@/utils/i18n";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export const Mission = () => {
  const { language } = useLanguage();
  const t = (key: string) => getTranslation(language, key);

  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="container-custom">
        <div className="flex flex-col lg:flex-row gap-12">
          <div className="lg:w-1/2">
            <h2 className="text-3xl font-bold mb-6">
              {t('mission.title') || 'Our Mission'}
            </h2>
            <div className="prose dark:prose-invert max-w-none">
              <p className="mb-4">
                L'Autorité nationale de protection des données à caractère personnel (ANPDP) a pour mission de veiller à ce que les technologies de l'information et de la communication ne portent pas atteinte aux libertés et à la vie privée des citoyens.
              </p>
              <p className="mb-4">
                Les missions principales de l'ANPDP sont définies par la loi n° 18-07 du 10 juin 2018 relative à la protection des personnes physiques dans le traitement des données à caractère personnel, notamment dans son article 27.
              </p>
              <h3 className="text-xl font-semibold mt-6 mb-4">Nos responsabilités incluent:</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Informer les personnes concernées et les responsables du traitement de leurs droits et obligations.</li>
                <li>Collaborer avec les autorités similaires à l'étranger.</li>
                <li>Délivrer des autorisations pour le traitement de données sensibles.</li>
                <li>Recevoir les déclarations préalables relatives au traitement de données personnelles.</li>
                <li>Recevoir les réclamations et plaintes relatives au traitement de données personnelles.</li>
                <li>Procéder aux vérifications nécessaires et prononcer des sanctions.</li>
              </ul>
            </div>
            <div className="mt-8">
              <Button asChild className="bg-emerald-600 hover:bg-emerald-700">
                <Link to="/about">
                  {t('mission.learnMore') || 'Learn More'}
                </Link>
              </Button>
            </div>
          </div>
          <div className="lg:w-1/2">
            <div className="rounded-xl overflow-hidden shadow-lg h-full">
              <img 
                src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
                alt="ANPDP Mission"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
