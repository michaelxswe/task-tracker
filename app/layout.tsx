import "@radix-ui/themes/styles.css";
import "./theme-config.css";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Navbar } from "./Navbar";
import { Theme } from "@radix-ui/themes";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <Theme appearance="dark" accentColor="blue">
          <Navbar />
          <main className="px-8">{children}</main>
          <footer className="mt-6"></footer>
        </Theme>
      </body>
    </html>
  );
};

export { metadata };
export default HomeLayout;
