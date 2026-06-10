import AdminLayout from "./Layouts/AdminLayout";

function SummaryCard({ title, value, description, icon }) {
    return (
        <div className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/70">
            <div className="flex items-start justify-between gap-4">
                <div>
                    <p className="text-[12px] font-extrabold uppercase tracking-[0.14em] text-slate-500">
                        {title}
                    </p>

                    <h3 className="mt-4 text-[38px] font-black leading-none tracking-[-0.04em] text-[#061b46]">
                        {value}
                    </h3>

                    <p className="mt-3 text-[13px] font-semibold leading-6 text-slate-500">
                        {description}
                    </p>
                </div>

                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[18px] bg-blue-50 text-[28px] text-[#061b46]">
                    {icon}
                </div>
            </div>
        </div>
    );
}

function QuickMenuCard({ title, description, href, icon }) {
    return (
        <a
            href={href}
            className="group rounded-[22px] border border-slate-200 bg-white p-6 shadow-lg shadow-slate-200/60 transition duration-300 hover:-translate-y-1 hover:shadow-2xl"
        >
            <div className="flex items-start gap-4">
                <div className="flex h-13 w-13 shrink-0 items-center justify-center rounded-[18px] bg-[#061b46] p-3 text-[24px] text-white transition group-hover:bg-[#d59a25]">
                    {icon}
                </div>

                <div>
                    <h3 className="text-[17px] font-extrabold text-[#061b46]">
                        {title}
                    </h3>

                    <p className="mt-2 text-[13px] font-semibold leading-6 text-slate-500">
                        {description}
                    </p>

                    <p className="mt-4 inline-flex items-center gap-2 text-[12px] font-extrabold uppercase tracking-[0.08em] text-[#d59a25]">
                        Kelola Data
                        <span>→</span>
                    </p>
                </div>
            </div>
        </a>
    );
}

export default function Dashboard({ summary }) {
    const data = summary || {
        school_settings: 0,
        menus: 0,
        home_sections: 0,
        statistics: 0,
    };

    return (
        <AdminLayout title="Dashboard">
            <section className="rounded-[28px] bg-gradient-to-br from-[#061b46] to-[#0b3b85] p-6 text-white shadow-2xl shadow-blue-200 sm:p-8">
                <div className="grid gap-8 lg:grid-cols-[1fr_360px] lg:items-center">
                    <div>
                        <p className="text-[12px] font-extrabold uppercase tracking-[0.22em] text-[#f7c46a]">
                            Website Sekolah
                        </p>

                        <h1 className="mt-4 max-w-3xl text-[34px] font-black leading-tight tracking-[-0.05em] sm:text-[46px]">
                            Kelola Konten Frontend dari Admin Custom React
                        </h1>

                        <p className="mt-5 max-w-2xl text-[15px] font-medium leading-8 text-blue-100">
                            Dashboard ini digunakan untuk mengatur navbar,
                            beranda, profil, akademik, kesiswaan, informasi,
                            galeri, dan PPDB sekolah.
                        </p>
                    </div>

                    <div className="rounded-[24px] border border-white/10 bg-white/10 p-6 backdrop-blur">
                        <p className="text-[13px] font-bold text-blue-100">
                            Status Integrasi
                        </p>

                        <div className="mt-5 space-y-4">
                            <div className="flex items-center justify-between gap-4">
                                <span className="text-[13px] font-semibold text-blue-100">
                                    Database
                                </span>
                                <span className="rounded-full bg-emerald-400/20 px-3 py-1 text-[11px] font-extrabold text-emerald-100">
                                    Aktif
                                </span>
                            </div>

                            <div className="flex items-center justify-between gap-4">
                                <span className="text-[13px] font-semibold text-blue-100">
                                    Inertia React
                                </span>
                                <span className="rounded-full bg-emerald-400/20 px-3 py-1 text-[11px] font-extrabold text-emerald-100">
                                    Aktif
                                </span>
                            </div>

                            <div className="flex items-center justify-between gap-4">
                                <span className="text-[13px] font-semibold text-blue-100">
                                    Admin Panel
                                </span>
                                <span className="rounded-full bg-[#f7c46a]/20 px-3 py-1 text-[11px] font-extrabold text-[#f7c46a]">
                                    Step Awal
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
                <SummaryCard
                    title="Setting Sekolah"
                    value={data.school_settings}
                    description="Data identitas, logo, kontak, dan alamat sekolah."
                    icon="🏫"
                />

                <SummaryCard
                    title="Menu Navbar"
                    value={data.menus}
                    description="Jumlah menu navigasi yang tampil di frontend."
                    icon="🧭"
                />

                <SummaryCard
                    title="Beranda"
                    value={data.home_sections}
                    description="Konten hero, CTA, gambar, dan card PPDB."
                    icon="🏠"
                />

                <SummaryCard
                    title="Statistik"
                    value={data.statistics}
                    description="Jumlah statistik sekolah yang aktif."
                    icon="📊"
                />
            </section>

            <section className="mt-8">
                <div className="mb-5 flex items-end justify-between gap-4">
                    <div>
                        <p className="text-[12px] font-extrabold uppercase tracking-[0.18em] text-[#d59a25]">
                            Kelola Cepat
                        </p>
                        <h2 className="mt-2 text-[26px] font-black tracking-[-0.04em] text-[#061b46]">
                            Modul Admin
                        </h2>
                    </div>
                </div>

                <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                    <QuickMenuCard
                        title="Setting Sekolah"
                        description="Atur logo, nama sekolah, tagline, telepon, email, dan alamat."
                        href="/admin/settings"
                        icon="🏫"
                    />

                    <QuickMenuCard
                        title="Navbar Menu"
                        description="Kelola menu utama dan link navigasi yang tampil di website."
                        href="/admin/menus"
                        icon="🧭"
                    />

                    <QuickMenuCard
                        title="Beranda"
                        description="Atur hero title, subtitle, gambar, CTA, statistik, dan card PPDB."
                        href="/admin/home"
                        icon="🏠"
                    />

                    <QuickMenuCard
                        title="Profil Sekolah"
                        description="Kelola profil, sambutan kepala sekolah, sejarah, visi misi, dan identitas."
                        href="/admin/profiles"
                        icon="📘"
                    />

                    <QuickMenuCard
                        title="Informasi"
                        description="Kelola berita, pengumuman, agenda, dan layanan administrasi."
                        href="/admin/posts"
                        icon="📰"
                    />

                    <QuickMenuCard
                        title="PPDB"
                        description="Kelola tahun ajaran, jadwal, alur, syarat, dan data pendaftar."
                        href="/admin/ppdb-periods"
                        icon="📝"
                    />
                </div>
            </section>
        </AdminLayout>
    );
}