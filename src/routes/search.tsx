import { createFileRoute } from "@tanstack/react-router";
import { Section } from "@/components/site/Section";
import { SearchBar } from "@/components/site/SearchBar";
import { ArchitectCard } from "@/components/site/ArchitectCard";
import { architects } from "@/data/architects";

export const Route = createFileRoute("/search")({
  head: () => ({ meta: [{ title: "Trouver un architecte — Second Plan" }] }),
  component: SearchPage,
});

const filters = [
  { title: "Disponibilité", options: ["Cette semaine", "Sous 48h", "Week-end", "Ce mois-ci"] },
  { title: "Type de bien", options: ["Appartement", "Maison", "Local commercial", "Immeuble", "Péniche", "Bâtiment classé"] },
  { title: "Type de visite", options: ["Express", "Conseil", "Projet"] },
  { title: "Expérience", options: ["< 5 ans", "5–10 ans", "10 ans +"] },
];

function SearchPage() {
  return (
    <>
      <div className="border-b border-border bg-secondary/30">
        <div className="container-page py-8">
          <h1 className="font-display text-3xl md:text-4xl">Trouvez l’architecte adapté à votre projet</h1>
          <div className="mt-6"><SearchBar /></div>
        </div>
      </div>
      <Section className="!py-12">
        <div className="grid lg:grid-cols-[260px_1fr] gap-10">
          <aside className="space-y-7">
            {filters.map((f) => (
              <div key={f.title}>
                <div className="text-sm font-medium mb-2">{f.title}</div>
                <ul className="space-y-1.5 text-sm text-muted-foreground">
                  {f.options.map((o) => (
                    <li key={o}>
                      <label className="flex items-center gap-2 cursor-pointer hover:text-foreground">
                        <input type="checkbox" className="accent-primary" />{o}
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </aside>
          <div>
            <div className="flex items-center justify-between mb-5 text-sm">
              <div className="text-muted-foreground">{architects.length} architectes disponibles</div>
              <select className="bg-card border border-border rounded-full px-4 py-1.5 text-sm">
                <option>Pertinence</option>
                <option>Prix croissant</option>
                <option>Meilleures notes</option>
                <option>Disponibilité la plus proche</option>
              </select>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {architects.map((a) => <ArchitectCard key={a.id} a={a} />)}
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
