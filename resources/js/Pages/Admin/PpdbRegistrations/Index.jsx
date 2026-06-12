import { Head, Link, router } from "@inertiajs/react";
import AdminLayout from "../Layouts/AdminLayout";

function SummaryCard({ label, value, icon }) {
    return (
        <div className="rounded-[22px] border border-slate-200 bg-white p-5 shadow-xl shadow-slate-200/70">
            <div className="flex items-center justify-between gap-4">
                <div>
                    <p className="text-[12px] font-extrabold uppercase tracking-[0.14em] text-slate-400">
                        {label}
                    </p>

                    <h3 className="mt-3 text-[34px] font-black tracking-[-0.05em] text-[#061b46]">
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

function StatusBadge({ status }) {
    const styles = {
        Baru: "bg-yellow-50 text-yellow-700 ring-yellow-100",
        Diproses: "bg-blue-50 text-blue-700 ring-blue-100",
        Diterima: "bg-emerald-50 text-emerald-700 ring-emerald-100",
        Ditolak: "bg-red-50 text-red-700 ring-red-100",
    };

    return (
        <span
            className={`inline-flex rounded-full px-3 py-1 text-[11px] font-extrabold uppercase tracking-[0.08em] ring-1 ${
                styles[status] || styles.Baru
            }`}
        >
            {status || "Baru"}
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
                    className={`min-h-[38px] rounded-xl px-4 text-[12px] font-extrabold transition ${
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

export default function Index({
    registrations = {},
    filters = {},
    summary = {},
}) {
    const rows = registrations?.data || [];

    const updateFilter = (key, value) => {
        router.get(
            "/admin/ppdb-registrations",
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

    const exportUrl = `/admin/ppdb-registrations/export?status=${encodeURIComponent(
        filters.status || "all"
    )}&search=${encodeURIComponent(filters.search || "")}`;

    const exportPdfUrl = `/admin/ppdb-registrations/export-pdf?status=${encodeURIComponent(
        filters.status || "all"
    )}&search=${encodeURIComponent(filters.search || "")}`;

    return (
        <AdminLayout title="Pendaftar PPDB">
            <Head title="Pendaftar PPDB" />

            <div className="mb-6 flex flex-col gap-4 rounded-[28px] bg-gradient-to-br from-[#061b46] to-[#0b3b85] p-6 text-white shadow-2xl shadow-blue-200 sm:p-8 lg:flex-row lg:items-center lg:justify-between">
                <div>
                    <p className="text-[12px] font-extrabold uppercase tracking-[0.22em] text-[#f7c46a]">
                        PPDB
                    </p>

                    <h1 className="mt-3 text-[34px] font-black leading-tight tracking-[-0.05em] sm:text-[42px]">
                        Data Pendaftar PPDB
                    </h1>

                    <p className="mt-4 max-w-2xl text-[14px] font-medium leading-7 text-blue-100">
                        Kelola data pendaftaran peserta didik baru, verifikasi
                        dokumen, cetak formulir pendaftar, export CSV, dan unduh
                        laporan PDF.
                    </p>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                    {/* <a
                        href={exportUrl}
                        className="inline-flex min-h-[50px] items-center justify-center rounded-[16px] border border-white/15 bg-white/10 px-6 text-[13px] font-extrabold uppercase tracking-[0.08em] text-white transition hover:bg-white/20"
                    >
                        Export CSV
                    </a> */}

                    <a
                        href={exportPdfUrl}
                        className="inline-flex min-h-[50px] items-center justify-center rounded-[16px] border border-white/15 bg-white/10 px-6 text-[13px] font-extrabold uppercase tracking-[0.08em] text-white transition hover:bg-white/20"
                    >
                        Unduh PDF
                    </a>

                    <Link
                        href="/ppdb/daftar"
                        className="inline-flex min-h-[50px] items-center justify-center rounded-[16px] bg-[#f7c46a] px-6 text-[13px] font-extrabold uppercase tracking-[0.08em] text-[#061b46] transition hover:bg-yellow-300"
                    >
                        Lihat Form Frontend
                    </Link>
                </div>
            </div>

            <div className="mb-6 grid gap-5 md:grid-cols-2 xl:grid-cols-5">
                <SummaryCard label="Total" value={summary.total || 0} icon="📂" />
                <SummaryCard label="Baru" value={summary.baru || 0} icon="🆕" />
                <SummaryCard
                    label="Diproses"
                    value={summary.diproses || 0}
                    icon="🔎"
                />
                <SummaryCard
                    label="Diterima"
                    value={summary.diterima || 0}
                    icon="✅"
                />
                <SummaryCard
                    label="Ditolak"
                    value={summary.ditolak || 0}
                    icon="❌"
                />
            </div>

            <div className="mb-6 rounded-[24px] border border-slate-200 bg-white p-5 shadow-xl shadow-slate-200/70">
                <div className="grid gap-4 lg:grid-cols-[1fr_220px]">
                    <input
                        type="text"
                        defaultValue={filters.search || ""}
                        onKeyDown={(event) => {
                            if (event.key === "Enter") {
                                updateFilter("search", event.target.value);
                            }
                        }}
                        placeholder="Cari nama, nomor daftar, NISN, sekolah asal..."
                        className="h-[52px] rounded-[16px] border border-slate-200 px-4 text-[14px] font-semibold outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
                    />

                    <select
                        value={filters.status || "all"}
                        onChange={(event) =>
                            updateFilter("status", event.target.value)
                        }
                        className="h-[52px] rounded-[16px] border border-slate-200 px-4 text-[14px] font-semibold outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
                    >
                        <option value="all">Semua Status</option>
                        <option value="Baru">Baru</option>
                        <option value="Diproses">Diproses</option>
                        <option value="Diterima">Diterima</option>
                        <option value="Ditolak">Ditolak</option>
                    </select>
                </div>

                <div className="mt-4 flex flex-col gap-3 rounded-[18px] bg-slate-50 p-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <p className="text-[13px] font-extrabold text-[#061b46]">
                            Export mengikuti filter aktif
                        </p>

                        <p className="mt-1 text-[12px] font-semibold text-slate-500">
                            Status: {filters.status === "all" || !filters.status ? "Semua Status" : filters.status}
                            {" "}• Pencarian: {filters.search || "-"}
                        </p>
                    </div>

                    <div className="flex flex-col gap-2 sm:flex-row">
                        <a
                            href={exportUrl}
                            className="inline-flex min-h-[42px] items-center justify-center rounded-[14px] bg-white px-5 text-[12px] font-extrabold uppercase tracking-[0.08em] text-[#061b46] ring-1 ring-slate-200 transition hover:bg-blue-50"
                        >
                            Export CSV
                        </a>

                        <a
                            href={exportPdfUrl}
                            className="inline-flex min-h-[42px] items-center justify-center rounded-[14px] bg-[#061b46] px-5 text-[12px] font-extrabold uppercase tracking-[0.08em] text-white transition hover:bg-[#0b3b85]"
                        >
                            Unduh PDF
                        </a>
                    </div>
                </div>
            </div>

            <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-xl shadow-slate-200/70">
                {rows.length > 0 ? (
                    <>
                        <div className="overflow-x-auto">
                            <table className="w-full min-w-[980px] text-left">
                                <thead className="bg-slate-50">
                                    <tr>
                                        <th className="px-5 py-4 text-[12px] font-extrabold uppercase tracking-[0.12em] text-slate-400">
                                            Pendaftar
                                        </th>
                                        <th className="px-5 py-4 text-[12px] font-extrabold uppercase tracking-[0.12em] text-slate-400">
                                            Sekolah Asal
                                        </th>
                                        <th className="px-5 py-4 text-[12px] font-extrabold uppercase tracking-[0.12em] text-slate-400">
                                            Kontak
                                        </th>
                                        <th className="px-5 py-4 text-[12px] font-extrabold uppercase tracking-[0.12em] text-slate-400">
                                            Status
                                        </th>
                                        <th className="px-5 py-4 text-[12px] font-extrabold uppercase tracking-[0.12em] text-slate-400">
                                            Tanggal
                                        </th>
                                        <th className="px-5 py-4 text-right text-[12px] font-extrabold uppercase tracking-[0.12em] text-slate-400">
                                            Aksi
                                        </th>
                                    </tr>
                                </thead>

                                <tbody className="divide-y divide-slate-100">
                                    {rows.map((item) => (
                                        <tr
                                            key={item.id}
                                            className="hover:bg-slate-50"
                                        >
                                            <td className="px-5 py-5">
                                                <p className="text-[14px] font-black text-[#061b46]">
                                                    {item.student_name}
                                                </p>

                                                <p className="mt-1 text-[12px] font-semibold text-slate-500">
                                                    {item.registration_number ||
                                                        "-"}
                                                </p>

                                                <p className="mt-1 text-[12px] font-semibold text-slate-400">
                                                    NISN: {item.nisn || "-"}
                                                </p>
                                            </td>

                                            <td className="px-5 py-5 text-[13px] font-semibold text-slate-600">
                                                {item.previous_school || "-"}
                                            </td>

                                            <td className="px-5 py-5">
                                                <p className="text-[13px] font-semibold text-slate-700">
                                                    {item.phone || "-"}
                                                </p>

                                                <p className="mt-1 text-[12px] font-semibold text-slate-400">
                                                    {item.email || "-"}
                                                </p>
                                            </td>

                                            <td className="px-5 py-5">
                                                <StatusBadge
                                                    status={item.status}
                                                />
                                            </td>

                                            <td className="px-5 py-5 text-[13px] font-semibold text-slate-600">
                                                {item.submitted_at || "-"}
                                            </td>

                                            <td className="px-5 py-5">
                                                <div className="flex justify-end gap-2">
                                                    <Link
                                                        href={`/admin/ppdb-registrations/${item.id}`}
                                                        className="inline-flex h-10 items-center justify-center rounded-xl bg-blue-50 px-4 text-[12px] font-extrabold text-blue-700 hover:bg-blue-100"
                                                    >
                                                        Detail
                                                    </Link>

                                                    <a
                                                        href={`/admin/ppdb-registrations/${item.id}/print`}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        className="inline-flex h-10 items-center justify-center rounded-xl bg-emerald-50 px-4 text-[12px] font-extrabold text-emerald-700 hover:bg-emerald-100"
                                                    >
                                                        Print
                                                    </a>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <Pagination links={registrations.links || []} />
                    </>
                ) : (
                    <div className="p-10 text-center">
                        <div className="text-[52px]">📂</div>

                        <h3 className="mt-4 text-[22px] font-black text-[#061b46]">
                            Belum Ada Pendaftar
                        </h3>

                        <p className="mt-2 text-[13px] font-semibold text-slate-500">
                            Data pendaftar PPDB akan muncul setelah calon siswa
                            mengirim formulir.
                        </p>

                        <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
 \
                            <a
                                href={exportPdfUrl}
                                className="inline-flex min-h-[48px] items-center justify-center rounded-[16px] bg-[#061b46] px-6 text-[13px] font-extrabold uppercase tracking-[0.08em] text-white transition hover:bg-[#0b3b85]"
                            >
                                Unduh PDF
                            </a>
                        </div>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}