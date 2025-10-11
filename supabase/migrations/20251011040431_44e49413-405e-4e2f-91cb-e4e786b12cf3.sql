-- Create leads tables for form submissions

-- Contact form leads
CREATE TABLE public.contact_leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Free trial leads
CREATE TABLE public.free_trial_leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_name TEXT NOT NULL,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  locations INTEGER NOT NULL,
  industry TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Exit intent leads
CREATE TABLE public.exit_intent_leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- ROI calculator leads
CREATE TABLE public.roi_calculator_leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  company TEXT NOT NULL,
  industry TEXT NOT NULL,
  locations INTEGER NOT NULL,
  reviews INTEGER NOT NULL,
  estimated_increase TEXT,
  new_customers TEXT,
  revenue TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.contact_leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.free_trial_leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.exit_intent_leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.roi_calculator_leads ENABLE ROW LEVEL SECURITY;

-- Create policies (public insert, no read for users - admin only via backend)
CREATE POLICY "Anyone can submit contact form" 
ON public.contact_leads 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Anyone can submit free trial form" 
ON public.free_trial_leads 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Anyone can submit exit intent form" 
ON public.exit_intent_leads 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Anyone can submit ROI calculator form" 
ON public.roi_calculator_leads 
FOR INSERT 
WITH CHECK (true);