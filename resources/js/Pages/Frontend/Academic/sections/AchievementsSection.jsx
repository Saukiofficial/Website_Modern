import { useMemo, useState } from "react";
import Icon from "../components/Icon";

const fallbackAchievementStats = [
    {
        value: "128+",
        label: "Total Prestasi",
        icon: "trophy",
        iconWrap: "bg-blue-50 text-[#1f5bd3]",
    },
    {
        value: "42",
        label: "Akademik",
        icon: "book",
        iconWrap: "bg-emerald-50 text-emerald-500",
    },
    {
        value: "56",
        label: "Non-Akademik",
        icon: "award",
        iconWrap: "bg-fuchsia-50 text-fuchsia-500",
    },
    {
        value: "18",
        label: "Tingkat Nasional",
        icon: "graduate",
        iconWrap: "bg-orange-50 text-orange-500",
    },
];

const fallbackAchievementCategories = [
    "Semua Prestasi",
    "Akademik",
    "Olahraga",
    "Seni & Budaya",
    "Literasi",
    "Teknologi",
];

const fallbackAchievements = [
    {
        title: "Juara 1 Olimpiade Sains Kabupaten",
        category: "Akademik",
        level: "Kabupaten",
        year: "2026",
        student: "Tim Olimpiade Sains",
        description:
            "Meraih peringkat terbaik dalam kompetisi sains tingkat kabupaten melalui bidang matematika dan IPA.",
        image: "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?auto=format&fit=crop&w=1200&q=85",
        accent: "bg-blue-500",
    },
    {
        title: "Juara 2 Lomba Pidato Bahasa Indonesia",
        category: "Literasi",
        level: "Provinsi",
        year: "2026",
        student: "Nadia Putri",
        description:
            "Berhasil meraih prestasi dalam ajang pidato dengan tema kepemimpinan generasi muda.",
        image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1200&q=85",
        accent: "bg-emerald-500",
    },
    {
        title: "Juara 1 Turnamen Futsal Antar Sekolah",
        category: "Olahraga",
        level: "Kabupaten",
        year: "2025",
        student: "Tim Futsal Sekolah",
        description:
            "Tim futsal sekolah tampil unggul dengan sportivitas, strategi, dan kerja sama tim.",
        image: "https://images.unsplash.com/photo-1518604666860-9ed391f76460?auto=format&fit=crop&w=1200&q=85",
        accent: "bg-orange-500",
    },
    {
        title: "Finalis Karya Ilmiah Remaja",
        category: "Teknologi",
        level: "Provinsi",
        year: "2025",
        student: "Kelompok KIR",
        description:
            "Mengembangkan karya ilmiah berbasis inovasi teknologi dan solusi lingkungan sekolah.",
        image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=1200&q=85",
        accent: "bg-cyan-500",
    },
    {
        title: "Juara 1 Festival Tari Tradisional",
        category: "Seni & Budaya",
        level: "Kabupaten",
        year: "2025",
        student: "Tim Seni Tari",
        description:
            "Menampilkan kreasi tari tradisional dengan nilai budaya, kekompakan, dan ekspresi seni.",
        image: "https://images.unsplash.com/photo-1503095396549-807759245b35?auto=format&fit=crop&w=1200&q=85",
        accent: "bg-pink-500",
    },
    {
        title: "Medali Perak Kompetisi Coding Pelajar",
        category: "Teknologi",
        level: "Nasional",
        year: "2026",
        student: "Rafi Alfarizi",
        description:
            "Meraih medali perak dalam kompetisi pemrograman pelajar tingkat nasional.",
        image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1200&q=85",
        accent: "bg-indigo-500",
    },
];

const fallbackFeaturedAchievements = [
    {
        title: "Best Student Achievement",
        subtitle: "Penghargaan siswa berprestasi bidang akademik dan karakter.",
        value: "Gold",
        icon: "trophy",
    },
    {
        title: "Innovation Award",
        subtitle: "Penghargaan inovasi karya ilmiah dan teknologi pelajar.",
        value: "2026",
        icon: "award",
    },
    {
        title: "Sport Excellence",
        subtitle: "Capaian olahraga tingkat kabupaten dan provinsi.",
        value: "12+",
        icon: "activity",
    },
];

const accentList = [
    "bg-blue-500",
    "bg-emerald-500",
    "bg-orange-500",
    "bg-cyan-500",
    "bg-pink-500",
    "bg-indigo-500",
    "bg-purple-500",
    "bg-yellow-500",
];

