import Image from "next/image";
import styles from "@/app/ui/page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <p>Jeremy Wiles-Young is an artist and software engineer working with installation and sound. They are currently based in NYC.</p>
      </main> 
    </div>
  );
}
