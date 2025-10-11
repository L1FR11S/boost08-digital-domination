import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface ContactRequest {
  name: string;
  email: string;
  company?: string;
  message: string;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, company, message }: ContactRequest = await req.json();

    console.log('Processing contact form:', { name, email, company });

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Save to database
    const { error: dbError } = await supabase
      .from('contact_leads')
      .insert({
        name,
        email,
        company,
        message,
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
          subject: 'Tack för ditt meddelande!',
          html: `
            <h1>Hej ${name}!</h1>
            <p>Tack för att du kontaktade oss. Vi har tagit emot ditt meddelande och återkommer inom kort.</p>
            <p><strong>Ditt meddelande:</strong></p>
            <p>${message}</p>
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
      JSON.stringify({ success: true, message: 'Tack för ditt meddelande!' }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error('Error in send-contact-email:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      }
    );
  }
});
