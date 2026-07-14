import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
}

const SEO = ({ 
  title = 'Ropes & Rings | Woven for Every Occasion',
  description = 'Shop handwoven macrame bag tags, handle hangings, pot hangers, pencil cases, and key chains from Ropes & Rings.',
  keywords = 'macrame, handwoven macrame, bag tags, handle hangings, pot hangers, pencil cases, key chains, return gifts, custom hampers',
  image = '/og-image.jpg',
  url = 'https://accessories-boutique.com'
}: SEOProps) => {
  const siteTitle = title.includes('Ropes & Rings')
    ? title 
    : `${title} | Ropes & Rings`;

  return (
    <Helmet>
      {/* Standard metadata tags */}
      <title>{siteTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={siteTitle} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />
    </Helmet>
  );
};

export default SEO;
