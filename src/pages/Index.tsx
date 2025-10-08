import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import MetricsWall from "@/components/MetricsWall";
import ProblemSection from "@/components/ProblemSection";
import FeaturesSection from "@/components/FeaturesSection";
import HowItWorks from "@/components/HowItWorks";
import TestimonialSection from "@/components/TestimonialSection";
import IntegrationSection from "@/components/IntegrationSection";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import ExitIntentPopup from "@/components/ExitIntentPopup";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <MetricsWall />
      <ProblemSection />
      <FeaturesSection />
      <HowItWorks />
      <TestimonialSection />
      <IntegrationSection />
      <FinalCTA />
      <Footer />
      <ExitIntentPopup />
    </div>
  );
};

export default Index;
