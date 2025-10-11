import Layout from "@/components/Layout";
import { Link } from "react-router-dom";
import { TrendingUp } from "lucide-react";

const ResultsOverview = () => {
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
    <Layout
      title="Resultat & Kundcase - Boost08"
      description="Se hur andra företag växer med Boost08. Verkliga resultat från verkliga företag."
    >
      <section className="pt-32 pb-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
              Verkliga resultat från verkliga företag
            </h1>
            <p className="text-xl text-muted-foreground">
              Se hur andra företag växer med Boost08
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
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
                <p className="text-muted-foreground">{caseStudy.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ResultsOverview;
