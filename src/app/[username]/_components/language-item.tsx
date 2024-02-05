import { Progress } from "@/components/ui/progress";

export default function LanguageItem() {
  return (
    <div className="group flex items-center gap-8">
      <div className="w-24 shrink-0 text-xs/none text-muted-foreground">
        Engels
      </div>
      <Progress value={75} />
    </div>
  );
}
