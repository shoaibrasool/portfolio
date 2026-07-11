import type { Metadata } from "next";
import "./globals.css";
import profile from "@/data/profile.json";

export const metadata: Metadata = {
  title: `${profile.basic.name} | ${profile.basic.title}`,
  description: profile.basic.bio,
  authors: [{ name: profile.basic.name }],
  openGraph: {
    title: `${profile.basic.name} | ${profile.basic.title}`,
    description: profile.basic.bio,
    type: "website",
  },
  other: {
    "linkedin:profile": `https://linkedin.com/in/${profile.social.linkedin}`,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: profile.basic.name,
              jobTitle: profile.basic.title,
              email: profile.basic.email,
              url: `https://github.com/${profile.social.github}`,
              sameAs: [
                `https://github.com/${profile.social.github}`,
                `https://linkedin.com/in/${profile.social.linkedin}`,
                ...(profile.social.twitter ? [`https://twitter.com/${profile.social.twitter}`] : []),
              ],
            }),
          }}
        />
      </head>
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
