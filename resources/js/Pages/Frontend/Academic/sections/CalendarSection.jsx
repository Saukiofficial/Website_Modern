import { useMemo, useState } from "react";
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

function getEventColor(color) {
    if (color === "red") return "text-red-500";
    if (color === "yellow") return "text-[#d18b17]";
    if (color === "green") return "text-[#1b7a4b]";

    return "text-[#1f5bd3]";
}

function getMonthFromDateText(dateText) {
    if (!dateText) return "JUL";

    const text = String(dateText).toUpperCase();

    if (text.includes("JAN")) return "JAN";
    if (text.includes("FEB")) return "FEB";
    if (text.includes("MAR")) return "MAR";
    if (text.includes("APR")) return "APR";
    if (text.includes("MEI")) return "MEI";
    if (text.includes("JUN")) return "JUN";
    if (text.includes("JUL")) return "JUL";
    if (text.includes("AGU")) return "AGU";
    if (text.includes("SEP")) return "SEP";
    if (text.includes("OKT")) return "OKT";
    if (text.includes("NOV")) return "NOV";
    if (text.includes("DES")) return "DES";

    return "JUL";
}

function getDayFromDateText(dateText, index) {
    if (!dateText) return String(index + 1).padStart(2, "0");

    const match = String(dateText).match(/\d{1,2}/);

    if (!match) return String(index + 1).padStart(2, "0");

    return match[0].padStart(2, "0");
}

function normalizeCalendarItems(calendars) {
    if (!Array.isArray(calendars) || calendars.length === 0) {
        return calendarItems;
    }

    return calendars.map((item, index) => {
        const fullDate = item.date_text || item.fullDate || item.start_date || "-";

        return {
            id: item.id || index,
            date: item.date || getDayFromDateText(fullDate, index),
            month: item.month || getMonthFromDateText(fullDate),
            fullDate,
            type: item.category || item.type || "Akademik",
            title: item.title || "Agenda Akademik",
            description: item.description || "Informasi kegiatan akademik sekolah.",
        };
    });
}

function normalizeUpcomingEvents(items) {
    if (!Array.isArray(items) || items.length === 0) {
        return upcomingEvents;
    }

    return items.slice(0, 4).map((item, index) => ({
        date: item.date || getDayFromDateText(item.fullDate || item.date_text, index),
        month: item.month || getMonthFromDateText(item.fullDate || item.date_text),
        title: item.title || "Agenda Akademik",
        subtitle: item.fullDate || item.date_text || "-",
        color:
            item.type === "Ujian"
                ? "red"
                : item.type === "Kegiatan"
                ? "green"
                : item.type === "Informasi"
                ? "yellow"
                : "blue",
    }));
}

