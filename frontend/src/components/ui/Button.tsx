"use client";

import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "danger";
}

const variantClasses: Record<string, string> = {
  primary: "bg-brand hover:bg-brand-dark text-white",
  secondary: "bg-white hover:bg-surface text-ink border border-line",
  danger: "bg-red-500 hover:bg-red-600 text-white",
};

export default function Button({ children, variant = "primary", className = "", ...rest }: ButtonProps) {
  return (
    <button
      className={`px-4 py-2 rounded-md text-sm font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${variantClasses[variant]} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}
