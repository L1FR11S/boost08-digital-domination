import { Globe, MessageSquare, Zap, TrendingUp } from "lucide-react";

const ValuePropGrid = () => {
  const benefits = [
    {
      icon: Globe,
      title: "Automatisk Närvaro",
      description: "500+ datafält synkroniserade över alla plattformar"
    },
    {
      icon: MessageSquare,
      title: "Intelligent Recensionshantering",
      description: "AI-drivna svar som låter autentiska och professionella"
    },
    {
      icon: Zap,
      title: "Social Media på Autopilot",
      description: "AI-genererat innehåll anpassat för er målgrupp"
    },
    {
      icon: TrendingUp,
      title: "Lokalt SEO-dominans",
      description: "Grannskapsbaserad rankingspårning och optimering"
    }
  ];

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="text-center p-6 rounded-xl bg-card border border-border hover:shadow-card transition-shadow"
            >
              <div className="w-12 h-12 mx-auto mb-4 rounded-lg bg-primary/10 flex items-center justify-center">
                <benefit.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-foreground">{benefit.title}</h3>
              <p className="text-sm text-muted-foreground">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ValuePropGrid;
