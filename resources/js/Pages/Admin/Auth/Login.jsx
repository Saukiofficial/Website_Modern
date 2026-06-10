import { Head, Link, useForm, usePage } from "@inertiajs/react";

function FlashMessage({ flash }) {
    const message =
        flash?.success || flash?.error || flash?.warning || flash?.info || null;

    if (!message) {
        return null;
    }

    const type = flash?.success
        ? "success"
        : flash?.error
        ? "error"
        : flash?.warning
        ? "warning"
        : "info";

    const style = {
        success: "border-emerald-200 bg-emerald-50 text-emerald-700",
        error: "border-red-200 bg-red-50 text-red-700",
        warning: "border-yellow-200 bg-yellow-50 text-yellow-700",
        info: "border-blue-200 bg-blue-50 text-blue-700",
    };

    return (
        <div className="mb-5">
            <div
                className={`rounded-[16px] border px-5 py-4 text-[13px] font-bold ${style[type]}`}
            >
                {message}
            </div>
        </div>
    );
}

export default function Login() {
    const { props } = usePage();

    const { data, setData, post, processing, errors } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    const handleSubmit = (event) => {
        event.preventDefault();

        post("/admin/login", {
            preserveScroll: true,
        });
    };

    return (
        <>
            <Head title="Login Admin" />

            <div className="min-h-screen bg-[#f4f8fc] text-slate-900">
                <div className="grid min-h-screen lg:grid-cols-[0.95fr_1.05fr]">
                    <section className="relative hidden overflow-hidden bg-[#061b46] p-10 text-white lg:flex lg:flex-col lg:justify-between xl:p-14">
                        <div className="absolute inset-0 opacity-20">
                            <img
                                src="/frontend/images/school-bg.jpg"
                                alt="Background sekolah"
                                className="h-full w-full object-cover"
                                onError={(event) => {
                                    event.currentTarget.style.display = "none";
                                }}
                            />
                        </div>

                        <div className="absolute inset-0 bg-gradient-to-br from-[#061b46] via-[#082b68]/95 to-[#0b3b85]/90" />

                        <div className="relative z-10">
                            <Link href="/" className="inline-flex items-center gap-4">
                                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#d59a25] text-[24px] font-black text-white shadow-2xl shadow-black/20">
                                    A
                                </div>

                                <div>
                                    <h1 className="font-serif text-[30px] font-semibold uppercase leading-tight">
                                        Admin Sekolah
                                    </h1>
                                    <p className="mt-1 text-[13px] font-semibold text-blue-100">
                                        Custom React Panel
                                    </p>
                                </div>
                            </Link>
                        </div>

                        <div className="relative z-10 max-w-xl">
                            <p className="text-[12px] font-extrabold uppercase tracking-[0.22em] text-[#f7c46a]">
                                Website Sekolah
                            </p>

                            <h2 className="mt-5 text-[54px] font-black leading-[1.02] tracking-[-0.06em]">
                                Kelola semua konten frontend dari satu admin.
                            </h2>

                            <p className="mt-6 max-w-lg text-[16px] font-medium leading-8 text-blue-100">
                                Atur navbar, beranda, profil, akademik,
                                kesiswaan, informasi, galeri, dan PPDB melalui
                                dashboard custom React.
                            </p>
                        </div>

                        <div className="relative z-10 grid grid-cols-3 gap-4">
                            <div className="rounded-[20px] border border-white/10 bg-white/10 p-5 backdrop-blur">
                                <p className="text-[30px] font-black text-[#f7c46a]">
                                    01
                                </p>
                                <p className="mt-2 text-[13px] font-bold text-blue-100">
                                    Data tersimpan di MySQL
                                </p>
                            </div>

                            <div className="rounded-[20px] border border-white/10 bg-white/10 p-5 backdrop-blur">
                                <p className="text-[30px] font-black text-[#f7c46a]">
                                    02
                                </p>
                                <p className="mt-2 text-[13px] font-bold text-blue-100">
                                    Frontend via Inertia props
                                </p>
                            </div>

                            <div className="rounded-[20px] border border-white/10 bg-white/10 p-5 backdrop-blur">
                                <p className="text-[30px] font-black text-[#f7c46a]">
                                    03
                                </p>
                                <p className="mt-2 text-[13px] font-bold text-blue-100">
                                    Admin custom React
                                </p>
                            </div>
                        </div>
                    </section>

                    <section className="flex items-center justify-center px-4 py-10 sm:px-6 lg:px-10">
                        <div className="w-full max-w-[520px]">
                            <div className="mb-8 text-center lg:text-left">
                                <Link
                                    href="/"
                                    className="mx-auto inline-flex h-16 w-16 items-center justify-center rounded-full bg-[#061b46] text-[24px] font-black text-white shadow-xl shadow-slate-300 lg:mx-0"
                                >
                                    A
                                </Link>

                                <p className="mt-7 text-[12px] font-extrabold uppercase tracking-[0.22em] text-[#d59a25]">
                                    Login Admin
                                </p>

                                <h1 className="mt-3 text-[36px] font-black leading-tight tracking-[-0.05em] text-[#061b46] sm:text-[46px]">
                                    Masuk ke Dashboard
                                </h1>

                                <p className="mt-4 text-[14px] font-semibold leading-7 text-slate-500">
                                    Gunakan akun admin untuk mengelola konten
                                    website sekolah.
                                </p>
                            </div>

                            <FlashMessage flash={props.flash || {}} />

                            <form
                                onSubmit={handleSubmit}
                                className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-2xl shadow-slate-200/80 sm:p-8"
                            >
                                <div>
                                    <label className="mb-2 block text-[13px] font-extrabold text-[#061b46]">
                                        Email Admin
                                    </label>

                                    <input
                                        type="email"
                                        value={data.email}
                                        onChange={(event) =>
                                            setData("email", event.target.value)
                                        }
                                        placeholder="admin@sekolah.test"
                                        className="h-[54px] w-full rounded-[16px] border border-slate-200 bg-white px-4 text-[14px] font-semibold text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-[#0b73e8] focus:ring-4 focus:ring-blue-100"
                                    />

                                    {errors.email ? (
                                        <p className="mt-2 text-[12px] font-bold text-red-600">
                                            {errors.email}
                                        </p>
                                    ) : null}
                                </div>

                                <div className="mt-5">
                                    <label className="mb-2 block text-[13px] font-extrabold text-[#061b46]">
                                        Password
                                    </label>

                                    <input
                                        type="password"
                                        value={data.password}
                                        onChange={(event) =>
                                            setData(
                                                "password",
                                                event.target.value
                                            )
                                        }
                                        placeholder="Masukkan password"
                                        className="h-[54px] w-full rounded-[16px] border border-slate-200 bg-white px-4 text-[14px] font-semibold text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-[#0b73e8] focus:ring-4 focus:ring-blue-100"
                                    />

                                    {errors.password ? (
                                        <p className="mt-2 text-[12px] font-bold text-red-600">
                                            {errors.password}
                                        </p>
                                    ) : null}
                                </div>

                                <div className="mt-5 flex items-center justify-between gap-4">
                                    <label className="flex cursor-pointer items-center gap-3 text-[13px] font-bold text-slate-600">
                                        <input
                                            type="checkbox"
                                            checked={data.remember}
                                            onChange={(event) =>
                                                setData(
                                                    "remember",
                                                    event.target.checked
                                                )
                                            }
                                            className="h-4 w-4 rounded border-slate-300 text-[#0b73e8] focus:ring-[#0b73e8]"
                                        />
                                        Ingat saya
                                    </label>
                                </div>

                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="mt-7 inline-flex h-[54px] w-full items-center justify-center rounded-[16px] bg-[#061b46] px-6 text-[14px] font-extrabold uppercase tracking-[0.08em] text-white shadow-xl shadow-blue-200 transition hover:bg-[#0b3b85] disabled:cursor-not-allowed disabled:opacity-70"
                                >
                                    {processing ? "Memproses..." : "Masuk Admin"}
                                </button>

                                <Link
                                    href="/"
                                    className="mt-5 inline-flex w-full items-center justify-center text-[13px] font-extrabold text-[#d59a25] transition hover:text-[#061b46]"
                                >
                                    Kembali ke Website
                                </Link>
                            </form>

                            <div className="mt-6 rounded-[20px] border border-blue-100 bg-blue-50 px-5 py-4">
                                <p className="text-[12px] font-bold leading-6 text-[#061b46]">
                                    Akun default dari seeder:
                                    <br />
                                    Email: admin@sekolah.test
                                    <br />
                                    Password: password
                                </p>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </>
    );
}