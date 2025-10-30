import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Mail, Edit, Send, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export default function AdminEmails() {
  const navigate = useNavigate();
  const [previewTemplate, setPreviewTemplate] = useState<any>(null);
  const [testEmailDialog, setTestEmailDialog] = useState<string | null>(null);
  const [testEmail, setTestEmail] = useState("");

  const { data: templates, isLoading } = useQuery({
    queryKey: ["email-templates"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("email_templates")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  const handleSendTest = async (templateKey: string) => {
    if (!testEmail) {
      toast.error("Ange en email-adress");
      return;
    }

    try {
      const { error } = await supabase.functions.invoke("send-test-email", {
        body: { templateKey, testEmail },
      });

      if (error) throw error;

      toast.success("Test-email skickat!");
      setTestEmailDialog(null);
      setTestEmail("");
    } catch (error: any) {
      console.error("Error sending test email:", error);
      toast.error("Kunde inte skicka test-email");
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Laddar email-templates...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-5xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">📧 Email Templates</h1>
          <p className="text-muted-foreground mt-2">
            Hantera alla email-meddelanden som skickas från din webbplats
          </p>
        </div>
      </div>

      <div className="grid gap-6">
        {templates?.map((template) => (
          <Card key={template.id} className="relative">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <Mail className="h-5 w-5 text-primary" />
                    <CardTitle>{template.template_name}</CardTitle>
                    <Badge variant={template.is_active ? "default" : "secondary"}>
                      {template.is_active ? "Aktiv" : "Inaktiv"}
                    </Badge>
                  </div>
                  <CardDescription className="text-sm">
                    {template.description}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-muted/50 rounded-lg p-4 space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <span className="font-medium">Subject:</span>
                    <span className="text-muted-foreground">{template.subject}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="font-medium">From:</span>
                    <span className="text-muted-foreground">
                      {template.from_name} &lt;{template.from_email}&gt;
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="font-medium">Placeholders:</span>
                    <div className="flex flex-wrap gap-1">
                      {JSON.parse(template.available_placeholders as string).map((p: string) => (
                        <Badge key={p} variant="outline" className="text-xs">
                          {p}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    onClick={() => navigate(`/admin/emails/${template.template_key}`)}
                    size="sm"
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Redigera
                  </Button>
                  <Button
                    onClick={() => setPreviewTemplate(template)}
                    variant="outline"
                    size="sm"
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    Förhandsgranska
                  </Button>
                  <Button
                    onClick={() => setTestEmailDialog(template.template_key)}
                    variant="secondary"
                    size="sm"
                  >
                    <Send className="h-4 w-4 mr-2" />
                    Skicka test
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Preview Dialog */}
      <Dialog open={!!previewTemplate} onOpenChange={() => setPreviewTemplate(null)}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Förhandsgranska: {previewTemplate?.template_name}</DialogTitle>
          </DialogHeader>
          <div className="border rounded-lg p-4 bg-muted/50">
            <iframe
              srcDoc={previewTemplate?.html_body}
              className="w-full h-[500px] bg-white rounded"
              title="Email Preview"
            />
          </div>
        </DialogContent>
      </Dialog>

      {/* Test Email Dialog */}
      <Dialog open={!!testEmailDialog} onOpenChange={() => setTestEmailDialog(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Skicka test-email</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="test-email">Email-adress</Label>
              <Input
                id="test-email"
                type="email"
                placeholder="din@email.com"
                value={testEmail}
                onChange={(e) => setTestEmail(e.target.value)}
              />
            </div>
            <Button
              onClick={() => testEmailDialog && handleSendTest(testEmailDialog)}
              className="w-full"
            >
              <Send className="h-4 w-4 mr-2" />
              Skicka test-email
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
