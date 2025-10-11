import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface CTASectionProps {
  title: string;
  subtitle?: string;
  ctaText: string;
  ctaVariant?: "default" | "hero" | "outline" | "secondary";
}

const CTASection = ({ 
  title, 
  subtitle, 
  ctaText,
  ctaVariant = "hero" 
}: CTASectionProps) => {
  return (
    <section className="py-24 bg-gradient-to-br from-primary/10 via-accent to-secondary/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-primary to-secondary rounded-3xl p-12 text-center shadow-card">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              {title}
            </h2>
            {subtitle && (
              <p className="text-lg text-white/90 mb-8">
                {subtitle}
              </p>
            )}
            <Button 
              variant={ctaVariant}
              size="lg"
              className="bg-white hover:bg-white/90 text-primary font-bold text-lg px-12 group"
            >
              {ctaText}
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
