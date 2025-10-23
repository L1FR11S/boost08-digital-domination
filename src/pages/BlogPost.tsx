import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import Layout from "@/components/Layout";
import SEOHead from "@/components/seo/SEOHead";
import SchemaMarkup from "@/components/seo/SchemaMarkup";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import BlogLeadForm from "@/components/blog/BlogLeadForm";
import BlogExitIntent from "@/components/blog/BlogExitIntent";
import BlogFloatingCTA from "@/components/blog/BlogFloatingCTA";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/utils/blogUtils";
import { useExitIntent } from "@/hooks/useExitIntent";
import { trackPageView } from "@/utils/analytics";
import { useEffect } from "react";
import { Clock, Calendar } from "lucide-react";
import NotFound from "./NotFound";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";

interface BlogCategory {
  name: string;
  slug: string;
}

interface BlogPostCategory {
  blog_categories: BlogCategory;
}

const BlogPost = () => {
  const { slug } = useParams();
  const { showExitIntent, setShowExitIntent } = useExitIntent();

  const { data: post, isLoading, error } = useQuery({
    queryKey: ["blog-post", slug],
    queryFn: async () => {
      try {
        console.log('[BlogPost] Fetching post with slug:', slug);
        
        const { data, error } = await supabase
          .from("blog_posts")
          .select(`
            *,
            blog_post_categories (
              blog_categories (name, slug)
            )
          `)
          .eq("slug", slug)
          .eq("status", "published")
          .maybeSingle();

        if (error) {
          console.error('[BlogPost] Database error:', error);
          throw error;
        }
        
        if (!data) {
          console.log('[BlogPost] No post found for slug:', slug);
          return null;
        }

        console.log('[BlogPost] Post fetched successfully:', data.title);

        // Increment view count (async, fire-and-forget)
        void supabase
          .from("blog_posts")
          .update({ views: (data.views || 0) + 1 })
          .eq("id", data.id);

        return data;
      } catch (err) {
        console.error('[BlogPost] Error in queryFn:', err);
        throw err;
      }
    },
  });

  useEffect(() => {
    if (post) {
      trackPageView(`/blogg/${post.slug}`, post.title);
    }
  }, [post]);

  if (isLoading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16">
          <p>Laddar...</p>
        </div>
      </Layout>
    );
  }

  if (error) {
    console.error('[BlogPost] Render error:', error);
    return <NotFound />;
  }

  if (!post) {
    return <NotFound />;
  }

  let categories: BlogCategory[] = [];
  try {
    categories = (post.blog_post_categories as BlogPostCategory[])?.map(
      (pc) => pc.blog_categories
    ) || [];
  } catch (err) {
    console.error('[BlogPost] Error mapping categories:', err);
  }

  return (
    <Layout>
      <SEOHead
        title={post.meta_title || post.title}
        description={post.meta_description || post.excerpt}
        keywords={post.keywords || []}
        ogType="article"
        article={{
          publishedTime: post.published_at || post.created_at,
          modifiedTime: post.updated_at,
          tags: categories.map((c: any) => c.name),
        }}
      />

      <SchemaMarkup
        type="Article"
        data={{
          headline: post.title,
          image: post.featured_image,
          datePublished: post.published_at || post.created_at,
          dateModified: post.updated_at,
        }}
      />

      <BreadcrumbSchema
        items={[
          { name: "Hem", url: "https://boost08.com" },
          { name: "Blogg", url: "https://boost08.com/blogg" },
          { name: post.title, url: `https://boost08.com/blogg/${post.slug}` },
        ]}
      />

      <article className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {post.featured_image && (
            <img
              src={post.featured_image}
              alt={post.title}
              className="w-full aspect-video object-cover rounded-lg mb-8"
            />
          )}

          <div className="mb-8">
            <div className="flex flex-wrap gap-2 mb-4">
              {categories.map((category: any) => (
                <Badge key={category.slug} variant="secondary">
                  {category.name}
                </Badge>
              ))}
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-4">{post.title}</h1>

            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <span className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {formatDate(post.published_at || post.created_at)}
              </span>
              <span className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                {post.reading_time} min läsning
              </span>
            </div>
          </div>

          <div className="prose prose-lg max-w-none mb-12 markdown-content">
            <p className="lead text-xl text-muted-foreground mb-8">{post.excerpt}</p>
            
            <ReactMarkdown
              rehypePlugins={[rehypeRaw]}
              remarkPlugins={[remarkGfm]}
              components={{
                h2: ({ children }) => (
                  <h2 className="text-3xl font-bold mt-8 mb-4 text-foreground">{children}</h2>
                ),
                h3: ({ children }) => (
                  <h3 className="text-2xl font-semibold mt-6 mb-3 text-foreground">{children}</h3>
                ),
                p: ({ children }) => (
                  <p className="text-base leading-relaxed mb-4 text-foreground/90">{children}</p>
                ),
                strong: ({ children }) => (
                  <strong className="font-bold text-primary">{children}</strong>
                ),
                ul: ({ children }) => (
                  <ul className="list-disc pl-6 mb-4 space-y-2">{children}</ul>
                ),
                ol: ({ children }) => (
                  <ol className="list-decimal pl-6 mb-4 space-y-2">{children}</ol>
                ),
                li: ({ children }) => (
                  <li className="text-foreground/90">{children}</li>
                ),
                blockquote: ({ children }) => (
                  <blockquote className="border-l-4 border-primary pl-4 italic my-4 bg-primary/5 py-2 rounded-r">
                    {children}
                  </blockquote>
                ),
                code: ({ children }) => (
                  <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono">{children}</code>
                ),
                a: ({ children, href }) => (
                  <a href={href} className="text-primary hover:underline font-medium">{children}</a>
                ),
              }}
            >
              {post.content}
            </ReactMarkdown>

            <BlogLeadForm
              type="inline"
              title="Vill du ha fler tips som dessa?"
              description="Få vår kompletta guide till lokal SEO direkt i din inkorg"
              postId={post.id}
              leadType="inline_mid"
            />
          </div>

          <div className="border-t pt-8">
            <BlogLeadForm
              type="inline"
              title="Redo att växa ditt företag?"
              description="Få en gratis ROI-analys och se hur mycket mer du kan tjäna"
              postId={post.id}
              leadType="inline_end"
            />
          </div>
        </div>
      </article>

      <BlogExitIntent
        title="Vänta! Ta med dig våra bästa tips"
        postId={post.id}
        open={showExitIntent}
        onOpenChange={setShowExitIntent}
      />

      <BlogFloatingCTA
        text="Vill du ha fler tips som dessa?"
        postId={post.id}
      />
    </Layout>
  );
};

export default BlogPost;
