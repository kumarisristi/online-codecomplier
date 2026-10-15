"use client";

import { useState, useMemo } from "react";
import { homeTiles, HomeTile } from "../../utils/languages";
import LanguageTile from "./LanguageTile";

const TABS: { key: HomeTile["category"]; label: string }[] = [
  { key: "popular", label: "Popular" },
  { key: "programming", label: "Programming" },
  { key: "web", label: "Web" },
  { key: "databases", label: "Databases" },
];

export default function LanguageGrid() {
  const [active, setActive] = useState<HomeTile["category"]>("popular");

  const visibleTiles = useMemo(() => {
    if (active === "popular") return homeTiles;
    return homeTiles.filter((t) => t.category === active);
  }, [active]);

  return (
    <div>
      <div className="flex justify-center mb-8">
        <div className="inline-flex items-center gap-1 rounded-full border border-line bg-white p-1 shadow-card">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActive(tab.key)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                active === tab.key
                  ? "bg-ink text-white"
                  : "text-muted hover:text-ink"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 max-w-5xl mx-auto">
        {visibleTiles.map((tile) => (
          <LanguageTile key={tile.slug} tile={tile} />
        ))}
      </div>
    </div>
  );
}
