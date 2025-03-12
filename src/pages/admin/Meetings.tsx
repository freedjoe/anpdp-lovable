
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const AdminMeetings = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Meetings Management</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Manage ANPDP Meetings</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            Add, edit, or remove information about ANPDP member meetings.
          </p>
          <p>Meetings management functionality will be implemented here.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminMeetings;
