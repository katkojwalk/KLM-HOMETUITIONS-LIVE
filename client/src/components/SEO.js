import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, keywords, image, url, type, schema }) => {
  const siteTitle = title 
    ? `${title} | Quadra Home Tuitions` 
    : 'QUADRA HOME TUITIONS | Premier Private & Online Tutors';
  
  const siteDescription = description 
    || 'Quadra Home Tuitions connects students with certified, expert home tutors and online teachers for personalized 1-on-1 learning.';

  const siteKeywords = keywords 
    || 'home tuitions, private tutors, home tutor, online tutoring, Quadra Home Tuitions, personal teacher, math tutor, science tutor, private tuition';

  const siteUrl = url || 'https://yourdomain.com/';
  const siteImage = image || 'https://yourdomain.com/logo192.png';
  const pageType = type || 'website';

  const schemasToRender = Array.isArray(schema) ? schema : (schema ? [schema] : []);

  return (
    <Helmet>
      {/* Standard Meta Tags */}
      <title>{siteTitle}</title>
      <meta name="description" content={siteDescription} />
      <meta name="keywords" content={siteKeywords} />

      {/* Open Graph / Facebook / WhatsApp */}
      <meta property="og:type" content={pageType} />
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={siteDescription} />
      <meta property="og:url" content={siteUrl} />
      <meta property="og:image" content={siteImage} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={siteTitle} />
      <meta name="twitter:description" content={siteDescription} />
      <meta name="twitter:image" content={siteImage} />

      {/* Canonical Link */}
      <link rel="canonical" href={siteUrl} />

      {/* JSON-LD Schema.org Data for AEO & GEO */}
      {schemasToRender.map((s, idx) => (
        <script key={idx} type="application/ld+json">
          {JSON.stringify(s)}
        </script>
      ))}
    </Helmet>
  );
};

export default SEO;
