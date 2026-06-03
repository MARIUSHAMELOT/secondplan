import { MapPin, Calendar, Briefcase, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "@tanstack/react-router";

export function SearchBar({ compact = false }: { compact?: boolean }) {
  const navigate = useNavigate();
  return (
    <form
      onSubmit={(e) => { e.preventDefault(); navigate({ to: "/search" }); }}
      className={`bg-card border border-border rounded-2xl shadow-sm grid gap-2 p-2 ${compact ? "md:grid-cols-[1.3fr_1fr_1fr_auto]" : "md:grid-cols-[1.3fr_1fr_1fr_auto]"}`}
    >
      <Field icon={<MapPin className="h-4 w-4" />} label="Où" placeholder="Ville, code postal, quartier" />
      <Field icon={<Briefcase className="h-4 w-4" />} label="Type de visite" placeholder="Express, Conseil, Projet" />
      <Field icon={<Calendar className="h-4 w-4" />} label="Date" placeholder="Choisir une date" type="text" />
      <Button type="submit" size="lg" className="rounded-xl h-full px-6 gap-2">
        <Search className="h-4 w-4" /> Rechercher
      </Button>
    </form>
  );
}

function Field({ icon, label, placeholder, type = "text" }: { icon: React.ReactNode; label: string; placeholder: string; type?: string }) {
  return (
    <label className="flex items-center gap-3 px-4 py-2 rounded-xl hover:bg-secondary/60 transition-colors cursor-text">
      <span className="text-muted-foreground">{icon}</span>
      <span className="flex flex-col flex-1 min-w-0">
        <span className="text-[11px] uppercase tracking-wider text-muted-foreground">{label}</span>
        <input
          type={type}
          placeholder={placeholder}
          className="bg-transparent outline-none text-sm placeholder:text-muted-foreground/70"
        />
      </span>
    </label>
  );
}
