function MainProfileHero({ school, heroStats }) {
    const stats = Array.isArray(heroStats) ? heroStats : [];

    return (
        <section className="relative w-full overflow-hidden bg-[#052b66]">
            <div className="relative min-h-[580px] w-full overflow-hidden lg:min-h-[620px]">
                <img
                    src={school.heroImage || "/frontend/images/profile-hero.jpg"}
                    alt="Profil Sekolah"
                    className="absolute inset-0 h-full w-full object-cover object-center"
                    onError={(event) => {
                        event.currentTarget.src =
                            "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1800&q=85";
                    }}
                />

                <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(3,29,74,0.98)_0%,rgba(3,42,101,0.93)_40%,rgba(4,62,145,0.50)_72%,rgba(4,62,145,0.14)_100%)]" />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(3,24,58,0.10)_0%,rgba(3,24,58,0.02)_45%,rgba(3,24,58,0.42)_100%)]" />

                <div className="relative z-10 grid min-h-[580px] items-center gap-8 px-4 py-12 sm:px-6 lg:min-h-[620px] lg:grid-cols-[0.9fr_1.1fr] lg:px-10 xl:px-14 2xl:px-16">
                    <div className="max-w-[680px]">
                        <p className="text-[12px] font-semibold uppercase tracking-[0.22em] text-blue-100">
                            Profil Sekolah
                        </p>

                        <h1 className="mt-8 max-w-[680px] font-serif text-[42px] font-semibold leading-[1.05] tracking-[-0.045em] text-white sm:text-[58px] lg:text-[64px] xl:text-[72px]">
                            Mengenal Lebih Dekat
                            <br />
                            <span className="text-[#f7c46a]">
                                {school.shortName || "SMA Negeri 1"}
                            </span>
                            <br />
                            {school.city || "Mojokerto"}
                        </h1>

                        <p className="mt-7 max-w-[620px] text-[16px] font-medium leading-8 text-blue-50 sm:text-[18px]">
                            {school.description}
                        </p>

                        <a
                            href="#profil-sekolah"
                            className="mt-9 inline-flex min-h-[56px] items-center justify-center gap-4 rounded-[10px] border border-[#f7c46a]/70 px-8 text-[13px] font-semibold uppercase tracking-[0.08em] text-white transition hover:bg-white/10"
                        >
                            Jelajahi Profil Sekolah
                            <span className="text-[22px] leading-none">→</span>
                        </a>
                    </div>

                    <div className="hidden lg:flex lg:justify-end">
                        <div className="grid max-w-[660px] grid-cols-3 gap-4">
                            {stats.map((item) => (
                                <div
                                    key={item.label || item.value}
                                    className="flex min-h-[210px] flex-col items-center justify-center rounded-[22px] border border-white/20 bg-white/10 px-7 text-center text-white shadow-2xl shadow-blue-950/20 backdrop-blur-md"
                                >
                                    <div className="text-[46px] leading-none text-blue-100">
                                        {item.icon}
                                    </div>

                                    <p className="mt-7 whitespace-pre-line font-serif text-[36px] font-semibold leading-tight text-[#f7c46a]">
                                        {item.value}
                                    </p>

                                    {item.label ? (
                                        <p className="mt-3 text-[15px] font-medium leading-6 text-blue-50">
                                            {item.label}
                                        </p>
                                    ) : null}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

function VisionHero({ activeMenu, school, profileStats }) {
    const stats = Array.isArray(profileStats) ? profileStats : [];

    return (
        <section className="relative w-full overflow-hidden bg-[#052b66]">
            <div className="relative min-h-[360px] w-full overflow-hidden sm:min-h-[420px] lg:min-h-[450px]">
                <img
                    src={
                        school.visionHeroImage ||
                        "/frontend/images/vision-hero.jpg"
                    }
                    alt="Visi dan Misi"
                    className="absolute inset-0 h-full w-full object-cover object-center"
                    onError={(event) => {
                        event.currentTarget.src =
                            "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1800&q=85";
                    }}
                />

                <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(3,29,74,0.99)_0%,rgba(3,42,101,0.94)_42%,rgba(4,62,145,0.45)_74%,rgba(4,62,145,0.10)_100%)]" />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(3,24,58,0.05)_0%,rgba(3,24,58,0.02)_48%,rgba(3,24,58,0.36)_100%)]" />

                <div className="relative z-10 flex min-h-[360px] flex-col justify-center px-4 py-10 sm:min-h-[420px] sm:px-6 lg:min-h-[450px] lg:px-10 xl:px-14 2xl:px-16">
                    <div className="flex flex-wrap items-center gap-3 text-[13px] font-medium text-blue-100">
                        <a href="/" className="hover:text-white">
                            Beranda
                        </a>
                        <span>›</span>
                        <span>Profil</span>
                        <span>›</span>
                        <span className="text-white">{activeMenu.label}</span>
                    </div>

                    <h1 className="mt-7 max-w-5xl font-serif text-[42px] font-semibold leading-tight tracking-[-0.045em] text-white sm:text-[56px] lg:text-[64px]">
                        Visi & Misi
                    </h1>

                    <p className="mt-5 max-w-[760px] text-[16px] font-medium leading-8 text-blue-50 sm:text-[18px]">
                        {school.vision ||
                            "Membangun generasi yang unggul secara akademik, berkarakter global, dan berbudaya Indonesia."}
                    </p>

                    <div className="mt-8 grid max-w-[760px] overflow-hidden rounded-[16px] border border-white/20 bg-[#052b66]/35 shadow-2xl shadow-blue-950/20 backdrop-blur-md sm:grid-cols-2 lg:grid-cols-4">
                        {stats.slice(0, 4).map((item, index) => (
                            <div
                                key={item.label}
                                className={`flex items-center gap-4 px-5 py-5 text-white ${
                                    index !== 3
                                        ? "border-b border-white/15 sm:border-r lg:border-b-0"
                                        : ""
                                }`}
                            >
                                <div className="text-[32px] leading-none text-[#f7c46a]">
                                    {item.icon}
                                </div>

                                <div>
                                    <p className="font-serif text-[26px] font-semibold leading-none text-white">
                                        {item.value}
                                    </p>

                                    <p className="mt-1 text-[12px] font-medium text-blue-100">
                                        {item.label}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

function StructureHero({ activeMenu, school }) {
    const points = [
        {
            icon: "👥",
            title: "Kepemimpinan",
            value: "Profesional",
        },
        {
            icon: "🛡️",
            title: "Tata Kelola",
            value: "Transparan",
        },
        {
            icon: "📖",
            title: "Kolaborasi",
            value: "Berkelanjutan",
        },
        {
            icon: "🎓",
            title: "Berkomitmen pada",
            value: "Pendidikan Berkualitas",
        },
    ];

    return (
        <section className="relative w-full overflow-hidden bg-[#052b66]">
            <div className="relative min-h-[300px] w-full overflow-hidden sm:min-h-[330px] lg:min-h-[360px]">
                <img
                    src={
                        school.structureHeroImage ||
                        "/frontend/images/structure-hero.jpg"
                    }
                    alt="Struktur Organisasi"
                    className="absolute inset-0 h-full w-full object-cover object-center"
                    onError={(event) => {
                        event.currentTarget.src =
                            "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1800&q=85";
                    }}
                />

                <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(3,29,74,0.99)_0%,rgba(3,42,101,0.94)_43%,rgba(4,62,145,0.55)_78%,rgba(4,62,145,0.18)_100%)]" />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(3,24,58,0.08)_0%,rgba(3,24,58,0.02)_52%,rgba(3,24,58,0.38)_100%)]" />

                <div className="relative z-10 grid min-h-[300px] items-center gap-8 px-4 py-10 sm:min-h-[330px] sm:px-6 lg:min-h-[360px] lg:grid-cols-[0.95fr_1.05fr] lg:px-10 xl:px-14 2xl:px-16">
                    <div>
                        <div className="flex flex-wrap items-center gap-3 text-[13px] font-medium text-blue-100">
                            <a href="/" className="hover:text-white">
                                Beranda
                            </a>
                            <span>›</span>
                            <span>Profil</span>
                            <span>›</span>
                            <span className="text-white">
                                {activeMenu.label}
                            </span>
                        </div>

                        <h1 className="mt-7 max-w-5xl font-serif text-[42px] font-semibold leading-tight tracking-[-0.045em] text-white sm:text-[56px] lg:text-[64px]">
                            Struktur Organisasi
                        </h1>

                        <p className="mt-5 max-w-[720px] text-[16px] font-medium leading-8 text-blue-50 sm:text-[18px]">
                            Susunan pimpinan dan pengelola sekolah.
                        </p>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        {points.map((item, index) => (
                            <div
                                key={item.value}
                                className={`text-center text-white ${
                                    index !== points.length - 1
                                        ? "lg:border-r lg:border-white/20"
                                        : ""
                                }`}
                            >
                                <div className="text-[42px] leading-none text-[#f7c46a]">
                                    {item.icon}
                                </div>

                                <p className="mt-4 text-[14px] font-medium text-blue-100">
                                    {item.title}
                                </p>

                                <p className="mt-1 font-serif text-[24px] font-semibold leading-tight text-white">
                                    {item.value}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

function SimpleProfileHero({ activeMenu, school }) {
    const heroTitle =
        activeMenu.key === "history"
            ? `Sejarah ${school.name || "SMA Negeri 1 Mojokerto"}`
            : activeMenu.label;

    const heroDescription =
        activeMenu.key === "history"
            ? "Perjalanan dan perkembangan sekolah dari masa berdiri hingga menjadi lembaga pendidikan yang terus berinovasi."
            : activeMenu.description;

    return (
        <section className="relative w-full overflow-hidden bg-[#052b66]">
            <div className="relative min-h-[260px] w-full overflow-hidden sm:min-h-[300px] lg:min-h-[320px]">
                <img
                    src={school.heroImage || "/frontend/images/profile-hero.jpg"}
                    alt={heroTitle}
                    className="absolute inset-0 h-full w-full object-cover object-center"
                    onError={(event) => {
                        event.currentTarget.src =
                            "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1800&q=85";
                    }}
                />

                <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(3,29,74,0.98)_0%,rgba(3,42,101,0.92)_45%,rgba(4,62,145,0.50)_76%,rgba(4,62,145,0.18)_100%)]" />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(3,24,58,0.10)_0%,rgba(3,24,58,0.02)_50%,rgba(3,24,58,0.40)_100%)]" />

                <div className="relative z-10 flex min-h-[260px] flex-col justify-center px-4 py-10 sm:min-h-[300px] sm:px-6 lg:min-h-[320px] lg:px-10 xl:px-14 2xl:px-16">
                    <div className="flex flex-wrap items-center gap-3 text-[13px] font-medium text-blue-100">
                        <a href="/" className="hover:text-white">
                            Beranda
                        </a>
                        <span>›</span>
                        <span>Profil</span>
                        <span>›</span>
                        <span className="text-white">{activeMenu.label}</span>
                    </div>

                    <h1 className="mt-7 max-w-5xl font-serif text-[38px] font-semibold leading-tight tracking-[-0.04em] text-white sm:text-[52px] lg:text-[62px]">
                        {heroTitle}
                    </h1>

                    <p className="mt-5 max-w-[720px] text-[16px] font-medium leading-8 text-blue-50 sm:text-[18px]">
                        {heroDescription}
                    </p>
                </div>
            </div>
        </section>
    );
}

export default function PageHero({ activeTab, activeMenu, profileData }) {
    const school = profileData?.school || {};
    const heroStats = profileData?.heroStats || [];
    const profileStats = profileData?.profileStats || [];

    if (activeTab === "profile") {
        return <MainProfileHero school={school} heroStats={heroStats} />;
    }

    if (activeTab === "vision") {
        return (
            <VisionHero
                activeMenu={activeMenu}
                school={school}
                profileStats={profileStats}
            />
        );
    }

    if (activeTab === "structure") {
        return <StructureHero activeMenu={activeMenu} school={school} />;
    }

    return <SimpleProfileHero activeMenu={activeMenu} school={school} />;
}