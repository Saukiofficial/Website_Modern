import { useState } from "react";
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

export default function CalendarHero({ page = null }) {
    const [semester, setSemester] = useState("Semester 1");

    const heroImage =
        page?.hero_image ||
        page?.heroImage ||
        "/frontend/images/school-bg.jpg";

    const heroTitle =
        page?.hero_title ||
        page?.heroTitle ||
        "Academic Calendar";

    const heroSubtitle =
        page?.hero_subtitle ||
        page?.heroSubtitle ||
        "Plan your academic journey with important school events, assessments, holidays, and learning milestones.";

    const stats = [
        {
            value: "180",
            label: "Hari Belajar",
            sub: "School Days",
            icon: "calendar",
        },
        {
            value: "4",
            label: "Periode Penilaian",
            sub: "",
            icon: "file",
        },
        {
            value: "2",
            label: "Semester Akademik",
            sub: "",
            icon: "graduate",
        },
        {
            value: "12",
            label: "Bulan Akademik",
            sub: "",
            icon: "book",
        },
    ];

    const handleSemesterClick = (value) => {
        setSemester(value);

        setTimeout(() => {
            scrollToSection("#semester-roadmap");
        }, 100);
    };

    return (
        <section className="relative w-full overflow-hidden bg-[#052b66]">
            <div className="relative h-auto min-h-[560px] w-full overflow-hidden bg-[#052b66] sm:min-h-[590px] lg:min-h-[610px] xl:min-h-[630px]">
                <img
                    src={heroImage}
                    alt={heroTitle}
                    className="absolute inset-0 h-full w-full object-cover"
                    onError={(event) => {
                        event.currentTarget.src =
                            "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1800&q=85";
                    }}
                />

                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,27,65,0.96)_0%,rgba(3,39,91,0.92)_48%,rgba(5,45,110,0.78)_100%)] lg:bg-[linear-gradient(90deg,rgba(2,27,65,0.98)_0%,rgba(3,39,91,0.95)_34%,rgba(5,45,110,0.72)_56%,rgba(5,45,110,0.20)_100%)]" />

                <div className="absolute inset-0 hidden bg-[linear-gradient(180deg,rgba(3,24,58,0.15)_0%,rgba(3,24,58,0.04)_45%,rgba(3,24,58,0.65)_100%)] lg:block" />

                <div
                    className="absolute bottom-0 left-[43%] top-0 hidden w-[140px] bg-[#f7b733]/90 lg:block"
                    style={{
                        clipPath: "polygon(72% 0, 100% 0, 28% 100%, 0 100%)",
                    }}
                />

                <div
                    className="absolute bottom-0 left-[44%] top-0 hidden w-[180px] bg-[#052b66]/75 lg:block"
                    style={{
                        clipPath: "polygon(82% 0, 100% 0, 18% 100%, 0 100%)",
                    }}
                />

                <div className="relative z-10 flex min-h-[560px] w-full flex-col px-4 pb-[108px] pt-10 sm:min-h-[590px] sm:px-6 sm:pb-[118px] sm:pt-12 lg:min-h-[610px] lg:px-10 lg:pb-[134px] lg:pt-16 xl:min-h-[630px] xl:px-14 2xl:px-16">
                    <div className="w-full max-w-[720px] min-w-0">
                        <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[#f7b733] sm:text-[13px]">
                            ACADEMICS
                        </p>

                        <h1 className="mt-4 max-w-full break-words text-[34px] font-semibold leading-[1.06] tracking-[-0.04em] text-white min-[380px]:text-[38px] sm:text-[54px] md:text-[62px] lg:whitespace-nowrap lg:text-[64px] xl:text-[70px] 2xl:text-[76px]">
                            {heroTitle}
                        </h1>

                        <h2 className="mt-2 text-[30px] font-semibold leading-none tracking-[-0.035em] text-[#f7b733] sm:text-[46px] lg:text-[56px] xl:text-[62px]">
                            2026/2027
                        </h2>

                        <p className="mt-5 max-w-[520px] text-[14px] font-medium leading-7 text-blue-50 sm:mt-6 sm:text-[17px] sm:leading-8">
                            {heroSubtitle}
                        </p>

                        <div className="mt-7 grid w-full grid-cols-1 gap-3 sm:mt-8 sm:flex sm:w-auto sm:flex-row">
                            <button
                                type="button"
                                onClick={() =>
                                    scrollToSection("#academic-resources")
                                }
                                className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-[10px] bg-[#f7b733] px-4 text-center text-[12px] font-semibold leading-5 text-[#061b46] shadow-lg shadow-yellow-950/20 transition hover:bg-yellow-300 sm:w-auto sm:min-h-[50px] sm:gap-3 sm:px-7 sm:text-[13px]"
                            >
                                <Icon type="download" className="h-5 w-5" />
                                Download Academic Calendar
                            </button>

                            <button
                                type="button"
                                onClick={() =>
                                    scrollToSection("#semester-roadmap")
                                }
                                className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-[10px] border border-[#f7b733]/70 bg-[#052b66]/40 px-4 text-center text-[12px] font-semibold leading-5 text-white shadow-lg shadow-blue-950/20 backdrop-blur-sm transition hover:bg-white/10 sm:w-auto sm:min-h-[50px] sm:gap-3 sm:px-7 sm:text-[13px]"
                            >
                                <Icon type="calendar" className="h-5 w-5" />
                                View Semester Schedule
                            </button>
                        </div>

                        <div className="mt-7 flex w-full min-w-0 flex-col gap-3 text-white sm:mt-8 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
                            <span className="text-[14px] font-semibold">
                                Semester:
                            </span>

                            <button
                                type="button"
                                onClick={() =>
                                    handleSemesterClick("Semester 1")
                                }
                                className={`inline-flex min-h-11 w-full items-center gap-3 rounded-full border px-4 py-2 text-left text-[11px] font-semibold leading-5 transition sm:w-auto sm:px-5 sm:text-[12px] ${
                                    semester === "Semester 1"
                                        ? "border-[#f7b733] bg-[#0a3d85]/95 text-white shadow-lg shadow-blue-950/25"
                                        : "border-white/30 bg-[#052b66]/30 text-white/90 backdrop-blur-sm"
                                }`}
                            >
                                <span
                                    className={`h-3 w-3 rounded-full ${
                                        semester === "Semester 1"
                                            ? "bg-[#f7b733]"
                                            : "border border-white/70"
                                    }`}
                                />
                                Semester 1 (Jul – Des 2026)
                            </button>

                            <button
                                type="button"
                                onClick={() =>
                                    handleSemesterClick("Semester 2")
                                }
                                className={`inline-flex min-h-11 w-full items-center gap-3 rounded-full border px-4 py-2 text-left text-[11px] font-semibold leading-5 transition sm:w-auto sm:px-5 sm:text-[12px] ${
                                    semester === "Semester 2"
                                        ? "border-[#f7b733] bg-[#0a3d85]/95 text-white shadow-lg shadow-blue-950/25"
                                        : "border-white/30 bg-[#052b66]/30 text-white/90 backdrop-blur-sm"
                                }`}
                            >
                                <span
                                    className={`h-3 w-3 rounded-full ${
                                        semester === "Semester 2"
                                            ? "bg-[#f7b733]"
                                            : "border border-white/70"
                                    }`}
                                />
                                Semester 2 (Jan – Jun 2027)
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="relative z-20 -mt-[70px] w-full px-4 sm:-mt-[82px] sm:px-6 lg:-mt-[86px] lg:px-10 xl:px-14 2xl:px-16">
                <div className="mx-auto grid w-full max-w-[1240px] grid-cols-1 overflow-hidden rounded-[22px] border border-slate-200 bg-white shadow-2xl shadow-blue-950/10 sm:grid-cols-2 lg:grid-cols-4">
                    {stats.map((item, index) => (
                        <div
                            key={item.label}
                            className={`flex min-h-[92px] items-center gap-4 p-4 sm:min-h-[112px] sm:gap-5 sm:p-5 lg:min-h-[130px] lg:p-8 ${
                                index !== stats.length - 1
                                    ? "border-b border-slate-200 lg:border-b-0 lg:border-r"
                                    : ""
                            }`}
                        >
                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-[#1f5bd3] sm:h-14 sm:w-14">
                                <Icon type={item.icon} className="h-6 w-6 sm:h-8 sm:w-8" />
                            </div>

                            <div>
                                <h3 className="text-[28px] font-semibold leading-none text-[#163678] sm:text-[34px] lg:text-[40px]">
                                    {item.value}
                                </h3>

                                <p className="mt-1 text-[12px] font-semibold leading-5 text-slate-700 sm:mt-2 sm:text-[13px]">
                                    {item.label}
                                </p>

                                {item.sub ? (
                                    <p className="text-[12px] font-medium text-slate-500">
                                        {item.sub}
                                    </p>
                                ) : null}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}