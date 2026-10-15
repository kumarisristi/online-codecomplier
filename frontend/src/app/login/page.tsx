"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import { useAuth } from "../../hooks/useAuth";

export default function LoginPage() {
  const router = useRouter();
  const { login, register } = useAuth();

  const [mode, setMode] = useState<"login" | "register">("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);
    try {
      if (mode === "login") {
        await login(email, password);
      } else {
        await register(name, email, password);
      }
      router.push("/dashboard");
    } catch (err: any) {
      setError(err?.response?.data?.message || "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="max-w-sm mx-auto mt-16 px-6">
      <h1 className="text-2xl font-display font-semibold text-ink mb-6">
        {mode === "login" ? "Log in" : "Create an account"}
      </h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        {mode === "register" && (
          <Input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
        )}
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {error && <p className="text-red-400 text-sm">{error}</p>}

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Please wait..." : mode === "login" ? "Log in" : "Sign up"}
        </Button>
      </form>

      <button
        className="mt-4 text-sm text-muted hover:text-brand"
        onClick={() => setMode(mode === "login" ? "register" : "login")}
      >
        {mode === "login" ? "Need an account? Sign up" : "Already have an account? Log in"}
      </button>
    </main>
  );
}
