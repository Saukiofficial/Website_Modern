import FrontendLayout from "../../Layouts/FrontendLayout";

const fallbackSetting = {
    academic_year: "2026/2027",
    eyebrow: "Penerimaan Peserta Didik Baru",
    hero_title: "PPDB SMA Negeri 1 Mojokerto",
    hero_description:
        "Bergabung bersama sekolah berprestasi, berkarakter, dan berbudaya. Daftarkan diri untuk menjadi bagian dari generasi unggul.",
    hero_image_url: "/frontend/images/ppdb-hero.jpg",
    section_title: "Tahapan Pendaftaran",
    section_description:
        "Ikuti alur pendaftaran peserta didik baru secara online dengan mudah, cepat, dan aman.",
    requirement_title: "Berkas yang Disiapkan",
    requirement_description:
        "Siapkan dokumen persyaratan sebelum melakukan pendaftaran online.",
    cta_label: "Daftar Sekarang",
    cta_url: "/ppdb/daftar",
    is_open: true,
    closed_message: "Pendaftaran PPDB saat ini belum dibuka.",
};

const fallbackTimelines = [
    {
        title: "Pendaftaran",
        date: "01 Juni - 30 Juni 2026",
        icon: "🗓️",
    },
    {
        title: "Verifikasi Berkas",
        date: "01 Juli - 05 Juli 2026",
        icon: "📋",
    },
    {
        title: "Pengumuman",
        date: "10 Juli 2026",
        icon: "📢",
    },
];

const fallbackSteps = [
    {
        number: "01",
        stepLabel: "Tahap 1",
        title: "Isi Formulir",
        description: "Calon siswa mengisi data pendaftaran secara lengkap.",
        icon: "📝",
        accent: "border-b-[#d5a542]",
        iconBg: "bg-[#f7eef3]",
    },
    {
        number: "02",
        stepLabel: "Tahap 2",
        title: "Unggah Berkas",
        description: "Siapkan dokumen persyaratan sesuai ketentuan sekolah.",
        icon: "📁",
        accent: "border-b-[#d5a542]",
        iconBg: "bg-[#faf5e8]",
    },
    {
        number: "03",
        stepLabel: "Tahap 3",
        title: "Verifikasi",
        description:
            "Panitia melakukan pengecekan data dan kelengkapan berkas.",
        icon: "✅",
        accent: "border-b-[#61c48f]",
        iconBg: "bg-[#eef9f2]",
    },
    {
        number: "04",
        stepLabel: "Tahap 4",
        title: "Pengumuman",
        description: "Hasil seleksi akan diumumkan melalui website sekolah.",
        icon: "📣",
        accent: "border-b-[#ef7aa8]",
        iconBg: "bg-[#fdf0f5]",
    },
];

const fallbackRequirements = [
    {
        title: "Fotokopi Kartu Keluarga",
        description: "Dokumen Kartu Keluarga dalam format PDF/JPG/PNG.",
    },
    {
        title: "Fotokopi Akta Kelahiran",
        description: "Dokumen Akta Kelahiran dalam format PDF/JPG/PNG.",
    },
    {
        title: "Fotokopi Ijazah atau Surat Keterangan Lulus",
        description: "Ijazah/SKL dari sekolah sebelumnya.",
    },
    {
        title: "Pas Foto 3x4",
        description: "Pas foto terbaru format JPG/PNG.",
    },
    {
        title: "Rapor semester terakhir",
        description: "Scan rapor semester terakhir.",
    },
];

