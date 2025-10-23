import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { X } from "lucide-react";

interface BlogExitIntentProps {
  title: string;
  postId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const BlogExitIntent = ({ title, postId, open, onOpenChange }: BlogExitIntentProps) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate input
    try {
      const { exitIntentSchema } = await import('@/lib/validation');
      exitIntentSchema.parse({ email });
    } catch (error: any) {
      toast.error(error.errors?.[0]?.message || "Ogiltig e-postadress");
      return;
    }

    setLoading(true);

    try {

      const { error: dbError } = await supabase.from("blog_leads").insert({
        email,
        source_post_id: postId,
        lead_type: "exit_intent"
      });

      if (dbError) {
        console.error('[BlogExitIntent] Database error:', dbError);
        throw dbError;
      }

      // Send email with timeout (non-blocking)
      try {
        const emailPromise = supabase.functions.invoke("send-blog-lead-email", {
          body: { email, postId }
        });

        const timeoutPromise = new Promise((_, reject) =>
          setTimeout(() => reject(new Error('Email timeout')), 10000)
        );

        await Promise.race([emailPromise, timeoutPromise]);
        console.log('[BlogExitIntent] Email sent successfully');
      } catch (emailError) {
        console.error('[BlogExitIntent] Email error (non-critical):', emailError);
      }

      toast.success("Tack! Kolla din inkorg.");
      setEmail("");
      onOpenChange(false);
    } catch (error) {
      console.error('[BlogExitIntent] Submission error:', error);
      toast.error("Något gick fel. Försök igen.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-4 top-4"
          onClick={() => onOpenChange(false)}
        >
          <X className="h-4 w-4" />
        </Button>
        <DialogHeader>
          <DialogTitle className="text-2xl">{title}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p className="text-muted-foreground">
            Få våra bästa tips och guider direkt i inkorgen. Ingen spam, avregistrera när som helst.
          </p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="email"
              placeholder="Din e-postadress"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Skickar..." : "Ja, skicka mig tips!"}
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BlogExitIntent;
