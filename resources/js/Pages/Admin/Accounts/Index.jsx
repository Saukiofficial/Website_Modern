import { Head, Link, router } from "@inertiajs/react";
import AdminLayout from "../Layouts/AdminLayout";

function SummaryCard({ label, value, icon }) {
    return (
        <div className="rounded-[22px] border border-slate-200 bg-white p-5 shadow-xl shadow-slate-200/70">
            <div className="flex items-center justify-between gap-4">
                <div>
                    <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-slate-400">
                        {label}
                    </p>
                    <h3 className="mt-3 text-[34px] font-semibold tracking-[-0.05em] text-[#061b46]">
                        {value}
                    </h3>
                </div>
                <div className="flex h-14 w-14 items-center justify-center rounded-[18px] bg-blue-50 text-[30px]">
                    {icon}
                </div>
            </div>
        </div>
    );
}

function RoleBadge({ role, label }) {
    const styles = {
        super_admin: "bg-[#061b46] text-white ring-[#061b46]",
        ppdb_admin: "bg-emerald-50 text-emerald-700 ring-emerald-100",
        osis_admin: "bg-blue-50 text-blue-700 ring-blue-100",
        extracurricular_admin: "bg-yellow-50 text-yellow-700 ring-yellow-100",
    };

    return (
        <span
            className={`inline-flex rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] ring-1 ${
                styles[role] || "bg-slate-50 text-slate-600 ring-slate-100"
            }`}
        >
            {label || role || "Administrator"}
        </span>
    );
}

function Pagination({ links = [] }) {
    if (!links.length) return null;

    return (
        <div className="flex flex-wrap items-center justify-end gap-2 border-t border-slate-100 px-5 py-4">
            {links.map((link, index) => (
                <button
                    key={index}
                    type="button"
                    disabled={!link.url}
                    onClick={() => {
                        if (link.url) {
                            router.visit(link.url, {
                                preserveScroll: true,
                                preserveState: true,
                            });
                        }
                    }}
                    className={`min-h-[38px] rounded-xl px-4 text-[12px] font-semibold transition ${
                        link.active
                            ? "bg-[#061b46] text-white"
                            : link.url
                            ? "bg-slate-50 text-slate-600 hover:bg-blue-50 hover:text-blue-700"
                            : "cursor-not-allowed bg-slate-100 text-slate-300"
                    }`}
                    dangerouslySetInnerHTML={{ __html: link.label }}
                />
            ))}
        </div>
    );
}

