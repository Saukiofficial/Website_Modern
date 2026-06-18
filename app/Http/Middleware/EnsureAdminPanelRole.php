<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureAdminPanelRole
{
    public function handle(Request $request, Closure $next, string ...$roles): Response
    {
        $user = $request->user();

        if (! $user) {
            return redirect()->route('admin.login');
        }

        if ($user->role === 'super_admin') {
            return $next($request);
        }

        if (! in_array($user->role, $roles, true)) {
            abort(403, 'Kamu tidak memiliki akses ke panel ini.');
        }

        return $next($request);
    }
}