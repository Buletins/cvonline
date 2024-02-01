import { unstable_noStore as noStore } from "next/cache";
import ItemBlock from "./_components/item-block";
import ItemDetail from "./_components/item-detail";
import ContactItem from "./_components/contact-item";
import Header from "./_components/header";

export default async function Home() {
  noStore();

  return (
    <>
      <Header />
      <main className="mx-auto flex w-full max-w-4xl flex-col gap-16 py-20">
        <ItemBlock title="About">
          <p className="leading-tight tracking-tight text-muted-foreground">
            I'm Jesper Sterling, a digital product designer from Amsterdam.
            Specialized in user-centered web and mobile app interfaces, I blend
            minimalism with functionality.
          </p>
          <p className="leading-tight tracking-tight text-muted-foreground">
            With a master's in Interaction Design from Delft University, I
            started in a small studio and grew into senior roles at tech
            companies. I also run a nocode store and engage in the local design
            community and curate dark websites in my free time.
          </p>
        </ItemBlock>
        <ItemBlock title="Experience">
          <ItemDetail
            sub="Lead Product Designer"
            title="Amsterdam Tech Hub"
            timeline="2016-2020"
            description="Directed a team in designing digital products, from concept to launch, focusing on user-centric solutions."
          />
          <ItemDetail
            sub="Lead Product Designer"
            title="Amsterdam Tech Hub"
            timeline="2016-2020"
            description="Directed a team in designing digital products, from concept to launch, focusing on user-centric solutions."
          />
          <ItemDetail
            sub="Lead Product Designer"
            title="Amsterdam Tech Hub"
            timeline="2016-2020"
            description="Directed a team in designing digital products, from concept to launch, focusing on user-centric solutions."
          />
          <ItemDetail
            sub="Lead Product Designer"
            title="Amsterdam Tech Hub"
            timeline="2016-2020"
            description="Directed a team in designing digital products, from concept to launch, focusing on user-centric solutions."
          />
          <ItemDetail
            sub="Lead Product Designer"
            title="Amsterdam Tech Hub"
            timeline="2016-2020"
            description="Directed a team in designing digital products, from concept to launch, focusing on user-centric solutions."
          />
          <ItemDetail
            sub="Lead Product Designer"
            title="Amsterdam Tech Hub"
            timeline="2016-2020"
            description="Directed a team in designing digital products, from concept to launch, focusing on user-centric solutions."
          />
          <ItemDetail
            sub="Lead Product Designer"
            title="Amsterdam Tech Hub"
            timeline="2016-2020"
            description="Directed a team in designing digital products, from concept to launch, focusing on user-centric solutions."
          />
          <ItemDetail
            sub="Lead Product Designer"
            title="Amsterdam Tech Hub"
            timeline="2016-2020"
            description="Directed a team in designing digital products, from concept to launch, focusing on user-centric solutions."
          />
          <ItemDetail
            sub="Lead Product Designer"
            title="Amsterdam Tech Hub"
            timeline="2016-2020"
            description="Directed a team in designing digital products, from concept to launch, focusing on user-centric solutions."
          />
          <ItemDetail
            sub="Lead Product Designer"
            title="Amsterdam Tech Hub"
            timeline="2016-2020"
            description="Directed a team in designing digital products, from concept to launch, focusing on user-centric solutions."
          />
        </ItemBlock>
        <ItemBlock title="Education">
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
