import TrackableCTA from "@/components/analytics/TrackableCTA";

const FinalCTA = () => {
  return (
    <section className="py-24 bg-gradient-to-br from-primary/10 via-accent to-secondary/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-primary to-secondary rounded-3xl p-12 text-center shadow-card">
            <span className="inline-block bg-foreground text-background px-6 py-2 rounded-full text-sm font-medium mb-6">
              Bli synlig idag!
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Redo att få fler kunder – automatiskt?
            </h2>
            <p className="text-lg text-white/90 mb-8">
              Över 2,000 lokala företag växer snabbare än någonsin tack vare Boost08.
            </p>
            <TrackableCTA
              ctaText="Ja, jag är redo!"
              location="final_cta"
              variant="secondary" 
              size="lg"
              className="bg-white hover:bg-white/90 text-secondary font-bold text-lg px-12"
              onClick={() => window.open('https://zcal.co/boost08', '_blank')}
            >
              Ja, jag är redo!
            </TrackableCTA>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
