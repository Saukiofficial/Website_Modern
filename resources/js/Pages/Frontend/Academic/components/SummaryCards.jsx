import Icon from "./Icon";

export default function SummaryCards() {
    const cards = [
        {
            value: "45",
            label: "Total Guru",
            icon: "users",
        },
        {
            value: "38",
            label: "Guru Bersertifikasi",
            icon: "award",
        },
        {
            value: "12",
            label: "Guru S2/S3",
            icon: "graduate",
        },
        {
            value: "25",
            label: "Penghargaan Diterima",
            icon: "trophy",
        },
    ];

    return (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {cards.map((item) => (
                <div
                    key={item.label}
                    className="rounded-[20px] border border-slate-200 bg-white p-6 shadow-lg shadow-slate-200/60"
                >
                    <div className="flex items-center gap-4">
                        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-[#064493]">
                            <Icon type={item.icon} className="h-8 w-8" />
                        </div>
                        <div>
                            <h3 className="text-[30px] font-semibold leading-none text-[#061b46]">
                                {item.value}
                            </h3>
                            <p className="mt-2 text-[12px] font-semibold leading-5 text-slate-600">
                                {item.label}
                            </p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}