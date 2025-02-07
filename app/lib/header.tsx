import Image from "next/image";
import styles from "@/app/ui/header.module.css";

export default function Header() {
  return (
    <header className={styles.wrapper}>
      <Image
        className={styles.logo}
        src="/jwy_logo_24.svg"
        alt="handwritten style logo Jeremy Wiles-Young"
        width={150}
        height={150}
        priority
      />
      Jeremy Wiles-Young
    
    </header>
  );
}