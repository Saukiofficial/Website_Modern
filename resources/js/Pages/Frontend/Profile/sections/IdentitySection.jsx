import { profileStats as fallbackProfileStats } from "../data";

const identityIcons = {
    "Nama Sekolah": "🏠",
    NPSN: "🪪",
    Akreditasi: "🏅",
    "Status Sekolah": "🏢",
    Jenjang: "🎓",
    Kurikulum: "📘",
    Alamat: "📍",
    Email: "✉️",
    Telepon: "☎️",
    "Tahun Berdiri": "📅",
};

const fallbackIdentityData = [
    { label: "Nama Sekolah", value: "SMA Negeri 1 Sumenep" },
    { label: "NPSN", value: "20500001" },
    { label: "Akreditasi", value: "A" },
    { label: "Status Sekolah", value: "Negeri" },
    { label: "Jenjang", value: "Sekolah Menengah Atas" },
    { label: "Kurikulum", value: "Kurikulum Merdeka" },
    { label: "Alamat", value: "Jl. Pendidikan No. 21, Sumenep, Jawa Timur 61314" },
    { label: "Email", value: "info@sman1Sumenep.sch.id" },
    { label: "Telepon", value: "(0321) 321456" },
    { label: "Tahun Berdiri", value: "1998" },
];

function normalizeIdentity(identity) {
    if (!Array.isArray(identity) || identity.length === 0) {
        return fallbackIdentityData;
    }

    return identity.map((item) => {
        if (Array.isArray(item)) {
            return {
                label: item[0],
                value: item[1],
            };
        }

        return {
            label: item.label,
            value: item.value,
        };
    });
}

function IdentityRow({ label, value }) {
    return (
        <div className="grid min-w-0 grid-cols-1 border-b border-slate-200 last:border-b-0 sm:grid-cols-[210px_1fr] lg:grid-cols-[230px_1fr]">
            <div className="flex min-w-0 items-center gap-3 bg-slate-50 px-4 py-3 sm:gap-4 sm:px-5 sm:py-4">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-50 text-[18px]">
                    {identityIcons[label] ?? "📌"}
                </div>

                <p className="break-words text-[13px] font-semibold text-[#061b46]">
                    {label}
                </p>
            </div>

            <div className="flex min-w-0 items-center px-4 py-3 sm:px-5 sm:py-4">
                <p className="break-words text-[13px] font-medium leading-6 text-[#061b46] sm:text-[13.5px]">
                    {value}
                </p>
            </div>
        </div>
    );
}

