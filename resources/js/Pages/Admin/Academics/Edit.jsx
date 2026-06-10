import { Head, Link, useForm } from "@inertiajs/react";
import AdminLayout from "../Layouts/AdminLayout";

function TextInput({
    label,
    value,
    onChange,
    error,
    placeholder,
    type = "text",
}) {
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

function TextArea({ label, value, onChange, error, placeholder, rows = 4 }) {
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

function FileUploadBox({ label, currentUrl, file, onChange, error }) {
    const imageUrl = file ? URL.createObjectURL(file) : currentUrl || null;

    return (
        <div>
            <label className="mb-2 block text-[13px] font-extrabold text-[#061b46]">
                {label}
            </label>

            <label className="flex cursor-pointer flex-col items-center justify-center overflow-hidden rounded-[22px] border-2 border-dashed border-slate-200 bg-slate-50 px-5 py-6 text-center transition hover:border-[#0b73e8] hover:bg-blue-50">
                <input
                    type="file"
                    accept="image/*"
                    onChange={onChange}
                    className="hidden"
                />

                {imageUrl ? (
                    <img
                        src={imageUrl}
                        alt={label}
                        className="h-[190px] w-full rounded-[18px] object-cover"
                    />
                ) : (
                    <div className="flex h-[190px] w-full items-center justify-center rounded-[18px] bg-white text-[42px] shadow-sm">
                        🖼️
                    </div>
                )}

                <p className="mt-4 text-[14px] font-extrabold text-[#061b46]">
                    Klik untuk upload gambar
                </p>

                <p className="mt-2 text-[12px] font-semibold text-slate-500">
                    Format JPG, PNG, WEBP. Maksimal 4MB.
                </p>
            </label>

            {error ? (
                <p className="mt-2 text-[12px] font-bold text-red-600">
                    {error}
                </p>
            ) : null}
        </div>
    );
}

function SectionCard({ eyebrow, title, description, children }) {
    return (
        <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/70 sm:p-8">
            <div className="border-b border-slate-200 pb-6">
                <p className="text-[12px] font-extrabold uppercase tracking-[0.18em] text-[#d59a25]">
                    {eyebrow}
                </p>

                <h2 className="mt-2 text-[24px] font-black tracking-[-0.04em] text-[#061b46]">
                    {title}
                </h2>

                {description ? (
                    <p className="mt-3 max-w-3xl text-[13px] font-semibold leading-6 text-slate-500">
                        {description}
                    </p>
                ) : null}
            </div>

            <div className="mt-7">{children}</div>
        </section>
    );
}

function RemoveButton({ onClick }) {
    return (
        <button
            type="button"
            onClick={onClick}
            className="inline-flex min-h-[38px] items-center justify-center rounded-[12px] bg-red-50 px-4 text-[12px] font-extrabold text-red-700 transition hover:bg-red-100"
        >
            Hapus
        </button>
    );
}

function CalendarRepeater({ items, onAdd, onChange, onToggle, onRemove, errors }) {
    return (
        <div>
            <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <h3 className="text-[18px] font-black text-[#061b46]">
                    Data Kalender Akademik
                </h3>

                <button
                    type="button"
                    onClick={onAdd}
                    className="inline-flex min-h-[42px] items-center justify-center rounded-[14px] bg-blue-50 px-5 text-[12px] font-extrabold uppercase tracking-[0.08em] text-blue-700 transition hover:bg-blue-100"
                >
                    Tambah Agenda
                </button>
            </div>

            <div className="space-y-4">
                {items.length > 0 ? (
                    items.map((item, index) => (
                        <div
                            key={index}
                            className="rounded-[24px] border border-slate-200 bg-slate-50 p-5"
                        >
                            <div className="mb-5 flex flex-col gap-3 border-b border-slate-200 pb-5 sm:flex-row sm:items-center sm:justify-between">
                                <div>
                                    <p className="text-[12px] font-extrabold uppercase tracking-[0.14em] text-[#d59a25]">
                                        Agenda {index + 1}
                                    </p>

                                    <h3 className="mt-1 text-[20px] font-black text-[#061b46]">
                                        {item.title || "Judul Agenda"}
                                    </h3>
                                </div>

                                <RemoveButton onClick={() => onRemove(index)} />
                            </div>

                            <div className="grid gap-4 md:grid-cols-2">
                                <TextInput
                                    label="Judul Agenda"
                                    value={item.title}
                                    onChange={(event) =>
                                        onChange(index, "title", event.target.value)
                                    }
                                    error={errors?.[`calendars.${index}.title`]}
                                    placeholder="Masa Pengenalan Lingkungan Sekolah"
                                />

                                <TextInput
                                    label="Kategori"
                                    value={item.category}
                                    onChange={(event) =>
                                        onChange(index, "category", event.target.value)
                                    }
                                    error={errors?.[`calendars.${index}.category`]}
                                    placeholder="Akademik / Kegiatan / Ujian"
                                />

                                <TextInput
                                    label="Tanggal Mulai"
                                    type="date"
                                    value={item.start_date}
                                    onChange={(event) =>
                                        onChange(index, "start_date", event.target.value)
                                    }
                                    error={errors?.[`calendars.${index}.start_date`]}
                                />

                                <TextInput
                                    label="Tanggal Selesai"
                                    type="date"
                                    value={item.end_date}
                                    onChange={(event) =>
                                        onChange(index, "end_date", event.target.value)
                                    }
                                    error={errors?.[`calendars.${index}.end_date`]}
                                />

                                <TextInput
                                    label="Teks Tanggal"
                                    value={item.date_text}
                                    onChange={(event) =>
                                        onChange(index, "date_text", event.target.value)
                                    }
                                    error={errors?.[`calendars.${index}.date_text`]}
                                    placeholder="15 Juli 2026"
                                />

                                <TextInput
                                    label="Icon"
                                    value={item.icon}
                                    onChange={(event) =>
                                        onChange(index, "icon", event.target.value)
                                    }
                                    error={errors?.[`calendars.${index}.icon`]}
                                    placeholder="📅"
                                />

                                <TextInput
                                    label="Urutan"
                                    type="number"
                                    value={item.sort_order}
                                    onChange={(event) =>
                                        onChange(index, "sort_order", event.target.value)
                                    }
                                    error={errors?.[`calendars.${index}.sort_order`]}
                                    placeholder="1"
                                />

                                <label className="flex cursor-pointer items-center justify-between rounded-[18px] border border-slate-200 bg-white px-5 py-4">
                                    <div>
                                        <p className="text-[14px] font-extrabold text-[#061b46]">
                                            Status Aktif
                                        </p>

                                        <p className="mt-1 text-[12px] font-semibold text-slate-500">
                                            Tampilkan agenda ini di frontend.
                                        </p>
                                    </div>

                                    <input
                                        type="checkbox"
                                        checked={Boolean(item.is_active)}
                                        onChange={(event) =>
                                            onToggle(
                                                index,
                                                "is_active",
                                                event.target.checked
                                            )
                                        }
                                        className="h-5 w-5 rounded border-slate-300 text-[#0b73e8] focus:ring-[#0b73e8]"
                                    />
                                </label>

                                <div className="md:col-span-2">
                                    <TextArea
                                        label="Deskripsi"
                                        value={item.description}
                                        onChange={(event) =>
                                            onChange(
                                                index,
                                                "description",
                                                event.target.value
                                            )
                                        }
                                        error={
                                            errors?.[
                                                `calendars.${index}.description`
                                            ]
                                        }
                                        placeholder="Tulis deskripsi agenda"
                                        rows={3}
                                    />
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="rounded-[18px] border border-dashed border-slate-200 bg-slate-50 p-8 text-center text-[13px] font-bold text-slate-500">
                        Belum ada agenda kalender akademik.
                    </div>
                )}
            </div>
        </div>
    );
}

function PreviewCard({ data, page }) {
    const heroImage = data.hero_image
        ? URL.createObjectURL(data.hero_image)
        : page?.hero_image_url || "/frontend/images/academic-hero.jpg";

    return (
        <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/70">
            <p className="text-[12px] font-extrabold uppercase tracking-[0.18em] text-[#d59a25]">
                Preview Akademik
            </p>

            <div className="mt-6 overflow-hidden rounded-[24px] border border-slate-200 bg-[#052b66]">
                <div className="relative h-[230px]">
                    <img
                        src={heroImage}
                        alt="Hero akademik"
                        className="absolute inset-0 h-full w-full object-cover"
                    />

                    <div className="absolute inset-0 bg-[#052b66]/75" />

                    <div className="relative z-10 p-6 text-white">
                        <p className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-[#f7c46a]">
                            Academic Center
                        </p>

                        <h3 className="mt-4 font-serif text-[31px] font-semibold leading-tight">
                            {data.hero_title || "Akademik Sekolah"}
                        </h3>

                        <p className="mt-3 line-clamp-3 text-[12px] font-semibold leading-6 text-blue-100">
                            {data.hero_subtitle ||
                                "Deskripsi akademik akan tampil di sini."}
                        </p>
                    </div>
                </div>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3">
                <div className="rounded-[18px] border border-blue-100 bg-blue-50 p-4">
                    <p className="text-[26px] font-black text-[#061b46]">
                        {data.calendars?.length || 0}
                    </p>
                    <p className="mt-1 text-[12px] font-bold text-slate-600">
                        Total Agenda
                    </p>
                </div>

                <div className="rounded-[18px] border border-blue-100 bg-blue-50 p-4">
                    <p className="text-[26px] font-black text-[#061b46]">
                        {data.calendars?.filter((item) => item.is_active)
                            .length || 0}
                    </p>
                    <p className="mt-1 text-[12px] font-bold text-slate-600">
                        Agenda Aktif
                    </p>
                </div>
            </div>
        </div>
    );
}

export default function Edit({ page, calendars = [] }) {
    const { data, setData, post, processing, errors } = useForm({
        hero_title: page?.hero_title || "",
        hero_subtitle: page?.hero_subtitle || "",
        hero_image: null,

        calendar_title: page?.calendar_title || "",
        calendar_description: page?.calendar_description || "",

        teacher_title: page?.teacher_title || "",
        teacher_description: page?.teacher_description || "",

        extracurricular_title: page?.extracurricular_title || "",
        extracurricular_description: page?.extracurricular_description || "",

        osis_title: page?.osis_title || "",
        osis_description: page?.osis_description || "",

        achievement_title: page?.achievement_title || "",
        achievement_description: page?.achievement_description || "",

        calendars: Array.isArray(calendars) ? calendars : [],
    });

    const setField = (field, value) => {
        setData(field, value);
    };

    const setImage = (field, event) => {
        setData(field, event.target.files?.[0] || null);
    };

    const updateCalendar = (index, field, value) => {
        const nextCalendars = [...data.calendars];

        nextCalendars[index] = {
            ...nextCalendars[index],
            [field]: value,
        };

        setData("calendars", nextCalendars);
    };

    const removeCalendar = (index) => {
        setData(
            "calendars",
            data.calendars.filter((_, currentIndex) => currentIndex !== index)
        );
    };

    const addCalendar = () => {
        setData("calendars", [
            ...data.calendars,
            {
                id: null,
                title: "",
                description: "",
                start_date: "",
                end_date: "",
                date_text: "",
                category: "Akademik",
                icon: "📅",
                sort_order: data.calendars.length + 1,
                is_active: true,
            },
        ]);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        post("/admin/academics", {
            forceFormData: true,
            preserveScroll: true,
        });
    };

    return (
        <AdminLayout title="Akademik">
            <Head title="Akademik" />

            <div className="mb-6 flex flex-col gap-4 rounded-[28px] bg-gradient-to-br from-[#061b46] to-[#0b3b85] p-6 text-white shadow-2xl shadow-blue-200 sm:p-8 lg:flex-row lg:items-center lg:justify-between">
                <div>
                    <p className="text-[12px] font-extrabold uppercase tracking-[0.22em] text-[#f7c46a]">
                        Konten Frontend
                    </p>

                    <h1 className="mt-3 text-[34px] font-black leading-tight tracking-[-0.05em] sm:text-[42px]">
                        Kelola Akademik
                    </h1>

                    <p className="mt-4 max-w-2xl text-[14px] font-medium leading-7 text-blue-100">
                        Atur hero akademik, judul setiap tab, dan data kalender
                        akademik yang tampil di frontend.
                    </p>
                </div>

                <Link
                    href="/akademik"
                    className="inline-flex min-h-[50px] items-center justify-center rounded-[16px] border border-white/15 bg-white/10 px-6 text-[13px] font-extrabold uppercase tracking-[0.08em] text-white transition hover:bg-white/20"
                >
                    Lihat Akademik
                </Link>
            </div>

            <div className="grid gap-6 xl:grid-cols-[1fr_430px] xl:items-start">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <SectionCard
                        eyebrow="Hero"
                        title="Hero Halaman Akademik"
                        description="Bagian ini dipakai untuk pengaturan umum halaman akademik."
                    >
                        <div className="grid gap-5 md:grid-cols-2">
                            <div className="md:col-span-2">
                                <FileUploadBox
                                    label="Gambar Hero Akademik"
                                    currentUrl={page?.hero_image_url}
                                    file={data.hero_image}
                                    onChange={(event) =>
                                        setImage("hero_image", event)
                                    }
                                    error={errors.hero_image}
                                />
                            </div>

                            <TextInput
                                label="Judul Hero"
                                value={data.hero_title}
                                onChange={(event) =>
                                    setField("hero_title", event.target.value)
                                }
                                error={errors.hero_title}
                                placeholder="Akademik Sekolah"
                            />

                            <TextInput
                                label="Sub Judul Singkat"
                                value={data.hero_subtitle}
                                onChange={(event) =>
                                    setField(
                                        "hero_subtitle",
                                        event.target.value
                                    )
                                }
                                error={errors.hero_subtitle}
                                placeholder="Informasi akademik sekolah"
                            />
                        </div>
                    </SectionCard>

                    <SectionCard
                        eyebrow="Judul Section"
                        title="Judul dan Deskripsi Menu Akademik"
                        description="Data ini akan dipakai sebagai teks pendukung setiap bagian akademik."
                    >
                        <div className="grid gap-5">
                            <div className="grid gap-5 md:grid-cols-2">
                                <TextInput
                                    label="Judul Kalender"
                                    value={data.calendar_title}
                                    onChange={(event) =>
                                        setField(
                                            "calendar_title",
                                            event.target.value
                                        )
                                    }
                                    error={errors.calendar_title}
                                    placeholder="Kalender Akademik"
                                />

                                <TextInput
                                    label="Judul Dewan Guru"
                                    value={data.teacher_title}
                                    onChange={(event) =>
                                        setField(
                                            "teacher_title",
                                            event.target.value
                                        )
                                    }
                                    error={errors.teacher_title}
                                    placeholder="Dewan Guru"
                                />

                                <TextInput
                                    label="Judul Ekstrakurikuler"
                                    value={data.extracurricular_title}
                                    onChange={(event) =>
                                        setField(
                                            "extracurricular_title",
                                            event.target.value
                                        )
                                    }
                                    error={errors.extracurricular_title}
                                    placeholder="Ekstrakurikuler"
                                />

                                <TextInput
                                    label="Judul OSIS"
                                    value={data.osis_title}
                                    onChange={(event) =>
                                        setField(
                                            "osis_title",
                                            event.target.value
                                        )
                                    }
                                    error={errors.osis_title}
                                    placeholder="Pengurus OSIS"
                                />

                                <div className="md:col-span-2">
                                    <TextInput
                                        label="Judul Prestasi"
                                        value={data.achievement_title}
                                        onChange={(event) =>
                                            setField(
                                                "achievement_title",
                                                event.target.value
                                            )
                                        }
                                        error={errors.achievement_title}
                                        placeholder="Prestasi Siswa"
                                    />
                                </div>
                            </div>

                            <div className="grid gap-5 md:grid-cols-2">
                                <TextArea
                                    label="Deskripsi Kalender"
                                    value={data.calendar_description}
                                    onChange={(event) =>
                                        setField(
                                            "calendar_description",
                                            event.target.value
                                        )
                                    }
                                    error={errors.calendar_description}
                                    rows={3}
                                />

                                <TextArea
                                    label="Deskripsi Dewan Guru"
                                    value={data.teacher_description}
                                    onChange={(event) =>
                                        setField(
                                            "teacher_description",
                                            event.target.value
                                        )
                                    }
                                    error={errors.teacher_description}
                                    rows={3}
                                />

                                <TextArea
                                    label="Deskripsi Ekstrakurikuler"
                                    value={data.extracurricular_description}
                                    onChange={(event) =>
                                        setField(
                                            "extracurricular_description",
                                            event.target.value
                                        )
                                    }
                                    error={errors.extracurricular_description}
                                    rows={3}
                                />

                                <TextArea
                                    label="Deskripsi OSIS"
                                    value={data.osis_description}
                                    onChange={(event) =>
                                        setField(
                                            "osis_description",
                                            event.target.value
                                        )
                                    }
                                    error={errors.osis_description}
                                    rows={3}
                                />

                                <div className="md:col-span-2">
                                    <TextArea
                                        label="Deskripsi Prestasi"
                                        value={data.achievement_description}
                                        onChange={(event) =>
                                            setField(
                                                "achievement_description",
                                                event.target.value
                                            )
                                        }
                                        error={errors.achievement_description}
                                        rows={3}
                                    />
                                </div>
                            </div>
                        </div>
                    </SectionCard>

                    <SectionCard
                        eyebrow="Kalender"
                        title="Kalender Akademik"
                        description="Tambah, edit, urutkan, dan aktifkan agenda kalender akademik."
                    >
                        <CalendarRepeater
                            items={data.calendars}
                            onAdd={addCalendar}
                            onChange={updateCalendar}
                            onToggle={updateCalendar}
                            onRemove={removeCalendar}
                            errors={errors}
                        />
                    </SectionCard>

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
                                    : "Simpan Akademik"}
                            </button>
                        </div>
                    </div>
                </form>

                <aside className="xl:sticky xl:top-[98px]">
                    <PreviewCard data={data} page={page} />
                </aside>
            </div>
        </AdminLayout>
    );
}