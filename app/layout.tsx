import type { Metadata } from "next";
import "./globals.css";
import SmoothScroll from "@/components/ui/SmoothScroll";

export const metadata: Metadata = {
  title: "ZimLedger — Built in Zimbabwe, For Zimbabwe",
  description: "The financial platform for Zimbabwean SMEs. Track income in USD & ZiG, manage inventory, send invoices, and grow your business.",
  keywords: ["Zimbabwe", "business", "accounting", "SME", "EcoCash", "ZiG", "USD", "invoices", "inventory", "tuckshop", "spaza"],
  authors: [{ name: "ZimLedger" }],
  openGraph: {
    title: "ZimLedger — Built in Zimbabwe, For Zimbabwe",
    description: "The financial platform for Zimbabwean SMEs.",
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
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
