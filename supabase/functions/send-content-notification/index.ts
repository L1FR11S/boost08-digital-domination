import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface NotificationRequest {
  postTitle: string;
  postSlug: string;
  postId: string;
  wasAutoPublished: boolean;
  topic: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { postTitle, postSlug, postId, wasAutoPublished, topic }: NotificationRequest = await req.json();
    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

    if (!RESEND_API_KEY) {
      console.error("RESEND_API_KEY not configured");
      throw new Error("RESEND_API_KEY not configured");
    }

    const postUrl = `https://boost08.com/blogg/${postSlug}`;
    const editUrl = `https://boost08.com/admin/posts/${postId}/edit`;

    const statusText = wasAutoPublished 
      ? '✅ Publicerat och live på webbplatsen' 
      : '📝 Sparat som utkast för granskning';

    const actionText = wasAutoPublished
      ? `<p><strong>Åtgärd:</strong> Inlägget är redan publicerat. Du kan granska det på:</p>
         <p><a href="${postUrl}" style="color: #0066cc;">${postUrl}</a></p>`
      : `<p><strong>Åtgärd krävs:</strong> Granska och publicera inlägget här:</p>
         <p><a href="${editUrl}" style="color: #0066cc;">${editUrl}</a></p>`;

    const emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Boost08 Content Bot <noreply@boost08.com>",
        to: ["linus.friis@boost08.com"],
        subject: `🤖 Nytt AI-genererat blogginlägg: ${postTitle}`,
        html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .status { display: inline-block; padding: 8px 16px; background: ${wasAutoPublished ? '#10b981' : '#f59e0b'}; color: white; border-radius: 5px; font-weight: bold; margin: 10px 0; }
            .details { background: white; padding: 20px; border-left: 4px solid #667eea; margin: 20px 0; }
            .button { display: inline-block; padding: 12px 24px; background: #667eea; color: white; text-decoration: none; border-radius: 5px; margin: 10px 0; }
            .footer { text-align: center; color: #666; font-size: 12px; margin-top: 30px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🤖 Nytt Blogginlägg Skapat!</h1>
            </div>
            <div class="content">
              <p><span class="status">${statusText}</span></p>
              
              <div class="details">
                <h2 style="margin-top: 0; color: #667eea;">📄 Inlägg Detaljer</h2>
                <p><strong>Titel:</strong> ${postTitle}</p>
                <p><strong>Ämne:</strong> ${topic}</p>
                <p><strong>Slug:</strong> ${postSlug}</p>
                <p><strong>Post ID:</strong> ${postId}</p>
                <p><strong>Genererad:</strong> ${new Date().toLocaleString('sv-SE', { dateStyle: 'long', timeStyle: 'short' })}</p>
              </div>

              ${actionText}

              ${wasAutoPublished 
                ? `<a href="${postUrl}" class="button">Visa publicerat inlägg →</a>` 
                : `<a href="${editUrl}" class="button">Granska och publicera →</a>`
              }

              <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd;">
                <h3 style="color: #667eea;">💡 Tips</h3>
                <ul>
                  <li>Kolla att AI:n använt rätt tonalitet</li>
                  <li>Verifiera att alla fakta stämmer</li>
                  <li>Lägg till featured image om det saknas</li>
                  <li>Dela på sociala medier efter publicering</li>
                </ul>
              </div>

              <div class="footer">
                <p>Detta är ett automatiskt meddelande från Boost08 Content Automation System</p>
                <p>Alla inlägg genereras med AI (Lovable AI / Google Gemini 2.5 Flash)</p>
              </div>
            </div>
          </div>
        </body>
        </html>
        `,
      }),
    });

    if (!emailResponse.ok) {
      const errorText = await emailResponse.text();
      console.error("Resend API error:", emailResponse.status, errorText);
      throw new Error(`Failed to send email: ${errorText}`);
    }

    const emailData = await emailResponse.json();
    console.log("Notification email sent successfully:", emailData);

    return new Response(JSON.stringify(emailData), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-content-notification function:", error);
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