
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Upload, FileText, Edit3, Trash2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface ParsedItem {
  id: string;
  description: string;
  quantity: number;
  dimensions?: string;
  detected: boolean;
}

interface PDFUploaderProps {
  onParsedData: (items: ParsedItem[]) => void;
}

const PDFUploader = ({ onParsedData }: PDFUploaderProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [parsedItems, setParsedItems] = useState<ParsedItem[]>([]);
  const [showPreview, setShowPreview] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Mock PDF parsing function - in reality this would use a PDF library
  const mockParsePDF = async (file: File): Promise<ParsedItem[]> => {
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock extracted data from IKEA PDF
    return [
      {
        id: "1",
        description: "Bänkskåp 60cm",
        quantity: 2,
        dimensions: "60x60x80cm",
        detected: true
      },
      {
        id: "2", 
        description: "Bänkskåp 80cm",
        quantity: 1,
        dimensions: "80x60x80cm",
        detected: true
      },
      {
        id: "3",
        description: "Väggskåp 60cm",
        quantity: 3,
        dimensions: "60x35x80cm", 
        detected: true
      },
      {
        id: "4",
        description: "Högskåp",
        quantity: 1,
        dimensions: "60x60x200cm",
        detected: true
      },
      {
        id: "5",
        description: "Bänkskiva",
        quantity: 1,
        dimensions: "320cm längd",
        detected: false
      }
    ];
  };

  const handleFileSelect = (selectedFile: File) => {
    if (selectedFile.type !== 'application/pdf') {
      toast({
        title: "Fel filformat",
        description: "Endast PDF-filer är tillåtna",
        variant: "destructive"
      });
      return;
    }

    setFile(selectedFile);
    toast({
      title: "Fil uppladdad",
      description: `${selectedFile.name} är redo att bearbetas`
    });
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      handleFileSelect(droppedFile);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      handleFileSelect(selectedFile);
    }
  };

  const processPDF = async () => {
    if (!file) return;

    setIsProcessing(true);
    try {
      const items = await mockParsePDF(file);
      setParsedItems(items);
      setShowPreview(true);
      toast({
        title: "PDF bearbetad!",
        description: `${items.length} produkter identifierade`
      });
    } catch (error) {
      toast({
        title: "Fel vid bearbetning",
        description: "Kunde inte läsa PDF-filen",
        variant: "destructive"
      });
    }
    setIsProcessing(false);
  };

  const updateItem = (id: string, field: keyof ParsedItem, value: any) => {
    setParsedItems(items => 
      items.map(item => 
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

  const removeItem = (id: string) => {
    setParsedItems(items => items.filter(item => item.id !== id));
  };

  const confirmAndUse = () => {
    onParsedData(parsedItems);
    toast({
      title: "Mått tillämpade",
      description: "PDF-data har överförts till offerten"
    });
  };

  if (showPreview) {
    return (
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileText className="h-5 w-5" />
            <span>Förhandsvisning: {file?.name}</span>
          </CardTitle>
          <CardDescription>
            Kontrollera och justera de identifierade produkterna
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {parsedItems.map((item) => (
            <div key={item.id} className="flex items-center space-x-4 p-4 bg-slate-50 rounded-lg">
              <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor={`desc-${item.id}`}>Beskrivning</Label>
                  <Input
                    id={`desc-${item.id}`}
                    value={item.description}
                    onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor={`qty-${item.id}`}>Antal</Label>
                  <Input
                    id={`qty-${item.id}`}
                    type="number"
                    value={item.quantity}
                    onChange={(e) => updateItem(item.id, 'quantity', parseInt(e.target.value))}
                  />
                </div>
                <div>
                  <Label htmlFor={`dim-${item.id}`}>Mått</Label>
                  <Input
                    id={`dim-${item.id}`}
                    value={item.dimensions || ''}
                    onChange={(e) => updateItem(item.id, 'dimensions', e.target.value)}
                  />
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {!item.detected && (
                  <Badge variant="outline" className="bg-yellow-50 text-yellow-700">
                    Manuell
                  </Badge>
                )}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => removeItem(item.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
          
          <div className="flex space-x-4 pt-4">
            <Button 
              variant="outline" 
              onClick={() => {
                setShowPreview(false);
                setFile(null);
                setParsedItems([]);
              }}
            >
              Avbryt
            </Button>
            <Button 
              onClick={confirmAndUse}
              className="flex-1 bg-gradient-to-r from-blue-600 to-orange-500"
            >
              <Edit3 className="h-4 w-4 mr-2" />
              Använd dessa mått
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Upload className="h-5 w-5" />
          <span>Ladda upp IKEA PDF</span>
        </CardTitle>
        <CardDescription>
          Ladda upp en IKEA Home Planner-fil för automatisk produktidentifiering
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div
          className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer"
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          onClick={() => fileInputRef.current?.click()}
        >
          <Upload className="h-12 w-12 text-slate-400 mx-auto mb-4" />
          {file ? (
            <div>
              <p className="text-slate-700 font-medium">{file.name}</p>
              <p className="text-sm text-slate-500">
                {(file.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
          ) : (
            <div>
              <p className="text-slate-500 mb-2">Drag & släpp IKEA PDF här</p>
              <p className="text-xs text-slate-400">Eller klicka för att välja fil</p>
            </div>
          )}
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf"
          onChange={handleFileInput}
          className="hidden"
        />

        {file && (
          <Button
            onClick={processPDF}
            disabled={isProcessing}
            className="w-full bg-gradient-to-r from-blue-600 to-orange-500"
          >
            {isProcessing ? (
              <>
                <Upload className="h-4 w-4 mr-2 animate-spin" />
                Bearbetar PDF...
              </>
            ) : (
              <>
                <FileText className="h-4 w-4 mr-2" />
                Analysera PDF
              </>
            )}
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default PDFUploader;
