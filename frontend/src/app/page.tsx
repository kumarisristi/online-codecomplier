import LanguageSearchBar from "../components/home/LanguageSearchBar";
import LanguageGrid from "../components/home/LanguageGrid";
import TrustedByStrip from "../components/home/TrustedByStrip";

export default function HomePage() {
  return (
    <main className="bg-white">
      {/* Hero */}
      <section className="pt-20 pb-16 px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="font-display font-bold text-4xl md:text-6xl leading-[1.1] text-ink mb-5">
            Compiler your Code with <span className="text-brand">code  Compiler.</span>
          </h1>
          <p className="text-muted text-lg mb-10">
           Code Compiler helps over 12.8 million users worldwide write code online.
          </p>

          <LanguageSearchBar />
        </div>

        <LanguageGrid />
      </section>

      <TrustedByStrip />
    </main>
  );
}
