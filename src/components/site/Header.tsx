import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const nav = [
  { to: "/search", label: "Trouver un architecte" },
  { to: "/offres", label: "Nos offres" },
  { to: "/agents", label: "Pour les agents immobiliers" },
  { to: "/architectes", label: "Pour les architectes" },
  { to: "/comment-ca-marche", label: "Comment ça marche" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur">
      <div className="container-page flex h-16 items-center justify-between gap-6">
        <Link to="/" className="flex items-center gap-2 font-display text-xl tracking-tight text-primary">
          <span className="inline-block h-5 w-5 rounded-sm bg-primary" />
          Second Plan
        </Link>
        <nav className="hidden lg:flex items-center gap-7 text-sm text-foreground/80">
          {nav.map((n) => (
            <Link key={n.to} to={n.to} className="hover:text-primary transition-colors" activeProps={{ className: "text-primary" }}>
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="hidden lg:flex items-center gap-3">
          <Link to="/login" className="text-sm text-foreground/80 hover:text-primary">Connexion</Link>
          <Button asChild className="rounded-full">
            <Link to="/booking">Réserver une visite</Link>
          </Button>
        </div>
        <button className="lg:hidden p-2" onClick={() => setOpen(!open)} aria-label="Menu">
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      {open && (
        <div className="lg:hidden border-t border-border/60 bg-background">
          <div className="container-page py-4 flex flex-col gap-3">
            {nav.map((n) => (
              <Link key={n.to} to={n.to} onClick={() => setOpen(false)} className="py-1 text-sm">
                {n.label}
              </Link>
            ))}
            <Link to="/login" onClick={() => setOpen(false)} className="py-1 text-sm">Connexion</Link>
            <Button asChild className="rounded-full mt-2"><Link to="/booking">Réserver une visite</Link></Button>
          </div>
        </div>
      )}
    </header>
  );
}
