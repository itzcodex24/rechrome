import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Analytics } from "@vercel/analytics/react"
import { generateSchemaMarkup, generateFAQSchema } from "./schema";

const montserrat = Montserrat({
  variable: '--font-montserrat',
  subsets: ['latin']
})

export const metadata: Metadata = {
  title: "ReChrome - Download Old Chrome Versions | Chrome Version Archive",
  description: "Download old Chrome versions for Windows, macOS, and Linux. Access the complete Chrome version history and archive with easy one-click downloads.",
  keywords: ['chrome versions', 'download old chrome', 'chrome version history', 'old chrome versions', 'chrome archive', 'legacy chrome', 'chrome downloads', 'rechrome'],
  metadataBase: new URL(process.env.NEXT_PUBLIC_URL || "https://rechrome.vercel.app/"),
  openGraph: {
    title: "ReChrome - Download Old Chrome Versions",
    description: "Find and download any Chrome version you need. Complete archive with one-click downloads for all operating systems.",
    url: "/",
    siteName: "ReChrome",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "ReChrome - Download Old Chrome Versions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ReChrome - Download Old Chrome Versions",
    description: "Find and download any Chrome version you need. Complete Chrome version archive.",
    creator: "@itzcodex24",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generateSchemaMarkup()),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generateFAQSchema()),
          }}
        />
      </head>
      <body
        className={`${montserrat.className} antialiased`}
      >
        <ThemeProvider attribute='class' defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
