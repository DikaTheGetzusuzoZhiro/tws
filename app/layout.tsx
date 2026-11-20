import type { Metadata } from "next";
import "./globals.css";
import { Header, Footer } from "@/components/Shell";

export const metadata: Metadata = {
  title: "Tama Store — Layanan Digital Roblox",
  description: "Layanan digital, top up Robux, dan konsultasi pemulihan akun melalui jalur resmi."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="id"><body><Header />{children}<Footer /></body></html>;
}
