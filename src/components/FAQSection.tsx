import { useState } from "react";
import { Search, MessageCircle } from "lucide-react";
import { Input } from "./ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { Button } from "./ui/button";

const faqs = [
  {
    category: "Plattform",
    questions: [
      {
        q: "Hur snabbt ser jag resultat?",
        a: "De flesta av våra kunder ser förbättringar i synlighet inom 2-4 veckor. Recensioner och listningar börjar uppdateras omedelbart, medan SEO-effekterna gradvis ökar över tid."
      },
      {
        q: "Vilka plattformar integrerar ni med?",
        a: "Vi integrerar med 100+ plattformar inklusive Google My Business, Facebook, Instagram, Bing, Apple Maps, TripAdvisor, Yelp och alla större svenska recensionssajter."
      },
      {
        q: "Kan jag hantera flera platser samtidigt?",
        a: "Ja! Vår plattform är byggd för att hantera allt från en enda plats till hundratals samtidigt. Du får en central dashboard där du ser allt på ett ställe."
      }
    ]
  },
  {
    category: "Funktioner",
    questions: [
      {
        q: "Hur fungerar recensionshanteringen?",
        a: "Du får notifikationer när nya recensioner kommer in, kan svara direkt från plattformen, och får AI-förslag på professionella svar. Alla recensioner samlas på ett ställe oavsett källa."
      },
      {
        q: "Vad är included i rapporterna?",
        a: "Våra rapporter visar synlighetsstatistik, recensionsutveckling, konkurrentjämförelser, sökord-rankings och ROI-mätningar. Du kan schemalägga automatiska rapporter eller skapa custom rapporter när du vill."
      },
      {
        q: "Kan jag schemalägga inlägg i sociala medier?",
        a: "Ja, du kan schemalägga inlägg till alla dina sociala kanaler samtidigt. Plattformen föreslår även optimala tider baserat på när din målgrupp är mest aktiv."
      }
    ]
  },
  {
    category: "Priser & Support",
    questions: [
      {
        q: "Vad kostar det?",
        a: "Vi har flexibla paket baserat på antal platser och funktioner. Kontakta oss för en skräddarsydd offert som passar just ditt företag. Alla paket inkluderar full support på svenska."
      },
      {
        q: "Finns det någon bindningstid?",
        a: "Vi har månadsavtal utan bindningstid. Du kan när som helst avsluta eller ändra ditt abonnemang. Vi tror på att leverera värde varje månad så du vill stanna kvar."
      },
      {
        q: "Hur fungerar supporten?",
        a: "Du får support på svenska via e-post, telefon och chatt under kontorstid. Vi har även en omfattande kunskapsbas och video-tutorials. Onboarding-hjälp ingår alltid."
      },
      {
        q: "Vad händer med min data om jag avslutar?",
        a: "Du äger alltid din data. Om du avslutar får du möjlighet att exportera all din data innan kontot stängs. Vi raderar sedan all data enligt GDPR."
      }
    ]
  }
];

const FAQSection = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredFAQs = faqs.map(category => ({
    ...category,
    questions: category.questions.filter(
      faq =>
        faq.q.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faq.a.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  return (
    <section className="py-24 bg-accent/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              Vanliga Frågor
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Allt du behöver veta om Boost08
            </p>

            <div className="relative max-w-xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Sök efter din fråga..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 py-6 text-lg bg-background"
              />
            </div>
          </div>

          <div className="space-y-8">
            {filteredFAQs.length > 0 ? (
              filteredFAQs.map((category, idx) => (
                <div key={idx}>
                  <h3 className="text-xl font-semibold mb-4 text-primary">
                    {category.category}
                  </h3>
                  <Accordion type="single" collapsible className="space-y-2">
                    {category.questions.map((faq, faqIdx) => (
                      <AccordionItem
                        key={faqIdx}
                        value={`${idx}-${faqIdx}`}
                        className="bg-card border border-border rounded-xl px-6 data-[state=open]:shadow-soft"
                      >
                        <AccordionTrigger className="text-left hover:no-underline">
                          <span className="font-semibold text-foreground pr-4">
                            {faq.q}
                          </span>
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground leading-relaxed">
                          {faq.a}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              ))
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground mb-4">
                  Hittade ingen fråga som matchade din sökning.
                </p>
              </div>
            )}
          </div>

          <div className="mt-12 text-center bg-gradient-to-br from-primary/5 to-secondary/5 rounded-2xl p-8 border border-primary/10">
            <MessageCircle className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-2">Hittade du inte svar?</h3>
            <p className="text-muted-foreground mb-6">
              Vårt team är redo att hjälpa dig
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero" size="lg">
                Chatta Med Oss
              </Button>
              <Button variant="outline" size="lg">
                Boka Demo
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;