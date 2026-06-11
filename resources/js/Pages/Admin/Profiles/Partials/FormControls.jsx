export function TextInput({
    label,
    value,
    onChange,
    error,
    placeholder,
    type = "text",
}) {
    return (
        <div>
            <label className="mb-2 block text-[13px] font-extrabold text-[#061b46]">
                {label}
            </label>

            <input
                type={type}
                value={value || ""}
                onChange={onChange}
                placeholder={placeholder}
                className="h-[54px] w-full rounded-[16px] border border-slate-200 bg-white px-4 text-[14px] font-semibold text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-[#0b73e8] focus:ring-4 focus:ring-blue-100"
            />

            {error ? (
                <p className="mt-2 text-[12px] font-bold text-red-600">{error}</p>
            ) : null}
        </div>
    );
}

export function TextArea({ label, value, onChange, error, placeholder, rows = 5 }) {
    return (
        <div>
            <label className="mb-2 block text-[13px] font-extrabold text-[#061b46]">
                {label}
            </label>

            <textarea
                value={value || ""}
                onChange={onChange}
                placeholder={placeholder}
                rows={rows}
                className="w-full resize-none rounded-[16px] border border-slate-200 bg-white px-4 py-4 text-[14px] font-semibold text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-[#0b73e8] focus:ring-4 focus:ring-blue-100"
            />

            {error ? (
                <p className="mt-2 text-[12px] font-bold text-red-600">{error}</p>
            ) : null}
        </div>
    );
}

export function FileUploadBox({ label, currentUrl, file, onChange, error }) {
    const imageUrl = file ? URL.createObjectURL(file) : currentUrl || null;

    return (
        <div>
            <label className="mb-2 block text-[13px] font-extrabold text-[#061b46]">
                {label}
            </label>

            <label className="flex cursor-pointer flex-col items-center justify-center overflow-hidden rounded-[22px] border-2 border-dashed border-slate-200 bg-slate-50 px-5 py-6 text-center transition hover:border-[#0b73e8] hover:bg-blue-50">
                <input type="file" accept="image/*" onChange={onChange} className="hidden" />

                {imageUrl ? (
                    <img src={imageUrl} alt={label} className="h-[150px] w-full rounded-[18px] object-cover" />
                ) : (
                    <div className="flex h-[150px] w-full items-center justify-center rounded-[18px] bg-white text-[42px] shadow-sm">
                        🖼️
                    </div>
                )}

                <p className="mt-4 text-[14px] font-extrabold text-[#061b46]">
                    Klik untuk upload gambar
                </p>
                <p className="mt-2 text-[12px] font-semibold text-slate-500">
                    Format JPG, PNG, WEBP. Maksimal 4MB.
                </p>
            </label>

            {error ? (
                <p className="mt-2 text-[12px] font-bold text-red-600">{error}</p>
            ) : null}
        </div>
    );
}

export function SectionCard({ eyebrow, title, description, children }) {
    return (
        <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/70 sm:p-8">
            <div className="border-b border-slate-200 pb-6">
                <p className="text-[12px] font-extrabold uppercase tracking-[0.18em] text-[#d59a25]">
                    {eyebrow}
                </p>
                <h2 className="mt-2 text-[24px] font-black tracking-[-0.04em] text-[#061b46]">
                    {title}
                </h2>
                {description ? (
                    <p className="mt-3 max-w-3xl text-[13px] font-semibold leading-6 text-slate-500">
                        {description}
                    </p>
                ) : null}
            </div>
            <div className="mt-7">{children}</div>
        </section>
    );
}

export function RepeaterHeader({ title, onAdd }) {
    return (
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <h3 className="text-[18px] font-black text-[#061b46]">{title}</h3>
            <button
                type="button"
                onClick={onAdd}
                className="inline-flex min-h-[42px] items-center justify-center rounded-[14px] bg-blue-50 px-5 text-[12px] font-extrabold uppercase tracking-[0.08em] text-blue-700 transition hover:bg-blue-100"
            >
                Tambah
            </button>
        </div>
    );
}

export function RemoveButton({ onClick }) {
    return (
        <button
            type="button"
            onClick={onClick}
            className="inline-flex min-h-[38px] items-center justify-center rounded-[12px] bg-red-50 px-4 text-[12px] font-extrabold text-red-700 transition hover:bg-red-100"
        >
            Hapus
        </button>
    );
}

export function EmptyState({ children = "Belum ada data." }) {
    return (
        <div className="rounded-[18px] border border-dashed border-slate-200 bg-slate-50 p-6 text-center text-[13px] font-bold text-slate-500">
            {children}
        </div>
    );
}
