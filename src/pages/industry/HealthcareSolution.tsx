import Layout from "@/components/Layout";
import IndustryHero from "@/components/industry/IndustryHero";
import IndustryPainpoints from "@/components/industry/IndustryPainpoints";
import IndustrySolutions from "@/components/industry/IndustrySolutions";
import IndustryCaseStudies from "@/components/industry/IndustryCaseStudies";
import RecommendedProducts from "@/components/industry/RecommendedProducts";
import IndustryROICalculator from "@/components/industry/IndustryROICalculator";
import CTASection from "@/components/shared/CTASection";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import { Globe, MessageSquare, MapPin, Star } from "lucide-react";
import dashboardImage from "@/assets/dashboard-hero.png";

const HealthcareSolution = () => {
  const painpoints = [
    {
      title: "Patienter hittar inte er på Google Maps",
      description: "Era kliniker syns inte när patienter söker efter vård i närområdet"
    },
    {
      title: "Negativa recensioner om väntetider",
      description: "Enstaka klagomål om väntetider påverkar hela er trovärdighet online"
    },
    {
      title: "Felaktig information på olika plattformar",
      description: "Öppettider och telefonnummer stämmer inte överens mellan Google, Facebook och Bing"
    },
    {
      title: "Svårt att hantera flera mottagningar",
      description: "Varje mottagning har olika information och det är tidskrävande att uppdatera allt"
    }
  ];

  const solutions = [
    {
      icon: Globe,
      title: "Automatisk Närvarohantering",
      description: "En uppdatering synkroniseras automatiskt över alla era mottagningar och plattformar",
      benefits: [
        "Korrekt information om öppettider och telefonnummer överallt",
        "Automatisk hantering av stängda dagar och helgdagar",
        "Bulk-uppdateringar för alla mottagningar samtidigt"
      ]
    },
    {
      icon: MessageSquare,
      title: "Proaktiv Recensionshantering",
      description: "AI-drivna svar som visar att ni bryr er om patienternas upplevelse",
      benefits: [
        "Professionella svar på både positiva och negativa recensioner",
        "Automatiska kampanjer för att få fler positiva omdömen",
        "Sentimentanalys för att identifiera återkommande problem"
      ]
    },
    {
      icon: MapPin,
      title: "Lokalt SEO för Vårdgivare",
      description: "Dominera lokala sökningar när patienter söker efter vård",
      benefits: [
        "Grannskapsbaserad spårning av era rankningar",
        "Optimering för medicinska söktermer",
        "Konkurrentanalys mot andra kliniker i området"
      ]
    },
    {
      icon: Star,
      title: "Förtroendeskön Närvaro",
      description: "Bygg förtroende genom konsekvent och professionell online-närvaro",
      benefits: [
        "GDPR-kompatibel hantering av patientinteraktioner",
        "Professionell ton i all kommunikation",
        "Transparent visning av kompetenser och specialiseringar"
      ]
    }
  ];

  const caseStudies = [
    {
      company: "Vårdcentral i Malmö",
      description: "Kämpade med negativa recensioner om väntetider och felaktig information på Google. Nu har de 4.8 i snittbetyg och 89% fler visningar.",
      results: [
        { metric: "+89%", label: "Fler visningar" },
        { metric: "4.8★", label: "Snittbetyg" },
        { metric: "0", label: "Fel uppgifter" }
      ],
      slug: "vardcentral-malmo"
    },
    {
      company: "Tandläkare i Uppsala",
      description: "Rankade på sida 3 i Google. Efter 3 månader är de nu topp 3 för alla viktiga sökningar. Antalet nya patienter har ökat med 67%.",
      results: [
        { metric: "+120%", label: "Visningar" },
        { metric: "Top 3", label: "Ranking" },
        { metric: "+67%", label: "Nya patienter" }
      ],
      slug: "tandlakare-uppsala"
    }
  ];

  const recommendedProducts = [
    {
      icon: Globe,
      title: "Smart Närvarohantering",
      description: "Hantera alla mottagningar från ett ställe",
      href: "/losningar/smart-narvarohantering"
    },
    {
      icon: MessageSquare,
      title: "Rykteshantering",
      description: "AI-drivna svar på recensioner",
      href: "/losningar/intelligent-rykteshantering"
    },
    {
      icon: MapPin,
      title: "Lokalt SEO",
      description: "Dominera lokala sökningar",
      href: "/losningar/lokalt-seo"
    },
    {
      icon: Star,
      title: "Social Media",
      description: "Automatiserad innehållshantering",
      href: "/losningar/social-media-automatisering"
    }
  ];

  return (
    <Layout
      title="Boost08 för Kliniker & Vård"
      description="Hjälp fler patienter hitta er utan extra marknadsföringskostnader. Specialiserade lösningar för vårdgivare."
    >
      <BreadcrumbSchema
        items={[
          { name: "Hem", url: "https://boost08.com" },
          { name: "Branscher", url: "https://boost08.com" },
          { name: "Kliniker & Vård", url: "https://boost08.com/bransch/kliniker-vard" }
        ]}
      />
      <IndustryHero
        badge="För Kliniker & Vård"
        title="Hjälp fler patienter hitta er - utan extra marknadsföringskostnader"
        subtitle="Automatisera er digitala närvaro och få fler patienter genom lokala sökningar"
        image={dashboardImage}
      />

      <IndustryPainpoints painpoints={painpoints} />

      <IndustrySolutions 
        title="Så Hjälper Vi Vårdgivare Växa"
        solutions={solutions}
      />

      <IndustryCaseStudies cases={caseStudies} />

      <RecommendedProducts products={recommendedProducts} />

      <IndustryROICalculator industry="Kliniker & Vård" />

      <CTASection
        title="Redo att få fler patienter?"
        subtitle="Boka en bransch-anpassad demo för vårdgivare"
        ctaText="Boka Demo"
      />
    </Layout>
  );
};

export default HealthcareSolution;
