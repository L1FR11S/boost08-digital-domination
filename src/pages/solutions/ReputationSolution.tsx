import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";

const ReputationSolution = () => {
  return (
    <Layout
      title="Intelligent Rykteshantering - Boost08"
      description="Förvandla recensioner till tillväxtmotorn för ert företag. AI-drivna recensionssvar som låter naturliga och autentiska."
    >
      <section className="pt-32 pb-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <span className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
                Intelligent Rykteshantering
              </span>
              <h1 className="text-4xl sm:text-5xl font-bold mb-6">
                Förvandla recensioner till tillväxtmotorn för ert företag
              </h1>
              <p className="text-xl text-muted-foreground">
                AI-drivna recensionssvar som låter autentiska och professionella
              </p>
            </div>

            <div className="bg-card border border-border rounded-2xl p-8 mb-12">
              <h2 className="text-2xl font-bold mb-4">Kommer snart</h2>
              <p className="text-muted-foreground mb-6">
                Vi arbetar på att bygga ut denna sida med detaljerad information om vår Intelligenta Rykteshantering.
              </p>
              <Button variant="hero">Boka Demo</Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ReputationSolution;
