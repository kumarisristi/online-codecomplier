"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, Search, Sun, ChevronDown } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";

const NAV_ITEMS: { label: string; hasMenu?: boolean }[] = [
  { label: "Pricing" },
  { label: "Learn", hasMenu: true },
  { label: "Code", hasMenu: true },
  { label: "Deploy", hasMenu: true },
  { label: "More", hasMenu: true },
];

export default function Header() {
  const { isAuthenticated, user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-line">
      <div className="mx-auto max-w-7xl px-4 md:px-6 h-16 flex items-center justify-between gap-4">
        {/* Left: menu + logo */}
        <div className="flex items-center gap-3">
          <button
            aria-label="Toggle menu"
            className="p-1.5 rounded-md text-ink/70 hover:bg-surface md:hidden"
            onClick={() => setMenuOpen((v) => !v)}
          >
            <Menu size={20} />
          </button>

          <Link href="/" className="flex items-center gap-2">
            <span className="grid place-items-center w-8 h-8 rounded-lg bg-brand text-white font-display font-bold text-sm">
              {"{ }"}
            </span>
            <span className="font-display font-semibold text-lg text-ink">
              Code<span className="text-brand">Compiler</span>
            </span>
          </Link>
        </div>

        {/* Center: nav (desktop) */}
        <nav className="hidden md:flex items-center gap-7 text-[15px] text-ink/80 font-medium">
          <button
            aria-label="Search"
            className="p-1.5 rounded-md hover:bg-surface hover:text-brand transition-colors"
          >
            <Search size={18} />
          </button>
          <button
            aria-label="Toggle theme"
            className="p-1.5 rounded-md hover:bg-surface hover:text-brand transition-colors"
          >
            <Sun size={18} />
          </button>

          {NAV_ITEMS.map((item) => (
            <a
              key={item.label}
              href="#"
              className="flex items-center gap-1 hover:text-brand transition-colors"
            >
              {item.label}
              {item.hasMenu && <ChevronDown size={14} className="opacity-60" />}
            </a>
          ))}
        </nav>

        {/* Right: auth */}
        <div className="flex items-center gap-3">
          {isAuthenticated ? (
            <>
              <Link
                href="/dashboard"
                className="hidden sm:block text-sm font-medium text-ink/80 hover:text-brand"
              >
                Dashboard
              </Link>
              <span className="hidden sm:block text-sm text-muted">
                {user?.name}
              </span>
              <button
                onClick={logout}
                className="text-sm font-semibold px-4 py-2 rounded-md border border-line text-ink hover:bg-surface transition-colors"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className="text-sm font-semibold px-4 py-2 rounded-md text-ink hover:bg-surface transition-colors"
            >
              Login
            </Link>
          )}
        </div>
      </div>

      {/* Mobile nav */}
      {menuOpen && (
        <nav className="md:hidden border-t border-line px-4 py-3 flex flex-col gap-3 text-sm font-medium text-ink/80">
          {NAV_ITEMS.map((item) => (
            <a key={item.label} href="#" className="hover:text-brand">
              {item.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
