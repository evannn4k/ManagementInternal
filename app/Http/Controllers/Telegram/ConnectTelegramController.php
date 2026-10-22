<?php

namespace App\Http\Controllers\Telegram;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class ConnectTelegramController extends Controller
{
    public function __invoke(Request $request)
    {
        $token = Str::random(32);
        $request->user()->update(['telegram_link_token' => $token]);

        return Inertia::location(
            'https://t.me/' . config('services.telegram.bot_username') . '?start=' . urlencode($token)
        );
    }
}
