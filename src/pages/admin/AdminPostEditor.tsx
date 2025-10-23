import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import RichTextEditor from "@/components/blog/RichTextEditor";
import SEOOptimizationDialog from "@/components/blog/SEOOptimizationDialog";
import { generateSlug, calculateReadingTime } from "@/utils/blogUtils";
import { toast } from "sonner";
import { ArrowLeft, Save } from "lucide-react";

const AdminPostEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [featuredImage, setFeaturedImage] = useState("");
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [keywords, setKeywords] = useState("");
  const [ctaTitle, setCtaTitle] = useState("");
  const [ctaDescription, setCtaDescription] = useState("");
  const [isPublished, setIsPublished] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [showOptimizationDialog, setShowOptimizationDialog] = useState(false);
  const [optimizedData, setOptimizedData] = useState<any>(null);

  const { data: post } = useQuery({
    queryKey: ["post", id],
    queryFn: async () => {
      if (!id) return null;
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("id", id)
        .single();
      if (error) throw error;
      return data;
    },
    enabled: isEdit,
  });

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setSlug(post.slug);
      setExcerpt(post.excerpt);
      setContent(post.content);
      setFeaturedImage(post.featured_image || "");
      setMetaTitle(post.meta_title || "");
      setMetaDescription(post.meta_description || "");
      setKeywords(post.keywords?.join(", ") || "");
      setCtaTitle(post.cta_title || "");
      setCtaDescription(post.cta_description || "");
      setIsPublished(post.status === "published");
    }
  }, [post]);

  useEffect(() => {
    if (title && !isEdit) {
      setSlug(generateSlug(title));
    }
  }, [title, isEdit]);

  const handleOptimize = async () => {
    if (!title && !content) {
      toast.error("Du behöver minst en titel eller innehåll för att optimera");
      return;
    }

    setIsOptimizing(true);
    setShowOptimizationDialog(true);

    try {
      const { data, error } = await supabase.functions.invoke("optimize-blog-seo", {
        body: {
          title,
          excerpt,
          content,
          keywords,
        },
      });

      if (error) throw error;

      setOptimizedData(data);
      toast.success("SEO-optimering klar!");
    } catch (error: any) {
      console.error("Error optimizing:", error);
      if (error.message?.includes("Rate limit")) {
        toast.error("För många förfrågningar. Vänta en stund och försök igen.");
      } else if (error.message?.includes("Payment")) {
        toast.error("Lägg till credits i ditt Lovable workspace för att fortsätta.");
      } else {
        toast.error("Kunde inte optimera innehåll. Försök igen.");
      }
      setShowOptimizationDialog(false);
    } finally {
      setIsOptimizing(false);
    }
  };

  const handleApplyOptimization = () => {
    if (!optimizedData) return;

    if (optimizedData.optimizedTitle) {
      setTitle(optimizedData.optimizedTitle);
    }
    if (optimizedData.optimizedMetaTitle) {
      setMetaTitle(optimizedData.optimizedMetaTitle);
    }
    if (optimizedData.optimizedMetaDescription) {
      setMetaDescription(optimizedData.optimizedMetaDescription);
    }
    if (optimizedData.optimizedKeywords) {
      setKeywords(optimizedData.optimizedKeywords);
    }
    if (optimizedData.optimizedContent) {
      setContent(optimizedData.optimizedContent);
    }
    if (optimizedData.ctaTitle) {
      setCtaTitle(optimizedData.ctaTitle);
    }
    if (optimizedData.ctaDescription) {
      setCtaDescription(optimizedData.ctaDescription);
    }

    setShowOptimizationDialog(false);
    toast.success("SEO-optimering tillämpad!");
  };

  const handleSave = async () => {
    if (!title || !slug || !excerpt || !content) {
      toast.error("Fyll i alla obligatoriska fält");
      return;
    }

    setLoading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const readingTime = calculateReadingTime(content);
      const keywordsArray = keywords.split(",").map(k => k.trim()).filter(Boolean);

      const postData = {
        title,
        slug,
        excerpt,
        content,
        featured_image: featuredImage || null,
        meta_title: metaTitle || title,
        meta_description: metaDescription || excerpt,
        keywords: keywordsArray,
        cta_title: ctaTitle || null,
        cta_description: ctaDescription || null,
        reading_time: readingTime,
        status: isPublished ? "published" : "draft",
        published_at: isPublished ? new Date().toISOString() : null,
        author_id: user.id,
      };

      if (isEdit) {
        const { error } = await supabase
          .from("blog_posts")
          .update(postData)
          .eq("id", id);
        if (error) throw error;
        toast.success("Inlägg uppdaterat");
      } else {
        const { error } = await supabase.from("blog_posts").insert(postData);
        if (error) throw error;
        toast.success("Inlägg skapat");
      }

      navigate("/admin/posts");
    } catch (error: any) {
      console.error("Error saving post:", error);
      toast.error(error.message || "Kunde inte spara inlägg");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate("/admin/posts")}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h2 className="text-3xl font-bold">
              {isEdit ? "Redigera inlägg" : "Nytt inlägg"}
            </h2>
          </div>
        </div>
        <Button onClick={handleSave} disabled={loading}>
          <Save className="h-4 w-4 mr-2" />
          {loading ? "Sparar..." : "Spara"}
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-6 space-y-4">
            <div>
              <Label>Titel *</Label>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Skriv en fängslande titel..."
              />
            </div>

            <div>
              <Label>Slug *</Label>
              <Input
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="automatiskt-genererad-slug"
              />
            </div>

            <div>
              <Label>Sammanfattning *</Label>
              <Input
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                placeholder="Kort beskrivning av inlägget (160 tecken)"
                maxLength={160}
              />
              <p className="text-xs text-muted-foreground mt-1">
                {excerpt.length}/160 tecken
              </p>
            </div>

            <div>
              <Label>Innehåll *</Label>
              <RichTextEditor
                value={content}
                onChange={setContent}
                placeholder="Skriv ditt innehåll här... Använd Markdown för formatering."
                onOptimizeClick={handleOptimize}
                isOptimizing={isOptimizing}
              />
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <Label>Publicera</Label>
              <Switch checked={isPublished} onCheckedChange={setIsPublished} />
            </div>
          </Card>

          <Card className="p-6 space-y-4">
            <h3 className="font-semibold">SEO</h3>
            <div>
              <Label>Meta Title</Label>
              <Input
                value={metaTitle}
                onChange={(e) => setMetaTitle(e.target.value)}
                placeholder="SEO-optimerad titel (60 tecken)"
                maxLength={60}
              />
              <p className="text-xs text-muted-foreground mt-1">
                {metaTitle.length}/60 tecken
              </p>
            </div>

            <div>
              <Label>Meta Description</Label>
              <Input
                value={metaDescription}
                onChange={(e) => setMetaDescription(e.target.value)}
                placeholder="SEO-beskrivning (160 tecken)"
                maxLength={160}
              />
              <p className="text-xs text-muted-foreground mt-1">
                {metaDescription.length}/160 tecken
              </p>
            </div>

            <div>
              <Label>Keywords</Label>
              <Input
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
                placeholder="seo, lokal, google (kommaseparerade)"
              />
            </div>
          </Card>

          <Card className="p-6 space-y-4">
            <h3 className="font-semibold">Featured Image</h3>
            <Input
              value={featuredImage}
              onChange={(e) => setFeaturedImage(e.target.value)}
              placeholder="https://example.com/image.jpg"
            />
            {featuredImage && (
              <img
                src={featuredImage}
                alt="Preview"
                className="w-full rounded-lg"
              />
            )}
          </Card>

          <Card className="p-6 space-y-4">
            <h3 className="font-semibold">Call-To-Action (CTA)</h3>
            <p className="text-xs text-muted-foreground">
              AI genererar automatiskt en CTA vid optimering, eller fyll i manuellt
            </p>
            
            <div className="space-y-2">
              <Input
                value={ctaTitle}
                onChange={(e) => setCtaTitle(e.target.value)}
                placeholder='T.ex. "Vill du ha fler tips?"'
                maxLength={50}
              />
              <Input
                value={ctaDescription}
                onChange={(e) => setCtaDescription(e.target.value)}
                placeholder='T.ex. "Få vår guide direkt i din inkorg"'
                maxLength={100}
              />
              <p className="text-xs text-muted-foreground">
                Denna CTA visas mitt i artikeln
              </p>
            </div>
          </Card>
        </div>
      </div>

      <SEOOptimizationDialog
        open={showOptimizationDialog}
        onOpenChange={setShowOptimizationDialog}
        isLoading={isOptimizing}
        optimizedData={optimizedData}
        onApply={handleApplyOptimization}
        originalData={{
          title,
          metaTitle,
          metaDescription,
          keywords,
        }}
      />
    </div>
  );
};

export default AdminPostEditor;
