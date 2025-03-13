
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
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4">Les concernés par le traitement</h2>
              <p>
                La loi n° 18-07 du 10 juin 2018 relative à la protection des données à caractère personnel concerne toute personne physique ou morale qui traite des données à caractère personnel des personnes physiques.
              </p>

              <h3 className="text-xl font-semibold mt-8 mb-3">Qui est concerné?</h3>
              <p>
                Sont principalement concernés par cette loi :
              </p>
              <ul className="list-disc pl-6 my-4 space-y-2">
                <li>Les administrations et organismes publics</li>
                <li>Les entreprises privées (de toutes tailles)</li>
                <li>Les associations et organisations à but non lucratif</li>
                <li>Les professions libérales</li>
                <li>Les établissements de santé</li>
                <li>Les établissements d'enseignement</li>
                <li>Les plateformes numériques et sites web</li>
                <li>Les médias et organes de presse</li>
              </ul>

              <h3 className="text-xl font-semibold mt-8 mb-3">Quelles obligations?</h3>
              <p>
                Ces entités sont soumises à plusieurs obligations, notamment :
              </p>
              <ul className="list-disc pl-6 my-4 space-y-2">
                <li>Déclarer auprès de l'ANPDP tout traitement de données à caractère personnel</li>
                <li>Obtenir une autorisation préalable pour le traitement de données sensibles</li>
                <li>Informer les personnes concernées de leurs droits</li>
                <li>Garantir la sécurité et la confidentialité des données traitées</li>
                <li>Respecter les principes de finalité, de proportionnalité et de durée de conservation des données</li>
                <li>Obtenir le consentement des personnes concernées</li>
                <li>Mettre en place les mesures nécessaires pour permettre l'exercice des droits des personnes concernées</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Procédures à suivre</h2>
              
              <h3 className="text-xl font-semibold mt-6 mb-3">1. La déclaration préalable</h3>
              <p>
                Tout responsable du traitement doit déposer une déclaration auprès de l'ANPDP avant de commencer le traitement des données à caractère personnel. Cette déclaration doit contenir les informations suivantes :
              </p>
              <ul className="list-disc pl-6 my-4 space-y-2">
                <li>L'identité du responsable du traitement et, le cas échéant, celle de son représentant</li>
                <li>La nature, les caractéristiques et la ou les finalités du traitement envisagé</li>
                <li>La description de la ou des catégories des personnes concernées et des données s'y rapportant</li>
                <li>Les destinataires ou les catégories de destinataires auxquels ces données peuvent être communiquées</li>
                <li>Les transferts de données envisagés à destination d'un pays étranger</li>
                <li>La durée de conservation des données</li>
                <li>Le service ou la personne auprès duquel s'exerce le droit d'accès</li>
                <li>Les mesures prises pour assurer la sécurité du traitement</li>
              </ul>

              <h3 className="text-xl font-semibold mt-8 mb-3">2. La demande d'autorisation</h3>
              <p>
                Les traitements de données à caractère personnel portant sur :
              </p>
              <ul className="list-disc pl-6 my-4 space-y-2">
                <li>Des données sensibles (origine raciale ou ethnique, opinions politiques, convictions religieuses, données de santé, etc.)</li>
                <li>Des données génétiques</li>
                <li>Des données biométriques</li>
                <li>Des données relatives aux infractions et condamnations</li>
              </ul>
              <p>
                Sont soumis à l'autorisation préalable de l'ANPDP. La demande d'autorisation doit contenir les mêmes informations que la déclaration préalable, ainsi que les justifications de la nécessité de traiter ces données sensibles.
              </p>

              <h3 className="text-xl font-semibold mt-8 mb-3">3. Le registre des traitements</h3>
              <p>
                Il est recommandé à chaque responsable du traitement de tenir un registre de tous les traitements de données à caractère personnel qu'il effectue. Ce registre doit être mis à la disposition de l'ANPDP sur demande.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConcernedParties;
