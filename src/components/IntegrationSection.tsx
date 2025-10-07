const IntegrationSection = () => {
  const integrations = [
    { name: "Google", icon: "🔍" },
    { name: "Facebook", icon: "📘" },
    { name: "Instagram", icon: "📷" },
    { name: "Apple Maps", icon: "🍎" },
    { name: "Yelp", icon: "⭐" },
    { name: "TripAdvisor", icon: "🌍" },
    { name: "LinkedIn", icon: "💼" },
    { name: "Twitter", icon: "🐦" }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-block bg-foreground text-background px-6 py-2 rounded-full text-sm font-medium mb-6">
            Integrationer
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Boost08 funkar med verktygen<br />ni redan använder.
          </h2>
          <p className="text-lg text-muted-foreground mb-12">
            Vi integrerar enkelt med era befintliga system som Slack, Mailchimp, 
            Airtable, Salesforce CRM och många fler – allt för sömlöst.
          </p>

          <div className="grid grid-cols-4 gap-6 max-w-xl mx-auto mb-12">
            {integrations.map((integration, index) => (
              <div 
                key={index}
                className="bg-card border border-border rounded-2xl p-4 hover:shadow-soft transition-all hover:scale-105"
              >
                <div className="text-4xl">{integration.icon}</div>
              </div>
            ))}
          </div>

          <Button variant="default" size="lg">
            Läs mer
          </Button>
        </div>
      </div>
    </section>
  );
};

export default IntegrationSection;

import { Button } from "@/components/ui/button";
