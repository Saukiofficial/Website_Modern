import { Head, Link, useForm } from "@inertiajs/react";
import AdminLayout from "../Layouts/AdminLayout";
import RichTextEditor from "./RichTextEditor";

function slugify(value) {
    return String(value || "")
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-");
}

function Input({ label, value, onChange, error, placeholder, type = "text" }) {
    return (
        <div>
            <label className="mb-2 block text-[13px] font-extrabold text-[#061b46]">
                {label}
            </label>

            <input
                type={type}
                value={value || ""}
                onChange={onChange}
                placeholder={placeholder}
                className="h-[54px] w-full rounded-[16px] border border-slate-200 bg-white px-4 text-[14px] font-semibold text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-[#0b73e8] focus:ring-4 focus:ring-blue-100"
            />

            {error ? (
                <p className="mt-2 text-[12px] font-bold text-red-600">
                    {error}
                </p>
            ) : null}
        </div>
    );
}

function Textarea({ label, value, onChange, error, placeholder, rows = 4 }) {
    return (
        <div>
            <label className="mb-2 block text-[13px] font-extrabold text-[#061b46]">
                {label}
            </label>

            <textarea
                value={value || ""}
                onChange={onChange}
                placeholder={placeholder}
                rows={rows}
                className="w-full resize-none rounded-[16px] border border-slate-200 bg-white px-4 py-4 text-[14px] font-semibold text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-[#0b73e8] focus:ring-4 focus:ring-blue-100"
            />

            {error ? (
                <p className="mt-2 text-[12px] font-bold text-red-600">
                    {error}
                </p>
            ) : null}
        </div>
    );
}

