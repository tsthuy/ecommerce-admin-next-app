import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { ToasterProvider } from "~/lib/toast-provider";

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
    <html lang="en">
      <body className={poppins.className}>
        {" "}
        {/* Apply Poppins font */}
        <ToasterProvider />
        <div className="flex max-lg:flex-col text-grey-1">
          {/* <LeftSideBar /> */}
          {/* <TopBar /> */}
          <div className="flex-1">{children}</div>
        </div>
      </body>
    </html>
  );
}
