import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.scss";
import Header from "./components/header";
import Footer from "./components/footer";
import { Providers } from "./providers";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Cafeteria Gostinho de Café",
  description: "O café mais saboroso do Brasil - E-commerce de cafés e tortas artesanais",
  keywords: "café, tortas, cafeteria, e-commerce, artesanal",
  authors: [{ name: "Cafeteria Gostinho de Café" }],
  openGraph: {
    title: "Cafeteria Gostinho de Café",
    description: "O café mais saboroso do Brasil",
    type: "website",
    locale: "pt_BR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Providers>
          <Header />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}

