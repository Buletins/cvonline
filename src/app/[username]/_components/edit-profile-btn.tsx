"use client";

import { CookingPot, EditIcon } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Session } from "next-auth";

import type { Contact, Experience, User } from "@prisma/client";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import GeneralForm from "@/components/forms/general-form";
import ExperienceTab from "@/components/blocks/experience-tab";
import ContactTab from "@/components/blocks/contact-tab";
import { Switch } from "@/components/ui/switch";
import { api } from "@/trpc/react";

interface EditProfileBtnProps {
  user: User & {
    experiences: Experience[];
    contacts: Contact[];
  };
  session: Session | null;
}

export default function EditProfileBtn({ user, session }: EditProfileBtnProps) {
  const [activeTab, setActiveTab] = useState<string>("General");

  const router = useRouter();

  if (session?.user.id != user.id) return null;

  const links = [
    { label: "General", toggable: false },
    { label: "Experience", toggable: true, status: user.experienceActive },
    { label: "Education", toggable: true, status: user.educationActive },
    { label: "Contact", toggable: false },
  ];

  const toggleExperiences = api.experience.toggle.useMutation({
    onSuccess: (data) => {
      router.refresh();
      console.log(data);
    },
    onError: (data) => {
      console.log("first");
      console.log(data);
    },
  });

  const toggleEducation = api.education.toggle.useMutation({
    onSuccess: () => {
      router.refresh();
    },
  });

  const toggleSwitch = (label: string) => {
    switch (label) {
      case "Experience":
        toggleExperiences.mutate();
        break;
      case "Education":
        toggleEducation.mutate();
        break;
      // Add more cases for other toggles if needed
      default:
        break;
    }
  };

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
          <div className="w-60 border-r py-6">
            <div className="px-6 text-lg">Profile</div>
            <div className="flex flex-col py-3">
              {links.map((item, index) => (
                <div
                  key={index}
                  className={cn(
                    "flex items-center justify-between px-6",
                    activeTab === item.label && "bg-[#333] text-primary",
                  )}
                >
                  <button
                    onClick={() => setActiveTab(item.label)}
                    className="w-full py-1.5 text-left text-sm text-muted-foreground"
                  >
                    {item.label}
                  </button>
                  {item.toggable && (
                    <Switch
                      className="h-auto"
                      checked={item.status}
                      onCheckedChange={() => toggleSwitch(item.label)}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className="relative flex-grow">
            <div className="h-full px-4 py-8">
              {activeTab === "General" && (
                <GeneralForm user={user} session={session} />
              )}
              {activeTab === "Experience" && (
                <ExperienceTab id={session.user.id} data={user.experiences} />
              )}
              {activeTab === "Contact" && <ContactTab data={user.contacts} />}
            </div>
            <div className="absolute inset-x-0 bottom-0 border-t px-6 py-4 backdrop-blur-lg">
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
