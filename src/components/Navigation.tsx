import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";
import { useState, useEffect } from "react";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border transition-all duration-300 ${
      isScrolled ? "shadow-card py-2" : "py-0"
    }`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <img src={logo} alt="Boost08 Logo" className="w-8 h-8" />
            <span className="text-xl font-bold">BOOST<sup className="text-sm">08</sup></span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <a href="#tjanster" className="text-foreground hover:text-primary transition-colors">
              Tjänster
            </a>
            <a href="#kundnytta" className="text-foreground hover:text-primary transition-colors">
              Kundnytta
            </a>
            <a href="#kontakt" className="text-foreground hover:text-primary transition-colors">
              Kontakt
            </a>
          </div>

          <div className="flex items-center space-x-4">
            <Button variant="ghost" className="hidden sm:inline-flex">
              Logga in
            </Button>
            <Button 
              variant="hero" 
              size={isScrolled ? "default" : "lg"}
              className={`transition-all duration-300 ${isScrolled ? "shadow-glow" : ""}`}
            >
              Boka Demo
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
