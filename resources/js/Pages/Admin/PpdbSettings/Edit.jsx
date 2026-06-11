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
        <label className="flex min-h-[58px] cursor-pointer items-center justify-between gap-4 rounded-[16px] border border-slate-200 bg-white px-4 py-3">
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

export default function Edit({ setting }) {
    const { data, setData, post, processing, errors } = useForm({
        academic_year: setting?.academic_year || "",
        eyebrow: setting?.eyebrow || "",
        hero_title: setting?.hero_title || "",
        hero_description: setting?.hero_description || "",
        hero_image: null,
        section_title: setting?.section_title || "",
        section_description: setting?.section_description || "",
        requirement_title: setting?.requirement_title || "",
        requirement_description: setting?.requirement_description || "",
        cta_label: setting?.cta_label || "",
        cta_url: setting?.cta_url || "",
        is_open: Boolean(setting?.is_open),
        closed_message: setting?.closed_message || "",
    });

    const heroPreview = data.hero_image
        ? URL.createObjectURL(data.hero_image)
        : setting?.hero_image_url || null;

    const handleSubmit = (event) => {
        event.preventDefault();

        post("/admin/ppdb-periods", {
            forceFormData: true,
            preserveScroll: true,
        });
    };

    return (
        <AdminLayout title="Setting PPDB">
            <Head title="Setting PPDB" />

            <div className="mb-6 flex flex-col gap-4 rounded-[28px] bg-gradient-to-br from-[#061b46] to-[#0b3b85] p-6 text-white shadow-2xl shadow-blue-200 sm:p-8 lg:flex-row lg:items-center lg:justify-between">
                <div>
                    <p className="text-[12px] font-extrabold uppercase tracking-[0.22em] text-[#f7c46a]">
                        PPDB
                    </p>

                    <h1 className="mt-3 text-[34px] font-black leading-tight tracking-[-0.05em] sm:text-[42px]">
                        Setting Halaman PPDB
                    </h1>

                    <p className="mt-4 max-w-2xl text-[14px] font-medium leading-7 text-blue-100">
                        Kelola konten utama halaman PPDB yang tampil di
                        frontend.
                    </p>
                </div>

                <Link
                    href="/ppdb"
                    className="inline-flex min-h-[50px] items-center justify-center rounded-[16px] border border-white/15 bg-white/10 px-6 text-[13px] font-extrabold uppercase tracking-[0.08em] text-white transition hover:bg-white/20"
                >
                    Lihat Frontend
                </Link>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid gap-6 xl:grid-cols-[1fr_380px] xl:items-start">
                    <div className="space-y-6">
                        <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/70 sm:p-8">
                            <div className="border-b border-slate-200 pb-6">
                                <p className="text-[12px] font-extrabold uppercase tracking-[0.18em] text-[#d59a25]">
                                    Hero PPDB
                                </p>

                                <h2 className="mt-2 text-[24px] font-black tracking-[-0.04em] text-[#061b46]">
                                    Konten Utama
                                </h2>
                            </div>

                            <div className="mt-7 grid gap-5 md:grid-cols-2">
                                <Input
                                    label="Tahun Ajaran"
                                    value={data.academic_year}
                                    onChange={(event) =>
                                        setData(
                                            "academic_year",
                                            event.target.value
                                        )
                                    }
                                    error={errors.academic_year}
                                    placeholder="2026/2027"
                                />

                                <Input
                                    label="Eyebrow"
                                    value={data.eyebrow}
                                    onChange={(event) =>
                                        setData("eyebrow", event.target.value)
                                    }
                                    error={errors.eyebrow}
                                    placeholder="Penerimaan Peserta Didik Baru"
                                />

                                <div className="md:col-span-2">
                                    <Input
                                        label="Judul Hero"
                                        value={data.hero_title}
                                        onChange={(event) =>
                                            setData(
                                                "hero_title",
                                                event.target.value
                                            )
                                        }
                                        error={errors.hero_title}
                                        placeholder="PPDB SMA Negeri 1 Mojokerto"
                                    />
                                </div>

                                <div className="md:col-span-2">
                                    <Textarea
                                        label="Deskripsi Hero"
                                        value={data.hero_description}
                                        onChange={(event) =>
                                            setData(
                                                "hero_description",
                                                event.target.value
                                            )
                                        }
                                        error={errors.hero_description}
                                        placeholder="Deskripsi singkat PPDB"
                                    />
                                </div>
                            </div>
                        </section>

                        <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/70 sm:p-8">
                            <div className="border-b border-slate-200 pb-6">
                                <p className="text-[12px] font-extrabold uppercase tracking-[0.18em] text-[#d59a25]">
                                    Konten Section
                                </p>

                                <h2 className="mt-2 text-[24px] font-black tracking-[-0.04em] text-[#061b46]">
                                    Alur & Persyaratan
                                </h2>
                            </div>

                            <div className="mt-7 grid gap-5 md:grid-cols-2">
                                <Input
                                    label="Judul Alur"
                                    value={data.section_title}
                                    onChange={(event) =>
                                        setData(
                                            "section_title",
                                            event.target.value
                                        )
                                    }
                                    error={errors.section_title}
                                    placeholder="Tahapan Pendaftaran"
                                />

                                <Input
                                    label="Judul Persyaratan"
                                    value={data.requirement_title}
                                    onChange={(event) =>
                                        setData(
                                            "requirement_title",
                                            event.target.value
                                        )
                                    }
                                    error={errors.requirement_title}
                                    placeholder="Berkas yang Disiapkan"
                                />

                                <Textarea
                                    label="Deskripsi Alur"
                                    value={data.section_description}
                                    onChange={(event) =>
                                        setData(
                                            "section_description",
                                            event.target.value
                                        )
                                    }
                                    error={errors.section_description}
                                    placeholder="Deskripsi bagian alur"
                                />

                                <Textarea
                                    label="Deskripsi Persyaratan"
                                    value={data.requirement_description}
                                    onChange={(event) =>
                                        setData(
                                            "requirement_description",
                                            event.target.value
                                        )
                                    }
                                    error={errors.requirement_description}
                                    placeholder="Deskripsi persyaratan"
                                />

                                <Input
                                    label="Label Button"
                                    value={data.cta_label}
                                    onChange={(event) =>
                                        setData(
                                            "cta_label",
                                            event.target.value
                                        )
                                    }
                                    error={errors.cta_label}
                                    placeholder="Daftar Sekarang"
                                />

                                <Input
                                    label="URL Button"
                                    value={data.cta_url}
                                    onChange={(event) =>
                                        setData("cta_url", event.target.value)
                                    }
                                    error={errors.cta_url}
                                    placeholder="/ppdb/daftar"
                                />
                            </div>
                        </section>

                        <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/70 sm:p-8">
                            <div className="border-b border-slate-200 pb-6">
                                <p className="text-[12px] font-extrabold uppercase tracking-[0.18em] text-[#d59a25]">
                                    Status Pendaftaran
                                </p>

                                <h2 className="mt-2 text-[24px] font-black tracking-[-0.04em] text-[#061b46]">
                                    Buka / Tutup PPDB
                                </h2>
                            </div>

                            <div className="mt-7 grid gap-5">
                                <Toggle
                                    label="PPDB Dibuka"
                                    description="Jika aktif, tombol pendaftaran akan tampil normal."
                                    checked={data.is_open}
                                    onChange={(checked) =>
                                        setData("is_open", checked)
                                    }
                                />

                                <Textarea
                                    label="Pesan Jika Ditutup"
                                    value={data.closed_message}
                                    onChange={(event) =>
                                        setData(
                                            "closed_message",
                                            event.target.value
                                        )
                                    }
                                    error={errors.closed_message}
                                    placeholder="Pendaftaran PPDB saat ini belum dibuka."
                                />
                            </div>
                        </section>
                    </div>

                    <aside className="xl:sticky xl:top-[98px]">
                        <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/70">
                            <p className="text-[12px] font-extrabold uppercase tracking-[0.18em] text-[#d59a25]">
                                Gambar Hero
                            </p>

                            <label className="mt-5 flex cursor-pointer flex-col items-center justify-center rounded-[24px] border-2 border-dashed border-slate-200 bg-slate-50 p-4 transition hover:border-blue-300 hover:bg-blue-50">
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(event) =>
                                        setData(
                                            "hero_image",
                                            event.target.files?.[0] || null
                                        )
                                    }
                                    className="hidden"
                                />

                                {heroPreview ? (
                                    <img
                                        src={heroPreview}
                                        alt="Preview"
                                        className="h-[250px] w-full rounded-[20px] object-cover"
                                    />
                                ) : (
                                    <div className="flex h-[250px] w-full items-center justify-center rounded-[20px] bg-white text-[52px] shadow-sm">
                                        🖼️
                                    </div>
                                )}

                                <p className="mt-4 text-center text-[13px] font-extrabold text-[#061b46]">
                                    Klik untuk upload gambar hero
                                </p>

                                <p className="mt-1 text-center text-[11px] font-semibold text-slate-500">
                                    JPG, PNG, WEBP. Maksimal 4MB.
                                </p>
                            </label>

                            {errors.hero_image ? (
                                <p className="mt-2 text-[12px] font-bold text-red-600">
                                    {errors.hero_image}
                                </p>
                            ) : null}
                        </section>
                    </aside>
                </div>

                <div className="sticky bottom-5 z-20 rounded-[24px] border border-slate-200 bg-white/95 p-4 shadow-2xl shadow-slate-300/70 backdrop-blur-xl">
                    <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-end">
                        <Link
                            href="/admin/dashboard"
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
                                : "Simpan Setting PPDB"}
                        </button>
                    </div>
                </div>
            </form>
        </AdminLayout>
    );
}