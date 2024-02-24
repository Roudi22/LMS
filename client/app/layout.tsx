"use client"
import { FC, useEffect, useState } from "react";
import { Poppins, Josefin_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./utils/theme-provider";
import { Toaster } from "react-hot-toast";
import { Providers } from "./Provider";
import { SessionProvider } from "next-auth/react";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import Loader from "./components/Loader/loading";
import { Suspense } from "react";
const poppins = Poppins({ 
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],  
});
const josefin = Josefin_Sans({ 
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],  
});
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.className} !bg-white bg-no-repeat dark:bg-gradient-to-b dark:from-gray-900 dark:to-black duration-300`}>
      <Providers>
        <SessionProvider>
      <ThemeProvider attribute="class" enableSystem defaultTheme="system">
        
        <Custom>{children}</Custom>
        
        <Toaster position="top-center" reverseOrder={false}/>
      </ThemeProvider>
      </SessionProvider>
      </Providers>
      </body>
    </html>
  );
}

// const Custom: FC<{ children: React.ReactNode }> = ({ children }) => {
//   const { isLoading } = useLoadUserQuery({});

//   return <div>{isLoading ? <Loader /> : <div>{children} </div>}</div>;
// };
const Custom: FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const { data, error } = useLoadUserQuery({});

  useEffect(() => {
    if (data || error) {
      setIsLoading(false);
    }
  }, [data, error]);

  return <div>{isLoading ? <Loader /> : <div>{children} </div>}</div>; }