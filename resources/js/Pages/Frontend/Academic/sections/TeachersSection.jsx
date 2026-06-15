import { useMemo, useState } from "react";
import Icon from "../components/Icon";

const fallbackTeacherStats = [
    {
        value: "45",
        label: "Total Guru",
        icon: "users",
        iconWrap: "bg-blue-50 text-[#1f5bd3]",
    },
    {
        value: "38",
        label: "Guru Bersertifikasi",
        icon: "award",
        iconWrap: "bg-blue-50 text-[#1f5bd3]",
    },
    {
        value: "12",
        label: "Guru S2/S3",
        icon: "graduate",
        iconWrap: "bg-blue-50 text-[#1f5bd3]",
    },
    {
        value: "25",
        label: "Penghargaan Diterima",
        icon: "trophy",
        iconWrap: "bg-blue-50 text-[#1f5bd3]",
    },
];

const fallbackTeachers = [
    {
        name: "Indah Permatasari, S.Pd.",
        subject: "Guru Matematika",
        education: "S1 Pendidikan Matematika",
        category: "Guru Mata Pelajaran",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=900&q=85",
    },
    {
        name: "Heri Setiawan, S.Pd.",
        subject: "Guru Fisika",
        education: "S1 Pendidikan Fisika",
        category: "Guru Mata Pelajaran",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=85",
    },
    {
        name: "Dewi Lestari, M.Pd.",
        subject: "Guru Bahasa Indonesia",
        education: "S2 Pendidikan Bahasa",
        category: "Guru Mata Pelajaran",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=900&q=85",
    },
    {
        name: "Rizky Pratama, S.Pd.",
        subject: "Guru Bahasa Inggris",
        education: "S1 Pendidikan Bahasa Inggris",
        category: "Guru Mata Pelajaran",
        image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=900&q=85",
    },
    {
        name: "Agung Nugroho, S.Pd.",
        subject: "Guru Kimia",
        education: "S1 Pendidikan Kimia",
        category: "Guru Mata Pelajaran",
        image: "https://images.unsplash.com/photo-1531891437562-4301cf35b7e4?auto=format&fit=crop&w=900&q=85",
    },
    {
        name: "Siti Aisyah, S.Pd.",
        subject: "Guru Biologi",
        education: "S1 Pendidikan Biologi",
        category: "Guru Mata Pelajaran",
        image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=900&q=85",
    },
    {
        name: "Yusuf Bachtiar, S.Pd.",
        subject: "Guru Informatika",
        education: "S1 Teknik Informatika",
        category: "Guru Mata Pelajaran",
        image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=900&q=85",
    },
    {
        name: "Rina Marlina, S.Pd.",
        subject: "Guru PPKn",
        education: "S1 Pendidikan Pancasila",
        category: "Guru Mata Pelajaran",
        image: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=900&q=85",
    },
];

const filters = [
    "Semua Guru",
    "Kepala Sekolah",
    "Wakil Kepala",
    "Guru Mata Pelajaran",
    "BK",
    "Tata Usaha",
];

const fallbackFeaturedTeachers = [
    {
        title: "Guru Inspiratif Tahun Ini",
        name: "Dewi Lestari, M.Pd.",
        subject: "Guru Bahasa Indonesia",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=85",
    },
    {
        title: "Pembina Olimpiade Terbaik",
        name: "Heri Setiawan, S.Pd.",
        subject: "Guru Fisika",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=85",
    },
    {
        title: "Guru Inovatif Digital Learning",
        name: "Indah Permatasari, S.Pd.",
        subject: "Guru Matematika",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=600&q=85",
    },
];

function getTeacherCategory(item) {
    const text = `${item.position || ""} ${item.subject || ""}`.toLowerCase();

    if (text.includes("kepala sekolah")) return "Kepala Sekolah";
    if (text.includes("waka") || text.includes("wakil")) return "Wakil Kepala";
    if (text.includes("bk") || text.includes("bimbingan")) return "BK";
    if (text.includes("tata usaha") || text.includes("tu")) return "Tata Usaha";

    return item.category || "Guru Mata Pelajaran";
}

function normalizeTeachers(teachers) {
    if (!Array.isArray(teachers) || teachers.length === 0) {
        return fallbackTeachers;
    }

    return teachers.map((item, index) => ({
        id: item.id || index,
        name: item.name || "Nama Guru",
        subject: item.position || item.subject || "Guru Mata Pelajaran",
        education: item.education || "Pendidikan belum diisi",
        category: getTeacherCategory(item),
        image:
            item.image ||
            "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=900&q=85",
        email: item.email || "#",
        is_featured: Boolean(item.is_featured),
        description: item.description || "",
    }));
}

