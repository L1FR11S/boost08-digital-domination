import { Shield, Award, CheckCircle2, Users } from "lucide-react";

const TrustBadges = () => {
  const badges = [
    { icon: Shield, text: "ISO Certifierad" },
    { icon: Award, text: "Google Partner" },
    { icon: CheckCircle2, text: "GDPR Compliant" },
    { icon: Users, text: "2000+ Kunder" },
  ];

  return (
    <div className="flex flex-wrap items-center justify-center gap-6 mt-8">
      {badges.map((badge, index) => (
        <div
          key={index}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-card/50 backdrop-blur-sm border border-border shadow-soft"
        >
          <badge.icon className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium text-foreground">{badge.text}</span>
        </div>
      ))}
    </div>
  );
};

export default TrustBadges;
