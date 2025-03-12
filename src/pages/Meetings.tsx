
import { useLanguage } from "@/context/LanguageContext";
import { getTranslation } from "@/utils/i18n";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarDays, MapPin, Clock, Users } from "lucide-react";

const MeetingsPage = () => {
  const { language } = useLanguage();
  const t = (key: string) => getTranslation(language, key);

  // This would be fetched from Supabase in the real implementation
  const meetings = [
    {
      id: 1,
      title: "Annual General Meeting",
      date: "December 15, 2023",
      time: "10:00 AM - 2:00 PM",
      location: "ANPDP Headquarters, Algiers",
      description: "Annual meeting to discuss the progress of data protection initiatives and plan for the upcoming year.",
      attendees: "Board members and key stakeholders"
    },
    {
      id: 2,
      title: "Quarterly Review Meeting",
      date: "March 20, 2024",
      time: "9:00 AM - 12:00 PM",
      location: "ANPDP Conference Room, Algiers",
      description: "Review of the first quarter activities and achievements in implementing data protection measures.",
      attendees: "Executive committee and department heads"
    },
    {
      id: 3,
      title: "Special Committee on Digital Privacy",
      date: "April 5, 2024",
      time: "11:00 AM - 1:00 PM",
      location: "Virtual Meeting",
      description: "Discussion on emerging digital privacy challenges and strategies to address them effectively.",
      attendees: "Special committee members and invited experts"
    }
  ];

  return (
    <div className="min-h-screen py-20">
      <div className="container-custom">
        <h1 className="mb-2 text-center text-4xl font-bold">ANPDP Meetings</h1>
        <div className="mx-auto mb-10 mt-4 h-1 w-16 bg-primary" />
        
        <div className="mx-auto max-w-4xl">
          <p className="mb-10 text-center text-lg leading-relaxed">
            Information about past and upcoming meetings of the National Authority for Personal Data Protection.
          </p>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {meetings.map((meeting) => (
              <Card key={meeting.id} className="overflow-hidden">
                <CardHeader className="bg-emerald-50 dark:bg-emerald-900/20">
                  <CardTitle>{meeting.title}</CardTitle>
                  <CardDescription>
                    <div className="flex items-center mt-2">
                      <CalendarDays className="mr-2 h-4 w-4 text-emerald-600" />
                      <span>{meeting.date}</span>
                    </div>
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="space-y-2 text-sm">
                    <div className="flex items-start">
                      <Clock className="mr-2 h-4 w-4 text-muted-foreground mt-0.5" />
                      <span>{meeting.time}</span>
                    </div>
                    <div className="flex items-start">
                      <MapPin className="mr-2 h-4 w-4 text-muted-foreground mt-0.5" />
                      <span>{meeting.location}</span>
                    </div>
                    <div className="flex items-start">
                      <Users className="mr-2 h-4 w-4 text-muted-foreground mt-0.5" />
                      <span>{meeting.attendees}</span>
                    </div>
                  </div>
                  <p className="mt-4 text-sm text-muted-foreground">
                    {meeting.description}
                  </p>
                </CardContent>
                <CardFooter className="border-t bg-muted/50 px-6 py-3">
                  <p className="text-xs text-muted-foreground">
                    Meeting ID: ANPDP-{meeting.id}-{new Date(meeting.date).getFullYear()}
                  </p>
                </CardFooter>
              </Card>
            ))}
          </div>
          
          <div className="mt-10 text-center">
            <p className="text-muted-foreground">
              Meeting details are updated regularly. Check back for new information.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeetingsPage;
