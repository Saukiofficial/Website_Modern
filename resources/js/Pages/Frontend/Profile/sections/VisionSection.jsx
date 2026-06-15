const fallbackMissionItems = [
    {
        title: "Pendidikan Berkualitas",
        description:
            "Menyelenggarakan pendidikan yang berkualitas, inovatif, dan berorientasi pada perkembangan peserta didik.",
        icon: "🎓",
    },
    {
        title: "Karakter & Kepedulian",
        description:
            "Membentuk karakter siswa yang disiplin, religius, bertanggung jawab, dan peduli terhadap lingkungan.",
        icon: "🧑‍🏫",
    },
    {
        title: "Pengembangan Potensi",
        description:
            "Mengembangkan potensi akademik dan non-akademik siswa melalui pembelajaran aktif dan kegiatan ekstrakurikuler.",
        icon: "🏁",
    },
    {
        title: "Profesionalisme",
        description:
            "Meningkatkan profesionalitas guru dan tenaga kependidikan secara berkelanjutan.",
        icon: "💡",
    },
    {
        title: "Kolaborasi",
        description:
            "Membangun kerja sama dengan orang tua, masyarakat, dan berbagai pihak dalam mendukung kemajuan sekolah.",
        icon: "🌐",
    },
];

const fallbackCoreValues = [
    {
        title: "Excellence",
        description:
            "Berkomitmen pada mutu dan prestasi terbaik dalam setiap aspek.",
        icon: "☆",
    },
    {
        title: "Integrity",
        description:
            "Menjunjung tinggi kejujuran, integritas, dan tanggung jawab.",
        icon: "🛡️",
    },
    {
        title: "Respect",
        description:
            "Menghargai perbedaan dan menumbuhkan budaya saling menghormati.",
        icon: "🤝",
    },
    {
        title: "Innovation",
        description:
            "Terbuka terhadap ide baru dan terus berinovasi untuk masa depan.",
        icon: "💡",
    },
    {
        title: "Global Citizenship",
        description:
            "Berwawasan global dan berkontribusi positif bagi masyarakat dunia.",
        icon: "🌐",
    },
];

const fallbackActionSteps = [
    {
        title: "Visi",
        description: "Arah dan tujuan jangka panjang sekolah.",
        icon: "👁️",
        active: true,
        gold: false,
    },
    {
        title: "Misi",
        description: "Langkah strategis untuk mencapai visi.",
        icon: "🎯",
        active: false,
        gold: false,
    },
    {
        title: "Program",
        description: "Kurikulum, kegiatan, dan layanan pendukung.",
        icon: "📖",
        active: false,
        gold: false,
    },
    {
        title: "Pembentukan Karakter",
        description: "Siswa tumbuh menjadi pribadi unggul dan berdaya saing.",
        icon: "👥",
        active: false,
        gold: false,
    },
    {
        title: "Prestasi",
        description: "Mewujudkan capaian akademik dan non-akademik.",
        icon: "🏆",
        active: false,
        gold: true,
    },
];

function MissionCard({ item, index }) {
    return (
        <article className="relative min-w-0 rounded-[20px] border border-slate-200 bg-white p-5 text-center shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl sm:rounded-[22px] sm:p-6">
            <div className="relative mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-50 text-[34px] sm:h-20 sm:w-20 sm:text-[42px]">
                {item.icon || "🎓"}

                <div className="absolute -bottom-3 left-1/2 flex h-7 w-7 -translate-x-1/2 items-center justify-center rounded-full bg-[#052b66] text-[10px] font-semibold text-white sm:h-8 sm:w-8 sm:text-[11px]">
                    {String(index + 1).padStart(2, "0")}
                </div>
            </div>

            <h3 className="mt-8 break-words text-[16px] font-semibold leading-tight text-[#061b46] sm:mt-9 sm:text-[17px]">
                {item.title}
            </h3>

            <p className="mt-3 break-words text-[12.5px] font-medium leading-6 text-slate-600 sm:mt-4">
                {item.description}
            </p>
        </article>
    );
}

