import { useMemo, useState } from "react";
import FrontendLayout from "../../Layouts/FrontendLayout";

const pageData = {
    osis: {
        label: "OSIS & Kepemimpinan",
        eyebrow: "Form Pendaftaran OSIS",
        title: "Form Pendaftaran OSIS",
        heroTitle: "Pendaftaran Pengurus OSIS dan Program Kepemimpinan",
        description:
            "Daftarkan diri untuk mengikuti seleksi pengurus OSIS dan program pembinaan kepemimpinan siswa.",
        heroImage: "/frontend/images/osis-detail-hero.jpg",
        fallbackImage:
            "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1900&q=85",
        icon: "👥",
        formDescription:
            "Isi data diri, pengalaman organisasi, dan alasan mengikuti OSIS.",
        points: [
            "Pelatihan dasar kepemimpinan siswa",
            "Manajemen organisasi dan kerja sama tim",
            "Program kerja OSIS dan kegiatan sekolah",
            "Pembinaan karakter, disiplin, dan tanggung jawab",
        ],
        interestLabel: "Bidang yang Diminati",
        interestOptions: [
            "Pilih bidang OSIS",
            "Ketua / Wakil Ketua",
            "Sekretaris",
            "Bendahara",
            "Seksi Kegiatan",
            "Seksi Keagamaan",
            "Seksi Kreativitas",
            "Seksi Humas",
        ],
        reasonLabel: "Alasan Mengikuti OSIS",
        reasonPlaceholder:
            "Tuliskan alasan kamu ingin menjadi bagian dari OSIS",
    },

    ekstrakurikuler: {
        label: "Ekstrakurikuler",
        eyebrow: "Form Pendaftaran Ekstrakurikuler",
        title: "Form Pendaftaran Ekstrakurikuler",
        heroTitle: "Pendaftaran Kegiatan Ekstrakurikuler Siswa",
        description:
            "Pilih kegiatan ekstrakurikuler sesuai minat dan bakat untuk mengembangkan potensi diri.",
        heroImage: "/frontend/images/ekstrakurikuler-detail-hero.jpg",
        fallbackImage:
            "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1900&q=85",
        icon: "🎯",
        formDescription:
            "Isi data diri dan pilih ekstrakurikuler yang ingin diikuti.",
        points: [
            "Pilihan kegiatan olahraga, seni, sains, dan teknologi",
            "Pembinaan rutin bersama pembina ekstrakurikuler",
            "Persiapan lomba dan kegiatan sekolah",
            "Pengembangan bakat, kreativitas, dan percaya diri",
        ],
        interestLabel: "Ekstrakurikuler yang Dipilih",
        interestOptions: [
            "Pilih ekstrakurikuler",
            "Pramuka",
            "Paskibra",
            "PMR",
            "Basket",
            "Futsal",
            "Voli",
            "Tari",
            "Musik",
            "English Club",
            "Karya Ilmiah Remaja",
            "Robotik",
        ],
        reasonLabel: "Alasan Memilih Ekstrakurikuler",
        reasonPlaceholder:
            "Tuliskan alasan kamu memilih ekstrakurikuler tersebut",
    },

    "bimbingan-konseling": {
        label: "Bimbingan Konseling",
        eyebrow: "Form Layanan BK",
        title: "Form Pengajuan Layanan BK",
        heroTitle: "Layanan Bimbingan Konseling Siswa",
        description:
            "Ajukan layanan bimbingan konseling untuk kebutuhan akademik, pribadi, sosial, atau karier.",
        heroImage: "/frontend/images/bk-detail-hero.jpg",
        fallbackImage:
            "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1900&q=85",
        icon: "🤝",
        formDescription:
            "Isi data diri dan pilih jenis layanan bimbingan yang dibutuhkan.",
        points: [
            "Konseling pribadi dan sosial siswa",
            "Pendampingan akademik dan motivasi belajar",
            "Bimbingan karier dan rencana masa depan",
            "Layanan konsultasi dengan guru BK",
        ],
        interestLabel: "Jenis Layanan",
        interestOptions: [
            "Pilih jenis layanan",
            "Konseling Pribadi",
            "Konseling Akademik",
            "Konseling Sosial",
            "Bimbingan Karier",
            "Konsultasi Orang Tua",
        ],
        reasonLabel: "Keterangan / Permasalahan",
        reasonPlaceholder:
            "Tuliskan keterangan singkat terkait layanan yang dibutuhkan",
    },
};

