-- Create content_schedule table for AI-powered blog automation
CREATE TABLE IF NOT EXISTS public.content_schedule (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  
  -- Scheduling
  scheduled_date DATE NOT NULL,
  scheduled_time TIME DEFAULT '09:00:00',
  published_at TIMESTAMPTZ,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'generating', 'generated', 'published', 'failed')),
  
  -- Content instructions
  topic TEXT NOT NULL,
  keywords TEXT[] NOT NULL,
  target_audience TEXT,
  content_type TEXT DEFAULT 'guide' CHECK (content_type IN ('guide', 'case_study', 'listicle', 'how_to', 'news')),
  
  -- SEO settings
  target_word_count INTEGER DEFAULT 1500,
  primary_keyword TEXT,
  
  -- Generated content reference
  generated_post_id UUID REFERENCES public.blog_posts(id) ON DELETE SET NULL,
  
  -- Error handling
  error_message TEXT,
  retry_count INTEGER DEFAULT 0,
  
  -- Auto-publish setting
  auto_publish BOOLEAN DEFAULT true
);

-- Create index for performance
CREATE INDEX IF NOT EXISTS idx_content_schedule_date_status ON public.content_schedule(scheduled_date, status);
CREATE INDEX IF NOT EXISTS idx_content_schedule_status ON public.content_schedule(status);

-- Enable RLS
ALTER TABLE public.content_schedule ENABLE ROW LEVEL SECURITY;

-- RLS Policies: Only admins can manage content schedules
CREATE POLICY "Admins can view all schedules"
  ON public.content_schedule
  FOR SELECT
  USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can create schedules"
  ON public.content_schedule
  FOR INSERT
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update schedules"
  ON public.content_schedule
  FOR UPDATE
  USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete schedules"
  ON public.content_schedule
  FOR DELETE
  USING (has_role(auth.uid(), 'admin'::app_role));

-- Trigger to update updated_at
CREATE OR REPLACE FUNCTION public.update_content_schedule_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE TRIGGER update_content_schedule_updated_at
  BEFORE UPDATE ON public.content_schedule
  FOR EACH ROW
  EXECUTE FUNCTION public.update_content_schedule_updated_at();