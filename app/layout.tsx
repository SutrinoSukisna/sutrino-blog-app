import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const PlusJakartaSans = Plus_Jakarta_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sutrino-Blog-App",
  description: "Generated by Sutrino",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
    <html lang="en">
      <body className={PlusJakartaSans.className}>
        <header className="p-6 border-b flex justify-between bg-blue-400">
          <Link className="text-lg font-bold" href={'/'}>Sutrino-Blog-app</Link>
          <Link className="text-lg font-bold" href={'/contact'}>Contact Us</Link>
        </header>
        <main style={{ minHeight:"92vh" }}>
          {children}
        </main>
      </body>
    </html>
    </>
  );
}
