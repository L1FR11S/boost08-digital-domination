import Layout from "@/components/Layout";
import IndustryHero from "@/components/industry/IndustryHero";
import IndustryPainpoints from "@/components/industry/IndustryPainpoints";
import IndustrySolutions from "@/components/industry/IndustrySolutions";
import IndustryCaseStudies from "@/components/industry/IndustryCaseStudies";
import RecommendedProducts from "@/components/industry/RecommendedProducts";
import IndustryROICalculator from "@/components/industry/IndustryROICalculator";
import CTASection from "@/components/shared/CTASection";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import { Globe, MessageSquare, Star, Sparkles } from "lucide-react";
import dashboardImage from "@/assets/dashboard-hero.png";

const RestaurantSolution = () => {
  const painpoints = [
    {
      title: "Kritiskt beroende av positiva recensioner",
      description: "Några negativa recensioner kan kraftigt påverka antalet gäster"
    },
    {
      title: "Menyer och priser uppdateras inte överallt",
      description: "Gäster ser gamla menyer på Google eller Facebook vilket skapar förvirring"
    },
    {
      title: "Negativa recensioner får inget svar",
      description: "Saknar tid att svara på alla recensioner vilket skadar ert rykte"
    },
    {
      title: "Svårt att sticka ut i lokal konkurrens",
      description: "Många restauranger konkurrerar om samma kunder i området"
    }
  ];

  const solutions = [
    {
      icon: MessageSquare,
      title: "Recensioner Som Marknadsföring",
      description: "Förvandla varje recension till en tillväxtmöjlighet",
      benefits: [
        "AI-drivna svar på varje recension inom minuter",
        "Automatiska kampanjer för att få fler positiva omdömen",
        "Professionell hantering av negativa recensioner"
      ]
    },
    {
      icon: Globe,
      title: "Alltid Uppdaterad Information",
      description: "Se till att era gäster alltid ser rätt meny och öppettider",
      benefits: [
        "Automatisk synkronisering av menyer över alla plattformar",
        "Enkel hantering av säsongsmenyer och specialerbjudanden",
        "Korrekt information om öppettider, även under helgdagar"
      ]
    },
    {
      icon: Sparkles,
      title: "Matbilder Som Säljer",
      description: "Dela era fantastiska maträtter på sociala medier automatiskt",
      benefits: [
        "AI hjälper er skapa engagerande inlägg om dagens specialiteter",
        "Automatisk publicering av säsongsanpassat innehåll",
        "Optimerade tidpunkter för maximal räckvidd"
      ]
    },
    {
      icon: Star,
      title: "Stärk Ert Lokala Varumärke",
      description: "Bli det självklara valet i ert område",
      benefits: [
        "Optimering för 'restaurang nära mig' sökningar",
        "Konkurrentanalys mot andra restauranger lokalt",
        "Showcase av era unika rätter och atmosfär"
      ]
    }
  ];

  const caseStudies = [
    {
      company: "Restaurangkedja i Stockholm",
      description: "Hade problem med negativa recensioner som ingen hann svara på. Nu får de 47% fler recensioner och betyget har ökat från 4.2 till 4.8.",
      results: [
        { metric: "+47%", label: "Recensioner" },
        { metric: "4.8★", label: "Snittbetyg" },
        { metric: "500+", label: "Svar" }
      ],
      slug: "restaurang-stockholm"
    },
    {
      company: "Café med 3 Verksamheter",
      description: "Kämpade med att hålla information uppdaterad och recensioner besvarade. Nu sparar de 12 tim/vecka och har ökat besöken med 34%.",
      results: [
        { metric: "+34%", label: "Besökare" },
        { metric: "12h/v", label: "Sparade" },
        { metric: "4.6★", label: "Snittbetyg" }
      ],
      slug: "cafe-tre"
    }
  ];

  const recommendedProducts = [
    {
      icon: MessageSquare,
      title: "Rykteshantering",
      description: "AI-svar på alla recensioner",
      href: "/losningar/intelligent-rykteshantering"
    },
    {
      icon: Globe,
      title: "Närvarohantering",
      description: "Uppdatera menyer överallt",
      href: "/losningar/smart-narvarohantering"
    },
    {
      icon: Sparkles,
      title: "Social Media",
      description: "Dela matbilder automatiskt",
      href: "/losningar/social-media-automatisering"
    },
    {
      icon: Star,
      title: "Lokalt SEO",
      description: "Rank högre i området",
      href: "/losningar/lokalt-seo"
    }
  ];

  return (
    <Layout
      title="Boost08 för Restauranger & Caféer"
      description="Fler bord bokade och fler positiva recensioner - helt automatiskt. Specialiserade lösningar för restaurangbranschen."
    >
      <BreadcrumbSchema
        items={[
          { name: "Hem", url: "https://boost08.com" },
          { name: "Branscher", url: "https://boost08.com" },
          { name: "Restauranger & Caféer", url: "https://boost08.com/bransch/restauranger-cafeer" }
        ]}
      />
      <IndustryHero
        badge="För Restauranger & Caféer"
        title="Fler bord bokade och fler positiva recensioner - helt automatiskt"
        subtitle="Låt AI hantera er digitala närvaro medan ni fokuserar på att servera fantastisk mat"
        image={dashboardImage}
      />

      <IndustryPainpoints painpoints={painpoints} />

      <IndustrySolutions 
        title="Så Hjälper Vi Restauranger Växa"
        solutions={solutions}
      />

      <IndustryCaseStudies cases={caseStudies} />

      <RecommendedProducts products={recommendedProducts} />

      <IndustryROICalculator industry="Restauranger & Caféer" />

      <CTASection
        title="Redo att få fler gäster?"
        subtitle="Boka en bransch-anpassad demo för restauranger"
        ctaText="Boka Demo"
      />
    </Layout>
  );
};

export default RestaurantSolution;
