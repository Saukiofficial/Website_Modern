import { useMemo, useState } from "react";
import Icon from "../components/Icon";

const fallbackExtracurricularData = [
    {
        title: "Pramuka",
        category: "Kepemimpinan",
        students: "120+",
        description:
            "Membentuk karakter, disiplin, kepemimpinan, dan kemandirian.",
        image: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=1200&q=85",
        accent: "bg-green-500",
    },
    {
        title: "Paskibra",
        category: "Kepemimpinan",
        students: "85+",
        description:
            "Melatih kedisiplinan, tanggung jawab, dan jiwa nasionalisme.",
        image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=1200&q=85",
        accent: "bg-purple-500",
    },
    {
        title: "Futsal",
        category: "Olahraga",
        students: "75+",
        description:
            "Mengembangkan bakat olahraga, sportivitas, dan kerja sama tim.",
        image: "https://images.unsplash.com/photo-1518604666860-9ed391f76460?auto=format&fit=crop&w=1200&q=85",
        accent: "bg-orange-500",
    },
    {
        title: "Karya Ilmiah Remaja",
        category: "Akademik",
        students: "60+",
        description:
            "Mendorong siswa melakukan riset, eksperimen, dan penulisan ilmiah.",
        image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=1200&q=85",
        accent: "bg-cyan-500",
    },
    {
        title: "Seni Tari",
        category: "Seni & Budaya",
        students: "55+",
        description:
            "Mengembangkan kreativitas, ekspresi, dan kecintaan terhadap budaya.",
        image: "https://images.unsplash.com/photo-1503095396549-807759245b35?auto=format&fit=crop&w=1200&q=85",
        accent: "bg-pink-500",
    },
    {
        title: "Basket",
        category: "Olahraga",
        students: "70+",
        description: "Melatih fisik, strategi permainan, dan jiwa kompetitif.",
        image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=1200&q=85",
        accent: "bg-lime-500",
    },
    {
        title: "Robotik & Coding",
        category: "Teknologi",
        students: "40+",
        description: "Mengasah kemampuan teknologi, logika, dan inovasi digital.",
        image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1200&q=85",
        accent: "bg-sky-500",
    },
    {
        title: "Paduan Suara",
        category: "Seni & Budaya",
        students: "50+",
        description: "Mengembangkan vokal, harmoni, dan penampilan musik.",
        image: "https://images.unsplash.com/photo-1507838153414-b4b713384a76?auto=format&fit=crop&w=1200&q=85",
        accent: "bg-yellow-500",
    },
];

const fallbackStatItems = [
    {
        value: "45",
        label: "Total Ekstrakurikuler",
        icon: "users",
        iconWrap: "bg-blue-50 text-[#1f5bd3]",
    },
    {
        value: "620+",
        label: "Siswa Aktif",
        icon: "activity",
        iconWrap: "bg-emerald-50 text-emerald-500",
    },
    {
        value: "85+",
        label: "Prestasi Diraih",
        icon: "trophy",
        iconWrap: "bg-fuchsia-50 text-fuchsia-500",
    },
    {
        value: "12",
        label: "Kategori Kegiatan",
        icon: "calendar",
        iconWrap: "bg-orange-50 text-orange-500",
    },
];

const accentList = [
    "bg-green-500",
    "bg-purple-500",
    "bg-orange-500",
    "bg-cyan-500",
    "bg-pink-500",
    "bg-lime-500",
    "bg-sky-500",
    "bg-yellow-500",
];

function normalizeExtracurriculars(extracurriculars) {
    if (!Array.isArray(extracurriculars) || extracurriculars.length === 0) {
        return fallbackExtracurricularData;
    }

    return extracurriculars.map((item, index) => ({
        id: item.id || index,
        title: item.name || item.title || "Nama Ekstrakurikuler",
        category: item.category || "Ekstrakurikuler",
        students: item.students || "Aktif",
        description:
            item.description ||
            "Kegiatan pengembangan minat, bakat, dan karakter siswa.",
        image:
            item.image ||
            "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=85",
        accent: item.accent || accentList[index % accentList.length],
        coach_name: item.coach_name || null,
        schedule: item.schedule || null,
        location: item.location || null,
    }));
}

