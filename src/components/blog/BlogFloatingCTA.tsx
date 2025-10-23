import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { X } from "lucide-react";

interface BlogFloatingCTAProps {
  text: string;
  postId: string;
}

const BlogFloatingCTA = ({ text, postId }: BlogFloatingCTAProps) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(true);
  const [expanded, setExpanded] = useState(false);

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
        lead_type: "floating_cta"
      });

      if (dbError) {
        console.error('[BlogFloatingCTA] Database error:', dbError);
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
        console.log('[BlogFloatingCTA] Email sent successfully');
      } catch (emailError) {
        console.error('[BlogFloatingCTA] Email error (non-critical):', emailError);
      }

      toast.success("Tack! Kolla din inkorg.");
      setEmail("");
      setExpanded(false);
      setTimeout(() => setVisible(false), 2000);
    } catch (error) {
      console.error('[BlogFloatingCTA] Submission error:', error);
      toast.error("Något gick fel. Försök igen.");
    } finally {
      setLoading(false);
    }
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
      <Card className="rounded-none border-t shadow-lg p-4">
        {!expanded ? (
          <div className="flex items-center justify-between gap-4">
            <p className="text-sm font-medium flex-1">{text}</p>
            <Button onClick={() => setExpanded(true)} size="sm">
              Ja tack!
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setVisible(false)}
              className="h-8 w-8"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3">
            <Input
              type="email"
              placeholder="Din e-postadress"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <div className="flex gap-2">
              <Button type="submit" className="flex-1" disabled={loading}>
                {loading ? "Skickar..." : "Skicka"}
              </Button>
              <Button
                type="button"
                variant="ghost"
                onClick={() => setExpanded(false)}
              >
                Avbryt
              </Button>
            </div>
          </form>
        )}
      </Card>
    </div>
  );
};

export default BlogFloatingCTA;
