import { useState } from "react";
import { useForm } from "@inertiajs/react";
import FrontendLayout from "../../Layouts/FrontendLayout";

const sidebarSteps = [
    {
        number: "01",
        title: "Data Calon Siswa",
        description: "Wajib diisi lengkap",
    },
    {
        number: "02",
        title: "Data Orang Tua / Wali",
        description: "Wajib diisi lengkap",
    },
    {
        number: "03",
        title: "Dokumen Persyaratan",
        description: "Wajib diunggah",
    },
];

const documentItems = [
    {
        key: "familyCard",
        title: "Kartu Keluarga",
        description: "Upload file PDF/JPG/PNG maks. 2MB",
    },
    {
        key: "birthCertificate",
        title: "Akta Kelahiran",
        description: "Upload file PDF/JPG/PNG maks. 2MB",
    },
    {
        key: "certificate",
        title: "Ijazah / SKL",
        description: "Upload file PDF/JPG/PNG maks. 2MB",
    },
    {
        key: "reportCard",
        title: "Rapor Terakhir",
        description: "Upload file PDF/JPG/PNG maks. 2MB",
    },
    {
        key: "photo",
        title: "Pas Foto 3x4",
        description: "Upload file JPG/PNG maks. 2MB",
    },
];

function TextInput({
    label,
    name,
    value,
    onChange,
    placeholder,
    type = "text",
    error,
}) {
    return (
        <div>
            <label className="mb-2 block text-[13px] font-semibold text-[#061b46]">
                {label}
            </label>

            <input
                type={type}
                name={name}
                value={value || ""}
                onChange={onChange}
                placeholder={placeholder}
                className={`h-[54px] w-full rounded-[12px] border bg-white px-4 text-[14px] font-medium text-slate-700 outline-none transition placeholder:text-slate-400 focus:ring-4 ${
                    error
                        ? "border-red-300 focus:border-red-500 focus:ring-red-100"
                        : "border-slate-200 focus:border-[#0d58cf] focus:ring-blue-100"
                }`}
            />

            {error ? (
                <p className="mt-2 text-[12px] font-semibold text-red-600">
                    {error}
                </p>
            ) : null}
        </div>
    );
}

function SelectInput({ label, name, value, onChange, children, error }) {
    return (
        <div>
            <label className="mb-2 block text-[13px] font-semibold text-[#061b46]">
                {label}
            </label>

            <select
                name={name}
                value={value || ""}
                onChange={onChange}
                className={`h-[54px] w-full rounded-[12px] border bg-white px-4 text-[14px] font-medium text-slate-700 outline-none transition focus:ring-4 ${
                    error
                        ? "border-red-300 focus:border-red-500 focus:ring-red-100"
                        : "border-slate-200 focus:border-[#0d58cf] focus:ring-blue-100"
                }`}
            >
                {children}
            </select>

            {error ? (
                <p className="mt-2 text-[12px] font-semibold text-red-600">
                    {error}
                </p>
            ) : null}
        </div>
    );
}

