import { Head, Link } from "@inertiajs/react";
import AdminLayout from "../../Layouts/AdminLayout";

function StatusBadge({ active }) {
    return (
        <span
            className={`inline-flex rounded-full px-3 py-1 text-[11px] font-extrabold uppercase tracking-[0.08em] ${
                active
                    ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100"
                    : "bg-red-50 text-red-700 ring-1 ring-red-100"
            }`}
        >
            {active ? "Aktif" : "Nonaktif"}
        </span>
    );
}

export default function Index({ osisMembers = [] }) {
    return (
        <AdminLayout title="Pengurus OSIS">
            <Head title="Pengurus OSIS" />

            <div className="mb-6 flex flex-col gap-4 rounded-[28px] bg-gradient-to-br from-[#061b46] to-[#0b3b85] p-6 text-white shadow-2xl shadow-blue-200 sm:p-8 lg:flex-row lg:items-center lg:justify-between">
                <div>
                    <p className="text-[12px] font-extrabold uppercase tracking-[0.22em] text-[#f7c46a]">
                        Akademik
                    </p>

                    <h1 className="mt-3 text-[34px] font-black leading-tight tracking-[-0.05em] sm:text-[42px]">
                        Pengurus OSIS
                    </h1>

                    <p className="mt-4 max-w-2xl text-[14px] font-medium leading-7 text-blue-100">
                        Kelola struktur pengurus OSIS, pengurus inti, jabatan,
                        kelas, periode, foto, dan status tampil di frontend.
                    </p>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row">
                    <Link
                        href="/akademik"
                        className="inline-flex min-h-[50px] items-center justify-center rounded-[16px] border border-white/15 bg-white/10 px-6 text-[13px] font-extrabold uppercase tracking-[0.08em] text-white transition hover:bg-white/20"
                    >
                        Lihat Frontend
                    </Link>

                    <Link
                        href="/admin/academics/osis-members/create"
                        className="inline-flex min-h-[50px] items-center justify-center rounded-[16px] bg-[#f7c46a] px-6 text-[13px] font-extrabold uppercase tracking-[0.08em] text-[#061b46] transition hover:bg-yellow-300"
                    >
                        Tambah Pengurus
                    </Link>
                </div>
            </div>

            <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-xl shadow-slate-200/70 sm:p-6">
                {osisMembers.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[980px] border-separate border-spacing-y-3">
                            <thead>
                                <tr className="text-left text-[12px] font-extrabold uppercase tracking-[0.12em] text-slate-400">
                                    <th className="px-4 py-2">Pengurus</th>
                                    <th className="px-4 py-2">Jabatan</th>
                                    <th className="px-4 py-2">Kelas</th>
                                    <th className="px-4 py-2">Periode</th>
                                    <th className="px-4 py-2">Urutan</th>
                                    <th className="px-4 py-2">Inti</th>
                                    <th className="px-4 py-2">Status</th>
                                    <th className="px-4 py-2 text-right">Aksi</th>
                                </tr>
                            </thead>

                            <tbody>
                                {osisMembers.map((member) => (
                                    <tr
                                        key={member.id}
                                        className="rounded-[20px] bg-slate-50 shadow-sm"
                                    >
                                        <td className="rounded-l-[20px] px-4 py-4">
                                            <div className="flex items-center gap-4">
                                                <img
                                                    src={
                                                        member.image_url ||
                                                        "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?auto=format&fit=crop&w=300&q=85"
                                                    }
                                                    alt={member.name}
                                                    className="h-14 w-14 rounded-2xl object-cover"
                                                />

                                                <div>
                                                    <h3 className="text-[14px] font-black text-[#061b46]">
                                                        {member.name}
                                                    </h3>

                                                    <p className="mt-1 max-w-[260px] truncate text-[12px] font-semibold text-slate-500">
                                                        {member.description || "-"}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>

                                        <td className="px-4 py-4 text-[13px] font-bold text-slate-600">
                                            {member.position || "-"}
                                        </td>

                                        <td className="px-4 py-4 text-[13px] font-bold text-slate-600">
                                            {member.class_name || "-"}
                                        </td>

                                        <td className="px-4 py-4 text-[13px] font-bold text-slate-600">
                                            {member.period || "-"}
                                        </td>

                                        <td className="px-4 py-4 text-[13px] font-black text-[#061b46]">
                                            {member.sort_order}
                                        </td>

                                        <td className="px-4 py-4">
                                            <span
                                                className={`inline-flex rounded-full px-3 py-1 text-[11px] font-extrabold uppercase tracking-[0.08em] ${
                                                    member.is_leader
                                                        ? "bg-blue-50 text-blue-700 ring-1 ring-blue-100"
                                                        : "bg-slate-100 text-slate-500"
                                                }`}
                                            >
                                                {member.is_leader ? "Ya" : "Tidak"}
                                            </span>
                                        </td>

                                        <td className="px-4 py-4">
                                            <StatusBadge active={member.is_active} />
                                        </td>

                                        <td className="rounded-r-[20px] px-4 py-4">
                                            <div className="flex justify-end gap-2">
                                                <Link
                                                    href={`/admin/academics/osis-members/${member.id}/edit`}
                                                    className="inline-flex h-10 items-center justify-center rounded-xl bg-blue-50 px-4 text-[12px] font-extrabold text-blue-700 transition hover:bg-blue-100"
                                                >
                                                    Edit
                                                </Link>

                                                <Link
                                                    href={`/admin/academics/osis-members/${member.id}`}
                                                    method="delete"
                                                    as="button"
                                                    preserveScroll
                                                    onBefore={() =>
                                                        confirm(
                                                            "Yakin ingin menghapus data pengurus OSIS ini?"
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
                    </div>
                ) : (
                    <div className="rounded-[22px] border border-dashed border-slate-200 bg-slate-50 p-10 text-center">
                        <div className="text-[48px]">👥</div>

                        <h3 className="mt-4 text-[22px] font-black text-[#061b46]">
                            Belum Ada Data Pengurus OSIS
                        </h3>

                        <p className="mt-2 text-[13px] font-semibold text-slate-500">
                            Tambahkan pengurus OSIS pertama agar tampil di
                            halaman akademik.
                        </p>

                        <Link
                            href="/admin/academics/osis-members/create"
                            className="mt-6 inline-flex min-h-[48px] items-center justify-center rounded-[16px] bg-[#061b46] px-6 text-[13px] font-extrabold uppercase tracking-[0.08em] text-white transition hover:bg-[#0b3b85]"
                        >
                            Tambah Pengurus
                        </Link>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}