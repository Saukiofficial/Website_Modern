import { useMemo, useState } from "react";
import {
    calendarItems,
    faqItems,
    resourceFiles,
    semesterOneRoadmap,
    semesterTwoRoadmap,
    upcomingEvents,
} from "../data";
import Icon from "../components/Icon";

const monthNames = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
];

const monthShortNames = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MEI",
    "JUN",
    "JUL",
    "AGU",
    "SEP",
    "OKT",
    "NOV",
    "DES",
];

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

function parseDate(value) {
    if (!value) return null;

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
        return null;
    }

    return date;
}

function getMonthIndexFromDateText(dateText) {
    if (!dateText) return 6;

    const text = String(dateText).toLowerCase();

    if (text.includes("januari") || text.includes("jan")) return 0;
    if (text.includes("februari") || text.includes("feb")) return 1;
    if (text.includes("maret") || text.includes("mar")) return 2;
    if (text.includes("april") || text.includes("apr")) return 3;
    if (text.includes("mei")) return 4;
    if (text.includes("juni") || text.includes("jun")) return 5;
    if (text.includes("juli") || text.includes("jul")) return 6;
    if (text.includes("agustus") || text.includes("agu")) return 7;
    if (text.includes("september") || text.includes("sep")) return 8;
    if (text.includes("oktober") || text.includes("okt")) return 9;
    if (text.includes("november") || text.includes("nov")) return 10;
    if (text.includes("desember") || text.includes("des")) return 11;

    return 6;
}

function getYearFromDateText(dateText, fallbackYear = 2026) {
    if (!dateText) return fallbackYear;

    const match = String(dateText).match(/\b(20\d{2})\b/);

    if (!match) return fallbackYear;

    return Number(match[1]);
}

function getDayFromDateText(dateText, index) {
    if (!dateText) return String(index + 1).padStart(2, "0");

    const match = String(dateText).match(/\d{1,2}/);

    if (!match) return String(index + 1).padStart(2, "0");

    return match[0].padStart(2, "0");
}

function getMonthOptionLabel(monthIndex, year) {
    return `${monthNames[monthIndex]} ${year}`;
}

function getSemesterFromMonth(monthIndex) {
    return monthIndex >= 6 && monthIndex <= 11 ? "Semester 1" : "Semester 2";
}

function getColorFromType(type) {
    if (type === "Ujian") return "red";
    if (type === "Kegiatan") return "green";
    if (type === "Informasi") return "yellow";

    return "blue";
}

function normalizeCalendarItems(calendars) {
    if (!Array.isArray(calendars) || calendars.length === 0) {
        return calendarItems.map((item, index) => {
            const monthIndex = getMonthIndexFromDateText(item.fullDate);
            const year = getYearFromDateText(item.fullDate, 2026);

            return {
                id: item.id || `fallback-${index}`,
                date: item.date || getDayFromDateText(item.fullDate, index),
                month: item.month || monthShortNames[monthIndex],
                monthIndex,
                year,
                monthLabel: getMonthOptionLabel(monthIndex, year),
                semester: getSemesterFromMonth(monthIndex),
                fullDate: item.fullDate,
                type: item.type || "Akademik",
                title: item.title || "Agenda Akademik",
                description:
                    item.description || "Informasi kegiatan akademik sekolah.",
                icon: item.icon || "📅",
            };
        });
    }

    return calendars.map((item, index) => {
        const dateObject = parseDate(item.start_date);
        const fullDate = item.date_text || item.fullDate || item.start_date || "-";

        const monthIndex = dateObject
            ? dateObject.getMonth()
            : getMonthIndexFromDateText(fullDate);

        const year = dateObject
            ? dateObject.getFullYear()
            : getYearFromDateText(fullDate, 2026);

        const date = dateObject
            ? String(dateObject.getDate()).padStart(2, "0")
            : getDayFromDateText(fullDate, index);

        return {
            id: item.id || index,
            date,
            month: monthShortNames[monthIndex],
            monthIndex,
            year,
            monthLabel: getMonthOptionLabel(monthIndex, year),
            semester: getSemesterFromMonth(monthIndex),
            fullDate,
            type: item.category || item.type || "Akademik",
            title: item.title || "Agenda Akademik",
            description:
                item.description || "Informasi kegiatan akademik sekolah.",
            icon: item.icon || "📅",
        };
    });
}

function normalizeUpcomingEvents(items) {
    if (!Array.isArray(items) || items.length === 0) {
        return upcomingEvents;
    }

    return items.slice(0, 4).map((item, index) => ({
        date: item.date || getDayFromDateText(item.fullDate, index),
        month: item.month || monthShortNames[item.monthIndex || 6],
        title: item.title || "Agenda Akademik",
        subtitle: item.fullDate || item.date_text || "-",
        color: getColorFromType(item.type),
    }));
}

