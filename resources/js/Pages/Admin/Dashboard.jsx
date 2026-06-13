import AdminLayout from "./Layouts/AdminLayout";

function n(value, fallback = 0) {
    if (value === null || value === undefined || value === "") {
        return fallback;
    }

    return Number(value) || fallback;
}

function percent(value, total) {
    if (!Number(total)) return 0;

    return Math.min(Math.round((Number(value) / Number(total)) * 100), 100);
}

function SectionHeader({ eyebrow, title, description, actionLabel, actionHref }) {
    return (
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#c7922b]">
                    {eyebrow}
                </p>

                <h2 className="mt-2 text-[24px] font-semibold tracking-[-0.04em] text-[#061b46] sm:text-[28px]">
                    {title}
                </h2>

                {description ? (
                    <p className="mt-3 max-w-2xl text-[13px] font-medium leading-7 text-slate-500">
                        {description}
                    </p>
                ) : null}
            </div>

            {actionLabel && actionHref ? (
                <a
                    href={actionHref}
                    className="inline-flex min-h-[44px] items-center justify-center rounded-[14px] border border-slate-200 bg-white px-5 text-[12px] font-semibold uppercase tracking-[0.08em] text-[#061b46] transition hover:bg-slate-50"
                >
                    {actionLabel}
                </a>
            ) : null}
        </div>
    );
}

function MetricCard({ title, value, subtitle, icon, href, tone = "blue" }) {
    const tones = {
        blue: "from-[#06265f] to-[#0b4aa2]",
        gold: "from-[#8a5a00] to-[#d59a25]",
        green: "from-[#065f46] to-[#0f9f6e]",
        purple: "from-[#3b1d72] to-[#6d43c5]",
    };

    return (
        <a
            href={href}
            className="group relative overflow-hidden rounded-[28px] border border-slate-200 bg-white p-5 shadow-[0_20px_60px_rgba(15,42,92,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_28px_80px_rgba(15,42,92,0.12)]"
        >
            <div
                className={`absolute right-0 top-0 h-28 w-28 translate-x-8 -translate-y-8 rounded-full bg-gradient-to-br ${
                    tones[tone] || tones.blue
                } opacity-10 transition group-hover:scale-110`}
            />

            <div className="relative z-10 flex items-start justify-between gap-4">
                <div className="min-w-0">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                        {title}
                    </p>

                    <h3 className="mt-4 text-[42px] font-semibold leading-none tracking-[-0.06em] text-[#061b46]">
                        {value}
                    </h3>

                    <p className="mt-3 text-[13px] font-medium leading-6 text-slate-500">
                        {subtitle}
                    </p>
                </div>

                <div
                    className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-[18px] bg-gradient-to-br ${
                        tones[tone] || tones.blue
                    } text-[26px] text-white shadow-lg shadow-slate-200`}
                >
                    {icon}
                </div>
            </div>

            <div className="relative z-10 mt-5 flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.08em] text-[#c7922b]">
                Buka Modul
                <span className="transition group-hover:translate-x-1">→</span>
            </div>
        </a>
    );
}

function DonutChart({ value, total, label, centerLabel }) {
    const radius = 46;
    const circumference = 2 * Math.PI * radius;
    const progress = percent(value, total);
    const offset = circumference - (progress / 100) * circumference;

    return (
        <div className="flex items-center gap-5 rounded-[24px] border border-slate-200 bg-white p-5 shadow-[0_18px_50px_rgba(15,42,92,0.06)]">
            <div className="relative h-[120px] w-[120px] shrink-0">
                <svg className="h-full w-full -rotate-90" viewBox="0 0 120 120">
                    <circle
                        cx="60"
                        cy="60"
                        r={radius}
                        fill="none"
                        stroke="#e9eef7"
                        strokeWidth="12"
                    />
                    <circle
                        cx="60"
                        cy="60"
                        r={radius}
                        fill="none"
                        stroke="#0b3b85"
                        strokeWidth="12"
                        strokeLinecap="round"
                        strokeDasharray={circumference}
                        strokeDashoffset={offset}
                    />
                </svg>

                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-[28px] font-semibold leading-none tracking-[-0.05em] text-[#061b46]">
                        {progress}%
                    </span>
                    <span className="mt-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-400">
                        {centerLabel}
                    </span>
                </div>
            </div>

            <div>
                <p className="text-[13px] font-semibold text-[#061b46]">
                    {label}
                </p>

                <p className="mt-2 text-[13px] font-medium leading-6 text-slate-500">
                    {value} dari {total} data sudah tercatat dalam sistem.
                </p>
            </div>
        </div>
    );
}

function BarChart({ data = [], title, subtitle }) {
    const max = Math.max(...data.map((item) => n(item.value)), 1);

    return (
        <div className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-[0_20px_60px_rgba(15,42,92,0.08)]">
            <SectionHeader eyebrow="Grafik" title={title} description={subtitle} />

            <div className="space-y-5">
                {data.map((item) => {
                    const width = Math.max((n(item.value) / max) * 100, item.value > 0 ? 8 : 0);

                    return (
                        <div key={item.label}>
                            <div className="mb-2 flex items-center justify-between gap-3">
                                <p className="text-[13px] font-semibold text-[#061b46]">
                                    {item.label}
                                </p>

                                <p className="text-[13px] font-semibold text-slate-500">
                                    {item.value}
                                </p>
                            </div>

                            <div className="h-3 overflow-hidden rounded-full bg-slate-100">
                                <div
                                    className="h-full rounded-full bg-[#0b3b85]"
                                    style={{ width: `${width}%` }}
                                />
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

function LineChart({ data = [], title, subtitle }) {
    const max = Math.max(...data.map((item) => n(item.value)), 1);
    const width = 520;
    const height = 190;
    const padding = 28;

    const points = data.map((item, index) => {
        const x =
            data.length === 1
                ? width / 2
                : padding + (index / (data.length - 1)) * (width - padding * 2);

        const y =
            height -
            padding -
            (n(item.value) / max) * (height - padding * 2);

        return {
            ...item,
            x,
            y,
        };
    });

    const path = points
        .map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`)
        .join(" ");

    return (
        <div className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-[0_20px_60px_rgba(15,42,92,0.08)]">
            <SectionHeader eyebrow="Trend" title={title} description={subtitle} />

            <div className="overflow-hidden rounded-[24px] bg-[#f8fafc] p-4">
                <svg viewBox={`0 0 ${width} ${height}`} className="h-[220px] w-full">
                    {[0, 1, 2, 3].map((line) => {
                        const y = padding + line * ((height - padding * 2) / 3);

                        return (
                            <line
                                key={line}
                                x1={padding}
                                x2={width - padding}
                                y1={y}
                                y2={y}
                                stroke="#e2e8f0"
                                strokeWidth="1"
                            />
                        );
                    })}

                    <path
                        d={path}
                        fill="none"
                        stroke="#0b3b85"
                        strokeWidth="5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />

                    {points.map((point) => (
                        <g key={point.label}>
                            <circle
                                cx={point.x}
                                cy={point.y}
                                r="7"
                                fill="#d59a25"
                                stroke="white"
                                strokeWidth="3"
                            />
                            <text
                                x={point.x}
                                y={height - 4}
                                textAnchor="middle"
                                fontSize="11"
                                fill="#64748b"
                                fontWeight="600"
                            >
                                {point.label}
                            </text>
                        </g>
                    ))}
                </svg>
            </div>
        </div>
    );
}

