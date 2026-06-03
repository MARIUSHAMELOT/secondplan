import { createFileRoute, Link } from "@tanstack/react-router";
import { Section } from "@/components/site/Section";
import { Button } from "@/components/ui/button";
import { Building2, TrendingUp, ShieldCheck, Sparkles, Handshake } from "lucide-react";

export const Route = createFileRoute("/agents")({
  head: () => ({ meta: [{ title: "Pour les agents immobiliers — Second Plan" }] }),
  component: AgentsPage,
});

function AgentsPage() {
  return (
    <>
      <Section eyebrow="Agents immobiliers" title="Un outil simple pour aider vos clients à se projeter." intro="Second Plan permet aux agents immobiliers de proposer rapidement une visite conseil avec un architecte, pour débloquer une vente, rassurer un acheteur ou valoriser un bien avec potentiel.">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {[
            { i: Building2, t: "Aider les acheteurs à se projeter", d: "Un regard pro qui révèle le potentiel du bien." },
            { i: TrendingUp, t: "Accélérer la décision d’achat", d: "Lever les doutes techniques en une seule visite." },
            { i: Sparkles, t: "Valoriser les biens avec travaux", d: "Donnez à voir ce qu’il est possible de faire." },
            { i: ShieldCheck, t: "Rassurer sur les contraintes", d: "Une lecture claire des points de vigilance." },
            { i: Handshake, t: "Service premium intégré", d: "Un partenariat fluide avec votre agence." },
          ].map(({ i: Icon, t, d }) => (
            <div key={t} className="rounded-2xl border border-border bg-card p-6">
              <Icon className="h-6 w-6 text-primary" />
              <div className="mt-3 font-medium">{t}</div>
              <p className="text-sm text-muted-foreground mt-1">{d}</p>
            </div>
          ))}
        </div>
        <div className="mt-10">
          <Button asChild className="rounded-full"><Link to="/booking">Découvrir l’offre agences</Link></Button>
        </div>
      </Section>
    </>
  );
}
