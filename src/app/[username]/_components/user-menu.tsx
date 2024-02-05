import { CircleUserIcon, LogOutIcon, MoreHorizontalIcon } from "lucide-react";
import { signOut } from "next-auth/react";
import { toast } from "sonner";

import { useEditProfile } from "@/hooks/use-editprofile";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function UserMenu() {
  const editProfile = useEditProfile();
  // const printCv = usePrintCv();

  return (
    <div className="absolute right-0 top-0 flex items-center gap-2">
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button size="sm" variant="outline" className="px-1">
            <MoreHorizontalIcon className="h-3 w-3" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            onClick={() => editProfile.open()}
            className="gap-2"
          >
            <CircleUserIcon className="h-4 w-4" />
            Profiel
          </DropdownMenuItem>
          {/* <DropdownMenuItem onClick={() => printCv.open()} className="gap-2">
            <PrinterIcon className="h-4 w-4" />
            Print CV
          </DropdownMenuItem> */}
          <DropdownMenuItem
            onClick={async () => {
              toast.success("You have been logged out.");
              await signOut({ callbackUrl: "/" });
            }}
            className="gap-2"
          >
            <LogOutIcon className="h-4 w-4" />
            Log uit
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
