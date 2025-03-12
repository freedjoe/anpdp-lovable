
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const AdminContent = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Content Management</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Page Content Management</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            This is where you can manage the content of various pages on the ANPDP website.
          </p>
          <p>Content management functionality will be implemented here.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminContent;
