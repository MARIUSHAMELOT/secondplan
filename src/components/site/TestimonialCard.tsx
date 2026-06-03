export function TestimonialCard({ quote, author, role }: { quote: string; author: string; role: string }) {
  return (
    <figure className="rounded-2xl bg-card border border-border p-7 h-full flex flex-col">
      <blockquote className="font-display text-xl leading-snug text-foreground">“{quote}”</blockquote>
      <figcaption className="mt-6 text-sm">
        <div className="font-medium">{author}</div>
        <div className="text-muted-foreground">{role}</div>
      </figcaption>
    </figure>
  );
}
