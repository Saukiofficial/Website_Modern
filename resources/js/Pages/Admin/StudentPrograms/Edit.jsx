import { Head, Link, useForm } from "@inertiajs/react";
import AdminLayout from "../Layouts/AdminLayout";

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

function Textarea({ label, value, onChange, error, placeholder, rows = 5 }) {
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

function ArrayRepeater({ title, items, onAdd, onChange, onRemove, placeholder }) {
    return (
        <div>
            <div className="mb-4 flex items-center justify-between gap-3">
                <h3 className="text-[15px] font-black text-[#061b46]">
                    {title}
                </h3>

                <button
                    type="button"
                    onClick={onAdd}
                    className="inline-flex min-h-[38px] items-center justify-center rounded-xl bg-blue-50 px-4 text-[12px] font-extrabold text-blue-700 transition hover:bg-blue-100"
                >
                    Tambah
                </button>
            </div>

            <div className="space-y-3">
                {items.map((item, index) => (
                    <div key={index} className="flex gap-3">
                        <input
                            type="text"
                            value={item || ""}
                            onChange={(event) =>
                                onChange(index, event.target.value)
                            }
                            placeholder={placeholder}
                            className="h-[50px] flex-1 rounded-[14px] border border-slate-200 bg-white px-4 text-[13px] font-semibold text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-[#0b73e8] focus:ring-4 focus:ring-blue-100"
                        />

                        <button
                            type="button"
                            onClick={() => onRemove(index)}
                            className="inline-flex h-[50px] items-center justify-center rounded-[14px] bg-red-50 px-4 text-[12px] font-extrabold text-red-700 transition hover:bg-red-100"
                        >
                            Hapus
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default function Edit({ program }) {
    const { data, setData, post, processing, errors } = useForm({
        _method: "put",
        title: program?.title || "",
        slug: program?.slug || "",
        category: program?.category || "",
        eyebrow: program?.eyebrow || "",
        hero_title: program?.hero_title || "",
        description: program?.description || "",
        hero_image: null,
        icon: program?.icon || "👥",
        form_title: program?.form_title || "",
        form_description: program?.form_description || "",
        interest_label: program?.interest_label || "",
        interest_options:
            Array.isArray(program?.interest_options) &&
            program.interest_options.length > 0
                ? program.interest_options
                : [""],
        reason_label: program?.reason_label || "",
        reason_placeholder: program?.reason_placeholder || "",
        points:
            Array.isArray(program?.points) && program.points.length > 0
                ? program.points
                : [""],
        sort_order: program?.sort_order || 0,
        is_active: Boolean(program?.is_active),
    });

    const imagePreview = data.hero_image
        ? URL.createObjectURL(data.hero_image)
        : program?.hero_image_url || null;

    const updateArray = (field, index, value) => {
        const next = [...data[field]];
        next[index] = value;
        setData(field, next);
    };

    const addArray = (field) => {
        setData(field, [...data[field], ""]);
    };

    const removeArray = (field, index) => {
        setData(
            field,
            data[field].filter((_, currentIndex) => currentIndex !== index)
        );
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        post(`/admin/student-programs/${program.id}`, {
            forceFormData: true,
            preserveScroll: true,
        });
    };

    return (
        <AdminLayout title="Edit Program Kesiswaan">
            <Head title="Edit Program Kesiswaan" />

            <div className="mb-6 rounded-[28px] bg-gradient-to-br from-[#061b46] to-[#0b3b85] p-6 text-white shadow-2xl shadow-blue-200 sm:p-8">
                <p className="text-[12px] font-extrabold uppercase tracking-[0.22em] text-[#f7c46a]">
                    Kesiswaan
                </p>

                <h1 className="mt-3 text-[34px] font-black leading-tight tracking-[-0.05em] sm:text-[42px]">
                    Edit Program Kesiswaan
                </h1>

                <p className="mt-4 max-w-2xl text-[14px] font-medium leading-7 text-blue-100">
                    Perbarui tampilan program dan form pendaftaran kesiswaan.
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid gap-6 xl:grid-cols-[1fr_380px] xl:items-start">
                    <div className="space-y-6">
                        <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/70 sm:p-8">
                            <div className="border-b border-slate-200 pb-6">
                                <p className="text-[12px] font-extrabold uppercase tracking-[0.18em] text-[#d59a25]">
                                    Data Program
                                </p>

                                <h2 className="mt-2 text-[24px] font-black tracking-[-0.04em] text-[#061b46]">
                                    Informasi Utama
                                </h2>
                            </div>

                            <div className="mt-7 grid gap-5 md:grid-cols-2">
                                <Input
                                    label="Judul Program"
                                    value={data.title}
                                    onChange={(event) =>
                                        setData("title", event.target.value)
                                    }
                                    error={errors.title}
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
                                    label="Icon"
                                    value={data.icon}
                                    onChange={(event) =>
                                        setData("icon", event.target.value)
                                    }
                                    error={errors.icon}
                                />

                                <Input
                                    label="Eyebrow"
                                    value={data.eyebrow}
                                    onChange={(event) =>
                                        setData("eyebrow", event.target.value)
                                    }
                                    error={errors.eyebrow}
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
                                    />
                                </div>

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

                                <div className="md:col-span-2">
                                    <Toggle
                                        label="Status Aktif"
                                        description="Tampilkan program ini di frontend."
                                        checked={data.is_active}
                                        onChange={(checked) =>
                                            setData("is_active", checked)
                                        }
                                    />
                                </div>
                            </div>
                        </section>

                        <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/70 sm:p-8">
                            <div className="border-b border-slate-200 pb-6">
                                <p className="text-[12px] font-extrabold uppercase tracking-[0.18em] text-[#d59a25]">
                                    Form
                                </p>

                                <h2 className="mt-2 text-[24px] font-black tracking-[-0.04em] text-[#061b46]">
                                    Pengaturan Form Pendaftaran
                                </h2>
                            </div>

                            <div className="mt-7 grid gap-5 md:grid-cols-2">
                                <Input
                                    label="Judul Form"
                                    value={data.form_title}
                                    onChange={(event) =>
                                        setData(
                                            "form_title",
                                            event.target.value
                                        )
                                    }
                                    error={errors.form_title}
                                />

                                <Input
                                    label="Label Pilihan"
                                    value={data.interest_label}
                                    onChange={(event) =>
                                        setData(
                                            "interest_label",
                                            event.target.value
                                        )
                                    }
                                    error={errors.interest_label}
                                />

                                <div className="md:col-span-2">
                                    <Textarea
                                        label="Deskripsi Form"
                                        value={data.form_description}
                                        onChange={(event) =>
                                            setData(
                                                "form_description",
                                                event.target.value
                                            )
                                        }
                                        error={errors.form_description}
                                        rows={3}
                                    />
                                </div>

                                <Input
                                    label="Label Alasan"
                                    value={data.reason_label}
                                    onChange={(event) =>
                                        setData(
                                            "reason_label",
                                            event.target.value
                                        )
                                    }
                                    error={errors.reason_label}
                                />

                                <Input
                                    label="Placeholder Alasan"
                                    value={data.reason_placeholder}
                                    onChange={(event) =>
                                        setData(
                                            "reason_placeholder",
                                            event.target.value
                                        )
                                    }
                                    error={errors.reason_placeholder}
                                />

                                <div className="md:col-span-2">
                                    <ArrayRepeater
                                        title="Opsi Pilihan Form"
                                        items={data.interest_options}
                                        onAdd={() =>
                                            addArray("interest_options")
                                        }
                                        onChange={(index, value) =>
                                            updateArray(
                                                "interest_options",
                                                index,
                                                value
                                            )
                                        }
                                        onRemove={(index) =>
                                            removeArray(
                                                "interest_options",
                                                index
                                            )
                                        }
                                        placeholder="Contoh: Ketua / Wakil Ketua"
                                    />
                                </div>
                            </div>
                        </section>

                        <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/70 sm:p-8">
                            <ArrayRepeater
                                title="Detail Program / Poin Sidebar"
                                items={data.points}
                                onAdd={() => addArray("points")}
                                onChange={(index, value) =>
                                    updateArray("points", index, value)
                                }
                                onRemove={(index) =>
                                    removeArray("points", index)
                                }
                                placeholder="Contoh: Pelatihan dasar kepemimpinan siswa"
                            />
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

                                {imagePreview ? (
                                    <img
                                        src={imagePreview}
                                        alt="Preview"
                                        className="h-[320px] w-full rounded-[20px] object-cover"
                                    />
                                ) : (
                                    <div className="flex h-[320px] w-full items-center justify-center rounded-[20px] bg-white text-[52px] shadow-sm">
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
                            href="/admin/student-programs"
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