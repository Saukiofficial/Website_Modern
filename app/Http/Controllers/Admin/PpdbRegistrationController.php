<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\PpdbRegistration;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class PpdbRegistrationController extends Controller
{
    public function index(Request $request): Response
    {
        $status = $request->query('status', 'all');
        $search = $request->query('search', '');

        $query = PpdbRegistration::query()
            ->latest('submitted_at')
            ->latest('id');

        if ($status !== 'all') {
            $query->where('status', $status);
        }

        if ($search) {
            $query->where(function ($builder) use ($search) {
                $builder
                    ->where('registration_number', 'like', "%{$search}%")
                    ->orWhere('student_name', 'like', "%{$search}%")
                    ->orWhere('nisn', 'like', "%{$search}%")
                    ->orWhere('previous_school', 'like', "%{$search}%")
                    ->orWhere('phone', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%");
            });
        }

        $registrations = $query
            ->paginate(15)
            ->withQueryString()
            ->through(function (PpdbRegistration $registration) {
                return $this->registrationPayload($registration);
            });

        $summary = [
            'total' => PpdbRegistration::query()->count(),
            'baru' => PpdbRegistration::query()->where('status', 'Baru')->count(),
            'diproses' => PpdbRegistration::query()->where('status', 'Diproses')->count(),
            'diterima' => PpdbRegistration::query()->where('status', 'Diterima')->count(),
            'ditolak' => PpdbRegistration::query()->where('status', 'Ditolak')->count(),
        ];

        return Inertia::render('Admin/PpdbRegistrations/Index', [
            'registrations' => $registrations,
            'filters' => [
                'status' => $status,
                'search' => $search,
            ],
            'summary' => $summary,
        ]);
    }

    public function show(PpdbRegistration $registration): Response
    {
        return Inertia::render('Admin/PpdbRegistrations/Show', [
            'registration' => $this->registrationPayload($registration),
        ]);
    }

    public function update(Request $request, PpdbRegistration $registration): RedirectResponse
    {
        $validated = $request->validate([
            'status' => ['required', Rule::in(['Baru', 'Diproses', 'Diterima', 'Ditolak'])],
            'admin_note' => ['nullable', 'string'],
        ]);

        $registration->update([
            'status' => $validated['status'],
            'admin_note' => $validated['admin_note'] ?? null,
        ]);

        return redirect()
            ->route('admin.ppdb-registrations.show', $registration)
            ->with('success', 'Status pendaftar PPDB berhasil diperbarui.');
    }

    public function destroy(PpdbRegistration $registration): RedirectResponse
    {
        $registration->delete();

        return redirect()
            ->route('admin.ppdb-registrations.index')
            ->with('success', 'Data pendaftar PPDB berhasil dihapus.');
    }

    public function print(PpdbRegistration $registration)
    {
        return view('admin.ppdb-registrations.print', [
            'registration' => $registration,
        ]);
    }

    public function export(Request $request)
    {
        $status = $request->query('status', 'all');
        $search = $request->query('search', '');

        $query = PpdbRegistration::query()
            ->latest('submitted_at')
            ->latest('id');

        if ($status !== 'all') {
            $query->where('status', $status);
        }

        if ($search) {
            $query->where(function ($builder) use ($search) {
                $builder
                    ->where('registration_number', 'like', "%{$search}%")
                    ->orWhere('student_name', 'like', "%{$search}%")
                    ->orWhere('nisn', 'like', "%{$search}%")
                    ->orWhere('previous_school', 'like', "%{$search}%")
                    ->orWhere('phone', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%");
            });
        }

        $fileName = 'data-pendaftar-ppdb-' . now()->format('Y-m-d-His') . '.csv';

        $headers = [
            'Content-Type' => 'text/csv; charset=UTF-8',
            'Content-Disposition' => "attachment; filename=\"{$fileName}\"",
        ];

        return response()->streamDownload(function () use ($query) {
            $handle = fopen('php://output', 'w');

            fprintf($handle, chr(0xEF) . chr(0xBB) . chr(0xBF));

            fputcsv($handle, [
                'Nomor Pendaftaran',
                'Nama Siswa',
                'NISN',
                'Jenis Kelamin',
                'Tempat Lahir',
                'Tanggal Lahir',
                'Agama',
                'Asal Sekolah',
                'Alamat',
                'Nama Ayah',
                'Pekerjaan Ayah',
                'Nama Ibu',
                'Pekerjaan Ibu',
                'No HP',
                'Email',
                'Status',
                'Catatan Admin',
                'Tanggal Daftar',
            ]);

            $query->chunk(200, function ($registrations) use ($handle) {
                foreach ($registrations as $registration) {
                    fputcsv($handle, [
                        $registration->registration_number,
                        $registration->student_name,
                        $registration->nisn,
                        $registration->gender,
                        $registration->birth_place,
                        $registration->birth_date?->format('d/m/Y'),
                        $registration->religion,
                        $registration->previous_school,
                        $registration->address,
                        $registration->father_name,
                        $registration->father_job,
                        $registration->mother_name,
                        $registration->mother_job,
                        $registration->phone,
                        $registration->email,
                        $registration->status,
                        $registration->admin_note,
                        $registration->submitted_at?->format('d/m/Y H:i'),
                    ]);
                }
            });

            fclose($handle);
        }, $fileName, $headers);
    }

    private function registrationPayload(PpdbRegistration $registration): array
    {
        return [
            'id' => $registration->id,
            'registration_number' => $registration->registration_number,

            'student_name' => $registration->student_name,
            'nisn' => $registration->nisn,
            'gender' => $registration->gender,
            'birth_place' => $registration->birth_place,
            'birth_date' => $registration->birth_date?->format('Y-m-d'),
            'birth_date_label' => $registration->birth_date?->format('d M Y'),
            'religion' => $registration->religion,
            'previous_school' => $registration->previous_school,
            'address' => $registration->address,

            'father_name' => $registration->father_name,
            'father_job' => $registration->father_job,
            'mother_name' => $registration->mother_name,
            'mother_job' => $registration->mother_job,

            'phone' => $registration->phone,
            'email' => $registration->email,

            'family_card_url' => $registration->family_card_url,
            'birth_certificate_url' => $registration->birth_certificate_url,
            'certificate_url' => $registration->certificate_url,
            'report_card_url' => $registration->report_card_url,
            'photo_url' => $registration->photo_url,

            'status' => $registration->status,
            'status_color' => $registration->status_color,
            'admin_note' => $registration->admin_note,

            'submitted_at' => $registration->submitted_at?->format('d M Y H:i'),
            'created_at' => $registration->created_at?->format('d M Y H:i'),
        ];
    }
}