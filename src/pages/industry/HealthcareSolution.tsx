import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";

const HealthcareSolution = () => {
  return (
    <Layout
      title="Boost08 för Kliniker & Vård"
      description="Hjälp fler patienter hitta er utan extra marknadsföringskostnader. Specialiserade lösningar för vårdgivare."
    >
      <section className="pt-32 pb-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <span className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
                För Kliniker & Vård
              </span>
              <h1 className="text-4xl sm:text-5xl font-bold mb-6">
                Hjälp fler patienter hitta er - utan extra marknadsföringskostnader
              </h1>
              <p className="text-xl text-muted-foreground">
                Specialiserade lösningar för vårdgivare
              </p>
            </div>

            <div className="bg-card border border-border rounded-2xl p-8 mb-12">
              <h2 className="text-2xl font-bold mb-4">Kommer snart</h2>
              <p className="text-muted-foreground mb-6">
                Vi arbetar på att bygga ut denna sida med detaljerad information för kliniker och vårdgivare.
              </p>
              <Button variant="hero">Boka Demo</Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default HealthcareSolution;
