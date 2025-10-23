import { useState } from "react";
import { Calculator, TrendingUp, Users, Star } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { useToast } from "@/hooks/use-toast";

const ROICalculator = () => {
  const { toast } = useToast();
  const [industry, setIndustry] = useState("");
  const [locations, setLocations] = useState("");
  const [reviews, setReviews] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const calculateROI = () => {
    if (industry && locations && reviews) {
      setShowResults(true);
    }
  };

  const estimatedIncrease = parseInt(locations || "0") * 23 + parseInt(reviews || "0") * 0.8;
  const newCustomers = Math.round(estimatedIncrease / 10);
  const revenue = newCustomers * 850;

  const handleReportSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      company: formData.get('company') as string,
      industry,
      locations: parseInt(locations),
      reviews: parseInt(reviews),
      estimatedIncrease: `+${Math.round(estimatedIncrease)}%`,
      newCustomers: `+${newCustomers}`,
      revenue: `${revenue.toLocaleString()} kr`,
    };

    // Validate input
    try {
      const { roiCalculatorSchema } = await import('@/lib/validation');
      roiCalculatorSchema.parse({
        name: data.name,
        email: data.email,
        phone: data.phone,
        company: data.company,
        industry: data.industry,
        locations: data.locations,
        reviews: data.reviews,
      });
    } catch (error: any) {
      toast({
        title: "Valideringsfel",
        description: error.errors?.[0]?.message || "Ogiltig inmatning",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('https://vllpaaomsmuhcngiikhf.supabase.co/functions/v1/send-roi-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error('Failed to send email');

      toast({
        title: "Din rapport har skickats!",
        description: "Kolla din e-post för den detaljerade rapporten.",
      });

      setIsDialogOpen(false);
      (e.target as HTMLFormElement).reset();
    } catch (error: any) {
      toast({
        title: "Ett fel uppstod",
        description: "Försök igen senare.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-24 bg-gradient-to-b from-background to-accent/10 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-4">
              <Calculator className="w-4 h-4" />
              <span className="text-sm font-semibold">ROI-Kalkylator</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Räkna Ut Din Potential
            </h2>
            <p className="text-lg text-muted-foreground">
              Se hur mycket mer synlighet och kunder du kan få med Boost08
            </p>
          </div>

          <div className="bg-card/80 backdrop-blur-lg rounded-3xl p-8 sm:p-12 shadow-card border border-border">
            <div className="grid sm:grid-cols-3 gap-6 mb-8">
              <div>
                <Label htmlFor="industry" className="mb-2 block">Bransch</Label>
                <Select value={industry} onValueChange={setIndustry}>
                  <SelectTrigger id="industry">
                    <SelectValue placeholder="Välj bransch" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="restaurant">Restaurang & Café</SelectItem>
                    <SelectItem value="retail">Retail & Butiker</SelectItem>
                    <SelectItem value="health">Hälsa & Wellness</SelectItem>
                    <SelectItem value="services">Bygg & Hemtjänster</SelectItem>
                    <SelectItem value="automotive">Bilhandel & Verkstäder</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="locations" className="mb-2 block">Antal Platser</Label>
                <Input
                  id="locations"
                  type="number"
                  placeholder="t.ex. 3"
                  value={locations}
                  onChange={(e) => setLocations(e.target.value)}
                  className="bg-background"
                />
              </div>

              <div>
                <Label htmlFor="reviews" className="mb-2 block">Nuvarande Recensioner/Månad</Label>
                <Input
                  id="reviews"
                  type="number"
                  placeholder="t.ex. 15"
                  value={reviews}
                  onChange={(e) => setReviews(e.target.value)}
                  className="bg-background"
                />
              </div>
            </div>

            <Button
              onClick={calculateROI}
              className="w-full mb-8"
              size="lg"
              variant="hero"
              disabled={!industry || !locations || !reviews}
            >
              <Calculator className="w-5 h-5" />
              Beräkna Min Potential
            </Button>

            {showResults && (
              <div className="space-y-6 animate-fade-in">
                <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>

                <div className="grid sm:grid-cols-3 gap-6">
                  <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20">
                    <TrendingUp className="w-8 h-8 text-primary mx-auto mb-3" />
                    <div className="text-3xl font-bold text-foreground mb-1">
                      +{Math.round(estimatedIncrease)}%
                    </div>
                    <div className="text-sm text-muted-foreground">Ökad Synlighet</div>
                  </div>

                  <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-secondary/10 to-secondary/5 border border-secondary/20">
                    <Users className="w-8 h-8 text-secondary mx-auto mb-3" />
                    <div className="text-3xl font-bold text-foreground mb-1">
                      +{newCustomers}
                    </div>
                    <div className="text-sm text-muted-foreground">Nya Kunder/Månad</div>
                  </div>

                  <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-success/10 to-success/5 border border-success/20">
                    <Star className="w-8 h-8 text-success mx-auto mb-3" />
                    <div className="text-3xl font-bold text-foreground mb-1">
                      {revenue.toLocaleString()} kr
                    </div>
                    <div className="text-sm text-muted-foreground">Uppskattad Omsättning</div>
                  </div>
                </div>

                <div className="bg-accent/20 rounded-2xl p-6 text-center">
                  <p className="text-sm text-muted-foreground mb-4">
                    <strong className="text-foreground">95%</strong> av liknande företag såg resultat inom <strong className="text-foreground">30 dagar</strong>
                  </p>
                  
                  <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                      <Button variant="hero" size="lg">
                        Få Min Personliga Rapport
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Få Din Personliga ROI-Rapport</DialogTitle>
                        <DialogDescription>
                          Fyll i dina uppgifter så skickar vi en detaljerad rapport med exakt hur Boost08 kan hjälpa ditt företag.
                        </DialogDescription>
                      </DialogHeader>
                      <form className="space-y-4 pt-4" onSubmit={handleReportSubmit}>
                        <div>
                          <Label htmlFor="name">Namn</Label>
                          <Input id="name" name="name" placeholder="Ditt namn" required />
                        </div>
                        <div>
                          <Label htmlFor="email">E-post</Label>
                          <Input id="email" name="email" type="email" placeholder="din@email.se" required />
                        </div>
                        <div>
                          <Label htmlFor="company">Företag</Label>
                          <Input id="company" name="company" placeholder="Ditt företag" required />
                        </div>
                        <div>
                          <Label htmlFor="phone">Telefon</Label>
                          <Input id="phone" name="phone" type="tel" placeholder="070-123 45 67" required />
                        </div>
                        <Button className="w-full" variant="hero" type="submit" disabled={isLoading}>
                          {isLoading ? "Skickar..." : "Skicka Rapport Till Mig"}
                        </Button>
                      </form>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ROICalculator;
