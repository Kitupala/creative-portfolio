import type { Metadata } from "next";
import { Titillium_Web } from "next/font/google";
import "./globals.css";
import Header from "@/app/components/Header";

const titillium = Titillium_Web({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "600", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Web Design Portfolio",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-slate-900 text-slate-100 antialiased">
      <body className={`${titillium.className}`}>
        <Header />
        {children}
        <div className="h-[100vh]" />
      </body>
    </html>
  );
}
