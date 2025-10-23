import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

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
  return (
    <div className="space-y-2">
      {onOptimizeClick && (
        <div className="flex justify-end">
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
        </div>
      )}
      <Textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="min-h-[400px] font-mono"
      />
    </div>
  );
};

export default RichTextEditor;
