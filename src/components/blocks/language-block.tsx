import type { Language } from "@prisma/client";

import { Button } from "../ui/button";
import { Progress } from "../ui/progress";

interface LanguageBlockProps {
  data: Language[];
}

export default function LanguageBlock({ data }: LanguageBlockProps) {
  return (
    <div className="flex flex-col gap-4">
      {data.length === 0 && (
        <p className="tracking-tight">
          Voeg een aantal relevante vaardigeheden toe.
        </p>
      )}
      {data.map((item) => (
        <div key={item.id} className="flex flex-col">
          <div className="w-32 shrink-0 font-medium tracking-tight">
            {item.title}
          </div>
          <div className="flex w-full flex-col gap-2">
            <Progress value={item.value} />
            <div className="flex items-center gap-4">
              <Button size="sm" variant="link" className="p-0">
                Edit
              </Button>
              <Button size="sm" variant="link" className="p-0 text-destructive">
                Delete
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
