
import { useState, useEffect } from "react";
import { Home, Users, CreditCard, FileText, DollarSign, TrendingUp, AlertTriangle, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from "@/components/Navbar";
import DashboardCard from "@/components/DashboardCard";
import { cn } from "@/lib/utils";

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const monthlyPaymentProgress = 75;

  return (
    <div className="min-h-screen bg-secondary/30 pb-10">
      <Navbar />
      
      <div className="container px-4 pt-28 mx-auto">
        <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0 mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground">
              Bienvenido a su panel de control, gestione su información aquí.
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Button>Actualizar Perfil</Button>
          </div>
        </div>
        
        {isLoading ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 animate-pulse">
            {[...Array(4)].map((_, i) => (
              <Card key={i} className="h-32" />
            ))}
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 animate-fade-in">
            <DashboardCard
              title="Balance Actual"
              value="$1,250.00"
              icon={DollarSign}
              trend={12}
              trendLabel="desde el mes pasado"
            />
            <DashboardCard
              title="Pagos al Día"
              value="8/12"
              description="Cuotas completadas este año"
              icon={CheckCircle2}
            />
            <DashboardCard
              title="Próximo Pago"
              value="15 Julio, 2023"
              description="$150.00 - Cuota mensual"
              icon={Calendar}
            />
            <DashboardCard
              title="Alertas"
              value="2"
              description="Requieren su atención"
              icon={AlertTriangle}
            />
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {/* Recent Payments Section */}
          <Card className="col-span-1 animate-scale-in">
            <CardHeader>
              <CardTitle>Pagos Recientes</CardTitle>
              <CardDescription>
                Historial de tus últimos pagos de cuotas.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="space-y-4 animate-pulse">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="h-12 bg-muted rounded-md" />
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {[
                    { date: "01/06/2023", amount: "$150.00", status: "Completado", type: "Cuota Mensual" },
                    { date: "01/05/2023", amount: "$150.00", status: "Completado", type: "Cuota Mensual" },
                    { date: "01/04/2023", amount: "$150.00", status: "Completado", type: "Cuota Mensual" },
                  ].map((payment, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">{payment.type}</p>
                        <p className="text-sm text-muted-foreground">{payment.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{payment.amount}</p>
                        <p className={cn(
                          "text-sm rounded-full px-2 py-0.5 inline-block",
                          payment.status === "Completado" ? "bg-green-100 text-green-800" : "bg-amber-100 text-amber-800"
                        )}>
                          {payment.status}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              <div className="mt-4 pt-4 border-t">
                <Button variant="outline" className="w-full" asChild>
                  <a href="/payments">Ver todos los pagos</a>
                </Button>
              </div>
            </CardContent>
          </Card>
          
          {/* Current Period Status */}
          <Card className="col-span-1 animate-scale-in [animation-delay:150ms]">
            <CardHeader>
              <CardTitle>Estado del Período Actual</CardTitle>
              <CardDescription>
                Junio 2023 - Progreso de pago de cuotas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-medium">Completado: {monthlyPaymentProgress}%</p>
                    <p className="text-sm text-muted-foreground">24/32 unidades</p>
                  </div>
                  <Progress value={monthlyPaymentProgress} className="h-2" />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-secondary p-4 rounded-lg">
                    <p className="text-sm text-muted-foreground mb-1">Monto Total</p>
                    <p className="text-xl font-bold">$4,800.00</p>
                  </div>
                  <div className="bg-secondary p-4 rounded-lg">
                    <p className="text-sm text-muted-foreground mb-1">Recaudado</p>
                    <p className="text-xl font-bold">$3,600.00</p>
                  </div>
                </div>
                
                <Tabs defaultValue="all" className="w-full">
                  <TabsList className="grid grid-cols-3 mb-4">
                    <TabsTrigger value="all">Todos</TabsTrigger>
                    <TabsTrigger value="paid">Pagados</TabsTrigger>
                    <TabsTrigger value="pending">Pendientes</TabsTrigger>
                  </TabsList>
                  <TabsContent value="all">
                    <p className="text-muted-foreground text-sm">
                      Total de 32 unidades: 24 pagadas y 8 pendientes
                    </p>
                  </TabsContent>
                  <TabsContent value="paid">
                    <p className="text-muted-foreground text-sm">
                      24 unidades han pagado la cuota de este mes
                    </p>
                  </TabsContent>
                  <TabsContent value="pending">
                    <p className="text-muted-foreground text-sm">
                      8 unidades tienen pago pendiente para este mes
                    </p>
                  </TabsContent>
                </Tabs>
              </div>
            </CardContent>
          </Card>
          
          {/* Agreements Section */}
          <Card className="col-span-1 md:col-span-2 animate-scale-in [animation-delay:300ms]">
            <CardHeader>
              <CardTitle>Convenios Activos</CardTitle>
              <CardDescription>
                Documentos y acuerdos vigentes del condominio
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-pulse">
                  {[...Array(2)].map((_, i) => (
                    <div key={i} className="h-24 bg-muted rounded-md" />
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { title: "Reglamento Interno", date: "Actualizado: 15/01/2023", status: "Vigente" },
                    { title: "Convenio de Áreas Comunes", date: "Actualizado: 03/03/2023", status: "Vigente" },
                  ].map((agreement, index) => (
                    <div key={index} className="border rounded-lg p-4 hover:bg-secondary/50 transition-colors">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-medium">{agreement.title}</h4>
                          <p className="text-sm text-muted-foreground">{agreement.date}</p>
                        </div>
                        <span className="text-xs bg-green-100 text-green-800 rounded-full px-2 py-0.5">
                          {agreement.status}
                        </span>
                      </div>
                      <div className="mt-4 flex justify-end">
                        <Button variant="ghost" size="sm">Ver documento</Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              <div className="mt-6 flex justify-end">
                <Button variant="outline" asChild>
                  <a href="/agreements">Ver todos los convenios</a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
