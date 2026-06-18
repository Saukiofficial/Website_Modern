<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Student;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class StudentPromotionController extends Controller
{
    public function index(Request $request): Response
    {
        $mode = $request->query('mode', 'all');
        $className = $request->query('class_name', 'all');
        $newAcademicYear = $request->query('new_academic_year', $this->suggestedAcademicYear());
        $graduationYear = (int) $request->query('graduation_year', now()->year);
        $showPreview = $request->boolean('preview');

        return Inertia::render('Admin/Students/Promotion', [
            'filters' => [
                'mode' => $mode,
                'class_name' => $className,
                'new_academic_year' => $newAcademicYear,
                'graduation_year' => $graduationYear,
                'preview' => $showPreview,
            ],
            'summary' => $this->summary(),
            'classOptions' => $this->classOptions(),
            'preview' => $showPreview
                ? $this->previewData($mode, $className, $newAcademicYear, $graduationYear)
                : null,
            'recentGraduates' => $this->recentGraduates(),
        ]);
    }

    public function process(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'mode' => ['required', 'in:all,class'],
            'class_name' => ['nullable', 'string', 'max:255'],
            'new_academic_year' => ['required', 'string', 'max:255'],
            'graduation_year' => ['required', 'integer', 'min:2000', 'max:2100'],
        ], [
            'new_academic_year.required' => 'Tahun ajaran baru wajib diisi.',
            'graduation_year.required' => 'Tahun kelulusan wajib diisi.',
        ]);

        $mode = $validated['mode'];
        $className = $validated['class_name'] ?? 'all';
        $newAcademicYear = $validated['new_academic_year'];
        $graduationYear = (int) $validated['graduation_year'];

        if ($mode === 'class' && (! $className || $className === 'all')) {
            return redirect()
                ->route('admin.students.promotion.index')
                ->with('error', 'Pilih kelas terlebih dahulu untuk proses berdasarkan kelas.');
        }

        $counts = [
            'to_11' => 0,
            'to_12' => 0,
            'graduated' => 0,
            'skipped' => 0,
        ];

        $this->eligibleQuery($mode, $className)
            ->select(['id', 'class_level', 'class_name', 'student_status', 'is_active'])
            ->chunkById(100, function ($students) use (&$counts, $newAcademicYear, $graduationYear) {
                foreach ($students as $student) {
                    $level = (string) $student->class_level;

                    if ($level === '10') {
                        $student->update([
                            'class_level' => '11',
                            'academic_year' => $newAcademicYear,
                            'student_status' => 'aktif',
                            'is_active' => true,
                        ]);

                        $counts['to_11']++;
                        continue;
                    }

                    if ($level === '11') {
                        $student->update([
                            'class_level' => '12',
                            'academic_year' => $newAcademicYear,
                            'student_status' => 'aktif',
                            'is_active' => true,
                        ]);

                        $counts['to_12']++;
                        continue;
                    }

                    if ($level === '12') {
                        $student->update([
                            'academic_year' => $newAcademicYear,
                            'student_status' => 'lulus',
                            'graduation_year' => $graduationYear,
                            'is_active' => false,
                        ]);

                        $counts['graduated']++;
                        continue;
                    }

                    $counts['skipped']++;
                }
            });

        $message = "Kenaikan kelas selesai. Kelas 10 ke 11: {$counts['to_11']}, kelas 11 ke 12: {$counts['to_12']}, kelas 12 lulus: {$counts['graduated']}, dilewati: {$counts['skipped']}.";

        return redirect()
            ->route('admin.students.promotion.index')
            ->with('success', $message);
    }

    private function eligibleQuery(string $mode = 'all', string $className = 'all')
    {
        $query = Student::query()
            ->where('is_active', true)
            ->where(function ($builder) {
                $builder->whereNull('student_status')
                    ->orWhere('student_status', '')
                    ->orWhere('student_status', 'aktif');
            });

        if ($mode === 'class' && $className && $className !== 'all') {
            [$level, $name] = $this->splitClassLabel($className);

            $query->where('class_level', $level);

            if ($name !== '') {
                $query->where('class_name', $name);
            }
        }

        return $query->orderBy('class_level')->orderBy('class_name')->orderBy('name');
    }

    private function previewData(string $mode, string $className, string $newAcademicYear, int $graduationYear): array
    {
        $students = $this->eligibleQuery($mode, $className)
            ->get(['id', 'student_number', 'nisn', 'name', 'class_level', 'class_name', 'student_status', 'academic_year']);

        $items = $students->map(function (Student $student) use ($newAcademicYear, $graduationYear) {
            $fromClass = $student->class_label;
            $level = (string) $student->class_level;
            $action = 'Dilewati';
            $toClass = $fromClass;
            $newStatus = $student->student_status ?: 'aktif';

            if ($level === '10') {
                $action = 'Naik kelas';
                $toClass = trim('11 ' . ($student->class_name ?: ''));
                $newStatus = 'aktif';
            } elseif ($level === '11') {
                $action = 'Naik kelas';
                $toClass = trim('12 ' . ($student->class_name ?: ''));
                $newStatus = 'aktif';
            } elseif ($level === '12') {
                $action = 'Lulus';
                $toClass = 'Alumni ' . $graduationYear;
                $newStatus = 'lulus';
            }

            return [
                'id' => $student->id,
                'student_number' => $student->student_number,
                'nisn' => $student->nisn,
                'name' => $student->name,
                'from_class' => $fromClass,
                'to_class' => $toClass,
                'action' => $action,
                'new_status' => $newStatus,
                'new_academic_year' => $newAcademicYear,
            ];
        });

        return [
            'total' => $items->count(),
            'to_11' => $items->where('from_class', 'like', '10%')->count(),
            'to_12' => $items->where('from_class', 'like', '11%')->count(),
            'graduated' => $items->where('action', 'Lulus')->count(),
            'skipped' => $items->where('action', 'Dilewati')->count(),
            'items' => $items->take(100)->values(),
        ];
    }

    private function summary(): array
    {
        return [
            'active' => Student::query()
                ->where('is_active', true)
                ->where(function ($query) {
                    $query->whereNull('student_status')
                        ->orWhere('student_status', '')
                        ->orWhere('student_status', 'aktif');
                })
                ->count(),
            'class_10' => Student::query()->where('is_active', true)->where('class_level', '10')->count(),
            'class_11' => Student::query()->where('is_active', true)->where('class_level', '11')->count(),
            'class_12' => Student::query()->where('is_active', true)->where('class_level', '12')->count(),
            'graduated' => Student::query()->where('student_status', 'lulus')->count(),
            'inactive' => Student::query()->where('is_active', false)->count(),
        ];
    }

    private function classOptions(): array
    {
        return Student::query()
            ->where('is_active', true)
            ->whereNotNull('class_level')
            ->select('class_level', 'class_name')
            ->distinct()
            ->orderBy('class_level')
            ->orderBy('class_name')
            ->get()
            ->map(function (Student $student) {
                return [
                    'value' => trim(($student->class_level ?: '') . ' ' . ($student->class_name ?: '')),
                    'label' => trim(($student->class_level ?: '') . ' ' . ($student->class_name ?: '')),
                ];
            })
            ->filter(fn (array $item) => $item['value'] !== '')
            ->values()
            ->all();
    }

    private function recentGraduates(): array
    {
        return Student::query()
            ->where('student_status', 'lulus')
            ->latest('updated_at')
            ->limit(8)
            ->get(['id', 'name', 'student_number', 'nisn', 'class_level', 'class_name', 'graduation_year', 'updated_at'])
            ->map(function (Student $student) {
                return [
                    'id' => $student->id,
                    'name' => $student->name,
                    'student_number' => $student->student_number,
                    'nisn' => $student->nisn,
                    'class_label' => $student->class_label,
                    'graduation_year' => $student->graduation_year,
                    'updated_at' => $student->updated_at?->format('d M Y H:i'),
                ];
            })
            ->all();
    }

    private function splitClassLabel(string $className): array
    {
        $className = trim($className);

        if (preg_match('/^(10|11|12)\s*([A-Za-z0-9\-]*)$/', $className, $matches)) {
            return [$matches[1], strtoupper(trim($matches[2] ?? ''))];
        }

        $parts = preg_split('/\s+/', $className, 2);

        return [trim($parts[0] ?? ''), strtoupper(trim($parts[1] ?? ''))];
    }

    private function suggestedAcademicYear(): string
    {
        $year = now()->year;
        $month = now()->month;

        if ($month >= 7) {
            return $year . '/' . ($year + 1);
        }

        return ($year - 1) . '/' . $year;
    }
}