function buildTeacherStats(items) {
    const total = items.length;
    const graduateCount = items.filter((item) => {
        const education = String(item.education || "").toLowerCase();
        return education.includes("s2") || education.includes("s3");
    }).length;

    return [
        {
            value: String(total || fallbackTeacherStats[0].value),
            label: "Total Guru",
            icon: "users",
            iconWrap: "bg-blue-50 text-[#1f5bd3]",
        },
        {
            value: String(total || fallbackTeacherStats[1].value),
            label: "Guru Aktif",
            icon: "award",
            iconWrap: "bg-blue-50 text-[#1f5bd3]",
        },
        {
            value: String(graduateCount || fallbackTeacherStats[2].value),
            label: "Guru S2/S3",
            icon: "graduate",
            iconWrap: "bg-blue-50 text-[#1f5bd3]",
        },
        {
            value: String(
                items.filter((item) => item.is_featured).length ||
                    fallbackTeacherStats[3].value
            ),
            label: "Guru Berprestasi",
            icon: "trophy",
            iconWrap: "bg-blue-50 text-[#1f5bd3]",
        },
    ];
}

function TeacherCard({ teacher }) {
    return (
        <div className="overflow-hidden rounded-[16px] border border-slate-200 bg-white shadow-md shadow-slate-200/70 transition duration-300 hover:-translate-y-1 hover:shadow-xl">
            <div className="h-[190px] overflow-hidden bg-slate-100">
                <img
                    src={teacher.image}
                    alt={teacher.name}
                    className="h-full w-full object-cover object-center transition duration-500 hover:scale-105"
                    onError={(event) => {
                        event.currentTarget.src =
                            "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=900&q=85";
                    }}
                />
            </div>

            <div className="p-4">
                <h3 className="text-[14px] font-semibold leading-tight text-[#061b46]">
                    {teacher.name}
                </h3>

                <p className="mt-1 text-[12px] font-medium text-[#0d58cf]">
                    {teacher.subject}
                </p>

                <p className="mt-1 text-[11.5px] font-medium text-slate-500">
                    {teacher.education}
                </p>

                <div className="mt-4 flex items-center gap-4 text-[#0d58cf]">
                    <a
                        href={teacher.email && teacher.email !== "#" ? `mailto:${teacher.email}` : "#"}
                        className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-50 transition hover:bg-blue-100"
                        aria-label="Email"
                    >
                        <Icon type="mail" className="h-4 w-4" />
                    </a>

                    <a
                        href="#"
                        className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-50 text-[12px] font-medium transition hover:bg-blue-100"
                        aria-label="LinkedIn"
                    >
                        in
                    </a>
                </div>
            </div>
        </div>
    );
}

function FeaturedTeacherCard({ item }) {
    return (
        <div className="grid min-w-[280px] grid-cols-[72px_1fr] items-center gap-4 rounded-[18px] border border-slate-200 bg-white p-4 shadow-sm sm:min-w-0">
            <div className="relative">
                <div className="absolute -left-2 -top-2 flex h-8 w-8 items-center justify-center rounded-full bg-[#f7b733] text-[#061b46] shadow-md">
                    <Icon type="award" className="h-4 w-4" />
                </div>

                <img
                    src={item.image}
                    alt={item.name}
                    className="h-[82px] w-[82px] rounded-[16px] object-cover"
                    onError={(event) => {
                        event.currentTarget.src =
                            "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=85";
                    }}
                />
            </div>

            <div>
                <p className="text-[12px] font-semibold leading-5 text-[#0d58cf]">
                    {item.title}
                </p>

                <h3 className="mt-1 text-[14px] font-semibold leading-tight text-[#061b46]">
                    {item.name}
                </h3>

                <p className="mt-1 text-[11.5px] font-medium text-slate-500">
                    {item.subject}
                </p>
            </div>
        </div>
    );
}

