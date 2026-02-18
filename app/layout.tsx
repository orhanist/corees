import type { Metadata } from "next";
import { Playfair_Display, Poppins, Source_Sans_3 } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-source-sans",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "CORE Educational Services | Chantilly, VA",
    template: "%s | CORE Educational Services",
  },
  description:
    "CORE Educational Services is a 501(c)(3) non-profit providing mentoring, academic support, and youth development programs in Northern Virginia since 2017.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${sourceSans.variable} ${poppins.variable}`}>
      <body>{children}</body>
    </html>
  );
}