function buildMiniCalendarDays(year, monthIndex, events) {
    const firstDate = new Date(year, monthIndex, 1);
    const lastDate = new Date(year, monthIndex + 1, 0);

    const firstDay = firstDate.getDay() === 0 ? 6 : firstDate.getDay() - 1;
    const totalDays = lastDate.getDate();

    const previousMonthLastDate = new Date(year, monthIndex, 0).getDate();

    const days = [];

    for (let index = firstDay - 1; index >= 0; index -= 1) {
        days.push({
            value: String(previousMonthLastDate - index),
            muted: true,
        });
    }

    for (let day = 1; day <= totalDays; day += 1) {
        const event = events.find((item) => Number(item.date) === day);

        let active = null;

        if (event) {
            if (event.type === "Ujian") {
                active = "holiday";
            } else if (event.type === "Kegiatan") {
                active = "event";
            } else {
                active = "academic";
            }
        }

        const realDate = new Date(year, monthIndex, day);

        days.push({
            value: String(day),
            active,
            sunday: realDate.getDay() === 0,
        });
    }

    let nextDay = 1;

    while (days.length % 7 !== 0) {
        days.push({
            value: String(nextDay),
            muted: true,
        });

        nextDay += 1;
    }

    return days;
}

function ResourceButton({ item }) {
    const url = item.file_url || item.url || item.file || item.path || null;

    if (!url) {
        return (
            <button
                type="button"
                disabled
                className="flex cursor-not-allowed items-center justify-between rounded-[18px] border border-slate-200 bg-slate-50 px-5 py-4 opacity-70"
                title="Dokumen belum tersedia dari admin."
            >
                <div className="flex items-center gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-[#1f5bd3] shadow-sm">
                        <Icon type="file" className="h-5 w-5" />
                    </div>

                    <div className="text-left">
                        <p className="text-[13px] font-semibold text-[#061b46]">
                            {item.title}
                        </p>

                        <p className="mt-1 text-[11px] font-bold uppercase text-slate-400">
                            {item.type || "PDF"} • Belum tersedia
                        </p>
                    </div>
                </div>

                <Icon type="download" className="h-5 w-5 text-slate-300" />
            </button>
        );
    }

    return (
        <a
            href={url}
            download
            className="flex items-center justify-between rounded-[18px] border border-slate-200 bg-slate-50 px-5 py-4 transition hover:border-blue-200 hover:bg-blue-50"
        >
            <div className="flex items-center gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-[#1f5bd3] shadow-sm">
                    <Icon type="file" className="h-5 w-5" />
                </div>

                <div>
                    <p className="text-[13px] font-semibold text-[#061b46]">
                        {item.title}
                    </p>

                    <p className="mt-1 text-[11px] font-bold uppercase text-slate-400">
                        {item.type || "PDF"}
                    </p>
                </div>
            </div>

            <Icon type="download" className="h-5 w-5 text-slate-400" />
        </a>
    );
}

