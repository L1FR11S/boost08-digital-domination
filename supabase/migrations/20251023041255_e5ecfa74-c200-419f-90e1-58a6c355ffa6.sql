-- Replace multiple CTA fields with single dynamic CTA
ALTER TABLE blog_posts 
DROP COLUMN IF EXISTS cta_mid_title,
DROP COLUMN IF EXISTS cta_mid_description,
DROP COLUMN IF EXISTS cta_end_title,
DROP COLUMN IF EXISTS cta_end_description;

ALTER TABLE blog_posts 
ADD COLUMN cta_title text,
ADD COLUMN cta_description text;

COMMENT ON COLUMN blog_posts.cta_title IS 'AI-generated dynamic CTA title';
COMMENT ON COLUMN blog_posts.cta_description IS 'AI-generated dynamic CTA description';