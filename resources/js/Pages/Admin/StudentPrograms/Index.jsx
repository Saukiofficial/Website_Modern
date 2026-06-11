import { Head, Link } from "@inertiajs/react";
import AdminLayout from "../Layouts/AdminLayout";

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

export default function Index({ programs = [] }) {
    return (
        <AdminLayout title="Program Kesiswaan">
            <Head title="Program Kesiswaan" />

            <div className="mb-6 flex flex-col gap-4 rounded-[28px] bg-gradient-to-br from-[#061b46] to-[#0b3b85] p-6 text-white shadow-2xl shadow-blue-200 sm:p-8 lg:flex-row lg:items-center lg:justify-between">
                <div>
                    <p className="text-[12px] font-extrabold uppercase tracking-[0.22em] text-[#f7c46a]">
                        Kesiswaan
                    </p>

                    <h1 className="mt-3 text-[34px] font-black leading-tight tracking-[-0.05em] sm:text-[42px]">
                        Program Kesiswaan
                    </h1>

                    <p className="mt-4 max-w-2xl text-[14px] font-medium leading-7 text-blue-100">
                        Kelola program kesiswaan, tampilan hero, detail
                        program, dan pilihan form pendaftaran.
                    </p>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row">
                    <Link
                        href="/kesiswaan"
                        className="inline-flex min-h-[50px] items-center justify-center rounded-[16px] border border-white/15 bg-white/10 px-6 text-[13px] font-extrabold uppercase tracking-[0.08em] text-white transition hover:bg-white/20"
                    >
                        Lihat Frontend
                    </Link>

                    <Link
                        href="/admin/student-programs/create"
                        className="inline-flex min-h-[50px] items-center justify-center rounded-[16px] bg-[#f7c46a] px-6 text-[13px] font-extrabold uppercase tracking-[0.08em] text-[#061b46] transition hover:bg-yellow-300"
                    >
                        Tambah Program
                    </Link>
                </div>
            </div>

            <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-xl shadow-slate-200/70 sm:p-6">
                {programs.length > 0 ? (
                    <div className="grid gap-5 xl:grid-cols-3">
                        {programs.map((program) => (
                            <div
                                key={program.id}
                                className="overflow-hidden rounded-[26px] border border-slate-200 bg-slate-50 shadow-md shadow-slate-200/60"
                            >
                                <div className="relative h-[180px] overflow-hidden bg-[#052b66]">
                                    <img
                                        src={
                                            program.hero_image_url ||
                                            "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=900&q=85"
                                        }
                                        alt={program.title}
                                        className="h-full w-full object-cover opacity-70"
                                    />

                                    <div className="absolute inset-0 bg-gradient-to-t from-[#061b46]/95 to-transparent" />

                                    <div className="absolute bottom-4 left-4 right-4">
                                        <div className="mb-3 flex items-center justify-between gap-3">
                                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-[25px] shadow-lg">
                                                {program.icon || "👥"}
                                            </div>

                                            <StatusBadge
                                                active={program.is_active}
                                            />
                                        </div>

                                        <h3 className="text-[22px] font-black leading-tight text-white">
                                            {program.title}
                                        </h3>
                                    </div>
                                </div>

                                <div className="p-5">
                                    <div className="flex flex-wrap gap-2">
                                        <span className="rounded-full bg-blue-50 px-3 py-1 text-[11px] font-extrabold uppercase tracking-[0.08em] text-blue-700 ring-1 ring-blue-100">
                                            {program.category || "Kesiswaan"}
                                        </span>

                                        <span className="rounded-full bg-slate-100 px-3 py-1 text-[11px] font-extrabold text-slate-500">
                                            /{program.slug}
                                        </span>
                                    </div>

                                    <p className="mt-4 line-clamp-3 text-[13px] font-semibold leading-6 text-slate-600">
                                        {program.description || "-"}
                                    </p>

                                    <div className="mt-5 grid grid-cols-2 gap-3">
                                        <div className="rounded-[16px] bg-white p-4">
                                            <p className="text-[22px] font-black text-[#061b46]">
                                                {program.interest_options?.length ||
                                                    0}
                                            </p>

                                            <p className="mt-1 text-[11px] font-bold text-slate-500">
                                                Opsi Form
                                            </p>
                                        </div>

                                        <div className="rounded-[16px] bg-white p-4">
                                            <p className="text-[22px] font-black text-[#061b46]">
                                                {program.points?.length || 0}
                                            </p>

                                            <p className="mt-1 text-[11px] font-bold text-slate-500">
                                                Detail Poin
                                            </p>
                                        </div>
                                    </div>

                                    <div className="mt-5 flex gap-2">
                                        <Link
                                            href={`/admin/student-programs/${program.id}/edit`}
                                            className="inline-flex h-11 flex-1 items-center justify-center rounded-xl bg-blue-50 px-4 text-[12px] font-extrabold text-blue-700 transition hover:bg-blue-100"
                                        >
                                            Edit
                                        </Link>

                                        <Link
                                            href={`/admin/student-programs/${program.id}`}
                                            method="delete"
                                            as="button"
                                            preserveScroll
                                            onBefore={() =>
                                                confirm(
                                                    "Yakin ingin menghapus program ini?"
                                                )
                                            }
                                            className="inline-flex h-11 items-center justify-center rounded-xl bg-red-50 px-4 text-[12px] font-extrabold text-red-700 transition hover:bg-red-100"
                                        >
                                            Hapus
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="rounded-[22px] border border-dashed border-slate-200 bg-slate-50 p-10 text-center">
                        <div className="text-[48px]">👥</div>

                        <h3 className="mt-4 text-[22px] font-black text-[#061b46]">
                            Belum Ada Program Kesiswaan
                        </h3>

                        <p className="mt-2 text-[13px] font-semibold text-slate-500">
                            Tambahkan program kesiswaan pertama untuk ditampilkan
                            di frontend.
                        </p>

                        <Link
                            href="/admin/student-programs/create"
                            className="mt-6 inline-flex min-h-[48px] items-center justify-center rounded-[16px] bg-[#061b46] px-6 text-[13px] font-extrabold uppercase tracking-[0.08em] text-white transition hover:bg-[#0b3b85]"
                        >
                            Tambah Program
                        </Link>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}