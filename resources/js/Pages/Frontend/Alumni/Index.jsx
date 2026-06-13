import { Head, router, usePage } from "@inertiajs/react";
import FrontendLayout from "../../../Layouts/FrontendLayout";

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

function SummaryCard({ label, value, icon }) {
    return (
        <div className="rounded-[24px] border border-slate-100 bg-white p-6 shadow-[0_20px_50px_rgba(15,42,92,0.08)]">
            <div className="flex items-center gap-5">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-[#062f6f] text-[28px] text-white shadow-lg shadow-blue-200">
                    {icon}
                </div>

                <div>
                    <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                        {label}
                    </p>

                    <h3 className="mt-2 text-[38px] font-semibold leading-none tracking-[-0.06em] text-[#062f6f]">
                        {value}
                    </h3>

                    <p className="mt-1 text-[12px] font-medium text-slate-500">
                        Orang
                    </p>

                    <span className="mt-2 block h-[3px] w-5 rounded-full bg-[#d59a25]" />
                </div>
            </div>
        </div>
    );
}

function ActivityIcon({ activity }) {
    const lower = String(activity || "").toLowerCase();

    if (lower.includes("kuliah")) return "🎓";
    if (lower.includes("bekerja")) return "💼";
    if (lower.includes("wirausaha")) return "🚀";

    return "👤";
}

function AlumniCard({ item, schoolInitials }) {
    const initial = item.name?.charAt(0)?.toUpperCase() || "A";

    return (
        <article className="group overflow-hidden rounded-[26px] border border-slate-200 bg-white shadow-[0_22px_55px_rgba(15,42,92,0.10)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_28px_70px_rgba(15,42,92,0.14)]">
            <div className="relative h-[210px] overflow-hidden bg-[linear-gradient(135deg,#052b66_0%,#0a3f93_100%)]">
                <div className="absolute inset-0 opacity-60">
                    <div className="absolute -right-16 top-6 flex h-44 w-44 items-center justify-center rounded-full border-[8px] border-white/10 text-[72px] font-bold text-white/30">
                        {schoolInitials}
                    </div>

                    <div className="absolute bottom-0 left-0 h-32 w-full bg-[radial-gradient(circle_at_bottom_left,rgba(213,154,37,0.22),transparent_45%)]" />
                </div>

                {item.photo_url ? (
                    <img
                        src={item.photo_url}
                        alt={item.name}
                        className="absolute bottom-0 left-10 h-[205px] w-[180px] object-cover object-top transition duration-500 group-hover:scale-105"
                    />
                ) : (
                    <div className="absolute bottom-8 left-10 flex h-32 w-32 items-center justify-center rounded-full bg-white/10 text-[70px] font-semibold text-white ring-1 ring-white/20">
                        {initial}
                    </div>
                )}

                <div className="absolute left-5 top-5 rounded-full bg-[#f7c46a] px-4 py-2 text-[12px] font-semibold uppercase tracking-[0.06em] text-[#062f6f] shadow-lg">
                    Alumni {item.graduation_year || "-"}
                </div>

                <div className="absolute bottom-[-24px] right-6 flex h-16 w-16 items-center justify-center rounded-full border-[5px] border-white bg-[#062f6f] text-[25px] text-white shadow-xl">
                    <ActivityIcon activity={item.current_activity} />
                </div>

                <div className="absolute right-20 top-16 text-[74px] font-semibold text-white/95">
                    {initial}
                </div>
            </div>

            <div className="p-6 pt-8">
                <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-[#d59a25]">
                    {item.current_activity || "Alumni"}
                </p>

                <h3 className="mt-2 text-[25px] font-semibold leading-tight tracking-[-0.05em] text-[#062f6f]">
                    {item.name}
                </h3>

                <p className="mt-1 text-[14px] font-medium text-slate-500">
                    Kelas terakhir: {item.class_name || "-"}
                </p>

                <div className="mt-5 rounded-[20px] bg-[#f6f8fc] p-5">
                    <div className="flex gap-3">
                        <div className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-[#062f6f] shadow-sm">
                            🏢
                        </div>

                        <div>
                            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">
                                Instansi / Kampus / Perusahaan
                            </p>

                            <p className="mt-1 text-[14px] font-semibold leading-6 text-[#062f6f]">
                                {item.institution || "-"}
                            </p>
                        </div>
                    </div>

                    <div className="mt-4 flex gap-3">
                        <div className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-[#062f6f] shadow-sm">
                            👤
                        </div>

                        <div>
                            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">
                                Posisi / Jurusan
                            </p>

                            <p className="mt-1 text-[14px] font-semibold leading-6 text-[#062f6f]">
                                {item.job_position || "-"}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </article>
    );
}

function Pagination({ links = [] }) {
    if (!links.length) return null;

    return (
        <div className="mt-10 flex flex-wrap justify-center gap-2">
            {links.map((link, index) => (
                <button
                    key={index}
                    type="button"
                    disabled={!link.url}
                    onClick={() => {
                        if (link.url) {
                            router.visit(link.url, {
                                preserveScroll: true,
                                preserveState: true,
                            });
                        }
                    }}
                    className={`min-h-[42px] rounded-xl px-4 text-[12px] font-semibold transition ${
                        link.active
                            ? "bg-[#062f6f] text-white shadow-lg shadow-blue-200"
                            : link.url
                            ? "bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-blue-50 hover:text-blue-700"
                            : "cursor-not-allowed bg-slate-100 text-slate-300"
                    }`}
                    dangerouslySetInnerHTML={{ __html: link.label }}
                />
            ))}
        </div>
    );
}

export default function Index({
    alumni = {},
    filters = {},
    summary = {},
    graduationYears = [],
}) {
    const { props } = usePage();

    const schoolSetting = props.schoolSetting || {};
    const schoolName = schoolSetting.school_name || "Website Sekolah";
    const schoolTagline =
        schoolSetting.tagline || "Sekolah Berprestasi, Berkarakter, dan Berdaya Saing Global";
    const schoolLogo = schoolSetting.logo_url || null;
    const schoolInitials = getSchoolInitials(schoolName);

    const rows = alumni?.data || [];

    const updateFilter = (key, value) => {
        router.get(
            "/alumni",
            {
                ...filters,
                [key]: value,
            },
            {
                preserveScroll: true,
                preserveState: true,
                replace: true,
            }
        );
    };

    const submitFilter = () => {
        const search = document.getElementById("alumni-search")?.value || "";

        router.get(
            "/alumni",
            {
                ...filters,
                search,
            },
            {
                preserveScroll: true,
                preserveState: true,
                replace: true,
            }
        );
    };

    return (
        <FrontendLayout>
            <Head title="Alumni Sekolah" />

            <section className="relative overflow-hidden bg-[#052b66]">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage:
                            "url('https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1900&q=85')",
                    }}
                />

                <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(4,35,84,0.98)_0%,rgba(5,43,102,0.94)_42%,rgba(5,43,102,0.72)_72%,rgba(5,43,102,0.78)_100%)]" />

                <div className="absolute -right-[220px] bottom-[-260px] hidden h-[620px] w-[620px] rounded-full border-[18px] border-[#d59a25]/70 lg:block" />
                <div className="absolute -right-[60px] top-[110px] hidden h-[280px] w-[280px] rounded-full bg-[#d59a25]/10 blur-3xl lg:block" />

                <div className="relative z-10 mx-auto grid min-h-[420px] max-w-[1280px] items-center gap-10 px-5 py-16 sm:px-8 lg:grid-cols-[1fr_420px] lg:px-10">
                    <div>
                        <p className="text-[13px] font-semibold uppercase tracking-[0.22em] text-[#f7c46a]">
                            Jejak Alumni
                        </p>

                        <h1 className="mt-5 text-[48px] font-semibold leading-tight tracking-[-0.06em] text-white sm:text-[64px] lg:text-[72px]">
                            Alumni Sekolah
                        </h1>

                        <p className="mt-6 max-w-2xl text-[17px] font-medium leading-9 text-blue-100">
                            Mengenal jejak lulusan sekolah yang terus
                            berkembang, berkarya, dan membawa nama baik
                            almamater di berbagai bidang.
                        </p>

                        <div className="mt-8 flex flex-wrap gap-4">
                            <a
                                href="#data-alumni"
                                className="inline-flex min-h-[56px] items-center justify-center gap-3 rounded-[14px] bg-[#d59a25] px-8 text-[13px] font-semibold uppercase tracking-[0.08em] text-white shadow-lg shadow-black/20 transition hover:bg-[#f7c46a]"
                            >
                                Lihat Alumni
                                <span>→</span>
                            </a>

                            <a
                                href="/ppdb"
                                className="inline-flex min-h-[56px] items-center justify-center rounded-[14px] border border-white/35 bg-white/5 px-8 text-[13px] font-semibold uppercase tracking-[0.08em] text-white transition hover:bg-white/15"
                            >
                                Daftar PPDB
                            </a>
                        </div>
                    </div>

                    <div className="hidden lg:flex">
                        <div className="relative flex h-[300px] w-full items-center justify-center">
                            <div className="absolute inset-0 rounded-full bg-[#d59a25]/10 blur-3xl" />

                            <div className="relative flex h-[250px] w-[250px] items-center justify-center rounded-full border-[6px] border-[#d59a25] bg-[#052b66]/80 text-center shadow-2xl backdrop-blur">
                                {schoolLogo ? (
                                    <img
                                        src={schoolLogo}
                                        alt={schoolName}
                                        className="h-28 w-28 rounded-full object-cover"
                                    />
                                ) : (
                                    <div className="text-[64px] font-semibold text-white">
                                        {schoolInitials}
                                    </div>
                                )}

                                <div className="absolute -bottom-14 left-1/2 w-[320px] -translate-x-1/2 text-center">
                                    <p className="text-[24px] font-semibold uppercase tracking-[0.14em] text-[#f7c46a]">
                                        Proud Alumni
                                    </p>

                                    <p className="mt-1 text-[24px] font-semibold uppercase leading-tight text-white">
                                        {schoolName}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="bg-[#f6f9fd] px-5 py-8 sm:px-8 lg:px-10">
                <div className="mx-auto grid max-w-[1120px] gap-5 md:grid-cols-2 xl:grid-cols-4">
                    <SummaryCard
                        label="Total Alumni"
                        value={summary.total || 0}
                        icon="👥"
                    />

                    <SummaryCard
                        label="Bekerja"
                        value={summary.working || 0}
                        icon="💼"
                    />

                    <SummaryCard
                        label="Kuliah"
                        value={summary.college || 0}
                        icon="🎓"
                    />

                    <SummaryCard
                        label="Wirausaha"
                        value={summary.entrepreneur || 0}
                        icon="🚀"
                    />
                </div>
            </section>

            <section
                id="data-alumni"
                className="relative overflow-hidden bg-[#f6f9fd] px-5 pb-20 pt-4 sm:px-8 lg:px-10"
            >
                <div className="pointer-events-none absolute right-20 top-24 hidden opacity-20 xl:block">
                    <svg
                        width="360"
                        height="170"
                        viewBox="0 0 360 170"
                        fill="none"
                    >
                        <path
                            d="M20 145C70 85 110 110 150 60C190 10 250 30 330 12"
                            stroke="#b8c6dc"
                            strokeWidth="2"
                            strokeDasharray="6 8"
                        />
                        <rect
                            x="115"
                            y="75"
                            width="140"
                            height="70"
                            rx="4"
                            stroke="#b8c6dc"
                            strokeWidth="2"
                        />
                        <rect
                            x="135"
                            y="95"
                            width="18"
                            height="50"
                            stroke="#b8c6dc"
                            strokeWidth="2"
                        />
                        <rect
                            x="170"
                            y="95"
                            width="18"
                            height="50"
                            stroke="#b8c6dc"
                            strokeWidth="2"
                        />
                        <rect
                            x="205"
                            y="95"
                            width="18"
                            height="50"
                            stroke="#b8c6dc"
                            strokeWidth="2"
                        />
                    </svg>
                </div>

                <div className="mx-auto max-w-[1120px]">
                    <div className="mb-8">
                        <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[#d59a25]">
                            Direktori Alumni
                        </p>

                        <h2 className="mt-3 text-[38px] font-semibold tracking-[-0.05em] text-[#062f6f] sm:text-[48px]">
                            Data Alumni Aktif
                        </h2>

                        <p className="mt-4 max-w-2xl text-[15px] font-medium leading-8 text-slate-600">
                            Gunakan filter untuk mencari alumni berdasarkan
                            nama, tahun lulus, aktivitas, instansi, atau
                            jurusan.
                        </p>
                    </div>

                    <div className="mb-8 rounded-[24px] border border-slate-100 bg-white p-5 shadow-[0_18px_50px_rgba(15,42,92,0.08)]">
                        <div className="grid gap-4 lg:grid-cols-[1fr_180px_190px_110px]">
                            <div className="relative">
                                <span className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-slate-400">
                                    🔍
                                </span>

                                <input
                                    id="alumni-search"
                                    type="text"
                                    defaultValue={filters.search || ""}
                                    onKeyDown={(event) => {
                                        if (event.key === "Enter") {
                                            updateFilter(
                                                "search",
                                                event.target.value
                                            );
                                        }
                                    }}
                                    placeholder="Cari nama, tahun lulus, aktivitas, instansi..."
                                    className="h-[56px] w-full rounded-[16px] border border-slate-200 bg-white pl-12 pr-4 text-[14px] font-medium outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
                                />
                            </div>

                            <select
                                value={filters.graduation_year || "all"}
                                onChange={(event) =>
                                    updateFilter(
                                        "graduation_year",
                                        event.target.value
                                    )
                                }
                                className="h-[56px] rounded-[16px] border border-slate-200 bg-white px-4 text-[14px] font-semibold text-[#062f6f] outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
                            >
                                <option value="all">Semua Tahun</option>
                                {graduationYears.map((year) => (
                                    <option key={year} value={year}>
                                        {year}
                                    </option>
                                ))}
                            </select>

                            <select
                                value={filters.activity || "all"}
                                onChange={(event) =>
                                    updateFilter("activity", event.target.value)
                                }
                                className="h-[56px] rounded-[16px] border border-slate-200 bg-white px-4 text-[14px] font-semibold text-[#062f6f] outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
                            >
                                <option value="all">Semua Aktivitas</option>
                                <option value="Kuliah">Kuliah</option>
                                <option value="Bekerja">Bekerja</option>
                                <option value="Wirausaha">Wirausaha</option>
                                <option value="Lainnya">Lainnya</option>
                            </select>

                            <button
                                type="button"
                                onClick={submitFilter}
                                className="inline-flex h-[56px] items-center justify-center gap-2 rounded-[16px] bg-[#062f6f] px-5 text-[13px] font-semibold uppercase tracking-[0.08em] text-white shadow-lg shadow-blue-200 transition hover:bg-[#0a3f93]"
                            >
                                <span>⚗</span>
                                Filter
                            </button>
                        </div>
                    </div>

                    {rows.length > 0 ? (
                        <>
                            <div className="grid gap-6 lg:grid-cols-2">
                                {rows.map((item) => (
                                    <AlumniCard
                                        key={item.id}
                                        item={item}
                                        schoolInitials={schoolInitials}
                                    />
                                ))}
                            </div>

                            <Pagination links={alumni.links || []} />
                        </>
                    ) : (
                        <div className="rounded-[30px] bg-white p-12 text-center shadow-[0_22px_55px_rgba(15,42,92,0.08)]">
                            <div className="text-[62px]">🎓</div>

                            <h3 className="mt-4 text-[28px] font-semibold tracking-[-0.05em] text-[#062f6f]">
                                Belum Ada Data Alumni
                            </h3>

                            <p className="mt-3 text-[14px] font-medium leading-7 text-slate-500">
                                Data alumni akan tampil setelah admin
                                menambahkan atau mengimport data alumni aktif.
                            </p>
                        </div>
                    )}
                </div>
            </section>

            <footer className="bg-[#052b66] px-5 py-10 text-white sm:px-8 lg:px-10">
                <div className="mx-auto grid max-w-[1120px] gap-10 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
                    <div>
                        <div className="flex items-center gap-4">
                            <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-full border border-[#d59a25] bg-white/10 font-bold">
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
                                <p className="text-[18px] font-semibold uppercase tracking-[0.05em]">
                                    {schoolName}
                                </p>

                                <p className="mt-1 text-[13px] font-medium leading-6 text-blue-100">
                                    {schoolTagline}
                                </p>
                            </div>
                        </div>

                        <div className="mt-6 flex gap-3">
                            {["f", "◎", "▶", "♪"].map((item) => (
                                <span
                                    key={item}
                                    className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-[14px] font-semibold text-white"
                                >
                                    {item}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div>
                        <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-white">
                            Tautan Cepat
                        </p>

                        <div className="mt-5 grid gap-3 text-[14px] font-medium text-blue-100">
                            <a href="/" className="hover:text-[#f7c46a]">
                                Beranda
                            </a>
                            <a href="/profil" className="hover:text-[#f7c46a]">
                                Profil Sekolah
                            </a>
                            <a href="/akademik" className="hover:text-[#f7c46a]">
                                Akademik
                            </a>
                            <a href="/kesiswaan" className="hover:text-[#f7c46a]">
                                Kesiswaan
                            </a>
                            <a href="/alumni" className="hover:text-[#f7c46a]">
                                Alumni
                            </a>
                        </div>
                    </div>

                    <div>
                        <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-white">
                            Informasi
                        </p>

                        <div className="mt-5 grid gap-3 text-[14px] font-medium text-blue-100">
                            <a href="/informasi" className="hover:text-[#f7c46a]">
                                Berita
                            </a>
                            <a href="/informasi" className="hover:text-[#f7c46a]">
                                Pengumuman
                            </a>
                            <a href="/galeri" className="hover:text-[#f7c46a]">
                                Galeri
                            </a>
                            <a href="/ppdb" className="hover:text-[#f7c46a]">
                                PPDB
                            </a>
                            <a href="/#kontak" className="hover:text-[#f7c46a]">
                                Kontak
                            </a>
                        </div>
                    </div>

                    <div>
                        <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-white">
                            Kontak Kami
                        </p>

                        <div className="mt-5 grid gap-4 text-[14px] font-medium leading-6 text-blue-100">
                            <p>📍 {schoolSetting.address || "-"}</p>
                            <p>☎ {schoolSetting.phone || "-"}</p>
                            <p>✉ {schoolSetting.email || "-"}</p>
                        </div>
                    </div>
                </div>

                <div className="mx-auto mt-10 flex max-w-[1120px] flex-col gap-3 border-t border-white/10 pt-6 text-[13px] font-medium text-blue-100 sm:flex-row sm:items-center sm:justify-between">
                    <p>
                        © {new Date().getFullYear()} {schoolName}. All rights
                        reserved.
                    </p>

                    <p>
                        Created with <span className="text-red-400">♥</span> for
                        Education
                    </p>
                </div>
            </footer>
        </FrontendLayout>
    );
}