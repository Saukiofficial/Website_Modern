import { Head, Link } from "@inertiajs/react";
import AdminLayout from "../Layouts/AdminLayout";

function StatusBadge({ published }) {
    return (
        <span
            className={`inline-flex rounded-full px-3 py-1 text-[11px] font-extrabold uppercase tracking-[0.08em] ring-1 ${
                published
                    ? "bg-emerald-50 text-emerald-700 ring-emerald-100"
                    : "bg-slate-100 text-slate-600 ring-slate-200"
            }`}
        >
            {published ? "Published" : "Draft"}
        </span>
    );
}

export default function Index({ posts = [] }) {
    return (
        <AdminLayout title="Informasi">
            <Head title="Informasi" />

            <div className="mb-6 flex flex-col gap-4 rounded-[28px] bg-gradient-to-br from-[#061b46] to-[#0b3b85] p-6 text-white shadow-2xl shadow-blue-200 sm:p-8 lg:flex-row lg:items-center lg:justify-between">
                <div>
                    <p className="text-[12px] font-extrabold uppercase tracking-[0.22em] text-[#f7c46a]">
                        Konten Website
                    </p>

                    <h1 className="mt-3 text-[34px] font-black leading-tight tracking-[-0.05em] sm:text-[42px]">
                        Informasi & Berita
                    </h1>

                    <p className="mt-4 max-w-2xl text-[14px] font-medium leading-7 text-blue-100">
                        Kelola berita, artikel, pengumuman, dan informasi
                        sekolah yang tampil di frontend.
                    </p>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row">
                    <Link
                        href="/informasi"
                        className="inline-flex min-h-[50px] items-center justify-center rounded-[16px] border border-white/15 bg-white/10 px-6 text-[13px] font-extrabold uppercase tracking-[0.08em] text-white transition hover:bg-white/20"
                    >
                        Lihat Frontend
                    </Link>

                    <Link
                        href="/admin/posts/create"
                        className="inline-flex min-h-[50px] items-center justify-center rounded-[16px] bg-[#f7c46a] px-6 text-[13px] font-extrabold uppercase tracking-[0.08em] text-[#061b46] transition hover:bg-yellow-300"
                    >
                        Tambah Informasi
                    </Link>
                </div>
            </div>

            <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-xl shadow-slate-200/70 sm:p-6">
                {posts.length > 0 ? (
                    <div className="grid gap-5 xl:grid-cols-3">
                        {posts.map((post) => (
                            <div
                                key={post.id}
                                className="overflow-hidden rounded-[26px] border border-slate-200 bg-slate-50 shadow-md shadow-slate-200/60"
                            >
                                <div className="relative h-[190px] overflow-hidden bg-[#052b66]">
                                    <img
                                        src={
                                            post.thumbnail_url ||
                                            "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?auto=format&fit=crop&w=900&q=85"
                                        }
                                        alt={post.title}
                                        className="h-full w-full object-cover opacity-80"
                                    />

                                    <div className="absolute inset-0 bg-gradient-to-t from-[#061b46]/95 via-[#061b46]/30 to-transparent" />

                                    <div className="absolute left-4 top-4 flex flex-wrap gap-2">
                                        <StatusBadge
                                            published={post.is_published}
                                        />

                                        {post.is_featured ? (
                                            <span className="inline-flex rounded-full bg-yellow-50 px-3 py-1 text-[11px] font-extrabold uppercase tracking-[0.08em] text-yellow-700 ring-1 ring-yellow-100">
                                                Featured
                                            </span>
                                        ) : null}
                                    </div>

                                    <div className="absolute bottom-4 left-4 right-4">
                                        <p className="text-[11px] font-extrabold uppercase tracking-[0.12em] text-[#f7c46a]">
                                            {post.category || "Informasi"}
                                        </p>

                                        <h3 className="mt-2 line-clamp-2 text-[21px] font-black leading-tight text-white">
                                            {post.title}
                                        </h3>
                                    </div>
                                </div>

                                <div className="p-5">
                                    <p className="line-clamp-3 text-[13px] font-semibold leading-6 text-slate-600">
                                        {post.excerpt || "-"}
                                    </p>

                                    <div className="mt-5 grid grid-cols-2 gap-3">
                                        <div className="rounded-[16px] bg-white p-4">
                                            <p className="text-[11px] font-extrabold uppercase tracking-[0.12em] text-slate-400">
                                                Penulis
                                            </p>
                                            <p className="mt-2 truncate text-[13px] font-black text-[#061b46]">
                                                {post.author || "-"}
                                            </p>
                                        </div>

                                        <div className="rounded-[16px] bg-white p-4">
                                            <p className="text-[11px] font-extrabold uppercase tracking-[0.12em] text-slate-400">
                                                Tanggal
                                            </p>
                                            <p className="mt-2 truncate text-[13px] font-black text-[#061b46]">
                                                {post.published_at_label || "-"}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="mt-5 flex gap-2">
                                        <Link
                                            href={`/admin/posts/${post.id}/edit`}
                                            className="inline-flex h-11 flex-1 items-center justify-center rounded-xl bg-blue-50 px-4 text-[12px] font-extrabold text-blue-700 transition hover:bg-blue-100"
                                        >
                                            Edit
                                        </Link>

                                        <Link
                                            href={`/admin/posts/${post.id}`}
                                            method="delete"
                                            as="button"
                                            preserveScroll
                                            onBefore={() =>
                                                confirm(
                                                    "Yakin ingin menghapus informasi ini?"
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
                        <div className="text-[48px]">📰</div>

                        <h3 className="mt-4 text-[22px] font-black text-[#061b46]">
                            Belum Ada Informasi
                        </h3>

                        <p className="mt-2 text-[13px] font-semibold text-slate-500">
                            Tambahkan berita atau informasi pertama untuk
                            ditampilkan di frontend.
                        </p>

                        <Link
                            href="/admin/posts/create"
                            className="mt-6 inline-flex min-h-[48px] items-center justify-center rounded-[16px] bg-[#061b46] px-6 text-[13px] font-extrabold uppercase tracking-[0.08em] text-white transition hover:bg-[#0b3b85]"
                        >
                            Tambah Informasi
                        </Link>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}