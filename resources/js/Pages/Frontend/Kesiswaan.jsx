import FrontendLayout from "../../Layouts/FrontendLayout";

const stats = [
    {
        value: "1.245+",
        label: "Siswa Aktif",
        icon: "👥",
    },
    {
        value: "45+",
        label: "Ekstrakurikuler",
        icon: "🏆",
    },
    {
        value: "36",
        label: "Pengurus OSIS",
        icon: "🧑‍💼",
    },
    {
        value: "120+",
        label: "Prestasi Siswa",
        icon: "🏅",
    },
];

const programs = [
    {
        title: "OSIS & Kepemimpinan",
        description:
            "Wadah pembinaan karakter, organisasi, tanggung jawab, dan kemampuan kepemimpinan siswa.",
        icon: "👥",
        href: "/kesiswaan/osis",
    },
    {
        title: "Ekstrakurikuler",
        description:
            "Program pengembangan minat dan bakat siswa melalui kegiatan olahraga, seni, sains, dan teknologi.",
        icon: "🎯",
        href: "/kesiswaan/ekstrakurikuler",
    },
    {
        title: "Bimbingan Konseling",
        description:
            "Layanan pendampingan siswa dalam pengembangan pribadi, sosial, akademik, dan karier.",
        icon: "🤝",
        href: "/kesiswaan/bimbingan-konseling",
    },
];

const values = [
    {
        title: "Karakter",
        description: "Berintegritas & Bertanggung Jawab",
        icon: "🛡️",
    },
    {
        title: "Kreativitas",
        description: "Inovatif & Berdaya Saing",
        icon: "💡",
    },
    {
        title: "Kepemimpinan",
        description: "Berani Memimpin & Melayani",
        icon: "👥",
    },
    {
        title: "Prestasi",
        description: "Mengukir Prestasi Gemilang",
        icon: "🏆",
    },
];

function StatCard({ item }) {
    return (
        <div className="rounded-[16px] border border-white/20 bg-white/10 p-4 text-white shadow-2xl shadow-blue-950/20 backdrop-blur-md sm:p-5">
            <div className="text-[28px] leading-none text-[#d5a542] sm:text-[32px]">
                {item.icon}
            </div>

            <p className="mt-4 font-serif text-[30px] font-semibold leading-none text-white sm:text-[34px]">
                {item.value}
            </p>

            <p className="mt-2 text-[13px] font-medium text-blue-50 sm:text-[14px]">
                {item.label}
            </p>
        </div>
    );
}

function ProgramCard({ item }) {
    return (
        <a
            href={item.href}
            className="group flex items-center gap-4 rounded-[18px] border border-slate-200 bg-white p-4 shadow-lg shadow-slate-200/70 transition duration-300 hover:-translate-y-1 hover:shadow-xl sm:gap-5 sm:p-5"
        >
            <div className="flex h-[58px] w-[58px] shrink-0 items-center justify-center rounded-[16px] bg-gradient-to-br from-[#052b66] to-[#063f8d] text-[26px] text-white shadow-lg shadow-blue-200 sm:h-[66px] sm:w-[66px] sm:text-[30px]">
                {item.icon}
            </div>

            <div className="min-w-0 flex-1">
                <h3 className="line-clamp-2 font-serif text-[22px] font-semibold leading-tight tracking-[-0.035em] text-[#061b46] sm:text-[26px]">
                    {item.title}
                </h3>

                <p className="mt-2 line-clamp-2 text-[13px] font-medium leading-6 text-slate-600 sm:text-[14px]">
                    {item.description}
                </p>
            </div>

            <div className="shrink-0 text-[28px] font-normal leading-none text-slate-400 transition group-hover:translate-x-1 group-hover:text-[#d5a542] sm:text-[34px]">
                →
            </div>
        </a>
    );
}

function ValueItem({ item, index }) {
    return (
        <div
            className={`flex min-w-0 items-center gap-4 px-5 py-5 sm:px-6 sm:py-6 ${
                index !== values.length - 1
                    ? "border-b border-slate-200 sm:border-r lg:border-b-0"
                    : ""
            }`}
        >
            <div className="shrink-0 text-[32px] leading-none text-slate-500 sm:text-[38px]">
                {item.icon}
            </div>

            <div className="min-w-0">
                <h3 className="break-words text-[15px] font-semibold text-[#061b46] sm:text-[16px]">
                    {item.title}
                </h3>

                <p className="mt-1 break-words text-[12px] font-medium text-slate-500 sm:text-[12.5px]">
                    {item.description}
                </p>
            </div>
        </div>
    );
}

