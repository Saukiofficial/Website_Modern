import { usePage } from "@inertiajs/react";
import FrontendLayout from "../../Layouts/FrontendLayout";

const fallbackImagePath = {
    schoolBg: "/frontend/images/school-bg.jpg",
    students: "/frontend/images/students.png",
};

const fallbackStats = [
    {
        title: "SISWA AKTIF",
        value: "1.245",
        desc: "Siswa",
        icon: "users",
    },
    {
        title: "GURU & TENAGA KEPENDIDIKAN",
        value: "85",
        desc: "Orang",
        icon: "teacher",
    },
    {
        title: "PRESTASI",
        value: "128+",
        desc: "Penghargaan",
        icon: "trophy",
    },
    {
        title: "EKSTRAKURIKULER",
        value: "18+",
        desc: "Kegiatan",
        icon: "star",
    },
];

const fallbackNews = [
    {
        title: "Lomba Mobile Legend",
        date: "11 Jun 2026",
        image: "/frontend/images/school-logo.png",
        url: "/informasi",
    },
    {
        title: "Penerimaan Peserta Didik Baru Tahun Ajaran 2026/2027",
        date: "11 Jun 2026",
        image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=400&q=80",
        url: "/informasi",
    },
    {
        title: "Prestasi Siswa dalam Kompetisi Akademik Tingkat Kabupaten",
        date: "06 Jun 2026",
        image: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=400&q=80",
        url: "/informasi",
    },
];

const fallbackGallery = [
    {
        title: "Galeri 1",
        image: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=500&q=80",
    },
    {
        title: "Galeri 2",
        image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=500&q=80",
    },
    {
        title: "Galeri 3",
        image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=500&q=80",
    },
];

const fallbackAnnouncements = [
    {
        day: "15",
        month: "MEI",
        title: "Libur Hari Kenaikan Isa Almasih",
        url: "/informasi",
    },
    {
        day: "22",
        month: "MEI",
        title: "Asesmen Sumatif Akhir Semester Genap",
        url: "/informasi",
    },
    {
        day: "01",
        month: "JUN",
        title: "Pembagian Rapor Semester Genap",
        url: "/informasi",
    },
];

function getHomeValue(homeSection, key, fallback) {
    if (!homeSection) {
        return fallback;
    }

    return homeSection[key] || fallback;
}

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

function Icon({ type }) {
    if (type === "users") {
        return (
            <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5s-3 1.34-3 3 1.34 3 3 3Zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3Zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5C15 14.17 10.33 13 8 13Zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5Z" />
            </svg>
        );
    }

    if (type === "teacher") {
        return (
            <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 12c2.21 0 4-1.79 4-4S14.21 4 12 4 8 5.79 8 8s1.79 4 4 4Zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4Zm7-8h3v2h-3V6Zm0 4h3v2h-3v-2Zm0 4h3v2h-3v-2Z" />
            </svg>
        );
    }

    if (type === "trophy") {
        return (
            <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 5h-2V3H7v2H5c-1.1 0-2 .9-2 2v1c0 2.55 1.92 4.63 4.39 4.94A5.01 5.01 0 0 0 11 15.9V19H8v2h8v-2h-3v-3.1a5.01 5.01 0 0 0 3.61-2.96C19.08 12.63 21 10.55 21 8V7c0-1.1-.9-2-2-2ZM5 8V7h2v3.82A3.01 3.01 0 0 1 5 8Zm14 0c0 1.3-.84 2.42-2 2.82V7h2v1Z" />
            </svg>
        );
    }

    if (type === "star") {
        return (
            <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="m12 17.27 5.18 3.13-1.64-5.89 4.57-3.95-6.02-.25L12 4.75 9.91 10.31l-6.02.25 4.57 3.95-1.64 5.89L12 17.27Z" />
            </svg>
        );
    }

    return (
        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
            <path d="M4 5h16v2H4V5Zm0 6h16v2H4v-2Zm0 6h16v2H4v-2Z" />
        </svg>
    );
}

