import { useState } from "react";
import { MapPin, Star, BarChart3, Share2, FileText, TrendingUp } from "lucide-react";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

const features = [
  {
    id: "listings",
    badge: "Listning",
    Icon: MapPin,
    title: "Förbättrad lokal synlighet",
    subtitle: "Hitta nya kunder lokalt",
    description: "Öka din digitala närvaro och säkerställ att ditt företag visas korrekt på alla viktiga plattformar som Google, Bing, och Apple Maps.",
    benefits: [
      "Automatisk uppdatering på 50+ plattformar",
      "Korrekt företagsinformation överallt",
      "Ökad synlighet i lokala sökresultat"
    ]
  },
  {
    id: "reviews",
    badge: "Recensioner",
    Icon: Star,
    title: "Hantera recensioner enkelt",
    subtitle: "Bygg förtroende med kundrecensioner",
    description: "Samla, hantera och svara på recensioner från alla plattformar på ett ställe. Förvandla feedback till din bästa marknadsföring.",
    benefits: [
      "Centraliserad recensionshantering",
      "Automatiska notifikationer för nya recensioner",
      "AI-driven sentimentanalys"
    ]
  },
  {
    id: "analytics",
    badge: "Analys",
    Icon: BarChart3,
    title: "Data-driven beslut",
    subtitle: "Förstå din prestation",
    description: "Få djupgående insikter om hur ditt företag presterar online med realtidsdata och omfattande rapporter.",
    benefits: [
      "Realtidsstatistik och insikter",
      "Konkurrentanalys",
      "Anpassningsbara rapporter"
    ]
  },
  {
    id: "social",
    badge: "Social Media",
    Icon: Share2,
    title: "Social media-hantering",
    subtitle: "Engagera din målgrupp",
    description: "Planera, publicera och hantera ditt sociala innehåll från en enda plattform. Spara tid och öka din räckvidd.",
    benefits: [
      "Schemaläggning av inlägg",
      "Multi-plattforms publicering",
      "Engagemangsstatistik"
    ]
  },
  {
    id: "reports",
    badge: "Rapporter",
    Icon: FileText,
    title: "Professionella rapporter",
    subtitle: "Visa upp dina resultat",
    description: "Skapa vackra, white-label rapporter som visar värdet av ditt arbete för kunder och intressenter.",
    benefits: [
      "Automatiska månatliga rapporter",
      "Anpassningsbara templates",
      "PDF och online-format"
    ]
  },
  {
    id: "growth",
    badge: "Tillväxt",
    Icon: TrendingUp,
    title: "Kontinuerlig optimering",
    subtitle: "Väx snabbare med AI",
    description: "Låt vår AI-drivna plattform identifiera möjligheter och föreslå förbättringar för att maximera din tillväxt.",
    benefits: [
      "AI-drivna rekommendationer",
      "Automatisk SEO-optimering",
      "Prediktiv analys"
    ]
  }
];

const FeaturesSection = () => {
  const [activeTab, setActiveTab] = useState(features[0].id);

  return (
    <section id="tjanster" className="py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Allt Du Behöver För Att Växa Lokalt
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            En komplett plattform för att hantera och förbättra din digitala närvaro
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="max-w-6xl mx-auto">
          <TabsList className="grid grid-cols-3 lg:grid-cols-6 mb-12 h-auto gap-2 bg-transparent">
            {features.map((feature) => (
              <TabsTrigger
                key={feature.id}
                value={feature.id}
                className="flex flex-col items-center gap-2 py-4 px-3 data-[state=active]:bg-card data-[state=active]:shadow-soft data-[state=active]:border data-[state=active]:border-primary/20"
              >
                <feature.Icon className="w-6 h-6" />
                <span className="text-xs font-medium">{feature.badge}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {features.map((feature) => (
            <TabsContent key={feature.id} value={feature.id} className="animate-fade-in">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                {/* Text Content */}
                <div>
                  <Badge variant="secondary" className="mb-4">{feature.badge}</Badge>
                  <h3 className="text-3xl sm:text-4xl font-bold mb-3 text-foreground">
                    {feature.title}
                  </h3>
                  <p className="text-xl text-primary mb-4">{feature.subtitle}</p>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    {feature.description}
                  </p>
                  <ul className="space-y-3">
                    {feature.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <div className="w-2 h-2 rounded-full bg-primary"></div>
                        </div>
                        <span className="text-foreground">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Visual Element */}
                <div>
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-3xl blur-3xl group-hover:blur-2xl transition-all duration-500"></div>
                    <div className="relative bg-card/80 backdrop-blur-sm border border-border rounded-3xl p-12 shadow-card flex items-center justify-center min-h-[300px]">
                      <feature.Icon className="w-32 h-32 text-primary group-hover:scale-110 transition-transform duration-500" strokeWidth={1.5} />
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
};

export default FeaturesSection;
