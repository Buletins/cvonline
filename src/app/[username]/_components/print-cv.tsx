"use client";

import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import type { User } from "@prisma/client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { usePrintCv } from "@/hooks/use-printcv";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

interface PrintCvProps {
  user: User;
}

export default function PrintCv({ user }: PrintCvProps) {
  const printRef = useRef<HTMLDivElement | null>(null);
  const printCv = usePrintCv();

  const handlePrint = useReactToPrint({
    content: () => {
      if (printRef.current) {
        return printRef.current;
      } else {
        return null;
      }
    },
  });

  return (
    <Dialog open={printCv.status} onOpenChange={() => printCv.close()}>
      <DialogContent>
        <DialogHeader className="print:hidden">
          <Button onClick={handlePrint}>Print</Button>
        </DialogHeader>
        <ScrollArea>
          <div ref={printRef} className="flex flex-col gap-8 print:py-20">
            <header className="relative mx-auto flex w-full max-w-lg flex-col gap-4">
              <div className="flex items-center gap-4">
                <div className="relative flex h-24 w-24 shrink-0 items-center justify-center rounded-full border">
                  <img
                    src="https://res.cloudinary.com/read-cv/image/upload/c_fill,h_92,w_92/dpr_1.0/v1/1/profilePhotos/Cwit4zi9q1ajFhwHZndNri4v0rm1/bafdf7ed-cab3-4033-bcf7-160cd837bc72.jpg?_a=ATO2BAA0"
                    alt=""
                    className="h-full w-full rounded-full"
                  />
                </div>
                <div className="flex w-full flex-col gap-1">
                  <div className="flex flex-col">
                    <h1 className="text-xl/none font-semibold tracking-tight">
                      Buletin Sehu
                    </h1>
                    <p className="text-sm tracking-tight text-muted-foreground">
                      React Developer, in Antwerpen
                    </p>
                  </div>
                </div>
              </div>
            </header>
            <main className="mx-auto flex w-full max-w-lg flex-col gap-8">
              <div className="flex flex-col items-start gap-2">
                <h2 className="text-sm font-medium tracking-tight">Over :</h2>
                <div className="flex w-full flex-col gap-4">
                  <p className="text-sm leading-tight tracking-tight text-muted-foreground">
                    Ik weet niet wat hier te schrijven?
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-start gap-2">
                <h2 className="text-sm font-medium tracking-tight">
                  Werkervaring
                </h2>
                <div className="flex w-full flex-col gap-4">
                  <div className="group flex items-start gap-8">
                    <div className="w-24 shrink-0 text-xs/none text-muted-foreground">
                      2022{/* */} - {/* */}2021
                    </div>
                    <div className="flex flex-col gap-2">
                      <div className="flex flex-col">
                        <div className="text-base/none font-medium tracking-tight">
                          qsdf{/* */} at {/* */}fdf
                        </div>
                        <div className="text-xs font-medium tracking-tight text-muted-foreground">
                          sdfsd
                        </div>
                      </div>
                      <p className="w-full break-words text-sm leading-tight tracking-tight">
                        sdfds
                      </p>
                    </div>
                  </div>
                  <div className="group flex items-start gap-8">
                    <div className="w-24 shrink-0 text-xs/none text-muted-foreground">
                      2021{/* */} - {/* */}2021
                    </div>
                    <div className="flex flex-col gap-2">
                      <div className="flex flex-col">
                        <div className="text-base/none font-medium tracking-tight">
                          fdsf{/* */} at {/* */}sqdfsdf
                        </div>
                        <div className="text-xs font-medium tracking-tight text-muted-foreground">
                          sdfqdsfsqd
                        </div>
                      </div>
                      <p className="w-full break-words text-sm leading-tight tracking-tight">
                        sdfdsfqdsfdsfsdqf
                      </p>
                    </div>
                  </div>
                  <div className="group flex items-start gap-8">
                    <div className="w-24 shrink-0 text-xs/none text-muted-foreground">
                      2023{/* */} - {/* */}2023
                    </div>
                    <div className="flex flex-col gap-2">
                      <div className="flex flex-col">
                        <div className="text-base/none font-medium tracking-tight">
                          tes{/* */} at {/* */}teset
                        </div>
                        <div className="text-xs font-medium tracking-tight text-muted-foreground">
                          dfdsf
                        </div>
                      </div>
                      <p className="w-full break-words text-sm leading-tight tracking-tight">
                        fsdfds
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-start gap-2">
                <h2 className="text-sm font-medium tracking-tight">
                  Opleidingen
                </h2>
                <div className="flex w-full flex-col gap-4">
                  <div className="group flex items-start gap-8">
                    <div className="w-24 shrink-0 text-xs/none text-muted-foreground">
                      2019{/* */} - {/* */}2024
                    </div>
                    <div className="flex flex-col gap-4">
                      <div className="flex flex-col">
                        <div className="text-sm/none font-medium tracking-tight">
                          Handel A1{/* */} at {/* */}KTA Campus hof van Riemen
                        </div>
                        <div className="text-xs font-medium tracking-tight text-muted-foreground">
                          Heist-op-den-Berg
                        </div>
                      </div>
                      <p className="w-full break-words text-sm leading-tight tracking-tight">
                        TEst
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-start gap-2">
                <h2 className="text-sm font-medium tracking-tight">Contact</h2>
                <div className="flex w-full flex-col gap-1">
                  <div className="flex items-center gap-4">
                    <div className="w-16 text-sm font-medium tracking-tight">
                      Email
                    </div>
                    <a
                      href="mailto:buletinsehu0@gmail.com"
                      className="inline-flex h-auto items-center justify-center whitespace-nowrap rounded-md p-0 text-sm font-medium text-muted-foreground underline-offset-4 transition-colors hover:underline disabled:pointer-events-none disabled:opacity-50"
                    >
                      buletinsehu0@gmail.com
                    </a>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-16 text-sm font-medium tracking-tight">
                      linkedin
                    </div>
                    <a
                      href="mailto:BuletinSehu"
                      className="inline-flex h-auto items-center justify-center whitespace-nowrap rounded-md p-0 text-sm font-medium text-muted-foreground underline-offset-4 transition-colors hover:underline disabled:pointer-events-none disabled:opacity-50"
                    >
                      BuletinSehu
                    </a>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
