
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table"
import { Building, Calculator, FileText, List, Plus, Settings, TrendingUp, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const stats = [
    { title: "Offerter denna månad", value: "12", change: "+2 sedan förra månaden", icon: FileText },
    { title: "Accepterade offerter", value: "8", change: "67% acceptansgrad", icon: TrendingUp },
    { title: "Totalt värde", value: "245 000 kr", change: "+15% sedan förra månaden", icon: Calculator },
    { title: "Aktiva kunder", value: "23", change: "+3 nya denna vecka", icon: Users }
  ];

  const recentQuotes = [
    { id: "OFF-001234", customer: "Anna Andersson", amount: "45 000 kr", status: "Skickad", date: "2024-01-15" },
    { id: "OFF-001235", customer: "Erik Johansson", amount: "78 500 kr", status: "Accepterad", date: "2024-01-14" },
    { id: "OFF-001236", customer: "Maria Lindström", amount: "32 000 kr", status: "Väntar svar", date: "2024-01-13" },
    { id: "OFF-001237", customer: "Lars Nilsson", amount: "156 000 kr", status: "Under granskning", date: "2024-01-12" }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Accepterad": return "bg-green-100 text-green-800";
      case "Skickad": return "bg-blue-100 text-blue-800";
      case "Väntar svar": return "bg-yellow-100 text-yellow-800";
      case "Under granskning": return "bg-purple-100 text-purple-800";
      default: return "bg-gray-100 text-gray-800";
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
            <Button variant="outline" size="sm" onClick={() => navigate('/company-settings')}>
              <Settings className="h-4 w-4 mr-2" />
              Inställningar
            </Button>
            <Button size="sm" onClick={() => navigate('/quote-generator')} className="bg-gradient-to-r from-blue-600 to-orange-500">
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
          <p className="text-slate-600">Här är en översikt över dina senaste aktiviteter</p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow cursor-pointer" onClick={() => navigate('/quote-generator')}>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="h-12 w-12 bg-gradient-to-br from-blue-600 to-orange-500 rounded-lg flex items-center justify-center">
                  <FileText className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800">Skapa offert</h3>
                  <p className="text-sm text-slate-600">Generera ny offert med AI</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow cursor-pointer" onClick={() => navigate('/price-list')}>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="h-12 w-12 bg-gradient-to-br from-green-600 to-teal-500 rounded-lg flex items-center justify-center">
                  <List className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800">Hantera prislista</h3>
                  <p className="text-sm text-slate-600">Uppdatera priser och produkter</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow cursor-pointer" onClick={() => navigate('/company-settings')}>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="h-12 w-12 bg-gradient-to-br from-purple-600 to-pink-500 rounded-lg flex items-center justify-center">
                  <Building className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800">Företagsinställningar</h3>
                  <p className="text-sm text-slate-600">Hantera företagsinformation</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="border-0 shadow-md">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="h-10 w-10 rounded-lg flex items-center justify-center bg-slate-100 text-slate-600">
                    <stat.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-800">{stat.title}</h3>
                    <p className="text-xl font-bold text-slate-900">{stat.value}</p>
                    <p className="text-sm text-slate-500">{stat.change}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Quotes */}
        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <h2 className="text-xl font-bold text-slate-800 mb-4">Senaste offerterna</h2>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Offert ID</TableHead>
                    <TableHead>Kund</TableHead>
                    <TableHead>Belopp</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Datum</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentQuotes.map((quote) => (
                    <TableRow key={quote.id}>
                      <TableCell className="font-medium">{quote.id}</TableCell>
                      <TableCell>{quote.customer}</TableCell>
                      <TableCell>{quote.amount}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(quote.status)}`}>{quote.status}</span>
                      </TableCell>
                      <TableCell>{quote.date}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TableCell colSpan={5} className="text-center text-sm text-slate-500">
                      Visar {recentQuotes.length} av {recentQuotes.length}+ offerter
                    </TableCell>
                  </TableRow>
                </TableFooter>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
