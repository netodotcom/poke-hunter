import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from 'react-hot-toast'

export const metadata: Metadata = {
  title: "Pokemon Hunter"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="font-roboto antialiased">
        <Toaster position="bottom-right" />
        {children}
      </body>
    </html>
  );
}
