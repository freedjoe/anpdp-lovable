
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";

const contentTypes = [
  { value: "who-we-are", label: "Who We Are?" },
  { value: "activities", label: "Activities" },
  { value: "concerned-parties", label: "Concerned Parties" },
  { value: "events", label: "Events" },
  { value: "faq", label: "FAQ" },
  { value: "meetings", label: "Meetings" }
];

const languages = [
  { value: "fr", label: "French" },
  { value: "en", label: "English" },
  { value: "ar", label: "Arabic" }
];

const exampleUrls = {
  "who-we-are": {
    fr: [
      "https://anpdp.dz/fr/qui-sommes-nous/",
      "https://anpdp.dz/fr/mot-du-president-de-lautorite-nationale-de-protection-des-donnees-a-caractere-personnel/"
    ]
  },
  "activities": {
    fr: [
      "https://anpdp.dz/fr/mise-en-place-le-registre-national/",
      "https://anpdp.dz/fr/inspection-controle-et-sanction/"
    ]
  },
  "concerned-parties": {
    fr: ["https://anpdp.dz/fr/les-concernees-par-le-traitement/"]
  },
  "events": {
    fr: ["https://anpdp.dz/fr/actualites/"]
  },
  "faq": {
    fr: [
      "https://anpdp.dz/fr/quand-et-a-qui-sapplique-la-loi-n18-07/",
      "https://anpdp.dz/fr/notions-cles/"
    ]
  },
  "meetings": {
    fr: ["https://anpdp.dz/fr/reunions-des-membres-de-lanpdp/"]
  }
};

interface ImportResult {
  success: boolean;
  message: string;
  error?: string;
  result?: any;
}

const AdminImportContent = () => {
  const { toast } = useToast();
  const [url, setUrl] = useState("");
  const [contentType, setContentType] = useState<string>("");
  const [language, setLanguage] = useState<string>("fr");
  const [importing, setImporting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<ImportResult | null>(null);
  const [suggestedUrls, setSuggestedUrls] = useState<string[]>([]);

  const handleContentTypeChange = (value: string) => {
    setContentType(value);
    setSuggestedUrls(exampleUrls[value as keyof typeof exampleUrls]?.[language as keyof typeof exampleUrls[keyof typeof exampleUrls]] || []);
  };

  const handleLanguageChange = (value: string) => {
    setLanguage(value);
    setSuggestedUrls(exampleUrls[contentType as keyof typeof exampleUrls]?.[value as keyof typeof exampleUrls[keyof typeof exampleUrls]] || []);
  };

  const handleSuggestedUrlClick = (suggestedUrl: string) => {
    setUrl(suggestedUrl);
  };

  const handleImport = async () => {
    if (!url || !contentType || !language) {
      toast({
        title: "Missing information",
        description: "Please fill in all fields before importing",
        variant: "destructive",
      });
      return;
    }

    setImporting(true);
    setProgress(10);
    setResult(null);

    try {
      setProgress(30);
      
      const { data, error } = await supabase.functions.invoke<ImportResult>("import-content", {
        body: {
          url,
          type: contentType,
          language,
        },
      });

      setProgress(100);
      
      if (error) {
        throw new Error(error.message);
      }
      
      setResult(data || {
        success: false,
        message: "Unknown error occurred",
        error: "No response from server"
      });
      
      if (data?.success) {
        toast({
          title: "Import Successful",
          description: data.message,
        });
      } else {
        toast({
          title: "Import Failed",
          description: data?.error || "Unknown error occurred",
          variant: "destructive",
        });
      }
    } catch (error) {
      setResult({
        success: false,
        message: "Import failed",
        error: error instanceof Error ? error.message : "Unknown error"
      });
      
      toast({
        title: "Import Failed",
        description: error instanceof Error ? error.message : "Unknown error occurred",
        variant: "destructive",
      });
    } finally {
      setImporting(false);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Import Content</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Import from Old Website</CardTitle>
          <CardDescription>
            Import content from the previous ANPDP website (anpdp.dz)
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="content-type">Content Type</Label>
            <Select value={contentType} onValueChange={handleContentTypeChange}>
              <SelectTrigger id="content-type">
                <SelectValue placeholder="Select content type" />
              </SelectTrigger>
              <SelectContent>
                {contentTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="language">Language</Label>
            <Select value={language} onValueChange={handleLanguageChange}>
              <SelectTrigger id="language">
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                {languages.map((lang) => (
                  <SelectItem key={lang.value} value={lang.value}>
                    {lang.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="url">URL</Label>
            <Input
              id="url"
              placeholder="https://anpdp.dz/fr/..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          </div>
          
          {suggestedUrls.length > 0 && (
            <div className="space-y-2">
              <Label>Suggested URLs</Label>
              <div className="space-y-2">
                {suggestedUrls.map((suggestedUrl, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleSuggestedUrlClick(suggestedUrl)}
                    >
                      Use
                    </Button>
                    <span className="text-sm truncate">{suggestedUrl}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {importing && (
            <div className="space-y-2">
              <Label>Import Progress</Label>
              <Progress value={progress} className="h-2" />
            </div>
          )}
          
          {result && (
            <Alert variant={result.success ? "default" : "destructive"}>
              <div className="flex items-center gap-2">
                {result.success ? <CheckCircle2 className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
                <AlertTitle>{result.success ? "Success" : "Error"}</AlertTitle>
              </div>
              <AlertDescription>
                {result.success ? result.message : result.error}
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
        
        <CardFooter>
          <Button 
            onClick={handleImport} 
            disabled={importing || !url || !contentType || !language}
          >
            {importing ? "Importing..." : "Start Import"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AdminImportContent;