function StatCard({ item }) {
    return (
        <div className="min-w-0 rounded-[20px] border border-slate-200 bg-white p-4 shadow-lg shadow-slate-200/60 sm:p-5">
            <div className="flex min-w-0 items-center gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[18px] border border-slate-200 bg-white text-[30px] shadow-sm sm:h-16 sm:w-16 sm:text-[34px]">
                    {item.icon}
                </div>

                <div className="min-w-0">
                    <p className="break-words font-serif text-[28px] font-semibold leading-none text-[#061b46] sm:text-[34px]">
                        {item.value}
                    </p>

                    <p className="mt-2 break-words text-[12px] font-medium text-slate-600 sm:text-[13px]">
                        {item.label}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default function IdentitySection({ profileData }) {
    const school = profileData?.school || {};

    const identityData = normalizeIdentity(school.identity);

    const statItems =
        Array.isArray(profileData?.profileStats) &&
        profileData.profileStats.length > 0
            ? profileData.profileStats
            : fallbackProfileStats;

    return (
        <div className="w-full min-w-0 space-y-6 sm:space-y-7">
            <div className="grid w-full min-w-0 grid-cols-1 gap-5 sm:gap-6 xl:grid-cols-[1fr_0.74fr]">
                <div className="min-w-0 rounded-[22px] border border-slate-200 bg-white p-5 shadow-xl shadow-slate-200/70 sm:rounded-[26px] sm:p-8">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#0d58cf] sm:tracking-[0.24em]">
                        Data Resmi Sekolah
                    </p>

                    <h2 className="mt-4 break-words font-serif text-[30px] font-semibold leading-tight tracking-[-0.035em] text-[#061b46] sm:text-[42px]">
                        Informasi Identitas Sekolah
                    </h2>

                    <p className="mt-4 max-w-3xl break-words text-[14px] font-medium leading-7 text-slate-600 sm:text-[15px] sm:leading-8">
                        Informasi dasar sekolah sebagai identitas resmi yang
                        dapat digunakan oleh siswa, orang tua, dan masyarakat.
                    </p>

                    <div className="mt-6 min-w-0 overflow-hidden rounded-[18px] border border-slate-200 sm:mt-7">
                        {identityData.map((item, index) => (
                            <IdentityRow
                                key={`${item.label}-${index}`}
                                label={item.label}
                                value={item.value}
                            />
                        ))}
                    </div>
                </div>

                <div className="min-w-0 space-y-5 sm:space-y-6">
                    <div className="rounded-[22px] bg-gradient-to-br from-[#052b66] to-[#063f8d] p-5 text-white shadow-xl shadow-blue-200 sm:rounded-[24px] sm:p-8">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-blue-100 sm:text-[12px] sm:tracking-[0.22em]">
                            Butuh Informasi Lebih Lanjut?
                        </p>

                        <p className="mt-4 break-words text-[14px] font-medium leading-7 text-blue-50 sm:mt-5 sm:text-[15px] sm:leading-8">
                            Silakan hubungi pihak sekolah untuk informasi
                            pendaftaran, akademik, dan layanan administrasi.
                        </p>

                        <div className="mt-5 grid gap-3 sm:mt-6 sm:space-y-0">
                            <a
                                href="/#kontak"
                                className="flex min-h-[52px] items-center justify-center gap-3 rounded-[12px] bg-white px-5 text-center text-[13px] font-semibold text-[#052b66] shadow-lg transition hover:bg-blue-50 sm:min-h-[56px] sm:px-6 sm:text-[14px]"
                            >
                                <span>☎️</span>
                                Hubungi Sekolah
                            </a>

                            <a
                                href="/"
                                className="flex min-h-[52px] items-center justify-center gap-3 rounded-[12px] border border-white/30 px-5 text-center text-[13px] font-semibold text-white transition hover:bg-white/10 sm:min-h-[56px] sm:px-6 sm:text-[14px]"
                            >
                                <span>←</span>
                                Kembali ke Beranda
                            </a>
                        </div>
                    </div>

                    <div className="min-w-0 overflow-hidden rounded-[22px] border border-slate-200 bg-white shadow-xl shadow-slate-200/70 sm:rounded-[24px]">
                        <div className="relative h-[280px] overflow-hidden sm:h-[330px]">
                            <img
                                src={
                                    school.identityImage ||
                                    "/frontend/images/identity-school.jpg"
                                }
                                alt="Galeri Sekolah"
                                className="h-full w-full object-cover object-center"
                                onError={(event) => {
                                    event.currentTarget.src =
                                        "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1200&q=85";
                                }}
                            />

                            <div className="absolute inset-x-4 bottom-4 rounded-[16px] bg-black/55 p-4 text-white backdrop-blur-sm sm:inset-x-5 sm:bottom-5 sm:p-5">
                                <div className="flex min-w-0 items-center justify-between gap-3 sm:gap-4">
                                    <div className="flex min-w-0 items-center gap-3 sm:gap-4">
                                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[14px] border border-white/20 bg-white/10 text-[24px] sm:h-14 sm:w-14 sm:text-[28px]">
                                            🖼️
                                        </div>

                                        <div className="min-w-0">
                                            <h3 className="break-words text-[15px] font-semibold sm:text-[17px]">
                                                Galeri Sekolah
                                            </h3>

                                            <p className="mt-1 line-clamp-2 text-[12px] font-medium text-white/80 sm:text-[13px]">
                                                Lihat lebih banyak foto sekolah
                                                kami.
                                            </p>
                                        </div>
                                    </div>

                                    <span className="shrink-0 text-[24px] sm:text-[26px]">
                                        ›
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 xl:grid-cols-5">
                {statItems.slice(0, 5).map((item, index) => (
                    <StatCard key={`${item.label}-${index}`} item={item} />
                ))}
            </div>
        </div>
    );
}