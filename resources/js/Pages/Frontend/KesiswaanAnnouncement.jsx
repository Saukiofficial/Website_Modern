import { useForm } from "@inertiajs/react";
import FrontendLayout from "../../Layouts/FrontendLayout";

function getStatusStyle(type) {
    const styles = {
        accepted: {
            cardBorder: "border-emerald-200",
            softBg: "bg-emerald-50",
            badge: "bg-emerald-600 text-white",
            text: "text-emerald-700",
            icon: "✅",
            title: "Selamat, Diterima!",
            label: "Lulus Pendaftaran",
        },
        rejected: {
            cardBorder: "border-red-200",
            softBg: "bg-red-50",
            badge: "bg-red-600 text-white",
            text: "text-red-700",
            icon: "❌",
            title: "Belum Diterima",
            label: "Tidak Lulus Pendaftaran",
        },
        process: {
            cardBorder: "border-blue-200",
            softBg: "bg-blue-50",
            badge: "bg-blue-600 text-white",
            text: "text-blue-700",
            icon: "🔎",
            title: "Sedang Diverifikasi",
            label: "Proses Verifikasi",
        },
        pending: {
            cardBorder: "border-yellow-200",
            softBg: "bg-yellow-50",
            badge: "bg-yellow-500 text-[#061b46]",
            text: "text-yellow-700",
            icon: "⏳",
            title: "Belum Diumumkan",
            label: "Menunggu Pengumuman",
        },
    };

    return styles[type] || styles.pending;
}

function InfoCard({ label, value, className = "" }) {
    return (
        <div className={`rounded-[18px] border border-slate-200 bg-white px-5 py-4 shadow-sm ${className}`}>
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">
                {label}
            </p>
            <p className="mt-2 text-[14px] font-semibold leading-6 text-[#061b46]">
                {value || "-"}
            </p>
        </div>
    );
}

