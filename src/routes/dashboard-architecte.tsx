import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/dashboard-architecte")({
  head: () => ({ meta: [{ title: "Espace architecte — Second Plan" }] }),
  component: Dashboard,
});

function Dashboard() {
  return (
    <div className="container-page py-12">
      <h1 className="font-display text-3xl">Bonjour Camille</h1>
      <p className="text-muted-foreground mt-1">Gérez vos demandes, votre agenda et vos tarifs.</p>

      <div className="mt-10 grid lg:grid-cols-3 gap-6">
        {[
          { l: "Demandes en attente", n: "4" },
          { l: "Visites cette semaine", n: "3" },
          { l: "Revenus du mois", n: "1 840 €" },
        ].map((c) => (
          <div key={c.l} className="rounded-2xl border border-border bg-card p-6">
            <div className="text-sm text-muted-foreground">{c.l}</div>
            <div className="font-display text-3xl mt-1">{c.n}</div>
          </div>
        ))}
      </div>

      <div className="mt-10 grid lg:grid-cols-2 gap-6">
        <div className="rounded-2xl border border-border bg-card p-6">
          <h2 className="font-display text-xl">Nouvelles demandes</h2>
          <ul className="mt-4 space-y-3 text-sm">
            {[
              { c: "Claire D.", a: "Paris 11e · Appartement 65m²", o: "Visite Conseil" },
              { c: "Marc B.", a: "Paris 18e · Appartement 42m²", o: "Visite Express" },
            ].map((r) => (
              <li key={r.c} className="rounded-xl bg-secondary/50 p-4 flex items-center justify-between">
                <div>
                  <div className="font-medium">{r.c} — {r.o}</div>
                  <div className="text-muted-foreground">{r.a}</div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="rounded-full">Refuser</Button>
                  <Button size="sm" className="rounded-full">Accepter</Button>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6">
          <h2 className="font-display text-xl">Agenda</h2>
          <ul className="mt-4 space-y-3 text-sm">
            {[
              "Mar. 14 · 10h00 — Visite Conseil · Paris 11e",
              "Mer. 15 · 16h30 — Visite Express · Paris 9e",
              "Jeu. 16 · 11h00 — Visite Projet · Vincennes",
            ].map((s) => (
              <li key={s} className="rounded-xl bg-secondary/50 p-4">{s}</li>
            ))}
          </ul>
          <Button variant="outline" className="mt-5 rounded-full w-full">Modifier mes disponibilités</Button>
        </div>
      </div>
    </div>
  );
}
