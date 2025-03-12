
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const AdminEvents = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Events Management</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Manage Events</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            Add, edit, or remove events for the ANPDP website and mobile app.
          </p>
          <p>Events management functionality will be implemented here.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminEvents;
