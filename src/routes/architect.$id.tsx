import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { architects } from "@/data/architects";
import { Star, MapPin, BadgeCheck, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImg from "@/assets/hero.jpg";

export const Route = createFileRoute("/architect/$id")({
  loader: ({ params }) => {
    const a = architects.find((x) => x.id === params.id);
    if (!a) throw notFound();
    return a;
  },
  head: ({ loaderData }) => ({
    meta: [{ title: `${loaderData?.name ?? "Architecte"} — Second Plan` }],
  }),
  errorComponent: ({ error }) => <div className="container-page py-20">Erreur : {error.message}</div>,
  notFoundComponent: () => <div className="container-page py-20">Architecte introuvable.</div>,
  component: ProfilePage,
});

function ProfilePage() {
  const a = Route.useLoaderData();
  return (
    <div className="container-page py-12">
      <div className="grid lg:grid-cols-[1fr_360px] gap-10">
        <div>
          <div className="flex items-start gap-5">
            <img src={a.photo} alt={a.name} className="h-24 w-24 rounded-2xl object-cover" />
            <div>
              <h1 className="font-display text-3xl flex items-center gap-2">{a.name} {a.verified && <BadgeCheck className="h-5 w-5 text-primary" />}</h1>
              <div className="text-muted-foreground">{a.title}</div>
              <div className="mt-2 flex items-center gap-4 text-sm">
                <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" /> {a.city}</span>
                <span className="flex items-center gap-1"><Star className="h-3.5 w-3.5 fill-terracotta text-terracotta" /> {a.rating} · {a.visits} visites</span>
              </div>
            </div>
          </div>

          <section className="mt-10">
            <h2 className="font-display text-2xl mb-3">À propos</h2>
            <p className="text-muted-foreground">{a.bio}</p>
          </section>

          <section className="mt-10">
            <h2 className="font-display text-2xl mb-3">Expertises</h2>
            <div className="flex flex-wrap gap-2">
              {a.tags.map((t: string) => <span key={t} className="text-sm px-3 py-1 rounded-full bg-secondary">{t}</span>)}
            </div>
          </section>

          <section className="mt-10">
            <h2 className="font-display text-2xl mb-3">Réalisations</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <img key={i} src={heroImg} alt="" className="rounded-xl object-cover aspect-[4/3]" />
              ))}
            </div>
          </section>

          <section className="mt-10">
            <h2 className="font-display text-2xl mb-3">Avis clients</h2>
            <div className="space-y-4">
              {[
                { n: "Claire", t: "Visite très claire, recommandations concrètes. Décision facilitée." },
                { n: "Thomas", t: "Pro, ponctuel, pédagogue. Parfait pour notre projet de rénovation." },
              ].map((r) => (
                <div key={r.n} className="rounded-xl border border-border bg-card p-5">
                  <div className="flex items-center gap-2 text-sm"><Star className="h-4 w-4 fill-terracotta text-terracotta" /> 5.0 · {r.n}</div>
                  <p className="mt-2 text-sm text-muted-foreground">{r.t}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        <aside className="lg:sticky lg:top-24 self-start rounded-2xl border border-border bg-card p-6 h-fit">
          <div className="text-sm text-muted-foreground">À partir de</div>
          <div className="font-display text-3xl">{a.startingPrice} €</div>
          <div className="mt-1 text-sm text-primary flex items-center gap-1"><Calendar className="h-3.5 w-3.5" /> {a.availability}</div>
          <Button asChild className="mt-5 w-full rounded-full"><Link to="/booking">Réserver une visite</Link></Button>
          <ul className="mt-5 text-sm space-y-2 text-muted-foreground">
            <li>✓ Visite sur place ou en visio</li>
            <li>✓ Compte rendu après visite</li>
            <li>✓ Paiement sécurisé</li>
          </ul>
        </aside>
      </div>
    </div>
  );
}
