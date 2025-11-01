import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const aiContext = {
      company: {
        name: "Boost08",
        description: "Intelligent tillväxtplattform för lokala företag med AI-driven automatisering",
        tagline: "Maximera er lokala kundtillväxt med smart automatisering",
        location: "Stockholm, Sverige",
        website: "https://boost08.com",
        contact: "hello@boost08.com",
        industry: "Marketing Technology, Local SEO, AI Automation",
        target_market: "Svenska lokala företag, kliniker, salonger, butiker, restauranger",
        founded: "2024",
        customers: "2000+ nöjda företag",
      },
      products: [
        {
          name: "Smart Närvarohantering",
          description: "Automatisk synkronisering över 500+ datafält på alla plattformar",
          url: "https://boost08.com/losningar/smart-narvarohantering",
          benefits: [
            "500+ datafält synkroniserade automatiskt",
            "50+ plattformar inklusive Google, Meta, Bing",
            "10 tim/mån sparade på manuellt arbete",
            "0 fel i företagsuppgifter",
          ],
          use_cases: [
            "Multi-location management för kedjor",
            "Öppettider och kontaktinfo alltid uppdaterade",
            "Automatisk synkning vid förändringar",
          ],
        },
        {
          name: "Intelligent Rykteshantering",
          description: "AI-drivna recensionssvar som låter autentiska och professionella",
          url: "https://boost08.com/losningar/intelligent-rykteshantering",
          benefits: [
            "+47% fler recensioner på 6 månader",
            "AI-drivna svar som låter mänskliga",
            "20 tim/mån sparade på recensionshantering",
            "4.8★ genomsnittligt betyg",
          ],
          use_cases: [
            "Automatiska tack för positiva recensioner",
            "Professionella svar på negativ feedback",
            "Sentimentanalys och insikter",
          ],
        },
        {
          name: "Social Media Automatisering",
          description: "AI-genererat innehåll anpassat för er målgrupp",
          url: "https://boost08.com/losningar/social-media-automatisering",
          benefits: [
            "AI-genererat innehåll för alla kanaler",
            "Multi-kanal publicering automatiskt",
            "+156% räckvidd på 90 dagar",
            "Konsekvent varumärke",
          ],
          use_cases: [
            "Schemalagd publicering på Facebook, Instagram, LinkedIn",
            "Automatisk anpassning till varje plattform",
            "Content calendar som fylls automatiskt",
          ],
        },
        {
          name: "Lokalt SEO",
          description: "Grannskapsbaserad rankingspårning och optimering",
          url: "https://boost08.com/losningar/lokalt-seo",
          benefits: [
            "Grannskapsbaserad rankingspårning",
            "+120% fler visningar i Google Maps",
            "Top 3 ranking för lokala sökningar",
            "Konkurrentanalys i realtid",
          ],
          use_cases: [
            "Spåra ranking i specifika stadsdelar",
            "Optimera för 'nära mig'-sökningar",
            "Lokal konkurrentanalys",
          ],
        },
      ],
      industries: [
        {
          name: "Kliniker & Vård",
          url: "https://boost08.com/bransch/kliniker-vard",
          description: "Specialiserade lösningar för vårdcentraler, tandläkare och medicinska kliniker",
          challenges: [
            "Hög konkurrens om lokala patienter",
            "Svårt att hantera negativa recensioner professionellt",
            "Tidskrävande att uppdatera öppettider och info",
          ],
          results: [
            "+89% fler visningar i lokal sökning",
            "4.8★ snittbetyg med AI-drivna recensionssvar",
            "0 fel i företagsuppgifter",
          ],
        },
        {
          name: "Skönhetssalonger & Spa",
          url: "https://boost08.com/bransch/skonhetssalonger",
          description: "Automatisering för skönhetssalonger, spa och wellness-center",
          challenges: [
            "Många bokningar via sociala medier",
            "Svårt att synas i Google Maps",
            "Tidskrävande att svara på recensioner",
          ],
          results: ["+67% fler bokningar via Google", "15 tim/mån sparade på social media", "+47% fler recensioner"],
        },
        {
          name: "Butikskedjor",
          url: "https://boost08.com/bransch/butikskedjor",
          description: "Multi-location management för butikskedjor",
          challenges: [
            "Många butiker att hantera",
            "Olika öppettider per butik",
            "Svårt att hålla info uppdaterad överallt",
          ],
          results: [
            "500+ datafält synkade för 50+ butiker",
            "0 fel i öppettider eller kontaktinfo",
            "+34% fler butikbesök från Google Maps",
          ],
        },
        {
          name: "Restauranger & Caféer",
          url: "https://boost08.com/bransch/restauranger-cafeer",
          description: "Recensions- och närvarohantering för restauranger och caféer",
          challenges: [
            "Viktigt med högt betyg på Google",
            "Svårt att hantera negativa recensioner",
            "Tidskrävande att uppdatera menyer och öppettider",
          ],
          results: [
            "+47% fler recensioner på 6 månader",
            "4.8★ genomsnitt med AI-svar",
            "500+ AI-genererade professionella svar",
          ],
        },
      ],
      faqs: [
        {
          question: "Vad är Boost08?",
          answer:
            "Boost08 är en intelligent tillväxtplattform för lokala företag som automatiserar digital närvaro, recensionshantering och lokal SEO med AI-driven teknologi. Vi hjälper företag att spara tid och öka sin lokala synlighet.",
        },
        {
          question: "Vilka typer av företag passar Boost08 för?",
          answer:
            "Vi är specialiserade på lokala företag som kliniker, vårdcentraler, tandläkare, skönhetssalonger, spa, butikskedjor, restauranger och caféer. Perfekt för företag med en eller flera fysiska platser som vill öka sin lokala synlighet.",
        },
        {
          question: "Hur sparar jag tid med Boost08?",
          answer:
            "Våra kunder sparar i genomsnitt 10-25 timmar per vecka genom att automatisera recensionssvar, uppdateringar av företagsinformation, social media-innehåll och lokal SEO-optimering. AI gör jobbet medan du fokuserar på ditt företag.",
        },
        {
          question: "Hur fungerar AI-recensionssvar?",
          answer:
            "Vår AI analyserar recensionen, förstår kontexten och din bransch, och genererar ett professionellt och personligt svar som låter mänskligt. Du kan alltid godkänna eller redigera innan publicering.",
        },
        {
          question: "Vilka plattformar integrerar Boost08 med?",
          answer:
            "Vi integrerar med 50+ plattformar inklusive Google Business Profile, Facebook, Instagram, Bing Places, Apple Maps, TripAdvisor och många fler. All data synkas automatiskt överallt.",
        },
        {
          question: "Kan jag testa Boost08 gratis?",
          answer:
            "Ja! Vi erbjuder en gratis konsultation där vi analyserar er nuvarande digitala närvaro och visar hur mycket tid och pengar ni kan spara med Boost08.",
        },
      ],
      case_studies: [
        {
          company: "Vårdcentral i Malmö",
          industry: "Kliniker & Vård",
          challenge: "Låg synlighet i lokal sökning och svårt att hantera patientrecensioner professionellt",
          solution: "Implementerade Smart Närvarohantering och Intelligent Rykteshantering",
          results: [
            "+89% fler visningar i Google Maps",
            "4.8★ snittbetyg (från 4.2★)",
            "0 fel i företagsuppgifter på alla plattformar",
          ],
          quote: "Vi sparar 15 timmar per vecka och har fått 89% fler patienter via Google",
          url: "https://boost08.com/resultat/vardcentral-malmo",
        },
        {
          company: "Restaurangkedja i Stockholm",
          industry: "Restauranger & Caféer",
          challenge: "Svårt att hantera recensioner för 8 restauranger och hålla info uppdaterad",
          solution: "Automatiserade recensionssvar och närvarohantering för alla 8 platser",
          results: [
            "+47% fler recensioner på 6 månader",
            "4.8★ genomsnitt över alla restauranger",
            "500+ AI-genererade professionella svar",
          ],
          quote: "Boost08 har gjort det möjligt att skala vår kedja utan att anställa fler för marknadsföring",
          url: "https://boost08.com/resultat/restaurang-stockholm",
        },
        {
          company: "Skönhetssalong i Stockholm",
          industry: "Skönhetssalonger & Spa",
          challenge: "Få bokningar via Google och tidskrävande att hantera social media",
          solution: "Lokalt SEO + Social Media Automatisering",
          results: [
            "+67% fler bokningar via Google",
            "15 tim/mån sparade på social media",
            "+156% räckvidd på Instagram",
          ],
          url: "https://boost08.com/resultat/skönhetssalong-stockholm",
        },
      ],
      pricing: {
        model: "Custom pricing based on business needs",
        tiers: [
          {
            name: "Starter",
            ideal_for: "Single location businesses",
            includes: ["Smart Presence Management", "Review Management", "Basic Analytics"],
          },
          {
            name: "Professional",
            ideal_for: "Growing businesses with 2-5 locations",
            includes: ["All Starter features", "Social Media Automation", "Local SEO", "Priority Support"],
          },
          {
            name: "Enterprise",
            ideal_for: "Chains with 5+ locations",
            includes: [
              "All Professional features",
              "Custom integrations",
              "Dedicated account manager",
              "Advanced analytics",
            ],
          },
        ],
        free_trial: "Free consultation and ROI analysis available",
      },
      keywords: [
        "lokal SEO",
        "Google Business Profile",
        "recensionshantering",
        "digital närvaro",
        "företagslistningar",
        "lokal synlighet",
        "automatisering",
        "AI-marknadsföring",
        "lokala företag Sverige",
        "närvarohantering",
        "rykteshantering",
        "social media automatisering",
        "multi-location management",
        "Google Maps optimering",
        "AI-recensionssvar",
        "lokal sökmotoroptimering",
      ],
      contact: {
        email: "hello@boost08.com",
        phone: "+46 8 123 456 78",
        address: "Stockholm, Sverige",
        booking: "https://boost08.com/kontakt",
        social_media: {
          linkedin: "https://linkedin.com/company/boost08",
          facebook: "https://facebook.com/boost08",
          instagram: "https://instagram.com/boost08",
        },
      },
      technology: {
        ai_models: "Advanced natural language processing for review responses",
        integrations: "50+ platforms including Google, Meta, Bing, Apple Maps",
        automation: "500+ data fields synchronized automatically",
        security: "Enterprise-grade security and GDPR compliance",
      },
    };

    return new Response(JSON.stringify(aiContext, null, 2), {
      headers: {
        ...corsHeaders,
        "Content-Type": "application/json",
        "Cache-Control": "public, max-age=3600",
      },
    });
  } catch (error) {
    console.error("Error in ai-context function:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