export default function CalendarSection({ calendars = [], resources = [] }) {
    const dynamicCalendarItems = useMemo(() => {
        return normalizeCalendarItems(calendars);
    }, [calendars]);

    const monthOptions = useMemo(() => {
        const options = dynamicCalendarItems.map((item) => item.monthLabel);
        return Array.from(new Set(options));
    }, [dynamicCalendarItems]);

    const defaultMonth = monthOptions[0] || "Juli 2026";

    const [semester, setSemester] = useState("Semester 1");
    const [category, setCategory] = useState("Semua");
    const [month, setMonth] = useState(defaultMonth);
    const [search, setSearch] = useState("");

    const activeMonth = month || defaultMonth;

    const selectedMonthInfo = useMemo(() => {
        const found = dynamicCalendarItems.find(
            (item) => item.monthLabel === activeMonth
        );

        if (found) {
            return {
                monthIndex: found.monthIndex,
                year: found.year,
                label: found.monthLabel,
            };
        }

        return {
            monthIndex: 6,
            year: 2026,
            label: "Juli 2026",
        };
    }, [dynamicCalendarItems, activeMonth]);

    const categoryOptions = useMemo(() => {
        const categories = dynamicCalendarItems
            .map((item) => item.type)
            .filter(Boolean);

        return ["Semua", ...Array.from(new Set(categories))];
    }, [dynamicCalendarItems]);

    const filteredItems = useMemo(() => {
        return dynamicCalendarItems.filter((item) => {
            const matchCategory =
                category === "Semua" || item.type === category;

            const matchMonth = item.monthLabel === activeMonth;

            const matchSemester = item.semester === semester;

            const keyword = search.trim().toLowerCase();

            const matchSearch =
                keyword === "" ||
                String(item.title || "")
                    .toLowerCase()
                    .includes(keyword) ||
                String(item.description || "")
                    .toLowerCase()
                    .includes(keyword) ||
                String(item.type || "")
                    .toLowerCase()
                    .includes(keyword) ||
                String(item.fullDate || "")
                    .toLowerCase()
                    .includes(keyword);

            return matchCategory && matchMonth && matchSemester && matchSearch;
        });
    }, [dynamicCalendarItems, category, activeMonth, semester, search]);

    const monthEvents = useMemo(() => {
        return dynamicCalendarItems.filter(
            (item) => item.monthLabel === activeMonth
        );
    }, [dynamicCalendarItems, activeMonth]);

    const dynamicUpcomingEvents = useMemo(() => {
        return normalizeUpcomingEvents(dynamicCalendarItems);
    }, [dynamicCalendarItems]);

    const activeRoadmap =
        semester === "Semester 1" ? semesterOneRoadmap : semesterTwoRoadmap;

    const miniCalendarDays = useMemo(() => {
        return buildMiniCalendarDays(
            selectedMonthInfo.year,
            selectedMonthInfo.monthIndex,
            monthEvents
        );
    }, [selectedMonthInfo, monthEvents]);

    const resourceItems = resources.length > 0 ? resources : resourceFiles;

    const goToPreviousMonth = () => {
        const currentIndex = monthOptions.indexOf(activeMonth);

        if (currentIndex > 0) {
            setMonth(monthOptions[currentIndex - 1]);
        }
    };

    const goToNextMonth = () => {
        const currentIndex = monthOptions.indexOf(activeMonth);

        if (currentIndex < monthOptions.length - 1) {
            setMonth(monthOptions[currentIndex + 1]);
        }
    };

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
                                value={activeMonth}
                                onChange={(event) =>
                                    setMonth(event.target.value)
                                }
                                className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-[13px] font-bold text-slate-700 outline-none focus:border-[#1f5bd3] focus:ring-[#1f5bd3]"
                            >
                                {monthOptions.map((item) => (
                                    <option key={item}>{item}</option>
                                ))}
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
                                {activeMonth}
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
                                            Coba ubah semester, bulan, kategori,
                                            atau kata kunci pencarian.
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="rounded-[20px] border border-slate-200 p-5">
                            <div className="flex items-center justify-between">
                                <button
                                    type="button"
                                    onClick={goToPreviousMonth}
                                    className="flex h-10 w-10 items-center justify-center rounded-full text-[#163678] hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-40"
                                    disabled={
                                        monthOptions.indexOf(activeMonth) <= 0
                                    }
                                >
                                    ‹
                                </button>

                                <h3 className="text-[24px] font-semibold uppercase text-[#163678]">
                                    {activeMonth}
                                </h3>

                                <button
                                    type="button"
                                    onClick={goToNextMonth}
                                    className="flex h-10 w-10 items-center justify-center rounded-full text-[#163678] hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-40"
                                    disabled={
                                        monthOptions.indexOf(activeMonth) ===
                                        monthOptions.length - 1
                                    }
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
                                    key={`${item.title}-${item.subtitle}`}
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

                    <div
                        id="academic-office"
                        className="scroll-mt-28 rounded-[26px] bg-[#052b66] p-5 text-white shadow-xl shadow-blue-200"
                    >
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
                                        <a
                                            href="tel:02112345678"
                                            className="hover:text-white"
                                        >
                                            (021) 1234 5678
                                        </a>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <Icon
                                            type="mail"
                                            className="h-4 w-4"
                                        />
                                        <a
                                            href="mailto:akademik@sman1cerdas.sch.id"
                                            className="break-all hover:text-white"
                                        >
                                            akademik@sman1cerdas.sch.id
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div
                id="semester-roadmap"
                className="scroll-mt-28 rounded-[26px] border border-slate-200 bg-white p-5 shadow-xl shadow-slate-200/60 sm:p-6"
            >
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
                <div
                    id="academic-resources"
                    className="scroll-mt-28 rounded-[26px] border border-slate-200 bg-white p-5 shadow-xl shadow-slate-200/60 sm:p-6"
                >
                    <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-[#1f5bd3]">
                        Academic Resources
                    </p>

                    <h2 className="mt-2 text-[28px] font-semibold tracking-[-0.04em] text-[#061b46] sm:text-[36px]">
                        Download Dokumen Akademik
                    </h2>

                    <p className="mt-3 text-[13px] font-medium leading-6 text-slate-500">
                        Unduh dokumen akademik resmi yang sudah disediakan oleh
                        sekolah.
                    </p>

                    <div className="mt-6 grid gap-3 sm:grid-cols-2">
                        {resourceItems.map((item) => (
                            <ResourceButton
                                key={item.id || item.title}
                                item={item}
                            />
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