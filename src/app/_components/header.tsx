"use client";

import {
  AtSignIcon,
  BriefcaseIcon,
  CopyIcon,
  ExternalLinkIcon,
  GlobeIcon,
  MapPinIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

export default function Header() {
  const [isEditing, setIsEditing] = useState<boolean>(false);

  return (
    <header className="relative flex min-h-60 w-full items-end border-b">
      <div className="relative mx-auto flex w-full max-w-4xl items-center">
        <Dialog>
          <DialogTrigger asChild>
            <Button
              onClick={() => setIsEditing(true)}
              size="sm"
              variant="outline"
              className="absolute right-0 top-0"
            >
              Edit
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Who are you?</DialogTitle>
              <DialogDescription>Give us some inforamtion</DialogDescription>
            </DialogHeader>
            <div className="flex items-center gap-8">
              <div className="w-48 shrink-0">
                <div className="h-36 w-36 overflow-hidden rounded-full bg-accent">
                  <img
                    src="https://avataaars.io/?avatarStyle=Transparent&topType=Hat&accessoriesType=Prescription02&facialHairType=BeardLight&facialHairColor=BrownDark&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light"
                    className="h-full w-full"
                  />
                </div>
              </div>
              <div className="flex w-full flex-col pb-4">
                <h1 className="text-2xl font-semibold tracking-tight">
                  Jasper Sterling
                </h1>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-2 rounded-md border px-2">
                      <BriefcaseIcon className="h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Front-End Developer"
                        className="h-auto border-none px-0 focus-visible:ring-0"
                      />
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-2 rounded-md border px-2">
                      <MapPinIcon className="h-4 w-4 text-muted-foreground" />{" "}
                      <Input
                        placeholder="Amsterdam"
                        className="h-auto border-none px-0 focus-visible:ring-0"
                      />
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-2 rounded-md border px-2">
                      <AtSignIcon className="h-4 w-4 text-muted-foreground" />{" "}
                      <Input
                        placeholder="Emailadres"
                        className="h-auto border-none px-0 focus-visible:ring-0"
                      />
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-2 rounded-md border px-2">
                      <GlobeIcon className="h-4 w-4 text-muted-foreground" />{" "}
                      <Input
                        placeholder="Website"
                        className="h-auto border-none px-0 focus-visible:ring-0"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </DialogContent>
          11111111
        </Dialog>

        <div className="absolute w-48 shrink-0">
          <div className="h-36 w-36 overflow-hidden rounded-full bg-accent">
            <img
              src="https://avataaars.io/?avatarStyle=Transparent&topType=Hat&accessoriesType=Prescription02&facialHairType=BeardLight&facialHairColor=BrownDark&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light"
              className="h-full w-full"
            />
          </div>
        </div>
        <div className="flex w-full flex-col pb-4 pl-48">
          <h1 className="text-2xl font-semibold tracking-tight">
            Jasper Sterling
          </h1>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <BriefcaseIcon className="h-4 w-4 text-muted-foreground" />
              <div className="text-sm tracking-tight text-muted-foreground">
                Front-End Developer
              </div>
            </div>
            <div className="flex items-center gap-2">
              <MapPinIcon className="h-4 w-4 text-muted-foreground" />
              <div className="text-sm tracking-tight text-muted-foreground">
                Front-End Developer
              </div>
            </div>
            <Button
              variant="link"
              className="h-auto gap-2 p-0 text-muted-foreground hover:text-primary"
            >
              <CopyIcon className="h-4 w-4" />
              Email
            </Button>
            <Button
              variant="link"
              className="h-auto gap-2 p-0 text-muted-foreground hover:text-primary"
            >
              <ExternalLinkIcon className="h-4 w-4" />
              Visit Website
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
