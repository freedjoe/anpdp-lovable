
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CalendarIcon, FileText, MapPin, PenSquare, PlusCircle, Save, Trash2, Upload } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";

const AdminMeetings = () => {
  const [selectedLanguage, setSelectedLanguage] = useState<string>("fr");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  
  // Sample meetings data (would normally come from the database)
  const meetings = [
    {
      id: 1,
      title: "Réunion ordinaire du conseil",
      date: "15 Jan 2024",
      location: "Siège de l'ANPDP, El-Biar, Alger",
      published: true,
      hasDocuments: true
    },
    {
      id: 2,
      title: "Session extraordinaire",
      date: "28 Feb 2024",
      location: "Siège de l'ANPDP, El-Biar, Alger",
      published: true,
      hasDocuments: false
    },
    {
      id: 3,
      title: "Réunion du comité technique",
      date: "10 Mar 2024",
      location: "Virtuel",
      published: false,
      hasDocuments: true
    }
  ];

  const languages = [
    { id: "fr", name: "French" },
    { id: "en", name: "English" },
    { id: "ar", name: "Arabic" }
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Meetings Management</h1>
      
      <Tabs defaultValue="list" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="list">Meetings List</TabsTrigger>
          <TabsTrigger value="add">Add/Edit Meeting</TabsTrigger>
        </TabsList>
        
        <TabsContent value="list" className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Manage Meetings</CardTitle>
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
                      <TableHead>Title</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Documents</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {meetings.map((meeting) => (
                      <TableRow key={meeting.id}>
                        <TableCell className="font-medium">{meeting.title}</TableCell>
                        <TableCell>{meeting.date}</TableCell>
                        <TableCell>{meeting.location}</TableCell>
                        <TableCell>
                          {meeting.hasDocuments ? (
                            <span className="inline-flex items-center text-blue-600 dark:text-blue-400">
                              <FileText className="h-4 w-4 mr-1" />
                              Available
                            </span>
                          ) : (
                            <span className="text-muted-foreground">None</span>
                          )}
                        </TableCell>
                        <TableCell>
                          <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            meeting.published 
                              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300" 
                              : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                          }`}>
                            {meeting.published ? "Published" : "Draft"}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end space-x-2">
                            <Button variant="outline" size="icon">
                              <PenSquare className="h-4 w-4" />
                            </Button>
                            <Button variant="destructive" size="icon">
                              <Trash2 className="h-4 w-4" />
                            </Button>
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
            Add New Meeting
          </Button>
        </TabsContent>
        
        <TabsContent value="add" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Add/Edit Meeting</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
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
                  <Label htmlFor="meeting-title">Meeting Title</Label>
                  <Input id="meeting-title" placeholder="Enter meeting title" />
                </div>
                
                <div className="space-y-2">
                  <Label>Meeting Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {selectedDate ? format(selectedDate, "PPP") : "Select date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="meeting-location">Meeting Location</Label>
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <Input id="meeting-location" placeholder="Enter meeting location" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="meeting-summary">Meeting Summary</Label>
                  <Textarea id="meeting-summary" placeholder="Enter a brief summary of the meeting" className="min-h-[100px]" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="meeting-agenda">Meeting Agenda</Label>
                  <Textarea id="meeting-agenda" placeholder="Enter the meeting agenda" className="min-h-[150px]" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="document-url">Document URL</Label>
                  <div className="flex items-center space-x-2">
                    <Input id="document-url" placeholder="Enter document URL (e.g., PDF link)" />
                    <Button variant="outline">
                      <Upload className="h-4 w-4 mr-2" />
                      Upload
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Supported file types: PDF, DOCX, PPTX (Max size: 10MB)
                  </p>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox id="published" />
                  <Label htmlFor="published">Publish this meeting</Label>
                </div>
                
                <div className="flex justify-end space-x-2">
                  <Button variant="outline">
                    Cancel
                  </Button>
                  <Button className="bg-emerald-600 hover:bg-emerald-700">
                    <Save className="mr-2 h-4 w-4" />
                    Save Meeting
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminMeetings;
