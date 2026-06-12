import { useMemo, useState } from "react";
import FrontendLayout from "../../Layouts/FrontendLayout";

const fallbackCategories = [
    "Akademik",
    "Kesiswaan",
    "Prestasi",
    "Lingkungan",
    "Kegiatan Seni",
];

const fallbackGalleries = [
    {
        id: "dummy-1",
        title: "Kegiatan Belajar",
        category: "Akademik",
        description:
            "Dokumentasi kegiatan pembelajaran aktif dan interaktif di ruang kelas.",
        image_url:
            "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1300&q=85",
        event_date: "12 Juni 2026",
        is_featured: true,
    },
    {
        id: "dummy-2",
        title: "Ekstrakurikuler",
        category: "Kesiswaan",
        description:
            "Kegiatan siswa dalam mengembangkan minat, bakat, dan karakter.",
        image_url:
            "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1300&q=85",
        event_date: "18 Juni 2026",
        is_featured: false,
    },
    {
        id: "dummy-3",
        title: "Prestasi Siswa",
        category: "Prestasi",
        description:
            "Momen penghargaan dan capaian prestasi siswa di berbagai bidang.",
        image_url:
            "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=1300&q=85",
        event_date: "25 Juni 2026",
        is_featured: true,
    },
    {
        id: "dummy-4",
        title: "Lingkungan Sekolah",
        category: "Lingkungan",
        description:
            "Suasana lingkungan sekolah yang nyaman, bersih, dan mendukung pembelajaran.",
        image_url:
            "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1300&q=85",
        event_date: "28 Juni 2026",
        is_featured: false,
    },
    {
        id: "dummy-5",
        title: "Upacara Sekolah",
        category: "Kesiswaan",
        description:
            "Dokumentasi kegiatan upacara bendera dan pembinaan karakter siswa.",
        image_url:
            "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=1300&q=85",
        event_date: "30 Juni 2026",
        is_featured: false,
    },
    {
        id: "dummy-6",
        title: "Kegiatan Seni",
        category: "Kegiatan Seni",
        description:
            "Kegiatan seni dan kreativitas siswa dalam berbagai program sekolah.",
        image_url:
            "https://images.unsplash.com/photo-1503095396549-807759245b35?auto=format&fit=crop&w=1300&q=85",
        event_date: "02 Juli 2026",
        is_featured: false,
    },
];

const categoryIcons = {
    Akademik: "📖",
    Kesiswaan: "👥",
    Prestasi: "🏆",
    Lingkungan: "🎓",
    "Kegiatan Seni": "🎵",
    Kegiatan: "🗓️",
    Literasi: "📚",
    Karakter: "✨",
};

function getIcon(category) {
    return categoryIcons[category] || "🖼️";
}

function GalleryCard({ item }) {
    return (
        <article className="group overflow-hidden rounded-[16px] bg-white shadow-xl shadow-slate-200/70">
            <div className="relative h-[290px] overflow-hidden bg-slate-100 sm:h-[320px]">
                <img
                    src={
                        item.image_url ||
                        "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?auto=format&fit=crop&w=1300&q=85"
                    }
                    alt={item.title}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,43,102,0.10)_0%,rgba(5,43,102,0.20)_42%,rgba(5,43,102,0.94)_100%)]" />

                <div className="absolute left-5 top-5 flex h-12 w-12 items-center justify-center rounded-[10px] bg-[#052b66]/90 text-[24px] text-white shadow-lg shadow-blue-950/20 backdrop-blur-sm">
                    {getIcon(item.category)}
                </div>

                {item.is_featured ? (
                    <div className="absolute right-5 top-5 rounded-full bg-[#f7c46a] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.08em] text-[#061b46] shadow-lg">
                        Featured
                    </div>
                ) : null}

                <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                    <p className="text-[13px] font-medium text-blue-100">
                        {item.event_date || item.category || "Galeri Sekolah"}
                    </p>

                    <h3 className="mt-2 font-serif text-[30px] font-semibold leading-tight tracking-[-0.035em] text-white">
                        {item.title}
                    </h3>

                    <p className="mt-3 line-clamp-2 text-[13px] font-medium leading-6 text-blue-50">
                        {item.description ||
                            "Dokumentasi kegiatan dan lingkungan sekolah."}
                    </p>

                    <button
                        type="button"
                        className="mt-4 inline-flex items-center gap-2 border-b border-[#d5a542] pb-1 text-[14px] font-semibold text-white transition group-hover:text-[#f7c46a]"
                    >
                        Lihat Galeri
                        <span>→</span>
                    </button>
                </div>
            </div>
        </article>
    );
}

