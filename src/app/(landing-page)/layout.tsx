import type { Metadata } from "next";
import localFont from "next/font/local";
import "../globals.css";
import Sidebar from "@/components/layout/sidebar";
import Header from "@/components/layout/header";
import MyProviders from "@/components/MyProviders";
import NextTopLoader from 'nextjs-toploader';
import Footer from "@/components/homepage-layout/Footer";
import ScrollNav from "@/components/homepage-layout/ScrollNav";
import { NavBar } from "@/components/homepage-layout/Navbar";

export const metadata: Metadata = {
  title: "Mini-Bus Tracker",
  description: "First Mini-Bus Tracker in San Isidro Rod. Rizal",
};

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
        <>
          <NextTopLoader showSpinner={false} />
          <ScrollNav>
            <NavBar className="m-4 w-[90%] rounded-[15px] bg-black text-white flex items-center justify-between px-8 md:px-28 py-2 md:py-4 drop-shadow-md mx-auto"
                initial={{ y: 0, opacity: 1 }}
                before={{ y: 0, opacity: 1 }}
                after={{ y: 0, opacity: 1 }}
              />
          </ScrollNav>
          <div className="relative">
            <NavBar className="absolute top-0 w-full z-50 bg-transparent text-white flex items-center justify-between px-8 md:px-28 py-2 md:py-6 drop-shadow-md"
              initial={{ y: 0, opacity: 1 }}
              before={{ y: 0, opacity: 1 }}
              after={{ y: 0, opacity: 1 }}
            />
            {children}
          </div>
          <Footer />
        </>
  );
}
