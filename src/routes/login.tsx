import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Connexion — Second Plan" }] }),
  component: Login,
});

function Login() {
  const [mode, setMode] = useState<"login" | "signup">("login");
  return (
    <div className="container-page py-16 max-w-md">
      <h1 className="font-display text-3xl">{mode === "login" ? "Connexion" : "Créer un compte"}</h1>
      <p className="text-muted-foreground mt-2 text-sm">Accédez à votre espace Second Plan.</p>
      <form className="mt-8 space-y-4 rounded-2xl border border-border bg-card p-6" onSubmit={(e) => e.preventDefault()}>
        {mode === "signup" && (
          <div><Label>Nom complet</Label><Input className="mt-1" /></div>
        )}
        <div><Label>Email</Label><Input type="email" className="mt-1" /></div>
        <div><Label>Mot de passe</Label><Input type="password" className="mt-1" /></div>
        <Button asChild className="w-full rounded-full mt-2"><Link to="/dashboard">{mode === "login" ? "Se connecter" : "Créer mon compte"}</Link></Button>
        <button type="button" onClick={() => setMode(mode === "login" ? "signup" : "login")} className="block text-sm text-primary mx-auto mt-2">
          {mode === "login" ? "Pas encore de compte ? Créer un compte" : "Déjà inscrit ? Se connecter"}
        </button>
      </form>
    </div>
  );
}
