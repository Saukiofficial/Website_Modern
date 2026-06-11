import { EmptyState, RemoveButton, RepeaterHeader, TextArea, TextInput } from "./FormControls";

export function StringRepeater({ title, items = [], onAdd, onChange, onRemove }) {
    return (
        <div>
            <RepeaterHeader title={title} onAdd={onAdd} />
            <div className="space-y-3">
                {items.map((item, index) => (
                    <div key={index} className="grid gap-3 rounded-[20px] border border-slate-200 bg-slate-50 p-4 md:grid-cols-[1fr_auto]">
                        <TextArea
                            label={`Item ${index + 1}`}
                            value={item}
                            rows={3}
                            onChange={(event) => onChange(index, event.target.value)}
                            placeholder="Tulis data"
                        />
                        <div className="flex items-end">
                            <RemoveButton onClick={() => onRemove(index)} />
                        </div>
                    </div>
                ))}
                {items.length === 0 ? <EmptyState /> : null}
            </div>
        </div>
    );
}

export function KeyValueRepeater({ title, items = [], onAdd, onChange, onRemove }) {
    return (
        <div>
            <RepeaterHeader title={title} onAdd={onAdd} />
            <div className="space-y-3">
                {items.map((item, index) => (
                    <div key={index} className="grid gap-4 rounded-[20px] border border-slate-200 bg-slate-50 p-4 md:grid-cols-[0.7fr_1fr_auto]">
                        <TextInput
                            label="Label"
                            value={item.label}
                            onChange={(event) => onChange(index, "label", event.target.value)}
                            placeholder="Contoh: NPSN"
                        />
                        <TextInput
                            label="Value"
                            value={item.value}
                            onChange={(event) => onChange(index, "value", event.target.value)}
                            placeholder="Contoh: 20500001"
                        />
                        <div className="flex items-end">
                            <RemoveButton onClick={() => onRemove(index)} />
                        </div>
                    </div>
                ))}
                {items.length === 0 ? <EmptyState /> : null}
            </div>
        </div>
    );
}

