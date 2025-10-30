import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Send, Eye } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

export default function AdminFormEmails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [userSubject, setUserSubject] = useState("");
  const [userBody, setUserBody] = useState("");
  const [userFromName, setUserFromName] = useState("Boost08");
  const [internalSubject, setInternalSubject] = useState("");
  const [internalBody, setInternalBody] = useState("");
  const [internalRecipient, setInternalRecipient] = useState("hello@boost08.com");
  const [testData, setTestData] = useState<Record<string, string>>({});

  const { data: form } = useQuery({
    queryKey: ["custom-form", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("custom_forms")
        .select("*")
        .eq("id", id)
        .single();
      
      if (error) throw error;
      return data;
    },
  });

  const { data: templates, isLoading } = useQuery({
    queryKey: ["email-templates", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("email_templates")
        .select("*")
        .eq("form_id", id);
      
      if (error) throw error;
      return data;
    },
  });

  useEffect(() => {
    if (templates) {
      const userTemplate = templates.find(t => t.template_type === "user_confirmation");
      const internalTemplate = templates.find(t => t.template_type === "internal_notification");

      if (userTemplate) {
        setUserSubject(userTemplate.subject);
        setUserBody(userTemplate.html_body);
        setUserFromName(userTemplate.from_name);
      }

      if (internalTemplate) {
        setInternalSubject(internalTemplate.subject);
        setInternalBody(internalTemplate.html_body);
        setInternalRecipient(internalTemplate.recipient_email || "hello@boost08.com");
      }
    }
  }, [templates]);

  useEffect(() => {
    if (form?.fields && Array.isArray(form.fields)) {
      const initialData: Record<string, string> = {};
      form.fields.forEach((field: any) => {
        initialData[field.id] = `[exempel ${field.label}]`;
      });
      setTestData(initialData);
    }
  }, [form]);

  const saveTemplatesMutation = useMutation({
    mutationFn: async () => {
      const userTemplateData = {
        form_id: id,
        template_type: "user_confirmation",
        subject: userSubject,
        html_body: userBody,
        from_name: userFromName,
        from_email: "noreply@boost08.com",
      };

      const internalTemplateData = {
        form_id: id,
        template_type: "internal_notification",
        subject: internalSubject,
        html_body: internalBody,
        recipient_email: internalRecipient,
        from_name: "Boost08 System",
        from_email: "noreply@boost08.com",
      };

      const userTemplate = templates?.find(t => t.template_type === "user_confirmation");
      const internalTemplate = templates?.find(t => t.template_type === "internal_notification");

      if (userTemplate) {
        const { error } = await supabase
          .from("email_templates")
          .update(userTemplateData)
          .eq("id", userTemplate.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from("email_templates")
          .insert(userTemplateData);
        if (error) throw error;
      }

      if (internalTemplate) {
        const { error } = await supabase
          .from("email_templates")
          .update(internalTemplateData)
          .eq("id", internalTemplate.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from("email_templates")
          .insert(internalTemplateData);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["email-templates", id] });
      toast.success("Email-templates sparade");
    },
    onError: () => {
      toast.error("Kunde inte spara email-templates");
    },
  });

  const sendTestEmailMutation = useMutation({
    mutationFn: async () => {
      const { error } = await supabase.functions.invoke("send-custom-form-email", {
        body: {
          formId: id,
          submissionData: testData,
          testMode: true,
        },
      });

      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Test-email skickat till linus.friis@boost08.com");
    },
    onError: () => {
      toast.error("Kunde inte skicka test-email");
    },
  });

  const replacePlaceholders = (text: string) => {
    let result = text;
    Object.entries(testData).forEach(([key, value]) => {
      result = result.replace(new RegExp(`{{${key}}}`, 'g'), value);
    });
    return result;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-muted-foreground">Laddar email-templates...</p>
      </div>
    );
  }

  const availablePlaceholders = form?.fields && Array.isArray(form.fields) 
    ? form.fields.map((f: any) => f.id) 
    : [];

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate("/admin/forms")}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Email Templates</h1>
          <p className="text-muted-foreground">
            Anpassa emails för {form?.name}
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Tillgängliga Placeholders</CardTitle>
          <CardDescription>Använd dessa i dina email-templates</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {availablePlaceholders.map((placeholder: string) => (
              <Badge key={placeholder} variant="secondary">
                {`{{${placeholder}}}`}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="user" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="user">Användarbekräftelse</TabsTrigger>
          <TabsTrigger value="internal">Intern Notifikation</TabsTrigger>
        </TabsList>

        <TabsContent value="user" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Email till användaren</CardTitle>
              <CardDescription>
                Detta email skickas till användaren efter formulär-submission
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="userFromName">Avsändarnamn</Label>
                <Input
                  id="userFromName"
                  value={userFromName}
                  onChange={(e) => setUserFromName(e.target.value)}
                  placeholder="Boost08"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="userSubject">Subject</Label>
                <Input
                  id="userSubject"
                  value={userSubject}
                  onChange={(e) => setUserSubject(e.target.value)}
                  placeholder="Tack för ditt meddelande!"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="userBody">Email-innehåll (HTML)</Label>
                <Textarea
                  id="userBody"
                  value={userBody}
                  onChange={(e) => setUserBody(e.target.value)}
                  rows={10}
                  placeholder="<h1>Tack {{name}}!</h1><p>Vi har tagit emot ditt meddelande.</p>"
                />
              </div>

              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline">
                    <Eye className="mr-2 h-4 w-4" />
                    Förhandsgranska
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Förhandsgranskning - Användarmail</DialogTitle>
                    <DialogDescription>
                      Subject: {replacePlaceholders(userSubject)}
                    </DialogDescription>
                  </DialogHeader>
                  <div 
                    className="border rounded-lg p-4 bg-background"
                    dangerouslySetInnerHTML={{ __html: replacePlaceholders(userBody) }}
                  />
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="internal" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Intern notifikation</CardTitle>
              <CardDescription>
                Detta email skickas till din inbox med formulär-data
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="internalRecipient">Mottagare</Label>
                <Input
                  id="internalRecipient"
                  type="email"
                  value={internalRecipient}
                  onChange={(e) => setInternalRecipient(e.target.value)}
                  placeholder="hello@boost08.com"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="internalSubject">Subject</Label>
                <Input
                  id="internalSubject"
                  value={internalSubject}
                  onChange={(e) => setInternalSubject(e.target.value)}
                  placeholder="Ny formulär-submission: {{email}}"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="internalBody">Email-innehåll (HTML)</Label>
                <Textarea
                  id="internalBody"
                  value={internalBody}
                  onChange={(e) => setInternalBody(e.target.value)}
                  rows={10}
                  placeholder="<h2>Ny submission</h2><p>Email: {{email}}</p><p>Namn: {{name}}</p>"
                />
              </div>

              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline">
                    <Eye className="mr-2 h-4 w-4" />
                    Förhandsgranska
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Förhandsgranskning - Intern Notifikation</DialogTitle>
                    <DialogDescription>
                      Till: {internalRecipient} • Subject: {replacePlaceholders(internalSubject)}
                    </DialogDescription>
                  </DialogHeader>
                  <div 
                    className="border rounded-lg p-4 bg-background"
                    dangerouslySetInnerHTML={{ __html: replacePlaceholders(internalBody) }}
                  />
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>Test Email</CardTitle>
          <CardDescription>
            Skicka ett test-email till linus.friis@boost08.com
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4">
            {availablePlaceholders.map((placeholder: string) => (
              <div key={placeholder} className="space-y-2">
                <Label htmlFor={`test-${placeholder}`}>{placeholder}</Label>
                <Input
                  id={`test-${placeholder}`}
                  value={testData[placeholder] || ""}
                  onChange={(e) => setTestData({ ...testData, [placeholder]: e.target.value })}
                  placeholder={`Test-värde för ${placeholder}`}
                />
              </div>
            ))}
          </div>

          <Button 
            onClick={() => sendTestEmailMutation.mutate()}
            disabled={sendTestEmailMutation.isPending}
          >
            <Send className="mr-2 h-4 w-4" />
            {sendTestEmailMutation.isPending ? "Skickar..." : "Skicka Test Email"}
          </Button>
        </CardContent>
      </Card>

      <div className="flex justify-end gap-2">
        <Button variant="outline" onClick={() => navigate("/admin/forms")}>
          Tillbaka
        </Button>
        <Button onClick={() => saveTemplatesMutation.mutate()}>
          Spara Templates
        </Button>
      </div>
    </div>
  );
}
