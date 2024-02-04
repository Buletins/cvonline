import { Experience } from "@prisma/client";
import { Button } from "../ui/button";

interface WorkExperienceProps {
  data: Experience[];
}

export default function WorkExperience({ data }: WorkExperienceProps) {
  return (
    <div className="flex flex-col gap-2">
      {data.map((item) => (
        <div key={item.id} className="flex items-start justify-between">
          <div className="flex flex-col">
            <div className="text-xs tracking-tight text-muted-foreground">
              {item.fromYear} - {item.toYear}
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex flex-col">
                <div className="font-medium tracking-tight ">
                  {item.title} at {item.company}
                </div>
                <div className="text-sm tracking-tight text-muted-foreground">
                  in {item.location}
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button size="sm" variant="link" className="p-0">
              Edit
            </Button>
            <Button size="sm" variant="link" className="p-0 text-destructive">
              Delete
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
