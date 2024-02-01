import ItemBlock from "./_components/item-block";
import ItemDetail from "./_components/item-detail";
import ContactItem from "./_components/contact-item";
import Header from "./_components/header";
import { api } from "@/trpc/server";
import ExperienceBlock from "./_components/experience-block";

export default async function ProfilePage({
  params,
}: {
  params: { id: string };
}) {
  const user = await api.user.getById.query({ id: params.id });

  if (!user) return "use not found";
  return (
    <>
      <Header user={user} />
      <main className="mx-auto flex w-full max-w-4xl flex-col gap-16 py-20">
        <ItemBlock title="About">
          <p className="leading-tight tracking-tight text-muted-foreground">
            {user.description}
          </p>
        </ItemBlock>
        <ExperienceBlock data={user.experiences} />
        <ItemBlock title="Education">
          <ItemDetail
            sub="Master in UX Design"
            title="UniversAmsterdam"
            timeline="2014-2016"
            description="ies with a master thesis about human computer interaction in AI."
          />
          <ItemDetail
            sub="Master in UX Design"
            title="Unences, Amsterdam"
            timeline="2014-2016"
            description="Specializing in UX and UI Design and closing the studies with a master thesis about human computer interaction in AI."
          />
          <ItemDetail
            sub="Master in UX Design"
            title="University Applied Sciences, Amsterdam"
            timeline="2014-2016"
            description="Specializing in UX and UI Design and closing the studies with a master thesis about human computer interaction in AI."
          />
          <ItemDetail
            sub="Master in UX Design"
            title="University Applied Sciences, Amsterdam"
            timeline="2014-2016"
            description="Specializing in UX and UI Design and closing the studies with a master thesis about human computer interaction in AI."
          />
          <ItemDetail
            sub="Master in UX Design"
            title="University Applied Sciences, Amsterdam"
            timeline="2014-2016"
            description="Specializing in UX and UI Design and closing the studies with a master thesis about human computer interaction in AI."
          />
          <ItemDetail
            sub="Master in UX Design"
            title="University Applied Sciences, Amsterdam"
            timeline="2014-2016"
            description="Specializing in UX and UI Design and closing the studies with a master thesis about human computer interaction in AI."
          />
        </ItemBlock>
        <ItemBlock title="Contact">
          <ContactItem label="E-mail" href="buletin.sehu@hotmail.com" />
          <ContactItem label="Phone" href="+32 483 42 28 10" />
          <ContactItem label="Twitter" href="@buletin.sehu" />
          <ContactItem label="LinkedIn" href="@buletins" />
        </ItemBlock>
      </main>
    </>
  );
}