function HeroTitle({ title }) {
    const isDefault =
        String(title || "").toLowerCase().includes("cerdas") &&
        String(title || "").toLowerCase().includes("berkarakter");

    if (!isDefault) {
        return (
            <h1 className="max-w-[600px] break-words font-serif text-[32px] font-semibold leading-[1.08] tracking-[-0.045em] text-white sm:text-[46px] lg:max-w-[520px] lg:text-[36px] xl:max-w-[610px] xl:text-[44px] 2xl:max-w-[720px] 2xl:text-[54px]">
                {title}
            </h1>
        );
    }

    return (
        <h1 className="max-w-[600px] font-serif text-[32px] font-semibold leading-[1.08] tracking-[-0.045em] text-white sm:text-[46px] lg:max-w-[520px] lg:text-[36px] xl:max-w-[610px] xl:text-[44px] 2xl:max-w-[720px] 2xl:text-[54px]">
            <span className="block">Mewujudkan Generasi</span>

            <span className="block text-[#f7c46a]">
                Cerdas, Berkarakter,
            </span>

            <span className="block">
                dan{" "}
                <span className="text-[#f7c46a]">
                    Berdaya Saing Global
                </span>
            </span>
        </h1>
    );
}

function StatCard({ item, index }) {
    return (
        <div
            className={`flex min-w-0 items-center gap-4 px-5 py-5 lg:px-7 ${
                index !== 0
                    ? "border-t border-slate-200 sm:border-t-0 sm:border-l"
                    : ""
            }`}
        >
            <div className="flex h-[58px] w-[58px] shrink-0 items-center justify-center rounded-full bg-[#062f6f] text-white shadow-lg shadow-blue-200">
                <Icon type={item.icon} />
            </div>

            <div className="min-w-0">
                <p className="break-words text-[10px] font-extrabold uppercase leading-tight text-[#062f6f] sm:text-[11px]">
                    {item.title}
                </p>

                <h3 className="mt-1 text-[27px] font-extrabold leading-none tracking-[-0.04em] text-[#062f6f]">
                    {item.value}
                </h3>

                <p className="mt-1 text-[12px] font-medium text-slate-500 sm:text-[13px]">
                    {item.desc}
                </p>
            </div>
        </div>
    );
}

function NewsList({ items }) {
    return (
        <div className="h-full rounded-[18px] border border-slate-200 bg-white p-4 shadow-[0_14px_45px_rgba(15,42,92,0.08)]">
            <div className="mb-4 flex items-center justify-between gap-3">
                <h2 className="text-[15px] font-extrabold uppercase text-[#062f6f]">
                    Berita Terbaru
                </h2>

                <a
                    href="/informasi"
                    className="whitespace-nowrap text-[11px] font-extrabold text-[#0b63d8]"
                >
                    Lihat Semua
                </a>
            </div>

            <div className="space-y-3">
                {items.slice(0, 3).map((item) => (
                    <a
                        href={item.url || "/informasi"}
                        key={item.id || item.title}
                        className="flex gap-3 border-b border-slate-100 pb-3 transition hover:opacity-80 last:border-b-0 last:pb-0"
                    >
                        <img
                            src={
                                item.image ||
                                item.thumbnail_url ||
                                "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=400&q=80"
                            }
                            alt={item.title}
                            className="h-[58px] w-[78px] shrink-0 rounded-lg object-cover"
                            onError={(event) => {
                                event.currentTarget.src =
                                    "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=400&q=80";
                            }}
                        />

                        <div className="min-w-0">
                            <h3 className="line-clamp-2 text-[12.5px] font-extrabold leading-snug text-[#062f6f]">
                                {item.title}
                            </h3>

                            <p className="mt-1 text-[11px] font-medium text-slate-500">
                                {item.date || item.published_at || "-"}
                            </p>
                        </div>
                    </a>
                ))}
            </div>

            <a
                href="/informasi"
                className="mt-4 inline-flex min-h-[42px] w-full items-center justify-center gap-2 rounded-[10px] border border-[#062f6f]/30 text-[12px] font-extrabold text-[#062f6f] transition hover:bg-blue-50"
            >
                Lihat Semua Berita
                <span>→</span>
            </a>
        </div>
    );
}

