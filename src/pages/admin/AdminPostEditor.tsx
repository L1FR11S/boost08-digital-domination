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
  const [isPublished, setIsPublished] = useState(false);
  const [loading, setLoading] = useState(false);

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
      setIsPublished(post.status === "published");
    }
  }, [post]);

  useEffect(() => {
    if (title && !isEdit) {
      setSlug(generateSlug(title));
    }
  }, [title, isEdit]);

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
        </div>
      </div>
    </div>
  );
};

export default AdminPostEditor;
