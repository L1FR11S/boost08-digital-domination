import testimonialImage from "@/assets/testimonial-person.png";
import { Star, TrendingUp, Users, ChartBar } from "lucide-react";
import { Badge } from "./ui/badge";

const caseStudies = [
  {
    name: "Thomas Berglund",
    role: "VD",
    company: "Svenska Sushi Köket, Pizza Köket & Hamburger Köket",
    industry: "Restaurang",
    image: testimonialImage,
    quote: "Boost08 blev vår genväg till digital klarhet. Med hjälp av smart AI kändes det som att ha en marknadsföringsteam som jobbade i bakgrunden – vi kunde fokusera på maten medan vår synlighet sköt i höjden.",
    metrics: [
      { label: "Ökad synlighet", value: "+147%", icon: TrendingUp },
      { label: "Fler recensioner", value: "+89", icon: Star },
      { label: "Nya kunder/mån", value: "+234", icon: Users }
    ]
  },
  {
    name: "Maria Eriksson",
    role: "Marknadschef",
    company: "Nordiska Spa & Wellness",
    industry: "Hälsa & Wellness",
    image: testimonialImage,
    quote: "Innan Boost08 spenderade vi timmar varje vecka på att hantera recensioner och uppdatera information. Nu tar det 10 minuter och vi når betydligt fler kunder.",
    metrics: [
      { label: "Tidsbesparning", value: "15h/vecka", icon: ChartBar },
      { label: "Bokningsökning", value: "+67%", icon: TrendingUp },
      { label: "Genomsnittsbetyg", value: "4.8/5", icon: Star }
    ]
  },
  {
    name: "Johan Andersson",
    role: "Ägare",
    company: "City Bilverkstad AB",
    industry: "Bilhandel",
    image: testimonialImage,
    quote: "Vi hade ingen aning om hur viktigt det var att synas rätt online. Boost08 fixade allt automatiskt och nu kommer kunder direkt från Google-sökningar. Fantastiskt verktyg!",
    metrics: [
      { label: "Google-visningar", value: "+312%", icon: TrendingUp },
      { label: "Telefonsamtal", value: "+156", icon: Users },
      { label: "Online-bokningar", value: "+94", icon: ChartBar }
    ]
  }
];

const TestimonialSection = () => {
  return (
    <section className="py-24 bg-accent/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            Resultat Som Talar För Sig Själva
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Se hur företag som ditt har förvandlat sin digitala närvaro med Boost08
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {caseStudies.map((study, index) => (
            <div
              key={index}
              className="bg-card rounded-3xl p-8 shadow-card border border-border hover:shadow-glow transition-all duration-300 group"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <img
                    src={study.image}
                    alt={study.name}
                    className="w-14 h-14 rounded-full object-cover border-2 border-primary"
                  />
                  <div>
                    <p className="font-bold text-foreground">{study.name}</p>
                    <p className="text-sm text-muted-foreground">{study.role}</p>
                  </div>
                </div>
                <Badge variant="secondary">{study.industry}</Badge>
              </div>

              {/* Company */}
              <p className="text-sm font-semibold text-primary mb-4">{study.company}</p>

              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-secondary text-secondary" />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="text-sm text-muted-foreground mb-6 leading-relaxed italic">
                "{study.quote}"
              </blockquote>

              {/* Metrics */}
              <div className="pt-6 border-t border-border space-y-3">
                {study.metrics.map((metric, idx) => (
                  <div key={idx} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <metric.icon className="w-4 h-4 text-primary" />
                      <span className="text-sm text-muted-foreground">{metric.label}</span>
                    </div>
                    <span className="font-bold text-foreground">{metric.value}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <p className="text-muted-foreground mb-4">
            Vill du se liknande resultat för ditt företag?
          </p>
          <button className="inline-flex items-center gap-2 bg-gradient-cta text-secondary-foreground hover:opacity-90 shadow-soft font-semibold px-8 py-3 rounded-md transition-all">
            Läs Fler Kundhistorier
          </button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
