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
        title: "GURU & TENDIK",
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
        icon: "list",
    },
];

const fallbackNews = [
    {
        title: "SMA Negeri 1 Cerdas Raih Juara 1 Olimpiade Sains Nasional 2024",
        date: "10 Mei 2024",
        image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=400&q=80",
        url: "/informasi",
    },
    {
        title: "Kegiatan Pesantren Kilat Ramadan 1445 H",
        date: "25 Maret 2024",
        image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=400&q=80",
        url: "/informasi",
    },
    {
        title: "Workshop Literasi Digital untuk Siswa",
        date: "15 Februari 2024",
        image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=400&q=80",
        url: "/informasi",
    },
];

const fallbackGallery = [
    {
        title: "Galeri 1",
        image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=500&q=80",
    },
    {
        title: "Galeri 2",
        image: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=500&q=80",
    },
    {
        title: "Galeri 3",
        image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=500&q=80",
    },
    {
        title: "Galeri 4",
        image: "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=500&q=80",
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

function Icon({ type }) {
    if (type === "users") {
        return (
            <svg
                className="h-6 w-6 sm:h-7 sm:w-7"
                viewBox="0 0 24 24"
                fill="currentColor"
            >
                <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5s-3 1.34-3 3 1.34 3 3 3Zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3Zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5C15 14.17 10.33 13 8 13Zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5Z" />
            </svg>
        );
    }

    if (type === "teacher") {
        return (
            <svg
                className="h-6 w-6 sm:h-7 sm:w-7"
                viewBox="0 0 24 24"
                fill="currentColor"
            >
                <path d="M12 12c2.21 0 4-1.79 4-4S14.21 4 12 4 8 5.79 8 8s1.79 4 4 4Zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4Zm7-8h3v2h-3V6Zm0 4h3v2h-3v-2Zm0 4h3v2h-3v-2Z" />
            </svg>
        );
    }

    if (type === "trophy") {
        return (
            <svg
                className="h-6 w-6 sm:h-7 sm:w-7"
                viewBox="0 0 24 24"
                fill="currentColor"
            >
                <path d="M19 5h-2V3H7v2H5c-1.1 0-2 .9-2 2v1c0 2.55 1.92 4.63 4.39 4.94A5.01 5.01 0 0 0 11 15.9V19H8v2h8v-2h-3v-3.1a5.01 5.01 0 0 0 3.61-2.96C19.08 12.63 21 10.55 21 8V7c0-1.1-.9-2-2-2ZM5 8V7h2v3.82A3.01 3.01 0 0 1 5 8Zm14 0c0 1.3-.84 2.42-2 2.82V7h2v1Z" />
            </svg>
        );
    }

    return (
        <svg
            className="h-6 w-6 sm:h-7 sm:w-7"
            viewBox="0 0 24 24"
            fill="currentColor"
        >
            <path d="M4 5h16v2H4V5Zm0 6h16v2H4v-2Zm0 6h16v2H4v-2Z" />
        </svg>
    );
}

function getHomeValue(homeSection, key, fallback) {
    if (!homeSection) {
        return fallback;
    }

    return homeSection[key] || fallback;
}

export default function Home({
    homeSection = null,
    statistics = [],
    latestNews = [],
    galleryItems = [],
    announcements = [],
    ppdbSetting = null,
}) {
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
        "#profil"
    );

    const heroBackground =
        homeSection?.hero_background_url || fallbackImagePath.schoolBg;

    const heroImage = homeSection?.hero_image_url || fallbackImagePath.students;

    const ppdbTitle =
        homeSection?.ppdb_title ||
        `PPDB ${ppdbSetting?.academic_year || "2026/2027"}`;

    const ppdbDescription = getHomeValue(
        homeSection,
        "ppdb_description",
        ppdbSetting?.is_open === false
            ? "Pendaftaran peserta didik baru saat ini belum dibuka. Pantau terus informasi resmi dari sekolah."
            : "Bergabunglah bersama kami dan wujudkan masa depan terbaik Anda!"
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
                <div className="relative h-[470px] w-full overflow-hidden bg-[#064493] sm:h-[510px] md:h-[420px] lg:h-[430px] xl:h-[455px]">
                    <img
                        src={heroBackground}
                        alt="Background sekolah"
                        className="absolute inset-0 h-full w-full object-cover"
                        onError={(event) => {
                            event.currentTarget.src =
                                "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1600&q=85";
                        }}
                    />

                    <div className="absolute inset-0 bg-black/10 md:bg-black/5" />

                    <div className="absolute inset-0 z-10 bg-[linear-gradient(90deg,rgba(5,37,86,0.96)_0%,rgba(6,68,147,0.86)_45%,rgba(6,68,147,0.18)_100%)] md:hidden" />

                    <div
                        className="absolute inset-y-0 left-0 z-10 hidden w-[70%] bg-[linear-gradient(90deg,rgba(5,37,86,0.96)_0%,rgba(6,68,147,0.88)_45%,rgba(6,68,147,0.34)_75%,rgba(6,68,147,0)_100%)] md:block lg:w-[66%]"
                        style={{
                            clipPath:
                                "polygon(0 0, 76% 0, 60% 100%, 0 100%)",
                        }}
                    />

                    <div
                        className="absolute inset-y-0 left-0 z-10 hidden w-[58%] bg-[radial-gradient(circle_at_28%_45%,rgba(0,0,0,0.20)_0%,rgba(0,0,0,0.12)_38%,rgba(0,0,0,0)_72%)] md:block lg:w-[54%]"
                        style={{
                            clipPath:
                                "polygon(0 0, 84% 0, 65% 100%, 0 100%)",
                        }}
                    />

                    <div
                        className="absolute inset-y-0 left-[36%] z-10 hidden w-[24%] bg-white/5 backdrop-blur-[1px] md:block lg:left-[35%] lg:w-[25%]"
                        style={{
                            clipPath:
                                "polygon(28% 0, 100% 0, 66% 100%, 0 100%)",
                        }}
                    />

                    <img
                        src={heroImage}
                        alt="Siswa"
                        className="absolute bottom-0 right-[-8px] z-20 h-[250px] w-auto object-contain drop-shadow-2xl sm:right-3 sm:h-[310px] md:right-6 md:h-[330px] lg:right-[90px] lg:h-[350px] xl:right-[130px] xl:h-[370px] 2xl:right-[190px]"
                        onError={(event) => {
                            event.currentTarget.style.display = "none";
                        }}
                    />

                    <div className="relative z-30 flex h-full w-full max-w-[760px] flex-col px-5 pt-[36px] sm:px-8 sm:pt-12 md:px-10 md:pt-[48px] lg:px-14 lg:pt-[54px] xl:px-16 2xl:px-20">
                        <h1 className="max-w-[225px] text-[25px] font-extrabold leading-[1.13] tracking-[-0.025em] text-white sm:max-w-[320px] sm:text-[37px] md:max-w-[470px] md:text-[33px] md:leading-[1.13] lg:max-w-[650px] lg:text-[41px] xl:text-[46px]">
                            {heroTitle}
                        </h1>

                        <p className="mt-4 max-w-[225px] text-[12.5px] font-medium leading-6 text-white/95 sm:max-w-[320px] sm:text-[14px] sm:leading-7 md:max-w-[420px] md:text-[14px] lg:max-w-[500px] lg:text-[15px]">
                            {heroSubtitle}
                        </p>

                        <a
                            href={heroButtonUrl}
                            className="relative z-50 mt-4 inline-flex h-[42px] w-fit items-center gap-3 rounded-[10px] bg-[#0b73e8] px-5 text-[12px] font-extrabold text-white shadow-xl shadow-blue-950/30 ring-1 ring-white/20 transition hover:bg-blue-600 sm:h-[46px] sm:px-6 sm:text-[13px]"
                        >
                            {heroButtonText}
                            <span className="text-[19px] leading-none">›</span>
                        </a>
                    </div>
                </div>

                <div className="relative z-40 -mt-7 w-full px-4 sm:-mt-10 sm:px-6 md:-mt-[24px] lg:-mt-[12px] xl:px-10 2xl:px-14">
                    <div className="grid w-full grid-cols-2 overflow-hidden rounded-[22px] bg-white shadow-xl shadow-slate-300/60 ring-1 ring-slate-200 lg:grid-cols-4">
                        {dynamicStats.map((item, index) => (
                            <div
                                key={`${item.title}-${index}`}
                                className={`flex min-h-[104px] items-center gap-3 px-4 py-4 sm:min-h-[128px] sm:gap-4 sm:px-5 sm:py-5 md:min-h-[118px] lg:min-h-[94px] lg:px-7 lg:py-4 ${
                                    index % 2 === 0
                                        ? "border-r border-slate-200"
                                        : ""
                                } ${
                                    index < 2
                                        ? "border-b border-slate-200"
                                        : ""
                                } lg:border-b-0 lg:border-r-0 ${
                                    index !== dynamicStats.length - 1
                                        ? "lg:border-r lg:border-slate-200"
                                        : ""
                                }`}
                            >
                                <div className="flex h-[48px] w-[48px] shrink-0 items-center justify-center rounded-full bg-[#0b73e8] text-white shadow-lg shadow-blue-200 sm:h-[58px] sm:w-[58px] md:h-[56px] md:w-[56px]">
                                    <Icon type={item.icon} />
                                </div>

                                <div className="min-w-0">
                                    <p className="break-words text-[8.8px] font-extrabold uppercase leading-tight text-[#064493] sm:text-[10.5px] md:text-[10px]">
                                        {item.title}
                                    </p>
                                    <h3 className="mt-1 text-[21px] font-extrabold leading-none tracking-[-0.02em] text-slate-950 sm:text-[24px] md:text-[23px]">
                                        {item.value}
                                    </h3>
                                    <p className="mt-1 text-[12px] font-semibold text-slate-600 sm:text-[13px]">
                                        {item.desc}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section
                id="informasi"
                className="grid w-full grid-cols-2 gap-4 px-4 pb-8 pt-5 sm:px-6 md:grid-cols-2 lg:grid-cols-[1.04fr_1.04fr_1.04fr_0.92fr] xl:px-10 2xl:px-14"
            >
                <div className="col-span-2 min-h-[292px] rounded-[22px] border border-slate-200 bg-white p-5 shadow-md shadow-slate-200/70 lg:col-span-1">
                    <div className="mb-4 flex items-center justify-between gap-2">
                        <h2 className="text-[13px] font-extrabold uppercase text-[#064493] sm:text-[16px]">
                            Berita Terbaru
                        </h2>
                        <a
                            href="/informasi"
                            className="whitespace-nowrap text-[10px] font-extrabold text-[#0b73e8] sm:text-[11px]"
                        >
                            Lihat Semua
                        </a>
                    </div>

                    <div className="space-y-4">
                        {dynamicNews.map((item) => (
                            <a
                                href={item.url || "/informasi"}
                                key={item.id || item.title}
                                className="flex gap-4 border-b border-slate-100 pb-4 transition hover:opacity-85 last:border-b-0 last:pb-0"
                            >
                                <img
                                    src={
                                        item.image ||
                                        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=400&q=80"
                                    }
                                    alt={item.title}
                                    className="h-[72px] w-[86px] shrink-0 rounded-xl object-cover sm:h-[82px] sm:w-[96px]"
                                />

                                <div>
                                    <h3 className="line-clamp-2 text-[12.5px] font-extrabold leading-snug text-slate-950 sm:text-[13px]">
                                        {item.title}
                                    </h3>
                                    <p className="mt-2 text-[11px] font-semibold text-slate-500">
                                        {item.date || "-"}
                                    </p>
                                </div>
                            </a>
                        ))}
                    </div>
                </div>

                <div
                    id="galeri"
                    className="col-span-1 min-h-[292px] rounded-[22px] border border-slate-200 bg-white p-4 shadow-md shadow-slate-200/70 sm:p-5 lg:col-span-1"
                >
                    <div className="mb-4 flex items-center justify-between gap-2">
                        <h2 className="text-[13px] font-extrabold uppercase text-[#064493] sm:text-[16px]">
                            Galeri Kegiatan
                        </h2>
                        <a
                            href="/galeri"
                            className="whitespace-nowrap text-[10px] font-extrabold text-[#0b73e8] sm:text-[11px]"
                        >
                            Lihat Semua
                        </a>
                    </div>

                    <div className="grid grid-cols-2 gap-2 sm:gap-3">
                        {dynamicGallery.map((item, index) => (
                            <a
                                href="/galeri"
                                key={item.id || index}
                                className="group block overflow-hidden rounded-xl bg-slate-100"
                            >
                                <img
                                    src={
                                        item.image ||
                                        "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=500&q=80"
                                    }
                                    alt={item.title || `Galeri ${index + 1}`}
                                    className="h-[76px] w-full object-cover transition duration-500 group-hover:scale-105 sm:h-[96px] md:h-[92px]"
                                />
                            </a>
                        ))}
                    </div>
                </div>

                <div className="col-span-1 min-h-[292px] rounded-[22px] border border-slate-200 bg-white p-4 shadow-md shadow-slate-200/70 sm:p-5 lg:col-span-1">
                    <div className="mb-4 flex items-center justify-between gap-2">
                        <h2 className="text-[13px] font-extrabold uppercase text-[#064493] sm:text-[16px]">
                            Pengumuman
                        </h2>
                        <a
                            href="/informasi"
                            className="whitespace-nowrap text-[10px] font-extrabold text-[#0b73e8] sm:text-[11px]"
                        >
                            Lihat Semua
                        </a>
                    </div>

                    <div className="space-y-3">
                        {dynamicAnnouncements.map((item) => (
                            <a
                                href={item.url || "/informasi"}
                                key={item.id || item.title}
                                className="flex gap-3 border-b border-slate-100 pb-3 transition hover:opacity-85 last:border-b-0 last:pb-0"
                            >
                                <div className="flex h-[50px] w-[46px] shrink-0 flex-col items-center justify-center rounded-md bg-blue-50 text-[#064493] sm:h-[54px] sm:w-[52px]">
                                    <span className="text-[20px] font-extrabold leading-none sm:text-[23px]">
                                        {item.day || "-"}
                                    </span>
                                    <span className="mt-1 text-[9px] font-extrabold sm:text-[10px]">
                                        {item.month || "-"}
                                    </span>
                                </div>

                                <h3 className="pt-1 text-[11.5px] font-extrabold leading-snug text-slate-950 sm:text-[13px]">
                                    {item.title}
                                </h3>
                            </a>
                        ))}
                    </div>

                    <a
                        href="/informasi"
                        className="mt-4 inline-flex items-center gap-2 text-[11px] font-extrabold text-[#0b73e8] sm:text-[12px]"
                    >
                        Lihat Semua Pengumuman
                        <span>→</span>
                    </a>
                </div>

                <div
                    id="ppdb"
                    className="col-span-2 rounded-[22px] bg-gradient-to-r from-[#064493] to-[#0b63d8] p-5 text-white shadow-xl shadow-blue-200 lg:col-span-1 lg:min-h-[292px] lg:bg-gradient-to-br lg:p-6"
                >
                    <div className="grid gap-5 sm:grid-cols-[1.1fr_0.9fr] lg:grid-cols-1">
                        <div>
                            <h2 className="text-[28px] font-extrabold leading-tight">
                                {ppdbTitle}
                            </h2>

                            <p className="mt-1 text-[14px] font-semibold text-blue-100">
                                Penerimaan Peserta Didik Baru
                            </p>

                            <p className="mt-4 text-[13px] font-medium leading-6 text-white/90">
                                {ppdbDescription}
                            </p>
                        </div>

                        <div className="flex flex-col justify-end gap-4">
                            {ppdbSetting?.is_open === false ? (
                                <a
                                    href="/ppdb"
                                    className="flex h-[48px] items-center justify-center rounded-xl bg-white/20 px-4 text-[16px] font-extrabold text-white ring-1 ring-white/30 transition hover:bg-white/25"
                                >
                                    {ppdbButtonText}
                                </a>
                            ) : (
                                <a
                                    href={ppdbButtonUrl}
                                    className="flex h-[48px] items-center justify-center rounded-xl bg-white px-4 text-[16px] font-extrabold text-[#064493] shadow-lg transition hover:bg-blue-50"
                                >
                                    {ppdbButtonText}
                                </a>
                            )}

                            <div className="flex items-center gap-3 lg:mt-1">
                                <div className="flex h-9 w-9 items-center justify-center rounded-full border border-white/40">
                                    <svg
                                        className="h-5 w-5"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                    >
                                        <path d="M20.52 3.48A11.84 11.84 0 0 0 12.08 0C5.54 0 .22 5.32.22 11.86c0 2.09.55 4.14 1.6 5.94L0 24l6.35-1.66a11.83 11.83 0 0 0 5.73 1.46h.01c6.54 0 11.86-5.32 11.86-11.86a11.8 11.8 0 0 0-3.43-8.46ZM12.09 21.8h-.01a9.85 9.85 0 0 1-5.02-1.37l-.36-.22-3.77.99 1.01-3.67-.24-.38a9.8 9.8 0 0 1-1.5-5.29c0-5.44 4.43-9.86 9.88-9.86a9.8 9.8 0 0 1 6.97 2.89 9.78 9.78 0 0 1 2.88 6.97c0 5.44-4.43 9.94-9.84 9.94Zm5.4-7.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.95 1.17-.17.2-.35.22-.65.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.75-1.64-2.05-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.05 1.02-1.05 2.5 0 1.47 1.07 2.9 1.22 3.1.15.2 2.11 3.22 5.1 4.51.71.31 1.27.49 1.7.63.71.23 1.36.2 1.87.12.57-.08 1.76-.72 2.01-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35Z" />
                                    </svg>
                                </div>

                                <div>
                                    <p className="text-[12px] font-semibold text-blue-100">
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
            </section>
        </FrontendLayout>
    );
}