import FrontendLayout from "../../Layouts/FrontendLayout";

function RelatedCard({ item }) {
    return (
        <a
            href={`/informasi/${item.slug}`}
            className="group overflow-hidden rounded-[20px] border border-slate-200 bg-white shadow-lg shadow-slate-200/70 transition duration-300 hover:-translate-y-1 hover:shadow-xl"
        >
            <div className="h-[180px] overflow-hidden bg-slate-100">
                <img
                    src={
                        item.thumbnail_url ||
                        "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=900&q=85"
                    }
                    alt={item.title}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
            </div>

            <div className="p-5">
                <div className="flex items-center justify-between gap-3">
                    <span className="rounded-full bg-blue-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.04em] text-[#0d58cf]">
                        {item.category || "Informasi"}
                    </span>

                    <span className="text-[12px] font-medium text-slate-500">
                        {item.published_at || "-"}
                    </span>
                </div>

                <h3 className="mt-4 line-clamp-2 font-serif text-[23px] font-semibold leading-tight tracking-[-0.035em] text-[#061b46]">
                    {item.title}
                </h3>

                <p className="mt-3 line-clamp-3 text-[13px] font-medium leading-6 text-slate-600">
                    {item.excerpt || "Informasi resmi sekolah."}
                </p>
            </div>
        </a>
    );
}

export default function InformasiDetail({ post, relatedPosts = [] }) {
    return (
        <FrontendLayout>
            <section className="relative w-full overflow-hidden bg-[#052b66]">
                <div className="relative min-h-[470px] w-full overflow-hidden lg:min-h-[540px]">
                    <img
                        src={
                            post.thumbnail_url ||
                            "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=1900&q=85"
                        }
                        alt={post.title}
                        className="absolute inset-0 h-full w-full object-cover object-center"
                    />

                    <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(3,29,74,0.99)_0%,rgba(3,42,101,0.94)_42%,rgba(3,42,101,0.76)_70%,rgba(4,62,145,0.20)_100%)]" />

                    <div className="relative z-10 flex min-h-[470px] flex-col justify-center px-4 py-12 sm:px-6 lg:min-h-[540px] lg:px-10 xl:px-14 2xl:px-16">
                        <div className="flex flex-wrap items-center gap-3 text-[13px] font-medium text-blue-100">
                            <a href="/" className="hover:text-white">
                                Beranda
                            </a>
                            <span>›</span>
                            <a href="/informasi" className="hover:text-white">
                                Informasi
                            </a>
                            <span>›</span>
                            <span className="text-white">Detail</span>
                        </div>

                        <p className="mt-9 text-[13px] font-semibold uppercase tracking-[0.22em] text-[#d5a542]">
                            {post.category || "Informasi Sekolah"}
                        </p>

                        <h1 className="mt-5 max-w-5xl font-serif text-[42px] font-semibold leading-[1.08] tracking-[-0.045em] text-white sm:text-[58px] lg:text-[70px]">
                            {post.title}
                        </h1>

                        <div className="mt-7 flex flex-wrap items-center gap-4 text-[14px] font-medium text-blue-50">
                            <span>✍️ {post.author || "Admin Sekolah"}</span>
                            <span>•</span>
                            <span>📅 {post.published_at || "-"}</span>
                        </div>

                        {post.excerpt ? (
                            <p className="mt-7 max-w-[820px] text-[16px] font-medium leading-8 text-blue-50 sm:text-[18px]">
                                {post.excerpt}
                            </p>
                        ) : null}
                    </div>
                </div>
            </section>

            <section className="w-full bg-[#f4f8fc] px-4 py-12 sm:px-6 lg:px-10 lg:py-16 xl:px-14 2xl:px-16">
                <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_360px] xl:items-start">
                    <article className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-xl shadow-slate-200/70">
                        <div className="border-b border-slate-200 px-5 py-5 sm:px-8">
                            <div className="flex flex-wrap items-center gap-3">
                                <span className="rounded-full bg-blue-50 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.04em] text-[#0d58cf]">
                                    {post.category || "Informasi"}
                                </span>

                                <span className="text-[13px] font-medium text-slate-500">
                                    {post.published_at || "-"}
                                </span>
                            </div>
                        </div>

                        <div className="px-5 py-8 sm:px-8 lg:px-10">
                            <div
                                className="prose prose-slate max-w-none prose-headings:font-serif prose-headings:font-semibold prose-headings:tracking-[-0.035em] prose-headings:text-[#061b46] prose-p:text-[15px] prose-p:font-medium prose-p:leading-8 prose-p:text-slate-600 prose-a:font-semibold prose-a:text-[#0d58cf] prose-strong:text-[#061b46] prose-li:text-slate-600"
                                dangerouslySetInnerHTML={{
                                    __html:
                                        post.content ||
                                        "<p>Konten informasi belum tersedia.</p>",
                                }}
                            />
                        </div>
                    </article>

                    <aside className="xl:sticky xl:top-[110px]">
                        <div className="rounded-[28px] bg-gradient-to-br from-[#052b66] to-[#063f8d] p-7 text-white shadow-2xl shadow-blue-200">
                            <p className="text-[12px] font-semibold uppercase tracking-[0.22em] text-[#d5a542]">
                                Navigasi
                            </p>

                            <h2 className="mt-4 font-serif text-[32px] font-semibold leading-tight tracking-[-0.04em]">
                                Pusat Informasi
                            </h2>

                            <p className="mt-4 text-[14px] font-medium leading-7 text-blue-100">
                                Kembali ke daftar berita dan pengumuman resmi
                                sekolah.
                            </p>

                            <a
                                href="/informasi"
                                className="mt-6 inline-flex min-h-[52px] w-full items-center justify-center rounded-[12px] border border-[#d5a542] px-6 text-[13px] font-semibold uppercase tracking-[0.08em] text-[#d5a542] transition hover:bg-white/10"
                            >
                                Semua Informasi
                            </a>
                        </div>
                    </aside>
                </div>

                {relatedPosts.length > 0 ? (
                    <div className="mt-12">
                        <div className="mb-7">
                            <p className="text-[13px] font-semibold uppercase tracking-[0.22em] text-[#d5a542]">
                                Berita Lainnya
                            </p>

                            <h2 className="mt-4 font-serif text-[38px] font-semibold leading-tight tracking-[-0.04em] text-[#061b46] sm:text-[46px]">
                                Informasi Terkait
                            </h2>
                        </div>

                        <div className="grid gap-6 md:grid-cols-3">
                            {relatedPosts.map((item) => (
                                <RelatedCard key={item.id} item={item} />
                            ))}
                        </div>
                    </div>
                ) : null}
            </section>
        </FrontendLayout>
    );
}