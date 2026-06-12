<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\OsisCandidate;
use App\Models\OsisElectionPeriod;
use App\Models\OsisVote;
use App\Models\OsisVoter;
use App\Models\Student;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class OsisElectionController extends Controller
{
    public function index(Request $request): Response
    {
        $periodId = $request->query('period_id');

        $periods = OsisElectionPeriod::query()
            ->latest('id')
            ->get()
            ->map(fn (OsisElectionPeriod $period) => [
                'id' => $period->id,
                'title' => $period->title,
                'academic_year' => $period->academic_year,
                'start_at' => $period->start_at?->format('Y-m-d\TH:i'),
                'end_at' => $period->end_at?->format('Y-m-d\TH:i'),
                'description' => $period->description,
                'is_active' => $period->is_active,
                'show_result' => $period->show_result,
                'is_secret_vote' => $period->is_secret_vote,
                'is_running' => $period->is_running,
                'created_at' => $period->created_at?->format('d M Y'),
            ]);

        $activePeriod = $periodId
            ? OsisElectionPeriod::query()->find($periodId)
            : OsisElectionPeriod::query()
                ->where('is_active', true)
                ->latest('id')
                ->first();

        if (! $activePeriod) {
            $activePeriod = OsisElectionPeriod::query()->latest('id')->first();
        }

        $candidates = collect();
        $voters = collect();
        $results = collect();

        $summary = [
            'total_candidates' => 0,
            'total_voters' => 0,
            'voted' => 0,
            'not_voted' => 0,
            'total_votes' => 0,
        ];

        if ($activePeriod) {
            $candidates = OsisCandidate::query()
                ->with('student')
                ->withCount('votes')
                ->where('period_id', $activePeriod->id)
                ->orderByRaw('CAST(candidate_number AS UNSIGNED) ASC')
                ->orderBy('candidate_number')
                ->latest('id')
                ->get()
                ->map(fn (OsisCandidate $candidate) => [
                    'id' => $candidate->id,
                    'period_id' => $candidate->period_id,
                    'student_id' => $candidate->student_id,
                    'candidate_number' => $candidate->candidate_number,
                    'name' => $candidate->name,
                    'class_label' => $candidate->class_label,
                    'photo_url' => $candidate->photo_url,
                    'slogan' => $candidate->slogan,
                    'vision' => $candidate->vision,
                    'mission' => $candidate->mission,
                    'is_active' => $candidate->is_active,
                    'votes_count' => $candidate->votes_count,
                    'student' => $candidate->student ? [
                        'id' => $candidate->student->id,
                        'name' => $candidate->student->name,
                        'nisn' => $candidate->student->nisn,
                        'class_label' => $candidate->student->class_label,
                    ] : null,
                ]);

            $voters = OsisVoter::query()
                ->with('student')
                ->where('period_id', $activePeriod->id)
                ->latest('id')
                ->paginate(10)
                ->withQueryString()
                ->through(fn (OsisVoter $voter) => [
                    'id' => $voter->id,
                    'period_id' => $voter->period_id,
                    'student_id' => $voter->student_id,
                    'token' => $voter->token,
                    'has_voted' => $voter->has_voted,
                    'voted_at' => $voter->voted_at?->format('d M Y H:i'),
                    'student' => $voter->student ? [
                        'id' => $voter->student->id,
                        'name' => $voter->student->name,
                        'nisn' => $voter->student->nisn,
                        'student_number' => $voter->student->student_number,
                        'class_label' => $voter->student->class_label,
                    ] : null,
                ]);

            $totalVoters = OsisVoter::query()
                ->where('period_id', $activePeriod->id)
                ->count();

            $voted = OsisVoter::query()
                ->where('period_id', $activePeriod->id)
                ->where('has_voted', true)
                ->count();

            $totalVotes = OsisVote::query()
                ->where('period_id', $activePeriod->id)
                ->count();

            $summary = [
                'total_candidates' => OsisCandidate::query()
                    ->where('period_id', $activePeriod->id)
                    ->count(),
                'total_voters' => $totalVoters,
                'voted' => $voted,
                'not_voted' => max($totalVoters - $voted, 0),
                'total_votes' => $totalVotes,
            ];

            $results = OsisCandidate::query()
                ->withCount('votes')
                ->where('period_id', $activePeriod->id)
                ->orderByDesc('votes_count')
                ->get()
                ->map(function (OsisCandidate $candidate) use ($totalVotes) {
                    $percentage = $totalVotes > 0
                        ? round(($candidate->votes_count / $totalVotes) * 100, 2)
                        : 0;

                    return [
                        'id' => $candidate->id,
                        'candidate_number' => $candidate->candidate_number,
                        'name' => $candidate->name,
                        'class_label' => $candidate->class_label,
                        'photo_url' => $candidate->photo_url,
                        'votes_count' => $candidate->votes_count,
                        'percentage' => $percentage,
                    ];
                });
        }

        $students = Student::query()
            ->where('is_active', true)
            ->orderBy('class_level')
            ->orderBy('class_name')
            ->orderBy('name')
            ->get()
            ->map(fn (Student $student) => [
                'id' => $student->id,
                'name' => $student->name,
                'nisn' => $student->nisn,
                'student_number' => $student->student_number,
                'class_label' => $student->class_label,
                'photo_url' => $student->photo_url,
            ]);

        return Inertia::render('Admin/OsisElection/Index', [
            'periods' => $periods,
            'activePeriod' => $activePeriod ? [
                'id' => $activePeriod->id,
                'title' => $activePeriod->title,
                'academic_year' => $activePeriod->academic_year,
                'start_at' => $activePeriod->start_at?->format('Y-m-d\TH:i'),
                'end_at' => $activePeriod->end_at?->format('Y-m-d\TH:i'),
                'description' => $activePeriod->description,
                'is_active' => $activePeriod->is_active,
                'show_result' => $activePeriod->show_result,
                'is_secret_vote' => $activePeriod->is_secret_vote,
                'is_running' => $activePeriod->is_running,
            ] : null,
            'candidates' => $candidates,
            'voters' => $voters,
            'results' => $results,
            'students' => $students,
            'summary' => $summary,
            'filters' => [
                'period_id' => $activePeriod?->id,
            ],
        ]);
    }

    public function storePeriod(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'academic_year' => ['nullable', 'string', 'max:255'],
            'start_at' => ['nullable', 'date'],
            'end_at' => ['nullable', 'date', 'after_or_equal:start_at'],
            'description' => ['nullable', 'string'],
            'is_active' => ['nullable'],
            'show_result' => ['nullable'],
            'is_secret_vote' => ['nullable'],
        ], [
            'title.required' => 'Judul periode pemilihan wajib diisi.',
            'end_at.after_or_equal' => 'Tanggal selesai harus setelah atau sama dengan tanggal mulai.',
        ]);

        DB::transaction(function () use ($validated) {
            $isActive = filter_var($validated['is_active'] ?? false, FILTER_VALIDATE_BOOLEAN);

            if ($isActive) {
                OsisElectionPeriod::query()->update([
                    'is_active' => false,
                ]);
            }

            OsisElectionPeriod::query()->create([
                'title' => $validated['title'],
                'academic_year' => $validated['academic_year'] ?? null,
                'start_at' => $validated['start_at'] ?? null,
                'end_at' => $validated['end_at'] ?? null,
                'description' => $validated['description'] ?? null,
                'is_active' => $isActive,
                'show_result' => filter_var($validated['show_result'] ?? false, FILTER_VALIDATE_BOOLEAN),
                'is_secret_vote' => filter_var($validated['is_secret_vote'] ?? true, FILTER_VALIDATE_BOOLEAN),
            ]);
        });

        return redirect()
            ->route('admin.osis-election.index')
            ->with('success', 'Periode pemilihan OSIS berhasil dibuat.');
    }

    public function updatePeriod(Request $request, OsisElectionPeriod $period): RedirectResponse
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'academic_year' => ['nullable', 'string', 'max:255'],
            'start_at' => ['nullable', 'date'],
            'end_at' => ['nullable', 'date', 'after_or_equal:start_at'],
            'description' => ['nullable', 'string'],
            'is_active' => ['nullable'],
            'show_result' => ['nullable'],
            'is_secret_vote' => ['nullable'],
        ], [
            'title.required' => 'Judul periode pemilihan wajib diisi.',
            'end_at.after_or_equal' => 'Tanggal selesai harus setelah atau sama dengan tanggal mulai.',
        ]);

        DB::transaction(function () use ($validated, $period) {
            $isActive = filter_var($validated['is_active'] ?? false, FILTER_VALIDATE_BOOLEAN);

            if ($isActive) {
                OsisElectionPeriod::query()
                    ->where('id', '!=', $period->id)
                    ->update([
                        'is_active' => false,
                    ]);
            }

            $period->update([
                'title' => $validated['title'],
                'academic_year' => $validated['academic_year'] ?? null,
                'start_at' => $validated['start_at'] ?? null,
                'end_at' => $validated['end_at'] ?? null,
                'description' => $validated['description'] ?? null,
                'is_active' => $isActive,
                'show_result' => filter_var($validated['show_result'] ?? false, FILTER_VALIDATE_BOOLEAN),
                'is_secret_vote' => filter_var($validated['is_secret_vote'] ?? true, FILTER_VALIDATE_BOOLEAN),
            ]);
        });

        return redirect()
            ->route('admin.osis-election.index', ['period_id' => $period->id])
            ->with('success', 'Periode pemilihan OSIS berhasil diperbarui.');
    }

    public function destroyPeriod(OsisElectionPeriod $period): RedirectResponse
    {
        $period->delete();

        return redirect()
            ->route('admin.osis-election.index')
            ->with('success', 'Periode pemilihan OSIS berhasil dihapus.');
    }

    public function storeCandidate(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'period_id' => ['required', 'exists:osis_election_periods,id'],
            'student_id' => ['nullable', 'exists:students,id'],
            'candidate_number' => ['nullable', 'string', 'max:255'],
            'name' => ['required_without:student_id', 'nullable', 'string', 'max:255'],
            'class_label' => ['nullable', 'string', 'max:255'],
            'photo' => ['nullable', 'image', 'mimes:jpg,jpeg,png,webp', 'max:2048'],
            'slogan' => ['nullable', 'string', 'max:255'],
            'vision' => ['nullable', 'string'],
            'mission' => ['nullable', 'string'],
            'is_active' => ['nullable'],
        ], [
            'period_id.required' => 'Periode pemilihan wajib dipilih.',
            'student_id.exists' => 'Data siswa tidak ditemukan.',
            'name.required_without' => 'Nama kandidat wajib diisi jika tidak memilih dari data siswa.',
            'photo.image' => 'Foto kandidat harus berupa gambar.',
            'photo.mimes' => 'Format foto harus jpg, jpeg, png, atau webp.',
            'photo.max' => 'Ukuran foto maksimal 2MB.',
        ]);

        $student = null;

        if (! empty($validated['student_id'])) {
            $student = Student::query()->find($validated['student_id']);
        }

        $payload = [
            'period_id' => $validated['period_id'],
            'student_id' => $student?->id,
            'candidate_number' => $validated['candidate_number'] ?? null,
            'name' => $student?->name ?: $validated['name'],
            'class_label' => $student?->class_label ?: ($validated['class_label'] ?? null),
            'slogan' => $validated['slogan'] ?? null,
            'vision' => $validated['vision'] ?? null,
            'mission' => $validated['mission'] ?? null,
            'is_active' => filter_var($validated['is_active'] ?? true, FILTER_VALIDATE_BOOLEAN),
        ];

        if ($request->hasFile('photo')) {
            $payload['photo'] = $request->file('photo')->store('osis-candidates', 'public');
        } elseif ($student?->photo) {
            $payload['photo'] = $student->photo;
        }

        OsisCandidate::query()->create($payload);

        return redirect()
            ->route('admin.osis-election.index', ['period_id' => $validated['period_id']])
            ->with('success', 'Kandidat Ketua OSIS berhasil ditambahkan.');
    }

    public function destroyCandidate(OsisCandidate $candidate): RedirectResponse
    {
        $periodId = $candidate->period_id;

        if ($candidate->photo && ! $candidate->student_id) {
            $this->deletePublicFile($candidate->photo);
        }

        $candidate->delete();

        return redirect()
            ->route('admin.osis-election.index', ['period_id' => $periodId])
            ->with('success', 'Kandidat berhasil dihapus.');
    }

    public function generateVoters(OsisElectionPeriod $period): RedirectResponse
    {
        $students = Student::query()
            ->where('is_active', true)
            ->get();

        $created = 0;
        $updated = 0;

        foreach ($students as $student) {
            $voter = OsisVoter::query()->firstOrCreate(
                [
                    'period_id' => $period->id,
                    'student_id' => $student->id,
                ],
                [
                    'token' => $this->generateUniqueVoterToken($period->id),
                    'has_voted' => false,
                    'voted_at' => null,
                ]
            );

            if ($voter->wasRecentlyCreated) {
                $created++;
            } elseif (! $voter->token) {
                $voter->update([
                    'token' => $this->generateUniqueVoterToken($period->id),
                ]);

                $updated++;
            }
        }

        return redirect()
            ->route('admin.osis-election.index', ['period_id' => $period->id])
            ->with('success', "Generate pemilih selesai. Baru: {$created}, token diperbarui: {$updated}.");
    }

    public function regenerateVoterToken(OsisVoter $voter): RedirectResponse
    {
        if ($voter->has_voted) {
            return redirect()
                ->route('admin.osis-election.index', ['period_id' => $voter->period_id])
                ->with('error', 'Token tidak bisa diganti karena siswa sudah memilih.');
        }

        $voter->update([
            'token' => $this->generateUniqueVoterToken($voter->period_id),
        ]);

        return redirect()
            ->route('admin.osis-election.index', ['period_id' => $voter->period_id])
            ->with('success', 'Token pemilih berhasil dibuat ulang.');
    }

    public function exportVoters(OsisElectionPeriod $period)
    {
        $fileName = 'data-pemilih-osis-' . now()->format('Y-m-d-His') . '.csv';

        $voters = OsisVoter::query()
            ->with('student')
            ->where('period_id', $period->id)
            ->latest('id');

        return response()->streamDownload(function () use ($voters, $period) {
            $handle = fopen('php://output', 'w');

            fprintf($handle, chr(0xEF) . chr(0xBB) . chr(0xBF));
            fwrite($handle, "sep=;\n");

            fputcsv($handle, ['DATA PEMILIH OSIS'], ';');
            fputcsv($handle, ['Periode', $period->title], ';');
            fputcsv($handle, ['Tahun Ajaran', $period->academic_year ?: '-'], ';');
            fputcsv($handle, ['Tanggal Export', now()->format('d/m/Y H:i')], ';');
            fputcsv($handle, [], ';');

            fputcsv($handle, [
                'No',
                'Nama Siswa',
                'NISN',
                'Nomor Induk',
                'Kelas',
                'Token Voting',
                'Status Memilih',
                'Waktu Memilih',
            ], ';');

            $number = 1;

            $voters->chunk(200, function ($rows) use ($handle, &$number) {
                foreach ($rows as $voter) {
                    fputcsv($handle, [
                        $number++,
                        $voter->student?->name ?: '-',
                        $voter->student?->nisn ?: '-',
                        $voter->student?->student_number ?: '-',
                        $voter->student?->class_label ?: '-',
                        $voter->token ?: '-',
                        $voter->has_voted ? 'Sudah Memilih' : 'Belum Memilih',
                        $voter->voted_at?->format('d/m/Y H:i') ?: '-',
                    ], ';');
                }
            });

            fclose($handle);
        }, $fileName, [
            'Content-Type' => 'text/csv; charset=UTF-8',
        ]);
    }

    public function exportResults(OsisElectionPeriod $period)
    {
        $fileName = 'hasil-pemilihan-osis-' . now()->format('Y-m-d-His') . '.csv';

        $totalVotes = OsisVote::query()
            ->where('period_id', $period->id)
            ->count();

        $candidates = OsisCandidate::query()
            ->withCount('votes')
            ->where('period_id', $period->id)
            ->orderByDesc('votes_count');

        return response()->streamDownload(function () use ($candidates, $period, $totalVotes) {
            $handle = fopen('php://output', 'w');

            fprintf($handle, chr(0xEF) . chr(0xBB) . chr(0xBF));
            fwrite($handle, "sep=;\n");

            fputcsv($handle, ['HASIL PEMILIHAN KETUA OSIS'], ';');
            fputcsv($handle, ['Periode', $period->title], ';');
            fputcsv($handle, ['Tahun Ajaran', $period->academic_year ?: '-'], ';');
            fputcsv($handle, ['Total Suara', $totalVotes], ';');
            fputcsv($handle, ['Tanggal Export', now()->format('d/m/Y H:i')], ';');
            fputcsv($handle, [], ';');

            fputcsv($handle, [
                'No Urut',
                'Nama Kandidat',
                'Kelas',
                'Jumlah Suara',
                'Persentase',
            ], ';');

            $candidates->chunk(200, function ($rows) use ($handle, $totalVotes) {
                foreach ($rows as $candidate) {
                    $percentage = $totalVotes > 0
                        ? round(($candidate->votes_count / $totalVotes) * 100, 2)
                        : 0;

                    fputcsv($handle, [
                        $candidate->candidate_number ?: '-',
                        $candidate->name ?: '-',
                        $candidate->class_label ?: '-',
                        $candidate->votes_count,
                        $percentage . '%',
                    ], ';');
                }
            });

            fclose($handle);
        }, $fileName, [
            'Content-Type' => 'text/csv; charset=UTF-8',
        ]);
    }

    public function printTokens(OsisElectionPeriod $period)
{
    $voters = OsisVoter::query()
        ->with('student')
        ->where('period_id', $period->id)
        ->orderBy('id')
        ->get();

    return view('admin.osis-election.print-tokens', [
        'period' => $period,
        'voters' => $voters,
        'votingUrl' => url('/pemilihan-osis'),
        'printedAt' => now()->format('d/m/Y H:i'),
    ]);
}

    private function generateUniqueVoterToken(int $periodId): string
    {
        do {
            $token = Str::upper(Str::random(8));
        } while (
            OsisVoter::query()
                ->where('period_id', $periodId)
                ->where('token', $token)
                ->exists()
        );

        return $token;
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