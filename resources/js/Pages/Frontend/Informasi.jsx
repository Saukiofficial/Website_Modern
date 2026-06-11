import FrontendLayout from "../../Layouts/FrontendLayout";

const fallbackNews = [
    {
        title: "Pengumuman Jadwal Ujian Semester Genap",
        slug: "#",
        category: "Akademik",
        published_at: "12 Juni 2026",
        thumbnail_url:
            "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=1200&q=85",
        excerpt:
            "Informasi resmi sekolah yang dapat diakses oleh siswa, orang tua, dan masyarakat.",
    },
    {
        title: "Kegiatan Class Meeting Tahun Ajaran Baru",
        slug: "#",
        category: "Kesiswaan",
        published_at: "18 Juni 2026",
        thumbnail_url:
            "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=85",
        excerpt:
            "Informasi resmi sekolah yang dapat diakses oleh siswa, orang tua, dan masyarakat.",
    },
    {
        title: "Prestasi Siswa dalam Olimpiade Sains",
        slug: "#",
        category: "Prestasi",
        published_at: "25 Juni 2026",
        thumbnail_url:
            "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=1200&q=85",
        excerpt:
            "Informasi resmi sekolah yang dapat diakses oleh siswa, orang tua, dan masyarakat.",
    },
];

const notices = [
    {
        title: "PPDB 2026",
        description:
            "Informasi pendaftaran peserta didik baru tahun ajaran 2026/2027.",
        icon: "📣",
        href: "/ppdb",
    },
    {
        title: "Kalender Akademik",
        description:
            "Agenda kegiatan akademik, ujian, libur, dan program sekolah.",
        icon: "🗓️",
        href: "/akademik",
    },
    {
        title: "Layanan Administrasi",
        description:
            "Informasi surat menyurat, legalisasi, dan layanan sekolah.",
        icon: "📄",
        href: "/informasi",
    },
];

const benefits = [
    {
        title: "Informasi Terpercaya",
        description: "Sumber resmi dan akurat langsung dari sekolah",
        icon: "🕘",
    },
    {
        title: "Update Berkala",
        description: "Informasi terbaru yang diperbarui secara rutin",
        icon: "🛡️",
    },
    {
        title: "Untuk Semua",
        description: "Dapat diakses oleh siswa, orang tua, dan masyarakat",
        icon: "👥",
    },
    {
        title: "Mudah Diakses",
        description: "Informasi tersedia kapan saja dan di mana saja",
        icon: "🌐",
    },
];

function NewsCard({ item }) {
    const href = item.slug && item.slug !== "#" ? `/informasi/${item.slug}` : "#";

    return (
        <article className="overflow-hidden rounded-[18px] border border-slate-200 bg-white shadow-xl shadow-slate-200/70 transition duration-300 hover:-translate-y-1 hover:shadow-2xl">
            <a href={href} className="block h-[210px] overflow-hidden bg-slate-100">
                <img
                    src={
                        item.thumbnail_url ||
                        "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=1200&q=85"
                    }
                    alt={item.title}
                    className="h-full w-full object-cover transition duration-500 hover:scale-105"
                />
            </a>

            <div className="p-6">
                <div className="flex items-center justify-between gap-4">
                    <span className="rounded-full bg-blue-50 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.04em] text-[#0d58cf]">
                        {item.category || "Informasi"}
                    </span>

                    <div className="flex items-center gap-2 text-[12px] font-medium text-slate-500">
                        <span>📅</span>
                        <span>{item.published_at || "-"}</span>
                    </div>
                </div>

                <h3 className="mt-5 line-clamp-2 font-serif text-[26px] font-semibold leading-tight tracking-[-0.035em] text-[#061b46]">
                    {item.title}
                </h3>

                <p className="mt-4 line-clamp-3 text-[14px] font-medium leading-7 text-slate-600">
                    {item.excerpt ||
                        "Informasi resmi sekolah yang dapat diakses oleh siswa, orang tua, dan masyarakat."}
                </p>

                <a
                    href={href}
                    className="mt-6 inline-flex items-center gap-3 text-[14px] font-semibold text-[#052b66] transition hover:text-[#d5a542]"
                >
                    Baca Selengkapnya
                    <span>→</span>
                </a>
            </div>
        </article>
    );
}

function NoticeItem({ item, index }) {
    return (
        <a
            href={item.href}
            className={`group flex items-center gap-5 py-6 ${
                index !== notices.length - 1 ? "border-b border-white/15" : ""
            }`}
        >
            <div className="flex h-[74px] w-[74px] shrink-0 items-center justify-center rounded-[16px] bg-white/10 text-[34px] shadow-lg shadow-blue-950/20">
                {item.icon}
            </div>

            <div className="min-w-0 flex-1">
                <h3 className="text-[20px] font-semibold leading-tight text-white">
                    {item.title}
                </h3>

                <p className="mt-2 text-[14px] font-medium leading-7 text-blue-100">
                    {item.description}
                </p>
            </div>

            <div className="text-[30px] leading-none text-[#d5a542] transition group-hover:translate-x-1">
                ›
            </div>
        </a>
    );
}

function BenefitItem({ item, index }) {
    return (
        <div
            className={`flex items-center gap-5 px-6 py-6 ${
                index !== benefits.length - 1
                    ? "border-b border-slate-200 lg:border-b-0 lg:border-r"
                    : ""
            }`}
        >
            <div className="text-[42px] leading-none text-[#052b66]">
                {item.icon}
            </div>

            <div>
                <h3 className="text-[16px] font-semibold text-[#061b46]">
                    {item.title}
                </h3>

                <p className="mt-1 max-w-[230px] text-[12.5px] font-medium leading-5 text-slate-500">
                    {item.description}
                </p>
            </div>
        </div>
    );
}

