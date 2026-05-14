import React, { Suspense } from "react";
import type { Metadata } from "next";
import { Inter, Bebas_Neue } from "next/font/google";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./globals.css";
import BootstrapClient from "@/components/BootstrapClient";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import QuickView from "@/components/QuickView";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const bebasNeue = Bebas_Neue({
  weight: "400",
  variable: "--font-bebas",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Gamer Vault | Tu tienda de videojuegos",
  description: "La mejor selección de videojuegos para PS5, Xbox, Nintendo y PC.",
};

import { CartProvider } from "@/lib/CartContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${inter.variable} ${bebasNeue.variable} d-flex flex-column min-vh-100`}>
        <CartProvider>
          <Suspense fallback={<div className="h-[100px]" />}>
            <Navbar />
          </Suspense>
          <main className="flex-grow-1">
            {children}
          </main>
          <Footer />
          <QuickView />
        </CartProvider>
        <BootstrapClient />
      </body>
    </html>
  );
}
