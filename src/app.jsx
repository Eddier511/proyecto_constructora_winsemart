// src/App.jsx
import React, { useMemo, useState } from "react";

// --- Dummy data -------------------------------------------------------------
const INITIAL_TICKETS = [
  {
    id: 98765,
    requester: "Jose D.",
    subject: "Support for theme",
    assignee: "L. Quinn",
    priority: "Medium",
    status: "Open",
    createdAt: "2021-01-01",
    dueDate: "2021-01-01",
  },
  {
    id: 98767,
    requester: "E. Brown",
    subject: "Your application received",
    assignee: "C. Stone",
    priority: "Low",
    status: "Closed",
    createdAt: "2021-01-01",
    dueDate: "2021-02-05",
  },
  {
    id: 98770,
    requester: "Gerora",
    subject: "Verify your email",
    assignee: "R. West",
    priority: "High",
    status: "Open",
    createdAt: "2021-01-11",
    dueDate: "2021-01-14",
  },
  {
    id: 98772,
    requester: "Karen lian",
    subject: "Support for theme",
    assignee: "L. Quinn",
    priority: "Medium",
    status: "Open",
    createdAt: "2021-01-12",
    dueDate: "2021-01-15",
  },
  {
    id: 98785,
    requester: "Mark diaz",
    subject: "Calling for help",
    assignee: "M. Hart",
    priority: "High",
    status: "Closed",
    createdAt: "2021-01-12",
    dueDate: "2021-01-19",
  },
  {
    id: 98790,
    requester: "JosJoes D.",
    subject: "Management",
    assignee: "S. Ray",
    priority: "Low",
    status: "Closed",
    createdAt: "2021-01-13",
    dueDate: "2021-01-20",
  },
  {
    id: 98799,
    requester: "Phyllia Maciel",
    subject: "Support for theme",
    assignee: "J. Park",
    priority: "Medium",
    status: "Open",
    createdAt: "2021-01-14",
    dueDate: "2021-01-20",
  },
  {
    id: 98812,
    requester: "Mark john D.",
    subject: "Verify your email",
    assignee: "N. Cole",
    priority: "Medium",
    status: "Closed",
    createdAt: "2021-01-15",
    dueDate: "2021-01-22",
  },
  {
    id: 98823,
    requester: "E. Brown",
    subject: "Support for theme",
    assignee: "C. Stone",
    priority: "Low",
    status: "Open",
    createdAt: "2021-01-15",
    dueDate: "2021-01-23",
  },
];

const priorities = ["Low", "Medium", "High"];
const statuses = ["Open", "Closed", "Pending", "Deleted"];

// --- UI helpers --------------------------------------------------------------
function classNames(...c) {
  return c.filter(Boolean).join(" ");
}

function Badge({ children, type }) {
  const map = {
    priority: {
      Low: "bg-blue-50 text-blue-700 border-blue-200",
      Medium: "bg-amber-50 text-amber-700 border-amber-200",
      High: "bg-rose-50 text-rose-700 border-rose-200",
    },
    status: {
      Open: "bg-emerald-50 text-emerald-700 border-emerald-200",
      Closed: "bg-zinc-100 text-zinc-700 border-zinc-200",
      Pending: "bg-amber-50 text-amber-700 border-amber-200",
      Deleted: "bg-rose-50 text-rose-700 border-rose-200",
    },
  };
  const style =
    type === "priority" ? map.priority[children] : map.status[children];
  return (
    <span
      className={classNames(
        "inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-full border",
        style
      )}
    >
      {children}
    </span>
  );
}

function Card({ title, value, icon }) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-100">
        {icon}
      </div>
      <div>
        <p className="text-sm text-zinc-500">{title}</p>
        <p className="text-2xl font-semibold text-zinc-900">
          {value.toLocaleString()}
        </p>
      </div>
    </div>
  );
}

function SidebarItem({ label, active = false }) {
  return (
    <button
      className={classNames(
        "flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm",
        active ? "bg-zinc-900 text-white" : "text-zinc-600 hover:bg-zinc-100"
      )}
    >
      <span className="inline-block h-2 w-2 rounded-full bg-current" />
      <span>{label}</span>
    </button>
  );
}

