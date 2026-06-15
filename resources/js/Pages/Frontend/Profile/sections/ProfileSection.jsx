import { profileStats as fallbackProfileStats } from "../data";

export default function ProfileSection({ profileData }) {
    const school = profileData?.school || {};
    const principal = school.principal || {};

    const values =
        Array.isArray(profileData?.values) && profileData.values.length > 0
            ? profileData.values
            : [];

    const profileStats =
        Array.isArray(profileData?.profileStats) &&
        profileData.profileStats.length > 0
            ? profileData.profileStats
            : fallbackProfileStats;

    return (
        <div id="profil-sekolah" className="w-full min-w-0 space-y-5 sm:space-y-6">
            <div className="grid w-full min-w-0 grid-cols-1 gap-5 sm:gap-6 xl:grid-cols-[0.82fr_1.18fr]">
                <div className="min-w-0 overflow-hidden rounded-[20px] border border-slate-200 bg-white shadow-xl shadow-slate-200/70 sm:rounded-[22px]">
                    <div className="relative h-[380px] overflow-hidden bg-blue-50 sm:h-[520px] xl:h-full xl:min-h-[620px]">
                        <img
                            src={
                                principal.image ||
                                "/frontend/images/principal.jpg"
                            }
                            alt={principal.name || "Kepala Sekolah"}
                            className="h-full w-full object-cover object-center"
                            onError={(event) => {
                                event.currentTarget.src =
                                    principal.fallback ||
                                    "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=1000&q=85";
                            }}
                        />

                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#052b66]/98 via-[#052b66]/65 to-transparent p-4 text-white sm:p-6">
                            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-blue-100 sm:text-[11px] sm:tracking-[0.18em]">
                                {principal.position || "Kepala Sekolah"}
                            </p>

                            <h3 className="mt-2 break-words font-serif text-[21px] font-semibold leading-tight sm:text-[24px]">
                                {principal.name ||
                                    "Drs. Ahmad Fauzi, M.Pd."}
                            </h3>
                        </div>
                    </div>
                </div>

                <div className="min-w-0 rounded-[20px] border border-slate-200 bg-white p-4 shadow-xl shadow-slate-200/70 sm:rounded-[22px] sm:p-8">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#0d58cf] sm:tracking-[0.22em]">
                        Profil Sekolah
                    </p>

                    <h2 className="mt-4 break-words font-serif text-[30px] font-semibold leading-tight tracking-[-0.03em] text-[#061b46] sm:text-[42px]">
                        Pesan Kepala Sekolah
                    </h2>

                    <div className="mt-5 h-[2px] w-20 rounded-full bg-[#f7c46a]" />

                    <p className="mt-5 max-w-3xl text-[14px] font-medium leading-7 text-slate-600 sm:mt-6 sm:text-[15px] sm:leading-8">
                        Sambutan kepala sekolah sebagai pengantar dalam mengenal
                        arah pendidikan dan karakter sekolah.
                    </p>

                    <div className="mt-5 rounded-[20px] bg-white sm:mt-6">
                        <p className="break-words font-serif text-[16px] font-medium italic leading-8 text-[#173767] sm:text-[18px] sm:leading-9">
                            “
                            {principal.message ||
                                "Kami percaya bahwa pendidikan bukan hanya tentang pengetahuan, tetapi juga tentang pembentukan karakter, kedisiplinan, tanggung jawab, dan kepedulian sosial."}
                            ”
                        </p>
                    </div>

                    <div className="mt-6 grid grid-cols-1 gap-3 sm:mt-8 sm:grid-cols-3 sm:gap-4">
                        {values.map((item) => (
                            <div
                                key={item.title}
                                className="min-w-0 rounded-[18px] border border-slate-200 bg-white p-4 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-lg sm:p-5"
                            >
                                <div className="text-[32px] leading-none sm:text-[36px]">
                                    {item.icon}
                                </div>

                                <h3 className="mt-3 break-words font-serif text-[17px] font-semibold text-[#061b46] sm:mt-4 sm:text-[18px]">
                                    {item.title}
                                </h3>

                                <p className="mt-2 break-words text-[12.5px] font-medium leading-6 text-slate-600 sm:mt-3">
                                    {item.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="min-w-0 overflow-hidden rounded-[20px] bg-gradient-to-r from-[#052b66] via-[#063f8d] to-[#075cc0] shadow-xl shadow-blue-200">
                <div className="grid grid-cols-1 gap-0 sm:grid-cols-2 lg:grid-cols-4">
                    {profileStats.slice(0, 4).map((item, index) => (
                        <div
                            key={`${item.label}-${index}`}
                            className={`flex min-w-0 items-center justify-center gap-4 px-4 py-6 text-white sm:gap-5 sm:px-6 sm:py-7 ${
                                index !== profileStats.slice(0, 4).length - 1
                                    ? "border-b border-white/15 sm:border-r lg:border-b-0"
                                    : ""
                            }`}
                        >
                            <div className="shrink-0 text-[32px] leading-none text-blue-100 sm:text-[38px]">
                                {item.icon}
                            </div>

                            <div className="min-w-0">
                                <p className="break-words font-serif text-[28px] font-semibold leading-none text-white sm:text-[32px]">
                                    {item.value}
                                </p>

                                <p className="mt-2 break-words text-[12px] font-medium text-blue-100">
                                    {item.label}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <section className="relative min-w-0 overflow-hidden rounded-[22px] border border-slate-200 bg-white p-5 shadow-xl shadow-slate-200/70 sm:rounded-[26px] sm:p-10">
                <div className="absolute -right-8 bottom-0 hidden text-[190px] leading-none text-blue-50 lg:block">
                    🏫
                </div>

                <div className="relative max-w-4xl min-w-0">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#0d58cf] sm:tracking-[0.22em]">
                        Motto Sekolah
                    </p>

                    <h2 className="mt-4 break-words font-serif text-[30px] font-semibold leading-tight tracking-[-0.03em] text-[#061b46] sm:text-[42px]">
                        {school.tagline ||
                            "Berprestasi, Berkarakter, Berbudaya"}
                    </h2>

                    <div className="mt-5 h-[2px] w-20 rounded-full bg-[#f7c46a]" />

                    <p className="mt-5 max-w-3xl break-words text-[14px] font-medium leading-7 text-slate-600 sm:mt-6 sm:text-[15px] sm:leading-8">
                        {school.description ||
                            "Kami berkomitmen menciptakan lingkungan pendidikan yang inspiratif, inovatif, dan inklusif untuk mencetak generasi unggul yang siap menghadapi masa depan."}
                    </p>
                </div>
            </section>
        </div>
    );
}