export default function Gallery({ galleries = [], categories = [] }) {
    const [activeCategory, setActiveCategory] = useState("Semua");

    const galleryItems =
        Array.isArray(galleries) && galleries.length > 0
            ? galleries
            : fallbackGalleries;

    const categoryItems = useMemo(() => {
        const fromBackend =
            Array.isArray(categories) && categories.length > 0
                ? categories
                : [];

        const fromGalleries = galleryItems
            .map((item) => item.category)
            .filter(Boolean);

        const merged = [...fromBackend, ...fromGalleries, ...fallbackCategories];

        return ["Semua", ...Array.from(new Set(merged))];
    }, [categories, galleryItems]);

    const filteredGalleries = useMemo(() => {
        if (activeCategory === "Semua") return galleryItems;

        return galleryItems.filter(
            (item) => item.category === activeCategory
        );
    }, [activeCategory, galleryItems]);

    return (
        <FrontendLayout>
            <section className="relative w-full overflow-hidden bg-[#052b66]">
                <div className="relative min-h-[440px] w-full overflow-hidden lg:min-h-[500px]">
                    <img
                        src="/frontend/images/gallery-hero.jpg"
                        alt="Galeri Sekolah"
                        className="absolute inset-0 h-full w-full object-cover object-center"
                        onError={(event) => {
                            event.currentTarget.src =
                                "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=1900&q=85";
                        }}
                    />

                    <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(3,29,74,0.99)_0%,rgba(3,42,101,0.94)_40%,rgba(3,42,101,0.68)_62%,rgba(4,62,145,0.16)_100%)]" />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(3,24,58,0.08)_0%,rgba(3,24,58,0.02)_48%,rgba(3,24,58,0.30)_100%)]" />

                    <div className="relative z-10 flex min-h-[440px] flex-col justify-center px-4 py-12 sm:px-6 lg:min-h-[500px] lg:px-10 xl:px-14 2xl:px-16">
                        <div className="flex flex-wrap items-center gap-3 text-[13px] font-medium text-blue-100">
                            <a href="/" className="hover:text-white">
                                Beranda
                            </a>
                            <span>›</span>
                            <span className="text-white">Galeri</span>
                        </div>

                        <p className="mt-9 text-[13px] font-semibold uppercase tracking-[0.22em] text-[#d5a542]">
                            Galeri Sekolah
                        </p>

                        <h1 className="mt-5 max-w-[880px] font-serif text-[48px] font-semibold leading-[1.08] tracking-[-0.045em] text-white sm:text-[62px] lg:text-[74px]">
                            Dokumentasi Kegiatan dan
                            <br />
                            Lingkungan Sekolah
                        </h1>

                        <p className="mt-7 max-w-[720px] text-[16px] font-medium leading-8 text-blue-50 sm:text-[18px]">
                            Kumpulan dokumentasi kegiatan akademik, kesiswaan,
                            prestasi, dan suasana lingkungan sekolah.
                        </p>
                    </div>
                </div>
            </section>

            <section className="w-full bg-[#f4f8fc] px-4 py-12 sm:px-6 lg:px-10 lg:py-16 xl:px-14 2xl:px-16">
                <div className="mb-8 flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
                    <div>
                        <p className="text-[13px] font-semibold uppercase tracking-[0.22em] text-[#d5a542]">
                            Dokumentasi
                        </p>

                        <h2 className="mt-4 font-serif text-[40px] font-semibold leading-tight tracking-[-0.04em] text-[#061b46] sm:text-[48px]">
                            Galeri Foto Sekolah
                        </h2>
                    </div>

                    <div className="flex gap-3 overflow-x-auto pb-2 xl:pb-0">
                        {categoryItems.map((category) => {
                            const isActive = activeCategory === category;

                            return (
                                <button
                                    key={category}
                                    type="button"
                                    onClick={() =>
                                        setActiveCategory(category)
                                    }
                                    className={`h-11 shrink-0 rounded-[10px] px-6 text-[13px] font-semibold transition ${
                                        isActive
                                            ? "bg-[#052b66] text-white shadow-lg shadow-blue-200"
                                            : "bg-white text-[#052b66] shadow-sm hover:bg-blue-50"
                                    }`}
                                >
                                    {category}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {filteredGalleries.length > 0 ? (
                    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                        {filteredGalleries.map((item) => (
                            <GalleryCard key={item.id || item.title} item={item} />
                        ))}
                    </div>
                ) : (
                    <div className="rounded-[22px] border border-dashed border-slate-200 bg-white p-10 text-center shadow-xl shadow-slate-200/70">
                        <div className="text-[52px]">🖼️</div>

                        <h3 className="mt-4 font-serif text-[30px] font-semibold tracking-[-0.035em] text-[#061b46]">
                            Belum Ada Galeri
                        </h3>

                        <p className="mt-2 text-[14px] font-medium leading-7 text-slate-600">
                            Dokumentasi pada kategori ini belum tersedia.
                        </p>
                    </div>
                )}

                <div className="mt-8 rounded-[20px] border border-slate-200 bg-white p-5 shadow-xl shadow-slate-200/70">
                    <div className="grid items-center gap-5 lg:grid-cols-[auto_1fr_auto]">
                        <div className="flex h-16 w-16 items-center justify-center rounded-[18px] bg-blue-50 text-[34px]">
                            🖼️
                        </div>

                        <div>
                            <h3 className="font-serif text-[24px] font-semibold leading-tight text-[#061b46]">
                                Punya dokumentasi kegiatan sekolah?
                            </h3>

                            <p className="mt-2 text-[14px] font-medium leading-7 text-slate-600">
                                Kirimkan foto kegiatan sekolah Anda untuk
                                ditampilkan di galeri resmi SMA Negeri 1
                                Sumenep.
                            </p>
                        </div>

                        <a
                            href="/#kontak"
                            className="inline-flex min-h-[50px] items-center justify-center gap-3 rounded-[8px] bg-[#052b66] px-7 text-[13px] font-semibold text-white shadow-lg shadow-blue-200 transition hover:bg-[#063f8d]"
                        >
                            Kirim Dokumentasi
                            <span>→</span>
                        </a>
                    </div>
                </div>
            </section>
        </FrontendLayout>
    );
}