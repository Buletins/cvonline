"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Session } from "next-auth";
import type { Contact, Education, Experience, User } from "@prisma/client";

import { api } from "@/trpc/react";
import { cn } from "@/lib/utils";
import { useEditProfile } from "@/hooks/use-editprofile";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import GeneralForm from "@/components/forms/general-form";
import ExperienceTab from "@/components/blocks/experience-tab";
import ContactTab from "@/components/blocks/contact-tab";
import EducationTab from "@/components/blocks/education-tab";

interface EditProfileModalProps {
  user: User & {
    experiences: Experience[];
    educations: Education[];
    contacts: Contact[];
  };
  session: Session | null;
}

export default function EditProfileModal({
  user,
  session,
}: EditProfileModalProps) {
  const [activeTab, setActiveTab] = useState<string>("General");

  const router = useRouter();
  const editProfile = useEditProfile();

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
    <Dialog open={editProfile.status} onOpenChange={() => editProfile.close()}>
      <DialogContent className="h-full max-h-[760px] min-h-[760px] w-full max-w-3xl bg-background/50 p-0 backdrop-blur-lg">
        <div className="flex w-full overflow-hidden">
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
                      checked={item.status}
                      onCheckedChange={() => toggleSwitch(item.label)}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className="relative flex-grow">
            <div className="h-full overflow-hidden px-4 py-8">
              {activeTab === "General" && <GeneralForm user={user} />}
              {activeTab === "Experience" && (
                <ExperienceTab id={session.user.id} data={user.experiences} />
              )}
              {activeTab === "Education" && (
                <EducationTab id={session.user.id} data={user.educations} />
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
