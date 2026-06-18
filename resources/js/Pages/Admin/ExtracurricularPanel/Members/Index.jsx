import { Head, Link, router } from "@inertiajs/react";
import ExtracurricularAdminLayout from "../../Layouts/ExtracurricularAdminLayout";

function SummaryCard({ label, value, icon }) {
    return (
        <div className="rounded-[22px] border border-slate-200 bg-white p-5 shadow-xl shadow-slate-200/70">
            <div className="flex items-center justify-between gap-4">
                <div>
                    <p className="text-[12px] font-extrabold uppercase tracking-[0.14em] text-slate-400">
                        {label}
                    </p>
                    <h3 className="mt-3 text-[34px] font-black tracking-[-0.05em] text-[#061b46]">
                        {value || 0}
                    </h3>
                </div>
                <div className="flex h-14 w-14 items-center justify-center rounded-[18px] bg-teal-50 text-[30px]">
                    {icon}
                </div>
            </div>
        </div>
    );
}

function StatusBadge({ active }) {
    return (
        <span
            className={`inline-flex rounded-full px-3 py-1 text-[11px] font-extrabold uppercase tracking-[0.08em] ring-1 ${
                active
                    ? "bg-emerald-50 text-emerald-700 ring-emerald-100"
                    : "bg-red-50 text-red-700 ring-red-100"
            }`}
        >
            {active ? "Aktif" : "Nonaktif"}
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
                            ? "bg-slate-50 text-slate-600 hover:bg-teal-50 hover:text-teal-700"
                            : "cursor-not-allowed bg-slate-100 text-slate-300"
                    }`}
                    dangerouslySetInnerHTML={{ __html: link.label }}
                />
            ))}
        </div>
    );
}

export default function Index({ members = {}, programs = [], filters = {}, summary = {} }) {
    const rows = members?.data || [];

    const updateFilter = (key, value) => {
        router.get(
            "/admin/ekstrakurikuler/members",
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

    return (
        <ExtracurricularAdminLayout title="Anggota Ekskul">
            <Head title="Anggota Ekskul" />

            <div className="mb-6 flex flex-col gap-4 rounded-[28px] bg-gradient-to-br from-[#052b66] to-[#0f766e] p-6 text-white shadow-2xl shadow-blue-200 sm:p-8 lg:flex-row lg:items-center lg:justify-between">
                <div>
                    <p className="text-[12px] font-extrabold uppercase tracking-[0.22em] text-[#f7c46a]">
                        Ekstrakurikuler
                    </p>
                    <h1 className="mt-3 text-[34px] font-black leading-tight tracking-[-0.05em] sm:text-[42px]">
                        Anggota Ekskul
                    </h1>
                    <p className="mt-4 max-w-2xl text-[14px] font-medium leading-7 text-blue-100">
                        Kelola anggota ekstrakurikuler. Data dapat ditambah manual atau otomatis masuk saat pendaftar ekskul berstatus Diterima.
                    </p>
                </div>

                <Link
                    href="/admin/ekstrakurikuler/members/create"
                    className="inline-flex min-h-[50px] items-center justify-center rounded-[16px] bg-[#f7c46a] px-6 text-[13px] font-extrabold uppercase tracking-[0.08em] text-[#061b46] transition hover:bg-yellow-300"
                >
                    Tambah Anggota
                </Link>
            </div>

            <div className="mb-6 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                <SummaryCard label="Total Anggota" value={summary.total || 0} icon="👥" />
                <SummaryCard label="Aktif" value={summary.active || 0} icon="✅" />
                <SummaryCard label="Nonaktif" value={summary.inactive || 0} icon="⏸️" />
                <SummaryCard label="Program" value={summary.programs || 0} icon="🏆" />
            </div>

            <div className="mb-6 rounded-[24px] border border-slate-200 bg-white p-5 shadow-xl shadow-slate-200/70">
                <div className="grid gap-4 lg:grid-cols-[1fr_240px_190px]">
                    <input
                        type="text"
                        defaultValue={filters.search || ""}
                        onKeyDown={(event) => {
                            if (event.key === "Enter") {
                                updateFilter("search", event.target.value);
                            }
                        }}
                        placeholder="Cari nama, NISN, kelas, program, peran..."
                        className="h-[52px] rounded-[16px] border border-slate-200 px-4 text-[14px] font-semibold outline-none focus:border-teal-400 focus:ring-4 focus:ring-teal-100"
                    />

                    <select
                        value={filters.program_id || "all"}
                        onChange={(event) => updateFilter("program_id", event.target.value)}
                        className="h-[52px] rounded-[16px] border border-slate-200 px-4 text-[14px] font-semibold outline-none focus:border-teal-400 focus:ring-4 focus:ring-teal-100"
                    >
                        <option value="all">Semua Program</option>
                        {programs.map((program) => (
                            <option key={program.id} value={program.id}>
                                {program.name}
                            </option>
                        ))}
                    </select>

                    <select
                        value={filters.status || "all"}
                        onChange={(event) => updateFilter("status", event.target.value)}
                        className="h-[52px] rounded-[16px] border border-slate-200 px-4 text-[14px] font-semibold outline-none focus:border-teal-400 focus:ring-4 focus:ring-teal-100"
                    >
                        <option value="all">Semua Status</option>
                        <option value="active">Aktif</option>
                        <option value="inactive">Nonaktif</option>
                    </select>
                </div>
            </div>

            <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-xl shadow-slate-200/70">
                {rows.length > 0 ? (
                    <>
                        <div className="overflow-x-auto">
                            <table className="w-full min-w-[1100px] text-left">
                                <thead className="bg-slate-50">
                                    <tr>
                                        <th className="px-5 py-4 text-[12px] font-extrabold uppercase tracking-[0.12em] text-slate-400">Anggota</th>
                                        <th className="px-5 py-4 text-[12px] font-extrabold uppercase tracking-[0.12em] text-slate-400">Program</th>
                                        <th className="px-5 py-4 text-[12px] font-extrabold uppercase tracking-[0.12em] text-slate-400">Kontak</th>
                                        <th className="px-5 py-4 text-[12px] font-extrabold uppercase tracking-[0.12em] text-slate-400">Peran</th>
                                        <th className="px-5 py-4 text-[12px] font-extrabold uppercase tracking-[0.12em] text-slate-400">Bergabung</th>
                                        <th className="px-5 py-4 text-[12px] font-extrabold uppercase tracking-[0.12em] text-slate-400">Status</th>
                                        <th className="px-5 py-4 text-right text-[12px] font-extrabold uppercase tracking-[0.12em] text-slate-400">Aksi</th>
                                    </tr>
                                </thead>

                                <tbody className="divide-y divide-slate-100">
                                    {rows.map((member) => (
                                        <tr key={member.id} className="hover:bg-slate-50">
                                            <td className="px-5 py-5">
                                                <p className="text-[14px] font-black text-[#061b46]">{member.student_name}</p>
                                                <p className="mt-1 text-[12px] font-semibold text-slate-500">NISN: {member.nisn || "-"}</p>
                                                <p className="mt-1 text-[12px] font-semibold text-slate-400">Kelas: {member.class_name || "-"}</p>
                                            </td>
                                            <td className="px-5 py-5 text-[13px] font-bold text-slate-600">
                                                {member.extracurricular_name || member.program_title || "-"}
                                            </td>
                                            <td className="px-5 py-5">
                                                <p className="text-[13px] font-semibold text-slate-700">{member.phone || "-"}</p>
                                                <p className="mt-1 text-[12px] font-semibold text-slate-400">{member.email || "-"}</p>
                                            </td>
                                            <td className="px-5 py-5 text-[13px] font-bold text-[#061b46]">{member.role || "Anggota"}</td>
                                            <td className="px-5 py-5 text-[13px] font-semibold text-slate-600">{member.joined_at_label || "-"}</td>
                                            <td className="px-5 py-5"><StatusBadge active={member.is_active} /></td>
                                            <td className="px-5 py-5">
                                                <div className="flex justify-end gap-2">
                                                    <Link
                                                        href={`/admin/ekstrakurikuler/members/${member.id}/edit`}
                                                        className="inline-flex h-10 items-center justify-center rounded-xl bg-blue-50 px-4 text-[12px] font-extrabold text-blue-700 hover:bg-blue-100"
                                                    >
                                                        Edit
                                                    </Link>
                                                    <Link
                                                        href={`/admin/ekstrakurikuler/members/${member.id}`}
                                                        method="delete"
                                                        as="button"
                                                        preserveScroll
                                                        onBefore={() => confirm("Yakin ingin menghapus anggota ekskul ini?")}
                                                        className="inline-flex h-10 items-center justify-center rounded-xl bg-red-50 px-4 text-[12px] font-extrabold text-red-700 hover:bg-red-100"
                                                    >
                                                        Hapus
                                                    </Link>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <Pagination links={members.links || []} />
                    </>
                ) : (
                    <div className="px-6 py-16 text-center">
                        <div className="text-[54px]">👥</div>
                        <h3 className="mt-4 text-[24px] font-black tracking-[-0.04em] text-[#061b46]">Belum Ada Anggota Ekskul</h3>
                        <p className="mx-auto mt-2 max-w-md text-[14px] font-semibold leading-7 text-slate-500">
                            Tambahkan anggota manual atau terima pendaftar ekskul agar otomatis masuk sebagai anggota.
                        </p>
                        <Link
                            href="/admin/ekstrakurikuler/members/create"
                            className="mt-6 inline-flex min-h-[46px] items-center justify-center rounded-[14px] bg-[#061b46] px-6 text-[12px] font-extrabold uppercase tracking-[0.08em] text-white"
                        >
                            Tambah Anggota
                        </Link>
                    </div>
                )}
            </div>
        </ExtracurricularAdminLayout>
    );
}
