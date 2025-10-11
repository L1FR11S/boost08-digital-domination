import Layout from "@/components/Layout";
import IndustryHero from "@/components/industry/IndustryHero";
import IndustryPainpoints from "@/components/industry/IndustryPainpoints";
import IndustrySolutions from "@/components/industry/IndustrySolutions";
import IndustryCaseStudies from "@/components/industry/IndustryCaseStudies";
import RecommendedProducts from "@/components/industry/RecommendedProducts";
import IndustryROICalculator from "@/components/industry/IndustryROICalculator";
import CTASection from "@/components/shared/CTASection";
import { Globe, MessageSquare, Sparkles, MapPin } from "lucide-react";
import dashboardImage from "@/assets/dashboard-hero.png";

const BeautySolution = () => {
  const painpoints = [
    {
      title: "Konkurrenter rankar högre i lokala sökningar",
      description: "Nya kunder hittar konkurrerande salonger istället för er"
    },
    {
      title: "Bokningar går förlorade pga felaktig info",
      description: "Fel telefonnummer eller öppettider på Google leder till missade bokningar"
    },
    {
      title: "Tidskrävande att posta på sociala medier",
      description: "Svårt att hålla alla salongers Instagram och Facebook aktiva och engagerande"
    },
    {
      title: "Svårt att visa upp före/efter-resultat",
      description: "Ingen bra plattform för att systematiskt visa upp era fantastiska resultat"
    }
  ];

  const solutions = [
    {
      icon: Globe,
      title: "Perfekt Online-Närvaro",
      description: "Se till att varje salong syns rätt på alla plattformar",
      benefits: [
        "Automatisk synkronisering av öppettider för alla salonger",
        "Korrekt information om tjänster och priser överallt",
        "Professionella bilder optimerade för varje plattform"
      ]
    },
    {
      icon: MessageSquare,
      title: "Recensioner Som Säljer",
      description: "Förvandla nöjda kunder till marknadsförare",
      benefits: [
        "AI-genererade svar som visar er professionalism",
        "Automatiska kampanjer för att få fler recensioner",
        "Showcase av före/efter-bilder i recensionssvar"
      ]
    },
    {
      icon: Sparkles,
      title: "Social Media på Autopilot",
      description: "Håll era sociala kanaler aktiva utan att lägga timmar",
      benefits: [
        "AI-genererat innehåll anpassat för skönhetsbranschen",
        "Automatisk publicering av säsongsanpassade kampanjer",
        "Engagerande inlägg om era tjänster och erbjudanden"
      ]
    },
    {
      icon: MapPin,
      title: "Dominera Lokala Sökningar",
      description: "Var första valet när någon söker efter skönhetsbehandlingar",
      benefits: [
        "Optimering för 'nagelsalong nära mig' typ av sökningar",
        "Grannskapsbaserad spårning av konkurrenssituation",
        "Keyword-strategi för era specifika behandlingar"
      ]
    }
  ];

  const caseStudies = [
    {
      company: "Skönhetssalong i Göteborg",
      description: "Postade sporadiskt och nådde knappt någon. Nu publicerar de dagligen med tredubbelt engagement och 156% ökad räckvidd.",
      results: [
        { metric: "+156%", label: "Räckvidd" },
        { metric: "3x", label: "Engagement" },
        { metric: "10h/v", label: "Sparade" }
      ],
      slug: "skonhetssalong-goteborg"
    },
    {
      company: "Spa-kedja med 4 Anläggningar",
      description: "Kämpade med att hantera recensioner och närvaro för alla platser. Nu sparar de 15 tim/vecka och har 4.7 i snittbetyg.",
      results: [
        { metric: "4.7★", label: "Snittbetyg" },
        { metric: "15h/v", label: "Sparade" },
        { metric: "+89%", label: "Visningar" }
      ],
      slug: "spa-kedja"
    }
  ];

  const recommendedProducts = [
    {
      icon: Sparkles,
      title: "Social Media",
      description: "Automatisera era sociala kanaler",
      href: "/losningar/social-media-automatisering"
    },
    {
      icon: MessageSquare,
      title: "Rykteshantering",
      description: "Fler positiva recensioner",
      href: "/losningar/intelligent-rykteshantering"
    },
    {
      icon: Globe,
      title: "Närvarohantering",
      description: "Korrekt info överallt",
      href: "/losningar/smart-narvarohantering"
    },
    {
      icon: MapPin,
      title: "Lokalt SEO",
      description: "Rank högre lokalt",
      href: "/losningar/lokalt-seo"
    }
  ];

  return (
    <Layout
      title="Boost08 för Skönhetssalonger & Spa"
      description="Fyll er kalender med bokningar från lokala sökningar. Specialiserade lösningar för skönhetsbranschen."
    >
      <IndustryHero
        badge="För Skönhetssalonger & Spa"
        title="Fyll er kalender med bokningar från lokala sökningar"
        subtitle="Automatisera er marknadsföring och få fler bokningar genom smart digital närvaro"
        image={dashboardImage}
      />

      <IndustryPainpoints painpoints={painpoints} />

      <IndustrySolutions 
        title="Så Hjälper Vi Skönhetsbranschen Växa"
        solutions={solutions}
      />

      <IndustryCaseStudies cases={caseStudies} />

      <RecommendedProducts products={recommendedProducts} />

      <IndustryROICalculator industry="Skönhetssalonger" />

      <CTASection
        title="Redo att fylla er kalender?"
        subtitle="Boka en bransch-anpassad demo för skönhetssalonger"
        ctaText="Boka Demo"
      />
    </Layout>
  );
};

export default BeautySolution;
