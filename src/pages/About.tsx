
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
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4">Qui sommes-nous?</h2>
              <p>
                L'Autorité nationale de protection des données à caractère personnel (ANPDP) a été créée par la loi n° 18-07 du 10 juin 2018 relative à la protection des personnes physiques dans le traitement des données à caractère personnel.
              </p>
              <p className="mt-4">
                L'ANPDP est une autorité administrative indépendante, dotée de la personnalité morale et de l'autonomie financière. Elle est chargée de veiller à ce que le traitement des données à caractère personnel soit mis en œuvre conformément aux dispositions de la loi.
              </p>
              
              <h3 className="text-xl font-semibold mt-8 mb-3">Composition de l'ANPDP</h3>
              <p>
                L'Autorité est composée de sept (7) membres, dont le président, choisis comme suit :
              </p>
              <ul className="list-disc pl-6 my-4 space-y-2">
                <li>Trois (3) membres, dont le président, désignés par le Président de la République, en raison de leur compétence.</li>
                <li>Deux (2) membres choisis par le président de l'Assemblée Populaire Nationale, parmi les membres du Conseil d'État, de la Cour suprême ou de la Cour des comptes.</li>
                <li>Deux (2) membres choisis par le président du Conseil de la nation, parmi les membres du Conseil d'État, de la Cour suprême ou de la Cour des comptes.</li>
              </ul>
              <p>
                Le mandat des membres de l'Autorité est fixé à cinq (5) ans, renouvelable une seule fois. Les membres de l'Autorité ne peuvent être révoqués durant leur mandat, sauf dans les cas prévus à l'article 26 de la loi.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Mot du Président</h2>
              <div className="flex flex-col md:flex-row gap-6 mb-6">
                <div className="md:w-1/3">
                  <img 
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" 
                    alt="Président de l'ANPDP"
                    className="rounded-lg shadow-md w-full"
                  />
                </div>
                <div className="md:w-2/3">
                  <p className="italic">
                    "À l'ère du numérique, la protection des données à caractère personnel est devenue un enjeu majeur pour préserver les droits et libertés des personnes. L'ANPDP s'engage à veiller au respect de ces droits et à accompagner l'ensemble des acteurs dans la mise en conformité de leurs traitements."
                  </p>
                  <p className="mt-4">
                    L'ANPDP est déterminée à accomplir sa mission avec rigueur et transparence, afin de contribuer à l'établissement d'un environnement numérique sûr et respectueux des droits fondamentaux des citoyens algériens.
                  </p>
                  <p className="mt-4">
                    Notre vision est de faire de l'Algérie un pays où les données personnelles sont protégées efficacement, conformément aux standards internationaux, tout en favorisant l'innovation et le développement de l'économie numérique.
                  </p>
                  <p className="font-bold mt-4 text-right">
                    Le Président de l'ANPDP
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
