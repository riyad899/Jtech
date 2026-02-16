import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({
  title = 'jTech - Technology Solutions, Web Development & IT Services',
  description = 'Leading provider of technology solutions, web development, mobile apps, hardware services, and cloud computing. Transform your business with jTech\'s innovative IT solutions.',
  keywords = 'technology solutions, web development, mobile app development, IT services, cloud computing, hardware services, software development, digital transformation, jTech',
  author = 'jTech',
  ogImage = 'https://jtechvision.com/og-image.jpg',
  twitterImage = 'https://jtechvision.com/twitter-image.jpg',
  url = 'https://jtechvision.com',
  type = 'website',
  structuredData = null,
  noIndex = false
}) => {
  const canonicalUrl = url.endsWith('/') ? url.slice(0, -1) : url;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      {noIndex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta name="robots" content="index, follow" />
      )}

      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="jTech" />
      <meta property="og:locale" content="en_US" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={twitterImage} />
      <meta name="twitter:creator" content="@jtech" />

      {/* Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;
