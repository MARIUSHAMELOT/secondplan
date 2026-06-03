import { createFileRoute, Link } from "@tanstack/react-router";
import { Section } from "@/components/site/Section";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/architectes")({
  head: () => ({ meta: [{ title: "Pour les architectes — Second Plan" }] }),
  component: ArchitectesPage,
});

function ArchitectesPage() {
  return (
    <Section
      eyebrow="Architectes"
      title="Développez votre activité avec des missions courtes et qualifiées."
      intro="Rejoignez Second Plan pour recevoir des demandes de visites conseils près de chez vous, fixer vos tarifs et transformer certaines visites en missions complètes."
    >
      <div className="grid md:grid-cols-2 gap-5">
        {[
          "Recevoir des demandes qualifiées",
          "Choisir vos disponibilités",
          "Fixer vos prix",
          "Être payé simplement",
          "Développer votre visibilité locale",
          "Accéder à de futurs projets de rénovation",
        ].map((b) => (
          <div key={b} className="rounded-2xl border border-border bg-card p-6">
            <div className="font-medium">{b}</div>
          </div>
        ))}
      </div>
      <div className="mt-10">
        <Button asChild className="rounded-full"><Link to="/login">Créer mon profil architecte</Link></Button>
      </div>
    </Section>
  );
}
