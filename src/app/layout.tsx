import type { Metadata } from "next";
import { Inter, Playfair_Display, Space_Grotesk, Outfit, Bebas_Neue } from "next/font/google"; // Adding premium fonts
import "./globals.css";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"], variable: '--font-inter' });
const playfair = Playfair_Display({ subsets: ["latin"], variable: '--font-playfair' });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: '--font-space' });
const outfit = Outfit({ subsets: ["latin"], variable: '--font-outfit' });
const bebas = Bebas_Neue({ weight: '400', subsets: ["latin"], variable: '--font-bebas' });

export const metadata: Metadata = {
  title: "Postit",
  description: "Generate viral social media images instantly",
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${inter.variable} ${playfair.variable} ${spaceGrotesk.variable} ${outfit.variable} ${bebas.variable} antialiased text-gray-900`}>
        {children}
        <Toaster position="top-center" richColors expand={false} />
      </body>
    </html>
  );
}
