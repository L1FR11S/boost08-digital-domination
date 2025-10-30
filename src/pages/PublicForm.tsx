import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import Layout from "@/components/Layout";
import SEOHead from "@/components/seo/SEOHead";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface FormField {
  id: string;
  type: string;
  label: string;
  required: boolean;
  placeholder?: string;
  options?: string[];
}

export default function PublicForm() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const { data: form, isLoading, error } = useQuery({
    queryKey: ["public-form", slug],
    queryFn: async () => {
      if (!slug) throw new Error("No slug provided");
      
      const { data, error } = await supabase
        .from("custom_forms")
        .select("*")
        .eq("slug", slug)
        .eq("is_active", true)
        .maybeSingle();
      
      if (error) throw error;
      if (!data) throw new Error("Form not found");
      
      return data;
    },
    enabled: !!slug,
  });

  // Create dynamic schema based on form fields
  const createSchema = (fields: FormField[]) => {
    const schemaShape: Record<string, z.ZodTypeAny> = {};
    
    fields.forEach((field) => {
      let fieldSchema: z.ZodTypeAny;
      
      switch (field.type) {
        case "email":
          fieldSchema = z.string().email("Ogiltig e-postadress");
          break;
        case "number":
          fieldSchema = z.string().min(1, "Detta fält är obligatoriskt");
          break;
        case "checkbox":
          fieldSchema = z.boolean();
          break;
        case "textarea":
        case "text":
        case "select":
        default:
          fieldSchema = z.string();
          break;
      }
      
      if (field.required && field.type !== "checkbox") {
        fieldSchema = (fieldSchema as z.ZodString).min(1, "Detta fält är obligatoriskt");
      } else if (!field.required) {
        fieldSchema = fieldSchema.optional();
      }
      
      schemaShape[field.id] = fieldSchema;
    });
    
    return z.object(schemaShape);
  };

  const schema = form?.fields ? createSchema(form.fields as unknown as FormField[]) : z.object({});

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm({
    resolver: zodResolver(schema),
  });

  const submitMutation = useMutation({
    mutationFn: async (data: any) => {
      const { error } = await supabase.functions.invoke("send-custom-form-email", {
        body: {
          formId: form?.id,
          submissionData: data,
        },
      });
      
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success(form?.success_message || "Tack! Vi har tagit emot ditt meddelande.");
      reset();
    },
    onError: (error) => {
      console.error("Form submission error:", error);
      toast.error("Något gick fel. Vänligen försök igen.");
    },
  });

  const onSubmit = (data: any) => {
    submitMutation.mutate(data);
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[400px]">
          <p className="text-muted-foreground">Laddar formulär...</p>
        </div>
      </Layout>
    );
  }

  if (error || !form) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12">
          <Card className="max-w-2xl mx-auto">
            <CardContent className="pt-6 text-center">
              <h2 className="text-2xl font-bold mb-2">Formuläret hittades inte</h2>
              <p className="text-muted-foreground mb-4">
                Det formulär du söker efter existerar inte eller är inaktivt.
              </p>
              <Button onClick={() => navigate("/")}>Tillbaka till startsidan</Button>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  const fields = (form.fields as unknown as FormField[]) || [];

  return (
    <Layout>
      <SEOHead
        title={form.name}
        description={form.description || `${form.name} - Fyll i formuläret nedan`}
        canonical={`/form/${slug}`}
      />
      
      <div className="container mx-auto px-4 py-12">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-3xl">{form.name}</CardTitle>
            {form.description && (
              <CardDescription className="text-base">{form.description}</CardDescription>
            )}
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {fields.map((field) => (
                <div key={field.id} className="space-y-2">
                  {field.type === "checkbox" ? (
                    <div className="flex items-start gap-2">
                      <Checkbox
                        id={field.id}
                        onCheckedChange={(checked) => setValue(field.id, checked)}
                      />
                      <div className="space-y-1">
                        <Label htmlFor={field.id} className="text-sm font-normal cursor-pointer">
                          {field.label}
                          {field.required && <span className="text-destructive ml-1">*</span>}
                        </Label>
                      </div>
                    </div>
                  ) : (
                    <>
                      <Label htmlFor={field.id}>
                        {field.label}
                        {field.required && <span className="text-destructive ml-1">*</span>}
                      </Label>
                      
                      {field.type === "textarea" ? (
                        <Textarea
                          id={field.id}
                          placeholder={field.placeholder}
                          {...register(field.id)}
                          className={errors[field.id] ? "border-destructive" : ""}
                        />
                      ) : field.type === "select" && field.options ? (
                        <Select
                          onValueChange={(value) => setValue(field.id, value)}
                          defaultValue={watch(field.id)}
                        >
                          <SelectTrigger className={errors[field.id] ? "border-destructive" : ""}>
                            <SelectValue placeholder={field.placeholder || "Välj..."} />
                          </SelectTrigger>
                          <SelectContent>
                            {field.options.map((option) => (
                              <SelectItem key={option} value={option}>
                                {option}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      ) : (
                        <Input
                          id={field.id}
                          type={field.type}
                          placeholder={field.placeholder}
                          {...register(field.id)}
                          className={errors[field.id] ? "border-destructive" : ""}
                        />
                      )}
                    </>
                  )}
                  
                  {errors[field.id] && (
                    <p className="text-sm text-destructive">
                      {errors[field.id]?.message as string}
                    </p>
                  )}
                </div>
              ))}

              <Button
                type="submit"
                className="w-full"
                disabled={submitMutation.isPending}
              >
                {submitMutation.isPending ? "Skickar..." : (form.submit_button_text || "Skicka")}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
