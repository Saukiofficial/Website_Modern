<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Alumni;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class AlumniController extends Controller
{
    public function index(Request $request): Response
    {
        $search = $request->query('search', '');
        $graduationYear = $request->query('graduation_year', 'all');
        $status = $request->query('status', 'all');

        $query = $this->filteredAlumniQuery($search, $graduationYear, $status);

        $alumni = $query
            ->paginate(10)
            ->withQueryString()
            ->through(fn (Alumni $alumni) => [
                'id' => $alumni->id,
                'student_number' => $alumni->student_number,
                'nisn' => $alumni->nisn,
                'name' => $alumni->name,
                'gender' => $alumni->gender,
                'graduation_year' => $alumni->graduation_year,
                'class_name' => $alumni->class_name,
                'birth_place' => $alumni->birth_place,
                'birth_date' => $alumni->birth_date?->format('Y-m-d'),
                'phone' => $alumni->phone,
                'email' => $alumni->email,
                'address' => $alumni->address,
                'current_activity' => $alumni->current_activity,
                'institution' => $alumni->institution,
                'job_position' => $alumni->job_position,
                'photo_url' => $alumni->photo_url,
                'is_active' => $alumni->is_active,
                'created_at' => $alumni->created_at?->format('d M Y'),
            ]);

        return Inertia::render('Admin/Alumni/Index', [
            'alumni' => $alumni,
            'filters' => [
                'search' => $search,
                'graduation_year' => $graduationYear,
                'status' => $status,
            ],
            'summary' => [
                'total' => Alumni::query()->count(),
                'active' => Alumni::query()->where('is_active', true)->count(),
                'inactive' => Alumni::query()->where('is_active', false)->count(),
                'working' => Alumni::query()->where('current_activity', 'Bekerja')->count(),
                'college' => Alumni::query()->where('current_activity', 'Kuliah')->count(),
            ],
            'graduationYears' => Alumni::query()
                ->whereNotNull('graduation_year')
                ->select('graduation_year')
                ->distinct()
                ->orderByDesc('graduation_year')
                ->pluck('graduation_year')
                ->values(),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'student_number' => ['nullable', 'string', 'max:255'],
            'nisn' => ['nullable', 'string', 'max:255'],
            'name' => ['required', 'string', 'max:255'],
            'gender' => ['nullable', 'string', 'max:255'],
            'graduation_year' => ['nullable', 'string', 'max:255'],
            'class_name' => ['nullable', 'string', 'max:255'],
            'birth_place' => ['nullable', 'string', 'max:255'],
            'birth_date' => ['nullable', 'date'],
            'phone' => ['nullable', 'string', 'max:255'],
            'email' => ['nullable', 'email', 'max:255'],
            'address' => ['nullable', 'string'],
            'current_activity' => ['nullable', 'string', 'max:255'],
            'institution' => ['nullable', 'string', 'max:255'],
            'job_position' => ['nullable', 'string', 'max:255'],
            'photo' => ['nullable', 'image', 'mimes:jpg,jpeg,png,webp', 'max:2048'],
            'is_active' => ['nullable'],
        ], [
            'name.required' => 'Nama alumni wajib diisi.',
            'email.email' => 'Format email tidak valid.',
            'photo.image' => 'Foto alumni harus berupa gambar.',
            'photo.mimes' => 'Format foto harus jpg, jpeg, png, atau webp.',
            'photo.max' => 'Ukuran foto maksimal 2MB.',
        ]);

        $payload = [
            'student_number' => $validated['student_number'] ?? null,
            'nisn' => $validated['nisn'] ?? null,
            'name' => $validated['name'],
            'gender' => $validated['gender'] ?? null,
            'graduation_year' => $validated['graduation_year'] ?? null,
            'class_name' => $validated['class_name'] ?? null,
            'birth_place' => $validated['birth_place'] ?? null,
            'birth_date' => $validated['birth_date'] ?? null,
            'phone' => $validated['phone'] ?? null,
            'email' => $validated['email'] ?? null,
            'address' => $validated['address'] ?? null,
            'current_activity' => $validated['current_activity'] ?? null,
            'institution' => $validated['institution'] ?? null,
            'job_position' => $validated['job_position'] ?? null,
            'is_active' => filter_var($validated['is_active'] ?? true, FILTER_VALIDATE_BOOLEAN),
        ];

        if ($request->hasFile('photo')) {
            $payload['photo'] = $request->file('photo')->store('alumni', 'public');
        }

        Alumni::query()->create($payload);

        return redirect()
            ->route('admin.alumni.index')
            ->with('success', 'Data alumni berhasil ditambahkan.');
    }

    public function update(Request $request, Alumni $alumni): RedirectResponse
    {
        $validated = $request->validate([
            'student_number' => ['nullable', 'string', 'max:255'],
            'nisn' => ['nullable', 'string', 'max:255'],
            'name' => ['required', 'string', 'max:255'],
            'gender' => ['nullable', 'string', 'max:255'],
            'graduation_year' => ['nullable', 'string', 'max:255'],
            'class_name' => ['nullable', 'string', 'max:255'],
            'birth_place' => ['nullable', 'string', 'max:255'],
            'birth_date' => ['nullable', 'date'],
            'phone' => ['nullable', 'string', 'max:255'],
            'email' => ['nullable', 'email', 'max:255'],
            'address' => ['nullable', 'string'],
            'current_activity' => ['nullable', 'string', 'max:255'],
            'institution' => ['nullable', 'string', 'max:255'],
            'job_position' => ['nullable', 'string', 'max:255'],
            'photo' => ['nullable', 'image', 'mimes:jpg,jpeg,png,webp', 'max:2048'],
            'is_active' => ['nullable'],
        ], [
            'name.required' => 'Nama alumni wajib diisi.',
            'email.email' => 'Format email tidak valid.',
            'photo.image' => 'Foto alumni harus berupa gambar.',
            'photo.mimes' => 'Format foto harus jpg, jpeg, png, atau webp.',
            'photo.max' => 'Ukuran foto maksimal 2MB.',
        ]);

        $payload = [
            'student_number' => $validated['student_number'] ?? null,
            'nisn' => $validated['nisn'] ?? null,
            'name' => $validated['name'],
            'gender' => $validated['gender'] ?? null,
            'graduation_year' => $validated['graduation_year'] ?? null,
            'class_name' => $validated['class_name'] ?? null,
            'birth_place' => $validated['birth_place'] ?? null,
            'birth_date' => $validated['birth_date'] ?? null,
            'phone' => $validated['phone'] ?? null,
            'email' => $validated['email'] ?? null,
            'address' => $validated['address'] ?? null,
            'current_activity' => $validated['current_activity'] ?? null,
            'institution' => $validated['institution'] ?? null,
            'job_position' => $validated['job_position'] ?? null,
            'is_active' => filter_var($validated['is_active'] ?? false, FILTER_VALIDATE_BOOLEAN),
        ];

        if ($request->hasFile('photo')) {
            $this->deletePublicFile($alumni->photo);

            $payload['photo'] = $request->file('photo')->store('alumni', 'public');
        }

        $alumni->update($payload);

        return redirect()
            ->route('admin.alumni.index')
            ->with('success', 'Data alumni berhasil diperbarui.');
    }

    public function destroy(Alumni $alumni): RedirectResponse
    {
        $this->deletePublicFile($alumni->photo);

        $alumni->delete();

        return redirect()
            ->route('admin.alumni.index')
            ->with('success', 'Data alumni berhasil dihapus.');
    }

    public function export(Request $request)
    {
        $search = $request->query('search', '');
        $graduationYear = $request->query('graduation_year', 'all');
        $status = $request->query('status', 'all');

        $query = $this->filteredAlumniQuery($search, $graduationYear, $status);

        $fileName = 'data-alumni-' . now()->format('Y-m-d-His') . '.csv';

        return response()->streamDownload(function () use ($query, $search, $graduationYear, $status) {
            $handle = fopen('php://output', 'w');

            fprintf($handle, chr(0xEF) . chr(0xBB) . chr(0xBF));
            fwrite($handle, "sep=;\n");

            fputcsv($handle, ['DATA ALUMNI'], ';');
            fputcsv($handle, ['Tanggal Export', now()->format('d/m/Y H:i')], ';');
            fputcsv($handle, ['Filter Tahun Lulus', $graduationYear === 'all' ? 'Semua Tahun' : $graduationYear], ';');
            fputcsv($handle, ['Status', $status === 'all' ? 'Semua Status' : ($status === 'active' ? 'Aktif' : 'Nonaktif')], ';');
            fputcsv($handle, ['Pencarian', $search ?: '-'], ';');
            fputcsv($handle, ['Total Data', (clone $query)->count()], ';');
            fputcsv($handle, [], ';');

            fputcsv($handle, [
                'No',
                'Nomor Induk',
                'NISN',
                'Nama Alumni',
                'Jenis Kelamin',
                'Tahun Lulus',
                'Kelas Terakhir',
                'Tempat Lahir',
                'Tanggal Lahir',
                'No HP',
                'Email',
                'Alamat',
                'Aktivitas Saat Ini',
                'Instansi / Kampus / Perusahaan',
                'Posisi / Jurusan',
                'Status',
            ], ';');

            $number = 1;

            $query->chunk(200, function ($alumniRows) use ($handle, &$number) {
                foreach ($alumniRows as $alumni) {
                    fputcsv($handle, [
                        $number++,
                        $alumni->student_number ?: '-',
                        $alumni->nisn ?: '-',
                        $alumni->name ?: '-',
                        $alumni->gender ?: '-',
                        $alumni->graduation_year ?: '-',
                        $alumni->class_name ?: '-',
                        $alumni->birth_place ?: '-',
                        $alumni->birth_date?->format('d/m/Y') ?: '-',
                        $alumni->phone ?: '-',
                        $alumni->email ?: '-',
                        $alumni->address ?: '-',
                        $alumni->current_activity ?: '-',
                        $alumni->institution ?: '-',
                        $alumni->job_position ?: '-',
                        $alumni->is_active ? 'Aktif' : 'Nonaktif',
                    ], ';');
                }
            });

            fclose($handle);
        }, $fileName, [
            'Content-Type' => 'text/csv; charset=UTF-8',
        ]);
    }

    public function downloadImportTemplate()
    {
        $fileName = 'template-import-data-alumni.csv';

        return response()->streamDownload(function () {
            $handle = fopen('php://output', 'w');

            fprintf($handle, chr(0xEF) . chr(0xBB) . chr(0xBF));
            fwrite($handle, "sep=;\n");

            fputcsv($handle, [
                'student_number',
                'nisn',
                'name',
                'gender',
                'graduation_year',
                'class_name',
                'birth_place',
                'birth_date',
                'phone',
                'email',
                'address',
                'current_activity',
                'institution',
                'job_position',
                'is_active',
            ], ';');

            fputcsv($handle, [
                '2020001',
                '1234567890',
                'Ahmad Fauzi',
                'Laki-laki',
                '2023',
                '9A',
                'Jakarta',
                '2008-01-15',
                '081234567890',
                'ahmad@example.com',
                'Jl. Pendidikan No. 1',
                'Kuliah',
                'Universitas Indonesia',
                'Teknik Informatika',
                '1',
            ], ';');

            fputcsv($handle, [
                '2020002',
                '1234567891',
                'Siti Aminah',
                'Perempuan',
                '2022',
                '9B',
                'Bandung',
                '2007-05-20',
                '081234567891',
                'siti@example.com',
                'Jl. Sekolah No. 2',
                'Bekerja',
                'PT Contoh Indonesia',
                'Staff Administrasi',
                '1',
            ], ';');

            fclose($handle);
        }, $fileName, [
            'Content-Type' => 'text/csv; charset=UTF-8',
        ]);
    }

    public function import(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'file' => ['required', 'file', 'mimes:csv,txt', 'max:4096'],
        ], [
            'file.required' => 'File import wajib diupload.',
            'file.file' => 'File import tidak valid.',
            'file.mimes' => 'File import harus berformat CSV.',
            'file.max' => 'Ukuran file maksimal 4MB.',
        ]);

        $file = $validated['file'];
        $path = $file->getRealPath();

        $handle = fopen($path, 'r');

        if (! $handle) {
            return redirect()
                ->route('admin.alumni.index')
                ->with('error', 'File import tidak bisa dibaca.');
        }

    $firstLine = fgets($handle);

    $cleanFirstLine = $firstLine !== false
        ? trim(str_replace("\xEF\xBB\xBF", '', $firstLine))
        : '';

    if ($cleanFirstLine !== '' && str_starts_with($cleanFirstLine, 'sep=')) {
        $delimiter = str_replace('sep=', '', $cleanFirstLine);
        $delimiter = $delimiter ?: ';';

        $header = fgetcsv($handle, 0, $delimiter);
    } else {
        rewind($handle);

        $header = fgetcsv($handle, 0, ';');

        if (! $header || count($header) < 3) {
            rewind($handle);

            $header = fgetcsv($handle, 0, ',');
            $delimiter = ',';
        } else {
            $delimiter = ';';
        }
    }

        if (! $header) {
            fclose($handle);

            return redirect()
                ->route('admin.alumni.index')
                ->with('error', 'Header CSV tidak ditemukan.');
        }

        $header = array_map(function ($item) {
            return trim(str_replace("\xEF\xBB\xBF", '', $item));
        }, $header);

        $requiredHeaders = [
            'student_number',
            'nisn',
            'name',
            'gender',
            'graduation_year',
            'class_name',
            'birth_place',
            'birth_date',
            'phone',
            'email',
            'address',
            'current_activity',
            'institution',
            'job_position',
            'is_active',
        ];

        $missingHeaders = array_diff($requiredHeaders, $header);

        if (! empty($missingHeaders)) {
            fclose($handle);

            return redirect()
                ->route('admin.alumni.index')
                ->with('error', 'Format CSV tidak sesuai. Header yang kurang: ' . implode(', ', $missingHeaders));
        }

        $created = 0;
        $updated = 0;
        $skipped = 0;

        while (($row = fgetcsv($handle, 0, $delimiter)) !== false) {
            if (count(array_filter($row)) === 0) {
                continue;
            }

            $data = array_combine($header, array_pad($row, count($header), null));

            if (! $data || empty($data['name'])) {
                $skipped++;
                continue;
            }

            $studentNumber = trim($data['student_number'] ?? '');
            $nisn = trim($data['nisn'] ?? '');

            if (! $studentNumber && ! $nisn && empty($data['email'])) {
                $skipped++;
                continue;
            }

            $payload = [
                'student_number' => $studentNumber ?: null,
                'nisn' => $nisn ?: null,
                'name' => trim($data['name'] ?? ''),
                'gender' => trim($data['gender'] ?? '') ?: null,
                'graduation_year' => trim($data['graduation_year'] ?? '') ?: null,
                'class_name' => trim($data['class_name'] ?? '') ?: null,
                'birth_place' => trim($data['birth_place'] ?? '') ?: null,
                'birth_date' => $this->normalizeDate($data['birth_date'] ?? null),
                'phone' => trim($data['phone'] ?? '') ?: null,
                'email' => trim($data['email'] ?? '') ?: null,
                'address' => trim($data['address'] ?? '') ?: null,
                'current_activity' => trim($data['current_activity'] ?? '') ?: null,
                'institution' => trim($data['institution'] ?? '') ?: null,
                'job_position' => trim($data['job_position'] ?? '') ?: null,
                'is_active' => $this->normalizeBoolean($data['is_active'] ?? true),
            ];

            $alumni = Alumni::query()
                ->where(function ($query) use ($studentNumber, $nisn, $payload) {
                    if ($studentNumber) {
                        $query->orWhere('student_number', $studentNumber);
                    }

                    if ($nisn) {
                        $query->orWhere('nisn', $nisn);
                    }

                    if (! empty($payload['email'])) {
                        $query->orWhere('email', $payload['email']);
                    }
                })
                ->first();

            if ($alumni) {
                $alumni->update($payload);
                $updated++;
            } else {
                Alumni::query()->create($payload);
                $created++;
            }
        }

        fclose($handle);

        return redirect()
            ->route('admin.alumni.index')
            ->with(
                'success',
                "Import selesai. Data baru: {$created}, diperbarui: {$updated}, dilewati: {$skipped}."
            );
    }

    private function filteredAlumniQuery(string $search = '', string $graduationYear = 'all', string $status = 'all')
    {
        $query = Alumni::query()
            ->latest('id');

        if ($search) {
            $query->where(function ($builder) use ($search) {
                $builder
                    ->where('name', 'like', "%{$search}%")
                    ->orWhere('nisn', 'like', "%{$search}%")
                    ->orWhere('student_number', 'like', "%{$search}%")
                    ->orWhere('class_name', 'like', "%{$search}%")
                    ->orWhere('graduation_year', 'like', "%{$search}%")
                    ->orWhere('phone', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%")
                    ->orWhere('current_activity', 'like', "%{$search}%")
                    ->orWhere('institution', 'like', "%{$search}%")
                    ->orWhere('job_position', 'like', "%{$search}%");
            });
        }

        if ($graduationYear !== 'all') {
            $query->where('graduation_year', $graduationYear);
        }

        if ($status !== 'all') {
            $query->where('is_active', $status === 'active');
        }

        return $query;
    }

    private function normalizeDate(?string $date): ?string
    {
        if (! $date) {
            return null;
        }

        $date = trim($date);

        try {
            if (preg_match('/^\d{4}-\d{2}-\d{2}$/', $date)) {
                return $date;
            }

            if (preg_match('/^\d{2}\/\d{2}\/\d{4}$/', $date)) {
                [$day, $month, $year] = explode('/', $date);

                return "{$year}-{$month}-{$day}";
            }

            return \Carbon\Carbon::parse($date)->format('Y-m-d');
        } catch (\Throwable $exception) {
            return null;
        }
    }

    private function normalizeBoolean($value): bool
    {
        if (is_bool($value)) {
            return $value;
        }

        $value = strtolower(trim((string) $value));

        return in_array($value, ['1', 'true', 'aktif', 'active', 'ya', 'yes'], true);
    }

    private function deletePublicFile(?string $file): void
    {
        if (! $file) {
            return;
        }

        if (str_starts_with($file, 'http')) {
            return;
        }

        if (str_starts_with($file, '/')) {
            return;
        }

        if (Storage::disk('public')->exists($file)) {
            Storage::disk('public')->delete($file);
        }
    }
}