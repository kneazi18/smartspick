import { Product, BlogPost } from '../types';

// Helper function to extract brand name from product title
function extractBrandFromTitle(title: string): string | null {
  const commonBrands = [
    'Apple', 'Samsung', 'Amazon', 'Truthear', 'Moondrop', 'Meze Audio', 'Oriveti',
    'Sony', 'Bose', 'Sennheiser', 'Audio-Technica', 'Philips', 'HP', 'Dell',
    'ASUS', 'Acer', 'Lenovo', 'Microsoft', 'Google', 'LG', 'Panasonic',
    'Canon', 'Nikon', 'GoPro', 'DJI', 'Fitbit', 'Garmin', 'Polar',
    'Nike', 'Adidas', 'Under Armour', 'Shark', 'Dyson', 'Instant Pot'
  ];
  
  for (const brand of commonBrands) {
    if (title.toLowerCase().includes(brand.toLowerCase())) {
      return brand;
    }
  }
  
  // Try to extract first word as potential brand
  const firstWord = title.split(' ')[0];
  if (firstWord && firstWord.length > 2 && /^[A-Z]/.test(firstWord)) {
    return firstWord;
  }
  
  return null;
}

// Generate JSON-LD structured data for products
export function generateProductStructuredData(product: Product, siteUrl: string = 'https://smartspicks.com') {
  // Extract brand from product title if possible
  const brandName = extractBrandFromTitle(product.title);
  
  return {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": product.title,
    "description": product.description,
    "image": [`${siteUrl}${product.image}`],
    "brand": {
      "@type": "Brand",
      "name": brandName || "Various Brands"
    },
    "manufacturer": {
      "@type": "Organization", 
      "name": brandName || "Various Brands"
    },
    "offers": {
      "@type": "Offer",
      "price": product.price,
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock",
      "priceValidUntil": new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 30 days from now
      "seller": {
        "@type": "Organization",
        "name": "Amazon",
        "url": "https://amazon.com"
      },
      "url": product.amazonUrl,
      "hasMerchantReturnPolicy": {
        "@type": "MerchantReturnPolicy",
        "applicableCountry": "US",
        "returnPolicyCategory": "https://schema.org/MerchantReturnFiniteReturnWindow",
        "merchantReturnDays": 30,
        "returnMethod": "https://schema.org/ReturnByMail",
        "returnFees": "https://schema.org/FreeReturn",
        "merchantReturnLink": "https://www.amazon.com/returns",
        "additionalProperty": [
          {
            "@type": "PropertyValue",
            "name": "returnPolicyProvider",
            "value": "Affiliate merchant handles all returns and refunds"
          },
          {
            "@type": "PropertyValue", 
            "name": "returnPolicyNote",
            "value": "Returns are processed by the affiliate store according to their policies"
          }
        ]
      }
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": product.rating,
      "reviewCount": product.reviewCount,
      "bestRating": 5,
      "worstRating": 1
    },
    "review": {
      "@type": "Review",
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": product.rating,
        "bestRating": 5
      },
      "author": {
        "@type": "Organization",
        "name": "SmartsPicks"
      },
      "reviewBody": product.description
    },
    "category": product.category,
    "sku": product.id,
    "gtin": product.id, // Using ID as GTIN for now
    "mpn": product.id, // Using ID as MPN for now
    "url": `${siteUrl}/products/${product.slug}`,
    "productID": product.id,
    ...(product.features && product.features.length > 0 && {
      "additionalProperty": product.features.map(feature => ({
        "@type": "PropertyValue",
        "name": "Feature",
        "value": feature
      }))
    })
  };
}

