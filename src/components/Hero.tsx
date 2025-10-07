import { Button } from "@/components/ui/button";
import dashboardImage from "@/assets/dashboard-hero.png";
import logo from "@/assets/logo.png";
import { useEffect, useRef, useState } from "react";

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (imageRef.current) {
      observer.observe(imageRef.current);
    }

    return () => {
      if (imageRef.current) {
        observer.unobserve(imageRef.current);
      }
    };
  }, []);

  return (
    <section className="pt-32 pb-20 bg-gradient-hero overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <div className="mb-8 flex justify-center">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-soft">
              <img src={logo} alt="Boost08" className="w-12 h-12 rounded-xl" />
            </div>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Maximera er lokala <span className="text-primary">kundtillväxt</span>
            <br />
            med <span className="text-primary">smart</span> automatisering
          </h1>

          <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            <strong>Boost08</strong> säkrar er synlighet i <strong>Svenska</strong> lokala sökningar, hanterar recensioner
            och optimerar företagsuppgifter för varje fysisk plats – helt automatiskt.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="hero" size="lg" className="w-full sm:w-auto text-base px-8">
              Boka En Kostnadsfri Demo
            </Button>
            <Button variant="default" size="lg" className="w-full sm:w-auto text-base px-8">
              Hur Funkar Boost08?
            </Button>
          </div>
        </div>

        <div 
          ref={imageRef}
          className={`relative max-w-5xl mx-auto transition-all duration-1000 ${
            isVisible 
              ? 'translate-y-0 opacity-100' 
              : 'translate-y-20 opacity-0'
          }`}
        >
          <div className="rounded-2xl overflow-hidden shadow-card border border-border bg-white p-4">
            <img 
              src={dashboardImage} 
              alt="Boost08 Dashboard" 
              className="w-full rounded-lg"
            />
          </div>
        </div>

        <div className="mt-16 text-center">
          <p className="text-foreground font-medium mb-4">
            Rekommenderas av + 2,000 nöjda företag & kedjor världen över!
          </p>
          <div className="flex items-center justify-center gap-2">
            {[...Array(5)].map((_, i) => (
              <span key={i} className="text-secondary text-2xl">⭐</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
