import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const roiRequestSchema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email().max(255),
  phone: z.string().min(1).max(20),
  company: z.string().min(1).max(200),
  industry: z.string().min(1).max(100),
  locations: z.number().int().positive().max(10000),
  reviews: z.number().int().min(0).max(100000),
  estimatedIncrease: z.string().max(50),
  newCustomers: z.string().max(50),
  revenue: z.string().max(100),
});

type ROIRequest = z.infer<typeof roiRequestSchema>;

function sanitizeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const rawData = await req.json();
    
    // Validate input
    const validationResult = roiRequestSchema.safeParse(rawData);
    if (!validationResult.success) {
      console.error('Validation error:', validationResult.error);
      return new Response(
        JSON.stringify({ error: 'Invalid input data' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json', ...corsHeaders },
        }
      );
    }

    const data = validationResult.data;
    console.log('Processing ROI calculator submission');

    // Send email using Resend
    const resendApiKey = Deno.env.get('RESEND_API_KEY');
    
    if (resendApiKey) {
      const emailResponse = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${resendApiKey}`,
        },
        body: JSON.stringify({
          from: 'Boost08 <onboarding@resend.dev>',
          to: [data.email],
          subject: 'Din Personliga ROI-Rapport från Boost08',
          html: `
            <h1>Hej ${sanitizeHtml(data.name)}!</h1>
            <p>Tack för att du använde vår ROI-kalkylator. Här är din personliga rapport:</p>
            <h2>Dina uppgifter:</h2>
            <ul>
              <li><strong>Företag:</strong> ${sanitizeHtml(data.company)}</li>
              <li><strong>Bransch:</strong> ${sanitizeHtml(data.industry)}</li>
              <li><strong>Antal platser:</strong> ${data.locations}</li>
              <li><strong>Nuvarande recensioner/månad:</strong> ${data.reviews}</li>
            </ul>
            <h2>Estimerad Potential:</h2>
            <ul>
              <li><strong>Ökad Synlighet:</strong> ${sanitizeHtml(data.estimatedIncrease)}</li>
              <li><strong>Nya Kunder/Månad:</strong> ${sanitizeHtml(data.newCustomers)}</li>
              <li><strong>Uppskattad Omsättning:</strong> ${sanitizeHtml(data.revenue)}</li>
            </ul>
            <p>Vill du veta mer om hur vi kan hjälpa dig nå dessa resultat? Boka ett gratis möte med oss!</p>
            <br>
            <p>Med vänliga hälsningar,<br>Boost08 Teamet</p>
          `,
        }),
      });

      if (!emailResponse.ok) {
        console.error('Email error:', await emailResponse.text());
      } else {
        console.log('Email sent successfully');
      }
    }

    return new Response(
      JSON.stringify({ success: true, message: 'Din rapport har skickats!' }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error('Error in send-roi-email:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      }
    );
  }
});