// Generate JSON-LD structured data for blog articles
export function generateArticleStructuredData(post: BlogPost, siteUrl: string = 'https://smartspicks.com') {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "description": post.excerpt,
    "image": post.image,
    "author": {
      "@type": "Person",
      "name": post.author
    },
    "publisher": {
      "@type": "Organization",
      "name": "SmartsPicks",
      "logo": {
        "@type": "ImageObject",
        "url": `${siteUrl}/logo.png`
      }
    },
    "datePublished": post.publishedAt,
    "dateModified": post.publishedAt,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${siteUrl}/blog/${post.slug}`
    },
    "articleSection": post.category,
    "keywords": post.tags.join(", "),
    "wordCount": post.content ? Math.ceil(post.content.length / 5) : post.readTime * 200, // Rough estimate based on content or reading time
    "timeRequired": `PT${post.readTime}M`,
    "url": `${siteUrl}/blog/${post.slug}`
  };
}

// Generate JSON-LD structured data for organization (homepage)
export function generateOrganizationStructuredData(siteUrl: string = 'https://smartspicks.com') {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "SmartsPicks",
    "description": "Discover the best products with honest reviews and trusted recommendations. Save time and money with our expert product selections.",
    "url": siteUrl,
    "logo": `${siteUrl}/logo.png`,
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+1-555-SMART-01",
      "contactType": "customer service",
      "availableLanguage": ["English"]
    },
    "sameAs": [
      "https://facebook.com/smartspicks",
      "https://twitter.com/smartspicks",
      "https://instagram.com/smartspicks"
    ],
    "foundingDate": "2024",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "US"
    }
  };
}

// Generate JSON-LD structured data for website
export function generateWebsiteStructuredData(siteUrl: string = 'https://smartspicks.com') {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "SmartsPicks",
    "description": "Your trusted source for product recommendations and reviews",
    "url": siteUrl,
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${siteUrl}/search?q={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    },
    "publisher": {
      "@type": "Organization",
      "name": "SmartsPicks"
    }
  };
}

// Generate JSON-LD structured data for product collection/category
export function generateProductCollectionStructuredData(
  categoryName: string, 
  products: Product[], 
  siteUrl: string = 'https://smartspicks.com'
) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": `${categoryName} Products - SmartsPicks`,
    "description": `Best ${categoryName.toLowerCase()} products with expert reviews and recommendations`,
    "url": `${siteUrl}/categories/${categoryName.toLowerCase()}`,
    "mainEntity": {
      "@type": "ItemList",
      "numberOfItems": products.length,
      "itemListElement": products.map((product, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "Product",
          "name": product.title,
          "url": `${siteUrl}/products/${product.slug}`,
          "image": product.image,
          "offers": {
            "@type": "Offer",
            "price": product.price,
            "priceCurrency": "USD"
          }
        }
      }))
    }
  };
}

// Generate JSON-LD structured data for breadcrumbs
export function generateBreadcrumbStructuredData(breadcrumbs: Array<{name: string, url: string}>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": crumb.name,
      "item": crumb.url
    }))
  };
}

// Generate JSON-LD structured data for FAQ pages
export function generateFAQStructuredData(faqs: Array<{question: string, answer: string}>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
}

// Generate JSON-LD structured data for how-to guides
export function generateHowToStructuredData(
  name: string,
  description: string,
  steps: Array<{name: string, text: string, url?: string, image?: string}>,
  siteUrl: string = 'https://smartspicks.com'
) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": name,
    "description": description,
    "image": `${siteUrl}/images/how-to-guide.jpg`,
    "totalTime": "PT30M",
    "estimatedCost": {
      "@type": "MonetaryAmount",
      "currency": "USD",
      "value": "0"
    },
    "supply": [],
    "tool": [],
    "step": steps.map((step, index) => ({
      "@type": "HowToStep",
      "position": index + 1,
      "name": step.name,
      "text": step.text,
      ...(step.url && { "url": step.url }),
      ...(step.image && { "image": step.image })
    }))
  };
}

// Generate JSON-LD structured data for video content
export function generateVideoStructuredData(
  name: string,
  description: string,
  thumbnailUrl: string,
  uploadDate: string,
  duration: string,
  siteUrl: string = 'https://smartspicks.com'
) {
  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    "name": name,
    "description": description,
    "thumbnailUrl": thumbnailUrl,
    "uploadDate": uploadDate,
    "duration": duration,
    "contentUrl": `${siteUrl}/videos/${name.toLowerCase().replace(/\s+/g, '-')}.mp4`,
    "embedUrl": `${siteUrl}/embed/${name.toLowerCase().replace(/\s+/g, '-')}`,
    "publisher": {
      "@type": "Organization",
      "name": "SmartsPicks",
      "logo": {
        "@type": "ImageObject",
        "url": `${siteUrl}/logo.png`
      }
    }
  };
}

// Generate JSON-LD structured data for local business (if applicable)
export function generateLocalBusinessStructuredData(siteUrl: string = 'https://smartspicks.com') {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "SmartsPicks",
    "image": `${siteUrl}/logo.png`,
    "url": siteUrl,
    "telephone": "+1-555-SMART-01",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "123 Tech Street",
      "addressLocality": "San Francisco",
      "addressRegion": "CA",
      "postalCode": "94102",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 37.7749,
      "longitude": -122.4194
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday", 
        "Wednesday",
        "Thursday",
        "Friday"
      ],
      "opens": "09:00",
      "closes": "17:00"
    }
  };
}

// Generate JSON-LD structured data for reviews/ratings
export function generateReviewStructuredData(
  itemName: string,
  rating: number,
  reviewBody: string,
  author: string,
  datePublished: string,
  _siteUrl: string = 'https://smartspicks.com'
) {
  return {
    "@context": "https://schema.org",
    "@type": "Review",
    "itemReviewed": {
      "@type": "Product",
      "name": itemName
    },
    "reviewRating": {
      "@type": "Rating",
      "ratingValue": rating,
      "bestRating": 5
    },
    "name": `Review of ${itemName}`,
    "author": {
      "@type": "Person",
      "name": author
    },
    "reviewBody": reviewBody,
    "datePublished": datePublished,
    "publisher": {
      "@type": "Organization",
      "name": "SmartsPicks"
    }
  };
}

// Generate JSON-LD structured data for events (product launches, sales, etc.)
export function generateEventStructuredData(
  name: string,
  description: string,
  startDate: string,
  endDate: string,
  location: string,
  siteUrl: string = 'https://smartspicks.com'
) {
  return {
    "@context": "https://schema.org",
    "@type": "Event",
    "name": name,
    "description": description,
    "startDate": startDate,
    "endDate": endDate,
    "eventAttendanceMode": "https://schema.org/OnlineEventAttendanceMode",
    "eventStatus": "https://schema.org/EventScheduled",
    "location": {
      "@type": "VirtualLocation",
      "url": location
    },
    "image": `${siteUrl}/images/events/${name.toLowerCase().replace(/\s+/g, '-')}.jpg`,
    "organizer": {
      "@type": "Organization",
      "name": "SmartsPicks",
      "url": siteUrl
    },
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock",
      "url": location,
      "validFrom": startDate
    }
  };
}

// Generate JSON-LD structured data for product comparison/roundup articles
export function generateProductRoundupStructuredData(
  articleTitle: string,
  products: Product[],
  siteUrl: string = 'https://smartspicks.com'
) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": articleTitle,
    "description": `Expert comparison and review of ${products.length} products`,
    "numberOfItems": products.length,
    "itemListOrder": "https://schema.org/ItemListOrderDescending",
    "itemListElement": products.map((product, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "Product",
        "name": product.title,
        "description": product.description,
        "image": `${siteUrl}${product.image}`,
        "url": `${siteUrl}/products/${product.slug}`,
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": product.rating,
          "reviewCount": product.reviewCount,
          "bestRating": 5
        },
        "offers": {
          "@type": "Offer",
          "price": product.price,
          "priceCurrency": "USD",
          "availability": "https://schema.org/InStock",
          "url": product.amazonUrl
        }
      }
    }))
  };
}