function GalleryBox({ items }) {
    return (
        <div className="h-full rounded-[18px] border border-slate-200 bg-white p-4 shadow-[0_14px_45px_rgba(15,42,92,0.08)]">
            <div className="mb-4 flex items-center justify-between gap-3">
                <h2 className="text-[15px] font-extrabold uppercase text-[#062f6f]">
                    Galeri Kegiatan
                </h2>

                <a
                    href="/galeri"
                    className="whitespace-nowrap text-[11px] font-extrabold text-[#0b63d8]"
                >
                    Lihat Semua
                </a>
            </div>

            <div className="grid grid-cols-2 gap-2">
                {items.slice(0, 3).map((item, index) => (
                    <a
                        href="/galeri"
                        key={item.id || index}
                        className={`group block overflow-hidden rounded-xl bg-slate-100 ${
                            index === 0 ? "col-span-2" : ""
                        }`}
                    >
                        <img
                            src={
                                item.image ||
                                item.image_url ||
                                "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=500&q=80"
                            }
                            alt={item.title || `Galeri ${index + 1}`}
                            className={`w-full object-cover transition duration-500 group-hover:scale-105 ${
                                index === 0
                                    ? "h-[120px] md:h-[150px] xl:h-[110px]"
                                    : "h-[90px] md:h-[110px] xl:h-[88px]"
                            }`}
                            onError={(event) => {
                                event.currentTarget.src =
                                    "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=500&q=80";
                            }}
                        />
                    </a>
                ))}
            </div>
        </div>
    );
}

function AnnouncementBox({ items }) {
    return (
        <div className="h-full rounded-[18px] border border-slate-200 bg-white p-4 shadow-[0_14px_45px_rgba(15,42,92,0.08)]">
            <div className="mb-4 flex items-center justify-between gap-3">
                <h2 className="text-[15px] font-extrabold uppercase text-[#062f6f]">
                    Pengumuman
                </h2>

                <a
                    href="/informasi"
                    className="whitespace-nowrap text-[11px] font-extrabold text-[#0b63d8]"
                >
                    Lihat Semua
                </a>
            </div>

            <div className="space-y-3">
                {items.slice(0, 3).map((item) => (
                    <a
                        href={item.url || "/informasi"}
                        key={item.id || item.title}
                        className="flex items-center gap-3 rounded-xl bg-[#f6f8fc] p-3 transition hover:bg-blue-50"
                    >
                        <div className="flex h-[54px] w-[54px] shrink-0 flex-col items-center justify-center border-r border-slate-200 pr-3 text-[#062f6f]">
                            <span className="text-[22px] font-extrabold leading-none">
                                {item.day || "-"}
                            </span>

                            <span className="mt-1 text-[9px] font-extrabold uppercase">
                                {item.month || "-"}
                            </span>
                        </div>

                        <h3 className="line-clamp-2 text-[12.5px] font-extrabold leading-snug text-slate-900">
                            {item.title}
                        </h3>
                    </a>
                ))}
            </div>

            <a
                href="/informasi"
                className="mt-4 inline-flex min-h-[42px] w-full items-center justify-center gap-2 rounded-[10px] border border-[#062f6f]/30 text-[12px] font-extrabold text-[#062f6f] transition hover:bg-blue-50"
            >
                Lihat Semua Pengumuman
                <span>→</span>
            </a>
        </div>
    );
}