function normalizeAchievements(achievements) {
    if (!Array.isArray(achievements) || achievements.length === 0) {
        return fallbackAchievements;
    }

    return achievements.map((item, index) => ({
        id: item.id || index,
        title: item.title || "Judul Prestasi",
        category: item.category || item.rank || "Akademik",
        level: item.level || "Sekolah",
        year: item.year || "2026",
        student: item.student_name || item.student || "Siswa Berprestasi",
        competition:
            item.competition_name || item.competition || "Kompetisi Siswa",
        description:
            item.description ||
            "Prestasi siswa dalam bidang akademik dan non-akademik.",
        image:
            item.image ||
            "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?auto=format&fit=crop&w=1200&q=85",
        accent: item.accent || accentList[index % accentList.length],
        rank: item.rank || "",
        is_featured: Boolean(item.is_featured),
    }));
}

function buildAchievementStats(items) {
    const total = items.length;

    const academicCount = items.filter((item) => {
        const category = String(item.category || "").toLowerCase();
        return (
            category.includes("akademik") ||
            category.includes("olimpiade") ||
            category.includes("literasi") ||
            category.includes("teknologi")
        );
    }).length;

    const nationalCount = items.filter((item) => {
        const level = String(item.level || "").toLowerCase();
        return level.includes("nasional");
    }).length;

    const nonAcademicCount = Math.max(total - academicCount, 0);

    return [
        {
            value: String(total || fallbackAchievementStats[0].value),
            label: "Total Prestasi",
            icon: "trophy",
            iconWrap: "bg-blue-50 text-[#1f5bd3]",
        },
        {
            value: String(academicCount || fallbackAchievementStats[1].value),
            label: "Akademik",
            icon: "book",
            iconWrap: "bg-emerald-50 text-emerald-500",
        },
        {
            value: String(
                nonAcademicCount || fallbackAchievementStats[2].value
            ),
            label: "Non-Akademik",
            icon: "award",
            iconWrap: "bg-fuchsia-50 text-fuchsia-500",
        },
        {
            value: String(nationalCount || fallbackAchievementStats[3].value),
            label: "Tingkat Nasional",
            icon: "graduate",
            iconWrap: "bg-orange-50 text-orange-500",
        },
    ];
}

function buildAchievementCategories(items) {
    const categories = items.map((item) => item.category).filter(Boolean);

    const merged = [
        ...fallbackAchievementCategories,
        ...Array.from(new Set(categories)),
    ];

    return Array.from(new Set(merged));
}

function buildFeaturedAchievements(items) {
    const featuredItems = items
        .filter((item) => item.is_featured)
        .slice(0, 3)
        .map((item, index) => ({
            title:
                index === 0
                    ? "Best Student Achievement"
                    : index === 1
                    ? "Innovation Award"
                    : "Sport Excellence",
            subtitle: item.title,
            value: item.rank || item.year || "Gold",
            icon: index === 0 ? "trophy" : index === 1 ? "award" : "activity",
        }));

    return featuredItems.length > 0
        ? featuredItems
        : fallbackFeaturedAchievements;
}

