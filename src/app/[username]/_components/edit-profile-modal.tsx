"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Session } from "next-auth";
import type {
  Contact,
  Education,
  Experience,
  Internship,
  Language,
  Skill,
  User,
} from "@prisma/client";

import { api } from "@/trpc/react";
import { cn } from "@/lib/utils";
import { useEditProfile } from "@/hooks/use-editprofile";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import GeneralForm from "@/components/forms/general-form";
import ExperienceTab from "@/components/tabs/experience-tab";
import ContactTab from "@/components/tabs/contact-tab";
import EducationTab from "@/components/tabs/education-tab";
import LanguageTab from "@/components/tabs/language-tab";
import { CircleUserIcon } from "lucide-react";
import InternshipTab from "@/components/tabs/internship-tab";
import SkillTab from "@/components/tabs/skill-tab";

interface EditProfileModalProps {
  user: User & {
    experiences: Experience[];
    educations: Education[];
    contacts: Contact[];
    internships: Internship[];
    skills: Skill[];
    languages: Language[];
  };
  session: Session | null;
}

export default function EditProfileModal({
  user,
  session,
}: EditProfileModalProps) {
  const [activeTab, setActiveTab] = useState<string>("Algemeen");

  console.log(user.languages);

  const router = useRouter();
  const editProfile = useEditProfile();

  if (session?.user.id != user.id) return null;

  const links = [
    { label: "Algemeen", toggable: false },
    { label: "Vaardigheden", toggable: true, status: user.experienceActive },
    { label: "Werkervaring", toggable: true, status: user.experienceActive },
    { label: "Stage", toggable: true, status: user.internshipActive },
    { label: "Opleiding", toggable: true, status: user.educationActive },
    { label: "Talen", toggable: true, status: user.educationActive },
    { label: "Contact", toggable: false },
  ];

  const toggleExperiences = api.experience.toggle.useMutation({
    onSuccess: (data) => {
      router.refresh();
      console.log(data);
    },
  });

  const toggleEducation = api.education.toggle.useMutation({
    onSuccess: () => {
      router.refresh();
    },
  });

  const toggleInternship = api.internship.toggle.useMutation({
    onSuccess: () => {
      router.refresh();
    },
  });

  const toggleSwitch = (label: string) => {
    switch (label) {
      case "Werkervaring":
        toggleExperiences.mutate();
        break;
      case "Opleiding":
        toggleEducation.mutate();
        break;
      case "Stage":
        toggleInternship.mutate();
        break;
      default:
        break;
    }
  };

  return (
    <Dialog open={editProfile.status} onOpenChange={() => editProfile.close()}>
      <DialogContent className="h-full max-h-[760px] min-h-[760px] w-full max-w-3xl bg-background/50 p-0 backdrop-blur-lg">
        <div className="flex w-full overflow-hidden">
          <div className="w-60 border-r py-6">
            <div className="flex items-center gap-2 px-6">
              <CircleUserIcon className="h-6 w-6" />
              <div className="text-lg">{session.user.name}</div>
            </div>
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
              {activeTab === "Algemeen" && <GeneralForm user={user} />}
              {activeTab === "Vaardigheden" && <SkillTab data={user.skills} />}
              {activeTab === "Werkervaring" && (
                <ExperienceTab data={user.experiences} />
              )}
              {activeTab === "Stage" && (
                <InternshipTab id={session.user.id} data={user.internships} />
              )}
              {activeTab === "Opleiding" && (
                <EducationTab id={session.user.id} data={user.educations} />
              )}
              {activeTab === "Talen" && <LanguageTab data={user.languages} />}
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
