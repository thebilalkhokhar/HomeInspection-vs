"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ToastContainer, useToast } from "@/components/toast";

// ---------------------------------------------------------------------------
// Types
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
// Constants
// ---------------------------------------------------------------------------

const API = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") ?? "";
const PAGE_SIZE = 12;

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
// Pagination component
// ---------------------------------------------------------------------------

function Pagination({
  page, totalPages, onPage,
}: {
  page: number;
  totalPages: number;
  onPage: (p: number) => void;
}) {
  if (totalPages <= 1) return null;
  return (
    <div className="mt-6 flex items-center justify-between border-t border-black/10 pt-4">
      <p className="text-xs text-black/40">
        Page {page} of {totalPages}
      </p>
      <div className="flex gap-1">
        <button
          onClick={() => onPage(page - 1)}
          disabled={page === 1}
          className="border border-black px-3 py-1.5 text-xs font-semibold transition-colors hover:bg-black hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
        >
          ← Prev
        </button>
        {Array.from({ length: totalPages }, (_, i) => i + 1)
          .filter((p) => p === 1 || p === totalPages || Math.abs(p - page) <= 1)
          .reduce<(number | "…")[]>((acc, p, idx, arr) => {
            if (idx > 0 && (p as number) - (arr[idx - 1] as number) > 1) acc.push("…");
            acc.push(p);
            return acc;
          }, [])
          .map((p, i) =>
            p === "…" ? (
              <span key={`ellipsis-${i}`} className="px-2 py-1.5 text-xs text-black/30">…</span>
            ) : (
              <button
                key={p}
                onClick={() => onPage(p as number)}
                className={`border px-3 py-1.5 text-xs font-semibold transition-colors ${
                  p === page
                    ? "border-black bg-black text-white"
                    : "border-black/20 hover:border-black hover:text-black text-black/50"
                }`}
              >
                {p}
              </button>
            )
          )}
        <button
          onClick={() => onPage(page + 1)}
          disabled={page === totalPages}
          className="border border-black px-3 py-1.5 text-xs font-semibold transition-colors hover:bg-black hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
        >
          Next →
        </button>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

export default function AdminPage() {
  const router = useRouter();

  // Tab
  const [activeTab, setActiveTab] = useState<"quotes" | "messages">("quotes");

  // Quotes state
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [quotesTotal, setQuotesTotal] = useState(0);
  const [quotesPage, setQuotesPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState<QuoteStatus | "all">("all");
  const [quotesLoading, setQuotesLoading] = useState(false);

  // Messages state
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [messagesTotal, setMessagesTotal] = useState(0);
  const [messagesPage, setMessagesPage] = useState(1);
  const [messagesLoading, setMessagesLoading] = useState(false);

  // Global states
  const [initialLoading, setInitialLoading] = useState(true);
  const [error, setError] = useState("");
  const [loggingOut, setLoggingOut] = useState(false);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  // Derived
  const quotesTotalPages = Math.max(1, Math.ceil(quotesTotal / PAGE_SIZE));
  const messagesTotalPages = Math.max(1, Math.ceil(messagesTotal / PAGE_SIZE));

  // ---------------------------------------------------------------------------
  // Fetch quotes
  // ---------------------------------------------------------------------------

  const fetchQuotes = useCallback(async (page: number, filter: QuoteStatus | "all") => {
    setQuotesLoading(true);
    try {
      const skip = (page - 1) * PAGE_SIZE;
      const [dataRes, countRes] = await Promise.all([
        fetch(`${API}/api/v1/quotes?skip=${skip}&limit=${PAGE_SIZE}&status_filter=${filter}`, { credentials: "include" }),
        fetch(`${API}/api/v1/quotes/count?status_filter=${filter}`, { credentials: "include" }),
      ]);
      if (dataRes.status === 401) { router.replace("/login"); return; }
      if (!dataRes.ok || !countRes.ok) throw new Error("Failed to load quotes.");
      const [data, countData] = await Promise.all([dataRes.json(), countRes.json()]);
      setQuotes(data);
      setQuotesTotal(countData.total);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load quotes.");
    } finally {
      setQuotesLoading(false);
    }
  }, [router]);

  // ---------------------------------------------------------------------------
  // Fetch messages
  // ---------------------------------------------------------------------------

  const fetchMessages = useCallback(async (page: number) => {
    setMessagesLoading(true);
    try {
      const skip = (page - 1) * PAGE_SIZE;
      const [dataRes, countRes] = await Promise.all([
        fetch(`${API}/api/v1/contact?skip=${skip}&limit=${PAGE_SIZE}`, { credentials: "include" }),
        fetch(`${API}/api/v1/contact/count`, { credentials: "include" }),
      ]);
      if (dataRes.status === 401) { router.replace("/login"); return; }
      if (!dataRes.ok || !countRes.ok) throw new Error("Failed to load messages.");
      const [data, countData] = await Promise.all([dataRes.json(), countRes.json()]);
      setMessages(data);
      setMessagesTotal(countData.total);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load messages.");
    } finally {
      setMessagesLoading(false);
    }
  }, [router]);

  const { toasts, addToast, dismiss } = useToast();
  const mounted = useRef(false);

  // Initial load
  useEffect(() => {
    async function init() {
      await Promise.all([fetchQuotes(1, "all"), fetchMessages(1)]);
      setInitialLoading(false);
      mounted.current = true;
    }
    init();
  }, [fetchQuotes, fetchMessages]);

  // Re-fetch quotes when page or filter changes (skip initial mount)
  useEffect(() => {
    if (mounted.current) fetchQuotes(quotesPage, statusFilter);
  }, [quotesPage, statusFilter, fetchQuotes]);

  // Re-fetch messages when page changes (skip initial mount)
  useEffect(() => {
    if (mounted.current) fetchMessages(messagesPage);
  }, [messagesPage, fetchMessages]);

  // ---------------------------------------------------------------------------
  // Handlers
  // ---------------------------------------------------------------------------

  function handleFilterChange(f: QuoteStatus | "all") {
    setStatusFilter(f);
    setQuotesPage(1); // reset to page 1 on filter change
  }

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
      addToast(`Status updated to "${newStatus}"`, "success");
    } catch {
      addToast("Failed to update status. Please try again.", "error");
    } finally {
      setUpdatingId(null);
    }
  }

  async function handleLogout() {
    setLoggingOut(true);
    try {
      await fetch(`${API}/api/v1/auth/logout`, { method: "POST", credentials: "include" });
      addToast("Logged out successfully.", "success");
      setTimeout(() => router.push("/"), 400);
    } catch {
      addToast("Logout failed. Please try again.", "error");
      setLoggingOut(false);
    }
  }

  // ---------------------------------------------------------------------------
  // Render: loading / error
  // ---------------------------------------------------------------------------

  if (initialLoading) {
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
          <button onClick={() => router.push("/login")} className="mt-4 btn-on-light inline-flex items-center px-5 py-2.5 text-sm font-semibold">
            Back to Login
          </button>
        </div>
      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // Render: dashboard
  // ---------------------------------------------------------------------------

  return (
    <>
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
          <button
            onClick={handleLogout}
            disabled={loggingOut}
            className="inline-flex items-center gap-2 border-2 border-white px-4 py-2 text-xs font-semibold uppercase tracking-widest transition-colors hover:bg-white hover:text-black disabled:opacity-50"
          >
            {loggingOut ? "Logging out..." : "Logout"}
          </button>
        </div>
      </header>

      {/* Main */}
      <main className="content-shell mx-auto w-full px-4 py-10 sm:px-6 lg:px-12">

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            { label: "Total Quotes", value: quotesTotal },
            { label: "Total Messages", value: messagesTotal },
            { label: "This Page (Quotes)", value: quotes.length },
            { label: "This Page (Messages)", value: messages.length },
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
                activeTab === tab ? "border-b-2 border-black bg-black text-white" : "text-black/40 hover:text-black"
              }`}
            >
              {tab === "quotes" ? `Quotes (${quotesTotal})` : `Messages (${messagesTotal})`}
            </button>
          ))}
        </div>

        {/* ── QUOTES ── */}
        {activeTab === "quotes" && (
          <div className="mt-6">

            {/* Filter bar */}
            <div className="mb-4 flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-widest text-black/40">Filter:</span>
              {(["all", "pending", "viewed", "contacted"] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => handleFilterChange(s)}
                  className={`border px-3 py-1.5 text-xs font-semibold uppercase tracking-widest transition-all duration-150 ${
                    statusFilter === s
                      ? "border-black bg-black text-white"
                      : "border-black/20 text-black/50 hover:border-black hover:text-black"
                  }`}
                >
                  {s === "all" ? "All" : s}
                </button>
              ))}
              {quotesLoading && (
                <svg className="ml-2 h-4 w-4 animate-spin text-black/30" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                </svg>
              )}
            </div>

            <div className="overflow-x-auto">
              {quotes.length === 0 ? (
                <p className="py-12 text-center text-sm text-black/40">
                  {statusFilter === "all" ? "No quote submissions yet." : `No quotes with status "${statusFilter}".`}
                </p>
              ) : (
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="border-b-2 border-black text-left">
                      {["Client", "Contact", "Property", "Services", "Status", "Date"].map((h) => (
                        <th key={h} className="py-3 pr-4 text-xs font-bold uppercase tracking-widest text-black/40">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className={quotesLoading ? "opacity-50" : ""}>
                    {quotes.map((q) => (
                      <tr key={q.id} className="border-b border-black/10 hover:bg-black/2">
                        <td className="py-4 pr-4 font-medium">{q.client_name}</td>
                        <td className="py-4 pr-4">
                          <div className="flex flex-col gap-0.5">
                            <a href={`mailto:${q.client_email}`} className="hover:underline">{q.client_email}</a>
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
                            className={`cursor-pointer border px-2 py-1 text-xs font-semibold uppercase tracking-wider outline-none transition-opacity disabled:opacity-50 ${statusColors[q.status]}`}
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

            <Pagination page={quotesPage} totalPages={quotesTotalPages} onPage={setQuotesPage} />
          </div>
        )}

        {/* ── MESSAGES ── */}
        {activeTab === "messages" && (
          <div className="mt-6">
            <div className="overflow-x-auto">
              {messages.length === 0 ? (
                <p className="py-12 text-center text-sm text-black/40">No contact messages yet.</p>
              ) : (
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="border-b-2 border-black text-left">
                      {["Name", "Contact", "Subject", "Message", "Date"].map((h) => (
                        <th key={h} className="py-3 pr-4 text-xs font-bold uppercase tracking-widest text-black/40">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className={messagesLoading ? "opacity-50" : ""}>
                    {messages.map((m) => (
                      <tr key={m.id} className="border-b border-black/10 hover:bg-black/2">
                        <td className="py-4 pr-4 font-medium">{m.name}</td>
                        <td className="py-4 pr-4">
                          <div className="flex flex-col gap-0.5">
                            <a href={`mailto:${m.email}`} className="hover:underline">{m.email}</a>
                            {m.phone && <a href={`tel:${m.phone}`} className="text-black/50">{m.phone}</a>}
                          </div>
                        </td>
                        <td className="py-4 pr-4 text-black/60">{m.subject ?? "—"}</td>
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

            <Pagination page={messagesPage} totalPages={messagesTotalPages} onPage={setMessagesPage} />
          </div>
        )}

      </main>
    </div>
    <ToastContainer toasts={toasts} onDismiss={dismiss} />
    </>
  );
}
