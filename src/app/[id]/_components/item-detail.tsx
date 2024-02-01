interface ItemDetailProps {
  sub: string;
  title: string;
  timeline: string;
  description: string;
}

export default function ItemDetail({
  sub,
  title,
  timeline,
  description,
}: ItemDetailProps) {
  return (
    <div className="sticky top-8 flex flex-col rounded-lg border bg-accent/50 p-4 backdrop-blur-lg">
      <div className="flex flex-col gap-2">
        <div className="flex flex-col">
          <div className="text-sm tracking-tight text-muted-foreground">
            {sub}
          </div>
          <div className="font-semibold tracking-tight">{title}</div>
          <div className="text-xs tracking-tight text-muted-foreground">
            {timeline}
          </div>
        </div>
        <div className="w-4/5 leading-tight tracking-tight text-muted-foreground">
          {description}
        </div>
      </div>
    </div>
  );
}
