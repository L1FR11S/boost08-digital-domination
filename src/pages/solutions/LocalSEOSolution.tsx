import Layout from "@/components/Layout";
import SolutionHero from "@/components/solutions/SolutionHero";
import ProblemSolutionSection from "@/components/solutions/ProblemSolutionSection";
import KeyFeaturesGrid from "@/components/solutions/KeyFeaturesGrid";
import CapabilitiesSection from "@/components/solutions/CapabilitiesSection";
import ProductDemo from "@/components/solutions/ProductDemo";
import BenefitsGrid from "@/components/solutions/BenefitsGrid";
import FeaturedCaseStudy from "@/components/solutions/FeaturedCaseStudy";
import SolutionFAQ from "@/components/solutions/SolutionFAQ";
import CTASection from "@/components/shared/CTASection";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import { MapPin, TrendingUp, Target, Eye, Search, Award } from "lucide-react";
import dashboardImage from "@/assets/dashboard-hero.png";

const LocalSEOSolution = () => {
  const features = [
    {
      icon: MapPin,
      title: "Grannskapsbaserad Spårning",
      description: "Se exakt hur ni rankar i olika stadsdelar och grannskaper"
    },
    {
      icon: TrendingUp,
      title: "Rankingövervakning",
      description: "Daglig uppdatering av era rankningar för viktiga sökord"
    },
    {
      icon: Target,
      title: "Konkurrentanalys",
      description: "Se vad konkurrenter gör rätt och hitta möjligheter att överträffa dem"
    },
    {
      icon: Eye,
      title: "Synlighetsinsikter",
      description: "Förstå hur synliga ni är jämfört med konkurrenter i er marknad"
    },
    {
      icon: Search,
      title: "Nyckelordsoptimering",
      description: "AI-drivna rekommendationer för vilka sökord ni bör fokusera på"
    },
    {
      icon: Award,
      title: "Prestationsmål",
      description: "Sätt mål och få konkreta steg för att nå dem"
    }
  ];

  const problems = [
    { text: "Ingen aning om hur ni rankar i lokala sökningar" },
    { text: "Konkurrenter syns högre upp i Google Maps" },
    { text: "Ingen strategi för lokalt SEO" },
    { text: "Svårt att veta vilka sökord som är viktiga" }
  ];

  const solutions = [
    { text: "Daglig spårning visar exakt hur ni rankar för viktiga sökord i olika områden" },
    { text: "AI-drivna rekommendationer hjälper er att klättra i rankingen" },
    { text: "Konkret action plan baserad på vad som fungerar i er bransch" },
    { text: "Nyckelordsanalys identifierar vilka termer som driver mest trafik" }
  ];

  const capabilities = [
    { text: "Grannskapsbaserad rankingspårning för hyperlokala insikter" },
    { text: "Hyperlokala SEO-insikter och rekommendationer" },
    { text: "Automatisk optimering för lokala sökningar" },
    { text: "Konkurrentanalys för lokala marknaden" },
    { text: "AI-driven nyckelordsanalys och optimeringsförslag" },
    { text: "Prestationsmätning och rapportering" }
  ];

  const benefits = [
    { metric: "+120%", description: "Fler visningar" },
    { metric: "Top 3", description: "Ranking lokalt" },
    { metric: "3x", description: "Mer trafik från Google" },
    { metric: "+67%", description: "Fler leads" }
  ];

  const caseStudy = {
    company: "Ett Tandläkarkontor i Uppsala",
    industry: "Kliniker & Vård",
    quote: "Vi rankade på sida 3 i Google. Efter 3 månader med Boost08 är vi nu bland topp 3 för alla viktiga sökningar i Uppsala. Antalet nya patienter har ökat med 67%.",
    author: "Dr. Anders Nilsson",
    role: "Klinikchef",
    results: ["+120% Visningar", "Top 3 Ranking", "+67% Nya patienter"],
    slug: "tandläkare-uppsala"
  };

  const faqs = [
    {
      question: "Vad är grannskapsbaserad rankingspårning?",
      answer: "Istället för att bara se hur ni rankar i staden generellt, visar vi exakt hur ni rankar i olika stadsdelar. Detta är viktigt eftersom lokala sökningar prioriterar närhet."
    },
    {
      question: "Hur snabbt kan jag förvänta mig resultat?",
      answer: "Lokalt SEO tar tid. De flesta kunder ser förbättring inom 1-3 månader, med signifikanta resultat efter 3-6 månader. Vi ger er en realistisk tidplan baserad på er nuvarande situation."
    },
    {
      question: "Behöver jag teknisk kunskap?",
      answer: "Nej! Vår plattform ger konkreta, icke-tekniska rekommendationer som ni kan implementera direkt. Vi säger exakt vad ni ska göra och varför."
    },
    {
      question: "Hur mäter ni framgång?",
      answer: "Vi spårar rankings, visningar, klick, och viktigast av allt - leads och försäljning. Ni får tydliga rapporter som visar ROI av era SEO-insatser."
    }
  ];

  return (
    <Layout
      title="Lokalt SEO-dominans - Boost08"
      description="Dominera lokala sökningar i er stad och grannskaper. Grannskapsbaserad rankingspårning och optimering."
    >
      <BreadcrumbSchema
        items={[
          { name: "Hem", url: "https://boost08.com" },
          { name: "Lösningar", url: "https://boost08.com/losningar" },
          { name: "Lokalt SEO", url: "https://boost08.com/losningar/lokalt-seo" }
        ]}
      />
      <SolutionHero
        badge="Lokalt SEO-dominans"
        title="Dominera lokala sökningar i er stad och grannskaper"
        subtitle="Grannskapsbaserad rankingspårning och AI-driven optimering"
        image={dashboardImage}
      />

      <ProblemSolutionSection 
        problems={problems}
        solutions={solutions}
      />

      <KeyFeaturesGrid features={features} />

      <CapabilitiesSection
        title="Komplett Lokal SEO-Lösning"
        subtitle="Allt ni behöver för att dominera lokala sökningar"
        capabilities={capabilities}
      />

      <ProductDemo
        image={dashboardImage}
        title="Se Era Rankings i Realtid"
        description="Detaljerade insikter om hur ni presterar i varje stadsdel"
      />

      <BenefitsGrid benefits={benefits} />

      <FeaturedCaseStudy caseStudy={caseStudy} />

      <SolutionFAQ faqs={faqs} />

      <CTASection
        title="Redo att dominera lokala sökningar?"
        subtitle="Över 2,000 företag växer med Boost08"
        ctaText="Boka Demo"
      />
    </Layout>
  );
};

export default LocalSEOSolution;
