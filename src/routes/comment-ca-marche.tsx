import { createFileRoute, Link } from "@tanstack/react-router";
import { Section } from "@/components/site/Section";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/comment-ca-marche")({
  head: () => ({ meta: [{ title: "Comment ça marche — Second Plan" }] }),
  component: HowPage,
});

const steps = [
  { t: "Décrivez votre besoin", d: "Localisation, type de bien et type de visite conseil." },
  { t: "Choisissez votre architecte", d: "Comparez profils, expertises, avis, prix et disponibilités." },
  { t: "Réservez votre visite", d: "Réservez un créneau et payez en ligne en toute sécurité." },
  { t: "Recevez un avis professionnel", d: "L’architecte visite le bien avec vous et vous aide à comprendre le potentiel, les risques et les étapes." },
];

function HowPage() {
  return (
    <Section eyebrow="Comment ça marche" title="Quatre étapes simples pour une décision plus sereine.">
      <ol className="space-y-5">
        {steps.map((s, i) => (
          <li key={s.t} className="grid grid-cols-[64px_1fr] gap-4 items-start rounded-2xl border border-border bg-card p-6">
            <div className="font-display text-4xl text-terracotta">0{i + 1}</div>
            <div>
              <div className="font-display text-2xl">{s.t}</div>
              <p className="text-muted-foreground mt-1">{s.d}</p>
            </div>
          </li>
        ))}
      </ol>
      <div className="mt-10">
        <Button asChild className="rounded-full"><Link to="/booking">Réserver une visite</Link></Button>
      </div>
    </Section>
  );
}
