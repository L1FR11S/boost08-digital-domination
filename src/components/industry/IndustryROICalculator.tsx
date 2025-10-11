import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TrendingUp, Clock, Users } from "lucide-react";

interface ROIMetric {
  label: string;
  value: string;
  icon: React.ReactNode;
}

const IndustryROICalculator = ({ industry }: { industry: string }) => {
  const [locations, setLocations] = useState(1);
  const [monthlyReviews, setMonthlyReviews] = useState(10);
  
  // Calculations
  const timeSaved = locations * 12; // 12 hours per location per month
  const reviewsGenerated = monthlyReviews * 0.47; // 47% increase
  const visibilityIncrease = 89; // Average increase in visibility

  const metrics: ROIMetric[] = [
    {
      label: "Timmar Sparade/Månad",
      value: `${timeSaved}h`,
      icon: <Clock className="h-5 w-5 text-primary" />
    },
    {
      label: "Fler Recensioner/Månad",
      value: `+${Math.round(reviewsGenerated)}`,
      icon: <Users className="h-5 w-5 text-primary" />
    },
    {
      label: "Ökad Synlighet",
      value: `+${visibilityIncrease}%`,
      icon: <TrendingUp className="h-5 w-5 text-primary" />
    }
  ];

  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Räkna ut er ROI
            </h2>
            <p className="text-xl text-muted-foreground">
              Se vad Boost08 kan betyda för {industry}
            </p>
          </div>
          
          <div className="bg-background rounded-2xl p-8 border border-border shadow-card">
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div>
                <Label htmlFor="locations" className="mb-2 block">
                  Antal Platser/Kontor
                </Label>
                <Input
                  id="locations"
                  type="number"
                  min="1"
                  value={locations}
                  onChange={(e) => setLocations(Number(e.target.value))}
                  className="text-lg"
                />
              </div>
              
              <div>
                <Label htmlFor="reviews" className="mb-2 block">
                  Nuvarande Recensioner/Månad
                </Label>
                <Input
                  id="reviews"
                  type="number"
                  min="0"
                  value={monthlyReviews}
                  onChange={(e) => setMonthlyReviews(Number(e.target.value))}
                  className="text-lg"
                />
              </div>
            </div>
            
            <div className="mb-8 p-6 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-xl">
              <h3 className="text-lg font-semibold mb-4 text-center">
                Förväntade Resultat med Boost08
              </h3>
              <div className="grid md:grid-cols-3 gap-4">
                {metrics.map((metric, index) => (
                  <div key={index} className="text-center p-4 bg-background rounded-lg">
                    <div className="flex justify-center mb-2">
                      {metric.icon}
                    </div>
                    <div className="text-2xl font-bold text-primary mb-1">
                      {metric.value}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {metric.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="text-center">
              <Button variant="hero" size="lg">
                Boka Demo för att Komma Igång
              </Button>
              <p className="text-sm text-muted-foreground mt-4">
                Baserat på genomsnittliga resultat från {industry.toLowerCase()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IndustryROICalculator;
