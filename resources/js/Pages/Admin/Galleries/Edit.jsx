import { Head, Link, useForm } from "@inertiajs/react";
import AdminLayout from "../Layouts/AdminLayout";

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

export default function Edit({ gallery }) {
    const { data, setData, post, processing, errors } = useForm({
        _method: "put",
        title: gallery?.title || "",
        category: gallery?.category || "",
        description: gallery?.description || "",
        image: null,
        event_date: gallery?.event_date || "",
        is_featured: Boolean(gallery?.is_featured),
        is_active: Boolean(gallery?.is_active),
        sort_order: gallery?.sort_order || 0,
    });

    const imagePreview = data.image
        ? URL.createObjectURL(data.image)
        : gallery?.image_url || null;

    const handleSubmit = (event) => {
        event.preventDefault();

        post(`/admin/galleries/${gallery.id}`, {
            forceFormData: true,
            preserveScroll: true,
        });
    };

    return (
        <AdminLayout title="Edit Galeri">
            <Head title="Edit Galeri" />

            <div className="mb-6 rounded-[28px] bg-gradient-to-br from-[#061b46] to-[#0b3b85] p-6 text-white shadow-2xl shadow-blue-200 sm:p-8">
                <p className="text-[12px] font-extrabold uppercase tracking-[0.22em] text-[#f7c46a]">
                    Konten Website
                </p>

                <h1 className="mt-3 text-[34px] font-black leading-tight tracking-[-0.05em] sm:text-[42px]">
                    Edit Galeri
                </h1>

                <p className="mt-4 max-w-2xl text-[14px] font-medium leading-7 text-blue-100">
                    Perbarui data dokumentasi galeri sekolah yang tampil di
                    frontend.
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid gap-6 xl:grid-cols-[1fr_380px] xl:items-start">
                    <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/70 sm:p-8">
                        <div className="border-b border-slate-200 pb-6">
                            <p className="text-[12px] font-extrabold uppercase tracking-[0.18em] text-[#d59a25]">
                                Data Galeri
                            </p>

                            <h2 className="mt-2 text-[24px] font-black tracking-[-0.04em] text-[#061b46]">
                                Informasi Dokumentasi
                            </h2>
                        </div>

                        <div className="mt-7 grid gap-5 md:grid-cols-2">
                            <Input
                                label="Judul"
                                value={data.title}
                                onChange={(event) =>
                                    setData("title", event.target.value)
                                }
                                error={errors.title}
                            />

                            <Input
                                label="Kategori"
                                value={data.category}
                                onChange={(event) =>
                                    setData("category", event.target.value)
                                }
                                error={errors.category}
                            />

                            <Input
                                label="Tanggal Kegiatan"
                                type="date"
                                value={data.event_date}
                                onChange={(event) =>
                                    setData("event_date", event.target.value)
                                }
                                error={errors.event_date}
                            />

                            <Input
                                label="Urutan"
                                type="number"
                                value={data.sort_order}
                                onChange={(event) =>
                                    setData("sort_order", event.target.value)
                                }
                                error={errors.sort_order}
                            />

                            <div className="md:col-span-2">
                                <Textarea
                                    label="Deskripsi"
                                    value={data.description}
                                    onChange={(event) =>
                                        setData(
                                            "description",
                                            event.target.value
                                        )
                                    }
                                    error={errors.description}
                                />
                            </div>
                        </div>
                    </section>

                    <aside className="xl:sticky xl:top-[98px]">
                        <div className="space-y-6">
                            <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/70">
                                <p className="text-[12px] font-extrabold uppercase tracking-[0.18em] text-[#d59a25]">
                                    Gambar Galeri
                                </p>

                                <label className="mt-5 flex cursor-pointer flex-col items-center justify-center rounded-[24px] border-2 border-dashed border-slate-200 bg-slate-50 p-4 transition hover:border-blue-300 hover:bg-blue-50">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(event) =>
                                            setData(
                                                "image",
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
                                        Klik untuk ganti gambar
                                    </p>

                                    <p className="mt-1 text-center text-[11px] font-semibold text-slate-500">
                                        JPG, PNG, WEBP. Maksimal 4MB.
                                    </p>
                                </label>

                                {errors.image ? (
                                    <p className="mt-2 text-[12px] font-bold text-red-600">
                                        {errors.image}
                                    </p>
                                ) : null}
                            </section>

                            <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/70">
                                <p className="text-[12px] font-extrabold uppercase tracking-[0.18em] text-[#d59a25]">
                                    Status
                                </p>

                                <div className="mt-5 grid gap-3">
                                    <Toggle
                                        label="Aktif"
                                        description="Tampilkan galeri di frontend."
                                        checked={data.is_active}
                                        onChange={(checked) =>
                                            setData("is_active", checked)
                                        }
                                    />

                                    <Toggle
                                        label="Featured"
                                        description="Jadikan galeri unggulan."
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
                            href="/admin/galleries"
                            className="inline-flex min-h-[50px] items-center justify-center rounded-[16px] border border-slate-200 bg-white px-6 text-[13px] font-extrabold uppercase tracking-[0.08em] text-slate-600 transition hover:bg-slate-50"
                        >
                            Kembali
                        </Link>

                        <button
                            type="submit"
                            disabled={processing}
                            className="inline-flex min-h-[50px] items-center justify-center rounded-[16px] bg-[#061b46] px-7 text-[13px] font-extrabold uppercase tracking-[0.08em] text-white shadow-xl shadow-blue-200 transition hover:bg-[#0b3b85] disabled:cursor-not-allowed disabled:opacity-70"
                        >
                            {processing
                                ? "Menyimpan..."
                                : "Simpan Perubahan"}
                        </button>
                    </div>
                </div>
            </form>
        </AdminLayout>
    );
}