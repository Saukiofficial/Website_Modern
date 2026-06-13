import { Head, useForm, usePage } from "@inertiajs/react";
import { useMemo } from "react";

function getSchoolInitials(name = "") {
    const words = String(name || "Sekolah")
        .trim()
        .split(/\s+/)
        .filter(Boolean);

    if (words.length === 1) {
        return words[0].slice(0, 2).toUpperCase();
    }

    return words
        .slice(0, 2)
        .map((word) => word.charAt(0))
        .join("")
        .toUpperCase();
}

function FlashMessage() {
    const { flash } = usePage().props;

    if (!flash?.success && !flash?.error) return null;

    return (
        <div
            className={`mb-5 rounded-2xl px-4 py-3 text-sm font-semibold shadow-lg ${
                flash.success
                    ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100"
                    : "bg-red-50 text-red-700 ring-1 ring-red-100"
            }`}
        >
            {flash.success || flash.error}
        </div>
    );
}

function StatusBadge({ text, active = false, gold = false }) {
    let classes =
        "inline-flex items-center rounded-full border px-4 py-2 text-[12px] font-semibold uppercase tracking-[0.08em]";

    if (gold) {
        classes += " border-[#e2b34c] bg-[#f1c96a] text-[#0b2f6b]";
    } else if (active) {
        classes += " border-white/20 bg-white/10 text-white";
    } else {
        classes += " border-white/30 bg-transparent text-white";
    }

    return <span className={classes}>{text}</span>;
}

function CandidateCard({ candidate, index, schoolInitials }) {
    return (
        <article className="overflow-hidden rounded-[28px] border border-[#e5eaf3] bg-white shadow-[0_18px_45px_rgba(20,40,90,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(20,40,90,0.12)]">
            <div className="relative h-[220px] overflow-hidden bg-[linear-gradient(135deg,#0a377b_0%,#0d4da8_100%)]">
                {candidate.photo_url ? (
                    <img
                        src={candidate.photo_url}
                        alt={candidate.name}
                        className="h-full w-full object-cover"
                    />
                ) : (
                    <div className="flex h-full w-full items-center justify-center text-[72px] font-semibold text-white">
                        {candidate.name?.charAt(0)?.toUpperCase() || "K"}
                    </div>
                )}

                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.12),transparent_35%)]" />

                <div className="absolute left-4 top-4 inline-flex rounded-full bg-[#f1c96a] px-4 py-2 text-[12px] font-bold text-[#0b2f6b] shadow-lg">
                    No.{" "}
                    {candidate.candidate_number ||
                        String(index + 1).padStart(2, "0")}
                </div>

                <div className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-[#f1c96a] text-[#0b2f6b] shadow-md">
                    ★
                </div>

                <div className="absolute bottom-4 right-4 opacity-15">
                    <div className="flex h-24 w-24 items-center justify-center rounded-full border-4 border-white text-[26px] font-bold text-white">
                        {schoolInitials}
                    </div>
                </div>
            </div>

            <div className="p-6">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#d7a63e]">
                    Candidate for President
                </p>

                <h3 className="mt-3 text-[22px] font-semibold leading-tight tracking-[-0.04em] text-[#0b2f6b]">
                    {candidate.name}
                </h3>

                <p className="mt-2 text-[14px] font-medium text-slate-500">
                    {candidate.class_label || "-"}
                </p>

                {candidate.slogan ? (
                    <div className="mt-4 rounded-2xl bg-[#f7f9fc] px-4 py-3">
                        <p className="text-[13px] font-medium italic leading-6 text-slate-500">
                            “{candidate.slogan}”
                        </p>
                    </div>
                ) : null}

                {candidate.vision ? (
                    <div className="mt-5">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#0b2f6b]">
                            Vision
                        </p>

                        <p className="mt-2 text-[14px] font-medium leading-7 text-slate-600">
                            {candidate.vision}
                        </p>
                    </div>
                ) : null}
            </div>
        </article>
    );
}

