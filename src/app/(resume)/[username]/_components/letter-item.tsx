import { Button } from "@/components/ui/button";

export default function LetterItem() {
  return (
    <div className="rounded-lg border border-white/15 bg-white/15 p-4">
      <div className="flex flex-col gap-2">
        <div className="flex w-full items-center gap-2">
          <div className="flex w-full flex-col">
            <div className="flex items-start justify-between">
              <div className="font-medium leading-none tracking-tight">
                Financieel Administratief Medewerker
              </div>
              <Button
                size="sm"
                variant="secondary"
                className="px-1.5 py-0.5 opacity-50 hover:opacity-100"
              >
                Meer
              </Button>
            </div>
            <div className="font-medium leading-none tracking-tight">
              Electrabel
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="text-xs tracking-tight text-muted-foreground">
            item.fromYear - item.toYear
          </div>
          <div className="text-xs tracking-tight text-muted-foreground">
            in item.location
          </div>
        </div>
      </div>
    </div>
  );
}