const classOptions = [
    "Pilih kelas",
    "X-A",
    "X-B",
    "X-C",
    "XI-A",
    "XI-B",
    "XI-C",
    "XII-A",
    "XII-B",
    "XII-C",
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

function TextArea({ label, name, value, onChange, placeholder }) {
    return (
        <div>
            <label className="mb-2 block text-[13px] font-semibold text-[#061b46]">
                {label}
            </label>

            <textarea
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                rows="5"
                className="w-full resize-none rounded-[12px] border border-slate-200 bg-white px-4 py-4 text-[14px] font-medium text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-[#0d58cf] focus:ring-4 focus:ring-blue-100"
            />
        </div>
    );
}

function ProgramSidebar({ data }) {
    return (
        <aside className="lg:sticky lg:top-[118px]">
            <div className="rounded-[24px] bg-white p-5 shadow-xl shadow-slate-200/70">
                <div className="rounded-[20px] bg-gradient-to-br from-[#052b66] to-[#063f8d] p-5 text-white">
                    <div className="flex h-14 w-14 items-center justify-center rounded-[16px] border border-white/20 bg-white/10 text-[30px]">
                        {data.icon}
                    </div>

                    <h3 className="mt-5 font-serif text-[27px] font-semibold leading-tight tracking-[-0.035em]">
                        {data.label}
                    </h3>

                    <p className="mt-3 text-[13px] font-medium leading-7 text-blue-100">
                        {data.description}
                    </p>
                </div>

                <div className="mt-6">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#d5a542]">
                        Detail Program
                    </p>

                    <div className="mt-5 space-y-3">
                        {data.points.map((item) => (
                            <div
                                key={item}
                                className="flex gap-3 rounded-[14px] border border-slate-100 bg-slate-50 p-4"
                            >
                                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#052b66] text-[12px] text-white">
                                    ✓
                                </div>

                                <p className="text-[13px] font-medium leading-6 text-slate-600">
                                    {item}
                                </p>
                            </div>
                        ))}
                    </div>

                    <a
                        href="/kesiswaan"
                        className="mt-6 inline-flex min-h-[48px] w-full items-center justify-center rounded-[12px] border border-slate-200 bg-white px-5 text-[12px] font-semibold uppercase tracking-[0.06em] text-[#061b46] transition hover:bg-slate-50"
                    >
                        Kembali ke Kesiswaan
                    </a>
                </div>
            </div>
        </aside>
    );
}

export default function KesiswaanDetail({ type = "osis" }) {
    const data = useMemo(() => {
        return pageData[type] ?? pageData.osis;
    }, [type]);

    const [form, setForm] = useState({
        nama: "",
        nisn: "",
        kelas: "",
        noHp: "",
        email: "",
        interest: "",
        pengalaman: "",
        alasan: "",
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
            "Form berhasil disiapkan. Selanjutnya data ini bisa disambungkan ke backend/admin."
        );
    };

    return (
        <FrontendLayout>
            <section className="relative w-full overflow-hidden bg-[#052b66]">
                <div className="relative min-h-[390px] w-full overflow-hidden lg:min-h-[430px]">
                    <img
                        src={data.heroImage}
                        alt={data.label}
                        className="absolute inset-0 h-full w-full object-cover object-center"
                        onError={(event) => {
                            event.currentTarget.src = data.fallbackImage;
                        }}
                    />

                    <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(3,29,74,0.99)_0%,rgba(3,42,101,0.94)_44%,rgba(3,42,101,0.68)_70%,rgba(4,62,145,0.16)_100%)]" />

                    <div className="relative z-10 flex min-h-[390px] flex-col justify-center px-4 py-12 sm:px-6 lg:min-h-[430px] lg:px-10 xl:px-14 2xl:px-16">
                        <div className="flex flex-wrap items-center gap-3 text-[13px] font-medium text-blue-100">
                            <a href="/" className="hover:text-white">
                                Beranda
                            </a>
                            <span>›</span>
                            <a href="/kesiswaan" className="hover:text-white">
                                Kesiswaan
                            </a>
                            <span>›</span>
                            <span className="text-white">{data.label}</span>
                        </div>

                        <p className="mt-9 text-[13px] font-semibold uppercase tracking-[0.22em] text-[#d5a542]">
                            {data.eyebrow}
                        </p>

                        <h1 className="mt-5 max-w-5xl font-serif text-[42px] font-semibold leading-tight tracking-[-0.045em] text-white sm:text-[58px] lg:text-[68px]">
                            {data.heroTitle}
                        </h1>

                        <p className="mt-6 max-w-[820px] text-[16px] font-medium leading-8 text-blue-50">
                            {data.description}
                        </p>
                    </div>
                </div>
            </section>

            <section className="w-full bg-[#f4f8fc] px-4 py-10 sm:px-6 lg:px-10 lg:py-12 xl:px-14 2xl:px-16">
                <div className="grid gap-8 lg:grid-cols-[320px_minmax(0,1fr)] lg:items-start">
                    <ProgramSidebar data={data} />

                    <form
                        onSubmit={handleSubmit}
                        className="min-w-0 rounded-[26px] bg-white p-5 shadow-xl shadow-slate-200/70 sm:p-7 lg:p-8"
                    >
                        <div className="border-b border-slate-200 pb-8">
                            <div className="flex items-start gap-5">
                                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-blue-50 text-[34px] text-[#052b66]">
                                    {data.icon}
                                </div>

                                <div>
                                    <p className="text-[12px] font-semibold uppercase tracking-[0.22em] text-[#d5a542]">
                                        Form Kesiswaan
                                    </p>

                                    <h2 className="mt-3 font-serif text-[34px] font-semibold leading-tight tracking-[-0.035em] text-[#061b46] sm:text-[42px]">
                                        {data.title}
                                    </h2>

                                    <p className="mt-3 max-w-3xl text-[14px] font-medium leading-7 text-slate-600">
                                        {data.formDescription}
                                    </p>
                                </div>
                            </div>
                        </div>

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
                                label="Kelas"
                                name="kelas"
                                value={form.kelas}
                                onChange={handleChange}
                            >
                                {classOptions.map((item) => (
                                    <option
                                        key={item}
                                        value={
                                            item === "Pilih kelas" ? "" : item
                                        }
                                    >
                                        {item}
                                    </option>
                                ))}
                            </SelectInput>

                            <TextInput
                                label="Nomor HP / WhatsApp"
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
                                placeholder="Contoh: siswa@email.com"
                            />

                            <SelectInput
                                label={data.interestLabel}
                                name="interest"
                                value={form.interest}
                                onChange={handleChange}
                            >
                                {data.interestOptions.map((option, index) => (
                                    <option
                                        key={option}
                                        value={index === 0 ? "" : option}
                                    >
                                        {option}
                                    </option>
                                ))}
                            </SelectInput>
                        </div>

                        <div className="mt-8 grid gap-5 md:grid-cols-2">
                            <TextArea
                                label="Pengalaman / Riwayat Kegiatan"
                                name="pengalaman"
                                value={form.pengalaman}
                                onChange={handleChange}
                                placeholder="Tuliskan pengalaman organisasi, lomba, kegiatan sekolah, atau pengalaman lain yang relevan"
                            />

                            <TextArea
                                label={data.reasonLabel}
                                name="alasan"
                                value={form.alasan}
                                onChange={handleChange}
                                placeholder={data.reasonPlaceholder}
                            />
                        </div>

                        <div className="mt-8 rounded-[14px] border border-slate-200 bg-[#f8fbff] p-5">
                            <label className="flex items-start gap-4">
                                <input
                                    type="checkbox"
                                    required
                                    className="mt-1 h-5 w-5 rounded border-slate-300 text-[#0d58cf] focus:ring-[#0d58cf]"
                                />

                                <span className="text-[14px] font-medium leading-7 text-slate-600">
                                    Saya menyatakan data yang diisi sudah benar
                                    dan bersedia mengikuti ketentuan program
                                    kesiswaan yang berlaku di sekolah.
                                </span>
                            </label>
                        </div>

                        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-end">
                            <a
                                href="/kesiswaan"
                                className="inline-flex min-h-[54px] items-center justify-center rounded-[12px] border border-slate-200 bg-white px-8 text-[13px] font-semibold uppercase tracking-[0.06em] text-[#061b46] transition hover:bg-slate-50"
                            >
                                Kembali
                            </a>

                            <button
                                type="submit"
                                className="inline-flex min-h-[54px] items-center justify-center gap-4 rounded-[12px] bg-[#d5a542] px-8 text-[13px] font-semibold uppercase tracking-[0.06em] text-white shadow-lg shadow-blue-200 transition hover:bg-[#f7c46a]"
                            >
                                Kirim Formulir
                                <span>→</span>
                            </button>
                        </div>
                    </form>
                </div>
            </section>
        </FrontendLayout>
    );
}