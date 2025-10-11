import { Link } from "react-router-dom";
import { Stethoscope, Sparkles, ShoppingBag, Utensils } from "lucide-react";

const IndustryShowcase = () => {
  const industries = [
    {
      icon: Stethoscope,
      title: "Kliniker & Vård",
      description: "Hjälp fler patienter hitta er",
      link: "/bransch/kliniker-vard"
    },
    {
      icon: Sparkles,
      title: "Skönhetssalonger",
      description: "Fyll er kalender med bokningar",
      link: "/bransch/skonhetssalonger"
    },
    {
      icon: ShoppingBag,
      title: "Butikskedjor",
      description: "Hantera alla butiker från en plattform",
      link: "/bransch/butikskedjor"
    },
    {
      icon: Utensils,
      title: "Restauranger",
      description: "Fler bord bokade automatiskt",
      link: "/bransch/restauranger-cafeer"
    }
  ];

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Oavsett bransch
          </h2>
          <p className="text-lg text-muted-foreground">
            Vi anpassar lösningen efter din bransch och dina behov
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {industries.map((industry, index) => (
            <Link
              key={index}
              to={industry.link}
              className="group text-center p-6 rounded-xl bg-card border border-border hover:shadow-card hover:border-primary/50 transition-all"
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                <industry.icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-foreground group-hover:text-primary transition-colors">
                {industry.title}
              </h3>
              <p className="text-sm text-muted-foreground">{industry.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default IndustryShowcase;
