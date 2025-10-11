import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Gift } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const ExitIntentPopup = () => {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [hasShown, setHasShown] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !hasShown) {
        setIsOpen(true);
        setHasShown(true);
      }
    };

    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [hasShown]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error } = await supabase
        .from('exit_intent_leads')
        .insert({ email });

      if (error) throw error;

      toast({
        title: "Tack!",
        description: "Vi skickar guiden till din e-post inom kort.",
      });

      setIsOpen(false);
      setEmail("");
    } catch (error: any) {
      console.error('Error:', error);
      toast({
        title: "Ett fel uppstod",
        description: "Försök igen senare.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-full bg-gradient-cta flex items-center justify-center shadow-glow">
              <Gift className="w-8 h-8 text-white" />
            </div>
          </div>
          <DialogTitle className="text-2xl text-center">
            Vänta! Få Vår Gratis Guide
          </DialogTitle>
          <DialogDescription className="text-center text-base">
            <strong className="text-foreground">
              "10 Sätt att Förbättra Din Lokala Synlighet"
            </strong>
            <br />
            <span className="text-sm">
              Värd 997 kr - Helt gratis för dig idag!
            </span>
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="email"
            placeholder="Din e-postadress"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full"
          />
          <Button type="submit" variant="hero" size="lg" className="w-full" disabled={isLoading}>
            {isLoading ? "Skickar..." : "Skicka Mig Guiden"}
          </Button>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="w-full text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            Nej tack, jag vill inte ha fler kunder
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ExitIntentPopup;
