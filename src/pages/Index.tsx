import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import ValuePropGrid from "@/components/ValuePropGrid";
import SolutionTeasers from "@/components/SolutionTeasers";
import IndustryShowcase from "@/components/IndustryShowcase";
import SocialProofHighlights from "@/components/SocialProofHighlights";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import ExitIntentPopup from "@/components/ExitIntentPopup";
import SchemaMarkup from "@/components/seo/SchemaMarkup";
import { Helmet } from "react-helmet-async";
import { useScrollDepth } from "@/hooks/useScrollDepth";

const Index = () => {
  useScrollDepth();

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Boost08 - Intelligent Tillväxtplattform för Lokala Företag</title>
        <meta 
          name="description" 
          content="Automatisera er digitala närvaro, recensioner och lokal SEO. Boost08 hjälper lokala företag dominera sin marknad med AI-driven automation." 
        />
        <meta 
          name="keywords" 
          content="lokal synlighet, företagslistningar, recensionshantering, lokalt SEO, digital närvaro, Google Business Profile, lokal marknadsföring" 
        />
        <link rel="canonical" href="https://boost08.com" />
        
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://boost08.com" />
        <meta property="og:site_name" content="Boost08" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      <SchemaMarkup type="Organization" data={{}} />

      <Navigation />
      <Hero />
      <TrustBar />
      <ValuePropGrid />
      <SolutionTeasers />
      <IndustryShowcase />
      <SocialProofHighlights />
      <FinalCTA />
      <Footer />
      <ExitIntentPopup />
    </div>
  );
};

export default Index;
