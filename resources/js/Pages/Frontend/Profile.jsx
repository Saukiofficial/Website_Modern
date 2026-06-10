import { useMemo, useState } from "react";
import FrontendLayout from "../../Layouts/FrontendLayout";

const school = {
    name: "SMA Negeri 1 Cerdas",
    tagline: "Berprestasi, Berkarakter, Berbudaya",
    description:
        "SMA Negeri 1 Cerdas merupakan sekolah menengah atas yang berkomitmen membentuk peserta didik yang unggul dalam akademik, berkarakter, kreatif, berbudaya, serta siap bersaing di era global.",
    principal: {
        name: "Drs. Ahmad Fauzi, M.Pd.",
        position: "Kepala Sekolah",
        image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80",
        message:
            "Kami percaya bahwa pendidikan bukan hanya tentang pengetahuan, tetapi juga tentang pembentukan karakter, kedisiplinan, tanggung jawab, dan kepedulian sosial. Melalui lingkungan belajar yang nyaman dan modern, kami terus mendorong peserta didik untuk berkembang sesuai potensi terbaiknya.",
    },
    history:
        "SMA Negeri 1 Cerdas berdiri sebagai lembaga pendidikan yang hadir untuk menjawab kebutuhan masyarakat terhadap sekolah berkualitas. Sejak awal berdiri, sekolah ini terus berkembang dalam bidang akademik, sarana prasarana, kegiatan siswa, serta layanan pendidikan berbasis teknologi. Dengan dukungan tenaga pendidik profesional dan lingkungan belajar yang kondusif, sekolah terus berkomitmen menjadi pusat pembelajaran yang unggul, modern, dan berkarakter.",
    vision:
        "Menjadi sekolah unggul yang melahirkan generasi cerdas, berkarakter, berbudaya, dan berdaya saing global.",
    missions: [
        "Menyelenggarakan pendidikan yang berkualitas, inovatif, dan berorientasi pada perkembangan peserta didik.",
        "Membentuk karakter siswa yang disiplin, religius, bertanggung jawab, dan peduli lingkungan.",
        "Mengembangkan potensi akademik dan non-akademik siswa melalui pembelajaran aktif dan kegiatan ekstrakurikuler.",
        "Meningkatkan profesionalitas guru dan tenaga kependidikan secara berkelanjutan.",
        "Membangun kerja sama dengan orang tua, masyarakat, dan berbagai pihak dalam mendukung kemajuan sekolah.",
    ],
    identity: [
        ["Nama Sekolah", "SMA Negeri 1 Cerdas"],
        ["NPSN", "20500001"],
        ["Akreditasi", "A"],
        ["Status Sekolah", "Negeri"],
        ["Jenjang", "Sekolah Menengah Atas"],
        ["Kurikulum", "Kurikulum Merdeka"],
        ["Alamat", "Jl. Pendidikan No. 21, Sumenep, Jawa Timur"],
        ["Email", "info@sman1cerdas.sch.id"],
        ["Telepon", "0812-3456-7890"],
    ],
};

const organization = [
    {
        role: "Kepala Sekolah",
        name: "Drs. Ahmad Fauzi, M.Pd.",
        image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80",
    },
    {
        role: "Waka Kurikulum",
        name: "Dra. Siti Aminah",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=600&q=80",
    },
    {
        role: "Waka Kesiswaan",
        name: "M. Ridwan, S.Pd.",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80",
    },
    {
        role: "Waka Sarpras",
        name: "Nur Laila, S.Pd.",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80",
    },
    {
        role: "Kepala Tata Usaha",
        name: "Hendra Wijaya, S.Kom.",
        image: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&w=600&q=80",
    },
];