function StatusResult({ result }) {
    const activeStyle = getStatusStyle(result.status_type);

    return (
        <div className={`overflow-hidden rounded-[34px] border ${activeStyle.cardBorder} bg-white shadow-2xl shadow-slate-300/70`}>
            <div className="relative overflow-hidden bg-[#061b46] px-6 py-7 text-white sm:px-8">
                <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[#f7c46a]/20 blur-2xl" />
                <div className="absolute -bottom-20 left-10 h-48 w-48 rounded-full bg-blue-400/20 blur-2xl" />

                <div className="relative z-10 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                        <p className="text-[12px] font-semibold uppercase tracking-[0.22em] text-[#f7c46a]">
                            Hasil Pendaftaran Kesiswaan
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
                            <span className={`mt-2 inline-flex rounded-full px-4 py-2 text-[12px] font-bold uppercase tracking-[0.1em] ${activeStyle.badge}`}>
                                {result.status_label}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="p-6 sm:p-8">
                <div className="mb-6 rounded-[24px] border border-slate-200 bg-slate-50 p-5">
                    <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[#d5a542]">
                        Identitas Pendaftar
                    </p>
                    <h3 className="mt-2 text-[28px] font-bold leading-tight tracking-[-0.04em] text-[#061b46] sm:text-[34px]">
                        {result.student_name}
                    </h3>
                    <p className="mt-2 text-[13px] font-semibold text-slate-500">
                        {result.registration_number || "-"}
                    </p>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                    <InfoCard label="Nomor Pendaftaran" value={result.registration_number} />
                    <InfoCard label="Jenis Pendaftaran" value={result.type_label} />
                    <InfoCard label="Program Dipilih" value={result.program_title} />
                    <InfoCard label="NISN" value={result.nisn} />
                    <InfoCard label="Kelas" value={result.class_name} />
                    <InfoCard label="Jenis Kelamin" value={result.gender} />
                    <InfoCard label="No. HP" value={result.phone} />
                    <InfoCard label="Email" value={result.email} />
                    <InfoCard label="Jabatan / Posisi" value={result.approved_role} />
                    <InfoCard label="Tanggal Daftar" value={result.submitted_at} />
                    <InfoCard label="Tanggal Pengumuman" value={result.announced_at} />
                    <InfoCard label="Status Sistem" value={result.status} />
                </div>

                {result.admin_note ? (
                    <div className="mt-6 rounded-[22px] border border-slate-200 bg-white p-5 shadow-sm">
                        <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-slate-400">
                            Catatan Admin
                        </p>
                        <p className="mt-2 text-[14px] font-medium leading-7 text-slate-700">
                            {result.admin_note}
                        </p>
                    </div>
                ) : null}

                <div className="mt-7 grid gap-3 sm:grid-cols-3">
                    <a href="/kesiswaan" className="inline-flex min-h-[52px] items-center justify-center rounded-[14px] border border-slate-200 bg-white px-6 text-[12px] font-semibold uppercase tracking-[0.08em] text-[#061b46] transition hover:bg-slate-50">
                        Kembali
                    </a>
                    <a href="/kesiswaan/osis" className="inline-flex min-h-[52px] items-center justify-center rounded-[14px] bg-[#052b66] px-6 text-[12px] font-semibold uppercase tracking-[0.08em] text-white transition hover:bg-[#063f8d]">
                        Daftar OSIS
                    </a>
                    <a href="/kesiswaan/ekstrakurikuler" className="inline-flex min-h-[52px] items-center justify-center rounded-[14px] bg-[#f7c46a] px-6 text-[12px] font-semibold uppercase tracking-[0.08em] text-[#061b46] transition hover:bg-yellow-300">
                        Daftar Ekskul
                    </a>
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
            <h2 className="mt-6 font-serif text-[32px] font-semibold text-[#061b46]">
                Data Tidak Ditemukan
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-[14px] font-medium leading-7 text-slate-600">
                Tidak ada data pendaftaran kesiswaan dengan kata kunci <strong>{keyword}</strong>. Pastikan nomor pendaftaran, NISN, atau nomor HP sudah benar.
            </p>
        </div>
    );
}

export default function KesiswaanAnnouncement({ result = null, searched = false, keyword = "" }) {
    const { data, setData, post, processing, errors } = useForm({
        keyword: keyword || "",
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        post("/kesiswaan/pengumuman/cek", {
            preserveScroll: true,
        });
    };

    return (
        <FrontendLayout>
            <section className="relative w-full overflow-hidden bg-[#052b66]">
                <div className="relative min-h-[430px] w-full overflow-hidden lg:min-h-[460px]">
                    <img
                        src="/frontend/images/kesiswaan-hero.jpg"
                        alt="Pengumuman Kesiswaan"
                        className="absolute inset-0 h-full w-full object-cover object-center"
                        onError={(event) => {
                            event.currentTarget.src = "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1900&q=85";
                        }}
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(3,29,74,0.99)_0%,rgba(3,42,101,0.94)_44%,rgba(3,42,101,0.65)_70%,rgba(4,62,145,0.16)_100%)]" />

                    <div className="relative z-10 flex min-h-[430px] flex-col justify-center px-4 py-12 sm:px-6 lg:min-h-[460px] lg:px-10 xl:px-14 2xl:px-16">
                        <div className="flex flex-wrap items-center gap-3 text-[13px] font-medium text-blue-100">
                            <a href="/" className="hover:text-white">Beranda</a>
                            <span>›</span>
                            <a href="/kesiswaan" className="hover:text-white">Kesiswaan</a>
                            <span>›</span>
                            <span className="text-white">Pengumuman</span>
                        </div>

                        <p className="mt-9 text-[13px] font-semibold uppercase tracking-[0.22em] text-[#d5a542]">
                            Pengumuman Kesiswaan
                        </p>
                        <h1 className="mt-5 max-w-4xl font-serif text-[46px] font-semibold leading-tight tracking-[-0.045em] text-white sm:text-[62px] lg:text-[72px]">
                            Cek Hasil Pendaftaran OSIS & Ekstrakurikuler
                        </h1>
                        <p className="mt-6 max-w-[780px] text-[16px] font-medium leading-8 text-blue-50">
                            Masukkan nomor pendaftaran, NISN, atau nomor HP untuk melihat status pendaftaran kesiswaan.
                        </p>
                    </div>
                </div>
            </section>

            <section className="w-full bg-[#f4f8fc] px-4 py-10 sm:px-6 lg:px-10 xl:px-14 2xl:px-16">
                <div className="mx-auto max-w-6xl">
                    <form onSubmit={handleSubmit} className="mb-8 rounded-[30px] border border-slate-200 bg-white p-5 shadow-xl shadow-slate-200/70 sm:p-7">
                        <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-end">
                            <div>
                                <label className="mb-2 block text-[13px] font-semibold text-[#061b46]">
                                    Nomor Pendaftaran / NISN / Nomor HP
                                </label>
                                <input
                                    type="text"
                                    value={data.keyword}
                                    onChange={(event) => setData("keyword", event.target.value)}
                                    placeholder="Contoh: OSIS-20260618-ABCDE"
                                    className={`h-[56px] w-full rounded-[14px] border bg-white px-4 text-[14px] font-medium text-slate-700 outline-none transition placeholder:text-slate-400 focus:ring-4 ${
                                        errors.keyword
                                            ? "border-red-300 focus:border-red-500 focus:ring-red-100"
                                            : "border-slate-200 focus:border-[#0d58cf] focus:ring-blue-100"
                                    }`}
                                />
                                {errors.keyword ? <p className="mt-2 text-[12px] font-semibold text-red-600">{errors.keyword}</p> : null}
                            </div>

                            <button
                                type="submit"
                                disabled={processing}
                                className="inline-flex min-h-[56px] items-center justify-center rounded-[14px] bg-[#052b66] px-8 text-[13px] font-semibold uppercase tracking-[0.08em] text-white transition hover:bg-[#063f8d] disabled:opacity-60"
                            >
                                {processing ? "Mengecek..." : "Cek Pengumuman"}
                            </button>
                        </div>
                    </form>

                    {searched && result ? <StatusResult result={result} /> : null}
                    {searched && !result ? <EmptyResult keyword={keyword} /> : null}
                </div>
            </section>
        </FrontendLayout>
    );
}
