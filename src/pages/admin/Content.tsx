
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { PlusCircle, Save } from "lucide-react";

const AdminContent = () => {
  const [selectedPage, setSelectedPage] = useState<string>("about");
  const [selectedLanguage, setSelectedLanguage] = useState<string>("fr");
  
  // Dummy data for the form fields
  const [title, setTitle] = useState<string>("Qui sommes-nous?");
  const [content, setContent] = useState<string>(`
L'Autorité nationale de protection des données à caractère personnel (ANPDP) a été créée par la loi n° 18-07 du 10 juin 2018 relative à la protection des personnes physiques dans le traitement des données à caractère personnel.

L'ANPDP est une autorité administrative indépendante, dotée de la personnalité morale et de l'autonomie financière. Elle est chargée de veiller à ce que le traitement des données à caractère personnel soit mis en œuvre conformément aux dispositions de la loi.
  `);
  const [metaDescription, setMetaDescription] = useState<string>("À propos de l'Autorité Nationale de Protection des Données à Caractère Personnel");

  const handleSave = () => {
    console.log("Saving content:", { selectedPage, selectedLanguage, title, content, metaDescription });
    // In a real implementation, this would save to Supabase
  };

  const pages = [
    { id: "about", name: "About" },
    { id: "activities", name: "Activities" },
    { id: "concerned-parties", name: "Concerned Parties" },
    { id: "contact", name: "Contact" },
    { id: "home", name: "Home Page" }
  ];

  const languages = [
    { id: "fr", name: "French" },
    { id: "en", name: "English" },
    { id: "ar", name: "Arabic" }
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Content Management</h1>
      
      <Tabs defaultValue="pages" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="pages">Pages</TabsTrigger>
          <TabsTrigger value="menu">Menu</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        
        <TabsContent value="pages" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Edit Page Content</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="space-y-2">
                  <Label htmlFor="page-select">Select Page</Label>
                  <Select value={selectedPage} onValueChange={setSelectedPage}>
                    <SelectTrigger id="page-select">
                      <SelectValue placeholder="Select a page" />
                    </SelectTrigger>
                    <SelectContent>
                      {pages.map((page) => (
                        <SelectItem key={page.id} value={page.id}>
                          {page.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="language-select">Select Language</Label>
                  <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                    <SelectTrigger id="language-select">
                      <SelectValue placeholder="Select a language" />
                    </SelectTrigger>
                    <SelectContent>
                      {languages.map((lang) => (
                        <SelectItem key={lang.id} value={lang.id}>
                          {lang.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Page Title</Label>
                  <Input 
                    id="title" 
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)} 
                    placeholder="Enter page title" 
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="meta-description">Meta Description</Label>
                  <Input 
                    id="meta-description" 
                    value={metaDescription} 
                    onChange={(e) => setMetaDescription(e.target.value)} 
                    placeholder="Enter meta description" 
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="content">Page Content</Label>
                  <Textarea 
                    id="content" 
                    value={content} 
                    onChange={(e) => setContent(e.target.value)} 
                    placeholder="Enter page content" 
                    className="min-h-[300px]"
                  />
                  <p className="text-xs text-muted-foreground">
                    You can use Markdown or HTML to format the content.
                  </p>
                </div>
                
                <div className="flex justify-end space-x-2">
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setTitle("");
                      setContent("");
                      setMetaDescription("");
                    }}
                  >
                    Reset
                  </Button>
                  <Button 
                    className="bg-emerald-600 hover:bg-emerald-700"
                    onClick={handleSave}
                  >
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Button className="bg-emerald-600 hover:bg-emerald-700">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add New Page
          </Button>
        </TabsContent>
        
        <TabsContent value="menu" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Menu Management</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Manage website navigation menus here. You can create and edit menu items, organize them into hierarchies, and link them to pages or external URLs.
              </p>
              <div className="border rounded-md p-4">
                <p>Menu management interface will be implemented here.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Website Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Configure general website settings such as site title, description, social media links, and contact information.
              </p>
              <div className="border rounded-md p-4">
                <p>Settings interface will be implemented here.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminContent;
