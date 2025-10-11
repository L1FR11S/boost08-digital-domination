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
import { Sparkles, Calendar, Share2, BarChart, Image, Target } from "lucide-react";
import dashboardImage from "@/assets/dashboard-hero.png";

const SocialMediaSolution = () => {
  const features = [
    {
      icon: Sparkles,
      title: "AI-Genererat Innehåll",
      description: "Skapa engagerande inlägg anpassade för er målgrupp och bransch"
    },
    {
      icon: Calendar,
      title: "Smart Schemaläggning",
      description: "AI väljer bästa tidpunkten för publicering baserat på när er målgrupp är aktiv"
    },
    {
      icon: Share2,
      title: "Multi-Kanal Publicering",
      description: "Publicera samtidigt på Facebook, Instagram, LinkedIn och fler - med ett klick"
    },
    {
      icon: BarChart,
      title: "Prestationsanalys",
      description: "Se vilka inlägg som fungerar bäst och optimera er strategi"
    },
    {
      icon: Image,
      title: "Bildbibliotek",
      description: "Tillgång till miljontals royalty-free bilder för era inlägg"
    },
    {
      icon: Target,
      title: "Målgruppsanpassning",
      description: "Innehåll automatiskt anpassat för varje plattforms demografi"
    }
  ];

  const problems = [
    { text: "Ingen tid att skapa innehåll för sociala medier regelbundet" },
    { text: "Svårt att veta vad man ska posta och när" },
    { text: "Tidskrävande att posta samma innehåll på flera plattformar" },
    { text: "Ingen koll på vad som fungerar och inte fungerar" }
  ];

  const solutions = [
    { text: "AI skapar engagerande innehåll på sekunder - ni godkänner och publicerar" },
    { text: "Smart schemaläggning baserad på när er målgrupp är mest aktiv" },
    { text: "Publicera till alla kanaler samtidigt med automatisk anpassning" },
    { text: "Detaljerad analys visar exakt vad som driver engagement" }
  ];

  const capabilities = [
    { text: "AI-genererat innehåll anpassat för varje företag och bransch" },
    { text: "Flerkanalspublicering med automatisk formatering" },
    { text: "Smart schemaläggning baserad på målgruppsbeteende" },
    { text: "Analys och rapportering för alla sociala plattformar" },
    { text: "Bildbibliotek med miljontals professionella bilder" },
    { text: "Hashtag-förslag optimerade för räckvidd" }
  ];

  const benefits = [
    { metric: "10 tim/vecka", description: "Sparad tid" },
    { metric: "+156%", description: "Ökad räckvidd" },
    { metric: "3x", description: "Mer engagement" },
    { metric: "5+", description: "Kanaler samtidigt" }
  ];

  const caseStudy = {
    company: "En Skönhetssalong i Göteborg",
    industry: "Skönhetssalonger & Spa",
    quote: "Innan Boost08 postade vi sporadiskt och nådde knappt någon. Nu publicerar vi dagligen och har tredubbla engagemanget - utan att lägga mer tid.",
    author: "Sofia Bergström",
    role: "Salongsägare",
    results: ["+156% Räckvidd", "3x Engagement", "10 tim/v sparade"],
    slug: "skönhetssalong-göteborg"
  };

  const faqs = [
    {
      question: "Hur vet AI vad jag ska posta om?",
      answer: "AI:n analyserar er bransch, konkurrenter, och vad som fungerar i er målgrupp. Den föreslår relevant innehåll baserat på trender, säsonger och era tidigare framgångsrika inlägg."
    },
    {
      question: "Kan jag redigera innehållet innan publicering?",
      answer: "Absolut! AI:n ger förslag som ni kan godkänna direkt eller redigera efter behov. Ni har full kontroll över allt som publiceras."
    },
    {
      question: "Vilka plattformar stöds?",
      answer: "Vi stödjer Facebook, Instagram, LinkedIn, Twitter/X, Google Business Profile och fler. Innehållet anpassas automatiskt för varje plattforms format och bästa praxis."
    },
    {
      question: "Behöver jag egna bilder?",
      answer: "Nej! Vi ger tillgång till miljontals royalty-free bilder. Ni kan även ladda upp egna bilder om ni vill använda eget material."
    }
  ];

  return (
    <Layout
      title="Social Media-automatisering - Boost08"
      description="Spara 10+ timmar/vecka på sociala medier med bättre resultat. AI-genererat innehåll för alla era kanaler."
    >
      <SolutionHero
        badge="Social Media-automatisering"
        title="Spara 10+ timmar/vecka på sociala medier - med bättre resultat"
        subtitle="AI-genererat innehåll och automatisk publicering för alla era kanaler"
        image={dashboardImage}
      />

      <ProblemSolutionSection 
        problems={problems}
        solutions={solutions}
      />

      <KeyFeaturesGrid features={features} />

      <CapabilitiesSection
        title="Komplett Social Media-Hantering"
        subtitle="Från idé till publicerat inlägg på minuter"
        capabilities={capabilities}
      />

      <ProductDemo
        image={dashboardImage}
        title="Se Plattformen i Action"
        description="AI skapar innehåll, schemalägg och publicera - allt från en dashboard"
      />

      <BenefitsGrid benefits={benefits} />

      <FeaturedCaseStudy caseStudy={caseStudy} />

      <SolutionFAQ faqs={faqs} />

      <CTASection
        title="Redo att automatisera era sociala medier?"
        subtitle="Gå med över 2,000 företag som sparar tid med Boost08"
        ctaText="Boka Demo"
      />
    </Layout>
  );
};

export default SocialMediaSolution;
