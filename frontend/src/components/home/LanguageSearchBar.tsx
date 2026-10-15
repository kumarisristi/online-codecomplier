"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import { homeTiles } from "../../utils/languages";

export default function LanguageSearchBar() {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);

  const matches = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return homeTiles.filter((t) => t.name.toLowerCase().includes(q)).slice(0, 6);
  }, [query]);

  return (
    <div className="relative max-w-2xl mx-auto mb-8">
      <div className="flex items-center gap-3 rounded-xl border border-line bg-white px-4 py-3.5 shadow-card focus-within:border-brand transition-colors">
        <Search size={18} className="text-muted shrink-0" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setTimeout(() => setFocused(false), 150)}
          placeholder="Search by Language/ DB/ Template etc.,"
          className="w-full bg-transparent outline-none text-[15px] text-ink placeholder:text-muted"
        />
      </div>

      {focused && matches.length > 0 && (
        <ul className="absolute z-10 top-full mt-2 w-full rounded-xl border border-line bg-white shadow-cardHover overflow-hidden">
          {matches.map((tile) => (
            <li key={tile.slug}>
              <Link
                href={`/${tile.slug}`}
                className="flex items-center gap-3 px-4 py-2.5 text-sm text-ink hover:bg-surface"
              >
                <span
                  className="grid place-items-center w-6 h-6 rounded text-[10px] font-bold"
                  style={{ backgroundColor: tile.bg, color: tile.fg }}
                >
                  {tile.short}
                </span>
                {tile.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
