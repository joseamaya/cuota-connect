
import { useState, useEffect } from "react";
import { ArrowRight, Users, Home as HomeIcon, ShieldCheck, BarChart3, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeatureCard from "@/components/FeatureCard";
import { Link } from "react-router-dom";

const Index = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Wait a bit before triggering animations
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero section */}
      <Hero />
      
      {/* Features section */}
      <section className="py-20 bg-secondary/50">
        <div className="container px-4 mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-4 tracking-tight">
              Todo lo que necesita para gestionar su condominio
            </h2>
            <p className="text-muted-foreground text-lg">
              Nuestra plataforma está diseñada para hacer más eficiente la administración de Parques del Chipe.
            </p>
          </div>
          
          <div className={cn(
            "grid md:grid-cols-2 lg:grid-cols-3 gap-6 transition-opacity duration-1000",
            isVisible ? "opacity-100" : "opacity-0"
          )}>
            <FeatureCard
              title="Control de Pagos"
              description="Registro detallado de los pagos realizados y pendientes de cada propietario."
              icon={BarChart3}
            />
            <FeatureCard
              title="Gestión de Residentes"
              description="Base de datos completa con la información de todos los residentes."
              icon={Users}
            />
            <FeatureCard
              title="Administración de Propiedades"
              description="Información organizada sobre todas las propiedades del condominio."
              icon={HomeIcon}
            />
            <FeatureCard
              title="Convenios Digitales"
              description="Firma digital y almacenamiento seguro de todos los acuerdos."
              icon={ShieldCheck}
            />
            <FeatureCard
              title="Calendario de Pagos"
              description="Recordatorios automáticos de fechas de vencimiento de cuotas."
              icon={Calendar}
            />
            <div className="glass-card rounded-xl p-6 flex flex-col items-center justify-center text-center border-dashed border-2">
              <h3 className="text-xl font-medium mb-2">¿Necesitas más funciones?</h3>
              <p className="text-muted-foreground mb-4">Estamos en constante evolución para mejorar la plataforma.</p>
              <Button variant="outline">Contactar Administración</Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA section */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent -z-10" />
        <div className="container px-4 mx-auto">
          <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8 lg:p-12 relative overflow-hidden border">
            {/* Background decoration */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
            
            <div className="relative z-10">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-4">
                  Comience a gestionar su condominio hoy
                </h2>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                  Acceda a todas las herramientas que necesita para una administración eficiente de Parques del Chipe.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild>
                  <Link to="/dashboard">
                    Ir al Dashboard
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline">
                  Explorar Funciones
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-muted py-12">
        <div className="container px-4 mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <div className="flex items-center space-x-2 font-semibold text-xl">
                <span className="bg-primary text-white rounded-lg p-2">PC</span>
                <span>Parques del Chipe</span>
              </div>
              <p className="text-muted-foreground mt-2 text-sm">
                Plataforma de gestión condominal
              </p>
            </div>
            
            <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
              <Link to="/dashboard" className="text-sm hover:text-primary transition-colors">Dashboard</Link>
              <Link to="/payments" className="text-sm hover:text-primary transition-colors">Cuotas</Link>
              <Link to="/agreements" className="text-sm hover:text-primary transition-colors">Convenios</Link>
              <Button variant="outline" size="sm">Contacto</Button>
            </div>
          </div>
          
          <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>© {new Date().getFullYear()} Parques del Chipe. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
