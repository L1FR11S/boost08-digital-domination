import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Download } from "lucide-react";

interface BlogLeadFormProps {
  type?: "inline" | "sidebar";
  title: string;
  description: string;
  postId: string;
  leadType?: string;
}

const BlogLeadForm = ({
  type = "inline",
  title,
  description,
  postId,
  leadType = "inline"
}: BlogLeadFormProps) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (step === 1 && email) {
      // Validate email before moving to step 2
      try {
        const { blogLeadSchema } = await import('@/lib/validation');
        blogLeadSchema.parse({ email });
      } catch (error: any) {
        toast.error(error.errors?.[0]?.message || "Ogiltig e-postadress");
        return;
      }
      setStep(2);
      return;
    }

    if (step === 2) {
      setLoading(true);
      try {
        // Validate all data
        const { blogLeadSchema } = await import('@/lib/validation');
        blogLeadSchema.parse({ email, name, company, leadType, postId });

        const { error: dbError } = await supabase.from("blog_leads").insert({
          email,
          name: name || null,
          company: company || null,
          source_post_id: postId,
          lead_type: leadType
        });

        if (dbError) {
          console.error('[BlogLeadForm] Database error:', dbError);
          throw dbError;
        }

        // Send email with timeout (non-blocking)
        try {
          const emailPromise = supabase.functions.invoke("send-blog-lead-email", {
            body: { email, name, postId }
          });

          const timeoutPromise = new Promise((_, reject) =>
            setTimeout(() => reject(new Error('Email timeout')), 10000)
          );

          await Promise.race([emailPromise, timeoutPromise]);
          console.log('[BlogLeadForm] Email sent successfully');
        } catch (emailError) {
          console.error('[BlogLeadForm] Email error (non-critical):', emailError);
        }

        toast.success("Tack! Kolla din inkorg för guiden.");
        setEmail("");
        setName("");
        setCompany("");
        setStep(1);
      } catch (error) {
        console.error('[BlogLeadForm] Submission error:', error);
        toast.error("Något gick fel. Försök igen.");
      } finally {
        setLoading(false);
      }
    }
  };

  const cardClass = type === "inline" 
    ? "bg-gradient-to-br from-primary/10 to-secondary/10 p-8 my-8"
    : "bg-card p-6";

  return (
    <Card className={cardClass}>
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/20 mb-4">
          <Download className="h-6 w-6 text-primary" />
        </div>
        <h3 className="text-2xl font-bold mb-2">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {step === 1 && (
          <Input
            type="email"
            placeholder="Din e-postadress"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="text-center"
          />
        )}

        {step === 2 && (
          <>
            <Input
              type="text"
              placeholder="Ditt namn (valfritt)"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              type="text"
              placeholder="Företag (valfritt)"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
            />
          </>
        )}

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Skickar..." : step === 1 ? "Få guiden gratis" : "Skicka"}
        </Button>

        <p className="text-xs text-center text-muted-foreground">
          Vi delar aldrig din information. Avregistrera när som helst.
        </p>
      </form>
    </Card>
  );
};

export default BlogLeadForm;
