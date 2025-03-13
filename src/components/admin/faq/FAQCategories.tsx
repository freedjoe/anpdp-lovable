
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Trash2 } from "lucide-react";

interface Category {
  id: string;
  name: string;
}

interface FAQCategoriesProps {
  categories: Category[];
}

export const FAQCategories = ({ categories }: FAQCategoriesProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Manage FAQ Categories</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Category Name</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {categories.map((category) => (
                  <TableRow key={category.id}>
                    <TableCell className="font-medium">{category.name}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-2">
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                        <Button variant="destructive" size="sm">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="new-category">Add New Category</Label>
            <div className="flex space-x-2">
              <Input id="new-category" placeholder="Category name" />
              <Button className="bg-emerald-600 hover:bg-emerald-700">
                Add
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
