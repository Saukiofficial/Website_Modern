import { useMemo, useState } from "react";
import Icon from "../components/Icon";

const achievementStats = [
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

const achievementCategories = [
    "Semua Prestasi",
    "Akademik",
    "Olahraga",
    "Seni & Budaya",
    "Literasi",
    "Teknologi",
];

const achievements = [
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

const featuredAchievements = [
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

function AchievementCard({ item }) {
    return (
        <div className="overflow-hidden rounded-[22px] border border-slate-200 bg-white shadow-md shadow-slate-200/70 transition duration-300 hover:-translate-y-1 hover:shadow-xl">
            <div className="relative h-[165px] overflow-hidden bg-slate-100">
                <img
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover transition duration-500 hover:scale-105"
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
                <div className="flex h-13 w-13 h-[52px] w-[52px] items-center justify-center rounded-2xl bg-blue-50 text-[#0d58cf]">
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

export default function AchievementsSection() {
    const [activeCategory, setActiveCategory] = useState("Semua Prestasi");
    const [search, setSearch] = useState("");

    const filteredAchievements = useMemo(() => {
        return achievements.filter((item) => {
            const matchCategory =
                activeCategory === "Semua Prestasi" ||
                item.category === activeCategory;

            const matchSearch =
                search.trim() === "" ||
                item.title.toLowerCase().includes(search.toLowerCase()) ||
                item.student.toLowerCase().includes(search.toLowerCase()) ||
                item.description.toLowerCase().includes(search.toLowerCase()) ||
                item.category.toLowerCase().includes(search.toLowerCase());

            return matchCategory && matchSearch;
        });
    }, [activeCategory, search]);

    return (
        <div className="space-y-6">
            <div className="grid gap-0 overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-xl shadow-slate-200/60 lg:grid-cols-4">
                {achievementStats.map((item, index) => (
                    <div
                        key={item.label}
                        className={`flex items-center gap-5 p-6 lg:p-7 ${
                            index !== achievementStats.length - 1
                                ? "border-b border-slate-200 lg:border-b-0 lg:border-r"
                                : ""
                        }`}
                    >
                        <div
                            className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl ${item.iconWrap}`}
                        >
                            <Icon type={item.icon} className="h-7 w-7" />
                        </div>

                        <div>
                            <h3 className="text-[32px] font-semibold leading-none text-[#163678]">
                                {item.value}
                            </h3>
                            <p className="mt-2 text-[12.5px] font-medium text-slate-600">
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
                <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
                    <div className="flex gap-3 overflow-x-auto pb-2 xl:pb-0">
                        {achievementCategories.map((category) => {
                            const isActive = activeCategory === category;

                            return (
                                <button
                                    key={category}
                                    type="button"
                                    onClick={() => setActiveCategory(category)}
                                    className={`h-11 shrink-0 rounded-[12px] px-5 text-[12px] font-medium transition ${
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

                    <div className="flex h-11 w-full items-center gap-3 rounded-[12px] border border-slate-200 bg-white px-4 xl:max-w-[330px]">
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Cari prestasi siswa..."
                            className="h-full w-full border-0 bg-transparent text-[13px] font-medium text-slate-700 outline-none placeholder:text-slate-400 focus:ring-0"
                        />
                        <Icon
                            type="search"
                            className="h-5 w-5 shrink-0 text-[#1f5bd3]"
                        />
                    </div>
                </div>

                <div className="mt-5 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                    {filteredAchievements.map((item) => (
                        <AchievementCard key={item.title} item={item} />
                    ))}
                </div>

                <div className="mt-6 flex justify-center rounded-[18px] bg-white py-1">
                    <a
                        href="#"
                        className="inline-flex min-h-[46px] items-center justify-center gap-3 rounded-[14px] bg-slate-50 px-8 text-[13px] font-medium text-[#0d58cf] transition hover:bg-blue-50"
                    >
                        Lihat Semua Prestasi
                        <span>›</span>
                    </a>
                </div>
            </div>

            <div className="grid gap-6 xl:grid-cols-[1fr_0.92fr]">
                <div className="rounded-[26px] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/60 sm:p-8">
                    <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-[#0d58cf]">
                        Timeline Prestasi
                    </p>

                    <h2 className="mt-2 text-[28px] font-semibold tracking-[-0.04em] text-[#061b46] sm:text-[36px]">
                        Perjalanan Prestasi Tahun Ini
                    </h2>

                    <div className="mt-7 space-y-5">
                        {achievements.slice(0, 4).map((item, index) => (
                            <div
                                key={item.title}
                                className="relative grid gap-4 rounded-[20px] border border-slate-200 bg-slate-50 p-4 sm:grid-cols-[64px_1fr_auto] sm:items-center"
                            >
                                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#0d58cf] text-[15px] font-medium text-white">
                                    {String(index + 1).padStart(2, "0")}
                                </div>

                                <div>
                                    <p className="text-[12px] font-medium text-[#0d58cf]">
                                        {item.category} • {item.level}
                                    </p>
                                    <h3 className="mt-1 text-[16px] font-semibold text-[#061b46]">
                                        {item.title}
                                    </h3>
                                    <p className="mt-1 text-[12.5px] font-medium text-slate-500">
                                        {item.student}
                                    </p>
                                </div>

                                <div className="rounded-full bg-white px-4 py-2 text-[13px] font-semibold text-[#163678] shadow-sm">
                                    {item.year}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="overflow-hidden rounded-[26px] bg-[#052b66] shadow-2xl shadow-blue-200">
                    <div className="relative min-h-full overflow-hidden">
                        <img
                            src="/frontend/images/achievement-side.jpg"
                            alt="Dokumentasi Prestasi"
                            className="absolute inset-0 h-full w-full object-cover"
                            onError={(event) => {
                                event.currentTarget.src =
                                    "https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=1200&q=85";
                            }}
                        />

                        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,43,102,0.25)_0%,rgba(5,43,102,0.92)_100%)]" />

                        <div className="relative z-10 flex min-h-[420px] flex-col justify-end p-6 text-white sm:p-8">
                            <div className="flex h-16 w-16 items-center justify-center rounded-[22px] bg-white text-[#f7b733]">
                                <Icon type="trophy" className="h-8 w-8" />
                            </div>

                            <h2 className="mt-5 text-[28px] font-semibold leading-tight tracking-[-0.04em] sm:text-[36px]">
                                Setiap Prestasi Adalah Cerita Perjuangan
                            </h2>

                            <p className="mt-3 text-[14px] font-medium leading-7 text-blue-100">
                                Sekolah terus mendukung siswa untuk berkembang,
                                berani berkompetisi, dan memberikan karya terbaik
                                dalam berbagai bidang.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="overflow-hidden rounded-[28px] bg-[#052b66] shadow-2xl shadow-blue-200">
                <div className="relative min-h-[250px] overflow-hidden">
                    <img
                        src="/frontend/images/achievement-banner.jpg"
                        alt="Prestasi Siswa"
                        className="absolute inset-0 h-full w-full object-cover"
                        onError={(event) => {
                            event.currentTarget.src =
                                "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1600&q=85";
                        }}
                    />

                    <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(4,35,83,0.98)_0%,rgba(5,48,115,0.96)_44%,rgba(7,74,170,0.62)_70%,rgba(7,74,170,0.10)_100%)]" />

                    <div className="relative z-10 grid min-h-[250px] items-center gap-6 px-6 py-7 sm:px-8 lg:grid-cols-[92px_1fr_auto] lg:px-10">
                        <div className="flex h-20 w-20 items-center justify-center rounded-[24px] bg-white text-[#f7b733] shadow-lg">
                            <Icon type="award" className="h-10 w-10" />
                        </div>

                        <div>
                            <h2 className="text-[26px] font-semibold leading-tight tracking-[-0.04em] text-white sm:text-[34px]">
                                Terus Berprestasi dan Menginspirasi!
                            </h2>

                            <p className="mt-2 max-w-[680px] text-[14px] font-medium leading-7 text-blue-100 sm:text-[15px]">
                                Prestasi siswa menjadi bukti bahwa kerja keras,
                                bimbingan guru, dan lingkungan sekolah yang
                                mendukung mampu melahirkan generasi unggul.
                            </p>

                            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                                <a
                                    href="#"
                                    className="inline-flex min-h-[50px] items-center justify-center rounded-[12px] bg-[#f7b733] px-7 text-[13px] font-medium text-[#061b46] transition hover:bg-yellow-300"
                                >
                                    Ajukan Prestasi Siswa →
                                </a>

                                <a
                                    href="#"
                                    className="inline-flex min-h-[50px] items-center justify-center rounded-[12px] border border-white/30 bg-white/10 px-7 text-[13px] font-medium text-white backdrop-blur-sm transition hover:bg-white/15"
                                >
                                    Hubungi Kesiswaan
                                </a>
                            </div>
                        </div>

                        <div className="hidden lg:block" />
                    </div>
                </div>
            </div>
        </div>
    );
}