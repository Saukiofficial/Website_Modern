const fallbackLeaders = [
    {
        role: "Kepala Sekolah",
        name: "Drs. Ahmad Fauzi, M.Pd.",
        description:
            "Memimpin dan bertanggung jawab atas penyelenggaraan pendidikan secara menyeluruh di SMA Negeri 1 Mojokerto.",
        image: "/frontend/images/principal.jpg",
        fallback:
            "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=700&q=85",
        is_principal: true,
    },
    {
        role: "Waka Kurikulum",
        name: "Dra. Siti Aminah",
        description:
            "Bertanggung jawab atas pengembangan kurikulum, proses pembelajaran, dan penilaian akademik.",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=700&q=85",
        is_principal: false,
    },
    {
        role: "Waka Kesiswaan",
        name: "M. Ridwan, S.Pd.",
        description:
            "Bertanggung jawab atas pembinaan kesiswaan, disiplin, prestasi, dan kegiatan siswa.",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=700&q=85",
        is_principal: false,
    },
    {
        role: "Waka Sarpras",
        name: "Nur Laila, S.Pd.",
        description:
            "Bertanggung jawab atas sarana prasarana, fasilitas, dan pengelolaan lingkungan sekolah.",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=700&q=85",
        is_principal: false,
    },
    {
        role: "Kepala Tata Usaha",
        name: "Hendra Wijaya, S.Kom.",
        description:
            "Bertanggung jawab atas administrasi, keuangan, kepegawaian, dan layanan administratif sekolah.",
        image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=700&q=85",
        is_principal: false,
    },
];

const fallbackUnits = [
    {
        title: "Guru & Tenaga Pendidik",
        description:
            "Melaksanakan kegiatan belajar mengajar serta membimbing siswa secara akademik dan karakter.",
        icon: "📖",
    },
    {
        title: "Wali Kelas",
        description:
            "Membina, membimbing, dan memantau perkembangan akademik serta karakter siswa di kelas.",
        icon: "👥",
    },
    {
        title: "Pembina Ekstrakurikuler",
        description:
            "Mengembangkan minat, bakat, dan potensi siswa melalui kegiatan ekstrakurikuler yang beragam.",
        icon: "👨‍👩‍👧‍👦",
    },
    {
        title: "Layanan Pendukung",
        description:
            "Mendukung kelancaran kegiatan sekolah melalui layanan BK, perpustakaan, laboratorium, dan unit lainnya.",
        icon: "🤝",
    },
    {
        title: "Komite Sekolah",
        description:
            "Bersinergi dengan sekolah dalam meningkatkan mutu pendidikan dan pelayanan kepada siswa.",
        icon: "👨‍👩‍👧",
    },
];

function LeaderCard({ item, principal = false }) {
    return (
        <div
            className={`relative overflow-hidden rounded-[16px] border border-slate-200 bg-white shadow-lg shadow-slate-200/60 ${
                principal ? "mx-auto max-w-[520px]" : ""
            }`}
        >
            <div className="flex min-h-[44px] items-center justify-center bg-gradient-to-r from-[#052b66] to-[#063f8d] px-4">
                <p className="text-center text-[12px] font-semibold uppercase tracking-[0.18em] text-white">
                    {item.role}
                </p>
            </div>

            <div
                className={`grid gap-4 p-4 ${
                    principal
                        ? "sm:grid-cols-[130px_1fr] sm:items-center"
                        : "sm:grid-cols-[112px_1fr] sm:items-start"
                }`}
            >
                <img
                    src={item.image}
                    alt={item.name}
                    className={`w-full rounded-[12px] object-cover ${
                        principal ? "h-[150px]" : "h-[118px]"
                    }`}
                    onError={(event) => {
                        if (item.fallback) {
                            event.currentTarget.src = item.fallback;
                        }
                    }}
                />

                <div>
                    <h3 className="font-serif text-[19px] font-semibold leading-tight text-[#061b46]">
                        {item.name}
                    </h3>

                    <p className="mt-3 text-[13px] font-medium leading-7 text-slate-600">
                        {item.description}
                    </p>
                </div>
            </div>
        </div>
    );
}

