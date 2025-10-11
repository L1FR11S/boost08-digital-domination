import { TrendingUp } from "lucide-react";

interface Benefit {
  metric: string;
  description: string;
}

interface BenefitsGridProps {
  benefits: Benefit[];
}

const BenefitsGrid = ({ benefits }: BenefitsGridProps) => {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Mätbara Resultat
            </h2>
            <p className="text-xl text-muted-foreground">
              Se vad våra kunder uppnår
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <div 
                key={index}
                className="p-6 bg-card rounded-2xl border border-border text-center hover:shadow-card transition-all"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-success/10 mb-4">
                  <TrendingUp className="h-6 w-6 text-success" />
                </div>
                <div className="text-3xl font-bold mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  {benefit.metric}
                </div>
                <p className="text-sm text-muted-foreground">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitsGrid;
