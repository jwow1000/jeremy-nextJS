// cv page

import { getCVEntries } from "@/app/lib/api/fetch";
import { Entry, EntryCategory, PostDictionary } from "../types/cvEntryTypes";
import stylesSub from "@/app/ui/subPage.module.css";
import styles from "@/app/ui/cvPage.module.css";




function organizeEntriesByCategory(entries: Entry[]): PostDictionary {
  const categorizedEntries = entries.reduce<PostDictionary>((acc, entry) => {
    // Check if the category already exists, if not, initialize it
    if (!acc[entry.type]) {
      acc[entry.type] = { type: entry.type, children: [] };
    }

    // Add the entry to the appropriate category
    acc[entry.type].children.push(entry);

    return acc;
  }, {});

  // Sort the children arrays by date (YYYY-MM-DD)
  Object.values(categorizedEntries).forEach(category => {
    category.children.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  });

  return categorizedEntries;
}



export default async function CV() {
  const posts = await getCVEntries(); // Fetch data 
  
  // organize into types in an object
  const organizedEntries = organizeEntriesByCategory( posts );



  
  return (
    <main className={styles.page}>
      <div className={stylesSub.label}>CV</div>
      {
        Object.entries(organizedEntries).map(([category, data]: [string, EntryCategory]) => (
          <div key={category} className={styles.categoryWrapper}>
            <h2 className={styles.categoryTitle}>{category}</h2>
            <ul className={styles.categoryUL}>
              {data.children.map((entry) => (
                <li key={entry.title} className={styles.entryWrapper}>
                  <strong className={styles.entryTitle}>{entry.title}</strong>  {entry.renderDate} -- {entry.location}
                  {entry.description && 
                    <div className={styles.entryDescription}>{entry.description}</div>
                  }

                  {entry.link && 
                    <a 
                      className={styles.entryLink}
                      href={entry.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      ~ Link ~
                    </a>
                  }
                </li>
              ))}
            </ul>
          </div>
        ))
      } 
    </main>
  );
}
