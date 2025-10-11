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

const Index = () => {
  return (
    <div className="min-h-screen">
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
