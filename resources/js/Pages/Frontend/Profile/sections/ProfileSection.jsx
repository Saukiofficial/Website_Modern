import { profileStats, school, values } from "../data";

export default function ProfileSection() {
    return (
        <div id="profil-sekolah" className="space-y-6">
            <div className="grid gap-6 xl:grid-cols-[0.82fr_1.18fr]">
                <div className="overflow-hidden rounded-[22px] border border-slate-200 bg-white shadow-xl shadow-slate-200/70">
                    <div className="relative h-[420px] overflow-hidden bg-blue-50 sm:h-[560px] xl:h-full">
                        <img
                            src={school.principal.image}
                            alt={school.principal.name}
                            className="h-full w-full object-cover object-center"
                            onError={(event) => {
                                event.currentTarget.src =
                                    school.principal.fallback;
                            }}
                        />

                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#052b66]/98 via-[#052b66]/65 to-transparent p-6 text-white">
                            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-blue-100">
                                {school.principal.position}
                            </p>

                            <h3 className="mt-2 font-serif text-[24px] font-semibold leading-tight">
                                {school.principal.name}
                            </h3>
                        </div>
                    </div>
                </div>

                <div className="rounded-[22px] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/70 sm:p-8">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#0d58cf]">
                        Profil Sekolah
                    </p>

                    <h2 className="mt-4 font-serif text-[34px] font-semibold leading-tight tracking-[-0.03em] text-[#061b46] sm:text-[42px]">
                        Pesan Kepala Sekolah
                    </h2>

                    <div className="mt-5 h-[2px] w-20 rounded-full bg-[#f7c46a]" />

                    <p className="mt-6 max-w-3xl text-[15px] font-medium leading-8 text-slate-600">
                        Sambutan kepala sekolah sebagai pengantar dalam mengenal
                        arah pendidikan dan karakter sekolah.
                    </p>

                    <div className="mt-6 rounded-[20px] bg-white">
                        <p className="font-serif text-[18px] font-medium italic leading-9 text-[#173767]">
                            “{school.principal.message}”
                        </p>
                    </div>

                    <div className="mt-8 grid gap-4 sm:grid-cols-3">
                        {values.map((item) => (
                            <div
                                key={item.title}
                                className="rounded-[18px] border border-slate-200 bg-white p-5 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                            >
                                <div className="text-[36px] leading-none">
                                    {item.icon}
                                </div>

                                <h3 className="mt-4 font-serif text-[18px] font-semibold text-[#061b46]">
                                    {item.title}
                                </h3>

                                <p className="mt-3 text-[12.5px] font-medium leading-6 text-slate-600">
                                    {item.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="overflow-hidden rounded-[20px] bg-gradient-to-r from-[#052b66] via-[#063f8d] to-[#075cc0] shadow-xl shadow-blue-200">
                <div className="grid gap-0 lg:grid-cols-4">
                    {profileStats.map((item, index) => (
                        <div
                            key={item.label}
                            className={`flex items-center justify-center gap-5 px-6 py-7 text-white ${
                                index !== profileStats.length - 1
                                    ? "border-b border-white/15 lg:border-b-0 lg:border-r"
                                    : ""
                            }`}
                        >
                            <div className="text-[38px] leading-none text-blue-100">
                                {item.icon}
                            </div>

                            <div>
                                <p className="font-serif text-[32px] font-semibold leading-none text-white">
                                    {item.value}
                                </p>

                                <p className="mt-2 text-[12px] font-medium text-blue-100">
                                    {item.label}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <section className="relative overflow-hidden rounded-[26px] border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/70 sm:p-10">
                <div className="absolute -right-8 bottom-0 hidden text-[190px] leading-none text-blue-50 lg:block">
                    🏫
                </div>

                <div className="relative max-w-4xl">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#0d58cf]">
                        Motto Sekolah
                    </p>

                    <h2 className="mt-4 font-serif text-[34px] font-semibold leading-tight tracking-[-0.03em] text-[#061b46] sm:text-[42px]">
                        Berprestasi, Berkarakter, Berbudaya
                    </h2>

                    <div className="mt-5 h-[2px] w-20 rounded-full bg-[#f7c46a]" />

                    <p className="mt-6 max-w-3xl text-[15px] font-medium leading-8 text-slate-600">
                        Kami berkomitmen menciptakan lingkungan pendidikan yang
                        inspiratif, inovatif, dan inklusif untuk mencetak
                        generasi unggul yang siap menghadapi masa depan.
                    </p>
                </div>
            </section>
        </div>
    );
}