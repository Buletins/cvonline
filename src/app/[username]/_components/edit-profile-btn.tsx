"use client";

import { EditIcon } from "lucide-react";
import { useState } from "react";
import { Session } from "next-auth";

import type { Contact, Experience, User } from "@prisma/client";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import GeneralForm from "@/components/forms/general-form";
import ContactForm from "@/components/forms/contact-form";
import ExperienceTab from "@/components/blocks/experience-tab";
import ContactTab from "@/components/blocks/contact-tab";

interface EditProfileBtnProps {
  user: User & {
    experiences: Experience[];
    contacts: Contact[];
  };
  session: Session | null;
}

export default function EditProfileBtn({ user, session }: EditProfileBtnProps) {
  const [activeTab, setActiveTab] = useState<string>("General");

  if (session?.user.id != user.id) return null;

  const links = [
    { label: "General" },
    { label: "Experience" },
    { label: "Contact" },
  ];

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
                <button
                  key={index}
                  onClick={() => setActiveTab(item.label)}
                  className={cn(
                    "w-full px-6 py-1.5 text-left text-sm text-muted-foreground",
                    activeTab === item.label && "bg-[#333] text-primary",
                  )}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
          <div className="relative flex-grow">
            <div className="h-full px-4 py-8">
              {activeTab === "General" && (
                <GeneralForm user={user} session={session} />
              )}
              {activeTab === "Experience" && (
                <ExperienceTab data={user.experiences} />
              )}
              {activeTab === "Contact" && <ContactTab data={user.contacts} />}
              {activeTab === "Contact1" && <ContactForm user={user} />}
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
