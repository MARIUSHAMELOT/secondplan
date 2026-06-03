import { Link } from "@tanstack/react-router";
import { Star, MapPin, BadgeCheck } from "lucide-react";
import type { Architect } from "@/data/architects";
import { Button } from "@/components/ui/button";

export function ArchitectCard({ a }: { a: Architect }) {
  return (
    <article className="group bg-card border border-border rounded-2xl overflow-hidden hover:shadow-md transition-all hover:-translate-y-0.5">
      <div className="aspect-[4/3] overflow-hidden bg-secondary">
        <img src={a.photo} alt={a.name} loading="lazy" className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500" />
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="font-display text-xl leading-tight flex items-center gap-1.5">
              {a.name}
              {a.verified && <BadgeCheck className="h-4 w-4 text-primary" />}
            </h3>
            <p className="text-sm text-muted-foreground">{a.title}</p>
          </div>
          <div className="flex items-center gap-1 text-sm">
            <Star className="h-4 w-4 fill-terracotta text-terracotta" />
            <span className="font-medium">{a.rating}</span>
            <span className="text-muted-foreground">({a.visits})</span>
          </div>
        </div>

        <div className="mt-2 flex items-center gap-1 text-sm text-muted-foreground">
          <MapPin className="h-3.5 w-3.5" /> {a.city}
        </div>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {a.tags.slice(0, 3).map((t) => (
            <span key={t} className="text-xs px-2.5 py-1 rounded-full bg-secondary text-secondary-foreground">{t}</span>
          ))}
        </div>

        <div className="mt-4 flex items-end justify-between">
          <div>
            <div className="text-xs text-muted-foreground">À partir de</div>
            <div className="font-display text-2xl">{a.startingPrice} €</div>
            <div className="text-xs text-primary mt-0.5">{a.availability}</div>
          </div>
          <Button asChild variant="outline" className="rounded-full">
            <Link to="/architect/$id" params={{ id: a.id }}>Voir le profil</Link>
          </Button>
        </div>
      </div>
    </article>
  );
}
