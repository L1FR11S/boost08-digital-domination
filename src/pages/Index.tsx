import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import MetricsWall from "@/components/MetricsWall";
import ROICalculator from "@/components/ROICalculator";
import ProblemSection from "@/components/ProblemSection";
import FeaturesSection from "@/components/FeaturesSection";
import HowItWorks from "@/components/HowItWorks";
import TestimonialSection from "@/components/TestimonialSection";
import FAQSection from "@/components/FAQSection";
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
      <ROICalculator />
      <ProblemSection />
      <FeaturesSection />
      <HowItWorks />
      <TestimonialSection />
      <FAQSection />
      <IntegrationSection />
      <FinalCTA />
      <Footer />
      <ExitIntentPopup />
    </div>
  );
};

export default Index;
