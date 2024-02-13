import "@/styles/globals.css";

import { GeistSans } from "geist/font/sans";

import { TRPCReactProvider } from "@/trpc/react";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner";

export const metadata = {
  title: "Resumon - Onine CV binnen 5 minuten.",
  description: "Generated by create-t3-app",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body
        className={cn(
          "relative flex min-h-dvh flex-col bg-black [background-image:radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(0,24,51,.6),rgba(25,8,43,.3));]",
          GeistSans.className,
        )}
      >
        <TRPCReactProvider>
          <>{children}</>
          <Toaster position="top-center" />
        </TRPCReactProvider>
      </body>
    </html>
  );
}