function AchievementCard({ item }) {
    return (
        <div className="overflow-hidden rounded-[22px] border border-slate-200 bg-white shadow-md shadow-slate-200/70 transition duration-300 hover:-translate-y-1 hover:shadow-xl">
            <div className="relative h-[165px] overflow-hidden bg-slate-100">
                <img
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover transition duration-500 hover:scale-105"
                    onError={(event) => {
                        event.currentTarget.src =
                            "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?auto=format&fit=crop&w=1200&q=85";
                    }}
                />

                <div className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1 text-[11px] font-medium text-[#0d58cf] shadow-sm">
                    {item.year}
                </div>

                <div
                    className={`absolute bottom-3 left-3 flex h-11 w-11 items-center justify-center rounded-2xl text-white shadow-lg ${item.accent}`}
                >
                    <Icon type="trophy" className="h-5 w-5" />
                </div>
            </div>

            <div className="p-5">
                <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-blue-50 px-3 py-1 text-[11px] font-medium text-[#0d58cf]">
                        {item.category}
                    </span>

                    <span className="rounded-full bg-slate-100 px-3 py-1 text-[11px] font-medium text-slate-500">
                        {item.level}
                    </span>

                    {item.rank ? (
                        <span className="rounded-full bg-[#f7b733]/20 px-3 py-1 text-[11px] font-medium text-[#b7791f]">
                            {item.rank}
                        </span>
                    ) : null}
                </div>

                <h3 className="mt-4 min-h-[48px] text-[18px] font-semibold leading-tight text-[#061b46]">
                    {item.title}
                </h3>

                <p className="mt-2 text-[12.5px] font-medium leading-6 text-slate-600">
                    {item.description}
                </p>

                <div className="mt-4 flex items-center gap-3 rounded-[16px] bg-slate-50 px-4 py-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#0d58cf] text-white">
                        <Icon type="users" className="h-4 w-4" />
                    </div>

                    <div>
                        <p className="text-[11px] font-medium text-slate-500">
                            Peraih Prestasi
                        </p>

                        <p className="text-[13px] font-semibold text-[#061b46]">
                            {item.student}
                        </p>

                        {item.competition ? (
                            <p className="mt-1 text-[11px] font-medium text-slate-500">
                                {item.competition}
                            </p>
                        ) : null}
                    </div>
                </div>
            </div>
        </div>
    );
}

function FeaturedCard({ item }) {
    return (
        <div className="rounded-[22px] border border-slate-200 bg-white p-5 shadow-md shadow-slate-200/70 transition hover:-translate-y-1 hover:shadow-xl">
            <div className="flex items-start justify-between gap-4">
                <div className="flex h-[52px] w-[52px] items-center justify-center rounded-2xl bg-blue-50 text-[#0d58cf]">
                    <Icon type={item.icon} className="h-6 w-6" />
                </div>

                <span className="rounded-full bg-[#f7b733]/20 px-4 py-2 text-[13px] font-semibold text-[#b7791f]">
                    {item.value}
                </span>
            </div>

            <h3 className="mt-5 text-[18px] font-semibold leading-tight text-[#061b46]">
                {item.title}
            </h3>

            <p className="mt-2 text-[13px] font-medium leading-6 text-slate-600">
                {item.subtitle}
            </p>
        </div>
    );
}

export default function AchievementsSection({ achievements = [] }) {
    const [activeCategory, setActiveCategory] = useState("Semua Prestasi");
    const [search, setSearch] = useState("");

    const achievementItems = useMemo(() => {
        return normalizeAchievements(achievements);
    }, [achievements]);

    const achievementStats = useMemo(() => {
        return buildAchievementStats(achievementItems);
    }, [achievementItems]);

    const achievementCategories = useMemo(() => {
        return buildAchievementCategories(achievementItems);
    }, [achievementItems]);

    const featuredAchievements = useMemo(() => {
        return buildFeaturedAchievements(achievementItems);
    }, [achievementItems]);

    const filteredAchievements = useMemo(() => {
        return achievementItems.filter((item) => {
            const matchCategory =
                activeCategory === "Semua Prestasi" ||
                item.category === activeCategory;

            const matchSearch =
                search.trim() === "" ||
                item.title.toLowerCase().includes(search.toLowerCase()) ||
                item.student.toLowerCase().includes(search.toLowerCase()) ||
                item.description.toLowerCase().includes(search.toLowerCase()) ||
                item.category.toLowerCase().includes(search.toLowerCase()) ||
                item.level.toLowerCase().includes(search.toLowerCase());

            return matchCategory && matchSearch;
        });
    }, [activeCategory, search, achievementItems]);

    return (
        <div className="space-y-6">
            <div className="grid gap-0 overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-xl shadow-slate-200/60 sm:grid-cols-2 lg:grid-cols-4">
                {achievementStats.map((item, index) => (
                    <div
                        key={item.label}
                        className={`flex items-center gap-4 p-5 sm:gap-5 sm:p-6 lg:p-7 ${
                            index !== achievementStats.length - 1
                                ? "border-b border-slate-200 sm:border-b-0 sm:border-r lg:border-b-0 lg:border-r"
                                : ""
                        } ${index === 1 ? "sm:border-r-0" : ""}`}
                    >
                        <div
                            className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl sm:h-14 sm:w-14 ${item.iconWrap}`}
                        >
                            <Icon type={item.icon} className="h-6 w-6 sm:h-7 sm:w-7" />
                        </div>

                        <div className="min-w-0">
                            <h3 className="text-[28px] font-semibold leading-none text-[#163678] sm:text-[32px]">
                                {item.value}
                            </h3>

                            <p className="mt-2 text-[12px] font-medium text-slate-600 sm:text-[12.5px]">
                                {item.label}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {featuredAchievements.map((item) => (
                    <FeaturedCard key={item.title} item={item} />
                ))}
            </div>

            <div className="rounded-[24px] border border-slate-200 bg-white p-4 shadow-xl shadow-slate-200/60">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex gap-2 overflow-x-auto pb-2 lg:pb-0 lg:gap-3">
                        {achievementCategories.map((category) => {
                            const isActive = activeCategory === category;

                            return (
                                <button
                                    key={category}
                                    type="button"
                                    onClick={() =>
                                        setActiveCategory(category)
                                    }
                                    className={`h-11 shrink-0 rounded-[12px] px-4 text-[11px] font-medium transition sm:px-5 sm:text-[12px] lg:text-[12px] ${
                                        isActive
                                            ? "bg-[#0d58cf] text-white shadow-lg shadow-blue-200"
                                            : "bg-slate-100 text-[#163678] hover:bg-blue-50"
                                    }`}
                                >
                                    {category}
                                </button>
                            );
                        })}
                    </div>

                    <div className="flex h-11 w-full items-center gap-3 rounded-[12px] border border-slate-200 bg-white px-4 lg:max-w-[330px]">
                        <input
                            type="text"
                            value={search}
                            onChange={(event) => setSearch(event.target.value)}
                            placeholder="Cari prestasi siswa..."
                            className="h-full w-full border-0 bg-transparent text-[12px] font-medium text-slate-700 outline-none placeholder:text-slate-400 focus:ring-0 sm:text-[13px]"
                        />

                        <Icon
                            type="search"
                            className="h-5 w-5 shrink-0 text-[#1f5bd3]"
                        />
                    </div>
                </div>

                <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {filteredAchievements.length > 0 ? (
                        filteredAchievements.map((item) => (
                            <AchievementCard
                                key={item.id || item.title}
                                item={item}
                            />
                        ))
                    ) : (
                        <div className="rounded-[18px] border border-dashed border-slate-200 bg-slate-50 p-8 text-center text-[13px] font-semibold text-slate-500 sm:col-span-2 lg:col-span-3">
                            Data prestasi tidak ditemukan.
                        </div>
                    )}
                </div>

                <div className="mt-6 flex justify-center rounded-[18px] bg-white py-1">
                    <a
                        href="#"
                        className="inline-flex min-h-[46px] items-center justify-center gap-3 rounded-[14px] bg-slate-50 px-8 text-[13px] font-semibold text-[#0d58cf] transition hover:bg-blue-50"
                    >
                        Lihat Semua Prestasi
                        <span>›</span>
                    </a>
                </div>
            </div>

            <div className="overflow-hidden rounded-[28px] bg-[#052b66] shadow-2xl shadow-blue-200">
                <div className="relative min-h-[240px] overflow-hidden">
                    <img
                        src="/frontend/images/achievement-banner.jpg"
                        alt="Prestasi Siswa"
                        className="absolute inset-0 h-full w-full object-cover"
                        onError={(event) => {
                            event.currentTarget.src =
                                "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?auto=format&fit=crop&w=1600&q=85";
                        }}
                    />

                    <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(4,35,83,0.98)_0%,rgba(5,48,115,0.96)_44%,rgba(7,74,170,0.62)_70%,rgba(7,74,170,0.10)_100%)]" />

                    <div className="relative z-10 grid min-h-[240px] items-center gap-5 px-5 py-6 sm:gap-6 sm:px-8 sm:py-7 lg:grid-cols-[92px_1fr] lg:px-10">
                        <div className="flex h-16 w-16 items-center justify-center rounded-[24px] bg-white text-[#f7b733] shadow-lg sm:h-20 sm:w-20">
                            <Icon type="trophy" className="h-8 w-8 sm:h-10 sm:w-10" />
                        </div>

                        <div>
                            <h2 className="text-[22px] font-semibold leading-tight tracking-[-0.04em] text-white sm:text-[28px] lg:text-[34px]">
                                Prestasi Adalah Hasil dari Proses Terbaik
                            </h2>

                            <p className="mt-2 max-w-[680px] text-[13px] font-medium leading-6 text-blue-100 sm:text-[14px] sm:leading-7 lg:text-[15px]">
                                Sekolah terus mendukung siswa untuk berkembang,
                                berkompetisi, dan meraih capaian terbaik dalam
                                bidang akademik maupun non-akademik.
                            </p>

                            <div className="mt-4 flex flex-col gap-3 sm:mt-5 sm:flex-row">
                                <a
                                    href="#"
                                    className="inline-flex min-h-[48px] items-center justify-center rounded-[12px] bg-[#f7b733] px-6 text-[13px] font-medium text-[#061b46] transition hover:bg-yellow-300 sm:min-h-[50px] sm:px-7"
                                >
                                    Kirim Prestasi Siswa →
                                </a>

                                <a
                                    href="#"
                                    className="inline-flex min-h-[48px] items-center justify-center rounded-[12px] border border-white/30 bg-white/10 px-6 text-[13px] font-medium text-white backdrop-blur-sm transition hover:bg-white/15 sm:min-h-[50px] sm:px-7"
                                >
                                    Hubungi Akademik
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}