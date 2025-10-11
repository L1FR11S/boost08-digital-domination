import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface ROIRequest {
  name: string;
  email: string;
  phone: string;
  company: string;
  industry: string;
  locations: number;
  reviews: number;
  estimatedIncrease: string;
  newCustomers: string;
  revenue: string;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const data: ROIRequest = await req.json();

    console.log('Processing ROI calculator:', { name: data.name, email: data.email });

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Save to database
    const { error: dbError } = await supabase
      .from('roi_calculator_leads')
      .insert({
        name: data.name,
        email: data.email,
        phone: data.phone,
        company: data.company,
        industry: data.industry,
        locations: data.locations,
        reviews: data.reviews,
        estimated_increase: data.estimatedIncrease,
        new_customers: data.newCustomers,
        revenue: data.revenue,
      });

    if (dbError) {
      console.error('Database error:', dbError);
      throw dbError;
    }

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
            <h1>Hej ${data.name}!</h1>
            <p>Tack för att du använde vår ROI-kalkylator. Här är din personliga rapport:</p>
            <h2>Dina uppgifter:</h2>
            <ul>
              <li><strong>Företag:</strong> ${data.company}</li>
              <li><strong>Bransch:</strong> ${data.industry}</li>
              <li><strong>Antal platser:</strong> ${data.locations}</li>
              <li><strong>Nuvarande recensioner/månad:</strong> ${data.reviews}</li>
            </ul>
            <h2>Estimerad Potential:</h2>
            <ul>
              <li><strong>Ökad Synlighet:</strong> ${data.estimatedIncrease}</li>
              <li><strong>Nya Kunder/Månad:</strong> ${data.newCustomers}</li>
              <li><strong>Uppskattad Omsättning:</strong> ${data.revenue}</li>
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
