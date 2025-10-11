import { Link } from "react-router-dom";
import { MapPin, Star, Share2, BarChart3, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";

const SolutionTeasers = () => {
  const solutions = [
    {
      icon: MapPin,
      title: "Smart Närvarohantering",
      description: "Var synlig överallt där dina kunder söker - automatiskt",
      link: "/losningar/smart-narvarohantering",
      color: "from-blue-500/10 to-cyan-500/10"
    },
    {
      icon: Star,
      title: "Intelligent Rykteshantering",
      description: "Förvandla recensioner till tillväxtmotorn för ert företag",
      link: "/losningar/intelligent-rykteshantering",
      color: "from-purple-500/10 to-pink-500/10"
    },
    {
      icon: Share2,
      title: "Social Media-automatisering",
      description: "Spara 10+ timmar/vecka på sociala medier med bättre resultat",
      link: "/losningar/social-media-automatisering",
      color: "from-green-500/10 to-emerald-500/10"
    },
    {
      icon: BarChart3,
      title: "Lokalt SEO-dominans",
      description: "Dominera lokala sökningar i er stad och grannskaper",
      link: "/losningar/lokalt-seo",
      color: "from-orange-500/10 to-red-500/10"
    }
  ];

  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Fyra pelare för lokal tillväxt
          </h2>
          <p className="text-lg text-muted-foreground">
            Allt du behöver för att dominera din lokala marknad - på en plattform
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {solutions.map((solution, index) => (
            <Link
              key={index}
              to={solution.link}
              className="group block p-8 rounded-2xl bg-card border border-border hover:shadow-card transition-all hover:-translate-y-1"
            >
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${solution.color} flex items-center justify-center mb-4`}>
                <solution.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-foreground group-hover:text-primary transition-colors">
                {solution.title}
              </h3>
              <p className="text-muted-foreground mb-4">{solution.description}</p>
              <div className="flex items-center text-primary font-medium">
                Läs mer
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SolutionTeasers;
