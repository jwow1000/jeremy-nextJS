import { getCV } from "@/sanity/lib/fetch";

const CATEGORY_ORDER = ['exhibitions', 'sound', 'support', 'residencies'] as const

const CATEGORY_LABELS: Record<string, string> = {
  exhibitions: 'Exhibitions',
  sound: 'Sound',
  support: 'AV Support',
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
              {section.map((entry) => {
                const meta = [
                  entry.artist,
                  [entry.venue, entry.location].filter(Boolean).join(', '),
                  entry.date,
                ].filter(Boolean).join(' · ')

                const placetime = [
                  [entry.venue, entry.location].filter(Boolean).join(', '),
                  entry.date,
                ].filter(Boolean).join(' · ')

                return (
                  <div key={entry._id} className="mt-3">
                    <p>
                      <span className="font-bold">&lsquo;{entry.title}&rsquo;</span>
                      {entry.artist && <span> · {entry.artist}</span>}
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
                    {placetime && <p className="text-base">{placetime}</p>}
                    {entry.role && <p className="text-base italic">{entry.role}</p>}
                  </div>
                )
              })}
            </section>
          )
        })}
      </article>
    </main>
  )
}
