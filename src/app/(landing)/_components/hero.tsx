import { Button } from "@/components/ui/button";
import { api } from "@/trpc/server";
import { FileTextIcon } from "lucide-react";

export default async function Hero() {
  return (
    <>
      <div className="flex flex-col">
        <h1 className="text-4xl font-semibold tracking-tight">
          Slechts 2% van de cvs komt door de eerste ronde. Zorg ervoor dat jij
          in die top 2% zit.
        </h1>
      </div>
      <p className="max-w-lg text-lg/snug tracking-tight text-muted-foreground">
        Binnen 5 minuten een perfect cv waarmee je positief opvalt. Voer je
        gegevens in, gebruik je cv online met een persoonlijke link en
        solliciteer op jouw droombaan. Probeer nu gratis!
      </p>
      <Button className="gap-2 rounded-full border px-3 py-1.5 pr-4 backdrop-blur-lg transition">
        <FileTextIcon className="h-3.5 w-3.5" />
        Maak je cv
      </Button>
    </>
  );
}
