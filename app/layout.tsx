import type { Metadata } from "next";
import { Instrument_Serif, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const instrumentSerif = Instrument_Serif({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-serif",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "FlowAbroad — Wispr Flow English & German Survival Simulator",
  description: "Speak naturally with Wispr Flow. Master C1 English fluency & German survival conversations.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${instrumentSerif.variable} ${jakarta.variable}`}>
      <body className="bg-[#F4F2EC] text-[#141413] font-sans antialiased selection:bg-[#D3ECE6] selection:text-[#165B53]">
        {children}
      </body>
    </html>
  );
}
