const TrustBar = () => {
  const customers = [
    "Google Partner",
    "ISO Certifierad",
    "2000+ Kunder",
    "GDPR Compliant"
  ];

  return (
    <div className="py-12 border-y border-border bg-card/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-sm text-muted-foreground mb-6">
          Betrodd av företag i alla storlekar
        </p>
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
          {customers.map((customer, index) => (
            <div
              key={index}
              className="text-foreground font-semibold text-sm opacity-60 hover:opacity-100 transition-opacity"
            >
              {customer}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrustBar;
