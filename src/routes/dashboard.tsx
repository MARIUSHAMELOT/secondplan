import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Calendar, MessageSquare, FileText, Star } from "lucide-react";

export const Route = createFileRoute("/dashboard")({
  head: () => ({ meta: [{ title: "Mon espace — Second Plan" }] }),
  component: Dashboard,
});

function Dashboard() {
  return (
    <div className="container-page py-12">
      <h1 className="font-display text-3xl">Bonjour Claire 👋</h1>
      <p className="text-muted-foreground mt-1">Voici un aperçu de vos visites et messages.</p>

      <div className="mt-10 grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 rounded-2xl border border-border bg-card p-6">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-xl">Prochaine visite</h2>
            <Button asChild variant="outline" size="sm" className="rounded-full"><Link to="/search">Nouvelle réservation</Link></Button>
          </div>
          <div className="mt-5 rounded-xl bg-secondary/50 p-5">
            <div className="text-sm text-muted-foreground">Mardi 14 mai · 10h00</div>
            <div className="font-display text-2xl mt-1">Camille Martin · Paris 11e</div>
            <div className="text-sm mt-1">Visite Conseil — 3 rue Oberkampf</div>
            <div className="mt-4 flex gap-2">
              <Button size="sm" variant="outline" className="rounded-full gap-1"><MessageSquare className="h-3.5 w-3.5" /> Message</Button>
              <Button size="sm" variant="outline" className="rounded-full gap-1"><Calendar className="h-3.5 w-3.5" /> Modifier</Button>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6">
          <h2 className="font-display text-xl">Actions</h2>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="flex gap-2 items-start"><FileText className="h-4 w-4 mt-0.5 text-primary" /> Télécharger le compte rendu</li>
            <li className="flex gap-2 items-start"><Star className="h-4 w-4 mt-0.5 text-primary" /> Laisser un avis sur Camille</li>
            <li className="flex gap-2 items-start"><MessageSquare className="h-4 w-4 mt-0.5 text-primary" /> Contacter le support</li>
          </ul>
        </div>
      </div>

      <div className="mt-10">
        <h2 className="font-display text-xl mb-4">Historique</h2>
        <div className="rounded-2xl border border-border bg-card divide-y divide-border">
          {[
            { date: "12 mars", arch: "Hugo Bernard", offer: "Visite Express", status: "Terminée" },
            { date: "2 février", arch: "Sarah Benali", offer: "Visite Projet", status: "Terminée" },
          ].map((r) => (
            <div key={r.date} className="p-5 flex items-center justify-between text-sm">
              <div>
                <div className="font-medium">{r.arch} · {r.offer}</div>
                <div className="text-muted-foreground">{r.date}</div>
              </div>
              <span className="text-xs px-2.5 py-1 rounded-full bg-secondary">{r.status}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
