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
    <div className="sticky top-8 flex flex-col rounded-lg border bg-[rgb(23,23,23)] p-3.5">
      <div className="flex flex-col gap-2">
        <div className="text-sm tracking-tight text-muted-foreground">
          Lead Product Designer
        </div>
        <div className="font-semibold tracking-tight">Amsterdam Tech Hub</div>
        <div className="text-xs tracking-tight text-muted-foreground">
          2014-2016
        </div>
        <p className="w-4/5 leading-tight tracking-tight text-muted-foreground">
          Directed a team in designing digital products, from concept to launch,
          focusing on user-centric solutions.
        </p>
      </div>
    </div>
  );
}
