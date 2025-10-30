import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Plus, Trash2, GripVertical } from "lucide-react";
import { toast } from "sonner";

interface FormField {
  id: string;
  type: string;
  label: string;
  placeholder?: string;
  required: boolean;
  validation?: string;
  maxLength?: number;
  options?: string[];
}

export default function AdminFormEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const isNewForm = id === "new";

  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [submitButtonText, setSubmitButtonText] = useState("Skicka");
  const [successMessage, setSuccessMessage] = useState("Tack! Vi har tagit emot ditt meddelande.");
  const [fields, setFields] = useState<FormField[]>([]);

  const { data: form, isLoading } = useQuery({
    queryKey: ["custom-form", id],
    queryFn: async () => {
      if (isNewForm) return null;
      const { data, error } = await supabase
        .from("custom_forms")
        .select("*")
        .eq("id", id)
        .single();
      
      if (error) throw error;
      return data;
    },
    enabled: !isNewForm,
  });

  useEffect(() => {
    if (form) {
      setName(form.name);
      setSlug(form.slug);
      setDescription(form.description || "");
      setSubmitButtonText(form.submit_button_text);
      setSuccessMessage(form.success_message);
      setFields(Array.isArray(form.fields) ? form.fields as unknown as FormField[] : []);
    }
  }, [form]);

  const saveMutation = useMutation({
    mutationFn: async () => {
      const formData = {
        name,
        slug,
        description,
        submit_button_text: submitButtonText,
        success_message: successMessage,
        fields: fields as any, // Cast to any for JSON compatibility
      };

      if (isNewForm) {
        const { data, error } = await supabase
          .from("custom_forms")
          .insert(formData)
          .select()
          .single();
        
        if (error) throw error;
        return data;
      } else {
        const { error } = await supabase
          .from("custom_forms")
          .update(formData)
          .eq("id", id);
        
        if (error) throw error;
        return form;
      }
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["custom-forms"] });
      queryClient.invalidateQueries({ queryKey: ["custom-form", id] });
      toast.success("Formulär sparat");
      if (isNewForm && data) {
        navigate(`/admin/forms/${data.id}/edit`);
      }
    },
    onError: () => {
      toast.error("Kunde inte spara formulär");
    },
  });

  const addField = () => {
    const newField: FormField = {
      id: `field_${Date.now()}`,
      type: "text",
      label: "Nytt fält",
      required: false,
    };
    setFields([...fields, newField]);
  };

  const updateField = (index: number, updates: Partial<FormField>) => {
    const newFields = [...fields];
    newFields[index] = { ...newFields[index], ...updates };
    setFields(newFields);
  };

  const removeField = (index: number) => {
    setFields(fields.filter((_, i) => i !== index));
  };

  const moveField = (index: number, direction: "up" | "down") => {
    if (direction === "up" && index > 0) {
      const newFields = [...fields];
      [newFields[index - 1], newFields[index]] = [newFields[index], newFields[index - 1]];
      setFields(newFields);
    } else if (direction === "down" && index < fields.length - 1) {
      const newFields = [...fields];
      [newFields[index], newFields[index + 1]] = [newFields[index + 1], newFields[index]];
      setFields(newFields);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-muted-foreground">Laddar formulär...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate("/admin/forms")}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold">
            {isNewForm ? "Nytt Formulär" : "Redigera Formulär"}
          </h1>
          <p className="text-muted-foreground">
            Konfigurera formulärfält och inställningar
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Grundinställningar</CardTitle>
          <CardDescription>Namn, slug och beskrivning av formuläret</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Formulärnamn</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Kontaktformulär"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="slug">Slug (URL-vänligt ID)</Label>
            <Input
              id="slug"
              value={slug}
              onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/\s+/g, '-'))}
              placeholder="kontakt-formular"
            />
            <p className="text-xs text-muted-foreground">Används för att identifiera formuläret</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Beskrivning (valfritt)</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Beskriv vad formuläret används till..."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="submitBtn">Text på skicka-knappen</Label>
            <Input
              id="submitBtn"
              value={submitButtonText}
              onChange={(e) => setSubmitButtonText(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="successMsg">Meddelande efter lyckad submission</Label>
            <Textarea
              id="successMsg"
              value={successMessage}
              onChange={(e) => setSuccessMessage(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Formulärfält</CardTitle>
              <CardDescription>Dra och släpp för att ändra ordning</CardDescription>
            </div>
            <Button onClick={addField}>
              <Plus className="mr-2 h-4 w-4" />
              Lägg till fält
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {fields.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              Inga fält ännu. Klicka på "Lägg till fält" för att komma igång.
            </div>
          ) : (
            fields.map((field, index) => (
              <Card key={field.id}>
                <CardContent className="pt-6">
                  <div className="flex gap-4">
                    <div className="flex flex-col gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => moveField(index, "up")}
                        disabled={index === 0}
                      >
                        <GripVertical className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="flex-1 space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Fälttyp</Label>
                          <Select
                            value={field.type}
                            onValueChange={(value) => updateField(index, { type: value })}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="text">Text</SelectItem>
                              <SelectItem value="email">Email</SelectItem>
                              <SelectItem value="textarea">Textarea</SelectItem>
                              <SelectItem value="tel">Telefon</SelectItem>
                              <SelectItem value="number">Nummer</SelectItem>
                              <SelectItem value="select">Dropdown</SelectItem>
                              <SelectItem value="checkbox">Checkbox</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label>Label</Label>
                          <Input
                            value={field.label}
                            onChange={(e) => updateField(index, { label: e.target.value })}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Placeholder (valfritt)</Label>
                          <Input
                            value={field.placeholder || ""}
                            onChange={(e) => updateField(index, { placeholder: e.target.value })}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label>Max längd (valfritt)</Label>
                          <Input
                            type="number"
                            value={field.maxLength || ""}
                            onChange={(e) => updateField(index, { maxLength: parseInt(e.target.value) || undefined })}
                          />
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <Switch
                            checked={field.required}
                            onCheckedChange={(checked) => updateField(index, { required: checked })}
                          />
                          <Label>Obligatoriskt</Label>
                        </div>
                        {field.required && <Badge>Krävs</Badge>}
                      </div>
                    </div>

                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeField(index)}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </CardContent>
      </Card>

      <div className="flex justify-end gap-2">
        <Button variant="outline" onClick={() => navigate("/admin/forms")}>
          Avbryt
        </Button>
        <Button onClick={() => saveMutation.mutate()} disabled={!name || !slug}>
          {isNewForm ? "Skapa Formulär" : "Spara Ändringar"}
        </Button>
      </div>
    </div>
  );
}
