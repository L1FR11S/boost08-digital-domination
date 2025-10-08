import { TrendingUp, Users, Star, Clock } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const MetricsWall = () => {
  const { ref, isVisible } = useScrollAnimation();

  const metrics = [
    {
      icon: Users,
      value: "2,000+",
      label: "Nöjda Företag",
      color: "text-primary",
    },
    {
      icon: Star,
      value: "500,000+",
      label: "Recensioner Hanterade",
      color: "text-secondary",
    },
    {
      icon: TrendingUp,
      value: "99.8%",
      label: "Platform Uptime",
      color: "text-success",
    },
    {
      icon: Clock,
      value: "4.9/5",
      label: "Genomsnittsbetyg",
      color: "text-primary",
    },
  ];

  return (
    <section ref={ref} className="py-20 bg-gradient-hero relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {metrics.map((metric, index) => (
            <div
              key={index}
              className={`text-center transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 rounded-2xl bg-card shadow-soft border border-border flex items-center justify-center hover-scale hover-glow">
                  <metric.icon className={`w-8 h-8 ${metric.color}`} />
                </div>
              </div>
              <div className="text-4xl font-bold text-foreground mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                {metric.value}
              </div>
              <div className="text-sm text-muted-foreground font-medium">
                {metric.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MetricsWall;
