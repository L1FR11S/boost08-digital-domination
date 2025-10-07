import { Button } from "@/components/ui/button";

const FinalCTA = () => {
  return (
    <section className="py-24 bg-gradient-to-br from-primary/10 via-accent to-secondary/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-primary to-secondary rounded-3xl p-12 text-center shadow-card">
            <span className="inline-block bg-foreground text-background px-6 py-2 rounded-full text-sm font-medium mb-6">
              Börja bli synlig idag!
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Redo att få fler kunder – automatiskt?
            </h2>
            <p className="text-lg text-white/90 mb-8">
              Över + 2,000 lokala företag visar snabbare än någonsin tack vare Boost08.
            </p>
            <Button 
              variant="secondary" 
              size="lg"
              className="bg-white hover:bg-white/90 text-secondary font-bold text-lg px-12"
            >
              Ja, jag är redo!
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
