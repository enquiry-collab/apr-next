import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "APR NEXT — Dubai, beautifully lived",
  description: "A considered collection of Dubai homes, curated for the way you want to live.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
