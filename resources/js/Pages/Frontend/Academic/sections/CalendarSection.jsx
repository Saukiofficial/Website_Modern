import { useState } from "react";
import {
    calendarItems,
    faqItems,
    miniCalendarDays,
    resourceFiles,
    semesterOneRoadmap,
    semesterTwoRoadmap,
    upcomingEvents,
} from "../data";
import Icon from "../components/Icon";

function getTypeBadge(type) {
    if (type === "Akademik") return "bg-blue-100 text-[#1f5bd3]";
    if (type === "Kegiatan") return "bg-green-100 text-[#1b7a4b]";
    if (type === "Ujian") return "bg-red-100 text-[#c0392b]";
    if (type === "Informasi") return "bg-yellow-100 text-[#b7791f]";
    if (type === "Projek") return "bg-purple-100 text-[#6b46c1]";

    return "bg-slate-100 text-slate-600";
}

export default function CalendarSection() {
    const [semester, setSemester] = useState("Semester 1");
    const [category, setCategory] = useState("Semua");
    const [month, setMonth] = useState("Juli 2026");
    const [search, setSearch] = useState("");

    const filteredItems = calendarItems.filter((item) => {
        const matchCategory = category === "Semua" || item.type === category;

        const matchSearch =
            search.trim() === "" ||
            item.title.toLowerCase().includes(search.toLowerCase()) ||
            item.description.toLowerCase().includes(search.toLowerCase());

        return matchCategory && matchSearch;
    });

    return (
        <div className="space-y-6">
            <div className="grid gap-6 xl:grid-cols-[1fr_300px]">
                <div className="rounded-[26px] border border-slate-200 bg-white p-5 shadow-xl shadow-slate-200/60 sm:p-6">
                    <p className="text-[14px] font-semibold uppercase text-[#1f5bd3]">
                        Academic Calendar
                    </p>

                    <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
                        <div>
                            <label className="mb-2 block text-[12px] font-bold text-slate-500">
                                Semester
                            </label>
                            <select
                                value={semester}
                                onChange={(e) => setSemester(e.target.value)}
                                className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-[13px] font-bold text-slate-700 outline-none focus:border-[#1f5bd3] focus:ring-[#1f5bd3]"
                            >
                                <option>Semester 1</option>
                                <option>Semester 2</option>
                            </select>
                        </div>

                        <div>
                            <label className="mb-2 block text-[12px] font-bold text-slate-500">
                                Kategori
                            </label>
                            <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-[13px] font-bold text-slate-700 outline-none focus:border-[#1f5bd3] focus:ring-[#1f5bd3]"
                            >
                                <option>Semua</option>
                                <option>Akademik</option>
                                <option>Kegiatan</option>
                                <option>Ujian</option>
                                <option>Informasi</option>
                                <option>Projek</option>
                            </select>
                        </div>

                        <div>
                            <label className="mb-2 block text-[12px] font-bold text-slate-500">
                                Bulan
                            </label>
                            <select
                                value={month}
                                onChange={(e) => setMonth(e.target.value)}
                                className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-[13px] font-bold text-slate-700 outline-none focus:border-[#1f5bd3] focus:ring-[#1f5bd3]"
                            >
                                <option>Juli 2026</option>
                                <option>Agustus 2026</option>
                                <option>September 2026</option>
                                <option>Oktober 2026</option>
                                <option>November 2026</option>
                                <option>Desember 2026</option>
                            </select>
                        </div>

                        <div>
                            <label className="mb-2 block text-[12px] font-bold text-slate-500">
                                Search
                            </label>
                            <div className="flex h-12 items-center gap-3 rounded-xl border border-slate-200 bg-white px-4">
                                <input
                                    type="text"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    placeholder="Search event..."
                                    className="h-full w-full border-0 bg-transparent text-[13px] font-medium text-slate-700 outline-none placeholder:text-slate-400 focus:ring-0"
                                />
                                <Icon
                                    type="search"
                                    className="h-5 w-5 shrink-0 text-slate-400"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 grid gap-5 xl:grid-cols-[1.05fr_0.95fr]">
                        <div>
                            <h3 className="text-[22px] font-semibold uppercase text-[#163678]">
                                July 2026
                            </h3>

                            <div className="mt-4 rounded-[20px] border border-slate-200">
                                {filteredItems.map((item, index) => (
                                    <div
                                        key={item.title}
                                        className={`grid gap-4 px-4 py-5 sm:grid-cols-[88px_1fr] ${
                                            index !== filteredItems.length - 1
                                                ? "border-b border-slate-100"
                                                : ""
                                        }`}
                                    >
                                        <div className="relative">
                                            <div className="absolute left-[6px] top-0 h-full w-[2px] bg-blue-100" />
                                            <div className="absolute left-0 top-3 h-4 w-4 rounded-full border-4 border-white bg-[#1f5bd3]" />

                                            <div className="ml-7 rounded-[16px] border border-slate-200 bg-white px-3 py-3 text-center shadow-sm">
                                                <p className="text-[28px] font-semibold leading-none text-[#1f5bd3]">
                                                    {item.date}
                                                </p>
                                                <p className="mt-1 text-[11px] font-semibold uppercase text-slate-500">
                                                    {item.month}
                                                </p>
                                            </div>
                                        </div>

                                        <div>
                                            <span
                                                className={`inline-flex rounded-full px-3 py-1 text-[11px] font-semibold ${getTypeBadge(
                                                    item.type
                                                )}`}
                                            >
                                                {item.type}
                                            </span>

                                            <h4 className="mt-3 text-[18px] font-semibold leading-snug text-[#163678]">
                                                {item.title}
                                            </h4>

                                            <p className="mt-2 text-[13px] font-medium leading-6 text-slate-500">
                                                {item.description}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="rounded-[20px] border border-slate-200 p-5">
                            <div className="flex items-center justify-between">
                                <button className="flex h-10 w-10 items-center justify-center rounded-full text-[#163678] hover:bg-blue-50">
                                    ‹
                                </button>
                                <h3 className="text-[24px] font-semibold uppercase text-[#163678]">
                                    July 2026
                                </h3>
                                <button className="flex h-10 w-10 items-center justify-center rounded-full text-[#163678] hover:bg-blue-50">
                                    ›
                                </button>
                            </div>

                            <div className="mt-6 grid grid-cols-7 gap-2 text-center text-[12px] font-semibold uppercase">
                                {["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"].map(
                                    (day) => (
                                        <div
                                            key={day}
                                            className={
                                                day === "SUN"
                                                    ? "text-red-500"
                                                    : "text-slate-500"
                                            }
                                        >
                                            {day}
                                        </div>
                                    )
                                )}
                            </div>

                            <div className="mt-4 grid grid-cols-7 gap-2">
                                {miniCalendarDays.map((day, index) => {
                                    let dayClass =
                                        "flex h-11 items-center justify-center rounded-full text-[14px] font-bold";

                                    if (day.muted) {
                                        dayClass += " text-slate-300";
                                    } else if (day.active === "academic") {
                                        dayClass +=
                                            " bg-[#1f5bd3] text-white shadow-lg";
                                    } else if (day.active === "event") {
                                        dayClass +=
                                            " bg-[#1b7a4b] text-white shadow-lg";
                                    } else if (day.active === "holiday") {
                                        dayClass +=
                                            " bg-[#d18b17] text-white shadow-lg";
                                    } else if (day.sunday) {
                                        dayClass += " text-red-500";
                                    } else {
                                        dayClass += " text-slate-700";
                                    }

                                    return (
                                        <div
                                            key={`${day.value}-${index}`}
                                            className={dayClass}
                                        >
                                            {day.value}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="rounded-[26px] border border-slate-200 bg-white p-5 shadow-xl shadow-slate-200/60">
                        <h3 className="text-[18px] font-semibold uppercase text-[#163678]">
                            Upcoming Events
                        </h3>

                        <div className="mt-5 space-y-4">
                            {upcomingEvents.map((item) => (
                                <div
                                    key={item.title}
                                    className="flex gap-4 border-b border-slate-100 pb-4 last:border-b-0 last:pb-0"
                                >
                                    <div className="rounded-[16px] border border-slate-200 bg-white px-4 py-3 text-center shadow-sm">
                                        <p className="text-[28px] font-semibold leading-none text-[#1f5bd3]">
                                            {item.date}
                                        </p>
                                        <p className="mt-1 text-[11px] font-semibold uppercase text-slate-500">
                                            {item.month}
                                        </p>
                                    </div>

                                    <div className="pt-1">
                                        <h4 className="text-[15px] font-semibold leading-snug text-[#163678]">
                                            {item.title}
                                        </h4>
                                        <p className="mt-1 text-[12px] font-medium text-slate-500">
                                            {item.subtitle}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="overflow-hidden rounded-[24px] bg-gradient-to-br from-[#062a60] to-[#063f8d] p-6 text-white shadow-xl shadow-blue-200">
                        <div className="flex items-start gap-4">
                            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-[#f7b733]">
                                <Icon type="building" className="h-8 w-8" />
                            </div>

                            <div>
                                <h3 className="text-[20px] font-semibold">
                                    Academic Office
                                </h3>

                                <div className="mt-5 space-y-3 text-[13px] font-medium text-blue-100">
                                    <div className="flex items-center gap-3">
                                        <Icon type="calendar" className="h-4 w-4" />
                                        <span>Senin – Jumat</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Icon type="clock" className="h-4 w-4" />
                                        <span>07.30 – 15.30 WIB</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Icon type="phone" className="h-4 w-4" />
                                        <span>(021) 1234 5678</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Icon type="mail" className="h-4 w-4" />
                                        <span>akademik@sman1cerdas.sch.id</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}