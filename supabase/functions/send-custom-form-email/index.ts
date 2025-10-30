import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.75.0";
import { Resend } from "npm:resend@2.0.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface CustomFormEmailRequest {
  formId: string;
  submissionData: Record<string, any>;
  testMode?: boolean;
}

const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const supabase = createClient(supabaseUrl, supabaseKey);

// Replace placeholders in template with actual data
function replacePlaceholders(template: string, data: Record<string, any>): string {
  let result = template;
  for (const [key, value] of Object.entries(data)) {
    const placeholder = new RegExp(`{{${key}}}`, 'g');
    result = result.replace(placeholder, String(value || ''));
  }
  return result;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { formId, submissionData, testMode = false }: CustomFormEmailRequest = await req.json();
    
    console.log("Processing custom form submission:", { formId, testMode });

    // Fetch form configuration
    const { data: form, error: formError } = await supabase
      .from('custom_forms')
      .select('*')
      .eq('id', formId)
      .single();

    if (formError || !form) {
      console.error("Form not found:", formError);
      return new Response(
        JSON.stringify({ error: "Form not found" }),
        { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Fetch email templates
    const { data: templates, error: templatesError } = await supabase
      .from('email_templates')
      .select('*')
      .eq('form_id', formId)
      .eq('is_active', true);

    if (templatesError) {
      console.error("Error fetching templates:", templatesError);
      return new Response(
        JSON.stringify({ error: "Error fetching email templates" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    let userEmailSent = false;
    let internalEmailSent = false;

    // Send user confirmation email
    const userTemplate = templates?.find(t => t.template_type === 'user_confirmation');
    if (userTemplate && submissionData.email) {
      const subject = testMode 
        ? `[TEST] ${replacePlaceholders(userTemplate.subject, submissionData)}`
        : replacePlaceholders(userTemplate.subject, submissionData);
      
      const htmlBody = replacePlaceholders(userTemplate.html_body, submissionData);
      
      const recipient = testMode ? 'linus.friis@boost08.com' : submissionData.email;

      try {
        await resend.emails.send({
          from: `${userTemplate.from_name} <${userTemplate.from_email}>`,
          to: [recipient],
          subject: subject,
          html: htmlBody,
        });
        userEmailSent = true;
        console.log(`User confirmation email sent to ${recipient}`);
      } catch (error) {
        console.error("Error sending user email:", error);
      }
    }

    // Send internal notification email
    const internalTemplate = templates?.find(t => t.template_type === 'internal_notification');
    if (internalTemplate) {
      const subject = testMode
        ? `[TEST] ${replacePlaceholders(internalTemplate.subject, submissionData)}`
        : replacePlaceholders(internalTemplate.subject, submissionData);
      
      const htmlBody = replacePlaceholders(internalTemplate.html_body, submissionData);
      
      const recipient = testMode 
        ? 'linus.friis@boost08.com' 
        : (internalTemplate.recipient_email || 'hello@boost08.com');

      try {
        await resend.emails.send({
          from: `${internalTemplate.from_name} <${internalTemplate.from_email}>`,
          to: [recipient],
          subject: subject,
          html: htmlBody,
        });
        internalEmailSent = true;
        console.log(`Internal notification sent to ${recipient}`);
      } catch (error) {
        console.error("Error sending internal email:", error);
      }
    }

    // Log submission (skip in test mode)
    if (!testMode) {
      const { error: submissionError } = await supabase
        .from('form_submissions')
        .insert({
          form_id: formId,
          submission_data: submissionData,
          user_email_sent: userEmailSent,
          internal_email_sent: internalEmailSent,
        });

      if (submissionError) {
        console.error("Error logging submission:", submissionError);
      }
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        userEmailSent, 
        internalEmailSent,
        testMode 
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error: any) {
    console.error("Error in send-custom-form-email:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
};

serve(handler);
