import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/hooks/use-auth";
import { Camera, Plus, X, Check } from "lucide-react";

export const Route = createFileRoute("/profil-architecte")({
  head: () => ({ meta: [{ title: "Mon profil — Second Plan" }] }),
  component: ProfilArchitecte,
});

const EXPERTISES = [
  "Appartement", "Maison", "Rénovation", "Aménagement intérieur",
  "Estimation travaux", "Rénovation énergétique", "Extension", "Surélévation",
  "Bien atypique", "Local commercial", "Hôtellerie / restauration", "Bureaux",
  "Commerce", "Investissement locatif", "Copropriété", "Permis / urbanisme",
  "Réagencement", "Optimisation d'espace", "Patrimoine / ancien", "Péniche",
];

const SERVICES = [
  "Visite conseil express (1h)",
  "Visite conseil approfondie (2-3h)",
  "Estimation travaux",
  "Avis avant offre",
  "Pack achat intelligent",
  "Audit énergétique express",
  "Visite avec rapport écrit",
];

function ProfilArchitecte() {
  const { user } = useAuth();
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [realisations, setRealisations] = useState<string[]>([]);

  const [form, setForm] = useState({
    name: "",
    title: "",
    city: "",
    bio: "",
    expertises: [] as string[],
    services: [] as string[],
    availability_notes: "",
    starting_price: "",
  });

  function toggleExpertise(e: string) {
    setForm((f) => ({
      ...f,
      expertises: f.expertises.includes(e)
        ? f.expertises.filter((x) => x !== e)
        : [...f.expertises, e],
    }));
  }

  function toggleService(s: string) {
    setForm((f) => ({
      ...f,
      services: f.services.includes(s)
        ? f.services.filter((x) => x !== s)
        : [...f.services, s],
    }));
  }

  function handlePhotoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) setPhotoPreview(URL.createObjectURL(file));
  }

  function handleRealisationAdd(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) setRealisations((r) => [...r, URL.createObjectURL(file)]);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      const { error } = await supabase.from("architect_profiles").upsert({
        user_id: user?.id,
        name: form.name,
        title: form.title,
        city: form.city,
        bio: form.bio,
        expertises: form.expertises,
        services: form.services,
        availability_notes: form.availability_notes,
        starting_price: form.starting_price ? parseInt(form.starting_price) : null,
        updated_at: new Date().toISOString(),
      }, { onConflict: "user_id" });
      if (error) throw error;
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      console.error(err);
      alert("Erreur lors de la sauvegarde. Vérifiez votre connexion.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="container-page py-12 max-w-3xl">
      <h1 className="font-display text-3xl">Mon profil</h1>
      <p className="text-muted-foreground mt-1">Ces informations apparaîtront sur votre page publique.</p>

      <form onSubmit={handleSubmit} className="mt-10 space-y-10">

        {/* Photo de profil */}
        <section>
          <h2 className="font-medium text-lg mb-4">Photo de profil</h2>
          <div className="flex items-center gap-6">
            <div className="h-24 w-24 rounded-full border-2 border-border bg-secondary flex items-center justify-center overflow-hidden">
              {photoPreview
                ? <img src={photoPreview} className="w-full h-full object-cover" alt="profil" />
                : <Camera className="h-8 w-8 text-muted-foreground" />}
            </div>
            <label className="cursor-pointer">
              <input type="file" accept="image/*" className="hidden" onChange={handlePhotoChange} />
              <span className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm hover:bg-secondary transition-colors">
                Choisir une photo
              </span>
            </label>
          </div>
        </section>

        {/* Informations générales */}
        <section className="space-y-4">
          <h2 className="font-medium text-lg">Informations générales</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium block mb-1.5">Nom complet *</label>
              <input
                required
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                placeholder="Camille Martin"
              />
            </div>
            <div>
              <label className="text-sm font-medium block mb-1.5">Titre professionnel</label>
              <input
                value={form.title}
                onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                placeholder="Architecte HMONP"
              />
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium block mb-1.5">Ville *</label>
              <input
                required
                value={form.city}
                onChange={(e) => setForm((f) => ({ ...f, city: e.target.value }))}
                className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                placeholder="Paris"
              />
            </div>
            <div>
              <label className="text-sm font-medium block mb-1.5">Tarif de départ (€)</label>
              <input
                type="number"
                value={form.starting_price}
                onChange={(e) => setForm((f) => ({ ...f, starting_price: e.target.value }))}
                className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                placeholder="250"
              />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium block mb-1.5">Description *</label>
            <textarea
              required
              value={form.bio}
              onChange={(e) => setForm((f) => ({ ...f, bio: e.target.value }))}
              rows={4}
              className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"
              placeholder="Décrivez votre expérience, votre approche et ce que vous apportez lors d'une visite conseil..."
            />
          </div>
        </section>

        {/* Expertises */}
        <section>
          <h2 className="font-medium text-lg mb-1">Expertises</h2>
          <p className="text-sm text-muted-foreground mb-4">Sélectionnez les types de biens et missions sur lesquels vous intervenez.</p>
          <div className="flex flex-wrap gap-2">
            {EXPERTISES.map((e) => (
              <button
                key={e}
                type="button"
                onClick={() => toggleExpertise(e)}
                className={`rounded-full px-3 py-1.5 text-sm border transition-colors ${
                  form.expertises.includes(e)
                    ? "bg-primary text-primary-foreground border-primary"
                    : "border-border hover:border-primary/50 hover:bg-secondary"
                }`}
              >
                {e}
              </button>
            ))}
          </div>
        </section>

        {/* Prestations */}
        <section>
          <h2 className="font-medium text-lg mb-1">Prestations proposées</h2>
          <p className="text-sm text-muted-foreground mb-4">Quels types de visites proposez-vous ?</p>
          <div className="space-y-2">
            {SERVICES.map((s) => (
              <label key={s} className="flex items-center gap-3 cursor-pointer group">
                <div
                  onClick={() => toggleService(s)}
                  className={`h-5 w-5 rounded flex items-center justify-center border transition-colors cursor-pointer ${
                    form.services.includes(s)
                      ? "bg-primary border-primary"
                      : "border-border group-hover:border-primary/50"
                  }`}
                >
                  {form.services.includes(s) && <Check className="h-3 w-3 text-primary-foreground" />}
                </div>
                <span className="text-sm">{s}</span>
              </label>
            ))}
          </div>
        </section>

        {/* Photos de réalisations */}
        <section>
          <h2 className="font-medium text-lg mb-1">Photos de réalisations</h2>
          <p className="text-sm text-muted-foreground mb-4">Ajoutez des photos de vos projets pour illustrer votre profil.</p>
          <div className="grid grid-cols-3 gap-3">
            {realisations.map((url, i) => (
              <div key={i} className="relative aspect-square rounded-xl overflow-hidden border border-border">
                <img src={url} className="w-full h-full object-cover" alt={`réalisation ${i + 1}`} />
                <button
                  type="button"
                  onClick={() => setRealisations((r) => r.filter((_, j) => j !== i))}
                  className="absolute top-1.5 right-1.5 h-6 w-6 rounded-full bg-black/60 flex items-center justify-center"
                >
                  <X className="h-3.5 w-3.5 text-white" />
                </button>
              </div>
            ))}
            {realisations.length < 6 && (
              <label className="aspect-square rounded-xl border-2 border-dashed border-border flex flex-col items-center justify-center cursor-pointer hover:border-primary/50 hover:bg-secondary/50 transition-colors">
                <input type="file" accept="image/*" className="hidden" onChange={handleRealisationAdd} />
                <Plus className="h-6 w-6 text-muted-foreground" />
                <span className="text-xs text-muted-foreground mt-1">Ajouter</span>
              </label>
            )}
          </div>
        </section>

        {/* Disponibilités */}
        <section>
          <h2 className="font-medium text-lg mb-1">Disponibilités</h2>
          <p className="text-sm text-muted-foreground mb-4">Indiquez vos créneaux habituels et délais de réponse.</p>
          <textarea
            value={form.availability_notes}
            onChange={(e) => setForm((f) => ({ ...f, availability_notes: e.target.value }))}
            rows={3}
            className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"
            placeholder="Ex : Disponible en semaine de 9h à 18h, sous 48h en général. Week-end sur demande."
          />
        </section>

        {/* Submit */}
        <div className="flex items-center gap-4 pt-2">
          <Button type="submit" className="rounded-full px-8" disabled={saving}>
            {saving ? "Sauvegarde..." : "Sauvegarder le profil"}
          </Button>
          {saved && (
            <span className="flex items-center gap-1.5 text-sm text-green-600">
              <Check className="h-4 w-4" /> Profil sauvegardé
            </span>
          )}
        </div>
      </form>
    </div>
  );
}
