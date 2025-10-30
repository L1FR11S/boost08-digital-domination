import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Mail, FileText, Copy, Trash2, ExternalLink } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function AdminForms() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: forms, isLoading } = useQuery({
    queryKey: ["custom-forms"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("custom_forms")
        .select("*")
        .order("created_at", { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });

  const { data: submissions } = useQuery({
    queryKey: ["form-submissions-count"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("form_submissions")
        .select("form_id, id");
      
      if (error) throw error;
      
      const counts: Record<string, number> = {};
      data.forEach(sub => {
        counts[sub.form_id] = (counts[sub.form_id] || 0) + 1;
      });
      return counts;
    },
  });

  const toggleActiveMutation = useMutation({
    mutationFn: async ({ id, isActive }: { id: string; isActive: boolean }) => {
      const { error } = await supabase
        .from("custom_forms")
        .update({ is_active: !isActive })
        .eq("id", id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["custom-forms"] });
      toast.success("Formulärstatus uppdaterad");
    },
    onError: () => {
      toast.error("Kunde inte uppdatera formulärstatus");
    },
  });

  const duplicateMutation = useMutation({
    mutationFn: async (formId: string) => {
      const { data: original, error: fetchError } = await supabase
        .from("custom_forms")
        .select("*")
        .eq("id", formId)
        .single();
      
      if (fetchError) throw fetchError;

      const { data: newForm, error: insertError } = await supabase
        .from("custom_forms")
        .insert({
          name: `${original.name} (Kopia)`,
          slug: `${original.slug}-copy-${Date.now()}`,
          description: original.description,
          is_active: false,
          fields: original.fields,
          submit_button_text: original.submit_button_text,
          success_message: original.success_message,
        })
        .select()
        .single();
      
      if (insertError) throw insertError;
      return newForm;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["custom-forms"] });
      toast.success("Formulär duplicerat");
    },
    onError: () => {
      toast.error("Kunde inte duplicera formulär");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (formId: string) => {
      const { error } = await supabase
        .from("custom_forms")
        .delete()
        .eq("id", formId);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["custom-forms"] });
      toast.success("Formulär raderat");
    },
    onError: () => {
      toast.error("Kunde inte radera formulär");
    },
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-muted-foreground">Laddar formulär...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Formulär</h1>
          <p className="text-muted-foreground">Skapa och hantera anpassade formulär</p>
        </div>
        <Button onClick={() => navigate("/admin/forms/new")}>
          <Plus className="mr-2 h-4 w-4" />
          Nytt Formulär
        </Button>
      </div>

      {forms?.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <FileText className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">Inga formulär ännu</h3>
            <p className="text-muted-foreground text-center mb-4">
              Kom igång genom att skapa ditt första formulär
            </p>
            <Button onClick={() => navigate("/admin/forms/new")}>
              <Plus className="mr-2 h-4 w-4" />
              Skapa Formulär
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {forms?.map((form) => (
            <Card key={form.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <CardTitle>{form.name}</CardTitle>
                      <Badge variant={form.is_active ? "default" : "secondary"}>
                        {form.is_active ? "Aktiv" : "Inaktiv"}
                      </Badge>
                    </div>
                    <CardDescription>
                      {form.description || "Ingen beskrivning"}
                    </CardDescription>
                    <p className="text-sm text-muted-foreground">
                      Slug: <code className="text-xs bg-muted px-1 py-0.5 rounded">{form.slug}</code>
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => window.open(`/form/${form.slug}`, '_blank')}
                    >
                      <ExternalLink className="h-4 w-4 mr-1" />
                      Visa
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigate(`/admin/forms/${form.id}/edit`)}
                    >
                      <Edit className="h-4 w-4 mr-1" />
                      Redigera
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigate(`/admin/forms/${form.id}/emails`)}
                    >
                      <Mail className="h-4 w-4 mr-1" />
                      Emails
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigate(`/admin/forms/${form.id}/submissions`)}
                    >
                      <FileText className="h-4 w-4 mr-1" />
                      Svar ({submissions?.[form.id] || 0})
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-sm text-muted-foreground">
                    {Array.isArray(form.fields) ? form.fields.length : 0} fält •{" "}
                    Skapad {new Date(form.created_at).toLocaleDateString('sv-SE')}
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleActiveMutation.mutate({ id: form.id, isActive: form.is_active })}
                    >
                      {form.is_active ? "Inaktivera" : "Aktivera"}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => duplicateMutation.mutate(form.id)}
                    >
                      <Copy className="h-4 w-4 mr-1" />
                      Duplicera
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <Trash2 className="h-4 w-4 mr-1" />
                          Radera
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Är du säker?</AlertDialogTitle>
                          <AlertDialogDescription>
                            Detta kommer permanent radera formuläret, alla email-templates och submissions.
                            Denna åtgärd kan inte ångras.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Avbryt</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => deleteMutation.mutate(form.id)}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                          >
                            Radera
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
