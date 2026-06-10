import FrontendLayout from "../../Layouts/FrontendLayout";

const imagePath = {
    schoolBg: "/frontend/images/school-bg.jpg",
    students: "/frontend/images/students.png",
};

const stats = [
    {
        title: "SISWA AKTIF",
        value: "1.245",
        desc: "Siswa",
        icon: "users",
    },
    {
        title: "GURU & TENDIK",
        value: "85",
        desc: "Orang",
        icon: "teacher",
    },
    {
        title: "PRESTASI",
        value: "128+",
        desc: "Penghargaan",
        icon: "trophy",
    },
    {
        title: "EKSTRAKURIKULER",
        value: "18+",
        desc: "Kegiatan",
        icon: "list",
    },
];

const news = [
    {
        title: "SMA Negeri 1 Cerdas Raih Juara 1 Olimpiade Sains Nasional 2024",
        date: "10 Mei 2024",
        image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=400&q=80",
    },
    {
        title: "Kegiatan Pesantren Kilat Ramadan 1445 H",
        date: "25 Maret 2024",
        image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=400&q=80",
    },
    {
        title: "Workshop Literasi Digital untuk Siswa",
        date: "15 Februari 2024",
        image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=400&q=80",
    },
];

const gallery = [
    "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=500&q=80",
    "https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=500&q=80",
    "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=500&q=80",
    "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=500&q=80",
];

const announcements = [
    {
        day: "15",
        month: "MEI",
        title: "Libur Hari Kenaikan Isa Almasih",
    },
    {
        day: "22",
        month: "MEI",
        title: "Asesmen Sumatif Akhir Semester Genap",
    },
    {
        day: "01",
        month: "JUN",
        title: "Pembagian Rapor Semester Genap",
    },
];

function Icon({ type }) {
    if (type === "users") {
        return (
            <svg
                className="h-6 w-6 sm:h-7 sm:w-7"
                viewBox="0 0 24 24"
                fill="currentColor"
            >
                <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5s-3 1.34-3 3 1.34 3 3 3Zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3Zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5C15 14.17 10.33 13 8 13Zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5Z" />
            </svg>
        );
    }

    if (type === "teacher") {
        return (
            <svg
                className="h-6 w-6 sm:h-7 sm:w-7"
                viewBox="0 0 24 24"
                fill="currentColor"
            >
                <path d="M12 12c2.21 0 4-1.79 4-4S14.21 4 12 4 8 5.79 8 8s1.79 4 4 4Zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4Zm7-8h3v2h-3V6Zm0 4h3v2h-3v-2Zm0 4h3v2h-3v-2Z" />
            </svg>
        );
    }

    if (type === "trophy") {
        return (
            <svg
                className="h-6 w-6 sm:h-7 sm:w-7"
                viewBox="0 0 24 24"
                fill="currentColor"
            >
                <path d="M19 5h-2V3H7v2H5c-1.1 0-2 .9-2 2v1c0 2.55 1.92 4.63 4.39 4.94A5.01 5.01 0 0 0 11 15.9V19H8v2h8v-2h-3v-3.1a5.01 5.01 0 0 0 3.61-2.96C19.08 12.63 21 10.55 21 8V7c0-1.1-.9-2-2-2ZM5 8V7h2v3.82A3.01 3.01 0 0 1 5 8Zm14 0c0 1.3-.84 2.42-2 2.82V7h2v1Z" />
            </svg>
        );
    }

    return (
        <svg
            className="h-6 w-6 sm:h-7 sm:w-7"
            viewBox="0 0 24 24"
            fill="currentColor"
        >
            <path d="M4 5h16v2H4V5Zm0 6h16v2H4v-2Zm0 6h16v2H4v-2Z" />
        </svg>
    );
}

