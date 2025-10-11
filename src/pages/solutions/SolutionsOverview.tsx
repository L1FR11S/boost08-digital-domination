import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { ArrowRight, Globe, MessageSquare, Sparkles, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const SolutionsOverview = () => {
  const solutions = [
    {
      icon: Globe,
      badge: "Närvaro",
      title: "Smart Närvarohantering",
      description: "Var synlig överallt där dina kunder söker - automatiskt",
      benefits: ["500+ datafält synkroniserade", "50+ plattformar", "10 tim/mån sparade"],
      href: "/losningar/smart-narvarohantering"
    },
    {
      icon: MessageSquare,
      badge: "Rykte",
      title: "Intelligent Rykteshantering",
      description: "Förvandla recensioner till tillväxtmotorn för ert företag",
      benefits: ["+47% fler recensioner", "AI-drivna svar", "20 tim/mån sparade"],
      href: "/losningar/intelligent-rykteshantering"
    },
    {
      icon: Sparkles,
      badge: "Social Media",
      title: "Social Media-automatisering",
      description: "Spara 10+ timmar/vecka på sociala medier med bättre resultat",
      benefits: ["AI-genererat innehåll", "Multi-kanal publicering", "+156% räckvidd"],
      href: "/losningar/social-media-automatisering"
    },
    {
      icon: MapPin,
      badge: "SEO",
      title: "Lokalt SEO-dominans",
      description: "Dominera lokala sökningar i er stad och grannskaper",
      benefits: ["Grannskapsbaserad spårning", "+120% visningar", "Top 3 ranking"],
      href: "/losningar/lokalt-seo"
    }
  ];

  return (
    <Layout
      title="Våra Lösningar - Boost08"
      description="Fyra kärnpelare för att dominera er lokala marknad. Automatisera närvaro, recensioner, social media och lokalt SEO."
    >
      <section className="pt-32 pb-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <span className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
                Våra Lösningar
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
                Fyra kärnpelare för lokal tillväxt
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Allt ni behöver för att dominera er lokala marknad - automatiserat och intelligent
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 mb-16">
              {solutions.map((solution, index) => {
                const Icon = solution.icon;
                return (
                  <Link 
                    key={index}
                    to={solution.href}
                    className="group"
                  >
                    <div className="h-full p-8 bg-card rounded-2xl border border-border hover:border-primary/50 transition-all hover:shadow-card">
                      <div className="flex items-start gap-4 mb-6">
                        <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors flex-shrink-0">
                          <Icon className="h-7 w-7 text-primary" />
                        </div>
                        <div>
                          <span className="inline-block bg-muted text-muted-foreground px-3 py-1 rounded-full text-xs font-medium mb-2">
                            {solution.badge}
                          </span>
                          <h2 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">
                            {solution.title}
                          </h2>
                        </div>
                      </div>
                      
                      <p className="text-muted-foreground mb-6">
                        {solution.description}
                      </p>
                      
                      <div className="space-y-2 mb-6">
                        {solution.benefits.map((benefit, i) => (
                          <div key={i} className="flex items-center gap-2 text-sm">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                            <span>{benefit}</span>
                          </div>
                        ))}
                      </div>
                      
                      <div className="flex items-center text-primary font-semibold group-hover:gap-3 gap-2 transition-all">
                        Läs Mer
                        <ArrowRight className="h-4 w-4" />
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>

            <div className="bg-gradient-to-r from-primary to-secondary rounded-3xl p-12 text-center shadow-card">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Vill du se alla lösningar i praktiken?
              </h2>
              <p className="text-lg text-white/90 mb-8">
                Boka en demo så visar vi hur våra lösningar kan transformera ert företag
              </p>
              <Button 
                variant="secondary"
                size="lg"
                className="bg-white hover:bg-white/90 text-primary font-bold text-lg px-12 group"
              >
                Boka Demo
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default SolutionsOverview;
