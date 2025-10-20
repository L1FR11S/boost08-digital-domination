import TrackableCTA from "@/components/analytics/TrackableCTA";
import { ArrowRight } from "lucide-react";

interface HealthcareHeroProps {
  image?: string;
}

const HealthcareHero = ({ image }: HealthcareHeroProps) => {
  return (
    <section className="pt-32 pb-16 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <span className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
                För Kliniker & Vård
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                Hjälp fler patienter hitta er
                <br />
                <span className="text-primary">utan extra marknads­föringskostnader</span>
              </h1>
              <p className="text-xl text-muted-foreground">
                Automatisera er digitala närvaro och få fler patienter genom lokala sökningar
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <TrackableCTA
                  ctaText="Boka Bransch-Demo"
                  location="healthcare_hero"
                  variant="hero"
                  size="lg"
                  className="group"
                  onClick={() => window.open('https://zcal.co/boost08', '_blank')}
                >
                  Boka Bransch-Demo
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </TrackableCTA>
              </div>
              <p className="text-sm text-muted-foreground">
                Ingen bindningstid • GDPR-säkert • Specialiserat för vårdgivare
              </p>
            </div>
            {image && (
              <div className="relative">
                <img 
                  src={image} 
                  alt="Boost08 Dashboard för vårdgivare"
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

export default HealthcareHero;
