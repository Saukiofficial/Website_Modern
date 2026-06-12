import { useForm } from "@inertiajs/react";
import FrontendLayout from "../../Layouts/FrontendLayout";

const fallbackSetting = {
    academic_year: "2026/2027",
    hero_title: "Pengumuman Hasil PPDB",
    hero_description:
        "Cek hasil seleksi penerimaan peserta didik baru secara online menggunakan nomor pendaftaran atau NISN.",
    hero_image_url: "/frontend/images/ppdb-hero.jpg",
};

function getStatusStyle(type) {
    const styles = {
        accepted: {
            pageGradient: "from-emerald-50 via-white to-blue-50",
            cardBorder: "border-emerald-200",
            softBg: "bg-emerald-50",
            badge: "bg-emerald-600 text-white",
            text: "text-emerald-700",
            ring: "ring-emerald-100",
            icon: "✅",
            title: "Selamat, Diterima!",
            label: "Lulus Seleksi",
        },
        rejected: {
            pageGradient: "from-red-50 via-white to-blue-50",
            cardBorder: "border-red-200",
            softBg: "bg-red-50",
            badge: "bg-red-600 text-white",
            text: "text-red-700",
            ring: "ring-red-100",
            icon: "❌",
            title: "Belum Diterima",
            label: "Tidak Lulus Seleksi",
        },
        process: {
            pageGradient: "from-blue-50 via-white to-sky-50",
            cardBorder: "border-blue-200",
            softBg: "bg-blue-50",
            badge: "bg-blue-600 text-white",
            text: "text-blue-700",
            ring: "ring-blue-100",
            icon: "🔎",
            title: "Sedang Diverifikasi",
            label: "Proses Verifikasi",
        },
        pending: {
            pageGradient: "from-yellow-50 via-white to-blue-50",
            cardBorder: "border-yellow-200",
            softBg: "bg-yellow-50",
            badge: "bg-yellow-500 text-[#061b46]",
            text: "text-yellow-700",
            ring: "ring-yellow-100",
            icon: "⏳",
            title: "Belum Diumumkan",
            label: "Menunggu Pengumuman",
        },
    };

    return styles[type] || styles.pending;
}

function InfoCard({ label, value, className = "" }) {
    return (
        <div
            className={`rounded-[18px] border border-slate-200 bg-white px-5 py-4 shadow-sm ${className}`}
        >
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">
                {label}
            </p>

            <p className="mt-2 text-[14px] font-semibold leading-6 text-[#061b46]">
                {value || "-"}
            </p>
        </div>
    );
}

function StudentPhoto({ result }) {
    return (
        <div className="relative mx-auto w-full max-w-[280px]">
            <div className="absolute -inset-3 rounded-[34px] bg-gradient-to-br from-[#f7c46a]/60 via-blue-200/50 to-emerald-200/50 blur-xl" />

            <div className="relative overflow-hidden rounded-[30px] border-[6px] border-white bg-slate-100 shadow-2xl shadow-blue-950/20">
                {result.photo_url ? (
                    <img
                        src={result.photo_url}
                        alt={result.student_name}
                        className="h-[330px] w-full object-cover object-center"
                        onError={(event) => {
                            event.currentTarget.style.display = "none";
                            event.currentTarget.nextSibling.style.display =
                                "flex";
                        }}
                    />
                ) : null}

                <div
                    className={`h-[330px] w-full flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-slate-100 text-center ${
                        result.photo_url ? "hidden" : "flex"
                    }`}
                >
                    <div className="flex h-24 w-24 items-center justify-center rounded-full bg-white text-[48px] shadow-lg">
                        👤
                    </div>

                    <p className="mt-4 text-[13px] font-semibold text-slate-500">
                        Foto siswa belum tersedia
                    </p>
                </div>
            </div>

            <div className="relative mx-auto -mt-8 w-[86%] rounded-[20px] bg-white px-5 py-4 text-center shadow-xl shadow-slate-300/60">
                <h3 className="line-clamp-2 text-[18px] font-bold leading-tight text-[#061b46]">
                    {result.student_name}
                </h3>

                <p className="mt-1 text-[12px] font-semibold text-slate-500">
                    {result.registration_number || "-"}
                </p>
            </div>
        </div>
    );
}

