import { useMemo, useState } from "react";
import FrontendLayout from "../../../Layouts/FrontendLayout";

import { tabs } from "./data";

import PageHero from "./components/PageHero";
import SidebarMenu from "./components/SidebarMenu";

import ProfileSection from "./sections/ProfileSection";
import HistorySection from "./sections/HistorySection";
import VisionSection from "./sections/VisionSection";
import StructureSection from "./sections/StructureSection";
import IdentitySection from "./sections/IdentitySection";

export default function Profile() {
    const [activeTab, setActiveTab] = useState("profile");

    const activeMenu = useMemo(() => {
        return tabs.find((tab) => tab.key === activeTab) ?? tabs[0];
    }, [activeTab]);

    const renderContent = () => {
        if (activeTab === "history") return <HistorySection />;
        if (activeTab === "vision") return <VisionSection />;
        if (activeTab === "structure") return <StructureSection />;
        if (activeTab === "identity") return <IdentitySection />;

        return <ProfileSection />;
    };

    return (
        <FrontendLayout>
            <PageHero activeTab={activeTab} activeMenu={activeMenu} />

            <section className="relative w-full bg-[#f4f8fc] px-4 pb-12 pt-8 sm:px-6 lg:px-10 lg:pb-16 lg:pt-10 xl:px-14 2xl:px-16">
                <div className="relative grid w-full gap-6 lg:grid-cols-[300px_1fr] lg:items-start">
                    <SidebarMenu
                        activeTab={activeTab}
                        setActiveTab={setActiveTab}
                    />

                    <main className="min-w-0">
                        {activeTab !== "history" ? (
                            <div className="mb-6 overflow-hidden rounded-[22px] border border-slate-200 bg-white p-6 shadow-lg shadow-slate-200/70 sm:p-7">
                                <div className="relative">
                                    <div className="absolute right-0 top-0 hidden text-[92px] leading-none text-blue-50 lg:block">
                                        🏫
                                    </div>

                                    <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#0d58cf]">
                                        Sedang Dibuka
                                    </p>

                                    <h2 className="mt-2 font-serif text-[28px] font-semibold tracking-[-0.03em] text-[#061b46] sm:text-[34px]">
                                        {activeMenu.label}
                                    </h2>

                                    <p className="mt-2 max-w-3xl text-[14px] font-medium leading-7 text-slate-600">
                                        {activeMenu.description}
                                    </p>
                                </div>
                            </div>
                        ) : null}

                        {renderContent()}
                    </main>
                </div>
            </section>
        </FrontendLayout>
    );
}