const values = [
    {
        title: "Berprestasi",
        icon: "🏆",
        description:
            "Mendorong siswa untuk unggul dalam akademik, lomba, dan berbagai kompetisi.",
    },
    {
        title: "Berkarakter",
        icon: "🤝",
        description:
            "Membentuk pribadi disiplin, jujur, bertanggung jawab, dan peduli sesama.",
    },
    {
        title: "Berbudaya",
        icon: "🌿",
        description:
            "Menanamkan nilai budaya, sopan santun, serta cinta terhadap lingkungan sekolah.",
    },
];

const tabs = [
    {
        key: "profile",
        label: "Profil Sekolah",
        icon: "🏫",
        description: "Pesan kepala sekolah dan pengenalan sekolah.",
    },
    {
        key: "history",
        label: "Sejarah",
        icon: "📘",
        description: "Perjalanan dan perkembangan sekolah.",
    },
    {
        key: "vision",
        label: "Visi & Misi",
        icon: "🎯",
        description: "Arah, tujuan, dan komitmen sekolah.",
    },
    {
        key: "structure",
        label: "Struktur Organisasi",
        icon: "👥",
        description: "Susunan pimpinan dan pengelola sekolah.",
    },
    {
        key: "identity",
        label: "Identitas Sekolah",
        icon: "🪪",
        description: "Data resmi dan informasi sekolah.",
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

function ProfileContent() {
    return (
        <div className="grid gap-6 lg:grid-cols-[0.92fr_1.08fr]">
            <div className="overflow-hidden rounded-[26px] bg-white shadow-xl shadow-slate-200/70 ring-1 ring-slate-200">
                <div className="relative h-[320px] overflow-hidden bg-blue-50 sm:h-[380px] lg:h-full">
                    <img
                        src={school.principal.image}
                        alt={school.principal.name}
                        className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#052556]/90 to-transparent p-6 text-white">
                        <h3 className="text-[20px] font-extrabold">
                            {school.principal.name}
                        </h3>
                        <p className="mt-1 text-[13px] font-bold text-blue-100">
                            {school.principal.position}
                        </p>
                    </div>
                </div>
            </div>

            <div className="rounded-[26px] bg-white p-6 shadow-xl shadow-slate-200/70 ring-1 ring-slate-200 sm:p-8">
                <SectionTitle
                    eyebrow="Profil Sekolah"
                    title="Pesan Kepala Sekolah"
                    description="Sambutan kepala sekolah sebagai pengantar dalam mengenal arah pendidikan dan karakter sekolah."
                />

                <div className="mt-6 rounded-[22px] bg-[#f4f8fc] p-5 sm:p-6">
                    <p className="text-[15px] font-medium leading-8 text-slate-700">
                        “{school.principal.message}”
                    </p>
                </div>

                <div className="mt-6 grid gap-4 sm:grid-cols-3">
                    {values.map((item) => (
                        <div
                            key={item.title}
                            className="rounded-[20px] border border-slate-200 bg-white p-5 shadow-sm"
                        >
                            <div className="text-[30px]">{item.icon}</div>
                            <h3 className="mt-3 text-[15px] font-extrabold text-[#064493]">
                                {item.title}
                            </h3>
                            <p className="mt-2 text-[12.5px] font-medium leading-6 text-slate-600">
                                {item.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

function HistoryContent() {
    return (
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="rounded-[26px] bg-white p-6 shadow-xl shadow-slate-200/70 ring-1 ring-slate-200 sm:p-8">
                <SectionTitle
                    eyebrow="Sejarah"
                    title="Perjalanan Sekolah dalam Membangun Generasi Cerdas"
                    description="Sejarah singkat perkembangan sekolah dari masa berdiri hingga menjadi lembaga pendidikan yang terus berinovasi."
                />

                <p className="mt-6 text-[15px] font-medium leading-8 text-slate-700">
                    {school.history}
                </p>

                <div className="mt-7 grid gap-4 sm:grid-cols-3">
                    {[
                        ["1998", "Tahun Berdiri"],
                        ["A", "Akreditasi"],
                        ["128+", "Prestasi"],
                    ].map(([value, label]) => (
                        <div
                            key={label}
                            className="rounded-[20px] bg-blue-50 p-5"
                        >
                            <p className="text-[30px] font-extrabold text-[#064493]">
                                {value}
                            </p>
                            <p className="mt-1 text-[12px] font-bold text-slate-600">
                                {label}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="overflow-hidden rounded-[26px] bg-white shadow-xl shadow-slate-200/70 ring-1 ring-slate-200">
                <img
                    src="/frontend/images/school-bg.jpg"
                    alt="Sejarah Sekolah"
                    className="h-[260px] w-full object-cover sm:h-[360px] lg:h-full"
                    onError={(event) => {
                        event.currentTarget.src =
                            "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1000&q=85";
                    }}
                />
            </div>
        </div>
    );
}

function VisionContent() {
    return (
        <div className="grid gap-6 lg:grid-cols-[0.88fr_1.12fr]">
            <div className="rounded-[26px] bg-gradient-to-br from-[#064493] to-[#0b73e8] p-6 text-white shadow-xl shadow-blue-200 sm:p-8">
                <p className="text-[11px] font-black uppercase tracking-[0.22em] text-blue-100">
                    Visi Sekolah
                </p>
                <h2 className="mt-4 text-[28px] font-extrabold leading-tight tracking-[-0.03em] sm:text-[38px]">
                    Arah Besar Pendidikan Sekolah
                </h2>
                <p className="mt-5 text-[15px] font-medium leading-8 text-blue-50">
                    {school.vision}
                </p>
            </div>

            <div className="rounded-[26px] bg-white p-6 shadow-xl shadow-slate-200/70 ring-1 ring-slate-200 sm:p-8">
                <SectionTitle
                    eyebrow="Misi Sekolah"
                    title="Langkah Nyata Mewujudkan Visi"
                />

                <div className="mt-6 space-y-4">
                    {school.missions.map((mission, index) => (
                        <div
                            key={mission}
                            className="flex gap-4 rounded-[20px] bg-slate-50 p-4 sm:p-5"
                        >
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#0b73e8] text-[13px] font-extrabold text-white">
                                {index + 1}
                            </div>
                            <p className="text-[13px] font-semibold leading-7 text-slate-700 sm:text-[14px]">
                                {mission}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

function StructureContent() {
    return (
        <div className="rounded-[26px] bg-white p-6 shadow-xl shadow-slate-200/70 ring-1 ring-slate-200 sm:p-8">
            <SectionTitle
                eyebrow="Struktur Organisasi"
                title="Susunan Pengelola Sekolah"
                description="Struktur organisasi sekolah yang mendukung tata kelola pendidikan, layanan akademik, kesiswaan, sarana prasarana, dan administrasi sekolah."
            />

            <div className="mt-8">
                <div className="mx-auto max-w-md rounded-[24px] bg-gradient-to-br from-[#064493] to-[#0b73e8] p-5 text-center text-white shadow-xl shadow-blue-200">
                    <img
                        src={organization[0].image}
                        alt={organization[0].name}
                        className="mx-auto h-[120px] w-[120px] rounded-full border-4 border-white object-cover"
                    />
                    <p className="mt-4 text-[13px] font-bold uppercase tracking-[0.14em] text-blue-100">
                        {organization[0].role}
                    </p>
                    <h3 className="mt-1 text-[20px] font-extrabold">
                        {organization[0].name}
                    </h3>
                </div>

                <div className="mx-auto mt-6 h-10 w-[2px] bg-blue-200" />

                <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                    {organization.slice(1).map((item) => (
                        <div
                            key={item.role}
                            className="rounded-[22px] border border-slate-200 bg-slate-50 p-5 text-center"
                        >
                            <img
                                src={item.image}
                                alt={item.name}
                                className="mx-auto h-[95px] w-[95px] rounded-full object-cover"
                            />
                            <p className="mt-4 text-[11px] font-black uppercase tracking-[0.12em] text-[#0b73e8]">
                                {item.role}
                            </p>
                            <h3 className="mt-1 text-[15px] font-extrabold text-slate-950">
                                {item.name}
                            </h3>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

function IdentityContent() {
    return (
        <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
            <div className="rounded-[26px] bg-white p-6 shadow-xl shadow-slate-200/70 ring-1 ring-slate-200 sm:p-8">
                <SectionTitle
                    eyebrow="Identitas Sekolah"
                    title="Data Resmi Sekolah"
                    description="Informasi dasar sekolah sebagai identitas resmi yang dapat digunakan oleh siswa, orang tua, dan masyarakat."
                />

                <div className="mt-7 overflow-hidden rounded-[22px] border border-slate-200">
                    {school.identity.map(([label, value], index) => (
                        <div
                            key={label}
                            className={`grid gap-2 px-5 py-4 sm:grid-cols-[190px_1fr] ${
                                index !== school.identity.length - 1
                                    ? "border-b border-slate-100"
                                    : ""
                            }`}
                        >
                            <p className="text-[12px] font-bold uppercase tracking-[0.08em] text-slate-500">
                                {label}
                            </p>
                            <p className="text-[14px] font-extrabold text-slate-950">
                                {value}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="rounded-[26px] bg-gradient-to-br from-[#064493] to-[#0b73e8] p-6 text-white shadow-xl shadow-blue-200 sm:p-8">
                <p className="text-[11px] font-black uppercase tracking-[0.22em] text-blue-100">
                    Kontak Sekolah
                </p>
                <h2 className="mt-4 text-[28px] font-extrabold leading-tight tracking-[-0.03em]">
                    Butuh Informasi Lebih Lanjut?
                </h2>
                <p className="mt-4 text-[14px] font-medium leading-7 text-blue-50">
                    Silakan hubungi pihak sekolah untuk informasi pendaftaran,
                    akademik, dan layanan administrasi.
                </p>

                <div className="mt-7 space-y-4">
                    <a
                        href="#"
                        className="flex h-[52px] items-center justify-center rounded-xl bg-white px-5 text-[15px] font-extrabold text-[#064493] shadow-lg transition hover:bg-blue-50"
                    >
                        Hubungi Sekolah
                    </a>
                    <a
                        href="/"
                        className="flex h-[52px] items-center justify-center rounded-xl border border-white/30 px-5 text-[15px] font-extrabold text-white transition hover:bg-white/10"
                    >
                        Kembali ke Beranda
                    </a>
                </div>
            </div>
        </div>
    );
}

export default function Profile() {
    const [activeTab, setActiveTab] = useState("profile");

    const activeMenu = useMemo(() => {
        return tabs.find((tab) => tab.key === activeTab) ?? tabs[0];
    }, [activeTab]);

    const renderContent = () => {
        if (activeTab === "history") return <HistoryContent />;
        if (activeTab === "vision") return <VisionContent />;
        if (activeTab === "structure") return <StructureContent />;
        if (activeTab === "identity") return <IdentityContent />;

        return <ProfileContent />;
    };

    return (
        <FrontendLayout>
            <section className="relative overflow-hidden bg-[#064493]">
                <img
                    src="/frontend/images/school-bg.jpg"
                    alt="Profil Sekolah"
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
                            Profil Sekolah
                        </p>

                        <h1 className="mt-4 text-[32px] font-extrabold leading-tight tracking-[-0.035em] text-white sm:text-[44px] lg:text-[56px]">
                            Mengenal Lebih Dekat {school.name}
                        </h1>

                        <p className="mt-5 max-w-2xl text-[14px] font-medium leading-8 text-blue-50 sm:text-[16px]">
                            {school.description}
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
                                    Menu Profil
                                </h2>
                                <p className="mt-1 text-[12px] font-medium leading-5 text-slate-500">
                                    Pilih informasi profil sekolah yang ingin
                                    ditampilkan.
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