import { getWorks } from "@/sanity/lib/fetch";
import WorksClient from "@/components/WorksClient";

export default async function Works() {
  const works = await getWorks();
  // console.log("works: ", works);

  return (
    <WorksClient works={works}/>
  );
}