function buildStatItems(items) {
    const categories = Array.from(
        new Set(items.map((item) => item.category).filter(Boolean))
    );

    return [
        {
            value: String(items.length || fallbackStatItems[0].value),
            label: "Total Ekstrakurikuler",
            icon: "users",
            iconWrap: "bg-blue-50 text-[#1f5bd3]",
        },
        {
            value: "Aktif",
            label: "Siswa Aktif",
            icon: "activity",
            iconWrap: "bg-emerald-50 text-emerald-500",
        },
        {
            value: "Terbuka",
            label: "Pendaftaran",
            icon: "trophy",
            iconWrap: "bg-fuchsia-50 text-fuchsia-500",
        },
        {
            value: String(categories.length || fallbackStatItems[3].value),
            label: "Kategori Kegiatan",
            icon: "calendar",
            iconWrap: "bg-orange-50 text-orange-500",
        },
    ];
}

function buildCategoryList(items) {
    const categories = items.map((item) => item.category).filter(Boolean);

    return ["Semua Kategori", ...Array.from(new Set(categories))];
}

function ExtracurricularCard({ item }) {
    return (
        <div className="overflow-hidden rounded-[18px] border border-slate-200 bg-white shadow-md shadow-slate-200/70 transition duration-300 hover:-translate-y-1 hover:shadow-xl">
            <div className="relative h-[142px] overflow-hidden bg-slate-100">
                <img
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover transition duration-500 hover:scale-105"
                    onError={(event) => {
                        event.currentTarget.src =
                            "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=85";
                    }}
                />

                <div
                    className={`absolute bottom-3 left-3 flex h-11 w-11 items-center justify-center rounded-2xl text-white shadow-lg ${item.accent}`}
                >
                    <Icon type="award" className="h-5 w-5" />
                </div>
            </div>

            <div className="p-4">
                <h3 className="text-[17px] font-semibold leading-tight text-[#061b46]">
                    {item.title}
                </h3>

                <p className="mt-2 min-h-[48px] text-[12.5px] font-medium leading-6 text-slate-600">
                    {item.description}
                </p>

                <div className="mt-3 flex flex-wrap items-center gap-4 text-[12px] font-bold text-[#1f5bd3]">
                    <div className="flex items-center gap-2">
                        <Icon type="users" className="h-4 w-4" />
                        <span>{item.students}</span>
                    </div>

                    <div className="flex items-center gap-2 text-slate-500">
                        <Icon type="activity" className="h-4 w-4" />
                        <span>Siswa Aktif</span>
                    </div>
                </div>

                {(item.coach_name || item.schedule || item.location) && (
                    <div className="mt-4 space-y-2 rounded-[14px] bg-slate-50 p-3 text-[11.5px] font-semibold text-slate-500">
                        {item.coach_name ? (
                            <p>🧑‍🏫 Pembina: {item.coach_name}</p>
                        ) : null}

                        {item.schedule ? <p>📅 {item.schedule}</p> : null}

                        {item.location ? <p>📍 {item.location}</p> : null}
                    </div>
                )}
            </div>
        </div>
    );
}

