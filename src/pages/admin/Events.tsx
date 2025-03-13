
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarIcon, Clock, MapPin, PlusCircle, Save, Trash2 } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";

const AdminEvents = () => {
  const [selectedLanguage, setSelectedLanguage] = useState<string>("fr");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  
  // Sample events data (would normally come from the database)
  const events = [
    {
      id: 1,
      title: "Journée internationale de la protection des données",
      date: "28 Jan 2024",
      location: "Palais des Nations, Club des Pins, Alger",
      published: true
    },
    {
      id: 2,
      title: "Atelier de formation sur la mise en conformité",
      date: "15 Mar 2024",
      location: "Siège de l'ANPDP, El-Biar, Alger",
      published: true
    },
    {
      id: 3,
      title: "Forum sur la cybersécurité et la protection des données",
      date: "10 May 2024",
      location: "Centre International des Conférences, Alger",
      published: false
    }
  ];

  const languages = [
    { id: "fr", name: "French" },
    { id: "en", name: "English" },
    { id: "ar", name: "Arabic" }
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Events Management</h1>
      
      <Tabs defaultValue="list" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="list">Events List</TabsTrigger>
          <TabsTrigger value="add">Add/Edit Event</TabsTrigger>
        </TabsList>
        
        <TabsContent value="list" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Manage Events</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {events.map((event) => (
                      <TableRow key={event.id}>
                        <TableCell className="font-medium">{event.title}</TableCell>
                        <TableCell>{event.date}</TableCell>
                        <TableCell>{event.location}</TableCell>
                        <TableCell>
                          <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            event.published 
                              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300" 
                              : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                          }`}>
                            {event.published ? "Published" : "Draft"}
                          </span>
                        </TableCell>
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
            </CardContent>
          </Card>
          
          <Button className="bg-emerald-600 hover:bg-emerald-700">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add New Event
          </Button>
        </TabsContent>
        
        <TabsContent value="add" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Add/Edit Event</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
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
                
                <div className="space-y-2">
                  <Label htmlFor="event-title">Event Title</Label>
                  <Input id="event-title" placeholder="Enter event title" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="event-description">Event Description</Label>
                  <Textarea id="event-description" placeholder="Enter event description" className="min-h-[150px]" />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Event Date</Label>
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
                    <Label htmlFor="event-time">Event Time</Label>
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <Input id="event-time" placeholder="e.g., 10:00 AM - 2:00 PM" />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="event-location">Event Location</Label>
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <Input id="event-location" placeholder="Enter event location" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="event-image">Event Image URL</Label>
                  <Input id="event-image" placeholder="Enter event image URL" />
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox id="published" />
                  <Label htmlFor="published">Publish this event</Label>
                </div>
                
                <div className="flex justify-end space-x-2">
                  <Button variant="outline">
                    Cancel
                  </Button>
                  <Button className="bg-emerald-600 hover:bg-emerald-700">
                    <Save className="mr-2 h-4 w-4" />
                    Save Event
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

export default AdminEvents;
