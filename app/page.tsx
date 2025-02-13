// import Image from "next/image";
import styles from "@/app/ui/page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        {/* <div className={styles.logoWrapper}>
          <Image
            className={styles.animateLogo}
            src="/jwy_logo_24.svg"
            alt="handwritten style logo Jeremy Wiles-Young"
            width={150}
            height={150}
            priority
          />
          <Image
            className={styles.stillLogo}
            src="/jwy_logo_24.svg"
            alt="handwritten style logo Jeremy Wiles-Young"
            width={150}
            height={150}
            priority
          />
        </div> */}
        <p>Jeremy Wiles-Young is an artist and software engineer working with installation and sound. They are currently based in NYC.</p>
        <a href="https://github.com/jwow1000">github profile</a>
        <a href="https://www.instagram.com/jeremy__wy/">instagram</a>
      </main> 
    </div>
  );
}
