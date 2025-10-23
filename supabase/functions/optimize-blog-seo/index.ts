import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { title, excerpt, content, keywords } = await req.json();
    console.log('Optimizing blog post for SEO...');

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const systemPrompt = `Du är en expert på SEO-optimering för blogginnehåll på svenska. Din uppgift är att analysera och förbättra innehåll enligt följande SEO best practices:

1. **Titel** (max 60 tecken):
   - Placera huvudkeyword i början
   - Använd emotionella triggers (siffror, kraftord)
   - Gör den klickbar och lockande

2. **Meta Title** (max 60 tecken):
   - Keyword först
   - Inkludera varumärke sist om plats finns
   - Optimera för CTR

3. **Meta Description** (155-160 tecken):
   - Inkludera huvudkeyword naturligt
   - Lägg till USP (Unique Selling Point)
   - Avsluta med tydlig CTA (Call To Action)
   - Gör den lockande och relevant

4. **Keywords**:
   - Föreslå 5-8 relevanta keywords
   - Mix av short-tail och long-tail
   - Inkludera LSI keywords (Latent Semantic Indexing)
   - Baserat på innehållets ämne

5. **Innehåll & Layout-optimering** (VIKTIGT - Använd Markdown):
   - **Struktur**: Använd H2 (##) var 200-300 ord för huvudsektioner
   - **Delsektioner**: Använd H3 (###) för underrubriker
   - **Första stycket**: Hook + huvudkeyword inom första 100 orden
   - **Keyword density**: 1-2% naturlig integration
   - **Läsbarhet**: 
     * Max 3-4 rader per stycke
     * Korta meningar (max 20 ord)
     * Använd **fetstil** för viktiga koncept
     * Använd *kursiv* för betoning
   - **Listor**: Bullet points (- ) eller numrerade listor (1. ) för scanbarhet
   - **Visuella element**:
     * Använd > för blockquotes/tips (t.ex. "> **💡 Pro-Tips:** ...")
     * Skapa "Viktigt att veta"-sektioner
     * Lägg till sammanfattningar i listor
   - **Spacing**: Skapa visuella pausar mellan sektioner
   - **Länkar**: Föreslå interna länkmöjligheter med [länktext](url)
   - **FAQ**: Lägg till FAQ-sektion om relevant med H3 frågor
   - **Featured snippets**: Optimera för featured snippets med tydliga svar

**MARKDOWN-FORMAT EXEMPEL:**
## Huvudrubrik (H2)

Introduktionsstycke med **viktigt keyword** som fångar uppmärksamhet.

### Delrubrik (H3)

**Viktigt koncept** förklaras här. Korta stycken gör texten lättare att läsa.

- Bullet point för viktig information
- Scanbar och lättläst format
- Konkreta exempel

> **💡 Tips:** Framhävd information i quote-block

### Nästa Sektion (H3)

Mer strukturerat innehåll...

6. **CTA-Generering** (Call-To-Action):
   - Skapa **EN dynamisk CTA** baserat på innehållet som passar artikelns tema
   - CTA:n ska locka läsaren att ta nästa steg (t.ex. "Ladda ner guide", "Få gratis analys", "Boka demo")
   - CTA ska ha:
     * En kort, lockande titel (max 50 tecken)
     * En beskrivning (max 100 tecken)
   - Anpassa CTA efter innehållets tema och målgrupp
   - Använd kraftfulla verb och skapa känsla av värde/brådska

**CTA-EXEMPEL:**
- Titel: "Vill du ha fler tips som dessa?"
- Beskrivning: "Få vår kompletta guide till lokal SEO direkt i din inkorg"

Returnera JSON med följande struktur:
{
  "optimizedTitle": "...",
  "optimizedMetaTitle": "...",
  "optimizedMetaDescription": "...",
  "optimizedKeywords": "keyword1, keyword2, ...",
  "optimizedContent": "... (använd Markdown med ##, ###, **, -, >, etc.)",
  "ctaTitle": "...",
  "ctaDescription": "...",
  "seoScore": 85,
  "improvements": ["förbättring 1", "förbättring 2", ...],
  "internalLinkSuggestions": ["länk 1", "länk 2", ...]
}`;

    const userPrompt = `Optimera följande blogginnehåll för SEO:

**Nuvarande Titel:**
${title || 'Ingen titel'}

**Nuvarande Excerpt:**
${excerpt || 'Ingen excerpt'}

**Nuvarande Innehåll:**
${content || 'Inget innehåll'}

**Nuvarande Keywords:**
${keywords || 'Inga keywords'}

Analysera och förbättra allt innehåll enligt SEO best practices. Returnera endast JSON.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt }
        ],
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit överskriden. Försök igen om en stund." }), 
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Betalning krävs. Lägg till credits i Lovable workspace." }), 
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      throw new Error("AI gateway error");
    }

    const data = await response.json();
    const aiResponse = data.choices[0].message.content;
    
    console.log('AI Response:', aiResponse);
    
    // Parse JSON from AI response
    let optimizedData;
    try {
      // Try to extract JSON from markdown code blocks if present
      const jsonMatch = aiResponse.match(/```json\n([\s\S]*?)\n```/) || 
                       aiResponse.match(/```\n([\s\S]*?)\n```/);
      const jsonString = jsonMatch ? jsonMatch[1] : aiResponse;
      optimizedData = JSON.parse(jsonString);
    } catch (parseError) {
      console.error('Failed to parse AI response:', parseError);
      throw new Error('AI returnerade ogiltig data. Försök igen.');
    }

    return new Response(JSON.stringify(optimizedData), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in optimize-blog-seo:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Ett okänt fel uppstod" }), 
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
