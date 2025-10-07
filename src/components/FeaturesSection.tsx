const FeaturesSection = () => {
  const features = [
    {
      badge: "Listning",
      title: "Smart Automatisering",
      subtitle: "Som Driver Lokal Tillväxt.",
      description: "Säkra er lokala närvaro och locka fler kunder – med mindre ansträngning än någonsin.",
      benefits: [
        "Automatiska uppdateringar av era företagsuppgifter online.",
        "Säkerställ korrekt information på över 50+ plattformar.",
        "Höj er ranking i lokala sökresultat."
      ]
    },
    {
      badge: "Recensioner",
      title: "Bygg förtroende med smart",
      subtitle: "recensionshantering.",
      description: "Goda omdömen är avgörande för nya kunder. Med Boost08 kan ni enkelt samla in, övervaka och proaktivt svara på recensioner från en enda plattform – direkt från era nöjda kunder.",
      benefits: [
        "Samla in fler positiva recensioner automatiskt",
        "Övervaka omdömen i realtid på alla viktiga sajter.",
        "Förbättra ert online-rykte och attrahera nya kunder."
      ]
    },
    {
      badge: "Analytics",
      title: "Få full kontroll med kraftfulla insikter",
      description: "Fatta smartare beslut med Boost08:s intuitiva instrumentpanel. Få en tydlig översikt över er lokala synlighet, era kundbeteenden och viktig statistik – allt samlat på ett ställe.",
      benefits: [
        "Övervaka er lokal SEO-prestation.",
        "Spåra recensionstrender och kundfeedback.",
        "Identifiera områden för tillväxt och optimering."
      ]
    }
  ];

  return (
    <section id="tjanster" className="py-20 bg-accent/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block bg-foreground text-background px-6 py-2 rounded-full text-sm font-medium mb-6">
            Lösning
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            Boost08: <span className="text-primary">Smart Automatisering</span><br />
            Som Driver Lokal Tillväxt.
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Säkra er lokala närvaro och locka fler kunder<br />
            – med mindre ansträngning än någonsin.
          </p>
        </div>

        <div className="space-y-24">
          {features.map((feature, index) => (
            <div 
              key={index}
              className={`grid md:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}
            >
              <div className={index % 2 === 1 ? 'md:order-2' : ''}>
                <span className="inline-block bg-primary/10 text-primary px-4 py-1 rounded-full text-sm font-medium mb-6">
                  {feature.badge}
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold mb-2">
                  {feature.title}
                </h3>
                {feature.subtitle && (
                  <h4 className="text-2xl sm:text-3xl font-bold mb-6 text-primary">
                    {feature.subtitle}
                  </h4>
                )}
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {feature.description}
                </p>
                <ul className="space-y-3">
                  {feature.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="text-primary mt-1">✓</span>
                      <span className="text-foreground">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className={index % 2 === 1 ? 'md:order-1' : ''}>
                <div className="bg-primary/10 rounded-2xl p-8 aspect-video flex items-center justify-center">
                  <div className="text-6xl">📊</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