function Topbar() {
  return (
    <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b border-zinc-200 bg-white px-6">
      <div className="flex items-center gap-3">
        <h1 className="text-lg font-semibold text-zinc-900">Tickets</h1>
        <span className="text-sm text-zinc-400">Home / Tickets</span>
      </div>
      <div className="flex items-center gap-4">
        <button className="rounded-xl border border-zinc-200 px-3 py-1.5 text-sm text-zinc-600 hover:bg-zinc-50">
          + New
        </button>
        <div className="hidden md:flex items-center rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-1.5 text-sm text-zinc-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="mr-2 h-4 w-4"
          >
            <path d="M10 2a8 8 0 105.293 14.293l4.707 4.707 1.414-1.414-4.707-4.707A8 8 0 0010 2zM4 10a6 6 0 1112 0A6 6 0 014 10z" />
          </svg>
          <input placeholder="Search" className="bg-transparent outline-none" />
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-sm font-medium text-zinc-800">Eddier Soto</p>
            <p className="text-xs text-zinc-500">Admin</p>
          </div>
          <img
            className="h-9 w-9 rounded-full object-cover"
            src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=96&q=60&auto=format&fit=crop"
            alt="avatar"
          />
        </div>
      </div>
    </header>
  );
}

function TicketsTable({ data }) {
  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");

  const filtered = useMemo(() => {
    return data.filter(
      (t) =>
        (statusFilter === "All" || t.status === statusFilter) &&
        (priorityFilter === "All" || t.priority === priorityFilter)
    );
  }, [data, statusFilter, priorityFilter]);

  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm">
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2">
          <label className="text-sm text-zinc-500">Status</label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-xl border border-zinc-200 bg-white px-2 py-1 text-sm"
          >
            {["All", ...statuses].map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-center gap-2">
          <label className="text-sm text-zinc-500">Priority</label>
          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="rounded-xl border border-zinc-200 bg-white px-2 py-1 text-sm"
          >
            {["All", ...priorities].map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="text-xs uppercase text-zinc-500">
            <tr>
              <th className="px-3 py-2">ID</th>
              <th className="px-3 py-2">Requester</th>
              <th className="px-3 py-2">Subject</th>
              <th className="px-3 py-2">Assignee</th>
              <th className="px-3 py-2">Priority</th>
              <th className="px-3 py-2">Status</th>
              <th className="px-3 py-2">Create Date</th>
              <th className="px-3 py-2">Due Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100">
            {filtered.map((t) => (
              <tr key={t.id} className="hover:bg-zinc-50">
                <td className="px-3 py-3 text-zinc-800">#{t.id}</td>
                <td className="px-3 py-3">{t.requester}</td>
                <td className="px-3 py-3 max-w-[280px]">
                  <span className="truncate block" title={t.subject}>
                    {t.subject}
                  </span>
                </td>
                <td className="px-3 py-3">{t.assignee}</td>
                <td className="px-3 py-3">
                  <Badge type="priority">{t.priority}</Badge>
                </td>
                <td className="px-3 py-3">
                  <Badge type="status">{t.status}</Badge>
                </td>
                <td className="px-3 py-3">{t.createdAt}</td>
                <td className="px-3 py-3">{t.dueDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// --- MAIN PAGE ---------------------------------------------------------------
export default function AdminTicketsDashboard() {
  const [tickets] = useState(INITIAL_TICKETS);

  const totals = useMemo(
    () => ({
      total: tickets.length,
      pending: tickets.filter((t) => t.status === "Pending").length,
      closed: tickets.filter((t) => t.status === "Closed").length,
      deleted: tickets.filter((t) => t.status === "Deleted").length,
    }),
    [tickets]
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-50 to-white">
      <div className="mx-auto grid max-w-[1400px] grid-cols-12 gap-6 p-6">
        {/* Sidebar */}
        <aside className="col-span-12 h-full rounded-3xl bg-white p-4 shadow-sm md:sticky md:top-6 md:col-span-2">
          <div className="mb-6 flex items-center gap-2 px-2">
            <div className="h-7 w-7 rounded-xl bg-zinc-900" />
            <span className="text-lg font-semibold text-zinc-900">Admin.</span>
          </div>
          <nav className="space-y-1">
            <SidebarItem label="Dashboard" />
            <SidebarItem label="Chat" />
            <SidebarItem label="Tickets" active />
          </nav>
        </aside>

        {/* Main */}
        <main className="col-span-12 rounded-3xl border border-zinc-200 bg-white/60 backdrop-blur md:col-span-10">
          <Topbar />
          <div className="space-y-6 p-6">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
              <Card
                title="Total Tickets"
                value={totals.total}
                icon={<div className="h-3 w-3 rounded-full bg-blue-500" />}
              />
              <Card
                title="Pending Tickets"
                value={totals.pending}
                icon={<div className="h-3 w-3 rounded-full bg-amber-500" />}
              />
              <Card
                title="Closed Tickets"
                value={totals.closed}
                icon={<div className="h-3 w-3 rounded-full bg-emerald-500" />}
              />
              <Card
                title="Deleted Tickets"
                value={totals.deleted}
                icon={<div className="h-3 w-3 rounded-full bg-rose-500" />}
              />
            </div>
            <TicketsTable data={tickets} />
          </div>
        </main>
      </div>
    </div>
  );
}
