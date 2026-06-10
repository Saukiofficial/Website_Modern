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
        <div className="rounded-[16px] border border-white/20 bg-white/10 p-6 text-white shadow-2xl shadow-blue-950/20 backdrop-blur-md">
            <div className="text-[34px] leading-none text-[#d5a542]">
                {item.icon}
            </div>

            <p className="mt-6 font-serif text-[38px] font-semibold leading-none text-white">
                {item.value}
            </p>

            <p className="mt-3 text-[15px] font-medium text-blue-50">
                {item.label}
            </p>
        </div>
    );
}

function ProgramCard({ item }) {
    return (
        <a
            href={item.href}
            className="group flex items-center gap-7 rounded-[22px] border border-slate-200 bg-white p-7 shadow-xl shadow-slate-200/70 transition duration-300 hover:-translate-y-1 hover:shadow-2xl"
        >
            <div className="flex h-[78px] w-[78px] shrink-0 items-center justify-center rounded-[20px] bg-gradient-to-br from-[#052b66] to-[#063f8d] text-[34px] text-white shadow-lg shadow-blue-200">
                {item.icon}
            </div>

            <div className="min-w-0 flex-1">
                <h3 className="font-serif text-[30px] font-semibold leading-tight tracking-[-0.035em] text-[#061b46]">
                    {item.title}
                </h3>

                <p className="mt-3 max-w-[620px] text-[15px] font-medium leading-8 text-slate-600">
                    {item.description}
                </p>
            </div>

            <div className="text-[40px] font-normal leading-none text-slate-400 transition group-hover:translate-x-1 group-hover:text-[#d5a542]">
                →
            </div>
        </a>
    );
}

