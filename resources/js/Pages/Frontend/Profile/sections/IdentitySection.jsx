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
    { label: "Nama Sekolah", value: "SMA Negeri 1 Mojokerto" },
    { label: "NPSN", value: "20500001" },
    { label: "Akreditasi", value: "A" },
    { label: "Status Sekolah", value: "Negeri" },
    { label: "Jenjang", value: "Sekolah Menengah Atas" },
    { label: "Kurikulum", value: "Kurikulum Merdeka" },
    { label: "Alamat", value: "Jl. Pendidikan No. 21, Mojokerto, Jawa Timur 61314" },
    { label: "Email", value: "info@sman1mojokerto.sch.id" },
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
        <div className="grid gap-3 border-b border-slate-200 last:border-b-0 sm:grid-cols-[230px_1fr]">
            <div className="flex items-center gap-4 bg-slate-50 px-5 py-4">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-50 text-[18px]">
                    {identityIcons[label] ?? "📌"}
                </div>

                <p className="text-[13px] font-semibold text-[#061b46]">
                    {label}
                </p>
            </div>

            <div className="flex items-center px-5 py-4">
                <p className="text-[13.5px] font-medium leading-6 text-[#061b46]">
                    {value}
                </p>
            </div>
        </div>
    );
}

function StatCard({ item }) {
    return (
        <div className="rounded-[20px] border border-slate-200 bg-white p-5 shadow-lg shadow-slate-200/60">
            <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-[18px] border border-slate-200 bg-white text-[34px] shadow-sm">
                    {item.icon}
                </div>

                <div>
                    <p className="font-serif text-[34px] font-semibold leading-none text-[#061b46]">
                        {item.value}
                    </p>

                    <p className="mt-2 text-[13px] font-medium text-slate-600">
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
        <div className="space-y-7">
            <div className="grid gap-6 xl:grid-cols-[1fr_0.74fr]">
                <div className="rounded-[26px] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/70 sm:p-8">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#0d58cf]">
                        Data Resmi Sekolah
                    </p>

                    <h2 className="mt-4 font-serif text-[34px] font-semibold leading-tight tracking-[-0.035em] text-[#061b46] sm:text-[42px]">
                        Informasi Identitas Sekolah
                    </h2>

                    <p className="mt-4 max-w-3xl text-[15px] font-medium leading-8 text-slate-600">
                        Informasi dasar sekolah sebagai identitas resmi yang
                        dapat digunakan oleh siswa, orang tua, dan masyarakat.
                    </p>

                    <div className="mt-7 overflow-hidden rounded-[18px] border border-slate-200">
                        {identityData.map((item, index) => (
                            <IdentityRow
                                key={`${item.label}-${index}`}
                                label={item.label}
                                value={item.value}
                            />
                        ))}
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="rounded-[24px] bg-gradient-to-br from-[#052b66] to-[#063f8d] p-6 text-white shadow-xl shadow-blue-200 sm:p-8">
                        <p className="text-[12px] font-semibold uppercase tracking-[0.22em] text-blue-100">
                            Butuh Informasi Lebih Lanjut?
                        </p>

                        <p className="mt-5 text-[15px] font-medium leading-8 text-blue-50">
                            Silakan hubungi pihak sekolah untuk informasi
                            pendaftaran, akademik, dan layanan administrasi.
                        </p>

                        <div className="mt-6 space-y-4">
                            <a
                                href="/#kontak"
                                className="flex min-h-[56px] items-center justify-center gap-3 rounded-[12px] bg-white px-6 text-[14px] font-semibold text-[#052b66] shadow-lg transition hover:bg-blue-50"
                            >
                                <span>☎️</span>
                                Hubungi Sekolah
                            </a>

                            <a
                                href="/"
                                className="flex min-h-[56px] items-center justify-center gap-3 rounded-[12px] border border-white/30 px-6 text-[14px] font-semibold text-white transition hover:bg-white/10"
                            >
                                <span>←</span>
                                Kembali ke Beranda
                            </a>
                        </div>
                    </div>

                    <div className="overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-xl shadow-slate-200/70">
                        <div className="relative h-[330px] overflow-hidden">
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

                            <div className="absolute inset-x-5 bottom-5 rounded-[16px] bg-black/55 p-5 text-white backdrop-blur-sm">
                                <div className="flex items-center justify-between gap-4">
                                    <div className="flex items-center gap-4">
                                        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[14px] border border-white/20 bg-white/10 text-[28px]">
                                            🖼️
                                        </div>

                                        <div>
                                            <h3 className="text-[17px] font-semibold">
                                                Galeri Sekolah
                                            </h3>

                                            <p className="mt-1 text-[13px] font-medium text-white/80">
                                                Lihat lebih banyak foto sekolah
                                                kami.
                                            </p>
                                        </div>
                                    </div>

                                    <span className="text-[26px]">›</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-5">
                {statItems.slice(0, 5).map((item, index) => (
                    <StatCard key={`${item.label}-${index}`} item={item} />
                ))}
            </div>
        </div>
    );
}