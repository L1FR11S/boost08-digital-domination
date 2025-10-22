import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2 } from "lucide-react";
import { formatDate } from "@/utils/blogUtils";
import { toast } from "sonner";

const AdminPosts = () => {
  const { data: posts, refetch } = useQuery({
    queryKey: ["admin-posts"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  const handleDelete = async (id: string) => {
    if (!confirm("Är du säker på att du vill radera detta inlägg?")) return;

    try {
      const { error } = await supabase.from("blog_posts").delete().eq("id", id);
      if (error) throw error;
      toast.success("Inlägg raderat");
      refetch();
    } catch (error) {
      toast.error("Kunde inte radera inlägg");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">Blogginlägg</h2>
          <p className="text-muted-foreground">Hantera dina blogginlägg</p>
        </div>
        <Link to="/admin/posts/new">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Nytt inlägg
          </Button>
        </Link>
      </div>

      <div className="space-y-4">
        {posts?.map((post) => (
          <Card key={post.id} className="p-6">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-xl font-semibold">{post.title}</h3>
                  <Badge variant={post.status === "published" ? "default" : "secondary"}>
                    {post.status === "published" ? "Publicerad" : "Utkast"}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-2">{post.excerpt}</p>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span>Skapad: {formatDate(post.created_at)}</span>
                  {post.published_at && <span>Publicerad: {formatDate(post.published_at)}</span>}
                  <span>{post.views} visningar</span>
                </div>
              </div>
              <div className="flex gap-2">
                <Link to={`/admin/posts/${post.id}/edit`}>
                  <Button variant="ghost" size="icon">
                    <Edit className="h-4 w-4" />
                  </Button>
                </Link>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDelete(post.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}

        {posts?.length === 0 && (
          <Card className="p-12 text-center">
            <p className="text-muted-foreground">Inga inlägg ännu. Skapa ditt första!</p>
          </Card>
        )}
      </div>
    </div>
  );
};

export default AdminPosts;
