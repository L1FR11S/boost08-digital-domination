import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

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

    // Send email using Resend
    const resendApiKey = Deno.env.get('RESEND_API_KEY');
    
    if (resendApiKey) {
      // Send confirmation email to user
      const confirmationResponse = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${resendApiKey}`,
        },
        body: JSON.stringify({
          from: 'Boost08 <noreply@boost08.com>',
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

      if (!confirmationResponse.ok) {
        console.error('Confirmation email error:', await confirmationResponse.text());
      } else {
        console.log('Confirmation email sent successfully');
      }

      // Send notification email to hello@boost08.com
      const notificationResponse = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${resendApiKey}`,
        },
        body: JSON.stringify({
          from: 'Boost08 <noreply@boost08.com>',
          to: ['hello@boost08.com'],
          subject: '🔔 Nytt kontaktformulär från boost08.com',
          html: `
            <h1>Nytt kontaktformulär</h1>
            <p><strong>Namn:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Företag:</strong> ${company || 'Ej angivet'}</p>
            <hr>
            <p><strong>Meddelande:</strong></p>
            <p>${message}</p>
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
