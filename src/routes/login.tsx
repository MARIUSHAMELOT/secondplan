import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Connexion — Second Plan" }] }),
  component: Login,
});

function Login() {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [signupSuccess, setSignupSuccess] = useState(false);
  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (mode === "login") {
      const { error } = await signIn(email, password);
      if (error) {
        setError("Email ou mot de passe incorrect.");
      } else {
        navigate({ to: "/dashboard" });
      }
    } else {
      const { error } = await signUp(email, password, name);
      if (error) {
        setError(error);
      } else {
        setSignupSuccess(true);
      }
    }
    setLoading(false);
  }

  if (signupSuccess) {
    return (
      <div className="container-page py-16 max-w-md text-center">
        <div className="rounded-2xl border border-border bg-card p-8">
          <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">✉️</span>
          </div>
          <h2 className="font-display text-2xl">Vérifiez vos emails</h2>
          <p className="text-muted-foreground mt-2 text-sm">
            Un lien de confirmation a été envoyé à <strong>{email}</strong>. Cliquez dessus pour activer votre compte.
          </p>
          <button
            onClick={() => { setMode("login"); setSignupSuccess(false); }}
            className="mt-6 text-sm text-primary"
          >
            Retour à la connexion
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container-page py-16 max-w-md">
      <h1 className="font-display text-3xl">{mode === "login" ? "Connexion" : "Créer un compte"}</h1>
      <p className="text-muted-foreground mt-2 text-sm">Accédez à votre espace Second Plan.</p>
      <form className="mt-8 space-y-4 rounded-2xl border border-border bg-card p-6" onSubmit={handleSubmit}>
        {mode === "signup" && (
          <div>
            <Label>Nom complet</Label>
            <Input
              className="mt-1"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Camille Martin"
            />
          </div>
        )}
        <div>
          <Label>Email</Label>
          <Input
            type="email"
            className="mt-1"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="vous@exemple.fr"
          />
        </div>
        <div>
          <Label>Mot de passe</Label>
          <Input
            type="password"
            className="mt-1"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="••••••••"
          />
        </div>
        {error && (
          <p className="text-sm text-red-500 bg-red-50 rounded-lg px-3 py-2">{error}</p>
        )}
        <Button type="submit" className="w-full rounded-full mt-2" disabled={loading}>
          {loading ? "Chargement..." : mode === "login" ? "Se connecter" : "Créer mon compte"}
        </Button>
        <button
          type="button"
          onClick={() => { setMode(mode === "login" ? "signup" : "login"); setError(null); }}
          className="block text-sm text-primary mx-auto mt-2"
        >
          {mode === "login" ? "Pas encore de compte ? Créer un compte" : "Déjà inscrit ? Se connecter"}
        </button>
      </form>
    </div>
  );
}
