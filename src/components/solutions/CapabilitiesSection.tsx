import { Check } from "lucide-react";

interface Capability {
  text: string;
}

interface CapabilitiesSectionProps {
  title: string;
  subtitle?: string;
  capabilities: Capability[];
}

const CapabilitiesSection = ({ title, subtitle, capabilities }: CapabilitiesSectionProps) => {
  return (
    <section className="py-24 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">{title}</h2>
            {subtitle && (
              <p className="text-xl text-muted-foreground">{subtitle}</p>
            )}
          </div>
          
          <div className="grid sm:grid-cols-2 gap-4">
            {capabilities.map((capability, index) => (
              <div 
                key={index}
                className="flex items-start gap-3 p-4 bg-background rounded-xl border border-border"
              >
                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="h-4 w-4 text-primary" />
                </div>
                <p className="text-foreground">{capability.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CapabilitiesSection;
