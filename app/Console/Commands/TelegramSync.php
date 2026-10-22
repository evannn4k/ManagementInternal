<?php

namespace App\Console\Commands;

use App\Models\User;
use App\Services\TelegramService;
use Illuminate\Console\Attributes\Description;
use Illuminate\Console\Attributes\Signature;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;

#[Signature('telegram:sync')]
#[Description('Command description')]
class TelegramSync extends Command
{
    /**
     * Execute the console command.
     */
    public function handle(TelegramService $telegram)
    {
        $offset = Cache::get("telegram.offset");
        $updates = $telegram->getUpdates($offset);

        // tidak ada update
        if (empty($updates)) {
            return self::SUCCESS;
        }

        // loop perubahan
        foreach ($updates as $update) {
            $offset = $update["update_id"] + 1;
            $message = $update['message'] ?? null;

            $text = trim($message['text'] ?? '');
            $chatId = $message['chat']['id'];

            if (!str_starts_with($text, "/start")) {
                continue;
            }

            $payload = trim(substr($text, 6));

            $user = $payload !== '' ? User::where("telegram_link_token", $payload)->first() : null;

            if ($user) {
                $user->update(["telegram_chat_id" => $chatId, "telegram_link_token" => null]);

                $telegram->sendMassage($chatId, "Berhasil menghubungkan telegram, notifikasi akan dikirim disini.");
            } else {
                $telegram->sendMassage($chatId, "Gagal menghubungkan.");
            }
        } 

        if ($offset) {
            Cache::forever("telegram.offset", $offset);
        }

        return self::SUCCESS;
    }
}
