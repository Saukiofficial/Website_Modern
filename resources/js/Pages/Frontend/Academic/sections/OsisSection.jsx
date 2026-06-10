import { useMemo } from "react";
import Icon from "../components/Icon";

const fallbackOsisStats = [
    {
        value: "36",
        label: "Pengurus Aktif",
        icon: "users",
        iconWrap: "bg-blue-50 text-[#1f5bd3]",
    },
    {
        value: "8",
        label: "Bidang Kerja",
        icon: "organization",
        iconWrap: "bg-emerald-50 text-emerald-500",
    },
    {
        value: "24+",
        label: "Program Tahunan",
        icon: "activity",
        iconWrap: "bg-fuchsia-50 text-fuchsia-500",
    },
    {
        value: "12",
        label: "Kegiatan Besar",
        icon: "calendar",
        iconWrap: "bg-orange-50 text-orange-500",
    },
];

const fallbackOsisLeaders = [
    {
        name: "Andi Maulana",
        role: "Ketua OSIS",
        className: "XI IPA 1",
        image: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&w=900&q=85",
        color: "from-[#0d58cf] to-[#052b66]",
    },
    {
        name: "Nadia Putri",
        role: "Wakil Ketua OSIS",
        className: "XI IPS 1",
        image: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=900&q=85",
        color: "from-[#0b73e8] to-[#064493]",
    },
];

const fallbackOsisMembers = [
    {
        name: "Rizky Firmansyah",
        role: "Sekretaris 1",
        className: "X IPA 2",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=700&q=85",
    },
    {
        name: "Salsa Amelia",
        role: "Sekretaris 2",
        className: "X IPS 2",
        image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=700&q=85",
    },
    {
        name: "Fadli Ramadhan",
        role: "Bendahara 1",
        className: "XI IPA 3",
        image: "https://images.unsplash.com/photo-1531891437562-4301cf35b7e4?auto=format&fit=crop&w=700&q=85",
    },
    {
        name: "Aulia Rahma",
        role: "Bendahara 2",
        className: "XI IPS 2",
        image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=700&q=85",
    },
];

const divisions = [
    {
        title: "Keimanan & Ketakwaan",
        description:
            "Mengelola kegiatan keagamaan, pembinaan akhlak, dan program karakter siswa.",
        icon: "award",
    },
    {
        title: "Kedisiplinan",
        description:
            "Membantu membangun budaya tertib, tanggung jawab, dan etika sekolah.",
        icon: "activity",
    },
    {
        title: "Minat & Bakat",
        description:
            "Mendorong siswa aktif dalam seni, olahraga, akademik, dan kreativitas.",
        icon: "trophy",
    },
    {
        title: "Humas & Dokumentasi",
        description:
            "Mengelola publikasi kegiatan siswa, dokumentasi, dan komunikasi internal.",
        icon: "file",
    },
];

const programs = [
    {
        title: "Class Meeting",
        date: "Desember 2026",
        type: "Kegiatan Siswa",
    },
    {
        title: "Lomba Kreativitas Siswa",
        date: "Oktober 2026",
        type: "Kompetisi",
    },
    {
        title: "Bakti Sosial Sekolah",
        date: "November 2026",
        type: "Sosial",
    },
    {
        title: "Pekan Literasi & Seni",
        date: "September 2026",
        type: "Literasi",
    },
];

const leaderColors = [
    "from-[#0d58cf] to-[#052b66]",
    "from-[#0b73e8] to-[#064493]",
    "from-[#163678] to-[#0d58cf]",
    "from-[#064493] to-[#052b66]",
];

function normalizeOsisMembers(osisMembers) {
    if (!Array.isArray(osisMembers) || osisMembers.length === 0) {
        return {
            leaders: fallbackOsisLeaders,
            members: fallbackOsisMembers,
        };
    }

    const normalized = osisMembers.map((item, index) => ({
        id: item.id || index,
        name: item.name || "Nama Pengurus",
        role: item.position || item.role || "Pengurus OSIS",
        className: item.class_name || item.className || "Kelas belum diisi",
        image:
            item.image ||
            "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?auto=format&fit=crop&w=900&q=85",
        period: item.period || "",
        description: item.description || "",
        is_leader: Boolean(item.is_leader),
        color: leaderColors[index % leaderColors.length],
    }));

    const leaders = normalized.filter((item) => item.is_leader);
    const members = normalized.filter((item) => !item.is_leader);

    return {
        leaders: leaders.length > 0 ? leaders : normalized.slice(0, 2),
        members:
            members.length > 0
                ? members
                : normalized.length > 2
                ? normalized.slice(2)
                : fallbackOsisMembers,
    };
}