export default function Index({ accounts = {}, filters = {}, roles = {}, summary = {} }) {
    const rows = accounts?.data || [];

    const updateFilter = (key, value) => {
        router.get(
            "/admin/accounts",
            {
                ...filters,
                [key]: value,
            },
            {
                preserveState: true,
                preserveScroll: true,
                replace: true,
            }
        );
    };

    const deleteAccount = (account) => {
        if (!account.can_delete) {
            alert("Akun ini tidak bisa dihapus.");
            return;
        }

        if (confirm(`Yakin ingin menghapus akun ${account.name}?`)) {
            router.delete(`/admin/accounts/${account.id}`, {
                preserveScroll: true,
            });
        }
    };

    return (
        <AdminLayout title="Manajemen Akun">
            <Head title="Manajemen Akun" />

            <div className="mb-6 flex flex-col gap-4 rounded-[28px] bg-gradient-to-br from-[#061b46] to-[#0b3b85] p-6 text-white shadow-2xl shadow-blue-200 sm:p-8 lg:flex-row lg:items-center lg:justify-between">
                <div>
                    <p className="text-[12px] font-semibold uppercase tracking-[0.22em] text-[#f7c46a]">
                        Sistem Admin
                    </p>

                    <h1 className="mt-3 text-[34px] font-semibold leading-tight tracking-[-0.05em] sm:text-[42px]">
                        Manajemen Akun
                    </h1>

                    <p className="mt-4 max-w-2xl text-[14px] font-medium leading-7 text-blue-100">
                        Kelola akun login untuk Super Admin, Admin PPDB, Admin OSIS, dan Admin Ekstrakurikuler.
                    </p>
                </div>

                <Link
                    href="/admin/accounts/create"
                    className="inline-flex min-h-[50px] items-center justify-center rounded-[16px] bg-[#f7c46a] px-6 text-[13px] font-semibold uppercase tracking-[0.08em] text-[#061b46] transition hover:bg-yellow-300"
                >
                    Tambah Akun
                </Link>
            </div>

            <div className="mb-6 grid gap-5 md:grid-cols-2 xl:grid-cols-5">
                <SummaryCard label="Total Akun" value={summary.total || 0} icon="🔐" />
                <SummaryCard label="Super Admin" value={summary.super_admin || 0} icon="👑" />
                <SummaryCard label="Admin PPDB" value={summary.ppdb_admin || 0} icon="📝" />
                <SummaryCard label="Admin OSIS" value={summary.osis_admin || 0} icon="👥" />
                <SummaryCard label="Admin Ekskul" value={summary.extracurricular_admin || 0} icon="🏆" />
            </div>

            <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-xl shadow-slate-200/70">
                <div className="grid gap-4 lg:grid-cols-[1fr_260px_160px]">
                    <input
                        type="text"
                        defaultValue={filters.search || ""}
                        onKeyDown={(event) => {
                            if (event.key === "Enter") {
                                updateFilter("search", event.target.value);
                            }
                        }}
                        placeholder="Cari nama atau email akun..."
                        className="h-[52px] rounded-[16px] border border-slate-200 px-4 text-[14px] font-medium outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
                    />

                    <select
                        value={filters.role || "all"}
                        onChange={(event) => updateFilter("role", event.target.value)}
                        className="h-[52px] rounded-[16px] border border-slate-200 px-4 text-[14px] font-medium outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
                    >
                        <option value="all">Semua Role</option>
                        {Object.entries(roles).map(([value, label]) => (
                            <option key={value} value={value}>
                                {label}
                            </option>
                        ))}
                    </select>

                    <button
                        type="button"
                        onClick={() => router.visit("/admin/accounts")}
                        className="inline-flex min-h-[52px] items-center justify-center rounded-[16px] bg-slate-50 px-5 text-[12px] font-semibold uppercase tracking-[0.08em] text-[#061b46] ring-1 ring-slate-200 transition hover:bg-blue-50"
                    >
                        Reset
                    </button>
                </div>
            </div>

            <div className="mt-6 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-xl shadow-slate-200/70">
                {rows.length > 0 ? (
                    <>
                        <div className="overflow-x-auto">
                            <table className="w-full min-w-[980px] text-left">
                                <thead className="bg-slate-50">
                                    <tr>
                                        <th className="px-5 py-4 text-[12px] font-semibold uppercase tracking-[0.12em] text-slate-400">Akun</th>
                                        <th className="px-5 py-4 text-[12px] font-semibold uppercase tracking-[0.12em] text-slate-400">Role</th>
                                        <th className="px-5 py-4 text-[12px] font-semibold uppercase tracking-[0.12em] text-slate-400">Dibuat</th>
                                        <th className="px-5 py-4 text-right text-[12px] font-semibold uppercase tracking-[0.12em] text-slate-400">Aksi</th>
                                    </tr>
                                </thead>

                                <tbody className="divide-y divide-slate-100">
                                    {rows.map((account) => (
                                        <tr key={account.id} className="hover:bg-slate-50">
                                            <td className="px-5 py-5">
                                                <div className="flex items-center gap-4">
                                                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#061b46] text-[16px] font-semibold text-white">
                                                        {account.name?.charAt(0)?.toUpperCase() || "A"}
                                                    </div>

                                                    <div>
                                                        <div className="flex items-center gap-2">
                                                            <p className="text-[14px] font-semibold text-[#061b46]">
                                                                {account.name}
                                                            </p>

                                                            {account.is_current_user ? (
                                                                <span className="rounded-full bg-blue-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.08em] text-blue-700 ring-1 ring-blue-100">
                                                                    Anda
                                                                </span>
                                                            ) : null}
                                                        </div>

                                                        <p className="mt-1 text-[12px] font-medium text-slate-500">
                                                            {account.email}
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>

                                            <td className="px-5 py-5">
                                                <RoleBadge role={account.role} label={account.role_label} />
                                            </td>

                                            <td className="px-5 py-5 text-[13px] font-medium text-slate-600">
                                                {account.created_at || "-"}
                                            </td>

                                            <td className="px-5 py-5">
                                                <div className="flex justify-end gap-2">
                                                    <Link
                                                        href={`/admin/accounts/${account.id}/edit`}
                                                        className="inline-flex h-10 items-center justify-center rounded-xl bg-blue-50 px-4 text-[12px] font-semibold text-blue-700 transition hover:bg-blue-100"
                                                    >
                                                        Edit
                                                    </Link>

                                                    <button
                                                        type="button"
                                                        disabled={!account.can_delete}
                                                        onClick={() => deleteAccount(account)}
                                                        className="inline-flex h-10 items-center justify-center rounded-xl bg-red-50 px-4 text-[12px] font-semibold text-red-700 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-45"
                                                    >
                                                        Hapus
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <Pagination links={accounts.links || []} />
                    </>
                ) : (
                    <div className="p-10 text-center">
                        <div className="text-[52px]">🔐</div>
                        <h3 className="mt-4 text-[22px] font-semibold text-[#061b46]">
                            Belum Ada Akun
                        </h3>
                        <p className="mt-2 text-[13px] font-medium text-slate-500">
                            Tambahkan akun admin untuk mengelola panel sekolah.
                        </p>
                        <Link
                            href="/admin/accounts/create"
                            className="mt-6 inline-flex min-h-[46px] items-center justify-center rounded-[15px] bg-[#061b46] px-5 text-[12px] font-semibold uppercase tracking-[0.08em] text-white transition hover:bg-[#0b3b85]"
                        >
                            Tambah Akun
                        </Link>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}
