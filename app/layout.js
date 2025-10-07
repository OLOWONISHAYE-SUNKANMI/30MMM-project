import "@/app/globals.css";
import { AuthProvider } from "@/contexts/AuthContext";
import { SessionProvider } from "next-auth/react";
import { Alexandria } from "next/font/google";
import Script from "next/script";
import Footer from "@/components/common/Footer/Footer";
import NavBar from "@/components/common/NavBar";
import { Toaster } from "@/components/ui/sonner";

const alexandria = Alexandria({ subsets: ["latin"], display: "swap" });

export const metadata = {
  title: "CLEAN: A Thirty Mighty Men Ministries Program",
  description: "CLEAN: A Thirty Mighty Men Ministries Program",
  keywords:
    "30 Men Ministries, the-carpenters-son, thecleanprogram, Donovan Anderson",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
    >
      <head>
        {/* Google Analytics */}
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-KQBNXMFH0L"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
        >
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-KQBNXMFH0L');
          `}
        </Script>
      </head>
      <body className={`${alexandria.className} antialiased`}>
        <AuthProvider>
          <SessionProvider>
            <NavBar />
            <main className="mt-20">{children}</main>
            <Toaster />
            <Footer />
          </SessionProvider>
        </AuthProvider>
      </body>
      <Script
        strategy="afterInteractive"
        id="plg-widget"
        src="https://www.pledge.to/assets/widget.js"
      />
      {/* <Script
        strategy="afterInteractive"
        id="plg-widget"
        src="https://staging.pledge.to/assets/widget.js"
      /> */}
    </html>
  );
}
