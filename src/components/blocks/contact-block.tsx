import type { Contact } from "@prisma/client";

import { Button } from "../ui/button";

interface ContactBlockProps {
  data: Contact[];
}

export default function ContactBlock({ data }: ContactBlockProps) {
  return (
    <div className="flex flex-col gap-2">
      {data.map((item) => (
        <div key={item.id} className="flex">
          <div className="w-32 text-sm tracking-tight text-muted-foreground">
            {item.contactType}
          </div>
          <div className="flex flex-col gap-2">
            <a
              href={item.contactValue}
              target="_blank"
              className="font-medium tracking-tight hover:underline"
            >
              {item.contactValue}
            </a>
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
