import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface SolutionHeroProps {
  badge: string;
  title: string;
  subtitle: string;
  image?: string;
  ctaText?: string;
}

const SolutionHero = ({ 
  badge, 
  title, 
  subtitle, 
  image, 
  ctaText = "Boka Demo" 
}: SolutionHeroProps) => {
  return (
    <section className="pt-32 pb-16 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <span className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
                {badge}
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
                {title}
              </h1>
              <p className="text-xl text-muted-foreground">
                {subtitle}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="hero" size="lg" className="group">
                  {ctaText}
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
              <p className="text-sm text-muted-foreground">
                Ingen bindningstid • Setup på 5 min • GDPR-säkert
              </p>
            </div>
            {image && (
              <div className="relative">
                <img 
                  src={image} 
                  alt={title}
                  className="rounded-2xl shadow-card w-full"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolutionHero;
