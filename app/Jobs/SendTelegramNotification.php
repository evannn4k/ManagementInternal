<?php

namespace App\Jobs;

use App\Services\TelegramService;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;

class SendTelegramNotification implements ShouldQueue
{
    use Queueable;

    /**
     * Create a new job instance.
     */

    protected string $chatId;
    protected string $message;
    protected array $option = [];

    public function __construct(string $chatId, string $message, array $option = [])
    {
        $this->chatId = $chatId;
        $this->message = $message;
        $this->option = $option;
    }

    /**
     * Execute the job.
     */
    public function handle(TelegramService $telegramService): void
    {
        $telegramService->sendMassage($this->chatId, $this->message, $this->option);
    }
}