function ResultRow({ result, maxVotes }) {
    const progress =
        maxVotes > 0 ? Math.max((result.votes_count / maxVotes) * 100, 3) : 3;

    return (
        <div className="rounded-[20px] border border-[#e5eaf3] bg-white p-4">
            <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-[#eef4ff] text-[18px] font-semibold text-[#0b2f6b]">
                    {result.photo_url ? (
                        <img
                            src={result.photo_url}
                            alt={result.name}
                            className="h-full w-full object-cover"
                        />
                    ) : (
                        result.candidate_number || "K"
                    )}
                </div>

                <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-4">
                        <div className="min-w-0">
                            <p className="truncate text-[15px] font-semibold text-[#0b2f6b]">
                                No. {result.candidate_number || "-"} -{" "}
                                {result.name}
                            </p>

                            <p className="mt-1 text-[12px] font-medium text-slate-500">
                                {result.class_label || "-"}
                            </p>
                        </div>

                        <div className="text-right">
                            <p className="text-[26px] font-semibold leading-none text-[#0b2f6b]">
                                {result.votes_count || 0}
                            </p>

                            <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-400">
                                Suara
                            </p>
                        </div>
                    </div>

                    <div className="mt-4 h-[7px] overflow-hidden rounded-full bg-[#e8eef8]">
                        <div
                            className="h-full rounded-full bg-[#2359d1]"
                            style={{ width: `${progress}%` }}
                        />
                    </div>

                    <p className="mt-2 text-[12px] font-medium text-slate-500">
                        {result.percentage || 0}% dari total suara
                    </p>
                </div>
            </div>
        </div>
    );
}

function InfoFeature({ icon, title, subtitle }) {
    return (
        <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#d6a33d] text-[18px] text-[#f1c96a]">
                {icon}
            </div>

            <div>
                <p className="text-[14px] font-semibold text-white">{title}</p>
                <p className="text-[13px] text-blue-100">{subtitle}</p>
            </div>
        </div>
    );
}

export default function Index({ period = null, candidates = [], results = [] }) {
    const { props } = usePage();

    const schoolSetting = props.schoolSetting || {};
    const schoolName = schoolSetting.school_name || "Website Sekolah";
    const schoolTagline =
        schoolSetting.tagline || "Excellence • Character • Leadership";
    const schoolLogo = schoolSetting.logo_url || null;
    const schoolInitials = getSchoolInitials(schoolName);

    const { data, setData, post, processing, errors } = useForm({
        nisn: "",
        token: "",
    });

    const maxVotes = useMemo(() => {
        if (!results.length) return 0;

        return Math.max(...results.map((item) => item.votes_count || 0));
    }, [results]);

    const submit = (event) => {
        event.preventDefault();

        post("/pemilihan-osis/login", {
            preserveScroll: true,
        });
    };

    const currentDate = new Date();

    return (
        <>
            <Head title="Pemilihan Ketua OSIS" />

            <main className="min-h-screen bg-[#f5f7fb] text-[#0b2f6b]">
                <section className="relative overflow-hidden border-b border-[#dbe3f0] bg-[#0a377b]">
                    <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{
                            backgroundImage:
                                "url('https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1800&q=80')",
                        }}
                    />

                    <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,38,96,0.96)_0%,rgba(8,53,125,0.92)_40%,rgba(8,53,125,0.78)_65%,rgba(8,53,125,0.72)_100%)]" />

                    <div className="absolute left-[35%] top-12 hidden h-56 w-96 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.10),transparent_65%)] blur-2xl lg:block" />

                    <div className="relative z-10 mx-auto max-w-[1280px] px-5 py-10 sm:px-8 lg:px-10 lg:py-14">
                        <div className="grid gap-10 lg:grid-cols-[1.2fr_430px] lg:items-start">
                            <div className="pt-2">
                                <div className="flex items-start justify-between gap-4">
                                    <div className="flex min-w-0 items-center gap-4">
                                        <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-[22px] border-2 border-[#d7a63e] bg-[rgba(255,255,255,0.06)] text-[22px] font-bold text-white shadow-lg backdrop-blur">
                                            {schoolLogo ? (
                                                <img
                                                    src={schoolLogo}
                                                    alt={schoolName}
                                                    className="h-full w-full object-cover"
                                                />
                                            ) : (
                                                schoolInitials
                                            )}
                                        </div>

                                        <div className="min-w-0">
                                            <h2 className="line-clamp-2 text-[24px] font-semibold uppercase leading-tight tracking-[0.06em] text-white sm:text-[30px] lg:text-[34px]">
                                                {schoolName}
                                            </h2>

                                            <p className="mt-1 text-[15px] font-medium uppercase tracking-[0.14em] text-blue-100 sm:text-[17px]">
                                                School Election System
                                            </p>

                                            <p className="mt-1 line-clamp-1 text-[14px] text-blue-100 sm:text-[15px]">
                                                {schoolTagline}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="hidden lg:flex">
                                        <button
                                            type="button"
                                            className="inline-flex items-center gap-3 rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-sm font-semibold text-white backdrop-blur"
                                        >
                                            <span className="text-base">🌐</span>
                                            ID
                                            <span>▾</span>
                                        </button>
                                    </div>
                                </div>

                                <div className="mt-16">
                                    <p className="text-[13px] font-semibold uppercase tracking-[0.2em] text-[#f1c96a]">
                                        Student Leadership
                                    </p>

                                    <h1 className="mt-4 text-[44px] font-semibold leading-[1.05] tracking-[-0.06em] text-white sm:text-[58px] lg:text-[72px]">
                                        Pemilihan Ketua OSIS
                                    </h1>

                                    <p className="mt-2 text-[24px] font-medium text-blue-100">
                                        Student Council President Election
                                    </p>

                                    <p className="mt-8 max-w-3xl text-[18px] font-medium leading-8 text-blue-100">
                                        Gunakan NISN dan token voting yang
                                        diberikan oleh panitia pemilihan OSIS
                                        untuk memilih kandidat terbaik.
                                    </p>

                                    <div className="mt-8 flex flex-wrap gap-3">
                                        <StatusBadge
                                            text="E-Voting OSIS"
                                            active
                                        />

                                        <StatusBadge
                                            text={
                                                period?.academic_year ||
                                                "Tahun Ajaran"
                                            }
                                            gold
                                        />

                                        <StatusBadge
                                            text={
                                                period?.is_running
                                                    ? "Sedang Berjalan"
                                                    : "Belum / Selesai"
                                            }
                                        />
                                    </div>

                                    <div className="mt-12 grid gap-5 sm:grid-cols-3">
                                        <InfoFeature
                                            icon="🛡"
                                            title="Secure"
                                            subtitle="Voting System"
                                        />

                                        <InfoFeature
                                            icon="🌐"
                                            title="One Student"
                                            subtitle="One Vote"
                                        />

                                        <InfoFeature
                                            icon="🎓"
                                            title="Leadership for"
                                            subtitle="Our Future"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="rounded-[32px] border border-white/20 bg-white p-6 shadow-[0_25px_70px_rgba(3,18,50,0.25)] lg:mt-10">
                                <FlashMessage />

                                <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[#d7a63e]">
                                    Login Voting
                                </p>

                                <h2 className="mt-3 text-[36px] font-semibold leading-tight tracking-[-0.05em] text-[#0b2f6b] sm:text-[40px]">
                                    Masuk Sebagai Pemilih
                                </h2>

                                <p className="mt-4 text-[15px] font-medium leading-7 text-slate-500">
                                    Masukkan NISN dan token yang diberikan oleh
                                    panitia pemilihan OSIS.
                                </p>

                                <form
                                    onSubmit={submit}
                                    className="mt-7 space-y-5"
                                >
                                    <div>
                                        <label className="mb-2 block text-[13px] font-semibold text-[#0b2f6b]">
                                            NISN
                                        </label>

                                        <input
                                            type="text"
                                            value={data.nisn}
                                            onChange={(event) =>
                                                setData(
                                                    "nisn",
                                                    event.target.value
                                                )
                                            }
                                            placeholder="Masukkan NISN"
                                            className="h-[58px] w-full rounded-2xl border border-[#d9e2ef] bg-white px-5 text-[15px] font-medium text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-[#2a67de] focus:ring-4 focus:ring-blue-100"
                                        />

                                        {errors.nisn ? (
                                            <p className="mt-2 text-[12px] font-semibold text-red-600">
                                                {errors.nisn}
                                            </p>
                                        ) : null}
                                    </div>

                                    <div>
                                        <label className="mb-2 block text-[13px] font-semibold text-[#0b2f6b]">
                                            Token Voting
                                        </label>

                                        <input
                                            type="text"
                                            value={data.token}
                                            onChange={(event) =>
                                                setData(
                                                    "token",
                                                    event.target.value.toUpperCase()
                                                )
                                            }
                                            placeholder="Contoh: ABCD1234"
                                            className="h-[58px] w-full rounded-2xl border border-[#d9e2ef] bg-white px-5 font-mono text-[15px] font-semibold uppercase text-slate-700 outline-none transition placeholder:font-medium placeholder:text-slate-400 focus:border-[#2a67de] focus:ring-4 focus:ring-blue-100"
                                        />

                                        {errors.token ? (
                                            <p className="mt-2 text-[12px] font-semibold text-red-600">
                                                {errors.token}
                                            </p>
                                        ) : null}
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={
                                            processing || !period?.is_running
                                        }
                                        className="inline-flex h-[60px] w-full items-center justify-center rounded-2xl bg-[#0a3e96] px-6 text-[15px] font-semibold uppercase tracking-[0.08em] text-white transition hover:bg-[#104cb4] disabled:cursor-not-allowed disabled:opacity-60"
                                    >
                                        {processing
                                            ? "Memproses..."
                                            : "Masuk Voting"}
                                    </button>
                                </form>

                                {period && !period.is_running ? (
                                    <div className="mt-5 flex items-start gap-3 rounded-2xl border border-[#f0dfaa] bg-[#fff7df] px-4 py-3 text-[13px] font-medium text-[#a57a1d]">
                                        <span className="mt-[1px]">🔒</span>
                                        <span>
                                            Pemilihan belum dimulai atau sudah
                                            selesai.
                                        </span>
                                    </div>
                                ) : null}

                                {!period ? (
                                    <div className="mt-5 flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-[13px] font-medium text-red-600">
                                        <span className="mt-[1px]">⚠</span>
                                        <span>
                                            Belum ada periode pemilihan yang
                                            aktif.
                                        </span>
                                    </div>
                                ) : null}
                            </div>
                        </div>
                    </div>
                </section>

                <section className="px-5 py-10 sm:px-8 lg:px-10 lg:py-14">
                    <div className="mx-auto max-w-[1280px]">
                        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                            <div>
                                <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[#d7a63e]">
                                    Candidates
                                </p>

                                <h2 className="mt-2 text-[42px] font-semibold tracking-[-0.05em] text-[#0b2f6b]">
                                    Calon Ketua OSIS
                                </h2>

                                <p className="mt-2 text-[20px] font-medium text-slate-500">
                                    Student Council President Candidates
                                </p>
                            </div>

                            <p className="text-[14px] font-medium text-slate-500">
                                Last updated:{" "}
                                <span className="font-semibold text-slate-600">
                                    {currentDate.toLocaleDateString("id-ID", {
                                        day: "2-digit",
                                        month: "short",
                                        year: "numeric",
                                    })}{" "}
                                    {currentDate.toLocaleTimeString("id-ID", {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                    })}
                                </span>
                            </p>
                        </div>

                        {candidates.length > 0 ? (
                            <div className="relative">
                                <div className="pointer-events-none absolute right-0 top-0 hidden h-[320px] w-[320px] items-center justify-center opacity-5 lg:flex">
                                    <div className="flex h-72 w-72 items-center justify-center rounded-full border-[10px] border-[#0b2f6b] text-[70px] font-bold text-[#0b2f6b]">
                                        {schoolInitials}
                                    </div>
                                </div>

                                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                                    {candidates.map((candidate, index) => (
                                        <CandidateCard
                                            key={candidate.id}
                                            candidate={candidate}
                                            index={index}
                                            schoolInitials={schoolInitials}
                                        />
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <div className="rounded-[28px] border border-[#e5eaf3] bg-white p-12 text-center shadow-[0_18px_45px_rgba(20,40,90,0.08)]">
                                <div className="text-[64px]">🎓</div>

                                <h3 className="mt-4 text-[28px] font-semibold text-[#0b2f6b]">
                                    Belum Ada Kandidat
                                </h3>

                                <p className="mt-3 text-[15px] font-medium leading-7 text-slate-500">
                                    Kandidat akan muncul setelah admin
                                    menambahkan kandidat pada periode pemilihan.
                                </p>
                            </div>
                        )}
                    </div>
                </section>

                {period?.show_result ? (
                    <section className="px-5 pb-14 sm:px-8 lg:px-10 lg:pb-16">
                        <div className="mx-auto max-w-[1280px] rounded-[32px] border border-[#e5eaf3] bg-white p-6 shadow-[0_18px_45px_rgba(20,40,90,0.08)] sm:p-8">
                            <div className="grid gap-8 lg:grid-cols-[1fr_320px] lg:items-start">
                                <div>
                                    <div className="mb-6">
                                        <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[#d7a63e]">
                                            Live Results
                                        </p>

                                        <h2 className="mt-2 text-[42px] font-semibold tracking-[-0.05em] text-[#0b2f6b]">
                                            Hasil Suara Sementara
                                        </h2>

                                        <p className="mt-2 text-[18px] font-medium text-slate-500">
                                            Live Voting Results
                                        </p>
                                    </div>

                                    {results.length > 0 ? (
                                        <div className="space-y-4">
                                            {results.map((result) => (
                                                <ResultRow
                                                    key={result.id}
                                                    result={result}
                                                    maxVotes={maxVotes}
                                                />
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="rounded-[24px] bg-[#f7f9fc] p-8 text-center">
                                            <div className="text-[52px]">
                                                📊
                                            </div>

                                            <h3 className="mt-3 text-[24px] font-semibold text-[#0b2f6b]">
                                                Belum Ada Suara
                                            </h3>

                                            <p className="mt-2 text-[14px] font-medium leading-7 text-slate-500">
                                                Hasil akan muncul setelah voting
                                                berjalan.
                                            </p>
                                        </div>
                                    )}
                                </div>

                                <div className="rounded-[24px] bg-[#f8fafc] p-6">
                                    <div className="flex h-24 w-24 items-center justify-center rounded-[24px] bg-[#eef4ff] text-[42px] text-[#4376e2]">
                                        ◔
                                    </div>

                                    <h3 className="mt-6 text-[24px] font-semibold tracking-[-0.04em] text-[#0b2f6b]">
                                        Transparan & Terpercaya
                                    </h3>

                                    <p className="mt-3 text-[14px] font-medium leading-7 text-slate-500">
                                        Setiap suara Anda sangat berarti untuk
                                        membentuk kepemimpinan yang lebih baik
                                        di sekolah.
                                    </p>

                                    <div className="mt-6 rounded-2xl border border-[#f0dfaa] bg-[#fff7df] px-4 py-3 text-[13px] font-medium text-[#a57a1d]">
                                        🔒 Voting diamankan dan terenkripsi
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                ) : null}

                <footer className="bg-[#0a377b] px-5 py-6 text-white sm:px-8 lg:px-10">
                    <div className="mx-auto flex max-w-[1280px] flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                        <div className="flex items-center gap-4">
                            <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-[#d7a63e] bg-white/10 font-bold">
                                {schoolLogo ? (
                                    <img
                                        src={schoolLogo}
                                        alt={schoolName}
                                        className="h-full w-full object-cover"
                                    />
                                ) : (
                                    schoolInitials
                                )}
                            </div>

                            <div>
                                <p className="text-[15px] font-semibold uppercase tracking-[0.08em]">
                                    {schoolName}
                                </p>

                                <p className="text-[12px] uppercase tracking-[0.12em] text-blue-100">
                                    Election System
                                </p>
                            </div>
                        </div>

                        <p className="text-[13px] font-medium text-blue-100">
                            © {new Date().getFullYear()} {schoolName}. All
                            rights reserved.
                        </p>

                        <p className="text-[13px] font-medium text-blue-100">
                            {schoolTagline}{" "}
                            <span className="text-[#f1c96a]">—</span>
                        </p>
                    </div>
                </footer>
            </main>
        </>
    );
}