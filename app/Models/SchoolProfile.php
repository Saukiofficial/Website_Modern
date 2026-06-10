<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SchoolProfile extends Model
{
    protected $fillable = [
        'school_name',
        'short_name',
        'city',
        'tagline',
        'description',
        'hero_image',
        'vision_hero_image',
        'structure_hero_image',
        'history_image',
        'identity_image',
        'vision_banner_image',
        'principal_name',
        'principal_position',
        'principal_image',
        'principal_message',
        'history',
        'vision',
        'missions',
        'identity',
        'values',
        'profile_stats',
        'hero_stats',
        'history_timeline',
        'vision_mission_items',
        'core_values',
        'vision_action_steps',
    ];

    protected $casts = [
        'missions' => 'array',
        'identity' => 'array',
        'values' => 'array',
        'profile_stats' => 'array',
        'hero_stats' => 'array',
        'history_timeline' => 'array',
        'vision_mission_items' => 'array',
        'core_values' => 'array',
        'vision_action_steps' => 'array',
    ];

    public function getHeroImageUrlAttribute(): ?string
    {
        return $this->resolveImageUrl($this->hero_image);
    }

    public function getVisionHeroImageUrlAttribute(): ?string
    {
        return $this->resolveImageUrl($this->vision_hero_image);
    }

    public function getStructureHeroImageUrlAttribute(): ?string
    {
        return $this->resolveImageUrl($this->structure_hero_image);
    }

    public function getHistoryImageUrlAttribute(): ?string
    {
        return $this->resolveImageUrl($this->history_image);
    }

    public function getIdentityImageUrlAttribute(): ?string
    {
        return $this->resolveImageUrl($this->identity_image);
    }

    public function getVisionBannerImageUrlAttribute(): ?string
    {
        return $this->resolveImageUrl($this->vision_banner_image);
    }

    public function getPrincipalImageUrlAttribute(): ?string
    {
        return $this->resolveImageUrl($this->principal_image);
    }

    private function resolveImageUrl(?string $path): ?string
    {
        if (! $path) {
            return null;
        }

        if (str_starts_with($path, 'http') || str_starts_with($path, '/')) {
            return $path;
        }

        return asset('storage/' . $path);
    }
}