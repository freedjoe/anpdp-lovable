
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { ChevronDown, ChevronUp, Grip, PenSquare, PlusCircle, Save, Trash2 } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const AdminFAQ = () => {
  const [selectedLanguage, setSelectedLanguage] = useState<string>("fr");
  const [selectedCategory, setSelectedCategory] = useState<string>("general");
  
  // Sample FAQs data (would normally come from the database)
  const faqs = [
    {
      id: 1,
      question: "Qu'est-ce que l'ANPDP?",
      category: "Général",
      published: true
    },
    {
      id: 2,
      question: "Qui est concerné par la loi n° 18-07?",
      category: "Loi N°18-07",
      published: true
    },
    {
      id: 3,
      question: "Quelles sont les données à caractère personnel?",
      category: "Notions Clés",
      published: true
    },
    {
      id: 4,
      question: "Comment déclarer un traitement de données?",
      category: "Procédures",
      published: false
    }
  ];

  const languages = [
    { id: "fr", name: "French" },
    { id: "en", name: "English" },
    { id: "ar", name: "Arabic" }
  ];

  const categories = [
    { id: "general", name: "Général" },
    { id: "law", name: "Loi N°18-07" },
    { id: "concepts", name: "Notions Clés" },
    { id: "procedures", name: "Procédures" }
  ];

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
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Manage FAQs</CardTitle>
              <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                <SelectTrigger className="w-36">
                  <SelectValue placeholder="Language" />
                </SelectTrigger>
                <SelectContent>
                  {languages.map((lang) => (
                    <SelectItem key={lang.id} value={lang.id}>
                      {lang.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-12">Order</TableHead>
                      <TableHead>Question</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {faqs.map((faq, index) => (
                      <TableRow key={faq.id}>
                        <TableCell>
                          <div className="flex items-center space-x-1">
                            <Grip className="h-4 w-4 text-muted-foreground" />
                            <span>{index + 1}</span>
                            <div className="flex flex-col">
                              <Button variant="ghost" size="icon" className="h-5 w-5">
                                <ChevronUp className="h-3 w-3" />
                              </Button>
                              <Button variant="ghost" size="icon" className="h-5 w-5">
                                <ChevronDown className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="font-medium">{faq.question}</TableCell>
                        <TableCell>{faq.category}</TableCell>
                        <TableCell>
                          <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            faq.published 
                              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300" 
                              : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                          }`}>
                            {faq.published ? "Published" : "Draft"}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end space-x-2">
                            <Button variant="outline" size="icon">
                              <PenSquare className="h-4 w-4" />
                            </Button>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button variant="destructive" size="icon">
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    This action cannot be undone. This will permanently delete the FAQ item.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction className="bg-red-600 hover:bg-red-700">Delete</AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
          
          <Button className="bg-emerald-600 hover:bg-emerald-700">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add New FAQ
          </Button>
        </TabsContent>
        
        <TabsContent value="add" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Add/Edit FAQ</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="language-select">Language</Label>
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
                  
                  <div className="space-y-2">
                    <Label htmlFor="category-select">Category</Label>
                    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                      <SelectTrigger id="category-select">
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="question">Question</Label>
                  <Input id="question" placeholder="Enter FAQ question" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="answer">Answer</Label>
                  <Textarea id="answer" placeholder="Enter FAQ answer" className="min-h-[200px]" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="position">Position</Label>
                  <Input id="position" type="number" placeholder="Display order" min="0" />
                  <p className="text-xs text-muted-foreground">
                    Lower numbers will appear first in the list.
                  </p>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox id="published" />
                  <Label htmlFor="published">Publish this FAQ</Label>
                </div>
                
                <div className="flex justify-end space-x-2">
                  <Button variant="outline">
                    Cancel
                  </Button>
                  <Button className="bg-emerald-600 hover:bg-emerald-700">
                    <Save className="mr-2 h-4 w-4" />
                    Save FAQ
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="categories" className="space-y-6">
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
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminFAQ;
