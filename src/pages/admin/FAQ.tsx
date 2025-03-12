
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const AdminFAQ = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">FAQ Management</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Manage Frequently Asked Questions</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            Add, edit, or remove frequently asked questions and answers.
          </p>
          <p>FAQ management functionality will be implemented here.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminFAQ;
