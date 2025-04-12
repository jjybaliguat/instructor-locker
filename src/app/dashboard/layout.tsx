
import Sidebar from "@/components/layout/sidebar";
import Header from "@/components/layout/header";
import MyProviders from "@/components/MyProviders";
import NextTopLoader from 'nextjs-toploader';

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex">
      <Sidebar />
      <main className="w-full flex-1 overflow-hidden">
        <Header />
        {children}
      </main>
    </div>
  );
}
