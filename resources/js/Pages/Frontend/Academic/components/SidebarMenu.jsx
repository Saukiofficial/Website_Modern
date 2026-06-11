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
        <aside className="lg:sticky lg:top-[96px]">
            <div className="rounded-[26px] border border-slate-200 bg-white p-4 shadow-xl shadow-slate-200/70">
                <div className="border-b border-slate-100 px-3 pb-4 pt-2">
                    <h2 className="text-[15px] font-semibold uppercase text-[#061b46]">
                        Academic Navigation
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
                                className={`flex min-w-[230px] items-start gap-4 rounded-[18px] px-4 py-4 text-left transition lg:min-w-0 ${
                                    isActive
                                        ? "bg-[#edf4ff] text-[#063f8d] ring-1 ring-blue-100"
                                        : "bg-white text-slate-700 hover:bg-blue-50"
                                }`}
                            >
                                <div
                                    className={`mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                                        isActive
                                            ? "text-[#1f5bd3]"
                                            : "text-[#064493]"
                                    }`}
                                >
                                    <Icon type={tab.icon} className="h-6 w-6" />
                                </div>

                                <div>
                                    <p
                                        className={`text-[13px] font-semibold ${
                                            isActive
                                                ? "text-[#063f8d]"
                                                : "text-[#061b46]"
                                        }`}
                                    >
                                        {tab.label}
                                    </p>
                                    <p className="mt-1 text-[11.5px] font-medium leading-5 text-slate-500">
                                        {tab.description}
                                    </p>
                                </div>
                            </button>
                        );
                    })}
                </div>

                <div className="mt-5 overflow-hidden rounded-[22px] bg-gradient-to-br from-[#04295f] to-[#063f8d] p-6 text-white">
                    <div className="text-[42px] leading-none text-[#f7b733]">
                        “
                    </div>

                    <p className="mt-2 text-[18px] font-semibold leading-8">
                        Pendidikan adalah bekal terbaik untuk masa depan yang
                        penuh peluang.
                    </p>

                    <p className="mt-4 text-[12px] font-medium text-blue-100">
                        — Ki Hajar Dewantara
                    </p>

                    <div className="mt-8 rounded-2xl bg-white/10 p-4">
                        <h3 className="text-[15px] font-semibold">Need Help?</h3>

                        <p className="mt-2 text-[12px] leading-6 text-blue-100">
                            Hubungi bagian akademik jika ada pertanyaan.
                        </p>

                        <button
                            type="button"
                            onClick={() => scrollToSection("#academic-office")}
                            className="mt-4 inline-flex h-11 items-center justify-center rounded-xl bg-white px-5 text-[12px] font-semibold text-[#063f8d] transition hover:bg-blue-50"
                        >
                            Hubungi Kami
                        </button>
                    </div>
                </div>
            </div>
        </aside>
    );
}