function ValueItem({ item, index }) {
    return (
        <div
            className={`flex items-center gap-4 px-6 py-6 ${
                index !== values.length - 1
                    ? "border-b border-slate-200 lg:border-b-0 lg:border-r"
                    : ""
            }`}
        >
            <div className="text-[38px] leading-none text-slate-500">
                {item.icon}
            </div>

            <div>
                <h3 className="text-[16px] font-semibold text-[#061b46]">
                    {item.title}
                </h3>

                <p className="mt-1 text-[12.5px] font-medium text-slate-500">
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
                <div className="relative min-h-[620px] w-full overflow-hidden lg:min-h-[680px]">
                    <img
                        src="/frontend/images/kesiswaan-hero.jpg"
                        alt="Kesiswaan"
                        className="absolute inset-0 h-full w-full object-cover object-center"
                        onError={(event) => {
                            event.currentTarget.src =
                                "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1900&q=85";
                        }}
                    />

                    <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(3,29,74,0.99)_0%,rgba(3,42,101,0.94)_38%,rgba(3,42,101,0.70)_58%,rgba(4,62,145,0.22)_100%)]" />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(3,24,58,0.05)_0%,rgba(3,24,58,0.02)_45%,rgba(3,24,58,0.30)_100%)]" />

                    <div className="relative z-10 grid min-h-[620px] items-center gap-10 px-4 py-14 sm:px-6 lg:min-h-[680px] lg:grid-cols-[0.92fr_0.88fr] lg:px-10 xl:px-14 2xl:px-16">
                        <div className="max-w-[740px]">
                            <div className="flex flex-wrap items-center gap-3 text-[13px] font-medium text-blue-100">
                                <a href="/" className="hover:text-white">
                                    Beranda
                                </a>
                                <span>/</span>
                                <span className="text-white">Kesiswaan</span>
                            </div>

                            <p className="mt-10 text-[13px] font-semibold uppercase tracking-[0.22em] text-[#d5a542]">
                                Kesiswaan
                            </p>

                            <h1 className="mt-4 font-serif text-[48px] font-semibold leading-[1.08] tracking-[-0.045em] text-white sm:text-[62px] lg:text-[76px] xl:text-[84px]">
                                Membentuk Siswa
                                <br />
                                Aktif, Berkarakter,
                                <br />
                                dan Berprestasi
                            </h1>

                            <p className="mt-8 max-w-[660px] text-[16px] font-medium leading-8 text-blue-50 sm:text-[18px]">
                                Kesiswaan menjadi pusat pembinaan karakter,
                                kepemimpinan, kreativitas, kedisiplinan, dan
                                pengembangan potensi peserta didik.
                            </p>

                            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
                                <a
                                    href="#program-kesiswaan"
                                    className="inline-flex min-h-[58px] items-center justify-center gap-4 rounded-[4px] bg-[#d5a542] px-8 text-[13px] font-semibold uppercase tracking-[0.08em] text-white shadow-lg shadow-blue-950/20 transition hover:bg-[#f7c46a]"
                                >
                                    Lihat Program
                                    <span className="text-[22px] leading-none">
                                        →
                                    </span>
                                </a>

                                <a
                                    href="/akademik"
                                    className="inline-flex min-h-[58px] items-center justify-center rounded-[4px] border border-[#d5a542]/80 px-8 text-[13px] font-semibold uppercase tracking-[0.08em] text-white transition hover:bg-white/10"
                                >
                                    Lihat Akademik
                                </a>
                            </div>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2 lg:pt-20">
                            {stats.map((item) => (
                                <StatCard key={item.label} item={item} />
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section
                id="program-kesiswaan"
                className="w-full bg-white px-4 py-16 sm:px-6 lg:px-10 lg:py-20 xl:px-14 2xl:px-16"
            >
                <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
                    <div>
                        <p className="text-[13px] font-semibold uppercase tracking-[0.22em] text-[#d5a542]">
                            Pembinaan Siswa
                        </p>

                        <h2 className="mt-5 max-w-[560px] font-serif text-[42px] font-semibold leading-tight tracking-[-0.04em] text-[#061b46] sm:text-[52px]">
                            Ruang Tumbuh untuk Setiap Potensi Siswa
                        </h2>

                        <div className="mt-7 h-[2px] w-20 rounded-full bg-[#d5a542]" />

                        <p className="mt-7 max-w-[520px] text-[16px] font-medium leading-8 text-slate-600">
                            Sekolah menghadirkan layanan kesiswaan yang
                            mendukung siswa untuk berkembang secara akademik,
                            sosial, emosional, dan karakter.
                        </p>

                        <div className="mt-10 overflow-hidden rounded-[18px] shadow-xl shadow-slate-200/70">
                            <img
                                src="/frontend/images/kesiswaan-card.jpg"
                                alt="Pembinaan Siswa"
                                className="h-[330px] w-full object-cover object-center"
                                onError={(event) => {
                                    event.currentTarget.src =
                                        "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1300&q=85";
                                }}
                            />
                        </div>
                    </div>

                    <div className="space-y-6">
                        {programs.map((item) => (
                            <ProgramCard key={item.title} item={item} />
                        ))}
                    </div>
                </div>
            </section>

            <section className="relative overflow-hidden bg-[#052b66] px-4 py-16 sm:px-6 lg:px-10 xl:px-14 2xl:px-16">
                <div className="absolute right-10 top-1/2 hidden -translate-y-1/2 text-[360px] leading-none text-white/[0.035] lg:block">
                    🏫
                </div>

                <div className="relative z-10 grid items-center gap-8 lg:grid-cols-[1fr_auto]">
                    <div>
                        <p className="text-[13px] font-semibold uppercase tracking-[0.22em] text-[#d5a542]">
                            Kembangkan Potensi Bersama Sekolah
                        </p>

                        <h2 className="mt-5 max-w-[780px] font-serif text-[38px] font-semibold leading-tight tracking-[-0.04em] text-white sm:text-[52px]">
                            Bersama Mewujudkan Generasi Berkarakter dan
                            Berprestasi
                        </h2>

                        <p className="mt-7 max-w-[720px] text-[16px] font-medium leading-8 text-blue-100">
                            Melalui kegiatan kesiswaan, siswa diarahkan untuk
                            menjadi pribadi yang percaya diri, disiplin,
                            kreatif, dan siap memimpin.
                        </p>
                    </div>

                    <a
                        href="/ppdb"
                        className="inline-flex min-h-[58px] items-center justify-center gap-4 rounded-[4px] bg-[#d5a542] px-9 text-[13px] font-semibold uppercase tracking-[0.08em] text-white shadow-lg shadow-blue-950/20 transition hover:bg-[#f7c46a]"
                    >
                        Daftar Sekarang
                        <span className="text-[22px] leading-none">→</span>
                    </a>
                </div>
            </section>

            <section className="w-full border-b border-slate-200 bg-white px-4 sm:px-6 lg:px-10 xl:px-14 2xl:px-16">
                <div className="grid lg:grid-cols-4">
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
                    © 2025 SMA Negeri 1 Mojokerto. All Rights Reserved.
                </p>
            </footer>
        </FrontendLayout>
    );
}