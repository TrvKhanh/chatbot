import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ThemeProvider from "./ThemeProvider";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "BigKai",
  description: "A modern AI chat interface",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="mdl-js">
      <body className={`${inter.variable} font-sans antialiased bg-gray-100 dark:bg-[#363636] dark:text-gray-100`}>
        <ThemeProvider>
          <div className="min-h-screen h-screen bg-gray-100 dark:bg-[#363636] flex">
            <Sidebar />
            <div className="flex-1 flex flex-col h-full">
              <Topbar />
              <main className="flex-1 overflow-auto flex flex-col items-center justify-start">
                {children}
              </main>
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
