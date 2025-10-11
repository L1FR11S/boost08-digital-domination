import Layout from "@/components/Layout";
import IndustryHero from "@/components/industry/IndustryHero";
import IndustryPainpoints from "@/components/industry/IndustryPainpoints";
import IndustrySolutions from "@/components/industry/IndustrySolutions";
import IndustryCaseStudies from "@/components/industry/IndustryCaseStudies";
import RecommendedProducts from "@/components/industry/RecommendedProducts";
import IndustryROICalculator from "@/components/industry/IndustryROICalculator";
import CTASection from "@/components/shared/CTASection";
import { Globe, MessageSquare, MapPin, BarChart } from "lucide-react";
import dashboardImage from "@/assets/dashboard-hero.png";

const RetailSolution = () => {
  const painpoints = [
    {
      title: "Okonsekventa uppgifter över flera butiker",
      description: "Varje butik har olika information på Google, vilket förvirrar kunder"
    },
    {
      title: "Svårt att hantera recensioner från 10+ platser",
      description: "Recensioner från alla butiker är spridda över olika plattformar"
    },
    {
      title: "Lokala kampanjer är tidskrävande",
      description: "Att koordinera kampanjer för alla butiker tar enormt mycket tid"
    },
    {
      title: "Ingen överblick över online-prestanda",
      description: "Svårt att se vilka butiker som presterar bäst online och varför"
    }
  ];

  const solutions = [
    {
      icon: Globe,
      title: "Centraliserad Multi-Location Hantering",
      description: "Hantera alla butiker från en enda plattform",
      benefits: [
        "Bulk-uppdateringar för alla butiker samtidigt",
        "Butik-specifika öppettider och information",
        "Automatisk synkronisering över 50+ plattformar"
      ]
    },
    {
      icon: MessageSquare,
      title: "Skalbar Recensionshantering",
      description: "AI hanterar recensioner från alla era butiker",
      benefits: [
        "Centraliserad inbox för recensioner från alla platser",
        "AI-genererade svar anpassade för varje butik",
        "Automatiska kampanjer för att generera fler recensioner"
      ]
    },
    {
      icon: MapPin,
      title: "Lokaliserade SEO-Strategier",
      description: "Optimera varje butik för sitt lokala område",
      benefits: [
        "Grannskapsbaserad rankingspårning per butik",
        "Lokalt anpassad keyword-strategi",
        "Konkurrentanalys för varje butiks marknad"
      ]
    },
    {
      icon: BarChart,
      title: "Insikter Över Hela Kedjan",
      description: "Se vilka butiker som presterar bäst och varför",
      benefits: [
        "Jämför prestanda mellan olika butiker",
        "Identifiera best practices från toppbutiker",
        "ROI-spårning per butik och kampanj"
      ]
    }
  ];

  const caseStudies = [
    {
      company: "Butikskedja med 12 Platser",
      description: "Kämpade med att hålla information konsekvent över alla butiker. Nu sparar de 25 tim/vecka och har ökat besöken med 43%.",
      results: [
        { metric: "+43%", label: "Besökare" },
        { metric: "25h/v", label: "Sparade" },
        { metric: "100%", label: "Korrekt info" }
      ],
      slug: "butikskedja-12"
    },
    {
      company: "Retail-Franchise med 8 Butiker",
      description: "Hade ingen överblick över recensioner och online-närvaro. Nu har alla butiker 4.5+ i betyg och spårbar prestanda.",
      results: [
        { metric: "4.5★+", label: "Alla butiker" },
        { metric: "+67%", label: "Recensioner" },
        { metric: "8/8", label: "Topp 3 lokalt" }
      ],
      slug: "retail-franchise"
    }
  ];

  const recommendedProducts = [
    {
      icon: Globe,
      title: "Närvarohantering",
      description: "Bulk-hantering av alla butiker",
      href: "/losningar/smart-narvarohantering"
    },
    {
      icon: MessageSquare,
      title: "Rykteshantering",
      description: "Centraliserad recensionshantering",
      href: "/losningar/intelligent-rykteshantering"
    },
    {
      icon: MapPin,
      title: "Lokalt SEO",
      description: "Optimera varje butik lokalt",
      href: "/losningar/lokalt-seo"
    },
    {
      icon: BarChart,
      title: "Analytics",
      description: "Insikter över hela kedjan",
      href: "/losningar/smart-narvarohantering"
    }
  ];

  return (
    <Layout
      title="Boost08 för Butikskedjor"
      description="Hantera alla era butiker från en enda plattform. Specialiserade lösningar för retail."
    >
      <IndustryHero
        badge="För Butikskedjor"
        title="Hantera alla era butiker från en enda plattform"
        subtitle="Skalbar digital närvaro för kedjor med flera platser"
        image={dashboardImage}
      />

      <IndustryPainpoints painpoints={painpoints} />

      <IndustrySolutions 
        title="Så Hjälper Vi Butikskedjor Växa"
        solutions={solutions}
      />

      <IndustryCaseStudies cases={caseStudies} />

      <RecommendedProducts products={recommendedProducts} />

      <IndustryROICalculator industry="Butikskedjor" />

      <CTASection
        title="Redo att skala er digitala närvaro?"
        subtitle="Boka en bransch-anpassad demo för butikskedjor"
        ctaText="Boka Demo"
      />
    </Layout>
  );
};

export default RetailSolution;
