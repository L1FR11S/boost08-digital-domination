import { Helmet } from "react-helmet-async";

interface LocalBusinessSchema {
  name: string;
  description: string;
  url: string;
  telephone?: string;
  address?: {
    streetAddress: string;
    addressLocality: string;
    addressCountry: string;
  };
  priceRange?: string;
  image?: string;
}

interface ProductSchema {
  name: string;
  description: string;
  image?: string;
  offers?: {
    price: string;
    priceCurrency: string;
  };
}

interface FAQSchema {
  questions: Array<{
    question: string;
    answer: string;
  }>;
}

interface SchemaMarkupProps {
  type: "Organization" | "LocalBusiness" | "Product" | "FAQPage" | "Article" | "WebSite" | "SoftwareApplication";
  data?: any;
}

const SchemaMarkup = ({ type, data }: SchemaMarkupProps) => {
  const generateSchema = () => {
    const baseSchema = {
      "@context": "https://schema.org",
    };

    switch (type) {
      case "Organization":
        return {
          ...baseSchema,
          "@type": "Organization",
          name: "Boost08",
          url: "https://boost08.com",
          logo: "https://boost08.com/logo.png",
          description: "Intelligent tillväxtplattform för lokala företag",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Stockholm",
            addressCountry: "SE",
          },
          contactPoint: {
            "@type": "ContactPoint",
            contactType: "Customer Service",
            email: "hej@boost08.se",
            availableLanguage: ["Swedish"],
          },
          sameAs: [
            "https://www.facebook.com/boost08",
            "https://www.linkedin.com/company/boost08",
          ],
        };

      case "LocalBusiness":
        const businessData = data as LocalBusinessSchema;
        return {
          ...baseSchema,
          "@type": "LocalBusiness",
          name: businessData.name,
          description: businessData.description,
          url: businessData.url,
          telephone: businessData.telephone,
          address: businessData.address
            ? {
                "@type": "PostalAddress",
                streetAddress: businessData.address.streetAddress,
                addressLocality: businessData.address.addressLocality,
                addressCountry: businessData.address.addressCountry,
              }
            : undefined,
          priceRange: businessData.priceRange,
          image: businessData.image,
        };

      case "Product":
        const productData = data as ProductSchema;
        return {
          ...baseSchema,
          "@type": "Product",
          name: productData.name,
          description: productData.description,
          image: productData.image,
          brand: {
            "@type": "Brand",
            name: "Boost08",
          },
          offers: productData.offers
            ? {
                "@type": "Offer",
                price: productData.offers.price,
                priceCurrency: productData.offers.priceCurrency,
              }
            : undefined,
        };

      case "FAQPage":
        const faqData = data as FAQSchema;
        return {
          ...baseSchema,
          "@type": "FAQPage",
          mainEntity: faqData.questions.map((q) => ({
            "@type": "Question",
            name: q.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: q.answer,
            },
          })),
        };

      case "Article":
        return {
          ...baseSchema,
          "@type": "Article",
          headline: data.title,
          description: data.description,
          image: data.image,
          datePublished: data.datePublished,
          dateModified: data.dateModified,
          author: {
            "@type": "Organization",
            name: "Boost08",
          },
          publisher: {
            "@type": "Organization",
            name: "Boost08",
            logo: {
              "@type": "ImageObject",
              url: "https://boost08.com/logo.png",
            },
          },
        };

      case "WebSite":
        return {
          ...baseSchema,
          "@type": "WebSite",
          name: "Boost08",
          url: "https://boost08.com",
          description: "Intelligent tillväxtplattform för lokala företag",
          publisher: {
            "@type": "Organization",
            name: "Boost08",
          },
          potentialAction: {
            "@type": "SearchAction",
            target: {
              "@type": "EntryPoint",
              urlTemplate: "https://boost08.com/search?q={search_term_string}",
            },
            "query-input": "required name=search_term_string",
          },
          inLanguage: "sv-SE",
        };

      case "SoftwareApplication":
        return {
          ...baseSchema,
          "@type": "SoftwareApplication",
          name: "Boost08 Platform",
          applicationCategory: "BusinessApplication",
          operatingSystem: "Web",
          description: "Intelligent tillväxtplattform för lokala företag med automatisering för digital närvaro, recensioner och lokal SEO",
          offers: {
            "@type": "Offer",
            description: "Kontakta oss för prissättning",
            url: "https://boost08.com/kontakt",
          },
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: "4.8",
            reviewCount: "127",
            bestRating: "5",
            worstRating: "1",
          },
          featureList: [
            "Smart Närvarohantering",
            "Intelligent Rykteshantering",
            "Social Media Automatisering",
            "Lokalt SEO",
          ],
        };

      default:
        return baseSchema;
    }
  };

  const schema = generateSchema();

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
};

export default SchemaMarkup;
