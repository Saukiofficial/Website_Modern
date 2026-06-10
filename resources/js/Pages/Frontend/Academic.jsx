import { useMemo, useState } from "react";
import FrontendLayout from "../../Layouts/FrontendLayout";

const tabs = [
    {
        key: "calendar",
        label: "Kalender Akademik",
        icon: "📅",
        description: "Agenda sekolah, jadwal ujian, kegiatan, dan hari penting.",
    },
    {
        key: "teachers",
        label: "Dewan Guru",
        icon: "👨‍🏫",
        description: "Data guru dan tenaga pendidik sekolah.",
    },
    {
        key: "extracurricular",
        label: "Ekstrakurikuler",
        icon: "🎨",
        description: "Kegiatan pengembangan minat dan bakat siswa.",
    },
    {
        key: "osis",
        label: "Pengurus OSIS",
        icon: "👥",
        description: "Struktur pengurus OSIS dan organisasi siswa.",
    },
    {
        key: "achievements",
        label: "Prestasi Siswa",
        icon: "🏆",
        description: "Prestasi akademik dan non-akademik siswa.",
    },
];

const calendarItems = [
    {
        date: "15",
        month: "JUL",
        title: "Masa Pengenalan Lingkungan Sekolah",
        type: "Kegiatan",
        description:
            "Pengenalan lingkungan sekolah, tata tertib, budaya sekolah, dan program unggulan.",
    },
    {
        date: "05",
        month: "SEP",
        title: "Penilaian Tengah Semester",
        type: "Akademik",
        description:
            "Pelaksanaan penilaian tengah semester untuk seluruh tingkat kelas.",
    },
    {
        date: "22",
        month: "NOV",
        title: "Ujian Praktik dan Projek",
        type: "Akademik",
        description:
            "Kegiatan ujian praktik, projek kolaboratif, dan presentasi karya siswa.",
    },
    {
        date: "20",
        month: "DES",
        title: "Pembagian Rapor Semester Ganjil",
        type: "Informasi",
        description:
            "Pembagian hasil belajar semester ganjil kepada peserta didik dan wali murid.",
    },
];

const teachers = [
    {
        name: "Dra. Siti Aminah",
        subject: "Bahasa Indonesia",
        position: "Waka Kurikulum",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=600&q=80",
    },
    {
        name: "M. Ridwan, S.Pd.",
        subject: "Matematika",
        position: "Guru Mapel",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80",
    },
    {
        name: "Nur Laila, S.Pd.",
        subject: "Biologi",
        position: "Waka Kesiswaan",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80",
    },
    {
        name: "Hendra Wijaya, S.Kom.",
        subject: "Informatika",
        position: "Guru Mapel",
        image: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&w=600&q=80",
    },
    {
        name: "Rina Marlina, S.Pd.",
        subject: "Bahasa Inggris",
        position: "Guru Mapel",
        image: "https://images.unsplash.com/photo-1580894732444-8ecded7900cd?auto=format&fit=crop&w=600&q=80",
    },
    {
        name: "Agus Prasetyo, M.Pd.",
        subject: "Fisika",
        position: "Guru Senior",
        image: "https://images.unsplash.com/photo-1531891437562-4301cf35b7e4?auto=format&fit=crop&w=600&q=80",
    },
];

const extracurriculars = [
    {
        title: "Pramuka",
        category: "Wajib",
        description:
            "Membentuk karakter disiplin, kepemimpinan, kerja sama, dan kemandirian siswa.",
        image: "https://images.unsplash.com/photo-1526676037777-05a232554f77?auto=format&fit=crop&w=700&q=80",
    },
    {
        title: "Paskibra",
        category: "Kedisiplinan",
        description:
            "Melatih kedisiplinan, tanggung jawab, kekompakan, dan jiwa nasionalisme.",
        image: "https://images.unsplash.com/photo-1596496181871-9681eacf9764?auto=format&fit=crop&w=700&q=80",
    },
    {
        title: "Futsal",
        category: "Olahraga",
        description:
            "Mengembangkan bakat olahraga, sportivitas, dan kerja sama tim.",
        image: "https://images.unsplash.com/photo-1518604666860-9ed391f76460?auto=format&fit=crop&w=700&q=80",
    },
    {
        title: "Karya Ilmiah Remaja",
        category: "Akademik",
        description:
            "Mendorong siswa melakukan riset, eksperimen, dan penulisan ilmiah.",
        image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=700&q=80",
    },
];

