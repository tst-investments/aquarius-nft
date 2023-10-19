"use client";

import Header from "@/components/header";
import "./globals.css";
import "@near-wallet-selector/modal-ui/styles.css";
import { Inter } from "next/font/google";
import Footer from "@/components/footer";
import Providers from "@/providers/providers";
import Navigation from "@/components/navigation";
import Modal from "@/components/modal";
import clsx from "clsx";
import { Metadata } from "next";
import localFont from "next/font/local";
import "../../public/font/fonts.css";
const inter = Inter({ subsets: ["latin"] });

const borna = localFont({
  src: [
    {
      path: "../../public/font/borna-regular-webfont.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/font/borna-medium-webfont.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/font/borna-semibold-webfont.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/font/borna-bold-webfont.woff2",
      weight: "700",
      style: "normal",
    },
  ],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="lg:min-h-[101vh] min-w-full scrollbar-none"
      translate="no">
      <body
        className={clsx(borna.className, "bg-cream flex min-h-screen flex-col items-center justify-between overflow-x-hidden")}
      >
        <div className="flex flex-col min-h-screen relative bg-mainBg w-screen">
          <Providers>
            {/* <Navigation>
              <Header />
              <Footer />
            </Navigation> */}
            <Header />

            {children}

            <Modal></Modal>
          </Providers>
        </div>
      </body>
    </html>
  );
}
