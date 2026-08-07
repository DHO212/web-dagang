import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const jakarta = Plus_Jakarta_Sans({
    variable: "--font-jakarta",
    subsets: ["latin"],
    display: "swap",
});

export const metadata: Metadata = {
    title: "Web Dagang — Belanja Online Premium",
    description:
        "Platform e-commerce modern untuk menjelajahi katalog produk, mengelola keranjang belanja, dan checkout dengan mudah.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="id">
            <body
                className={`${jakarta.variable} grain font-sans antialiased`}
            >
                <Navbar />
                <main className="min-h-[100dvh] pt-24">{children}</main>
                <Footer />
            </body>
        </html>
    );
}