const COMPANIES = ["Microsoft", "Meta", "NVIDIA", "Stripe", "Perplexity", "Samsung"];

export default function TrustedByStrip() {
  return (
    <section className="bg-surface border-y border-line py-14">
      <div className="mx-auto max-w-5xl px-6 text-center">
        <p className="text-muted text-sm mb-8">Users from world&apos;s top companies and schools</p>
        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
          {COMPANIES.map((name) => (
            <span
              key={name}
              className="font-display font-semibold text-xl md:text-2xl text-ink/40 hover:text-ink/70 transition-colors"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
