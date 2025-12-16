export function generateSchemaMarkup() {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "ReChrome",
    "description": "Download old Chrome versions for Windows, macOS, and Linux. Access the complete Chrome version history and archive.",
    "url": "https://rechrome.vercel.app/",
    "applicationCategory": "UtilityApplication",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "author": {
      "@type": "Person",
      "name": "itzcodex24",
      "url": "https://x.com/itzcodex24"
    },
    "creator": {
      "@type": "Organization",
      "name": "ReChrome Contributors"
    },
    "sourceOrganization": {
      "@type": "Organization",
      "name": "ReChrome",
      "url": "https://rechrome.vercel.app/"
    },
    "operatingSystem": ["Windows", "macOS", "Linux"],
    "inLanguage": "en-US",
    "isAccessibleForFree": true
  };
}

export function generateFAQSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is ReChrome?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "ReChrome is an open-source project that provides easy access to old Chrome versions for download. Stop digging through the internet to find specific Chrome versions."
        }
      },
      {
        "@type": "Question",
        "name": "Can I download old Chrome versions?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes! ReChrome provides direct downloads to the official Chrome version archive. All download links are public and come from Google's official sources."
        }
      },
      {
        "@type": "Question",
        "name": "What operating systems are supported?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "ReChrome supports Windows, macOS, and Linux. You can download old Chrome versions for any of these operating systems."
        }
      },
      {
        "@type": "Question",
        "name": "Is ReChrome affiliated with Google?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No, ReChrome is not affiliated with Google. It is an open-source project that provides convenient access to Chrome versions from Google's official archive."
        }
      }
    ]
  };
}
