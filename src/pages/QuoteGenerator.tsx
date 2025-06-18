
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Calculator, ArrowLeft, FileText, Send, Eye, Upload, Wand2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const QuoteGenerator = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    customerName: "",
    customerEmail: "",
    projectDescription: "",
    measurements: "",
    additionalNotes: ""
  });
  const [generatedQuote, setGeneratedQuote] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const mockPriceList = {
    "bänkskåp 60": { price: 1200, description: "Bänkskåp 60cm bred" },
    "bänkskåp 80": { price: 1400, description: "Bänkskåp 80cm bred" },
    "väggskåp 60": { price: 800, description: "Väggskåp 60cm bred" },
    "väggskåp 80": { price: 950, description: "Väggskåp 80cm bred" },
    "högskåp": { price: 2500, description: "Högskåp 60cm bred" },
    "bänkskiva": { price: 450, description: "Bänkskiva per löpmeter" },
    "diskho": { price: 1800, description: "Integrerat diskho" },
    "kruka": { price: 2200, description: "Blandarkran" }
  };

  const parseQuoteText = (text: string) => {
    const lines = text.toLowerCase().split('\n');
    const items = [];
    let totalPrice = 0;

    lines.forEach(line => {
      Object.keys(mockPriceList).forEach(key => {
        if (line.includes(key)) {
          const quantityMatch = line.match(/(\d+)[\s×x]/);
          const quantity = quantityMatch ? parseInt(quantityMatch[1]) : 1;
          
          const item = mockPriceList[key];
          const lineTotal = item.price * quantity;
          totalPrice += lineTotal;
          
          items.push({
            description: item.description,
            quantity,
            unitPrice: item.price,
            total: lineTotal
          });
        }
      });
    });

    return { items, totalPrice };
  };

  const handleGenerate = async () => {
    if (!formData.measurements.trim()) {
      toast({
        title: "Mått saknas",
        description: "Vänligen ange mått för köket",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const parsed = parseQuoteText(formData.measurements);
    const vat = parsed.totalPrice * 0.25;
    const totalWithVat = parsed.totalPrice + vat;
    
    setGeneratedQuote({
      quoteNumber: `OFF-${Date.now().toString().slice(-6)}`,
      customer: formData.customerName,
      email: formData.customerEmail,
      description: formData.projectDescription,
      items: parsed.items,
      subtotal: parsed.totalPrice,
      vat: vat,
      total: totalWithVat,
      validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString('sv-SE')
    });
    
    setIsGenerating(false);
    setStep(3);
    
    toast({
      title: "Offert genererad!",
      description: "Din offert har skapats automatiskt",
    });
  };

  const handleSendQuote = () => {
    toast({
      title: "Offert skickad!",
      description: `Offerten har skickats till ${formData.customerEmail}`,
    });
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" onClick={() => navigate('/dashboard')}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Tillbaka
            </Button>
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 bg-gradient-to-br from-blue-600 to-orange-500 rounded-lg flex items-center justify-center">
                <Calculator className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-slate-800">AutoOffert</span>
            </div>
          </div>
          
          <Badge variant="outline" className="bg-white">
            Steg {step} av 3
          </Badge>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <div className={`flex items-center justify-center w-8 h-8 rounded-full ${step >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>
              1
            </div>
            <div className={`flex-1 h-1 ${step >= 2 ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
            <div className={`flex items-center justify-center w-8 h-8 rounded-full ${step >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>
              2
            </div>
            <div className={`flex-1 h-1 ${step >= 3 ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
            <div className={`flex items-center justify-center w-8 h-8 rounded-full ${step >= 3 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>
              3
            </div>
          </div>
          <div className="flex justify-between text-sm text-slate-600">
            <span>Kundinfo</span>
            <span>Mått & Kalkyl</span>
            <span>Granska & Skicka</span>
          </div>
        </div>

        {/* Step 1: Customer Information */}
        {step === 1 && (
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Kundinformation</CardTitle>
              <CardDescription>Fyll i information om kunden och projektet</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="customerName">Kundnamn *</Label>
                  <Input
                    id="customerName"
                    value={formData.customerName}
                    onChange={(e) => setFormData({...formData, customerName: e.target.value})}
                    placeholder="Anna Andersson"
                  />
                </div>
                <div>
                  <Label htmlFor="customerEmail">E-post *</Label>
                  <Input
                    id="customerEmail"
                    type="email"
                    value={formData.customerEmail}
                    onChange={(e) => setFormData({...formData, customerEmail: e.target.value})}
                    placeholder="anna@example.com"
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="projectDescription">Projektbeskrivning</Label>
                <Textarea
                  id="projectDescription"
                  value={formData.projectDescription}
                  onChange={(e) => setFormData({...formData, projectDescription: e.target.value})}
                  placeholder="Renovering av kök i villa, ca 15 kvm..."
                  rows={3}
                />
              </div>

              <Button 
                onClick={() => setStep(2)}
                disabled={!formData.customerName || !formData.customerEmail}
                className="w-full bg-gradient-to-r from-blue-600 to-orange-500"
              >
                Nästa steg
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Step 2: Measurements & Calculation */}
        {step === 2 && (
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Mått & Automatisk Kalkyl</CardTitle>
              <CardDescription>Klistra in mått eller ladda upp IKEA-ritning för automatisk prisberäkning</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="measurements">Mått (text) *</Label>
                  <Textarea
                    id="measurements"
                    value={formData.measurements}
                    onChange={(e) => setFormData({...formData, measurements: e.target.value})}
                    placeholder="2x bänkskåp 60cm&#10;1x bänkskåp 80cm&#10;3x väggskåp 60cm&#10;1x högskåp&#10;3.2m bänkskiva&#10;1x diskho&#10;1x kruka"
                    rows={8}
                  />
                  <p className="text-sm text-slate-500 mt-2">
                    Skriv varje produkt på en ny rad. Exempel: "2x bänkskåp 60cm"
                  </p>
                </div>
                
                <div>
                  <Label>IKEA-ritning (kommer snart)</Label>
                  <div className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center bg-slate-50">
                    <Upload className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                    <p className="text-slate-500 mb-2">Drag & släpp IKEA Home Planner-fil här</p>
                    <p className="text-xs text-slate-400">Eller klicka för att välja fil</p>
                    <Badge className="mt-4 bg-orange-100 text-orange-700">
                      Pro-funktion
                    </Badge>
                  </div>
                </div>
              </div>

              <div>
                <Label htmlFor="additionalNotes">Ytterligare anteckningar</Label>
                <Textarea
                  id="additionalNotes"
                  value={formData.additionalNotes}
                  onChange={(e) => setFormData({...formData, additionalNotes: e.target.value})}
                  placeholder="Specialönskemål, färger, leveranstid..."
                  rows={3}
                />
              </div>

              <div className="flex space-x-4">
                <Button variant="outline" onClick={() => setStep(1)}>
                  Tillbaka
                </Button>
                <Button 
                  onClick={handleGenerate}
                  disabled={!formData.measurements.trim() || isGenerating}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-orange-500"
                >
                  {isGenerating ? (
                    <>
                      <Wand2 className="h-4 w-4 mr-2 animate-spin" />
                      Genererar offert...
                    </>
                  ) : (
                    <>
                      <Wand2 className="h-4 w-4 mr-2" />
                      Generera offert
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 3: Review & Send */}
        {step === 3 && generatedQuote && (
          <div className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Granska offert</CardTitle>
                <CardDescription>Kontrollera att allt stämmer innan du skickar</CardDescription>
              </CardHeader>
              <CardContent>
                {/* Quote Preview */}
                <div className="bg-white border rounded-lg p-6 mb-6">
                  <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold text-slate-800">OFFERT</h2>
                    <p className="text-slate-600">#{generatedQuote.quoteNumber}</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <h3 className="font-semibold text-slate-800 mb-2">Kund</h3>
                      <p>{generatedQuote.customer}</p>
                      <p className="text-slate-600">{generatedQuote.email}</p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-800 mb-2">Offertdetaljer</h3>
                      <p>Datum: {new Date().toLocaleDateString('sv-SE')}</p>
                      <p>Giltig till: {generatedQuote.validUntil}</p>
                    </div>
                  </div>

                  {generatedQuote.description && (
                    <div className="mb-6">
                      <h3 className="font-semibold text-slate-800 mb-2">Projektbeskrivning</h3>
                      <p className="text-slate-600">{generatedQuote.description}</p>
                    </div>
                  )}

                  <div className="mb-6">
                    <h3 className="font-semibold text-slate-800 mb-4">Artiklar</h3>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left py-2">Beskrivning</th>
                            <th className="text-right py-2">Antal</th>
                            <th className="text-right py-2">Á-pris</th>
                            <th className="text-right py-2">Summa</th>
                          </tr>
                        </thead>
                        <tbody>
                          {generatedQuote.items.map((item, index) => (
                            <tr key={index} className="border-b">
                              <td className="py-2">{item.description}</td>
                              <td className="text-right py-2">{item.quantity}</td>
                              <td className="text-right py-2">{item.unitPrice.toLocaleString()} kr</td>
                              <td className="text-right py-2 font-semibold">{item.total.toLocaleString()} kr</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center mb-2">
                      <span>Summa exkl. moms:</span>
                      <span className="font-semibold">{generatedQuote.subtotal.toLocaleString()} kr</span>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <span>Moms (25%):</span>
                      <span className="font-semibold">{generatedQuote.vat.toLocaleString()} kr</span>
                    </div>
                    <div className="flex justify-between items-center text-lg font-bold border-t pt-2">
                      <span>Totalt inkl. moms:</span>
                      <span>{generatedQuote.total.toLocaleString()} kr</span>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <Button variant="outline" onClick={() => setStep(2)}>
                    Tillbaka
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <Eye className="h-4 w-4 mr-2" />
                    Förhandsgranska PDF
                  </Button>
                  <Button onClick={handleSendQuote} className="flex-1 bg-gradient-to-r from-blue-600 to-orange-500">
                    <Send className="h-4 w-4 mr-2" />
                    Skicka offert
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuoteGenerator;