export default function CalendarSection({ calendars = [] }) {
    const [semester, setSemester] = useState("Semester 1");
    const [category, setCategory] = useState("Semua");
    const [month, setMonth] = useState("Juli 2026");
    const [search, setSearch] = useState("");

    const dynamicCalendarItems = useMemo(() => {
        return normalizeCalendarItems(calendars);
    }, [calendars]);

    const dynamicUpcomingEvents = useMemo(() => {
        return normalizeUpcomingEvents(dynamicCalendarItems);
    }, [dynamicCalendarItems]);

    const categoryOptions = useMemo(() => {
        const categories = dynamicCalendarItems
            .map((item) => item.type)
            .filter(Boolean);

        return ["Semua", ...Array.from(new Set(categories))];
    }, [dynamicCalendarItems]);

    const filteredItems = dynamicCalendarItems.filter((item) => {
        const matchCategory = category === "Semua" || item.type === category;

        const matchSearch =
            search.trim() === "" ||
            item.title.toLowerCase().includes(search.toLowerCase()) ||
            item.description.toLowerCase().includes(search.toLowerCase());

        return matchCategory && matchSearch;
    });

    const activeRoadmap =
        semester === "Semester 1" ? semesterOneRoadmap : semesterTwoRoadmap;

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
                                onChange={(event) =>
                                    setSemester(event.target.value)
                                }
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
                                onChange={(event) =>
                                    setCategory(event.target.value)
                                }
                                className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-[13px] font-bold text-slate-700 outline-none focus:border-[#1f5bd3] focus:ring-[#1f5bd3]"
                            >
                                {categoryOptions.map((item) => (
                                    <option key={item}>{item}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="mb-2 block text-[12px] font-bold text-slate-500">
                                Bulan
                            </label>

                            <select
                                value={month}
                                onChange={(event) =>
                                    setMonth(event.target.value)
                                }
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
                                    onChange={(event) =>
                                        setSearch(event.target.value)
                                    }
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

                            <div className="mt-4 overflow-hidden rounded-[20px] border border-slate-200">
                                {filteredItems.length > 0 ? (
                                    filteredItems.map((item, index) => (
                                        <div
                                            key={item.id || item.title}
                                            className={`grid gap-4 px-4 py-5 sm:grid-cols-[88px_1fr] ${
                                                index !==
                                                filteredItems.length - 1
                                                    ? "border-b border-slate-100"
                                                    : ""
                                            }`}
                                        >
                                            <div>
                                                <div className="rounded-[16px] border border-slate-200 bg-white px-4 py-3 text-center shadow-sm">
                                                    <p className="text-[32px] font-semibold leading-none text-[#1f5bd3]">
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

                                                <p className="mt-3 text-[12px] font-semibold text-slate-400">
                                                    {item.fullDate}
                                                </p>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="px-6 py-10 text-center">
                                        <p className="text-[38px]">📭</p>

                                        <h3 className="mt-3 text-[18px] font-semibold text-[#163678]">
                                            Agenda Tidak Ditemukan
                                        </h3>

                                        <p className="mt-2 text-[13px] font-medium text-slate-500">
                                            Coba ubah kategori atau kata kunci
                                            pencarian.
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="rounded-[20px] border border-slate-200 p-5">
                            <div className="flex items-center justify-between">
                                <button
                                    type="button"
                                    className="flex h-10 w-10 items-center justify-center rounded-full text-[#163678] hover:bg-blue-50"
                                >
                                    ‹
                                </button>

                                <h3 className="text-[24px] font-semibold uppercase text-[#163678]">
                                    July 2026
                                </h3>

                                <button
                                    type="button"
                                    className="flex h-10 w-10 items-center justify-center rounded-full text-[#163678] hover:bg-blue-50"
                                >
                                    ›
                                </button>
                            </div>

                            <div className="mt-6 grid grid-cols-7 gap-2 text-center text-[12px] font-semibold uppercase">
                                {[
                                    "MON",
                                    "TUE",
                                    "WED",
                                    "THU",
                                    "FRI",
                                    "SAT",
                                    "SUN",
                                ].map((day) => (
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
                                ))}
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
                            {dynamicUpcomingEvents.map((item) => (
                                <div
                                    key={item.title}
                                    className="flex gap-4 border-b border-slate-100 pb-4 last:border-b-0 last:pb-0"
                                >
                                    <div className="rounded-[16px] border border-slate-200 bg-white px-4 py-3 text-center shadow-sm">
                                        <p
                                            className={`text-[28px] font-semibold leading-none ${getEventColor(
                                                item.color
                                            )}`}
                                        >
                                            {item.date}
                                        </p>

                                        <p className="mt-1 text-[11px] font-semibold uppercase text-slate-500">
                                            {item.month}
                                        </p>
                                    </div>

                                    <div>
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

                    <div className="rounded-[26px] bg-[#052b66] p-5 text-white shadow-xl shadow-blue-200">
                        <div className="flex items-center gap-4">
                            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-[#f7b733]">
                                <Icon type="building" className="h-8 w-8" />
                            </div>

                            <div>
                                <h3 className="text-[20px] font-semibold">
                                    Academic Office
                                </h3>

                                <div className="mt-5 space-y-3 text-[13px] font-medium text-blue-100">
                                    <div className="flex items-center gap-3">
                                        <Icon
                                            type="calendar"
                                            className="h-4 w-4"
                                        />
                                        <span>Senin – Jumat</span>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <Icon
                                            type="clock"
                                            className="h-4 w-4"
                                        />
                                        <span>07.30 – 15.30 WIB</span>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <Icon
                                            type="phone"
                                            className="h-4 w-4"
                                        />
                                        <span>(021) 1234 5678</span>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <Icon
                                            type="mail"
                                            className="h-4 w-4"
                                        />
                                        <span>akademik@sman1cerdas.sch.id</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="rounded-[26px] border border-slate-200 bg-white p-5 shadow-xl shadow-slate-200/60 sm:p-6">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-[#1f5bd3]">
                            Semester Roadmap
                        </p>

                        <h2 className="mt-2 text-[28px] font-semibold tracking-[-0.04em] text-[#061b46] sm:text-[36px]">
                            {semester === "Semester 1"
                                ? "Semester Ganjil"
                                : "Semester Genap"}
                        </h2>
                    </div>

                    <div className="flex rounded-[16px] bg-slate-100 p-1">
                        {["Semester 1", "Semester 2"].map((item) => {
                            const active = semester === item;

                            return (
                                <button
                                    key={item}
                                    type="button"
                                    onClick={() => setSemester(item)}
                                    className={`h-11 rounded-[13px] px-5 text-[13px] font-semibold transition ${
                                        active
                                            ? "bg-white text-[#1f5bd3] shadow-sm"
                                            : "text-slate-500"
                                    }`}
                                >
                                    {item}
                                </button>
                            );
                        })}
                    </div>
                </div>

                <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                    {activeRoadmap.map((item, index) => (
                        <div
                            key={`${item.month}-${index}`}
                            className="relative rounded-[22px] border border-slate-200 bg-white p-5 shadow-sm"
                        >
                            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-[#1f5bd3]">
                                <Icon type={item.icon} className="h-7 w-7" />
                            </div>

                            <p className="mt-5 text-[12px] font-semibold uppercase tracking-[0.16em] text-[#d18b17]">
                                {item.month}
                            </p>

                            <h3 className="mt-2 text-[18px] font-semibold leading-tight text-[#061b46]">
                                {item.title}
                            </h3>
                        </div>
                    ))}
                </div>
            </div>

            <div className="grid gap-6 xl:grid-cols-[1fr_0.78fr]">
                <div className="rounded-[26px] border border-slate-200 bg-white p-5 shadow-xl shadow-slate-200/60 sm:p-6">
                    <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-[#1f5bd3]">
                        Academic Resources
                    </p>

                    <h2 className="mt-2 text-[28px] font-semibold tracking-[-0.04em] text-[#061b46] sm:text-[36px]">
                        Download Dokumen Akademik
                    </h2>

                    <div className="mt-6 grid gap-3 sm:grid-cols-2">
                        {resourceFiles.map((item) => (
                            <a
                                key={item.title}
                                href="#"
                                className="flex items-center justify-between rounded-[18px] border border-slate-200 bg-slate-50 px-5 py-4 transition hover:border-blue-200 hover:bg-blue-50"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-[#1f5bd3] shadow-sm">
                                        <Icon
                                            type="file"
                                            className="h-5 w-5"
                                        />
                                    </div>

                                    <div>
                                        <p className="text-[13px] font-semibold text-[#061b46]">
                                            {item.title}
                                        </p>

                                        <p className="mt-1 text-[11px] font-bold uppercase text-slate-400">
                                            {item.type}
                                        </p>
                                    </div>
                                </div>

                                <Icon
                                    type="download"
                                    className="h-5 w-5 text-slate-400"
                                />
                            </a>
                        ))}
                    </div>
                </div>

                <div className="rounded-[26px] border border-slate-200 bg-white p-5 shadow-xl shadow-slate-200/60 sm:p-6">
                    <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-[#1f5bd3]">
                        FAQ
                    </p>

                    <h2 className="mt-2 text-[28px] font-semibold tracking-[-0.04em] text-[#061b46] sm:text-[36px]">
                        Pertanyaan Umum
                    </h2>

                    <div className="mt-6 space-y-4">
                        {faqItems.map((item) => (
                            <div
                                key={item.question}
                                className="rounded-[18px] border border-slate-200 bg-slate-50 p-4"
                            >
                                <h3 className="text-[14px] font-semibold text-[#061b46]">
                                    {item.question}
                                </h3>

                                <p className="mt-2 text-[12.5px] font-medium leading-6 text-slate-600">
                                    {item.answer}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}