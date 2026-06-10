import { useMemo, useState } from "react";
import FrontendLayout from "../../../Layouts/FrontendLayout";

import { heroContent, tabs } from "./data";

import SidebarMenu from "./components/SidebarMenu";
import CalendarHero from "./components/CalendarHero";
import TeachersHero from "./components/TeachersHero";
import ExtracurricularHero from "./components/ExtracurricularHero";
import OsisHero from "./components/OsisHero";
import AchievementHero from "./components/AchievementHero";
import DefaultHero from "./components/DefaultHero";
import BottomCTA from "./components/BottomCTA";

import CalendarSection from "./sections/CalendarSection";
import TeachersSection from "./sections/TeachersSection";
import ExtracurricularSection from "./sections/ExtracurricularSection";
import OsisSection from "./sections/OsisSection";
import AchievementsSection from "./sections/AchievementsSection";

export default function Academic() {
    const [activeTab, setActiveTab] = useState("calendar");

    const activeMenu = useMemo(() => {
        return tabs.find((tab) => tab.key === activeTab) ?? tabs[0];
    }, [activeTab]);

    const activeHero = heroContent[activeTab] ?? heroContent.calendar;

    const renderContent = () => {
        if (activeTab === "calendar") return <CalendarSection />;
        if (activeTab === "teachers") return <TeachersSection />;
        if (activeTab === "extracurricular") return <ExtracurricularSection />;
        if (activeTab === "osis") return <OsisSection />;
        if (activeTab === "achievements") return <AchievementsSection />;

        return <CalendarSection />;
    };

    const renderHero = () => {
        if (activeTab === "calendar") return <CalendarHero />;
        if (activeTab === "teachers") return <TeachersHero />;
        if (activeTab === "extracurricular") return <ExtracurricularHero />;
        if (activeTab === "osis") return <OsisHero />;
        if (activeTab === "achievements") return <AchievementHero />;

        return <DefaultHero activeHero={activeHero} activeMenu={activeMenu} />;
    };

    const showBottomCTA =
        activeTab !== "teachers" &&
        activeTab !== "extracurricular" &&
        activeTab !== "osis" &&
        activeTab !== "achievements";

    return (
        <FrontendLayout>
            {renderHero()}

            <section className="relative w-full bg-[#f4f8fc] px-4 pb-10 pt-6 sm:px-6 lg:px-10 lg:pb-14 lg:pt-8 xl:px-14 2xl:px-16">
                <div className="absolute inset-x-0 top-0 h-12 rounded-t-[34px] bg-[#f4f8fc] lg:rounded-t-[42px]" />

                <div className="relative grid w-full gap-6 lg:grid-cols-[290px_1fr] lg:items-start">
                    <SidebarMenu
                        activeTab={activeTab}
                        setActiveTab={setActiveTab}
                    />

                    <main className="min-w-0">
                        {renderContent()}

                        {showBottomCTA ? (
                            <BottomCTA activeTab={activeTab} />
                        ) : null}
                    </main>
                </div>
            </section>
        </FrontendLayout>
    );
}