
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calculator, ArrowLeft, Building, Mail, Phone, MapPin, Save } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";

const CompanySettings = () => {
  const navigate = useNavigate();
  const [companyData, setCompanyData] = useState({
    name: "Mälarkök AB",
    orgNumber: "556123-4567",
    address: "Storgatan 15",
    postalCode: "12345",
    city: "Stockholm",
    phone: "08-123 456 78",
    email: "info@malarkök.se",
    website: "www.malarkök.se",
    description: "Vi är specialister på måttanpassade kökslösningar med över 20 års erfarenhet.",
    bankAccount: "123456789",
    vatNumber: "SE556123456701"
  });

  const handleInputChange = (field: string, value: string) => {
    setCompanyData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    // Simulera sparande
    toast({
      title: "Inställningar sparade",
      description: "Företagsinformationen har uppdaterats framgångsrikt.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" onClick={() => navigate('/dashboard')}>
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
          
          <Button onClick={handleSave} className="bg-gradient-to-r from-blue-600 to-orange-500">
            <Save className="h-4 w-4 mr-2" />
            Spara ändringar
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800 mb-2">Företagsinställningar</h1>
          <p className="text-slate-600">Hantera din företagsinformation som visas på offerter</p>
        </div>

        <div className="max-w-4xl">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Building className="h-5 w-5" />
                <span>Företagsinformation</span>
              </CardTitle>
              <CardDescription>
                Denna information kommer att visas på alla dina offerter
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Företagsnamn *</Label>
                  <Input
                    id="name"
                    value={companyData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="Ditt företagsnamn"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="orgNumber">Organisationsnummer</Label>
                  <Input
                    id="orgNumber"
                    value={companyData.orgNumber}
                    onChange={(e) => handleInputChange('orgNumber', e.target.value)}
                    placeholder="556123-4567"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Adress</Label>
                  <Input
                    id="address"
                    value={companyData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    placeholder="Gatuadress"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label htmlFor="postalCode">Postnummer</Label>
                    <Input
                      id="postalCode"
                      value={companyData.postalCode}
                      onChange={(e) => handleInputChange('postalCode', e.target.value)}
                      placeholder="12345"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="city">Ort</Label>
                    <Input
                      id="city"
                      value={companyData.city}
                      onChange={(e) => handleInputChange('city', e.target.value)}
                      placeholder="Stockholm"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Telefon</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                    <Input
                      id="phone"
                      className="pl-10"
                      value={companyData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      placeholder="08-123 456 78"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">E-post</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                    <Input
                      id="email"
                      className="pl-10"
                      type="email"
                      value={companyData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="kontakt@företag.se"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="website">Webbplats</Label>
                  <Input
                    id="website"
                    value={companyData.website}
                    onChange={(e) => handleInputChange('website', e.target.value)}
                    placeholder="www.företag.se"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bankAccount">Bankkontonummer</Label>
                  <Input
                    id="bankAccount"
                    value={companyData.bankAccount}
                    onChange={(e) => handleInputChange('bankAccount', e.target.value)}
                    placeholder="123456789"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Företagsbeskrivning</Label>
                <Textarea
                  id="description"
                  value={companyData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Beskriv ditt företag och era specialiteter..."
                  rows={3}
                />
              </div>

              <div className="pt-6 border-t">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-slate-800">Automatisk backup</h3>
                    <p className="text-sm text-slate-600">Spara ändringar automatiskt var 30:e sekund</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Aktivera
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CompanySettings;
