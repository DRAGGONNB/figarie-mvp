import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FIGARIE - Your Ultimate Luxury Experience",
  description: "Curating extraordinary experiences for discerning travelers worldwide. Private air charters, yacht rentals, luxury villas, and bespoke travel services.",
  keywords: ["luxury travel", "private jets", "yacht charters", "luxury villas", "concierge services", "FIGARIE"],
  authors: [{ name: "FIGARIE" }],
  openGraph: {
    title: "FIGARIE - Your Ultimate Luxury Experience",
    description: "Curating extraordinary experiences for discerning travelers worldwide.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
