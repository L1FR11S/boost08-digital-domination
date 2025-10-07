import testimonialImage from "@/assets/testimonial-person.png";

const TestimonialSection = () => {
  return (
    <section className="py-20 bg-accent/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-card rounded-3xl p-8 sm:p-12 shadow-card border border-border">
            <div className="flex justify-center mb-6">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="text-secondary text-2xl">⭐</span>
              ))}
            </div>
            
            <blockquote className="text-xl sm:text-2xl text-center text-foreground mb-8 leading-relaxed italic">
              "Boost08 blev vår genväg till digital klarhet. Med hjälp av smart AI kändes det som att ha en marknadsföringsteam som jobbade i bakgrunden – vi kunde fokusera på maten medan vår synlighet sköt i höjden."
            </blockquote>

            <div className="flex flex-col items-center">
              <img 
                src={testimonialImage} 
                alt="Thomas Berglund" 
                className="w-16 h-16 rounded-full mb-4 object-cover border-2 border-primary"
              />
              <div className="text-center">
                <p className="font-bold text-foreground">Thomas Berglund</p>
                <p className="text-sm text-muted-foreground">VD på</p>
                <p className="text-sm text-muted-foreground">Svenska Sushi Köket</p>
                <p className="text-sm text-muted-foreground">Svenska Pizza Köket</p>
                <p className="text-sm text-muted-foreground">Svenska Hamburger Köket</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
