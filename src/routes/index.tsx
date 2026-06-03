import { createFileRoute, Link } from "@tanstack/react-router";
import { ShieldCheck, Calendar, Star, CreditCard, ArrowRight, Home as HomeIcon, KeyRound, Hammer, Eye, Sparkles, Handshake, Building2, LineChart } from "lucide-react";
import heroImg from "@/assets/hero.jpg";
import { Button } from "@/components/ui/button";
import { SearchBar } from "@/components/site/SearchBar";
import { ArchitectCard } from "@/components/site/ArchitectCard";
import { OfferCard, offers } from "@/components/site/OfferCard";
import { TestimonialCard } from "@/components/site/TestimonialCard";
import { Section } from "@/components/site/Section";
import { architects } from "@/data/architects";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Second Plan — Réservez un architecte pour votre visite immobilière" },
      { name: "description", content: "Trouvez rapidement un architecte pour évaluer le potentiel d’un bien, estimer les travaux et prendre une meilleure décision." },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 grid-paper opacity-60 pointer-events-none" aria-hidden />
        <div className="container-page pt-16 md:pt-24 pb-12 grid lg:grid-cols-[1.05fr_1fr] gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-secondary px-3 py-1 text-xs text-secondary-foreground">
              <Sparkles className="h-3.5 w-3.5 text-terracotta" />
              Nouveau · Le réflexe architecte avant chaque visite
            </div>
            <h1 className="mt-5 font-display text-4xl md:text-6xl leading-[1.02] tracking-tight">
              Réservez un architecte pour votre prochaine visite immobilière.
            </h1>
            <p className="mt-5 text-lg text-muted-foreground max-w-xl">
              Second Plan vous permet de trouver rapidement un architecte pour évaluer le potentiel d’un bien, estimer les travaux possibles et vous aider à prendre une meilleure décision.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button asChild size="lg" className="rounded-full">
                <Link to="/search">Trouver un architecte <ArrowRight className="ml-1 h-4 w-4" /></Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full">
                <Link to="/offres">Voir les offres</Link>
              </Button>
            </div>
            <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-5 text-sm">
              <Trust icon={<ShieldCheck className="h-4 w-4" />} label="Architectes vérifiés" />
              <Trust icon={<Calendar className="h-4 w-4" />} label="Réservation simple" />
              <Trust icon={<Star className="h-4 w-4" />} label="Avis après visite" />
              <Trust icon={<CreditCard className="h-4 w-4" />} label="Paiement sécurisé" />
            </div>
          </div>
          <div className="relative">
            <div className="rounded-3xl overflow-hidden border border-border shadow-lg">
              <img src={heroImg} alt="Architecte en visite dans un appartement parisien" width={1600} height={1100} className="w-full h-[460px] object-cover" />
            </div>
            <div className="hidden md:block absolute -bottom-6 -left-6 bg-card rounded-2xl border border-border p-4 shadow-md w-64">
              <div className="text-xs text-muted-foreground">Visite Conseil — Paris 11e</div>
              <div className="font-display text-lg mt-1">Camille Martin</div>
              <div className="flex items-center gap-1 text-sm mt-1">
                <Star className="h-3.5 w-3.5 fill-terracotta text-terracotta" /> 4.9 · 128 visites
              </div>
            </div>
          </div>
        </div>

        <div className="container-page pb-20">
          <SearchBar />
        </div>
      </section>

      {/* MARKETPLACE */}
      <Section
        eyebrow="Marketplace"
        title="Trouvez l’architecte adapté à votre projet"
        intro="Comparez les profils, l’expérience, les avis et les disponibilités, partout en France."
      >
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {architects.map((a) => <ArchitectCard key={a.id} a={a} />)}
        </div>
        <div className="mt-10">
          <Button asChild variant="outline" className="rounded-full">
            <Link to="/search">Voir tous les architectes <ArrowRight className="ml-1 h-4 w-4" /></Link>
          </Button>
        </div>
      </Section>

      {/* OFFERS */}
      <Section
        eyebrow="Nos offres"
        title="Trois formats pour trois moments clés"
        intro="De l’avis express avant une offre à l’analyse approfondie pour un projet de rénovation."
        className="bg-secondary/40"
      >
        <div className="grid md:grid-cols-3 gap-6">
          {offers.map((o) => <OfferCard key={o.name} o={o} />)}
        </div>
        <div className="mt-10">
          <Button asChild variant="ghost" className="rounded-full">
            <Link to="/offres">Comparer les offres <ArrowRight className="ml-1 h-4 w-4" /></Link>
          </Button>
        </div>
      </Section>

      {/* USE CASES */}
      <Section eyebrow="Cas d’usage" title="Quand faire appel à Second Plan ?">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {useCases.map((u) => (
            <div key={u.label} className="rounded-2xl border border-border bg-card p-5 hover:border-primary/40 transition-colors">
              <div className="h-9 w-9 rounded-lg bg-secondary flex items-center justify-center text-primary">{u.icon}</div>
              <div className="mt-4 font-medium">{u.label}</div>
            </div>
          ))}
        </div>
      </Section>

      {/* HOW IT WORKS */}
      <Section
        eyebrow="Comment ça marche"
        title="Une visite d’architecte en 4 étapes"
        className="bg-primary text-primary-foreground"
      >
        <div className="grid md:grid-cols-4 gap-6">
          {steps.map((s, i) => (
            <div key={s.title} className="rounded-2xl border border-primary-foreground/15 p-6 bg-primary-foreground/[0.03]">
              <div className="font-display text-3xl text-terracotta">0{i + 1}</div>
              <div className="mt-3 font-medium text-lg">{s.title}</div>
              <p className="mt-2 text-sm text-primary-foreground/75">{s.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* AGENTS */}
      <Section className="bg-accent/40">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="text-xs uppercase tracking-[0.18em] text-terracotta mb-3">Agents immobiliers</div>
            <h2 className="font-display text-3xl md:text-4xl">Un outil simple pour aider vos clients à se projeter.</h2>
            <p className="mt-4 text-muted-foreground">
              Second Plan permet aux agents immobiliers de proposer rapidement une visite conseil avec un architecte, pour débloquer une vente, rassurer un acheteur ou valoriser un bien avec potentiel.
            </p>
            <ul className="mt-6 space-y-2 text-sm">
              {["Aider les acheteurs à se projeter", "Accélérer la décision d’achat", "Valoriser les biens avec travaux", "Rassurer sur les contraintes techniques", "Ajouter un service premium à vos visites"].map((b) => (
                <li key={b} className="flex gap-2"><span className="h-1.5 w-1.5 rounded-full bg-terracotta mt-2" />{b}</li>
              ))}
            </ul>
            <Button asChild className="mt-7 rounded-full"><Link to="/agents">Découvrir l’offre agences</Link></Button>
          </div>
          <div className="rounded-3xl border border-border bg-card p-8">
            <Building2 className="h-8 w-8 text-primary" />
            <div className="mt-4 font-display text-2xl">+38% de transformations</div>
            <p className="text-sm text-muted-foreground mt-2">sur les biens avec travaux quand une visite architecte est proposée à l’acheteur.</p>
            <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
              <Stat n="2 500+" l="agents partenaires" />
              <Stat n="48 h" l="délai moyen visite" />
            </div>
          </div>
        </div>
      </Section>

      {/* ARCHITECTS */}
      <Section>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1 rounded-3xl border border-border bg-secondary/50 p-8">
            <LineChart className="h-8 w-8 text-primary" />
            <div className="mt-4 font-display text-2xl">Des missions courtes et qualifiées</div>
            <p className="text-sm text-muted-foreground mt-2">Choisissez vos créneaux, fixez vos prix, et transformez certaines visites en missions complètes.</p>
            <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
              <Stat n="1h–3h" l="durée moyenne" />
              <Stat n="250–700 €" l="par visite" />
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <div className="text-xs uppercase tracking-[0.18em] text-terracotta mb-3">Architectes</div>
            <h2 className="font-display text-3xl md:text-4xl">Développez votre activité avec des missions courtes et qualifiées.</h2>
            <p className="mt-4 text-muted-foreground">
              Rejoignez Second Plan pour recevoir des demandes de visites conseils près de chez vous, fixer vos tarifs et transformer certaines visites en missions complètes.
            </p>
            <ul className="mt-6 space-y-2 text-sm">
              {["Recevoir des demandes qualifiées", "Choisir vos disponibilités", "Fixer vos prix", "Être payé simplement", "Développer votre visibilité locale", "Accéder à de futurs projets de rénovation"].map((b) => (
                <li key={b} className="flex gap-2"><span className="h-1.5 w-1.5 rounded-full bg-terracotta mt-2" />{b}</li>
              ))}
            </ul>
            <Button asChild className="mt-7 rounded-full"><Link to="/architectes">Créer mon profil architecte</Link></Button>
          </div>
        </div>
      </Section>

      {/* TRUST */}
      <Section
        eyebrow="Confiance"
        title="Une plateforme pensée pour décider plus sereinement"
        className="bg-secondary/40"
      >
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {trustBlocks.map((t) => (
            <div key={t.title} className="rounded-2xl border border-border bg-card p-6">
              <div className="h-9 w-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center">{t.icon}</div>
              <div className="mt-4 font-medium">{t.title}</div>
              <p className="mt-1.5 text-sm text-muted-foreground">{t.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* TESTIMONIALS */}
      <Section eyebrow="Ils en parlent" title="Une visite. Une décision plus sereine.">
        <div className="grid md:grid-cols-3 gap-6">
          <TestimonialCard quote="Grâce à Second Plan, nous avons compris en une visite ce qui était faisable dans l’appartement. Cela nous a aidés à faire une offre plus sereinement." author="Claire" role="Acheteuse à Paris" />
          <TestimonialCard quote="Pour certains biens avec travaux, proposer une visite avec un architecte change complètement la perception des acheteurs." author="Nicolas" role="Agent immobilier à Nantes" />
          <TestimonialCard quote="Les visites conseils me permettent de rencontrer des clients qualifiés, avec de vrais projets." author="Élodie" role="Architecte à Marseille" />
        </div>
      </Section>

      {/* FINAL CTA */}
      <section className="pb-24">
        <div className="container-page">
          <div className="rounded-3xl bg-primary text-primary-foreground p-10 md:p-16 relative overflow-hidden">
            <div className="absolute inset-0 grid-paper opacity-[0.07]" aria-hidden />
            <div className="relative max-w-2xl">
              <h2 className="font-display text-3xl md:text-5xl leading-tight">Besoin d’un regard d’architecte avant de vous décider ?</h2>
              <div className="mt-7 flex flex-wrap gap-3">
                <Button asChild size="lg" variant="secondary" className="rounded-full">
                  <Link to="/booking">Réserver une visite conseil</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="rounded-full bg-transparent border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground">
                  <Link to="/architectes">Rejoindre Second Plan comme architecte</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function Trust({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-2 text-foreground/80">
      <span className="h-7 w-7 rounded-full bg-secondary text-primary flex items-center justify-center">{icon}</span>
      {label}
    </div>
  );
}

function Stat({ n, l }: { n: string; l: string }) {
  return (
    <div className="rounded-xl bg-secondary/60 p-4">
      <div className="font-display text-xl">{n}</div>
      <div className="text-xs text-muted-foreground">{l}</div>
    </div>
  );
}

const useCases = [
  { label: "Avant d’acheter un bien", icon: <HomeIcon className="h-4 w-4" /> },
  { label: "Avant de faire une offre", icon: <KeyRound className="h-4 w-4" /> },
  { label: "Pour estimer des travaux", icon: <Hammer className="h-4 w-4" /> },
  { label: "Se projeter dans l’ancien", icon: <Eye className="h-4 w-4" /> },
  { label: "Valoriser un bien à vendre", icon: <Sparkles className="h-4 w-4" /> },
  { label: "Rassurer un acquéreur", icon: <ShieldCheck className="h-4 w-4" /> },
  { label: "Accompagner un agent immobilier", icon: <Handshake className="h-4 w-4" /> },
  { label: "Analyser un investissement locatif", icon: <LineChart className="h-4 w-4" /> },
];

const steps = [
  { title: "Décrivez votre besoin", desc: "Choisissez la localisation, le type de bien et le type de visite conseil." },
  { title: "Choisissez votre architecte", desc: "Comparez profils, expertises, avis, prix et disponibilités." },
  { title: "Réservez votre visite", desc: "Réservez un créneau et payez en ligne en toute sécurité." },
  { title: "Recevez un avis pro", desc: "L’architecte visite le bien avec vous et vous éclaire sur le potentiel et les risques." },
];

const trustBlocks = [
  { title: "Architectes vérifiés", desc: "Diplômes, assurance et expérience contrôlés.", icon: <ShieldCheck className="h-4 w-4" /> },
  { title: "Profils détaillés", desc: "Spécialités, prix, disponibilités et réalisations.", icon: <Eye className="h-4 w-4" /> },
  { title: "Avis clients", desc: "Chaque visite est suivie d’un avis vérifié.", icon: <Star className="h-4 w-4" /> },
  { title: "Paiement sécurisé", desc: "Paiement en ligne, libéré après la visite.", icon: <CreditCard className="h-4 w-4" /> },
  { title: "Réservation rapide", desc: "Un créneau en moins de 48h dans la plupart des villes.", icon: <Calendar className="h-4 w-4" /> },
  { title: "Support Second Plan", desc: "Une équipe pour vous accompagner si besoin.", icon: <Handshake className="h-4 w-4" /> },
];
