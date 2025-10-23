import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Loader2, CheckCircle2, TrendingUp, ArrowRight } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

interface SEOOptimizationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  isLoading: boolean;
  optimizedData: {
    optimizedTitle?: string;
    optimizedMetaTitle?: string;
    optimizedMetaDescription?: string;
    optimizedKeywords?: string;
    optimizedContent?: string;
    ctaMidTitle?: string;
    ctaMidDescription?: string;
    ctaEndTitle?: string;
    ctaEndDescription?: string;
    seoScore?: number;
    improvements?: string[];
    internalLinkSuggestions?: string[];
  } | null;
  onApply: () => void;
  originalData: {
    title: string;
    metaTitle: string;
    metaDescription: string;
    keywords: string;
  };
}

const SEOOptimizationDialog = ({
  open,
  onOpenChange,
  isLoading,
  optimizedData,
  onApply,
  originalData,
}: SEOOptimizationDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            SEO-Optimering med AI
          </DialogTitle>
        </DialogHeader>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-12 gap-4">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
            <p className="text-muted-foreground">Analyserar och optimerar innehåll...</p>
          </div>
        ) : optimizedData ? (
          <ScrollArea className="max-h-[60vh] pr-4">
            <div className="space-y-6">
              {/* SEO Score */}
              {optimizedData.seoScore && (
                <div className="flex items-center gap-3 p-4 bg-primary/5 rounded-lg">
                  <CheckCircle2 className="h-6 w-6 text-primary" />
                  <div>
                    <p className="font-semibold">SEO Score</p>
                    <p className="text-2xl font-bold text-primary">{optimizedData.seoScore}/100</p>
                  </div>
                </div>
              )}

              {/* Improvements */}
              {optimizedData.improvements && optimizedData.improvements.length > 0 && (
                <div>
                  <h3 className="font-semibold mb-2">Förbättringar</h3>
                  <ul className="space-y-2">
                    {optimizedData.improvements.map((improvement, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{improvement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <Separator />

              {/* Title Comparison */}
              {optimizedData.optimizedTitle && (
                <div>
                  <h3 className="font-semibold mb-2">Titel</h3>
                  <div className="grid gap-2">
                    <div className="p-3 bg-muted/50 rounded">
                      <p className="text-xs text-muted-foreground mb-1">Nuvarande:</p>
                      <p className="text-sm">{originalData.title || "Ingen titel"}</p>
                    </div>
                    <ArrowRight className="h-4 w-4 text-primary mx-auto" />
                    <div className="p-3 bg-primary/5 rounded border border-primary/20">
                      <p className="text-xs text-muted-foreground mb-1">Optimerad:</p>
                      <p className="text-sm font-medium">{optimizedData.optimizedTitle}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Meta Title Comparison */}
              {optimizedData.optimizedMetaTitle && (
                <div>
                  <h3 className="font-semibold mb-2">Meta Title</h3>
                  <div className="grid gap-2">
                    <div className="p-3 bg-muted/50 rounded">
                      <p className="text-xs text-muted-foreground mb-1">Nuvarande:</p>
                      <p className="text-sm">{originalData.metaTitle || "Ingen meta title"}</p>
                      <p className="text-xs text-muted-foreground mt-1">{originalData.metaTitle?.length || 0} tecken</p>
                    </div>
                    <ArrowRight className="h-4 w-4 text-primary mx-auto" />
                    <div className="p-3 bg-primary/5 rounded border border-primary/20">
                      <p className="text-xs text-muted-foreground mb-1">Optimerad:</p>
                      <p className="text-sm font-medium">{optimizedData.optimizedMetaTitle}</p>
                      <p className="text-xs text-muted-foreground mt-1">{optimizedData.optimizedMetaTitle?.length || 0} tecken</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Meta Description Comparison */}
              {optimizedData.optimizedMetaDescription && (
                <div>
                  <h3 className="font-semibold mb-2">Meta Description</h3>
                  <div className="grid gap-2">
                    <div className="p-3 bg-muted/50 rounded">
                      <p className="text-xs text-muted-foreground mb-1">Nuvarande:</p>
                      <p className="text-sm">{originalData.metaDescription || "Ingen meta description"}</p>
                      <p className="text-xs text-muted-foreground mt-1">{originalData.metaDescription?.length || 0} tecken</p>
                    </div>
                    <ArrowRight className="h-4 w-4 text-primary mx-auto" />
                    <div className="p-3 bg-primary/5 rounded border border-primary/20">
                      <p className="text-xs text-muted-foreground mb-1">Optimerad:</p>
                      <p className="text-sm font-medium">{optimizedData.optimizedMetaDescription}</p>
                      <p className="text-xs text-muted-foreground mt-1">{optimizedData.optimizedMetaDescription?.length || 0} tecken</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Keywords Comparison */}
              {optimizedData.optimizedKeywords && (
                <div>
                  <h3 className="font-semibold mb-2">Keywords</h3>
                  <div className="grid gap-2">
                    <div className="p-3 bg-muted/50 rounded">
                      <p className="text-xs text-muted-foreground mb-2">Nuvarande:</p>
                      <div className="flex flex-wrap gap-1">
                        {originalData.keywords ? (
                          originalData.keywords.split(',').map((kw, idx) => (
                            <Badge key={idx} variant="secondary">{kw.trim()}</Badge>
                          ))
                        ) : (
                          <span className="text-sm text-muted-foreground">Inga keywords</span>
                        )}
                      </div>
                    </div>
                    <ArrowRight className="h-4 w-4 text-primary mx-auto" />
                    <div className="p-3 bg-primary/5 rounded border border-primary/20">
                      <p className="text-xs text-muted-foreground mb-2">Optimerad:</p>
                      <div className="flex flex-wrap gap-1">
                        {optimizedData.optimizedKeywords.split(',').map((kw, idx) => (
                          <Badge key={idx} variant="default">{kw.trim()}</Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Internal Link Suggestions */}
              {optimizedData.internalLinkSuggestions && optimizedData.internalLinkSuggestions.length > 0 && (
                <div>
                  <h3 className="font-semibold mb-2">Förslag på Interna Länkar</h3>
                  <ul className="space-y-1">
                    {optimizedData.internalLinkSuggestions.map((link, idx) => (
                      <li key={idx} className="text-sm text-muted-foreground">• {link}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* CTA Suggestions */}
              {(optimizedData.ctaMidTitle || optimizedData.ctaEndTitle) && (
                <>
                  <Separator />
                  <div>
                    <h3 className="font-semibold mb-3">AI-Genererade CTA:er</h3>
                    
                    {optimizedData.ctaMidTitle && (
                      <div className="mb-4 p-4 bg-primary/5 rounded-lg border border-primary/20">
                        <p className="text-xs font-medium text-muted-foreground mb-2">CTA Mitt i Artikeln:</p>
                        <p className="font-semibold text-sm mb-1">{optimizedData.ctaMidTitle}</p>
                        <p className="text-xs text-muted-foreground">{optimizedData.ctaMidDescription}</p>
                      </div>
                    )}

                    {optimizedData.ctaEndTitle && (
                      <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                        <p className="text-xs font-medium text-muted-foreground mb-2">CTA Slutet av Artikeln:</p>
                        <p className="font-semibold text-sm mb-1">{optimizedData.ctaEndTitle}</p>
                        <p className="text-xs text-muted-foreground">{optimizedData.ctaEndDescription}</p>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          </ScrollArea>
        ) : null}

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Avbryt
          </Button>
          {optimizedData && !isLoading && (
            <Button onClick={onApply} className="gap-2">
              <CheckCircle2 className="h-4 w-4" />
              Använd Optimering
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SEOOptimizationDialog;