export default function TeachersSection({ teachers = [] }) {
    const [activeFilter, setActiveFilter] = useState("Semua Guru");
    const [search, setSearch] = useState("");

    const teacherItems = useMemo(() => {
        return normalizeTeachers(teachers);
    }, [teachers]);

    const teacherStats = useMemo(() => {
        return buildTeacherStats(teacherItems);
    }, [teacherItems]);

    const principalTeacher = useMemo(() => {
        return (
            teacherItems.find((item) => item.category === "Kepala Sekolah") ||
            teacherItems[0] ||
            fallbackTeachers[0]
        );
    }, [teacherItems]);

    const featuredTeachers = useMemo(() => {
        const featured = teacherItems
            .filter((item) => item.is_featured)
            .slice(0, 3)
            .map((item, index) => ({
                title:
                    index === 0
                        ? "Guru Inspiratif Tahun Ini"
                        : index === 1
                        ? "Pembina Akademik Terbaik"
                        : "Guru Inovatif Digital Learning",
                name: item.name,
                subject: item.subject,
                image: item.image,
            }));

        return featured.length > 0 ? featured : fallbackFeaturedTeachers;
    }, [teacherItems]);

    const filteredTeachers = useMemo(() => {
        return teacherItems.filter((teacher) => {
            const matchFilter =
                activeFilter === "Semua Guru" ||
                teacher.category === activeFilter;

            const matchSearch =
                search.trim() === "" ||
                teacher.name.toLowerCase().includes(search.toLowerCase()) ||
                teacher.subject.toLowerCase().includes(search.toLowerCase()) ||
                teacher.education.toLowerCase().includes(search.toLowerCase());

            return matchFilter && matchSearch;
        });
    }, [activeFilter, search, teacherItems]);

    return (
        <div className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {teacherStats.map((item) => (
                    <div
                        key={item.label}
                        className="rounded-[18px] border border-slate-200 bg-white p-5 shadow-lg shadow-slate-200/60"
                    >
                        <div className="flex items-center gap-4">
                            <div
                                className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl ${item.iconWrap}`}
                            >
                                <Icon type={item.icon} className="h-7 w-7" />
                            </div>

                            <div>
                                <h3 className="text-[30px] font-semibold leading-none text-[#163678]">
                                    {item.value}
                                </h3>

                                <p className="mt-2 text-[12px] font-medium leading-5 text-slate-600">
                                    {item.label}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="overflow-hidden rounded-[22px] border border-slate-200 bg-white shadow-xl shadow-slate-200/70">
                <div className="grid gap-0 md:grid-cols-[240px_1fr] lg:grid-cols-[250px_1fr]">
                    <div className="h-[240px] overflow-hidden bg-blue-50 sm:h-[280px] md:h-full">
                        <img
                            src={principalTeacher.image}
                            alt={principalTeacher.name}
                            className="h-full w-full object-cover object-center"
                            onError={(event) => {
                                event.currentTarget.src =
                                    "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=900&q=85";
                            }}
                        />
                    </div>

                    <div className="p-6 sm:p-7">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#0d58cf]">
                            Kepala Sekolah
                        </p>

                        <h2 className="mt-3 text-[24px] font-semibold leading-tight tracking-[-0.035em] text-[#061b46] sm:text-[28px] lg:text-[32px]">
                            {principalTeacher.name}
                        </h2>

                        <div className="mt-5 h-[3px] w-16 rounded-full bg-[#f7b733]" />

                        <h3 className="mt-6 text-[15px] font-semibold text-[#061b46]">
                            Sambutan Kepala Sekolah
                        </h3>

                        <p className="mt-2 max-w-4xl text-[13.5px] font-medium leading-7 text-slate-600 sm:text-[14px]">
                            {principalTeacher.description ||
                                "Kami percaya bahwa pendidikan yang berkualitas lahir dari dedikasi guru yang luar biasa. Dengan semangat kolaborasi dan inovasi, kami berkomitmen membentuk generasi yang cerdas, berkarakter, dan siap menghadapi tantangan global."}
                        </p>

                        <div className="mt-6 flex flex-col gap-3 text-[12px] font-medium text-slate-500 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
                            <span className="inline-flex min-w-0 items-center gap-2 break-all">
                                <Icon
                                    type="mail"
                                    className="h-4 w-4 shrink-0 text-[#0d58cf]"
                                />
                                {principalTeacher.email || "akademik@sman1cerdas.sch.id"}
                            </span>

                            <span className="inline-flex min-w-0 items-center gap-2 break-all">
                                <Icon
                                    type="book"
                                    className="h-4 w-4 shrink-0 text-[#0d58cf]"
                                />
                                {principalTeacher.education}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="rounded-[22px] border border-slate-200 bg-white p-4 shadow-lg shadow-slate-200/60">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex gap-2 overflow-x-auto pb-2 lg:gap-3 lg:pb-0">
                        {filters.map((filter) => {
                            const isActive = activeFilter === filter;

                            return (
                                <button
                                    key={filter}
                                    type="button"
                                    onClick={() => setActiveFilter(filter)}
                                    className={`h-11 shrink-0 rounded-[12px] px-4 text-[11px] font-medium transition sm:px-5 sm:text-[12px] ${
                                        isActive
                                            ? "bg-[#0d58cf] text-white shadow-lg shadow-blue-200"
                                            : "bg-slate-100 text-[#163678] hover:bg-blue-50"
                                    }`}
                                >
                                    {filter}
                                </button>
                            );
                        })}
                    </div>

                    <div className="flex h-11 w-full items-center gap-3 rounded-[12px] border border-slate-200 bg-white px-4 lg:max-w-[360px]">
                        <input
                            type="text"
                            value={search}
                            onChange={(event) => setSearch(event.target.value)}
                            placeholder="Cari nama guru, mata pelajaran, atau keahlian..."
                            className="h-full w-full border-0 bg-transparent text-[13px] font-medium text-slate-700 outline-none placeholder:text-slate-400 focus:ring-0"
                        />
                        <Icon
                            type="search"
                            className="h-5 w-5 shrink-0 text-[#1f5bd3]"
                        />
                    </div>
                </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filteredTeachers.length > 0 ? (
                    filteredTeachers.map((teacher) => (
                        <TeacherCard
                            key={teacher.id || teacher.name}
                            teacher={teacher}
                        />
                    ))
                ) : (
                    <div className="rounded-[18px] border border-dashed border-slate-200 bg-white p-8 text-center text-[13px] font-semibold text-slate-500 sm:col-span-2 lg:col-span-3 xl:col-span-4">
                        Data guru tidak ditemukan.
                    </div>
                )}
            </div>

            <div className="flex justify-center">
                <a
                    href="#"
                    className="inline-flex min-h-[46px] items-center justify-center gap-3 rounded-[14px] border border-slate-200 bg-white px-8 text-[13px] font-medium text-[#0d58cf] shadow-sm transition hover:bg-blue-50"
                >
                    Lihat Semua Guru
                    <span>→</span>
                </a>
            </div>

            <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-xl shadow-slate-200/60 sm:p-6">
                <div className="mb-5 flex items-center justify-between gap-4">
                    <h2 className="text-[22px] font-semibold tracking-[-0.03em] text-[#061b46]">
                        Guru Berprestasi
                    </h2>

                    <div className="hidden gap-2 sm:flex">
                        <button
                            type="button"
                            className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-[#0d58cf] transition hover:bg-blue-50"
                        >
                            ‹
                        </button>
                        <button
                            type="button"
                            className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-[#0d58cf] transition hover:bg-blue-50"
                        >
                            ›
                        </button>
                    </div>
                </div>

                <div className="grid gap-4 overflow-x-auto pb-2 sm:grid-cols-3 sm:overflow-visible sm:pb-0">
                    {featuredTeachers.map((item) => (
                        <FeaturedTeacherCard key={item.name} item={item} />
                    ))}
                </div>
            </div>

            <div className="overflow-hidden rounded-[24px] bg-[#052b66] shadow-2xl shadow-blue-200">
                <div className="relative min-h-[190px] overflow-hidden sm:min-h-[150px]">
                    <img
                        src="/frontend/images/teachers-banner.jpg"
                        alt="Guru Profesional"
                        className="absolute inset-0 h-full w-full object-cover opacity-35"
                        onError={(event) => {
                            event.currentTarget.src =
                                "https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=1600&q=85";
                        }}
                    />

                    <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(4,35,83,0.98)_0%,rgba(5,48,115,0.96)_58%,rgba(7,74,170,0.70)_100%)]" />

                    <div className="relative z-10 grid min-h-[150px] items-center gap-5 px-6 py-6 sm:px-8 lg:grid-cols-[72px_1fr_auto] lg:px-10">
                        <div className="flex h-16 w-16 items-center justify-center rounded-[22px] bg-white/10 text-[#f7b733] ring-1 ring-white/15">
                            <Icon type="graduate" className="h-9 w-9" />
                        </div>

                        <div>
                            <h2 className="text-[24px] font-semibold leading-tight tracking-[-0.04em] text-white sm:text-[30px]">
                                Bersama Guru Profesional
                            </h2>

                            <p className="mt-1 text-[14px] font-medium text-blue-100 sm:text-[16px]">
                                Membangun Generasi Unggul dan Berkarakter
                            </p>
                        </div>

                        <div className="flex flex-col gap-3 sm:flex-row">
                            <a
                                href="#"
                                className="inline-flex min-h-[46px] items-center justify-center rounded-[12px] bg-[#f7b733] px-6 text-[13px] font-medium text-[#061b46] transition hover:bg-yellow-300"
                            >
                                Hubungi Sekolah →
                            </a>

                            <a
                                href="#"
                                className="inline-flex min-h-[46px] items-center justify-center rounded-[12px] border border-white/30 bg-white/10 px-6 text-[13px] font-medium text-white backdrop-blur-sm transition hover:bg-white/15"
                            >
                                Lihat Program Akademik
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}