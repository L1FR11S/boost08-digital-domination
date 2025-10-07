const HowItWorks = () => {
  const steps = [
    {
      icon: "🎯",
      title: "Skapa enkelt era befintliga företagsprofiler (t.ex. Google Business Profile) till Boost08. Vi hjälper er att synkronisera all grundinformation."
    },
    {
      icon: "✏️",
      title: "Boost08 tar över och hålla listningar era företag på över 50 plattformar och sämre ni samtal övervaka era recensioner dagen runt."
    },
    {
      icon: "📈",
      title: "Vi är-denna ledarställ arbetad kaffe erad och översiktlig ifrån och vad kunderna era intuitiv dashboard. Fatta datadrivna beslut för fortsatt tillväxt."
    },
    {
      icon: "📊",
      title: "Få en tydlig översikt över er prestanda och vad omdömen era intuitiv dashboard. Fatta datadrivna beslut för fortsatt tillväxt."
    }
  ];

  return (
    <section className="py-20 bg-background">
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
          {steps.map((step, index) => (
            <div 
              key={index}
              className="bg-card border border-primary/20 rounded-2xl p-6 text-center hover:shadow-soft transition-shadow"
            >
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">
                {step.icon}
              </div>
              <p className="text-sm text-foreground leading-relaxed">{step.title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
