import Icon from "./Icon";

function scrollToSection(id) {
    const target = document.querySelector(id);

    if (target) {
        target.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    }
}

export default function BottomCTA({ activeTab }) {
    if (activeTab === "calendar") {
        return (
            <div className="mt-8 overflow-hidden rounded-[26px] bg-gradient-to-r from-[#062a60] via-[#063f8d] to-[#0b56c2] p-6 text-white shadow-2xl shadow-blue-200 sm:p-8">
                <div className="grid items-center gap-6 lg:grid-cols-[1fr_auto]">
                    <div className="flex items-center gap-5">
                        <div className="hidden h-20 w-20 shrink-0 items-center justify-center rounded-3xl border border-white/20 bg-white/10 text-[#f7b733] sm:flex">
                            <Icon type="graduate" className="h-12 w-12" />
                        </div>

                        <div>
                            <h2 className="text-[24px] font-semibold sm:text-[34px]">
                                Academic Excellence Starts Here
                            </h2>
                            <p className="mt-2 max-w-2xl text-[15px] leading-7 text-blue-100">
                                Stay informed with our academic calendar and
                                important learning events throughout the year.
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-col gap-3 sm:flex-row">
                        <button
                            type="button"
                            onClick={() =>
                                scrollToSection("#academic-resources")
                            }
                            className="inline-flex h-12 items-center justify-center gap-3 rounded-xl bg-[#f7b733] px-7 text-[13px] font-semibold text-[#061b46] shadow-lg transition hover:bg-yellow-300"
                        >
                            <Icon type="download" className="h-4 w-4" />
                            Download Calendar
                        </button>

                        <button
                            type="button"
                            onClick={() =>
                                scrollToSection("#academic-office")
                            }
                            className="inline-flex h-12 items-center justify-center gap-3 rounded-xl border border-white/30 px-7 text-[13px] font-semibold text-white transition hover:bg-white/10"
                        >
                            Contact Academic Office
                            <span>→</span>
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="mt-8 overflow-hidden rounded-[24px] bg-gradient-to-r from-[#062a60] via-[#064493] to-[#075cc0] p-6 text-white shadow-2xl shadow-blue-200 sm:p-8">
            <div className="grid items-center gap-6 lg:grid-cols-[1fr_auto]">
                <div className="flex items-center gap-5">
                    <div className="hidden h-20 w-20 shrink-0 items-center justify-center rounded-3xl border border-white/20 bg-white/10 text-[#f7b733] sm:flex">
                        <Icon type="graduate" className="h-12 w-12" />
                    </div>

                    <div>
                        <h2 className="text-[23px] font-semibold leading-tight sm:text-[28px]">
                            Bersama Sekolah Profesional
                        </h2>
                        <p className="mt-1 text-[16px] font-bold text-blue-100 sm:text-[20px]">
                            Membangun Generasi Unggul dan Berkarakter
                        </p>
                    </div>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row">
                    <a
                        href="/ppdb"
                        className="inline-flex h-12 items-center justify-center gap-3 rounded-xl bg-[#f7b733] px-7 text-[13px] font-semibold text-[#061b46] shadow-lg transition hover:bg-yellow-300"
                    >
                        Daftar PPDB
                        <span>→</span>
                    </a>

                    <button
                        type="button"
                        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                        className="inline-flex h-12 items-center justify-center gap-3 rounded-xl border border-white/30 px-7 text-[13px] font-semibold text-white transition hover:bg-white/10"
                    >
                        Lihat Program Akademik
                        <span>›</span>
                    </button>
                </div>
            </div>
        </div>
    );
}