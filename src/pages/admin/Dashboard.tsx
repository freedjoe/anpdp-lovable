
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Users, Calendar, HelpCircle } from "lucide-react";

const AdminDashboard = () => {
  const stats = [
    { 
      title: "Content Pages", 
      value: "5", 
      description: "Total managed pages", 
      icon: <FileText className="h-8 w-8 text-emerald-500" /> 
    },
    { 
      title: "FAQ Items", 
      value: "12", 
      description: "Published Q&As", 
      icon: <HelpCircle className="h-8 w-8 text-blue-500" /> 
    },
    { 
      title: "Events", 
      value: "8", 
      description: "Upcoming events", 
      icon: <Calendar className="h-8 w-8 text-purple-500" /> 
    },
    { 
      title: "Meetings", 
      value: "3", 
      description: "Scheduled meetings", 
      icon: <Users className="h-8 w-8 text-amber-500" /> 
    }
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              {stat.icon}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Welcome to ANPDP Admin</CardTitle>
            <CardDescription>
              Manage your content, events, FAQs, and meetings from this dashboard.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Select a section from the sidebar to begin editing content.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
