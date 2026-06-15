import { tabs } from "../data";
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

export default function SidebarMenu({ activeTab, setActiveTab }) {
    return (
        <aside className="w-full min-w-0 lg:sticky lg:top-[96px]">
            <div className="min-w-0 overflow-hidden rounded-[20px] border border-slate-200 bg-white p-3 shadow-xl shadow-slate-200/70 sm:rounded-[24px] sm:p-4 lg:rounded-[26px]">
                <div className="border-b border-slate-100 px-2 pb-3 pt-2 sm:px-3 sm:pb-4">
                    <h2 className="text-[14px] font-semibold uppercase text-[#061b46] sm:text-[15px]">
                        Academic Navigation
                    </h2>

                    <p className="mt-1 text-[12px] font-medium leading-5 text-slate-500 lg:hidden">
                        Pilih menu akademik yang ingin dibuka.
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
                                className={`flex min-w-0 flex-col gap-2 rounded-[16px] px-3 py-3 text-left transition sm:min-h-[116px] sm:gap-3 sm:rounded-[18px] sm:px-4 sm:py-4 lg:min-h-0 lg:flex-row lg:items-start lg:gap-4 ${
                                    isActive
                                        ? "bg-[#edf4ff] text-[#063f8d] ring-1 ring-blue-100"
                                        : "bg-white text-slate-700 hover:bg-blue-50"
                                }`}
                            >
                                <div
                                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl sm:h-10 sm:w-10 ${
                                        isActive
                                            ? "bg-white text-[#1f5bd3] shadow-sm lg:bg-transparent lg:shadow-none"
                                            : "bg-blue-50 text-[#064493] lg:bg-transparent"
                                    }`}
                                >
                                    <Icon
                                        type={tab.icon}
                                        className="h-5 w-5 sm:h-6 sm:w-6"
                                    />
                                </div>

                                <div className="min-w-0">
                                    <p
                                        className={`break-words text-[12px] font-semibold leading-5 sm:text-[13px] ${
                                            isActive
                                                ? "text-[#063f8d]"
                                                : "text-[#061b46]"
                                        }`}
                                    >
                                        {tab.label}
                                    </p>

                                    <p className="mt-1 line-clamp-2 text-[11px] font-medium leading-5 text-slate-500 sm:text-[11.5px] lg:line-clamp-none">
                                        {tab.description}
                                    </p>
                                </div>
                            </button>
                        );
                    })}
                </div>

                <div className="mt-4 overflow-hidden rounded-[18px] bg-gradient-to-br from-[#04295f] to-[#063f8d] p-4 text-white sm:mt-5 sm:rounded-[22px] sm:p-5 lg:p-6">
                    <div className="text-[34px] leading-none text-[#f7b733] sm:text-[42px]">
                        “
                    </div>

                    <p className="mt-2 text-[14px] font-semibold leading-7 sm:text-[16px] lg:text-[18px] lg:leading-8">
                        Pendidikan adalah bekal terbaik untuk masa depan yang
                        penuh peluang.
                    </p>

                    <p className="mt-3 text-[12px] font-medium text-blue-100 sm:mt-4">
                        — Ki Hajar Dewantara
                    </p>

                    <div className="mt-5 rounded-2xl bg-white/10 p-4 sm:mt-6 lg:mt-8">
                        <h3 className="text-[14px] font-semibold sm:text-[15px]">
                            Need Help?
                        </h3>

                        <p className="mt-2 text-[12px] leading-6 text-blue-100">
                            Hubungi bagian akademik jika ada pertanyaan.
                        </p>

                        <button
                            type="button"
                            onClick={() => scrollToSection("#academic-office")}
                            className="mt-4 inline-flex h-10 w-full items-center justify-center rounded-xl bg-white px-4 text-[12px] font-semibold text-[#063f8d] transition hover:bg-blue-50 sm:w-auto sm:px-5 lg:h-11"
                        >
                            Hubungi Kami
                        </button>
                    </div>
                </div>
            </div>
        </aside>
    );
}