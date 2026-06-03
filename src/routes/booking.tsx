import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Check } from "lucide-react";
import { offers } from "@/components/site/OfferCard";
import { toast } from "sonner";

export const Route = createFileRoute("/booking")({
  head: () => ({ meta: [{ title: "Réserver une visite — Second Plan" }] }),
  component: Booking,
});

const stepsLabels = ["Offre", "Adresse", "Date", "Projet", "Confirmation"];

function Booking() {
  const [step, setStep] = useState(0);
  const [offer, setOffer] = useState(offers[1].name);

  return (
    <div className="container-page py-12 max-w-3xl">
      <h1 className="font-display text-3xl md:text-4xl">Réserver une visite conseil</h1>
      <ol className="mt-6 flex flex-wrap gap-2 text-xs">
        {stepsLabels.map((s, i) => (
          <li key={s} className={`px-3 py-1.5 rounded-full border ${i === step ? "bg-primary text-primary-foreground border-primary" : i < step ? "bg-secondary border-border" : "border-border text-muted-foreground"}`}>
            {i + 1}. {s}
          </li>
        ))}
      </ol>

      <div className="mt-8 rounded-2xl border border-border bg-card p-7">
        {step === 0 && (
          <div className="space-y-4">
            <h2 className="font-display text-2xl">Choisissez une offre</h2>
            <div className="grid gap-3">
              {offers.map((o) => (
                <label key={o.name} className={`flex items-start gap-3 rounded-xl border p-4 cursor-pointer ${offer === o.name ? "border-primary bg-primary/5" : "border-border"}`}>
                  <input type="radio" name="offer" checked={offer === o.name} onChange={() => setOffer(o.name)} className="mt-1 accent-primary" />
                  <div>
                    <div className="font-medium">{o.name} <span className="text-muted-foreground font-normal">— {o.price}</span></div>
                    <p className="text-sm text-muted-foreground">{o.description}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="space-y-4">
            <h2 className="font-display text-2xl">Adresse du bien</h2>
            <div className="grid gap-3">
              <div><Label>Type de client</Label>
                <select className="mt-1 w-full bg-background border border-border rounded-md h-10 px-3 text-sm">
                  <option>Particulier</option><option>Agent immobilier</option>
                </select>
              </div>
              <div><Label>Adresse</Label><Input placeholder="12 rue de Rivoli, Paris" /></div>
              <div className="grid grid-cols-2 gap-3">
                <div><Label>Type de bien</Label>
                  <select className="mt-1 w-full bg-background border border-border rounded-md h-10 px-3 text-sm">
                    <option>Appartement</option><option>Maison</option><option>Local commercial</option><option>Immeuble</option><option>Autre</option>
                  </select>
                </div>
                <div><Label>Surface (m²)</Label><Input type="number" placeholder="65" /></div>
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <h2 className="font-display text-2xl">Date et créneau</h2>
            <div className="grid grid-cols-2 gap-3">
              <div><Label>Date souhaitée</Label><Input type="date" /></div>
              <div><Label>Créneau</Label>
                <select className="mt-1 w-full bg-background border border-border rounded-md h-10 px-3 text-sm">
                  <option>Matin (9h–12h)</option><option>Après-midi (14h–18h)</option><option>Soirée (18h–20h)</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <h2 className="font-display text-2xl">Décrivez votre projet</h2>
            <div><Label>Objectif de la visite</Label><Textarea rows={4} placeholder="Achat, rénovation, mise en location…" /></div>
            <div><Label>Budget travaux estimé</Label>
              <select className="mt-1 w-full bg-background border border-border rounded-md h-10 px-3 text-sm">
                <option>Non défini</option><option>&lt; 20 000 €</option><option>20–50 000 €</option><option>50–100 000 €</option><option>100 000 € +</option>
              </select>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div><Label>Nom</Label><Input /></div>
              <div><Label>Email</Label><Input type="email" /></div>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="text-center py-10">
            <div className="mx-auto h-12 w-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center"><Check /></div>
            <h2 className="mt-4 font-display text-2xl">Réservation confirmée</h2>
            <p className="mt-2 text-muted-foreground">Un architecte vous contactera dans les 24h pour confirmer votre visite.</p>
          </div>
        )}

        <div className="mt-8 flex justify-between">
          <Button variant="ghost" disabled={step === 0} onClick={() => setStep(step - 1)}>Retour</Button>
          {step < stepsLabels.length - 1 ? (
            <Button onClick={() => setStep(step + 1)} className="rounded-full">
              {step === 3 ? "Confirmer et payer" : "Continuer"}
            </Button>
          ) : (
            <Button onClick={() => toast.success("Votre demande a été envoyée.")} className="rounded-full">Accéder à mon espace</Button>
          )}
        </div>
      </div>
    </div>
  );
}
