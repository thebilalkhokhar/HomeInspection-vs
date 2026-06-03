"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const form = e.currentTarget;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value.trim();
    const password = (form.elements.namedItem("password") as HTMLInputElement).value;

    try {
      const apiBase = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") ?? "";
      const res = await fetch(`${apiBase}/api/v1/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // required for cross-origin HttpOnly cookies
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        throw new Error(data?.detail || "Invalid email or password.");
      }

      router.push("/admin");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-white px-4">
      <div className="w-full max-w-md">

        {/* Logo / brand */}
        <div className="mb-10 flex flex-col items-center gap-2 text-center">
          <div className="flex h-12 w-12 items-center justify-center border-2 border-black bg-black">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="white"
              className="h-6 w-6"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
            </svg>
          </div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-black/40">Home</p>
          <p className="text-sm font-bold uppercase tracking-[0.22em]">Inspection Admin</p>
        </div>

        {/* Card */}
        <div className="border-2 border-black p-8">
          <h1 className="text-2xl font-semibold tracking-tight">Sign in</h1>
          <p className="mt-1 text-sm text-black/50">Enter your credentials to access the dashboard.</p>

          {/* Error banner */}
          {error && (
            <div role="alert" className="mt-6 border-2 border-red-500 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-5">
            <label className="flex flex-col gap-2 text-sm font-semibold uppercase tracking-widest">
              Email
              <input
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="admin@example.com"
                className="h-12 w-full border-2 border-black bg-white px-4 text-sm outline-none placeholder:text-black/30 focus:ring-0"
              />
            </label>

            <label className="flex flex-col gap-2 text-sm font-semibold uppercase tracking-widest">
              Password
              <input
                name="password"
                type="password"
                required
                autoComplete="current-password"
                placeholder="••••••••"
                className="h-12 w-full border-2 border-black bg-white px-4 text-sm outline-none placeholder:text-black/30 focus:ring-0"
              />
            </label>

            <button
              type="submit"
              disabled={loading}
              className="btn-on-light mt-2 inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? (
                <>
                  <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                  </svg>
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </form>
        </div>

        <p className="mt-6 text-center text-xs text-black/30">
          Home Inspection Admin · Restricted Access
        </p>
      </div>
    </main>
  );
}
