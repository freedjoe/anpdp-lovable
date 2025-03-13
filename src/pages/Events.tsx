
import { useLanguage } from "@/context/LanguageContext";
import { getTranslation } from "@/utils/i18n";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarDays, Clock, MapPin, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Events = () => {
  const { language } = useLanguage();
  const t = (key: string) => getTranslation(language, key);
  
  // Sample events data (would normally come from the database)
  const events = [
    {
      id: 1,
      title: "Journée internationale de la protection des données",
      date: "28 janvier 2024",
      location: "Palais des Nations, Club des Pins, Alger",
      description: "Conférence sur l'importance de la protection des données personnelles dans l'ère numérique, organisée à l'occasion de la journée internationale de la protection des données.",
      image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    },
    {
      id: 2,
      title: "Atelier de formation sur la mise en conformité",
      date: "15 mars 2024",
      location: "Siège de l'ANPDP, El-Biar, Alger",
      description: "Formation destinée aux délégués à la protection des données des administrations publiques sur les obligations légales et les bonnes pratiques en matière de protection des données personnelles.",
      image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    },
    {
      id: 3,
      title: "Forum sur la cybersécurité et la protection des données",
      date: "10 mai 2024",
      location: "Centre International des Conférences, Alger",
      description: "Événement rassemblant experts nationaux et internationaux pour discuter des défis de la cybersécurité et de la protection des données personnelles dans un monde interconnecté.",
      image: "https://images.unsplash.com/photo-1613294326794-e7c74fe886e2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    },
    {
      id: 4,
      title: "Séminaire sur les droits des personnes concernées",
      date: "20 juin 2024",
      location: "Hôtel El Aurassi, Alger",
      description: "Sensibilisation du grand public sur les droits des personnes concernées par le traitement des données à caractère personnel et comment les exercer.",
      image: "https://images.unsplash.com/photo-1511578314322-379afb476865?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    }
  ];

  return (
    <div className="min-h-screen py-20">
      <div className="container-custom">
        <h1 className="mb-2 text-center text-4xl font-bold">{t('nav.events')}</h1>
        <div className="mx-auto mb-10 mt-4 h-1 w-16 bg-primary" />
        
        <div className="mx-auto max-w-6xl">
          <p className="mb-10 text-center text-lg leading-relaxed">
            Découvrez les événements organisés par l'Autorité Nationale de Protection des Données à Caractère Personnel.
          </p>
          
          <div className="grid gap-8 md:grid-cols-2">
            {events.map((event) => (
              <Card key={event.id} className="overflow-hidden">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={event.image} 
                    alt={event.title} 
                    className="w-full h-full object-cover transition-transform hover:scale-105"
                  />
                </div>
                <CardHeader>
                  <CardTitle>{event.title}</CardTitle>
                  <CardDescription>
                    <div className="flex items-center mt-2">
                      <CalendarDays className="mr-2 h-4 w-4 text-emerald-600" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center mt-2">
                      <MapPin className="mr-2 h-4 w-4 text-emerald-600" />
                      <span>{event.location}</span>
                    </div>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{event.description}</p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    En savoir plus
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <Button asChild className="bg-emerald-600 hover:bg-emerald-700">
              <Link to="/events">
                Voir tous les événements
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Events;
