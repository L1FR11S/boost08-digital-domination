import { AlertCircle } from "lucide-react";

interface Painpoint {
  title: string;
  description: string;
}

interface IndustryPainpointsProps {
  painpoints: Painpoint[];
}

const IndustryPainpoints = ({ painpoints }: IndustryPainpointsProps) => {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Vanliga Utmaningar i Branschen
            </h2>
            <p className="text-xl text-muted-foreground">
              Känner du igen dig?
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {painpoints.map((painpoint, index) => (
              <div 
                key={index}
                className="p-6 bg-background rounded-xl border border-border"
              >
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center flex-shrink-0">
                    <AlertCircle className="h-5 w-5 text-destructive" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-2">{painpoint.title}</h3>
                    <p className="text-muted-foreground">{painpoint.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default IndustryPainpoints;