export default function Home() {
    return (
        <FrontendLayout>
            <section className="relative w-full bg-white">
                <div className="relative h-[470px] w-full overflow-hidden bg-[#064493] sm:h-[510px] md:h-[420px] lg:h-[430px] xl:h-[455px]">
                    <img
                        src={imagePath.schoolBg}
                        alt="Background sekolah"
                        className="absolute inset-0 h-full w-full object-cover"
                        onError={(event) => {
                            event.currentTarget.src =
                                "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1600&q=85";
                        }}
                    />

                    <div className="absolute inset-0 bg-black/10 md:bg-black/5" />

                    <div className="absolute inset-0 z-10 bg-[linear-gradient(90deg,rgba(5,37,86,0.96)_0%,rgba(6,68,147,0.86)_45%,rgba(6,68,147,0.18)_100%)] md:hidden" />

                    <div
                        className="absolute inset-y-0 left-0 z-10 hidden w-[70%] bg-[linear-gradient(90deg,rgba(5,37,86,0.96)_0%,rgba(6,68,147,0.88)_45%,rgba(6,68,147,0.34)_75%,rgba(6,68,147,0)_100%)] md:block lg:w-[66%]"
                        style={{
                            clipPath: "polygon(0 0, 76% 0, 60% 100%, 0 100%)",
                        }}
                    />

                    <div
                        className="absolute inset-y-0 left-0 z-10 hidden w-[58%] bg-[radial-gradient(circle_at_28%_45%,rgba(0,0,0,0.20)_0%,rgba(0,0,0,0.12)_38%,rgba(0,0,0,0)_72%)] md:block lg:w-[54%]"
                        style={{
                            clipPath: "polygon(0 0, 84% 0, 65% 100%, 0 100%)",
                        }}
                    />

                    <div
                        className="absolute inset-y-0 left-[36%] z-10 hidden w-[24%] bg-white/5 backdrop-blur-[1px] md:block lg:left-[35%] lg:w-[25%]"
                        style={{
                            clipPath: "polygon(28% 0, 100% 0, 66% 100%, 0 100%)",
                        }}
                    />

                    <img
                        src={imagePath.students}
                        alt="Siswa"
                        className="absolute bottom-0 right-[-8px] z-20 h-[250px] w-auto object-contain drop-shadow-2xl sm:right-3 sm:h-[310px] md:right-6 md:h-[330px] lg:right-[90px] lg:h-[350px] xl:right-[130px] xl:h-[370px] 2xl:right-[190px]"
                        onError={(event) => {
                            event.currentTarget.style.display = "none";
                        }}
                    />

                    <div className="relative z-30 flex h-full w-full max-w-[760px] flex-col px-5 pt-[36px] sm:px-8 sm:pt-12 md:px-10 md:pt-[48px] lg:px-14 lg:pt-[54px] xl:px-16 2xl:px-20">
                        <h1 className="max-w-[225px] text-[25px] font-extrabold leading-[1.13] tracking-[-0.025em] text-white sm:max-w-[320px] sm:text-[37px] md:max-w-[470px] md:text-[33px] md:leading-[1.13] lg:max-w-[650px] lg:text-[41px] xl:text-[46px]">
                            Mewujudkan Generasi Cerdas, Berkarakter, dan Berdaya
                            Saing Global
                        </h1>

                        <p className="mt-4 max-w-[225px] text-[12.5px] font-medium leading-6 text-white/95 sm:max-w-[320px] sm:text-[14px] sm:leading-7 md:max-w-[420px] md:text-[14px] lg:max-w-[500px] lg:text-[15px]">
                            Kami berkomitmen memberikan pendidikan terbaik untuk
                            masa depan yang gemilang.
                        </p>

                        <a
                            href="#profil"
                            className="relative z-50 mt-4 inline-flex h-[42px] w-fit items-center gap-3 rounded-[10px] bg-[#0b73e8] px-5 text-[12px] font-extrabold text-white shadow-xl shadow-blue-950/30 ring-1 ring-white/20 transition hover:bg-blue-600 sm:h-[46px] sm:px-6 sm:text-[13px]"
                        >
                            Selengkapnya
                            <span className="text-[19px] leading-none">›</span>
                        </a>
                    </div>
                </div>

                <div className="relative z-40 -mt-7 w-full px-4 sm:-mt-10 sm:px-6 md:-mt-[24px] lg:-mt-[12px] xl:px-10 2xl:px-14">
                    <div className="grid w-full grid-cols-2 overflow-hidden rounded-[22px] bg-white shadow-xl shadow-slate-300/60 ring-1 ring-slate-200 lg:grid-cols-4">
                        {stats.map((item, index) => (
                            <div
                                key={item.title}
                                className={`flex min-h-[104px] items-center gap-3 px-4 py-4 sm:min-h-[128px] sm:gap-4 sm:px-5 sm:py-5 md:min-h-[118px] lg:min-h-[94px] lg:px-7 lg:py-4 ${
                                    index % 2 === 0
                                        ? "border-r border-slate-200"
                                        : ""
                                } ${
                                    index < 2
                                        ? "border-b border-slate-200"
                                        : ""
                                } lg:border-b-0 lg:border-r-0 ${
                                    index !== stats.length - 1
                                        ? "lg:border-r lg:border-slate-200"
                                        : ""
                                }`}
                            >
                                <div className="flex h-[48px] w-[48px] shrink-0 items-center justify-center rounded-full bg-[#0b73e8] text-white shadow-lg shadow-blue-200 sm:h-[58px] sm:w-[58px] md:h-[56px] md:w-[56px]">
                                    <Icon type={item.icon} />
                                </div>

                                <div className="min-w-0">
                                    <p className="break-words text-[8.8px] font-extrabold uppercase leading-tight text-[#064493] sm:text-[10.5px] md:text-[10px]">
                                        {item.title}
                                    </p>
                                    <h3 className="mt-1 text-[21px] font-extrabold leading-none tracking-[-0.02em] text-slate-950 sm:text-[24px] md:text-[23px]">
                                        {item.value}
                                    </h3>
                                    <p className="mt-1 text-[12px] font-semibold text-slate-600 sm:text-[13px]">
                                        {item.desc}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section
                id="informasi"
                className="grid w-full grid-cols-2 gap-4 px-4 pb-8 pt-5 sm:px-6 md:grid-cols-2 lg:grid-cols-[1.04fr_1.04fr_1.04fr_0.92fr] xl:px-10 2xl:px-14"
            >
                <div className="col-span-2 min-h-[292px] rounded-[22px] border border-slate-200 bg-white p-5 shadow-md shadow-slate-200/70 lg:col-span-1">
                    <div className="mb-4 flex items-center justify-between">
                        <h2 className="text-[16px] font-extrabold uppercase text-[#064493]">
                            Berita Terkini
                        </h2>
                        <a
                            href="#"
                            className="text-[11px] font-extrabold text-[#0b73e8]"
                        >
                            Lihat Semua
                        </a>
                    </div>

                    <div className="space-y-4">
                        {news.map((item) => (
                            <article
                                key={item.title}
                                className="grid grid-cols-[92px_1fr] gap-4 border-b border-slate-100 pb-4 last:border-b-0 last:pb-0"
                            >
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="h-[82px] w-[92px] rounded-xl object-cover"
                                />

                                <div>
                                    <h3 className="line-clamp-2 text-[12.5px] font-extrabold leading-snug text-slate-950 sm:text-[13px]">
                                        {item.title}
                                    </h3>
                                    <p className="mt-2 text-[11px] font-semibold text-slate-500">
                                        {item.date}
                                    </p>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>

                <div
                    id="galeri"
                    className="col-span-1 min-h-[292px] rounded-[22px] border border-slate-200 bg-white p-4 shadow-md shadow-slate-200/70 sm:p-5 lg:col-span-1"
                >
                    <div className="mb-4 flex items-center justify-between gap-2">
                        <h2 className="text-[13px] font-extrabold uppercase text-[#064493] sm:text-[16px]">
                            Galeri Kegiatan
                        </h2>
                        <a
                            href="#"
                            className="whitespace-nowrap text-[10px] font-extrabold text-[#0b73e8] sm:text-[11px]"
                        >
                            Lihat Semua
                        </a>
                    </div>

                    <div className="grid grid-cols-2 gap-2 sm:gap-3">
                        {gallery.map((item, index) => (
                            <img
                                key={index}
                                src={item}
                                alt={`Galeri ${index + 1}`}
                                className="h-[76px] w-full rounded-xl object-cover sm:h-[96px] md:h-[92px]"
                            />
                        ))}
                    </div>
                </div>

                <div className="col-span-1 min-h-[292px] rounded-[22px] border border-slate-200 bg-white p-4 shadow-md shadow-slate-200/70 sm:p-5 lg:col-span-1">
                    <div className="mb-4 flex items-center justify-between gap-2">
                        <h2 className="text-[13px] font-extrabold uppercase text-[#064493] sm:text-[16px]">
                            Pengumuman
                        </h2>
                        <a
                            href="#"
                            className="whitespace-nowrap text-[10px] font-extrabold text-[#0b73e8] sm:text-[11px]"
                        >
                            Lihat Semua
                        </a>
                    </div>

                    <div className="space-y-3">
                        {announcements.map((item) => (
                            <article
                                key={item.title}
                                className="flex gap-3 border-b border-slate-100 pb-3 last:border-b-0 last:pb-0"
                            >
                                <div className="flex h-[50px] w-[46px] shrink-0 flex-col items-center justify-center rounded-md bg-blue-50 text-[#064493] sm:h-[54px] sm:w-[52px]">
                                    <span className="text-[20px] font-extrabold leading-none sm:text-[23px]">
                                        {item.day}
                                    </span>
                                    <span className="mt-1 text-[9px] font-extrabold sm:text-[10px]">
                                        {item.month}
                                    </span>
                                </div>

                                <h3 className="pt-1 text-[11.5px] font-extrabold leading-snug text-slate-950 sm:text-[13px]">
                                    {item.title}
                                </h3>
                            </article>
                        ))}
                    </div>

                    <a
                        href="#"
                        className="mt-4 inline-flex items-center gap-2 text-[11px] font-extrabold text-[#0b73e8] sm:text-[12px]"
                    >
                        Lihat Semua Pengumuman
                        <span>→</span>
                    </a>
                </div>

                <div
                    id="ppdb"
                    className="col-span-2 rounded-[22px] bg-gradient-to-r from-[#064493] to-[#0b63d8] p-5 text-white shadow-xl shadow-blue-200 lg:col-span-1 lg:min-h-[292px] lg:bg-gradient-to-br lg:p-6"
                >
                    <div className="grid gap-5 sm:grid-cols-[1.1fr_0.9fr] lg:grid-cols-1">
                        <div>
                            <h2 className="text-[28px] font-extrabold leading-tight">
                                PPDB 2024/2025
                            </h2>

                            <p className="mt-1 text-[14px] font-semibold text-blue-100">
                                Penerimaan Peserta Didik Baru
                            </p>

                            <p className="mt-4 text-[13px] font-medium leading-6 text-white/90">
                                Bergabunglah bersama kami dan wujudkan masa depan
                                terbaik Anda!
                            </p>
                        </div>

                        <div className="flex flex-col justify-end gap-4">
                            <a
                                href="#"
                                className="flex h-[48px] items-center justify-center rounded-xl bg-white px-4 text-[16px] font-extrabold text-[#064493] shadow-lg transition hover:bg-blue-50"
                            >
                                Daftar Sekarang
                            </a>

                            <div className="flex items-center gap-3 lg:mt-1">
                                <div className="flex h-9 w-9 items-center justify-center rounded-full border border-white/40">
                                    <svg
                                        className="h-5 w-5"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                    >
                                        <path d="M20.52 3.48A11.84 11.84 0 0 0 12.08 0C5.54 0 .22 5.32.22 11.86c0 2.09.55 4.14 1.6 5.94L0 24l6.35-1.66a11.9 11.9 0 0 0 5.73 1.46h.01c6.54 0 11.86-5.32 11.86-11.86a11.8 11.8 0 0 0-3.43-8.46ZM12.09 21.8h-.01a9.86 9.86 0 0 1-5.03-1.38l-.36-.22-3.77.99 1.01-3.67-.24-.38a9.8 9.8 0 0 1-1.51-5.28c0-5.44 4.43-9.87 9.88-9.87a9.8 9.8 0 0 1 6.98 2.9 9.8 9.8 0 0 1 2.89 6.98c0 5.45-4.43 9.88-9.84 9.88Zm5.41-7.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.65.07-.3-.15-1.25-.46-2.38-1.47-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.61-.92-2.21-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.49s1.07 2.89 1.22 3.09c.15.2 2.11 3.22 5.11 4.51.71.31 1.27.49 1.7.63.71.23 1.36.2 1.88.12.57-.09 1.75-.72 2-1.41.25-.69.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35Z" />
                                    </svg>
                                </div>

                                <span className="text-[17px] font-extrabold">
                                    0812-3456-7890
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section id="profil" className="hidden" />
            <section id="akademik" className="hidden" />
            <section id="kesiswaan" className="hidden" />
            <section id="kontak" className="hidden" />
        </FrontendLayout>
    );
}