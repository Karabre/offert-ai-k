
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calculator, Plus, FileText, Settings, TrendingUp, Clock, DollarSign } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [quotes] = useState([
    {
      id: "OFF-001",
      customer: "Anna Andersson",
      amount: 145000,
      status: "Skickad",
      date: "2024-01-15",
      items: "L-kök 3.2m × 2.1m"
    },
    {
      id: "OFF-002", 
      customer: "Erik Johansson",
      amount: 89000,
      status: "Accepterad",
      date: "2024-01-14",
      items: "Rakt kök 2.4m"
    },
    {
      id: "OFF-003",
      customer: "Maria Nilsson", 
      amount: 210000,
      status: "Under granskning",
      date: "2024-01-13",
      items: "U-kök 4.1m × 3.2m med köksö"
    }
  ]);

  const stats = [
    {
      title: "Totala offerter",
      value: "23",
      change: "+12% från förra månaden",
      icon: <FileText className="h-6 w-6" />
    },
    {
      title: "Offertvärde",
      value: "2.4M kr",
      change: "+18% från förra månaden", 
      icon: <DollarSign className="h-6 w-6" />
    },
    {
      title: "Genomsnittlig tid",
      value: "8 min",
      change: "-45% från förra månaden",
      icon: <Clock className="h-6 w-6" />
    },
    {
      title: "Acceptansgrad",
      value: "67%",
      change: "+5% från förra månaden",
      icon: <TrendingUp className="h-6 w-6" />
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Skickad": return "bg-blue-100 text-blue-700";
      case "Accepterad": return "bg-green-100 text-green-700";
      case "Under granskning": return "bg-yellow-100 text-yellow-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 bg-gradient-to-br from-blue-600 to-orange-500 rounded-lg flex items-center justify-center">
              <Calculator className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-slate-800">AutoOffert</span>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4 mr-2" />
              Inställningar
            </Button>
            <Button onClick={() => navigate('/quote-generator')} className="bg-gradient-to-r from-blue-600 to-orange-500">
              <Plus className="h-4 w-4 mr-2" />
              Ny offert
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800 mb-2">Välkommen tillbaka!</h1>
          <p className="text-slate-600">Här är en översikt över dina senaste offerter och aktiviteter.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="border-0 shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-600">
                  {stat.title}
                </CardTitle>
                <div className="text-blue-600">
                  {stat.icon}
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-slate-800">{stat.value}</div>
                <p className="text-xs text-slate-500 mt-1">{stat.change}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Quotes */}
          <div className="lg:col-span-2">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Senaste offerter</CardTitle>
                    <CardDescription>Översikt över dina nyligen skapade offerter</CardDescription>
                  </div>
                  <Button variant="outline" size="sm">Se alla</Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {quotes.map((quote) => (
                    <div key={quote.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <span className="font-semibold text-slate-800">{quote.id}</span>
                          <Badge className={getStatusColor(quote.status)}>{quote.status}</Badge>
                        </div>
                        <p className="text-slate-600 font-medium">{quote.customer}</p>
                        <p className="text-sm text-slate-500">{quote.items}</p>
                        <p className="text-xs text-slate-400">{quote.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-slate-800">{quote.amount.toLocaleString()} kr</p>
                        <Button variant="ghost" size="sm" className="mt-1">Se detaljer</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Snabbåtgärder</CardTitle>
                <CardDescription>Kom igång snabbt med vanliga uppgifter</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  onClick={() => navigate('/quote-generator')} 
                  className="w-full justify-start bg-gradient-to-r from-blue-600 to-orange-500"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Skapa ny offert
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="h-4 w-4 mr-2" />
                  Hantera prislista
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Settings className="h-4 w-4 mr-2" />
                  Företagsinställningar
                </Button>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Tips & Hjälp</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <p className="font-medium text-blue-800 mb-1">💡 Protips</p>
                    <p className="text-blue-600">Använd AI-analysering för IKEA-ritningar för snabbare offertering</p>
                  </div>
                  <div className="p-3 bg-green-50 rounded-lg">
                    <p className="font-medium text-green-800 mb-1">📈 Förbättra konvertering</p>
                    <p className="text-green-600">Lägg till bilder på tidigare projekt i dina offerter</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