export default function Informasi({ posts = [], featuredPosts = [] }) {
    const news = posts.length > 0 ? posts : fallbackNews;
    const featured = featuredPosts.length > 0 ? featuredPosts : news.slice(0, 3);

    return (
        <FrontendLayout>
            <section className="relative w-full overflow-hidden bg-[#052b66]">
                <div className="relative min-h-[450px] w-full overflow-hidden lg:min-h-[500px]">
                    <img
                        src="/frontend/images/informasi-hero.jpg"
                        alt="Informasi Sekolah"
                        className="absolute inset-0 h-full w-full object-cover object-center"
                        onError={(event) => {
                            event.currentTarget.src =
                                "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=1900&q=85";
                        }}
                    />

                    <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(3,29,74,0.99)_0%,rgba(3,42,101,0.94)_42%,rgba(3,42,101,0.68)_64%,rgba(4,62,145,0.15)_100%)]" />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(3,24,58,0.08)_0%,rgba(3,24,58,0.02)_48%,rgba(3,24,58,0.26)_100%)]" />

                    <div className="relative z-10 flex min-h-[450px] flex-col justify-center px-4 py-12 sm:px-6 lg:min-h-[500px] lg:px-10 xl:px-14 2xl:px-16">
                        <div className="flex flex-wrap items-center gap-3 text-[13px] font-medium text-blue-100">
                            <a href="/" className="hover:text-white">
                                Beranda
                            </a>
                            <span>›</span>
                            <span className="text-white">Informasi</span>
                        </div>

                        <p className="mt-9 text-[13px] font-semibold uppercase tracking-[0.22em] text-[#d5a542]">
                            Informasi Sekolah
                        </p>

                        <h1 className="mt-5 max-w-[780px] font-serif text-[48px] font-semibold leading-[1.08] tracking-[-0.045em] text-white sm:text-[62px] lg:text-[74px]">
                            Berita, Pengumuman,
                            <br />
                            dan Artikel Sekolah
                        </h1>

                        <div className="mt-7 h-[2px] w-20 rounded-full bg-[#d5a542]" />

                        <p className="mt-7 max-w-[700px] text-[16px] font-medium leading-8 text-blue-50 sm:text-[18px]">
                            Temukan informasi terbaru seputar kegiatan sekolah,
                            pengumuman akademik, prestasi siswa, dan layanan
                            pendidikan.
                        </p>
                    </div>
                </div>
            </section>

            <section className="w-full bg-[#f4f8fc] px-4 py-12 sm:px-6 lg:px-10 lg:py-16 xl:px-14 2xl:px-16">
                <div className="grid gap-8 xl:grid-cols-[1fr_0.44fr] xl:items-start">
                    <div>
                        <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                            <div>
                                <p className="text-[13px] font-semibold uppercase tracking-[0.22em] text-[#d5a542]">
                                    Berita Terbaru
                                </p>

                                <h2 className="mt-4 font-serif text-[40px] font-semibold leading-tight tracking-[-0.04em] text-[#061b46] sm:text-[48px]">
                                    Informasi Terkini
                                </h2>
                            </div>

                            <a
                                href="/informasi"
                                className="inline-flex min-h-[50px] items-center justify-center gap-3 rounded-[8px] border border-[#d5a542] bg-white px-7 text-[13px] font-semibold text-[#052b66] shadow-sm transition hover:bg-blue-50"
                            >
                                Lihat Semua
                                <span>→</span>
                            </a>
                        </div>

                        <div className="grid gap-6 md:grid-cols-3">
                            {news.map((item) => (
                                <NewsCard key={item.id || item.title} item={item} />
                            ))}
                        </div>

                        <div className="mt-8 overflow-hidden rounded-[22px] border border-slate-200 bg-white shadow-xl shadow-slate-200/70">
                            <div className="grid lg:grid-cols-4">
                                {benefits.map((item, index) => (
                                    <BenefitItem
                                        key={item.title}
                                        item={item}
                                        index={index}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>

                    <aside className="rounded-[28px] bg-gradient-to-br from-[#052b66] to-[#063f8d] p-7 text-white shadow-2xl shadow-blue-200 sm:p-9">
                        <p className="text-[13px] font-semibold uppercase tracking-[0.22em] text-[#d5a542]">
                            Pengumuman Penting
                        </p>

                        <h2 className="mt-5 font-serif text-[36px] font-semibold leading-tight tracking-[-0.04em] text-white sm:text-[42px]">
                            Pusat Informasi Sekolah
                        </h2>

                        <div className="mt-7">
                            {notices.map((item, index) => (
                                <NoticeItem
                                    key={item.title}
                                    item={item}
                                    index={index}
                                />
                            ))}
                        </div>

                        <div className="mt-8 rounded-[20px] border border-white/10 bg-white/10 p-5">
                            <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-[#d5a542]">
                                Informasi Unggulan
                            </p>

                            <div className="mt-5 space-y-4">
                                {featured.map((item) => (
                                    <a
                                        key={item.id || item.title}
                                        href={
                                            item.slug && item.slug !== "#"
                                                ? `/informasi/${item.slug}`
                                                : "#"
                                        }
                                        className="block rounded-[14px] bg-white/10 p-4 transition hover:bg-white/15"
                                    >
                                        <p className="text-[12px] font-semibold text-[#d5a542]">
                                            {item.category || "Informasi"}
                                        </p>

                                        <h3 className="mt-2 line-clamp-2 text-[15px] font-semibold leading-6 text-white">
                                            {item.title}
                                        </h3>
                                    </a>
                                ))}
                            </div>
                        </div>
                    </aside>
                </div>
            </section>
        </FrontendLayout>
    );
}