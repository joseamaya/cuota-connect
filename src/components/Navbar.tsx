
import { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Menu, X, Home, CreditCard, FileText, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navItems = [
  { path: "/", label: "Inicio", icon: Home },
  { path: "/dashboard", label: "Dashboard", icon: User },
  { path: "/payments", label: "Cuotas", icon: CreditCard },
  { path: "/agreements", label: "Convenios", icon: FileText },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Close mobile menu when route changes
    setIsOpen(false);
  }, [location]);

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out",
        scrolled 
          ? "bg-white/80 backdrop-blur-lg shadow-sm border-b border-gray-200/50 py-3" 
          : "bg-transparent py-5"
      )}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <NavLink 
          to="/" 
          className="flex items-center space-x-2 font-semibold text-xl transition-opacity duration-300 hover:opacity-80"
        >
          <span className="bg-primary text-white rounded-lg p-2">PC</span>
          <span className={cn(
            "transition-colors duration-200",
            scrolled ? "text-primary" : "text-primary"
          )}>
            Parques del Chipe
          </span>
        </NavLink>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => cn(
                "relative px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 flex items-center",
                isActive 
                  ? "text-primary" 
                  : "text-muted-foreground hover:text-primary hover:bg-primary/5"
              )}
            >
              <item.icon className="w-4 h-4 mr-1.5" />
              {item.label}
            </NavLink>
          ))}
          <Button size="sm" className="ml-4 animate-scale-in">
            Iniciar Sesión
          </Button>
        </nav>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden"
          aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Mobile Navigation */}
      <div
        className={cn(
          "fixed inset-0 top-[57px] bg-background/95 backdrop-blur-sm md:hidden transition-transform duration-300 ease-in-out z-40",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <nav className="flex flex-col p-6 space-y-2 animate-fade-in">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => cn(
                "flex items-center py-3 px-4 rounded-lg transition-colors duration-200",
                isActive 
                  ? "bg-primary/10 text-primary font-medium" 
                  : "text-foreground hover:bg-muted"
              )}
            >
              <item.icon className="w-5 h-5 mr-3" />
              {item.label}
            </NavLink>
          ))}
          <div className="pt-4 mt-4 border-t border-border">
            <Button className="w-full" size="lg">
              Iniciar Sesión
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
