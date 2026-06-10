import { tabs } from "../data";

export default function SidebarMenu({ activeTab, setActiveTab }) {
    return (
        <aside className="lg:sticky lg:top-[96px]">
            <div className="rounded-[22px] border border-slate-200 bg-white p-4 shadow-xl shadow-slate-200/70">
                <div className="border-b border-slate-100 px-3 pb-4 pt-2">
                    <h2 className="text-[15px] font-semibold uppercase text-[#061b46]">
                        Menu Profil
                    </h2>
                </div>

                <div className="mt-3 flex gap-3 overflow-x-auto pb-2 lg:grid lg:overflow-visible lg:pb-0">
                    {tabs.map((tab) => {
                        const isActive = activeTab === tab.key;

                        return (
                            <button
                                key={tab.key}
                                type="button"
                                onClick={() => setActiveTab(tab.key)}
                                className={`flex min-w-[230px] items-center gap-4 rounded-[16px] px-4 py-4 text-left transition lg:min-w-0 ${
                                    isActive
                                        ? "bg-[#052b66] text-white shadow-lg shadow-blue-200"
                                        : "bg-white text-slate-700 hover:bg-blue-50"
                                }`}
                            >
                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-[24px] shadow-sm">
                                    {tab.icon}
                                </div>

                                <div className="min-w-0 flex-1">
                                    <div className="flex items-center justify-between gap-3">
                                        <p
                                            className={`text-[13px] font-semibold ${
                                                isActive
                                                    ? "text-white"
                                                    : "text-[#061b46]"
                                            }`}
                                        >
                                            {tab.label}
                                        </p>

                                        {isActive ? (
                                            <span className="text-[18px] text-blue-100">
                                                ›
                                            </span>
                                        ) : null}
                                    </div>

                                    <p
                                        className={`mt-1 text-[11.5px] font-medium leading-5 ${
                                            isActive
                                                ? "text-blue-100"
                                                : "text-slate-500"
                                        }`}
                                    >
                                        {tab.description}
                                    </p>
                                </div>
                            </button>
                        );
                    })}
                </div>

                <div className="mt-6 overflow-hidden rounded-[18px] bg-gradient-to-br from-[#052b66] to-[#063f8d] p-6 text-white">
                    <div className="text-[38px] leading-none text-[#f7c46a]">
                        “
                    </div>

                    <p className="mt-3 font-serif text-[22px] font-semibold leading-8">
                        Sekolah yang hebat lahir dari budaya, karakter, dan
                        komitmen bersama.
                    </p>

                    <p className="mt-5 text-[13px] font-medium text-blue-100">
                        — SMA Negeri 1 Cerdas
                    </p>

                    <div className="mt-8 rounded-[16px] bg-white/10 p-5">
                        <h3 className="text-[15px] font-semibold">
                            Informasi Profil
                        </h3>

                        <p className="mt-2 text-[12.5px] font-medium leading-6 text-blue-100">
                            Semua data profil sekolah dapat diperbarui melalui
                            admin panel pada tahap berikutnya.
                        </p>
                    </div>
                </div>
            </div>
        </aside>
    );
}