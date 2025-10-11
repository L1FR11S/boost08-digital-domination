import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface IndustryHeroProps {
  badge: string;
  title: string;
  subtitle: string;
  image?: string;
}

const IndustryHero = ({ badge, title, subtitle, image }: IndustryHeroProps) => {
  return (
    <section className="pt-32 pb-16 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <span className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
                {badge}
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                {title}
              </h1>
              <p className="text-xl text-muted-foreground">
                {subtitle}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="hero" size="lg" className="group">
                  Boka Bransch-Demo
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
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

export default IndustryHero;
