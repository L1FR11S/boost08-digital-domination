import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft, Save, Eye } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function AdminEmailEditor() {
  const { templateKey } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [fromName, setFromName] = useState("");
  const [fromEmail, setFromEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [htmlBody, setHtmlBody] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [previewMode, setPreviewMode] = useState<"desktop" | "mobile">("desktop");

  const { data: template, isLoading } = useQuery({
    queryKey: ["email-template", templateKey],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("email_templates")
        .select("*")
        .eq("template_key", templateKey)
        .single();

      if (error) throw error;
      return data;
    },
  });

  useEffect(() => {
    if (template) {
      setFromName(template.from_name);
      setFromEmail(template.from_email);
      setSubject(template.subject);
      setHtmlBody(template.html_body);
      setIsActive(template.is_active);
    }
  }, [template]);

  const updateMutation = useMutation({
    mutationFn: async () => {
      const { error } = await supabase
        .from("email_templates")
        .update({
          from_name: fromName,
          from_email: fromEmail,
          subject,
          html_body: htmlBody,
          is_active: isActive,
          updated_at: new Date().toISOString(),
        })
        .eq("template_key", templateKey);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["email-templates"] });
      queryClient.invalidateQueries({ queryKey: ["email-template", templateKey] });
      toast.success("Email-template uppdaterad!");
    },
    onError: (error: any) => {
      console.error("Error updating template:", error);
      toast.error("Kunde inte uppdatera template");
    },
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Laddar...</p>
      </div>
    );
  }

  if (!template) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Template hittades inte</p>
      </div>
    );
  }

  const placeholders = template.available_placeholders as string[];

  return (
    <div className="container mx-auto py-8 px-4 max-w-7xl">
      <div className="flex items-center gap-4 mb-8">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate("/admin/emails")}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Tillbaka
        </Button>
        <div>
          <h1 className="text-3xl font-bold">{template.template_name}</h1>
          <p className="text-muted-foreground mt-1">{template.description}</p>
        </div>
      </div>

      <Tabs defaultValue="edit" className="space-y-6">
        <TabsList>
          <TabsTrigger value="edit">Redigera</TabsTrigger>
          <TabsTrigger value="preview">Förhandsgranska</TabsTrigger>
        </TabsList>

        <TabsContent value="edit" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Email Inställningar</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="from-name">Från Namn</Label>
                    <Input
                      id="from-name"
                      value={fromName}
                      onChange={(e) => setFromName(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="from-email">Från Email</Label>
                    <Input
                      id="from-email"
                      type="email"
                      value={fromEmail}
                      onChange={(e) => setFromEmail(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="is-active">Email Aktiv</Label>
                    <Switch
                      id="is-active"
                      checked={isActive}
                      onCheckedChange={setIsActive}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>HTML Content</CardTitle>
                </CardHeader>
                <CardContent>
                  <Textarea
                    value={htmlBody}
                    onChange={(e) => setHtmlBody(e.target.value)}
                    className="font-mono text-sm min-h-[500px]"
                    placeholder="HTML content..."
                  />
                </CardContent>
              </Card>

              <Button
                onClick={() => updateMutation.mutate()}
                disabled={updateMutation.isPending}
                size="lg"
                className="w-full"
              >
                <Save className="h-4 w-4 mr-2" />
                {updateMutation.isPending ? "Sparar..." : "Spara ändringar"}
              </Button>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Tillgängliga Placeholders</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground mb-3">
                      Använd dessa placeholders i subject och HTML:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {placeholders.map((placeholder: string) => (
                        <Badge
                          key={placeholder}
                          variant="secondary"
                          className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                          onClick={() => {
                            navigator.clipboard.writeText(placeholder);
                            toast.success("Kopierat till urklipp!");
                          }}
                        >
                          {placeholder}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Tips</CardTitle>
                </CardHeader>
                <CardContent className="text-sm space-y-2 text-muted-foreground">
                  <p>• Klicka på en placeholder för att kopiera den</p>
                  <p>• Använd inline CSS för bästa email-kompatibilitet</p>
                  <p>• Testa alltid i olika email-klienter</p>
                  <p>• Håll designen enkel och responsiv</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="preview">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Förhandsgranska Email</CardTitle>
                <div className="flex gap-2">
                  <Button
                    variant={previewMode === "desktop" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setPreviewMode("desktop")}
                  >
                    Desktop
                  </Button>
                  <Button
                    variant={previewMode === "mobile" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setPreviewMode("mobile")}
                  >
                    Mobile
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="border rounded-lg p-4 bg-muted/50">
                <iframe
                  srcDoc={htmlBody}
                  className={`bg-white rounded transition-all ${
                    previewMode === "desktop" ? "w-full h-[700px]" : "w-[375px] h-[667px] mx-auto"
                  }`}
                  title="Email Preview"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
