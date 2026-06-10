import { school } from "../data";

const missionItems = [
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

const coreValues = [
    {
        title: "Excellence",
        description: "Berkomitmen pada mutu dan prestasi terbaik dalam setiap aspek.",
        icon: "☆",
    },
    {
        title: "Integrity",
        description: "Menjunjung tinggi kejujuran, integritas, dan tanggung jawab.",
        icon: "🛡️",
    },
    {
        title: "Respect",
        description: "Menghargai perbedaan dan menumbuhkan budaya saling menghormati.",
        icon: "🤝",
    },
    {
        title: "Innovation",
        description: "Terbuka terhadap ide baru dan terus berinovasi untuk masa depan.",
        icon: "💡",
    },
    {
        title: "Global Citizenship",
        description: "Berwawasan global dan berkontribusi positif bagi masyarakat dunia.",
        icon: "🌐",
    },
];

const actionSteps = [
    {
        title: "Visi",
        description: "Arah dan tujuan jangka panjang sekolah.",
        icon: "👁️",
        active: true,
    },
    {
        title: "Misi",
        description: "Langkah strategis untuk mencapai visi.",
        icon: "🎯",
    },
    {
        title: "Program",
        description: "Kurikulum, kegiatan, dan layanan pendukung.",
        icon: "📖",
    },
    {
        title: "Pembentukan Karakter",
        description: "Siswa tumbuh menjadi pribadi unggul dan berdaya saing.",
        icon: "👥",
    },
    {
        title: "Prestasi",
        description: "Mewujudkan capaian akademik dan non-akademik.",
        icon: "🏆",
        gold: true,
    },
];

export default function VisionSection() {
    return (
        <div className="space-y-10">
            <section className="relative overflow-hidden rounded-[28px] bg-white p-6 shadow-xl shadow-slate-200/70 sm:p-8 lg:p-10">
                <div className="absolute bottom-0 right-0 hidden opacity-20 lg:block">
                    <div className="text-[260px] leading-none">🏫</div>
                </div>

                <div className="relative max-w-[760px]">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#0d58cf]">
                        Our Vision
                    </p>

                    <h2 className="mt-4 font-serif text-[34px] font-semibold leading-tight tracking-[-0.035em] text-[#061b46] sm:text-[44px]">
                        Menjadi sekolah unggul yang menghasilkan pemimpin masa
                        depan berkarakter, berprestasi, dan berwawasan global.
                    </h2>

                    <div className="mt-6 h-[2px] w-20 rounded-full bg-[#d5a542]" />

                    <p className="mt-7 max-w-[680px] text-[15px] font-medium leading-8 text-slate-600">
                        Kami berkomitmen menciptakan lingkungan pendidikan yang
                        inspiratif, inovatif, dan inklusif untuk mencetak
                        generasi unggul yang siap menghadapi tantangan dunia.
                    </p>
                </div>
            </section>

            <section className="rounded-[28px] bg-white p-6 shadow-xl shadow-slate-200/70 sm:p-8 lg:p-10">
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#0d58cf]">
                    Our Mission
                </p>

                <h2 className="mt-4 font-serif text-[34px] font-semibold tracking-[-0.035em] text-[#061b46] sm:text-[44px]">
                    Misi Kami
                </h2>

                <div className="mt-5 h-[2px] w-20 rounded-full bg-[#d5a542]" />

                <div className="mt-10 grid gap-0 lg:grid-cols-5">
                    {missionItems.map((item, index) => (
                        <div
                            key={item.title}
                            className={`relative px-5 py-4 text-center ${
                                index !== missionItems.length - 1
                                    ? "border-b border-slate-200 lg:border-b-0 lg:border-r"
                                    : ""
                            }`}
                        >
                            <div className="relative mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-blue-50 text-[42px]">
                                {item.icon}

                                <div className="absolute -bottom-3 left-1/2 flex h-8 w-8 -translate-x-1/2 items-center justify-center rounded-full bg-[#052b66] text-[11px] font-semibold text-white">
                                    {String(index + 1).padStart(2, "0")}
                                </div>
                            </div>

                            <h3 className="mt-9 text-[17px] font-semibold leading-tight text-[#061b46]">
                                {item.title}
                            </h3>

                            <p className="mt-4 text-[12.5px] font-medium leading-6 text-slate-600">
                                {item.description}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            <section className="rounded-[28px] bg-white p-6 shadow-xl shadow-slate-200/70 sm:p-8 lg:p-10">
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#0d58cf]">
                    Our Core Values
                </p>

                <h2 className="mt-4 font-serif text-[34px] font-semibold tracking-[-0.035em] text-[#061b46] sm:text-[44px]">
                    Nilai-Nilai Utama Kami
                </h2>

                <div className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
                    {coreValues.map((item) => (
                        <div
                            key={item.title}
                            className="rounded-[18px] border border-slate-200 bg-white p-5 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                        >
                            <div className="text-[42px] leading-none text-[#d5a542]">
                                {item.icon}
                            </div>

                            <h3 className="mt-5 text-[17px] font-semibold text-[#061b46]">
                                {item.title}
                            </h3>

                            <p className="mt-3 text-[12.5px] font-medium leading-6 text-slate-600">
                                {item.description}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            <section className="rounded-[28px] bg-[#f4f8fc] px-2 py-4">
                <div className="text-center">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#0d58cf]">
                        Visi Menjadi Tindakan Nyata
                    </p>

                    <h2 className="mt-3 font-serif text-[30px] font-semibold tracking-[-0.035em] text-[#061b46] sm:text-[40px]">
                        Dari Visi Menuju Prestasi
                    </h2>
                </div>

                <div className="mt-10 grid gap-5 lg:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr_auto_1fr] lg:items-center">
                    {actionSteps.map((item, index) => (
                        <div
                            key={item.title}
                            className="contents"
                        >
                            <div
                                className={`flex min-h-[170px] flex-col items-center justify-center rounded-full border p-6 text-center shadow-lg ${
                                    item.active
                                        ? "border-[#052b66] bg-[#052b66] text-white"
                                        : item.gold
                                        ? "border-[#d5a542] bg-[#d5a542] text-white"
                                        : "border-slate-200 bg-white text-[#061b46]"
                                }`}
                            >
                                <div className="text-[34px]">{item.icon}</div>

                                <h3 className="mt-3 text-[15px] font-semibold uppercase">
                                    {item.title}
                                </h3>

                                <p
                                    className={`mt-2 text-[11.5px] font-medium leading-5 ${
                                        item.active || item.gold
                                            ? "text-white/90"
                                            : "text-slate-600"
                                    }`}
                                >
                                    {item.description}
                                </p>
                            </div>

                            {index !== actionSteps.length - 1 ? (
                                <div className="hidden text-center text-[34px] text-[#052b66] lg:block">
                                    →
                                </div>
                            ) : null}
                        </div>
                    ))}
                </div>
            </section>

            <section className="overflow-hidden rounded-[28px] bg-[#052b66] shadow-2xl shadow-blue-200">
                <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
                    <div className="min-h-[280px]">
                        <img
                            src="/frontend/images/vision-banner.jpg"
                            alt="Learning Today Leading Tomorrow"
                            className="h-full w-full object-cover"
                            onError={(event) => {
                                event.currentTarget.src =
                                    "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1400&q=85";
                            }}
                        />
                    </div>

                    <div className="relative p-7 text-white sm:p-9 lg:p-10">
                        <div className="absolute right-8 top-8 hidden text-[130px] leading-none text-white/5 lg:block">
                            🛡️
                        </div>

                        <div className="relative">
                            <h2 className="font-serif text-[34px] font-semibold leading-tight tracking-[-0.035em] sm:text-[44px]">
                                <span className="text-[#f7c46a]">
                                    Learning
                                </span>{" "}
                                Today,
                                <br />
                                Leading Tomorrow
                            </h2>

                            <p className="mt-5 max-w-[560px] text-[15px] font-medium leading-8 text-blue-100">
                                Kami percaya setiap siswa memiliki potensi luar
                                biasa untuk menjadi pemimpin masa depan yang
                                membawa perubahan positif bagi dunia.
                            </p>

                            <a
                                href="#"
                                className="mt-7 inline-flex min-h-[50px] items-center justify-center gap-3 rounded-[12px] bg-[#d5a542] px-7 text-[13px] font-semibold text-[#061b46] transition hover:bg-[#f7c46a]"
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