function MiniStat({ label, value, tone = "blue" }) {
    const tones = {
        blue: "bg-blue-50 text-blue-700 ring-blue-100",
        green: "bg-emerald-50 text-emerald-700 ring-emerald-100",
        gold: "bg-yellow-50 text-yellow-700 ring-yellow-100",
        red: "bg-red-50 text-red-700 ring-red-100",
        purple: "bg-purple-50 text-purple-700 ring-purple-100",
    };

    return (
        <div className="rounded-[22px] border border-slate-200 bg-white p-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">
                {label}
            </p>

            <div className="mt-3 flex items-center justify-between gap-3">
                <p className="text-[32px] font-semibold leading-none tracking-[-0.05em] text-[#061b46]">
                    {value}
                </p>

                <span
                    className={`rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.08em] ring-1 ${
                        tones[tone] || tones.blue
                    }`}
                >
                    Data
                </span>
            </div>
        </div>
    );
}

function QuickAction({ title, description, href, icon, badge }) {
    return (
        <a
            href={href}
            className="group rounded-[24px] border border-slate-200 bg-white p-5 shadow-[0_16px_45px_rgba(15,42,92,0.06)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_70px_rgba(15,42,92,0.11)]"
        >
            <div className="flex items-start gap-4">
                <div className="flex h-13 w-13 h-[54px] w-[54px] shrink-0 items-center justify-center rounded-[18px] bg-[#061b46] text-[24px] text-white">
                    {icon}
                </div>

                <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-3">
                        <h3 className="text-[16px] font-semibold leading-tight text-[#061b46]">
                            {title}
                        </h3>

                        {badge ? (
                            <span className="shrink-0 rounded-full bg-[#fff7df] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.08em] text-[#a56b00] ring-1 ring-yellow-100">
                                {badge}
                            </span>
                        ) : null}
                    </div>

                    <p className="mt-2 text-[13px] font-medium leading-6 text-slate-500">
                        {description}
                    </p>

                    <p className="mt-4 text-[12px] font-semibold uppercase tracking-[0.08em] text-[#c7922b]">
                        Buka →
                    </p>
                </div>
            </div>
        </a>
    );
}

