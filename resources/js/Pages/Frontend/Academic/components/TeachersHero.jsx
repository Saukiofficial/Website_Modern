import Icon from "./Icon";

export default function TeachersHero() {
    const stats = [
        {
            value: "45",
            label: "Guru",
            icon: "users",
        },
        {
            value: "12",
            label: "Tenaga Kependidikan",
            icon: "organization",
        },
        {
            value: "85%",
            label: "Bersertifikasi Profesional",
            icon: "award",
        },
        {
            value: "10+",
            label: "Prestasi Akademik Nasional",
            icon: "trophy",
        },
    ];

    return (
        <section className="relative w-full overflow-hidden bg-[#052b66]">
            <div className="relative min-h-[420px] w-full overflow-hidden lg:min-h-[440px] xl:min-h-[460px]">
                <img
                    src="/frontend/images/teachers-hero.jpg"
                    alt="Dewan Guru dan Tenaga Pendidik"
                    className="absolute inset-0 h-full w-full object-cover object-center"
                    onError={(event) => {
                        event.currentTarget.src =
                            "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1800&q=85";
                    }}
                />

                <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(3,29,74,0.98)_0%,rgba(3,42,101,0.94)_38%,rgba(4,62,145,0.58)_68%,rgba(4,62,145,0.20)_100%)]" />

                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(3,24,58,0.08)_0%,rgba(3,24,58,0.02)_50%,rgba(3,24,58,0.40)_100%)]" />

                <div className="absolute right-[8%] top-[28%] hidden grid-cols-4 gap-3 lg:grid">
                    {stats.map((item) => (
                        <div
                            key={item.label}
                            className="flex min-h-[118px] w-[130px] flex-col items-center justify-center rounded-[18px] border border-white/15 bg-[#052b66]/45 px-4 text-center text-white shadow-xl shadow-blue-950/20 backdrop-blur-sm"
                        >
                            <Icon
                                type={item.icon}
                                className="h-7 w-7 text-white"
                            />

                            <p className="mt-3 text-[28px] font-semibold leading-none text-[#f7b733]">
                                {item.value}
                            </p>

                            <p className="mt-2 text-[11px] font-medium leading-4 text-blue-50">
                                {item.label}
                            </p>
                        </div>
                    ))}
                </div>

                <div className="relative z-10 px-4 pb-12 pt-8 sm:px-6 lg:px-10 lg:pb-14 lg:pt-10 xl:px-14 2xl:px-16">
                    <div className="flex flex-wrap items-center gap-3 text-[12px] font-medium text-blue-100">
                        <a href="/" className="hover:text-white">
                            Beranda
                        </a>
                        <span>›</span>
                        <span>Akademik</span>
                        <span>›</span>
                        <span className="text-white">Dewan Guru</span>
                    </div>

                    <div className="mt-8 max-w-[640px]">
                        <span className="inline-flex rounded-full bg-[#0d58cf] px-4 py-2 text-[12px] font-semibold uppercase tracking-[0.12em] text-white shadow-lg shadow-blue-950/20 lg:hidden">
                            Akademik
                        </span>

                        <h1 className="mt-4 text-[38px] font-semibold leading-[1.05] tracking-[-0.055em] text-white sm:text-[50px] lg:mt-14 lg:text-[58px] xl:text-[64px]">
                            Dewan Guru &
                            <br />
                            Tenaga Pendidik
                        </h1>

                        <p className="mt-5 max-w-[560px] text-[15px] font-medium leading-8 text-blue-50 sm:text-[17px]">
                            Tenaga pendidik profesional yang berkomitmen
                            menciptakan lingkungan belajar inovatif, inspiratif,
                            dan berstandar global.
                        </p>
                    </div>

                    <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:hidden">
                        {stats.map((item) => (
                            <div
                                key={item.label}
                                className="flex items-center gap-4 rounded-[18px] border border-white/15 bg-[#052b66]/45 p-4 text-white backdrop-blur-sm"
                            >
                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/10">
                                    <Icon type={item.icon} className="h-6 w-6" />
                                </div>

                                <div>
                                    <p className="text-[28px] font-semibold leading-none text-[#f7b733]">
                                        {item.value}
                                    </p>
                                    <p className="mt-1 text-[12px] font-medium leading-5 text-blue-50">
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