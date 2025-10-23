import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import Layout from "@/components/Layout";
import SEOHead from "@/components/seo/SEOHead";
import BlogCard from "@/components/blog/BlogCard";
import BlogLeadForm from "@/components/blog/BlogLeadForm";
import { Badge } from "@/components/ui/badge";
import { trackPageView } from "@/utils/analytics";
import { useEffect } from "react";

const BlogOverview = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    trackPageView("/blogg", "Blogg");
  }, []);

  const { data: categories } = useQuery({
    queryKey: ["blog-categories"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blog_categories")
        .select("*")
        .order("name");
      if (error) throw error;
      return data;
    },
  });

  const { data: posts, isLoading, error } = useQuery({
    queryKey: ["blog-posts", selectedCategory],
    queryFn: async () => {
      try {
        console.log('[BlogOverview] Fetching posts, category:', selectedCategory || 'all');

        let query = supabase
          .from("blog_posts")
          .select(`
            *,
            blog_post_categories (
              blog_categories (name)
            )
          `)
          .eq("status", "published")
          .order("published_at", { ascending: false });

        if (selectedCategory) {
          try {
            const { data: categoryData, error: categoryError } = await supabase
              .from("blog_categories")
              .select("id")
              .eq("slug", selectedCategory)
              .maybeSingle();

            if (categoryError) {
              console.error('[BlogOverview] Category query error:', categoryError);
            }

            if (categoryData) {
              console.log('[BlogOverview] Found category:', categoryData.id);
              
              const { data: postIds, error: postIdsError } = await supabase
                .from("blog_post_categories")
                .select("post_id")
                .eq("category_id", categoryData.id);

              if (postIdsError) {
                console.error('[BlogOverview] Post IDs query error:', postIdsError);
              }

              const ids = postIds?.map(p => p.post_id) || [];
              console.log('[BlogOverview] Found post IDs:', ids.length);
              
              if (ids.length > 0) {
                query = query.in("id", ids);
              } else {
                return [];
              }
            } else {
              console.log('[BlogOverview] Category not found:', selectedCategory);
              return [];
            }
          } catch (categoryErr) {
            console.error('[BlogOverview] Error in category filtering:', categoryErr);
          }
        }

        const { data, error: postsError } = await query;

        if (postsError) {
          console.error('[BlogOverview] Posts query error:', postsError);
          throw postsError;
        }

        console.log('[BlogOverview] Fetched posts:', data?.length || 0);
        return data || [];
      } catch (err) {
        console.error('[BlogOverview] Error in queryFn:', err);
        throw err;
      }
    },
  });

  return (
    <Layout>
      <SEOHead
        title="Insikter för Lokala Företag | Boost08 Blogg"
        description="Tips, guider och strategier för att öka din digitala närvaro och växa ditt lokala företag. Expertråd om lokal SEO, recensioner och mer."
        keywords={["blogg", "lokal SEO tips", "recensionshantering", "digital marknadsföring"]}
      />

      <div className="container mx-auto px-4 py-16">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="text-5xl font-bold mb-6">
            Insikter för <span className="text-primary">Lokala Företag</span>
          </h1>
          <p className="text-xl text-muted-foreground">
            Expertråd och strategier för att växa ditt företag online
          </p>
        </div>

        {categories && categories.length > 0 && (
          <div className="flex flex-wrap gap-2 justify-center mb-12">
            <Badge
              variant={selectedCategory === null ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => setSelectedCategory(null)}
            >
              Alla
            </Badge>
            {categories.map((category) => (
              <Badge
                key={category.id}
                variant={selectedCategory === category.slug ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => setSelectedCategory(category.slug)}
              >
                {category.name}
              </Badge>
            ))}
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {isLoading ? (
              <p>Laddar...</p>
            ) : error ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Ett fel uppstod vid laddning av blogginlägg.</p>
              </div>
            ) : posts && posts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">
                  {selectedCategory 
                    ? 'Inga inlägg hittades i denna kategori.' 
                    : 'Inga blogginlägg tillgängliga än.'}
                </p>
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2">
                {posts?.map((post) => {
                  let postCategories: string[] = [];
                  try {
                    postCategories = post.blog_post_categories?.map(
                      (pc: any) => pc.blog_categories.name
                    ) || [];
                  } catch (err) {
                    console.error('[BlogOverview] Error mapping categories for post:', post.id, err);
                  }

                  return (
                    <BlogCard
                      key={post.id}
                      id={post.id}
                      title={post.title}
                      excerpt={post.excerpt}
                      slug={post.slug}
                      featuredImage={post.featured_image || undefined}
                      publishedAt={post.published_at || post.created_at}
                      readingTime={post.reading_time || 5}
                      categories={postCategories}
                    />
                  );
                })}
              </div>
            )}
          </div>

          <aside className="space-y-8">
            <BlogLeadForm
              type="sidebar"
              title="Få fler kunder"
              description="Ladda ner vår kompletta guide till lokal SEO"
              postId="sidebar-form"
              leadType="sidebar"
            />
          </aside>
        </div>
      </div>
    </Layout>
  );
};

export default BlogOverview;
