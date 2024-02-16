
import type { Metadata } from "next";
import { Poppins, Josefin_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./utils/theme-provider";


const poppins = Poppins({ 
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],  
});
const josefin = Josefin_Sans({ 
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],  
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.className} !bg-white bg-no-repeat dark:bg-gradient-to-b dark:from-gray-900 dark:to-black duration-300`}>
      <ThemeProvider attribute="class" enableSystem defaultTheme="system">
        
        {children}

      </ThemeProvider>
      </body>
    </html>
  );
}
