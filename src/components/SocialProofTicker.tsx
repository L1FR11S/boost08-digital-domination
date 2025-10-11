import { useEffect, useState } from "react";

const proofMessages = [
  "Pizzeria Milano fick 47% fler recensioner på 2 månader",
  "Stockholm Fitness ökade sin synlighet med 89% på Google Maps",
  "Svenska Café Kedjan hanterar nu 500+ recensioner automatiskt",
  "Butiker sparar 15 timmar/vecka på automatiserad hantering",
  "Bilverkstad Norr fick 3.2x fler kundförfrågningar via Google",
];

const SocialProofTicker = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % proofMessages.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mt-12 py-4 px-6 rounded-2xl bg-gradient-glass backdrop-blur-md border border-border/50 shadow-soft overflow-hidden">
      <div className="flex items-center justify-center gap-3">
        <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
        <p className="text-sm font-medium text-foreground text-center animate-fade-in">
          {proofMessages[currentIndex]}
        </p>
      </div>
    </div>
  );
};

export default SocialProofTicker;
