import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.75.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { templateKey, testEmail } = await req.json();

    // Initialize Supabase client
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    // Fetch template
    const { data: template, error: templateError } = await supabase
      .from("email_templates")
      .select("*")
      .eq("template_key", templateKey)
      .single();

    if (templateError) throw templateError;
    if (!template) throw new Error("Template not found");

    // Test data for placeholders based on template type
    const testData: Record<string, Record<string, string>> = {
      blog_notification: {
        "{{postTitle}}": "Test Blogginlägg Titel",
        "{{postSlug}}": "test-blogg-slug",
        "{{postId}}": "123e4567-e89b-12d3-a456-426614174000",
        "{{postUrl}}": "https://boost08.com/blog/test-blogg-slug",
        "{{editUrl}}": "https://boost08.com/admin/posts/123e4567-e89b-12d3-a456-426614174000",
        "{{topic}}": "Lokal SEO Optimering",
        "{{wasAutoPublished}}": "true",
        "{{statusText}}": "✅ Publicerat",
        "{{statusClass}}": "status-published",
        "{{actionText}}": "Visa inlägg",
        "{{actionUrl}}": "https://boost08.com/blog/test-blogg-slug",
      },
      blog_lead: {
        "{{name}}": "Test Användare",
        "{{email}}": testEmail,
        "{{company}}": "Test Företag AB",
        "{{downloadUrl}}": "https://boost08.com/downloads/guide.pdf",
      },
      contact: {
        "{{name}}": "Test Användare",
        "{{email}}": testEmail,
        "{{company}}": "Test Företag AB",
        "{{message}}": "Detta är ett test-meddelande från kontaktformuläret.",
      },
      roi_calculator: {
        "{{name}}": "Test Användare",
        "{{email}}": testEmail,
        "{{company}}": "Test Företag AB",
        "{{phone}}": "08-123 456 78",
        "{{industry}}": "Restaurang",
        "{{revenue}}": "2 500 000",
        "{{newCustomers}}": "45",
        "{{estimatedIncrease}}": "35",
        "{{locations}}": "3",
        "{{reviews}}": "120",
      },
      free_trial: {
        "{{fullName}}": "Test Användare",
        "{{email}}": testEmail,
        "{{companyName}}": "Test Företag AB",
        "{{phone}}": "08-123 456 78",
        "{{locations}}": "3",
        "{{industry}}": "Restaurang",
      },
    };

    // Replace placeholders with test data
    let htmlBody = template.html_body;
    let subject = template.subject;

    const placeholders = testData[templateKey] || {};
    Object.entries(placeholders).forEach(([placeholder, value]) => {
      htmlBody = htmlBody.replace(new RegExp(placeholder, "g"), value);
      subject = subject.replace(new RegExp(placeholder, "g"), value);
    });

    // Send email via Resend
    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    if (!resendApiKey) {
      throw new Error("RESEND_API_KEY is not set");
    }

    const emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${resendApiKey}`,
      },
      body: JSON.stringify({
        from: `${template.from_name} <${template.from_email}>`,
        to: [testEmail],
        subject: `[TEST] ${subject}`,
        html: htmlBody,
      }),
    });

    if (!emailResponse.ok) {
      const errorText = await emailResponse.text();
      console.error("Resend error:", errorText);
      throw new Error(`Failed to send email: ${errorText}`);
    }

    const emailData = await emailResponse.json();
    console.log("Test email sent successfully:", emailData);

    return new Response(
      JSON.stringify({ success: true, data: emailData }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error("Error in send-test-email:", error);
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
