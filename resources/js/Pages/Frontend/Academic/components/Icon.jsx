export default function Icon({ type, className = "h-6 w-6" }) {
    const common = {
        className,
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "2",
        strokeLinecap: "round",
        strokeLinejoin: "round",
    };

    if (type === "calendar") {
        return (
            <svg {...common}>
                <path d="M8 2v4M16 2v4M3 10h18" />
                <rect x="3" y="4" width="18" height="18" rx="3" />
                <path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01M16 18h.01" />
            </svg>
        );
    }

    if (type === "users") {
        return (
            <svg {...common}>
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
        );
    }

    if (type === "activity") {
        return (
            <svg {...common}>
                <circle cx="12" cy="12" r="10" />
                <path d="m8 12 2.5 2.5L16 9" />
                <path d="M12 6v2M12 16v2M6 12h2M16 12h2" />
            </svg>
        );
    }

    if (type === "organization") {
        return (
            <svg {...common}>
                <rect x="9" y="2" width="6" height="6" rx="2" />
                <rect x="3" y="16" width="6" height="6" rx="2" />
                <rect x="15" y="16" width="6" height="6" rx="2" />
                <path d="M12 8v4M6 16v-2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2" />
            </svg>
        );
    }

    if (type === "trophy") {
        return (
            <svg {...common}>
                <path d="M8 21h8M12 17v4" />
                <path d="M7 4h10v5a5 5 0 0 1-10 0V4Z" />
                <path d="M5 5H3v3a4 4 0 0 0 4 4M19 5h2v3a4 4 0 0 1-4 4" />
            </svg>
        );
    }

    if (type === "award") {
        return (
            <svg {...common}>
                <circle cx="12" cy="8" r="5" />
                <path d="M8.5 12.5 7 22l5-3 5 3-1.5-9.5" />
            </svg>
        );
    }

    if (type === "graduate") {
        return (
            <svg {...common}>
                <path d="m22 10-10-5-10 5 10 5 10-5Z" />
                <path d="M6 12v5c3 3 9 3 12 0v-5" />
            </svg>
        );
    }

    if (type === "mail") {
        return (
            <svg {...common}>
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <path d="m3 7 9 6 9-6" />
            </svg>
        );
    }

    if (type === "search") {
        return (
            <svg {...common}>
                <circle cx="11" cy="11" r="7" />
                <path d="m21 21-4.3-4.3" />
            </svg>
        );
    }

    if (type === "download") {
        return (
            <svg {...common}>
                <path d="M12 3v12" />
                <path d="m7 10 5 5 5-5" />
                <path d="M5 21h14" />
            </svg>
        );
    }

    if (type === "clock") {
        return (
            <svg {...common}>
                <circle cx="12" cy="12" r="9" />
                <path d="M12 7v5l3 2" />
            </svg>
        );
    }

    if (type === "phone") {
        return (
            <svg {...common}>
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07A19.5 19.5 0 0 1 5.15 12.8 19.8 19.8 0 0 1 2.08 4.09 2 2 0 0 1 4.07 1.9h3a2 2 0 0 1 2 1.72c.12.9.33 1.78.62 2.63a2 2 0 0 1-.45 2.11L8 9.91a16 16 0 0 0 6.09 6.09l1.55-1.24a2 2 0 0 1 2.11-.45c.85.29 1.73.5 2.63.62A2 2 0 0 1 22 16.92Z" />
            </svg>
        );
    }

    if (type === "building") {
        return (
            <svg {...common}>
                <path d="M3 21h18" />
                <path d="M5 21V7l7-4 7 4v14" />
                <path d="M9 9h.01M9 13h.01M9 17h.01M15 9h.01M15 13h.01M15 17h.01" />
            </svg>
        );
    }

    if (type === "book") {
        return (
            <svg {...common}>
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z" />
                <path d="M8 7h8M8 11h8" />
            </svg>
        );
    }

    if (type === "file") {
        return (
            <svg {...common}>
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
                <path d="M14 2v6h6" />
            </svg>
        );
    }

    return (
        <svg {...common}>
            <path d="M4 6h16M4 12h16M4 18h16" />
        </svg>
    );
}