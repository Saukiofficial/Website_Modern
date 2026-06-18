<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Student;
use Barryvdh\DomPDF\Facade\Pdf;
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
        $search = trim((string) $request->query('search', ''));
        $className = trim((string) $request->query('class_name', 'all'));
        $status = $request->query('status', 'all');

        $students = $this->filteredStudentQuery($search, $className, $status)
            ->paginate(10)
            ->withQueryString()
            ->through(fn (Student $student) => $this->studentPayload($student));

        return Inertia::render('Admin/Students/Index', [
            'students' => $students,
            'filters' => [
                'search' => $search,
                'class_name' => $className,
                'status' => $status,
            ],
            'classOptions' => $this->classOptions(),
            'summary' => [
                'total' => Student::query()->count(),
                'active' => Student::query()->where('is_active', true)->count(),
                'inactive' => Student::query()->where('is_active', false)->count(),
                'class_10' => Student::query()->where('class_level', '10')->count(),
                'class_11' => Student::query()->where('class_level', '11')->count(),
                'class_12' => Student::query()->where('class_level', '12')->count(),
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

        $payload = $this->studentFormPayload($validated);
        $payload['voting_token'] = $this->generateUniqueVotingToken();

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

        $payload = $this->studentFormPayload($validated);

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
        $search = trim((string) $request->query('search', ''));
        $className = trim((string) $request->query('class_name', 'all'));
        $status = $request->query('status', 'all');

        $query = $this->filteredStudentQuery($search, $className, $status);

        $fileName = 'data-siswa-' . now()->format('Y-m-d-His') . '.csv';

        return response()->streamDownload(function () use ($query, $search, $className, $status) {
            $handle = fopen('php://output', 'w');

            fprintf($handle, chr(0xEF) . chr(0xBB) . chr(0xBF));
            fwrite($handle, "sep=;\n");

            fputcsv($handle, ['DATA SISWA'], ';');
            fputcsv($handle, ['Tanggal Export', now()->format('d/m/Y H:i')], ';');
            fputcsv($handle, ['Filter Kelas', $className === 'all' ? 'Semua Kelas' : $this->normalizeClassLabel($className)], ';');
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
                'Kelas Lengkap',
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
                        $student->class_label ?: '-',
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



    public function exportPdf(Request $request)
    {
        $search = trim((string) $request->query('search', ''));
        $className = trim((string) $request->query('class_name', 'all'));
        $status = $request->query('status', 'all');

        $students = $this->filteredStudentQuery($search, $className, $status)
            ->get();

        $pdf = Pdf::loadView('admin.students.pdf', [
            'students' => $students,
            'search' => $search,
            'className' => $className,
            'status' => $status,
            'classLabel' => $className === 'all' ? 'Semua Kelas' : $this->normalizeClassLabel($className),
            'statusLabel' => $status === 'all' ? 'Semua Status' : ($status === 'active' ? 'Aktif' : 'Nonaktif'),
            'exportedAt' => now()->format('d/m/Y H:i'),
        ])->setPaper('a4', 'landscape');

        return $pdf->download('data-siswa-' . now()->format('Y-m-d-His') . '.pdf');
    }

    public function downloadImportTemplate()
    {
        $fileName = 'template-import-data-siswa.csv';

        return response()->streamDownload(function () {
            $handle = fopen('php://output', 'w');

            fprintf($handle, chr(0xEF) . chr(0xBB) . chr(0xBF));
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

            $examples = [
                [
                    '2026001',
                    '1234567890',
                    'Ahmad Fauzi',
                    'Laki-laki',
                    '10',
                    'A',
                    'Jakarta',
                    '2010-01-15',
                    'Islam',
                    'Jl. Pendidikan No. 1',
                    '081234567890',
                    'ahmad@example.com',
                    'Bapak Ahmad',
                    'Ibu Ahmad',
                    '1',
                ],
                [
                    '2026002',
                    '1234567891',
                    'Siti Aminah',
                    'Perempuan',
                    '10',
                    'B',
                    'Bandung',
                    '2010-05-20',
                    'Islam',
                    'Jl. Sekolah No. 2',
                    '081234567891',
                    'siti@example.com',
                    'Bapak Siti',
                    'Ibu Siti',
                    '1',
                ],
                [
                    '2026003',
                    '1234567892',
                    'Budi Santoso',
                    'Laki-laki',
                    '10',
                    'C',
                    'Surabaya',
                    '2010-08-12',
                    'Islam',
                    'Jl. Merdeka No. 3',
                    '081234567892',
                    'budi@example.com',
                    'Bapak Budi',
                    'Ibu Budi',
                    '1',
                ],
                [
                    '2026004',
                    '1234567893',
                    'Dewi Lestari',
                    'Perempuan',
                    '11',
                    'A',
                    'Malang',
                    '2009-03-10',
                    'Islam',
                    'Jl. Pelajar No. 4',
                    '081234567893',
                    'dewi@example.com',
                    'Bapak Dewi',
                    'Ibu Dewi',
                    '1',
                ],
                [
                    '2026005',
                    '1234567894',
                    'Rizky Pratama',
                    'Laki-laki',
                    '12',
                    'B',
                    'Sidoarjo',
                    '2008-11-22',
                    'Islam',
                    'Jl. Siswa No. 5',
                    '081234567894',
                    'rizky@example.com',
                    'Bapak Rizky',
                    'Ibu Rizky',
                    '1',
                ],
            ];

            foreach ($examples as $example) {
                fputcsv($handle, $example, ';');
            }

            fclose($handle);
        }, $fileName, [
            'Content-Type' => 'text/csv; charset=UTF-8',
        ]);
    }

    public function import(Request $request): RedirectResponse
    {
        $request->validate([
            'file' => ['required', 'file', 'mimes:csv,txt', 'max:4096'],
        ], [
            'file.required' => 'File import wajib diupload.',
            'file.file' => 'File import tidak valid.',
            'file.mimes' => 'File import harus berformat CSV.',
            'file.max' => 'Ukuran file maksimal 4MB.',
        ]);

        $file = $request->file('file');

        if (! $file) {
            return redirect()
                ->route('admin.students.index')
                ->with('error', 'File import tidak ditemukan.');
        }

        $path = $file->getRealPath();
        $handle = fopen($path, 'r');

        if (! $handle) {
            return redirect()
                ->route('admin.students.index')
                ->with('error', 'File import tidak bisa dibaca.');
        }

        $firstLine = fgets($handle);

        $cleanFirstLine = $firstLine !== false
            ? trim(str_replace("\xEF\xBB\xBF", '', $firstLine))
            : '';

        if ($cleanFirstLine !== '' && str_starts_with(strtolower($cleanFirstLine), 'sep=')) {
            $delimiter = str_replace('sep=', '', strtolower($cleanFirstLine));
            $delimiter = $delimiter ?: ';';

            $header = fgetcsv($handle, 0, $delimiter);
        } else {
            rewind($handle);

            $sample = fgets($handle);
            rewind($handle);

            $semicolonCount = substr_count((string) $sample, ';');
            $commaCount = substr_count((string) $sample, ',');
            $tabCount = substr_count((string) $sample, "\t");

            if ($semicolonCount >= $commaCount && $semicolonCount >= $tabCount) {
                $delimiter = ';';
            } elseif ($commaCount >= $semicolonCount && $commaCount >= $tabCount) {
                $delimiter = ',';
            } else {
                $delimiter = "\t";
            }

            $header = fgetcsv($handle, 0, $delimiter);
        }

        if (! $header) {
            fclose($handle);

            return redirect()
                ->route('admin.students.index')
                ->with('error', 'Header CSV tidak ditemukan.');
        }

        $header = array_map(function ($item) {
            $item = (string) $item;

            $item = str_replace("\xEF\xBB\xBF", '', $item);
            $item = str_replace(["\r", "\n", "\t"], '', $item);
            $item = trim($item);
            $item = strtolower($item);
            $item = preg_replace('/\s+/', '_', $item);

            return $item;
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
        ];

        $missingHeaders = array_diff($requiredHeaders, $header);

        if (! empty($missingHeaders)) {
            fclose($handle);

            return redirect()
                ->route('admin.students.index')
                ->with(
                    'error',
                    'Format CSV tidak sesuai. Header yang kurang: ' . implode(', ', $missingHeaders)
                );
        }

        $created = 0;
        $updated = 0;
        $skipped = 0;
        $failed = 0;
        $failedRows = [];

        while (($row = fgetcsv($handle, 0, $delimiter)) !== false) {
            try {
                if (count(array_filter($row, fn ($value) => trim((string) $value) !== '')) === 0) {
                    continue;
                }

                $row = array_pad($row, count($header), null);
                $data = array_combine($header, array_slice($row, 0, count($header)));

                if (! $data) {
                    $skipped++;
                    continue;
                }

                $studentNumber = trim((string) ($data['student_number'] ?? ''));
                $nisn = trim((string) ($data['nisn'] ?? ''));
                $name = trim((string) ($data['name'] ?? ''));

                if ($name === '') {
                    $skipped++;
                    continue;
                }

                if ($studentNumber === '' && $nisn === '') {
                    $skipped++;
                    continue;
                }

                $email = trim((string) ($data['email'] ?? ''));

                $payload = [
                    'student_number' => $studentNumber ?: null,
                    'nisn' => $nisn ?: null,
                    'name' => $name,
                    'gender' => trim((string) ($data['gender'] ?? '')) ?: null,
                    'class_level' => $this->normalizeClassLevel($data['class_level'] ?? null),
                    'class_name' => $this->normalizeClassName($data['class_name'] ?? null),
                    'birth_place' => trim((string) ($data['birth_place'] ?? '')) ?: null,
                    'birth_date' => $this->normalizeDate($data['birth_date'] ?? null),
                    'religion' => trim((string) ($data['religion'] ?? '')) ?: null,
                    'address' => trim((string) ($data['address'] ?? '')) ?: null,
                    'phone' => trim((string) ($data['phone'] ?? '')) ?: null,
                    'email' => $email ?: null,
                    'father_name' => trim((string) ($data['father_name'] ?? '')) ?: null,
                    'mother_name' => trim((string) ($data['mother_name'] ?? '')) ?: null,
                    'is_active' => array_key_exists('is_active', $data)
                        ? $this->normalizeBoolean($data['is_active'])
                        : true,
                ];

                $student = Student::query()
                    ->where(function ($query) use ($studentNumber, $nisn) {
                        if ($studentNumber !== '') {
                            $query->orWhere('student_number', $studentNumber);
                        }

                        if ($nisn !== '') {
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
            } catch (\Throwable $exception) {
                $failed++;
                $failedRows[] = $name ?: $studentNumber ?: $nisn ?: 'Baris tidak diketahui';

                continue;
            }
        }

        fclose($handle);

        $message = "Import selesai. Data baru: {$created}, diperbarui: {$updated}, dilewati: {$skipped}, gagal: {$failed}.";

        if ($failed > 0) {
            $message .= ' Data gagal: ' . implode(', ', array_slice($failedRows, 0, 5));

            if (count($failedRows) > 5) {
                $message .= ', dan lainnya.';
            }
        }

        return redirect()
            ->route('admin.students.index')
            ->with('success', $message);
    }

    private function filteredStudentQuery(string $search = '', string $className = 'all', string $status = 'all')
    {
        $query = Student::query()->latest('id');

        if ($search) {
            $searchWithoutSpace = preg_replace('/\s+/', '', $search);

            $query->where(function ($builder) use ($search, $searchWithoutSpace) {
                $builder
                    ->where('name', 'like', "%{$search}%")
                    ->orWhere('nisn', 'like', "%{$search}%")
                    ->orWhere('student_number', 'like', "%{$search}%")
                    ->orWhere('class_level', 'like', "%{$search}%")
                    ->orWhere('class_name', 'like', "%{$search}%")
                    ->orWhereRaw("CONCAT(class_level, ' ', class_name) LIKE ?", ["%{$search}%"])
                    ->orWhereRaw("REPLACE(CONCAT(class_level, class_name), ' ', '') LIKE ?", ["%{$searchWithoutSpace}%"])
                    ->orWhere('phone', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%");
            });
        }

        if ($className !== '' && $className !== 'all') {
            $parts = $this->parseClassFilter($className);

            if ($parts['level'] !== null) {
                $query->where('class_level', $parts['level']);
            }

            if ($parts['name'] !== null) {
                $query->where('class_name', $parts['name']);
            }
        }

        if ($status !== 'all') {
            $query->where('is_active', $status === 'active');
        }

        return $query;
    }

    private function parseClassFilter(string $className): array
    {
        $value = trim($className);

        if ($value === '' || $value === 'all') {
            return [
                'level' => null,
                'name' => null,
            ];
        }

        $value = strtoupper(preg_replace('/\s+/', ' ', $value));

        if (preg_match('/^(\d+)\s*([A-Z]+)$/', $value, $matches)) {
            return [
                'level' => $matches[1],
                'name' => $matches[2],
            ];
        }

        if (preg_match('/^(\d+)$/', $value, $matches)) {
            return [
                'level' => $matches[1],
                'name' => null,
            ];
        }

        return [
            'level' => null,
            'name' => $value,
        ];
    }

    private function classOptions(): array
    {
        return [
            '10 A', '10 B', '10 C', '10 D', '10 E', '10 F',
            '11 A', '11 B', '11 C', '11 D', '11 E', '11 F',
            '12 A', '12 B', '12 C', '12 D', '12 E', '12 F',
        ];
    }

    private function studentPayload(Student $student): array
    {
        return [
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
        ];
    }

    private function studentFormPayload(array $validated): array
    {
        return [
            'student_number' => $validated['student_number'] ?? null,
            'nisn' => $validated['nisn'] ?? null,
            'name' => $validated['name'],
            'gender' => $validated['gender'] ?? null,
            'class_level' => $this->normalizeClassLevel($validated['class_level'] ?? null),
            'class_name' => $this->normalizeClassName($validated['class_name'] ?? null),
            'birth_place' => $validated['birth_place'] ?? null,
            'birth_date' => $validated['birth_date'] ?? null,
            'religion' => $validated['religion'] ?? null,
            'address' => $validated['address'] ?? null,
            'phone' => $validated['phone'] ?? null,
            'email' => $validated['email'] ?? null,
            'father_name' => $validated['father_name'] ?? null,
            'mother_name' => $validated['mother_name'] ?? null,
            'is_active' => $this->normalizeBoolean($validated['is_active'] ?? true),
        ];
    }

    private function normalizeClassLevel($value): ?string
    {
        $value = trim((string) $value);

        return $value !== '' ? $value : null;
    }

    private function normalizeClassName($value): ?string
    {
        $value = strtoupper(trim((string) $value));

        if ($value === '') {
            return null;
        }

        if (preg_match('/^\d+\s*([A-Z]+)$/', $value, $matches)) {
            return $matches[1];
        }

        return $value;
    }

    private function normalizeClassLabel(string $value): string
    {
        $parts = $this->parseClassFilter($value);

        return trim(($parts['level'] ?? '') . ' ' . ($parts['name'] ?? '')) ?: $value;
    }

    private function generateUniqueVotingToken(): string
    {
        do {
            $token = Str::upper(Str::random(8));
        } while (Student::query()->where('voting_token', $token)->exists());

        return $token;
    }

    private function normalizeDate($date): ?string
    {
        if (! $date) {
            return null;
        }

        $date = trim((string) $date);

        try {
            if ($date === '') {
                return null;
            }

            if (preg_match('/^\d{4}-\d{2}-\d{2}$/', $date)) {
                return $date;
            }

            if (preg_match('/^\d{2}\/\d{2}\/\d{4}$/', $date)) {
                [$day, $month, $year] = explode('/', $date);

                return "{$year}-{$month}-{$day}";
            }

            if (is_numeric($date)) {
                $unixDate = ((int) $date - 25569) * 86400;

                return gmdate('Y-m-d', $unixDate);
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

        if ($value === '') {
            return true;
        }

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
