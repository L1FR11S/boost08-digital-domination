-- Add CTA fields to blog_posts table
ALTER TABLE blog_posts 
ADD COLUMN cta_mid_title text,
ADD COLUMN cta_mid_description text,
ADD COLUMN cta_end_title text,
ADD COLUMN cta_end_description text;

COMMENT ON COLUMN blog_posts.cta_mid_title IS 'AI-generated title for mid-content CTA';
COMMENT ON COLUMN blog_posts.cta_mid_description IS 'AI-generated description for mid-content CTA';
COMMENT ON COLUMN blog_posts.cta_end_title IS 'AI-generated title for end-content CTA';
COMMENT ON COLUMN blog_posts.cta_end_description IS 'AI-generated description for end-content CTA';