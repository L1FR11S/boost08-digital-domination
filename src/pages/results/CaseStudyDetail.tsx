import Layout from "@/components/Layout";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";

const CaseStudyDetail = () => {
  const { slug } = useParams();

  return (
    <Layout
      title="Kundcase - Boost08"
      description="Läs om hur detta företag lyckades med Boost08"
    >
      <section className="pt-32 pb-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl sm:text-5xl font-bold mb-6">
                Kundcase: {slug}
              </h1>
            </div>

            <div className="bg-card border border-border rounded-2xl p-8 mb-12">
              <h2 className="text-2xl font-bold mb-4">Kommer snart</h2>
              <p className="text-muted-foreground mb-6">
                Vi arbetar på att bygga ut denna fallstudie med detaljerad information.
              </p>
              <Button variant="hero">Boka Demo</Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default CaseStudyDetail;
