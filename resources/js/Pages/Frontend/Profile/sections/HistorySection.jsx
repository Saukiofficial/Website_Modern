import { profileStats as fallbackProfileStats } from "../data";

const fallbackTimeline = [
    {
        year: "1998",
        title: "Pendirian Sekolah",
        description: "SMA Negeri 1 Cerdas mulai berdiri dan melayani pendidikan.",
        active: false,
    },
    {
        year: "2005",
        title: "Pengembangan Fasilitas",
        description: "Pengembangan fasilitas dan sarana belajar modern.",
        active: false,
    },
    {
        year: "2011",
        title: "Implementasi Teknologi",
        description: "Teknologi mulai diterapkan dalam proses pembelajaran.",
        active: false,
    },
    {
        year: "2016",
        title: "Penguatan Karakter",
        description: "Program karakter dan budaya sekolah semakin diperkuat.",
        active: false,
    },
    {
        year: "2020",
        title: "Kolaborasi Nasional",
        description: "Sekolah membangun jejaring dan kolaborasi nasional.",
        active: false,
    },
    {
        year: "Sekarang",
        title: "Terus Berinovasi",
        description: "Terus berinovasi untuk masa depan pendidikan.",
        active: true,
    },
];

function HistoryStatCard({ item }) {
    return (
        <div className="flex min-w-0 items-center justify-center gap-3 border-b border-slate-200 px-4 py-5 last:border-b-0 sm:gap-4 sm:border-b-0 sm:border-r sm:px-5 sm:py-6 sm:last:border-r-0">
            <div className="shrink-0 text-[28px] leading-none text-[#d5a542] sm:text-[34px]">
                {item.icon}
            </div>

            <div className="min-w-0 text-center sm:text-left">
                <p className="break-words font-serif text-[26px] font-semibold leading-none text-[#061b46] sm:text-[30px]">
                    {item.value}
                </p>
                <p className="mt-2 break-words text-[12px] font-medium text-slate-600 sm:text-[13px]">
                    {item.label}
                </p>
            </div>
        </div>
    );
}

