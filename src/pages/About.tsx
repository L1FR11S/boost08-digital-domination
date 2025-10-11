import Layout from "@/components/Layout";
import MetricsWall from "@/components/MetricsWall";
import IntegrationSection from "@/components/IntegrationSection";
import TrustBadges from "@/components/TrustBadges";
import { Button } from "@/components/ui/button";

const About = () => {
  return (
    <Layout
      title="Om Oss - Boost08"
      description="Vi hjälper svenska företag bli synliga lokalt. Läs mer om vår mission och vad som gör oss annorlunda."
    >
      <section className="pt-32 pb-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
              Vi hjälper svenska företag bli synliga lokalt
            </h1>
            <p className="text-xl text-muted-foreground">
              Vår mission är att göra lokal tillväxt tillgänglig för alla
            </p>
          </div>

          <div className="max-w-3xl mx-auto mb-16">
            <div className="bg-card border border-border rounded-2xl p-8 mb-8">
              <h2 className="text-2xl font-bold mb-4">Vår Historia</h2>
              <p className="text-muted-foreground mb-4">
                Vi såg att svenska företag behövde en enkel, kraftfull lösning för att hantera sin digitala närvaro. 
                Internationella verktyg förstod inte den svenska marknaden, och manuell hantering var för tidskrävande.
              </p>
              <p className="text-muted-foreground">
                Därför skapade vi Boost08 - en intelligent tillväxtplattform byggd för svenska företag.
              </p>
            </div>

            <div className="bg-card border border-border rounded-2xl p-8 mb-12">
              <h2 className="text-2xl font-bold mb-4">Vad som gör oss annorlunda</h2>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2 mr-3 flex-shrink-0" />
                  <div>
                    <strong className="text-foreground">Support på svenska</strong>
                    <p className="text-muted-foreground">Vi förstår svenska affärer</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2 mr-3 flex-shrink-0" />
                  <div>
                    <strong className="text-foreground">Lokal expertis</strong>
                    <p className="text-muted-foreground">Byggt för svenska marknaden</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2 mr-3 flex-shrink-0" />
                  <div>
                    <strong className="text-foreground">Data-driven resultat</strong>
                    <p className="text-muted-foreground">Konkreta metrics, inga tomma ord</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2 mr-3 flex-shrink-0" />
                  <div>
                    <strong className="text-foreground">Transparens</strong>
                    <p className="text-muted-foreground">Inga dolda avgifter eller lock-in</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <MetricsWall />
          
          <div className="my-16">
            <TrustBadges />
          </div>

          <IntegrationSection />

          <div className="text-center mt-16">
            <h2 className="text-2xl font-bold mb-4">Vill du veta mer?</h2>
            <p className="text-muted-foreground mb-6">Boka ett möte med oss</p>
            <Button variant="hero" size="lg">Boka Möte</Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
