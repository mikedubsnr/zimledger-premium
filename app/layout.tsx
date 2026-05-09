import type { Metadata } from "next";
import "./globals.css";
import SmoothScroll from "@/components/ui/SmoothScroll";

export const metadata: Metadata = {
  title: "ZimLedger — Built in Zimbabwe, For Zimbabwe",
  description: "The definitive financial platform for Zimbabwean businesses. Track income, manage inventory, generate invoices, and grow with confidence.",
  keywords: ["Zimbabwe", "business", "accounting", "SME", "EcoCash", "ZiG", "USD", "invoices", "inventory"],
  authors: [{ name: "ZimLedger" }],
  openGraph: {
    title: "ZimLedger — Built in Zimbabwe, For Zimbabwe",
    description: "The definitive financial platform for Zimbabwean businesses.",
    type: "website",
    locale: "en_ZW",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-parchment">
        <div className="grain-overlay" />
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
