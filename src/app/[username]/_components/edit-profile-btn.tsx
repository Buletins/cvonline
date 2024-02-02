"use client";

import { EditIcon } from "lucide-react";
import { useState } from "react";
import { Session } from "next-auth";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import GeneralForm from "@/components/forms/general-form";
import { User } from "@prisma/client";

interface EditProfileBtnProps {
  user: User;
  session: Session | null;
}

export default function EditProfileBtn({ user, session }: EditProfileBtnProps) {
  const [activeTab, setActiveTab] = useState<string>("General");

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="fixed bottom-4 left-4 gap-2">
          <EditIcon className="h-4 w-4" />
          Edit Profile
        </Button>
      </DialogTrigger>
      <DialogContent className="min-h-[760px] w-full max-w-3xl bg-background/50 p-0 backdrop-blur-lg">
        <div className="flex w-full">
          <div className="w-60 border-r py-8">
            <div className="px-6 text-lg">Profile</div>
            <div className="flex flex-col py-3">
              <button
                onClick={() => setActiveTab("General")}
                className={cn(
                  "w-full px-6 py-1.5 text-left text-sm text-muted-foreground",
                  activeTab === "General" && "bg-[#333] text-primary",
                )}
              >
                General
              </button>
              <button
                onClick={() => setActiveTab("Projects")}
                className={cn(
                  "w-full px-6 py-1.5 text-left text-sm text-muted-foreground",
                  activeTab === "Projects" && "bg-[#333] text-primary",
                )}
              >
                Projects
              </button>
              <button
                onClick={() => setActiveTab("SideProjects")}
                className={cn(
                  "w-full px-6 py-1.5 text-left text-sm text-muted-foreground",
                  activeTab === "SideProjects" && "bg-[#333] text-primary",
                )}
              >
                Side Projects
              </button>
            </div>
          </div>
          <div className="relative flex-grow">
            <div className="h-full px-6 py-8">
              {activeTab === "General" && (
                <GeneralForm user={user} session={session} />
              )}
            </div>
            <div className="absolute inset-x-0 bottom-0 border-t px-6 py-4">
              <Button size="sm" className="ml-auto">
                Done
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
