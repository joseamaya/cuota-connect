
import { useState, useEffect } from "react";
import { Calendar as CalendarIcon, ChevronDown, Download, Filter, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import Navbar from "@/components/Navbar";

// Mock data for payments
const PAYMENTS_DATA = [
  {
    id: 1,
    date: "2023-06-01",
    amount: 150.00,
    concept: "Cuota Mensual",
    status: "paid",
    reference: "REF-2023-06-001",
  },
  {
    id: 2,
    date: "2023-05-01",
    amount: 150.00,
    concept: "Cuota Mensual",
    status: "paid",
    reference: "REF-2023-05-001",
  },
  {
    id: 3,
    date: "2023-04-01",
    amount: 150.00,
    concept: "Cuota Mensual",
    status: "paid",
    reference: "REF-2023-04-001",
  },
  {
    id: 4,
    date: "2023-03-01",
    amount: 150.00,
    concept: "Cuota Mensual",
    status: "paid",
    reference: "REF-2023-03-001",
  },
  {
    id: 5,
    date: "2023-07-01",
    amount: 150.00,
    concept: "Cuota Mensual",
    status: "pending",
    reference: "REF-2023-07-001",
  },
  {
    id: 6,
    date: "2023-08-01",
    amount: 150.00,
    concept: "Cuota Mensual",
    status: "upcoming",
    reference: "REF-2023-08-001",
  },
];

const Payments = () => {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const [filteredPayments, setFilteredPayments] = useState(PAYMENTS_DATA);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Filter payments based on search query and status filter
    let result = PAYMENTS_DATA;
    
    if (searchQuery) {
      result = result.filter(payment => 
        payment.concept.toLowerCase().includes(searchQuery.toLowerCase()) ||
        payment.reference.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    if (statusFilter !== "all") {
      result = result.filter(payment => payment.status === statusFilter);
    }
    
    if (date) {
      result = result.filter(payment => 
        format(new Date(payment.date), "yyyy-MM-dd") === format(date, "yyyy-MM-dd")
      );
    }
    
    setFilteredPayments(result);
  }, [searchQuery, statusFilter, date]);

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "paid":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-amber-100 text-amber-800";
      case "upcoming":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "paid":
        return "Pagado";
      case "pending":
        return "Pendiente";
      case "upcoming":
        return "Próximo";
      default:
        return status;
    }
  };

  return (
    <div className="min-h-screen bg-secondary/30 pb-10">
      <Navbar />
      
      <div className="container px-4 pt-28 mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Cuotas Condominales</h1>
            <p className="text-muted-foreground">
              Gestione y visualice todos sus pagos de cuotas
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <Button className="w-full md:w-auto">Reportar un Pago</Button>
          </div>
        </div>
        
        <Card className="mb-8 animate-scale-in">
          <CardHeader>
            <CardTitle>Resumen de Cuotas</CardTitle>
            <CardDescription>Vista general del estado de sus cuotas condominales</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="bg-primary/5 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-muted-foreground mb-1">Cuota Mensual Actual</h3>
                <p className="text-2xl font-bold">$150.00</p>
                <p className="text-xs text-muted-foreground mt-1">Vigente desde: 01/01/2023</p>
              </div>
              <div className="bg-primary/5 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-muted-foreground mb-1">Cuotas Pagadas (2023)</h3>
                <p className="text-2xl font-bold">6/12</p>
                <p className="text-xs text-muted-foreground mt-1">Total pagado: $900.00</p>
              </div>
              <div className="bg-primary/5 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-muted-foreground mb-1">Próximo Vencimiento</h3>
                <p className="text-2xl font-bold">15 Jul 2023</p>
                <p className="text-xs text-muted-foreground mt-1">Monto: $150.00</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div className="bg-background rounded-lg border shadow-sm animate-fade-in">
          <Tabs defaultValue="all" className="w-full">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between p-4 border-b">
              <TabsList>
                <TabsTrigger value="all">Todos</TabsTrigger>
                <TabsTrigger value="paid">Pagados</TabsTrigger>
                <TabsTrigger value="pending">Pendientes</TabsTrigger>
                <TabsTrigger value="upcoming">Próximos</TabsTrigger>
              </TabsList>
              
              <div className="flex items-center mt-4 md:mt-0 space-x-2">
                <div className="relative">
                  <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar pagos..."
                    className="pl-8 w-full md:w-52"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-10 p-0">
                      <CalendarIcon className="h-4 w-4" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                
                <Button variant="outline" size="icon" onClick={() => {
                  setSearchQuery("");
                  setStatusFilter("all");
                  setDate(undefined);
                }}>
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <TabsContent value="all" className="m-0">
              {renderPaymentsTable(filteredPayments, isLoading, getStatusBadgeClass, getStatusLabel)}
            </TabsContent>
            
            <TabsContent value="paid" className="m-0">
              {renderPaymentsTable(
                PAYMENTS_DATA.filter(p => p.status === "paid"),
                isLoading,
                getStatusBadgeClass,
                getStatusLabel
              )}
            </TabsContent>
            
            <TabsContent value="pending" className="m-0">
              {renderPaymentsTable(
                PAYMENTS_DATA.filter(p => p.status === "pending"),
                isLoading,
                getStatusBadgeClass,
                getStatusLabel
              )}
            </TabsContent>
            
            <TabsContent value="upcoming" className="m-0">
              {renderPaymentsTable(
                PAYMENTS_DATA.filter(p => p.status === "upcoming"),
                isLoading,
                getStatusBadgeClass,
                getStatusLabel
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

const renderPaymentsTable = (
  payments: typeof PAYMENTS_DATA,
  isLoading: boolean,
  getStatusBadgeClass: (status: string) => string,
  getStatusLabel: (status: string) => string
) => {
  if (isLoading) {
    return (
      <div className="p-4">
        <div className="animate-pulse space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-16 bg-muted rounded-md" />
          ))}
        </div>
      </div>
    );
  }
  
  if (payments.length === 0) {
    return (
      <div className="p-8 text-center">
        <p className="text-muted-foreground">No se encontraron pagos con los filtros aplicados.</p>
      </div>
    );
  }
  
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full">
        <thead>
          <tr className="border-b text-xs text-muted-foreground">
            <th className="px-4 py-3 text-left">Fecha</th>
            <th className="px-4 py-3 text-left">Concepto</th>
            <th className="px-4 py-3 text-left">Referencia</th>
            <th className="px-4 py-3 text-left">Monto</th>
            <th className="px-4 py-3 text-left">Estado</th>
            <th className="px-4 py-3 text-right">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((payment) => (
            <tr key={payment.id} className="border-b hover:bg-muted/50 transition-colors">
              <td className="px-4 py-3 text-sm">
                {format(new Date(payment.date), "dd MMM, yyyy")}
              </td>
              <td className="px-4 py-3 font-medium">{payment.concept}</td>
              <td className="px-4 py-3 text-sm text-muted-foreground">{payment.reference}</td>
              <td className="px-4 py-3 font-medium">${payment.amount.toFixed(2)}</td>
              <td className="px-4 py-3">
                <span className={cn(
                  "text-xs px-2 py-1 rounded-full",
                  getStatusBadgeClass(payment.status)
                )}>
                  {getStatusLabel(payment.status)}
                </span>
              </td>
              <td className="px-4 py-3 text-right">
                <Button variant="ghost" size="sm" disabled={payment.status === "upcoming"}>
                  <Download className="h-4 w-4 mr-1" />
                  Recibo
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Payments;
