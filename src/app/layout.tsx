import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Reducer from "./reducer";
import { ThemeProvider } from "./components/MainFunc/ThemeProvider";

export const metadata: Metadata = {
  title: "Fonteiro",
  description: "Gerenciador de fontes Personalizadas",
};

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${inter.className} antialiased`}
        cz-shortcut-listen="true"
      >
        <ThemeProvider>
          <Reducer>{children}</Reducer>
        </ThemeProvider>
      </body>
    </html>
  );
}
