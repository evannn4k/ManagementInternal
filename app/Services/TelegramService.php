<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class TelegramService
{
    public function url($method)
    {
        return 'https://api.telegram.org/bot' . config('services.telegram.bot_token') . '/' . $method;
    }

    public function sendMassage($chatId, $text, $option = [])
    {
        $request = Http::post($this->url("sendMessage"), array_merge([
            "chat_id" => $chatId,
            "text" => $text,
        ], $option));

        Log::info($request);
    }

    public function getUpdates($offset = 0)
    {
        $response = Http::get($this->url("getUpdates"), array_filter(["offset" => $offset]));

        if ($response->successful() && isset($response['ok']) && $response['ok'] === true) {
            return $response['result'];
        }

        return null;
    }
}
