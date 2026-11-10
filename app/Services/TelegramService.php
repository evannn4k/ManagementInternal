<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class TelegramService
{
    public function url(string $method)
    {
        return 'https://api.telegram.org/bot' . config('services.telegram.bot_token') . '/' . $method;
    }

    public function sendMassage(string $chatId, string $text, array $option = []): bool
    {
        $payload = array_merge([
            'chat_id' => $chatId,
            'text' => $text,
        ], $option);

        $request = Http::post($this->url("sendMessage"), $payload);

        if ($request->failed()) {
            Log::error("Failed to send message to Telegram", [
                "chat_id" => $chatId,
                "text" => $text,
                "response" => $request->body(),
            ]);
        }

        if ($request->status() == 403) {
            User::class::where("telegram_chat_id", $chatId)->update(["telegram_chat_id" => null]);
        }

        return true;
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
