import { Progress } from "@/components/ui/progress";

interface LanguageItemProps {
  title: string;
  value: number;
}

export default function LanguageItem({ title, value }: LanguageItemProps) {
  return (
    <div className="group flex items-center gap-8">
      <div className="w-24 shrink-0 text-xs/none text-muted-foreground">
        {title}
      </div>
      <Progress value={value} />
    </div>
  );
}
