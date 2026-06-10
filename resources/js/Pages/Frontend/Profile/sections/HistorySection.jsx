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
        <div className="flex items-center justify-center gap-4 border-b border-slate-200 px-5 py-6 last:border-b-0 sm:border-b-0 sm:border-r sm:last:border-r-0">
            <div className="text-[34px] leading-none text-[#d5a542]">
                {item.icon}
            </div>

            <div className="text-center sm:text-left">
                <p className="font-serif text-[30px] font-semibold leading-none text-[#061b46]">
                    {item.value}
                </p>
                <p className="mt-2 text-[13px] font-medium text-slate-600">
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
        <div className="space-y-8">
            <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
                <div className="space-y-6">
                    <div className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/70 sm:p-8 lg:p-10">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#d5a542]">
                            Sejarah
                        </p>

                        <h2 className="mt-4 max-w-3xl font-serif text-[34px] font-semibold leading-tight tracking-[-0.035em] text-[#061b46] sm:text-[44px]">
                            Perjalanan Sekolah dalam Membangun Generasi Cerdas
                        </h2>

                        <div className="mt-6 h-[2px] w-20 rounded-full bg-[#d5a542]" />

                        <p className="mt-7 text-[16px] font-medium leading-8 text-slate-700">
                            Sejarah singkat perkembangan sekolah dari masa
                            berdiri hingga menjadi lembaga pendidikan yang terus
                            berinovasi.
                        </p>

                        <p className="mt-6 text-[15px] font-medium leading-8 text-slate-700">
                            {school.history ||
                                "SMA Negeri 1 Cerdas berdiri sebagai lembaga pendidikan yang hadir untuk menjawab kebutuhan masyarakat terhadap sekolah berkualitas."}{" "}
                            Dengan dukungan tenaga pendidik profesional dan
                            lingkungan belajar yang kondusif, sekolah terus
                            berkomitmen menjadi pusat pembelajaran yang unggul,
                            modern, dan berkarakter.
                        </p>
                    </div>

                    <div className="grid overflow-hidden rounded-[22px] border border-slate-200 bg-white shadow-xl shadow-slate-200/70 sm:grid-cols-4">
                        {profileStats.slice(0, 4).map((item, index) => (
                            <HistoryStatCard
                                key={`${item.label}-${index}`}
                                item={item}
                            />
                        ))}
                    </div>
                </div>

                <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-xl shadow-slate-200/70">
                    <img
                        src={
                            school.historyImage ||
                            "/frontend/images/history-school.jpg"
                        }
                        alt="Sejarah Sekolah"
                        className="h-[360px] w-full object-cover object-center sm:h-[480px] xl:h-full"
                        onError={(event) => {
                            event.currentTarget.src =
                                "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1200&q=85";
                        }}
                    />
                </div>
            </div>

            <section className="rounded-[28px] bg-[#f4f8fc] py-4">
                <div className="text-center">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#d5a542]">
                        Jejak Perjalanan
                    </p>

                    <h2 className="mt-3 font-serif text-[30px] font-semibold leading-tight tracking-[-0.035em] text-[#061b46] sm:text-[40px]">
                        Tonggak Perkembangan Sekolah
                    </h2>
                </div>

                <div className="relative mt-10 overflow-x-auto pb-4">
                    <div className="min-w-[980px] px-4">
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
                                    className="relative"
                                >
                                    <div
                                        className={`relative z-10 h-5 w-5 rounded-full ring-4 ring-[#f4f8fc] ${
                                            item.active
                                                ? "bg-[#d5a542]"
                                                : "bg-[#052b66]"
                                        }`}
                                    />

                                    <p className="mt-5 font-serif text-[22px] font-semibold text-[#061b46]">
                                        {item.year}
                                    </p>

                                    <p className="mt-1 text-[13px] font-semibold text-[#061b46]">
                                        {item.title}
                                    </p>

                                    <p className="mt-2 text-[13px] font-medium leading-6 text-slate-600">
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