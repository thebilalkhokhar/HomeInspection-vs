"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// ---------------------------------------------------------------------------
// Types — mirroring backend response schemas
// ---------------------------------------------------------------------------

type QuoteStatus = "pending" | "viewed" | "contacted";

type Quote = {
  id: string;
  client_name: string;
  client_email: string;
  client_phone: string;
  property_address: string;
  property_zip: string;
  square_footage: number;
  property_age_range: string;
  requested_services: string[];
  status: QuoteStatus;
  created_at: string;
};

type ContactMessage = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  subject: string | null;
  message: string;
  created_at: string;
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const API = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") ?? "";

const statusColors: Record<QuoteStatus, string> = {
  pending:   "bg-yellow-50 text-yellow-700 border-yellow-300",
  viewed:    "bg-blue-50 text-blue-700 border-blue-300",
  contacted: "bg-green-50 text-green-700 border-green-300",
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric", month: "short", day: "numeric",
  });
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function AdminPage() {
  const router = useRouter();
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [activeTab, setActiveTab] = useState<"quotes" | "messages">("quotes");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [statusFilter, setStatusFilter] = useState<QuoteStatus | "all">("all");
  const [loggingOut, setLoggingOut] = useState(false);

  const [updatingId, setUpdatingId] = useState<string | null>(null);

  async function handleStatusChange(quoteId: string, newStatus: QuoteStatus) {
    setUpdatingId(quoteId);
    try {
      const res = await fetch(`${API}/api/v1/quotes/${quoteId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.status === 401) { router.replace("/login"); return; }
      if (!res.ok) throw new Error("Failed to update status.");
      const updated: Quote = await res.json();
      setQuotes((prev) => prev.map((q) => q.id === quoteId ? updated : q));
    } catch {
      // silently fail — status badge reverts visually since state wasn't changed
    } finally {
      setUpdatingId(null);
    }
  }
  const filteredQuotes = statusFilter === "all"
    ? quotes
    : quotes.filter((q) => q.status === statusFilter);

  // Fetch all protected data on mount
  useEffect(() => {
    async function fetchData() {
      try {
        const [quotesRes, messagesRes] = await Promise.all([
          fetch(`${API}/api/v1/quotes`,  { credentials: "include" }),
          fetch(`${API}/api/v1/contact`, { credentials: "include" }),
        ]);

        // 401 on either — session expired or not logged in
        if (quotesRes.status === 401 || messagesRes.status === 401) {
          router.replace("/login");
          return;
        }

        if (!quotesRes.ok || !messagesRes.ok) {
          throw new Error("Failed to load dashboard data.");
        }

        const [quotesData, messagesData] = await Promise.all([
          quotesRes.json(),
          messagesRes.json(),
        ]);

        setQuotes(quotesData);
        setMessages(messagesData);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong.");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [router]);

  async function handleLogout() {
    setLoggingOut(true);
    try {
      await fetch(`${API}/api/v1/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
    } finally {
      router.push("/");
    }
  }

  // ---------------------------------------------------------------------------
  // Render states
  // ---------------------------------------------------------------------------

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white">
        <div className="flex items-center gap-3 text-sm text-black/50">
          <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
          </svg>
          Loading dashboard...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white px-4">
        <div className="w-full max-w-md border-2 border-red-500 bg-red-50 p-6">
          <p className="font-semibold text-red-700">{error}</p>
          <button
            onClick={() => router.push("/login")}
            className="mt-4 btn-on-light inline-flex items-center px-5 py-2.5 text-sm font-semibold"
          >
            Back to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-black">

      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b-2 border-black bg-black text-white">
        <div className="content-shell mx-auto flex w-full items-center justify-between px-4 py-3 sm:px-6 lg:px-12">
          <div className="flex items-center gap-3">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
            </svg>
            <div className="flex flex-col leading-none">
              <span className="text-xs font-semibold uppercase tracking-[0.22em] text-white/50">Home</span>
              <span className="text-sm font-bold uppercase tracking-[0.22em]">Inspection Admin</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={handleLogout}
              disabled={loggingOut}
              className="inline-flex items-center gap-2 border-2 border-white px-4 py-2 text-xs font-semibold uppercase tracking-widest transition-colors hover:bg-white hover:text-black disabled:opacity-50"
            >
              {loggingOut ? "Logging out..." : "Logout"}
            </button>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="content-shell mx-auto w-full px-4 py-10 sm:px-6 lg:px-12">

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            { label: "Total Quotes", value: quotes.length },
            { label: "Pending", value: quotes.filter(q => q.status === "pending").length },
            { label: "Contacted", value: quotes.filter(q => q.status === "contacted").length },
            { label: "Messages", value: messages.length },
          ].map((stat) => (
            <div key={stat.label} className="border border-black p-5">
              <p className="text-3xl font-bold tracking-tight">{stat.value}</p>
              <p className="mt-1 text-xs font-semibold uppercase tracking-widest text-black/40">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="mt-10 flex border-b-2 border-black">
          {(["quotes", "messages"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 text-sm font-semibold uppercase tracking-widest transition-colors ${
                activeTab === tab
                  ? "border-b-2 border-black bg-black text-white"
                  : "text-black/40 hover:text-black"
              }`}
            >
              {tab === "quotes" ? `Quotes (${quotes.length})` : `Messages (${messages.length})`}
            </button>
          ))}
        </div>

        {/* Quotes table */}
        {activeTab === "quotes" && (
          <div className="mt-6 overflow-x-auto">

            {/* Filter bar */}
            <div className="mb-4 flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-widest text-black/40">Filter:</span>
              {(["all", "pending", "viewed", "contacted"] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => setStatusFilter(s)}
                  className={`border px-3 py-1.5 text-xs font-semibold uppercase tracking-widest transition-all duration-150 ${
                    statusFilter === s
                      ? "border-black bg-black text-white"
                      : "border-black/20 text-black/50 hover:border-black hover:text-black"
                  }`}
                >
                  {s === "all" ? `All (${quotes.length})` : `${s} (${quotes.filter(q => q.status === s).length})`}
                </button>
              ))}
            </div>

            {filteredQuotes.length === 0 ? (
              <p className="py-12 text-center text-sm text-black/40">
                {statusFilter === "all" ? "No quote submissions yet." : `No quotes with status "${statusFilter}".`}
              </p>
            ) : (
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="border-b-2 border-black text-left">
                    <th className="py-3 pr-4 text-xs font-bold uppercase tracking-widest text-black/40">Client</th>
                    <th className="py-3 pr-4 text-xs font-bold uppercase tracking-widest text-black/40">Contact</th>
                    <th className="py-3 pr-4 text-xs font-bold uppercase tracking-widest text-black/40">Property</th>
                    <th className="py-3 pr-4 text-xs font-bold uppercase tracking-widest text-black/40">Services</th>
                    <th className="py-3 pr-4 text-xs font-bold uppercase tracking-widest text-black/40">Status</th>
                    <th className="py-3 text-xs font-bold uppercase tracking-widest text-black/40">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredQuotes.map((q) => (
                    <tr key={q.id} className="border-b border-black/10 hover:bg-black/2">
                      <td className="py-4 pr-4 font-medium">{q.client_name}</td>
                      <td className="py-4 pr-4">
                        <div className="flex flex-col gap-0.5">
                          <a href={`mailto:${q.client_email}`} className="text-black hover:underline">{q.client_email}</a>
                          <a href={`tel:${q.client_phone}`} className="text-black/50">{q.client_phone}</a>
                        </div>
                      </td>
                      <td className="py-4 pr-4">
                        <div className="flex flex-col gap-0.5">
                          <span>{q.property_address}, {q.property_zip}</span>
                          <span className="text-black/50">{q.square_footage.toLocaleString()} sq ft · {q.property_age_range}</span>
                        </div>
                      </td>
                      <td className="py-4 pr-4">
                        <div className="flex flex-wrap gap-1">
                          {q.requested_services.map((s) => (
                            <span key={s} className="border border-black/20 px-2 py-0.5 text-xs">{s}</span>
                          ))}
                        </div>
                      </td>
                      <td className="py-4 pr-4">
                        <select
                          value={q.status}
                          disabled={updatingId === q.id}
                          onChange={(e) => handleStatusChange(q.id, e.target.value as QuoteStatus)}
                          className={`border px-2 py-1 text-xs font-semibold uppercase tracking-wider cursor-pointer outline-none transition-opacity disabled:opacity-50 ${statusColors[q.status]}`}
                        >
                          <option value="pending">Pending</option>
                          <option value="viewed">Viewed</option>
                          <option value="contacted">Contacted</option>
                        </select>
                      </td>
                      <td className="py-4 text-black/50">{formatDate(q.created_at)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

        {/* Messages table */}
        {activeTab === "messages" && (
          <div className="mt-6 overflow-x-auto">
            {messages.length === 0 ? (
              <p className="py-12 text-center text-sm text-black/40">No contact messages yet.</p>
            ) : (
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="border-b-2 border-black text-left">
                    <th className="py-3 pr-4 text-xs font-bold uppercase tracking-widest text-black/40">Name</th>
                    <th className="py-3 pr-4 text-xs font-bold uppercase tracking-widest text-black/40">Contact</th>
                    <th className="py-3 pr-4 text-xs font-bold uppercase tracking-widest text-black/40">Subject</th>
                    <th className="py-3 pr-4 text-xs font-bold uppercase tracking-widest text-black/40">Message</th>
                    <th className="py-3 text-xs font-bold uppercase tracking-widest text-black/40">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {messages.map((m) => (
                    <tr key={m.id} className="border-b border-black/10 hover:bg-black/2">
                      <td className="py-4 pr-4 font-medium">{m.name}</td>
                      <td className="py-4 pr-4">
                        <div className="flex flex-col gap-0.5">
                          <a href={`mailto:${m.email}`} className="text-black hover:underline">{m.email}</a>
                          {m.phone && <a href={`tel:${m.phone}`} className="text-black/50">{m.phone}</a>}
                        </div>
                      </td>
                      <td className="py-4 pr-4">
                        <span className="text-black/60">{m.subject ?? "—"}</span>
                      </td>
                      <td className="max-w-xs py-4 pr-4">
                        <p className="line-clamp-2 text-black/70">{m.message}</p>
                      </td>
                      <td className="py-4 text-black/50">{formatDate(m.created_at)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

      </main>
    </div>
  );
}
