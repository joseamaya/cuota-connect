
import { ChevronRight, Building2, Shield, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface FeatureItemProps {
  icon: React.ElementType;
  title: string;
  description: string;
}

const FeatureItem = ({ icon: Icon, title, description }: FeatureItemProps) => (
  <div className="flex items-start space-x-4 p-5 rounded-xl transition-all duration-300 hover:bg-secondary/50">
    <div className="flex-shrink-0 rounded-lg bg-primary/10 p-2.5 text-primary">
      <Icon className="w-5 h-5" />
    </div>
    <div>
      <h3 className="font-medium text-base mb-1">{title}</h3>
      <p className="text-muted-foreground text-sm">{description}</p>
    </div>
  </div>
);

const Hero = () => {
  return (
    <div className="relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent -z-10" />
      
      {/* Hero content */}
      <div className="container px-4 mx-auto py-24 pt-32 md:pt-40 md:pb-32 flex flex-col items-center text-center">
        <div className="inline-flex items-center rounded-full border px-4 py-1.5 mb-8 bg-background">
          <span className="text-xs font-medium text-primary">Plataforma de administración condominal</span>
        </div>
        
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight mb-6 text-balance animate-slide-in">
          Gestión simplificada para
          <span className="text-primary ml-2">Parques del Chipe</span>
        </h1>
        
        <p className="text-lg text-muted-foreground max-w-2xl mb-10 text-balance animate-slide-in">
          Facilitamos el control de cuotas condominales y convenios de vecinos con una plataforma intuitiva y eficiente para nuestra comunidad.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 mb-16 w-full max-w-md mx-auto animate-slide-in">
          <Button size="lg" className="w-full">
            Iniciar Sesión
          </Button>
          <Button size="lg" variant="outline" className="w-full group">
            Conocer más
            <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
        
        {/* Features */}
        <div className="grid md:grid-cols-3 gap-6 w-full max-w-4xl mx-auto animate-fade-in">
          <FeatureItem 
            icon={Building2}
            title="Gestión de Condominios"
            description="Administración completa de la información de residentes y propiedades."
          />
          <FeatureItem 
            icon={CreditCard}
            title="Control de Cuotas"
            description="Seguimiento detallado de pagos y estado de cuenta de los residentes."
          />
          <FeatureItem 
            icon={Shield}
            title="Convenios Digitales"
            description="Manejo seguro de acuerdos y documentos importantes de la comunidad."
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
