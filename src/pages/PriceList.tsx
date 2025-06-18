
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Calculator, ArrowLeft, Plus, Search, Edit, Trash2, Upload, Download } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";

const PriceList = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([
    {
      id: 1,
      category: "Stomme",
      name: "Bänkskåp 60cm",
      code: "BS-60",
      price: 1250,
      unit: "st",
      supplier: "IKEA",
      inStock: true
    },
    {
      id: 2,
      category: "Stomme", 
      name: "Bänkskåp 80cm",
      code: "BS-80",
      price: 1450,
      unit: "st",
      supplier: "IKEA",
      inStock: true
    },
    {
      id: 3,
      category: "Lådfronter",
      name: "Lådfronter vit",
      code: "LF-VIT",
      price: 350,
      unit: "st",
      supplier: "Egen tillverkning",
      inStock: false
    },
    {
      id: 4,
      category: "Bänkskiva",
      name: "Laminat ek 3m",
      code: "LAM-EK-3",
      price: 890,
      unit: "löpmeter",
      supplier: "Laminex",
      inStock: true
    },
    {
      id: 5,
      category: "Installation",
      name: "Montering kök",
      code: "MONT-KÖK",
      price: 8500,
      unit: "paket",
      supplier: "Egen personal",
      inStock: true
    }
  ]);

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddProduct = () => {
    toast({
      title: "Lägg till produkt",
      description: "Funktionen för att lägga till nya produkter kommer snart.",
    });
  };

  const handleEditProduct = (id: number) => {
    toast({
      title: "Redigera produkt",
      description: `Redigerar produkt med ID: ${id}`,
    });
  };

  const handleDeleteProduct = (id: number) => {
    setProducts(products.filter(p => p.id !== id));
    toast({
      title: "Produkt borttagen",
      description: "Produkten har tagits bort från prislistan.",
    });
  };

  const handleImportFromSheets = () => {
    toast({
      title: "Google Sheets import",
      description: "Funktionen för att importera från Google Sheets kommer snart.",
    });
  };

  const handleExportPriceList = () => {
    toast({
      title: "Exporterar prislista",
      description: "Prislistan exporteras som Excel-fil...",
    });
  };

  const categories = [...new Set(products.map(p => p.category))];

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
          
          <div className="flex items-center space-x-3">
            <Button variant="outline" size="sm" onClick={handleImportFromSheets}>
              <Upload className="h-4 w-4 mr-2" />
              Importera från Sheets
            </Button>
            <Button variant="outline" size="sm" onClick={handleExportPriceList}>
              <Download className="h-4 w-4 mr-2" />
              Exportera
            </Button>
            <Button onClick={handleAddProduct} className="bg-gradient-to-r from-blue-600 to-orange-500">
              <Plus className="h-4 w-4 mr-2" />
              Lägg till produkt
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800 mb-2">Hantera prislista</h1>
          <p className="text-slate-600">Administrera dina produkter, priser och leverantörer</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-slate-800">{products.length}</div>
              <p className="text-sm text-slate-600">Totalt produkter</p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-slate-800">{categories.length}</div>
              <p className="text-sm text-slate-600">Kategorier</p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-slate-800">{products.filter(p => p.inStock).length}</div>
              <p className="text-sm text-slate-600">I lager</p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-slate-800">{Math.round(products.reduce((sum, p) => sum + p.price, 0) / products.length).toLocaleString()} kr</div>
              <p className="text-sm text-slate-600">Genomsnittspris</p>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filter */}
        <Card className="border-0 shadow-lg mb-6">
          <CardHeader>
            <CardTitle>Produkter</CardTitle>
            <CardDescription>Sök och hantera dina produkter</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <Input
                  className="pl-10"
                  placeholder="Sök produkter, koder eller kategorier..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {/* Products Table */}
            <div className="rounded-lg border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Produkt</TableHead>
                    <TableHead>Kategori</TableHead>
                    <TableHead>Kod</TableHead>
                    <TableHead>Pris</TableHead>
                    <TableHead>Enhet</TableHead>
                    <TableHead>Leverantör</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Åtgärder</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProducts.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell className="font-medium">{product.name}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{product.category}</Badge>
                      </TableCell>
                      <TableCell className="font-mono text-sm">{product.code}</TableCell>
                      <TableCell className="font-semibold">{product.price.toLocaleString()} kr</TableCell>
                      <TableCell>{product.unit}</TableCell>
                      <TableCell className="text-sm text-slate-600">{product.supplier}</TableCell>
                      <TableCell>
                        <Badge className={product.inStock ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}>
                          {product.inStock ? 'I lager' : 'Ej i lager'}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEditProduct(product.id)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteProduct(product.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-8">
                <p className="text-slate-500">Inga produkter matchar din sökning.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PriceList;
