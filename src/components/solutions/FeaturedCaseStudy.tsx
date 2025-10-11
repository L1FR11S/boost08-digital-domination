import { Button } from "@/components/ui/button";
import { ArrowRight, Quote } from "lucide-react";

interface CaseStudy {
  company: string;
  industry: string;
  quote: string;
  author: string;
  role: string;
  results: string[];
  slug: string;
}

interface FeaturedCaseStudyProps {
  caseStudy: CaseStudy;
}

const FeaturedCaseStudy = ({ caseStudy }: FeaturedCaseStudyProps) => {
  return (
    <section className="py-24 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
              Kundcase
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Så lyckades {caseStudy.company}
            </h2>
          </div>
          
          <div className="bg-background rounded-2xl p-8 lg:p-12 border border-border shadow-card">
            <div className="flex gap-2 mb-6">
              <span className="inline-block bg-muted text-muted-foreground px-3 py-1 rounded-full text-sm">
                {caseStudy.industry}
              </span>
            </div>
            
            <div className="mb-8">
              <Quote className="h-8 w-8 text-primary mb-4" />
              <blockquote className="text-xl italic text-foreground mb-4">
                "{caseStudy.quote}"
              </blockquote>
              <div>
                <div className="font-semibold">{caseStudy.author}</div>
                <div className="text-sm text-muted-foreground">{caseStudy.role}</div>
              </div>
            </div>
            
            <div className="grid sm:grid-cols-3 gap-6 mb-8">
              {caseStudy.results.map((result, index) => (
                <div key={index} className="text-center p-4 bg-muted/50 rounded-xl">
                  <div className="text-2xl font-bold text-primary mb-1">
                    {result.split(' ')[0]}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {result.split(' ').slice(1).join(' ')}
                  </div>
                </div>
              ))}
            </div>
            
            <Button variant="outline" size="lg" className="w-full sm:w-auto group">
              Läs Hela Historien
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCaseStudy;
