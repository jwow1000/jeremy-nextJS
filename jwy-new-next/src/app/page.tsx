import AppLink from "@/components/AppLink";

export default function Home() {
  return (
    <main className="flex flex-col w-full p-4 pt-12">
      <h1>Jeremy Wiles-Young</h1>
      <section className="my-20">
        <p>artist and engineer based in NYC</p>
        <div className="flex flex-col gap-4 py-10">
          <AppLink href={`/works`} >works</AppLink>
          <AppLink href={`/cv`} >cv</AppLink>
          <AppLink href={`https://github.com/jwow1000`} newWindow={true}>github</AppLink>
        </div>

      </section>
    </main> 
  );
}
