import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.75.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface NotificationRequest {
  postTitle: string;
  postSlug: string;
  postId: string;
  topic: string;
  wasAutoPublished: boolean;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { postTitle, postSlug, postId, topic, wasAutoPublished }: NotificationRequest = await req.json();
    
    // Initialize Supabase client
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    // Fetch email template
    const { data: template, error: templateError } = await supabase
      .from("email_templates")
      .select("*")
      .eq("template_key", "blog_notification")
      .eq("is_active", true)
      .single();

    if (templateError) throw templateError;
    if (!template) throw new Error("Email template not found or inactive");

    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    if (!resendApiKey) {
      throw new Error("RESEND_API_KEY is not set");
    }

    // Prepare data for placeholders
    const statusText = wasAutoPublished ? "✅ Publicerat" : "📝 Utkast";
    const statusClass = wasAutoPublished ? "status-published" : "status-draft";
    const actionText = wasAutoPublished ? "Visa inlägg" : "Granska och publicera";
    const editUrl = `https://boost08.com/admin/posts/${postId}/edit`;
    const postUrl = `https://boost08.com/blogg/${postSlug}`;
    const actionUrl = wasAutoPublished ? postUrl : editUrl;

    // Replace placeholders in HTML and subject
    let htmlContent = template.html_body;
    let subject = template.subject;

    const replacements: Record<string, string> = {
      "{{postTitle}}": postTitle,
      "{{postSlug}}": postSlug,
      "{{postId}}": postId,
      "{{postUrl}}": postUrl,
      "{{editUrl}}": editUrl,
      "{{topic}}": topic,
      "{{wasAutoPublished}}": wasAutoPublished.toString(),
      "{{statusText}}": statusText,
      "{{statusClass}}": statusClass,
      "{{actionText}}": actionText,
      "{{actionUrl}}": actionUrl,
    };

    Object.entries(replacements).forEach(([placeholder, value]) => {
      htmlContent = htmlContent.replace(new RegExp(placeholder, "g"), value);
      subject = subject.replace(new RegExp(placeholder, "g"), value);
    });

    console.log("Sending notification email for:", postTitle);

    const emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${resendApiKey}`,
      },
      body: JSON.stringify({
        from: `${template.from_name} <${template.from_email}>`,
        to: ["linus.friis@boost08.com"],
        subject: subject,
        html: htmlContent,
      }),
    });

    if (!emailResponse.ok) {
      const errorText = await emailResponse.text();
      console.error("Resend error:", errorText);
      throw new Error(`Failed to send email: ${errorText}`);
    }

    const emailData = await emailResponse.json();
    console.log("Email sent successfully:", emailData);

    return new Response(
      JSON.stringify(emailData),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );
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