function UnitCard({ item }) {
    return (
        <div className="rounded-[18px] border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
            <div className="text-[42px] leading-none text-[#052b66]">
                {item.icon}
            </div>

            <h3 className="mt-4 text-[17px] font-semibold leading-tight text-[#061b46]">
                {item.title}
            </h3>

            <p className="mt-3 text-[12.5px] font-medium leading-6 text-slate-600">
                {item.description}
            </p>
        </div>
    );
}

export default function StructureSection({ profileData }) {
    const leaders =
        Array.isArray(profileData?.organization) &&
        profileData.organization.length > 0
            ? profileData.organization
            : fallbackLeaders;

    const units =
        Array.isArray(profileData?.organizationUnits) &&
        profileData.organizationUnits.length > 0
            ? profileData.organizationUnits
            : fallbackUnits;

    const principal =
        leaders.find((leader) => leader.is_principal) || leaders[0];

    const viceLeaders = leaders.filter(
        (leader) => leader.id !== principal?.id && leader.role !== principal?.role
    );

    return (
        <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-xl shadow-slate-200/70 sm:p-8 lg:p-10">
            <div className="relative overflow-hidden">
                <div className="absolute right-0 top-0 hidden opacity-20 lg:block">
                    <div className="text-[190px] leading-none">🏫</div>
                </div>

                <div className="relative">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#0d58cf]">
                        Susunan Pengelola Sekolah
                    </p>

                    <h2 className="mt-4 font-serif text-[34px] font-semibold leading-tight tracking-[-0.035em] text-[#061b46] sm:text-[44px]">
                        Susunan Pengelola Sekolah
                    </h2>

                    <p className="mt-5 max-w-[760px] text-[15px] font-medium leading-8 text-slate-600">
                        Struktur organisasi sekolah yang mendukung tata kelola
                        pendidikan, layanan akademik, kesiswaan, sarana
                        prasarana, dan administrasi sekolah.
                    </p>
                </div>

                <div className="relative mt-10">
                    {principal ? (
                        <LeaderCard item={principal} principal />
                    ) : null}

                    <div className="mx-auto hidden h-12 w-[2px] bg-[#0d58cf]/60 lg:block" />

                    <div className="relative hidden lg:block">
                        <div className="mx-auto h-[2px] w-[72%] bg-[#0d58cf]/60" />

                        <div
                            className="mx-auto grid w-[72%]"
                            style={{
                                gridTemplateColumns: `repeat(${Math.max(
                                    viceLeaders.length,
                                    1
                                )}, minmax(0, 1fr))`,
                            }}
                        >
                            {viceLeaders.map((leader) => (
                                <div
                                    key={leader.role}
                                    className="mx-auto h-10 w-[2px] bg-[#0d58cf]/60"
                                />
                            ))}
                        </div>
                    </div>

                    <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                        {viceLeaders.map((leader) => (
                            <LeaderCard key={leader.role} item={leader} />
                        ))}
                    </div>

                    <div className="mx-auto mt-8 hidden h-12 w-[2px] bg-[#0d58cf]/60 lg:block" />

                    <div className="relative hidden lg:block">
                        <div className="mx-auto h-[2px] w-[86%] bg-[#0d58cf]/60" />

                        <div
                            className="mx-auto grid w-[86%]"
                            style={{
                                gridTemplateColumns: `repeat(${Math.max(
                                    units.length,
                                    1
                                )}, minmax(0, 1fr))`,
                            }}
                        >
                            {units.map((unit) => (
                                <div
                                    key={unit.title}
                                    className="mx-auto h-8 w-[2px] bg-[#0d58cf]/60"
                                />
                            ))}
                        </div>
                    </div>

                    <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
                        {units.map((unit) => (
                            <UnitCard key={unit.title} item={unit} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}