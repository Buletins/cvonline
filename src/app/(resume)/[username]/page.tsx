import type { Metadata } from "next";

import { getServerAuthSession } from "@/server/auth";
import { api } from "@/trpc/server";
import ItemBlock from "./_components/item-block";
import ContactItem from "./_components/contact-item";
import Header from "./_components/header";
import PublishBar from "./_components/publish-bar";
import ExperienceItem from "./_components/experience-item";
import EditProfileModal from "./_components/edit-profile-modal";
import EducationItem from "./_components/education-item";
import PrintCv from "./_components/print-cv";
import LanguageItem from "./_components/language-item";
import InternshipItem from "./_components/internship-item";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CopyIcon, ExternalLinkIcon } from "lucide-react";
import FloatingHeader from "./_components/floating-header";
import ProfileIntro from "./_components/profile-intro";

type Props = {
  params: { username: string };
};

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  // FIX

  const user = await api.user.getByUsernam.query({ username: params.username });
  const ogResponse = await fetch(
    `https://autolijst-t3.vercel.app/api/og?title=`,
  );
  const ogImageUrl = ogResponse.url;

  if (!user) return {};
  return {
    description: `""""""`,
    title: `${user.name} - resumon.`,
    openGraph: {
      images: [ogImageUrl],
    },
  };
};

export default async function ProfilePage({
  params,
}: {
  params: { username: string };
}) {
  const session = await getServerAuthSession();
  const user = await api.user.getByUsernam.query({ username: params.username });

  if (!session && !user?.isPusblished) return "This profile is not published";
  if (!user ?? !user?.email ?? !user?.name) return "use not found";

  return (
    <>
      <PrintCv user={user} />
      <FloatingHeader user={user} />
      <div className="flex flex-col gap-8 px-4 py-20">
        {session?.user.id === user.id && !user.isPusblished && <PublishBar />}
        <Header user={user} session={session} />
        <main className="mx-auto flex w-full max-w-lg flex-col gap-8">
          <ProfileIntro name={user.name} description={user.description} />
          {user.experienceActive && user.experiences.length > 0 && (
            <ItemBlock title="Werkervaring">
              {user.experiences.map((item) => (
                <ExperienceItem key={item.id} data={item} session={session} />
              ))}
            </ItemBlock>
          )}
          {user.internshipActive && user.internships.length > 0 && (
            <ItemBlock title="Stage">
              {user.internships.map((item) => (
                <InternshipItem key={item.id} data={item} session={session} />
              ))}
            </ItemBlock>
          )}
          {user.educationActive && user.educations.length > 0 && (
            <ItemBlock title="Opleidingen">
              {user.educations.map((item) => (
                <EducationItem key={item.id} data={item} session={session} />
              ))}
            </ItemBlock>
          )}
          <ItemBlock title="Vaaridgheden">
            <div className="flex flex-wrap gap-2">
              {user.skills.map((item) => (
                <Badge
                  key={item.id}
                  variant="secondary"
                  className="bg-white/15 font-normal backdrop-blur-lg hover:bg-white/15"
                >
                  {item.title}
                </Badge>
              ))}
            </div>
          </ItemBlock>
          <ItemBlock title="Talen">
            {user.languages.map((item) => (
              <LanguageItem
                key={item.id}
                title={item.title}
                value={item.value}
              />
            ))}
          </ItemBlock>
          <ItemBlock title="Contact" tighter>
            <ContactItem label="Email" href={user.email} />
            {user.contacts.map((item) => (
              <ContactItem
                key={item.id}
                label={item.contactType}
                href={item.contactValue}
              />
            ))}
          </ItemBlock>
        </main>
        <footer className="flex w-full items-center justify-center">
          <p className="text-xs leading-tight tracking-tight text-muted-foreground">
            Create your own resume for free.
          </p>
        </footer>
      </div>
      {session && <EditProfileModal user={user} session={session} />}
    </>
  );
}
