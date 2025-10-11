import { ReactNode } from "react";
import Navigation from "./Navigation";
import Footer from "./Footer";
import { Helmet } from "react-helmet-async";

interface LayoutProps {
  children: ReactNode;
  title?: string;
  description?: string;
  ogImage?: string;
}

const Layout = ({ 
  children, 
  title = "Boost08 - Intelligent Tillväxtplattform för Lokala Företag",
  description = "Automatisera er digitala närvaro, recensioner och lokal SEO. Boost08 hjälper lokala företag att dominera sin marknad.",
  ogImage = "/og-image.jpg"
}: LayoutProps) => {
  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={ogImage} />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>
      
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
