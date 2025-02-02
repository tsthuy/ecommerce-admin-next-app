import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "../globals.css";
import { ToasterProvider } from "~/lib/toast-provider";
import LeftSideBar from "~/components/layout/left-side-bar";
import TopBar from "~/components/layout/top-bar";
import { ClerkProvider } from "@clerk/nextjs";
import Provider from "~/lib/provider";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Borcelle - Admin Dashboard",
  description: "Admin dashboard to manage Borcelle's data",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={poppins.className}>
          <Provider>
            <ToasterProvider />
            <div className="flex max-lg:flex-col text-grey-1">
              <LeftSideBar />
              <TopBar />
              <div className="flex-1">{children}</div>
            </div>
          </Provider>
        </body>
      </html>
    </ClerkProvider>
  );
}
