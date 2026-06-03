import { Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, UserCircle, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";

const nav = [
  { to: "/search", label: "Trouver un architecte" },
  { to: "/offres", label: "Nos offres" },
  { to: "/agents", label: "Pour les agents immobiliers" },
  { to: "/architectes", label: "Pour les architectes" },
  { to: "/comment-ca-marche", label: "Comment ça marche" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  async function handleSignOut() {
    await signOut();
    navigate({ to: "/" });
  }

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
          {user ? (
            <div className="relative">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="flex items-center gap-2 text-sm text-foreground/80 hover:text-primary transition-colors"
              >
                <UserCircle className="h-5 w-5" />
                <span>{user.user_metadata?.name || user.email?.split("@")[0]}</span>
              </button>
              {menuOpen && (
                <div className="absolute right-0 top-8 w-48 rounded-xl border border-border bg-card shadow-lg py-1 z-50">
                  <Link
                    to="/dashboard"
                    onClick={() => setMenuOpen(false)}
                    className="block px-4 py-2 text-sm hover:bg-secondary transition-colors"
                  >
                    Mon espace
                  </Link>
                  <Link
                    to="/profil-architecte"
                    onClick={() => setMenuOpen(false)}
                    className="block px-4 py-2 text-sm hover:bg-secondary transition-colors"
                  >
                    Mon profil
                  </Link>
                  <hr className="my-1 border-border" />
                  <button
                    onClick={handleSignOut}
                    className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-secondary transition-colors flex items-center gap-2"
                  >
                    <LogOut className="h-3.5 w-3.5" /> Déconnexion
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="text-sm text-foreground/80 hover:text-primary">Connexion</Link>
          )}
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
            {user ? (
              <>
                <Link to="/dashboard" onClick={() => setOpen(false)} className="py-1 text-sm">Mon espace</Link>
                <button onClick={handleSignOut} className="py-1 text-sm text-left text-red-500">Déconnexion</button>
              </>
            ) : (
              <Link to="/login" onClick={() => setOpen(false)} className="py-1 text-sm">Connexion</Link>
            )}
            <Button asChild className="rounded-full mt-2"><Link to="/booking">Réserver une visite</Link></Button>
          </div>
        </div>
      )}
    </header>
  );
}
