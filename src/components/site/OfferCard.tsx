import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";

export type Offer = {
  name: string;
  price: string;
  description: string;
  includes: string[];
  duration: string;
  featured?: boolean;
};

export function OfferCard({ o }: { o: Offer }) {
  return (
    <div className={`rounded-2xl border p-7 flex flex-col bg-card ${o.featured ? "border-primary shadow-md ring-1 ring-primary/10" : "border-border"}`}>
      {o.featured && (
        <span className="self-start text-xs px-2.5 py-1 rounded-full bg-terracotta text-terracotta-foreground mb-3">
          Le plus populaire
        </span>
      )}
      <h3 className="font-display text-2xl">{o.name}</h3>
      <div className="mt-1 text-primary font-medium">{o.price}</div>
      <p className="mt-3 text-sm text-muted-foreground">{o.description}</p>
      <ul className="mt-5 space-y-2.5 text-sm">
        {o.includes.map((i) => (
          <li key={i} className="flex gap-2"><Check className="h-4 w-4 mt-0.5 text-primary shrink-0" /><span>{i}</span></li>
        ))}
      </ul>
      <div className="mt-5 text-xs text-muted-foreground">{o.duration}</div>
      <Button asChild className="mt-6 rounded-full" variant={o.featured ? "default" : "outline"}>
        <Link to="/booking">Réserver cette offre</Link>
      </Button>
    </div>
  );
}

export const offers: Offer[] = [
  {
    name: "Visite Express",
    price: "À partir de 190 €",
    description: "Un avis rapide pour valider le potentiel d’un bien avant de faire une offre.",
    includes: [
      "Visite sur place ou en visio",
      "Avis oral de l’architecte",
      "Identification des points de vigilance",
    ],
    duration: "Durée indicative : 45 min à 1h",
  },
  {
    name: "Visite Conseil",
    price: "À partir de 350 €",
    description: "L’offre idéale pour comprendre les possibilités d’aménagement, les contraintes techniques et les grandes masses de budget.",
    includes: [
      "Visite du bien avec un architecte",
      "Analyse du potentiel",
      "Premiers conseils d’aménagement",
      "Estimation macro des travaux",
    ],
    duration: "Durée indicative : 1h30",
    featured: true,
  },
  {
    name: "Visite Projet",
    price: "À partir de 700 €",
    description: "Pour les projets avec rénovation importante, investissement ou transformation du bien.",
    includes: [
      "Analyse approfondie",
      "Scénarios d’aménagement",
      "Points techniques clés",
      "Première enveloppe budgétaire",
      "Compte rendu synthétique",
    ],
    duration: "Durée indicative : 2h à 3h",
  },
];
