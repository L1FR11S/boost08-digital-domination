import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const trialRequestSchema = z.object({
  companyName: z.string().min(1).max(200),
  fullName: z.string().min(1).max(100),
  email: z.string().email().max(255),
  phone: z.string().min(1).max(20),
  locations: z.number().int().positive().max(10000),
  industry: z.string().min(1).max(100),
});

type TrialRequest = z.infer<typeof trialRequestSchema>;

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
    const validationResult = trialRequestSchema.safeParse(rawData);
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

    const { companyName, fullName, email, phone, locations, industry } = validationResult.data;
    console.log('Processing free trial submission');

    // Send email using Resend
    const resendApiKey = Deno.env.get('RESEND_API_KEY');
    
    if (resendApiKey) {
      // Send welcome email to user
      const welcomeResponse = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${resendApiKey}`,
        },
        body: JSON.stringify({
          from: 'Boost08 <noreply@boost08.com>',
          to: [email],
          subject: 'Välkommen till din 14-dagars gratis provperiod!',
          html: `
            <h1>Välkommen ${sanitizeHtml(fullName)}!</h1>
            <p>Tack för att du registrerade dig för vår 14-dagars gratis provperiod.</p>
            <h2>Dina uppgifter:</h2>
            <ul>
              <li><strong>Företag:</strong> ${sanitizeHtml(companyName)}</li>
              <li><strong>Bransch:</strong> ${sanitizeHtml(industry)}</li>
              <li><strong>Antal platser:</strong> ${locations}</li>
            </ul>
            <p>Vi kommer att kontakta dig inom kort för att sätta igång din provperiod.</p>
            <br>
            <p>Med vänliga hälsningar,<br>Boost08 Teamet</p>
          `,
        }),
      });

      if (!welcomeResponse.ok) {
        console.error('Welcome email error:', await welcomeResponse.text());
      } else {
        console.log('Welcome email sent successfully');
      }

      // Send notification to hello@boost08.com
      const notificationResponse = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${resendApiKey}`,
        },
        body: JSON.stringify({
          from: 'Boost08 <noreply@boost08.com>',
          to: ['hello@boost08.com'],
          subject: '🎉 Ny Free Trial registrering från boost08.com',
          html: `
            <h1>Ny Free Trial registrering</h1>
            <p><strong>Företagsnamn:</strong> ${sanitizeHtml(companyName)}</p>
            <p><strong>Kontaktperson:</strong> ${sanitizeHtml(fullName)}</p>
            <p><strong>Email:</strong> ${sanitizeHtml(email)}</p>
            <p><strong>Telefon:</strong> ${sanitizeHtml(phone)}</p>
            <hr>
            <p><strong>Antal platser:</strong> ${locations}</p>
            <p><strong>Bransch:</strong> ${sanitizeHtml(industry)}</p>
          `,
        }),
      });

      if (!notificationResponse.ok) {
        console.error('Notification email error:', await notificationResponse.text());
      } else {
        console.log('Notification email sent successfully');
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
