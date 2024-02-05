import type { Education } from "@prisma/client";

interface EducationItemProps {
  data: Education;
}

export default function EducationItem({ data }: EducationItemProps) {
  const { school, description, fromYear, location, title, toYear } = data;

  return (
    <div className="flex items-start gap-4">
      <div className="shrink-0 text-xs/none text-muted-foreground">
        {fromYear} - {toYear}
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col">
          <div className="text-sm/none font-medium tracking-tight">
            {title} at {school}
          </div>
          <div className="text-xs font-medium tracking-tight text-muted-foreground">
            {location}
          </div>
        </div>
        <p className="w-full break-words text-sm leading-tight tracking-tight">
          {description}
        </p>
      </div>
    </div>
  );
}