function StatusResult({ result }) {
    const activeStyle = getStatusStyle(result.status_type);

    return (
        <div
            className={`overflow-hidden rounded-[34px] border ${activeStyle.cardBorder} bg-gradient-to-br ${activeStyle.pageGradient} shadow-2xl shadow-slate-300/70`}
        >
            <div className="relative overflow-hidden bg-[#061b46] px-6 py-6 text-white sm:px-8">
                <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[#f7c46a]/20 blur-2xl" />
                <div className="absolute -bottom-20 left-10 h-48 w-48 rounded-full bg-blue-400/20 blur-2xl" />

                <div className="relative z-10 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                        <p className="text-[12px] font-semibold uppercase tracking-[0.22em] text-[#f7c46a]">
                            Hasil Seleksi PPDB
                        </p>

                        <h2 className="mt-3 font-serif text-[34px] font-semibold leading-tight tracking-[-0.04em] sm:text-[46px]">
                            {activeStyle.title}
                        </h2>

                        <p className="mt-3 max-w-2xl text-[14px] font-medium leading-7 text-blue-100">
                            {result.message}
                        </p>
                    </div>

                    <div className="flex items-center gap-4 rounded-[22px] border border-white/15 bg-white/10 px-5 py-4 backdrop-blur-md">
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-[34px]">
                            {activeStyle.icon}
                        </div>

                        <div>
                            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-blue-100">
                                Status
                            </p>

                            <span
                                className={`mt-2 inline-flex rounded-full px-4 py-2 text-[12px] font-bold uppercase tracking-[0.1em] ${activeStyle.badge}`}
                            >
                                {result.status_label}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid gap-8 p-6 sm:p-8 xl:grid-cols-[330px_1fr]">
                <div className="flex items-start justify-center">
                    <StudentPhoto result={result} />
                </div>

                <div className="min-w-0">
                    <div className="mb-6 rounded-[24px] border border-white bg-white/85 p-5 shadow-xl shadow-slate-200/70 backdrop-blur">
                        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                            <div>
                                <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[#d5a542]">
                                    Identitas Calon Siswa
                                </p>

                                <h3 className="mt-2 text-[28px] font-bold leading-tight tracking-[-0.04em] text-[#061b46] sm:text-[34px]">
                                    {result.student_name}
                                </h3>
                            </div>

                            <div
                                className={`rounded-[18px] px-5 py-3 text-center ring-1 ${activeStyle.softBg} ${activeStyle.ring}`}
                            >
                                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                                    Keterangan
                                </p>

                                <p
                                    className={`mt-1 text-[15px] font-bold ${activeStyle.text}`}
                                >
                                    {activeStyle.label}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                        <InfoCard
                            label="Nomor Pendaftaran"
                            value={result.registration_number}
                        />
                        <InfoCard label="NISN" value={result.nisn} />
                        <InfoCard
                            label="Jenis Kelamin"
                            value={result.gender}
                        />
                        <InfoCard
                            label="Tempat, Tanggal Lahir"
                            value={[
                                result.birth_place,
                                result.birth_date,
                            ]
                                .filter(Boolean)
                                .join(", ")}
                        />
                        <InfoCard label="Agama" value={result.religion} />
                        <InfoCard
                            label="Asal Sekolah"
                            value={result.previous_school}
                        />
                        <InfoCard label="No. HP" value={result.phone} />
                        <InfoCard label="Email" value={result.email} />
                        <InfoCard
                            label="Tanggal Daftar"
                            value={result.submitted_at}
                        />
                        <InfoCard
                            label="Status Sistem"
                            value={result.status}
                        />

                        <InfoCard
                            label="Alamat"
                            value={result.address}
                            className="md:col-span-2"
                        />
                    </div>

                    {result.admin_note ? (
                        <div className="mt-6 rounded-[22px] border border-slate-200 bg-white p-5 shadow-sm">
                            <div className="flex items-start gap-4">
                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-[24px]">
                                    📝
                                </div>

                                <div>
                                    <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-slate-400">
                                        Catatan Panitia
                                    </p>

                                    <p className="mt-2 text-[14px] font-medium leading-7 text-slate-700">
                                        {result.admin_note}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ) : null}

                    <div className="mt-7 grid gap-3 sm:grid-cols-3">
                        <a
                            href="/ppdb"
                            className="inline-flex min-h-[52px] items-center justify-center rounded-[14px] border border-slate-200 bg-white px-6 text-[12px] font-semibold uppercase tracking-[0.08em] text-[#061b46] transition hover:bg-slate-50"
                        >
                            Kembali ke PPDB
                        </a>

                        <a
                            href="/ppdb/daftar"
                            className="inline-flex min-h-[52px] items-center justify-center rounded-[14px] bg-[#052b66] px-6 text-[12px] font-semibold uppercase tracking-[0.08em] text-white transition hover:bg-[#063f8d]"
                        >
                            Form Pendaftaran
                        </a>

                    <a
                        href={`/ppdb/pengumuman/cetak/${result.id}`}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex min-h-[52px] items-center justify-center rounded-[14px] bg-[#f7c46a] px-6 text-[12px] font-semibold uppercase tracking-[0.08em] text-[#061b46] transition hover:bg-yellow-300"
                    >
                        Cetak Hasil
                    </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

function EmptyResult({ keyword }) {
    return (
        <div className="rounded-[30px] border border-red-100 bg-white p-7 text-center shadow-xl shadow-slate-200/70 sm:p-10">
            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-red-50 text-[48px]">
                🔍
            </div>

            <h2 className="mt-6 font-serif text-[36px] font-semibold tracking-[-0.04em] text-[#061b46] sm:text-[44px]">
                Data Tidak Ditemukan
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-[14px] font-medium leading-7 text-slate-600">
                Nomor pendaftaran atau NISN{" "}
                <span className="font-bold text-[#061b46]">{keyword}</span>{" "}
                tidak ditemukan. Pastikan data yang dimasukkan sudah benar.
            </p>

            <div className="mx-auto mt-7 max-w-2xl rounded-[20px] bg-blue-50 p-5 text-left">
                <p className="text-[13px] font-semibold leading-7 text-[#063f8d]">
                    Tips: gunakan nomor pendaftaran yang didapat setelah
                    mengirim formulir, contoh: PPDB-20260612-ABCDE. Kamu juga
                    bisa menggunakan NISN yang dimasukkan saat pendaftaran.
                </p>
            </div>
        </div>
    );
}

function StartState({ academicYear }) {
    return (
        <div className="rounded-[30px] border border-slate-200 bg-white p-8 text-center shadow-xl shadow-slate-200/70 sm:p-10">
            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-blue-50 text-[50px]">
                📢
            </div>

            <h2 className="mt-6 font-serif text-[38px] font-semibold tracking-[-0.04em] text-[#061b46] sm:text-[48px]">
                Hasil PPDB Siap Dicek
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-[14px] font-medium leading-7 text-slate-600">
                Silakan masukkan nomor pendaftaran atau NISN pada form di
                samping untuk melihat status hasil seleksi PPDB.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
                <InfoCard label="Status" value="Online" />
                <InfoCard label="Tahun Ajaran" value={academicYear} />
                <InfoCard label="Akses" value="24 Jam" />
            </div>
        </div>
    );
}

export default function PPDBAnnouncement({
    setting = null,
    result = null,
    searched = false,
    keyword = "",
}) {
    const ppdbSetting = {
        ...fallbackSetting,
        ...(setting || {}),
    };

    const { data, setData, post, processing, errors } = useForm({
        keyword: keyword || "",
    });

    const handleSubmit = (event) => {
        event.preventDefault();

        post("/ppdb/pengumuman/cek", {
            preserveScroll: true,
        });
    };

    return (
        <FrontendLayout>
            <section className="relative w-full overflow-hidden bg-[#052b66]">
                <div className="relative min-h-[500px] w-full overflow-hidden lg:min-h-[540px]">
                    <img
                        src={
                            ppdbSetting.hero_image_url ||
                            "/frontend/images/ppdb-hero.jpg"
                        }
                        alt="Pengumuman Hasil PPDB"
                        className="absolute inset-0 h-full w-full object-cover object-center"
                        onError={(event) => {
                            event.currentTarget.src =
                                "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1900&q=85";
                        }}
                    />

                    <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(3,29,74,0.99)_0%,rgba(3,42,101,0.94)_44%,rgba(3,42,101,0.70)_70%,rgba(4,62,145,0.18)_100%)]" />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(3,24,58,0.06)_0%,rgba(3,24,58,0.02)_48%,rgba(3,24,58,0.28)_100%)]" />

                    <div className="relative z-10 flex min-h-[500px] flex-col justify-center px-4 py-12 sm:px-6 lg:min-h-[540px] lg:px-10 xl:px-14 2xl:px-16">
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
                                Pengumuman Hasil
                            </span>
                        </div>

                        <p className="mt-9 text-[13px] font-semibold uppercase tracking-[0.22em] text-[#d5a542]">
                            PPDB {ppdbSetting.academic_year || "2026/2027"}
                        </p>

                        <h1 className="mt-5 max-w-4xl font-serif text-[46px] font-semibold leading-tight tracking-[-0.045em] text-white sm:text-[62px] lg:text-[78px]">
                            Pengumuman
                            <br />
                            Hasil PPDB
                        </h1>

                        <p className="mt-6 max-w-[780px] text-[16px] font-medium leading-8 text-blue-50">
                            Cek status hasil seleksi penerimaan peserta didik
                            baru menggunakan nomor pendaftaran atau NISN.
                        </p>
                    </div>
                </div>
            </section>

            <section className="w-full bg-[#f4f8fc] px-4 py-10 sm:px-6 lg:px-10 lg:py-12 xl:px-14 2xl:px-16">
                <div className="mx-auto max-w-[1280px]">
                    <div className="grid gap-7 lg:grid-cols-[390px_1fr] lg:items-start">
                        <div className="rounded-[30px] bg-white p-6 shadow-xl shadow-slate-200/70 sm:p-8 lg:sticky lg:top-[110px]">
                            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#052b66] text-[34px] text-white shadow-xl shadow-blue-200">
                                🔎
                            </div>

                            <p className="mt-6 text-[13px] font-semibold uppercase tracking-[0.2em] text-[#d5a542]">
                                Cek Hasil
                            </p>

                            <h2 className="mt-4 font-serif text-[34px] font-semibold leading-tight tracking-[-0.04em] text-[#061b46]">
                                Masukkan Nomor Pendaftaran atau NISN
                            </h2>

                            <p className="mt-3 text-[14px] font-medium leading-7 text-slate-600">
                                Gunakan nomor pendaftaran yang kamu dapatkan
                                setelah mengirim formulir PPDB. Jika lupa, kamu
                                juga bisa menggunakan NISN.
                            </p>

                            <form onSubmit={handleSubmit} className="mt-7">
                                <label className="mb-2 block text-[13px] font-semibold text-[#061b46]">
                                    Nomor Pendaftaran / NISN
                                </label>

                                <input
                                    type="text"
                                    value={data.keyword}
                                    onChange={(event) =>
                                        setData("keyword", event.target.value)
                                    }
                                    placeholder="Contoh: PPDB-20260612-ABCDE"
                                    className={`h-[56px] w-full rounded-[16px] border bg-white px-4 text-[14px] font-semibold text-slate-700 outline-none transition placeholder:text-slate-400 focus:ring-4 ${
                                        errors.keyword
                                            ? "border-red-300 focus:border-red-500 focus:ring-red-100"
                                            : "border-slate-200 focus:border-[#0d58cf] focus:ring-blue-100"
                                    }`}
                                />

                                {errors.keyword ? (
                                    <p className="mt-2 text-[12px] font-semibold text-red-600">
                                        {errors.keyword}
                                    </p>
                                ) : null}

                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="mt-5 inline-flex min-h-[56px] w-full items-center justify-center rounded-[16px] bg-[#052b66] px-6 text-[13px] font-semibold uppercase tracking-[0.08em] text-white shadow-lg shadow-blue-200 transition hover:bg-[#063f8d] disabled:cursor-not-allowed disabled:opacity-70"
                                >
                                    {processing
                                        ? "Mengecek..."
                                        : "Cek Hasil PPDB"}
                                </button>
                            </form>

                            <div className="mt-7 rounded-[22px] bg-gradient-to-br from-[#052b66] to-[#063f8d] p-5 text-white">
                                <p className="text-[14px] font-semibold">
                                    Informasi Penting
                                </p>

                                <p className="mt-2 text-[12.5px] font-medium leading-6 text-blue-100">
                                    Jika hasil belum muncul, kemungkinan data
                                    masih dalam proses verifikasi atau jadwal
                                    pengumuman belum dibuka.
                                </p>
                            </div>

                            <a
                                href="/ppdb"
                                className="mt-4 inline-flex min-h-[50px] w-full items-center justify-center rounded-[16px] border border-slate-200 bg-white px-6 text-[12px] font-semibold uppercase tracking-[0.08em] text-[#061b46] transition hover:bg-slate-50"
                            >
                                Kembali ke PPDB
                            </a>
                        </div>

                        <div>
                            {searched && result ? (
                                <StatusResult result={result} />
                            ) : null}

                            {searched && !result ? (
                                <EmptyResult keyword={keyword} />
                            ) : null}

                            {!searched ? (
                                <StartState
                                    academicYear={
                                        ppdbSetting.academic_year ||
                                        "2026/2027"
                                    }
                                />
                            ) : null}
                        </div>
                    </div>
                </div>
            </section>
        </FrontendLayout>
    );
}