export default function Dashboard({ summary = {} }) {
    const students = summary.students || {};
    const alumni = summary.alumni || {};
    const ppdb = summary.ppdb || {};
    const osis = summary.osis || {};
    const charts = summary.charts || {};
    const secondary = summary.secondary || {};

    const totalStudents = n(students.total);
    const totalAlumni = n(alumni.total);
    const totalPpdb = n(ppdb.total);
    const totalVoters = n(osis.voters_total);

    const ppdbStatusTotal =
        n(ppdb.new) + n(ppdb.processed) + n(ppdb.accepted) + n(ppdb.rejected);

    return (
        <AdminLayout title="Dashboard">
            <section className="relative overflow-hidden rounded-[36px] bg-[#061b46] p-7 text-white shadow-[0_28px_90px_rgba(15,42,92,0.25)] sm:p-9">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_10%,rgba(247,196,106,0.16),transparent_28%),radial-gradient(circle_at_85%_10%,rgba(96,165,250,0.20),transparent_30%)]" />
                <div className="absolute -right-20 -top-24 h-72 w-72 rounded-full border-[36px] border-white/5" />

                <div className="relative z-10 grid gap-8 xl:grid-cols-[1fr_430px] xl:items-center">
                    <div>
                        <p className="text-[12px] font-semibold uppercase tracking-[0.24em] text-[#f7c46a]">
                            Executive School Dashboard
                        </p>

                        <h1 className="mt-5 max-w-4xl text-[38px] font-semibold leading-tight tracking-[-0.06em] text-white sm:text-[52px]">
                            Pantau data penting sekolah secara profesional
                        </h1>

                        <p className="mt-5 max-w-3xl text-[15px] font-medium leading-8 text-blue-100">
                            Dashboard ini berfokus pada data operasional utama:
                            PPDB, pemilihan Ketua OSIS, data siswa, dan data alumni.
                        </p>

                        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                            <a
                                href="/admin/ppdb-registrations"
                                className="inline-flex min-h-[52px] items-center justify-center rounded-[16px] bg-[#d59a25] px-6 text-[13px] font-semibold uppercase tracking-[0.08em] text-white shadow-lg shadow-black/20 transition hover:bg-[#f7c46a]"
                            >
                                Monitor PPDB
                            </a>

                            <a
                                href="/admin/osis-election"
                                className="inline-flex min-h-[52px] items-center justify-center rounded-[16px] border border-white/15 bg-white/10 px-6 text-[13px] font-semibold uppercase tracking-[0.08em] text-white transition hover:bg-white/20"
                            >
                                E-Voting OSIS
                            </a>
                        </div>
                    </div>

                    <div className="rounded-[30px] border border-white/10 bg-white/10 p-6 backdrop-blur">
                        <p className="text-[12px] font-semibold uppercase tracking-[0.20em] text-[#f7c46a]">
                            School Pulse
                        </p>

                        <div className="mt-5 grid grid-cols-2 gap-3">
                            <div className="rounded-[20px] bg-white/10 p-4">
                                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-blue-100">
                                    Siswa Aktif
                                </p>
                                <p className="mt-2 text-[30px] font-semibold tracking-[-0.05em]">
                                    {n(students.active)}
                                </p>
                            </div>

                            <div className="rounded-[20px] bg-white/10 p-4">
                                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-blue-100">
                                    PPDB Hari Ini
                                </p>
                                <p className="mt-2 text-[30px] font-semibold tracking-[-0.05em]">
                                    {n(ppdb.today)}
                                </p>
                            </div>

                            <div className="rounded-[20px] bg-white/10 p-4">
                                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-blue-100">
                                    Voting OSIS
                                </p>
                                <p className="mt-2 text-[30px] font-semibold tracking-[-0.05em]">
                                    {n(osis.participation_rate)}%
                                </p>
                            </div>

                            <div className="rounded-[20px] bg-white/10 p-4">
                                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-blue-100">
                                    Alumni
                                </p>
                                <p className="mt-2 text-[30px] font-semibold tracking-[-0.05em]">
                                    {totalAlumni}
                                </p>
                            </div>
                        </div>

                        <p className="mt-5 text-[13px] font-medium leading-6 text-blue-100">
                            Periode OSIS aktif:{" "}
                            <span className="font-semibold text-white">
                                {osis.active_period_title || "Belum ada periode aktif"}
                            </span>
                        </p>
                    </div>
                </div>
            </section>

            <section className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
                <MetricCard
                    title="Data Siswa"
                    value={totalStudents}
                    subtitle="Basis data siswa untuk administrasi dan pemilih OSIS."
                    icon="🎒"
                    href="/admin/students"
                    tone="blue"
                />

                <MetricCard
                    title="Data Alumni"
                    value={totalAlumni}
                    subtitle="Jejak lulusan, aktivitas alumni, dan publikasi frontend."
                    icon="🎓"
                    href="/admin/alumni"
                    tone="gold"
                />

                <MetricCard
                    title="Pendaftar PPDB"
                    value={totalPpdb}
                    subtitle="Total calon siswa yang masuk melalui sistem PPDB."
                    icon="📝"
                    href="/admin/ppdb-registrations"
                    tone="green"
                />

                <MetricCard
                    title="Pemilih OSIS"
                    value={totalVoters}
                    subtitle="Jumlah siswa yang sudah masuk daftar pemilih e-voting."
                    icon="🗳️"
                    href="/admin/osis-election"
                    tone="purple"
                />
            </section>

            <section className="mt-8 grid gap-6 xl:grid-cols-[1.25fr_0.75fr]">
                <LineChart
                    title="Trend Pendaftar PPDB"
                    subtitle="Grafik pendaftar baru dalam 7 hari terakhir."
                    data={charts.ppdb_trend || []}
                />

                <div className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-[0_20px_60px_rgba(15,42,92,0.08)]">
                    <SectionHeader
                        eyebrow="OSIS"
                        title="Partisipasi Voting"
                        description="Pantau progres suara yang sudah masuk pada periode aktif."
                    />

                    <DonutChart
                        value={n(osis.votes_total)}
                        total={Math.max(n(osis.voters_total), 1)}
                        label="Suara Masuk"
                        centerLabel="Voting"
                    />

                    <div className="mt-5 grid gap-4 sm:grid-cols-2">
                        <MiniStat label="Kandidat" value={n(osis.candidates_total)} tone="gold" />
                        <MiniStat label="Sudah Memilih" value={n(osis.votes_total)} tone="green" />
                        <MiniStat label="Belum Memilih" value={n(osis.not_voted)} tone="red" />
                        <MiniStat label="Periode Aktif" value={n(osis.active_periods)} tone="purple" />
                    </div>
                </div>
            </section>

            <section className="mt-8 grid gap-6 xl:grid-cols-3">
                <BarChart
                    title="Sebaran Siswa"
                    subtitle="Jumlah siswa berdasarkan tingkat kelas."
                    data={charts.student_classes || []}
                />

                <BarChart
                    title="Aktivitas Alumni"
                    subtitle="Kategori aktivitas alumni yang tampil di frontend."
                    data={charts.alumni_activities || []}
                />

                <BarChart
                    title="Status PPDB"
                    subtitle="Distribusi status pendaftaran PPDB saat ini."
                    data={charts.ppdb_statuses || []}
                />
            </section>

            <section className="mt-8 grid gap-6 xl:grid-cols-2">
                <div className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-[0_20px_60px_rgba(15,42,92,0.08)]">
                    <SectionHeader
                        eyebrow="PPDB"
                        title="Ringkasan Seleksi"
                        description="Status pendaftar yang perlu dipantau oleh panitia."
                        actionLabel="Kelola PPDB"
                        actionHref="/admin/ppdb-registrations"
                    />

                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        <MiniStat label="Total Pendaftar" value={n(ppdb.total)} tone="blue" />
                        <MiniStat label="Masuk Hari Ini" value={n(ppdb.today)} tone="gold" />
                        <MiniStat label="Baru" value={n(ppdb.new)} tone="purple" />
                        <MiniStat label="Diproses" value={n(ppdb.processed)} tone="blue" />
                        <MiniStat label="Diterima" value={n(ppdb.accepted)} tone="green" />
                        <MiniStat label="Ditolak" value={n(ppdb.rejected)} tone="red" />
                    </div>

                    <div className="mt-5 rounded-[22px] bg-slate-50 p-5">
                        <p className="text-[13px] font-semibold text-[#061b46]">
                            Completion review
                        </p>
                        <p className="mt-2 text-[13px] font-medium leading-6 text-slate-500">
                            {percent(n(ppdb.accepted) + n(ppdb.rejected), Math.max(ppdbStatusTotal, 1))}%
                            pendaftar sudah mendapatkan keputusan akhir.
                        </p>
                    </div>
                </div>

                <div className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-[0_20px_60px_rgba(15,42,92,0.08)]">
                    <SectionHeader
                        eyebrow="Student Database"
                        title="Kondisi Data Siswa"
                        description="Siswa aktif menjadi sumber utama untuk kandidat dan pemilih OSIS."
                        actionLabel="Kelola Siswa"
                        actionHref="/admin/students"
                    />

                    <div className="grid gap-4 sm:grid-cols-2">
                        <MiniStat label="Total Siswa" value={n(students.total)} tone="blue" />
                        <MiniStat label="Aktif" value={n(students.active)} tone="green" />
                        <MiniStat label="Nonaktif" value={n(students.inactive)} tone="red" />
                        <MiniStat
                            label="Kelengkapan Aktif"
                            value={`${percent(n(students.active), Math.max(n(students.total), 1))}%`}
                            tone="purple"
                        />
                    </div>

                    <div className="mt-5 rounded-[22px] bg-[#061b46] p-5 text-white">
                        <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[#f7c46a]">
                            Data priority
                        </p>
                        <p className="mt-3 text-[14px] font-medium leading-7 text-blue-100">
                            Pastikan NISN dan nomor induk siswa unik agar import CSV,
                            token voting, dan data kandidat OSIS berjalan stabil.
                        </p>
                    </div>
                </div>
            </section>

            <section className="mt-8">
                <SectionHeader
                    eyebrow="Quick Access"
                    title="Akses Cepat Modul Utama"
                    description="Modul yang paling sering digunakan oleh admin sekolah."
                    actionLabel="Preview Website"
                    actionHref="/"
                />

                <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                    <QuickAction
                        title="Data Siswa"
                        description="Import, export, edit siswa, dan kelola token voting."
                        href="/admin/students"
                        icon="🎒"
                        badge="Core"
                    />

                    <QuickAction
                        title="Data Alumni"
                        description="Kelola alumni, aktivitas, dan tampilan frontend alumni."
                        href="/admin/alumni"
                        icon="🎓"
                        badge="Public"
                    />

                    <QuickAction
                        title="PPDB"
                        description="Pantau pendaftar, cetak data, dan pengumuman hasil PPDB."
                        href="/admin/ppdb-registrations"
                        icon="📝"
                        badge="Important"
                    />

                    <QuickAction
                        title="Pemilihan OSIS"
                        description="Kelola periode, kandidat, pemilih, token, dan hasil voting."
                        href="/admin/osis-election"
                        icon="🗳️"
                        badge="Live"
                    />
                </div>
            </section>

            <section className="mt-8 grid gap-6 xl:grid-cols-[1fr_380px]">
                <div className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-[0_20px_60px_rgba(15,42,92,0.08)]">
                    <SectionHeader
                        eyebrow="Supporting Data"
                        title="Data Pendukung Website"
                        description="Tetap dipantau, tetapi bukan fokus utama dashboard."
                    />

                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        <MiniStat label="Setting" value={n(secondary.school_settings)} tone="blue" />
                        <MiniStat label="Navbar" value={n(secondary.menus)} tone="gold" />
                        <MiniStat label="Beranda" value={n(secondary.home_sections)} tone="green" />
                        <MiniStat label="Statistik" value={n(secondary.statistics)} tone="purple" />
                        <MiniStat label="Informasi" value={n(secondary.posts)} tone="blue" />
                        <MiniStat label="Galeri" value={n(secondary.galleries)} tone="gold" />
                    </div>
                </div>

                <div className="rounded-[30px] bg-[#061b46] p-6 text-white shadow-[0_24px_80px_rgba(15,42,92,0.24)]">
                    <p className="text-[12px] font-semibold uppercase tracking-[0.22em] text-[#f7c46a]">
                        Admin Priority
                    </p>

                    <h2 className="mt-3 text-[28px] font-semibold tracking-[-0.05em]">
                        Checklist Harian
                    </h2>

                    <div className="mt-6 space-y-4">
                        {[
                            "Cek pendaftar PPDB baru dan segera verifikasi.",
                            "Pastikan data siswa aktif sudah lengkap dan unik.",
                            "Monitor partisipasi voting OSIS jika periode berjalan.",
                            "Update data alumni agar halaman frontend tetap hidup.",
                            "Gunakan informasi dan galeri sebagai pendukung publikasi.",
                        ].map((item) => (
                            <div key={item} className="flex items-start gap-3">
                                <span className="mt-1 text-[#f7c46a]">✓</span>
                                <p className="text-[13px] font-medium leading-6 text-blue-100">
                                    {item}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </AdminLayout>
    );
}