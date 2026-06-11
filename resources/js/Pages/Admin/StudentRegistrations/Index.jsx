import { Head, Link, router } from "@inertiajs/react";
import { useEffect, useState } from "react";
import AdminLayout from "../Layouts/AdminLayout";

function StatusBadge({ status }) {
    const styles = {
        Baru: "bg-yellow-50 text-yellow-700 ring-yellow-100",
        Diproses: "bg-blue-50 text-blue-700 ring-blue-100",
        Selesai: "bg-emerald-50 text-emerald-700 ring-emerald-100",
    };

    return (
        <span
            className={`inline-flex rounded-full px-3 py-1 text-[11px] font-extrabold uppercase tracking-[0.08em] ring-1 ${
                styles[status] || styles.Baru
            }`}
        >
            {status}
        </span>
    );
}

function TypeBadge({ type, label }) {
    const styles = {
        osis: "bg-purple-50 text-purple-700 ring-purple-100",
        extracurricular: "bg-blue-50 text-blue-700 ring-blue-100",
        counseling: "bg-emerald-50 text-emerald-700 ring-emerald-100",
    };

    return (
        <span
            className={`inline-flex rounded-full px-3 py-1 text-[11px] font-extrabold uppercase tracking-[0.08em] ring-1 ${
                styles[type] || "bg-slate-100 text-slate-600 ring-slate-200"
            }`}
        >
            {label}
        </span>
    );
}

