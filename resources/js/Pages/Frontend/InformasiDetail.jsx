import FrontendLayout from "../../Layouts/FrontendLayout";

function RelatedCard({ item }) {
    return (
        <a
            href={`/informasi/${item.slug}`}
            className="group overflow-hidden rounded-[18px] border border-slate-200 bg-white shadow-lg shadow-slate-200/70 transition duration-300 hover:-translate-y-1 hover:shadow-xl"
        >
            <div className="h-[145px] overflow-hidden bg-slate-100 sm:h-[160px]">
                <img
                    src={
                        item.thumbnail_url ||
                        "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=900&q=85"
                    }
                    alt={item.title}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
            </div>

            <div className="p-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="rounded-full bg-blue-50 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.04em] text-[#0d58cf]">
                        {item.category || "Informasi"}
                    </span>

                    <span className="text-[11px] font-medium text-slate-500">
                        {item.published_at || "-"}
                    </span>
                </div>

                <h3 className="mt-3 line-clamp-2 font-serif text-[20px] font-semibold leading-tight tracking-[-0.035em] text-[#061b46]">
                    {item.title}
                </h3>

                <p className="mt-2 line-clamp-2 text-[12.5px] font-medium leading-6 text-slate-600">
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
                <div className="relative min-h-[360px] w-full overflow-hidden sm:min-h-[420px] lg:min-h-[460px]">
                    <img
                        src={
                            post.thumbnail_url ||
                            "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=1900&q=85"
                        }
                        alt={post.title}
                        className="absolute inset-0 h-full w-full object-cover object-center"
                    />

                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(3,29,74,0.98)_0%,rgba(3,42,101,0.90)_52%,rgba(4,62,145,0.76)_100%)] lg:bg-[linear-gradient(90deg,rgba(3,29,74,0.99)_0%,rgba(3,42,101,0.94)_42%,rgba(3,42,101,0.76)_70%,rgba(4,62,145,0.20)_100%)]" />

                    <div className="relative z-10 flex min-h-[360px] flex-col justify-center px-4 py-10 sm:min-h-[420px] sm:px-6 lg:min-h-[460px] lg:px-10 xl:px-14 2xl:px-16">
                        <div className="flex flex-wrap items-center gap-2 text-[12px] font-medium text-blue-100 sm:gap-3 sm:text-[13px]">
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

                        <p className="mt-6 text-[12px] font-semibold uppercase tracking-[0.18em] text-[#d5a542] sm:mt-8 sm:text-[13px] sm:tracking-[0.22em]">
                            {post.category || "Informasi Sekolah"}
                        </p>

                        <h1 className="mt-4 max-w-5xl break-words font-serif text-[32px] font-semibold leading-[1.08] tracking-[-0.045em] text-white sm:text-[50px] lg:text-[60px]">
                            {post.title}
                        </h1>

                        <div className="mt-5 flex flex-wrap items-center gap-3 text-[13px] font-medium text-blue-50 sm:mt-6 sm:gap-4 sm:text-[14px]">
                            <span>✍️ {post.author || "Admin Sekolah"}</span>
                            <span>•</span>
                            <span>📅 {post.published_at || "-"}</span>
                        </div>

                        {post.excerpt ? (
                            <p className="mt-5 max-w-[820px] break-words text-[14px] font-medium leading-7 text-blue-50 sm:mt-6 sm:text-[17px] sm:leading-8">
                                {post.excerpt}
                            </p>
                        ) : null}
                    </div>
                </div>
            </section>

            <section className="w-full bg-[#f4f8fc] px-4 py-10 sm:px-6 lg:px-10 lg:py-14 xl:px-14 2xl:px-16">
                <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_330px] xl:items-start">
                    <article className="min-w-0 overflow-hidden rounded-[22px] border border-slate-200 bg-white shadow-xl shadow-slate-200/70 sm:rounded-[28px]">
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

                        <div className="px-5 py-7 sm:px-8 lg:px-10">
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
                        <div className="rounded-[22px] bg-gradient-to-br from-[#052b66] to-[#063f8d] p-5 text-white shadow-2xl shadow-blue-200 sm:rounded-[28px] sm:p-7">
                            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#d5a542] sm:text-[12px] sm:tracking-[0.22em]">
                                Navigasi
                            </p>

                            <h2 className="mt-4 font-serif text-[28px] font-semibold leading-tight tracking-[-0.04em] sm:text-[32px]">
                                Pusat Informasi
                            </h2>

                            <p className="mt-4 text-[13px] font-medium leading-7 text-blue-100 sm:text-[14px]">
                                Kembali ke daftar berita dan pengumuman resmi
                                sekolah.
                            </p>

                            <a
                                href="/informasi"
                                className="mt-6 inline-flex min-h-[50px] w-full items-center justify-center rounded-[12px] border border-[#d5a542] px-6 text-[12px] font-semibold uppercase tracking-[0.08em] text-[#d5a542] transition hover:bg-white/10 sm:text-[13px]"
                            >
                                Semua Informasi
                            </a>
                        </div>
                    </aside>
                </div>

                {relatedPosts.length > 0 ? (
                    <div className="mt-10 sm:mt-12">
                        <div className="mb-6 sm:mb-7">
                            <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[#d5a542] sm:text-[13px] sm:tracking-[0.22em]">
                                Berita Lainnya
                            </p>

                            <h2 className="mt-3 font-serif text-[30px] font-semibold leading-tight tracking-[-0.04em] text-[#061b46] sm:mt-4 sm:text-[46px]">
                                Informasi Terkait
                            </h2>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
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