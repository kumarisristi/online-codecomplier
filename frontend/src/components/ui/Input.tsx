"use client";

import { InputHTMLAttributes } from "react";

export default function Input(props: InputHTMLAttributes<HTMLInputElement>) {
  const { className = "", ...rest } = props;
  return (
    <input
      className={`w-full px-3 py-2.5 rounded-md bg-white border border-line text-ink text-sm placeholder:text-muted focus:outline-none focus:border-brand ${className}`}
      {...rest}
    />
  );
}
