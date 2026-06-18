import { Head, Link, useForm } from "@inertiajs/react";
import PpdbAdminLayout from "../../Layouts/PpdbAdminLayout";

function Input({ label, value, onChange, error, placeholder, type = "text" }) {
    return (
        <div>
            <label className="mb-2 block text-[13px] font-semibold text-[#061b46]">
                {label}
            </label>

            <input
                type={type}
                value={value || ""}
                onChange={onChange}
                placeholder={placeholder}
                className="h-[54px] w-full rounded-[16px] border border-slate-200 bg-white px-4 text-[14px] font-medium text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-[#0b73e8] focus:ring-4 focus:ring-blue-100"
            />

            {error ? (
                <p className="mt-2 text-[12px] font-semibold text-red-600">
                    {error}
                </p>
            ) : null}
        </div>
    );
}

function Textarea({ label, value, onChange, error, placeholder, rows = 4 }) {
    return (
        <div>
            <label className="mb-2 block text-[13px] font-semibold text-[#061b46]">
                {label}
            </label>

            <textarea
                value={value || ""}
                onChange={onChange}
                placeholder={placeholder}
                rows={rows}
                className="w-full resize-none rounded-[16px] border border-slate-200 bg-white px-4 py-4 text-[14px] font-medium text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-[#0b73e8] focus:ring-4 focus:ring-blue-100"
            />

            {error ? (
                <p className="mt-2 text-[12px] font-semibold text-red-600">
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
                <span className="text-[13px] font-semibold text-[#061b46]">
                    {label}
                </span>

                {description ? (
                    <p className="mt-1 text-[11.5px] font-medium text-slate-500">
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

function UploadBox({
    label,
    description,
    preview,
    icon = "🖼️",
    error,
    onChange,
}) {
    return (
        <div>
            <label className="mb-2 block text-[13px] font-semibold text-[#061b46]">
                {label}
            </label>

            <label className="flex cursor-pointer items-center gap-4 rounded-[18px] border-2 border-dashed border-slate-200 bg-slate-50 p-4 transition hover:border-blue-300 hover:bg-blue-50">
                <input
                    type="file"
                    accept="image/*"
                    onChange={(event) =>
                        onChange(event.target.files?.[0] || null)
                    }
                    className="hidden"
                />

                <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-[14px] bg-white shadow-sm">
                    {preview ? (
                        <img
                            src={preview}
                            alt={label}
                            className="h-full w-full object-contain p-2"
                        />
                    ) : (
                        <span className="text-[30px]">{icon}</span>
                    )}
                </div>

                <div>
                    <p className="text-[13px] font-semibold text-[#061b46]">
                        Klik untuk upload
                    </p>

                    <p className="mt-1 text-[12px] font-medium text-slate-500">
                        {description}
                    </p>
                </div>
            </label>

            {error ? (
                <p className="mt-2 text-[12px] font-semibold text-red-600">
                    {error}
                </p>
            ) : null}
        </div>
    );
}

function FormHeaderPreview({ data, formLogoPreview, committeeSignaturePreview }) {
    const reportDate = new Date().toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });

    const reportLocation = data.report_location || "Sumenep";

    return (
        <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-xl shadow-slate-200/70">
            <div className="mb-5">
                <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[#d59a25]">
                    Live Preview
                </p>

                <h2 className="mt-2 text-[24px] font-semibold tracking-[-0.04em] text-[#061b46]">
                    Formulir & Laporan PPDB
                </h2>
            </div>

            <div className="overflow-hidden rounded-[18px] bg-slate-100 p-4">
                <div className="mx-auto min-h-[640px] max-w-[620px] bg-white p-7 shadow-xl">
                    <div className="flex items-center gap-5 border-b-[4px] border-[#061b46] pb-5">
                        <div className="flex h-[76px] w-[76px] shrink-0 items-center justify-center overflow-hidden rounded-[10px] border-2 border-[#061b46] text-center text-[11px] font-semibold leading-tight text-[#061b46]">
                            {formLogoPreview ? (
                                <img
                                    src={formLogoPreview}
                                    alt="Logo"
                                    className="h-full w-full object-contain p-2"
                                />
                            ) : (
                                <>
                                    LOGO
                                    <br />
                                    SEKOLAH
                                </>
                            )}
                        </div>

                        <div className="flex-1 text-center">
                            <h1 className="text-[17px] font-semibold uppercase tracking-[0.04em] text-[#061b46]">
                                {data.form_title ||
                                    "FORMULIR PENDAFTARAN PESERTA DIDIK BARU"}
                            </h1>

                            <h2 className="mt-1 text-[15px] font-semibold uppercase text-[#061b46]">
                                {data.form_school_name ||
                                    "SMA NEGERI 1 Sumenep"}
                            </h2>

                            <p className="mt-2 text-[11px] font-medium text-slate-600">
                                {data.form_address ||
                                    "Jl. Contoh Alamat Sekolah"}
                            </p>

                            <p className="mt-1 text-[11px] font-medium text-slate-600">
                                Website:{" "}
                                {data.form_website || "sekolah.sch.id"} | Email:{" "}
                                {data.form_email || "admin@sekolah.sch.id"}
                            </p>
                        </div>
                    </div>

                    <div className="mt-5 rounded-[10px] border border-slate-300 p-4 text-center">
                        <h3 className="text-[15px] font-semibold uppercase text-[#061b46]">
                            Bukti Formulir Pendaftaran PPDB
                        </h3>

                        <p className="mt-2 text-[12px] font-semibold text-slate-700">
                            Nomor Pendaftaran: PPDB-20260611-DEMO1
                        </p>

                        <p className="mt-1 text-[12px] font-semibold text-slate-700">
                            Tanggal Daftar: 11 Jun 2026 06:45
                        </p>
                    </div>

                    <div className="mt-5 grid grid-cols-[120px_1fr] gap-5">
                        <div className="h-[150px] rounded-[10px] bg-slate-200" />

                        <div className="space-y-3">
                            <div className="rounded-[10px] border border-slate-300 p-4">
                                <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-500">
                                    Nama Lengkap
                                </p>
                                <p className="mt-2 text-[13px] font-semibold text-slate-900">
                                    Nama Calon Siswa
                                </p>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div className="rounded-[10px] border border-slate-300 p-4">
                                    <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-500">
                                        NISN
                                    </p>
                                    <p className="mt-2 text-[13px] font-semibold text-slate-900">
                                        123456789
                                    </p>
                                </div>

                                <div className="rounded-[10px] border border-slate-300 p-4">
                                    <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-500">
                                        Jenis Kelamin
                                    </p>
                                    <p className="mt-2 text-[13px] font-semibold text-slate-900">
                                        Laki-laki
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-5 rounded-[8px] bg-[#061b46] px-4 py-3 text-[12px] font-semibold uppercase tracking-[0.1em] text-white">
                        A. Data Calon Peserta Didik
                    </div>

                    <div className="mt-8 grid grid-cols-2 gap-8 text-center">
                        <div>
                            <div className="mx-auto h-[78px] border-b border-slate-400" />

                            <p className="mt-2 text-[12px] font-semibold text-[#061b46]">
                                Orang Tua / Wali
                            </p>
                        </div>

                        <div>
                            <p className="mb-2 text-[12px] font-semibold text-[#061b46]">
                                {reportLocation}, {reportDate}
                            </p>

                            <div className="mx-auto flex h-[78px] items-end justify-center border-b border-slate-400">
                                {committeeSignaturePreview ? (
                                    <img
                                        src={committeeSignaturePreview}
                                        alt="Tanda tangan panitia"
                                        className="max-h-[70px] max-w-[170px] object-contain"
                                    />
                                ) : null}
                            </div>

                            <p className="mt-2 text-[12px] font-semibold text-slate-900">
                                {data.committee_name || "Panitia PPDB"}
                            </p>

                            <p className="mt-1 text-[11px] font-semibold text-[#061b46]">
                                {data.committee_position ||
                                    "Ketua Panitia PPDB"}
                            </p>
                        </div>
                    </div>

                    <div className="mt-6 rounded-[12px] border border-dashed border-slate-300 bg-slate-50 p-4">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                            Preview Surat Pengumuman
                        </p>

                        <p className="mt-2 text-[12px] font-semibold leading-6 text-slate-700">
                            Bagian cetak pengumuman frontend juga akan memakai
                            lokasi laporan:
                            <span className="ml-1 font-bold text-[#061b46]">
                                {reportLocation}, {reportDate}
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function Edit({ setting }) {
    const { data, setData, post, processing, errors } = useForm({
        academic_year: setting?.academic_year || "",
        eyebrow: setting?.eyebrow || "",
        hero_title: setting?.hero_title || "",
        hero_description: setting?.hero_description || "",
        hero_image: null,

        form_logo: null,
        form_title:
            setting?.form_title ||
            "FORMULIR PENDAFTARAN PESERTA DIDIK BARU",
        form_school_name:
            setting?.form_school_name || "SMA NEGERI 1 Sumenep",
        form_address: setting?.form_address || "Jl. Contoh Alamat Sekolah",
        form_website: setting?.form_website || "sekolah.sch.id",
        form_email: setting?.form_email || "admin@sekolah.sch.id",

        committee_signature: null,
        committee_name: setting?.committee_name || "Panitia PPDB",
        committee_position:
            setting?.committee_position || "Ketua Panitia PPDB",
        report_location: setting?.report_location || "Sumenep",

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

    const formLogoPreview = data.form_logo
        ? URL.createObjectURL(data.form_logo)
        : setting?.form_logo_url || null;

    const committeeSignaturePreview = data.committee_signature
        ? URL.createObjectURL(data.committee_signature)
        : setting?.committee_signature_url || null;

    const handleSubmit = (event) => {
        event.preventDefault();

        post("/admin/ppdb/settings", {
            forceFormData: true,
            preserveScroll: true,
        });
    };

    return (
        <PpdbAdminLayout title="Setting PPDB">
            <Head title="Setting PPDB" />

            <div className="mb-6 flex flex-col gap-4 rounded-[28px] bg-gradient-to-br from-[#061b46] to-[#0b3b85] p-6 text-white shadow-2xl shadow-blue-200 sm:p-8 lg:flex-row lg:items-center lg:justify-between">
                <div>
                    <p className="text-[12px] font-semibold uppercase tracking-[0.22em] text-[#f7c46a]">
                        PPDB
                    </p>

                    <h1 className="mt-3 text-[34px] font-semibold leading-tight tracking-[-0.05em] sm:text-[42px]">
                        Setting Halaman & Formulir PPDB
                    </h1>

                    <p className="mt-4 max-w-2xl text-[14px] font-medium leading-7 text-blue-100">
                        Kelola halaman PPDB, header formulir, logo, lokasi
                        laporan, dan tanda tangan panitia yang tampil pada
                        formulir serta surat pengumuman PPDB.
                    </p>
                </div>

                <Link
                    href="/ppdb"
                    className="inline-flex min-h-[50px] items-center justify-center rounded-[16px] border border-white/15 bg-white/10 px-6 text-[13px] font-semibold uppercase tracking-[0.08em] text-white transition hover:bg-white/20"
                >
                    Lihat Frontend
                </Link>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid gap-6 xl:grid-cols-[1fr_520px] xl:items-start">
                    <div className="space-y-6">
                        <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/70 sm:p-8">
                            <div className="border-b border-slate-200 pb-6">
                                <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[#d59a25]">
                                    Header Formulir
                                </p>

                                <h2 className="mt-2 text-[24px] font-semibold tracking-[-0.04em] text-[#061b46]">
                                    Kop Formulir & Surat Pengumuman
                                </h2>
                            </div>

                            <div className="mt-7 grid gap-5 md:grid-cols-2">
                                <div className="md:col-span-2">
                                    <UploadBox
                                        label="Logo Formulir"
                                        description="JPG, PNG, WEBP. Maksimal 2MB."
                                        preview={formLogoPreview}
                                        icon="🏫"
                                        error={errors.form_logo}
                                        onChange={(file) =>
                                            setData("form_logo", file)
                                        }
                                    />
                                </div>

                                <div className="md:col-span-2">
                                    <Input
                                        label="Judul Formulir / Laporan"
                                        value={data.form_title}
                                        onChange={(event) =>
                                            setData(
                                                "form_title",
                                                event.target.value
                                            )
                                        }
                                        error={errors.form_title}
                                        placeholder="Contoh: FORMULIR PENDAFTARAN PESERTA DIDIK BARU"
                                    />
                                </div>

                                <div className="md:col-span-2">
                                    <Input
                                        label="Nama Sekolah"
                                        value={data.form_school_name}
                                        onChange={(event) =>
                                            setData(
                                                "form_school_name",
                                                event.target.value
                                            )
                                        }
                                        error={errors.form_school_name}
                                        placeholder="Contoh: SMA Negeri 1 Jakarta"
                                    />
                                </div>

                                <div className="md:col-span-2">
                                    <Input
                                        label="Alamat Sekolah"
                                        value={data.form_address}
                                        onChange={(event) =>
                                            setData(
                                                "form_address",
                                                event.target.value
                                            )
                                        }
                                        error={errors.form_address}
                                        placeholder="Contoh: Jl. Pendidikan No. 1"
                                    />
                                </div>

                                <Input
                                    label="Website"
                                    value={data.form_website}
                                    onChange={(event) =>
                                        setData(
                                            "form_website",
                                            event.target.value
                                        )
                                    }
                                    error={errors.form_website}
                                    placeholder="Contoh: sekolah.sch.id"
                                />

                                <Input
                                    label="Email"
                                    value={data.form_email}
                                    onChange={(event) =>
                                        setData(
                                            "form_email",
                                            event.target.value
                                        )
                                    }
                                    error={errors.form_email}
                                    placeholder="Contoh: admin@sekolah.sch.id"
                                />
                            </div>
                        </section>

                        <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/70 sm:p-8">
                            <div className="border-b border-slate-200 pb-6">
                                <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[#d59a25]">
                                    Tanda Tangan
                                </p>

                                <h2 className="mt-2 text-[24px] font-semibold tracking-[-0.04em] text-[#061b46]">
                                    Panitia PPDB & Lokasi Laporan
                                </h2>
                            </div>

                            <div className="mt-7 grid gap-5 md:grid-cols-2">
                                <div className="md:col-span-2">
                                    <UploadBox
                                        label="Tanda Tangan Panitia"
                                        description="Upload tanda tangan transparan PNG lebih disarankan. Maksimal 2MB."
                                        preview={committeeSignaturePreview}
                                        icon="✍️"
                                        error={errors.committee_signature}
                                        onChange={(file) =>
                                            setData(
                                                "committee_signature",
                                                file
                                            )
                                        }
                                    />
                                </div>

                                <Input
                                    label="Nama Panitia"
                                    value={data.committee_name}
                                    onChange={(event) =>
                                        setData(
                                            "committee_name",
                                            event.target.value
                                        )
                                    }
                                    error={errors.committee_name}
                                    placeholder="Contoh: Luluk Kusfiah"
                                />

                                <Input
                                    label="Jabatan Panitia"
                                    value={data.committee_position}
                                    onChange={(event) =>
                                        setData(
                                            "committee_position",
                                            event.target.value
                                        )
                                    }
                                    error={errors.committee_position}
                                    placeholder="Contoh: Ketua Panitia"
                                />

                                <div className="md:col-span-2">
                                    <Input
                                        label="Lokasi Laporan"
                                        value={data.report_location}
                                        onChange={(event) =>
                                            setData(
                                                "report_location",
                                                event.target.value
                                            )
                                        }
                                        error={errors.report_location}
                                        placeholder="Contoh: Jakarta"
                                    />
                                </div>

                                <div className="md:col-span-2 rounded-[18px] border border-blue-100 bg-blue-50 p-5">
                                    <p className="text-[13px] font-semibold text-[#061b46]">
                                        Lokasi laporan akan tampil di bagian tanda
                                        tangan cetak laporan.
                                    </p>

                                    <p className="mt-2 text-[13px] font-medium leading-6 text-slate-600">
                                        Contoh hasil:{" "}
                                        <span className="font-semibold text-[#061b46]">
                                            {(data.report_location ||
                                                "Jakarta") + ", "}
                                            {new Date().toLocaleDateString(
                                                "id-ID",
                                                {
                                                    day: "2-digit",
                                                    month: "short",
                                                    year: "numeric",
                                                }
                                            )}
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </section>

                        <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/70 sm:p-8">
                            <div className="border-b border-slate-200 pb-6">
                                <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[#d59a25]">
                                    Hero PPDB
                                </p>

                                <h2 className="mt-2 text-[24px] font-semibold tracking-[-0.04em] text-[#061b46]">
                                    Konten Halaman PPDB
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
                                    placeholder="Contoh: 2026/2027"
                                />

                                <Input
                                    label="Eyebrow"
                                    value={data.eyebrow}
                                    onChange={(event) =>
                                        setData("eyebrow", event.target.value)
                                    }
                                    error={errors.eyebrow}
                                    placeholder="Contoh: Penerimaan Peserta Didik Baru"
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
                                        placeholder="Contoh: PPDB SMA Negeri 1 Jakarta"
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
                                        placeholder="Tulis deskripsi singkat halaman PPDB"
                                    />
                                </div>
                            </div>
                        </section>

                        <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/70 sm:p-8">
                            <div className="border-b border-slate-200 pb-6">
                                <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[#d59a25]">
                                    Konten Section
                                </p>

                                <h2 className="mt-2 text-[24px] font-semibold tracking-[-0.04em] text-[#061b46]">
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
                                    placeholder="Contoh: Tahapan Pendaftaran"
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
                                    placeholder="Contoh: Berkas yang Disiapkan"
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
                                    placeholder="Tulis deskripsi alur PPDB"
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
                                    placeholder="Tulis deskripsi persyaratan PPDB"
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
                                    placeholder="Contoh: Daftar Sekarang"
                                />

                                <Input
                                    label="URL Button"
                                    value={data.cta_url}
                                    onChange={(event) =>
                                        setData("cta_url", event.target.value)
                                    }
                                    error={errors.cta_url}
                                    placeholder="Contoh: /ppdb/daftar"
                                />
                            </div>
                        </section>

                        <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/70 sm:p-8">
                            <div className="border-b border-slate-200 pb-6">
                                <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[#d59a25]">
                                    Status Pendaftaran
                                </p>

                                <h2 className="mt-2 text-[24px] font-semibold tracking-[-0.04em] text-[#061b46]">
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
                                    placeholder="Tulis pesan saat pendaftaran ditutup"
                                />
                            </div>
                        </section>
                    </div>

                    <aside className="xl:sticky xl:top-[98px]">
                        <div className="space-y-6">
                            <FormHeaderPreview
                                data={data}
                                formLogoPreview={formLogoPreview}
                                committeeSignaturePreview={
                                    committeeSignaturePreview
                                }
                            />

                            <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/70">
                                <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[#d59a25]">
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
                                            className="h-[220px] w-full rounded-[20px] object-cover"
                                        />
                                    ) : (
                                        <div className="flex h-[220px] w-full items-center justify-center rounded-[20px] bg-white text-[52px] shadow-sm">
                                            🖼️
                                        </div>
                                    )}

                                    <p className="mt-4 text-center text-[13px] font-semibold text-[#061b46]">
                                        Klik untuk upload gambar hero
                                    </p>

                                    <p className="mt-1 text-center text-[11px] font-medium text-slate-500">
                                        JPG, PNG, WEBP. Maksimal 4MB.
                                    </p>
                                </label>

                                {errors.hero_image ? (
                                    <p className="mt-2 text-[12px] font-semibold text-red-600">
                                        {errors.hero_image}
                                    </p>
                                ) : null}
                            </section>
                        </div>
                    </aside>
                </div>

                <div className="sticky bottom-5 z-20 rounded-[24px] border border-slate-200 bg-white/95 p-4 shadow-2xl shadow-slate-300/70 backdrop-blur-xl">
                    <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-end">
                        <Link
                            href="/admin/ppdb/dashboard"
                            className="inline-flex min-h-[50px] items-center justify-center rounded-[16px] border border-slate-200 bg-white px-6 text-[13px] font-semibold uppercase tracking-[0.08em] text-slate-600 transition hover:bg-slate-50"
                        >
                            Kembali
                        </Link>

                        <button
                            type="submit"
                            disabled={processing}
                            className="inline-flex min-h-[50px] items-center justify-center rounded-[16px] bg-[#061b46] px-7 text-[13px] font-semibold uppercase tracking-[0.08em] text-white shadow-xl shadow-blue-200 transition hover:bg-[#0b3b85] disabled:cursor-not-allowed disabled:opacity-70"
                        >
                            {processing
                                ? "Menyimpan..."
                                : "Simpan Setting PPDB"}
                        </button>
                    </div>
                </div>
            </form>
        </PpdbAdminLayout>
    );
}