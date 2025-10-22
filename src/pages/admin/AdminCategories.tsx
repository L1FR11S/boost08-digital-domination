import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Plus, Trash2 } from "lucide-react";
import { generateSlug } from "@/utils/blogUtils";
import { toast } from "sonner";

const AdminCategories = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [open, setOpen] = useState(false);

  const { data: categories, refetch } = useQuery({
    queryKey: ["admin-categories"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blog_categories")
        .select("*")
        .order("name");
      if (error) throw error;
      return data;
    },
  });

  const handleCreate = async () => {
    if (!name) {
      toast.error("Namn krävs");
      return;
    }

    try {
      const { error } = await supabase.from("blog_categories").insert({
        name,
        slug: generateSlug(name),
        description: description || null,
      });

      if (error) throw error;
      toast.success("Kategori skapad");
      setName("");
      setDescription("");
      setOpen(false);
      refetch();
    } catch (error: any) {
      toast.error(error.message || "Kunde inte skapa kategori");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Är du säker?")) return;

    try {
      const { error } = await supabase.from("blog_categories").delete().eq("id", id);
      if (error) throw error;
      toast.success("Kategori raderad");
      refetch();
    } catch (error) {
      toast.error("Kunde inte radera kategori");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">Kategorier</h2>
          <p className="text-muted-foreground">Hantera bloggkategorier</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Ny kategori
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Skapa ny kategori</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label>Namn</Label>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Lokal SEO"
                />
              </div>
              <div>
                <Label>Beskrivning</Label>
                <Input
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Tips och guider om lokal SEO"
                />
              </div>
              <Button onClick={handleCreate} className="w-full">
                Skapa
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {categories?.map((category) => (
          <Card key={category.id} className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold">{category.name}</h3>
                {category.description && (
                  <p className="text-sm text-muted-foreground mt-1">
                    {category.description}
                  </p>
                )}
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleDelete(category.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </Card>
        ))}

        {categories?.length === 0 && (
          <Card className="p-12 text-center col-span-full">
            <p className="text-muted-foreground">Inga kategorier ännu</p>
          </Card>
        )}
      </div>
    </div>
  );
};

export default AdminCategories;