export function CardRepeater({ title, items = [], fields, onAdd, onChange, onRemove, useTextarea = true }) {
    return (
        <div>
            <RepeaterHeader title={title} onAdd={onAdd} />
            <div className="space-y-4">
                {items.map((item, index) => (
                    <div key={index} className="rounded-[22px] border border-slate-200 bg-slate-50 p-4">
                        <div className="mb-4 flex items-center justify-between gap-3">
                            <p className="text-[13px] font-extrabold uppercase tracking-[0.12em] text-[#d59a25]">
                                Item {index + 1}
                            </p>
                            <RemoveButton onClick={() => onRemove(index)} />
                        </div>
                        <div className="grid gap-4 md:grid-cols-2">
                            {fields.map((field) => {
                                const isLong = useTextarea && field.key === "description";
                                return (
                                    <div key={field.key} className={isLong ? "md:col-span-2" : ""}>
                                        {isLong ? (
                                            <TextArea
                                                label={field.label}
                                                value={item[field.key]}
                                                rows={3}
                                                onChange={(event) => onChange(index, field.key, event.target.value)}
                                                placeholder={field.placeholder}
                                            />
                                        ) : (
                                            <TextInput
                                                label={field.label}
                                                value={item[field.key]}
                                                onChange={(event) => onChange(index, field.key, event.target.value)}
                                                placeholder={field.placeholder}
                                            />
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ))}
                {items.length === 0 ? <EmptyState /> : null}
            </div>
        </div>
    );
}

export function TimelineRepeater({ items = [], onAdd, onChange, onToggle, onRemove }) {
    return (
        <div>
            <RepeaterHeader title="Timeline Sejarah" onAdd={onAdd} />
            <div className="space-y-4">
                {items.map((item, index) => (
                    <div key={index} className="rounded-[22px] border border-slate-200 bg-slate-50 p-4">
                        <div className="mb-4 flex items-center justify-between gap-3">
                            <p className="text-[13px] font-extrabold uppercase tracking-[0.12em] text-[#d59a25]">
                                Timeline {index + 1}
                            </p>
                            <RemoveButton onClick={() => onRemove(index)} />
                        </div>
                        <div className="grid gap-4 md:grid-cols-2">
                            <TextInput
                                label="Tahun"
                                value={item.year}
                                onChange={(event) => onChange(index, "year", event.target.value)}
                                placeholder="1998"
                            />
                            <TextInput
                                label="Judul"
                                value={item.title}
                                onChange={(event) => onChange(index, "title", event.target.value)}
                                placeholder="Pendirian Sekolah"
                            />
                            <div className="md:col-span-2">
                                <TextArea
                                    label="Deskripsi"
                                    value={item.description}
                                    rows={3}
                                    onChange={(event) => onChange(index, "description", event.target.value)}
                                    placeholder="Deskripsi timeline"
                                />
                            </div>
                            <label className="flex cursor-pointer items-center justify-between rounded-[18px] border border-slate-200 bg-white px-5 py-4 md:col-span-2">
                                <div>
                                    <p className="text-[14px] font-extrabold text-[#061b46]">Jadikan Aktif</p>
                                    <p className="mt-1 text-[12px] font-semibold text-slate-500">Biasanya dipakai untuk timeline terakhir.</p>
                                </div>
                                <input
                                    type="checkbox"
                                    checked={Boolean(item.active)}
                                    onChange={(event) => onToggle(index, "active", event.target.checked)}
                                    className="h-5 w-5 rounded border-slate-300 text-[#0b73e8] focus:ring-[#0b73e8]"
                                />
                            </label>
                        </div>
                    </div>
                ))}
                {items.length === 0 ? <EmptyState /> : null}
            </div>
        </div>
    );
}

export function ActionStepRepeater({ items = [], onAdd, onChange, onToggle, onRemove }) {
    return (
        <div>
            <RepeaterHeader title="Action Steps Visi" onAdd={onAdd} />
            <div className="space-y-4">
                {items.map((item, index) => (
                    <div key={index} className="rounded-[22px] border border-slate-200 bg-slate-50 p-4">
                        <div className="mb-4 flex items-center justify-between gap-3">
                            <p className="text-[13px] font-extrabold uppercase tracking-[0.12em] text-[#d59a25]">
                                Step {index + 1}
                            </p>
                            <RemoveButton onClick={() => onRemove(index)} />
                        </div>
                        <div className="grid gap-4 md:grid-cols-2">
                            <TextInput
                                label="Judul"
                                value={item.title}
                                onChange={(event) => onChange(index, "title", event.target.value)}
                                placeholder="Visi"
                            />
                            <TextInput
                                label="Icon"
                                value={item.icon}
                                onChange={(event) => onChange(index, "icon", event.target.value)}
                                placeholder="👁️"
                            />
                            <div className="md:col-span-2">
                                <TextArea
                                    label="Deskripsi"
                                    value={item.description}
                                    rows={3}
                                    onChange={(event) => onChange(index, "description", event.target.value)}
                                    placeholder="Deskripsi step"
                                />
                            </div>
                            <label className="flex cursor-pointer items-center justify-between rounded-[18px] border border-slate-200 bg-white px-5 py-4">
                                <div>
                                    <p className="text-[14px] font-extrabold text-[#061b46]">Aktif</p>
                                </div>
                                <input
                                    type="checkbox"
                                    checked={Boolean(item.active)}
                                    onChange={(event) => onToggle(index, "active", event.target.checked)}
                                    className="h-5 w-5 rounded border-slate-300 text-[#0b73e8] focus:ring-[#0b73e8]"
                                />
                            </label>
                            <label className="flex cursor-pointer items-center justify-between rounded-[18px] border border-slate-200 bg-white px-5 py-4">
                                <div>
                                    <p className="text-[14px] font-extrabold text-[#061b46]">Style Gold</p>
                                </div>
                                <input
                                    type="checkbox"
                                    checked={Boolean(item.gold)}
                                    onChange={(event) => onToggle(index, "gold", event.target.checked)}
                                    className="h-5 w-5 rounded border-slate-300 text-[#d59a25] focus:ring-[#d59a25]"
                                />
                            </label>
                        </div>
                    </div>
                ))}
                {items.length === 0 ? <EmptyState /> : null}
            </div>
        </div>
    );
}
