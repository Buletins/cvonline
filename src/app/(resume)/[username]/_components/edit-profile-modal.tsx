"use client";

import {
  CircleUserIcon,
  FileTextIcon,
  Loader2,
  LogOutIcon,
} from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
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
import { Switch } from "@/components/ui/switch";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import GeneralForm from "@/components/forms/general-form";
import ExperienceTab from "@/components/tabs/experience-tab";
import ContactTab from "@/components/tabs/contact-tab";
import EducationTab from "@/components/tabs/education-tab";
import LanguageTab from "@/components/tabs/language-tab";
import InternshipTab from "@/components/tabs/internship-tab";
import SkillTab from "@/components/tabs/skill-tab";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import LetterItem from "./letter-item";
import { toast } from "sonner";
import { useTab } from "@/hooks/use-tab";

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
  const [activeMenu, setActiveMenu] = useState<string>("Resume");
  const [switchLoading, setSwitchLoading] = useState<boolean>(false);
  const [loadingSwitchType, setLoadingSwitchType] = useState<string | null>(
    null,
  );

  const router = useRouter();
  const editProfile = useEditProfile();
  const tab = useTab();

  if (session?.user.id != user.id) return null;

  const links = [
    { label: "Algemeen", toggable: false },
    { label: "Vaardigheden", toggable: false },
    { label: "Werkervaring", toggable: true, status: user.experienceActive },
    { label: "Stage", toggable: true, status: user.internshipActive },
    { label: "Opleiding", toggable: true, status: user.educationActive },
    { label: "Talen", toggable: false },
    { label: "Contact", toggable: false },
  ];

  const toggleExperiences = api.experience.toggle.useMutation({
    onSuccess: () => {
      router.refresh();
    },
    onMutate: () => {
      setSwitchLoading(true);
    },
    onSettled: () => {
      setSwitchLoading(false);
      setLoadingSwitchType(null);
    },
  });

  const toggleEducation = api.education.toggle.useMutation({
    onSuccess: () => {
      router.refresh();
    },
    onMutate: () => {
      setSwitchLoading(true);
    },
    onSettled: () => {
      setSwitchLoading(false);
      setLoadingSwitchType(null);
    },
  });

  const toggleInternship = api.internship.toggle.useMutation({
    onSuccess: () => {
      router.refresh();
    },
    onMutate: () => {
      setSwitchLoading(true);
    },
    onSettled: () => {
      setSwitchLoading(false);
      setLoadingSwitchType(null);
    },
  });

  const toggleSwitch = (label: string) => {
    switch (label) {
      case "Werkervaring":
        toggleExperiences.mutate();
        setLoadingSwitchType("Werkervaring");
        break;
      case "Opleiding":
        toggleEducation.mutate();
        setLoadingSwitchType("Opleiding");
        break;
      case "Stage":
        toggleInternship.mutate();
        setLoadingSwitchType("Stage");
        break;
      default:
        break;
    }
  };

  return (
    <Dialog open={editProfile.status} onOpenChange={() => editProfile.close()}>
      <DialogContent
        onOpenAutoFocus={(e) => e.preventDefault()}
        className="h-full min-h-svh w-full max-w-3xl overflow-hidden bg-background/50 p-0 backdrop-blur-lg focus-visible:ring-0 md:max-h-[760px] md:min-h-[760px]"
      >
        <div className="flex w-full flex-col overflow-hidden md:flex-row">
          <div className="flex flex-col items-center gap-3 border-r px-4 py-6">
            <TooltipProvider delayDuration={150}>
              <Tooltip>
                <TooltipTrigger
                  onClick={() => setActiveMenu("Resume")}
                  className={cn(
                    activeMenu === "Resume"
                      ? "text-primary"
                      : "text-muted-foreground",
                  )}
                >
                  <CircleUserIcon className="h-6 w-6" />
                </TooltipTrigger>
                <TooltipContent side="right" className="px-3 py-1">
                  <p>Profiel</p>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger
                  onClick={() => setActiveMenu("Letter")}
                  className={cn(
                    activeMenu === "Letter"
                      ? "text-primary"
                      : "text-muted-foreground",
                  )}
                >
                  <FileTextIcon className="h-6 w-6" />
                </TooltipTrigger>
                <TooltipContent side="right" className="px-3 py-1">
                  <p>Sollicitatiebrieven</p>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger
                  onClick={async () => {
                    await signOut({ callbackUrl: "/" });
                  }}
                  className="mt-auto text-muted-foreground hover:text-primary"
                >
                  <LogOutIcon className="h-4 w-4" />
                </TooltipTrigger>
                <TooltipContent side="right" className="px-3 py-1">
                  <p>Log uit</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          {activeMenu === "Resume" && (
            <>
              <div className="flex h-full shrink-0 flex-col gap-3 border-r pt-6 md:w-60">
                <div className="flex items-center gap-2 px-4">
                  <CircleUserIcon className="h-6 w-6" />
                  <div className="text-lg font-medium tracking-tight">
                    {session.user.name}
                  </div>
                </div>
                <div className="relative flex h-full flex-col">
                  {links.map((item, index) => (
                    <div
                      key={index}
                      className={cn(
                        "flex items-center justify-between px-4 transition hover:bg-[#333]/10",
                        tab.activeTab === item.label &&
                          "bg-[#333]/50 hover:bg-[#333]/50",
                      )}
                    >
                      <button
                        onClick={() => {
                          if (user.isCreated) {
                            tab.setActiveTab(item.label);
                          } else {
                            toast.error("Wijzig eerst uw gebruiksnaam.");
                          }
                        }}
                        className={cn(
                          "w-full py-2 text-left text-sm text-muted-foreground focus-visible:outline-none",
                          tab.activeTab === item.label && "text-primary",
                        )}
                      >
                        {item.label}
                      </button>
                      {item.toggable && (
                        <div className="flex items-center gap-2">
                          {loadingSwitchType === item.label && (
                            <Loader2 className="h-3 w-3 animate-spin" />
                          )}
                          <Switch
                            disabled={loadingSwitchType === item.label}
                            checked={item.status}
                            onCheckedChange={() => toggleSwitch(item.label)}
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative flex-grow">
                <div className="h-full overflow-hidden px-4 py-8">
                  {tab.activeTab === "Algemeen" && <GeneralForm user={user} />}
                  {tab.activeTab === "Vaardigheden" && (
                    <SkillTab data={user.skills} />
                  )}
                  {tab.activeTab === "Werkervaring" && (
                    <ExperienceTab data={user.experiences} />
                  )}
                  {tab.activeTab === "Stage" && (
                    <InternshipTab data={user.internships} />
                  )}
                  {tab.activeTab === "Opleiding" && (
                    <EducationTab data={user.educations} />
                  )}
                  {tab.activeTab === "Talen" && (
                    <LanguageTab data={user.languages} />
                  )}
                  {tab.activeTab === "Contact" && (
                    <ContactTab data={user.contacts} email={user.email!} />
                  )}
                </div>
              </div>
            </>
          )}
          {activeMenu === "Letter" && (
            <div className="relative h-full flex-grow px-4 py-6">
              <div className="flex h-full flex-col gap-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-medium tracking-tight">
                    Sollicitatiebrieven
                  </h2>
                  <Button size="sm" variant="secondary">
                    Nieuw
                  </Button>
                </div>
                <ScrollArea>
                  <div className="grid grid-cols-2 gap-2">
                    <LetterItem />
                    <LetterItem />
                    <LetterItem />
                    <LetterItem />
                    <LetterItem />
                    <LetterItem />
                    <LetterItem />
                    <LetterItem />
                  </div>
                </ScrollArea>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
