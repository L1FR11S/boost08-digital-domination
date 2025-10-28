import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const blogLeadSchema = z.object({
  email: z.string().email().max(255),
  name: z.string().max(100).optional(),
  postId: z.string().uuid().optional(),
});

type BlogLeadEmailRequest = z.infer<typeof blogLeadSchema>;

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const rawData = await req.json();
    
    // Validate input
    const validationResult = blogLeadSchema.safeParse(rawData);
    if (!validationResult.success) {
      console.error('Validation error:', validationResult.error);
      return new Response(
        JSON.stringify({ error: 'Invalid input data' }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    const { email, name, postId } = validationResult.data;
    
    console.log("Blog lead submission received");

    // Send emails using Resend
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
          subject: 'Tack för din anmälan!',
          html: `
            <h1>Hej ${name || 'där'}!</h1>
            <p>Tack för ditt intresse för vårt innehåll. Vi har tagit emot din anmälan!</p>
            <p>Håll utkik efter mer värdefull information från oss inom kort.</p>
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
          subject: '📥 Ny blog lead från boost08.com',
          html: `
            <h1>Ny blog lead</h1>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Namn:</strong> ${name || 'Ej angivet'}</p>
            <p><strong>Post ID:</strong> ${postId || 'Ej angivet'}</p>
          `,
        }),
      });

      if (!notificationResponse.ok) {
        console.error('Notification email error:', await notificationResponse.text());
      } else {
        console.log('Notification email sent successfully');
      }
    }

    return new Response(JSON.stringify({ success: true, message: "Lead captured" }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-blog-lead-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
