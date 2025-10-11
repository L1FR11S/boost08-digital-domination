import { Button } from "@/components/ui/button";
import { ArrowRight, LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";

interface Product {
  icon: LucideIcon;
  title: string;
  description: string;
  href: string;
}

interface RecommendedProductsProps {
  products: Product[];
}

const RecommendedProducts = ({ products }: RecommendedProductsProps) => {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Rekommenderade Lösningar
            </h2>
            <p className="text-xl text-muted-foreground">
              Perfekt anpassade för er bransch
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product, index) => {
              const Icon = product.icon;
              return (
                <Link 
                  key={index}
                  to={product.href}
                  className="group"
                >
                  <div className="h-full p-6 bg-card rounded-xl border border-border hover:border-primary/50 transition-all hover:shadow-card">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">
                      {product.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      {product.description}
                    </p>
                    <div className="flex items-center text-primary text-sm font-semibold group-hover:gap-2 gap-1 transition-all">
                      Läs Mer
                      <ArrowRight className="h-3 w-3" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default RecommendedProducts;
