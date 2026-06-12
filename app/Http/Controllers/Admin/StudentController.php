<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Student;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class StudentController extends Controller
{
    public function index(Request $request): Response
    {
        $search = $request->query('search', '');
        $classLevel = $request->query('class_level', 'all');
        $status = $request->query('status', 'all');

        $query = Student::query()
            ->latest('id');

        if ($search) {
            $query->where(function ($builder) use ($search) {
                $builder
                    ->where('name', 'like', "%{$search}%")
                    ->orWhere('nisn', 'like', "%{$search}%")
                    ->orWhere('student_number', 'like', "%{$search}%")
                    ->orWhere('class_name', 'like', "%{$search}%")
                    ->orWhere('phone', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%");
            });
        }

        if ($classLevel !== 'all') {
            $query->where('class_level', $classLevel);
        }

        if ($status !== 'all') {
            $query->where('is_active', $status === 'active');
        }

        $students = $query
            ->paginate(10)
            ->withQueryString()
            ->through(fn (Student $student) => [
                'id' => $student->id,
                'student_number' => $student->student_number,
                'nisn' => $student->nisn,
                'name' => $student->name,
                'gender' => $student->gender,
                'class_level' => $student->class_level,
                'class_name' => $student->class_name,
                'class_label' => $student->class_label,
                'birth_place' => $student->birth_place,
                'birth_date' => $student->birth_date?->format('Y-m-d'),
                'religion' => $student->religion,
                'address' => $student->address,
                'phone' => $student->phone,
                'email' => $student->email,
                'father_name' => $student->father_name,
                'mother_name' => $student->mother_name,
                'photo_url' => $student->photo_url,
                'voting_token' => $student->voting_token,
                'is_active' => $student->is_active,
                'created_at' => $student->created_at?->format('d M Y'),
            ]);

        return Inertia::render('Admin/Students/Index', [
            'students' => $students,
            'filters' => [
                'search' => $search,
                'class_level' => $classLevel,
                'status' => $status,
            ],
            'summary' => [
                'total' => Student::query()->count(),
                'active' => Student::query()->where('is_active', true)->count(),
                'inactive' => Student::query()->where('is_active', false)->count(),
                'class_7' => Student::query()->where('class_level', '7')->count(),
                'class_8' => Student::query()->where('class_level', '8')->count(),
                'class_9' => Student::query()->where('class_level', '9')->count(),
            ],
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'student_number' => ['nullable', 'string', 'max:255', 'unique:students,student_number'],
            'nisn' => ['nullable', 'string', 'max:255', 'unique:students,nisn'],
            'name' => ['required', 'string', 'max:255'],
            'gender' => ['nullable', 'string', 'max:255'],
            'class_level' => ['nullable', 'string', 'max:255'],
            'class_name' => ['nullable', 'string', 'max:255'],
            'birth_place' => ['nullable', 'string', 'max:255'],
            'birth_date' => ['nullable', 'date'],
            'religion' => ['nullable', 'string', 'max:255'],
            'address' => ['nullable', 'string'],
            'phone' => ['nullable', 'string', 'max:255'],
            'email' => ['nullable', 'email', 'max:255'],
            'father_name' => ['nullable', 'string', 'max:255'],
            'mother_name' => ['nullable', 'string', 'max:255'],
            'photo' => ['nullable', 'image', 'mimes:jpg,jpeg,png,webp', 'max:2048'],
            'is_active' => ['nullable'],
        ], [
            'name.required' => 'Nama siswa wajib diisi.',
            'student_number.unique' => 'Nomor induk siswa sudah digunakan.',
            'nisn.unique' => 'NISN sudah digunakan.',
            'email.email' => 'Format email tidak valid.',
            'photo.image' => 'Foto siswa harus berupa gambar.',
            'photo.mimes' => 'Format foto harus jpg, jpeg, png, atau webp.',
            'photo.max' => 'Ukuran foto maksimal 2MB.',
        ]);

        $payload = [
            'student_number' => $validated['student_number'] ?? null,
            'nisn' => $validated['nisn'] ?? null,
            'name' => $validated['name'],
            'gender' => $validated['gender'] ?? null,
            'class_level' => $validated['class_level'] ?? null,
            'class_name' => $validated['class_name'] ?? null,
            'birth_place' => $validated['birth_place'] ?? null,
            'birth_date' => $validated['birth_date'] ?? null,
            'religion' => $validated['religion'] ?? null,
            'address' => $validated['address'] ?? null,
            'phone' => $validated['phone'] ?? null,
            'email' => $validated['email'] ?? null,
            'father_name' => $validated['father_name'] ?? null,
            'mother_name' => $validated['mother_name'] ?? null,
            'is_active' => filter_var($validated['is_active'] ?? true, FILTER_VALIDATE_BOOLEAN),
            'voting_token' => $this->generateUniqueVotingToken(),
        ];

        if ($request->hasFile('photo')) {
            $payload['photo'] = $request->file('photo')->store('students', 'public');
        }

        Student::query()->create($payload);

        return redirect()
            ->route('admin.students.index')
            ->with('success', 'Data siswa berhasil ditambahkan.');
    }

    public function update(Request $request, Student $student): RedirectResponse
    {
        $validated = $request->validate([
            'student_number' => ['nullable', 'string', 'max:255', 'unique:students,student_number,' . $student->id],
            'nisn' => ['nullable', 'string', 'max:255', 'unique:students,nisn,' . $student->id],
            'name' => ['required', 'string', 'max:255'],
            'gender' => ['nullable', 'string', 'max:255'],
            'class_level' => ['nullable', 'string', 'max:255'],
            'class_name' => ['nullable', 'string', 'max:255'],
            'birth_place' => ['nullable', 'string', 'max:255'],
            'birth_date' => ['nullable', 'date'],
            'religion' => ['nullable', 'string', 'max:255'],
            'address' => ['nullable', 'string'],
            'phone' => ['nullable', 'string', 'max:255'],
            'email' => ['nullable', 'email', 'max:255'],
            'father_name' => ['nullable', 'string', 'max:255'],
            'mother_name' => ['nullable', 'string', 'max:255'],
            'photo' => ['nullable', 'image', 'mimes:jpg,jpeg,png,webp', 'max:2048'],
            'is_active' => ['nullable'],
        ], [
            'name.required' => 'Nama siswa wajib diisi.',
            'student_number.unique' => 'Nomor induk siswa sudah digunakan.',
            'nisn.unique' => 'NISN sudah digunakan.',
            'email.email' => 'Format email tidak valid.',
            'photo.image' => 'Foto siswa harus berupa gambar.',
            'photo.mimes' => 'Format foto harus jpg, jpeg, png, atau webp.',
            'photo.max' => 'Ukuran foto maksimal 2MB.',
        ]);

        $payload = [
            'student_number' => $validated['student_number'] ?? null,
            'nisn' => $validated['nisn'] ?? null,
            'name' => $validated['name'],
            'gender' => $validated['gender'] ?? null,
            'class_level' => $validated['class_level'] ?? null,
            'class_name' => $validated['class_name'] ?? null,
            'birth_place' => $validated['birth_place'] ?? null,
            'birth_date' => $validated['birth_date'] ?? null,
            'religion' => $validated['religion'] ?? null,
            'address' => $validated['address'] ?? null,
            'phone' => $validated['phone'] ?? null,
            'email' => $validated['email'] ?? null,
            'father_name' => $validated['father_name'] ?? null,
            'mother_name' => $validated['mother_name'] ?? null,
            'is_active' => filter_var($validated['is_active'] ?? false, FILTER_VALIDATE_BOOLEAN),
        ];

        if ($request->hasFile('photo')) {
            $this->deletePublicFile($student->photo);

            $payload['photo'] = $request->file('photo')->store('students', 'public');
        }

        $student->update($payload);

        return redirect()
            ->route('admin.students.index')
            ->with('success', 'Data siswa berhasil diperbarui.');
    }

    public function destroy(Student $student): RedirectResponse
    {
        $this->deletePublicFile($student->photo);

        $student->delete();

        return redirect()
            ->route('admin.students.index')
            ->with('success', 'Data siswa berhasil dihapus.');
    }

    public function generateToken(Student $student): RedirectResponse
    {
        $student->update([
            'voting_token' => $this->generateUniqueVotingToken(),
        ]);

        return redirect()
            ->route('admin.students.index')
            ->with('success', 'Token voting siswa berhasil dibuat ulang.');
    }

    public function export(Request $request)
    {
        $search = $request->query('search', '');
        $classLevel = $request->query('class_level', 'all');
        $status = $request->query('status', 'all');

        $query = $this->filteredStudentQuery($search, $classLevel, $status);

        $fileName = 'data-siswa-' . now()->format('Y-m-d-His') . '.csv';

        return response()->streamDownload(function () use ($query, $search, $classLevel, $status) {
            $handle = fopen('php://output', 'w');

            fprintf($handle, chr(0xEF) . chr(0xBB) . chr(0xBF));
            fwrite($handle, "sep=;\n");

            fputcsv($handle, ['DATA SISWA'], ';');
            fputcsv($handle, ['Tanggal Export', now()->format('d/m/Y H:i')], ';');
            fputcsv($handle, ['Filter Kelas', $classLevel === 'all' ? 'Semua Kelas' : 'Kelas ' . $classLevel], ';');
            fputcsv($handle, ['Status', $status === 'all' ? 'Semua Status' : ($status === 'active' ? 'Aktif' : 'Nonaktif')], ';');
            fputcsv($handle, ['Pencarian', $search ?: '-'], ';');
            fputcsv($handle, ['Total Data', (clone $query)->count()], ';');
            fputcsv($handle, [], ';');

            fputcsv($handle, [
                'No',
                'Nomor Induk',
                'NISN',
                'Nama Siswa',
                'Jenis Kelamin',
                'Kelas',
                'Rombel',
                'Tempat Lahir',
                'Tanggal Lahir',
                'Agama',
                'Alamat',
                'No HP',
                'Email',
                'Nama Ayah',
                'Nama Ibu',
                'Token Voting',
                'Status',
            ], ';');

            $number = 1;

            $query->chunk(200, function ($students) use ($handle, &$number) {
                foreach ($students as $student) {
                    fputcsv($handle, [
                        $number++,
                        $student->student_number ?: '-',
                        $student->nisn ?: '-',
                        $student->name ?: '-',
                        $student->gender ?: '-',
                        $student->class_level ?: '-',
                        $student->class_name ?: '-',
                        $student->birth_place ?: '-',
                        $student->birth_date?->format('d/m/Y') ?: '-',
                        $student->religion ?: '-',
                        $student->address ?: '-',
                        $student->phone ?: '-',
                        $student->email ?: '-',
                        $student->father_name ?: '-',
                        $student->mother_name ?: '-',
                        $student->voting_token ?: '-',
                        $student->is_active ? 'Aktif' : 'Nonaktif',
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
        $fileName = 'template-import-data-siswa.csv';

        return response()->streamDownload(function () {
            $handle = fopen('php://output', 'w');

            // UTF-8 BOM agar karakter Indonesia aman dibuka di Excel
            fprintf($handle, chr(0xEF) . chr(0xBB) . chr(0xBF));

            // Membuat Excel otomatis membaca separator titik koma
            fwrite($handle, "sep=;\n");

            fputcsv($handle, [
                'student_number',
                'nisn',
                'name',
                'gender',
                'class_level',
                'class_name',
                'birth_place',
                'birth_date',
                'religion',
                'address',
                'phone',
                'email',
                'father_name',
                'mother_name',
                'is_active',
            ], ';');

            fputcsv($handle, [
                '2026001',
                '1234567890',
                'Ahmad Fauzi',
                'Laki-laki',
                '7',
                '7A',
                'Jakarta',
                '2012-01-15',
                'Islam',
                'Jl. Pendidikan No. 1',
                '081234567890',
                'ahmad@example.com',
                'Bapak Ahmad',
                'Ibu Ahmad',
                '1',
            ], ';');

            fputcsv($handle, [
                '2026002',
                '1234567891',
                'Siti Aminah',
                'Perempuan',
                '8',
                '8B',
                'Bandung',
                '2011-05-20',
                'Islam',
                'Jl. Sekolah No. 2',
                '081234567891',
                'siti@example.com',
                'Bapak Siti',
                'Ibu Siti',
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
                ->route('admin.students.index')
                ->with('error', 'File import tidak bisa dibaca.');
        }

        $firstLine = fgets($handle);

        if ($firstLine !== false && str_starts_with(trim($firstLine), 'sep=')) {
            $delimiter = str_replace('sep=', '', trim($firstLine));
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
                ->route('admin.students.index')
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
            'class_level',
            'class_name',
            'birth_place',
            'birth_date',
            'religion',
            'address',
            'phone',
            'email',
            'father_name',
            'mother_name',
            'is_active',
        ];

        $missingHeaders = array_diff($requiredHeaders, $header);

        if (! empty($missingHeaders)) {
            fclose($handle);

            return redirect()
                ->route('admin.students.index')
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

            if (! $studentNumber && ! $nisn) {
                $skipped++;
                continue;
            }

            $payload = [
                'student_number' => $studentNumber ?: null,
                'nisn' => $nisn ?: null,
                'name' => trim($data['name'] ?? ''),
                'gender' => trim($data['gender'] ?? '') ?: null,
                'class_level' => trim($data['class_level'] ?? '') ?: null,
                'class_name' => trim($data['class_name'] ?? '') ?: null,
                'birth_place' => trim($data['birth_place'] ?? '') ?: null,
                'birth_date' => $this->normalizeDate($data['birth_date'] ?? null),
                'religion' => trim($data['religion'] ?? '') ?: null,
                'address' => trim($data['address'] ?? '') ?: null,
                'phone' => trim($data['phone'] ?? '') ?: null,
                'email' => trim($data['email'] ?? '') ?: null,
                'father_name' => trim($data['father_name'] ?? '') ?: null,
                'mother_name' => trim($data['mother_name'] ?? '') ?: null,
                'is_active' => $this->normalizeBoolean($data['is_active'] ?? true),
            ];

            $student = Student::query()
                ->where(function ($query) use ($studentNumber, $nisn) {
                    if ($studentNumber) {
                        $query->orWhere('student_number', $studentNumber);
                    }

                    if ($nisn) {
                        $query->orWhere('nisn', $nisn);
                    }
                })
                ->first();

            if ($student) {
                $student->update($payload);
                $updated++;
            } else {
                $payload['voting_token'] = $this->generateUniqueVotingToken();

                Student::query()->create($payload);
                $created++;
            }
        }

        fclose($handle);

        return redirect()
            ->route('admin.students.index')
            ->with(
                'success',
                "Import selesai. Data baru: {$created}, diperbarui: {$updated}, dilewati: {$skipped}."
            );
    }

    private function filteredStudentQuery(string $search = '', string $classLevel = 'all', string $status = 'all')
    {
        $query = Student::query()
            ->latest('id');

        if ($search) {
            $query->where(function ($builder) use ($search) {
                $builder
                    ->where('name', 'like', "%{$search}%")
                    ->orWhere('nisn', 'like', "%{$search}%")
                    ->orWhere('student_number', 'like', "%{$search}%")
                    ->orWhere('class_name', 'like', "%{$search}%")
                    ->orWhere('phone', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%");
            });
        }

        if ($classLevel !== 'all') {
            $query->where('class_level', $classLevel);
        }

        if ($status !== 'all') {
            $query->where('is_active', $status === 'active');
        }

        return $query;
    }

    private function generateUniqueVotingToken(): string
    {
        do {
            $token = Str::upper(Str::random(8));
        } while (Student::query()->where('voting_token', $token)->exists());

        return $token;
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