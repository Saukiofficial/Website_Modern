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
        <div className="rounded-[20px] border border-slate-100 bg-white p-5 shadow-[0_16px_42px_rgba(15,42,92,0.08)] sm:rounded-[24px] sm:p-6">
            <div className="flex items-center gap-4 sm:gap-5">
                <div className="flex h-13 w-13 shrink-0 items-center justify-center rounded-full bg-[#062f6f] text-[24px] text-white shadow-lg shadow-blue-200 sm:h-16 sm:w-16 sm:text-[28px]">
                    {icon}
                </div>

                <div className="min-w-0">
                    <p className="break-words text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400 sm:text-[12px] sm:tracking-[0.18em]">
                        {label}
                    </p>

                    <h3 className="mt-2 text-[30px] font-semibold leading-none tracking-[-0.06em] text-[#062f6f] sm:text-[38px]">
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
        <article className="group overflow-hidden rounded-[20px] border border-slate-200 bg-white shadow-[0_16px_42px_rgba(15,42,92,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_22px_55px_rgba(15,42,92,0.12)] sm:rounded-[22px]">
            <div className="relative h-[128px] overflow-hidden bg-[linear-gradient(135deg,#052b66_0%,#0a3f93_100%)] sm:h-[145px] lg:h-[150px]">
                <div className="absolute inset-0 opacity-60">
                    <div className="absolute -right-12 top-3 flex h-32 w-32 items-center justify-center rounded-full border-[7px] border-white/10 text-[50px] font-bold text-white/30 sm:h-36 sm:w-36 sm:text-[58px]">
                        {schoolInitials}
                    </div>

                    <div className="absolute bottom-0 left-0 h-24 w-full bg-[radial-gradient(circle_at_bottom_left,rgba(213,154,37,0.22),transparent_45%)]" />
                </div>

                {item.photo_url ? (
                    <img
                        src={item.photo_url}
                        alt={item.name}
                        className="absolute bottom-0 left-5 h-[126px] w-[96px] object-cover object-top transition duration-500 group-hover:scale-105 sm:left-6 sm:h-[142px] sm:w-[112px] lg:h-[148px] lg:w-[118px]"
                    />
                ) : (
                    <div className="absolute bottom-5 left-5 flex h-20 w-20 items-center justify-center rounded-full bg-white/10 text-[42px] font-semibold text-white ring-1 ring-white/20 sm:left-6 sm:h-24 sm:w-24 sm:text-[52px]">
                        {initial}
                    </div>
                )}

                <div className="absolute left-3 top-3 rounded-full bg-[#f7c46a] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.06em] text-[#062f6f] shadow-lg sm:left-4 sm:top-4 sm:text-[11px]">
                    Alumni {item.graduation_year || "-"}
                </div>

                <div className="absolute bottom-[-19px] right-4 flex h-12 w-12 items-center justify-center rounded-full border-[4px] border-white bg-[#062f6f] text-[20px] text-white shadow-xl sm:right-5 sm:h-14 sm:w-14 sm:text-[22px]">
                    <ActivityIcon activity={item.current_activity} />
                </div>

                <div className="absolute right-16 top-12 text-[46px] font-semibold text-white/90 sm:right-20 sm:top-14 sm:text-[58px]">
                    {initial}
                </div>
            </div>

            <div className="p-4 pt-7 sm:p-5 sm:pt-8">
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#d59a25] sm:text-[12px] sm:tracking-[0.16em]">
                    {item.current_activity || "Alumni"}
                </p>

                <h3 className="mt-2 line-clamp-2 text-[20px] font-semibold leading-tight tracking-[-0.04em] text-[#062f6f] sm:text-[22px]">
                    {item.name}
                </h3>

                <p className="mt-1 text-[13px] font-medium text-slate-500 sm:text-[14px]">
                    Kelas terakhir: {item.class_name || "-"}
                </p>

                <div className="mt-4 rounded-[16px] bg-[#f6f8fc] p-4 sm:rounded-[18px]">
                    <div className="flex gap-3">
                        <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-white text-[#062f6f] shadow-sm">
                            🏢
                        </div>

                        <div className="min-w-0">
                            <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-400 sm:text-[11px]">
                                Instansi / Kampus / Perusahaan
                            </p>

                            <p className="mt-1 line-clamp-2 text-[13px] font-semibold leading-6 text-[#062f6f] sm:text-[14px]">
                                {item.institution || "-"}
                            </p>
                        </div>
                    </div>

                    <div className="mt-3 flex gap-3">
                        <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-white text-[#062f6f] shadow-sm">
                            👤
                        </div>

                        <div className="min-w-0">
                            <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-400 sm:text-[11px]">
                                Posisi / Jurusan
                            </p>

                            <p className="mt-1 line-clamp-2 text-[13px] font-semibold leading-6 text-[#062f6f] sm:text-[14px]">
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

                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,35,84,0.98)_0%,rgba(5,43,102,0.94)_48%,rgba(5,43,102,0.86)_100%)] lg:bg-[linear-gradient(90deg,rgba(4,35,84,0.98)_0%,rgba(5,43,102,0.94)_42%,rgba(5,43,102,0.72)_72%,rgba(5,43,102,0.78)_100%)]" />

                <div className="absolute -right-[220px] bottom-[-260px] hidden h-[620px] w-[620px] rounded-full border-[18px] border-[#d59a25]/70 lg:block" />
                <div className="absolute -right-[60px] top-[110px] hidden h-[280px] w-[280px] rounded-full bg-[#d59a25]/10 blur-3xl lg:block" />

                <div className="relative z-10 mx-auto grid min-h-[360px] max-w-[1280px] items-center gap-8 px-5 py-12 sm:min-h-[390px] sm:px-8 sm:py-14 lg:min-h-[420px] lg:grid-cols-[1fr_360px] lg:px-10">
                    <div className="min-w-0">
                        <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[#f7c46a] sm:text-[13px] sm:tracking-[0.22em]">
                            Jejak Alumni
                        </p>

                        <h1 className="mt-4 break-words text-[38px] font-semibold leading-tight tracking-[-0.06em] text-white sm:mt-5 sm:text-[58px] lg:text-[68px]">
                            Alumni Sekolah
                        </h1>

                        <p className="mt-5 max-w-2xl text-[15px] font-medium leading-8 text-blue-100 sm:mt-6 sm:text-[17px] sm:leading-9">
                            Mengenal jejak lulusan sekolah yang terus
                            berkembang, berkarya, dan membawa nama baik
                            almamater di berbagai bidang.
                        </p>

                        <div className="mt-7 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap sm:gap-4">
                            <a
                                href="#data-alumni"
                                className="inline-flex min-h-[52px] items-center justify-center gap-3 rounded-[14px] bg-[#d59a25] px-6 text-[12px] font-semibold uppercase tracking-[0.07em] text-white shadow-lg shadow-black/20 transition hover:bg-[#f7c46a] sm:min-h-[56px] sm:px-8 sm:text-[13px]"
                            >
                                Lihat Alumni
                                <span>→</span>
                            </a>

                            <a
                                href="/ppdb"
                                className="inline-flex min-h-[52px] items-center justify-center rounded-[14px] border border-white/35 bg-white/5 px-6 text-[12px] font-semibold uppercase tracking-[0.07em] text-white transition hover:bg-white/15 sm:min-h-[56px] sm:px-8 sm:text-[13px]"
                            >
                                Daftar PPDB
                            </a>
                        </div>
                    </div>

                    <div className="hidden lg:flex">
                        <div className="relative flex h-[260px] w-full items-center justify-center">
                            <div className="absolute inset-0 rounded-full bg-[#d59a25]/10 blur-3xl" />

                            <div className="relative flex h-[210px] w-[210px] items-center justify-center rounded-full border-[6px] border-[#d59a25] bg-[#052b66]/80 text-center shadow-2xl backdrop-blur">
                                {schoolLogo ? (
                                    <img
                                        src={schoolLogo}
                                        alt={schoolName}
                                        className="h-24 w-24 rounded-full object-cover"
                                    />
                                ) : (
                                    <div className="text-[56px] font-semibold text-white">
                                        {schoolInitials}
                                    </div>
                                )}

                                <div className="absolute -bottom-12 left-1/2 w-[280px] -translate-x-1/2 text-center">
                                    <p className="text-[20px] font-semibold uppercase tracking-[0.14em] text-[#f7c46a]">
                                        Proud Alumni
                                    </p>

                                    <p className="mt-1 text-[20px] font-semibold uppercase leading-tight text-white">
                                        {schoolName}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="bg-[#f6f9fd] px-5 py-7 sm:px-8 sm:py-8 lg:px-10">
                <div className="mx-auto grid max-w-[1120px] gap-4 sm:grid-cols-2 xl:grid-cols-4">
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
                className="relative overflow-hidden bg-[#f6f9fd] px-5 pb-16 pt-4 sm:px-8 lg:px-10"
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
                    <div className="mb-7 sm:mb-8">
                        <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[#d59a25]">
                            Direktori Alumni
                        </p>

                        <h2 className="mt-3 break-words text-[32px] font-semibold tracking-[-0.05em] text-[#062f6f] sm:text-[48px]">
                            Data Alumni Aktif
                        </h2>

                        <p className="mt-4 max-w-2xl text-[14px] font-medium leading-7 text-slate-600 sm:text-[15px] sm:leading-8">
                            Gunakan filter untuk mencari alumni berdasarkan
                            nama, tahun lulus, aktivitas, instansi, atau
                            jurusan.
                        </p>
                    </div>

                    <div className="mb-7 rounded-[22px] border border-slate-100 bg-white p-4 shadow-[0_18px_50px_rgba(15,42,92,0.08)] sm:mb-8 sm:rounded-[24px] sm:p-5">
                        <div className="grid gap-3 lg:grid-cols-[1fr_180px_190px_110px] lg:gap-4">
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
                                    className="h-[52px] w-full rounded-[16px] border border-slate-200 bg-white pl-12 pr-4 text-[14px] font-medium outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:ring-4 focus:ring-blue-100 sm:h-[56px]"
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
                                className="h-[52px] rounded-[16px] border border-slate-200 bg-white px-4 text-[14px] font-semibold text-[#062f6f] outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100 sm:h-[56px]"
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
                                className="h-[52px] rounded-[16px] border border-slate-200 bg-white px-4 text-[14px] font-semibold text-[#062f6f] outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100 sm:h-[56px]"
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
                                className="inline-flex h-[52px] items-center justify-center gap-2 rounded-[16px] bg-[#062f6f] px-5 text-[13px] font-semibold uppercase tracking-[0.08em] text-white shadow-lg shadow-blue-200 transition hover:bg-[#0a3f93] sm:h-[56px]"
                            >
                                <span>⚗</span>
                                Filter
                            </button>
                        </div>
                    </div>

                    {rows.length > 0 ? (
                        <>
                            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
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
                        <div className="rounded-[24px] bg-white p-8 text-center shadow-[0_22px_55px_rgba(15,42,92,0.08)] sm:rounded-[30px] sm:p-12">
                            <div className="text-[54px] sm:text-[62px]">🎓</div>

                            <h3 className="mt-4 text-[24px] font-semibold tracking-[-0.05em] text-[#062f6f] sm:text-[28px]">
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
        </FrontendLayout>
    );
}