import { Head, Link } from "@inertiajs/react";
import ExtracurricularAdminLayout from "../../Layouts/ExtracurricularAdminLayout";

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

export default function Index({ extracurriculars = [] }) {
    return (
        <ExtracurricularAdminLayout title="Program Ekstrakurikuler">
            <Head title="Ekstrakurikuler" />

            <div className="mb-6 flex flex-col gap-4 rounded-[28px] bg-gradient-to-br from-[#061b46] to-[#0b3b85] p-6 text-white shadow-2xl shadow-blue-200 sm:p-8 lg:flex-row lg:items-center lg:justify-between">
                <div>
                    <p className="text-[12px] font-extrabold uppercase tracking-[0.22em] text-[#f7c46a]">
                        Panel Ekstrakurikuler
                    </p>

                    <h1 className="mt-3 text-[34px] font-black leading-tight tracking-[-0.05em] sm:text-[42px]">
                        Ekstrakurikuler
                    </h1>

                    <p className="mt-4 max-w-2xl text-[14px] font-medium leading-7 text-blue-100">
                        Kelola kegiatan ekstrakurikuler, kategori, pembina,
                        jadwal, lokasi, dan gambar yang tampil di frontend.
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
                        href="/admin/ekstrakurikuler/programs/create"
                        className="inline-flex min-h-[50px] items-center justify-center rounded-[16px] bg-[#f7c46a] px-6 text-[13px] font-extrabold uppercase tracking-[0.08em] text-[#061b46] transition hover:bg-yellow-300"
                    >
                        Tambah Ekskul
                    </Link>
                </div>
            </div>

            <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-xl shadow-slate-200/70 sm:p-6">
                {extracurriculars.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[980px] border-separate border-spacing-y-3">
                            <thead>
                                <tr className="text-left text-[12px] font-extrabold uppercase tracking-[0.12em] text-slate-400">
                                    <th className="px-4 py-2">Ekstrakurikuler</th>
                                    <th className="px-4 py-2">Kategori</th>
                                    <th className="px-4 py-2">Pembina</th>
                                    <th className="px-4 py-2">Jadwal</th>
                                    <th className="px-4 py-2">Urutan</th>
                                    <th className="px-4 py-2">Status</th>
                                    <th className="px-4 py-2 text-right">Aksi</th>
                                </tr>
                            </thead>

                            <tbody>
                                {extracurriculars.map((item) => (
                                    <tr
                                        key={item.id}
                                        className="rounded-[20px] bg-slate-50 shadow-sm"
                                    >
                                        <td className="rounded-l-[20px] px-4 py-4">
                                            <div className="flex items-center gap-4">
                                                <img
                                                    src={
                                                        item.image_url ||
                                                        "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=300&q=85"
                                                    }
                                                    alt={item.name}
                                                    className="h-14 w-14 rounded-2xl object-cover"
                                                />

                                                <div>
                                                    <h3 className="text-[14px] font-black text-[#061b46]">
                                                        {item.name}
                                                    </h3>

                                                    <p className="mt-1 text-[12px] font-semibold text-slate-500">
                                                        /{item.slug}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>

                                        <td className="px-4 py-4 text-[13px] font-bold text-slate-600">
                                            {item.category || "-"}
                                        </td>

                                        <td className="px-4 py-4 text-[13px] font-bold text-slate-600">
                                            {item.coach_name || "-"}
                                        </td>

                                        <td className="px-4 py-4 text-[13px] font-bold text-slate-600">
                                            {item.schedule || "-"}
                                        </td>

                                        <td className="px-4 py-4 text-[13px] font-black text-[#061b46]">
                                            {item.sort_order}
                                        </td>

                                        <td className="px-4 py-4">
                                            <StatusBadge active={item.is_active} />
                                        </td>

                                        <td className="rounded-r-[20px] px-4 py-4">
                                            <div className="flex justify-end gap-2">
                                                <Link
                                                    href={`/admin/ekstrakurikuler/programs/${item.id}/edit`}
                                                    className="inline-flex h-10 items-center justify-center rounded-xl bg-blue-50 px-4 text-[12px] font-extrabold text-blue-700 transition hover:bg-blue-100"
                                                >
                                                    Edit
                                                </Link>

                                                <Link
                                                    href={`/admin/ekstrakurikuler/programs/${item.id}`}
                                                    method="delete"
                                                    as="button"
                                                    preserveScroll
                                                    onBefore={() =>
                                                        confirm(
                                                            "Yakin ingin menghapus data ekstrakurikuler ini?"
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
                        <div className="text-[48px]">🏆</div>

                        <h3 className="mt-4 text-[22px] font-black text-[#061b46]">
                            Belum Ada Data Ekstrakurikuler
                        </h3>

                        <p className="mt-2 text-[13px] font-semibold text-slate-500">
                            Tambahkan ekstrakurikuler pertama agar tampil di
                            halaman akademik.
                        </p>

                        <Link
                            href="/admin/ekstrakurikuler/programs/create"
                            className="mt-6 inline-flex min-h-[48px] items-center justify-center rounded-[16px] bg-[#061b46] px-6 text-[13px] font-extrabold uppercase tracking-[0.08em] text-white transition hover:bg-[#0b3b85]"
                        >
                            Tambah Ekskul
                        </Link>
                    </div>
                )}
            </div>
        </ExtracurricularAdminLayout>
    );
}