import { useState } from "react";

import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";
import { useAdding } from "@/hooks/use-adding";

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
  const useIsAdding = useAdding();

  const handleButton = () => {
    if (useIsAdding.status) {
      useIsAdding.close();
    } else {
      useIsAdding.open();
    }
  };

  return (
    <div className="flex h-full flex-col gap-8 pb-8">
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between gap-8 border-b pb-4">
          <div className="flex flex-col">
            <div className="tracking-tight">{title}</div>
          </div>
          {!hideButton && (
            <Button onClick={handleButton} size="sm" variant="secondary">
              {useIsAdding.status ? "Annuleer" : "Nieuw"}
            </Button>
          )}
        </div>
        <p className="text-sm/tight tracking-tight text-muted-foreground">
          {description}
        </p>
      </div>
      <ScrollArea>{useIsAdding.status ? adding : listing}</ScrollArea>
    </div>
  );
}