const osisMembers = [
    {
        name: "Andi Maulana",
        role: "Ketua OSIS",
        className: "XI IPA 1",
        image: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&w=600&q=80",
    },
    {
        name: "Nadia Putri",
        role: "Wakil Ketua OSIS",
        className: "XI IPS 1",
        image: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=600&q=80",
    },
    {
        name: "Rizky Firmansyah",
        role: "Sekretaris",
        className: "X IPA 2",
        image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=600&q=80",
    },
    {
        name: "Salsa Amelia",
        role: "Bendahara",
        className: "X IPS 2",
        image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80",
    },
];

const achievements = [
    {
        title: "Juara 1 Olimpiade Sains Kabupaten",
        category: "Akademik",
        year: "2024",
        student: "Tim Olimpiade Sains",
    },
    {
        title: "Juara 2 Lomba Pidato Bahasa Indonesia",
        category: "Literasi",
        year: "2024",
        student: "Nadia Putri",
    },
    {
        title: "Juara 1 Turnamen Futsal Antar Sekolah",
        category: "Olahraga",
        year: "2023",
        student: "Tim Futsal Sekolah",
    },
    {
        title: "Finalis Karya Ilmiah Remaja Tingkat Provinsi",
        category: "Riset",
        year: "2023",
        student: "Kelompok KIR",
    },
];

function SectionTitle({ eyebrow, title, description }) {
    return (
        <div>
            <p className="text-[11px] font-black uppercase tracking-[0.22em] text-[#0b73e8]">
                {eyebrow}
            </p>
            <h2 className="mt-3 text-[26px] font-extrabold leading-tight tracking-[-0.035em] text-slate-950 sm:text-[34px] lg:text-[40px]">
                {title}
            </h2>
            {description && (
                <p className="mt-4 max-w-3xl text-[14px] font-medium leading-7 text-slate-600 sm:text-[15px]">
                    {description}
                </p>
            )}
        </div>
    );
}

