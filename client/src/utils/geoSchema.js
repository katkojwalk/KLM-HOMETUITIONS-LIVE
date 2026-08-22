export const getLocalBusinessSchema = () => ({
  "@context": "https://schema.org",
  "@type": ["EducationalOrganization", "LocalBusiness"],
  "name": "Quadra Home Tuitions",
  "image": "https://www.quadrahometuitions.in/logo192.png",
  "url": "https://www.quadrahometuitions.in",
  "telephone": "+91-8309427266",
  "priceRange": "₹₹",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Hyderabad City Center",
    "addressLocality": "Hyderabad",
    "addressRegion": "Telangana",
    "postalCode": "500001",
    "addressCountry": "IN"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 17.385044,
    "longitude": 78.486671
  },
  "areaServed": [
    "Hyderabad",
    "Gachibowli",
    "Jubilee Hills",
    "Hitech City",
    "Madhapur",
    "Kukatpally",
    "Banjara Hills",
    "Secunderabad",
    "Ameerpet",
    "Dilsukhnagar"
  ],
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ],
    "opens": "08:00",
    "closes": "20:00"
  },
  "sameAs": [
    "https://www.quadrahometuitions.in"
  ]
});

export const getFaqSchema = (faqItems) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqItems.map(item => ({
    "@type": "Question",
    "name": item.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": item.answer
    }
  }))
});
