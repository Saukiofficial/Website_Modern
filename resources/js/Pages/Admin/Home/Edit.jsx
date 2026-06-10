import { Head, Link, useForm } from "@inertiajs/react";
import AdminLayout from "../Layouts/AdminLayout";

const iconOptions = [
    { value: "users", label: "Users / Siswa" },
    { value: "teacher", label: "Teacher / Guru" },
    { value: "trophy", label: "Trophy / Prestasi" },
    { value: "list", label: "List / Kegiatan" },
];

function TextInput({
    label,
    name,
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
                name={name}
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

function TextArea({ label, name, value, onChange, error, placeholder }) {
    return (
        <div>
            <label className="mb-2 block text-[13px] font-extrabold text-[#061b46]">
                {label}
            </label>

            <textarea
                name={name}
                value={value || ""}
                onChange={onChange}
                placeholder={placeholder}
                rows="5"
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

function SelectInput({ label, value, onChange, children }) {
    return (
        <div>
            <label className="mb-2 block text-[13px] font-extrabold text-[#061b46]">
                {label}
            </label>

            <select
                value={value || ""}
                onChange={onChange}
                className="h-[54px] w-full rounded-[16px] border border-slate-200 bg-white px-4 text-[14px] font-semibold text-slate-700 outline-none transition focus:border-[#0b73e8] focus:ring-4 focus:ring-blue-100"
            >
                {children}
            </select>
        </div>
    );
}

function FileUploadBox({ label, currentUrl, previewUrl, onChange, error }) {
    const imageUrl = previewUrl || currentUrl || null;

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
                        className="h-[160px] w-full rounded-[18px] object-cover"
                    />
                ) : (
                    <div className="flex h-[160px] w-full items-center justify-center rounded-[18px] bg-white text-[42px] shadow-sm">
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

function StatisticCard({
    statistic,
    index,
    onChange,
    onToggle,
    onRemove,
    errors,
}) {
    return (
        <div className="rounded-[24px] border border-slate-200 bg-slate-50 p-5">
            <div className="mb-5 flex items-center justify-between gap-4">
                <div>
                    <p className="text-[12px] font-extrabold uppercase tracking-[0.16em] text-[#d59a25]">
                        Statistik {index + 1}
                    </p>

                    <h3 className="mt-1 text-[18px] font-black text-[#061b46]">
                        {statistic.title || "Statistik Sekolah"}
                    </h3>
                </div>

                <button
                    type="button"
                    onClick={() => onRemove(index)}
                    className="inline-flex h-10 items-center justify-center rounded-[12px] bg-red-50 px-4 text-[12px] font-extrabold text-red-700 transition hover:bg-red-100"
                >
                    Hapus
                </button>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
                <TextInput
                    label="Judul Statistik"
                    name="title"
                    value={statistic.title}
                    onChange={(event) =>
                        onChange(index, "title", event.target.value)
                    }
                    error={errors?.[`statistics.${index}.title`]}
                    placeholder="Contoh: SISWA AKTIF"
                />

                <TextInput
                    label="Value"
                    name="value"
                    value={statistic.value}
                    onChange={(event) =>
                        onChange(index, "value", event.target.value)
                    }
                    error={errors?.[`statistics.${index}.value`]}
                    placeholder="Contoh: 1.245"
                />

                <TextInput
                    label="Deskripsi"
                    name="description"
                    value={statistic.description}
                    onChange={(event) =>
                        onChange(index, "description", event.target.value)
                    }
                    error={errors?.[`statistics.${index}.description`]}
                    placeholder="Contoh: Siswa"
                />

                <SelectInput
                    label="Icon"
                    value={statistic.icon}
                    onChange={(event) =>
                        onChange(index, "icon", event.target.value)
                    }
                >
                    {iconOptions.map((icon) => (
                        <option key={icon.value} value={icon.value}>
                            {icon.label}
                        </option>
                    ))}
                </SelectInput>

                <TextInput
                    label="Urutan"
                    name="sort_order"
                    type="number"
                    value={statistic.sort_order}
                    onChange={(event) =>
                        onChange(index, "sort_order", event.target.value)
                    }
                    error={errors?.[`statistics.${index}.sort_order`]}
                    placeholder="1"
                />

                <label className="flex cursor-pointer items-center justify-between rounded-[18px] border border-slate-200 bg-white px-5 py-4">
                    <div>
                        <p className="text-[14px] font-extrabold text-[#061b46]">
                            Status Statistik
                        </p>
                        <p className="mt-1 text-[12px] font-semibold text-slate-500">
                            Tampilkan di frontend.
                        </p>
                    </div>

                    <input
                        type="checkbox"
                        checked={Boolean(statistic.is_active)}
                        onChange={(event) =>
                            onToggle(index, event.target.checked)
                        }
                        className="h-5 w-5 rounded border-slate-300 text-[#0b73e8] focus:ring-[#0b73e8]"
                    />
                </label>
            </div>
        </div>
    );
}

function PreviewCard({ data, homeSection }) {
    const heroBackgroundPreview = data.hero_background
        ? URL.createObjectURL(data.hero_background)
        : homeSection?.hero_background_url || "/frontend/images/school-bg.jpg";

    const heroImagePreview = data.hero_image
        ? URL.createObjectURL(data.hero_image)
        : homeSection?.hero_image_url || "/frontend/images/students.png";

    const activeStatistics = data.statistics.filter((item) => item.is_active);

    return (
        <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/70">
            <p className="text-[12px] font-extrabold uppercase tracking-[0.18em] text-[#d59a25]">
                Preview Beranda
            </p>

            <div className="mt-6 overflow-hidden rounded-[24px] border border-slate-200 bg-[#064493]">
                <div className="relative min-h-[290px] overflow-hidden">
                    <img
                        src={heroBackgroundPreview}
                        alt="Hero background"
                        className="absolute inset-0 h-full w-full object-cover"
                    />

                    <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,37,86,0.96)_0%,rgba(6,68,147,0.82)_55%,rgba(6,68,147,0.18)_100%)]" />

                    <img
                        src={heroImagePreview}
                        alt="Hero"
                        className="absolute bottom-0 right-0 z-20 h-[210px] w-auto object-contain"
                        onError={(event) => {
                            event.currentTarget.style.display = "none";
                        }}
                    />

                    <div className="relative z-30 p-6">
                        <h2 className="max-w-[330px] text-[25px] font-black leading-tight tracking-[-0.04em] text-white">
                            {data.hero_title || "Hero Title"}
                        </h2>

                        <p className="mt-3 max-w-[320px] text-[13px] font-semibold leading-6 text-blue-50">
                            {data.hero_subtitle || "Hero subtitle"}
                        </p>

                        <div className="mt-5 inline-flex h-11 items-center rounded-[12px] bg-[#0b73e8] px-5 text-[12px] font-extrabold text-white">
                            {data.hero_button_text || "Selengkapnya"} →
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3">
                {activeStatistics.length > 0 ? (
                    activeStatistics.slice(0, 4).map((item, index) => (
                        <div
                            key={`${item.title}-${index}`}
                            className="rounded-[18px] border border-slate-200 bg-slate-50 p-4"
                        >
                            <p className="text-[10px] font-extrabold uppercase text-[#064493]">
                                {item.title || "STATISTIK"}
                            </p>

                            <h3 className="mt-2 text-[24px] font-black text-[#061b46]">
                                {item.value || "0"}
                            </h3>

                            <p className="mt-1 text-[12px] font-bold text-slate-500">
                                {item.description || "-"}
                            </p>
                        </div>
                    ))
                ) : (
                    <div className="col-span-2 rounded-[18px] border border-slate-200 bg-slate-50 p-4 text-[13px] font-bold text-slate-500">
                        Belum ada statistik aktif.
                    </div>
                )}
            </div>

            <div className="mt-5 rounded-[20px] bg-gradient-to-br from-[#064493] to-[#0b63d8] p-5 text-white">
                <h3 className="text-[24px] font-black">
                    {data.ppdb_title || "PPDB"}
                </h3>

                <p className="mt-3 text-[13px] font-medium leading-6 text-blue-50">
                    {data.ppdb_description || "Deskripsi PPDB"}
                </p>

                <div className="mt-4 inline-flex h-11 items-center rounded-[12px] bg-white px-5 text-[12px] font-extrabold text-[#064493]">
                    {data.ppdb_button_text || "Daftar Sekarang"}
                </div>
            </div>
        </div>
    );
}

export default function Edit({ homeSection, statistics }) {
    const initialStatistics =
        Array.isArray(statistics) && statistics.length > 0
            ? statistics
            : [
                  {
                      id: null,
                      title: "SISWA AKTIF",
                      value: "1.245",
                      description: "Siswa",
                      icon: "users",
                      sort_order: 1,
                      is_active: true,
                  },
              ];

    const { data, setData, post, processing, errors } = useForm({
        hero_title: homeSection?.hero_title || "",
        hero_subtitle: homeSection?.hero_subtitle || "",
        hero_button_text: homeSection?.hero_button_text || "",
        hero_button_url: homeSection?.hero_button_url || "",
        hero_background: null,
        hero_image: null,
        ppdb_title: homeSection?.ppdb_title || "",
        ppdb_description: homeSection?.ppdb_description || "",
        ppdb_button_text: homeSection?.ppdb_button_text || "",
        ppdb_button_url: homeSection?.ppdb_button_url || "",
        statistics: initialStatistics,
    });

    const handleChange = (event) => {
        const { name, value } = event.target;

        setData(name, value);
    };

    const handleHeroBackgroundChange = (event) => {
        const file = event.target.files?.[0] || null;

        setData("hero_background", file);
    };

    const handleHeroImageChange = (event) => {
        const file = event.target.files?.[0] || null;

        setData("hero_image", file);
    };

    const handleStatisticChange = (index, field, value) => {
        const nextStatistics = [...data.statistics];

        nextStatistics[index] = {
            ...nextStatistics[index],
            [field]: value,
        };

        setData("statistics", nextStatistics);
    };

    const handleStatisticToggle = (index, checked) => {
        handleStatisticChange(index, "is_active", checked);
    };

    const addStatistic = () => {
        const nextIndex = data.statistics.length + 1;

        setData("statistics", [
            ...data.statistics,
            {
                id: null,
                title: "",
                value: "",
                description: "",
                icon: "list",
                sort_order: nextIndex,
                is_active: true,
            },
        ]);
    };

    const removeStatistic = (index) => {
        const nextStatistics = data.statistics.filter(
            (_, currentIndex) => currentIndex !== index
        );

        setData("statistics", nextStatistics);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        post("/admin/home", {
            forceFormData: true,
            preserveScroll: true,
        });
    };

    return (
        <AdminLayout title="Beranda">
            <Head title="Beranda" />

            <div className="mb-6 flex flex-col gap-4 rounded-[28px] bg-gradient-to-br from-[#061b46] to-[#0b3b85] p-6 text-white shadow-2xl shadow-blue-200 sm:p-8 lg:flex-row lg:items-center lg:justify-between">
                <div>
                    <p className="text-[12px] font-extrabold uppercase tracking-[0.22em] text-[#f7c46a]">
                        Konten Frontend
                    </p>

                    <h1 className="mt-3 text-[34px] font-black leading-tight tracking-[-0.05em] sm:text-[42px]">
                        Kelola Beranda
                    </h1>

                    <p className="mt-4 max-w-2xl text-[14px] font-medium leading-7 text-blue-100">
                        Atur hero section, gambar, CTA, statistik sekolah, dan
                        card PPDB yang tampil di halaman utama.
                    </p>
                </div>

                <Link
                    href="/"
                    className="inline-flex min-h-[50px] items-center justify-center rounded-[16px] border border-white/15 bg-white/10 px-6 text-[13px] font-extrabold uppercase tracking-[0.08em] text-white transition hover:bg-white/20"
                >
                    Lihat Frontend
                </Link>
            </div>

            <div className="grid gap-6 xl:grid-cols-[1fr_440px] xl:items-start">
                <form
                    onSubmit={handleSubmit}
                    className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/70 sm:p-8"
                >
                    <div className="border-b border-slate-200 pb-6">
                        <p className="text-[12px] font-extrabold uppercase tracking-[0.18em] text-[#d59a25]">
                            Hero Section
                        </p>

                        <h2 className="mt-2 text-[24px] font-black tracking-[-0.04em] text-[#061b46]">
                            Konten Hero Beranda
                        </h2>
                    </div>

                    <div className="mt-7 grid gap-5 md:grid-cols-2">
                        <div className="md:col-span-2">
                            <TextInput
                                label="Hero Title"
                                name="hero_title"
                                value={data.hero_title}
                                onChange={handleChange}
                                error={errors.hero_title}
                                placeholder="Masukkan judul hero"
                            />
                        </div>

                        <div className="md:col-span-2">
                            <TextArea
                                label="Hero Subtitle"
                                name="hero_subtitle"
                                value={data.hero_subtitle}
                                onChange={handleChange}
                                error={errors.hero_subtitle}
                                placeholder="Masukkan deskripsi hero"
                            />
                        </div>

                        <TextInput
                            label="Teks Tombol Hero"
                            name="hero_button_text"
                            value={data.hero_button_text}
                            onChange={handleChange}
                            error={errors.hero_button_text}
                            placeholder="Contoh: Selengkapnya"
                        />

                        <TextInput
                            label="URL Tombol Hero"
                            name="hero_button_url"
                            value={data.hero_button_url}
                            onChange={handleChange}
                            error={errors.hero_button_url}
                            placeholder="Contoh: #profil"
                        />

                        <div className="md:col-span-2 grid gap-5 md:grid-cols-2">
                            <FileUploadBox
                                label="Gambar Background Hero"
                                currentUrl={homeSection?.hero_background_url}
                                previewUrl={
                                    data.hero_background
                                        ? URL.createObjectURL(
                                              data.hero_background
                                          )
                                        : null
                                }
                                onChange={handleHeroBackgroundChange}
                                error={errors.hero_background}
                            />

                            <FileUploadBox
                                label="Gambar Siswa / Hero Image"
                                currentUrl={homeSection?.hero_image_url}
                                previewUrl={
                                    data.hero_image
                                        ? URL.createObjectURL(data.hero_image)
                                        : null
                                }
                                onChange={handleHeroImageChange}
                                error={errors.hero_image}
                            />
                        </div>
                    </div>

                    <div className="mt-10 border-b border-slate-200 pb-6">
                        <p className="text-[12px] font-extrabold uppercase tracking-[0.18em] text-[#d59a25]">
                            PPDB Card
                        </p>

                        <h2 className="mt-2 text-[24px] font-black tracking-[-0.04em] text-[#061b46]">
                            Konten PPDB di Beranda
                        </h2>
                    </div>

                    <div className="mt-7 grid gap-5 md:grid-cols-2">
                        <TextInput
                            label="Judul PPDB"
                            name="ppdb_title"
                            value={data.ppdb_title}
                            onChange={handleChange}
                            error={errors.ppdb_title}
                            placeholder="Contoh: PPDB 2026/2027"
                        />

                        <TextInput
                            label="Teks Tombol PPDB"
                            name="ppdb_button_text"
                            value={data.ppdb_button_text}
                            onChange={handleChange}
                            error={errors.ppdb_button_text}
                            placeholder="Contoh: Daftar Sekarang"
                        />

                        <div className="md:col-span-2">
                            <TextArea
                                label="Deskripsi PPDB"
                                name="ppdb_description"
                                value={data.ppdb_description}
                                onChange={handleChange}
                                error={errors.ppdb_description}
                                placeholder="Masukkan deskripsi PPDB"
                            />
                        </div>

                        <div className="md:col-span-2">
                            <TextInput
                                label="URL Tombol PPDB"
                                name="ppdb_button_url"
                                value={data.ppdb_button_url}
                                onChange={handleChange}
                                error={errors.ppdb_button_url}
                                placeholder="/ppdb/daftar"
                            />
                        </div>
                    </div>

                    <div className="mt-10 border-b border-slate-200 pb-6">
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                                <p className="text-[12px] font-extrabold uppercase tracking-[0.18em] text-[#d59a25]">
                                    Statistik Sekolah
                                </p>

                                <h2 className="mt-2 text-[24px] font-black tracking-[-0.04em] text-[#061b46]">
                                    Data Statistik
                                </h2>
                            </div>

                            <button
                                type="button"
                                onClick={addStatistic}
                                className="inline-flex min-h-[46px] items-center justify-center rounded-[14px] bg-blue-50 px-5 text-[12px] font-extrabold uppercase tracking-[0.08em] text-blue-700 transition hover:bg-blue-100"
                            >
                                Tambah Statistik
                            </button>
                        </div>
                    </div>

                    <div className="mt-7 space-y-5">
                        {data.statistics.length > 0 ? (
                            data.statistics.map((statistic, index) => (
                                <StatisticCard
                                    key={index}
                                    statistic={statistic}
                                    index={index}
                                    onChange={handleStatisticChange}
                                    onToggle={handleStatisticToggle}
                                    onRemove={removeStatistic}
                                    errors={errors}
                                />
                            ))
                        ) : (
                            <div className="rounded-[22px] border border-dashed border-slate-200 bg-slate-50 p-8 text-center">
                                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white text-[30px] shadow-sm">
                                    📊
                                </div>

                                <h3 className="mt-5 text-[20px] font-black text-[#061b46]">
                                    Belum ada statistik
                                </h3>

                                <p className="mt-2 text-[13px] font-semibold text-slate-500">
                                    Tambahkan statistik agar tampil di beranda.
                                </p>
                            </div>
                        )}
                    </div>

                    <div className="mt-8 flex flex-col-reverse gap-3 border-t border-slate-200 pt-6 sm:flex-row sm:items-center sm:justify-end">
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
                            {processing ? "Menyimpan..." : "Simpan Beranda"}
                        </button>
                    </div>
                </form>

                <PreviewCard data={data} homeSection={homeSection} />
            </div>
        </AdminLayout>
    );
}