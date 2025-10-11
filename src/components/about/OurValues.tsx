import { CheckCircle2, Shield, TrendingUp, Users } from "lucide-react";

const OurValues = () => {
  const values = [
    {
      icon: Users,
      title: "Support på svenska",
      description: "Vi förstår svenska affärer och är alltid här för att hjälpa er"
    },
    {
      icon: TrendingUp,
      title: "Lokal expertis",
      description: "Byggt specifikt för svenska marknaden och lokala behov"
    },
    {
      icon: CheckCircle2,
      title: "Data-driven resultat",
      description: "Konkreta metrics och mätbara resultat, inga tomma ord"
    },
    {
      icon: Shield,
      title: "Transparens",
      description: "Inga dolda avgifter eller lock-in. GDPR-kompatibelt"
    }
  ];

  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Vad som gör oss annorlunda
            </h2>
            <p className="text-xl text-muted-foreground">
              Vi är inte bara ett verktyg - vi är er partner för lokal tillväxt
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div 
                  key={index}
                  className="p-8 bg-background rounded-2xl border border-border"
                >
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                    <Icon className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurValues;
