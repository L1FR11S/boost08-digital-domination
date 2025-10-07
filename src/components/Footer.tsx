const Footer = () => {
  return (
    <footer className="bg-background border-t border-border py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center space-y-6">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary"></div>
            <span className="text-xl font-bold">BOOST<sup className="text-sm">08</sup></span>
          </div>

          <div className="flex items-center space-x-6">
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              <span className="text-xl">𝕏</span>
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              <span className="text-xl">in</span>
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              <span className="text-xl">f</span>
            </a>
          </div>

          <p className="text-sm text-muted-foreground">
            Copyright © Boost08. All rights reserved.
          </p>

          <a 
            href="https://reiterate.se" 
            className="text-xs text-muted-foreground hover:text-primary transition-colors"
          >
            Reiterate
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
