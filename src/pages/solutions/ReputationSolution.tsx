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
import { MessageSquare, Bot, TrendingUp, Bell, Star, BarChart3 } from "lucide-react";
import dashboardImage from "@/assets/dashboard-hero.png";

const ReputationSolution = () => {
  const features = [
    {
      icon: Bot,
      title: "AI-Drivna Recensionssvar",
      description: "Naturliga, professionella svar som speglar ert varumärke - genererade på sekunder"
    },
    {
      icon: MessageSquare,
      title: "Centraliserad Inbox",
      description: "Hantera recensioner från Google, Facebook, Yelp och fler från ett ställe"
    },
    {
      icon: TrendingUp,
      title: "Automatiska Kampanjer",
      description: "Generera fler recensioner genom automatiserade kampanjer via SMS och email"
    },
    {
      icon: Bell,
      title: "Realtidsnotiser",
      description: "Få omedelbar notis om nya recensioner så du kan svara snabbt"
    },
    {
      icon: Star,
      title: "Sentimentanalys",
      description: "AI-driven analys identifierar problem innan de eskalerar"
    },
    {
      icon: BarChart3,
      title: "Konkurrentanalys",
      description: "Se hur ert omdöme står sig mot konkurrenter i er bransch"
    }
  ];

  const problems = [
    { text: "Negativa recensioner får ingen respons och skadar ert rykte" },
    { text: "Tidskrävande att skriva personliga svar till varje recension" },
    { text: "Svårt att få nöjda kunder att lämna recensioner" },
    { text: "Ingen översikt över recensioner från olika plattformar" }
  ];

  const solutions = [
    { text: "AI genererar professionella svar på sekunder - ni godkänner och publicerar" },
    { text: "Spara 20+ timmar per månad med automatiserade svar och kampanjer" },
    { text: "Automatiska kampanjer ökar antalet recensioner med genomsnittligt 47%" },
    { text: "Centraliserad dashboard ger fullständig översikt och kontroll" }
  ];

  const capabilities = [
    { text: "AI-drivna recensionssvar som låter naturliga och autentiska" },
    { text: "Automatiska kampanjer för att generera fler positiva recensioner" },
    { text: "Sentimentanalys för proaktiv problemlösning" },
    { text: "Centraliserad inbox för recensioner från alla plattformar" },
    { text: "Konkurrentövervakning och benchmarking" },
    { text: "Anpassningsbara svarmallar som speglar ert varumärke" }
  ];

  const benefits = [
    { metric: "+47%", description: "Fler recensioner" },
    { metric: "4.2→4.8", description: "Genomsnittligt betyg" },
    { metric: "20 tim/mån", description: "Sparad tid" },
    { metric: "95%", description: "Svarar inom 24h" }
  ];

  const caseStudy = {
    company: "En Restaurangkedja i Stockholm",
    industry: "Restauranger & Caféer",
    quote: "Vi hade problem med negativa recensioner som ingen hann svara på. Nu får vi 47% fler recensioner och vårt genomsnittsbetyg har ökat från 4.2 till 4.8.",
    author: "Erik Lundqvist",
    role: "Restaurangchef",
    results: ["+47% Fler recensioner", "4.8★ Genomsnitt", "500+ Svar genererade"],
    slug: "restaurang-stockholm"
  };

  const faqs = [
    {
      question: "Hur fungerar AI-drivna svar?",
      answer: "Vår AI analyserar recensionen, identifierar nyckelord och sentiment, och genererar ett personligt, professionellt svar som matchar ert varumärke. Ni granskar och godkänner innan publicering."
    },
    {
      question: "Kan AI hantera negativa recensioner?",
      answer: "Ja! AI:n är särskilt tränad för att hantera negativa recensioner professionellt, visa empati, ta ansvar och erbjuda lösningar - allt medan tonen förblir positiv och konstruktiv."
    },
    {
      question: "Hur får jag fler kunder att lämna recensioner?",
      answer: "Vi skapar automatiserade kampanjer som skickar personliga förfrågningar via SMS eller email efter ett köp/besök. Kunder kan lämna recensioner med bara några klick."
    },
    {
      question: "Vilka plattformar stöds?",
      answer: "Vi hanterar recensioner från Google, Facebook, Yelp, TripAdvisor, Trustpilot och alla större recensionsplattformar - allt från en centraliserad inbox."
    }
  ];

  return (
    <Layout
      title="Intelligent Rykteshantering - Boost08"
      description="Förvandla recensioner till tillväxtmotorn för ert företag. AI-drivna svar och automatiska kampanjer."
    >
      <BreadcrumbSchema
        items={[
          { name: "Hem", url: "https://boost08.com" },
          { name: "Lösningar", url: "https://boost08.com/losningar" },
          { name: "Intelligent Rykteshantering", url: "https://boost08.com/losningar/intelligent-rykteshantering" }
        ]}
      />
      <SolutionHero
        badge="Intelligent Rykteshantering"
        title="Förvandla recensioner till tillväxtmotorn för ert företag"
        subtitle="AI-drivna svar och automatiska kampanjer för fler positiva recensioner"
        image={dashboardImage}
      />

      <ProblemSolutionSection 
        problems={problems}
        solutions={solutions}
      />

      <KeyFeaturesGrid features={features} />

      <CapabilitiesSection
        title="Komplett Recensionshantering"
        subtitle="Från notis till publicerat svar på sekunder"
        capabilities={capabilities}
      />

      <ProductDemo
        image={dashboardImage}
        title="Se Hur Det Fungerar"
        description="AI genererar svar, ni granskar och publicerar med ett klick"
      />

      <BenefitsGrid benefits={benefits} />

      <FeaturedCaseStudy caseStudy={caseStudy} />

      <SolutionFAQ faqs={faqs} />

      <CTASection
        title="Redo att förbättra ert rykte online?"
        subtitle="Gå med över 2,000 företag som litar på Boost08"
        ctaText="Boka Demo"
      />
    </Layout>
  );
};

export default ReputationSolution;
