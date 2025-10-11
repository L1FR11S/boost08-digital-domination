import Layout from "@/components/Layout";
import { Link } from "react-router-dom";
import { TrendingUp, Filter } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const ResultsOverview = () => {
  const [selectedIndustry, setSelectedIndustry] = useState("all");

  const cases = [
    {
      company: "Vårdcentral i Malmö",
      industry: "Kliniker & Vård",
      challenge: "Negativa recensioner och felaktig information på Google",
      results: [
        { metric: "+89%", label: "Fler visningar" },
        { metric: "4.8★", label: "Snittbetyg" },
        { metric: "0", label: "Fel uppgifter" }
      ],
      slug: "vardcentral-malmo"
    },
    {
      company: "Restaurangkedja i Stockholm",
      industry: "Restauranger & Caféer",
      challenge: "Problem med negativa recensioner och ingen tid att svara",
      results: [
        { metric: "+47%", label: "Fler recensioner" },
        { metric: "4.8★", label: "Genomsnitt" },
        { metric: "500+", label: "Svar genererade" }
      ],
      slug: "restaurang-stockholm"
    },
    {
      company: "Skönhetssalong i Göteborg",
      industry: "Skönhetssalonger & Spa",
      challenge: "Sporadisk posting och låg räckvidd på sociala medier",
      results: [
        { metric: "+156%", label: "Räckvidd" },
        { metric: "3x", label: "Engagement" },
        { metric: "10h/v", label: "Sparade" }
      ],
      slug: "skonhetssalong-goteborg"
    },
    {
      company: "Tandläkare i Uppsala",
      industry: "Kliniker & Vård",
      challenge: "Rankade på sida 3 i Google för viktiga sökningar",
      results: [
        { metric: "+120%", label: "Visningar" },
        { metric: "Top 3", label: "Ranking" },
        { metric: "+67%", label: "Nya patienter" }
      ],
      slug: "tandlakare-uppsala"
    },
    {
      company: "Butikskedja med 12 Platser",
      industry: "Butikskedjor",
      challenge: "Inkonsekvent information över alla butiker",
      results: [
        { metric: "+43%", label: "Besökare" },
        { metric: "25h/v", label: "Sparade" },
        { metric: "100%", label: "Korrekt info" }
      ],
      slug: "butikskedja-12"
    },
    {
      company: "Café med 3 Verksamheter",
      industry: "Restauranger & Caféer",
      challenge: "Svårt att hålla information uppdaterad och recensioner besvarade",
      results: [
        { metric: "+34%", label: "Besökare" },
        { metric: "12h/v", label: "Sparade" },
        { metric: "4.6★", label: "Snittbetyg" }
      ],
      slug: "cafe-tre"
    }
  ];

  const industries = ["all", "Kliniker & Vård", "Restauranger & Caféer", "Skönhetssalonger & Spa", "Butikskedjor"];

  const filteredCases = selectedIndustry === "all" 
    ? cases 
    : cases.filter(c => c.industry === selectedIndustry);

  return (
    <Layout
      title="Resultat & Kundcase - Boost08"
      description="Se hur andra företag växer med Boost08. Verkliga resultat från verkliga företag."
    >
      <section className="pt-32 pb-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <span className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
                Success Stories
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
                Verkliga resultat från verkliga företag
              </h1>
              <p className="text-xl text-muted-foreground">
                Se hur andra företag växer med Boost08
              </p>
            </div>

            {/* Filter */}
            <div className="flex items-center gap-3 mb-12 flex-wrap justify-center">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Filtrera:</span>
              {industries.map((industry) => (
                <Button
                  key={industry}
                  variant={selectedIndustry === industry ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedIndustry(industry)}
                >
                  {industry === "all" ? "Alla Branscher" : industry}
                </Button>
              ))}
            </div>

            {/* Case Studies Grid */}
            <div className="grid lg:grid-cols-2 gap-8">
              {filteredCases.map((caseStudy, index) => (
                <Link
                  key={index}
                  to={`/resultat/${caseStudy.slug}`}
                  className="group"
                >
                  <div className="h-full p-8 bg-card rounded-2xl border border-border hover:border-primary/50 transition-all hover:shadow-card">
                    <div className="flex items-start justify-between mb-4">
                      <span className="inline-block bg-muted text-muted-foreground px-3 py-1 rounded-full text-xs font-medium">
                        {caseStudy.industry}
                      </span>
                      <TrendingUp className="h-5 w-5 text-success" />
                    </div>

                    <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                      {caseStudy.company}
                    </h3>

                    <p className="text-muted-foreground mb-6">
                      {caseStudy.challenge}
                    </p>

                    <div className="grid grid-cols-3 gap-4">
                      {caseStudy.results.map((result, i) => (
                        <div key={i} className="text-center p-3 bg-muted/50 rounded-lg">
                          <div className="text-xl font-bold text-primary mb-1">
                            {result.metric}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {result.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ResultsOverview;
