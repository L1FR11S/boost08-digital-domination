import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface TrialRequest {
  companyName: string;
  fullName: string;
  email: string;
  phone: string;
  locations: number;
  industry: string;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { companyName, fullName, email, phone, locations, industry }: TrialRequest = await req.json();

    console.log('Processing free trial:', { companyName, fullName, email });

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Save to database
    const { error: dbError } = await supabase
      .from('free_trial_leads')
      .insert({
        company_name: companyName,
        full_name: fullName,
        email,
        phone,
        locations,
        industry,
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
          to: [email],
          subject: 'Välkommen till din 14-dagars gratis provperiod!',
          html: `
            <h1>Välkommen ${fullName}!</h1>
            <p>Tack för att du registrerade dig för vår 14-dagars gratis provperiod.</p>
            <h2>Dina uppgifter:</h2>
            <ul>
              <li><strong>Företag:</strong> ${companyName}</li>
              <li><strong>Bransch:</strong> ${industry}</li>
              <li><strong>Antal platser:</strong> ${locations}</li>
            </ul>
            <p>Vi kommer att kontakta dig inom kort för att sätta igång din provperiod.</p>
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
      JSON.stringify({ success: true, message: 'Registreringen lyckades!' }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error('Error in send-trial-email:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      }
    );
  }
});
