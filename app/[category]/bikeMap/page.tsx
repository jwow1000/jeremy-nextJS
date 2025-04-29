import Image from "next/image";
import map from "@/public/nyc-bike-brooklyn-queens.svg";
import styles from "@/app/ui/detailPage.module.css";



export default async function BikeMap() {
  
  
 
  // an array of featured images

  return (
    <main className={styles.main}>
      <div className={styles.infoWrapper}>
        
      </div>

      <section className={styles.imageSection}>
        <Image
          src={map}
          alt={'nyc bike lane map'}
        >

        </Image>
       
        
        
      </section>
    </main>
  );
}