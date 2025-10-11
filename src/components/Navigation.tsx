import TrackableCTA from "@/components/analytics/TrackableCTA";
import logo from "@/assets/logo.png";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, Menu, X } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const solutionsLinks = [
    { title: "Smart Närvarohantering", href: "/losningar/smart-narvarohantering", description: "Automatisk synkronisering över alla plattformar" },
    { title: "Intelligent Rykteshantering", href: "/losningar/intelligent-rykteshantering", description: "AI-drivna recensionssvar" },
    { title: "Social Media-automatisering", href: "/losningar/social-media-automatisering", description: "AI-genererat innehåll" },
    { title: "Lokalt SEO-dominans", href: "/losningar/lokalt-seo", description: "Grannskapsbaserad optimering" },
  ];
  
  const industryLinks = [
    { title: "Kliniker & Vård", href: "/bransch/kliniker-vard" },
    { title: "Skönhetssalonger & Spa", href: "/bransch/skonhetssalonger" },
    { title: "Butikskedjor", href: "/bransch/butikskedjor" },
    { title: "Restauranger & Caféer", href: "/bransch/restauranger-cafeer" },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border transition-all duration-300 ${
      isScrolled ? "shadow-card" : ""
    }`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <img src={logo} alt="Boost08 Logo" className="w-8 h-8" />
            <span className="text-xl font-bold">BOOST<sup className="text-sm">08</sup></span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <NavigationMenu>
              <NavigationMenuList>
                
                {/* Lösningar dropdown */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-foreground hover:text-primary">
                    Lösningar
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[500px] gap-3 p-4 bg-popover">
                      {solutionsLinks.map((link) => (
                        <li key={link.href}>
                          <NavigationMenuLink asChild>
                            <Link to={link.href} className="block p-3 rounded-lg hover:bg-accent transition-colors">
                              <div className="font-semibold text-foreground mb-1">{link.title}</div>
                              <p className="text-sm text-muted-foreground">{link.description}</p>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                
                {/* Bransch dropdown */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-foreground hover:text-primary">
                    Bransch
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[300px] gap-2 p-4 bg-popover">
                      {industryLinks.map((link) => (
                        <li key={link.href}>
                          <NavigationMenuLink asChild>
                            <Link to={link.href} className="block p-3 rounded-lg hover:bg-accent transition-colors">
                              <div className="font-medium text-foreground">{link.title}</div>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                
              </NavigationMenuList>
            </NavigationMenu>
            
            <Link to="/resultat" className="text-foreground hover:text-primary transition-colors">
              Resultat
            </Link>
            <Link to="/om-oss" className="text-foreground hover:text-primary transition-colors">
              Om Oss
            </Link>
          </div>

          {/* CTA Button */}
          <div className="flex items-center space-x-4">
            <TrackableCTA
              ctaText="Boka Demo"
              location="navigation"
              variant="hero" 
              size="lg"
              className="hidden lg:inline-flex shadow-glow"
              onClick={() => window.open('https://zcal.co/boost08', '_blank')}
            >
              Boka Demo
            </TrackableCTA>
            
            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-md hover:bg-accent"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-border bg-background">
          <div className="container mx-auto px-4 py-4 space-y-4">
            <div>
              <div className="font-semibold mb-2 text-muted-foreground text-sm">Lösningar</div>
              {solutionsLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="block py-2 text-foreground hover:text-primary"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.title}
                </Link>
              ))}
            </div>
            
            <div>
              <div className="font-semibold mb-2 text-muted-foreground text-sm">Bransch</div>
              {industryLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="block py-2 text-foreground hover:text-primary"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.title}
                </Link>
              ))}
            </div>
            
            <Link
              to="/resultat"
              className="block py-2 font-medium text-foreground hover:text-primary"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Resultat
            </Link>
            
            <Link
              to="/om-oss"
              className="block py-2 font-medium text-foreground hover:text-primary"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Om Oss
            </Link>
            
            <TrackableCTA
              ctaText="Boka Demo"
              location="navigation_mobile"
              variant="hero"
              className="w-full"
              onClick={() => {
                setIsMobileMenuOpen(false);
                window.open('https://zcal.co/boost08', '_blank');
              }}
            >
              Boka Demo
            </TrackableCTA>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
