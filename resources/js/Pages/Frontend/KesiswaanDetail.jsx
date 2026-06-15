import { useMemo, useState } from "react";
import { useForm } from "@inertiajs/react";
import FrontendLayout from "../../Layouts/FrontendLayout";

const fallbackPageData = {
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

function mergeProgramData(type, program) {
    const fallback = fallbackPageData[type] ?? fallbackPageData.osis;

    if (!program) {
        return fallback;
    }

    return {
        label: program.title || fallback.label,
        eyebrow: program.eyebrow || fallback.eyebrow,
        title: program.form_title || fallback.title,
        heroTitle: program.hero_title || fallback.heroTitle,
        description: program.description || fallback.description,
        heroImage: program.hero_image_url || fallback.heroImage,
        fallbackImage: fallback.fallbackImage,
        icon: program.icon || fallback.icon,
        formDescription: program.form_description || fallback.formDescription,
        points:
            Array.isArray(program.points) && program.points.length > 0
                ? program.points
                : fallback.points,
        interestLabel: program.interest_label || fallback.interestLabel,
        interestOptions:
            Array.isArray(program.interest_options) &&
            program.interest_options.length > 0
                ? program.interest_options
                : fallback.interestOptions,
        reasonLabel: program.reason_label || fallback.reasonLabel,
        reasonPlaceholder:
            program.reason_placeholder || fallback.reasonPlaceholder,
    };
}

function FieldError({ error }) {
    if (!error) return null;

    return (
        <p className="mt-2 text-[12px] font-semibold text-red-600">
            {error}
        </p>
    );
}

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
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className={`h-[52px] w-full rounded-[12px] border bg-white px-4 text-[14px] font-medium text-slate-700 outline-none transition placeholder:text-slate-400 focus:ring-4 sm:h-[54px] ${
                    error
                        ? "border-red-300 focus:border-red-500 focus:ring-red-100"
                        : "border-slate-200 focus:border-[#0d58cf] focus:ring-blue-100"
                }`}
            />

            <FieldError error={error} />
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
                value={value}
                onChange={onChange}
                className={`h-[52px] w-full rounded-[12px] border bg-white px-4 text-[14px] font-medium text-slate-700 outline-none transition focus:ring-4 sm:h-[54px] ${
                    error
                        ? "border-red-300 focus:border-red-500 focus:ring-red-100"
                        : "border-slate-200 focus:border-[#0d58cf] focus:ring-blue-100"
                }`}
            >
                {children}
            </select>

            <FieldError error={error} />
        </div>
    );
}

function TextArea({ label, name, value, onChange, placeholder, error }) {
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
                className={`w-full resize-none rounded-[12px] border bg-white px-4 py-4 text-[14px] font-medium text-slate-700 outline-none transition placeholder:text-slate-400 focus:ring-4 ${
                    error
                        ? "border-red-300 focus:border-red-500 focus:ring-red-100"
                        : "border-slate-200 focus:border-[#0d58cf] focus:ring-blue-100"
                }`}
            />

            <FieldError error={error} />
        </div>
    );
}

function ProgramSidebar({ data }) {
    return (
        <aside className="lg:sticky lg:top-[118px]">
            <div className="rounded-[22px] bg-white p-4 shadow-xl shadow-slate-200/70 sm:p-5">
                <div className="rounded-[18px] bg-gradient-to-br from-[#052b66] to-[#063f8d] p-4 text-white sm:p-5">
                    <div className="flex h-12 w-12 items-center justify-center rounded-[14px] border border-white/20 bg-white/10 text-[26px] sm:h-14 sm:w-14 sm:text-[30px]">
                        {data.icon}
                    </div>

                    <h3 className="mt-4 break-words font-serif text-[23px] font-semibold leading-tight tracking-[-0.035em] sm:text-[27px]">
                        {data.label}
                    </h3>

                    <p className="mt-3 line-clamp-3 text-[13px] font-medium leading-7 text-blue-100">
                        {data.description}
                    </p>
                </div>

                <div className="mt-5">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#d5a542]">
                        Detail Program
                    </p>

                    <div className="mt-4 space-y-2.5">
                        {data.points.map((item) => (
                            <div
                                key={item}
                                className="flex gap-3 rounded-[14px] border border-slate-100 bg-slate-50 p-3"
                            >
                                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#052b66] text-[12px] text-white">
                                    ✓
                                </div>

                                <p className="line-clamp-2 text-[12.5px] font-medium leading-6 text-slate-600">
                                    {item}
                                </p>
                            </div>
                        ))}
                    </div>

                    <a
                        href="/kesiswaan"
                        className="mt-5 inline-flex min-h-[46px] w-full items-center justify-center rounded-[12px] border border-slate-200 bg-white px-5 text-[12px] font-semibold uppercase tracking-[0.06em] text-[#061b46] transition hover:bg-slate-50"
                    >
                        Kembali ke Kesiswaan
                    </a>
                </div>
            </div>
        </aside>
    );
}

