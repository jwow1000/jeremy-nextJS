import { Metadata } from "next";
import { Inconsolata } from "next/font/google";
import Nav from "@/components/nav";
import "./globals.css";



const inconsolata = Inconsolata({
  subsets: ["latin"],       
  variable: "--font-incon", // CSS variable
  weight: ["200", "400", "700" ], 
});

export const metadata: Metadata = {
  title: "Jeremy Wiles-Young, Official Portfolio Website",
  description: "Jeremy Wiles-Young, Artworks in Sound, Digital media, Fabric works, and Print",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inconsolata.variable} antialiased`}
      >
        <Nav />
        {children}
      </body>
    </html>
  );
}
