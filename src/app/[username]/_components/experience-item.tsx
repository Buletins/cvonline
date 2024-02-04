import { Experience } from "@prisma/client";

interface ExperienceItemProps {
  data: Experience;
}

export default function ExperienceItem({ data }: ExperienceItemProps) {
  const { company, description, fromYear, location, title, toYear } = data;

  return (
    <div className="flex items-start gap-4">
      <div className="shrink-0 text-xs text-muted-foreground">
        {fromYear} - {toYear}
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col">
          <div className="text-sm font-medium tracking-tight">
            {data.title} at {data.company}
          </div>
          <div className="text-xs font-medium tracking-tight text-muted-foreground">
            {data.location}
          </div>
        </div>
        <p className="w-full break-words text-sm leading-tight tracking-tight">
          {description}
        </p>
      </div>
    </div>
  );
}