export default function ExtracurricularSection({ extracurriculars = [] }) {
    const [activeCategory, setActiveCategory] = useState("Semua Kategori");
    const [search, setSearch] = useState("");

    const extracurricularItems = useMemo(() => {
        return normalizeExtracurriculars(extracurriculars);
    }, [extracurriculars]);

    const statItems = useMemo(() => {
        return buildStatItems(extracurricularItems);
    }, [extracurricularItems]);

    const categoryList = useMemo(() => {
        return buildCategoryList(extracurricularItems);
    }, [extracurricularItems]);

    const filteredItems = useMemo(() => {
        return extracurricularItems.filter((item) => {
            const matchCategory =
                activeCategory === "Semua Kategori" ||
                item.category === activeCategory;

            const matchSearch =
                search.trim() === "" ||
                item.title.toLowerCase().includes(search.toLowerCase()) ||
                item.description
                    .toLowerCase()
                    .includes(search.toLowerCase()) ||
                item.category.toLowerCase().includes(search.toLowerCase());

            return matchCategory && matchSearch;
        });
    }, [activeCategory, search, extracurricularItems]);

    return (
        <div className="space-y-6">
            <div className="grid gap-0 overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-xl shadow-slate-200/60 lg:grid-cols-4">
                {statItems.map((item, index) => (
                    <div
                        key={item.label}
                        className={`flex items-center gap-5 p-6 lg:p-7 ${
                            index !== statItems.length - 1
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
                            <p className="mt-2 text-[12.5px] font-bold text-slate-600">
                                {item.label}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="rounded-[24px] border border-slate-200 bg-white p-4 shadow-xl shadow-slate-200/60">
                <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
                    <div className="flex gap-3 overflow-x-auto pb-2 xl:pb-0">
                        {categoryList.map((category) => {
                            const isActive = activeCategory === category;

                            return (
                                <button
                                    key={category}
                                    type="button"
                                    onClick={() => setActiveCategory(category)}
                                    className={`h-11 shrink-0 rounded-[12px] px-5 text-[12px] font-semibold transition ${
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
                            onChange={(event) => setSearch(event.target.value)}
                            placeholder="Cari ekstrakurikuler..."
                            className="h-full w-full border-0 bg-transparent text-[13px] font-medium text-slate-700 outline-none placeholder:text-slate-400 focus:ring-0"
                        />
                        <Icon
                            type="search"
                            className="h-5 w-5 shrink-0 text-[#1f5bd3]"
                        />
                    </div>
                </div>

                <div className="mt-5 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
                    {filteredItems.length > 0 ? (
                        filteredItems.map((item) => (
                            <ExtracurricularCard
                                key={item.id || item.title}
                                item={item}
                            />
                        ))
                    ) : (
                        <div className="rounded-[18px] border border-dashed border-slate-200 bg-slate-50 p-8 text-center text-[13px] font-semibold text-slate-500 sm:col-span-2 xl:col-span-4">
                            Data ekstrakurikuler tidak ditemukan.
                        </div>
                    )}
                </div>

                <div className="mt-6 flex justify-center rounded-[18px] bg-white py-1">
                    <a
                        href="#"
                        className="inline-flex min-h-[46px] items-center justify-center gap-3 rounded-[14px] bg-slate-50 px-8 text-[13px] font-semibold text-[#0d58cf] transition hover:bg-blue-50"
                    >
                        Lihat Semua Ekstrakurikuler
                        <span>›</span>
                    </a>
                </div>
            </div>

            <div className="overflow-hidden rounded-[28px] bg-[#052b66] shadow-2xl shadow-blue-200">
                <div className="relative min-h-[250px] overflow-hidden">
                    <img
                        src="/frontend/images/extracurricular-banner.jpg"
                        alt="Bergabung Ekstrakurikuler"
                        className="absolute inset-0 h-full w-full object-cover"
                        onError={(event) => {
                            event.currentTarget.src =
                                "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1600&q=85";
                        }}
                    />

                    <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(4,35,83,0.98)_0%,rgba(5,48,115,0.96)_44%,rgba(7,74,170,0.62)_70%,rgba(7,74,170,0.10)_100%)]" />

                    <div className="relative z-10 grid min-h-[250px] items-center gap-6 px-6 py-7 sm:px-8 lg:grid-cols-[92px_1fr_auto] lg:px-10">
                        <div className="flex h-20 w-20 items-center justify-center rounded-[24px] bg-white text-[#f7b733] shadow-lg">
                            <Icon type="trophy" className="h-10 w-10" />
                        </div>

                        <div>
                            <h2 className="text-[26px] font-semibold leading-tight tracking-[-0.04em] text-white sm:text-[34px]">
                                Bergabung & Kembangkan Dirimu!
                            </h2>

                            <p className="mt-2 max-w-[680px] text-[14px] font-medium leading-7 text-blue-100 sm:text-[15px]">
                                Temukan minatmu, kembangkan bakatmu, dan
                                jadilah bagian dari komunitas ekstrakurikuler
                                yang inspiratif.
                            </p>

                            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                                <a
                                    href="#"
                                    className="inline-flex min-h-[50px] items-center justify-center rounded-[12px] bg-[#f7b733] px-7 text-[13px] font-semibold text-[#061b46] transition hover:bg-yellow-300"
                                >
                                    Daftar Ekstrakurikuler →
                                </a>

                                <a
                                    href="#"
                                    className="inline-flex min-h-[50px] items-center justify-center rounded-[12px] border border-white/30 bg-white/10 px-7 text-[13px] font-semibold text-white backdrop-blur-sm transition hover:bg-white/15"
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