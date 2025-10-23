-- Add SELECT policy for contact_leads table to allow only admins to view submissions
CREATE POLICY "Admins can view all contact submissions"
ON public.contact_leads
FOR SELECT
USING (has_role(auth.uid(), 'admin'::app_role));