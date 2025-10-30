-- Create custom_forms table for dynamic form builder
CREATE TABLE public.custom_forms (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  is_active BOOLEAN NOT NULL DEFAULT false,
  fields JSONB NOT NULL DEFAULT '[]'::jsonb,
  submit_button_text TEXT NOT NULL DEFAULT 'Skicka',
  success_message TEXT NOT NULL DEFAULT 'Tack! Vi har tagit emot ditt meddelande.',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create email_templates table for customizable email templates
CREATE TABLE public.email_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  form_id UUID NOT NULL REFERENCES public.custom_forms(id) ON DELETE CASCADE,
  template_type TEXT NOT NULL CHECK (template_type IN ('user_confirmation', 'internal_notification')),
  recipient_email TEXT,
  from_email TEXT NOT NULL DEFAULT 'noreply@boost08.com',
  from_name TEXT NOT NULL DEFAULT 'Boost08',
  subject TEXT NOT NULL,
  html_body TEXT NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(form_id, template_type)
);

-- Create form_submissions table to track all submissions
CREATE TABLE public.form_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  form_id UUID NOT NULL REFERENCES public.custom_forms(id) ON DELETE CASCADE,
  submission_data JSONB NOT NULL,
  user_email_sent BOOLEAN NOT NULL DEFAULT false,
  internal_email_sent BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.custom_forms ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.email_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.form_submissions ENABLE ROW LEVEL SECURITY;

-- RLS Policies for custom_forms
CREATE POLICY "Admins can manage forms"
ON public.custom_forms
FOR ALL
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Anyone can view active forms"
ON public.custom_forms
FOR SELECT
TO anon, authenticated
USING (is_active = true);

-- RLS Policies for email_templates
CREATE POLICY "Admins can manage email templates"
ON public.email_templates
FOR ALL
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- RLS Policies for form_submissions
CREATE POLICY "Admins can view all submissions"
ON public.form_submissions
FOR SELECT
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Anyone can submit forms"
ON public.form_submissions
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Create trigger for updating updated_at on custom_forms
CREATE OR REPLACE FUNCTION public.update_custom_forms_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE TRIGGER update_custom_forms_updated_at
BEFORE UPDATE ON public.custom_forms
FOR EACH ROW
EXECUTE FUNCTION public.update_custom_forms_updated_at();

-- Create trigger for updating updated_at on email_templates
CREATE TRIGGER update_email_templates_updated_at
BEFORE UPDATE ON public.email_templates
FOR EACH ROW
EXECUTE FUNCTION public.update_custom_forms_updated_at();

-- Create indexes for better performance
CREATE INDEX idx_custom_forms_slug ON public.custom_forms(slug);
CREATE INDEX idx_custom_forms_is_active ON public.custom_forms(is_active);
CREATE INDEX idx_email_templates_form_id ON public.email_templates(form_id);
CREATE INDEX idx_form_submissions_form_id ON public.form_submissions(form_id);
CREATE INDEX idx_form_submissions_created_at ON public.form_submissions(created_at DESC);