import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface GenerateBlogRequest {
  scheduleId: string;
  topic: string;
  keywords: string[];
  targetAudience?: string;
  contentType: string;
  targetWordCount: number;
  primaryKeyword?: string;
  autoPublish: boolean;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    const SUPABASE_URL = Deno.env.get('SUPABASE_URL');
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

    if (!LOVABLE_API_KEY) throw new Error('LOVABLE_API_KEY not configured');
    if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) throw new Error('Supabase credentials not configured');

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
    const payload: GenerateBlogRequest = await req.json();

    console.log('Generating blog post for schedule:', payload.scheduleId);

    // Update status to 'generating'
    await supabase
      .from('content_schedule')
      .update({ status: 'generating' })
      .eq('id', payload.scheduleId);

    // Build AI prompt
    const contentTypeInstructions = {
      guide: 'Skriv en omfattande guide med djupgående förklaringar och praktiska steg.',
      listicle: 'Skapa en lista med konkreta punkter. Använd numrerade rubriker (## 1. Första punkten).',
      how_to: 'Skriv en steg-för-steg instruktion som är lätt att följa.',
      case_study: 'Berätta en verklig historia med problem, lösning och resultat. Inkludera konkreta siffror.',
      news: 'Skriv en nyhetsartikel med aktuell information och relevans.'
    };

    const systemPrompt = `Du är en expertskribent inom digital marknadsföring för svenska lokala företag.

Skriv ett ${payload.contentType} blogginlägg på svenska (Sverige) om "${payload.topic}".

MÅLGRUPP: ${payload.targetAudience || 'Svenska småföretagare och lokala företag'}
HUVUDSÖKORD: ${payload.primaryKeyword || payload.keywords[0]}
RELATERADE SÖKORD: ${payload.keywords.join(', ')}
MÅLÄNGD: ${payload.targetWordCount} ord

INNEHÅLLSTYP: ${contentTypeInstructions[payload.contentType as keyof typeof contentTypeInstructions]}

KRAV:
- Skriv ENDAST på svenska (Sverige)
- Använd naturlig keyword placement (inte keyword stuffing)
- Inkludera minst 3-5 H2-rubriker (##)
- Använd bullet points och listor där det passar
- Lägg till praktiska exempel från svenska företag
- Avsluta med en stark call-to-action som uppmanar att kontakta Boost08
- Skriv i Markdown-format
- Använd en professionell men tillgänglig ton
- Inkludera konkreta tips som läsaren kan implementera direkt

STRUKTUR:
1. Stark inledning som fångar intresse (2-3 stycken)
2. Huvudinnehåll med tydliga H2-rubriker
3. Praktiska exempel och tips
4. Sammanfattning av nyckelpunkter
5. Call-to-action

Generera ENDAST Markdown-innehållet, inget annat. Börja direkt med inledningen utan titel (titeln skapas separat).`;

    // Call Lovable AI
    const aiResponse = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: `Skapa blogginlägg: ${payload.topic}` }
        ],
        temperature: 0.7,
        max_tokens: 4000
      }),
    });

    if (!aiResponse.ok) {
      const errorText = await aiResponse.text();
      console.error('Lovable AI error:', aiResponse.status, errorText);
      
      if (aiResponse.status === 429) {
        throw new Error('Rate limit exceeded. Will retry later.');
      }
      if (aiResponse.status === 402) {
        throw new Error('Payment required. Please add credits to Lovable AI.');
      }
      throw new Error(`AI generation failed: ${errorText}`);
    }

    const aiData = await aiResponse.json();
    const generatedContent = aiData.choices[0].message.content;

    console.log('AI content generated, length:', generatedContent.length);

    // Generate title and excerpt from content
    const lines = generatedContent.split('\n').filter((l: string) => l.trim());
    const firstParagraph = lines.slice(0, 3).join(' ').substring(0, 200);
    
    const title = payload.topic;
    const excerpt = firstParagraph + '...';

    // Generate slug
    const slug = title
      .toLowerCase()
      .replace(/å/g, 'a')
      .replace(/ä/g, 'a')
      .replace(/ö/g, 'o')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');

    // Calculate reading time
    const wordCount = generatedContent.split(/\s+/).length;
    const readingTime = Math.ceil(wordCount / 200);

    // Quality checks
    const headingCount = (generatedContent.match(/^#{2,3}\s/gm) || []).length;
    const hasKeyword = generatedContent.toLowerCase().includes((payload.primaryKeyword || payload.keywords[0]).toLowerCase());
    const meetsSizeRequirement = wordCount >= payload.targetWordCount * 0.7;

    if (!meetsSizeRequirement || headingCount < 2 || !hasKeyword) {
      console.warn('Quality check warning:', { wordCount, headingCount, hasKeyword });
    }

    // Call SEO optimization
    const seoResponse = await supabase.functions.invoke('optimize-blog-seo', {
      body: {
        title,
        excerpt,
        content: generatedContent,
        keywords: payload.keywords
      }
    });

    let metaTitle = title;
    let metaDescription = excerpt;
    let optimizedKeywords = payload.keywords;

    if (seoResponse.data && !seoResponse.error) {
      metaTitle = seoResponse.data.metaTitle || title;
      metaDescription = seoResponse.data.metaDescription || excerpt;
      optimizedKeywords = seoResponse.data.keywords || payload.keywords;
    }

    // Insert blog post
    const { data: post, error: insertError } = await supabase
      .from('blog_posts')
      .insert({
        title,
        slug,
        excerpt,
        content: generatedContent,
        meta_title: metaTitle,
        meta_description: metaDescription,
        keywords: optimizedKeywords,
        reading_time: readingTime,
        status: payload.autoPublish ? 'published' : 'draft',
        published_at: payload.autoPublish ? new Date().toISOString() : null,
        cta_title: 'Redo att boosta din digitala närvaro?',
        cta_description: 'Kontakta oss idag för en kostnadsfri konsultation och se hur vi kan hjälpa ditt företag växa online.'
      })
      .select()
      .single();

    if (insertError) {
      console.error('Insert error:', insertError);
      throw insertError;
    }

    console.log('Blog post created:', post.id);

    // Update schedule
    await supabase
      .from('content_schedule')
      .update({
        status: 'published',
        generated_post_id: post.id,
        published_at: new Date().toISOString(),
        error_message: null
      })
      .eq('id', payload.scheduleId);

    // Send notification email
    await supabase.functions.invoke('send-content-notification', {
      body: {
        postTitle: title,
        postSlug: slug,
        postId: post.id,
        wasAutoPublished: payload.autoPublish,
        topic: payload.topic
      }
    });

    return new Response(
      JSON.stringify({ 
        success: true, 
        postId: post.id,
        slug: post.slug,
        wordCount,
        readingTime
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
    );

  } catch (error: any) {
    console.error('Error in generate-blog-post:', error);

    // Try to update schedule with error
    try {
      const payload: GenerateBlogRequest = await req.json();
      const SUPABASE_URL = Deno.env.get('SUPABASE_URL');
      const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
      
      if (SUPABASE_URL && SUPABASE_SERVICE_ROLE_KEY) {
        const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
        await supabase
          .from('content_schedule')
          .update({
            status: 'failed',
            error_message: error.message,
            retry_count: supabase.rpc('increment', { schedule_id: payload.scheduleId })
          })
          .eq('id', payload.scheduleId);
      }
    } catch (updateError) {
      console.error('Failed to update schedule with error:', updateError);
    }

    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    );
  }
});