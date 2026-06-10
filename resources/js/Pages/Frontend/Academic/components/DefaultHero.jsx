export default function DefaultHero({ activeHero, activeMenu }) {
    return (
        <section className="relative w-full overflow-hidden bg-[#06316e]">
            <img
                src="/frontend/images/school-bg.jpg"
                alt={activeHero.title}
                className="absolute inset-0 h-full w-full object-cover opacity-45"
                onError={(event) => {
                    event.currentTarget.src =
                        "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1800&q=85";
                }}
            />

            <div className="absolute inset-0 bg-gradient-to-r from-[#031b41] via-[#064493]/90 to-[#064493]/35" />

            <div className="relative grid w-full gap-8 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-[0.9fr_1.1fr] lg:items-end lg:px-10 lg:py-20 xl:px-14 2xl:px-16">
                <div>
                    <div className="flex flex-wrap items-center gap-3 text-[12px] font-semibold text-blue-100">
                        <a href="/" className="hover:text-white">
                            Beranda
                        </a>
                        <span>›</span>
                        <span>Akademik</span>
                        <span>›</span>
                        <span className="text-white">{activeMenu.label}</span>
                    </div>

                    <p className="mt-8 text-[11px] font-semibold uppercase tracking-[0.24em] text-blue-100">
                        {activeHero.eyebrow}
                    </p>

                    <h1 className="mt-4 max-w-3xl text-[36px] font-semibold leading-tight tracking-[-0.04em] text-white sm:text-[48px] lg:text-[58px]">
                        {activeHero.title}
                    </h1>

                    <p className="mt-5 max-w-2xl text-[15px] font-medium leading-8 text-blue-50 sm:text-[17px]">
                        {activeHero.description}
                    </p>
                </div>
            </div>
        </section>
    );
}