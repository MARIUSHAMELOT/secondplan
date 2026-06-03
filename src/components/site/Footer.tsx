import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border/60 bg-secondary/40">
      <div className="container-page py-14 grid gap-10 md:grid-cols-4 text-sm">
        <div>
          <div className="font-display text-lg text-primary">Second Plan</div>
          <p className="mt-3 text-muted-foreground">
            L’expertise d’un architecte, au moment clé de la visite immobilière.
          </p>
        </div>
        <FooterCol title="Plateforme" links={[
          { to: "/search", label: "Trouver un architecte" },
          { to: "/offres", label: "Nos offres" },
          { to: "/comment-ca-marche", label: "Comment ça marche" },
        ]} />
        <FooterCol title="Professionnels" links={[
          { to: "/agents", label: "Agents immobiliers" },
          { to: "/architectes", label: "Architectes" },
        ]} />
        <FooterCol title="Compte" links={[
          { to: "/login", label: "Connexion" },
          { to: "/dashboard", label: "Espace client" },
          { to: "/dashboard-architecte", label: "Espace architecte" },
        ]} />
      </div>
      <div className="border-t border-border/60">
        <div className="container-page py-5 text-xs text-muted-foreground flex flex-wrap justify-between gap-2">
          <span>© {new Date().getFullYear()} Second Plan. Tous droits réservés.</span>
          <span>Fait avec soin en France.</span>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: { to: string; label: string }[] }) {
  return (
    <div>
      <div className="font-medium text-foreground">{title}</div>
      <ul className="mt-3 space-y-2 text-muted-foreground">
        {links.map((l) => (
          <li key={l.to}><Link to={l.to} className="hover:text-primary">{l.label}</Link></li>
        ))}
      </ul>
    </div>
  );
}
