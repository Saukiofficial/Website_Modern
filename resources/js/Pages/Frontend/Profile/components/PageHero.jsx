function MainProfileHero({ school, heroStats }) {
    const stats = Array.isArray(heroStats) ? heroStats : [];

    return (
        <section className="relative w-full overflow-hidden bg-[#052b66]">
            <div className="relative min-h-[560px] w-full overflow-hidden sm:min-h-[600px] lg:min-h-[620px]">
                <img
                    src={school.heroImage || "/frontend/images/profile-hero.jpg"}
                    alt="Profil Sekolah"
                    className="absolute inset-0 h-full w-full object-cover object-center"
                    onError={(event) => {
                        event.currentTarget.src =
                            "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1800&q=85";
                    }}
                />

                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(3,29,74,0.96)_0%,rgba(3,42,101,0.88)_48%,rgba(4,62,145,0.70)_100%)] lg:bg-[linear-gradient(90deg,rgba(3,29,74,0.98)_0%,rgba(3,42,101,0.93)_40%,rgba(4,62,145,0.50)_72%,rgba(4,62,145,0.14)_100%)]" />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(3,24,58,0.10)_0%,rgba(3,24,58,0.02)_45%,rgba(3,24,58,0.42)_100%)]" />

                <div className="relative z-10 grid min-h-[560px] w-full grid-cols-1 items-center gap-8 px-4 py-12 sm:min-h-[600px] sm:px-6 lg:min-h-[620px] lg:grid-cols-[0.9fr_1.1fr] lg:px-10 xl:px-14 2xl:px-16">
                    <div className="max-w-[680px] min-w-0">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-blue-100 sm:text-[12px] sm:tracking-[0.22em]">
                            Profil Sekolah
                        </p>

                        <h1 className="mt-6 max-w-[680px] break-words font-serif text-[36px] font-semibold leading-[1.08] tracking-[-0.04em] text-white sm:mt-8 sm:text-[52px] lg:text-[64px] xl:text-[72px]">
                            Mengenal Lebih Dekat
                            <br />
                            <span className="text-[#f7c46a]">
                                {school.shortName || "SMA Negeri 1"}
                            </span>
                            <br />
                            {school.city || "Sumenep"}
                        </h1>

                        <p className="mt-5 max-w-[620px] text-[14px] font-medium leading-7 text-blue-50 sm:mt-7 sm:text-[18px] sm:leading-8">
                            {school.description}
                        </p>

                        <a
                            href="#profil-sekolah"
                            className="mt-7 inline-flex min-h-[50px] w-full items-center justify-center gap-3 rounded-[10px] border border-[#f7c46a]/70 px-5 text-center text-[12px] font-semibold uppercase tracking-[0.06em] text-white transition hover:bg-white/10 sm:mt-9 sm:w-auto sm:min-h-[56px] sm:gap-4 sm:px-8 sm:text-[13px] sm:tracking-[0.08em]"
                        >
                            Jelajahi Profil Sekolah
                            <span className="text-[20px] leading-none sm:text-[22px]">
                                →
                            </span>
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

            {stats.length > 0 ? (
                <div className="relative z-20 -mt-14 px-4 sm:px-6 lg:hidden">
                    <div className="grid overflow-hidden rounded-[20px] border border-white/20 bg-white shadow-2xl shadow-blue-950/10 sm:grid-cols-2">
                        {stats.slice(0, 4).map((item, index) => (
                            <div
                                key={item.label || item.value}
                                className={`flex items-center gap-4 px-4 py-5 ${
                                    index !== stats.slice(0, 4).length - 1
                                        ? "border-b border-slate-200 sm:border-r sm:last:border-r-0"
                                        : ""
                                }`}
                            >
                                <div className="text-[30px] leading-none text-[#052b66]">
                                    {item.icon}
                                </div>

                                <div>
                                    <p className="font-serif text-[28px] font-semibold leading-none text-[#061b46]">
                                        {item.value}
                                    </p>

                                    {item.label ? (
                                        <p className="mt-1 text-[12px] font-medium text-slate-600">
                                            {item.label}
                                        </p>
                                    ) : null}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : null}
        </section>
    );
}

function VisionHero({ activeMenu, school, profileStats }) {
    const stats = Array.isArray(profileStats) ? profileStats : [];

    return (
        <section className="relative w-full overflow-hidden bg-[#052b66]">
            <div className="relative min-h-[390px] w-full overflow-hidden sm:min-h-[420px] lg:min-h-[450px]">
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

                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(3,29,74,0.98)_0%,rgba(3,42,101,0.90)_52%,rgba(4,62,145,0.70)_100%)] lg:bg-[linear-gradient(90deg,rgba(3,29,74,0.99)_0%,rgba(3,42,101,0.94)_42%,rgba(4,62,145,0.45)_74%,rgba(4,62,145,0.10)_100%)]" />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(3,24,58,0.05)_0%,rgba(3,24,58,0.02)_48%,rgba(3,24,58,0.36)_100%)]" />

                <div className="relative z-10 flex min-h-[390px] flex-col justify-center px-4 py-10 sm:min-h-[420px] sm:px-6 lg:min-h-[450px] lg:px-10 xl:px-14 2xl:px-16">
                    <div className="flex flex-wrap items-center gap-2 text-[12px] font-medium text-blue-100 sm:gap-3 sm:text-[13px]">
                        <a href="/" className="hover:text-white">
                            Beranda
                        </a>
                        <span>›</span>
                        <span>Profil</span>
                        <span>›</span>
                        <span className="text-white">{activeMenu.label}</span>
                    </div>

                    <h1 className="mt-6 max-w-5xl break-words font-serif text-[36px] font-semibold leading-tight tracking-[-0.04em] text-white sm:mt-7 sm:text-[56px] lg:text-[64px]">
                        Visi & Misi
                    </h1>

                    <p className="mt-4 max-w-[760px] text-[14px] font-medium leading-7 text-blue-50 sm:mt-5 sm:text-[18px] sm:leading-8">
                        {school.vision ||
                            "Membangun generasi yang unggul secara akademik, berkarakter global, dan berbudaya Indonesia."}
                    </p>

                    <div className="mt-6 grid max-w-[760px] overflow-hidden rounded-[16px] border border-white/20 bg-[#052b66]/35 shadow-2xl shadow-blue-950/20 backdrop-blur-md sm:mt-8 sm:grid-cols-2 lg:grid-cols-4">
                        {stats.slice(0, 4).map((item, index) => (
                            <div
                                key={item.label}
                                className={`flex min-w-0 items-center gap-3 px-4 py-4 text-white sm:gap-4 sm:px-5 sm:py-5 ${
                                    index !== 3
                                        ? "border-b border-white/15 sm:border-r lg:border-b-0"
                                        : ""
                                }`}
                            >
                                <div className="shrink-0 text-[28px] leading-none text-[#f7c46a] sm:text-[32px]">
                                    {item.icon}
                                </div>

                                <div className="min-w-0">
                                    <p className="break-words font-serif text-[24px] font-semibold leading-none text-white sm:text-[26px]">
                                        {item.value}
                                    </p>

                                    <p className="mt-1 break-words text-[11.5px] font-medium text-blue-100 sm:text-[12px]">
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
            <div className="relative min-h-[430px] w-full overflow-hidden sm:min-h-[460px] lg:min-h-[360px]">
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

                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(3,29,74,0.98)_0%,rgba(3,42,101,0.90)_54%,rgba(4,62,145,0.76)_100%)] lg:bg-[linear-gradient(90deg,rgba(3,29,74,0.99)_0%,rgba(3,42,101,0.94)_43%,rgba(4,62,145,0.55)_78%,rgba(4,62,145,0.18)_100%)]" />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(3,24,58,0.08)_0%,rgba(3,24,58,0.02)_52%,rgba(3,24,58,0.38)_100%)]" />

                <div className="relative z-10 grid min-h-[430px] grid-cols-1 items-center gap-8 px-4 py-10 sm:min-h-[460px] sm:px-6 lg:min-h-[360px] lg:grid-cols-[0.95fr_1.05fr] lg:px-10 xl:px-14 2xl:px-16">
                    <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2 text-[12px] font-medium text-blue-100 sm:gap-3 sm:text-[13px]">
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

                        <h1 className="mt-6 max-w-5xl break-words font-serif text-[36px] font-semibold leading-tight tracking-[-0.04em] text-white sm:mt-7 sm:text-[56px] lg:text-[64px]">
                            Struktur Organisasi
                        </h1>

                        <p className="mt-4 max-w-[720px] text-[14px] font-medium leading-7 text-blue-50 sm:mt-5 sm:text-[18px] sm:leading-8">
                            Susunan pimpinan dan pengelola sekolah.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
                        {points.map((item, index) => (
                            <div
                                key={item.value}
                                className={`rounded-[16px] border border-white/15 bg-white/10 p-3 text-center text-white backdrop-blur-sm sm:p-4 lg:border-0 lg:bg-transparent lg:p-0 ${
                                    index !== points.length - 1
                                        ? "lg:border-r lg:border-white/20"
                                        : ""
                                }`}
                            >
                                <div className="text-[30px] leading-none text-[#f7c46a] sm:text-[36px] lg:text-[42px]">
                                    {item.icon}
                                </div>

                                <p className="mt-3 text-[11.5px] font-medium leading-5 text-blue-100 sm:text-[13px] lg:text-[14px]">
                                    {item.title}
                                </p>

                                <p className="mt-1 break-words font-serif text-[16px] font-semibold leading-tight text-white sm:text-[20px] lg:text-[24px]">
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
            ? `Sejarah ${school.name || "SMA Negeri 1 Sumenep"}`
            : activeMenu.label;

    const heroDescription =
        activeMenu.key === "history"
            ? "Perjalanan dan perkembangan sekolah dari masa berdiri hingga menjadi lembaga pendidikan yang terus berinovasi."
            : activeMenu.description;

    return (
        <section className="relative w-full overflow-hidden bg-[#052b66]">
            <div className="relative min-h-[290px] w-full overflow-hidden sm:min-h-[300px] lg:min-h-[320px]">
                <img
                    src={school.heroImage || "/frontend/images/profile-hero.jpg"}
                    alt={heroTitle}
                    className="absolute inset-0 h-full w-full object-cover object-center"
                    onError={(event) => {
                        event.currentTarget.src =
                            "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1800&q=85";
                    }}
                />

                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(3,29,74,0.98)_0%,rgba(3,42,101,0.90)_54%,rgba(4,62,145,0.74)_100%)] lg:bg-[linear-gradient(90deg,rgba(3,29,74,0.98)_0%,rgba(3,42,101,0.92)_45%,rgba(4,62,145,0.50)_76%,rgba(4,62,145,0.18)_100%)]" />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(3,24,58,0.10)_0%,rgba(3,24,58,0.02)_50%,rgba(3,24,58,0.40)_100%)]" />

                <div className="relative z-10 flex min-h-[290px] flex-col justify-center px-4 py-10 sm:min-h-[300px] sm:px-6 lg:min-h-[320px] lg:px-10 xl:px-14 2xl:px-16">
                    <div className="flex flex-wrap items-center gap-2 text-[12px] font-medium text-blue-100 sm:gap-3 sm:text-[13px]">
                        <a href="/" className="hover:text-white">
                            Beranda
                        </a>
                        <span>›</span>
                        <span>Profil</span>
                        <span>›</span>
                        <span className="text-white">{activeMenu.label}</span>
                    </div>

                    <h1 className="mt-6 max-w-5xl break-words font-serif text-[34px] font-semibold leading-tight tracking-[-0.04em] text-white sm:mt-7 sm:text-[52px] lg:text-[62px]">
                        {heroTitle}
                    </h1>

                    <p className="mt-4 max-w-[720px] text-[14px] font-medium leading-7 text-blue-50 sm:mt-5 sm:text-[18px] sm:leading-8">
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