function SidebarStep({ item, index }) {
    const isActive = index === 0;

    return (
        <div
            className={`flex items-center gap-4 rounded-[16px] border p-4 transition ${
                isActive
                    ? "border-blue-100 bg-blue-50 shadow-sm"
                    : "border-slate-200 bg-white"
            }`}
        >
            <div
                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-[14px] font-semibold ${
                    isActive
                        ? "bg-[#052b66] text-white"
                        : "bg-white text-[#052b66] ring-1 ring-slate-200"
                }`}
            >
                {item.number}
            </div>

            <div>
                <h3 className="text-[14px] font-semibold leading-tight text-[#061b46]">
                    {item.title}
                </h3>

                <p className="mt-1 text-[12px] font-medium text-slate-500">
                    {item.description}
                </p>
            </div>
        </div>
    );
}

function SectionHeader({ icon, title, description }) {
    return (
        <div className="flex items-start gap-5">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-blue-50 text-[34px] text-[#052b66]">
                {icon}
            </div>

            <div>
                <h2 className="font-serif text-[30px] font-semibold leading-tight tracking-[-0.035em] text-[#061b46] sm:text-[34px]">
                    {title}
                </h2>

                <p className="mt-2 max-w-3xl text-[13.5px] font-medium leading-7 text-slate-600">
                    {description}
                </p>
            </div>
        </div>
    );
}

function DocumentUpload({ item, file, error, onChange }) {
    const fileName = file?.name;

    return (
        <label
            className={`group flex cursor-pointer items-center justify-between gap-4 rounded-[14px] border bg-white px-4 py-4 transition hover:bg-blue-50 ${
                error
                    ? "border-red-300 hover:border-red-400"
                    : "border-slate-200 hover:border-[#0d58cf]"
            }`}
        >
            <input
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={(event) => onChange(event.target.files?.[0] || null)}
                className="hidden"
            />

            <div className="flex min-w-0 items-center gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[12px] bg-blue-50 text-[22px] text-[#052b66]">
                    📄
                </div>

                <div className="min-w-0">
                    <p className="text-[13.5px] font-semibold text-[#061b46]">
                        {item.title}
                    </p>

                    <p className="mt-1 truncate text-[12px] font-medium text-slate-500">
                        {fileName || item.description}
                    </p>

                    {error ? (
                        <p className="mt-1 text-[12px] font-semibold text-red-600">
                            {error}
                        </p>
                    ) : null}
                </div>
            </div>

            <div className="text-[22px] text-[#052b66] transition group-hover:-translate-y-0.5">
                ⬆
            </div>
        </label>
    );
}

function SuccessPopup({ message, onClose }) {
    return (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-[#061b46]/70 px-4 backdrop-blur-sm">
            <div className="w-full max-w-[480px] rounded-[28px] bg-white p-7 text-center shadow-2xl">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-50 text-[42px] text-emerald-600">
                    ✓
                </div>

                <h3 className="mt-5 font-serif text-[32px] font-semibold tracking-[-0.04em] text-[#061b46]">
                    Pendaftaran Berhasil
                </h3>

                <p className="mt-3 text-[14px] font-medium leading-7 text-slate-600">
                    {message || "Data pendaftaran berhasil dikirim ke admin."}
                </p>

                <button
                    type="button"
                    onClick={onClose}
                    className="mt-6 inline-flex min-h-[50px] w-full items-center justify-center rounded-[14px] bg-[#052b66] px-6 text-[13px] font-semibold uppercase tracking-[0.08em] text-white transition hover:bg-[#063f8d]"
                >
                    Tutup
                </button>
            </div>
        </div>
    );
}

export default function PPDBRegister({ setting = null, flash = {} }) {
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");

    const isOpen = setting?.is_open ?? true;

    const { data, setData, post, processing, errors, reset } = useForm({
        nama: "",
        nisn: "",
        jenisKelamin: "",
        tempatLahir: "",
        tanggalLahir: "",
        agama: "",
        asalSekolah: "",
        alamat: "",

        namaAyah: "",
        pekerjaanAyah: "",
        namaIbu: "",
        pekerjaanIbu: "",

        noHp: "",
        email: "",

        familyCard: null,
        birthCertificate: null,
        certificate: null,
        reportCard: null,
        photo: null,

        agreement: false,
    });

    const handleChange = (event) => {
        const { name, value } = event.target;

        setData(name, value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!isOpen) {
            return;
        }

        post("/ppdb/daftar", {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: (page) => {
                const message =
                    page?.props?.flash?.success ||
                    "Pendaftaran berhasil dikirim ke admin.";

                reset();
                setSuccessMessage(message);
                setShowSuccessPopup(true);
            },
        });
    };

    return (
        <FrontendLayout>
            {showSuccessPopup ? (
                <SuccessPopup
                    message={successMessage}
                    onClose={() => setShowSuccessPopup(false)}
                />
            ) : null}

            <section className="relative w-full overflow-hidden bg-[#052b66]">
                <div className="relative min-h-[430px] w-full overflow-hidden lg:min-h-[460px]">
                    <img
                        src="/frontend/images/ppdb-form-hero.jpg"
                        alt="Form Pendaftaran PPDB"
                        className="absolute inset-0 h-full w-full object-cover object-center"
                        onError={(event) => {
                            event.currentTarget.src =
                                "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1900&q=85";
                        }}
                    />

                    <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(3,29,74,0.99)_0%,rgba(3,42,101,0.94)_44%,rgba(3,42,101,0.65)_70%,rgba(4,62,145,0.16)_100%)]" />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(3,24,58,0.06)_0%,rgba(3,24,58,0.02)_48%,rgba(3,24,58,0.26)_100%)]" />

                    <div className="relative z-10 flex min-h-[430px] flex-col justify-center px-4 py-12 sm:px-6 lg:min-h-[460px] lg:px-10 xl:px-14 2xl:px-16">
                        <div className="flex flex-wrap items-center gap-3 text-[13px] font-medium text-blue-100">
                            <a href="/" className="hover:text-white">
                                Beranda
                            </a>
                            <span>›</span>
                            <a href="/ppdb" className="hover:text-white">
                                PPDB
                            </a>
                            <span>›</span>
                            <span className="text-white">
                                Form Pendaftaran
                            </span>
                        </div>

                        <p className="mt-9 text-[13px] font-semibold uppercase tracking-[0.22em] text-[#d5a542]">
                            Formulir PPDB {setting?.academic_year || ""}
                        </p>

                        <h1 className="mt-5 max-w-4xl font-serif text-[46px] font-semibold leading-tight tracking-[-0.045em] text-white sm:text-[62px] lg:text-[72px]">
                            Form Pendaftaran
                            <br />
                            Peserta Didik Baru
                        </h1>

                        <p className="mt-6 max-w-[780px] text-[16px] font-medium leading-8 text-blue-50">
                            Lengkapi data calon siswa, data orang tua, dan
                            unggah dokumen persyaratan untuk proses pendaftaran
                            PPDB.
                        </p>
                    </div>
                </div>
            </section>

            <section className="w-full bg-[#f4f8fc] px-4 py-10 sm:px-6 lg:px-10 lg:py-12 xl:px-14 2xl:px-16">
                {!isOpen ? (
                    <div className="mx-auto max-w-3xl rounded-[26px] bg-white p-8 text-center shadow-xl shadow-slate-200/70">
                        <div className="text-[54px]">⚠️</div>

                        <h2 className="mt-4 font-serif text-[34px] font-semibold tracking-[-0.04em] text-[#061b46]">
                            PPDB Sedang Ditutup
                        </h2>

                        <p className="mt-3 text-[15px] font-medium leading-8 text-slate-600">
                            {setting?.closed_message ||
                                "Pendaftaran PPDB saat ini belum dibuka."}
                        </p>

                        <a
                            href="/ppdb"
                            className="mt-7 inline-flex min-h-[52px] items-center justify-center rounded-[12px] bg-[#052b66] px-7 text-[13px] font-semibold uppercase tracking-[0.08em] text-white"
                        >
                            Kembali ke PPDB
                        </a>
                    </div>
                ) : (
                    <div className="grid gap-8 xl:grid-cols-[300px_1fr] xl:items-start">
                        <aside className="xl:sticky xl:top-[118px]">
                            <div className="rounded-[24px] bg-white p-5 shadow-xl shadow-slate-200/70">
                                <p className="text-[12px] font-semibold uppercase tracking-[0.22em] text-[#052b66]">
                                    Tahapan Form
                                </p>

                                <h2 className="mt-4 font-serif text-[30px] font-semibold leading-tight tracking-[-0.035em] text-[#061b46]">
                                    Lengkapi Data Pendaftaran
                                </h2>

                                <div className="mt-7 space-y-4">
                                    {sidebarSteps.map((item, index) => (
                                        <SidebarStep
                                            key={item.number}
                                            item={item}
                                            index={index}
                                        />
                                    ))}
                                </div>

                                <div className="mt-7 rounded-[18px] bg-[#052b66] p-5 text-white">
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-[20px]">
                                            🛡️
                                        </div>

                                        <h3 className="text-[16px] font-semibold">
                                            Catatan Penting
                                        </h3>
                                    </div>

                                    <p className="mt-4 text-[13px] font-medium leading-7 text-blue-100">
                                        Pastikan data sesuai dokumen resmi. Data
                                        yang tidak valid dapat memengaruhi proses
                                        verifikasi.
                                    </p>
                                </div>
                            </div>
                        </aside>

                        <form
                            onSubmit={handleSubmit}
                            className="rounded-[26px] bg-white p-5 shadow-xl shadow-slate-200/70 sm:p-7 lg:p-8"
                        >
                            <div className="border-b border-slate-200 pb-8">
                                <SectionHeader
                                    icon="👤"
                                    title="Data Calon Peserta Didik"
                                    description="Isi data calon siswa sesuai dengan dokumen resmi seperti Kartu Keluarga, Akta Kelahiran, dan Ijazah/SKL."
                                />

                                <div className="mt-8 grid gap-5 md:grid-cols-2">
                                    <TextInput
                                        label="Nama Lengkap"
                                        name="nama"
                                        value={data.nama}
                                        onChange={handleChange}
                                        placeholder="Masukkan nama lengkap"
                                        error={errors.nama}
                                    />

                                    <TextInput
                                        label="NISN"
                                        name="nisn"
                                        value={data.nisn}
                                        onChange={handleChange}
                                        placeholder="Masukkan NISN"
                                        error={errors.nisn}
                                    />

                                    <SelectInput
                                        label="Jenis Kelamin"
                                        name="jenisKelamin"
                                        value={data.jenisKelamin}
                                        onChange={handleChange}
                                        error={errors.jenisKelamin}
                                    >
                                        <option value="">
                                            Pilih jenis kelamin
                                        </option>
                                        <option value="Laki-laki">
                                            Laki-laki
                                        </option>
                                        <option value="Perempuan">
                                            Perempuan
                                        </option>
                                    </SelectInput>

                                    <TextInput
                                        label="Tempat Lahir"
                                        name="tempatLahir"
                                        value={data.tempatLahir}
                                        onChange={handleChange}
                                        placeholder="Contoh: Sumenep"
                                        error={errors.tempatLahir}
                                    />

                                    <TextInput
                                        label="Tanggal Lahir"
                                        type="date"
                                        name="tanggalLahir"
                                        value={data.tanggalLahir}
                                        onChange={handleChange}
                                        error={errors.tanggalLahir}
                                    />

                                    <SelectInput
                                        label="Agama"
                                        name="agama"
                                        value={data.agama}
                                        onChange={handleChange}
                                        error={errors.agama}
                                    >
                                        <option value="">Pilih agama</option>
                                        <option value="Islam">Islam</option>
                                        <option value="Kristen">
                                            Kristen
                                        </option>
                                        <option value="Katolik">
                                            Katolik
                                        </option>
                                        <option value="Hindu">Hindu</option>
                                        <option value="Buddha">Buddha</option>
                                        <option value="Konghucu">
                                            Konghucu
                                        </option>
                                    </SelectInput>

                                    <TextInput
                                        label="Asal Sekolah"
                                        name="asalSekolah"
                                        value={data.asalSekolah}
                                        onChange={handleChange}
                                        placeholder="Contoh: SMP Negeri 1 Sumenep"
                                        error={errors.asalSekolah}
                                    />

                                    <TextInput
                                        label="Alamat Lengkap"
                                        name="alamat"
                                        value={data.alamat}
                                        onChange={handleChange}
                                        placeholder="Masukkan alamat lengkap"
                                        error={errors.alamat}
                                    />
                                </div>
                            </div>

                            <div className="border-b border-slate-200 py-8">
                                <SectionHeader
                                    icon="👥"
                                    title="Data Orang Tua / Wali"
                                    description="Isi data orang tua atau wali sesuai dengan dokumen resmi."
                                />

                                <div className="mt-8 grid gap-5 md:grid-cols-2">
                                    <TextInput
                                        label="Nama Ayah"
                                        name="namaAyah"
                                        value={data.namaAyah}
                                        onChange={handleChange}
                                        placeholder="Masukkan nama ayah"
                                        error={errors.namaAyah}
                                    />

                                    <TextInput
                                        label="Pekerjaan Ayah"
                                        name="pekerjaanAyah"
                                        value={data.pekerjaanAyah}
                                        onChange={handleChange}
                                        placeholder="Contoh: Wiraswasta"
                                        error={errors.pekerjaanAyah}
                                    />

                                    <TextInput
                                        label="Nama Ibu"
                                        name="namaIbu"
                                        value={data.namaIbu}
                                        onChange={handleChange}
                                        placeholder="Masukkan nama ibu"
                                        error={errors.namaIbu}
                                    />

                                    <TextInput
                                        label="Pekerjaan Ibu"
                                        name="pekerjaanIbu"
                                        value={data.pekerjaanIbu}
                                        onChange={handleChange}
                                        placeholder="Contoh: Ibu Rumah Tangga"
                                        error={errors.pekerjaanIbu}
                                    />

                                    <TextInput
                                        label="Nomor HP Orang Tua"
                                        name="noHp"
                                        value={data.noHp}
                                        onChange={handleChange}
                                        placeholder="Contoh: 081234567890"
                                        error={errors.noHp}
                                    />

                                    <TextInput
                                        label="Email Aktif"
                                        type="email"
                                        name="email"
                                        value={data.email}
                                        onChange={handleChange}
                                        placeholder="Contoh: orangtua@email.com"
                                        error={errors.email}
                                    />
                                </div>
                            </div>

                            <div className="border-b border-slate-200 py-8">
                                <SectionHeader
                                    icon="📁"
                                    title="Upload Dokumen Persyaratan"
                                    description="Unggah dokumen dalam format PDF, JPG, atau PNG maksimal 2MB per file."
                                />

                                <div className="mt-8 grid gap-4 md:grid-cols-2">
                                    {documentItems.map((item) => (
                                        <DocumentUpload
                                            key={item.key}
                                            item={item}
                                            file={data[item.key]}
                                            error={errors[item.key]}
                                            onChange={(file) =>
                                                setData(item.key, file)
                                            }
                                        />
                                    ))}
                                </div>
                            </div>

                            <div className="mt-8 rounded-[14px] border border-slate-200 bg-[#f8fbff] p-5">
                                <label className="flex items-start gap-4">
                                    <input
                                        type="checkbox"
                                        checked={data.agreement}
                                        onChange={(event) =>
                                            setData(
                                                "agreement",
                                                event.target.checked
                                            )
                                        }
                                        className="mt-1 h-5 w-5 rounded border-slate-300 text-[#0d58cf] focus:ring-[#0d58cf]"
                                    />

                                    <span className="text-[14px] font-medium leading-7 text-slate-600">
                                        Saya menyatakan bahwa seluruh data yang
                                        diisi adalah benar dan dapat
                                        dipertanggungjawabkan. Saya bersedia
                                        mengikuti proses verifikasi sesuai
                                        ketentuan sekolah.
                                    </span>
                                </label>

                                {errors.agreement ? (
                                    <p className="mt-2 text-[12px] font-semibold text-red-600">
                                        {errors.agreement}
                                    </p>
                                ) : null}
                            </div>

                            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-end">
                                <a
                                    href="/ppdb"
                                    className="inline-flex min-h-[54px] items-center justify-center rounded-[12px] border border-slate-200 bg-white px-8 text-[13px] font-semibold uppercase tracking-[0.06em] text-[#061b46] transition hover:bg-slate-50"
                                >
                                    Kembali
                                </a>

                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="inline-flex min-h-[54px] items-center justify-center gap-4 rounded-[12px] bg-[#d5a542] px-8 text-[13px] font-semibold uppercase tracking-[0.06em] text-white shadow-lg shadow-blue-200 transition hover:bg-[#f7c46a] disabled:cursor-not-allowed disabled:opacity-70"
                                >
                                    {processing
                                        ? "Mengirim..."
                                        : "Kirim Pendaftaran"}
                                    <span>→</span>
                                </button>
                            </div>
                        </form>
                    </div>
                )}
            </section>
        </FrontendLayout>
    );
}