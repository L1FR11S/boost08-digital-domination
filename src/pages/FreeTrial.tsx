import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Check } from "lucide-react";
import TrustBadges from "@/components/TrustBadges";

const FreeTrial = () => {
  return (
    <Layout
      title="Prova Gratis - Boost08"
      description="Starta din 14-dagars gratis testperiod. Ingen kreditkortsinformation krävs."
    >
      <section className="pt-32 pb-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl sm:text-5xl font-bold mb-6">
                Starta din 14-dagars gratis testperiod
              </h1>
            </div>

            <div className="grid lg:grid-cols-2 gap-12">
              {/* Left: Form */}
              <div>
                <div className="space-y-4 mb-6">
                  {[
                    "Ingen kreditkortsinformation krävs",
                    "Full tillgång till alla funktioner",
                    "Setup på 5 minuter",
                    "Svensk support inkluderat"
                  ].map((benefit, index) => (
                    <div key={index} className="flex items-center">
                      <Check className="w-5 h-5 text-success mr-3" />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>

                <form className="space-y-4 bg-card border border-border rounded-2xl p-8">
                  <div>
                    <Label htmlFor="company">Företagsnamn *</Label>
                    <Input id="company" placeholder="Mitt Företag AB" required />
                  </div>
                  <div>
                    <Label htmlFor="name">Ditt namn *</Label>
                    <Input id="name" placeholder="Anna Andersson" required />
                  </div>
                  <div>
                    <Label htmlFor="email">E-post *</Label>
                    <Input id="email" type="email" placeholder="anna@mittforetag.se" required />
                  </div>
                  <div>
                    <Label htmlFor="phone">Telefon</Label>
                    <Input id="phone" type="tel" placeholder="+46 70 123 45 67" />
                  </div>
                  <Button variant="hero" className="w-full" size="lg">
                    Starta Min Testperiod
                  </Button>
                </form>

                <div className="mt-8 p-6 bg-muted/30 rounded-xl">
                  <h3 className="font-semibold mb-4">Vad händer sen?</h3>
                  <ol className="space-y-3">
                    <li className="flex">
                      <span className="font-bold text-primary mr-3">1.</span>
                      <span>Skapa ditt konto (2 min)</span>
                    </li>
                    <li className="flex">
                      <span className="font-bold text-primary mr-3">2.</span>
                      <span>Anslut era profiler (3 min)</span>
                    </li>
                    <li className="flex">
                      <span className="font-bold text-primary mr-3">3.</span>
                      <span>Börja få resultat (samma dag)</span>
                    </li>
                  </ol>
                </div>
              </div>

              {/* Right: Trust section */}
              <div className="bg-card border border-border rounded-2xl p-8">
                <p className="text-2xl font-bold text-primary mb-6">
                  1,247 företag startade sin trial senaste månaden
                </p>
                
                <div className="space-y-6 mb-8">
                  <div className="p-4 bg-muted/30 rounded-lg">
                    <p className="text-sm text-muted-foreground mb-2">
                      "Enkel setup och kunde se resultat direkt första veckan!"
                    </p>
                    <p className="text-xs font-medium">— Maria, Skönhetssalong</p>
                  </div>
                  <div className="p-4 bg-muted/30 rounded-lg">
                    <p className="text-sm text-muted-foreground mb-2">
                      "Sparar oss flera timmar varje vecka. Värt varje krona."
                    </p>
                    <p className="text-xs font-medium">— Erik, Restaurangkedja</p>
                  </div>
                </div>

                <TrustBadges />
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default FreeTrial;
