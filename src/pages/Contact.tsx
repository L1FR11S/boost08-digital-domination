import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone } from "lucide-react";

const Contact = () => {
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
                <form className="space-y-6">
                  <div>
                    <Label htmlFor="contact-name">Namn *</Label>
                    <Input id="contact-name" placeholder="Anna Andersson" required />
                  </div>
                  <div>
                    <Label htmlFor="contact-email">E-post *</Label>
                    <Input id="contact-email" type="email" placeholder="anna@mittforetag.se" required />
                  </div>
                  <div>
                    <Label htmlFor="contact-company">Företag</Label>
                    <Input id="contact-company" placeholder="Mitt Företag AB" />
                  </div>
                  <div>
                    <Label htmlFor="contact-message">Meddelande *</Label>
                    <Textarea 
                      id="contact-message" 
                      placeholder="Berätta hur vi kan hjälpa dig..."
                      rows={6}
                      required
                    />
                  </div>
                  <Button variant="hero" size="lg" className="w-full">
                    Skicka
                  </Button>
                </form>
              </div>

              {/* Right: Contact info */}
              <div>
                <div className="bg-card border border-border rounded-2xl p-8 mb-6">
                  <h2 className="text-xl font-bold mb-6">Kontaktinformation</h2>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <Phone className="w-5 h-5 text-primary mr-3" />
                      <div>
                        <p className="text-sm text-muted-foreground">Telefon</p>
                        <p className="font-medium">+46 XX XXX XX XX</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Mail className="w-5 h-5 text-primary mr-3" />
                      <div>
                        <p className="text-sm text-muted-foreground">E-post</p>
                        <p className="font-medium">hej@boost08.se</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Mail className="w-5 h-5 text-primary mr-3" />
                      <div>
                        <p className="text-sm text-muted-foreground">Support</p>
                        <p className="font-medium">support@boost08.se</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-muted/30 rounded-2xl p-8">
                  <h3 className="font-semibold mb-4">Vanliga frågor vi får:</h3>
                  <ul className="space-y-3">
                    <li>
                      <a href="#" className="text-primary hover:underline">
                        Hur kommer jag igång?
                      </a>
                    </li>
                    <li>
                      <a href="#" className="text-primary hover:underline">
                        Vad kostar det?
                      </a>
                    </li>
                    <li>
                      <a href="#" className="text-primary hover:underline">
                        Hur funkar testperioden?
                      </a>
                    </li>
                    <li>
                      <a href="#" className="text-primary hover:underline">
                        Vilka integrationer finns?
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
