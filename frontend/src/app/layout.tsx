import type { Metadata } from "next";
import "../styles/globals.css";
import Providers from "./providers";
import Header from "../components/common/Header";

export const metadata: Metadata = {
  title: "OnlineCompiler — Code online, instantly",
  description: "Write, run, and share code in Python, Node.js, C++, Java, PHP and more — right from your browser. No setup required.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="font-sans">
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  );
}
