import { Button } from "@/components/ui/button";
import ItemBlock from "./item-block";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface ProfileIntroProps {
  name: string | undefined;
  description: string | null;
}

export default function ProfileIntro({ name, description }: ProfileIntroProps) {
  return (
    <ItemBlock
      title={`Over ${name?.match(/^\S+/)?.[0]}`}
      button={
        <Dialog modal={false}>
          <DialogTrigger asChild>
            <Button
              size="sm"
              variant="secondary"
              className="px-1.5 py-0.5 opacity-50 hover:opacity-100"
            >
              Meer
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-white/15 backdrop-blur-lg">
            <DialogHeader>
              <DialogTitle>
                s.
                <div className="text-xs/none text-muted-foreground">qsdsq</div>
              </DialogTitle>
              <DialogDescription>qsdsqd</DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      }
    >
      <p className="text-sm leading-tight tracking-tight text-muted-foreground">
        {description}
      </p>
    </ItemBlock>
  );
}
