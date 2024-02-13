"use client";

import { signIn } from "next-auth/react";
import { FileTextIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <>
      <div className="flex flex-col">
        <h1 className="text-4xl font-semibold tracking-tight">
          Val op in de eerste ronde: Maak een CV dat bij de top 2% hoort!
        </h1>
      </div>
      <p className="max-w-lg text-lg/snug tracking-tight text-muted-foreground">
        Laat je CV opvallen met onze snelle tool. In enkele minuten maak je een
        professioneel CV dat je met een persoonlijke link kunt delen. Probeer
        het nu gratis en vergroot je kansen op die droombaan!
      </p>
      <Button
        onClick={() => signIn("google", { redirect: false })}
        className="gap-2 rounded-full border px-3 py-1.5 pr-4 backdrop-blur-lg transition"
      >
        <FileTextIcon className="h-3.5 w-3.5" />
        Maak je cv
      </Button>
    </>
  );
}