function CalendarContent() {
    return (
        <div className="rounded-[26px] bg-white p-6 shadow-xl shadow-slate-200/70 ring-1 ring-slate-200 sm:p-8">
            <SectionTitle
                eyebrow="Kalender Akademik"
                title="Agenda dan Jadwal Kegiatan Sekolah"
                description="Informasi agenda akademik, kegiatan sekolah, jadwal ujian, dan hari penting selama tahun ajaran berjalan."
            />

            <div className="mt-8 grid gap-4">
                {calendarItems.map((item) => (
                    <div
                        key={item.title}
                        className="grid gap-4 rounded-[22px] border border-slate-200 bg-slate-50 p-4 sm:grid-cols-[86px_1fr] sm:p-5"
                    >
                        <div className="flex h-[78px] w-[78px] flex-col items-center justify-center rounded-[18px] bg-[#064493] text-white">
                            <span className="text-[28px] font-extrabold leading-none">
                                {item.date}
                            </span>
                            <span className="mt-1 text-[11px] font-black tracking-[0.12em]">
                                {item.month}
                            </span>
                        </div>

                        <div>
                            <div className="flex flex-wrap items-center gap-2">
                                <span className="rounded-full bg-blue-100 px-3 py-1 text-[11px] font-extrabold text-[#064493]">
                                    {item.type}
                                </span>
                            </div>

                            <h3 className="mt-3 text-[18px] font-extrabold text-slate-950">
                                {item.title}
                            </h3>
                            <p className="mt-2 text-[13px] font-medium leading-6 text-slate-600">
                                {item.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

function TeachersContent() {
    return (
        <div className="rounded-[26px] bg-white p-6 shadow-xl shadow-slate-200/70 ring-1 ring-slate-200 sm:p-8">
            <SectionTitle
                eyebrow="Dewan Guru"
                title="Tenaga Pendidik Profesional"
                description="Guru dan tenaga pendidik berpengalaman yang mendukung proses pembelajaran aktif, kreatif, dan berkarakter."
            />

            <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {teachers.map((teacher) => (
                    <div
                        key={teacher.name}
                        className="overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-md shadow-slate-100"
                    >
                        <img
                            src={teacher.image}
                            alt={teacher.name}
                            className="h-[230px] w-full object-cover"
                        />
                        <div className="p-5">
                            <p className="text-[11px] font-black uppercase tracking-[0.14em] text-[#0b73e8]">
                                {teacher.position}
                            </p>
                            <h3 className="mt-2 text-[17px] font-extrabold text-slate-950">
                                {teacher.name}
                            </h3>
                            <p className="mt-1 text-[13px] font-bold text-slate-500">
                                {teacher.subject}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

function ExtracurricularContent() {
    return (
        <div className="rounded-[26px] bg-white p-6 shadow-xl shadow-slate-200/70 ring-1 ring-slate-200 sm:p-8">
            <SectionTitle
                eyebrow="Ekstrakurikuler"
                title="Ruang Pengembangan Minat dan Bakat"
                description="Berbagai kegiatan ekstrakurikuler untuk mendukung pengembangan potensi, kreativitas, kepemimpinan, dan karakter siswa."
            />

            <div className="mt-8 grid gap-5 sm:grid-cols-2">
                {extracurriculars.map((item) => (
                    <div
                        key={item.title}
                        className="overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-md shadow-slate-100"
                    >
                        <img
                            src={item.image}
                            alt={item.title}
                            className="h-[190px] w-full object-cover"
                        />
                        <div className="p-5">
                            <span className="rounded-full bg-blue-100 px-3 py-1 text-[11px] font-extrabold text-[#064493]">
                                {item.category}
                            </span>
                            <h3 className="mt-4 text-[18px] font-extrabold text-slate-950">
                                {item.title}
                            </h3>
                            <p className="mt-2 text-[13px] font-medium leading-6 text-slate-600">
                                {item.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

function OsisContent() {
    return (
        <div className="rounded-[26px] bg-white p-6 shadow-xl shadow-slate-200/70 ring-1 ring-slate-200 sm:p-8">
            <SectionTitle
                eyebrow="Pengurus OSIS"
                title="Organisasi Siswa Intra Sekolah"
                description="OSIS menjadi wadah siswa untuk belajar kepemimpinan, organisasi, tanggung jawab, dan kerja sama dalam kegiatan sekolah."
            />

            <div className="mt-8">
                <div className="mx-auto max-w-md rounded-[24px] bg-gradient-to-br from-[#064493] to-[#0b73e8] p-5 text-center text-white shadow-xl shadow-blue-200">
                    <img
                        src={osisMembers[0].image}
                        alt={osisMembers[0].name}
                        className="mx-auto h-[120px] w-[120px] rounded-full border-4 border-white object-cover"
                    />
                    <p className="mt-4 text-[12px] font-black uppercase tracking-[0.14em] text-blue-100">
                        {osisMembers[0].role}
                    </p>
                    <h3 className="mt-1 text-[20px] font-extrabold">
                        {osisMembers[0].name}
                    </h3>
                    <p className="mt-1 text-[13px] font-bold text-blue-100">
                        {osisMembers[0].className}
                    </p>
                </div>

                <div className="mx-auto mt-6 h-10 w-[2px] bg-blue-200" />

                <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {osisMembers.slice(1).map((member) => (
                        <div
                            key={member.name}
                            className="rounded-[22px] border border-slate-200 bg-slate-50 p-5 text-center"
                        >
                            <img
                                src={member.image}
                                alt={member.name}
                                className="mx-auto h-[95px] w-[95px] rounded-full object-cover"
                            />
                            <p className="mt-4 text-[11px] font-black uppercase tracking-[0.12em] text-[#0b73e8]">
                                {member.role}
                            </p>
                            <h3 className="mt-1 text-[15px] font-extrabold text-slate-950">
                                {member.name}
                            </h3>
                            <p className="mt-1 text-[12px] font-bold text-slate-500">
                                {member.className}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

function AchievementsContent() {
    return (
        <div className="rounded-[26px] bg-white p-6 shadow-xl shadow-slate-200/70 ring-1 ring-slate-200 sm:p-8">
            <SectionTitle
                eyebrow="Prestasi Siswa"
                title="Capaian Akademik dan Non-Akademik"
                description="Prestasi siswa menjadi bukti komitmen sekolah dalam mendukung potensi dan bakat peserta didik."
            />

            <div className="mt-8 grid gap-4">
                {achievements.map((item, index) => (
                    <div
                        key={item.title}
                        className="grid gap-4 rounded-[22px] border border-slate-200 bg-slate-50 p-5 sm:grid-cols-[64px_1fr_auto] sm:items-center"
                    >
                        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#0b73e8] text-[18px] font-extrabold text-white">
                            {index + 1}
                        </div>

                        <div>
                            <span className="rounded-full bg-blue-100 px-3 py-1 text-[11px] font-extrabold text-[#064493]">
                                {item.category}
                            </span>
                            <h3 className="mt-3 text-[17px] font-extrabold text-slate-950">
                                {item.title}
                            </h3>
                            <p className="mt-1 text-[13px] font-semibold text-slate-500">
                                {item.student}
                            </p>
                        </div>

                        <div className="rounded-[16px] bg-white px-5 py-3 text-center shadow-sm">
                            <p className="text-[22px] font-extrabold text-[#064493]">
                                {item.year}
                            </p>
                            <p className="text-[11px] font-bold uppercase text-slate-400">
                                Tahun
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default function Academic() {
    const [activeTab, setActiveTab] = useState("calendar");

    const activeMenu = useMemo(() => {
        return tabs.find((tab) => tab.key === activeTab) ?? tabs[0];
    }, [activeTab]);

    const renderContent = () => {
        if (activeTab === "teachers") return <TeachersContent />;
        if (activeTab === "extracurricular") return <ExtracurricularContent />;
        if (activeTab === "osis") return <OsisContent />;
        if (activeTab === "achievements") return <AchievementsContent />;

        return <CalendarContent />;
    };

    return (
        <FrontendLayout>
            <section className="relative overflow-hidden bg-[#064493]">
                <img
                    src="/frontend/images/school-bg.jpg"
                    alt="Akademik dan Kesiswaan"
                    className="absolute inset-0 h-full w-full object-cover opacity-35"
                    onError={(event) => {
                        event.currentTarget.src =
                            "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1600&q=85";
                    }}
                />

                <div className="absolute inset-0 bg-gradient-to-r from-[#052556] via-[#064493]/90 to-[#064493]/45" />

                <div className="relative mx-auto max-w-[1265px] px-4 py-12 sm:px-6 sm:py-16 lg:py-20">
                    <div className="max-w-3xl">
                        <p className="text-[11px] font-black uppercase tracking-[0.24em] text-blue-100">
                            Akademik & Kesiswaan
                        </p>

                        <h1 className="mt-4 text-[32px] font-extrabold leading-tight tracking-[-0.035em] text-white sm:text-[44px] lg:text-[56px]">
                            Informasi Akademik dan Kegiatan Siswa
                        </h1>

                        <p className="mt-5 max-w-2xl text-[14px] font-medium leading-8 text-blue-50 sm:text-[16px]">
                            Halaman ini berisi kalender akademik, data guru,
                            ekstrakurikuler, pengurus OSIS, dan prestasi siswa
                            secara ringkas dan terstruktur.
                        </p>
                    </div>
                </div>
            </section>

            <section className="bg-[#f4f8fc] px-4 py-6 sm:px-6 lg:py-10">
                <div className="mx-auto grid max-w-[1265px] gap-6 lg:grid-cols-[310px_1fr] lg:items-start">
                    <aside className="lg:sticky lg:top-[96px]">
                        <div className="rounded-[26px] bg-white p-4 shadow-xl shadow-slate-200/70 ring-1 ring-slate-200">
                            <div className="mb-4 hidden px-3 pt-2 lg:block">
                                <h2 className="text-[17px] font-extrabold text-slate-950">
                                    Menu Akademik
                                </h2>
                                <p className="mt-1 text-[12px] font-medium leading-5 text-slate-500">
                                    Pilih informasi akademik dan kesiswaan yang
                                    ingin ditampilkan.
                                </p>
                            </div>

                            <div className="flex gap-3 overflow-x-auto pb-1 lg:grid lg:overflow-visible lg:pb-0">
                                {tabs.map((tab) => {
                                    const isActive = activeTab === tab.key;

                                    return (
                                        <button
                                            key={tab.key}
                                            type="button"
                                            onClick={() => setActiveTab(tab.key)}
                                            className={`min-w-[180px] rounded-[18px] p-4 text-left transition lg:min-w-0 ${
                                                isActive
                                                    ? "bg-[#064493] text-white shadow-lg shadow-blue-200"
                                                    : "bg-slate-50 text-slate-700 hover:bg-blue-50"
                                            }`}
                                        >
                                            <div className="flex items-start gap-3">
                                                <span className="text-[22px]">
                                                    {tab.icon}
                                                </span>
                                                <div>
                                                    <p
                                                        className={`text-[13px] font-extrabold ${
                                                            isActive
                                                                ? "text-white"
                                                                : "text-[#064493]"
                                                        }`}
                                                    >
                                                        {tab.label}
                                                    </p>
                                                    <p
                                                        className={`mt-1 hidden text-[11px] font-medium leading-5 lg:block ${
                                                            isActive
                                                                ? "text-blue-100"
                                                                : "text-slate-500"
                                                        }`}
                                                    >
                                                        {tab.description}
                                                    </p>
                                                </div>
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </aside>

                    <main>
                        <div className="mb-5 rounded-[24px] bg-white p-5 shadow-md shadow-slate-200/70 ring-1 ring-slate-200 sm:p-6">
                            <p className="text-[11px] font-black uppercase tracking-[0.2em] text-[#0b73e8]">
                                Sedang Dibuka
                            </p>
                            <h2 className="mt-2 text-[24px] font-extrabold tracking-[-0.03em] text-slate-950 sm:text-[30px]">
                                {activeMenu.label}
                            </h2>
                            <p className="mt-2 text-[13px] font-medium leading-6 text-slate-600 sm:text-[14px]">
                                {activeMenu.description}
                            </p>
                        </div>

                        {renderContent()}
                    </main>
                </div>
            </section>
        </FrontendLayout>
    );
}