function buildOsisStats(leaders, members) {
    const total = leaders.length + members.length;

    return [
        {
            value: String(total || fallbackOsisStats[0].value),
            label: "Pengurus Aktif",
            icon: "users",
            iconWrap: "bg-blue-50 text-[#1f5bd3]",
        },
        {
            value: String(divisions.length || fallbackOsisStats[1].value),
            label: "Bidang Kerja",
            icon: "organization",
            iconWrap: "bg-emerald-50 text-emerald-500",
        },
        {
            value: String(programs.length || fallbackOsisStats[2].value),
            label: "Program Tahunan",
            icon: "activity",
            iconWrap: "bg-fuchsia-50 text-fuchsia-500",
        },
        {
            value: "Aktif",
            label: "Kegiatan Besar",
            icon: "calendar",
            iconWrap: "bg-orange-50 text-orange-500",
        },
    ];
}

function LeaderCard({ leader }) {
    return (
        <div className="overflow-hidden rounded-[26px] border border-slate-200 bg-white shadow-xl shadow-slate-200/70">
            <div className={`relative bg-gradient-to-br ${leader.color} p-5`}>
                <div className="absolute right-5 top-5 rounded-full bg-white/10 px-4 py-2 text-[11px] font-medium uppercase tracking-[0.12em] text-white">
                    Inti OSIS
                </div>

                <div className="pt-10">
                    <img
                        src={leader.image}
                        alt={leader.name}
                        className="h-[220px] w-full rounded-[22px] object-cover shadow-lg shadow-blue-950/20"
                        onError={(event) => {
                            event.currentTarget.src =
                                "https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&w=900&q=85";
                        }}
                    />
                </div>
            </div>

            <div className="p-5 text-center">
                <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[#0d58cf]">
                    {leader.role}
                </p>

                <h3 className="mt-2 text-[24px] font-semibold leading-tight text-[#061b46]">
                    {leader.name}
                </h3>

                <p className="mt-1 text-[13px] font-medium text-slate-500">
                    {leader.className}
                </p>

                {leader.period ? (
                    <p className="mt-2 text-[12px] font-medium text-[#d18b17]">
                        Periode {leader.period}
                    </p>
                ) : null}

                <div className="mt-5 grid grid-cols-2 gap-3">
                    <a
                        href="#"
                        className="flex h-11 items-center justify-center rounded-xl bg-blue-50 text-[13px] font-medium text-[#0d58cf] transition hover:bg-blue-100"
                    >
                        Profil
                    </a>

                    <a
                        href="#"
                        className="flex h-11 items-center justify-center rounded-xl bg-[#0d58cf] text-[13px] font-medium text-white transition hover:bg-[#064493]"
                    >
                        Program
                    </a>
                </div>
            </div>
        </div>
    );
}

function MemberCard({ member }) {
    return (
        <div className="overflow-hidden rounded-[22px] border border-slate-200 bg-white shadow-md shadow-slate-200/70 transition duration-300 hover:-translate-y-1 hover:shadow-xl">
            <div className="relative h-[185px] overflow-hidden bg-slate-100">
                <img
                    src={member.image}
                    alt={member.name}
                    className="h-full w-full object-cover transition duration-500 hover:scale-105"
                    onError={(event) => {
                        event.currentTarget.src =
                            "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=700&q=85";
                    }}
                />

                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#052b66]/90 to-transparent p-4">
                    <span className="rounded-full bg-white/90 px-3 py-1 text-[11px] font-medium text-[#0d58cf]">
                        {member.role}
                    </span>
                </div>
            </div>

            <div className="p-4">
                <h3 className="text-[17px] font-semibold leading-tight text-[#061b46]">
                    {member.name}
                </h3>

                <p className="mt-1 text-[12.5px] font-medium text-slate-500">
                    {member.className}
                </p>

                {member.period ? (
                    <p className="mt-2 text-[11.5px] font-medium text-[#d18b17]">
                        Periode {member.period}
                    </p>
                ) : null}

                {member.description ? (
                    <p className="mt-3 line-clamp-3 text-[12.5px] font-medium leading-6 text-slate-600">
                        {member.description}
                    </p>
                ) : null}

                <div className="mt-4 flex items-center gap-3 text-[#0d58cf]">
                    <a
                        href="#"
                        className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 transition hover:bg-blue-100"
                        aria-label="Profil"
                    >
                        <Icon type="users" className="h-4 w-4" />
                    </a>

                    <a
                        href="#"
                        className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 transition hover:bg-blue-100"
                        aria-label="Organisasi"
                    >
                        <Icon type="organization" className="h-4 w-4" />
                    </a>
                </div>
            </div>
        </div>
    );
}

export default function OsisSection({ osisMembers = [] }) {
    const { leaders, members } = useMemo(() => {
        return normalizeOsisMembers(osisMembers);
    }, [osisMembers]);

    const osisStats = useMemo(() => {
        return buildOsisStats(leaders, members);
    }, [leaders, members]);

    return (
        <div className="space-y-6">
            <div className="grid gap-0 overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-xl shadow-slate-200/60 lg:grid-cols-4">
                {osisStats.map((item, index) => (
                    <div
                        key={item.label}
                        className={`flex items-center gap-5 p-6 lg:p-7 ${
                            index !== osisStats.length - 1
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

            <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
                <div className="rounded-[26px] border border-slate-200 bg-white p-5 shadow-xl shadow-slate-200/60 sm:p-6">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                        <div>
                            <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-[#0d58cf]">
                                Struktur Inti
                            </p>

                            <h2 className="mt-2 text-[28px] font-semibold tracking-[-0.04em] text-[#061b46] sm:text-[36px]">
                                Pengurus Inti OSIS
                            </h2>
                        </div>

                        <a
                            href="#"
                            className="inline-flex h-11 items-center justify-center rounded-xl bg-blue-50 px-5 text-[13px] font-medium text-[#0d58cf] transition hover:bg-blue-100"
                        >
                            Lihat Struktur Lengkap
                        </a>
                    </div>

                    <div className="mt-6 grid gap-5 md:grid-cols-2">
                        {leaders.map((leader) => (
                            <LeaderCard key={leader.id || leader.name} leader={leader} />
                        ))}
                    </div>
                </div>

                <div className="rounded-[26px] border border-slate-200 bg-white p-5 shadow-xl shadow-slate-200/60 sm:p-6">
                    <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-[#0d58cf]">
                        Program Kerja
                    </p>

                    <h2 className="mt-2 text-[28px] font-semibold tracking-[-0.04em] text-[#061b46] sm:text-[34px]">
                        Agenda OSIS
                    </h2>

                    <div className="mt-6 space-y-4">
                        {programs.map((program, index) => (
                            <div
                                key={program.title}
                                className="flex gap-4 rounded-[20px] border border-slate-200 bg-slate-50 p-4 transition hover:bg-blue-50"
                            >
                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#0d58cf] text-[15px] font-medium text-white">
                                    {String(index + 1).padStart(2, "0")}
                                </div>

                                <div>
                                    <p className="text-[12px] font-medium text-[#0d58cf]">
                                        {program.type}
                                    </p>

                                    <h3 className="mt-1 text-[16px] font-semibold text-[#061b46]">
                                        {program.title}
                                    </h3>

                                    <p className="mt-1 text-[12.5px] font-medium text-slate-500">
                                        {program.date}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="rounded-[26px] border border-slate-200 bg-white p-5 shadow-xl shadow-slate-200/60 sm:p-6">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-[#0d58cf]">
                            Anggota Pengurus
                        </p>

                        <h2 className="mt-2 text-[28px] font-semibold tracking-[-0.04em] text-[#061b46] sm:text-[36px]">
                            Sekretaris & Bendahara
                        </h2>
                    </div>

                    <div className="flex gap-3 overflow-x-auto">
                        {["Semua", "Inti", "Bidang", "Koordinator"].map(
                            (item, index) => (
                                <button
                                    key={item}
                                    type="button"
                                    className={`h-11 shrink-0 rounded-xl px-5 text-[13px] font-medium transition ${
                                        index === 0
                                            ? "bg-[#0d58cf] text-white shadow-lg shadow-blue-200"
                                            : "bg-slate-100 text-[#163678] hover:bg-blue-50"
                                    }`}
                                >
                                    {item}
                                </button>
                            )
                        )}
                    </div>
                </div>

                <div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
                    {members.length > 0 ? (
                        members.map((member) => (
                            <MemberCard key={member.id || member.name} member={member} />
                        ))
                    ) : (
                        <div className="rounded-[18px] border border-dashed border-slate-200 bg-slate-50 p-8 text-center text-[13px] font-semibold text-slate-500 sm:col-span-2 xl:col-span-4">
                            Data anggota OSIS belum tersedia.
                        </div>
                    )}
                </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
                {divisions.map((division) => (
                    <div
                        key={division.title}
                        className="rounded-[22px] border border-slate-200 bg-white p-5 shadow-md shadow-slate-200/70 transition hover:-translate-y-1 hover:shadow-xl"
                    >
                        <div className="flex h-[52px] w-[52px] items-center justify-center rounded-2xl bg-blue-50 text-[#0d58cf]">
                            <Icon type={division.icon} className="h-6 w-6" />
                        </div>

                        <h3 className="mt-4 text-[18px] font-semibold leading-tight text-[#061b46]">
                            {division.title}
                        </h3>

                        <p className="mt-2 text-[13px] font-medium leading-6 text-slate-600">
                            {division.description}
                        </p>
                    </div>
                ))}
            </div>

            <div className="overflow-hidden rounded-[28px] bg-[#052b66] shadow-2xl shadow-blue-200">
                <div className="relative min-h-[250px] overflow-hidden">
                    <img
                        src="/frontend/images/osis-banner.jpg"
                        alt="Bergabung OSIS"
                        className="absolute inset-0 h-full w-full object-cover"
                        onError={(event) => {
                            event.currentTarget.src =
                                "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1600&q=85";
                        }}
                    />

                    <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(4,35,83,0.98)_0%,rgba(5,48,115,0.96)_44%,rgba(7,74,170,0.62)_70%,rgba(7,74,170,0.10)_100%)]" />

                    <div className="relative z-10 grid min-h-[250px] items-center gap-6 px-6 py-7 sm:px-8 lg:grid-cols-[92px_1fr_auto] lg:px-10">
                        <div className="flex h-20 w-20 items-center justify-center rounded-[24px] bg-white text-[#f7b733] shadow-lg">
                            <Icon type="organization" className="h-10 w-10" />
                        </div>

                        <div>
                            <h2 className="text-[26px] font-semibold leading-tight tracking-[-0.04em] text-white sm:text-[34px]">
                                Jadilah Pemimpin Muda Sekolah!
                            </h2>

                            <p className="mt-2 max-w-[680px] text-[14px] font-medium leading-7 text-blue-100 sm:text-[15px]">
                                OSIS menjadi ruang belajar untuk mengasah
                                kepemimpinan, tanggung jawab, kreativitas, dan
                                kepedulian terhadap lingkungan sekolah.
                            </p>

                            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                                <a
                                    href="#"
                                    className="inline-flex min-h-[50px] items-center justify-center rounded-[12px] bg-[#f7b733] px-7 text-[13px] font-medium text-[#061b46] transition hover:bg-yellow-300"
                                >
                                    Lihat Program OSIS →
                                </a>

                                <a
                                    href="#"
                                    className="inline-flex min-h-[50px] items-center justify-center rounded-[12px] border border-white/30 bg-white/10 px-7 text-[13px] font-medium text-white backdrop-blur-sm transition hover:bg-white/15"
                                >
                                    Hubungi Pembina OSIS
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