import { createFileRoute, Link } from "@tanstack/react-router";
import { Section } from "@/components/site/Section";
import { OfferCard, offers } from "@/components/site/OfferCard";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/offres")({
  head: () => ({ meta: [{ title: "Nos offres — Second Plan" }] }),
  component: OffersPage,
});

function OffersPage() {
  return (
    <>
      <Section eyebrow="Nos offres" title="Trois formats pour trois moments clés" intro="Choisissez le niveau d’accompagnement qui correspond à votre projet.">
        <div className="grid md:grid-cols-3 gap-6">
          {offers.map((o) => <OfferCard key={o.name} o={o} />)}
        </div>
      </Section>
      <Section className="bg-secondary/40" title="Comparer les offres">
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="text-left">
                <th className="py-3 pr-4"></th>
                {offers.map((o) => <th key={o.name} className="py-3 pr-4 font-display text-lg">{o.name}</th>)}
              </tr>
            </thead>
            <tbody className="[&>tr]:border-t [&>tr]:border-border">
              {[
                ["Durée", ["45 min – 1h", "1h30", "2h – 3h"]],
                ["Format", ["Place ou visio", "Sur place", "Sur place"]],
                ["Compte rendu", ["—", "Synthèse orale", "Compte rendu écrit"]],
                ["Estimation budget", ["—", "Macro", "Première enveloppe"]],
                ["Prix", ["190 €", "350 €", "700 €"]],
              ].map(([k, v]) => (
                <tr key={k as string}>
                  <td className="py-3 pr-4 text-muted-foreground">{k}</td>
                  {(v as string[]).map((cell, i) => <td key={i} className="py-3 pr-4">{cell}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-8">
          <Button asChild className="rounded-full"><Link to="/booking">Réserver une visite</Link></Button>
        </div>
      </Section>
    </>
  );
}
