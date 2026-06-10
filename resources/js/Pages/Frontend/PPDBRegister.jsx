import { useState } from "react";
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
        title: "Kartu Keluarga",
        description: "Upload file PDF/JPG/PNG maks. 2MB",
    },
    {
        title: "Akta Kelahiran",
        description: "Upload file PDF/JPG/PNG maks. 2MB",
    },
    {
        title: "Ijazah / SKL",
        description: "Upload file PDF/JPG/PNG maks. 2MB",
    },
    {
        title: "Rapor Terakhir",
        description: "Upload file PDF/JPG/PNG maks. 2MB",
    },
    {
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
}) {
    return (
        <div>
            <label className="mb-2 block text-[13px] font-semibold text-[#061b46]">
                {label}
            </label>

            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="h-[54px] w-full rounded-[12px] border border-slate-200 bg-white px-4 text-[14px] font-medium text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-[#0d58cf] focus:ring-4 focus:ring-blue-100"
            />
        </div>
    );
}

function SelectInput({ label, name, value, onChange, children }) {
    return (
        <div>
            <label className="mb-2 block text-[13px] font-semibold text-[#061b46]">
                {label}
            </label>

            <select
                name={name}
                value={value}
                onChange={onChange}
                className="h-[54px] w-full rounded-[12px] border border-slate-200 bg-white px-4 text-[14px] font-medium text-slate-700 outline-none transition focus:border-[#0d58cf] focus:ring-4 focus:ring-blue-100"
            >
                {children}
            </select>
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

function DocumentUpload({ item }) {
    return (
        <label className="group flex cursor-pointer items-center justify-between gap-4 rounded-[14px] border border-slate-200 bg-white px-4 py-4 transition hover:border-[#0d58cf] hover:bg-blue-50">
            <input type="file" className="hidden" />

            <div className="flex min-w-0 items-center gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[12px] bg-blue-50 text-[22px] text-[#052b66]">
                    📄
                </div>

                <div className="min-w-0">
                    <p className="text-[13.5px] font-semibold text-[#061b46]">
                        {item.title}
                    </p>

                    <p className="mt-1 text-[12px] font-medium text-slate-500">
                        {item.description}
                    </p>
                </div>
            </div>

            <div className="text-[22px] text-[#052b66] transition group-hover:-translate-y-0.5">
                ⬆
            </div>
        </label>
    );
}

export default function PPDBRegister() {
    const [form, setForm] = useState({
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
    });

    const handleChange = (event) => {
        const { name, value } = event.target;

        setForm((current) => ({
            ...current,
            [name]: value,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        alert(
            "Form pendaftaran berhasil disiapkan. Tahap berikutnya bisa disambungkan ke backend/admin."
        );
    };

    return (
        <FrontendLayout>
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
                            Formulir PPDB
                        </p>

                        <h1 className="mt-5 max-w-4xl font-serif text-[46px] font-semibold leading-tight tracking-[-0.045em] text-white sm:text-[62px] lg:text-[72px]">
                            Form Pendaftaran
                            <br />
                            Peserta Didik Baru
                        </h1>

                        <p className="mt-6 max-w-[780px] text-[16px] font-medium leading-8 text-blue-50">
                            Lengkapi data calon siswa, data orang tua, dan
                            unggah dokumen persyaratan untuk proses pendaftaran
                            PPDB SMA Negeri 1 Mojokerto.
                        </p>
                    </div>
                </div>
            </section>

            <section className="w-full bg-[#f4f8fc] px-4 py-10 sm:px-6 lg:px-10 lg:py-12 xl:px-14 2xl:px-16">
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
                                    Pastikan data sesuai dokumen resmi. Data yang
                                    tidak valid dapat memengaruhi proses
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
                                    value={form.nama}
                                    onChange={handleChange}
                                    placeholder="Masukkan nama lengkap"
                                />

                                <TextInput
                                    label="NISN"
                                    name="nisn"
                                    value={form.nisn}
                                    onChange={handleChange}
                                    placeholder="Masukkan NISN"
                                />

                                <SelectInput
                                    label="Jenis Kelamin"
                                    name="jenisKelamin"
                                    value={form.jenisKelamin}
                                    onChange={handleChange}
                                >
                                    <option value="">Pilih jenis kelamin</option>
                                    <option value="Laki-laki">Laki-laki</option>
                                    <option value="Perempuan">Perempuan</option>
                                </SelectInput>

                                <TextInput
                                    label="Tempat Lahir"
                                    name="tempatLahir"
                                    value={form.tempatLahir}
                                    onChange={handleChange}
                                    placeholder="Contoh: Mojokerto"
                                />

                                <TextInput
                                    label="Tanggal Lahir"
                                    type="date"
                                    name="tanggalLahir"
                                    value={form.tanggalLahir}
                                    onChange={handleChange}
                                />

                                <SelectInput
                                    label="Agama"
                                    name="agama"
                                    value={form.agama}
                                    onChange={handleChange}
                                >
                                    <option value="">Pilih agama</option>
                                    <option value="Islam">Islam</option>
                                    <option value="Kristen">Kristen</option>
                                    <option value="Katolik">Katolik</option>
                                    <option value="Hindu">Hindu</option>
                                    <option value="Buddha">Buddha</option>
                                    <option value="Konghucu">Konghucu</option>
                                </SelectInput>

                                <TextInput
                                    label="Asal Sekolah"
                                    name="asalSekolah"
                                    value={form.asalSekolah}
                                    onChange={handleChange}
                                    placeholder="Contoh: SMP Negeri 1 Mojokerto"
                                />

                                <TextInput
                                    label="Alamat Lengkap"
                                    name="alamat"
                                    value={form.alamat}
                                    onChange={handleChange}
                                    placeholder="Masukkan alamat lengkap"
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
                                    value={form.namaAyah}
                                    onChange={handleChange}
                                    placeholder="Masukkan nama ayah"
                                />

                                <TextInput
                                    label="Pekerjaan Ayah"
                                    name="pekerjaanAyah"
                                    value={form.pekerjaanAyah}
                                    onChange={handleChange}
                                    placeholder="Contoh: Wiraswasta"
                                />

                                <TextInput
                                    label="Nama Ibu"
                                    name="namaIbu"
                                    value={form.namaIbu}
                                    onChange={handleChange}
                                    placeholder="Masukkan nama ibu"
                                />

                                <TextInput
                                    label="Pekerjaan Ibu"
                                    name="pekerjaanIbu"
                                    value={form.pekerjaanIbu}
                                    onChange={handleChange}
                                    placeholder="Contoh: Ibu Rumah Tangga"
                                />

                                <TextInput
                                    label="Nomor HP Orang Tua"
                                    name="noHp"
                                    value={form.noHp}
                                    onChange={handleChange}
                                    placeholder="Contoh: 081234567890"
                                />

                                <TextInput
                                    label="Email Aktif"
                                    type="email"
                                    name="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    placeholder="Contoh: orangtua@email.com"
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
                                        key={item.title}
                                        item={item}
                                    />
                                ))}
                            </div>
                        </div>

                        <div className="mt-8 rounded-[14px] border border-slate-200 bg-[#f8fbff] p-5">
                            <label className="flex items-start gap-4">
                                <input
                                    type="checkbox"
                                    required
                                    className="mt-1 h-5 w-5 rounded border-slate-300 text-[#0d58cf] focus:ring-[#0d58cf]"
                                />

                                <span className="text-[14px] font-medium leading-7 text-slate-600">
                                    Saya menyatakan bahwa seluruh data yang
                                    diisi adalah benar dan dapat
                                    dipertanggungjawabkan. Saya bersedia
                                    mengikuti proses verifikasi sesuai ketentuan
                                    sekolah.
                                </span>
                            </label>
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
                                className="inline-flex min-h-[54px] items-center justify-center gap-4 rounded-[12px] bg-[#d5a542] px-8 text-[13px] font-semibold uppercase tracking-[0.06em] text-white shadow-lg shadow-blue-200 transition hover:bg-[#f7c46a]"
                            >
                                Simpan & Lanjutkan
                                <span>→</span>
                            </button>
                        </div>
                    </form>
                </div>
            </section>
        </FrontendLayout>
    );
}