export default function Kesiswaan() {
    return (
        <FrontendLayout>
            <section className="relative w-full overflow-hidden bg-[#052b66]">
                <div className="relative min-h-[520px] w-full overflow-hidden sm:min-h-[580px] lg:min-h-[610px]">
                    <img
                        src="/frontend/images/kesiswaan-hero.jpg"
                        alt="Kesiswaan"
                        className="absolute inset-0 h-full w-full object-cover object-center"
                        onError={(event) => {
                            event.currentTarget.src =
                                "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1900&q=85";
                        }}
                    />

                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(3,29,74,0.98)_0%,rgba(3,42,101,0.90)_52%,rgba(4,62,145,0.75)_100%)] lg:bg-[linear-gradient(90deg,rgba(3,29,74,0.99)_0%,rgba(3,42,101,0.94)_38%,rgba(3,42,101,0.70)_58%,rgba(4,62,145,0.22)_100%)]" />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(3,24,58,0.05)_0%,rgba(3,24,58,0.02)_45%,rgba(3,24,58,0.30)_100%)]" />

                    <div className="relative z-10 grid min-h-[520px] items-center gap-8 px-4 py-12 sm:min-h-[580px] sm:px-6 lg:min-h-[610px] lg:grid-cols-[0.92fr_0.88fr] lg:px-10 xl:px-14 2xl:px-16">
                        <div className="max-w-[740px] min-w-0">
                            <div className="flex flex-wrap items-center gap-2 text-[12px] font-medium text-blue-100 sm:gap-3 sm:text-[13px]">
                                <a href="/" className="hover:text-white">
                                    Beranda
                                </a>
                                <span>/</span>
                                <span className="text-white">Kesiswaan</span>
                            </div>

                            <p className="mt-8 text-[12px] font-semibold uppercase tracking-[0.18em] text-[#d5a542] sm:mt-10 sm:text-[13px] sm:tracking-[0.22em]">
                                Kesiswaan
                            </p>

                            <h1 className="mt-4 break-words font-serif text-[36px] font-semibold leading-[1.08] tracking-[-0.045em] text-white sm:text-[56px] lg:text-[66px] xl:text-[72px]">
                                Membentuk Siswa
                                <br />
                                Aktif, Berkarakter,
                                <br />
                                dan Berprestasi
                            </h1>

                            <p className="mt-6 max-w-[660px] text-[14px] font-medium leading-7 text-blue-50 sm:mt-8 sm:text-[18px] sm:leading-8">
                                Kesiswaan menjadi pusat pembinaan karakter,
                                kepemimpinan, kreativitas, kedisiplinan, dan
                                pengembangan potensi peserta didik.
                            </p>

                            <div className="mt-7 flex flex-col gap-3 sm:mt-9 sm:flex-row sm:gap-4">
                                <a
                                    href="#program-kesiswaan"
                                    className="inline-flex min-h-[52px] items-center justify-center gap-3 rounded-[8px] bg-[#d5a542] px-6 text-[12px] font-semibold uppercase tracking-[0.08em] text-white shadow-lg shadow-blue-950/20 transition hover:bg-[#f7c46a] sm:min-h-[58px] sm:px-8 sm:text-[13px]"
                                >
                                    Lihat Program
                                    <span className="text-[20px] leading-none sm:text-[22px]">
                                        →
                                    </span>
                                </a>

                                <a
                                    href="/akademik"
                                    className="inline-flex min-h-[52px] items-center justify-center rounded-[8px] border border-[#d5a542]/80 px-6 text-[12px] font-semibold uppercase tracking-[0.08em] text-white transition hover:bg-white/10 sm:min-h-[58px] sm:px-8 sm:text-[13px]"
                                >
                                    Lihat Akademik
                                </a>
                            </div>
                        </div>

                        <div className="grid gap-3 sm:grid-cols-2 sm:gap-4 lg:pt-20">
                            {stats.map((item) => (
                                <StatCard key={item.label} item={item} />
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section
                id="program-kesiswaan"
                className="w-full bg-white px-4 py-12 sm:px-6 lg:px-10 lg:py-16 xl:px-14 2xl:px-16"
            >
                <div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
                    <div className="min-w-0">
                        <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[#d5a542] sm:text-[13px] sm:tracking-[0.22em]">
                            Pembinaan Siswa
                        </p>

                        <h2 className="mt-4 max-w-[560px] break-words font-serif text-[32px] font-semibold leading-tight tracking-[-0.04em] text-[#061b46] sm:mt-5 sm:text-[52px]">
                            Ruang Tumbuh untuk Setiap Potensi Siswa
                        </h2>

                        <div className="mt-5 h-[2px] w-20 rounded-full bg-[#d5a542] sm:mt-7" />

                        <p className="mt-5 max-w-[520px] text-[14px] font-medium leading-7 text-slate-600 sm:mt-7 sm:text-[16px] sm:leading-8">
                            Sekolah menghadirkan layanan kesiswaan yang
                            mendukung siswa untuk berkembang secara akademik,
                            sosial, emosional, dan karakter.
                        </p>

                        <div className="mt-7 overflow-hidden rounded-[18px] shadow-xl shadow-slate-200/70 sm:mt-10">
                            <img
                                src="/frontend/images/kesiswaan-card.jpg"
                                alt="Pembinaan Siswa"
                                className="h-[210px] w-full object-cover object-center sm:h-[250px]"
                                onError={(event) => {
                                    event.currentTarget.src =
                                        "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1300&q=85";
                                }}
                            />
                        </div>
                    </div>

                    <div className="space-y-4 sm:space-y-5">
                        {programs.map((item) => (
                            <ProgramCard key={item.title} item={item} />
                        ))}
                    </div>
                </div>
            </section>

            <section className="relative overflow-hidden bg-[#052b66] px-4 py-12 sm:px-6 lg:px-10 lg:py-16 xl:px-14 2xl:px-16">
                <div className="absolute right-10 top-1/2 hidden -translate-y-1/2 text-[360px] leading-none text-white/[0.035] lg:block">
                    🏫
                </div>

                <div className="relative z-10 grid items-center gap-6 lg:grid-cols-[1fr_auto] lg:gap-8">
                    <div className="min-w-0">
                        <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[#d5a542] sm:text-[13px] sm:tracking-[0.22em]">
                            Kembangkan Potensi Bersama Sekolah
                        </p>

                        <h2 className="mt-4 max-w-[780px] break-words font-serif text-[30px] font-semibold leading-tight tracking-[-0.04em] text-white sm:mt-5 sm:text-[52px]">
                            Bersama Mewujudkan Generasi Berkarakter dan
                            Berprestasi
                        </h2>

                        <p className="mt-5 max-w-[720px] text-[14px] font-medium leading-7 text-blue-100 sm:mt-7 sm:text-[16px] sm:leading-8">
                            Melalui kegiatan kesiswaan, siswa diarahkan untuk
                            menjadi pribadi yang percaya diri, disiplin,
                            kreatif, dan siap memimpin.
                        </p>
                    </div>

                    <a
                        href="/ppdb"
                        className="inline-flex min-h-[52px] items-center justify-center gap-3 rounded-[8px] bg-[#d5a542] px-7 text-[12px] font-semibold uppercase tracking-[0.08em] text-white shadow-lg shadow-blue-950/20 transition hover:bg-[#f7c46a] sm:min-h-[58px] sm:px-9 sm:text-[13px]"
                    >
                        Daftar Sekarang
                        <span className="text-[20px] leading-none sm:text-[22px]">
                            →
                        </span>
                    </a>
                </div>
            </section>

            <section className="w-full border-b border-slate-200 bg-white px-4 sm:px-6 lg:px-10 xl:px-14 2xl:px-16">
                <div className="grid sm:grid-cols-2 lg:grid-cols-4">
                    {values.map((item, index) => (
                        <ValueItem
                            key={item.title}
                            item={item}
                            index={index}
                        />
                    ))}
                </div>
            </section>

            <footer className="bg-[#052b66] px-4 py-7 text-center text-white sm:px-6">
                <p className="text-[13px] font-medium text-blue-100">
                    © 2025 SMA Negeri 1 Sumenep. All Rights Reserved.
                </p>
            </footer>
        </FrontendLayout>
    );
}