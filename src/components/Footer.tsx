import logo from "@/assets/logo.png";
import TrackableCTA from "@/components/analytics/TrackableCTA";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Mail, Phone } from "lucide-react";
const Footer = () => {
  const [email, setEmail] = useState("");
  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Newsletter signup logic here
    setEmail("");
  };
  return (
    <footer className="bg-gradient-hero border-t border-border py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <img src={logo} alt="Boost08 Logo" className="w-8 h-8" />
              <span className="text-xl font-bold">
                BOOST<sup className="text-sm">08</sup>
              </span>
            </div>
            <p className="text-muted-foreground mb-6 text-sm">
              Smart automatisering för lokal kundtillväxt. Maximera er synlighet i Svenska lokala sökningar.
            </p>
            <div className="flex items-center space-x-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-all"
              >
                <span className="text-lg">𝕏</span>
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-all"
              >
                <span className="text-lg">in</span>
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-all"
              >
                <span className="text-lg">f</span>
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-foreground mb-4">Lösningar</h4>
            <ul className="space-y-3">
              <li>
                <a href="/losningar" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Översikt lösningar
                </a>
              </li>
              <li>
                <a
                  href="/losningar/smart-narvarohantering"
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  Smart Närvarohantering
                </a>
              </li>
              <li>
                <a
                  href="/losningar/intelligent-rykteshantering"
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  Intelligent Rykteshantering
                </a>
              </li>
              <li>
                <a
                  href="/losningar/social-media-automatisering"
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  Social Media Automatisering
                </a>
              </li>
              <li>
                <a
                  href="/losningar/lokalt-seo"
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  Lokal SEO
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-foreground mb-4">Branscher</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="/bransch/kliniker-vard"
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  Kliniker & Vård
                </a>
              </li>
              <li>
                <a
                  href="/bransch/skonhetssalonger"
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  Skönhetssalonger
                </a>
              </li>
              <li>
                <a
                  href="/bransch/butikskedjor"
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  Butikskedjor
                </a>
              </li>
              <li>
                <a
                  href="/bransch/restauranger-cafeer"
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  Restauranger & Caféer
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-foreground mb-4">Företag & Kontakt</h4>
            <ul className="space-y-3 mb-6">
              <li>
                <a href="/om-oss" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Om oss
                </a>
              </li>
              <li>
                <a href="/resultat" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Resultat
                </a>
              </li>
              <li>
                <a href="/kontakt" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Kontakt
                </a>
              </li>
              <li className="flex items-center gap-2 text-sm pt-2">
                <Mail className="w-4 h-4 text-primary" />
                <a
                  href="mailto:hello@boost08.com"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  hello@boost08.se
                </a>
              </li>
            </ul>

            <div className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-4">
              <p className="text-xs font-semibold text-foreground mb-2">Få månatliga tips om lokal SEO</p>
              <p className="text-xs text-muted-foreground mb-3">Gå med 3,500+ prenumeranter</p>
              <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
                <Input
                  type="email"
                  placeholder="Din e-post"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="text-sm h-9"
                />
                <Button type="submit" variant="hero" size="sm">
                  Gå med
                </Button>
              </form>
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            Copyright © {new Date().getFullYear()} Boost08. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
