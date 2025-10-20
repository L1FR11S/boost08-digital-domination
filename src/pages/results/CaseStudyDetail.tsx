import Layout from "@/components/Layout";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Quote, TrendingUp, CheckCircle2 } from "lucide-react";
import CTASection from "@/components/shared/CTASection";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";

const CaseStudyDetail = () => {
  const { slug } = useParams();

  // Mock data - in production this would come from a CMS or API
  const caseStudies: Record<string, any> = {
    "vardcentral-malmo": {
      company: "Vårdcentral i Malmö",
      industry: "Kliniker & Vård",
      challenge: "Vårdcentralen kämpade med negativa recensioner om väntetider och felaktig information på Google Maps. Patienter ringde fel nummer och kom vid stängda tider.",
      solution: "Implementerade Smart Närvarohantering för korrekt information överallt och Intelligent Rykteshantering för professionella svar på alla recensioner.",
      results: [
        { metric: "+89%", label: "Fler visningar på Google Maps" },
        { metric: "4.8★", label: "Genomsnittligt betyg (från 4.1)" },
        { metric: "0", label: "Fel uppgifter online" },
        { metric: "15 tim/mån", label: "Sparad tid" }
      ],
      testimonial: {
        quote: "Tidigare fick vi klagomål varje vecka om fel öppettider. Nu är allt korrekt överallt och vi ser 89% fler visningar på Google Maps. Boost08 har varit en game-changer för oss.",
        author: "Maria Andersson",
        role: "Verksamhetschef"
      },
      implementation: [
        "Vecka 1: Setup av närvarohantering för alla mottagningar",
        "Vecka 2: Integration av recensionshantering",
        "Vecka 3-4: Optimering och anpassning",
        "Månad 2+: Kontinuerlig övervakning och optimering"
      ],
      productsUsed: ["Smart Närvarohantering", "Intelligent Rykteshantering", "Lokalt SEO"]
    },
    "restaurang-stockholm": {
      company: "Restaurangkedja i Stockholm",
      industry: "Restauranger & Caféer",
      challenge: "Hade problem med negativa recensioner som ingen hann svara på. Detta skadat deras rykte och påverkat antalet gäster negativt.",
      solution: "Implementerade AI-driven recensionshantering som genererar professionella svar inom minuter samt automatiska kampanjer för att få fler positiva recensioner.",
      results: [
        { metric: "+47%", label: "Fler recensioner" },
        { metric: "4.2→4.8★", label: "Genomsnittligt betyg" },
        { metric: "500+", label: "Recensioner besvarade" },
        { metric: "20 tim/mån", label: "Sparad tid" }
      ],
      testimonial: {
        quote: "Vi hade problem med negativa recensioner som ingen hann svara på. Nu får vi 47% fler recensioner och vårt genomsnittsbetyg har ökat från 4.2 till 4.8. AI-svaren är så bra att gäster ofta kommenterar våra professionella svar.",
        author: "Erik Lundqvist",
        role: "Restaurangchef"
      },
      implementation: [
        "Vecka 1: Setup av recensionshantering",
        "Vecka 2: Anpassning av AI-svarmallar",
        "Vecka 3: Lansering av recensionskampanjer",
        "Månad 2+: Kontinuerlig optimering"
      ],
      productsUsed: ["Intelligent Rykteshantering", "Smart Närvarohantering"]
    },
    "skonhetssalong-goteborg": {
      company: "Skönhetssalong i Göteborg",
      industry: "Skönhetssalonger & Spa",
      challenge: "Postade sporadiskt på sociala medier och nådde knappt någon. Svårt att veta vad man skulle posta och när.",
      solution: "Implementerade Social Media-automatisering med AI-genererat innehåll och smart schemaläggning.",
      results: [
        { metric: "+156%", label: "Ökad räckvidd" },
        { metric: "3x", label: "Mer engagement" },
        { metric: "10 tim/vecka", label: "Sparad tid" },
        { metric: "Dagligen", label: "Publicering" }
      ],
      testimonial: {
        quote: "Innan Boost08 postade vi sporadiskt och nådde knappt någon. Nu publicerar vi dagligen och har tredubbla engagemanget - utan att lägga mer tid. AI:n skapar innehåll som verkligen resonerar med våra kunder.",
        author: "Sofia Bergström",
        role: "Salongsägare"
      },
      implementation: [
        "Vecka 1: Setup av social media-integration",
        "Vecka 2: AI-träning för bransch-specifikt innehåll",
        "Vecka 3: Lansering av automatiserad publicering",
        "Månad 2+: Optimering baserat på engagement"
      ],
      productsUsed: ["Social Media-automatisering", "Intelligent Rykteshantering"]
    }
  };

  const caseStudy = caseStudies[slug || ""] || {
    company: "Case Study",
    industry: "Kommer snart",
    challenge: "Detta kundcase kommer snart.",
    solution: "",
    results: [],
    testimonial: null,
    implementation: [],
    productsUsed: []
  };

  return (
    <Layout
      title={`${caseStudy.company} - Kundcase - Boost08`}
      description={`Läs om hur ${caseStudy.company} lyckades med Boost08`}
    >
      <BreadcrumbSchema
        items={[
          { name: "Hem", url: "https://boost08.com" },
          { name: "Resultat", url: "https://boost08.com/resultat" },
          { name: caseStudy.company, url: `https://boost08.com/resultat/${slug}` }
        ]}
      />
      <section className="pt-32 pb-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            
            {/* Breadcrumb */}
            <Link 
              to="/resultat" 
              className="inline-flex items-center text-muted-foreground hover:text-primary mb-8 group"
            >
              <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              Tillbaka till alla resultat
            </Link>

            {/* Header */}
            <div className="mb-12">
              <span className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
                {caseStudy.industry}
              </span>
              <h1 className="text-4xl sm:text-5xl font-bold mb-6">
                Så lyckades {caseStudy.company}
              </h1>
            </div>

            {/* Results Cards */}
            {caseStudy.results.length > 0 && (
              <div className="grid md:grid-cols-4 gap-4 mb-12">
                {caseStudy.results.map((result: any, index: number) => (
                  <div 
                    key={index}
                    className="p-6 bg-card rounded-xl border border-border text-center"
                  >
                    <div className="flex items-center justify-center gap-1 mb-2">
                      <TrendingUp className="h-4 w-4 text-success" />
                      <div className="text-2xl font-bold text-primary">
                        {result.metric}
                      </div>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {result.label}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Challenge */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold mb-4">Utmaningen</h2>
              <div className="p-6 bg-muted/30 rounded-xl border border-border">
                <p className="text-lg text-foreground">{caseStudy.challenge}</p>
              </div>
            </div>

            {/* Solution */}
            {caseStudy.solution && (
              <div className="mb-12">
                <h2 className="text-3xl font-bold mb-4">Lösningen</h2>
                <div className="p-6 bg-card rounded-xl border border-border mb-6">
                  <p className="text-lg text-foreground mb-6">{caseStudy.solution}</p>
                  
                  {caseStudy.productsUsed.length > 0 && (
                    <div>
                      <h3 className="text-sm font-semibold text-muted-foreground mb-3">
                        Använda Lösningar:
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {caseStudy.productsUsed.map((product: string, i: number) => (
                          <span 
                            key={i}
                            className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm"
                          >
                            {product}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {caseStudy.implementation.length > 0 && (
                  <div className="p-6 bg-muted/30 rounded-xl border border-border">
                    <h3 className="text-lg font-semibold mb-4">Implementation Timeline:</h3>
                    <div className="space-y-3">
                      {caseStudy.implementation.map((step: string, i: number) => (
                        <div key={i} className="flex items-start gap-3">
                          <CheckCircle2 className="h-5 w-5 text-success flex-shrink-0 mt-0.5" />
                          <span className="text-foreground">{step}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Testimonial */}
            {caseStudy.testimonial && (
              <div className="mb-12 p-8 bg-gradient-to-br from-primary/5 via-background to-secondary/5 rounded-2xl border border-border">
                <Quote className="h-10 w-10 text-primary mb-4" />
                <blockquote className="text-xl italic text-foreground mb-6">
                  "{caseStudy.testimonial.quote}"
                </blockquote>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="text-primary font-bold text-lg">
                      {caseStudy.testimonial.author.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">
                      {caseStudy.testimonial.author}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {caseStudy.testimonial.role}, {caseStudy.company}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* CTA */}
            <div className="bg-card border border-border rounded-2xl p-8 text-center">
              <h3 className="text-2xl font-bold mb-4">
                Vill du få samma resultat?
              </h3>
              <p className="text-muted-foreground mb-6">
                Boka en demo så visar vi hur Boost08 kan hjälpa ert företag växa
              </p>
              <Button variant="hero" size="lg">
                Boka Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      <CTASection
        title="Fler Success Stories"
        subtitle="Se hur andra företag växer med Boost08"
        ctaText="Se Alla Resultat"
      />
    </Layout>
  );
};

export default CaseStudyDetail;
