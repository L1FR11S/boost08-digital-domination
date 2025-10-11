import { Button } from "@/components/ui/button";
import { ArrowRight, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

interface CaseStudy {
  company: string;
  description: string;
  results: { metric: string; label: string }[];
  slug: string;
}

interface IndustryCaseStudiesProps {
  cases: CaseStudy[];
}

const IndustryCaseStudies = ({ cases }: IndustryCaseStudiesProps) => {
  return (
    <section className="py-24 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
              Success Stories
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Verkliga Resultat från Branschen
            </h2>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-8">
            {cases.map((caseStudy, index) => (
              <div 
                key={index}
                className="p-8 bg-background rounded-2xl border border-border shadow-card"
              >
                <h3 className="text-2xl font-bold mb-3">{caseStudy.company}</h3>
                <p className="text-muted-foreground mb-6">{caseStudy.description}</p>
                
                <div className="grid grid-cols-3 gap-4 mb-6">
                  {caseStudy.results.map((result, i) => (
                    <div key={i} className="text-center p-4 bg-muted/50 rounded-xl">
                      <div className="flex items-center justify-center gap-1 mb-1">
                        <TrendingUp className="h-4 w-4 text-success" />
                        <div className="text-xl font-bold text-primary">
                          {result.metric}
                        </div>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {result.label}
                      </div>
                    </div>
                  ))}
                </div>
                
                <Link to={`/resultat/${caseStudy.slug}`}>
                  <Button variant="outline" className="w-full group">
                    Läs Hela Historien
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default IndustryCaseStudies;
