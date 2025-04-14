import { useMatches } from "@remix-run/react";

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: string;
}

export default function SEO({
  title,
  description,
  image,
  url,
  type = "website",
}: SEOProps) {
  const matches = useMatches();
  
  // Find the deepest route with SEO data
  const match = [...matches].reverse().find((match) => match.handle?.getSEO);

  // If a route provides SEO data, use it
  const routeSEO = match?.handle?.getSEO ? match.handle.getSEO(match.data) : null;

  // Merge props with route data, with props taking precedence
  const seo = {
    title: title || routeSEO?.title || "CouponHub - Save Money with the Best Coupon Codes",
    description: description || routeSEO?.description || "Find the latest coupon codes, discounts and deals from your favorite stores. Save money on your online shopping with CouponHub.",
    image: image || routeSEO?.image || "https://couponhub.com/og-image.jpg",
    url: url || routeSEO?.url || "https://couponhub.com",
    type: type || routeSEO?.type || "website",
  };

  const fullTitle = seo.title.includes("CouponHub") ? seo.title : `${seo.title} | CouponHub`;

  return (
    <>
      <title>{fullTitle}</title>
      <meta name="description" content={seo.description} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={seo.type} />
      <meta property="og:url" content={seo.url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:image" content={seo.image} />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={seo.url} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:image" content={seo.image} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={seo.url} />
    </>
  );
}