function PpdbCard({
    ppdbTitle,
    ppdbDescription,
    ppdbButtonText,
    ppdbButtonUrl,
    ppdbSetting,
}) {
    return (
        <div className="relative h-full overflow-hidden rounded-[18px] border border-[#d59a25]/50 bg-[#062f6f] p-5 text-white shadow-[0_18px_48px_rgba(6,47,111,0.26)]">
            <div className="absolute -right-14 -top-14 h-36 w-36 rounded-full border-[18px] border-white/5" />
            <div className="absolute -bottom-20 left-8 h-44 w-44 rounded-full bg-[#d59a25]/10 blur-3xl" />

            <div className="relative flex h-full flex-col justify-between">
                <div>
                    <h2 className="font-serif text-[28px] font-semibold leading-tight text-[#f7c46a] md:text-[30px] xl:text-[28px]">
                        {ppdbTitle}
                    </h2>

                    <p className="mt-4 text-[13px] font-medium leading-6 text-blue-100 md:text-[14px] xl:text-[13px]">
                        {ppdbDescription}
                    </p>
                </div>

                <div>
                    {ppdbSetting?.is_open === false ? (
                        <a
                            href="/ppdb"
                            className="mt-6 inline-flex min-h-[48px] w-full items-center justify-center rounded-[10px] bg-white/15 px-5 text-[13px] font-extrabold text-white ring-1 ring-white/20 transition hover:bg-white/20"
                        >
                            {ppdbButtonText}
                        </a>
                    ) : (
                        <a
                            href={ppdbButtonUrl}
                            className="mt-6 inline-flex min-h-[48px] w-full items-center justify-center gap-3 rounded-[10px] bg-[#d59a25] px-5 text-[13px] font-extrabold text-white shadow-lg shadow-black/20 transition hover:bg-[#f7c46a]"
                        >
                            {ppdbButtonText}
                            <span>→</span>
                        </a>
                    )}

                    <div className="mt-5 flex items-center gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/40">
                            <svg
                                className="h-5 w-5"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                            >
                                <path d="M20.52 3.48A11.84 11.84 0 0 0 12.08 0C5.54 0 .22 5.32.22 11.86c0 2.09.55 4.14 1.6 5.94L0 24l6.35-1.66a11.83 11.83 0 0 0 5.73 1.46h.01c6.54 0 11.86-5.32 11.86-11.86a11.8 11.8 0 0 0-3.43-8.46ZM12.09 21.8h-.01a9.85 9.85 0 0 1-5.02-1.37l-.36-.22-3.77.99 1.01-3.67-.24-.38a9.8 9.8 0 0 1-1.5-5.29c0-5.44 4.43-9.86 9.88-9.86a9.8 9.8 0 0 1 6.97 2.89 9.78 9.78 0 0 1 2.88 6.97c0 5.44-4.43 9.94-9.84 9.94Zm5.4-7.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.95 1.17-.17.2-.35.22-.65.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.75-1.64-2.05-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.05 1.02-1.05 2.5 0 1.47 1.07 2.9 1.22 3.1.15.2 2.11 3.22 5.1 4.51.71.31 1.27.49 1.7.63.71.23 1.36.2 1.87.12.57-.08 1.76-.72 2.01-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35Z" />
                            </svg>
                        </div>

                        <div>
                            <p className="text-[12px] font-medium text-blue-100">
                                Butuh bantuan?
                            </p>
                            <p className="text-[12px] font-extrabold">
                                Hubungi Panitia PPDB
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function Home({
    homeSection = null,
    statistics = [],
    latestNews = [],
    galleryItems = [],
    announcements = [],
    ppdbSetting = null,
}) {
    const { props } = usePage();

    const schoolSetting = props.schoolSetting || {};
    const schoolName = schoolSetting.school_name || "International Schools";
    const schoolLogo = schoolSetting.logo_url || null;
    const schoolInitials = getSchoolInitials(schoolName);

    const dynamicStats =
        Array.isArray(statistics) && statistics.length > 0
            ? statistics
            : fallbackStats;

    const dynamicNews =
        Array.isArray(latestNews) && latestNews.length > 0
            ? latestNews
            : fallbackNews;

    const dynamicGallery =
        Array.isArray(galleryItems) && galleryItems.length > 0
            ? galleryItems
            : fallbackGallery;

    const dynamicAnnouncements =
        Array.isArray(announcements) && announcements.length > 0
            ? announcements
            : fallbackAnnouncements;

    const heroTitle = getHomeValue(
        homeSection,
        "hero_title",
        "Mewujudkan Generasi Cerdas, Berkarakter, dan Berdaya Saing Global"
    );

    const heroSubtitle = getHomeValue(
        homeSection,
        "hero_subtitle",
        "Kami berkomitmen memberikan pendidikan terbaik untuk masa depan yang gemilang."
    );

    const heroButtonText = getHomeValue(
        homeSection,
        "hero_button_text",
        "Selengkapnya"
    );

    const heroButtonUrl = getHomeValue(
        homeSection,
        "hero_button_url",
        "#informasi"
    );

    const heroBackground =
        homeSection?.hero_background_url || fallbackImagePath.schoolBg;

    const heroImage = homeSection?.hero_image_url || fallbackImagePath.students;

    const ppdbTitle =
        homeSection?.ppdb_title || "Penerimaan Peserta Didik Baru";

    const ppdbDescription = getHomeValue(
        homeSection,
        "ppdb_description",
        ppdbSetting?.is_open === false
            ? "Pendaftaran peserta didik baru saat ini belum dibuka. Pantau terus informasi resmi dari sekolah."
            : "Daftarkan diri sebagai calon peserta didik baru dan jadilah bagian dari sekolah berprestasi."
    );

    const ppdbButtonText =
        homeSection?.ppdb_button_text ||
        ppdbSetting?.cta_label ||
        (ppdbSetting?.is_open === false ? "PPDB Ditutup" : "Daftar Sekarang");

    const ppdbButtonUrl =
        homeSection?.ppdb_button_url || ppdbSetting?.cta_url || "/ppdb/daftar";

    return (
        <FrontendLayout>
            <section className="relative w-full bg-white">
                <div className="relative h-[610px] w-full overflow-hidden bg-[#061f4b] sm:h-[650px] lg:h-[520px] xl:h-[535px]">
                    <img
                        src={heroBackground}
                        alt="Background sekolah"
                        className="absolute inset-0 h-full w-full object-cover object-center"
                        onError={(event) => {
                            event.currentTarget.src =
                                "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1600&q=85";
                        }}
                    />

                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(3,27,65,0.98)_0%,rgba(4,38,88,0.88)_48%,rgba(4,38,88,0.38)_100%)] lg:bg-[linear-gradient(90deg,rgba(3,27,65,0.34)_0%,rgba(3,27,65,0.22)_42%,rgba(3,27,65,0.06)_64%,rgba(3,27,65,0)_100%)]" />

                    <div className="absolute left-[-600px] top-1/2 z-10 hidden h-[1240px] w-[1240px] -translate-y-1/2 rounded-full bg-[#061f4b] lg:block xl:left-[-570px] xl:h-[1320px] xl:w-[1320px]" />

                    <div className="absolute left-[-560px] top-1/2 z-10 hidden h-[1120px] w-[1120px] -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_55%_50%,rgba(255,255,255,0.055)_0%,rgba(255,255,255,0.018)_28%,rgba(0,0,0,0.20)_58%,rgba(0,0,0,0)_72%)] lg:block xl:left-[-530px] xl:h-[1200px] xl:w-[1200px]" />

                    <div className="absolute left-[-585px] top-1/2 z-10 hidden h-[1240px] w-[1240px] -translate-y-1/2 rounded-full border-[18px] border-[#d59a25] lg:block xl:left-[-555px] xl:h-[1320px] xl:w-[1320px] xl:border-[20px]" />

                    <div className="absolute left-[-540px] top-1/2 z-10 hidden h-[1340px] w-[1340px] -translate-y-1/2 rounded-full border border-white/15 lg:block xl:left-[-510px] xl:h-[1420px] xl:w-[1420px]" />

                    <div className="pointer-events-none absolute left-0 top-0 z-10 hidden h-full w-[42%] opacity-[0.16] lg:block">
                        <div className="absolute left-0 top-0 h-full w-[150px] bg-[radial-gradient(circle,rgba(255,255,255,0.24)_1px,transparent_1px)] [background-size:12px_12px]" />

                        <div className="absolute -left-10 bottom-4 text-[230px] leading-none text-white/20">
                            ❬
                        </div>
                    </div>

                    <img
                        src={heroImage}
                        alt="Siswa"
                        className="absolute bottom-0 z-10 h-[320px] w-auto object-contain drop-shadow-2xl right-[-120px] sm:right-[-80px] sm:h-[390px] lg:right-[-300px] lg:h-[420px] xl:right-[-120px] xl:h-[485px] 2xl:right-[90px] 2xl:h-[505px]"
                        onError={(event) => {
                            event.currentTarget.style.display = "none";
                        }}
                    />

                    <div className="absolute bottom-[96px] right-0 z-20 hidden rounded-l-[26px] border border-[#d59a25]/35 bg-[#062f6f]/95 px-7 py-5 text-white shadow-2xl backdrop-blur-md xl:block">
                        <div className="flex items-center gap-4">
                            <div className="flex h-[70px] w-[70px] items-center justify-center overflow-hidden rounded-full border border-[#d59a25] bg-white/10">
                                {schoolLogo ? (
                                    <img
                                        src={schoolLogo}
                                        alt={schoolName}
                                        className="h-full w-full object-cover"
                                    />
                                ) : (
                                    <span className="text-[22px] font-black text-[#f7c46a]">
                                        {schoolInitials}
                                    </span>
                                )}
                            </div>

                            <div>
                                <p className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-[#f7c46a]">
                                    Global Learning
                                </p>

                                <p className="mt-1 text-[11px] font-extrabold uppercase tracking-[0.16em] text-[#f7c46a]">
                                    Character Building
                                </p>

                                <p className="mt-1 text-[11px] font-extrabold uppercase tracking-[0.16em] text-[#f7c46a]">
                                    Bright Future
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="absolute bottom-[118px] left-[51%] z-20 hidden -translate-x-1/2 items-center gap-2 lg:flex">
                        <span className="h-3 w-3 rounded-full bg-[#f7c46a]" />
                        <span className="h-3 w-3 rounded-full bg-white/80" />
                        <span className="h-3 w-3 rounded-full bg-white/55" />
                        <span className="h-3 w-3 rounded-full bg-white/40" />
                    </div>

                    <div className="absolute inset-0 z-10 bg-[linear-gradient(180deg,rgba(6,31,75,0.95)_0%,rgba(6,31,75,0.76)_52%,rgba(6,31,75,0.30)_100%)] lg:hidden" />

                    <div className="relative z-20 flex h-full max-w-[720px] flex-col justify-center px-5 pb-[190px] pt-10 sm:px-8 sm:pb-[205px] lg:pb-[80px] lg:pl-[72px] lg:pr-0 xl:pl-[120px]">
                        <HeroTitle title={heroTitle} />

                        <p className="mt-5 max-w-[460px] text-[14px] font-medium leading-7 text-blue-50 sm:text-[16px]">
                            {heroSubtitle}
                        </p>

                        <a
                            href={heroButtonUrl}
                            className="mt-7 inline-flex min-h-[48px] w-fit items-center justify-center gap-3 rounded-[10px] bg-[#d59a25] px-7 text-[13px] font-extrabold text-white shadow-xl shadow-black/20 transition hover:bg-[#f7c46a]"
                        >
                            {heroButtonText}
                            <span>→</span>
                        </a>
                    </div>
                </div>

                <div className="relative z-20 -mt-[76px] w-full px-4 sm:-mt-[92px] sm:px-6 lg:-mt-[54px] lg:px-10 xl:px-14">
                    <div className="mx-auto grid w-full max-w-none overflow-hidden rounded-[18px] border border-slate-200 bg-white shadow-[0_18px_55px_rgba(15,42,92,0.16)] sm:grid-cols-2 lg:grid-cols-4">
                        {dynamicStats.slice(0, 4).map((item, index) => (
                            <StatCard
                                key={`${item.title}-${index}`}
                                item={item}
                                index={index}
                            />
                        ))}
                    </div>
                </div>
            </section>

            <section
                id="informasi"
                className="bg-white px-4 pb-12 pt-8 sm:px-6 sm:pb-14 lg:px-10 xl:px-14 2xl:px-16"
            >
                <div className="mx-auto grid w-full max-w-none gap-4 md:grid-cols-2 xl:grid-cols-[1fr_1fr_1fr_0.9fr]">
                    <NewsList items={dynamicNews} />

                    <GalleryBox items={dynamicGallery} />

                    <AnnouncementBox items={dynamicAnnouncements} />

                    <PpdbCard
                        ppdbTitle={ppdbTitle}
                        ppdbDescription={ppdbDescription}
                        ppdbButtonText={ppdbButtonText}
                        ppdbButtonUrl={ppdbButtonUrl}
                        ppdbSetting={ppdbSetting}
                    />
                </div>
            </section>
        </FrontendLayout>
    );
}