function SuccessPopup({ show, onClose, title }) {
    if (!show) return null;

    return (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-[#061b46]/55 px-4 backdrop-blur-sm">
            <div className="w-full max-w-[440px] overflow-hidden rounded-[24px] bg-white p-6 text-center shadow-2xl shadow-blue-950/30 sm:rounded-[26px] sm:p-7">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-[36px] sm:h-20 sm:w-20 sm:text-[42px]">
                    ✅
                </div>

                <h3 className="mt-5 font-serif text-[26px] font-semibold leading-tight text-[#061b46] sm:text-[30px]">
                    Formulir Berhasil Dikirim
                </h3>

                <p className="mt-3 text-[14px] font-medium leading-7 text-slate-600">
                    Data pendaftaran <strong>{title}</strong> sudah berhasil
                    dikirim ke admin dan akan diproses oleh pihak sekolah.
                </p>

                <button
                    type="button"
                    onClick={onClose}
                    className="mt-7 inline-flex min-h-[48px] w-full items-center justify-center rounded-[14px] bg-[#052b66] px-6 text-[13px] font-semibold uppercase tracking-[0.08em] text-white transition hover:bg-[#063f8d]"
                >
                    Mengerti
                </button>
            </div>
        </div>
    );
}

export default function KesiswaanDetail({ type = "osis", program = null }) {
    const dataProgram = useMemo(() => {
        return mergeProgramData(type, program);
    }, [type, program]);

    const [showSuccessPopup, setShowSuccessPopup] = useState(false);

    const {
        data,
        setData,
        post,
        processing,
        errors,
        reset,
        clearErrors,
    } = useForm({
        type,
        nama: "",
        nisn: "",
        kelas: "",
        noHp: "",
        email: "",
        interest: "",
        pengalaman: "",
        alasan: "",
        agreement: false,
    });

    const handleChange = (event) => {
        const { name, value, type: inputType, checked } = event.target;

        setData(name, inputType === "checkbox" ? checked : value);

        if (errors[name]) {
            clearErrors(name);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        post(`/kesiswaan/${type}/daftar`, {
            preserveScroll: true,
            onSuccess: () => {
                reset(
                    "nama",
                    "nisn",
                    "kelas",
                    "noHp",
                    "email",
                    "interest",
                    "pengalaman",
                    "alasan",
                    "agreement"
                );

                setShowSuccessPopup(true);
            },
        });
    };

    return (
        <FrontendLayout>
            <SuccessPopup
                show={showSuccessPopup}
                onClose={() => setShowSuccessPopup(false)}
                title={dataProgram.label}
            />

            <section className="relative w-full overflow-hidden bg-[#052b66]">
                <div className="relative min-h-[330px] w-full overflow-hidden sm:min-h-[370px] lg:min-h-[400px]">
                    <img
                        src={dataProgram.heroImage}
                        alt={dataProgram.label}
                        className="absolute inset-0 h-full w-full object-cover object-center"
                        onError={(event) => {
                            event.currentTarget.src =
                                dataProgram.fallbackImage;
                        }}
                    />

                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(3,29,74,0.98)_0%,rgba(3,42,101,0.90)_52%,rgba(4,62,145,0.76)_100%)] lg:bg-[linear-gradient(90deg,rgba(3,29,74,0.99)_0%,rgba(3,42,101,0.94)_44%,rgba(3,42,101,0.68)_70%,rgba(4,62,145,0.16)_100%)]" />

                    <div className="relative z-10 flex min-h-[330px] flex-col justify-center px-4 py-10 sm:min-h-[370px] sm:px-6 lg:min-h-[400px] lg:px-10 xl:px-14 2xl:px-16">
                        <div className="flex flex-wrap items-center gap-2 text-[12px] font-medium text-blue-100 sm:gap-3 sm:text-[13px]">
                            <a href="/" className="hover:text-white">
                                Beranda
                            </a>

                            <span>›</span>

                            <a href="/kesiswaan" className="hover:text-white">
                                Kesiswaan
                            </a>

                            <span>›</span>

                            <span className="text-white">
                                {dataProgram.label}
                            </span>
                        </div>

                        <p className="mt-6 text-[12px] font-semibold uppercase tracking-[0.18em] text-[#d5a542] sm:mt-8 sm:text-[13px] sm:tracking-[0.22em]">
                            {dataProgram.eyebrow}
                        </p>

                        <h1 className="mt-4 max-w-5xl break-words font-serif text-[32px] font-semibold leading-tight tracking-[-0.045em] text-white sm:text-[50px] lg:text-[58px]">
                            {dataProgram.heroTitle}
                        </h1>

                        <p className="mt-5 max-w-[820px] break-words text-[14px] font-medium leading-7 text-blue-50 sm:text-[16px] sm:leading-8">
                            {dataProgram.description}
                        </p>
                    </div>
                </div>
            </section>

            <section className="w-full bg-[#f4f8fc] px-4 py-8 sm:px-6 sm:py-10 lg:px-10 lg:py-12 xl:px-14 2xl:px-16">
                <div className="grid gap-6 lg:grid-cols-[300px_minmax(0,1fr)] lg:items-start">
                    <ProgramSidebar data={dataProgram} />

                    <form
                        onSubmit={handleSubmit}
                        className="min-w-0 rounded-[22px] bg-white p-5 shadow-xl shadow-slate-200/70 sm:rounded-[26px] sm:p-7 lg:p-8"
                    >
                        <div className="border-b border-slate-200 pb-6 sm:pb-8">
                            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-5">
                                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-blue-50 text-[30px] text-[#052b66] sm:h-16 sm:w-16 sm:text-[34px]">
                                    {dataProgram.icon}
                                </div>

                                <div className="min-w-0">
                                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#d5a542] sm:text-[12px] sm:tracking-[0.22em]">
                                        Form Kesiswaan
                                    </p>

                                    <h2 className="mt-3 break-words font-serif text-[28px] font-semibold leading-tight tracking-[-0.035em] text-[#061b46] sm:text-[38px]">
                                        {dataProgram.title}
                                    </h2>

                                    <p className="mt-3 max-w-3xl break-words text-[14px] font-medium leading-7 text-slate-600">
                                        {dataProgram.formDescription}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-7 grid gap-5 md:grid-cols-2 sm:mt-8">
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
                                label="Kelas"
                                name="kelas"
                                value={data.kelas}
                                onChange={handleChange}
                                error={errors.kelas}
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
                                placeholder="Contoh: siswa@email.com"
                                error={errors.email}
                            />

                            <SelectInput
                                label={dataProgram.interestLabel}
                                name="interest"
                                value={data.interest}
                                onChange={handleChange}
                                error={errors.interest}
                            >
                                <option value="">
                                    Pilih {dataProgram.interestLabel}
                                </option>

                                {dataProgram.interestOptions.map((option) => (
                                    <option key={option} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </SelectInput>
                        </div>

                        <div className="mt-7 grid gap-5 md:grid-cols-2 sm:mt-8">
                            <TextArea
                                label="Pengalaman / Riwayat Kegiatan"
                                name="pengalaman"
                                value={data.pengalaman}
                                onChange={handleChange}
                                placeholder="Tuliskan pengalaman organisasi, lomba, kegiatan sekolah, atau pengalaman lain yang relevan"
                                error={errors.pengalaman}
                            />

                            <TextArea
                                label={dataProgram.reasonLabel}
                                name="alasan"
                                value={data.alasan}
                                onChange={handleChange}
                                placeholder={dataProgram.reasonPlaceholder}
                                error={errors.alasan}
                            />
                        </div>

                        <div
                            className={`mt-7 rounded-[14px] border bg-[#f8fbff] p-4 sm:mt-8 sm:p-5 ${
                                errors.agreement
                                    ? "border-red-300"
                                    : "border-slate-200"
                            }`}
                        >
                            <label className="flex items-start gap-4">
                                <input
                                    type="checkbox"
                                    name="agreement"
                                    checked={Boolean(data.agreement)}
                                    onChange={handleChange}
                                    className="mt-1 h-5 w-5 rounded border-slate-300 text-[#0d58cf] focus:ring-[#0d58cf]"
                                />

                                <span className="text-[13px] font-medium leading-7 text-slate-600 sm:text-[14px]">
                                    Saya menyatakan data yang diisi sudah benar
                                    dan bersedia mengikuti ketentuan program
                                    kesiswaan yang berlaku di sekolah.
                                </span>
                            </label>

                            <FieldError error={errors.agreement} />
                        </div>

                        <div className="mt-7 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:justify-end sm:gap-4">
                            <a
                                href="/kesiswaan"
                                className="inline-flex min-h-[52px] items-center justify-center rounded-[12px] border border-slate-200 bg-white px-7 text-[12px] font-semibold uppercase tracking-[0.06em] text-[#061b46] transition hover:bg-slate-50 sm:min-h-[54px] sm:px-8 sm:text-[13px]"
                            >
                                Kembali
                            </a>

                            <button
                                type="submit"
                                disabled={processing}
                                className="inline-flex min-h-[52px] items-center justify-center gap-3 rounded-[12px] bg-[#d5a542] px-7 text-[12px] font-semibold uppercase tracking-[0.06em] text-white shadow-lg shadow-blue-200 transition hover:bg-[#f7c46a] disabled:cursor-not-allowed disabled:opacity-70 sm:min-h-[54px] sm:px-8 sm:text-[13px]"
                            >
                                {processing ? "Mengirim..." : "Kirim Formulir"}
                                <span>→</span>
                            </button>
                        </div>
                    </form>
                </div>
            </section>
        </FrontendLayout>
    );
}