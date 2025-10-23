import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Sparkles, Bold, Italic, List, ListOrdered, Heading2, Heading3, Link2, Code, Image } from "lucide-react";
import { useRef } from "react";
import { Separator } from "@/components/ui/separator";

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  onOptimizeClick?: () => void;
  isOptimizing?: boolean;
}

const RichTextEditor = ({ 
  value, 
  onChange, 
  placeholder,
  onOptimizeClick,
  isOptimizing = false
}: RichTextEditorProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const insertMarkdown = (before: string, after: string = "", placeholder: string = "") => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end) || placeholder;
    const newText = value.substring(0, start) + before + selectedText + after + value.substring(end);
    
    onChange(newText);
    
    // Set cursor position after insertion
    setTimeout(() => {
      const newPosition = start + before.length + selectedText.length;
      textarea.focus();
      textarea.setSelectionRange(newPosition, newPosition);
    }, 0);
  };

  const formatButtons = [
    { icon: Heading2, label: "H2", action: () => insertMarkdown("\n## ", "\n", "Rubrik 2") },
    { icon: Heading3, label: "H3", action: () => insertMarkdown("\n### ", "\n", "Rubrik 3") },
    { icon: Bold, label: "Bold", action: () => insertMarkdown("**", "**", "fet text") },
    { icon: Italic, label: "Italic", action: () => insertMarkdown("*", "*", "kursiv text") },
    { icon: List, label: "Lista", action: () => insertMarkdown("\n- ", "\n", "listpunkt") },
    { icon: ListOrdered, label: "Numrerad", action: () => insertMarkdown("\n1. ", "\n", "listpunkt") },
    { icon: Link2, label: "Länk", action: () => insertMarkdown("[", "](url)", "länktext") },
    { icon: Image, label: "Bild", action: () => insertMarkdown("![", "](url)", "bildtext") },
    { icon: Code, label: "Kod", action: () => insertMarkdown("`", "`", "kod") },
  ];

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <div className="flex items-center gap-1 flex-wrap">
          {formatButtons.map((btn, idx) => (
            <Button
              key={idx}
              type="button"
              variant="ghost"
              size="sm"
              onClick={btn.action}
              title={btn.label}
              className="h-8 w-8 p-0"
            >
              <btn.icon className="h-4 w-4" />
            </Button>
          ))}
        </div>
        
        {onOptimizeClick && (
          <>
            <Separator orientation="vertical" className="h-6 hidden sm:block" />
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={onOptimizeClick}
              disabled={isOptimizing}
              className="gap-2"
            >
              <Sparkles className="h-4 w-4" />
              {isOptimizing ? "Optimerar..." : "Optimera SEO med AI"}
            </Button>
          </>
        )}
      </div>
      
      <Textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="min-h-[400px] font-mono text-sm"
      />
      
      <p className="text-xs text-muted-foreground">
        Tips: Använd knapparna ovan för att formatera text med Markdown
      </p>
    </div>
  );
};

export default RichTextEditor;
