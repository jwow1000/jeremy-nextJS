import { getWorks } from "@/sanity/lib/fetch";
import WorksClient from "@/components/WorksClient";

export default async function Works() {
  const works = await getWorks();

  return (
    <WorksClient works={works}/>
  );
}
