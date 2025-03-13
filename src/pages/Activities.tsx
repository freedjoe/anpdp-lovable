
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
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4">Mise en place le Registre National</h2>
              <p>
                L'Autorité Nationale de Protection des Données à Caractère Personnel (ANPDP) est chargée de la mise en place, la gestion et la mise à jour du registre national de protection des données à caractère personnel, conformément à l'article 29 de la loi n° 18-07 du 10 juin 2018.
              </p>
              <p className="mt-4">
                Ce registre consigne l'ensemble des déclarations, des demandes d'autorisation, des autorisations et des avis relatifs au traitement des données à caractère personnel, conformément aux dispositions de la loi n° 18-07.
              </p>

              <h3 className="text-xl font-semibold mt-8 mb-3">Les déclarations préalables</h3>
              <p>
                Tout responsable du traitement de données à caractère personnel est tenu de présenter, préalablement à la mise en œuvre dudit traitement, une déclaration auprès de l'ANPDP, conformément à l'article 12 de la loi n° 18-07.
              </p>
              <p className="mt-3">
                La déclaration doit contenir notamment des informations relatives à :
              </p>
              <ul className="list-disc pl-6 my-4 space-y-2">
                <li>L'identité du responsable du traitement et, le cas échéant, celle de son représentant</li>
                <li>La nature, les caractéristiques et la ou les finalités du traitement envisagé</li>
                <li>La description de la ou des catégories des personnes concernées et des données s'y rapportant</li>
                <li>Les destinataires ou les catégories de destinataires auxquels ces données peuvent être communiquées</li>
                <li>Les garanties dont est assortie la communication de données</li>
                <li>Les mesures prises pour faciliter l'exercice des droits des personnes concernées</li>
                <li>La personne ou le service auprès duquel s'exerce le droit d'accès</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Inspection, Contrôle et Sanction</h2>
              <p>
                L'ANPDP dispose de pouvoirs d'investigation, de contrôle et de sanction qui lui permettent de s'assurer du respect des dispositions de la loi relative à la protection des données à caractère personnel.
              </p>
              
              <h3 className="text-xl font-semibold mt-8 mb-3">Les moyens d'inspection et de contrôle</h3>
              <p>
                Pour l'accomplissement de sa mission, l'ANPDP dispose d'agents assermentés, habilités à procéder, notamment :
              </p>
              <ul className="list-disc pl-6 my-4 space-y-2">
                <li>À des vérifications sur place et à la collecte de tous les documents et renseignements nécessaires à l'exercice de leurs missions</li>
                <li>À des expertises</li>
                <li>À la consignation des supports de l'information et à la saisie des matériels</li>
                <li>À l'audition des responsables du traitement</li>
                <li>À l'audition de toute personne intéressée par le traitement des données objet du contrôle</li>
              </ul>
              
              <h3 className="text-xl font-semibold mt-8 mb-3">Le pouvoir de sanctions</h3>
              <p>
                Après avoir mis en demeure le contrevenant de se conformer à la loi dans un délai qu'elle fixe, l'ANPDP peut prononcer les sanctions suivantes :
              </p>
              <ul className="list-disc pl-6 my-4 space-y-2">
                <li>Le retrait provisoire de l'autorisation pour une durée maximum d'un an</li>
                <li>Le retrait définitif de l'autorisation</li>
                <li>Une amende d'un montant dont les seuils sont fixés par les dispositions de la loi</li>
              </ul>
              <p>
                Les décisions de l'ANPDP, en matière de sanctions administratives, sont susceptibles de recours devant le Conseil d'État, conformément à la législation en vigueur.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Activities;
