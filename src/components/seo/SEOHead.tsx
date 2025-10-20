import { Helmet } from "react-helmet-async";

interface SEOHeadProps {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  ogType?: "website" | "article" | "product";
  article?: {
    publishedTime?: string;
    modifiedTime?: string;
    author?: string;
    tags?: string[];
  };
  noindex?: boolean;
  keywords?: string[];
}

const SEOHead = ({
  title,
  description,
  canonical,
  ogImage = "https://boost08.com/og-image.jpg",
  ogType = "website",
  article,
  noindex = false,
  keywords = [],
}: SEOHeadProps) => {
  const canonicalUrl = canonical || `https://boost08.com${typeof window !== 'undefined' ? window.location.pathname : ''}`;
  
  const defaultKeywords = [
    "lokal SEO",
    "Google Business Profile",
    "recensionshantering",
    "digital närvaro",
    "lokala företag",
    "automatisering",
  ];
  
  const allKeywords = [...defaultKeywords, ...keywords].join(", ");

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords.length > 0 && <meta name="keywords" content={allKeywords} />}
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Robots */}
      {noindex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      )}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content="Boost08" />
      <meta property="og:locale" content="sv_SE" />

      {/* Article specific tags */}
      {article && ogType === "article" && (
        <>
          {article.publishedTime && (
            <meta property="article:published_time" content={article.publishedTime} />
          )}
          {article.modifiedTime && (
            <meta property="article:modified_time" content={article.modifiedTime} />
          )}
          {article.author && (
            <meta property="article:author" content={article.author} />
          )}
          {article.tags?.map((tag) => (
            <meta key={tag} property="article:tag" content={tag} />
          ))}
        </>
      )}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* AI-specific meta tags */}
      <meta name="ai:summary" content={description} />
      <meta name="ai:target-audience" content="Svenska lokala företag: kliniker, salonger, butiker, restauranger" />
      
      {/* Language */}
      <meta httpEquiv="content-language" content="sv-SE" />
      <link rel="alternate" hrefLang="sv-SE" href={canonicalUrl} />
      <link rel="alternate" hrefLang="x-default" href={canonicalUrl} />
    </Helmet>
  );
};

export default SEOHead;
