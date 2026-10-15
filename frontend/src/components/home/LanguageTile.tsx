"use client";

import Link from "next/link";
import { HomeTile } from "../../utils/languages";

export default function LanguageTile({ tile }: { tile: HomeTile }) {
  return (
    <Link
      href={`/${tile.slug}`}
      className="group flex items-center justify-between gap-3 rounded-xl border border-line bg-white px-5 py-4 shadow-card transition-all hover:-translate-y-0.5 hover:shadow-cardHover hover:border-brand/40"
    >
      <span className="font-medium text-ink text-[15px]">{tile.name}</span>
      <span
        className="grid place-items-center w-9 h-9 rounded-lg text-xs font-bold shrink-0"
        style={{ backgroundColor: tile.bg, color: tile.fg }}
      >
        {tile.short}
      </span>
    </Link>
  );
}
