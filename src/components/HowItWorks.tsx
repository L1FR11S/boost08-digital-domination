import { Target, Settings, ChartBar as BarChart, TrendingUp } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      Icon: Target,
      number: "01",
      title: "Anslut Era Profiler",
      description: "Koppla enkelt era befintliga företagsprofiler (t.ex. Google Business Profile) till Boost08. Vi hjälper er att synkronisera all grundinformation."
    },
    {
      Icon: Settings,
      number: "02",
      title: "Automatisk Optimering",
      description: "Boost08 tar över och håller era företagslistningar uppdaterade på över 50 plattformar samtidigt som vi övervaka era recensioner dygnet runt."
    },
    {
      Icon: BarChart,
      number: "03",
      title: "Övervaka & Analysera",
      description: "Få en tydlig översikt över er prestanda och alla omdömen via vår intuitiva dashboard. Identifiera möjligheter och förbättringsområden i realtid."
    },
    {
      Icon: TrendingUp,
      number: "04",
      title: "Väx Kontinuerligt",
      description: "Fatta datadrivna beslut för fortsatt tillväxt baserat på konkreta insikter och trender. Se er lokala synlighet öka månad för månad."
    }
  ];

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block bg-foreground text-background px-6 py-2 rounded-full text-sm font-medium mb-6">
            Hur Det Funkar
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Så här enkelt <span className="text-primary">optimerar</span> Boost08 er <span className="text-primary">lokala synlighet</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Vår plattform effektiviserar er lokala digitala närvaro<br />
            och säkerställer att ni alltid syns där era kunder letar.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {steps.map((step, index) => {
            const Icon = step.Icon;
            return (
              <div
                key={index}
                className="bg-card border border-primary/20 rounded-2xl p-8 hover:shadow-soft transition-all hover:-translate-y-1 relative"
              >
                <div className="absolute top-6 right-6 text-5xl font-bold text-primary/10">
                  {step.number}
                </div>
                <div className="w-14 h-14 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center mb-6">
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-3 text-left">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed text-left">{step.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
