import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

interface FAQShortcut {
  question: string;
  href: string;
}

const FAQShortcuts = () => {
  const faqs: FAQShortcut[] = [
    { question: "Hur kommer jag igång?", href: "/prova-gratis" },
    { question: "Vilka lösningar erbjuder ni?", href: "/losningar" },
    { question: "Se kundcase och resultat", href: "/resultat" },
    { question: "Läs mer om oss", href: "/om-oss" }
  ];

  return (
    <div className="bg-muted/30 rounded-2xl p-8">
      <h3 className="font-semibold mb-6 text-lg">Snabba Svar</h3>
      <div className="space-y-3">
        {faqs.map((faq, index) => (
          <Link
            key={index}
            to={faq.href}
            className="flex items-center justify-between p-3 bg-background rounded-lg hover:border-primary/50 border border-border transition-all group"
          >
            <span className="text-sm font-medium">{faq.question}</span>
            <ArrowRight className="h-4 w-4 text-primary group-hover:translate-x-1 transition-transform" />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default FAQShortcuts;
