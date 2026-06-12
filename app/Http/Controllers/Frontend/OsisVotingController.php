<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Models\OsisCandidate;
use App\Models\OsisElectionPeriod;
use App\Models\OsisVote;
use App\Models\OsisVoter;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class OsisVotingController extends Controller
{
    public function index(): Response
    {
        $period = OsisElectionPeriod::query()
            ->where('is_active', true)
            ->latest('id')
            ->first();

        $candidates = collect();
        $results = collect();

        if ($period) {
            $candidates = OsisCandidate::query()
                ->where('period_id', $period->id)
                ->where('is_active', true)
                ->orderByRaw('CAST(candidate_number AS UNSIGNED) ASC')
                ->orderBy('candidate_number')
                ->get()
                ->map(fn (OsisCandidate $candidate) => [
                    'id' => $candidate->id,
                    'candidate_number' => $candidate->candidate_number,
                    'name' => $candidate->name,
                    'class_label' => $candidate->class_label,
                    'photo_url' => $candidate->photo_url,
                    'slogan' => $candidate->slogan,
                    'vision' => $candidate->vision,
                    'mission' => $candidate->mission,
                ]);

            if ($period->show_result) {
                $totalVotes = OsisVote::query()
                    ->where('period_id', $period->id)
                    ->count();

                $results = OsisCandidate::query()
                    ->withCount('votes')
                    ->where('period_id', $period->id)
                    ->orderByDesc('votes_count')
                    ->get()
                    ->map(function (OsisCandidate $candidate) use ($totalVotes) {
                        return [
                            'id' => $candidate->id,
                            'candidate_number' => $candidate->candidate_number,
                            'name' => $candidate->name,
                            'class_label' => $candidate->class_label,
                            'photo_url' => $candidate->photo_url,
                            'votes_count' => $candidate->votes_count,
                            'percentage' => $totalVotes > 0
                                ? round(($candidate->votes_count / $totalVotes) * 100, 2)
                                : 0,
                        ];
                    });
            }
        }

        return Inertia::render('Frontend/OsisVoting/Index', [
            'period' => $period ? [
                'id' => $period->id,
                'title' => $period->title,
                'academic_year' => $period->academic_year,
                'description' => $period->description,
                'start_at' => $period->start_at?->format('d M Y H:i'),
                'end_at' => $period->end_at?->format('d M Y H:i'),
                'is_running' => $period->is_running,
                'show_result' => $period->show_result,
            ] : null,
            'candidates' => $candidates,
            'results' => $results,
        ]);
    }

    public function login(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'nisn' => ['required', 'string'],
            'token' => ['required', 'string'],
        ], [
            'nisn.required' => 'NISN wajib diisi.',
            'token.required' => 'Token voting wajib diisi.',
        ]);

        $period = OsisElectionPeriod::query()
            ->where('is_active', true)
            ->latest('id')
            ->first();

        if (! $period) {
            return back()->with('error', 'Belum ada periode pemilihan OSIS yang aktif.');
        }

        if (! $period->is_running) {
            return back()->with('error', 'Pemilihan OSIS belum dimulai atau sudah selesai.');
        }

        $voter = OsisVoter::query()
            ->with('student')
            ->where('period_id', $period->id)
            ->where('token', strtoupper(trim($validated['token'])))
            ->whereHas('student', function ($query) use ($validated) {
                $query->where('nisn', trim($validated['nisn']));
            })
            ->first();

        if (! $voter) {
            return back()->with('error', 'NISN atau token voting tidak valid.');
        }

        if ($voter->has_voted) {
            return back()->with('error', 'Kamu sudah menggunakan hak suara pada periode ini.');
        }

        session([
            'osis_voter_id' => $voter->id,
            'osis_period_id' => $period->id,
        ]);

        return redirect()
            ->route('osis-voting.vote')
            ->with('success', 'Login berhasil. Silakan pilih kandidat Ketua OSIS.');
    }

    public function votePage(): Response|RedirectResponse
    {
        $voterId = session('osis_voter_id');
        $periodId = session('osis_period_id');

        if (! $voterId || ! $periodId) {
            return redirect()
                ->route('osis-voting.index')
                ->with('error', 'Silakan login menggunakan NISN dan token voting.');
        }

        $voter = OsisVoter::query()
            ->with('student')
            ->where('id', $voterId)
            ->where('period_id', $periodId)
            ->first();

        $period = OsisElectionPeriod::query()->find($periodId);

        if (! $voter || ! $period) {
            session()->forget(['osis_voter_id', 'osis_period_id']);

            return redirect()
                ->route('osis-voting.index')
                ->with('error', 'Sesi voting tidak valid.');
        }

        if ($voter->has_voted) {
            session()->forget(['osis_voter_id', 'osis_period_id']);

            return redirect()
                ->route('osis-voting.index')
                ->with('success', 'Terima kasih. Kamu sudah menggunakan hak suara.');
        }

        if (! $period->is_running) {
            session()->forget(['osis_voter_id', 'osis_period_id']);

            return redirect()
                ->route('osis-voting.index')
                ->with('error', 'Pemilihan OSIS belum dimulai atau sudah selesai.');
        }

        $candidates = OsisCandidate::query()
            ->where('period_id', $period->id)
            ->where('is_active', true)
            ->orderByRaw('CAST(candidate_number AS UNSIGNED) ASC')
            ->orderBy('candidate_number')
            ->get()
            ->map(fn (OsisCandidate $candidate) => [
                'id' => $candidate->id,
                'candidate_number' => $candidate->candidate_number,
                'name' => $candidate->name,
                'class_label' => $candidate->class_label,
                'photo_url' => $candidate->photo_url,
                'slogan' => $candidate->slogan,
                'vision' => $candidate->vision,
                'mission' => $candidate->mission,
            ]);

        return Inertia::render('Frontend/OsisVoting/Vote', [
            'period' => [
                'id' => $period->id,
                'title' => $period->title,
                'academic_year' => $period->academic_year,
                'description' => $period->description,
                'end_at' => $period->end_at?->format('d M Y H:i'),
            ],
            'voter' => [
                'id' => $voter->id,
                'student' => [
                    'name' => $voter->student?->name,
                    'nisn' => $voter->student?->nisn,
                    'class_label' => $voter->student?->class_label,
                ],
            ],
            'candidates' => $candidates,
        ]);
    }

    public function submitVote(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'candidate_id' => ['required', 'exists:osis_candidates,id'],
        ], [
            'candidate_id.required' => 'Silakan pilih salah satu kandidat.',
            'candidate_id.exists' => 'Kandidat tidak valid.',
        ]);

        $voterId = session('osis_voter_id');
        $periodId = session('osis_period_id');

        if (! $voterId || ! $periodId) {
            return redirect()
                ->route('osis-voting.index')
                ->with('error', 'Sesi voting sudah habis. Silakan login ulang.');
        }

        $voter = OsisVoter::query()
            ->with('student')
            ->where('id', $voterId)
            ->where('period_id', $periodId)
            ->first();

        $period = OsisElectionPeriod::query()->find($periodId);

        if (! $voter || ! $period) {
            session()->forget(['osis_voter_id', 'osis_period_id']);

            return redirect()
                ->route('osis-voting.index')
                ->with('error', 'Sesi voting tidak valid.');
        }

        if (! $period->is_running) {
            session()->forget(['osis_voter_id', 'osis_period_id']);

            return redirect()
                ->route('osis-voting.index')
                ->with('error', 'Pemilihan OSIS belum dimulai atau sudah selesai.');
        }

        if ($voter->has_voted) {
            session()->forget(['osis_voter_id', 'osis_period_id']);

            return redirect()
                ->route('osis-voting.index')
                ->with('error', 'Kamu sudah menggunakan hak suara.');
        }

        $candidate = OsisCandidate::query()
            ->where('id', $validated['candidate_id'])
            ->where('period_id', $period->id)
            ->where('is_active', true)
            ->first();

        if (! $candidate) {
            return back()->with('error', 'Kandidat tidak ditemukan atau tidak aktif.');
        }

        DB::transaction(function () use ($request, $period, $candidate, $voter) {
            OsisVote::query()->create([
                'period_id' => $period->id,
                'candidate_id' => $candidate->id,
                'student_id' => $voter->student_id,
                'ip_address' => $request->ip(),
                'user_agent' => $request->userAgent(),
                'voted_at' => now(),
            ]);

            $voter->update([
                'has_voted' => true,
                'voted_at' => now(),
            ]);
        });

        session()->forget(['osis_voter_id', 'osis_period_id']);

        return redirect()
            ->route('osis-voting.index')
            ->with('success', 'Terima kasih. Suara kamu berhasil disimpan.');
    }

    public function logout(): RedirectResponse
    {
        session()->forget(['osis_voter_id', 'osis_period_id']);

        return redirect()
            ->route('osis-voting.index')
            ->with('success', 'Kamu berhasil keluar dari halaman voting.');
    }
}