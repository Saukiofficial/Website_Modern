import { tabs as fallbackTabs } from "../data";

export default function SidebarMenu({
    tabs = fallbackTabs,
    activeTab,
    setActiveTab,
    school,
}) {
    return (
        <aside className="w-full min-w-0 lg:sticky lg:top-[96px]">
            <div className="min-w-0 overflow-hidden rounded-[20px] border border-slate-200 bg-white p-3 shadow-xl shadow-slate-200/70 sm:rounded-[24px] sm:p-4 lg:rounded-[22px]">
                <div className="border-b border-slate-100 px-2 pb-3 pt-2 sm:px-3 sm:pb-4">
                    <h2 className="text-[14px] font-semibold uppercase text-[#061b46] sm:text-[15px]">
                        Menu Profil
                    </h2>

                    <p className="mt-1 text-[12px] font-medium leading-5 text-slate-500 lg:hidden">
                        Pilih informasi profil sekolah yang ingin dibuka.
                    </p>
                </div>

                <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 lg:grid-cols-1">
                    {tabs.map((tab) => {
                        const isActive = activeTab === tab.key;

                        return (
                            <button
                                key={tab.key}
                                type="button"
                                onClick={() => setActiveTab(tab.key)}
                                className={`flex min-w-0 flex-col gap-2 rounded-[16px] px-3 py-3 text-left transition sm:min-h-[112px] sm:gap-3 sm:px-4 sm:py-4 lg:min-h-0 lg:flex-row lg:items-center lg:gap-4 ${
                                    isActive
                                        ? "bg-[#052b66] text-white shadow-lg shadow-blue-200"
                                        : "bg-white text-slate-700 hover:bg-blue-50"
                                }`}
                            >
                                <div
                                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-[20px] shadow-sm sm:h-10 sm:w-10 sm:text-[22px] lg:h-11 lg:w-11 lg:text-[24px] ${
                                        isActive
                                            ? "bg-white text-[#052b66]"
                                            : "bg-blue-50 text-[#052b66] lg:bg-white"
                                    }`}
                                >
                                    {tab.icon}
                                </div>

                                <div className="min-w-0 flex-1">
                                    <div className="flex min-w-0 items-start justify-between gap-2">
                                        <p
                                            className={`break-words text-[12px] font-semibold leading-5 sm:text-[13px] ${
                                                isActive
                                                    ? "text-white"
                                                    : "text-[#061b46]"
                                            }`}
                                        >
                                            {tab.label}
                                        </p>

                                        {isActive ? (
                                            <span className="hidden text-[18px] text-blue-100 lg:inline">
                                                ›
                                            </span>
                                        ) : null}
                                    </div>

                                    <p
                                        className={`mt-1 line-clamp-2 text-[11px] font-medium leading-5 sm:text-[11.5px] lg:line-clamp-none ${
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

                <div className="mt-4 overflow-hidden rounded-[18px] bg-gradient-to-br from-[#052b66] to-[#063f8d] p-4 text-white sm:mt-5 sm:p-5 lg:mt-6 lg:p-6">
                    <div className="text-[32px] leading-none text-[#f7c46a] sm:text-[38px]">
                        “
                    </div>

                    <p className="mt-3 font-serif text-[17px] font-semibold leading-7 sm:text-[19px] lg:text-[22px] lg:leading-8">
                        Sekolah yang hebat lahir dari budaya, karakter, dan
                        komitmen bersama.
                    </p>

                    <p className="mt-4 text-[12px] font-medium text-blue-100 sm:mt-5 sm:text-[13px]">
                        — {school?.shortName || "SMA Negeri 1 Cerdas"}
                    </p>

                    <div className="mt-5 rounded-[16px] bg-white/10 p-4 sm:mt-6 sm:p-5 lg:mt-8">
                        <h3 className="text-[14px] font-semibold sm:text-[15px]">
                            Informasi Profil
                        </h3>

                        <p className="mt-2 text-[12px] font-medium leading-6 text-blue-100 sm:text-[12.5px]">
                            Semua data profil sekolah dapat diperbarui melalui
                            admin panel.
                        </p>
                    </div>
                </div>
            </div>
        </aside>
    );
}