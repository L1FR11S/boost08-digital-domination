interface ProductDemoProps {
  image: string;
  title: string;
  description: string;
}

const ProductDemo = ({ image, title, description }: ProductDemoProps) => {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">{title}</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {description}
            </p>
          </div>
          
          <div className="relative rounded-2xl overflow-hidden shadow-card">
            <img 
              src={image} 
              alt={title}
              className="w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDemo;