function SummaryCard({ label, value, icon }) {
    return (
        <div className="rounded-[22px] border border-slate-200 bg-white p-5 shadow-lg shadow-slate-200/60">
            <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-[26px]">
                    {icon}
                </div>

                <div>
                    <p className="text-[30px] font-black leading-none text-[#061b46]">
                        {value}
                    </p>

                    <p className="mt-2 text-[12px] font-bold text-slate-500">
                        {label}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default function Index({
    registrations,
    filters = {},
    summary = {},
}) {
    const [search, setSearch] = useState(filters.search || "");
    const [type, setType] = useState(filters.type || "all");
    const [status, setStatus] = useState(filters.status || "all");

    useEffect(() => {
        const timeout = setTimeout(() => {
            router.get(
                "/admin/student-registrations",
                {
                    search,
                    type,
                    status,
                },
                {
                    preserveState: true,
                    preserveScroll: true,
                    replace: true,
                }
            );
        }, 400);

        return () => clearTimeout(timeout);
    }, [search, type, status]);

    const rows = registrations?.data || [];

    return (
        <AdminLayout title="Pendaftaran Kesiswaan">
            <Head title="Pendaftaran Kesiswaan" />

            <div className="mb-6 rounded-[28px] bg-gradient-to-br from-[#061b46] to-[#0b3b85] p-6 text-white shadow-2xl shadow-blue-200 sm:p-8">
                <p className="text-[12px] font-extrabold uppercase tracking-[0.22em] text-[#f7c46a]">
                    Kesiswaan
                </p>

                <h1 className="mt-3 text-[34px] font-black leading-tight tracking-[-0.05em] sm:text-[42px]">
                    Pendaftaran Kesiswaan
                </h1>

                <p className="mt-4 max-w-3xl text-[14px] font-medium leading-7 text-blue-100">
                    Kelola data pendaftaran OSIS, ekstrakurikuler, dan layanan
                    bimbingan konseling yang dikirim dari frontend.
                </p>
            </div>

            <div className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <SummaryCard
                    label="Total Pendaftar"
                    value={summary.total || 0}
                    icon="📋"
                />
                <SummaryCard
                    label="Status Baru"
                    value={summary.baru || 0}
                    icon="🟡"
                />
                <SummaryCard
                    label="Diproses"
                    value={summary.diproses || 0}
                    icon="🔵"
                />
                <SummaryCard
                    label="Selesai"
                    value={summary.selesai || 0}
                    icon="✅"
                />
            </div>

            <div className="mb-6 grid gap-4 sm:grid-cols-3">
                <SummaryCard
                    label="OSIS"
                    value={summary.osis || 0}
                    icon="👥"
                />
                <SummaryCard
                    label="Ekstrakurikuler"
                    value={summary.extracurricular || 0}
                    icon="🏆"
                />
                <SummaryCard
                    label="Bimbingan Konseling"
                    value={summary.counseling || 0}
                    icon="🤝"
                />
            </div>

            <div className="mb-6 rounded-[24px] border border-slate-200 bg-white p-5 shadow-lg shadow-slate-200/60">
                <div className="grid gap-4 lg:grid-cols-[1fr_220px_220px]">
                    <div>
                        <label className="mb-2 block text-[12px] font-extrabold uppercase tracking-[0.12em] text-slate-500">
                            Cari Data
                        </label>

                        <input
                            type="text"
                            value={search}
                            onChange={(event) => setSearch(event.target.value)}
                            placeholder="Cari nama, NISN, kelas, nomor HP..."
                            className="h-[52px] w-full rounded-[14px] border border-slate-200 bg-white px-4 text-[14px] font-semibold text-slate-700 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-[12px] font-extrabold uppercase tracking-[0.12em] text-slate-500">
                            Jenis Form
                        </label>

                        <select
                            value={type}
                            onChange={(event) => setType(event.target.value)}
                            className="h-[52px] w-full rounded-[14px] border border-slate-200 bg-white px-4 text-[14px] font-semibold text-slate-700 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                        >
                            <option value="all">Semua</option>
                            <option value="osis">OSIS</option>
                            <option value="extracurricular">
                                Ekstrakurikuler
                            </option>
                            <option value="counseling">
                                Bimbingan Konseling
                            </option>
                        </select>
                    </div>

                    <div>
                        <label className="mb-2 block text-[12px] font-extrabold uppercase tracking-[0.12em] text-slate-500">
                            Status
                        </label>

                        <select
                            value={status}
                            onChange={(event) => setStatus(event.target.value)}
                            className="h-[52px] w-full rounded-[14px] border border-slate-200 bg-white px-4 text-[14px] font-semibold text-slate-700 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                        >
                            <option value="all">Semua</option>
                            <option value="Baru">Baru</option>
                            <option value="Diproses">Diproses</option>
                            <option value="Selesai">Selesai</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-xl shadow-slate-200/70 sm:p-6">
                {rows.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[1080px] border-separate border-spacing-y-3">
                            <thead>
                                <tr className="text-left text-[12px] font-extrabold uppercase tracking-[0.12em] text-slate-400">
                                    <th className="px-4 py-2">Pendaftar</th>
                                    <th className="px-4 py-2">Jenis</th>
                                    <th className="px-4 py-2">Kelas</th>
                                    <th className="px-4 py-2">Kontak</th>
                                    <th className="px-4 py-2">Tanggal</th>
                                    <th className="px-4 py-2">Status</th>
                                    <th className="px-4 py-2 text-right">
                                        Aksi
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {rows.map((item) => (
                                    <tr
                                        key={item.id}
                                        className="rounded-[20px] bg-slate-50 shadow-sm"
                                    >
                                        <td className="rounded-l-[20px] px-4 py-4">
                                            <h3 className="text-[14px] font-black text-[#061b46]">
                                                {item.student_name}
                                            </h3>

                                            <p className="mt-1 text-[12px] font-semibold text-slate-500">
                                                NISN: {item.nisn || "-"}
                                            </p>
                                        </td>

                                        <td className="px-4 py-4">
                                            <TypeBadge
                                                type={item.registration_type}
                                                label={item.type_label}
                                            />
                                        </td>

                                        <td className="px-4 py-4 text-[13px] font-bold text-slate-600">
                                            {item.class_name || "-"}
                                        </td>

                                        <td className="px-4 py-4 text-[13px] font-bold text-slate-600">
                                            <p>{item.phone || "-"}</p>
                                            <p className="mt-1 text-[12px] text-slate-400">
                                                {item.email || "-"}
                                            </p>
                                        </td>

                                        <td className="px-4 py-4 text-[13px] font-bold text-slate-600">
                                            {item.submitted_at || "-"}
                                        </td>

                                        <td className="px-4 py-4">
                                            <StatusBadge status={item.status} />
                                        </td>

                                        <td className="rounded-r-[20px] px-4 py-4">
                                            <div className="flex justify-end gap-2">
                                                <Link
                                                    href={`/admin/student-registrations/${item.id}`}
                                                    className="inline-flex h-10 items-center justify-center rounded-xl bg-blue-50 px-4 text-[12px] font-extrabold text-blue-700 transition hover:bg-blue-100"
                                                >
                                                    Detail
                                                </Link>

                                                <Link
                                                    href={`/admin/student-registrations/${item.id}`}
                                                    method="delete"
                                                    as="button"
                                                    preserveScroll
                                                    onBefore={() =>
                                                        confirm(
                                                            "Yakin ingin menghapus data pendaftaran ini?"
                                                        )
                                                    }
                                                    className="inline-flex h-10 items-center justify-center rounded-xl bg-red-50 px-4 text-[12px] font-extrabold text-red-700 transition hover:bg-red-100"
                                                >
                                                    Hapus
                                                </Link>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {registrations?.links?.length > 3 ? (
                            <div className="mt-6 flex flex-wrap gap-2">
                                {registrations.links.map((link, index) => (
                                    <button
                                        key={`${link.label}-${index}`}
                                        type="button"
                                        disabled={!link.url}
                                        onClick={() => {
                                            if (link.url) {
                                                router.visit(link.url, {
                                                    preserveScroll: true,
                                                });
                                            }
                                        }}
                                        className={`min-h-[38px] rounded-xl px-4 text-[12px] font-extrabold ${
                                            link.active
                                                ? "bg-[#061b46] text-white"
                                                : "bg-slate-100 text-slate-600 hover:bg-blue-50"
                                        } disabled:cursor-not-allowed disabled:opacity-40`}
                                        dangerouslySetInnerHTML={{
                                            __html: link.label,
                                        }}
                                    />
                                ))}
                            </div>
                        ) : null}
                    </div>
                ) : (
                    <div className="rounded-[22px] border border-dashed border-slate-200 bg-slate-50 p-10 text-center">
                        <div className="text-[48px]">📭</div>

                        <h3 className="mt-4 text-[22px] font-black text-[#061b46]">
                            Belum Ada Data Pendaftaran
                        </h3>

                        <p className="mt-2 text-[13px] font-semibold text-slate-500">
                            Data dari form frontend akan tampil di halaman ini.
                        </p>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}