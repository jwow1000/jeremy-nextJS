// cv page

import Image from "next/image";
import { getCVEntries } from "@/app/lib/api/fetch";
import styles from "@/app/ui/subPage.module.css";




export default async function CV() {
  const posts = await getCVEntries(); // Fetch data in an async component 
  console.log("possssttss", posts);
  return (
    <div className={styles.page}>
    </div>
  );
}
