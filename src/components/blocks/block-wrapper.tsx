import { useState } from "react";

import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";

interface BlockWrapperProps {
  title: string;
  description?: string;
  adding?: React.ReactNode;
  listing: React.ReactNode;
  hideButton?: boolean;
}

export default function BlockWrapper({
  title,
  description,
  adding,
  listing,
  hideButton,
}: BlockWrapperProps) {
  const [isAdding, setIsAdding] = useState<boolean>(false);

  return (
    <div className="flex h-full flex-col gap-8 pb-8">
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between gap-8 border-b pb-4">
          <div className="flex flex-col">
            <div className="tracking-tight">{title}</div>
          </div>
          {!hideButton && (
            <Button
              onClick={() => setIsAdding(!isAdding)}
              size="sm"
              variant="secondary"
            >
              {isAdding ? "Annuleer" : "Nieuw"}
            </Button>
          )}
        </div>
        <p className="text-sm/tight tracking-tight text-muted-foreground">
          {description}
        </p>
      </div>
      <ScrollArea>{isAdding ? adding : listing}</ScrollArea>
    </div>
  );
}