function CoreValueCard({ item }) {
    return (
        <article className="min-w-0 rounded-[18px] border border-slate-200 bg-white p-5 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
            <div className="text-[38px] leading-none text-[#d5a542] sm:text-[42px]">
                {item.icon || "☆"}
            </div>

            <h3 className="mt-4 break-words text-[16px] font-semibold text-[#061b46] sm:mt-5 sm:text-[17px]">
                {item.title}
            </h3>

            <p className="mt-3 break-words text-[12.5px] font-medium leading-6 text-slate-600">
                {item.description}
            </p>
        </article>
    );
}

function ActionStepCard({ item }) {
    return (
        <div
            className={`flex min-h-[150px] min-w-0 flex-col items-center justify-center rounded-[22px] border p-5 text-center shadow-lg sm:min-h-[170px] sm:rounded-full sm:p-6 ${
                item.active
                    ? "border-[#052b66] bg-[#052b66] text-white"
                    : item.gold
                    ? "border-[#d5a542] bg-[#d5a542] text-white"
                    : "border-slate-200 bg-white text-[#061b46]"
            }`}
        >
            <div className="text-[30px] sm:text-[34px]">{item.icon || "👁️"}</div>

            <h3 className="mt-3 break-words text-[13px] font-semibold uppercase sm:text-[15px]">
                {item.title}
            </h3>

            <p
                className={`mt-2 break-words text-[11px] font-medium leading-5 sm:text-[11.5px] ${
                    item.active || item.gold
                        ? "text-white/90"
                        : "text-slate-600"
                }`}
            >
                {item.description}
            </p>
        </div>
    );
}

