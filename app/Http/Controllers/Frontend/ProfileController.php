<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Models\OrganizationStructure;
use App\Models\OrganizationUnit;
use App\Models\SchoolProfile;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    public function index(): Response
    {
        $profile = SchoolProfile::query()->first();

        if (! $profile) {
            $profile = SchoolProfile::query()->create([
                'school_name' => 'SMA Negeri 1 Mojokerto',
                'short_name' => 'SMA Negeri 1',
                'city' => 'Mojokerto',
                'tagline' => 'Berprestasi, Berkarakter, Berbudaya',
                'description' => 'SMA Negeri 1 Cerdas merupakan sekolah menengah atas yang berkomitmen membentuk peserta didik yang unggul dalam akademik, berkarakter, kreatif, berbudaya, serta siap bersaing di era global.',
            ]);
        }

        $leaders = OrganizationStructure::query()
            ->where('is_active', true)
            ->orderBy('sort_order')
            ->orderBy('id')
            ->get()
            ->map(function (OrganizationStructure $leader) {
                return [
                    'id' => $leader->id,
                    'role' => $leader->role,
                    'name' => $leader->name,
                    'description' => $leader->description,
                    'image' => $leader->image_url,
                    'fallback' => $leader->fallback_image,
                    'sort_order' => $leader->sort_order,
                    'is_principal' => $leader->is_principal,
                ];
            });

        $units = OrganizationUnit::query()
            ->where('is_active', true)
            ->orderBy('sort_order')
            ->orderBy('id')
            ->get()
            ->map(function (OrganizationUnit $unit) {
                return [
                    'id' => $unit->id,
                    'title' => $unit->title,
                    'description' => $unit->description,
                    'icon' => $unit->icon,
                    'sort_order' => $unit->sort_order,
                ];
            });

        return Inertia::render('Frontend/Profile', [
            'profileData' => [
                'school' => [
                    'name' => $profile->school_name,
                    'shortName' => $profile->short_name,
                    'city' => $profile->city,
                    'tagline' => $profile->tagline,
                    'description' => $profile->description,

                    'heroImage' => $profile->hero_image_url,
                    'visionHeroImage' => $profile->vision_hero_image_url,
                    'structureHeroImage' => $profile->structure_hero_image_url,
                    'historyImage' => $profile->history_image_url,
                    'identityImage' => $profile->identity_image_url,
                    'visionBannerImage' => $profile->vision_banner_image_url,

                    'principal' => [
                        'name' => $profile->principal_name,
                        'position' => $profile->principal_position,
                        'image' => $profile->principal_image_url,
                        'fallback' => 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=1000&q=85',
                        'message' => $profile->principal_message,
                    ],

                    'history' => $profile->history,
                    'vision' => $profile->vision,
                    'missions' => $profile->missions ?? [],
                    'identity' => $profile->identity ?? [],
                ],

                'values' => $profile->values ?? [],
                'profileStats' => $profile->profile_stats ?? [],
                'heroStats' => $profile->hero_stats ?? [],
                'historyTimeline' => $profile->history_timeline ?? [],
                'visionMissionItems' => $profile->vision_mission_items ?? [],
                'coreValues' => $profile->core_values ?? [],
                'visionActionSteps' => $profile->vision_action_steps ?? [],

                'organization' => $leaders,
                'organizationUnits' => $units,
            ],
        ]);
    }
}