import Layout from "@/components/Layout";
import { Link } from "react-router-dom";
import { MapPin, Star, Share2, BarChart3, ArrowRight } from "lucide-react";

const SolutionsOverview = () => {
  const solutions = [
    {
      icon: MapPin,
      title: "Smart Närvarohantering",
      description: "Automatisk synkronisering av 500+ datafält över alla plattformar. Var synlig överallt där dina kunder söker.",
      link: "/losningar/smart-narvarohantering",
      benefits: ["50+ plattformar", "Bulk-uppdateringar", "AI-optimering"]
    },
    {
      icon: Star,
      title: "Intelligent Rykteshantering",
      description: "AI-drivna recensionssvar som låter naturliga. Förvandla recensioner till din tillväxtmotor.",
      link: "/losningar/intelligent-rykteshantering",
      benefits: ["AI-svar", "Automatiska kampanjer", "Sentimentanalys"]
    },
    {
      icon: Share2,
      title: "Social Media-automatisering",
      description: "AI-genererat innehåll anpassat för varje företag. Spara 10+ timmar/vecka med bättre resultat.",
      link: "/losningar/social-media-automatisering",
      benefits: ["AI-innehåll", "Flerkanalspublicering", "Automatisk schemaläggning"]
    },
    {
      icon: BarChart3,
      title: "Lokalt SEO-dominans",
      description: "Grannskapsbaserad rankingspårning och hyperlokala SEO-insikter. Dominera dina lokala sökningar.",
      link: "/losningar/lokalt-seo",
      benefits: ["Grannskapsbaserad spårning", "Konkurrentanalys", "Automatisk optimering"]
    }
  ];

  return (
    <Layout
      title="Lösningar - Boost08"
      description="Upptäck Boost08s fyra kärnpelare för lokal tillväxt: Smart närvarohantering, intelligent rykteshantering, social media-automatisering och lokalt SEO."
    >
      <section className="pt-32 pb-24 bg-gradient-hero">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
              Fyra pelare för lokal tillväxt
            </h1>
            <p className="text-xl text-muted-foreground">
              Allt du behöver för att dominera din lokala marknad - på en intelligent plattform
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {solutions.map((solution, index) => (
              <div
                key={index}
                className="p-8 rounded-2xl bg-card border border-border shadow-card hover:shadow-soft transition-all"
              >
                <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                  <solution.icon className="w-8 h-8 text-primary" />
                </div>
                <h2 className="text-2xl font-bold mb-3 text-foreground">
                  {solution.title}
                </h2>
                <p className="text-muted-foreground mb-6">{solution.description}</p>
                <ul className="space-y-2 mb-6">
                  {solution.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-center text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mr-2" />
                      {benefit}
                    </li>
                  ))}
                </ul>
                <Link
                  to={solution.link}
                  className="inline-flex items-center text-primary font-semibold hover:underline"
                >
                  Läs mer
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default SolutionsOverview;
