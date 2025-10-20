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
import { Globe, RefreshCw, Zap, Search, MapPin, Clock } from "lucide-react";
import dashboardImage from "@/assets/dashboard-hero.png";

const SmartPresenceSolution = () => {
  const features = [
    {
      icon: Globe,
      title: "Multi-Plattform Synkronisering",
      description: "Hantera Google, Facebook, Bing, Yelp och 50+ andra plattformar från ett ställe"
    },
    {
      icon: RefreshCw,
      title: "Automatiska Uppdateringar",
      description: "En ändring synkroniseras automatiskt över alla dina profiler på sekunder"
    },
    {
      icon: Zap,
      title: "Bulk-Hantering",
      description: "Uppdatera flera platser samtidigt - perfekt för kedjor och franchises"
    },
    {
      icon: Search,
      title: "Sökmotoroptimerad",
      description: "AI-optimering för att rankas högre i både text- och röstsökningar"
    },
    {
      icon: MapPin,
      title: "Lokal Precision",
      description: "Exakt information för varje plats - öppettider, adress, telefonnummer"
    },
    {
      icon: Clock,
      title: "Realtidsövervakning",
      description: "Få notiser om ändringar eller problem med dina företagsprofiler"
    }
  ];

  const problems = [
    { text: "Felaktiga öppettider på Google Maps leder till förlorade kunder" },
    { text: "Olika telefonnummer på olika plattformar skapar förvirring" },
    { text: "Tidskrävande att manuellt uppdatera 10+ plattformar" },
    { text: "Ingen överblick över var företaget syns online" }
  ];

  const solutions = [
    { text: "Centraliserad kontroll över alla plattformar från en dashboard" },
    { text: "Automatisk synkronisering säkerställer konsekvent information överallt" },
    { text: "Spara 10+ timmar per månad jämfört med manuell hantering" },
    { text: "Fullständig översikt och analytics för alla dina företagsprofiler" }
  ];

  const capabilities = [
    { text: "Automatisk synkronisering av 500+ datafält över alla plattformar" },
    { text: "Hantering av öppettider, inklusive helgdagar och särskilda händelser" },
    { text: "Bildhantering och optimering för varje plattform" },
    { text: "Kategorisering och nyckelord anpassade för lokal SEO" },
    { text: "AI-optimering för röstsökning och framtida söktrender" },
    { text: "Enkel hantering av flera platser från en enda plattform" }
  ];

  const benefits = [
    { metric: "+89%", description: "Fler visningar på Google Maps" },
    { metric: "10 tim/mån", description: "Sparad tid på uppdateringar" },
    { metric: "50+", description: "Plattformar hanterade automatiskt" },
    { metric: "99.9%", description: "Korrekt information överallt" }
  ];

  const caseStudy = {
    company: "En Vårdcentral i Malmö",
    industry: "Kliniker & Vård",
    quote: "Tidigare fick vi klagomål varje vecka om fel öppettider. Nu är allt korrekt överallt och vi ser 89% fler visningar på Google Maps.",
    author: "Maria Andersson",
    role: "Verksamhetschef",
    results: ["+89% Fler visningar", "0 fel uppgifter", "15 tim/mån sparade"],
    slug: "vardcentral-malmo"
  };

  const faqs = [
    {
      question: "Vilka plattformar kan jag hantera?",
      answer: "Vi stödjer 50+ plattformar inklusive Google Business Profile, Facebook, Instagram, Bing Places, Apple Maps, Yelp, TripAdvisor och alla större lokala kataloger."
    },
    {
      question: "Hur snabbt synkroniseras ändringar?",
      answer: "De flesta ändringar synkroniseras inom några sekunder till några minuter. Vissa plattformar kan ta upp till 24 timmar att uppdatera, men det sker automatiskt."
    },
    {
      question: "Kan jag hantera flera platser?",
      answer: "Ja! Vår plattform är byggd för multi-location. Du kan hantera allt från 2 till 1000+ platser från samma dashboard och göra både bulk-uppdateringar och platsspecifika ändringar."
    },
    {
      question: "Vad händer om någon ändrar min information på en plattform?",
      answer: "Vi övervakar dina profiler kontinuerligt och notifierar dig omedelbart om någon gör oauktoriserade ändringar. Du kan då snabbt återställa korrekt information."
    }
  ];

  return (
    <Layout
      title="Smart Närvarohantering - Boost08"
      description="Var synlig överallt där dina kunder söker. Automatisk hantering av 500+ datafält över alla plattformar."
    >
      <BreadcrumbSchema
        items={[
          { name: "Hem", url: "https://boost08.com" },
          { name: "Lösningar", url: "https://boost08.com/losningar" },
          { name: "Smart Närvarohantering", url: "https://boost08.com/losningar/smart-narvarohantering" }
        ]}
      />
      <SolutionHero
        badge="Smart Närvarohantering"
        title="Var synlig överallt där dina kunder söker - automatiskt"
        subtitle="Automatisk hantering av 500+ datafält över alla plattformar"
        image={dashboardImage}
      />

      <ProblemSolutionSection 
        problems={problems}
        solutions={solutions}
      />

      <KeyFeaturesGrid features={features} />

      <CapabilitiesSection
        title="Komplett Närvarohantering"
        subtitle="Allt du behöver för att vara synlig online"
        capabilities={capabilities}
      />

      <ProductDemo
        image={dashboardImage}
        title="Se Plattformen i Praktiken"
        description="Hantera alla dina företagsprofiler från en enkel, kraftfull dashboard"
      />

      <BenefitsGrid benefits={benefits} />

      <FeaturedCaseStudy caseStudy={caseStudy} />

      <SolutionFAQ faqs={faqs} />

      <CTASection
        title="Redo att automatisera er närvaro?"
        subtitle="Över 2,000 lokala företag litar på Boost08"
        ctaText="Boka Demo"
      />
    </Layout>
  );
};

export default SmartPresenceSolution;
