import type { Metadata } from "next";
import { icono } from "./ui/fonts";
import Header from "./lib/header";
import "@/app/globals.css";



export const metadata: Metadata = {
  title: "Jeremy Wiles-Young",
  description: "online portfolio of artworks by Jeremy Wiles-Young",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${icono.className} antialiased`}>
          <Header />
          {children}
      </body>
    </html>
  );
}
