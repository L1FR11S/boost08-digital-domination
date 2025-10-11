import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin } from "lucide-react";
import FAQShortcuts from "@/components/contact/FAQShortcuts";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

const Contact = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      company: formData.get('company') as string,
      message: formData.get('message') as string,
    };

    try {
      const { error } = await supabase.functions.invoke('send-contact-email', {
        body: data,
      });

      if (error) throw error;

      toast({
        title: "Tack för ditt meddelande!",
        description: "Vi återkommer inom kort.",
      });

      (e.target as HTMLFormElement).reset();
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
    <Layout
      title="Kontakt - Boost08"
      description="Kontakta oss för frågor eller boka en demo. Vi svarar inom 24 timmar."
    >
      <section className="pt-32 pb-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl sm:text-5xl font-bold mb-6">
                Kontakta oss
              </h1>
              <p className="text-xl text-muted-foreground">
                Vi svarar inom 24 timmar
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12">
              {/* Left: Form */}
              <div>
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div>
                    <Label htmlFor="contact-name">Namn *</Label>
                    <Input id="contact-name" name="name" placeholder="Anna Andersson" required />
                  </div>
                  <div>
                    <Label htmlFor="contact-email">E-post *</Label>
                    <Input id="contact-email" name="email" type="email" placeholder="anna@mittforetag.se" required />
                  </div>
                  <div>
                    <Label htmlFor="contact-company">Företag</Label>
                    <Input id="contact-company" name="company" placeholder="Mitt Företag AB" />
                  </div>
                  <div>
                    <Label htmlFor="contact-message">Meddelande *</Label>
                    <Textarea 
                      id="contact-message"
                      name="message"
                      placeholder="Berätta hur vi kan hjälpa dig..."
                      rows={6}
                      required
                    />
                  </div>
                  <Button variant="hero" size="lg" className="w-full" type="submit" disabled={isLoading}>
                    {isLoading ? "Skickar..." : "Skicka"}
                  </Button>
                </form>
              </div>

              {/* Right: Contact info */}
              <div>
                <div className="bg-card border border-border rounded-2xl p-8 mb-6">
                  <h2 className="text-xl font-bold mb-6">Kontaktinformation</h2>
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Phone className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Telefon</p>
                        <p className="font-semibold">+46 XX XXX XX XX</p>
                        <p className="text-xs text-muted-foreground mt-1">Mån-Fre 9:00-17:00</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Mail className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">E-post</p>
                        <p className="font-semibold">hej@boost08.se</p>
                        <p className="text-xs text-muted-foreground mt-1">Vi svarar inom 24 timmar</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Mail className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Support</p>
                        <p className="font-semibold">support@boost08.se</p>
                        <p className="text-xs text-muted-foreground mt-1">För befintliga kunder</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Adress</p>
                        <p className="font-semibold">Stockholm, Sverige</p>
                      </div>
                    </div>
                  </div>
                </div>

                <FAQShortcuts />
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
