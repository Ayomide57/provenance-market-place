"use client";
import "jsvectormap/dist/jsvectormap.css";
import "flatpickr/dist/flatpickr.min.css";
import "@/css/satoshi.css";
import "@/css/style.css";
import React, { useEffect, useState } from "react";
import Loader from "@/components/common/Loader";

import { ThirdwebProvider } from "thirdweb/react";

import { Toaster } from "react-hot-toast";



const metadata = {
  name: "Next Starter Template",
  description: "A Next.js starter template with Web3Modal v3 + Wagmi",
  url: "https://web3modal.com",
  icons: ["https://avatars.githubusercontent.com/u/37784886"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);

  // const pathname = usePathname();

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return (
    <ThirdwebProvider>
      <html lang="en">
        <body suppressHydrationWarning={true} className="max-h-fit">
          <div className="dark:bg-boxdark-2 dark:text-bodydark">
            <Toaster position="bottom-center" />
            {/**loading ? <Loader /> : children*/}
            {children}
          </div>
        </body>
      </html>
    </ThirdwebProvider>
  );
}
