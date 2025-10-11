import Layout from "@/components/Layout";
import MetricsWall from "@/components/MetricsWall";
import IntegrationSection from "@/components/IntegrationSection";
import TrustBadges from "@/components/TrustBadges";
import OurStory from "@/components/about/OurStory";
import OurValues from "@/components/about/OurValues";
import CTASection from "@/components/shared/CTASection";

const About = () => {
  return (
    <Layout
      title="Om Oss - Boost08"
      description="Vi hjälper svenska företag bli synliga lokalt. Läs mer om vår mission och vad som gör oss annorlunda."
    >
      {/* Hero */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
              Om Oss
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              Vi hjälper svenska företag bli synliga lokalt
            </h1>
            <p className="text-xl text-muted-foreground">
              Vår mission är att göra lokal tillväxt tillgänglig för alla
            </p>
          </div>
        </div>
      </section>

      <OurStory />

      <OurValues />

      <MetricsWall />

      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <TrustBadges />
          </div>
        </div>
      </section>

      <IntegrationSection />

      <CTASection
        title="Vill du veta mer?"
        subtitle="Boka ett möte med oss och upptäck hur vi kan hjälpa ert företag växa"
        ctaText="Boka Möte"
      />
    </Layout>
  );
};

export default About;
