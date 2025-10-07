const ProblemSection = () => {
  const problems = [
    {
      icon: "📧",
      title: "Svårt att synas lokalt?",
      description: "Nya kunder hittar inte er i sökningar på Google eller andra viktiga plattformar."
    },
    {
      icon: "📧",
      title: "Tappar ni viktiga recensioner?",
      description: "Det är svårt att samla in omdömen och hantera feedback på flera sajter."
    },
    {
      icon: "📧",
      title: "Slösar ni tid på felaktig info?",
      description: "Manuell uppdatering av företagsuppgifter tar tid och leder ofta till inkonsekvenser, vilket i sin tur leder till dålig synlighet online."
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-block bg-foreground text-background px-6 py-2 rounded-full text-sm font-medium mb-6">
            Problem
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            Känner du igen dig i dessa utmaningar?
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Att driva ett företag med fysiska platser kräver att ni syns rätt online. Men 
            det är tidskrävande och komplext att navigera i den digitala djungeln.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {problems.map((problem, index) => (
            <div 
              key={index}
              className="bg-card border border-border rounded-2xl p-8 hover:shadow-card transition-shadow"
            >
              <div className="text-4xl mb-4">{problem.icon}</div>
              <h3 className="text-xl font-bold mb-3">{problem.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{problem.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