function TimelineCard({ setting, timelineItems }) {
    return (
        <div className="rounded-[28px] bg-white p-6 shadow-2xl shadow-slate-300/60 sm:p-8">
            <p className="text-[13px] font-semibold uppercase tracking-[0.22em] text-[#d5a542]">
                Tahun Ajaran
            </p>

            <h2 className="mt-4 font-serif text-[44px] font-semibold leading-none tracking-[-0.04em] text-[#061b46] sm:text-[58px]">
                {setting.academic_year || "2026/2027"}
            </h2>

            <div className="mt-7 space-y-0">
                {timelineItems.map((item, index) => (
                    <div
                        key={item.id || item.title}
                        className={`relative flex gap-5 py-6 ${
                            index !== timelineItems.length - 1
                                ? "border-b border-slate-200"
                                : ""
                        }`}
                    >
                        <div className="relative">
                            <div className="flex h-[64px] w-[64px] shrink-0 items-center justify-center rounded-full bg-[#2f80ed] text-[28px] text-white shadow-lg shadow-blue-200">
                                {item.icon || "🗓️"}
                            </div>

                            {index !== timelineItems.length - 1 ? (
                                <div className="absolute left-1/2 top-[64px] h-[44px] w-[2px] -translate-x-1/2 border-l-2 border-dashed border-[#8bb5f8]" />
                            ) : null}
                        </div>

                        <div className="flex-1 pt-1">
                            <div className="flex items-start justify-between gap-4">
                                <div>
                                    <h3 className="text-[18px] font-semibold text-[#061b46]">
                                        {item.title}
                                    </h3>

                                    <p className="mt-2 text-[14px] font-semibold text-[#061b46]">
                                        {item.date || "-"}
                                    </p>
                                </div>

                                <div className="text-[22px] text-slate-500">
                                    {index === 0
                                        ? "🗂️"
                                        : index === 1
                                        ? "📑"
                                        : "📋"}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

function StepCard({ item }) {
    return (
        <div
            className={`relative overflow-hidden rounded-[18px] border border-slate-200 bg-white p-5 shadow-sm ${
                item.accent || "border-b-[#d5a542]"
            } border-b-[3px]`}
        >
            <div className="absolute right-5 top-3 font-serif text-[62px] font-semibold leading-none tracking-[-0.04em] text-slate-100">
                {item.number || "01"}
            </div>

            <div className="relative z-10">
                <div
                    className={`flex h-[76px] w-[76px] items-center justify-center rounded-[18px] ${
                        item.iconBg || "bg-[#faf5e8]"
                    } text-[38px]`}
                >
                    {item.icon || "📝"}
                </div>

                <p className="mt-5 text-[14px] font-semibold text-[#2f80ed]">
                    {item.stepLabel || "Tahap"}
                </p>

                <h3 className="mt-1 font-serif text-[24px] font-semibold leading-tight tracking-[-0.03em] text-[#061b46]">
                    {item.title}
                </h3>

                <p className="mt-3 max-w-[260px] text-[14px] font-medium leading-7 text-slate-600">
                    {item.description}
                </p>
            </div>
        </div>
    );
}

function RequirementItem({ item }) {
    return (
        <div className="flex items-start gap-4 rounded-[12px] bg-white/8 px-4 py-4">
            <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#f7c46a] text-[16px] text-[#061b46]">
                ✓
            </div>

            <div>
                <p className="text-[15px] font-semibold text-white">
                    {item.title}
                </p>

                {item.description ? (
                    <p className="mt-1 text-[12.5px] font-medium leading-6 text-blue-100">
                        {item.description}
                    </p>
                ) : null}
            </div>
        </div>
    );
}

export default function PPDB({
    setting = null,
    timelines = [],
    steps = [],
    requirements = [],
}) {
    const ppdbSetting = {
        ...fallbackSetting,
        ...(setting || {}),
    };

    const timelineItems =
        Array.isArray(timelines) && timelines.length > 0
            ? timelines
            : fallbackTimelines;

    const stepItems =
        Array.isArray(steps) && steps.length > 0 ? steps : fallbackSteps;

    const requirementItems =
        Array.isArray(requirements) && requirements.length > 0
            ? requirements
            : fallbackRequirements;

    const ctaUrl = ppdbSetting.cta_url || "/ppdb/daftar";
    const ctaLabel = ppdbSetting.cta_label || "Daftar Sekarang";

    return (
        <FrontendLayout>
            <section className="relative w-full overflow-hidden bg-[#052b66]">
                <div className="relative min-h-[620px] w-full overflow-hidden lg:min-h-[650px]">
                    <img
                        src={
                            ppdbSetting.hero_image_url ||
                            "/frontend/images/ppdb-hero.jpg"
                        }
                        alt={ppdbSetting.hero_title}
                        className="absolute inset-0 h-full w-full object-cover object-center"
                        onError={(event) => {
                            event.currentTarget.src =
                                "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1900&q=85";
                        }}
                    />

                    <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(3,29,74,0.98)_0%,rgba(3,42,101,0.93)_38%,rgba(3,42,101,0.72)_58%,rgba(4,62,145,0.18)_100%)]" />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(3,24,58,0.05)_0%,rgba(3,24,58,0.02)_45%,rgba(3,24,58,0.22)_100%)]" />

                    <div className="relative z-10 grid min-h-[620px] items-center gap-10 px-4 py-14 sm:px-6 lg:min-h-[650px] lg:grid-cols-[0.95fr_0.85fr] lg:px-10 xl:px-14 2xl:px-16">
                        <div className="max-w-[760px]">
                            <div className="flex flex-wrap items-center gap-3 text-[13px] font-medium text-blue-100">
                                <a href="/" className="hover:text-white">
                                    Beranda
                                </a>
                                <span>›</span>
                                <span className="text-white">PPDB</span>
                            </div>

                            <p className="mt-10 text-[13px] font-semibold uppercase tracking-[0.22em] text-[#d5a542]">
                                {ppdbSetting.eyebrow}
                            </p>

                            <h1 className="mt-5 font-serif text-[52px] font-semibold leading-[1.04] tracking-[-0.05em] text-white sm:text-[68px] lg:text-[82px]">
                                {ppdbSetting.hero_title}
                            </h1>

                            <p className="mt-8 max-w-[720px] text-[18px] font-medium leading-8 text-blue-50">
                                {ppdbSetting.hero_description}
                            </p>

                            {!ppdbSetting.is_open ? (
                                <div className="mt-8 rounded-[18px] border border-yellow-300/30 bg-yellow-400/15 p-5 text-yellow-50">
                                    <div className="flex items-start gap-4">
                                        <div className="text-[28px]">⚠️</div>

                                        <div>
                                            <h3 className="text-[17px] font-semibold text-white">
                                                PPDB Sedang Ditutup
                                            </h3>

                                            <p className="mt-2 text-[14px] font-medium leading-7 text-yellow-50">
                                                {ppdbSetting.closed_message ||
                                                    "Pendaftaran PPDB saat ini belum dibuka."}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ) : null}

                            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
                                {ppdbSetting.is_open ? (
                                    <a
                                        href={ctaUrl}
                                        className="inline-flex min-h-[58px] items-center justify-center gap-4 rounded-[6px] bg-[#f7c46a] px-8 text-[13px] font-semibold uppercase tracking-[0.08em] text-[#061b46] shadow-lg shadow-blue-950/20 transition hover:bg-[#ffd277]"
                                    >
                                        {ctaLabel}
                                        <span className="text-[20px] leading-none">
                                            ›
                                        </span>
                                    </a>
                                ) : (
                                    <button
                                        type="button"
                                        disabled
                                        className="inline-flex min-h-[58px] cursor-not-allowed items-center justify-center gap-4 rounded-[6px] bg-slate-300 px-8 text-[13px] font-semibold uppercase tracking-[0.08em] text-slate-600"
                                    >
                                        Pendaftaran Ditutup
                                    </button>
                                )}

                                <a
                                    href="#alur-ppdb"
                                    className="inline-flex min-h-[58px] items-center justify-center rounded-[6px] border border-white/40 px-8 text-[13px] font-semibold uppercase tracking-[0.08em] text-white transition hover:bg-white/10"
                                >
                                    Lihat Alur
                                </a>
                            </div>
                        </div>

                        <div className="lg:pl-4">
                            <TimelineCard
                                setting={ppdbSetting}
                                timelineItems={timelineItems}
                            />
                        </div>
                    </div>
                </div>
            </section>

            <section
                id="alur-ppdb"
                className="w-full bg-[#f4f8fc] px-4 py-10 sm:px-6 lg:px-10 lg:py-12 xl:px-14 2xl:px-16"
            >
                <div className="grid gap-8 xl:grid-cols-[1fr_0.58fr] xl:items-start">
                    <div className="rounded-[26px] bg-white p-6 shadow-xl shadow-slate-200/70 sm:p-8">
                        <p className="text-[13px] font-semibold uppercase tracking-[0.22em] text-[#d5a542]">
                            Alur PPDB
                        </p>

                        <h2 className="mt-4 font-serif text-[44px] font-semibold leading-tight tracking-[-0.04em] text-[#061b46] sm:text-[56px]">
                            {ppdbSetting.section_title ||
                                "Tahapan Pendaftaran"}
                        </h2>

                        {ppdbSetting.section_description ? (
                            <p className="mt-4 max-w-3xl text-[15px] font-medium leading-8 text-slate-600">
                                {ppdbSetting.section_description}
                            </p>
                        ) : null}

                        <div className="mt-8 grid gap-5 md:grid-cols-2">
                            {stepItems.map((item) => (
                                <StepCard
                                    key={item.id || item.number || item.title}
                                    item={item}
                                />
                            ))}
                        </div>

                        <div className="mt-7 flex items-center gap-4 rounded-[18px] bg-[#f6f9fe] px-5 py-5">
                            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#2f80ed] text-[28px] text-white shadow-lg shadow-blue-100">
                                ?
                            </div>

                            <div className="min-w-0 flex-1">
                                <h3 className="text-[18px] font-semibold text-[#061b46]">
                                    Butuh bantuan?
                                </h3>

                                <p className="mt-1 text-[14px] font-medium leading-7 text-slate-600">
                                    Hubungi panitia PPDB melalui halaman{" "}
                                    <a
                                        href="/#kontak"
                                        className="font-semibold text-[#2f80ed]"
                                    >
                                        Hubungi Kami
                                    </a>{" "}
                                    atau datang langsung ke sekolah.
                                </p>
                            </div>

                            <div className="text-[28px] text-[#061b46]">›</div>
                        </div>
                    </div>

                    <aside className="overflow-hidden rounded-[26px] bg-[linear-gradient(180deg,#052b66_0%,#031c4a_100%)] p-6 text-white shadow-2xl shadow-blue-300/30 sm:p-8">
                        <p className="text-[13px] font-semibold uppercase tracking-[0.22em] text-[#f7c46a]">
                            Persyaratan
                        </p>

                        <h2 className="mt-4 font-serif text-[42px] font-semibold leading-tight tracking-[-0.04em] text-white sm:text-[52px]">
                            {ppdbSetting.requirement_title ||
                                "Berkas yang Disiapkan"}
                        </h2>

                        {ppdbSetting.requirement_description ? (
                            <p className="mt-4 text-[14px] font-medium leading-7 text-blue-100">
                                {ppdbSetting.requirement_description}
                            </p>
                        ) : null}

                        <div className="mt-8 space-y-4">
                            {requirementItems.map((item) => (
                                <RequirementItem
                                    key={item.id || item.title}
                                    item={item}
                                />
                            ))}
                        </div>

                        {ppdbSetting.is_open ? (
                            <a
                                id="mulai-pendaftaran"
                                href={ctaUrl}
                                className="mt-8 inline-flex min-h-[62px] w-full items-center justify-center gap-4 rounded-[8px] bg-[#f7c46a] px-8 text-[15px] font-semibold uppercase tracking-[0.04em] text-[#061b46] shadow-lg shadow-blue-950/20 transition hover:bg-[#ffd277]"
                            >
                                {ctaLabel}
                                <span className="text-[22px] leading-none">
                                    ›
                                </span>
                            </a>
                        ) : (
                            <button
                                type="button"
                                disabled
                                className="mt-8 inline-flex min-h-[62px] w-full cursor-not-allowed items-center justify-center rounded-[8px] bg-slate-300 px-8 text-[15px] font-semibold uppercase tracking-[0.04em] text-slate-600"
                            >
                                Pendaftaran Ditutup
                            </button>
                        )}

                        <div className="mt-6 flex items-center justify-center gap-3 text-center text-[14px] font-medium text-blue-100">
                            <span className="text-[#f7c46a]">🔒</span>
                            <span>Data Anda aman dan terlindungi</span>
                        </div>
                    </aside>
                </div>
            </section>
        </FrontendLayout>
    );
}