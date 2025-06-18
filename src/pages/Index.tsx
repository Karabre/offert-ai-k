
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calculator, FileText, Clock, CheckCircle, ArrowRight, Zap, Target, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const features = [
    {
      icon: <Calculator className="h-6 w-6" />,
      title: "Automatisk priskalkyl",
      description: "Synka din prislista och få automatiska kalkyler baserat på kundens mått"
    },
    {
      icon: <FileText className="h-6 w-6" />,
      title: "Professionella offerter",
      description: "Generera snygga PDF-offerter med ditt varumärke och logotyp"
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Spara 30-60 min per offert",
      description: "Automatisera repetitiva uppgifter och fokusera på försäljning"
    },
    {
      icon: <CheckCircle className="h-6 w-6" />,
      title: "Minska fel",
      description: "Eliminera manuella räknefel och säkerställ korrekt prissättning"
    }
  ];

  const pricing = [
    {
      name: "Free",
      price: "0 kr",
      period: "/månad",
      features: ["1 offert/månad", "Manuell inmatning", "Grundläggande PDF-export"],
      buttonText: "Kom igång gratis",
      highlighted: false
    },
    {
      name: "Bas",
      price: "149 kr", 
      period: "/månad",
      features: ["Prislista-synk", "PDF-export", "10 offerter/mån", "E-postutskick"],
      buttonText: "Välj Bas",
      highlighted: true
    },
    {
      name: "Pro",
      price: "299 kr",
      period: "/månad", 
      features: ["AI-analys av ritningar", "Obegränsat antal offerter", "Offertlogg", "CRM-funktioner"],
      buttonText: "Välj Pro",
      highlighted: false
    }
  ];

  const stats = [
    { icon: <Target className="h-8 w-8" />, value: "30-60 min", label: "Sparad tid per offert" },
    { icon: <Users className="h-8 w-8" />, value: "85%", label: "Minskar prisfel" },
    { icon: <Zap className="h-8 w-8" />, value: "3x", label: "Snabbare offertering" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 bg-gradient-to-br from-blue-600 to-orange-500 rounded-lg flex items-center justify-center">
              <Calculator className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-slate-800">AutoOffert</span>
          </div>
          
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#features" className="text-slate-600 hover:text-slate-800 transition-colors">Funktioner</a>
            <a href="#pricing" className="text-slate-600 hover:text-slate-800 transition-colors">Priser</a>
            <Button variant="outline" onClick={() => setIsLoggedIn(true)}>Logga in</Button>
            <Button onClick={() => navigate('/dashboard')}>Kom igång</Button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <Badge className="mb-6 bg-orange-100 text-orange-700 hover:bg-orange-200">
          Ny: AI-analys av IKEA-ritningar 🚀
        </Badge>
        
        <h1 className="text-5xl md:text-6xl font-bold text-slate-800 mb-6 leading-tight">
          Automatisera dina
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-orange-500"> kökofferter</span>
        </h1>
        
        <p className="text-xl text-slate-600 mb-8 max-w-3xl mx-auto leading-relaxed">
          Spara 30-60 minuter per offert med AI-driven prisberäkning. Synka din prislista, 
          ladda upp ritningar och generera professionella offerter på minuter.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button size="lg" className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800" onClick={() => navigate('/dashboard')}>
            Börja nu - gratis
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button size="lg" variant="outline">Se demo</Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="text-blue-600 mb-2">{stat.icon}</div>
              <div className="text-3xl font-bold text-slate-800 mb-1">{stat.value}</div>
              <div className="text-slate-600 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-800 mb-4">
            Allt du behöver för professionell offertering
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Från första mått till färdig offert - vi automatiserar hela processen
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:transform hover:-translate-y-1">
              <CardHeader>
                <div className="h-12 w-12 bg-gradient-to-br from-blue-500 to-orange-500 rounded-lg flex items-center justify-center text-white mb-4">
                  {feature.icon}
                </div>
                <CardTitle className="text-lg">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-800 mb-4">Så här fungerar det</h2>
            <p className="text-xl text-slate-600">Enkel process i tre steg</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="h-16 w-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6">1</div>
              <h3 className="text-xl font-semibold mb-4">Synka din prislista</h3>
              <p className="text-slate-600">Koppla din Google Sheets-prislista eller ladda upp CSV-fil</p>
            </div>
            
            <div className="text-center">
              <div className="h-16 w-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6">2</div>
              <h3 className="text-xl font-semibold mb-4">Ladda upp mått</h3>
              <p className="text-slate-600">Klistra in text eller ladda upp IKEA-ritning</p>
            </div>
            
            <div className="text-center">
              <div className="h-16 w-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6">3</div>
              <h3 className="text-xl font-semibold mb-4">Generera offert</h3>
              <p className="text-slate-600">AI skapar automatiskt en professionell PDF-offert</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-800 mb-4">Enkla priser</h2>
          <p className="text-xl text-slate-600">Välj den plan som passar ditt företag bäst</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {pricing.map((plan, index) => (
            <Card key={index} className={`relative ${plan.highlighted ? 'border-2 border-blue-500 shadow-xl transform scale-105' : 'border shadow-lg'}`}>
              {plan.highlighted && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-600 to-orange-500">
                  Mest populär
                </Badge>
              )}
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <div className="flex items-baseline justify-center">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-slate-600 ml-1">{plan.period}</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button 
                  className={`w-full ${plan.highlighted ? 'bg-gradient-to-r from-blue-600 to-orange-500 hover:from-blue-700 hover:to-orange-600' : ''}`}
                  variant={plan.highlighted ? "default" : "outline"}
                  onClick={() => navigate('/dashboard')}
                >
                  {plan.buttonText}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-orange-500 py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Redo att revolutionera din offertprocess?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Börja spara tid redan idag. Ingen bindningstid, avsluta när du vill.
          </p>
          <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100" onClick={() => navigate('/dashboard')}>
            Kom igång gratis
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="h-8 w-8 bg-gradient-to-br from-blue-600 to-orange-500 rounded-lg flex items-center justify-center">
                <Calculator className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold">AutoOffert</span>
            </div>
            
            <div className="text-center md:text-right">
              <p className="text-slate-400">© 2024 AutoOffert. Alla rättigheter förbehållna.</p>
              <p className="text-slate-400 text-sm mt-1">Byggd för svenska köksföretag</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
