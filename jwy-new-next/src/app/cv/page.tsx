import { getCV } from "@/sanity/lib/fetch";

const CATEGORY_ORDER = ['exhibitions', 'sound', 'residencies'] as const

const CATEGORY_LABELS: Record<string, string> = {
  exhibitions: 'Exhibitions',
  sound: 'Sound',
  residencies: 'Residencies / Awards',
}

export default async function Cv() {
  const entries = await getCV();

  const grouped = CATEGORY_ORDER.reduce<Record<string, typeof entries>>((acc, cat) => {
    acc[cat] = entries.filter((e) => e.category === cat)
    return acc
  }, {})

  return (
    <main className="flex justify-center w-full px-6 py-16 print:py-8">
      <article className="w-full max-w-2xl">
        {CATEGORY_ORDER.map((cat) => {
          const section = grouped[cat]
          if (!section?.length) return null
          return (
            <section key={cat}>
              <h3 className="text-base font-bold uppercase tracking-widest mt-8 mb-2 border-b border-current">
                {CATEGORY_LABELS[cat]}
              </h3>
              {section.map((entry) => (
                <div key={entry._id} className="mt-4">
                  <div className="flex justify-between items-baseline gap-4">
                    <span className="font-bold text-lg">'{entry.title}'</span>
                    <span className="text-base shrink-0">{entry.date}</span>
                  </div>
                  {entry.artist && <p className="text-base">{entry.artist}</p>}
                  {entry.role && <p className="text-base italic">{entry.role}</p>}
                  <p className="text-base">
                    {[entry.venue, entry.location].filter(Boolean).join(', ')}
                    {entry.link && (
                      <a
                        href={entry.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-2 underline underline-offset-2 hover:text-[var(--hilite)]"
                      >
                        LINK
                      </a>
                    )}
                  </p>
                </div>
              ))}
            </section>
          )
        })}
      </article>
    </main>
  )
}
