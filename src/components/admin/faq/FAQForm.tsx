
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Save } from "lucide-react";
import { useState } from "react";

interface Category {
  id: string;
  name: string;
}

interface Language {
  id: string;
  name: string;
}

interface FAQFormProps {
  languages: Language[];
  categories: Category[];
}

export const FAQForm = ({ languages, categories }: FAQFormProps) => {
  const [selectedLanguage, setSelectedLanguage] = useState<string>("fr");
  const [selectedCategory, setSelectedCategory] = useState<string>("general");

  return (
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
  );
};
