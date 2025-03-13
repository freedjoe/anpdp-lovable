
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlusCircle } from "lucide-react";
import { FAQList } from "@/components/admin/faq/FAQList";
import { FAQForm } from "@/components/admin/faq/FAQForm";
import { FAQCategories } from "@/components/admin/faq/FAQCategories";
import { faqs, languages, categories } from "@/components/admin/faq/FAQData";

const AdminFAQ = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">FAQ Management</h1>
      
      <Tabs defaultValue="list" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="list">FAQ List</TabsTrigger>
          <TabsTrigger value="add">Add/Edit FAQ</TabsTrigger>
          <TabsTrigger value="categories">Categories</TabsTrigger>
        </TabsList>
        
        <TabsContent value="list" className="space-y-6">
          <FAQList faqs={faqs} languages={languages} />
          
          <Button className="bg-emerald-600 hover:bg-emerald-700">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add New FAQ
          </Button>
        </TabsContent>
        
        <TabsContent value="add" className="space-y-6">
          <FAQForm languages={languages} categories={categories} />
        </TabsContent>
        
        <TabsContent value="categories" className="space-y-6">
          <FAQCategories categories={categories} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminFAQ;
