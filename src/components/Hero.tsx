import TrackableCTA from "@/components/analytics/TrackableCTA";
import dashboardImage from "@/assets/dashboard-hero.png";
import logo from "@/assets/logo.png";
import { useEffect, useRef, useState } from "react";
import { Star } from "lucide-react";
import TrustBadges from "./TrustBadges";
import SocialProofTicker from "./SocialProofTicker";
const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const imageRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
      }
    }, {
      threshold: 0.1
    });
    if (imageRef.current) {
      observer.observe(imageRef.current);
    }
    return () => {
      if (imageRef.current) {
        observer.unobserve(imageRef.current);
      }
    };
  }, []);
  return <section className="pt-32 pb-24 bg-gradient-hero overflow-hidden relative">
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,hsl(186_80%_45%_/_0.15),transparent_50%)] pointer-events-none animate-gradient"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,hsl(290_75%_55%_/_0.1),transparent_50%)] pointer-events-none animate-gradient"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto mb-20 animate-slide-up">
          <div className="mb-8 flex justify-center animate-float">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-soft hover-scale">
              <img src={logo} alt="Boost08" className="w-12 h-12 rounded-xl" />
            </div>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Boost08 hjälper lokala företag <span className="text-primary">dominera</span> sin lokala marknad
          </h1>

          <p className="text-lg sm:text-xl text-muted-foreground mb-6 max-w-3xl mx-auto">
            Med vår intelligenta tillväxtplattform hanterar du automatiskt online-närvaro, recensioner och lokal SEO - utan att lyfta ett finger
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up" style={{
          animationDelay: '200ms'
        }}>
            <TrackableCTA ctaText="Boka Demo" location="hero" variant="hero" size="lg" className="w-full sm:w-auto text-base px-12 shadow-glow animate-pulse-glow hover-lift group" onClick={() => window.open('https://zcal.co/boost08', '_blank')}>
              Boka Demo
            </TrackableCTA>
          </div>
          
          

          <TrustBadges />
          <SocialProofTicker />
        </div>

        <div ref={imageRef} className={`relative max-w-5xl mx-auto transition-all duration-1000 group ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
          <div className="rounded-2xl overflow-hidden shadow-card border border-border bg-white p-4 hover-lift">
            <img src={dashboardImage} alt="Boost08 Dashboard" className="w-full rounded-lg group-hover:scale-[1.02] transition-transform duration-500" />
          </div>
          <div className="absolute inset-0 shimmer-effect rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
        </div>

        <div className="mt-16 text-center animate-slide-up" style={{
        animationDelay: '400ms'
      }}>
          <p className="text-foreground font-medium mb-4">
            Rekommenderas av 2,000+ nöjda företag världen över!
          </p>
          <div className="flex items-center justify-center gap-1">
            {[...Array(5)].map((_, i) => <Star key={i} className="w-6 h-6 fill-secondary text-secondary hover-scale" />)}
          </div>
        </div>
      </div>
    </section>;
};
export default Hero;