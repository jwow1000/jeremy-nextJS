import Link from 'next/link';
import styles from "@/app/ui/subway.module.css";

const returnStr = "<---";
const links = [
  "https://www.youtube.com/embed/spRQR7xBG3g?autoplay=1&rel=0&amp;showinfo=0",
  "https://www.youtube.com/embed/-4kpwJKwZ8Q?autoplay=1&rel=0&amp;showinfo=0",
  "https://www.youtube.com/embed/US-81APdmFM?autoplay=1&rel=0&amp;showinfo=0",
  "https://www.youtube.com/embed/hawErPK95Ak?autoplay=1&rel=0&amp;showinfo=0",
  "https://www.youtube.com/embed/bRrMaBHg8Ug?autoplay=1&rel=0&amp;showinfo=0",
  "https://www.youtube.com/embed/1vIiw26kOrI?autoplay=1&rel=0&amp;showinfo=0",
  "https://www.youtube.com/embed/PDeznrE5mVk?autoplay=1&rel=0&amp;showinfo=0",
  "https://www.youtube.com/embed/4ZmNfeSgIpg?autoplay=1&rel=0&amp;showinfo=0",
  "https://www.youtube.com/embed/xGTYk31Py3g?autoplay=1&rel=0&amp;showinfo=0",
];

function Subway() {
 

  return (
    <div className={styles.mainContainer}>
      <Link href="/webprojects">
        <div id={styles.returnLink}>
          {returnStr} <br />
          back <br />
          to <br />
          web <br />
          projects <br />
        </div>
      </Link>
      {
        links.map((item, idx) => (
          <iframe
            className={styles.videos}
            title={`part ${idx + 1} of a 9x9 grid of Jeremy Wiles-Young's subway web piece`}
            src={item}
            key={idx}
          ></iframe>
        ))
      }
    </div>
  );
}

export default Subway;
