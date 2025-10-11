import { Link } from "react-router-dom";
import { ArrowRight, TrendingUp } from "lucide-react";

const SocialProofHighlights = () => {
  const cases = [
    {
      industry: "Restaurangkedja",
      metric: "+47%",
      description: "fler recensioner på 3 månader",
      slug: "restaurang-kedja-47-fler-recensioner"
    },
    {
      industry: "Kliniknätverk",
      metric: "+120%",
      description: "ökning i Google Maps-visningar",
      slug: "klinik-natverk-120-fler-visningar"
    },
    {
      industry: "Skönhetssalong",
      metric: "+89%",
      description: "ökning i lokala sökningar",
      slug: "skönhetssalong-89-okning-lokala-sokningar"
    }
  ];

  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Verkliga resultat från verkliga företag
          </h2>
          <p className="text-lg text-muted-foreground">
            Se hur andra företag växer med Boost08
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {cases.map((caseStudy, index) => (
            <Link
              key={index}
              to={`/resultat/${caseStudy.slug}`}
              className="group p-8 rounded-2xl bg-card border border-border hover:shadow-card hover:border-primary/50 transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <span className="text-sm font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">
                  {caseStudy.industry}
                </span>
                <TrendingUp className="w-5 h-5 text-success" />
              </div>
              <div className="text-4xl font-bold text-primary mb-2">
                {caseStudy.metric}
              </div>
              <p className="text-muted-foreground mb-4">{caseStudy.description}</p>
              <div className="flex items-center text-sm font-medium text-primary">
                Läs fallstudie
                <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center">
          <Link
            to="/resultat"
            className="inline-flex items-center text-primary font-semibold hover:underline"
          >
            Se alla kundcase
            <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SocialProofHighlights;
