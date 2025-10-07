import logo from "@/assets/logo.png";
const Footer = () => {
  return <footer className="bg-background border-t border-border py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center space-y-6">
          <div className="flex items-center space-x-2">
            <img src={logo} alt="Boost08 Logo" className="w-8 h-8" />
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

          
        </div>
      </div>
    </footer>;
};
export default Footer;