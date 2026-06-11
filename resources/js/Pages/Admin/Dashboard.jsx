import AdminLayout from "./Layouts/AdminLayout";

function safeValue(value, fallback = 0) {
    if (value === null || value === undefined || value === "") {
        return fallback;
    }

    return value;
}

function SummaryCard({ title, value, description, icon, accent = "blue" }) {
    const styles = {
        blue: {
            icon: "bg-blue-50 text-[#061b46]",
            ring: "ring-blue-100",
            glow: "shadow-blue-100/70",
        },
        gold: {
            icon: "bg-yellow-50 text-[#9a6a12]",
            ring: "ring-yellow-100",
            glow: "shadow-yellow-100/70",
        },
        green: {
            icon: "bg-emerald-50 text-emerald-700",
            ring: "ring-emerald-100",
            glow: "shadow-emerald-100/70",
        },
        red: {
            icon: "bg-red-50 text-red-700",
            ring: "ring-red-100",
            glow: "shadow-red-100/70",
        },
        slate: {
            icon: "bg-slate-100 text-slate-700",
            ring: "ring-slate-100",
            glow: "shadow-slate-100/70",
        },
    };

    const current = styles[accent] || styles.blue;

    return (
        <div
            className={`group rounded-[26px] border border-slate-200 bg-white p-5 shadow-xl ${current.glow} transition duration-300 hover:-translate-y-1 hover:shadow-2xl sm:p-6`}
        >
            <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                    <p className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-slate-400">
                        {title}
                    </p>

                    <h3 className="mt-4 text-[34px] font-black leading-none tracking-[-0.05em] text-[#061b46] sm:text-[40px]">
                        {value}
                    </h3>

                    <p className="mt-3 text-[12.5px] font-semibold leading-6 text-slate-500">
                        {description}
                    </p>
                </div>

                <div
                    className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-[18px] text-[28px] ring-1 ${current.icon} ${current.ring}`}
                >
                    {icon}
                </div>
            </div>
        </div>
    );
}

function QuickMenuCard({ title, description, href, icon, badge }) {
    return (
        <a
            href={href}
            className="group relative overflow-hidden rounded-[24px] border border-slate-200 bg-white p-5 shadow-lg shadow-slate-200/60 transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-2xl hover:shadow-blue-100/70 sm:p-6"
        >
            <div className="absolute right-0 top-0 h-24 w-24 translate-x-8 -translate-y-8 rounded-full bg-blue-50 transition group-hover:bg-yellow-50" />

            <div className="relative z-10 flex items-start gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[18px] bg-[#061b46] text-[25px] text-white shadow-lg shadow-blue-200 transition group-hover:bg-[#d59a25]">
                    {icon}
                </div>

                <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-3">
                        <h3 className="text-[17px] font-black leading-tight text-[#061b46]">
                            {title}
                        </h3>

                        {badge ? (
                            <span className="shrink-0 rounded-full bg-blue-50 px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.08em] text-blue-700">
                                {badge}
                            </span>
                        ) : null}
                    </div>

                    <p className="mt-2 text-[13px] font-semibold leading-6 text-slate-500">
                        {description}
                    </p>

                    <p className="mt-5 inline-flex items-center gap-2 text-[12px] font-extrabold uppercase tracking-[0.08em] text-[#d59a25]">
                        Kelola Data
                        <span className="transition group-hover:translate-x-1">
                            →
                        </span>
                    </p>
                </div>
            </div>
        </a>
    );
}

function StatusItem({ label, value, status = "Aktif" }) {
    return (
        <div className="flex items-center justify-between gap-4 rounded-[16px] border border-white/10 bg-white/8 px-4 py-3">
            <div>
                <p className="text-[12px] font-semibold text-blue-100">
                    {label}
                </p>
                <p className="mt-1 text-[15px] font-black text-white">
                    {value}
                </p>
            </div>

            <span className="rounded-full bg-emerald-400/20 px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.08em] text-emerald-100 ring-1 ring-emerald-300/20">
                {status}
            </span>
        </div>
    );
}

function ProgressItem({ label, value, total, icon }) {
    const percentage =
        Number(total) > 0 ? Math.min((Number(value) / Number(total)) * 100, 100) : 0;

    return (
        <div className="rounded-[18px] border border-slate-200 bg-white p-5">
            <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-[14px] bg-blue-50 text-[22px]">
                        {icon}
                    </div>

                    <div>
                        <p className="text-[13px] font-black text-[#061b46]">
                            {label}
                        </p>
                        <p className="mt-1 text-[11px] font-semibold text-slate-400">
                            {value} dari {total} data
                        </p>
                    </div>
                </div>

                <p className="text-[16px] font-black text-[#061b46]">
                    {Math.round(percentage)}%
                </p>
            </div>

            <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-100">
                <div
                    className="h-full rounded-full bg-[#061b46]"
                    style={{ width: `${percentage}%` }}
                />
            </div>
        </div>
    );
}

function ActivityCard({ title, description, icon, href }) {
    return (
        <a
            href={href}
            className="flex items-start gap-4 rounded-[18px] border border-slate-200 bg-white p-4 transition hover:border-blue-200 hover:bg-blue-50/40"
        >
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[14px] bg-slate-100 text-[22px]">
                {icon}
            </div>

            <div className="min-w-0">
                <h4 className="text-[13.5px] font-black leading-tight text-[#061b46]">
                    {title}
                </h4>

                <p className="mt-1 text-[12px] font-semibold leading-5 text-slate-500">
                    {description}
                </p>
            </div>
        </a>
    );
}

export default function Dashboard({ summary }) {
    const data = {
        school_settings: safeValue(summary?.school_settings),
        menus: safeValue(summary?.menus),
        home_sections: safeValue(summary?.home_sections),
        statistics: safeValue(summary?.statistics),

        profiles: safeValue(summary?.profiles),
        academic_calendars: safeValue(summary?.academic_calendars),
        teachers: safeValue(summary?.teachers),
        extracurriculars: safeValue(summary?.extracurriculars),
        osis_members: safeValue(summary?.osis_members),
        achievements: safeValue(summary?.achievements),

        student_programs: safeValue(summary?.student_programs),
        student_registrations: safeValue(summary?.student_registrations),

        posts: safeValue(summary?.posts),
        galleries: safeValue(summary?.galleries),

        ppdb_registrations: safeValue(summary?.ppdb_registrations),
        ppdb_new: safeValue(summary?.ppdb_new),
        ppdb_processed: safeValue(summary?.ppdb_processed),
        ppdb_accepted: safeValue(summary?.ppdb_accepted),
        ppdb_rejected: safeValue(summary?.ppdb_rejected),
    };

    const contentTotal =
        Number(data.posts) +
        Number(data.galleries) +
        Number(data.academic_calendars) +
        Number(data.teachers) +
        Number(data.extracurriculars) +
        Number(data.osis_members) +
        Number(data.achievements) +
        Number(data.student_programs);

    const ppdbTotal =
        Number(data.ppdb_new) +
        Number(data.ppdb_processed) +
        Number(data.ppdb_accepted) +
        Number(data.ppdb_rejected);

    return (
        <AdminLayout title="Dashboard">
            <section className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-[#061b46] via-[#07306f] to-[#0b3b85] p-6 text-white shadow-2xl shadow-blue-200 sm:p-8 lg:p-9">
                <div className="absolute right-[-120px] top-[-120px] h-[300px] w-[300px] rounded-full bg-[#f7c46a]/15 blur-3xl" />
                <div className="absolute bottom-[-140px] left-[20%] h-[280px] w-[280px] rounded-full bg-blue-300/20 blur-3xl" />

                <div className="relative z-10 grid gap-8 xl:grid-cols-[1fr_430px] xl:items-center">
                    <div>
                        <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/10 px-4 py-2 backdrop-blur">
                            <span className="h-2 w-2 rounded-full bg-emerald-300" />
                            <p className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-blue-50">
                                Admin Website Sekolah
                            </p>
                        </div>

                        <h1 className="mt-5 max-w-4xl text-[34px] font-black leading-tight tracking-[-0.055em] text-white sm:text-[46px] lg:text-[54px]">
                            Dashboard Kontrol Website Sekolah
                        </h1>

                        <p className="mt-5 max-w-3xl text-[15px] font-medium leading-8 text-blue-100">
                            Kelola seluruh konten website sekolah dari satu
                            tempat: beranda, profil, akademik, kesiswaan,
                            informasi, galeri, dan PPDB.
                        </p>

                        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                            <a
                                href="/"
                                className="inline-flex min-h-[52px] items-center justify-center rounded-[16px] bg-[#f7c46a] px-6 text-[13px] font-extrabold uppercase tracking-[0.08em] text-[#061b46] shadow-lg shadow-blue-950/20 transition hover:bg-yellow-300"
                            >
                                Lihat Website
                            </a>

                            <a
                                href="/admin/posts"
                                className="inline-flex min-h-[52px] items-center justify-center rounded-[16px] border border-white/15 bg-white/10 px-6 text-[13px] font-extrabold uppercase tracking-[0.08em] text-white transition hover:bg-white/20"
                            >
                                Tambah Informasi
                            </a>
                        </div>
                    </div>

                    <div className="rounded-[28px] border border-white/10 bg-white/10 p-5 shadow-2xl shadow-blue-950/10 backdrop-blur sm:p-6">
                        <div className="mb-5 flex items-center justify-between gap-4">
                            <div>
                                <p className="text-[12px] font-extrabold uppercase tracking-[0.18em] text-[#f7c46a]">
                                    Status Sistem
                                </p>
                                <h2 className="mt-2 text-[24px] font-black tracking-[-0.04em] text-white">
                                    Integrasi Aktif
                                </h2>
                            </div>

                            <div className="flex h-14 w-14 items-center justify-center rounded-[18px] bg-white/10 text-[30px]">
                                ⚡
                            </div>
                        </div>

                        <div className="grid gap-3">
                            <StatusItem
                                label="Database"
                                value="Laravel Model"
                                status="Aktif"
                            />

                            <StatusItem
                                label="Frontend"
                                value="Inertia React"
                                status="Aktif"
                            />

                            <StatusItem
                                label="Admin Panel"
                                value="Custom React"
                                status="Aktif"
                            />

                            <StatusItem
                                label="Upload File"
                                value="Storage Public"
                                status="Aktif"
                            />
                        </div>
                    </div>
                </div>
            </section>

            <section className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
                <SummaryCard
                    title="Konten Website"
                    value={contentTotal}
                    description="Total konten aktif dari informasi, galeri, akademik, dan kesiswaan."
                    icon="🧩"
                    accent="blue"
                />

                <SummaryCard
                    title="Informasi"
                    value={data.posts}
                    description="Berita, pengumuman, artikel, dan agenda sekolah."
                    icon="📰"
                    accent="gold"
                />

                <SummaryCard
                    title="Galeri"
                    value={data.galleries}
                    description="Dokumentasi foto kegiatan sekolah yang tampil di frontend."
                    icon="🖼️"
                    accent="green"
                />

                <SummaryCard
                    title="Pendaftar PPDB"
                    value={data.ppdb_registrations || ppdbTotal}
                    description="Total data calon peserta didik baru yang masuk."
                    icon="📂"
                    accent="red"
                />
            </section>

            <section className="mt-5 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
                <SummaryCard
                    title="Setting Sekolah"
                    value={data.school_settings}
                    description="Identitas, logo, kontak, dan alamat sekolah."
                    icon="🏫"
                    accent="blue"
                />

                <SummaryCard
                    title="Menu Navbar"
                    value={data.menus}
                    description="Jumlah menu navigasi yang tampil di frontend."
                    icon="🧭"
                    accent="slate"
                />

                <SummaryCard
                    title="Beranda"
                    value={data.home_sections}
                    description="Hero, CTA, gambar, statistik, dan card PPDB."
                    icon="🏠"
                    accent="green"
                />

                <SummaryCard
                    title="Statistik"
                    value={data.statistics}
                    description="Jumlah statistik sekolah yang tampil di beranda."
                    icon="📊"
                    accent="gold"
                />
            </section>

            <section className="mt-8 grid gap-6 xl:grid-cols-[1fr_420px]">
                <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/70">
                    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                        <div>
                            <p className="text-[12px] font-extrabold uppercase tracking-[0.18em] text-[#d59a25]">
                                Monitoring Konten
                            </p>
                            <h2 className="mt-2 text-[26px] font-black tracking-[-0.04em] text-[#061b46]">
                                Ringkasan Modul Aktif
                            </h2>
                        </div>

                        <a
                            href="/admin/posts"
                            className="inline-flex min-h-[44px] items-center justify-center rounded-[14px] bg-blue-50 px-5 text-[12px] font-extrabold uppercase tracking-[0.08em] text-blue-700 transition hover:bg-blue-100"
                        >
                            Kelola Konten
                        </a>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                        <ProgressItem
                            label="Informasi / Berita"
                            value={data.posts}
                            total={Math.max(contentTotal, 1)}
                            icon="📰"
                        />

                        <ProgressItem
                            label="Galeri Kegiatan"
                            value={data.galleries}
                            total={Math.max(contentTotal, 1)}
                            icon="🖼️"
                        />

                        <ProgressItem
                            label="Akademik"
                            value={
                                Number(data.academic_calendars) +
                                Number(data.teachers) +
                                Number(data.extracurriculars) +
                                Number(data.osis_members) +
                                Number(data.achievements)
                            }
                            total={Math.max(contentTotal, 1)}
                            icon="🎓"
                        />

                        <ProgressItem
                            label="Kesiswaan"
                            value={
                                Number(data.student_programs) +
                                Number(data.student_registrations)
                            }
                            total={Math.max(contentTotal, 1)}
                            icon="👥"
                        />
                    </div>
                </div>

                <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/70">
                    <div className="mb-6">
                        <p className="text-[12px] font-extrabold uppercase tracking-[0.18em] text-[#d59a25]">
                            PPDB
                        </p>
                        <h2 className="mt-2 text-[26px] font-black tracking-[-0.04em] text-[#061b46]">
                            Status Pendaftar
                        </h2>
                    </div>

                    <div className="space-y-4">
                        <ProgressItem
                            label="Baru"
                            value={data.ppdb_new}
                            total={Math.max(ppdbTotal, 1)}
                            icon="🆕"
                        />

                        <ProgressItem
                            label="Diproses"
                            value={data.ppdb_processed}
                            total={Math.max(ppdbTotal, 1)}
                            icon="🔎"
                        />

                        <ProgressItem
                            label="Diterima"
                            value={data.ppdb_accepted}
                            total={Math.max(ppdbTotal, 1)}
                            icon="✅"
                        />

                        <ProgressItem
                            label="Ditolak"
                            value={data.ppdb_rejected}
                            total={Math.max(ppdbTotal, 1)}
                            icon="❌"
                        />
                    </div>
                </div>
            </section>

            <section className="mt-8">
                <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <p className="text-[12px] font-extrabold uppercase tracking-[0.18em] text-[#d59a25]">
                            Kelola Cepat
                        </p>
                        <h2 className="mt-2 text-[26px] font-black tracking-[-0.04em] text-[#061b46]">
                            Modul Admin
                        </h2>
                    </div>

                    <a
                        href="/"
                        className="inline-flex min-h-[46px] items-center justify-center rounded-[14px] border border-slate-200 bg-white px-5 text-[12px] font-extrabold uppercase tracking-[0.08em] text-slate-600 transition hover:bg-slate-50"
                    >
                        Preview Website
                    </a>
                </div>

                <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                    <QuickMenuCard
                        title="Setting Sekolah"
                        description="Atur logo, nama sekolah, tagline, telepon, email, sosial media, dan alamat."
                        href="/admin/settings"
                        icon="🏫"
                        badge="Utama"
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
                        description="Kelola profil, sambutan kepala sekolah, sejarah, visi misi, identitas, dan struktur organisasi."
                        href="/admin/profiles"
                        icon="📘"
                    />

                    <QuickMenuCard
                        title="Akademik"
                        description="Kelola kalender akademik, dewan guru, ekstrakurikuler, OSIS, dan prestasi siswa."
                        href="/admin/academics"
                        icon="🎓"
                    />

                    <QuickMenuCard
                        title="Program Kesiswaan"
                        description="Kelola OSIS, ekstrakurikuler, bimbingan konseling, dan pendaftaran program siswa."
                        href="/admin/student-programs"
                        icon="👥"
                    />

                    <QuickMenuCard
                        title="Informasi"
                        description="Kelola berita, pengumuman, agenda, artikel, dan layanan administrasi."
                        href="/admin/posts"
                        icon="📰"
                    />

                    <QuickMenuCard
                        title="Galeri"
                        description="Kelola dokumentasi foto kegiatan sekolah yang tampil pada halaman galeri."
                        href="/admin/galleries"
                        icon="🖼️"
                    />

                    <QuickMenuCard
                        title="PPDB"
                        description="Kelola tahun ajaran, jadwal, alur, syarat, form pendaftaran, dan data pendaftar."
                        href="/admin/ppdb-periods"
                        icon="📝"
                        badge="Penting"
                    />
                </div>
            </section>

            <section className="mt-8 grid gap-6 xl:grid-cols-[1fr_420px]">
                <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/70">
                    <div className="mb-5">
                        <p className="text-[12px] font-extrabold uppercase tracking-[0.18em] text-[#d59a25]">
                            Aktivitas Cepat
                        </p>
                        <h2 className="mt-2 text-[26px] font-black tracking-[-0.04em] text-[#061b46]">
                            Aksi yang Sering Dipakai
                        </h2>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                        <ActivityCard
                            title="Tambah Berita Baru"
                            description="Buat berita, pengumuman, atau artikel sekolah terbaru."
                            icon="✍️"
                            href="/admin/posts/create"
                        />

                        <ActivityCard
                            title="Upload Galeri"
                            description="Tambahkan dokumentasi foto kegiatan sekolah."
                            icon="🖼️"
                            href="/admin/galleries/create"
                        />

                        <ActivityCard
                            title="Cek Pendaftar PPDB"
                            description="Lihat data calon siswa yang masuk melalui form PPDB."
                            icon="📂"
                            href="/admin/ppdb-registrations"
                        />

                        <ActivityCard
                            title="Update Konten PPDB"
                            description="Atur jadwal, tahapan, syarat, dan status buka/tutup PPDB."
                            icon="🧩"
                            href="/admin/ppdb-content"
                        />
                    </div>
                </div>

                <div className="rounded-[28px] border border-slate-200 bg-gradient-to-br from-[#061b46] to-[#0b3b85] p-6 text-white shadow-2xl shadow-blue-200">
                    <p className="text-[12px] font-extrabold uppercase tracking-[0.18em] text-[#f7c46a]">
                        Catatan Admin
                    </p>

                    <h2 className="mt-3 text-[28px] font-black tracking-[-0.04em] text-white">
                        Checklist Website
                    </h2>

                    <div className="mt-6 space-y-4">
                        <div className="flex items-start gap-3">
                            <span className="mt-1 text-[#f7c46a]">✓</span>
                            <p className="text-[13px] font-semibold leading-6 text-blue-100">
                                Pastikan data beranda sudah lengkap agar halaman
                                utama terlihat profesional.
                            </p>
                        </div>

                        <div className="flex items-start gap-3">
                            <span className="mt-1 text-[#f7c46a]">✓</span>
                            <p className="text-[13px] font-semibold leading-6 text-blue-100">
                                Gunakan kategori <b>Pengumuman</b> pada
                                Informasi agar tampil di card Pengumuman
                                homepage.
                            </p>
                        </div>

                        <div className="flex items-start gap-3">
                            <span className="mt-1 text-[#f7c46a]">✓</span>
                            <p className="text-[13px] font-semibold leading-6 text-blue-100">
                                Upload foto galeri ukuran landscape agar
                                tampilan frontend tetap rapi.
                            </p>
                        </div>

                        <div className="flex items-start gap-3">
                            <span className="mt-1 text-[#f7c46a]">✓</span>
                            <p className="text-[13px] font-semibold leading-6 text-blue-100">
                                Cek data PPDB secara rutin terutama status Baru
                                dan Diproses.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </AdminLayout>
    );
}