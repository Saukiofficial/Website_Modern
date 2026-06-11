export default function ProfileAdminTabs({ tabs, activeTab, setActiveTab }) {
    return (
        <aside className="xl:sticky xl:top-[98px] xl:self-start">
            <div className="rounded-[28px] border border-slate-200 bg-white p-4 shadow-xl shadow-slate-200/70">
                <div className="border-b border-slate-100 px-3 pb-4 pt-2">
                    <p className="text-[12px] font-extrabold uppercase tracking-[0.18em] text-[#d59a25]">Menu Profile</p>
                    <h2 className="mt-2 text-[18px] font-black text-[#061b46]">Kelola Konten</h2>
                </div>

                <div className="mt-4 grid gap-2">
                    {tabs.map((tab) => {
                        const isActive = activeTab === tab.key;
                        return (
                            <button
                                key={tab.key}
                                type="button"
                                onClick={() => setActiveTab(tab.key)}
                                className={`group flex items-start gap-3 rounded-[18px] px-4 py-4 text-left transition ${
                                    isActive
                                        ? "bg-[#061b46] text-white shadow-lg shadow-blue-200"
                                        : "bg-slate-50 text-slate-700 hover:bg-blue-50"
                                }`}
                            >
                                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[14px] bg-white text-[22px] shadow-sm">
                                    {tab.icon}
                                </span>
                                <span className="min-w-0">
                                    <span className={`block text-[13px] font-extrabold ${isActive ? "text-white" : "text-[#061b46]"}`}>
                                        {tab.label}
                                    </span>
                                    <span className={`mt-1 block text-[11.5px] font-semibold leading-5 ${isActive ? "text-blue-100" : "text-slate-500"}`}>
                                        {tab.description}
                                    </span>
                                </span>
                            </button>
                        );
                    })}
                </div>
            </div>
        </aside>
    );
}