export default function VisionSection({ profileData }) {
    const school = profileData?.school || {};

    const visionHeroImage =
        school.visionHeroImage || "/frontend/images/vision-hero.jpg";

    const visionBannerImage =
        school.visionBannerImage || "/frontend/images/vision-banner.jpg";

    const missionItems =
        Array.isArray(profileData?.visionMissionItems) &&
        profileData.visionMissionItems.length > 0
            ? profileData.visionMissionItems
            : fallbackMissionItems;

    const coreValues =
        Array.isArray(profileData?.coreValues) &&
        profileData.coreValues.length > 0
            ? profileData.coreValues
            : fallbackCoreValues;

    const actionSteps =
        Array.isArray(profileData?.visionActionSteps) &&
        profileData.visionActionSteps.length > 0
            ? profileData.visionActionSteps
            : fallbackActionSteps;

    return (
        <div className="w-full min-w-0 space-y-6 sm:space-y-10">
            <section className="min-w-0 overflow-hidden rounded-[22px] bg-white shadow-xl shadow-slate-200/70 sm:rounded-[28px]">
                <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr]">
                    <div className="relative min-h-[300px] overflow-hidden bg-[#052b66] sm:min-h-[420px] lg:min-h-[520px]">
                        <img
                            src={visionHeroImage}
                            alt="Visi dan Misi Sekolah"
                            className="absolute inset-0 h-full w-full object-cover"
                            onError={(event) => {
                                event.currentTarget.src =
                                    "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1400&q=85";
                            }}
                        />

                        <div className="absolute inset-0 bg-gradient-to-t from-[#052b66]/80 via-[#052b66]/30 to-transparent" />

                        <div className="absolute bottom-0 left-0 right-0 p-5 text-white sm:p-8">
                            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#f7c46a] sm:text-[11px] sm:tracking-[0.24em]">
                                Visi Misi Sekolah
                            </p>

                            <h3 className="mt-3 max-w-[560px] break-words font-serif text-[26px] font-semibold leading-tight tracking-[-0.035em] sm:text-[38px]">
                                Arah Pendidikan untuk Masa Depan Siswa
                            </h3>
                        </div>
                    </div>

                    <div className="relative min-w-0 overflow-hidden p-5 sm:p-8 lg:p-10">
                        <div className="absolute -right-10 -top-10 hidden h-44 w-44 rounded-full bg-blue-50 lg:block" />
                        <div className="absolute -bottom-12 -left-12 hidden h-52 w-52 rounded-full bg-[#f7c46a]/10 lg:block" />

                        <div className="relative min-w-0">
                            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#0d58cf] sm:tracking-[0.24em]">
                                Our Vision
                            </p>

                            <h2 className="mt-4 break-words font-serif text-[30px] font-semibold leading-tight tracking-[-0.035em] text-[#061b46] sm:text-[44px]">
                                {school.vision ||
                                    "Menjadi sekolah unggul yang menghasilkan pemimpin masa depan berkarakter, berprestasi, dan berwawasan global."}
                            </h2>

                            <div className="mt-5 h-[2px] w-20 rounded-full bg-[#d5a542] sm:mt-6" />

                            <p className="mt-6 max-w-[680px] break-words text-[14px] font-medium leading-7 text-slate-600 sm:mt-7 sm:text-[15px] sm:leading-8">
                                Kami berkomitmen menciptakan lingkungan
                                pendidikan yang inspiratif, inovatif, dan
                                inklusif untuk mencetak generasi unggul yang
                                siap menghadapi tantangan dunia.
                            </p>

                            <div className="mt-6 grid grid-cols-1 gap-4 sm:mt-8 sm:grid-cols-2">
                                <div className="min-w-0 rounded-[20px] border border-slate-200 bg-white p-5 shadow-sm">
                                    <div className="text-[32px] sm:text-[34px]">
                                        🎯
                                    </div>
                                    <h3 className="mt-4 text-[16px] font-semibold text-[#061b46]">
                                        Fokus Tujuan
                                    </h3>
                                    <p className="mt-2 break-words text-[12.5px] font-medium leading-6 text-slate-600">
                                        Menyelaraskan program sekolah dengan
                                        kebutuhan peserta didik.
                                    </p>
                                </div>

                                <div className="min-w-0 rounded-[20px] border border-slate-200 bg-white p-5 shadow-sm">
                                    <div className="text-[32px] sm:text-[34px]">
                                        🌐
                                    </div>
                                    <h3 className="mt-4 text-[16px] font-semibold text-[#061b46]">
                                        Wawasan Global
                                    </h3>
                                    <p className="mt-2 break-words text-[12.5px] font-medium leading-6 text-slate-600">
                                        Membentuk siswa yang siap bersaing dan
                                        berkontribusi luas.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="min-w-0 rounded-[22px] bg-white p-5 shadow-xl shadow-slate-200/70 sm:rounded-[28px] sm:p-8 lg:p-10">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#0d58cf] sm:tracking-[0.24em]">
                    Our Mission
                </p>

                <h2 className="mt-4 break-words font-serif text-[30px] font-semibold tracking-[-0.035em] text-[#061b46] sm:text-[44px]">
                    Misi Kami
                </h2>

                <div className="mt-5 h-[2px] w-20 rounded-full bg-[#d5a542]" />

                {Array.isArray(school.missions) && school.missions.length > 0 ? (
                    <div className="mt-6 rounded-[22px] border border-blue-100 bg-blue-50 p-4 sm:mt-8 sm:p-6">
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            {school.missions.map((mission, index) => (
                                <div
                                    key={`${mission}-${index}`}
                                    className="flex min-w-0 gap-3 rounded-[18px] bg-white p-4 shadow-sm sm:gap-4"
                                >
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#052b66] text-[12px] font-semibold text-white">
                                        {String(index + 1).padStart(2, "0")}
                                    </div>

                                    <p className="break-words text-[13px] font-medium leading-7 text-slate-700 sm:text-[13.5px]">
                                        {mission}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : null}

                <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 xl:grid-cols-3 2xl:grid-cols-5">
                    {missionItems.map((item, index) => (
                        <MissionCard
                            key={`${item.title}-${index}`}
                            item={item}
                            index={index}
                        />
                    ))}
                </div>
            </section>

            <section className="min-w-0 rounded-[22px] bg-white p-5 shadow-xl shadow-slate-200/70 sm:rounded-[28px] sm:p-8 lg:p-10">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#0d58cf] sm:tracking-[0.24em]">
                    Our Core Values
                </p>

                <h2 className="mt-4 break-words font-serif text-[30px] font-semibold tracking-[-0.035em] text-[#061b46] sm:text-[44px]">
                    Nilai-Nilai Utama Kami
                </h2>

                <div className="mt-6 grid grid-cols-1 gap-4 sm:mt-7 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-5">
                    {coreValues.map((item, index) => (
                        <CoreValueCard
                            key={`${item.title}-${index}`}
                            item={item}
                        />
                    ))}
                </div>
            </section>

            <section className="min-w-0 rounded-[22px] bg-[#f4f8fc] px-4 py-6 sm:rounded-[28px] sm:px-2 sm:py-8">
                <div className="text-center">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#0d58cf] sm:tracking-[0.24em]">
                        Visi Menjadi Tindakan Nyata
                    </p>

                    <h2 className="mt-3 break-words font-serif text-[28px] font-semibold tracking-[-0.035em] text-[#061b46] sm:text-[40px]">
                        Dari Visi Menuju Prestasi
                    </h2>
                </div>

                <div className="mt-8 grid grid-cols-1 gap-4 sm:mt-10 sm:grid-cols-2 xl:grid-cols-5 xl:items-center">
                    {actionSteps.map((item, index) => (
                        <div key={`${item.title}-${index}`} className="relative min-w-0">
                            <ActionStepCard item={item} />

                            {index !== actionSteps.length - 1 ? (
                                <div className="absolute right-[-18px] top-1/2 z-10 hidden -translate-y-1/2 text-[28px] text-[#052b66] xl:block">
                                    →
                                </div>
                            ) : null}
                        </div>
                    ))}
                </div>
            </section>

            <section className="min-w-0 overflow-hidden rounded-[22px] bg-[#052b66] shadow-2xl shadow-blue-200 sm:rounded-[28px]">
                <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr]">
                    <div className="min-h-[240px] sm:min-h-[280px]">
                        <img
                            src={visionBannerImage}
                            alt="Learning Today Leading Tomorrow"
                            className="h-full w-full object-cover"
                            onError={(event) => {
                                event.currentTarget.src =
                                    "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1400&q=85";
                            }}
                        />
                    </div>

                    <div className="relative min-w-0 p-5 text-white sm:p-9 lg:p-10">
                        <div className="absolute right-8 top-8 hidden text-[130px] leading-none text-white/5 lg:block">
                            🛡️
                        </div>

                        <div className="relative min-w-0">
                            <h2 className="break-words font-serif text-[30px] font-semibold leading-tight tracking-[-0.035em] sm:text-[44px]">
                                <span className="text-[#f7c46a]">
                                    Learning
                                </span>{" "}
                                Today,
                                <br />
                                Leading Tomorrow
                            </h2>

                            <p className="mt-5 max-w-[560px] break-words text-[14px] font-medium leading-7 text-blue-100 sm:text-[15px] sm:leading-8">
                                Kami percaya setiap siswa memiliki potensi luar
                                biasa untuk menjadi pemimpin masa depan yang
                                membawa perubahan positif bagi dunia.
                            </p>

                            <a
                                href="/ppdb"
                                className="mt-6 inline-flex min-h-[50px] w-full items-center justify-center gap-3 rounded-[12px] bg-[#d5a542] px-6 text-center text-[13px] font-semibold text-[#061b46] transition hover:bg-[#f7c46a] sm:mt-7 sm:w-auto sm:px-7"
                            >
                                Bergabung Bersama Kami
                                <span>→</span>
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}