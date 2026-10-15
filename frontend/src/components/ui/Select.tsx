"use client";

import { SelectHTMLAttributes, ReactNode } from "react";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  children: ReactNode;
}

export default function Select({ children, className = "", ...rest }: SelectProps) {
  return (
    <select
      className={`px-3 py-2.5 rounded-md bg-white border border-line text-ink text-sm focus:outline-none focus:border-brand ${className}`}
      {...rest}
    >
      {children}
    </select>
  );
}