function Toggle({ label, checked, onChange, description }) {
    return (
        <label className="flex min-h-[54px] cursor-pointer items-center justify-between gap-4 rounded-[16px] border border-slate-200 bg-white px-4 py-3">
            <div>
                <span className="text-[13px] font-extrabold text-[#061b46]">
                    {label}
                </span>

                {description ? (
                    <p className="mt-1 text-[11.5px] font-semibold text-slate-500">
                        {description}
                    </p>
                ) : null}
            </div>

            <input
                type="checkbox"
                checked={Boolean(checked)}
                onChange={(event) => onChange(event.target.checked)}
                className="h-5 w-5 rounded border-slate-300 text-[#0b73e8] focus:ring-[#0b73e8]"
            />
        </label>
    );
}

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        title: "",
        slug: "",
        category: "",
        excerpt: "",
        content: "",
        thumbnail: null,
        author: "Admin Sekolah",
        published_at: new Date().toISOString().slice(0, 10),
        is_featured: false,
        is_published: true,
        sort_order: 0,
    });

    const imagePreview = data.thumbnail
        ? URL.createObjectURL(data.thumbnail)
        : null;

    const setTitle = (value) => {
        setData({
            ...data,
            title: value,
            slug: data.slug ? data.slug : slugify(value),
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        post("/admin/posts", {
            forceFormData: true,
            preserveScroll: true,
        });
    };

    return (
        <AdminLayout title="Tambah Informasi">
            <Head title="Tambah Informasi" />

            <div className="mb-6 rounded-[28px] bg-gradient-to-br from-[#061b46] to-[#0b3b85] p-6 text-white shadow-2xl shadow-blue-200 sm:p-8">
                <p className="text-[12px] font-extrabold uppercase tracking-[0.22em] text-[#f7c46a]">
                    Konten Website
                </p>

                <h1 className="mt-3 text-[34px] font-black leading-tight tracking-[-0.05em] sm:text-[42px]">
                    Tambah Informasi
                </h1>

                <p className="mt-4 max-w-2xl text-[14px] font-medium leading-7 text-blue-100">
                    Tulis berita, artikel, atau pengumuman sekolah menggunakan
                    editor rich text.
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid gap-6 xl:grid-cols-[1fr_380px] xl:items-start">
                    <div className="space-y-6">
                        <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/70 sm:p-8">
                            <div className="border-b border-slate-200 pb-6">
                                <p className="text-[12px] font-extrabold uppercase tracking-[0.18em] text-[#d59a25]">
                                    Informasi
                                </p>

                                <h2 className="mt-2 text-[24px] font-black tracking-[-0.04em] text-[#061b46]">
                                    Data Utama
                                </h2>
                            </div>

                            <div className="mt-7 grid gap-5 md:grid-cols-2">
                                <Input
                                    label="Judul"
                                    value={data.title}
                                    onChange={(event) =>
                                        setTitle(event.target.value)
                                    }
                                    error={errors.title}
                                    placeholder="Judul informasi"
                                />

                                <Input
                                    label="Slug"
                                    value={data.slug}
                                    onChange={(event) =>
                                        setData(
                                            "slug",
                                            slugify(event.target.value)
                                        )
                                    }
                                    error={errors.slug}
                                    placeholder="judul-informasi"
                                />

                                <Input
                                    label="Kategori"
                                    value={data.category}
                                    onChange={(event) =>
                                        setData("category", event.target.value)
                                    }
                                    error={errors.category}
                                    placeholder="PPDB / Prestasi / Kesiswaan"
                                />

                                <Input
                                    label="Penulis"
                                    value={data.author}
                                    onChange={(event) =>
                                        setData("author", event.target.value)
                                    }
                                    error={errors.author}
                                    placeholder="Admin Sekolah"
                                />

                                <Input
                                    label="Tanggal Publish"
                                    type="date"
                                    value={data.published_at}
                                    onChange={(event) =>
                                        setData(
                                            "published_at",
                                            event.target.value
                                        )
                                    }
                                    error={errors.published_at}
                                />

                                <Input
                                    label="Urutan"
                                    type="number"
                                    value={data.sort_order}
                                    onChange={(event) =>
                                        setData(
                                            "sort_order",
                                            event.target.value
                                        )
                                    }
                                    error={errors.sort_order}
                                    placeholder="0"
                                />

                                <div className="md:col-span-2">
                                    <Textarea
                                        label="Ringkasan"
                                        value={data.excerpt}
                                        onChange={(event) =>
                                            setData(
                                                "excerpt",
                                                event.target.value
                                            )
                                        }
                                        error={errors.excerpt}
                                        placeholder="Ringkasan singkat berita"
                                    />
                                </div>
                            </div>
                        </section>

                        <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/70 sm:p-8">
                            <RichTextEditor
                                label="Isi Konten"
                                value={data.content}
                                onChange={(value) =>
                                    setData("content", value)
                                }
                                error={errors.content}
                            />
                        </section>
                    </div>

                    <aside className="xl:sticky xl:top-[98px]">
                        <div className="space-y-6">
                            <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/70">
                                <p className="text-[12px] font-extrabold uppercase tracking-[0.18em] text-[#d59a25]">
                                    Thumbnail
                                </p>

                                <label className="mt-5 flex cursor-pointer flex-col items-center justify-center rounded-[24px] border-2 border-dashed border-slate-200 bg-slate-50 p-4 transition hover:border-blue-300 hover:bg-blue-50">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(event) =>
                                            setData(
                                                "thumbnail",
                                                event.target.files?.[0] || null
                                            )
                                        }
                                        className="hidden"
                                    />

                                    {imagePreview ? (
                                        <img
                                            src={imagePreview}
                                            alt="Preview"
                                            className="h-[250px] w-full rounded-[20px] object-cover"
                                        />
                                    ) : (
                                        <div className="flex h-[250px] w-full items-center justify-center rounded-[20px] bg-white text-[52px] shadow-sm">
                                            🖼️
                                        </div>
                                    )}

                                    <p className="mt-4 text-[13px] font-extrabold text-[#061b46]">
                                        Klik untuk upload thumbnail
                                    </p>

                                    <p className="mt-1 text-center text-[11px] font-semibold text-slate-500">
                                        JPG, PNG, WEBP. Maksimal 4MB.
                                    </p>
                                </label>

                                {errors.thumbnail ? (
                                    <p className="mt-2 text-[12px] font-bold text-red-600">
                                        {errors.thumbnail}
                                    </p>
                                ) : null}
                            </section>

                            <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/70">
                                <p className="text-[12px] font-extrabold uppercase tracking-[0.18em] text-[#d59a25]">
                                    Status
                                </p>

                                <div className="mt-5 grid gap-3">
                                    <Toggle
                                        label="Published"
                                        description="Tampilkan informasi di frontend."
                                        checked={data.is_published}
                                        onChange={(checked) =>
                                            setData("is_published", checked)
                                        }
                                    />

                                    <Toggle
                                        label="Featured"
                                        description="Jadikan informasi unggulan."
                                        checked={data.is_featured}
                                        onChange={(checked) =>
                                            setData("is_featured", checked)
                                        }
                                    />
                                </div>
                            </section>
                        </div>
                    </aside>
                </div>

                <div className="sticky bottom-5 z-20 rounded-[24px] border border-slate-200 bg-white/95 p-4 shadow-2xl shadow-slate-300/70 backdrop-blur-xl">
                    <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-end">
                        <Link
                            href="/admin/posts"
                            className="inline-flex min-h-[50px] items-center justify-center rounded-[16px] border border-slate-200 bg-white px-6 text-[13px] font-extrabold uppercase tracking-[0.08em] text-slate-600 transition hover:bg-slate-50"
                        >
                            Kembali
                        </Link>

                        <button
                            type="submit"
                            disabled={processing}
                            className="inline-flex min-h-[50px] items-center justify-center rounded-[16px] bg-[#061b46] px-7 text-[13px] font-extrabold uppercase tracking-[0.08em] text-white shadow-xl shadow-blue-200 transition hover:bg-[#0b3b85] disabled:cursor-not-allowed disabled:opacity-70"
                        >
                            {processing ? "Menyimpan..." : "Simpan Informasi"}
                        </button>
                    </div>
                </div>
            </form>
        </AdminLayout>
    );
}