
import { useState, useEffect } from "react";
import { Search, FileText, Download, Calendar, Users, ArrowUpRight, ExternalLink, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import Navbar from "@/components/Navbar";

// Mock data for agreements
const AGREEMENTS_DATA = [
  {
    id: 1,
    title: "Reglamento Interno del Condominio",
    category: "Reglamento",
    status: "active",
    lastUpdated: "2023-01-15",
    description: "Documento que establece las normas y reglas de convivencia dentro del condominio.",
    icon: Shield,
  },
  {
    id: 2,
    title: "Convenio de Uso de Áreas Comunes",
    category: "Convenio",
    status: "active",
    lastUpdated: "2023-03-05",
    description: "Acuerdo sobre el uso y mantenimiento de las áreas comunes del condominio.",
    icon: Users,
  },
  {
    id: 3,
    title: "Acta de Asamblea Ordinaria 2023",
    category: "Acta",
    status: "active",
    lastUpdated: "2023-04-20",
    description: "Documento oficial de la asamblea general ordinaria de residentes realizada en abril 2023.",
    icon: FileText,
  },
  {
    id: 4,
    title: "Calendario de Mantenimientos 2023",
    category: "Calendario",
    status: "active",
    lastUpdated: "2023-01-10",
    description: "Programación anual de actividades de mantenimiento del condominio.",
    icon: Calendar,
  },
  {
    id: 5,
    title: "Acuerdo de Incremento de Cuota 2023",
    category: "Acuerdo",
    status: "pending",
    lastUpdated: "2023-05-30",
    description: "Propuesta pendiente de aprobación sobre el incremento de cuotas condominales para el año 2023.",
    icon: FileText,
  },
];

const Agreements = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredAgreements, setFilteredAgreements] = useState(AGREEMENTS_DATA);
  const [activeCategory, setActiveCategory] = useState("all");

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Filter agreements based on search and category
  useEffect(() => {
    let filtered = AGREEMENTS_DATA;
    
    if (searchQuery) {
      filtered = filtered.filter(agreement => 
        agreement.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        agreement.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    if (activeCategory !== "all") {
      filtered = filtered.filter(agreement => 
        agreement.category.toLowerCase() === activeCategory.toLowerCase()
      );
    }
    
    setFilteredAgreements(filtered);
  }, [searchQuery, activeCategory]);

  // Get unique categories from agreements data
  const categories = ["all", ...new Set(AGREEMENTS_DATA.map(a => a.category.toLowerCase()))];

  return (
    <div className="min-h-screen bg-secondary/30 pb-10">
      <Navbar />
      
      <div className="container px-4 pt-28 mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Convenios y Acuerdos</h1>
            <p className="text-muted-foreground">
              Documentos oficiales y acuerdos del condominio Parques del Chipe
            </p>
          </div>
        </div>
        
        <Card className="mb-8 animate-scale-in">
          <CardHeader>
            <CardTitle>Información de Convenios</CardTitle>
            <CardDescription>Acceda a todos los documentos oficiales de la comunidad</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              En esta sección puede consultar todos los documentos, reglamentos y acuerdos vigentes del condominio.
              Estos documentos son de carácter oficial y son la base para la convivencia armónica en nuestra comunidad.
            </p>
            
            <div className="flex flex-col md:flex-row items-start gap-4">
              <Card className="w-full md:w-1/3 bg-primary/5 border-none">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3 mb-2">
                    <Shield className="h-5 w-5 text-primary" />
                    <h3 className="font-medium">Documentos Vigentes</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Todos los documentos están actualizados y disponibles para su consulta en cualquier momento.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="w-full md:w-1/3 bg-primary/5 border-none">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3 mb-2">
                    <Download className="h-5 w-5 text-primary" />
                    <h3 className="font-medium">Descarga Disponible</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Puede descargar todos los documentos para su consulta offline o impresión.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="w-full md:w-1/3 bg-primary/5 border-none">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3 mb-2">
                    <Calendar className="h-5 w-5 text-primary" />
                    <h3 className="font-medium">Actualizaciones Periódicas</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Los documentos se actualizan regularmente después de cada asamblea de residentes.
                  </p>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
        
        <div className="bg-background rounded-lg border shadow-sm mb-8 animate-fade-in">
          <div className="p-4 border-b flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar convenios y acuerdos..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <Tabs 
              defaultValue="all" 
              className="w-full md:w-auto"
              onValueChange={setActiveCategory}
            >
              <TabsList className="w-full md:w-auto">
                {categories.map((category) => (
                  <TabsTrigger key={category} value={category} className="capitalize">
                    {category === "all" ? "Todos" : category}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>

          {isLoading ? (
            <div className="p-6">
              <div className="animate-pulse space-y-6">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="h-36 bg-muted rounded-md" />
                ))}
              </div>
            </div>
          ) : filteredAgreements.length === 0 ? (
            <div className="p-8 text-center">
              <p className="text-muted-foreground">No se encontraron convenios o acuerdos con los filtros aplicados.</p>
            </div>
          ) : (
            <div className="p-4 grid gap-4 md:grid-cols-2">
              {filteredAgreements.map((agreement) => {
                const Icon = agreement.icon;
                return (
                  <Card key={agreement.id} className="overflow-hidden hover:shadow-md transition-shadow">
                    <CardContent className="p-0">
                      <div className="flex flex-col md:flex-row">
                        <div className="bg-primary/10 p-6 flex items-center justify-center md:w-1/4">
                          <Icon className="h-10 w-10 text-primary" />
                        </div>
                        <div className="p-5 md:w-3/4">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <Badge 
                                variant="outline" 
                                className={cn(
                                  "mb-2",
                                  agreement.status === "active" 
                                    ? "bg-green-100 text-green-800 hover:bg-green-100" 
                                    : "bg-amber-100 text-amber-800 hover:bg-amber-100"
                                )}
                              >
                                {agreement.status === "active" ? "Vigente" : "Pendiente"}
                              </Badge>
                              <h3 className="font-medium">{agreement.title}</h3>
                              <p className="text-xs text-muted-foreground mt-1">
                                Actualizado: {format(new Date(agreement.lastUpdated), "dd MMM, yyyy")}
                              </p>
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground mb-3">
                            {agreement.description}
                          </p>
                          <div className="flex justify-end">
                            <Button variant="outline" size="sm" className="mr-2">
                              <Download className="h-4 w-4 mr-1" />
                              Descargar
                            </Button>
                            <Button size="sm">
                              <ExternalLink className="h-4 w-4 mr-1" />
                              Ver
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Agreements;