export default function HistorySection({ profileData }) {
    const school = profileData?.school || {};

    const profileStats =
        Array.isArray(profileData?.profileStats) &&
        profileData.profileStats.length > 0
            ? profileData.profileStats
            : fallbackProfileStats;

    const timeline =
        Array.isArray(profileData?.historyTimeline) &&
        profileData.historyTimeline.length > 0
            ? profileData.historyTimeline
            : fallbackTimeline;

    return (
        <div className="w-full min-w-0 space-y-6 sm:space-y-8">
            <div className="grid w-full min-w-0 grid-cols-1 gap-5 sm:gap-6 xl:grid-cols-[1.05fr_0.95fr]">
                <div className="min-w-0 space-y-5 sm:space-y-6">
                    <div className="min-w-0 rounded-[22px] border border-slate-200 bg-white p-5 shadow-xl shadow-slate-200/70 sm:rounded-[24px] sm:p-8 lg:p-10">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#d5a542] sm:tracking-[0.24em]">
                            Sejarah
                        </p>

                        <h2 className="mt-4 max-w-3xl break-words font-serif text-[30px] font-semibold leading-tight tracking-[-0.035em] text-[#061b46] sm:text-[44px]">
                            Perjalanan Sekolah dalam Membangun Generasi Cerdas
                        </h2>

                        <div className="mt-5 h-[2px] w-20 rounded-full bg-[#d5a542] sm:mt-6" />

                        <p className="mt-6 break-words text-[14px] font-medium leading-7 text-slate-700 sm:mt-7 sm:text-[16px] sm:leading-8">
                            Sejarah singkat perkembangan sekolah dari masa
                            berdiri hingga menjadi lembaga pendidikan yang terus
                            berinovasi.
                        </p>

                        <p className="mt-5 break-words text-[14px] font-medium leading-7 text-slate-700 sm:mt-6 sm:text-[15px] sm:leading-8">
                            {school.history ||
                                "SMA Negeri 1 Cerdas berdiri sebagai lembaga pendidikan yang hadir untuk menjawab kebutuhan masyarakat terhadap sekolah berkualitas."}{" "}
                            Dengan dukungan tenaga pendidik profesional dan
                            lingkungan belajar yang kondusif, sekolah terus
                            berkomitmen menjadi pusat pembelajaran yang unggul,
                            modern, dan berkarakter.
                        </p>
                    </div>

                    <div className="grid min-w-0 overflow-hidden rounded-[20px] border border-slate-200 bg-white shadow-xl shadow-slate-200/70 sm:grid-cols-2 lg:grid-cols-4">
                        {profileStats.slice(0, 4).map((item, index) => (
                            <HistoryStatCard
                                key={`${item.label}-${index}`}
                                item={item}
                            />
                        ))}
                    </div>
                </div>

                <div className="min-w-0 overflow-hidden rounded-[22px] border border-slate-200 bg-white shadow-xl shadow-slate-200/70 sm:rounded-[28px]">
                    <img
                        src={
                            school.historyImage ||
                            "/frontend/images/history-school.jpg"
                        }
                        alt="Sejarah Sekolah"
                        className="h-[300px] w-full object-cover object-center sm:h-[430px] xl:h-full"
                        onError={(event) => {
                            event.currentTarget.src =
                                "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1200&q=85";
                        }}
                    />
                </div>
            </div>

            <section className="min-w-0 rounded-[22px] bg-[#f4f8fc] px-4 py-6 sm:rounded-[28px] sm:py-8">
                <div className="text-center">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#d5a542] sm:tracking-[0.24em]">
                        Jejak Perjalanan
                    </p>

                    <h2 className="mt-3 break-words font-serif text-[28px] font-semibold leading-tight tracking-[-0.035em] text-[#061b46] sm:text-[40px]">
                        Tonggak Perkembangan Sekolah
                    </h2>
                </div>

                <div className="mt-8 grid grid-cols-1 gap-4 sm:mt-10 md:hidden">
                    {timeline.map((item, index) => (
                        <div
                            key={`${item.year}-${index}`}
                            className="relative rounded-[18px] border border-slate-200 bg-white p-5 shadow-sm"
                        >
                            <div className="flex items-start gap-4">
                                <div
                                    className={`mt-1 h-4 w-4 shrink-0 rounded-full ring-4 ring-[#f4f8fc] ${
                                        item.active
                                            ? "bg-[#d5a542]"
                                            : "bg-[#052b66]"
                                    }`}
                                />

                                <div className="min-w-0">
                                    <p className="font-serif text-[22px] font-semibold text-[#061b46]">
                                        {item.year}
                                    </p>

                                    <p className="mt-1 break-words text-[13px] font-semibold text-[#061b46]">
                                        {item.title}
                                    </p>

                                    <p className="mt-2 break-words text-[13px] font-medium leading-6 text-slate-600">
                                        {item.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="relative mt-10 hidden overflow-x-auto pb-4 md:block">
                    <div className="min-w-[900px] px-4 lg:min-w-[980px]">
                        <div className="absolute left-10 right-10 top-[17px] h-[2px] bg-slate-200" />

                        <div
                            className="relative grid gap-6"
                            style={{
                                gridTemplateColumns: `repeat(${timeline.length}, minmax(0, 1fr))`,
                            }}
                        >
                            {timeline.map((item, index) => (
                                <div
                                    key={`${item.year}-${index}`}
                                    className="relative min-w-0"
                                >
                                    <div
                                        className={`relative z-10 h-5 w-5 rounded-full ring-4 ring-[#f4f8fc] ${
                                            item.active
                                                ? "bg-[#d5a542]"
                                                : "bg-[#052b66]"
                                        }`}
                                    />

                                    <p className="mt-5 break-words font-serif text-[22px] font-semibold text-[#061b46]">
                                        {item.year}
                                    </p>

                                    <p className="mt-1 break-words text-[13px] font-semibold text-[#061b46]">
                                        {item.title}
                                    </p>

                                    <p className="mt-2 break-words text-[13px] font-medium leading-6 text-slate-600">
                                        {item.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}