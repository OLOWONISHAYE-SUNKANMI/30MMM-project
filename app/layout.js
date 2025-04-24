import "@/app/globals.css";
import DashboardProvider from "@/contexts/dashboard/dashboard-provider";
import { ClerkProvider } from "@clerk/nextjs";
import { Alexandria } from "next/font/google";
import Footer from "@/components/common/Footer/Footer";
import NavBar from "@/components/common/NavBar";

const alexandria = Alexandria({ subsets: ["latin"], display: "swap" });

export const metadata = {
  title: "CLEAN: A Thirty Mighty Men Ministries Program",
  description: "CLEAN: A Thirty Mighty Men Ministries Program",
  keywords:
    "30 Men Ministries, the-carpenters-son, thecleanprogram, Donovan Anderson",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
    <head>
      <script async="async" src="https://www.pledge.to/assets/widget.js"></script>
    </head>
      <ClerkProvider
        appearance={{
          variables: { colorPrimary: "#000000" },
          elements: {
            formButtonPrimary:
              "bg-black border border-black border-solid hover:bg-white hover:text-black",
            socialButtonsBlockButton:
              "bg-white border-gray-200 hover:bg-transparent hover:border-black text-gray-600 hover:text-black",
            socialButtonsBlockButtonText: "font-semibold",
            formButtonReset:
              "bg-white border border-solid border-gray-200 hover:bg-transparent hover:border-black text-gray-500 hover:text-black",
            membersPageInviteButton:
              "bg-black border border-black border-solid hover:bg-white hover:text-black",
            card: "bg-[#fafafa]",
          },
        }}
      >
        <DashboardProvider>
          <body className={`${alexandria.className} subpixel-antialiased`}>
            <NavBar />
            <div className="mt-20">{children}</div>
            <Footer />
          </body>
        </DashboardProvider>
      </ClerkProvider>
    </html>
  );
}
