<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\HomeSection;
use App\Models\Menu;
use App\Models\SchoolSetting;
use App\Models\SchoolStatistic;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function index(): Response
    {
        $studentModel = \App\Models\Student::class;
        $alumniModel = \App\Models\Alumni::class;
        $ppdbRegistrationModel = \App\Models\PpdbRegistration::class;
        $osisPeriodModel = \App\Models\OsisElectionPeriod::class;
        $osisCandidateModel = \App\Models\OsisCandidate::class;
        $osisVoterModel = \App\Models\OsisVoter::class;
        $osisVoteModel = \App\Models\OsisVote::class;
        $postModel = \App\Models\Post::class;
        $galleryModel = \App\Models\Gallery::class;

        $studentsTotal = $this->modelCount($studentModel);
        $studentsActive = $this->modelCount($studentModel, function ($query) use ($studentModel) {
            if ($this->hasColumn($studentModel, 'is_active')) {
                $query->where('is_active', true);
            } else {
                $query->whereRaw('1 = 0');
            }
        });

        $studentsInactive = max($studentsTotal - $studentsActive, 0);

        $studentsClass7 = $this->modelCount($studentModel, function ($query) use ($studentModel) {
            if ($this->hasColumn($studentModel, 'class_level')) {
                $query->where('class_level', '7');
            } else {
                $query->whereRaw('1 = 0');
            }
        });

        $studentsClass8 = $this->modelCount($studentModel, function ($query) use ($studentModel) {
            if ($this->hasColumn($studentModel, 'class_level')) {
                $query->where('class_level', '8');
            } else {
                $query->whereRaw('1 = 0');
            }
        });

        $studentsClass9 = $this->modelCount($studentModel, function ($query) use ($studentModel) {
            if ($this->hasColumn($studentModel, 'class_level')) {
                $query->where('class_level', '9');
            } else {
                $query->whereRaw('1 = 0');
            }
        });

        $alumniTotal = $this->modelCount($alumniModel);

        $alumniWorking = $this->modelCount($alumniModel, function ($query) use ($alumniModel) {
            if ($this->hasColumn($alumniModel, 'current_activity')) {
                $query->where('current_activity', 'like', '%Bekerja%');
            } else {
                $query->whereRaw('1 = 0');
            }
        });

        $alumniCollege = $this->modelCount($alumniModel, function ($query) use ($alumniModel) {
            if ($this->hasColumn($alumniModel, 'current_activity')) {
                $query->where('current_activity', 'like', '%Kuliah%');
            } else {
                $query->whereRaw('1 = 0');
            }
        });

        $alumniEntrepreneur = $this->modelCount($alumniModel, function ($query) use ($alumniModel) {
            if ($this->hasColumn($alumniModel, 'current_activity')) {
                $query->where('current_activity', 'like', '%Wirausaha%');
            } else {
                $query->whereRaw('1 = 0');
            }
        });

        $ppdbTotal = $this->modelCount($ppdbRegistrationModel);

        $ppdbToday = $this->modelCount($ppdbRegistrationModel, function ($query) use ($ppdbRegistrationModel) {
            if ($this->hasColumn($ppdbRegistrationModel, 'created_at')) {
                $query->whereDate('created_at', now()->toDateString());
            } else {
                $query->whereRaw('1 = 0');
            }
        });

        $ppdbNew = $this->countByStatus($ppdbRegistrationModel, [
            'baru',
            'pending',
            'menunggu',
            'new',
        ]);

        $ppdbProcessed = $this->countByStatus($ppdbRegistrationModel, [
            'diproses',
            'proses',
            'processed',
            'verifikasi',
        ]);

        $ppdbAccepted = $this->countByStatus($ppdbRegistrationModel, [
            'diterima',
            'accepted',
            'lulus',
        ]);

        $ppdbRejected = $this->countByStatus($ppdbRegistrationModel, [
            'ditolak',
            'rejected',
        ]);

        $activeOsisPeriod = $this->getActiveOsisPeriod($osisPeriodModel);

        $osisPeriodsTotal = $this->modelCount($osisPeriodModel);
        $osisCandidatesTotal = $this->modelCount($osisCandidateModel, function ($query) use ($osisCandidateModel, $activeOsisPeriod) {
            if ($activeOsisPeriod['id'] && $this->hasColumn($osisCandidateModel, 'period_id')) {
                $query->where('period_id', $activeOsisPeriod['id']);
            }
        });

        $osisVotersTotal = $this->modelCount($osisVoterModel, function ($query) use ($osisVoterModel, $activeOsisPeriod) {
            if ($activeOsisPeriod['id'] && $this->hasColumn($osisVoterModel, 'period_id')) {
                $query->where('period_id', $activeOsisPeriod['id']);
            }
        });

        $osisVotesTotal = $this->getTotalVotes($osisVoteModel, $osisVoterModel, $activeOsisPeriod['id']);
        $osisNotVoted = max($osisVotersTotal - $osisVotesTotal, 0);

        $osisParticipationRate = $osisVotersTotal > 0
            ? round(($osisVotesTotal / $osisVotersTotal) * 100)
            : 0;

        $ppdbTrend = $this->dailyTrend($ppdbRegistrationModel, 7);
        $studentClassChart = [
            ['label' => 'Kelas 7', 'value' => $studentsClass7],
            ['label' => 'Kelas 8', 'value' => $studentsClass8],
            ['label' => 'Kelas 9', 'value' => $studentsClass9],
        ];

        $alumniActivityChart = [
            ['label' => 'Bekerja', 'value' => $alumniWorking],
            ['label' => 'Kuliah', 'value' => $alumniCollege],
            ['label' => 'Wirausaha', 'value' => $alumniEntrepreneur],
        ];

        $ppdbStatusChart = [
            ['label' => 'Baru', 'value' => $ppdbNew],
            ['label' => 'Diproses', 'value' => $ppdbProcessed],
            ['label' => 'Diterima', 'value' => $ppdbAccepted],
            ['label' => 'Ditolak', 'value' => $ppdbRejected],
        ];

        return Inertia::render('Admin/Dashboard', [
            'summary' => [
                'students' => [
                    'total' => $studentsTotal,
                    'active' => $studentsActive,
                    'inactive' => $studentsInactive,
                    'class_7' => $studentsClass7,
                    'class_8' => $studentsClass8,
                    'class_9' => $studentsClass9,
                ],

                'alumni' => [
                    'total' => $alumniTotal,
                    'working' => $alumniWorking,
                    'college' => $alumniCollege,
                    'entrepreneur' => $alumniEntrepreneur,
                ],

                'ppdb' => [
                    'total' => $ppdbTotal,
                    'today' => $ppdbToday,
                    'new' => $ppdbNew,
                    'processed' => $ppdbProcessed,
                    'accepted' => $ppdbAccepted,
                    'rejected' => $ppdbRejected,
                ],

                'osis' => [
                    'periods_total' => $osisPeriodsTotal,
                    'active_periods' => $activeOsisPeriod['count'],
                    'active_period_id' => $activeOsisPeriod['id'],
                    'active_period_title' => $activeOsisPeriod['title'],
                    'candidates_total' => $osisCandidatesTotal,
                    'voters_total' => $osisVotersTotal,
                    'votes_total' => $osisVotesTotal,
                    'not_voted' => $osisNotVoted,
                    'participation_rate' => $osisParticipationRate,
                ],

                'charts' => [
                    'ppdb_trend' => $ppdbTrend,
                    'student_classes' => $studentClassChart,
                    'alumni_activities' => $alumniActivityChart,
                    'ppdb_statuses' => $ppdbStatusChart,
                ],

                'secondary' => [
                    'school_settings' => SchoolSetting::query()->count(),
                    'menus' => Menu::query()->count(),
                    'home_sections' => HomeSection::query()->count(),
                    'statistics' => SchoolStatistic::query()->count(),
                    'posts' => $this->modelCount($postModel),
                    'galleries' => $this->modelCount($galleryModel),
                ],
            ],
        ]);
    }

    private function modelCount(string $modelClass, ?callable $callback = null): int
    {
        if (! class_exists($modelClass)) {
            return 0;
        }

        $query = $modelClass::query();

        if ($callback) {
            $callback($query);
        }

        return (int) $query->count();
    }

    private function countByStatus(string $modelClass, array $statuses): int
    {
        if (! class_exists($modelClass) || ! $this->hasColumn($modelClass, 'status')) {
            return 0;
        }

        return (int) $modelClass::query()
            ->whereIn(DB::raw('LOWER(status)'), array_map('strtolower', $statuses))
            ->count();
    }

    private function getActiveOsisPeriod(string $modelClass): array
    {
        if (! class_exists($modelClass)) {
            return [
                'id' => null,
                'count' => 0,
                'title' => null,
            ];
        }

        $query = $modelClass::query();

        if ($this->hasColumn($modelClass, 'is_active')) {
            $query->where('is_active', true);
        } elseif ($this->hasColumn($modelClass, 'status')) {
            $query->whereIn(DB::raw('LOWER(status)'), [
                'aktif',
                'active',
                'berlangsung',
                'dibuka',
                'open',
            ]);
        } else {
            return [
                'id' => null,
                'count' => 0,
                'title' => null,
            ];
        }

        $count = (clone $query)->count();
        $period = (clone $query)->latest('id')->first();

        $title = null;

        if ($period) {
            foreach (['title', 'name', 'period_name', 'academic_year'] as $field) {
                if (isset($period->{$field}) && filled($period->{$field})) {
                    $title = $period->{$field};
                    break;
                }
            }
        }

        return [
            'id' => $period?->id,
            'count' => (int) $count,
            'title' => $title,
        ];
    }

    private function getTotalVotes(string $voteModelClass, string $voterModelClass, ?int $periodId = null): int
    {
        if (class_exists($voteModelClass)) {
            $query = $voteModelClass::query();

            if ($periodId && $this->hasColumn($voteModelClass, 'period_id')) {
                $query->where('period_id', $periodId);
            }

            return (int) $query->count();
        }

        if (class_exists($voterModelClass)) {
            $query = $voterModelClass::query();

            if ($periodId && $this->hasColumn($voterModelClass, 'period_id')) {
                $query->where('period_id', $periodId);
            }

            if ($this->hasColumn($voterModelClass, 'has_voted')) {
                return (int) $query->where('has_voted', true)->count();
            }

            if ($this->hasColumn($voterModelClass, 'voted_at')) {
                return (int) $query->whereNotNull('voted_at')->count();
            }
        }

        return 0;
    }

    private function dailyTrend(string $modelClass, int $days = 7): array
    {
        $items = [];

        for ($i = $days - 1; $i >= 0; $i--) {
            $date = now()->subDays($i);

            $count = 0;

            if (class_exists($modelClass) && $this->hasColumn($modelClass, 'created_at')) {
                $count = (int) $modelClass::query()
                    ->whereDate('created_at', $date->toDateString())
                    ->count();
            }

            $items[] = [
                'label' => $date->format('d M'),
                'value' => $count,
            ];
        }

        return $items;
    }

    private function hasColumn(string $modelClass, string $column): bool
    {
        if (! class_exists($modelClass)) {
            return false;
        }

        /** @var Model $model */
        $model = new $modelClass();

        return Schema::hasColumn($model->getTable(), $column);
    }
}