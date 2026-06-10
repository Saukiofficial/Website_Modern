import Icon from "./Icon";

function buildHighlights(achievements) {
    const items = Array.isArray(achievements) ? achievements : [];

    const nationalAchievements = items.filter((item) => {
        const level = String(item.level || "").toLowerCase();
        return level.includes("nasional");
    }).length;

    const academicAchievements = items.filter((item) => {
        const text = `${item.title || ""} ${item.level || ""} ${item.rank || ""}`.toLowerCase();

        return (
            text.includes("akademik") ||
            text.includes("olimpiade") ||
            text.includes("sains") ||
            text.includes("literasi") ||
            text.includes("teknologi")
        );
    }).length;

    const nonAcademicAchievements = Math.max(
        items.length - academicAchievements,
        0
    );

    if (items.length > 0) {
        return [
            {
                title: `${academicAchievements || items.length}\nPrestasi Akademik`,
                icon: "book",
            },
            {
                title: `${nonAcademicAchievements || items.length}\nPrestasi Non-Akademik`,
                icon: "trophy",
            },
            {
                title: "Kompetisi\nTingkat Daerah",
                icon: "award",
            },
            {
                title: `${nationalAchievements || "Capaian"}\nNasional`,
                icon: "graduate",
            },
        ];
    }

    return [
        {
            title: "Prestasi\nAkademik",
            icon: "book",
        },
        {
            title: "Prestasi\nNon-Akademik",
            icon: "trophy",
        },
        {
            title: "Kompetisi\nTingkat Daerah",
            icon: "award",
        },
        {
            title: "Capaian\nNasional",
            icon: "graduate",
        },
    ];
}

export default function AchievementHero({ page = null, academicData = null }) {
    const achievements = academicData?.achievements || [];
    const highlights = buildHighlights(achievements);

    const heroImage =
        page?.achievement_hero_image ||
        page?.achievementHeroImage ||
        page?.hero_image ||
        page?.heroImage ||
        "/frontend/images/achievement-hero.jpg";

    const heroTitle =
        page?.achievement_title ||
        page?.achievementTitle ||
        "Prestasi Siswa Berprestasi";

    const heroDescription =
        page?.achievement_description ||
        page?.achievementDescription ||
        "Dokumentasi capaian akademik dan non-akademik siswa sebagai bukti komitmen sekolah terhadap kualitas pendidikan.";

    const titleParts = String(heroTitle).split(" ");

    return (
        <section className="relative w-full overflow-hidden bg-[#052b66]">
            <div className="relative min-h-[500px] w-full overflow-hidden lg:min-h-[540px] xl:min-h-[560px]">
                <img
                    src={heroImage}
                    alt={heroTitle}
                    className="absolute inset-0 h-full w-full object-cover object-center"
                    onError={(event) => {
                        event.currentTarget.src =
                            "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?auto=format&fit=crop&w=1800&q=85";
                    }}
                />

                <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(3,29,74,0.99)_0%,rgba(3,42,101,0.96)_33%,rgba(4,62,145,0.72)_58%,rgba(4,62,145,0.18)_100%)]" />

                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(3,24,58,0.08)_0%,rgba(3,24,58,0.02)_52%,rgba(3,24,58,0.42)_100%)]" />

                <div className="absolute left-[35%] top-0 hidden h-full w-[360px] rotate-[14deg] bg-[#0d58cf]/18 blur-[1px] lg:block" />

                <div className="absolute inset-0 opacity-[0.22]">
                    <div className="absolute left-[18%] top-[20%] h-1 w-1 rounded-full bg-white" />
                    <div className="absolute left-[28%] top-[32%] h-2 w-2 rounded-full bg-blue-200" />
                    <div className="absolute left-[34%] top-[45%] h-1.5 w-1.5 rounded-full bg-white" />
                    <div className="absolute left-[22%] top-[60%] h-1 w-1 rounded-full bg-blue-200" />
                    <div className="absolute left-[42%] top-[26%] h-2 w-2 rounded-full bg-white" />
                </div>

                <div className="relative z-10 px-4 pb-10 pt-8 sm:px-6 lg:px-10 lg:pb-12 lg:pt-10 xl:px-14 2xl:px-16">
                    <div className="flex flex-wrap items-center gap-3 text-[12px] font-medium text-blue-100">
                        <a href="/" className="hover:text-white">
                            Beranda
                        </a>
                        <span>›</span>
                        <span>Akademik</span>
                        <span>›</span>
                        <span className="text-white">Prestasi Siswa</span>
                    </div>

                    <div className="mt-8 max-w-[620px]">
                        <span className="inline-flex rounded-full bg-[#0d58cf] px-4 py-2 text-[12px] font-semibold uppercase tracking-[0.12em] text-white shadow-lg shadow-blue-950/20">
                            Prestasi
                        </span>

                        <h1 className="mt-5 text-[42px] font-semibold leading-[0.96] tracking-[-0.055em] text-white sm:text-[56px] lg:text-[66px] xl:text-[76px]">
                            {titleParts.length > 1 ? (
                                <>
                                    {titleParts.slice(0, -1).join(" ")}
                                    <br />
                                    {titleParts.slice(-1)}
                                </>
                            ) : (
                                heroTitle
                            )}
                        </h1>

                        <p className="mt-5 max-w-[560px] text-[15px] font-semibold leading-8 text-blue-50 sm:text-[17px]">
                            {heroDescription}
                        </p>

                        <div className="mt-9 grid max-w-[760px] gap-3 sm:grid-cols-2 xl:grid-cols-4">
                            {highlights.map((item) => (
                                <div
                                    key={item.title}
                                    className="flex min-h-[74px] items-center gap-3 rounded-[20px] border border-white/10 bg-[#0d58cf]/35 px-4 py-4 text-white shadow-lg shadow-blue-950/20 backdrop-blur-sm"
                                >
                                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#0d58cf] text-white shadow-lg shadow-blue-950/20">
                                        <Icon
                                            type={item.icon}
                                            className="h-6 w-6"
                                        />
                                    </div>

                                    <p className="whitespace-pre-line text-[12px] font-semibold leading-5">
                                        {item.title}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}