import { api } from "@/trpc/server";
import { getServerAuthSession } from "@/server/auth";
import ItemBlock from "./_components/item-block";
import ContactItem from "./_components/contact-item";
import Header from "./_components/header";
import PublishBar from "./_components/publish-bar";
import ExperienceItem from "./_components/experience-item";
import ResumonBadge from "../_components/resumon-badge";
import { Metadata } from "next";
import EditProfileModal from "./_components/edit-profile-modal";

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

  if (!user ?? !user?.email) return "use not found";

  return (
    <>
      <div className="flex flex-col gap-8 py-20">
        {session?.user.id === user.id && !user.isPusblished && <PublishBar />}
        <Header user={user} session={session} />
        <main className="mx-auto flex w-full max-w-lg flex-col gap-8">
          <ItemBlock title="About">
            <p className="text-sm leading-tight tracking-tight text-muted-foreground">
              {user.description}
            </p>
          </ItemBlock>
          {user.experienceActive && (
            <ItemBlock title="Werkervaring">
              {user.experiences.map((item) => (
                <ExperienceItem key={item.id} data={item} />
              ))}
            </ItemBlock>
          )}
          {user.educationActive && (
            <ItemBlock title="Opleidingen">
              {user.experiences.map((item) => (
                <ExperienceItem key={item.id} data={item} />
              ))}
            </ItemBlock>
          )}
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
      </div>
      <ResumonBadge />
      {session && <EditProfileModal user={user} session={session} />}
    </>
  );
}
