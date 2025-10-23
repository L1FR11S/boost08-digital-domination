-- Add SELECT policies for lead tables to protect customer data
CREATE POLICY "Admins can view exit intent leads"
ON public.exit_intent_leads
FOR SELECT
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can view free trial leads"
ON public.free_trial_leads
FOR SELECT
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can view ROI calculator leads"
ON public.roi_calculator_leads
FOR SELECT
USING (has_role(auth.uid(), 'admin'::app_role));