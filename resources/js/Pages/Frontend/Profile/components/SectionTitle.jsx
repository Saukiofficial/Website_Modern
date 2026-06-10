export default function SectionTitle({ eyebrow, title, description }) {
    return (
        <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#0b73e8]">
                {eyebrow}
            </p>

            <h2 className="mt-3 text-[26px] font-semibold leading-tight tracking-[-0.035em] text-[#061b46] sm:text-[34px] lg:text-[40px]">
                {title}
            </h2>

            {description ? (
                <p className="mt-4 max-w-3xl text-[14px] font-medium leading-7 text-slate-600 sm:text-[15px]">
                    {description}
                </p>
            ) : null}
        </div>
    );
}