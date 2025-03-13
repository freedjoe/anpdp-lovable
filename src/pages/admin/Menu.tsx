
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { ChevronDown, ChevronUp, Grip, PenSquare, PlusCircle, Save, Trash2 } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";

const AdminMenu = () => {
  const [selectedLanguage, setSelectedLanguage] = useState<string>("fr");
  
  // Sample menu items data
  const menuItems = [
    {
      id: 1,
      label: "Accueil",
      url: "/",
      parent: null,
      position: 1,
      isVisible: true
    },
    {
      id: 2,
      label: "Qui sommes-nous?",
      url: "/about",
      parent: null,
      position: 2,
      isVisible: true
    },
    {
      id: 3,
      label: "Activités",
      url: "/activities",
      parent: null,
      position: 3,
      isVisible: true
    },
    {
      id: 4,
      label: "Les concernés par le traitement",
      url: "/concerned-parties",
      parent: null,
      position: 4,
      isVisible: true
    },
    {
      id: 5,
      label: "Événements",
      url: "/events",
      parent: null,
      position: 5,
      isVisible: true
    },
    {
      id: 6,
      label: "FAQ",
      url: "/faq",
      parent: null,
      position: 6,
      isVisible: true
    },
    {
      id: 7,
      label: "Contact",
      url: "/contact",
      parent: null,
      position: 7,
      isVisible: true
    }
  ];

  const languages = [
    { id: "fr", name: "French" },
    { id: "en", name: "English" },
    { id: "ar", name: "Arabic" }
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Menu Management</h1>
      
      <Card className="mb-6">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Menu Items</CardTitle>
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
                  <TableHead>Label</TableHead>
                  <TableHead>URL</TableHead>
                  <TableHead>Parent</TableHead>
                  <TableHead>Visibility</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {menuItems.map((item, index) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <div className="flex items-center space-x-1">
                        <Grip className="h-4 w-4 text-muted-foreground" />
                        <span>{item.position}</span>
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
                    <TableCell className="font-medium">{item.label}</TableCell>
                    <TableCell>{item.url}</TableCell>
                    <TableCell>{item.parent || "-"}</TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        item.isVisible 
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300" 
                          : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
                      }`}>
                        {item.isVisible ? "Visible" : "Hidden"}
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
                                This action cannot be undone. This will permanently delete the menu item.
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
      
      <Card>
        <CardHeader>
          <CardTitle>Add/Edit Menu Item</CardTitle>
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
                <Label htmlFor="parent-select">Parent Menu Item (Optional)</Label>
                <Select>
                  <SelectTrigger id="parent-select">
                    <SelectValue placeholder="Select a parent" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None (Top Level)</SelectItem>
                    {menuItems.map((item) => (
                      <SelectItem key={item.id} value={item.id.toString()}>
                        {item.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="menu-label">Menu Label</Label>
              <Input id="menu-label" placeholder="Enter menu label" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="link-type">Link Type</Label>
              <Select defaultValue="page">
                <SelectTrigger id="link-type">
                  <SelectValue placeholder="Select link type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="page">Internal Page</SelectItem>
                  <SelectItem value="external">External URL</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="menu-url">URL / Page</Label>
              <Select>
                <SelectTrigger id="menu-url">
                  <SelectValue placeholder="Select a page" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="/">Home</SelectItem>
                  <SelectItem value="/about">About</SelectItem>
                  <SelectItem value="/activities">Activities</SelectItem>
                  <SelectItem value="/concerned-parties">Concerned Parties</SelectItem>
                  <SelectItem value="/events">Events</SelectItem>
                  <SelectItem value="/faq">FAQ</SelectItem>
                  <SelectItem value="/contact">Contact</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="position">Position</Label>
              <Input id="position" type="number" placeholder="Display order" min="0" />
              <p className="text-xs text-muted-foreground">
                Lower numbers will appear first in the menu.
              </p>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox id="visible" defaultChecked />
              <Label htmlFor="visible">Show in menu</Label>
            </div>
            
            <div className="flex justify-end space-x-2">
              <Button variant="outline">
                Cancel
              </Button>
              <Button className="bg-emerald-600 hover:bg-emerald-700">
                <Save className="mr-2 h-4 w-4" />
                Save Menu Item
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="mt-6">
        <Button className="bg-emerald-600 hover:bg-emerald-700">
          <PlusCircle className="mr-2 h-4 w-4" />
          Add New Menu Item
        </Button>
      </div>
    </div>
  );
};

export default AdminMenu;
